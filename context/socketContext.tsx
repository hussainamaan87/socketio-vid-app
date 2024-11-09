import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface iSocketContext {

}

export const SocketContext = createContext<iSocketContext | null>(null);

export const SocketContextProvider = ({children}:{children:React.ReactNode})=>{
    const {user} = useUser();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isSocketConnected,setIsSocketConnected] = useState(false);

    console.log('isConnected',isSocketConnected);

    useEffect(()=>{
        const newSocket = io();
        setSocket(newSocket);

        return ()=>{
            newSocket.disconnect();
        }
    },[user]);

    useEffect(()=>{
        if(socket === null) return;
        if(socket.connected){
            onConnect();
        }
        function onConnect(){
            setIsSocketConnected(true);
        }
        function onDisconnect(){
            setIsSocketConnected(false);
        }
        
        socket.on('connect',onConnect);
        socket.on('disconnect',onDisconnect);

        return () =>{
            socket.off('connect',onConnect);
            socket.off('disconnect',onDisconnect);
        }

    },[socket])

    return <SocketContext.Provider value = {{}}>
        {children}
    </SocketContext.Provider>
}

export const useSocket = () => {
    const context = useContext(SocketContext);
    if(context ==null){
        throw new Error("useSocket must be within a SocketContextProvider")
    }
    return context;
}