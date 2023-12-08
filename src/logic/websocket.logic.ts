import { io, Socket } from 'socket.io-client';


export enum WebsocketEventsEnum {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    CONNECT_ERROR = 'connect_error',
}


interface eventToCallbackType {
    [WebsocketEventsEnum.CONNECT]: () => Promise<void> | void;
    [WebsocketEventsEnum.DISCONNECT]: (reason: string) => Promise<void> | void;
    [WebsocketEventsEnum.CONNECT_ERROR]: (error: Error) => Promise<void> | void;
}

export class WebSocket {
    private url: string;
    private socket: Socket;

    constructor(url?: URL) {
        this.url = url?.toString() ?? window.location.toString();
        this.socket = io(this.url);
    }

    on<websocketEventsEnum extends keyof eventToCallbackType>(event: websocketEventsEnum, callbackFunction: eventToCallbackType[websocketEventsEnum]) {
        return this.socket.on(event, callbackFunction);
    }

    disconnect() { 
        return this.socket.disconnect();
    }

}
