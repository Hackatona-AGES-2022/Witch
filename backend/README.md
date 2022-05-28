## Rodando Localmente

Ter instalado:

- NodeJS
- MySQL

Logar com o root do mysql (ex: mysql -uroot -pSuaSenhaDoRoot) e rodar os seguintes comandos:

```
CREATE USER 'hackathona'@ 'localhost' IDENTIFIED BY 'hackathona';
CREATE DATABASE hackathona;
GRANT ALL PRIVILEGES ON hackathona.* TO 'hackathona'@'localhost';
```

Na pasta raiz, rodar:

`npm install` para instalar as dependências

`npm run start:dev` para iniciar o servidor

---

## KNEX

npx knex migrate:make <migration-name>

npx knex migrate:latest

## Docker

### Local

`docker build -t app .`

`docker run -p 8080:80 app`

## Database

There is an issue with knex and migration names. Knex stores the file extension in the table, so there is a problem on running knex in a production build because migrations are in `js` and not in `ts` as it is on development. To solve that, a `migrationSource` was created but it's needed to update the table on DB `knex_migrations` removing the extension;

## Environments

### DEV

All infra is on Heroku, synced with develop branch

`Frontend`:

`Backend`:

`Database`:
