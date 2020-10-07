<?php

namespace App\Http\Controllers\Api\V1\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateNameRequest;

class UpdateName extends Controller
{
    /**
     * Update user name.
     *
     * @param  App\Http\Requests\UpdateNameRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(UpdateNameRequest $request)
    {
        request()->user()->update([
            'name' => $request->name
        ]);

        return response()->json([
            'name' => request()->user()->name,
        ]);
    }
}
