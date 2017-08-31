const Express = require("express");

let app = Express();
let port = process.env.PORT || 3000;

app.use(Express.static("public"));

app.get('/', function(req, res){
    res.sendFile("index.html");
});

app.listen(port, function(){
    console.log("listening on port: " + port);
});