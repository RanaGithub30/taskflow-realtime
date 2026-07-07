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

    public function login($request){
        $user = $this->getUser($request->email);

        if($user && !\Hash::check($request->password, $user->password)){
            return $this->commonResponse(null, StatusEnum::INVALID_CREDENTIALS, 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;
        return $this->commonResponse(['access_token' => $token, 'token_type' => 'Bearer'], StatusEnum::LOGIN_SUCCESS, 200);
    }

    public function getUserDetails(){
        $user = auth()->user();
        return $this->commonResponse($user, StatusEnum::USER_FETCHED, 200);
    }
}