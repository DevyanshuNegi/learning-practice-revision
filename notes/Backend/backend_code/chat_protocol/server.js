import net from 'node:net'
//  here node:net because its built-in package of node

const clients = []


const server = net.createServer((socket) => {
    console.log("Client Connected");

    socket.setEncoding('utf-8')
    socket.authenticated = false;
    socket.joined = false;
    socket.username = ''

    clients.push(socket);


    // clients.push(socket);

    socket.write("Welcome to the CHAT server ! \n")
    socket.write("Type your message and press enter to broadcast")

    socket.on("data", (chunk) => {
        //  parse the message

        const parsedMessage = parseMessage(chunk.toString());

        if(!parsedMessage) {
            console.error('Invalid message format');
            return;
        }

        const response = handleMessage(socket, parsedMessage);
        if (response) socket.write(response);
    })

    socket.on("end", () => {
        const index = clients.indexOf(socket)

        if (index !== -1) {
            clients.splice(index, 1);
        }

        console.log("A client disconnected ")
        console.log(`total connected clients ${clients.length}`);
    })

    socket.on('error', (err) => {
        console.log("error : ", err);
    })
})


server.listen(1337, () => {
    console.log("Server listening on port 1337")

})


function handleMessage(socket, parsedMessage) {
    switch(parsedMessage.command) {
        case 'AUTH':
            handleAuth(socket, parsedMessage);
            break;
        case 'JOIN':
            handleJoin(socket, parsedMessage);
            break;
    }
}


function handleAuth(socket, parsedMessage) {
    const user = parsedMessage.header['User'];
    const token = parsedMessage.header['Token'];

    if(user && token && token === 'secret123') {
        socket.authenticated = true;
        socket.username = user

        socket.write(formatResponse('OK', 'AUTH', {'Content-Length': 0}, ''))
    }
}

 
function formatResponse(command, responseFor, headers, body, user) {
    const startLine = `CHAT/1.0 ${command}`;
    const headerLines = [];

    headerLines.push(`Response-For: ${responseFor}`);

    if (user) {
        headerLines.push(`User: ${user}`);
    }

    for (const key in headers) {
        headerLines.push(`${key}: ${headers[key]}`);
    }

    return `${startLine}\r\n${headerLines.join('\r\n')}\r\n\r\n${body}`;
}

function parseMessage(message) {

    /**
     * CHAT/1.0 AUTH
     * User: alice
     * Token: secret123
     * Content-Length: 0
     */

    console.log("message ", message);

    const parts = message.split('\r\n\r\n')

    if (parts.length < 2) return null; // Missing body

    const headerPart = parts[0];
    const body = parts[1];

    const headerLines = headerPart.split('\r\n');
    if (headerLines.length === 0) return null;

    const firstLine = headerLines[0].split(' ');
    if (firstLine.length < 2) return null;

    const protocolVersion = firstLine[0];
    const command = firstLine[1];

    const header = {}
    let contentLength = 0;
    for(let i = 1; i<headerLines.length; i++) {
        const line = headerLines[i];

        const pair = line.split(':')
        header[pair[0].trim()] = pair[1].trim();

        if (pair[0].trim().toLowerCase() === 'content-length') {
            contentLength = parseInt(pair[1].trim(), 10);
        }
    }

    if(body.length !== contentLength) {
        console.warn("len not match");
    }

    return { protocolVersion, command, header, body}
}