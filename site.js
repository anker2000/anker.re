var express = require('express');
var request = require('request');
var process = require('process');


app = express();
app.use(express.static(__dirname + '/build'));
app.set('views', __dirname + '/build');
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.get('/', function(req,res) {
    res.render("app.html");
});
app.listen(8888);

// var ws = require("nodejs-websocket")
// var speed = 2;
// var server = ws.createServer(function (conn) {
// 	console.log("created websocket");
//     conn.on("text", function (e) {
//         var action = JSON.parse(e);
//         if (action.type=="cursor")  {
//         	var mouse = robot.getMousePos();
//         	robot.moveMouse(mouse.x+(action.delta.x*speed),mouse.y+(action.delta.y*speed));
//         } else if (action.type=="scroll") {
//         	var directionY = "down";
        	
//         	if (action.delta.y>0) {
//         		directionY="up"
//         	}
//         	robot.scrollMouse(Math.abs(action.delta.y),directionY);
//         } else if (action.type=="leftclick") {
//         	robot.mouseClick("left");
//         } else if (action.type=="rightclick") {
//         	robot.mouseClick("right");
//         }
//     });
// }).listen(8080);