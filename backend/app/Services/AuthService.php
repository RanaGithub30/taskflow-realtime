<?php

namespace App\Services;
use App\Models\User;
use App\Traits\{AuthManageTrait, CommonTrait};
use App\Enums\StatusEnum;

class AuthService{
    use AuthManageTrait, CommonTrait;

    public function register($request){
        $checkUserExists = $this->checkUserExist($request->email);

        if($checkUserExists){
            return $this->commonResponse(null, StatusEnum::USER_EXISTS, 400);
        }

        $user = $this->createUser($request);
        return $this->commonResponse($user, StatusEnum::USER_CREATED, 201);
    }
}