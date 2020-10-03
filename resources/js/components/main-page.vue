<template>
    <div class="h-screen overflow-hidden flex items-center justify-center "  style="background: #edf2f7;">
        <div class="font-sans antialiased h-screen flex w-full">
            <!-- Sidebar -->
             <SideBar></SideBar>

            <!-- Main content -->
            <div class="flex-1 flex flex-col bg-white">
                <TopBar></TopBar>
                <TasksCrud></TasksCrud>
            </div>
        </div>
    </div>
</template>
<script>
    import TopBar from './top-bar.vue'
    import SideBar from './side-bar.vue'
    import TasksCrud from './tasks-crud.vue'

    export default {
        components: {
            SideBar, TopBar, TasksCrud
        }
    }
</script>
