# Geneve Emotion Wheel app

## Used technologies

- **NextJS** - React framework [learn more](https://nextjs.org/)
- **Supabase** - Providing PostgresSQL DB [learn more](https://supabase.com/)
- **Prisma** - Database schema controller and ORM [learn more](https://prisma.io/)
- **SurveyJS** - Library for making surveys [learn more](https://surveyjs.io/)

## Prerequisites

- [Node.js](https://nodejs.org) latest version installed
- [GitHub](https://github.com/) account
- [Git](https://git-scm.com/download/win) file versioning system
- [GitHub Desktop](https://desktop.github.com/) - **optional**

## How to setup the project

### Fork the repository
![image](https://github.com/noohv/gew/assets/56311522/1a6ff466-8380-4f0e-b704-b57fcc0c99c3)



### Clone the repository and install dependencies

1. Open `cmd`
2. Navigate to folder where to save the local project
```
cd PATH_TO_PROJECT
```
  For example
```
cd desktop
```

3. Clone the project (you can find the link under `Code` button)

![image](https://github.com/noohv/gew/assets/56311522/8a174bf0-138c-4545-960a-3cd18a92ccd1)

```
git clone https://github.com/<your-username>/<repository-name>.git
cd <repository-name>
```

4. Install dependencies
```
npm install
```

### Setup [Supabase](https://supabase.com/)
1. Create new project
2. You can find connection parameters in Project Settings -> Database

### Create environment file
1. Inside project create file `.env`
2. Copy `Connection string` from Supabase
3. Replace [YOUR-PASSWORD] with the password you entered when creating project
4. 

```bash
# example
DATABASE_URL="postgres://[DATABASE-USER]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgres://[DATABASE-USER]:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
```

### Create database

1. In your project folder run:
```bash
npx prisma migrate dev --name init
```


### To run the development server (local):
1. In your project folder run:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel
1. Add new project
2. Import the repository from GitHub

![image](https://github.com/noohv/gew/assets/56311522/d9b1bdc8-6810-4d89-9489-b4e3fd59c6c2)

3. Create Environment Variables (replace _YOUR_DIRECT_URL_ and _YOUR_DATABASE_URL_ with your values)

![image](https://github.com/noohv/gew/assets/56311522/963ea3bf-c597-45eb-96b4-bb6c18bdfaed)

4. Press **Deploy**
