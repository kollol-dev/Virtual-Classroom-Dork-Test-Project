# Virtual Classroom(Dork Test Project)

I've used mysql database and designd the database at [here](https://dbdiagram.io/d/61a692908c901501c0da2e69).

Deployed at [heroku](https://virtual-classroomm.herokuapp.com/)
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

#### Teacher

| Endpoint                                      | Method | Purpose                 |
| --------------------------------------------- | ------ | ----------------------- |
| /api/v1/admin/auth/login                      | post   | Admin's Login           |
| /api/v1/admin/auth/logout                     | post   | Admin's Logout          |
| /api/v1/admin/teacher/classroom/get/paginate  | get    | Paginate all classrooms |
| /api/v1/admin/teacher/classroom/add/new       | post   | Add new classroom       |
| /api/v1/admin/teacher/classroom/end/:class_id | put    | End specific class      |

| Endpoint                                                      | Method | Purpose                                    |
| ------------------------------------------------------------- | ------ | ------------------------------------------ |
| /api/v1/admin/teacher/classroom/:class_id/posts/get/paginate  | get    | Paginate all posts of a classroom          |
| /api/v1/admin/teacher/classroom/:class_id/posts/add/new       | post   | Add new post(Exam/Assignment) in classroom |
| /api/v1/admin/teacher/classroom/:class_id/posts/result/submit | put    | Submit result of a post in a classroom     |

#### Student

| Endpoint                                                | Method | Purpose                        |
| ------------------------------------------------------- | ------ | ------------------------------ |
| /api/v1/student/classroom/subscribe                     | post   | Subscribe into a class         |
| /api/v1/student/classroom/:class_id/posts/get/paginate  | get    | Get upcoming Exam / Asignments |
| /api/v1/student/classroom/:class_id/posts/result/submit | put    | Submit Answer                  |

#### File Upload

| Endpoint            | Method | Purpose        |
| ------------------- | ------ | -------------- |
| /api/v1/upload/file | post   | Uploading File |
