import type { Node } from '../../types/node'
import {mockNodeTypes} from "./mockNodeType.ts";
import type {Position} from "../../types/node";

export const mockNodes: Node[] = [
    {
        id: 'node-1',
        flowId: 'flow-001',
        type: 'http_request',
        positionX: 100,
        positionY: 150,
        nodeDataFieldKey: 'input',
        data: {
            url: 'https://api.example.com/test',
            method: 'GET'
        },
        selectable: true,
        draggable: true,
        connectable: true,
        deletable: true,
        sourcePosition: 'right' as  Position,
        targetPosition: 'left' as Position,
        nodeType: mockNodeTypes[0],
        createdAt: '2025-01-02T10:00:00',
        updatedAt: '2025-01-02T10:00:00'
    },
    {
        id: 'node-2',
        flowId: 'flow-001',
        type: 'end',
        positionX: 400,
        positionY: 150,
        nodeDataFieldKey: 'output',
        data: {},
        selectable: true,
        draggable: false,
        connectable: false,
        deletable: false,
        sourcePosition: undefined as Position,
        targetPosition: 'left' as Position,
        nodeType: mockNodeTypes[1],
        createdAt: '2025-01-02T10:01:00',
        updatedAt: '2025-01-02T10:01:00'
    }
]
