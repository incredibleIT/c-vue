<script setup lang="ts">

defineProps<{
    data: {
        label: string
    }
}> ()
</script>

<template>
    <div class="generic-node">
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
</style>
