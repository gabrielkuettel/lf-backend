## Getting Started

1. Clone this repo
2. `cd` into this directory and run `yarn`
3. `cp .env.example .env` to copy the example environment variables
4. `yarn dev` to start the server and seed the database
5. `open http://localhost:3000/admin` to access the admin panel
6. Login with email `admin@admin.com` and password `admin`

**Note**: To use the custom `/ai` route, you need to provide a valid API key for [OpenAI](https://openai.com/). This is only necessary if you want to use the `/ai` route, which demonstrates custom Express routes that uses Payload's authentication and access control. The `ai` route takes a `content` param with a message and returns a response from OpenAI's GPT-4 API. For example, you can try this route in the browser: http://localhost:3000/ai?content=add%20two%20plus%20two

## How it works

The [`users`](src/collections/Users.ts) collection exposes all [authentication](https://payloadcms.com/docs/authentication/operations) and [access control](https://payloadcms.com/docs/access-control/overview) operations needed to create a fully custom workflow on your front-end using the REST or GraphQL APIs, including:

- `Me`
- `Login`
- `Logout`
- `Refresh Token`
- `Verify Email`
- `Unlock`
- `Forgot Password`
- `Reset Password`

The [`cors`](https://payloadcms.com/docs/production/preventing-abuse#cross-origin-resource-sharing-cors), [`csrf`](https://payloadcms.com/docs/production/preventing-abuse#cross-site-request-forgery-csrf), and [`cookies`](https://payloadcms.com/docs/authentication/config#options) settings are also configured to ensure that the admin panel and front-end can communicate with each other securely.

### Access Control

Basic role-based access control is setup to determine what users can and cannot do based on their roles, which are:

- `admin`: They can access the Payload admin panel to manage your application. They can see all data and make all operations.
- `user`: They cannot access the Payload admin panel and have a limited access to operations based on their user.

A `beforeChange` field hook called `protectRoles` is placed on this to automatically populate `roles` with the `user` role when a new user is created. It also protects roles from being changed by non-admins.

### Seed

On boot, a seed script is included to create a user with email `admin@admin.com`, password `admin`, the role `admin`.

> NOTICE: seeding the database is destructive because it drops your current database to populate a fresh one from the seed template. Only run this command if you are starting a new project or can afford to lose your current data.

