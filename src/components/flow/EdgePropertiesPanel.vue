<script setup lang="ts">
import type {FlowEdge} from "@/types/flow-edge-vueflow.ts";

const props = defineProps<{
    edge: FlowEdge
}>()

const emit = defineEmits<{
    (e: 'update', payload: {
        edgeId: string
        key: string
        value: any
    }): void
}>()

</script>

<template>
    <div v-if="!edge">
        请选择边
    </div>

    <el-form
        v-else
        label-width="90px"
        size="small"
    >
        <el-form-item
            v-for="(schema, key) in edge.edgeDataFieldKey.properties"
            :key="key"
            :label="schema.title || key"
        >
            <el-input
                v-model="edge.data[key]"
                :placeholder="schema.description"
                @update:model-value="value => {
                    if (edge.data[key] !== value) {
                        emit('update', { edgeId: edge.id, key: key as string, value })
                    }
                }"
            />
        </el-form-item>
    </el-form>

</template>

<style scoped>

</style>