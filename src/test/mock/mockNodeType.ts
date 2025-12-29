import type { NodeType } from '../../types/node-type'

export const mockNodeTypes: NodeType[] = [
    {
        typeKey: 'http_request',
        name: 'HTTP 请求',
        description: '发起一个 HTTP 请求',
        category: 'network',
        configSchema: {
            url: { type: 'string', required: true },
            method: { type: 'string', enum: ['GET', 'POST'] },
            headers: { type: 'object' },
            body: { type: 'string' }
        },
        icon: 'icon-http',
        component: 'HttpRequestNode',
        executorClass: 'com.example.executor.HttpRequestExecutor',
        supportsRetry: true,
        isAsync: true,
        isTerminal: false,
        createdAt: '2025-01-01T10:00:00',
        updatedAt: '2025-01-01T10:00:00'
    },
    {
        typeKey: 'end',
        name: '结束节点',
        description: '流程终止',
        category: 'base',
        configSchema: {},
        icon: 'icon-end',
        component: 'EndNode',
        executorClass: 'com.example.executor.EndExecutor',
        supportsRetry: false,
        isAsync: false,
        isTerminal: true,
        createdAt: '2025-01-01T10:00:00',
        updatedAt: '2025-01-01T10:00:00'
    }
]
