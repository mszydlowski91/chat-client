import { Configuration } from './Configuration';
import * as io from 'socket.io-client';
import { IChatMessage } from './IChatMessage';
import { MessageTypes } from './MessageTypes';

export class Communication {
    public onHistoryReceived: null | ((history: IChatMessage[]) => void);
    public onMessageReceived: null | ((message: IChatMessage) => void);
    public onUserJoined: null | ((user: string) => void);
    public onUserLeft: null | ((user: string) => void);
    public onUserListReceived: null | ((users: string[]) => void);

    private webSocket: SocketIOClient.Socket;
    constructor() {
        this.webSocket = io(Configuration.apiUrl);

        this.webSocket.on(MessageTypes.ChatHistory, (msgs: IChatMessage[]) => {
            if (this.onHistoryReceived) {
                this.onHistoryReceived(msgs);
            }
        });

        this.webSocket.on(MessageTypes.ChatMessage, (msg: IChatMessage) => {
            if (this.onMessageReceived) {
                this.onMessageReceived(msg);
            }
        });

        this.webSocket.on(MessageTypes.UserJoin, (user: string) => {
            if (this.onUserJoined) {
                this.onUserJoined(user);
            }
        });

        this.webSocket.on(MessageTypes.UserLeft, (user: string) => {
            if (this.onUserLeft) {
                this.onUserLeft(user);
            }
        });

        this.webSocket.on(MessageTypes.UserList, (users: string[]) => {
            if (this.onUserListReceived) {
                this.onUserListReceived(users);
            }
        });

        this.webSocket.emit(MessageTypes.UserJoin, this.generateUserName());

        this.onHistoryReceived = null;
        this.onMessageReceived = null;
        this.onUserJoined = null;
        this.onUserLeft = null;
        this.onUserListReceived = null;
    }

    public destroy(): void {
        this.webSocket.off(MessageTypes.ChatHistory);
        this.webSocket.off(MessageTypes.ChatMessage);
        this.webSocket.off(MessageTypes.UserJoin);
        this.webSocket.off(MessageTypes.UserLeft);
        this.webSocket.off(MessageTypes.UserList);
    }

    public sendMessage(content: string): void {
        let message: IChatMessage = {
            text: content,
            type: 'text'
        };
        this.webSocket.emit(MessageTypes.ChatMessage, message);
    }

    private generateUserName(): string {
        return `user${new Date().getTime()}`;
    }

}

