var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var pg = require ('pg');

var con_string = 'tcp://Dell-pc:rainbow@localhost/chatdb';

var pg_client = new pg.Client(con_string);
pg_client.connect();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
 res.sendFile(__dirname + '/about.html');
});
app.get('/try_it', function(req, res) {
 res.sendFile(__dirname + '/index.html');
   // res.render('about', { });
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
/*socket.on('chat message', function(data){
	console.log(data.msg1 + " encrypted to " + data.msg2);
    io.emit('chat message', {msg1:data.msg1});
  });*/
socket.on('chat message', function(data){
	console.log(data.msg1 + " encrypted to " + data.msg2 + ", gender = "+data.gender);
  // pg.connect(pg_client, function(err, client) {
  // if (err) return console.log(err);
  // else
    pg_client.query("INSERT INTO chat values($1,$2,$3,$4)",[data.user,data.gender,data.msg1,data.msg2] ,function(err,results){
      console.log(results);
    // });  
  });
  
    io.emit('chat message', {user:data.user,gender:data.gender,msg1:data.msg1});
  });

  socket.on('disconnect', function(){
  console.log("users now :"+ --user);
	 });

  

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});