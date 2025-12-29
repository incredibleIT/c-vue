export interface FlowEdge {
    id: string
    source: string
    target: string

    edgeDataFieldKey: Record<string, any>
    data: Record<string, any>

    type?: string
    label?: string
    animated?: boolean

}