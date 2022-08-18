# Meraki

To start the project u need to run `npm start`<br>
To start in development u need to run `npm run dev`<br>
To run lint test u need to run `npm run lint`<br>

## Folder Structure
```
/src
  /controllers -- business logic for handling API endpoints
  /helpers -- modules for common functions that sit outside controllers/models
  /routes -- defines API endpoints and passes requests to corresponding controllers
    /api -- api routes that need a valid authentication
    /middlewares -- main handler of routes validations
    /publicApi -- the main public api all routers that not need authenticate should be here
    index.js -- the main Express app
  /services -- all business logic should be here, db queries and utilities
  /util -- functions that are often used should be here 
  `app.js` -- Main app creation. the load of db and `middlewares`.
.env -- Needed for database connection variables and other config.
```

Lint the code with [ESLint](https://eslint.org):

```sh
npm run lint
npm run lint:fix # Fix issues
```

## License
MIT
# meraki-be
