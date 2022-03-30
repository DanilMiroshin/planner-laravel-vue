<template>

    <div class="h-screen overflow-hidden flex items-center justify-center "  style="background: #edf2f7;">
        <div class="font-sans antialiased h-screen flex w-full">
            <!-- Sidebar -->
            <SideBar :user ="user" @clicked="getCategory"></SideBar>

            <!-- Main content -->
            <div class="flex-1 flex flex-col bg-white">
                <TopBar :category_name = "categoryName"></TopBar>
                 <!-- Tasks-crud or settings -->
                <router-view :user = "user" :category-id = "categoryId"></router-view>
            </div>
        </div>
    </div>

</template>

<script>

    import TopBar from './LayoutTopBar.vue'
    import SideBar from './LayoutSideBar.vue'

    export default {
        components: {
            SideBar, TopBar
        },

        computed: {
            user() {
                return this.$store.getters.user;
            }
        },

        data() {
            return {
                categoryId: null,
                categoryName: 'Все задачи',
            }
        },

        methods: {
            getCategory(value) {
                this.categoryId = value.id;
                this.categoryName = value.name ? 'Все задачи' : value.name;
            }
        }
    }

</script>
