<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import {computed, onMounted, ref, Ref} from "vue";
import type {NodeType} from "@/types/node-type.ts";
import {listNodeTypes} from "@/api/nodeType.ts";
import {Background} from "@vue-flow/background";
import {VueFlow} from "@vue-flow/core";
import {buildVueFlowNodeTypes} from "@/utils/build-vueflow-node-types.ts";

const route = useRoute()
const router = useRouter()
const flowId = route.params.flowId as string

function runFlow() {
    const instanceId = 'temp-instance-id'
    router.push({
        name: 'FlowRuntimePage',
        params: {
            flowId,
            instanceId
        }
    })
}

const nodeTypes: Ref<NodeType[]> = ref([])
const vueFlowNodeTypes = computed(() => buildVueFlowNodeTypes(nodeTypes.value))

onMounted(async () => {
    try {
        const nodeTypeRes = await listNodeTypes()
        nodeTypes.value = nodeTypeRes.data
    } catch {
        nodeTypes.value = []
    }
})

const onDragStart = (event: DragEvent, type: NodeType) => {
    console.log(type.typeKey)
    event.dataTransfer?.setData(
        'application/vueflow-node-type',
        JSON.stringify({typeKey: type.typeKey, typeName: type.name})
    )
    event.dataTransfer!.effectAllowed = 'move'
}
</script>

<template>

    <el-container class="flow-edit">
        <el-aside width="220px" class="flow-edit__aside">
            <div class="panel-title">Node Types</div>
            <div
                v-for="type in nodeTypes"
                :key="type.typeKey"
                class="node-type-item"
                draggable="true"
                @dragstart="onDragStart($event, type)"
            >
                {{ type.name }}
            </div>

        </el-aside>

        <el-main class="flow-edit__main">
            <VueFlow
                :node-types="vueFlowNodeTypes"
                @dragover.prevent
            >
                <Background pattern-color="#e5e7eb" :gap="10"/>
            </VueFlow>
        </el-main>

        <el-button @click="runFlow">运行流程</el-button>
    </el-container>
</template>

<style scoped>
.flow-edit {
    height: calc(100vh - 40px);
    background-color: #f5f7fa;
}

.flow-edit__aside {
    padding: 12px;
    border-right: 1px solid #e4e7ed;
    background-color: #ffffff;
    box-sizing: border-box;
}

.flow-edit__main {
    padding: 12px;
    background-color: #f5f7fa;
}

.node-type-item {
    padding: 8px;
    margin-bottom: 6px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    cursor: grab;
    background: #fff;
}

</style>