# Asistente de WhatsApp — La Terraza de Lupita y Mr. Mechada

Asistente automático de WhatsApp construido en **n8n**, conectado a la
**API oficial de WhatsApp Cloud (Meta)**. Responde primero con reglas fijas
(gratis) y solo usa IA de pago cuando la pregunta no está en las FAQs, para
mantener el costo lo más bajo posible.

## Por qué esta combinación

| Opción | Costo | Estabilidad |
|---|---|---|
| **WhatsApp Cloud API (oficial) + n8n self-hosted** ✅ elegida | Gratis hasta 1,000 conversaciones/mes (política de Meta 2024+, revisar vigente), luego se cobra por conversación. n8n en VPS: ~$4-6 USD/mes | Muy alta. Es la vía soportada por Meta, no se desconecta ni banea el número. |
| Librerías no oficiales (Baileys, whatsapp-web.js) | Gratis | Riesgo real de que Meta bloquee el número; se cae si actualizan WhatsApp o cambias de celular. **No recomendada para un negocio.** |
| n8n Cloud (plan de pago) | Desde ~$20 USD/mes | Alta, pero más cara que el VPS. |

Con FAQs cubriendo las preguntas más comunes (horario, dirección, domicilios,
reservas, menú, pagos), la gran mayoría de mensajes **no necesitan IA** y por
tanto no generan costo de modelo — solo el costo fijo del VPS.

## Estructura de esta carpeta

```
whatsapp-assistant/
├── n8n-workflow.json          # Workflow para importar en n8n
├── knowledge/
│   ├── faqs.json              # Preguntas frecuentes -> respuesta fija
│   └── negocio.json           # Datos del negocio + tono, para el respaldo de IA
├── scripts/
│   └── extraer_faqs_de_chats.py  # Ayuda a sacar preguntas frecuentes de tus chats exportados
└── README.md
```

## Paso 1 — Cuenta de WhatsApp Business Cloud (Meta)

1. Crea o usa una cuenta en [Meta for Developers](https://developers.facebook.com/).
2. Crea una app tipo "Business" y agrega el producto **WhatsApp**.
3. Verifica el negocio en **Meta Business Manager** (sube documento del
   restaurante: RUT/cámara de comercio o equivalente). Esto puede tardar
   1-3 días hábiles.
4. Agrega el número de WhatsApp del restaurante (debe ser un número que NO
   esté ya activo en la app normal de WhatsApp, o hacer la migración oficial
   si ya lo usan).
5. Anota: `Phone Number ID`, `WhatsApp Business Account ID` y genera un
   **token de acceso permanente** (token de sistema, no el temporal de 24h).

## Paso 2 — VPS con n8n

Recomendado: VPS económico (Hostinger, DigitalOcean, Contabo — desde
~$4-6 USD/mes), con Docker.

```bash
# En el VPS (Ubuntu recién instalado)
curl -fsSL https://get.docker.com | sh

mkdir -p ~/n8n-data
docker run -d --name n8n \
  --restart unless-stopped \
  -p 5678:5678 \
  -e N8N_HOST=tu-dominio.com \
  -e WEBHOOK_URL=https://tu-dominio.com/ \
  -e GENERIC_TIMEZONE=America/Bogota \
  -v ~/n8n-data:/home/node/.n8n \
  n8nio/n8n
```

Después pon un proxy inverso con HTTPS (Caddy o Nginx + Certbot) apuntando
tu dominio/subdominio a `localhost:5678`, porque **Meta exige que el webhook
sea HTTPS**. Caddy es la opción más simple (certificado automático):

```bash
sudo apt install -y caddy
# /etc/caddy/Caddyfile
# tu-dominio.com {
#   reverse_proxy localhost:5678
# }
sudo systemctl restart caddy
```

## Paso 3 — Importar el workflow

1. Entra a tu n8n (`https://tu-dominio.com`), crea tu usuario admin.
2. **Import from File** → selecciona `n8n-workflow.json` de esta carpeta.
3. Crea las credenciales que pide el workflow:
   - **WhatsApp Cloud - La Terraza de Lupita**: pega el token permanente y el
     `Phone Number ID` de Meta.
   - **Anthropic API Key**: crea una cuenta en
     [console.anthropic.com](https://console.anthropic.com), genera una API
     key y agrégala como credencial tipo "Header Auth"
     (`Authorization: Bearer TU_API_KEY` o el header que pida el nodo).
     El workflow ya usa `claude-haiku-4-5-20251001`, el modelo más económico
     disponible, solo como respaldo cuando no hay match en las FAQs.
4. En el nodo **WhatsApp Trigger**, copia la URL del webhook que genera n8n y
   pégala en Meta (Configuración → Webhooks), junto con un "verify token" que
   inventes tú mismo (debe coincidir en ambos lados).
5. Activa el workflow (toggle arriba a la derecha).

## Paso 4 — Cargar tus FAQs reales

1. Exporta tus chats de WhatsApp del restaurante: abre cada chat → menú (⋮) →
   Más → Exportar chat → **"Sin archivos multimedia"**. Guarda todos los
   `.txt` en una carpeta, ej. `chats_exportados/`.
2. Corre el script de ayuda (no requiere internet ni IA, solo agrupa mensajes
   parecidos):
   ```bash
   python3 scripts/extraer_faqs_de_chats.py chats_exportados/ --salida candidatos_faq.json
   ```
3. Abre `candidatos_faq.json`, revisa los patrones más repetidos y para cada
   uno que valga la pena, complétalo y pásalo a `knowledge/faqs.json` con este
   formato:
   ```json
   {
     "id": "un_id_corto",
     "keywords": ["palabra1", "palabra2"],
     "respuesta": "La respuesta que normalmente da el restaurante"
   }
   ```
4. Completa también `knowledge/negocio.json` con dirección real, zonas de
   domicilio, medios de pago y el tono que normalmente usan (puedes basarte
   en cómo responden en esos mismos chats).
5. En n8n, abre el nodo **Buscar en FAQs** y pega el contenido actualizado de
   `faqs.json` (o, si prefieres no tocar el workflow cada vez, cámbialo por
   un nodo de Google Sheets/Airtable apuntando a una hoja editable — así el
   dueño puede actualizar las respuestas sin entrar a n8n).

## Costos estimados mensuales

- VPS: ~$4-6 USD/mes (fijo).
- WhatsApp Cloud API: gratis hasta el umbral de conversaciones gratuitas de
  Meta; revisa el valor vigente en tu panel de Meta Business, varía por país.
- IA de respaldo (Claude Haiku): solo se cobra por los mensajes que **no**
  encuentran respuesta en `faqs.json`. Con buenas FAQs, para un restaurante
  esto suele ser un costo de centavos de dólar al mes.

## Qué falta que decidas / hagas tú

- Verificar el negocio ante Meta (requiere tus documentos legales).
- Contratar el VPS y el dominio (o subdominio) para el webhook.
- Revisar y completar los datos reales en `knowledge/negocio.json` y
  `knowledge/faqs.json`.
- Decidir si quieres notificación a un WhatsApp/Telegram tuyo cuando un
  cliente pida hablar con una persona (se puede agregar fácilmente al
  workflow).
