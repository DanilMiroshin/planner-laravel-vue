<template>
    <div class="h-12 border-b grid grid-cols-2 gap-4 justify-items-stretch">
        <div class='pl-6 flex justify-self-start items-center'>
            <h3 class="text-grey-darkest font-extrabold">
                #Сегодня
            </h3>
        </div>
        <div class='pr-12 flex justify-self-end items-center'>
            <a class="text-grey-dark text-sm truncate hover:text-charcoal cursor-pointer">
                Настройки
            </a>
            <a class="text-grey-dark text-sm truncate pl-4 hover:text-charcoal cursor-pointer" v-on:click="signout" href="#">
                Выход
            </a>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    export default {
        methods: {
            ...mapActions({
                signoutAction: 'auth/signOut'
            }),

            signout() {
                this.signoutAction().then(() => {
                    this.$router.replace({
                        name: 'login'
                    })
                })
            }
        }
    }
</script>
