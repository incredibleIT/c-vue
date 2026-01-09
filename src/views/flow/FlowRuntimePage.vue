<script setup lang="ts">
import {useRoute} from 'vue-router'
import {computed, onMounted, ref, Ref} from "vue";
import type {Node} from "@/types/node.ts";
import type {NodeInstance} from "@/types/instance/node-instance.ts";
import {getFlowDetail} from "@/api/flow.ts";
import type {Edge} from "@/types/edge.ts";
import {NodeMouseEvent, VueFlow} from "@vue-flow/core";
import type {FlowNode} from "@/types/flow-node-vueflow.ts";
import type {FlowEdge} from "@/types/flow-edge-vueflow.ts";
import {buildVueFlowNodeTypes} from "@/utils/build-vueflow-node-types.ts";
import type {NodeType} from "@/types/node-type.ts";
import {listNodeTypes} from "@/api/nodeType.ts";
import {Background} from "@vue-flow/background";
import NodeConfigDialog from "@/components/flow/NodeConfigDialog.vue";

const route = useRoute()
const flowId = route.params.flowId as string
const instanceId = route.params.instanceId as string
let nodeTemplates: Ref<Node[]> = ref([])
let edgeTemplates: Ref<Edge[]> = ref([])
let nodeInstances: Ref<NodeInstance[]> = ref([])
const nodeTypes: Ref<NodeType[]> = ref([])
const nodes = computed<FlowNode[]>(() => nodeInstances.value.map(nodeInstanceToFlownode))
const edges = computed<FlowEdge[]>(() => edgeTemplates.value.map(edgeInstanceToFlowedge))
const vueFlowNodeTypes = computed(() => buildVueFlowNodeTypes(nodeTypes.value))
const activeNode: Ref<FlowNode | null> = ref(null)
const activeNodeType: Ref<NodeType | null> = ref(null)

const nodeInstanceToFlownode = (instance: NodeInstance): FlowNode => {
    const node = nodeTemplates.value.find(n => n.id === instance.nodeId)
    return {
        id: node?.id || '',
        position: {
            x: node?.positionX || 0,
            y: node?.positionY || 0
        },
        type: instance.nodeType,
        data: {
            label: instance.type?.name ?? 'Node',
            status: instance.status,
            ...node?.data
        }
    }
}

const edgeInstanceToFlowedge = (instance: Edge): FlowEdge => {
    return {
        id: instance.id,
        source: instance.source,
        target: instance.target,
        type: instance.type ?? 'default',
        label: instance.label,
        animated: instance.animated,
        edgeDataFieldKey: instance.edgeDataFieldKey,
        data: instance.data
    }
}

/**
 * 挂载后, 运行时页面要自己加载模版, 监听运行时数据, 显示运行时数据
 */
onMounted(async () => {
    const nodeTypeRes = await listNodeTypes()
    nodeTypes.value = nodeTypeRes.data
    const flowTemplate = await loadFlowTemplate(flowId)
    nodeTemplates.value = flowTemplate.nodes
    edgeTemplates.value = flowTemplate.edges
    nodeInstances.value = buildNodeTemplatesToNodeInstance(nodeTemplates.value)
    // connectWs()
    console.log('nodeInstances', nodeInstances.value)
    console.log('edgeTemplates', edgeTemplates.value)
    console.log('nodeTemplates', nodeTemplates.value)
})

const loadFlowTemplate = (flowId: String) => {
    return getFlowDetail(flowId).then(res => {
        return res.data
    })
}

const buildNodeTemplatesToNodeInstance = (n: Node[]): NodeInstance[] => {

    const nodeInstances: NodeInstance[] = []
    for (let nodeTemplate of n) {
        const nodeInstance: NodeInstance = {
            id: '',
            instanceId: instanceId,
            nodeId: nodeTemplate.id,
            nodeType: nodeTemplate.nodeType?.typeKey || '',
            status: 'pending',
            inputData: {},
            outputData: {},
            errorMessage: '',
            retryCount: 0,
            maxRetries: 0,
            startedAt: '',
            endedAt: '',
            createdAt: '',
            updatedAt: '',
            nodeDataFieldKey: nodeTemplate.nodeDataFieldKey,
            type: nodeTemplate.nodeType,
        }
        nodeInstances.push(nodeInstance)
    }
    return nodeInstances
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

const onNodePropertyUpdate = ({nodeId, key, value}) => {
}
</script>

<template>


    <el-container class="flow-runtime">
        <el-aside class="flow-runtime__aside">
            <div>运行历史</div>
        </el-aside>

        <el-main class="flow-runtime__main">
            <VueFlow
                :nodes="nodes"
                :edges="edges"
                :node-types="vueFlowNodeTypes"
                :nodes-draggable="false"
                @node-click="onNodeClick"
            >
                <Background pattern-color="#e5e7eb" :gap="10" width="100px"/>
            </VueFlow>
        </el-main>

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

.flow-runtime {
    height: calc(100vh - 40px);
    background-color: #f5f7fa;
}

.flow-runtime__aside {
    padding: 12px;
    border-right: 1px solid #e4e7ed;
    background-color: #ffffff;
    box-sizing: border-box;
}

.flow-runtime__main {
    padding: 12px;
    background-color: #f5f7fa;
}
</style>