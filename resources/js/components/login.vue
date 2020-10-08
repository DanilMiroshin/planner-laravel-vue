<template>
<div class="bg-white font-family-karla h-screen">
    <div class="w-full flex flex-wrap">
        <!-- Login Section -->
        <div class="w-full md:w-1/2 flex flex-col">

            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Вход</p>
                <form @submit.prevent="submit" method='POST' class="flex flex-col pt-3 md:pt-8">

                    <!-- Error message -->
                    <div v-if="errors && error_message" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span class="block sm:inline">Почта или пароль не верны.</span>
                    </div>

                    <div class="flex flex-col pt-4">
                        <label for="email" class="text-lg">Почта</label>
                        <input 
                        v-bind:class="{ 'border-gray-200': !errors.email, 'border-red': errors.email }"
                        v-model='user.email' 
                        type="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" autofocus>
                    </div>
                    <p class="text-red text-xs italic" v-if="errors && errors.email">{{ errors.email[0] }}</p>
                   
                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">Пароль</label>
                        <input 
                        v-bind:class="{ 'border-gray-200': !errors.password, 'border-red': errors.password }"
                        v-model='user.password' 
                        type="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <p class="text-red text-xs italic" v-if="errors && errors.password">{{ errors.password[0] }}</p>

<!--                     <div class="flex flex-row justify-between pt-4">
                        <label class="cursor-pointer block text-gray-500 font-bold">
                            <input class="mr-2 leading-tight" type="checkbox">
                            <span class="pb-2 text-sm">
                                Запомнить меня
                            </span>
                        </label>
                        <a href="#" class="text-hookers-green underline font-semibold hover:text-dark-slate-gray">Забыли пароль?</a>
                    </div> -->

                    <input type="submit" value="Вход" class="bg-hookers-green cursor-pointer text-white font-bold text-lg hover:bg-dark-slate-gray p-2 mt-8">
                </form>
                <div class="text-center pt-12 pb-12">
                    <p>Ещё нет аккаунта?
                        <router-link to="registration" class="text-hookers-green underline font-semibold hover:text-dark-slate-gray">Присоединиться</router-link> 
                    </p>
                </div>
            </div>
        </div>
        <!-- Image Section -->
        <div class="w-1/2 shadow-2xl">
            <img class="object-cover w-full h-screen hidden md:block" src="/imgs/login.svg">
        </div>
    </div>
</div>
</template>
<script>
    import { mapActions } from 'vuex'

    export default {
        data : function (){
            return {
                errors: {},
                user: {
                    email: '',
                    password: '',
                },
                error_message: false
            } 
        },

        methods : {
            ...mapActions({
                login: 'auth/login'
            }),

            submit () {
                this.login(this.user)
                .then(() => {
                    this.errors = {};
                    this.$router.replace({
                        name: 'main-page'
                    })
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }

                    if (error.response.status == 401) {
                        this.error_message = true;
                    }
                })
            }
        }
    }
</script>
