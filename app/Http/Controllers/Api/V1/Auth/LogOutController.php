<?php

namespace App\Http\Controllers\Api\V1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LogOutController extends Controller
{
    public function __invoke()
    {
        auth('sanctum')->user()->currentAccessToken()->delete();

        return response()->noContent();
    }
}
