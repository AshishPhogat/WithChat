const socket = io('http://localhost:8000');

const form = document.getElementById("send_container");
const messageInp = document.getElementById("messageInp");
const container = document.querySelector(".message_inbox");
// console.log(container);


const person  = prompt('enter your name to join chat');
socket.emit('new-user-joined',person);

const append = (message,position)=>{
    const element = document.createElement('div');
    element.innerHTML = message;
    element.classList.add("message");
    element.classList.add(position);
    container.append(element);
}

// const appendText = (name,message,position)=>{
//     const card = `<div class="message">
//         <div class="author">
//             <h3>${name}</h3>
//         </div>
//         <div id="message">
//             <p>${message}</p>
//         </div>
    
//     </div>`;

//     container.insertAdjacentHTML('afterend',card);
//     const text = document.querySelector(".message");
//     text.classList.add(position);
// }


socket.on("user-joined",(name)=>{
    console.log("entered");
    append(`${name} joined`,'right');
});


socket.on("receive",(data)=>{
    append(`${data.name}:${data.message}`,'right');
    // appendText(data.name,data.message,'right');
})

socket.on('leave',(data)=>{
    append(`${data.type} left the chat`,'left');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    if(message != ""){
        append(`you : ${message}`,'left');
        socket.emit('send',message);
        messageInp.value = "";
    }
});