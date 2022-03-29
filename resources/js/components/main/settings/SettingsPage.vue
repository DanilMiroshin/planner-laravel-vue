<template>
   <div class ='h-full flex-1 flex-col flex bg-white w-full overflow-hidden'>
        <div class="w-full px-6 py-4 flex-1 overflow-y-scroll">
            <loader v-show="isLoading" object="#52796f" color1="#ffffff" color2="#fa0000" size="3" speed="1" bg="#000000" objectbg="#ffffff" opacity="95" name="spinning"></loader>
            <div class="w-full">
                <div v-show="success" class="bg-teal-100 border border-teal-500 px-4 py-3 rounded relative mb-8" role="alert">
                    <strong class="font-bold">Успешно!</strong>
                    <span class="block sm:inline">Данные обновлены</span>
                    <span v-on:click="dismissMessage" class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg class="fill-current h-6 w-6 text-teal-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Закрыть</title>
                            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                        </svg>
                    </span>
                </div>
                <router-link to='/' class='leading-tight text-gray-700 hover:text-charcoal'>Назад к задачам</router-link>
                <!-- Change name block -->
                <form @submit.prevent="updateName" class="flex flex-wrap -mx-3 mb-6 bg-gray-100 p-2">
                    <div class="w-full px-3 mb-6 md:mb-0">

                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                            Имя
                        </label>

                        <input v-bind:class="{ 'border-gray-200': !errors.name, 'border-red': errors && errors.name }" class="appearance-none block w-full bg-white text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none" id="grid-name" type="text" v-model='name'>
                        <p v-if="errors && errors.name" class="text-red text-xs italic">{{ errors.name[0] }}</p>

                        <input  type="submit" value="Изменить" class="bg-hookers-green cursor-pointer text-white text-lg hover:bg-dark-slate-gray p-2 mt-2 rounded">
                    </div>
                </form>

                <!-- Change mail block -->
                <form @submit.prevent="updateEmail" class="flex flex-wrap -mx-3 mb-6 bg-gray-100 p-2">

                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                            Почта
                        </label>

                        <input v-bind:class="{ 'border-gray-200': !errors.email, 'border-red': errors && errors.email }" v-model="email" class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" id="grid-email" type="email">
                        <p v-if="errors && errors.email" class="text-red text-xs italic">{{ errors.email[0] }}</p>

                        <input type="submit" value="Изменить" class="bg-hookers-green cursor-pointer text-white text-lg hover:bg-dark-slate-gray p-2 mt-2 rounded">
                    </div>
                </form>
                <!-- Change password block -->
                <form @submit.prevent="updatePassword" class="flex flex-wrap -mx-3 mb-6 bg-gray-100 p-2">
                    <div class="w-full px-3">
                        <!-- Old password -->
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-old-password">
                            Старый пароль
                        </label>

                        <input v-bind:class="{ 'border-gray-200': !errors.old_password, 'border-red': errors && errors.old_password }" v-model='old_password' name="old_password" class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:border-gray-500" id="grid-old-password" type="password">
                        <p v-if="errors && errors.old_password" class="text-red text-xs italic">{{ errors.old_password[0] }}</p>

                        <!-- New password -->
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Новый пароль
                        </label>

                        <input v-bind:class="{ 'border-gray-200': !errors.password, 'border-red': errors && errors.password }" v-model='password' name="password" class="appearance-none block w-full bg-white text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password">
                        <p v-if="errors && errors.password" class="text-red text-xs italic">{{ errors.password[0] }}</p>

                        <!-- Confirm password -->
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password-confirmation">
                            Повторите пароль
                        </label>

                        <input v-model='password_confirmation' name="password_confirmation" class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password-confirmation" type="password">

                        <input type="submit" value="Изменить" class="bg-hookers-green cursor-pointer text-white text-lg hover:bg-dark-slate-gray p-2 mt-2 rounded">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['user'],

        data: function() {
            return {
                name: this.user.name,
                email: this.user.email,
                old_password: '',
                password: '',
                password_confirmation: '',
                errors: {},
                success: false,
                isLoading: false,
            }
        },

        methods: {
            updateName: function() {
                this.isLoading = true;
                axios.patch('api/v1/update/name', {
                    'token': localStorage.getItem('token'),
                    'name': this.name
                })
                .then(() => {
                    this.isLoading = false;
                    this.success = true;
                    this.errors = {};
                }).catch(error => {
                    this.isLoading = false;
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                })
             },

            updateEmail: function() {
                this.isLoading = true;
                axios.patch('api/v1/update/email', {
                    'token': localStorage.getItem('token'),
                    'email': this.email
                })
                .then(() => {
                    this.success = true;
                    this.isLoading = false;
                    this.errors = {};
                }).catch(error => {
                    this.isLoading = false;
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                })
             },

            updatePassword: function() {
                this.isLoading = true;
                axios.patch('api/v1/update/password', {
                    'token': localStorage.getItem('token'),
                    'password': this.password,
                    'old_password': this.old_password,
                    'password_confirmation': this.password_confirmation
                })
                .then(() => {
                    this.success = true;
                    this.isLoading = false;
                    this.errors = {};
                    this.password = '';
                    this.old_password = '';
                    this.password_confirmation = '';
                }).catch(error => {
                    this.isLoading = false;
                    if (error.response.status == 422) {
                        this.errors = error.response.data.errors;
                    }
                })
             },

            dismissMessage: function() {
                this.success = false;
            },
        }
    }
</script>
