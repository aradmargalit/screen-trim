# Screen Trim

Simple application to track participant progress in February 2024 screen time reduction challenge (Scren Trim)

# Development

Using Node 20.x.y:

```sh
npm install
npm run dev
```

## Secrets
The app relies on a connection to Supabase. The environment variables required to connect should be stored in `.env.local`. To see a sample of the format, check out [`.env.sample.local`](./.env.sample.local).

## Types
To generate types from the database automatically, you need the [Supabase CLI](https://supabase.com/docs/guides/cli/getting-started), which you can get for Mac using Brew.

```sh
brew install supabase/tap/supabase
supabase login
supabase gen types typescript --project-id lutinymeuvrbcauolglm > database.types.ts
```