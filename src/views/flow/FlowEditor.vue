<script setup lang="ts">

import {useRoute} from "vue-router";
import {ref, onMounted, Ref, computed, onUnmounted} from "vue";
import {VueFlow, useVueFlow, NodeMouseEvent, EdgeMouseEvent, GraphEdge} from "@vue-flow/core";
import {Background} from '@vue-flow/background'

import { getFlowDetail } from "@/api/flow.ts";
import {Node} from "@/types/node.ts";
import {Edge} from "@/types/edge.ts";
import type {FlowNode} from "@/types/flow-node-vueflow.ts";
import type {FlowEdge} from "@/types/flow-edge-vueflow.ts";
import {nodeToFlownode} from "@/utils/node-to-flownode.ts";
import {edgeToFlowedge} from "@/utils/edge-to-flowedge.ts";

import { listNodeTypes } from "@/api/nodeType.ts";
import type { NodeType } from "@/types/node-type.ts";
import { v4 as uuid } from 'uuid'
import { buildVueFlowNodeTypes } from "@/utils/build-vueflow-node-types.ts";
import type {Flow} from "@/types/flow.ts";
import {useFlowPersistence} from "@/utils/flow-to-persistence.ts";
import type { Connection } from "@vue-flow/core";
import type { EdgeUpdateEvent } from "@vue-flow/core";
import NodeConfigDialog from "@/components/flow/NodeConfigDialog.vue";
import {runFlow} from "@/api/flow.ts";
import {buildDefaultDataFromSchema} from "@/utils/build-default-data-from-schema.ts";
import {initNodeStatusListener} from "@/bootstrap/node-status.ts";
import {nodeStatusWS} from "@/services/node-status-ws.ts";
import router from "@/router";


const route = useRoute()
const flowId = route.params.flowId as string
const {fitView} = useVueFlow()

const flow: Ref<Flow> = ref({})
const nodes = computed<FlowNode[]>(() => (flow.value?.nodes || []).map(nodeToFlownode))
const edges = computed<FlowEdge[]>(() => (flow.value?.edges || []).map(edgeToFlowedge))


const nodeTypes: Ref<NodeType[]> = ref([])
const { project } = useVueFlow()
const vueFlowNodeTypes = computed(() => buildVueFlowNodeTypes(nodeTypes.value))

const activeNode: Ref<FlowNode | null> = ref(null)
const activeNodeType: Ref<NodeType | null> = ref(null)
const selectedEdge: Ref<FlowEdge | null> = ref(null)

onMounted(async () => {
    try {
        initNodeStatusListener()
        flow.value = (await getFlowDetail(flowId)).data
        const nodeTypeRes = await listNodeTypes()
        nodeTypes.value = nodeTypeRes.data
    } catch {
        nodeTypes.value = []
    }
    requestAnimationFrame(() => {
        fitView({padding: 0.2})
    })
})

onUnmounted(() => {
    nodeStatusWS.disconnect()
})

/**
 * 延迟保存
 */
const { markDirty } = useFlowPersistence(flow)

/**
 * 拖拽开始
 * @param event 拖拽事件
 * @param type  推拽的节点类型
 */
const onDragStart = (event: DragEvent, type: NodeType) => {
    console.log(type.typeKey)
    event.dataTransfer?.setData(
        'application/vueflow-node-type',
        JSON.stringify({typeKey: type.typeKey, typeName: type.name})
    )
    event.dataTransfer!.effectAllowed = 'move'
}

/**
 * 拖拽结束
 * @param event 结束事件
 */
const onDrop = (event: DragEvent) => {
    const t = JSON.parse(<string>event.dataTransfer?.getData(
        'application/vueflow-node-type'
    ))
    console.log(t)
    if (!t)  return

    const position = project({ x: event.clientX, y: event.clientY })

    const nodeType = nodeTypes.value.find(nodet => nodet.typeKey === t.typeKey)
    const defaultData = buildDefaultDataFromSchema(nodeType?.configSchema as {properties?: Record<string, any>})

    const node:Node = {
        id: uuid(),
        flowId: flowId,
        positionX: position.x,
        positionY: position.y,
        type: t.typeKey,
        nodeDataFieldKey: "",
        data: {label: t.typeName, ...defaultData},
    }

    flow.value.nodes.push(node)

    markDirty()
}

/**
 * 节点点击事件
 * @param node 被点击节点
 */
const onNodeClick = (node: NodeMouseEvent) => {
    activeNode.value = node.node
    activeNodeType.value = nodeTypes.value.find(t => t.typeKey === node.node.type) ?? null
    console.log("activeNode", activeNode.value)
    console.log("activeNodeType", activeNodeType.value)
}

const closeNodeDialog = () => {
    activeNode.value = null
}

/**
 * 节点拖拽结束
 * @param event 拖拽结束事件
 */
function onNodeDragStop(event: { node: FlowNode }) {
    const node = flow.value.nodes.find(n => n.id === event.node.id)
    if (node) {
        node.positionX = event.node.position.x
        node.positionY = event.node.position.y
        console.log("node updated", node)
        markDirty()
    }
}

/**
 * 节点属性更新
 * @param nodeId 节点ID
 * @param key    属性键
 * @param value  属性值
 */
function onNodePropertyUpdate({nodeId, key, value}) {
    const node = flow.value.nodes.find(n => n.id === nodeId)
    if (!node) return

    node.data[key] = value
    markDirty()
}

/**
 * 创建边事件
 * @param connection  此次连接详情
 */
const onConnect = (connection: Connection) => {
    if (!connection.source || !connection.target) return

    const edge: Edge = {
        id: uuid() as string,
        flowId: flowId,
        source: connection.source,
        target: connection.target,
        type: "default",
        animated: false,
        edgeDataFieldKey: {},
        data: {},
    }

    flow.value.edges.push(edge)

    markDirty()
}

/**
 * 边点击事件
 * @param edge 被点击的边
 */
const onEdgeClick = (edge: EdgeMouseEvent) => {
    selectedEdge.value = edge.edge as FlowEdge
    console.log("selectedEdge", selectedEdge.value)
}

/**
 * 边更新事件
 * @param event 边更新事件详情
 */
const onEdgeUpdateEnd = (event: EdgeUpdateEvent) => {
    const { edge, connection } = event
    if (!connection.source || !connection.target) return

    const e = flow.value.edges.find(e => e.id === edge.id)

    if (!e) return
    e.source = connection.source
    e.target = connection.target
    markDirty()
}

const onEdgeDelete = (edge: EdgeMouseEvent) => {
    flow.value.edges = flow.value.edges.filter(e => e.id !== edge.edge.id)
    markDirty()
}

const runF = (f: Flow) => {
    runFlow(f).then(res => {
        console.log(res)
        const instanceId = res.data.id
        router.push({
            name: 'FlowRuntimePage',
            params: {
                flowId,
                instanceId,
            }
        })
    })
}
</script>

<template>

    <el-container class="flow-editor">
        <el-aside width="220px" class="flow-editor__aside">
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

        <el-main class="flow-editor__main">
            <VueFlow
                :nodes="nodes"
                :edges="edges"
                :node-types="vueFlowNodeTypes"
                @dragover.prevent
                @drop="onDrop"
                @node-drag-stop="onNodeDragStop"
                @node-double-click="onNodeClick"
                @connect="onConnect"
                @edge-click="onEdgeClick"
                @edge-update-end="onEdgeUpdateEnd"
                @edge-double-click="onEdgeDelete"
            >
                <Background pattern-color="#e5e7eb" :gap="10"/>
            </VueFlow>
        </el-main>

        <el-button @click="runF(flow)">运行流程</el-button>
    </el-container>

    <NodeConfigDialog
        v-if="activeNode && activeNodeType"
        :node="activeNode"
        :node-type="activeNodeType"
        @close="closeNodeDialog"
        @update="onNodePropertyUpdate"
    />
</template>

<style scoped>
.flow-editor {
    height: calc(100vh - 40px);
    background-color: #f5f7fa;
}

.flow-editor__aside {
    padding: 12px;
    border-right: 1px solid #e4e7ed;
    background-color: #ffffff;
    box-sizing: border-box;
}

.flow-editor__aside.right {
    border-right: none;
    border-left: 1px solid #e4e7ed;
}

.flow-editor__main {
    padding: 12px;
    background-color: #f5f7fa;
}

.panel-title {
    font-size: 14px;
    font-weight: 600;
    color: #303133;
    margin-bottom: 8px;
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