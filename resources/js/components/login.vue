<template>
<div class="bg-white font-family-karla h-screen">
    <div class="w-full flex flex-wrap">
        <!-- Login Section -->
        <div class="w-full md:w-1/2 flex flex-col">

            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Вход</p>
                <form class="flex flex-col pt-3 md:pt-8"">
        
                    <div class="flex flex-col pt-4">
                        <label for="email" class="text-lg">Почта</label>
                        <input v-model='email' type="email" name="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <p class="text-red text-xs italic" v-if="errors && errors.email">{{ errors.email[0] }}</p>
                   
                    <div class="flex flex-col pt-4">
                        <label for="password" class="text-lg">Пароль</label>
                        <input v-model='password' type="password" name="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <p class="text-red text-xs italic" v-if="errors && errors.password">{{ errors.password[0] }}</p>

                    <div class="flex flex-row justify-between pt-4">
                        <label class="cursor-pointer block text-gray-500 font-bold">
                            <input class="mr-2 leading-tight" type="checkbox">
                            <span class="pb-2 text-sm">
                                Запомнить меня
                            </span>
                        </label>
                        <a href="#" class="text-hookers-green underline font-semibold hover:text-dark-slate-gray">Забыли пароль?</a>
                    </div>

                    <input v-on:click="login" type="button" value="Вход" class="bg-hookers-green cursor-pointer text-white font-bold text-lg hover:bg-dark-slate-gray p-2 mt-8">
                </form>
                <div class="text-center pt-12 pb-12">
                    <p>Ещё нет аккаунта? 
                        <a href="#" class="text-hookers-green underline font-semibold hover:text-dark-slate-gray">Присоединиться</a>
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
    export default {
        data : function (){
            return {
                errors: {},
                email: '',
                password: ''
            } 
        },

        methods : {
            login () {
                    axios.post('api/v1/login', {
                        email: this.email,
                        password: this.password
                    })
                    .then(response => {
                        window.location.href =  '/';                                         
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            this.errors = error.response.data.errors;
                            console.log(this.errors);
                        }
                        console.log(error);
                    });
            }
        }
    }
</script>
