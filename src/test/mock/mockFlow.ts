import type {Flow} from "../../types/flow.ts";
import {mockEdges} from "./mockEdge.ts";
import {mockNodes} from "./mockNode.ts";

export const mockFlow: Flow = {
    id: 'flow-001',
    name: '测试 HTTP 流程',
    description: '用于验证节点、边、执行逻辑',
    version: '1.0.0',
    status: 'draft',
    ownerId: 'default_user',
    triggerType: 'manual',
    executionMode: 'async',
    metadata: {
        icon: 'icon-flow',
        color: '#409EFF'
    },
    config: {
        timeout: 30000,
        retry: 2
    },
    nodes: mockNodes,
    edges: mockEdges,
    createdAt: '2025-01-02T10:00:00',
    updatedAt: '2025-01-02T10:00:00'
}
