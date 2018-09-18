<?php

class Future_Response {

    public $_response, $success, $data, $total, $code, $message, $details;
    private static $instance;

    public function __construct($params = array()) {
        $this->success = isset($params["success"]) ? $params["success"] : true;
        $this->code = isset($params["code"]) ? $params["code"] : '';
        $this->message = isset($params["message"]) ? $params["message"] : '';
        $this->data = isset($params["data"]) ? $params["data"] : array();
        $this->total = isset($params["total"]) ? $params["total"] : 0;
    }
    
    /**
     *  Clone no permitido
     */
    public function __clone() { }

    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function toJson($data = null) {
        if ($data == null) {
            $this->_response = json_encode(array(
                'success' => $this->success,
                'code' => $this->code,
                'message' => $this->message,
                'data' => $this->data,
                'total' => $this->total
            ));
        }else{
            $this->_response = json_encode($data);
        }
        return $this->_response;
    }

}
