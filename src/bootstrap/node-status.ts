import {nodeStatusWS} from "@/services/node-status-ws.ts";
import {updateNodeStatus} from "@/stores/node-status-store.ts";

export function initNodeStatusListener() {
    nodeStatusWS.onStatusUpdate(event => {
        updateNodeStatus(event.nodeId, event.status)
    })

    nodeStatusWS.connect()
}