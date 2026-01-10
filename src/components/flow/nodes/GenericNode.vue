<script setup lang="ts">

import type {NodeRunStatus} from "@/types/node-status.ts";

defineProps<{
    data: {
        label: string,
        status: NodeRunStatus
    }
}> ()
</script>

<template>
    <div class="generic-node" :class="data.status">
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

.pending {
    border: #007bff 1px solid;
}

.running {
    border: #00ff22 1px solid;
}

.completed {
    border: #28a745 1px solid;
}

.failed {
    border: #dc3545 1px solid;
}

.waiting {
    border: #ffc107 1px solid;
}
</style>
