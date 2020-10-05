<template>
   <div class ='h-full flex-1 flex-col flex bg-white w-full overflow-hidden'>
        <div class="w-full px-6 py-4 flex-1 overflow-y-scroll">
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

                <!-- Change name block -->
                <form @submit="updateUserInfo(data.name)" class="flex flex-wrap -mx-3 mb-6 bg-gray-100 p-2">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                            Имя
                        </label>
                        
                        <input class="appearance-none block w-full bg-white text-gray-700 border border-red rounded py-3 px-4 leading-tight focus:outline-none" id="grid-name" type="text" :placeholder="[[ user.name ]]" v-model='data.name'>
                        <p class="text-red text-xs italic">Ошибка</p>
                        <input type="submit" value="Изменить" class="bg-hookers-green cursor-pointer text-white text-lg hover:bg-dark-slate-gray p-2 mt-2 rounded">       
                    </div>
                </form>

                <!-- Change email block -->
                <form @submit="updateUserInfo(data.email)" class="flex flex-wrap -mx-3 mb-6 bg-gray-100 p-2">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                            Почта
                        </label>
        
                        <input v-model="data.email" class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" id="grid-email" type="email" :placeholder="[[ user.email ]]">
                        <p class="text-red text-xs italic">Ошибка</p>

                        <input type="submit" value="Изменить" class="bg-hookers-green cursor-pointer text-white text-lg hover:bg-dark-slate-gray p-2 mt-2 rounded">
                    </div>
                </form>

                <!-- Change password block -->
                <form @submit="updateUserInfo(data.passwords)" class="flex flex-wrap -mx-3 mb-6 bg-gray-100 p-2">
                    <div class="w-full px-3">
                        <!-- Old password -->
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-old-password">
                            Старый пароль
                        </label>
                        
                        <input v-model='data.passwords.old_password' name="old_password" class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:border-gray-500" id="grid-old-password" type="password">
                        <p class="text-red text-xs italic mb-2">Ошибка</p>

                        <!-- New password -->
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Новый пароль
                        </label>
                        
                        <input v-model='data.passwords.password' name="password" class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password">
                        <p class="text-red text-xs italic mb-2">Ошибка</p>

                        <!-- Confirm password -->
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password-confirmation">
                            Повторите пароль
                        </label>
                        
                        <input v-model='data.passwords.password_confirmation' name="password_confirmation" class="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password-confirmation" type="password">
                        <p class="text-red text-xs italic mb-2">Ошибка</p>

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
                data: {
                    name: '',
                    email: '',
                    passwords: {
                        old_password: '',
                        password: '',
                        password_confirmation: '',
                    }
                },  
                errors: {},
                success: false,
            } 
        },

        methods: {
            updateUserInfo: function(data) {
                console.log(data)
            },

            dismissMessage: function() {
                this.success = false;
            },
        }
    }
</script>
