/**
 * WebSocket Service 通信层
 * 只关注, 连接建立/断开, 消息接收/发送, 外抛事件
 */
import type { NodeStatusEvent } from "@/types/node-status-event.ts";
import type {WebSocket} from "vite";

type Listener = (event: NodeStatusEvent) => void;

class NodeStatusWebSocket {

    private socket: WebSocket | null = null;
    private listeners: Listener[] = []

    /**
     * 创建WebSocket连接
     */
    connect() {
        console.log("Connecting to node status websocket...")
        if (this.socket) return

        this.socket = new WebSocket('ws://localhost:8080/node-status') as WebSocket

        this.socket.onmessage = (event) => {
            try {
                const data = JSON.parse(<string>event.data) as NodeStatusEvent
                this.listeners.forEach(listener => listener(data))
            } catch (e) {
                console.error("Error: ", event.data)
            }
        }

        this.socket.close = () => {
            this.socket = null
        }
    }

    /**
     * 断开WebSocket连接
     */
    disconnect() {
        this.socket?.close()
        this.socket = null
    }

    /**
     * 注册监听器, 松耦合, 多组件可以不耦合WebSocket连接而获取节点运行状态
     * @param listener 监听器
     */
    onStatusUpdate(listener: Listener) {
        this.listeners.push(listener)
    }
}

export const nodeStatusWS = new NodeStatusWebSocket();