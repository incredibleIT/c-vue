/**
 * 构建 VueFlow 节点类型映射表
 * 自动扫描, 自动加载
 * 命名规则为: [typeKey首字母大写, 下划线转为驼峰]Type.vue
 * 未定义的节点类型会回退到默认节点展示
 */

import GenericNode from "@/components/flow/nodes/GenericNode.vue";
import type { NodeType } from "@/types/node-type.ts";

const modules = import.meta.glob(
    '/src/components/flow/nodes/*.vue',
    { eager: true }
)

function typeKeyToComponentName(typeKey: string): string {
    return (
        typeKey
            .split('_')
            .map(s => s.charAt(0).toUpperCase() + s.slice(1))
            .join('') + 'Type'
    )
}

export function buildVueFlowNodeTypes(nodeTypes: NodeType[]): Record<string, any> {
    const map: Record<string, any> = {}

    for (const type of nodeTypes) {
        const componentName = typeKeyToComponentName(type.typeKey)
        const modulePath = `/src/components/flow/nodes/${componentName}.vue`

        const mod = modules[modulePath] as any
        map[type.typeKey] = mod?.default ?? GenericNode
    }

    return map
}