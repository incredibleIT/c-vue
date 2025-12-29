import type {NodeType} from "@/types/node-type.ts";

/**
 * 节点端口方向
 */
export type Position =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'

/**
 * 流程节点（Node）
 * 对应后端 Node 实体
 * 兼容 Vue Flow
 */
export interface Node {
    /** 节点唯一ID */
    id: string

    /** 所属流程ID */
    flowId: string

    /** 节点 X 坐标 */
    positionX: number

    /** 节点 Y 坐标 */
    positionY: number

    /** 节点类型（input / output / default / 自定义） */
    type: string

    /** 用户自定义数据字段 key */
    nodeDataFieldKey: string

    /** 业务数据（JSON） */
    data: Record<string, any>

    /** 样式对象 */
    style?: Record<string, any>

    /** CSS 类名 */
    className?: string

    /** 父节点 ID（嵌套） */
    parentNodeId?: string

    /** 层级顺序 */
    zIndex?: number

    /** 是否隐藏 */
    hidden?: boolean

    /** 默认输出端口方向 */
    sourcePosition?: Position

    /** 默认输入端口方向 */
    targetPosition?: Position

    /** 是否可选中 */
    selectable?: boolean

    /** 是否可拖拽 */
    draggable?: boolean

    /** 是否可连接 */
    connectable?: boolean

    /** 是否可删除 */
    deletable?: boolean

    /** 是否可聚焦 */
    focusable?: boolean

    /** 是否参与自动布局测量 */
    measurable?: boolean

    /** 是否自动扩展父节点 */
    expandParent?: boolean

    /** 缩放原点 X */
    originX?: number

    /** 缩放原点 Y */
    originY?: number

    /** 节点宽度 */
    dimensionsWidth?: number

    /** 节点高度 */
    dimensionsHeight?: number

    /** 创建时间 */
    createdAt?: string

    /** 更新时间 */
    updatedAt?: string

    /** 节点类型定义（非持久化） */
    nodeType?: NodeType
}
