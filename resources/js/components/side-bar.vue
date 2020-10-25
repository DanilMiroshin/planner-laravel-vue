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
        <div class="mb-8 text-gray-400">
            <div class="px-4 mb-2 flex justify-between items-center">
                <div class="opacity-75 cursor-default">Задачи</div>
                <!-- Button to toggle form -->
                <button v-on:click="formShown = !formShown" class="text cursor-pointer hover:text-hookers-green">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

                        <!-- Close icon -->
                        <path
                            v-bind:class="{ 'hidden': !formShown }"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />

                        <!-- Add icon -->
                        <path
                            v-bind:class="{ 'hidden': formShown }"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
            </div>

            <!-- Form for adding category -->
            <p class="px-4 mb-2 text-red text-xs italic"  v-if="errors && errors.name">{{ errors.name[0] }}</p>
            <form v-if='formShown' class="px-4 mb-2 flex justify-between items-center">
                <input v-model="category.name" class="text-base text-gray-900 text-grey rounded-lg border-2 border-hookers-green" type="text">
                <button type="button" id="addCategory" v-on:click="addCategory()" class="hover:text-hookers-green text cursor-pointer">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </button>
            </form>
            <div class="flex flex-col">
                <router-link
                    to='/'
                    v-on:click.native="sendCategory()"
                    v-bind:class="{ 'bg-hookers-green': currentCategoryId == null }"
                    class="cursor-pointer m-1 hover:bg-dark-slate-gray py-1 px-4 text-white pb-2">
                        Все задачи
                </router-link>

                <!-- Categories -->
                <div
                    v-for='category in categories'
                    v-on:click="sendCategory(category)"
                    v-bind:class="{ 'bg-hookers-green': currentCategoryId == category.id }"
                    class="cursor-pointer m-1 hover:bg-dark-slate-gray py-1 px-4 text-white pb-2 flex justify-between items-center">
                    <span>
                        {{ category.name }}
                    </span>
                    <!-- Delete button -->
                    <button v-on:click="deleteCategory(category.id)" class="text-gray-400 cursor-pointer hover:text-hookers-green">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'

    export default {
        props: ['user'],

        data : function() {
            return {
                categories: [],
                formShown: false,
                category: {},
                errors: {},
                currentCategoryId: null,
            }
        },

        mounted() {
            this.loadCategories();
        },

        methods: {
            ...mapActions({
                getCategories: 'categories/loadCategories',
                makeCategory: 'categories/makeCategory',
                destroyCategory: 'categories/destroyCategory'
            }),

            loadCategories: function () {
                this.getCategories()
                    .then((response) => {
                        this.categories = response.data.data;
                    })
            },

            addCategory: function () {
                this.makeCategory(this.category)
                    .then(() => {
                        this.loadCategories();
                        this.category = {};
                        this.errors = {};
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            this.errors = error.response.data.errors;
                        }
                    });
            },

            deleteCategory: function (id) {
                if (confirm('Вы уверены?')) {
                    this.destroyCategory(id)
                        .then((response) => {
                            this.loadCategories();
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            },

            sendCategory: function (category = '') {
                this.currentCategoryId = category.id;
                this.$emit('clicked', category);
            }
        }
    }
</script>
