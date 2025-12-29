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
        [key: string]: any
    }

    selectable?: boolean
    draggable?: boolean
}