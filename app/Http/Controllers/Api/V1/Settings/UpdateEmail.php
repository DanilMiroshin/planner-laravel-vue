<?php

namespace App\Http\Controllers\Api\V1\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateEmailRequest;
use Illuminate\Http\Response;

class UpdateEmail extends Controller
{
    /**
     * Update user email.
     *
     * @param  App\Http\Requests\UpdateEmailRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(UpdateEmailRequest $request)
    {
        request()->user()->update([
            'email' => $request->email
        ]);
        return response(null, Response::HTTP_OK);
    }
}
