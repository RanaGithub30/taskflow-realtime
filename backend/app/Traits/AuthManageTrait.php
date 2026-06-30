<?php

namespace App\Traits;

use App\Models\User;

trait AuthManageTrait{
    public function checkUserExist($email){
        $checkUserExists = User::where('email', $email)->first();
        return $checkUserExists ? true : false;
    }

    public function createUser($request){
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        return $user;
    }
}