<template>
    <div class="bg-charcoal text-purple-lighter flex-none w-64 pb-6 hidden md:block h-screen">
        <div class="text-white mb-2 mt-3 px-4 flex justify-between">
            <div class="flex-auto">
                <h1 class="font-semibold text-xl leading-tight mb-1 truncate">Planner</h1>
                <div class="flex items-center mb-6">
                    <span class="bg-green rounded-full block w-2 h-2 mr-2"></span>
                    <span class="text-white opacity-50 text-sm">{{ user.name }}</span>
                </div>
            </div>
        </div>
        <div class="mb-8">
            <div class="px-4 mb-2 text-white flex justify-between items-center">
                <div class="opacity-75 cursor-default">Задачи</div>
                <!-- <div>
                    <svg class="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                    </svg>
                </div> -->
            </div>
            <div class="bg-hookers-green py-1 px-4 text-white">
                <a href="#"># сегодня</a>
            </div>
        </div>
<!--         <div class="mb-8">
            <div class="px-4 mb-2 text-white flex justify-between items-center">
                <div class="text-white opacity-75 cursor-default"></div>
                <div>
                    <svg class="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                    </svg>
                </div>
            </div>
            <div class="flex items-center mb-3 px-4">
                <a class="text-white opacity-75" href="#"></a>
            </div>
            <div class="flex items-center mb-3 px-4">
                <a class="text-white opacity-75 hover:text-hookers-green cursor-pointer"></a>
            </div>
        </div> -->
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        computed: {
            ...mapGetters ({
                authenticated: 'auth/authenticated',
                user: 'auth/user'
            })
        },
    }
</script>
