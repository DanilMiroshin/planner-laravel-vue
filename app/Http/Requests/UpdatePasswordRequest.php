<?php

namespace App\Http\Requests;

use App\Rules\MatchOldPasswordRule as MatchOldPassword;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'old_password'  => ['required', new MatchOldPassword],
            'password'      => ['required', 'confirmed','max:255']
        ];
    }
}
