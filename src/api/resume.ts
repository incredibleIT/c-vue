import request from "@/api/request.ts";
import type { Result } from '@/types/result'

/**
 * 触发恢复等待中的节点执行
 * POST /resume/{flowInstanceId}/{nodeInstanceId}
 */
export const resumeNode = (
    flowInstanceId: string,
    nodeInstanceId: string
): Promise<Result<void>> => {
    return request.post(`/resume/${flowInstanceId}/${nodeInstanceId}`)
}
