const io = require('socket.io')(8000,{
    cors:{
        origin:'*',
        credentials:true
    }
});

const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',(name)=>{
        console.log(`new user`,name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });


    socket.on(  'send',(message)=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]});
    });

    socket.on('disconnect',(reason)=>{
        let name = users[socket.id];
        delete users[socket.id];
        socket.broadcast.emit('leave',{type : name});
    });
})