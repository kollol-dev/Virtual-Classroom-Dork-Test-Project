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

Run the following command to run startup migrations and seed Admin.

```
adonis migration:run
adonis seed
```

### Run development server

```
adonis serve --dev
```

Default port will be `3333`
application will be serving at `http://localhost:3333`

### REST APIs

#### Admin

| Endpoint                           | Method | Purpose                 |
| ---------------------------------- | ------ | ----------------------- |
| /api/v1/admin/auth/login           | post   | Admin's Login           |
| /api/v1/admin/teacher/get/paginate | get    | Paginate all teachers   |
| /api/v1/admin/teacher/add/new      | post   | Add new teacher         |
| /api/v1/admin/teacher/edit/:id     | put    | Edit specific teacher   |
| /api/v1/admin/teacher/delete/:id   | delete | Delete specific teacher |
