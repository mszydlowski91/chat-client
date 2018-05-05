import {Configuration} from './Configuration';
import * as io from 'socket.io-client';

export class Communication {
    private webSocket: SocketIOClient.Socket;
    private messagesList: HTMLElement;
    private textInput: HTMLInputElement;
    constructor() {
        this.webSocket = io(Configuration.apiUrl);
        this.webSocket.on('chat message', (msg: IChatMessage) => this.onMessage(msg));
        this.messagesList = document.querySelector('#messages') as HTMLElement;
        this.textInput = document.querySelector('#main-input') as HTMLInputElement;

        this.textInput.addEventListener('keypress', (e: KeyboardEvent) => {
            let returnKeyCode = 13;
            if(e.keyCode === returnKeyCode) {
                let value = this.textInput.value;
                this.webSocket.emit('chat message', value);
                this.textInput.value = '';
            }
        });
    }

    onMessage(msg: IChatMessage) {
        console.log(msg);
        let li = document.createElement('li');
        li.innerText = `${msg.author}: ${msg.text}`;
        this.messagesList.appendChild(li);
    }
}

interface IChatMessage {
    text: string;
    author: string;
}