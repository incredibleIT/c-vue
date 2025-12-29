import request from "@/api/request.ts";
import type { Result } from '@/types/result'
import type { PageResult } from '@/types/page-result'
import type { NodeType } from '@/types/node-type'

/**
 * 获取所有节点类型
 * GET /api/nodeType/list
 */
export const listNodeTypes = (): Promise<Result<NodeType[]>> => {
    return request.get('/nodeType/list')
}

/**
 * 分页获取节点类型
 * GET /api/nodeType/page
 */
export const pageNodeTypes = (params?: {
    page?: number
    size?: number
}): Promise<Result<PageResult<NodeType>>> => {
    return request.get('/nodeType/page', { params })
}

/**
 * 获取节点类型详情
 * GET /api/nodeType/detail/{typeKey}
 */
export const getNodeTypeDetail = (typeKey: string): Promise<Result<NodeType>> => {
    return request.get(`/nodeType/detail/${typeKey}`)
}

/**
 * 创建节点类型
 * POST /api/nodeType/create
 */
export const createNodeType = (nodeType: NodeType): Promise<Result<void>> => {
    return request.post('/nodeType/create', nodeType)
}

/**
 * 更新节点类型
 * PUT /api/nodeType/update
 */
export const updateNodeType = (nodeType: NodeType): Promise<Result<void>> => {
    return request.put('/nodeType/update', nodeType)
}
