# The AIs — Brief de correções (rota: repositório)

> **Origem:** ordens da Thais em 18/nov/2026 (18:55–19:50 MST), a partir da auditoria
> funcional pós-publicação do mesmo dia.
> **Contexto:** o domínio **ais.show NÃO está publicado com este site** (ainda aponta
> pro site antigo da Vercel) — trabalhar sem vitrine, mas com o padrão da casa:
> só vale como pronto depois de testado.
> **Execução:** PELO REPOSITÓRIO (GitHub `Ais.show`), sem depender de créditos do
> Lovable; publicar pelo repo ao concluir. **Retorno obrigatório** neste repo:
> `docs/RETORNO-CORRECOES-THEAIS-2026-11-18.md` com o que mudou, os arquivos
> tocados e o estado da publicação.

## Correção 1 — Preços de patrocínio (tabela aprovada em 10/nov)

O site hoje mostra valores ERRADOS. Trocar para a tabela aprovada e garantir o
4º tier visível:

| Tier | Hoje (errado) | Aprovado |
|---|---|---|
| Anchor | US$ 15.000 | **US$ 25.000+** |
| Platinum | US$ 7.500 | **US$ 15.000+** |
| Silver | US$ 2.500 | **US$ 7.500+** |
| Category Partner | (conferir) | **US$ 2.500+** |

A tabela aprovada é a que fecha a conta do prêmio condicional de US$ 35 mil
(anchor + 300 inscrições de US$ 25 + 1 category). Não mexer em votação,
formulários, contagem regressiva da gala (11/dez/2027), regras, privacidade e
termos — já auditados como funcionais.

## Correção 2 — Inscrição interligada ao canal do criador (requisito da Thais)

- O formulário de inscrição/interesse passa a exigir, além do e-mail (lead, que
  já existe): **link do canal do criador** (YouTube e/ou Instagram) e **link da
  obra específica** (vídeo do YouTube ou post/reel do Instagram).
- Motivo: os juízes avaliam a obra **no canal do criador** — é lá que esse
  trabalho vive hoje (vídeo no YouTube; mini novelas de IA no Instagram). O link
  também funciona como prova de autoria.
- Gravar os campos novos na estrutura de inscrições/interesse já existente, sem
  quebrar o que já grava no banco.
- Microcopy junto aos campos: "We judge your work on your channel — link the
  video or post."

## Fora deste brief (não misturar)

- **Pagamento das inscrições (US$ 25, Stripe):** a estrutura pode ser preparada,
  mas a ativação depende da conta e das chaves Stripe da Thais — passo separado.
  Não inventar chaves nem conectar conta de terceiros.
- **Domínio ais.show:** a virada é feita na Namecheap (conta tkmark) no momento
  da republicação — não é deste brief.
- **Podcast:** episódios em vídeo no YouTube (canal ainda a criar), cortes no
  Instagram; a página atual é a votação da dupla de apresentadores.

## Verificação (executar e registrar no retorno)

- [ ] Abrir a URL pública deslogado e conferir os 4 tiers na tela.
- [ ] Enviar 1 inscrição de teste com link de canal + link da obra e conferir a
      gravação no banco.
- [ ] Retestar rápido: votação e os demais formulários continuam gravando.
