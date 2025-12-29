import request from "@/api/request.ts";
import type { Result } from '@/types/result'
import type { Node } from '@/types/node'

/**
 * 查找一个流程模板下的所有节点
 * GET /api/node/list/{flowId}
 */
export const listNodesByFlow = (flowId: string): Promise<Result<Node[]>> => {
    return request.get(`/node/list/${flowId}`)
}

/**
 * 查找单个节点详情（包含 nodeType）
 * GET /api/node/detail/{nodeId}
 */
export const getNodeDetail = (nodeId: string): Promise<Result<Node>> => {
    return request.get(`/node/detail/${nodeId}`)
}

/**
 * 创建节点
 * POST /api/node/create
 */
export const createNode = (node: Node): Promise<Result<void>> => {
    return request.post('/node/create', node)
}

/**
 * 更新节点
 * PUT /api/node/update
 */
export const updateNode = (node: Node): Promise<Result<void>> => {
    return request.put('/node/update', node)
}

/**
 * 删除节点
 * DELETE /api/node/delete/{nodeId}
 */
export const deleteNode = (nodeId: string): Promise<Result<void>> => {
    return request.delete(`/node/delete/${nodeId}`)
}
