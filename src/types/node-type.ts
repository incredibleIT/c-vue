/**
 * 节点类型元数据
 * 对应后端 NodeType 实体
 */
export interface NodeType {
    /** 节点类型唯一标识，如 http_request */
    typeKey: string

    /** 显示名称 */
    name: string

    /** 描述 */
    description: string

    /** 节点分类（基础 / 网络 / 数据库 等） */
    category: string

    /**
     * 节点配置结构（通常为 JSON Schema）
     * 用于描述 data 中可配置的业务字段
     */
    configSchema: Record<string, any>

    /** 前端图标（icon class 或 URL） */
    icon?: string

    /** 前端自定义渲染组件名 */
    component?: string

    /** 后端执行器类全限定名 */
    executorClass: string

    /** 是否支持重试 */
    supportsRetry?: boolean

    /** 是否异步节点 */
    isAsync?: boolean

    /** 是否终止节点 */
    isTerminal?: boolean

    /** 创建时间 */
    createdAt?: string

    /** 更新时间 */
    updatedAt?: string
}
