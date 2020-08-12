<template>
<div class="font-sans antialiased h-screen flex w-full">
    <!-- Sidebar -->
    <div class="bg-charcoal text-purple-lighter flex-none w-64 pb-6 hidden md:block">
        <div class="text-white mb-2 mt-3 px-4 flex justify-between">
            <div class="flex-auto">
                <h1 class="font-semibold text-xl leading-tight mb-1 truncate">Planner</h1>
                <div class="flex items-center mb-6">
                    <span class="bg-green rounded-full block w-2 h-2 mr-2"></span>
                    <span class="text-white opacity-50 text-sm">Adam Wathan</span>
                </div>
            </div>
        </div>
        <div class="mb-8">
            <div class="px-4 mb-2 text-white flex justify-between items-center">
                <div class="opacity-75">Задачи</div>
                <div>
                    <svg class="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                    </svg>
                </div>
            </div>
            <div class="bg-hookers-green py-1 px-4 text-white">
                <a href="#"># сегодня</a>
            </div>
        </div>
        <div class="mb-8">
            <div class="px-4 mb-2 text-white flex justify-between items-center">
                <div class="opacity-75">Adam Wathan</div>
                <div>
                    <svg class="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                    </svg>
                </div>
            </div>
            <div class="flex items-center mb-3 px-4">
                <a class="text-white opacity-75" href="#">Настройки</a>
            </div>
            <div class="flex items-center mb-3 px-4">
                <a class="text-white opacity-75" href="#">Выход</a>
            </div>
        </div>
    </div>
    <!-- Tasks content -->
    <div class="flex-1 flex flex-col bg-white w-full overflow-hidden">
        <!-- Top bar -->
        <div class="border-b flex px-6  py-2 items-center justify-between">
            <div>
                <h3 class="text-grey-darkest font-extrabold">
                    #Сегодня
                </h3>
            </div>
            <div class='flex flex-row py-2'>
                <a class="text-grey-dark mb-1 text-sm truncate float-right" href="#">
                    Настройки
                </a>
                <a class="text-grey-dark text-sm truncate pl-4" href="#">
                    Выход
                </a>
            </div>
        </div>
        <div class="px-6 py-4 flex-1 overflow-y-scroll">
            <!-- Successs message -->
            <div v-show="success" class="bg-teal-100 border border-teal-500 text-red-700 px-4 py-3 rounded relative mb-8" role="alert">
                <strong class="font-bold">Успешно!</strong>
                <span class="block sm:inline">{{ message }}</span>
                <span v-on:click="dismissMessage" class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-teal-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <title>Закрыть</title>
                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
                    </svg>
                </span>
            </div>
            <!-- Task -->
            <div class="flex items-start mb-4" v-for='task in tasks'>
                <div class="flex-1 overflow-hidden">
                    <div class="flex rounded-lg border-2 border-hookers-green overflow-hidden">
                        <!-- Complete button -->
                        <button class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <title>Выполнить</title>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </button>
                        <!-- Edit button -->
                        <button v-on:click="showModal(task)" class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <title>Изменить</title>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>
                        <!-- Delete button -->
                        <button v-on:click="deleteTask(task.id)" class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <title>Удалить</title>
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                        <span class="font-sans text-xl align-middle w-full px-4 py-3">
                            {{ task.description }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Add button -->
        <div class="pb-6 px-4 flex-none">
            <!-- Error message -->
            <p class="text-red text-xs italic" v-if="errors && errors.description">{{ errors.description[0] }}</p>
            <div class="flex rounded-lg border-2 border-grey overflow-hidden">
                <button v-on:click="createTask" class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
                    <svg class="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/></svg>
                </button>
                <input type="text" name="description" class="w-full px-4" v-model='task.description' placeholder="Добавьте задачу" autofocus required />               
            </div>
        </div>
    </div>
    <!-- Background overlay -->
    <div v-show="overlay" class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>
    <!-- Modal -->
    <div v-show="modalShown" class="fixed bottom-0 inset-x-0 px-4 pb-4 sm:inset-0 sm:flex sm:items-center sm:justify-center">  
        <div class="bg-gray rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                    <div class="mt-2 mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 sm:mx-0 sm:h-10 sm:w-10">
                        <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                        </svg>
                    </div>
                    <div class="w-full mt-5 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div class="w-full mt-2">
                            <input type="text" name="description" class="w-full h-8 border-b border-charcoal" v-model='selectedTask.description' required />
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span class="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button v-on:click="editTask" type="submit" class="inline-flex justify-center w-full hover:bg-hookers-green rounded-md border border-transparent px-4 py-2 bg-charcoal text-base leading-6 font-medium text-white shadow-sm hover:charcoal focus:outline-none focus:border-charcoal focus:shadow-outline-charcoal transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                        Редактировать
                    </button>
                </span>
                <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button v-on:click="hideModal" type="button" class="inline-flex justify-center w-full hover:bg-charcoal rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-white focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                        Отмена
                    </button>
                </span>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    export default {
        data : function() {
            return {
                tasks: [],
                task: {},
                selectedTask : {},
                success: false,
                errors: {},
                message: '',
                overlay: true,
                modalShown: false
            }
        },

        mounted() {
            this.loadTasks();
            this.overlay = false;
        },

        methods: {
            hideModal() {
                this.modalShown = false;
                this.overlay = false;   
            },

            showModal(task) {
                this.selectedTask = task;
                this.overlay = true;
                this.modalShown = true;
            },

            dismissMessage: function () {
                this.success = false;
            },

            createTask: function () {
                axios.post('api/v1/tasks/', this.task)
                    .then(response => {
                        this.loadTasks(); 
                        this.task = {};                      
                        this.message = 'Задача добавлена';
                        this.success = true;
                        this.errors = {};                                           
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            this.errors = error.response.data.errors;
                        }
                        console.log(error);
                    }); 
            },

            loadTasks: function () {
                axios.get('api/v1/tasks')
                    .then((response) => {
                        this.tasks = response.data.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    }); 
            },

            deleteTask: function(id) {
                if (confirm('Вы уверены?')) {
                    axios.delete('api/v1/tasks/' + id)
                        .then((response) => {
                            this.success = false; 
                            this.loadTasks();                          
                            this.message = 'Задача удаленна';
                            this.success = true;                                               
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } 
            },

            editTask: function() {        
                axios.put('api/v1/tasks/' + this.selectedTask.id, {
                    description: this.selectedTask.description
                })
                    .then((response) => {
                        this.loadTasks();
                        this.hideModal();
                        this.selectedTask.task = {};                          
                        this.message = 'Задача изменена';
                        this.success = true;                                             
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        }
    }
</script>

