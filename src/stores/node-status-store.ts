/**
 * 节点运行状态的存储, 用于VueFlow消费
 */

import { reactive } from "vue";
import type { NodeRunStatus } from "@/types/node-status.ts";

export const nodeStatusMap = reactive<Record<string, NodeRunStatus>> ({})

export function updateNodeStatus(nodeId, status: NodeRunStatus) {
    console.log(`Update node status: ${nodeId} -> ${status}`)
    nodeStatusMap[nodeId] = status
}