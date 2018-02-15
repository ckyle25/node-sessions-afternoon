const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession.js')
const swag = require('./controllers/swag_controller.js')
const auth = require('./controllers/auth_controller.js')
const cart = require('./controllers/cart_controller.js')
const search = require('./controllers/search_controller.js')

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: '@nyth!ng y0u w@nT',
    resave: false,
    saveUninitialized: false
    })
)
app.use(checkForSession)
app.use( express.static( `${__dirname}/../public/build` ) );


app.get('/api/swag/',swag.read)
app.post('/api/login/',auth.login)
app.post('/api/register/',auth.register)
app.post('/api/signout/',auth.signout)
app.get('/api/user',auth.getUser)

//Cart
app.post('/api/cart',cart.add)
app.post('/api/cart/checkout/',cart.checkout)
app.delete('/api/cart/',cart.delete)

//Search
app.get('/api/search/',search.search)

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );
