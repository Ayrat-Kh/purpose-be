# About the project
This is a backend that helps summarize your dreams, fears, skills in a couple of sentences accelerated by open ai.

# How to run
Docker and make should be preinstalled.

## Preconfigure environment variables


```
cp .env.example .env
```

Replace in .env values according to the instructions below.

Create auth0 application and auth and replace values below

```
AUTH0_AUDIENCE=
AUTH0_ISSUER_URL=
AUTH0_CLIENT_ID=
```

Can be left as is unless the app is running in another domain.
```
AUTH0_CALLBACK_URL=http://localhost:3000/sso/auth0/callback
```

Put any random key for signing cookies
```
AUTH0_COOKIE_SIGN_KEY=
```

Can be left as is unless default config is changed
```
DATABASE_URL="postgresql://test_db:test_db@localhost:5432/test_db"
```

Set [open AI](https://openai.com) key
```
OPENAI_API_KEY=
```

Can be left as is unless frontend or backend domains are changed.
```
FRONTEND_URL=http://localhost:3001
BACKEND_URL=http://localhost:3000
```

Set keys from [resend.com](https://resend.com/)
```
EMAIL_RESEND_KEY=
EMAIL_FROM=no-reply@test.com
```

Finally run the app

```
1. pnpm install
2. pnpm prisma generate
3. make init-db
4. pnpm run start:dev
```

# Run tests
```
pnpm run test
```