const express = require("express");
const app = express();

app.set( 'view engine', 'pug'); // set engine
app.set( 'views', 'views'); // set views

const db = require("./util/database"); // connect to database

const siteRoutes = require("./routes/site");

const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");

app.use( bodyParser.urlencoded({extended: false})); // middleware for body
app.use( express.static( path.join(__dirname, 'public')));
app.use(siteRoutes.routes);

app.get('*', function(req, res) {
    res.render('notFound',
        {
            title: "404 Page",
            subtitle: "Either you can't type or we broke something."
        }
    );
})

let port = 6080;
const server = http.createServer(app);
server.listen(port);
console.log(`Listening on http://localhost:${port}`);