<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Session.php');

class ModelSecure {

    protected $dataSession;

    public function __construct() {
        try {
            $this->dataSession = Future_Session::getInstance();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function init() {
        try {
            $this->dataSession = Future_Session::getInstance();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    protected function decodeStringToken($argEncodeStringToken) {
        $encodedParts = str_split(base64_decode($argEncodeStringToken), 6);
        $str = "";
        for ($i = 0; $i < Count($encodedParts); $i++) {
            $tstr = $encodedParts[$i] - 7;
            $tstr = sqrt($tstr);
            $tstr = $tstr - 237;
            $tstr = $tstr / 3;
            $str.=chr($tstr);
        }
        return $str;
    }

    protected function encodeStringToken($argString, $token) {
        $a = "";
        for ($i = 0; $i < strlen($argString); $i++) {
            $t = ord(substr($argString, $i, 1));
            $a .= ((3 * t + 237) * (3 * t + 237) + 7);
        }
        for ($i = 0; $i < strlen($token); $i++) {
            $t = ord(substr($token, $i, 1));
            $a .= ((3 * t + 237) * (3 * t + 237) + 7);
        }
        return base64_encode($a);
    }

    protected function getDecodePassword($encodePassw, $token) {
        $decoded_pass = $this->decodeStringToken($encodePassw);
        $arr_plain_pass = explode($token, $decoded_pass);
        return $arr_plain_pass[0];
    }

}
