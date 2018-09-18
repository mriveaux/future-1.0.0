<?php

class Future_Rest {

    public $method, $controller, $action, $id, $_dataRequest, $_extraRequest;
    private static $instance;

    public function __construct() {
        $this->method = $_SERVER["REQUEST_METHOD"];
        $this->getPathInfo();
        $this->getDataRequest();
        $this->getExtraRequest();
    }

    /**
     *  Clone no permitido
     */
    public function __clone() {
        
    }

    public static function getInstance($restful = false) {
        if (!isset(self::$instance)) {
            self::$instance = new self;
        }
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
        $this->_extraRequest = self::ArrayToObject($_REQUEST);
        if (null === $var) {
            if (empty($result)) {
                $this->_dataRequest = self::ArrayToObject($_REQUEST);
            } else {
                $this->_dataRequest = $result;
            }
            return $this->_dataRequest;
        } elseif (isset($result->{$var})) {
            return $result->{$var};
        } elseif (isset($this->_extraRequest->{$var})) {
            return $this->_extraRequest->{$var};
        }
    }

    /**
     * Get all data of $_REQUEST superglobal variable.
     * If $key is not passed, returns the entire $_REQUEST array.
     * @param string $key
     * @return mixed Returns null if key does not exist
     */
    public function getExtraRequest($key = null) {
        if (null === $key) {
            $this->_extraRequest = self::ArrayToObject($_REQUEST);
            return $this->_extraRequest;
        } elseif (isset($_REQUEST[$key])) {
            return $_REQUEST[$key];
        } else {
            return null;
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
     * Stores datas in the php://input.
     * Example: $instance->foo = 'bar';
     *    
     * @param    name    Name of the datas.
     * @param    value    Your datas.
     * @return    void
     * */
    public function __set($name, $value) {
        $this->_dataRequest->{$name} = $value;
    }

    /**
     * Gets datas from the php://input.
     * Example: echo $instance->foo;
     * @param name Name of the datas to get.
     * @return mixed Datas stored in session.
     * */
    public function __get($name) {
        if (null === $name) {
            return $this->_dataRequest;
        } elseif (isset($this->_dataRequest->{$name})) {
            return $this->_dataRequest->{$name};
        } elseif (isset($this->_extraRequest->{$name})) {
            return $this->_extraRequest->{$name};
        }
    }

    public function __isset($name) {
        return isset($this->_dataRequest->{$name});
    }

    public function __unset($name) {
        unset($this->_dataRequest->{$name});
    }

    /**
     * Clean the current php://input.
     * 
     * */
    public function clean() {
        unset($this->_dataRequest);
    }

    /**
     * @param array $array Array for changing in an object stdClass.
     * @return array Object stdClass changed in an array.
     */
    static public function ArrayToObject(array $array) {
        # Iterate through our array looking for array values. If found recurvisely call itself.
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $array[$key] = self::ArrayToObject($value);
            }
        }
        # Typecast to (object) will automatically convert array -> stdClass
        return (object) $array;
    }

}
