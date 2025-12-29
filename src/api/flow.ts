import request from "@/api/request.ts";
import type {Result} from "@/types/result.ts";
import type {PageResult} from "@/types/page-result.ts";
import type {Flow} from "@/types/flow.ts";


/**
 * 获取所有的Flow模版
 */
export const listFlows = (): Promise<Result<Flow[]>> => {
    return request.get("flow/list")
}

/**
 * 分页获取流程模板
 */
export const pageFlows = (params?: {
    page?: number
    size?: number
}): Promise<PageResult<Flow>> => {
    return request.get('/flow/page', { params })
}

/**
 * 获取流程详情
 */
export const getFlowDetail = (flowId: string): Promise<Result<Flow>> => {
    return request.get(`/flow/detail/${flowId}`)
}

/**
 * 创建流程模板
 */
export const createFlow = (flow: Flow): Promise<Result<void>> => {
    return request.post('/flow/create', flow)
}

/**
 * 更新流程模板
 */
export const updateFlow = (flow: Flow): Promise<Result<void>> => {
    return request.put('/flow/update', flow)
}

/**
 * 删除流程模板
 */
export const deleteFlow = (flowId: string): Promise<Result<void>> => {
    return request.delete(`/flow/delete/${flowId}`)
}

/**
 * 运行流程
 */
export const runFlow = (flow: Flow): Promise<Result<void>> => {
    return request.post('/flow/run', flow)
}

/**
 * 级联保存
 */
export const saveFlowSnapshot = (flow: Flow): Promise<Result<void>> => {
    return request.post('/flow/save/jilian', flow)
}