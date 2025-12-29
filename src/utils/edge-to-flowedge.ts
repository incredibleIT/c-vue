import type {Edge} from "@/types/edge.ts";
import type {FlowEdge} from "@/types/flow-edge-vueflow.ts";

export function edgeToFlowedge(edge: Edge): FlowEdge {
    return {
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: edge.type ?? 'default',
        label: edge.label,
        animated: edge.animated,
        edgeDataFieldKey: edge.edgeDataFieldKey,
        data: edge.data
    }
}