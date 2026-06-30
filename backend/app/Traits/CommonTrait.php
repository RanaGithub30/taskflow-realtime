<?php

namespace App\Traits;

trait CommonTrait{
    public function commonResponse($data, $message = 'Success', $status = 200){
        return response()->json([
            'data' => $data,
            'message' => $message,
        ], $status);
    }
}