# ADENDO ao brief de correções — para o Claude (18/nov/2026, noite)

> Estado real verificado pela Muse às 20:40 MST. Leia antes de executar o
> brief `brief-correcoes-theais-repo-2026-11-18.md`.

## O que já está PRONTO neste repositório (GitHub Ais.show)

As duas correções do brief já foram **implementadas e commitadas aqui** pela
Muse — servem de implementação de referência, é só portar pro projeto:

1. **Preços de patrocínio** — commit `339ff0a` em `src/lib/content.ts`
   (SPONSOR_TIERS): Anchor "US$ 25,000+", Platinum "US$ 15,000+",
   Silver "US$ 7,500+", Category Partner "US$ 2,500+".
2. **Formulário /enter com canal + obra** — commits até `f6f9b52`:
   `src/components/site/Forms.tsx` (campos channel_url e work_url +
   microcopy "We judge your work on your channel — link the video or post."),
   `src/lib/schemas.ts` (entrySchema com os dois campos obrigatórios),
   `src/components/site/useSubmit.ts`, `src/integrations/supabase/types.ts`.

## O que já está PRONTO no banco (não refazer)

A migration **já foi aplicada no banco do projeto** pela Muse (via
query_database do conector, 19/nov ~03:33 UTC) e conferida na
information_schema: a tabela `entry_interest` **já tem** as colunas
`channel_url` e `work_url`. O arquivo da migration está em
`supabase/migrations/20261119000000_entry_channel_links.sql` só como registro.

## O que falta (só você, no projeto)

O site publica a partir do **código do projeto Lovable**, que NÃO puxa
automaticamente os commits deste repositório (verificado: o histórico do
projeto termina no commit 83cf7294, de hoje 16:33 UTC — os commits daqui não
estão lá, e o deploy que a Muse disparou republicou o estado atual do
projeto, sem as correções).

Então:
1. Portar as duas correções pro código do projeto (os diffs estão nos commits
   citados acima — é copiar o conteúdo dos arquivos).
2. Publicar a partir do projeto.
3. Devolver o retorno em `docs/RETORNO-CORRECOES-THEAIS-2026-11-18.md`:
   a Muse re-audita na tela (preços nos 4 tiers, envio de teste do /enter
   gravando channel_url e work_url, votação intacta).
