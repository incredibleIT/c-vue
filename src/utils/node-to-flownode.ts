import type {Node} from "@/types/node.ts";
import type {FlowNode} from "@/types/flow-node-vueflow.ts";

export function nodeToFlownode(node: Node): FlowNode {
    return {
        id: node.id,
        position: {
            x:node.positionX,
            y:node.positionY
        },
        type: node.type,
        data: {
            label: node.data?.label ?? node.nodeType?.name ?? 'Node',
            ...node.data
        },
    }
}