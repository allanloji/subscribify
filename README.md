
# Subscribify


Subscribify is a project that enables users to craft and dispatch newsletters effortlessly. With Subscribify, you can create engaging newsletters, manage subscriber lists, and schedule distributions seamlessly. 

## Features

-  User can upload a pdf or png image (the newsletter)
- User can submit an email list of recipients of the newsletter
- User can add a single email to the recipient list
- User can click a button to trigger the newsletter submission
- PDF of png document attached to the email
- Recipient users can unsubscribe from specific newsletter
- Email is personalized and using html format
- Statistics dashboard
- Newsletter sending can be scheduled




## Tech Stack

**Client:** React, Nextjs, Typescript, Emotion, Tanstack Query, Vitest

**Server:** Nestjs, Postgres, Prisma, Typescript, AWS SES


## Installation
1. Add .envs files in root, api, and web folders (use .env.example for reference)

2. Install Subscribify with docker-compose

```bash
    docker-compose up --build
```
3. Run migrations
```bash
    docker-compose exec api npm run prisma:migrate
```
4. Seed the DB
```bash
    docker-compose exec api npm run seed
```
The API is run on port 5000, the web dashboard on port 3000.
- [Web](http://localhost:3000/)
- [API](http://localhost:5000/)


## Documentation

- [API Swagger](http://localhost:5000/api)


