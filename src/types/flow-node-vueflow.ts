import type {NodeRunStatus} from "@/types/node-status.ts";

export interface FlowNode {
    id: string
    position: {
        x: number
        y: number
    }

    type: string
    data: {
        label: string
        nodeType?: string
        status?: NodeRunStatus
        [key: string]: any
    }

    selectable?: boolean
    draggable?: boolean
}