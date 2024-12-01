let express = require('express')
let app = express()
let path = require('path');
let vegrout = require('./routers/vegrout')


let viewrout = require('./routers/viewrout');
let croprout = require('./routers/croprout');
let userrout = require('./routers/userrout');


app.use(express.json())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'Public')));

app.use('/', viewrout);
app.use('/api/v1/vegetableprice', vegrout)
app.use('/api/v1/croprices', croprout)
app.use('/api/v1/users', userrout)

module.exports = app;