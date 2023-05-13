const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dbManager = require("./db");

app.use(bodyParser.json())

function handlers(app){
    app.post("/page", async (req,res) => {

        dbManager.insertPage(req.db,req.body.title,req.body.content);

        res.send(await dbManager.listPages(req.db));
    })

    app.get("/page", async (req,res) => {
        res.send(await dbManager.listPages(req.db));
    });

    app.get("/page:id", async (req,res) => {
        console.log(req.params.id);
        res.send(await dbManager.getPage(req.db,req.params.id));
    });
}

dbManager.initDB().then(db => {
    let app = express();
    app.use(function(req, res, next) {
        req.db = db;
        next();
    });
    app.use(bodyParser.json());
    handlers(app);
    return app;
}).then(app => {
    app.listen(4000)
});
