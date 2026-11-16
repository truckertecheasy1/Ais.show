<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Public forms submit via createServerFn in src/lib/forms.functions.ts, validated by shared zod schemas in src/lib/schemas.ts, inserting with a server publishable client into insert-only RLS tables — keeps writes server-validated without exposing reads.
- Site copy lives in src/lib/i18n.ts and event facts (dates, prizes, categories, hosts) in src/lib/content.ts — single source for translation and rule tests.
- Individual host portrait imports are mapped by stable host ID in src/lib/host-portraits.ts, separate from voting facts — changing presentation must not change stored vote choices.
