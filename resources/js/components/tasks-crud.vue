<template>
    <div class ='h-full flex-1 flex-col flex bg-white w-full overflow-hidden'>
        <div class="px-6 py-4 flex-1 overflow-y-scroll">
            <loader v-show="isLoading" object="#52796f" color1="#ffffff" color2="#fa0000" size="3" speed="1" bg="#000000" objectbg="#ffffff" opacity="95" name="spinning"></loader>

            <!-- Successs message -->
            <div v-show="success" class="bg-teal-100 border border-teal-500 px-4 py-3 rounded relative mb-8" role="alert">
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
                    <div
                    v-bind:class="{ 'bg-white': !task.completed, 'bg-gray-200': task.completed }"
                    class="flex rounded-lg border-2 border-hookers-green overflow-hidden">
                        <!-- Complete button -->
                        <button v-on:click="completeTask(task.id)"
                        class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <title>Выполнить-отменить</title>
                                <!-- Undo icon -->
                                <path
                                v-bind:class="{ 'hidden': !task.completed }"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                                />
                                <!-- Complete icon -->
                                <path
                                    v-bind:class="{ 'hidden': task.completed }"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </button>
                        <!-- Edit button -->
                        <button
                        v-bind:class="{ 'hidden': task.completed }"
                        v-on:click="showModal(task)"
                        class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
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
                        <span v-bind:class="{ 'line-through': task.completed }"
                        class="font-sans text-lg align-middle w-full px-4 py-3">
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
            <form @submit.prevent="createTask"
                v-bind:class="{ 'border-grey': !errors.description, 'border-red': errors.description }"
                class="flex rounded-lg border-2 overflow-hidden">
                <button type="submit" class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
                    <svg class="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/></svg>
                </button>
                <input type="text" name="description" class="w-full px-4" v-model='task.description' placeholder="Добавьте задачу" autofocus required />
            </form>
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
    import { mapGetters, mapActions } from 'vuex'

    export default {

        props: ['category_id'],

        data : function() {
            return {
                tasks: [],
                isLoading: true,
                task: {},
                selectedTask: {},
                success: false,
                errors: {},
                message: '',
                overlay: true,
                modalShown: false
            }
        },

        watch: {
            category_id: function (newCategoryId) {
                this.isLoading = true;
                this.loadTasks(newCategoryId);
            }
        },

        mounted() {
            this.loadTasks();
            this.overlay = false;
        },

        methods: {
            ...mapActions({
                getTasks: 'tasks/loadTasks',
                makeTask: 'tasks/makeTask',
                destroyTask: 'tasks/destroyTask',
                updateTask: 'tasks/updateTask',
                toggleTask: 'tasks/toggleTask',
            }),

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

            loadTasks: function (category_id = '') {
                this.getTasks(category_id)
                    .then((response) => {
                        this.tasks = response.data.data;
                        this.isLoading = false;
                    })
            },

            createTask: function () {
                this.makeTask(this.task)
                    .then(() => {
                        this.isLoading = true;
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
                    });
            },

            deleteTask: function(id) {
                if (confirm('Вы уверены?')) {
                    this.destroyTask(id)
                        .then((response) => {
                            this.isLoading = true;
                            this.success = false;
                            this.loadTasks();
                            this.message = 'Задача удаленна';
                            this.success = true;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },

            editTask: function() {
                this.updateTask(this.selectedTask)
                    .then((response) => {
                        this.isLoading = true;
                        this.loadTasks();
                        this.hideModal();
                        this.selectedTask = {};
                        this.message = 'Задача изменена';
                        this.success = true;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },

            completeTask: function(id) {
                this.toggleTask(id)
                    .then((response) => {
                        this.loadTasks();
                        this.success = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            },
        }
    }
</script>
