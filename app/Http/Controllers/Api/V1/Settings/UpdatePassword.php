<?php

namespace App\Http\Controllers\Api\V1\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePasswordRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;

class UpdatePassword extends Controller
{
    /**
     * Update user password.
     *
     * @param  App\Http\Requests\UpdatePasswordRequest $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(UpdatePasswordRequest $request)
    {
        request()->user()->update([
            'password' => Hash::make($request->password)
        ]);
        return response(null, Response::HTTP_OK);
    }
}
