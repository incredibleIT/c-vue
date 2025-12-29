import type {Node} from "@/types/node.ts";
import type {Edge} from "@/types/edge.ts";

/**
 * 流程状态
 */
export type FlowStatus =
    | 'draft'
    | 'published'
    | 'archived'
    | 'disabled'

export type FlowTriggerType =
    | 'manual'
    | 'api'
    | 'schedule'
    | 'event'

export type FlowExecutionMode =
    | 'sync'
    | 'async'
    | 'step-by-step'


/**
 * 流程定义（Flow）
 * 对应后端 Flow 实体
 */
export interface Flow {
    /** 流程唯一ID */
    id: string

    /** 流程名称 */
    name: string

    /** 流程描述 */
    description: string

    /** 语义化版本号，如 1.0.0 */
    version: string

    /** 流程状态 */
    status: FlowStatus

    /** 流程所有者ID */
    ownerId?: string

    /** 租户ID（多租户） */
    tenantId?: string

    /** 触发方式：manual / api / schedule / event */
    triggerType: FlowTriggerType

    /** 执行模式：sync / async / step-by-step */
    executionMode: FlowExecutionMode

    /** 扩展元数据（标签、图标、颜色等） */
    metadata?: Record<string, any>

    /** 流程级配置（超时、重试、变量等） */
    config?: Record<string, any>

    /** 创建时间 */
    createdAt?: string

    /** 更新时间 */
    updatedAt?: string

    /** 发布时间 */
    publishedAt?: string

    /** 节点列表（非持久化字段） */
    nodes: Node[]

    /** 边列表（非持久化字段） */
    edges: Edge[]
}
