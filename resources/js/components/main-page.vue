<template>
    <div class="h-screen overflow-hidden flex items-center justify-center "  style="background: #edf2f7;">
        <div class="font-sans antialiased h-screen flex w-full">
            <!-- Sidebar -->
             <SideBar :user ="user"></SideBar>

            <!-- Main content -->
            <div class="flex-1 flex flex-col bg-white">
                <TopBar></TopBar>
                <router-view :user ="user"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    import TopBar from './top-bar.vue'
    import SideBar from './side-bar.vue'
    
    export default {
        components: {
            SideBar, TopBar
        },

        computed: {
            ...mapGetters ({
                user: 'auth/user'
            })
        }
    }
</script>
