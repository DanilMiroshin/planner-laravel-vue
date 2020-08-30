<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;

class LogInController extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        if (!$token = \JWTAuth::attempt($request->only('email', 'password'))) {
            return response(null, 401);
        }

        return response()->json([
            'token' => $token,
        ]);
    }
}
