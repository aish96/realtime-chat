var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
 res.sendFile(__dirname + '/index.html');
});

var user=0;

io.on('connection', function(socket){
  console.log("user :"+ ++user);
socket.on('chat message', function(msg){
	console.log("msg="+msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', function(){
  console.log("users now :"+ --user);
	 });

  

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});