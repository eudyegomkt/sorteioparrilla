# Sorteio do Dia do Cliente — Parrilla

Site premium de participação para 20 patrocinadores.

## O que já está pronto
- Landing page responsiva e mobile-first.
- Logo do sorteio e elemento da Parrilla incluídos.
- Seção de regras.
- Grade para 20 patrocinadores.
- A pasta `patrocinadores/` carrega automaticamente `patrocinador01` até `patrocinador20` (PNG/JPG/JPEG/WEBP).
- Barra de progresso 0/20.
- Fluxo de "seguir" e conclusão visual.
- Formulário de participação.
- Geração de número de participação para demonstração.
- Área administrativa visual para preparar patrocinadores.
- Layout preparado para integração com backend.

## IMPORTANTE — produção
A versão entregue é uma base funcional de front-end. Para um sorteio público, NÃO use localStorage como mecanismo de segurança.

Conecte:
1. Backend/API (Node/Next.js, por exemplo).
2. PostgreSQL/Supabase.
3. Cloudflare Turnstile ou solução equivalente.
4. OTP por WhatsApp/SMS.
5. Rate limiting e bloqueio por IP/device/session.
6. Regra única de participação no banco com índice/constraint.
7. Logs antifraude.
8. HTTPS.
9. Política de privacidade e regulamento do sorteio.

Também é importante validar juridicamente as regras da promoção/sorteio e as exigências aplicáveis no Brasil antes de publicar.

## Personalização
- Substitua os 20 nomes/links em `app.js` ou conecte o admin a um banco.
- Para cada patrocinador, defina `instagram` com o link real.
- Troque os placeholders de logo pela logo de cada patrocinador.
- Ajuste prêmio, datas e regulamento conforme o sorteio.

Abra `index.html` para visualizar o site.
Abra `admin.html` para visualizar o painel de preparação.
