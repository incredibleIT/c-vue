import type {NodeType} from "@/types/node-type.ts";
import type {NodeInstanceStatus} from "@/types/instance/node-instance-status.ts";
import type {NodeRunStatus} from "@/types/node-status.ts";

export interface NodeInstance {
    /** 节点实例 ID（UUID） */
    id: string

    /** 所属流程实例 ID */
    instanceId: string

    /** 对应模板节点 ID */
    nodeId: string

    /** 节点类型快照 */
    nodeType: string

    /** 执行状态 */
    status: NodeRunStatus

    /** 实际输入数据 */
    inputData?: Record<string, any>

    /** 实际输出数据 */
    outputData?: Record<string, any>

    /** 错误信息 */
    errorMessage?: string

    /** 重试信息 */
    retryCount: number
    maxRetries: number

    /** 时间信息 */
    startedAt: string
    endedAt?: string
    createdAt: string
    updatedAt: string

    /** —— 非持久化字段 —— */

    /** 节点字段映射 key */
    nodeDataFieldKey?: string

    /** NodeType 快照（用于 UI） */
    type?: NodeType
}
