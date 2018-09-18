<?php

class Future_Request {

    public $restful, $method, $controller, $action, $id, $_dataRequest;
    private static $instance;

    public function __construct() {
        $this->restful = (isset($_REQUEST["restful"])) ? $_REQUEST["restful"] : false;
        $this->method = $_SERVER["REQUEST_METHOD"];
        $this->getPathInfo();
    }
    
    /**
     *  Clone no permitido
     */
    public function __clone() { }

    public static function getInstance($restful = false) {
        if (!isset(self::$instance)) {
            self::$instance = new self;
        }
        self::$instance->getDataRequest();
        self::$instance->restful = (isset($_REQUEST["restful"])) ? $_REQUEST["restful"] : $restful;
        return self::$instance;
    }

    public function isRestful() {
        return $this->restful;
    }

    protected function getDataRequest($var = null) {
        $result = new stdClass();
        $httpContent = fopen('php://input', 'r');
        while ($data = fread($httpContent, 1024)) {
            $result = json_decode($data);
        }
        fclose($httpContent);
        if (null === $var) {
            $this->_dataRequest = $result;
            return $this->_dataRequest;
        } elseif (isset($result->{$var})) {
            return $result->{$var};
        }
    }

    protected function getPathInfo() {
        try {
            if (isset($_SERVER["PATH_INFO"])) {
                $cai = '/^\/([a-z]+\w)\/([a-z]+\w)\/([0-9]+)$/';  // /controller/action/id
                $ca = '/^\/([a-z]+\w)\/([a-z]+)$/';              // /controller/action
                $ci = '/^\/([a-z]+\w)\/([0-9]+)$/';               // /controller/id
                $c = '/^\/([a-z]+\w)$/';                             // /controller
                $i = '/^\/([0-9]+)$/';                             // /id
                $matches = array();
                if (preg_match($cai, $_SERVER["PATH_INFO"], $matches)) {
                    $this->controller = $matches[1];
                    $this->action = $matches[2];
                    $this->id = $matches[3];
                } else if (preg_match($ca, $_SERVER["PATH_INFO"], $matches)) {
                    $this->controller = $matches[1];
                    $this->action = $matches[2];
                } else if (preg_match($ci, $_SERVER["PATH_INFO"], $matches)) {
                    $this->controller = $matches[1];
                    $this->id = $matches[2];
                } else if (preg_match($c, $_SERVER["PATH_INFO"], $matches)) {
                    $this->controller = $matches[1];
                } else if (preg_match($i, $_SERVER["PATH_INFO"], $matches)) {
                    $this->id = $matches[1];
                }
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Stores datas in the $_REQUEST.
     * Example: $instance->foo = 'bar';
     *    
     * @param    name    Name of the datas.
     * @param    value    Your datas.
     * @return    void
     * */
    public function __set($name, $value) {
        $_REQUEST[$name] = $value;
    }

    /**
     * Gets datas from the $_REQUEST.
     * Example: echo $instance->foo;
     * @param name Name of the datas to get.
     * @return mixed Datas stored in session.
     * */
    public function __get($name) {
        if (isset($_REQUEST[$name])) {
            return $_REQUEST[$name];
        }
    }

    public function __isset($name) {
        return isset($_REQUEST[$name]);
    }

    public function __unset($name) {
        unset($_REQUEST[$name]);
    }

    /**
     * Clean the current $_REQUEST.
     * 
     * */
    public function clean() {
        unset($_REQUEST);
    }

}
