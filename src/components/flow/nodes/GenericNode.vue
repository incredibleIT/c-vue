<script setup lang="ts">

import type {NodeRunStatus} from "@/types/node-status.ts";

defineProps<{
    data: {
        label: string
        status: NodeRunStatus
    }
}> ()
</script>

<template>
    <div class="generic-node" :class="data.status?.toLowerCase()">
        {{ data.label }}
    </div>
</template>

<style scoped>
.generic-node {
    padding: 8px 12px;
    border-radius: 6px;
    background: #ffffff;
    border: 1px solid #dcdfe6;
    font-size: 12px;
}

.generic-node.running {
    border: green 1px solid;
}

.generic-node.success {
    border: #67c23a 1px solid;
}

.generic-node.failed {
    border: #f56c6c 1px solid;
}

.generic-node.completed {
    border: #dab94b 1px solid;
}

</style>
