<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use App\Models\User;

class LogInController extends Controller
{
    public function __invoke(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
        $user = User::query()
            ->where('email', $request->email)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            abort(Response::HTTP_UNAUTHORIZED, 'INVALID CREDENTIALS');
        }

        return response()->json([
            'token' => $user->createToken($user->email)->plainTextToken,
        ]);
    }
}
