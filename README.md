# Geneve Emotion Wheel app

## Used technologies

- **NextJS** 💻 - React framework [learn more](https://nextjs.org/)
- **Supabase** 🔥 - Providing PostgresSQL DB [learn more](https://supabase.com/)
- **Prisma** 💎 - Database schema controller and ORM [learn more](https://prisma.io/)

## Prerequisites

[Node.js](https://nodejs.org) latest version installed

## Getting Started

### 1. Clone the repository and install dependencies

```
git clone https://github.com/noohv/gew.git
cd gew
npm install
```

### 2. Create [Supabase](https://supabase.com/) project

### 3. Create environment file

```bash
# .env

# Prisma DB URLs - can be found in Databases > Connection pooling
# Ensure you set the port to 6543 on this page too!
DIRECT_URL="postgres://postgres:__DATABASE_PASSWORD__.__PROJECT_ID__.supabase.co:5432/postgres"
DATABASE_URL="postgres://postgres:__DATABASE_PASSWORD__.__PROJECT_ID__.supabase.co:6543/postgres?pgbouncer=true"
```

### 4. Run Prisma to perform database migration

```bash
npx prisma migrate dev --name init
```

```bash
npx prisma generate
```

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
