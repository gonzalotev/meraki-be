ENUT-BE

To start the project u need to run `npm start`<br>
To start in development u need to run `npm run dev`<br>
To run lint test u need to run `npm run lint`<br>
To run migrations u need to run `npm run db:migrate`<br>
To run seed u need to run `npm run db:seed`

## Folder Structure
```
/db
  /migrations
  /seeds
/src
  /controllers -- business logic for handling API endpoints
  /helpers -- modules for common functions that sit outside controllers/models
  /models  -- simple collections of db queries and utilities for user data
    /postgres -- postgres models
  /routes -- defines API endpoints and passes requests to corresponding controllers
    /api -- api routes that need a valid authentication
    /middlewares -- main handler of routes validations
    /public-api -- the main public api all routers that not need authenticate should be here
    index.js -- the main Express app
  /services -- all business logic should be here
  /util -- functions that are often used should be here 
  `app.js` -- Main app creation, everything converge here. the load of `mongoose`, `middlewares` u need and pre config for the express openapi
knexfile.js -- defines connection for SQL databases only used for migrations run.
package.json -- defines scripts for utilities like migrations and seeds
.env -- Needed for database,port and email
```

## Testing

Run tests:

```sh
npm run test
```

Lint the code with [ESLint](https://eslint.org):

```sh
npm run lint
npm run lint:fix # Fix issues
```

### Code review

Create a pull request for any changes in the following format:

```md
# Overview

Basic overview of the changes made.

## Changes

- A more detailed list
- Of things that have changed

## How to test

1. List instructions for how to test
2. Make sure it's detailed and includes the exact steps
```

## Contribution guidelines

### Git guidelines

The repository has three primary branches:

1. `master` (production)
2. `test` (staging) (releases merged into `master`)
3. `develop` (development) (releases merged into `test`)

When you work, create one of the following branches:

#### `feat/...`

Created from `develop`, to be merged back into `develop`.

#### `fix/...`

Created from `develop`, to be merged back into `develop`.

#### `refactor/...`

Created from `develop`, to be merged back into `develop`.

#### `chore/...`

Created from `develop`, to be merged back into `develop`.

#### `hotfix/...`

Created from `master`, to be merged back into `master`, `test`, and `develop`.

### commit messages

The commit message should has the following format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Example:
```
fix(middleware): ensure Range headers adhere more closely to RFC 2616

Add one new dependency, use `range-parser` (Express dependency) to compute
range. It is more well-tested in the wild.

Close #UDT-2310
```

## License
MIT

##### @indec-it