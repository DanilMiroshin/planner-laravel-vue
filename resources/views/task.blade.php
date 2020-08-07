<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="icon" href="{{ url('imgs/logo.png')}}" type="image/x-icon">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Planner') }}</title>

    <link href="https://unpkg.com/tailwindcss@0.3.0/dist/tailwind.min.css" rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body class="h-screen overflow-hidden flex items-center justify-center "  style="background: #edf2f7;">
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
                <a class="text-grey-dark mb-1 text-sm truncate float-right hover:text-green" href="#">
                    Настройки
                </a>
                <a class="text-grey-dark text-sm truncate pl-4" href="#">
                    Выход
                </a>
            </div>
        </div>
        <div class="px-6 py-4 flex-1 overflow-y-scroll">
            <!-- Task -->
            <div class="flex items-start mb-4">
                <div class="flex-1 overflow-hidden">
                    <div class="flex rounded-lg border-2 border-hookers-green overflow-hidden">
                        <!-- Complete button -->
                        <button class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </button>
                        <!-- Edit button -->
                        <button class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                            </svg>
                        </button>
                        <!-- Delete button -->
                        <button class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
                            <svg class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                        <span class="font-sans text-xl align-middle w-full px-4 py-3">
                            Пример
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="pb-6 px-4 flex-none">
            <div class="flex rounded-lg border-2 border-grey overflow-hidden">
                <button class="text-3xl text-grey border-r-2 border-hookers-green p-2 hover:bg-hookers-green">
                    <svg class="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/></svg>
                </button>
                <input type="text" class="w-full px-4" placeholder="Добавьте задачу" autofocus />
            </div>
        </div>
    </div>
</div>
</body>
</html>
