/**
 * 节点运行状态消息对象
 */

import type {NodeRunStatus} from "@/types/node-status.ts";

export interface NodeStatusEvent {
    nodeInstanceId: string
    nodeId: string
    status: NodeRunStatus
}