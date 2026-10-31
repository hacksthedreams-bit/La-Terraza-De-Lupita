#!/usr/bin/env bash
# Crea un loop largo y sin cortes a partir de un archivo de audio (que tengas derecho a usar),
# con limpieza basica y normalizacion de volumen.
#
# Uso: tools/make_loop.sh entrada.(wav|mp3|flac|m4a) salida.mp3 [segundos=10800] [crossfade=3]
set -euo pipefail

IN="${1:?Uso: $0 entrada salida.mp3 [segundos=10800] [crossfade=3]}"
OUT="${2:?Falta archivo de salida}"
TOTAL="${3:-10800}"   # 3 horas
XF="${4:-3}"          # segundos de crossfade en la union

DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$IN")
if ! awk -v d="$DUR" -v x="$XF" 'BEGIN{exit !(d > 2*x + 1)}'; then
  echo "El audio ($DUR s) es muy corto para un crossfade de $XF s" >&2; exit 1
fi

TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT

# 1) Mejora de audio: quita rumble, domestica picos, normaliza (LUFS=16 por defecto, -1.5 dBTP)
ffmpeg -v error -y -i "$IN" -vn -af \
  "highpass=f=35,loudnorm=I=-${LUFS:-16}:TP=-1.5:LRA=11" \
  -ar 44100 -ac 2 "$TMP/clean.wav"

# 2) Unidad de loop: el final se funde con el inicio, asi la repeticion no se nota
ffmpeg -v error -y -i "$TMP/clean.wav" -filter_complex "
  [0:a]asplit=3[b][t][h];
  [b]atrim=start=${XF}:end=$(awk -v d="$DUR" -v x="$XF" 'BEGIN{print d-x}'),asetpts=PTS-STARTPTS[body];
  [t]atrim=start=$(awk -v d="$DUR" -v x="$XF" 'BEGIN{print d-x}'),asetpts=PTS-STARTPTS[tail];
  [h]atrim=end=${XF},asetpts=PTS-STARTPTS[head];
  [tail][head]acrossfade=d=${XF}:c1=tri:c2=tri[mid];
  [body][mid]concat=n=2:v=0:a=1[out]" -map "[out]" "$TMP/unit.wav"

# 3) Repetir hasta la duracion pedida y codificar
ffmpeg -v error -y -stream_loop -1 -i "$TMP/unit.wav" -t "$TOTAL" \
  -c:a libmp3lame -b:a 256k "$OUT"

echo "Listo: $OUT ($(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT") s)"
