<?php

namespace App\Http\Controllers\Api\V1;

use App\Task;
use App\User;
use App\Http\Controllers\Controller;
use App\Http\Resources\Task as TaskResource;
use App\Http\Requests\TaskRequest;
use Illuminate\Http\Response;

class TasksController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return App\Http\Resources\Task
     */
    public function index()
    {
        return TaskResource::collection(request()->user()->tasks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Http\Requests\TaskRequest $request
     * @return App\Http\Resources\Task $task
     */
    public function store(TaskRequest $request)
    {
        $task = Task::create([
            'user_id'       => request()->user()->id,
            'description'   => $request->description,
        ]);

        return TaskResource::make($task);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  App\Task $task
     * @param  App\Http\Requests\TaskRequest $request
     * @return App\Http\Resources\Task $task
     */
    public function update(Task $task, TaskRequest $request)
    {
        if ($task->user_id == request()->user()->id) {
            $task->update($request->all());
        }
        return TaskResource::make($task);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        if ($task->user_id == request()->user()->id) {
            $task->delete();
        }

        return response()->json(null);
    }

    /**
     * Toggle completed property of task.
     *
     * @param  App\Task $task
     * @return \Illuminate\Http\Response
     */
    public function toggle(Task $task)
    {
        if ($task->user_id == request()->user()->id) {
            $task->completed = !$task->completed;
            $task->update();
        }

        return TaskResource::make($task);
    }
}
