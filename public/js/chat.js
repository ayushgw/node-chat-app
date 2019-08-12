const socket = io()

socket.on('message', (msg) => {
    console.log(msg);
})

document.querySelector('#message-form').addEventListener('submit', (event) => {
    event.preventDefault()
    
    const msg = event.target.elements.message.value
    socket.emit('sendMessage', msg, (error) => {
        if(error) {
            return console.error(error);
        }
        console.log('Message delivered!');
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!')
    }

    navigator.geolocation.getCurrentPosition((location) => {
        socket.emit('sendLocation', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }, () => {
            console.log('Location Shared!');
        })
    })
})