import net from 'node:net'
//  here node:net because its built-in package of node

const clients = []


const server = net.createServer((socket) => {
    console.log("Client Connected")  

    clients.push(socket);

    socket.write("Welcome to the Coders TCP Chat ! \n")
    socket.write("Type your message and press enter to broadcast")

    socket.on("data", (chunk) => {
        const message = chunk.toString().trim();

        clients.forEach((client) => {
            client.write(`Client Says : ${chunk}`)
        })


    })

    socket.on("end", () => {
        const index = clients.indexOf(socket)

        if(index!==-1) {
            clients.splice(index, 1);
        }

        console.log("A client disconnected ")
        console.log(`total connected clients ${clients.length}`);
    })

    // socket.on('data', (chunk) => {
    //     console.log("Recieved : ", chunk.toString());

    //     socket.write(`Recieved : ${chunk}`);

    //     socket.end();
    // })

    // Error handling
    socket.on('error', (err) => {
        console.log("error : ", err);
    })
})


server.listen(1337, () => {
    console.log("Server listening on port 1337")

})


// nc localhost 1337
// to connect to server

// in wireshark > localhost lo > filter by tcp.port == 1337
