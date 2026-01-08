<script setup lang="ts" generic="T">

import type {CardListProps} from "@/components/base/list/BaseCardList.type.ts";
import type {CardListEmits} from "@/components/base/list/BaseCardList.emits.ts";
import { areConnectionMapsEqual } from "node_modules/@vue-flow/core/dist/utils";


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

function syncPointer({x:pointerX, y:pointerY}) {
    const x = pointerX.toFixed(2);
    const y = pointerY.toFixed(2);
    const yp = (pointerY /  window.innerHeight).toFixed(2);

    const {style} = document.documentElement;
    style.setProperty("--pointer-x", x);
    style.setProperty("--pointer-y", y);
    style.setProperty("--pointer-yp", yp);
}

document.body.addEventListener("pointermove", syncPointer)


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
    contain: layout style paint;
}

.card-list__item {
    --hue: calc(0 + var(--pointer-yp, 0.5) * 500);
    --bg-color: #ffffff;
    --glow-opacity: 0;
    --glow-intensity: 0.6;
    
    --glow-bar-gradient: 
        linear-gradient(
            90deg,
            hsl(var(--hue, 200) 85% 45% / calc(var(--glow-intensity) * 0.3)) 0%,
            hsl(var(--hue, 200) 85% 45% / calc(var(--glow-intensity) * 0.6)) 10%,
            hsl(var(--hue, 200) 85% 55% / calc(var(--glow-intensity) * 0.9)) 30%,
            hsl(var(--hue, 200) 85% 60% / calc(var(--glow-intensity) * 1.0)) 50%,
            hsl(var(--hue, 200) 85% 55% / calc(var(--glow-intensity) * 0.9)) 70%,
            hsl(var(--hue, 200) 85% 45% / calc(var(--glow-intensity) * 0.6)) 90%,
            hsl(var(--hue, 200) 85% 45% / calc(var(--glow-intensity) * 0.3)) 100%
        );
    
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    background-color: var(--bg-color);
    margin-bottom: 16px;
    overflow: hidden;
    isolation: isolate;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    transition: all 0.3s ease;
    will-change: box-shadow, opacity, border-color;
}

.card-list__item::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--glow-bar-gradient);
    background-size: 300% 100%;
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
    opacity: var(--glow-opacity);
    
    animation: continuous-glow-flow 6s linear infinite;
    animation-play-state: paused;
    
    background-position: 
        calc((var(--pointer-x, 0) * 1px) - 150px)
        0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-list__item::after {
    content: '';
    position: absolute;
    inset: -4px;
    background: var(--glow-bar-gradient);
    background-size: 300% 100%;
    border-radius: inherit;
    filter: blur(20px);
    pointer-events: none;
    z-index: 0;
    opacity: calc(var(--glow-opacity) * 0.25);
    
    animation: continuous-glow-flow 9s linear infinite;
    animation-play-state: paused;
    
    background-position: 
        calc((var(--pointer-x, 0) * 1px) - 120px)
        0;
    transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes continuous-glow-flow {
    0% {
        background-position: 
            calc((var(--pointer-x, 0) * 1px) - 150px)
            0;
    }
    100% {
        background-position: 
            calc((var(--pointer-x, 0) * 1px) - 150px + 300px)
            0;
    }
}

.card-list__item-title {
    font-weight: 600;
    margin-bottom: 8px;
    color: #222222;
    font-size: 1.15rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    position: relative;
    z-index: 3;
    transition: color 0.3s ease;
    letter-spacing: 0.01em;
}

.card-list__item-description {
    color: #444444;
    font-size: 0.9rem;
    line-height: 1.5;
    position: relative;
    z-index: 3;
    transition: color 0.3s ease;
}

.card-list__item:hover {
    --glow-opacity: 0.8;
    --glow-intensity: 0.75;
    background-color: #ffffff;
    
    .card-list__item::before,
    .card-list__item::after {
        animation-play-state: running;
    }
    
    border-color: hsl(var(--hue, 200) 85% 50% / 0.6);
    box-shadow: 
        0 8px 28px rgba(0, 0, 0, 0.12),
        0 0 0 1px hsl(var(--hue, 200) 85% 50% / 0.4),
        inset 0 0 40px hsl(var(--hue, 200) 85% 50% / 0.1);
}

.card-list__item:hover .card-list__item-title {
    color: transparent;
    background: var(--glow-bar-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    background-size: 300% 100%;
    
    animation: continuous-glow-flow 6s linear infinite;
    animation-play-state: running;
    
    background-position: 
        calc((var(--pointer-x, 0) * 1px) - 150px)
        0;
    text-shadow: none;
    
    filter: 
        drop-shadow(0 0 6px hsl(var(--hue, 200) 85% 50% / 0.6))
        drop-shadow(0 0 12px hsl(var(--hue, 200) 85% 50% / 0.3));
    
    font-weight: 700;
}

.card-list__item:hover .card-list__item-description {
    color: transparent;
    background: var(--glow-bar-gradient);
    background-clip: text;
    -webkit-background-clip: text;
    background-size: 300% 100%;
    
    animation: continuous-glow-flow 6s linear infinite;
    animation-play-state: running;
    
    background-position: 
        calc((var(--pointer-x, 0) * 1px) - 150px)
        0;
    
    filter: 
        drop-shadow(0 0 4px hsl(var(--hue, 200) 85% 50% / 0.4));
}

.card-list__item:active {
    transition-duration: 0.1s;
    --glow-intensity: 0.9;
    box-shadow: 
        0 4px 16px rgba(0, 0, 0, 0.1),
        0 0 0 1px hsl(var(--hue, 200) 85% 50% / 0.5);
}

.card-list__item :deep(.el-card__body) {
    position: relative;
    z-index: 2;
    padding: 16px;
}

.card-list__actions {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    gap: 6px;
    z-index: 4;
    opacity: 0;
    transition: all 0.3s ease;
}

.card-list__item:hover .card-list__actions {
    opacity: 1;
}

.card-list__action-btn {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 5px 7px;
    cursor: pointer;
    font-size: 13px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #444444;
    transition: all 0.2s ease;
    backdrop-filter: blur(6px);
    z-index: 4;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card-list__action-btn:hover {
    background: rgba(255, 255, 255, 1);
    border-color: hsl(var(--hue, 200) 85% 50% / 0.6);
    color: #222222;
    transform: scale(1.05);
    box-shadow: 
        0 4px 10px rgba(0, 0, 0, 0.08),
        0 0 8px hsl(var(--hue, 200) 85% 50% / 0.3);
}

.card-list__action-btn:focus-visible {
    outline: 2px solid hsl(var(--hue, 200) 85% 50%);
    outline-offset: 2px;
}

.card-list__state {
    text-align: center;
    padding: 2rem;
    color: #666666;
    font-style: italic;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.7);
    border: 1px solid #e0e0e0;
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

@media (prefers-reduced-motion: reduce) {
    .card-list__item,
    .card-list__item::before,
    .card-list__item::after,
    .card-list__actions,
    .card-list__item-title,
    .card-list__item-description {
        transition: none !important;
        animation: none !important;
    }
    
    .card-list__item:hover .card-list__item-title,
    .card-list__item:hover .card-list__item-description {
        color: hsl(var(--hue, 200) 85% 50%);
        background: none;
        filter: none;
        text-shadow: 0 0 4px hsl(var(--hue, 200) 85% 50% / 0.5);
    }
    
    .card-list__action-btn:hover {
        transform: none;
    }
}

@media (max-width: 768px) {
    .card-list__item {
        margin-bottom: 12px;
    }
    
    .card-list__item-title {
        font-size: 1rem;
    }
    
    .card-list__item-description {
        font-size: 0.85rem;
    }
    
    .card-list__actions {
        top: 8px;
        right: 8px;
        gap: 4px;
    }
    
    .card-list__action-btn {
        padding: 4px 6px;
        font-size: 12px;
    }
}

@media (prefers-contrast: high) {
    .card-list__item {
        border-color: #000000;
    }
    
    .card-list__item-title {
        color: #000000;
    }
    
    .card-list__item-description {
        color: #000000;
    }
    
    .card-list__item:hover .card-list__item-title,
    .card-list__item:hover .card-list__item-description {
        color: #000000 !important;
        background: none !important;
        filter: none !important;
        animation: none !important;
        text-shadow: none;
    }
}
</style>