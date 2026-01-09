import type {FlowInstanceStatus} from "@/types/instance/flow-instance-status.ts";
import type {NodeInstance} from "@/types/instance/node-instance.ts";
import type {Edge} from "@/types/edge.ts";

export interface FlowInstance {

    /** 实例唯一 ID */
    id: string

    /** 关联的流程模板 ID */
    flowId: string

    /** 实例整体状态 */
    status: FlowInstanceStatus

    /** 触发人 */
    triggeredBy: string

    /** 触发方式 */
    triggerType: string

    /** 启动时的全局输入参数 */
    inputParams: Record<string, any>

    /** 最终输出结果 */
    outputResult?: Record<string, any>

    /** 实例级错误 */
    errorMessage?: string

    /** 时间信息 */
    startedAt: string
    endedAt?: string
    createdAt: string
    updatedAt: string

    /** —— 非持久化 / 组合字段 —— */

    /** 本次运行的节点实例 */
    nodeInstances?: NodeInstance[]

    /** 模板快照（用于渲染） */
    nodes?: Node[]
    edges?: Edge[]

}