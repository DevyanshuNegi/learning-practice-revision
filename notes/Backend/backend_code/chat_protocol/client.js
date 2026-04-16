import readline from "node:readline"
import { stdin, stdout } from "node:process";

import net from 'node:net';

const HOST = 'localhost'
const PORT = 1337


async function startChat() {
    // User interface
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        // prompt: 'OHAI> ',
        prompt: '> ',
        // what is prompt
    });



    // rl.question('What do you think of Node.js? ', (answer) => {
    //     // TODO: Log the answer in a database
    //     console.log(`Thank you for your valuable feedback: ${answer}`);

    //     rl.close();
    // });

    // open tcp connection
    const client = net.createConnection(
        {
            host: HOST,
            port: PORT
        },
        () => {
            console.log("Connected to the server");
        }
    )


    async function ask(que) {
        return new Promise(resolve => rl.question(que, ans => resolve(ans)));
    }

    const username = await ask("Enter Username ")
    const token = await ask("Enter token ")

    const authCommand = buildCommand(
        'AUTH',
        { User: username, Token: token, 'content-length': 0 },
        ''
    )

    client.write(authCommand);
    client.on('data', (data) => {
        console.log("Recieved :", data.toString());
    })

}


function buildCommand(command, headers, body) {

    /**
     * CHAT/1.0 AUTH
     * User: alice
     * Token: secret123
     * Content-Length: 0
     */

    const startLine = `CHAT/1.0 ${command}`;
    const headerLines = []

    for (const key in headers) {
        const header = `${key}:${headers[key]}`
        headerLines.push(header)
    }

    return `${startLine}\r\n${headerLines.join('\r\n')}\r\n\r\n${body}`
}

startChat();