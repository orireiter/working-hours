import { useEffect, useState } from 'react';

import { WebSocket } from '../logic/websocket.logic';


export function useWebsocket(url?: URL) {
    const [webSocket, setWebSocket] = useState<WebSocket>();

    useEffect(() => {
        const socket = new WebSocket(url);
        setWebSocket(socket);
        return () => void socket.disconnect();
    }, []);

    return webSocket;
}
