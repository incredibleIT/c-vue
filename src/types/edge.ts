/**
 * 边类型（Vue Flow 内置 + 自定义）
 */
export type EdgeType =
    | 'default'
    | 'smoothstep'
    | 'straight'
    | string

/**
 * 边是否可更新
 */
export type EdgeUpdatable =
    | true
    | false
    | 'source'
    | 'target'

/**
 * 流程边（Edge）
 * 对应后端 Edge 实体
 * 兼容 Vue Flow
 */
export interface Edge {
    /** 边唯一 ID */
    id: string

    /** 所属流程 ID */
    flowId: string

    /** 源节点 ID */
    source: string

    /** 目标节点 ID */
    target: string

    /** 边类型 */
    type?: EdgeType

    /** 业务数据字段 key */
    edgeDataFieldKey: Record<string, any>

    /** 业务数据 */
    data: Record<string, any>

    /** 边样式 */
    style?: Record<string, any>

    /** 自定义 CSS 类名 */
    className?: string

    /** 起始箭头标记 */
    markerStart?: string

    /** 结束箭头标记 */
    markerEnd?: string

    /** 标签文本 */
    label?: string

    /** 标签样式 */
    labelStyle?: Record<string, any>

    /** 是否显示标签背景 */
    labelShowBg?: boolean

    /** 标签背景样式 */
    labelBgStyle?: Record<string, any>

    /** 标签背景内边距 X */
    labelBgPaddingX?: number

    /** 标签背景内边距 Y */
    labelBgPaddingY?: number

    /** 标签背景圆角 */
    labelBgBorderRadius?: number

    /** 是否显示动画 */
    animated?: boolean

    /** 是否可更新 */
    updatable?: EdgeUpdatable

    /** 是否可选中 */
    selectable?: boolean

    /** 是否可删除 */
    deletable?: boolean

    /** 是否可聚焦 */
    focusable?: boolean

    /** 是否隐藏 */
    hidden?: boolean

    /** 层级顺序 */
    zIndex?: number

    /** 源节点 Handle ID */
    sourceHandle?: string

    /** 目标节点 Handle ID */
    targetHandle?: string

    /** 可交互区域宽度 */
    interactionWidth?: number

    /** 创建时间 */
    createdAt?: string

    /** 更新时间 */
    updatedAt?: string
}
