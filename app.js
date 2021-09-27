const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const GameRoute = require('./routes/pingpong');

const app = express();

const PORT = process.env.PORT || 8000;

//ejs engine
app.set('view engine', 'ejs');

//middlewares
app.use(expressLayouts);

if (process.env.NODE_ENV === 'production') {

    app.use(express.static('public'));
}

//route
app.get('/', GameRoute);

app.listen(PORT, () => console.log(`Server running on port, http://localhost:${PORT}`));