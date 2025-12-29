<script setup lang="ts" generic="T">

import type {CardListProps} from "@/components/base/list/BaseCardList.type.ts";
import type {CardListEmits} from "@/components/base/list/BaseCardList.emits.ts";


// Props
const props = withDefaults(defineProps<CardListProps<T>>(), {
    loading: false,
    loadingMessage: "Loading...",
    error: false,
    errorMessage: "An error occurred",
    emptyMessage: "No items",
    editable: false,
    deletable: false,
    showActions: true,
    cardClass: "",
    listClass: "",
    getKey: (item: T): string => {
        if ("id" in item) return item.id;
        else if ("typeKey" in item) return item.typeKey;
    }
})

// Emits
const emit = defineEmits<CardListEmits<T>>()

</script>

<template>
    <div :class="['card-list', props.listClass]">

        <el-skeleton
            v-if="props.loading"
            :rows="3"
            animated
            class="card-list__state"
        >
            <template #template>
                <el-skeleton-item variant="rect" style="height: 120px"/>
            </template>
        </el-skeleton>


        <!--        Error State-->
        <el-empty
            v-else-if="props.items.length === 0"
            :description="String(props.emptyMessage)"
            class="card-list__state"
        />

        <el-card
            v-else
            v-for="(item, index) in props.items"
            :key="getKey(item)"
            shadow="never"
            :class="['card-list__item', cardClass]"
            @click="$emit('item-click', item, index)"
        >

            <template
                v-if="props.showActions && (props.editable || props.deletable)"
                #header
            >
                <div class="card-list__header">
                    <div class="card-list__actions">
                        <el-button
                            v-if="props.editable"
                            link
                            type="success"
                            size="small"
                            @click.stop="$emit('edit', item, index)"
                        >
                            <slot name="edit-icon">✔</slot>
                        </el-button>

                        <el-button
                            v-if="props.deletable"
                            link
                            type="danger"
                            size="small"
                            @click.stop="$emit('delete', item, index)"
                        >
                            <slot name="delete-icon">🗑</slot>
                        </el-button>
                    </div>
                </div>
            </template>

            <slot :item="item" :index="index">
                <div class="card-list__item-title">{{ item }}</div>
                <div class="card-list__item-description">{{ item }}</div>
            </slot>
        </el-card>

    </div>
</template>

<style scoped>
.card-list {
    width: 100%;
}

.card-list__item {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    position: relative;
    background-color: #fff;
    margin-bottom: 12px;
}

.card-list__item:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.card-list__item-title {
    font-weight: bold;
    margin-bottom: 0.5rem;
}

.card-list__item-description {
    color: #666;
    font-size: 0.9em;
}

.card-list__state {
    text-align: center;
    padding: 2rem;
    color: #666;
    font-style: italic;
}

.card-list__actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    gap: 0.25rem;
}

.card-list__action-btn {
    background: none;
    border: 1px solid transparent; /* Invisible border to maintain size on focus/hover */
    border-radius: 4px;
    padding: 0.25rem;
    cursor: pointer;
    font-size: 1rem; /* Match icon size */
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    transition: opacity 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
}

.card-list__action-btn:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05); /* Light hover effect */
    border-color: rgba(0, 0, 0, 0.1);
}

.card-list__action-btn:focus {
    outline: 2px solid #007bff; /* Or your primary color */
    outline-offset: 1px;
}
</style>