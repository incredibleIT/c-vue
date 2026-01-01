import type {Node} from "@/types/node.ts";
import type {FlowNode} from "@/types/flow-node-vueflow.ts";
import {nodeStatusMap} from "@/stores/node-status-store.ts";

export function nodeToFlownode(node: Node): FlowNode {
    console.log(`Convert node to flownode: ${node.id}, status: ${nodeStatusMap[node.id]}`)
    return {
        id: node.id,
        position: {
            x:node.positionX,
            y:node.positionY
        },
        type: node.type,
        data: {
            label: node.data?.label ?? node.nodeType?.name ?? 'Node',
            status: nodeStatusMap[node.id],
            ...node.data
        },
    }
}