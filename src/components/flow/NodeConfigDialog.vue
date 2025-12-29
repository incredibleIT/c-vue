<script setup lang="ts">
import type {FlowNode} from "@/types/flow-node-vueflow.ts";
import type {NodeType} from "@/types/node-type.ts";
import NodePropertiesPanel from "@/components/flow/NodePropertiesPanel.vue";

const props = defineProps<{
    node: FlowNode
    nodeType: NodeType
}>()

const emit = defineEmits<{
    (e: 'close'): void
    (e: 'update', payload: {
        nodeId: string
        key: string
        value: any
    }): void
}>()
</script>

<template>

    <el-dialog
        :model-value="true"
        width="80%"
        top="5vh"
        :close-on-click-modal="false"
        @close="emit('close')"
        transition="dialog-fade"
        style="background-color: #f5f7fa"
    >
        <!-- Body -->
        <div class="dialog-body">
            <div class="side-panel input-panel">
                <div class="panel-header">INPUT</div>
                <div class="panel-content placeholder">
                    上游节点输出（预留）<br>
                </div>
            </div>

            <div class="center-panel">
                <NodePropertiesPanel
                    :node="node"
                    :node-type="nodeType"
                    @update="emit('update', $event)"
                />
            </div>

            <div class="side-panel output-panel">
                <div class="panel-header">OUTPUT</div>
                <div class="panel-content placeholder">
                    下游节点输入（预留）
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<style scoped>

.dialog-body {
    display: grid;
    grid-template-columns: 360px 1fr 360px;
    gap: 16px;
    height: 100%;
}

.placeholder {
    border: 1px dashed #e4e7ed;
    border-radius: 6px;
    background-color: #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
}

.center-panel {
    padding: 20px;
}

.side-panel {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 8px;
    border: 1px solid #ebeef5;
    overflow: hidden;
}

.panel-header {
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    font-size: 12px;
    font-weight: 600;
    color: #606266;
    background-color: #f9fafc;
    border-bottom: 1px solid #ebeef5;
}

.panel-content {
    flex: 1;
    padding: 12px;
    font-size: 12px;
    color: #909399;
}

.center-panel {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px 24px;
    box-shadow:
        0 2px 12px rgba(0, 0, 0, 0.06);
    overflow-y: auto;
}

:deep(.el-dialog__body) {
    padding: 16px;
    height: 90vh;
}

:deep(.el-dialog__header) {
    padding: 0;
    border-bottom: none;
}


</style>