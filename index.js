var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
 res.sendFile(__dirname + '/index.html');
});

var user=0;

io.on('connection', function(socket){
  console.log("user :"+ ++user);

 
socket.on('connected',function(data){
	socket.emit("connected",{username:data.username, gender:data.gender});
});
socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
socket.on('chat message', function(data){
	console.log("msg="+data.msg);
    io.emit('chat message', {msg:data.msg});
  });

  socket.on('disconnect', function(){
  console.log("users now :"+ --user);
	 });

  

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});