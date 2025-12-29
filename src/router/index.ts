import {createRouter, createWebHistory} from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Home from "@/views/Home.vue";
import MainLayout from "@/components/main/MainLayout.vue";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainLayout,
        redirect: 'home',
        children: [
            {
                path: 'home',
                component: Home
            }
        ]
    },
    {
        path: '/flow/:flowId',
        name: 'FlowEditor',
        component: () => import('@/views/flow/FlowEditor.vue'),
        props: true
    }
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router