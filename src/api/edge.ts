import request from "@/api/request.ts";
import type {Result} from "@/types/result.ts";
import type {PageResult} from "@/types/page-result.ts";
import type {Edge} from "@/types/edge.ts";


/**
 * 根据流程获取流程边
 */
export const listEdgesByFlow = (flowId: string): Promise<Result<Edge[]>> => {
    return request.get(`/edge/detail/${flowId}`)
}