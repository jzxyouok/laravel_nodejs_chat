var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var redis = require('redis');

server.listen(8890);
io.on('connection', function(socket){
    console.log("conectado!");
    var redisClient = redis.createClient();
    redisClient.subscribe('message');

    redisClient.on('message', function(channels, data){
        console.log("Nova mensagem na fila "+ data['message']);
        socket.emit(channel, data);
    });

    socket.on('disconnect', function() {
        redisClient.quit();
    });
});