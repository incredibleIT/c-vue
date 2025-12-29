<script setup lang="ts">
import type { FlowNode } from '@/types/flow-node-vueflow'
import type { NodeType } from '@/types/node-type'

const props = defineProps<{
    node: FlowNode
    nodeType: NodeType | null
}>()

const emit = defineEmits <{
    (e: 'update', payload: {
        nodeId: string
        key:string
        value: any
    }): void
}> ()
</script>


<template>
    <div v-if="!nodeType" class="placeholder">
        未找到节点类型定义
    </div>

    <el-form
        v-else
        label-width="90px"
        size="small"
    >
        <el-form-item
            v-for="(schema, key) in nodeType.configSchema.properties"
            :key="key"
            :label="schema.title || key"
        >
            <!-- string -->
            <el-input
                v-if="schema.type === 'string'"
                v-model="node.data[key]"
                :placeholder="schema.description"
                @update:model-value="value => emit('update', {nodeId: node.id, key: key as string, value})"
            />

            <!-- number -->
            <el-input-number
                v-else-if="schema.type === 'number'"
                v-model="node.data[key]"
                :placeholder="schema.description"
                @update:model-value="value => emit('update', {nodeId: node.id, key: key as string, value})"
            />

            <!-- boolean -->
            <el-switch
                v-else-if="schema.type === 'boolean'"
                v-model="node.data[key]"
                @change="value => emit('update', {nodeId: node.id, key: key as string, value})"
            />

            <!-- enum -->
            <el-select
                v-else-if="schema.type === 'enum'"
                v-model="node.data[key]"
                :placeholder="schema.description"
                @change="value => emit('update', {nodeId: node.id, key: key as string, value})">

                <el-option
                    v-for="o in schema.enum"
                    :key="o"
                    :label="o"
                    :value="o"
                />
            </el-select>

            <!-- 兜底 -->
            <div v-else>
                <pre>{{ schema }}</pre>
            </div>


        </el-form-item>
    </el-form>
</template>
