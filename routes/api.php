<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => '/v1', 'namespace' => 'Api\V1', 'as' => 'api.'], function () {
    Route::group(['prefix' => 'update', 'namespace' => 'Settings', 'as' => 'update.', 'middleware' => 'auth:api'], function (){
        Route::patch('password', 'UpdatePassword')->name('password');
        Route::patch('email', 'UpdateEmail')->name('email');
        Route::patch('name', 'UpdateName')->name('name');
    });
    Route::group(['prefix' => 'auth', 'namespace' => 'Auth'], function () {
        Route::post('login', 'LogInController')->name('login');
        Route::post('logout', 'LogOutController')->name('logout');
        Route::get('me', 'MeController')->name('me');
        Route::post('register', 'RegisterController')->name('register');
    });
    Route::resource('tasks', 'TasksController', ['except' => ['create', 'edit']]);
});

