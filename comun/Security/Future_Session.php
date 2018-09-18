<?php

class Future_Session {

    const SESSION_STARTED = TRUE;
    const SESSION_NOT_STARTED = FALSE;

    private $sessionState = self::SESSION_NOT_STARTED;
    private static $instance;
    public $_dataSession;
    public $currentAccess;

    private function __construct() {
        $this->currentAccess = date("Y-n-j H:i:s");
    }
    
    /**
     *  Clone no permitido
     */
    public function __clone() { }

    /**
     * Returns the singleton instance. We get the instance: $data = Session::getInstance();<br> 
     * Let's store datas in the session: <br> $data->nickname = 'Someone'; <br>$data->age = 18;<br>
     * We destroy the session $data->destroy();
     * The session is automatically initialized if it wasn't.
     * @return object
     * */
    public static function getInstance($_TOKEN = NULL) {
        if (!isset(self::$instance)) {
            self::$instance = new self;
        }
        self::$instance->startSession();

        self::$instance->generateToken($_TOKEN);
        self::$instance->_dataSession = $_SESSION;
        return self::$instance;
    }

    /**
     *    (Re)starts the session.
     *    @return    bool    TRUE if the session has been initialized, else FALSE.
     * */
    public function startSession() {
        if ($this->sessionState == self::SESSION_NOT_STARTED) {
            if ($this->isSessionStarted() === FALSE) {
                $this->sessionState = session_start();
            }
        }
        return $this->sessionState;
    }

    /**
     *    Stores datas in the session.
     *    Example: $instance->foo = 'bar';
     *    
     *    @param    name    Name of the datas.
     *    @param    value    Your datas.
     *    @return    void
     * */
    public function __set($name, $value) {
        $_SESSION[$name] = $value;
    }

    /**
     *    Gets datas from the session.
     *    Example: echo $instance->foo;
     *    @param    name    Name of the datas to get.
     *    @return    mixed    Datas stored in session.
     * */
    public function __get($name) {
        if (isset($_SESSION[$name])) {
            return $_SESSION[$name];
        }
    }

    public function __isset($name) {
        return isset($_SESSION[$name]);
    }

    public function __unset($name) {
        unset($_SESSION[$name]);
    }

    /**
     *    Destroys the current session.
     *    @return    bool    TRUE is session has been deleted, else FALSE.
     * */
    public function destroy() {
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params["path"], $params["domain"], $params["secure"], $params["httponly"]);
        }
        if ($this->sessionState == self::SESSION_STARTED) {
            $this->sessionState = !session_destroy();
            session_commit();
            unset($_SESSION);
            return !$this->sessionState;
        }
        return FALSE;
    }

    /**
     * Universal function for checking session status
     * @return boolean
     */
    function isSessionStarted() {
        if (php_sapi_name() !== 'cli') {
            if (version_compare(phpversion(), '5.4.0', '>=')) {
                return session_status() === PHP_SESSION_ACTIVE ? TRUE : FALSE;
            } else {
                return session_id() === '' ? FALSE : TRUE;
            }
        }
        return FALSE;
    }

    public function checkLastAccess() {
        $host = $this->dataPost->getServer('HTTP_HOST');
        $dr = $this->dataPost->getServer('DOCUMENT_ROOT');
        if (session_status() !== PHP_SESSION_ACTIVE) {
            header('HTTP/1.0 401 Unauthorized');
            header("Location: http://$host/comun/Security/Header/401.html");
            exit();
        } else {
            if (isset(self::$instance->lastAccess) != FALSE) {
                $currentAccess = date("Y-n-j H:i:s");
                $passedTime = (strtotime($currentAccess) - strtotime(self::$instance->lastAccess));
                $fileConfigSystem = $dr . "/comun/comun/xml/system.xml";
                $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
                $sessiontime = ($xmlConfigSystem != false) ? (int) $xmlConfigSystem->environment->sessiontime : 900;
                if ($passedTime >= $sessiontime) {
                    self::$instance->lastAccess = date("Y-n-j H:i:s");
                    $this->destroy();
                    $host = $_SERVER['HTTP_HOST'];
                    header("Location: http://$host/app/index/index.php/index/expired");
                    exit();
                } else {
                    self::$instance->lastAccess = date("Y-n-j H:i:s");
                }
            } else {
                self::$instance->lastAccess = date("Y-n-j H:i:s");
            }
        }
    }

    public function getCookie($var) {
        try {
            if (null === $var) {
                return $_COOKIE;
            } elseif (isset($_COOKIE[$var])) {
                return $_COOKIE[$var];
            } else {
                setcookie($var, null);
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Check if $name cookie is not set or
     * set the cookie for the first time
     * @param type $name
     * @param type $value
     * @throws Exception
     */
    public function setCookie($name, $value) {
        try {
            if (!isset($_COOKIE[$name])) {
                setcookie($name, $value);
            } else {
                setcookie($name, $value);
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    static public function generateToken($_TOKEN = NULL) {
        if ($_TOKEN != NULL) {
            $_SESSION['authToken'] = $_TOKEN;
        } else if (!isset($_SESSION['authToken'])) {
            $_SESSION['authToken'] = self::getAuthToken(50);
        }
    }

    static private function getAuthToken($argLong) {
        $dictionary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-*/@";
        $token = "";
        for ($i = 0; $i <= $argLong; $i++) {
            $token .= substr($dictionary, rand(0, strlen($dictionary)), 1);
        }
        return $token;
    }

}
