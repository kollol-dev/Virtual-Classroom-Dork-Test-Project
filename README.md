# Virtual Classroom(Dork Test Project)

I've used mysql database and designd the database at [here](https://dbdiagram.io/d/61a692908c901501c0da2e69).


## Setup


Copy from `.env.example` to `.env`
```
cp .env.example .env
```
Set `DB_CONNECTION=mysql`

now install and generate unique application key
```
npm install 
adonis key:generate
```
#### N.B: You may need to install `adonis` cli globally into your machine before using adonis command. For this purpose you need to run the following command

```
 npm i -g @adonisjs/cli
```

### Migrations

Run the following command to run startup migrations.

```
adonis migration:run
```

### Run development server
```
adonis serve --dev
```

Default port will be `3333`
application will be serving at `http://localhost:3333`


### REST APIs

| Endpoint                                  | Method      | Purpose             |
| ----------------------------------------- | ----------- | ------------------- |
| /api/admin/auth/login                     | post        | Admin's Login       |
