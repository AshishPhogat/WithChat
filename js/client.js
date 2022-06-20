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
    element.style.padding = "12px";
    container.append(element);
    // container.scrollTop = height;
}

const appendText = (name,message,position)=>{
    const card = `<div class="message`+` ${position}">
    <h3 class="author">${name}:</h3>
    <p class="message_text">
        ${message}
    </p>
</div>`

    container.insertAdjacentHTML('beforeend',card);
    let height = container.scrollHeight;
    console.log(`${height}`);
    container.scrollTop = height;
}


socket.on("user-joined",(name)=>{
    console.log("entered");
    append(`${name} joined`,'right');
});


socket.on("receive",(data)=>{
    // append(`${data.name}:${data.message}`,'right');
    appendText(data.name,data.message,'right');
})

socket.on('leave',(data)=>{
    append(`${data.type} left the chat`,'left');
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    if(message != ""){
        // append(`you : ${message}`,'left');
        appendText("You",message,'left');
        socket.emit('send',message);
        messageInp.value = "";
    }
});