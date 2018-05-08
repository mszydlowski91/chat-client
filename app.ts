import { Communication } from './src/Communication';
import { UI } from './src/UI';
import { IChatMessage } from './src/IChatMessage';

export class App {
    constructor() {
        let communicationService = new Communication();
        let ui = new UI();

        ui.onMessageSend = (content) => {
            communicationService.sendMessage(content);
        };

        communicationService.onHistoryReceived = (history: IChatMessage[]) => {
            history.forEach((message) => {
                ui.appendMessage(message)
            });
        }

        communicationService.onMessageReceived = (message: IChatMessage) => {
            ui.appendMessage(message);
        };

        communicationService.onUserJoined = (user: string) => {
            ui.appendUser(user);
        };

        communicationService.onUserLeft = (user: string) => {
            ui.removeUser(user);
        };

        communicationService.onUserListReceived = (users: string[]) => {
            users.forEach((user) => {
                ui.appendUser(user);
            });
        };
    }
}