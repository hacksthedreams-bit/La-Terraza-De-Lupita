#!/usr/bin/env python3
"""
Extrae preguntas frecuentes candidatas desde chats de WhatsApp exportados.

Cómo exportar un chat desde WhatsApp:
  Abrir el chat -> menú (3 puntos) -> Más -> Exportar chat -> "Sin archivos multimedia"
  Esto genera un archivo .txt. Junta todos los .txt en una carpeta y pásala aquí.

Uso:
  python3 extraer_faqs_de_chats.py /ruta/a/carpeta_con_chats --salida candidatos.json

El script NO usa IA ni llama a ningún servicio externo: solo agrupa mensajes
entrantes (de clientes) que se parecen entre sí por palabras clave, para que
un humano (o Claude) revise cuáles merecen entrar en faqs.json con una
respuesta fija. Es un punto de partida, no un reemplazo del criterio del dueño.
"""

import argparse
import glob
import json
import os
import re
from collections import defaultdict

LINE_RE = re.compile(
    r"^\[?(\d{1,2}/\d{1,2}/\d{2,4}),?\s+(\d{1,2}:\d{2}(?:\s?[ap]\.?\s?m\.?)?)\]?\s*-?\s*([^:]+):\s(.*)$",
    re.IGNORECASE,
)

STOPWORDS = {
    "el", "la", "los", "las", "un", "una", "de", "del", "y", "en", "que",
    "es", "para", "por", "con", "se", "su", "sus", "me", "te", "le", "lo",
    "hola", "buenas", "gracias", "si", "no", "muy", "mas", "más",
}


def parse_chat(path):
    mensajes = []
    with open(path, encoding="utf-8", errors="ignore") as f:
        for line in f:
            line = line.strip()
            m = LINE_RE.match(line)
            if not m:
                continue
            _, _, autor, texto = m.groups()
            mensajes.append((autor.strip(), texto.strip()))
    return mensajes


def es_mensaje_negocio(autor, nombres_negocio):
    autor_low = autor.lower()
    return any(n.lower() in autor_low for n in nombres_negocio)


def palabras_clave(texto):
    texto = texto.lower()
    texto = re.sub(r"[^a-záéíóúñ0-9\s]", " ", texto)
    palabras = [w for w in texto.split() if w not in STOPWORDS and len(w) > 2]
    return palabras


def agrupar_preguntas(archivos, nombres_negocio):
    grupos = defaultdict(list)
    for path in archivos:
        mensajes = parse_chat(path)
        for autor, texto in mensajes:
            if not texto or es_mensaje_negocio(autor, nombres_negocio):
                continue
            if "<multimedia omitido>" in texto.lower() or "<media omitted>" in texto.lower():
                continue
            palabras = palabras_clave(texto)
            if not palabras:
                continue
            clave = " ".join(sorted(set(palabras))[:3])
            grupos[clave].append(texto)
    return grupos


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("carpeta", help="Carpeta con los .txt exportados de WhatsApp")
    ap.add_argument("--salida", default="candidatos_faq.json", help="Archivo JSON de salida")
    ap.add_argument(
        "--nombre-negocio",
        action="append",
        default=[],
        help="Nombre(s) tal como aparecen en el chat para el lado del restaurante (para excluir sus mensajes). Repetible.",
    )
    ap.add_argument("--min-repeticiones", type=int, default=3, help="Mínimo de mensajes similares para considerarlo un patrón")
    args = ap.parse_args()

    archivos = sorted(glob.glob(os.path.join(args.carpeta, "*.txt")))
    if not archivos:
        print(f"No se encontraron archivos .txt en {args.carpeta}")
        return

    nombres_negocio = args.nombre_negocio or ["Lupita", "Mr. Mechada", "Terraza"]
    grupos = agrupar_preguntas(archivos, nombres_negocio)

    candidatos = []
    for clave, ejemplos in sorted(grupos.items(), key=lambda kv: -len(kv[1])):
        if len(ejemplos) < args.min_repeticiones:
            continue
        candidatos.append({
            "palabras_clave_detectadas": clave.split(),
            "veces_repetido": len(ejemplos),
            "ejemplos": sorted(set(ejemplos))[:5],
            "respuesta_sugerida": "",
        })

    with open(args.salida, "w", encoding="utf-8") as f:
        json.dump(candidatos, f, ensure_ascii=False, indent=2)

    print(f"Analizados {len(archivos)} chats. {len(candidatos)} patrones candidatos guardados en {args.salida}.")
    print("Revisa ese archivo, completa 'respuesta_sugerida' en los que valgan la pena")
    print("y pásalos a whatsapp-assistant/knowledge/faqs.json con el mismo formato.")


if __name__ == "__main__":
    main()
