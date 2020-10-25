<?php

namespace App\Http\Controllers\Api\V1;

use App\Category;
use App\Http\Controllers\Controller;
use App\Http\Resources\Category as CategoryResource;
use App\Http\Resources\Task as TaskResource;
use App\User;
Use App\Http\Requests\CategoryRequest;

class CategoriesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return App\Http\Resources\Category
     */
    public function index()
    {
        return CategoryResource::collection(request()->user()->categories);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\CategoryRequest $request
     * @return App\Http\Resources\Category $category
     */
    public function store(CategoryRequest $request)
    {
        $category = Category::create([
            'user_id'   => request()->user()->id,
            'name'      => $request->name,
        ]);

        return CategoryResource::make($category);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Category $category
     * @param  App\Http\Requests\CategoryRequest $request
     * @return App\Http\Resources\Category $category
     */
    public function update(Category $category, CategoryRequest $request)
    {
        if ($category->user_id == request()->user()->id) {
            $category->update($request->all());
        }

        return CategoryResource::make($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Category $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        if ($category->user_id == request()->user()->id) {
            $category->delete();
        }

        return response()->json(null);
    }
}
