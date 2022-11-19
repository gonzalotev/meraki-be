require('dotenv').config();
require('./src/global');

const App = require('./src/app');
const app = new App();

app.init();
