<template>
<div class="bg-white font-family-karla h-screen">
    <div class="w-full flex flex-wrap">
        <!-- Login Section -->
        <div class="w-full md:w-1/2 flex flex-col">

            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Регистрация</p>
                <form @submit.prevent="submit"  method="POST" class="flex flex-col pt-3 md:pt-8">
                    <div class="flex flex-col pt-4">
                        <label for="email" class="text-lg">Почта</label>
                        <input v-bind:class="{ 'border-gray-200': !errors.email, 'border-red': errors.email }"
                        v-model='user.email'
                        type="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline" autofocus>
                    </div>
                    <p class="text-red text-xs italic" v-if="errors && errors.email">{{ errors.email[0] }}</p>

                    <div class="flex flex-col pt-4">
                        <label for="name" class="text-lg">Имя</label>
                        <input
                        v-bind:class="{ 'border-gray-200': !errors.name, 'border-red': errors.name }"
                        v-model='user.name' type="text" name="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <p class="text-red text-xs italic" v-if="errors && errors.name">{{ errors.name[0] }}</p>

                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">Пароль</label>
                        <input
                        v-bind:class="{ 'border-gray-200': !errors.password, 'border-red': errors.password }"
                        v-model='user.password' type="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <p class="text-red text-xs italic" v-if="errors && errors.password">{{ errors.password[0] }}</p>

                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">Повторите пароль</label>
                        <input v-model='user.password_confirmation' type="password" name="password_confirmation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>

                    <input type="submit" value="Присоединиться" class="bg-hookers-green cursor-pointer text-white font-bold text-lg hover:bg-dark-slate-gray p-2 mt-8">
                </form>
                <div class="text-center pt-12 pb-12">
                    <p>Уже есть аккаунт?
                        <router-link class="text-hookers-green underline font-semibold hover:text-dark-slate-gray" to="login">Войти</router-link>
                    </p>
                </div>
            </div>
        </div>
        <!-- Image Section -->
        <div class="w-1/2 shadow-2xl">
            <img class="object-cover w-full h-screen hidden md:block" src="/imgs/registration.svg">
        </div>
    </div>
</div>
</template>
<script>
    export default {

        data() {
            return {
                errors: {},
                user: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                },
            }
        },

        methods : {
            submit() {
                axios.post('api/v1/auth/register', this.user)
                .then(() => {
                    this.errors = {};
                    this.$router.push('login')
                }).catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                })
            }
        }
    }
</script>
