import { IChatMessage } from "./IChatMessage";

export class UI {
    public static RETURN_KEY_CODE: number = 13;

    private messageInput: HTMLInputElement;
    private messageList: HTMLUListElement;
    private userList: HTMLUListElement;

    public onMessageSend: null | ((content: string) => void);

    constructor() {
        this.messageInput = document.querySelector('#message-input') as HTMLInputElement;
        this.messageList = document.querySelector('#message-list') as HTMLUListElement;
        this.userList = document.querySelector('#user-list') as HTMLUListElement;

        this.onMessageSend = null;

        this.messageInput.addEventListener('keypress', (e: KeyboardEvent) => this.onMessageInputKeyPress(e));
    }

    public appendMessage(message: IChatMessage): void {
        let li = document.createElement('li');
        li.innerHTML = `${message.author}: ${message.text}`;
        this.messageList.appendChild(li);
    }

    public appendUser(user: string): void {
        let li = document.createElement('li');
        li.innerHTML = user;
        this.userList.appendChild(li);
    }

    public onMessageInputKeyPress(e: KeyboardEvent): void {
        if (e.keyCode === UI.RETURN_KEY_CODE && this.messageInput.value) {
            if (this.onMessageSend) {
                this.onMessageSend(this.messageInput.value);
            }
            this.messageInput.value = '';
        }
    }

    public removeUser(user: string): void {
        let lis = this.userList.querySelectorAll('li');
        for (let i = 0; i < lis.length; i++) {
            let li = lis[i];
            if (li.innerHTML.trim() === user) {
                this.userList.removeChild(li);
                break;
            }
        }
    }

}