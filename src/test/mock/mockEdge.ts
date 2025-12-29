import type { Edge } from '../../types/edge'

export const mockEdges: Edge[] = [
    {
        id: 'edge-1',
        flowId: 'flow-001',
        source: 'node-1',
        target: 'node-2',
        type: 'smoothstep',
        edgeDataFieldKey: 'default',
        data: {},
        animated: true,
        selectable: true,
        deletable: true,
        markerEnd: 'arrowclosed',
        createdAt: '2025-01-02T10:02:00',
        updatedAt: '2025-01-02T10:02:00'
    }
]
