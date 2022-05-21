import {io} from 'socket.io-client'

class SocketClient {
    static socket = null

    static connectSocket = function(){
        return io('http://localhost:5000/')
    }
    static getSocket = function (){
        if(SocketClient.socket===null)
            SocketClient.socket = SocketClient.connectSocket()
        return SocketClient.socket
    }
}

export default SocketClient