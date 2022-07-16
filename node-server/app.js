//creating a socket.io instance
const io = require('socket.io')(8000,{
    cors:{
        origin:'*',
        credentials:true
    }
});

//ours users array contains all the users at a particular instance of time.
const users = {};


//io is a socket.io instance
io.on('connection',socket=>{
    //socket represents a node on which a single user is chatting and each socket 
    // has a unique id.

    //run when a new user is added
    socket.on('new-user-joined',(name)=>{
        console.log(`new user`,name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    //run when a user pressed the send button
    socket.on(  'send',(message)=>{
        socket.broadcast.emit('receive',{message:message,name: users[socket.id]});
    });

    //run when a user leaves the server or chat
    socket.on('disconnect',(reason)=>{
        let name = users[socket.id];
        console.log(`${name} left the chat`);
        delete users[socket.id];
        socket.broadcast.emit('leave',{type : name});
    });
})