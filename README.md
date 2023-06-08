# Simple Typescript Backend

This is just a simple backend to build on later on. <br>
Currently has 2 db connections of Redis and Postgres. 
For the project there was no ORM used for Postgres, but can be integrated some ORM like Sequelize or TypeORM for commercial needs. <br>

## Installation

- Download the code
- Copy `.env.example` file as `.env`

```bash
cp .env.example .env
```

- Edit the `.env` file correspondingly
- Install all packages and dev dependencies

```bash
npm install
```

> Additionally you could run `npm run prepare` to prepare husky hooks

- Run the server in dev mode

```bash
npm run dev
```

> To run on production, use `start` instead `dev`

There is an example of User controller with routing, service and repository logic to look at and copy from.

## Future plans

- [ ] Setup Docker for Running the project as a container
- [ ] Add ORM option for Postgres (maybe in another branch)
- [ ] Add test via Jest
