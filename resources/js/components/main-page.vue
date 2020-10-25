<template>
    <div class="h-screen overflow-hidden flex items-center justify-center "  style="background: #edf2f7;">
        <div class="font-sans antialiased h-screen flex w-full">
            <!-- Sidebar -->
            <SideBar :user ="user" @clicked="getCategory"></SideBar>

            <!-- Main content -->
            <div class="flex-1 flex flex-col bg-white">
                <TopBar :category_name = "category_name"></TopBar>
                 <!-- Tasks-crud or settings -->
                <router-view :user = "user" :category_id = "category_id"></router-view>
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
        },

        data : function() {
            return {
                category_id: '',
                category_name: 'Все задачи',
            }
        },

        methods: {
            getCategory(value) {
                this.category_id = value.id;
                this.category_name = value.name == null
                ? 'Все задачи'
                : value.name;
            }
        }
    }
</script>
