<?php

class Future_Post {

    const PROTOCOL_HTTP = 'http';
    const PROTOCOL_HTTPS = 'https';

    private static $instance;
    public $_dataPost;
    public $_protocol;
    public $_httpHost;
    public $_port;
    public $_server;
    public $_ipClient;
    public $_ipClientReal;
    public $_cookieClient;
    private $_inRange;
    public $_restFul;
    public $_method;
    public $_dataRest;
    public $_request;
    public $_platform;
    public $_browser;

    private function __construct() {
        $this->_restFul = (isset($_POST["restful"]) || isset($_REQUEST["restful"])) ? true : false;
        $this->getRealIPClient();
        $this->getIPClient();
        $this->_platform = $this->getPlatform();
        $this->_browser = $this->getBrowser();
        $this->getProtocol();
        $this->getHttpHost();
        $this->getServer();
        $this->getCookie();
        $this->getRequestMethod();
        $this->getDataRest();
        $this->getPort();
        $this->getRequest();
    }

    /**
     *  Clone no permitido
     */
    public function __clone() {
        
    }

    /**
     * Returns the singleton instance. We get the instance: $dataPost = Post::getInstance();<br> 
     * Let's store datas in the session: <br> $dataPost->nickname = 'Someone'; <br>$data->age = 18;<br>
     * @return object
     * */
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self;
        }
        self::$instance->getDataPost();
        return self::$instance;
    }

    /**
     * Get all data of $_POST superglobal variable, 
     * but if var is passed then return the value in $_POST.
     * @param string $var value in $_POST.
     * @return array Array of data.
     */
    public function getDataPost($var = null, $restful = false) {
        if ((isset($_POST["restful"]) || isset($_REQUEST["restful"]))) {
            return $this->getDataRest($var);
        }
        if (null === $var) {
            $this->_dataPost = $_POST;
            return $this->_dataPost;
        } elseif (isset($_POST[$var])) {
            return $_POST[$var];
        }
    }

    /**
     * Get all data by API REST, 
     * but if var is passed then return the value in php://input.
     * @param string $var value in php://input.
     * @return array|value Array of data or asked value.
     */
    public function getDataRest($var = null) {
        $result = new stdClass();
        $putdata = fopen('php://input', 'r');
        while ($data = fread($putdata, 1024)) {
            $result = json_decode($data);
        }
        fclose($putdata);
        if (null === $var) {
            $this->_dataRest = $result;
            $this->_dataPost = $result;
            return $this->_dataRest;
        } elseif (isset($result->{$var})) {
            return $result->{$var};
        }
    }

    /**
     * Stores datas in the $_POST.
     * Example: $instance->foo = 'bar';
     *    
     * @param    name    Name of the datas.
     * @param    value    Your datas.
     * @return    void
     * */
    public function __set($name, $value) {
        $_POST[$name] = $value;
    }

    /**
     * Gets datas from the $_POST.
     * Example: echo $instance->foo;
     * @param name Name of the datas to get.
     * @return mixed Datas stored in session.
     * */
    public function __get($name) {
        if (isset($_POST[$name])) {
            return $_POST[$name];
        }
    }

    public function get($name) {
        if (isset($_POST[$name])) {
            return $_POST[$name];
        }
    }

    public function __isset($name) {
        return isset($_POST[$name]);
    }

    public function __unset($name) {
        unset($_POST[$name]);
    }

    /**
     * Clean the current $_POST.
     * 
     * */
    public function clean() {
        unset($_POST);
    }

    /**
     * Get the protocol used and determine if the protocol SSL is used or not.
     * @return string HTTPS or HTTP.
     */
    public function getProtocol() {
        if (isset($_SERVER['HTTPS'])) {
            if ('on' == strtolower($_SERVER['HTTPS'])) {
                $this->_protocol = self::PROTOCOL_HTTPS;
            }
            if ('1' == $_SERVER['HTTPS']) {
                $this->_protocol = self::PROTOCOL_HTTPS;
            }
        } elseif (isset($_SERVER['SERVER_PORT']) && ( '443' == $_SERVER['SERVER_PORT'] )) {
            $this->_protocol = self::PROTOCOL_HTTPS;
        } else {
            $this->_protocol = self::PROTOCOL_HTTP;
        }
        return $this->_protocol;
    }

    /**
     * Get the request method on server.
     * @return string
     */
    public function getRequestMethod() {
        $this->_method = $_SERVER["REQUEST_METHOD"];
        return $this->method;
    }

    /**
     * Get the HTTP host.
     * "Host" ":" host [ ":" port ]
     * @return string
     */
    public function getHttpHost() {
        $host = $_SERVER["HTTP_HOST"];
        if (!empty($host)) {
            $this->_httpHost = $host;
            return $this->_httpHost;
        }
        $protocol = $this->getProtocol();
        $name = $_SERVER['SERVER_NAME'];
        $port = $_SERVER["SERVER_PORT"];
        if (($protocol == self::SCHEME_HTTP && $port == 80) || ($protocol == self::SCHEME_HTTPS && $port == 443)) {
            $this->_httpHost = $name;
        } else {
            $this->_httpHost = $name . ':' . $port;
        }
        return $this->_httpHost;
    }

    /**
     * Get all data of $_SERVER superglobal variable.
     * If $key is not passed, returns the entire $_SERVER array.
     * @param string $key
     * @return mixed Returns null if key does not exist
     */
    public function getServer($key = null) {
        if (null === $key) {
            $this->_server = $_SERVER;
            return $this->_server;
        } elseif (isset($_SERVER[$key])) {
            return $_SERVER[$key];
        }
    }

    /**
     * Get all data of $_REQUEST superglobal variable.
     * If $key is not passed, returns the entire $_REQUEST array.
     * @param string $key
     * @return mixed Returns null if key does not exist
     */
    public function getRequest($key = null) {
        if (null === $key) {
            $this->_request = $_REQUEST;
            return $this->_request;
        } elseif (isset($_REQUEST[$key])) {
            return $_REQUEST[$key];
        } else {
            return null;
        }
    }

    /**
     * Get client's real IP addres through proxys. A string containing an (IPv4) Internet Protocol dotted address into a proper address
     * @return string
     */
    public function getRealIPClient() {
        if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] != '') {
            $this->_ipClientReal = (!empty($_SERVER['REMOTE_ADDR']) ) ? $_SERVER['REMOTE_ADDR'] : ( (!empty($_ENV['REMOTE_ADDR']) ) ? $_ENV['REMOTE_ADDR'] : null );
            $entries = preg_split('/[, ]/', $_SERVER['HTTP_X_FORWARDED_FOR']);
            reset($entries);
            while (list(, $entry) = each($entries)) {
                $entry = trim($entry);
                if (preg_match("/^([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/", $entry, $ip_list)) {
                    $private_ip = array('/^0\./', '/^127\.0\.0\.1/', '/^192\.168\..*/', '/^172\.((1[6-9])|(2[0-9])|(3[0-1]))\..*/', '/^10\..*/');
                    $found_ip = preg_replace($private_ip, $this->_ipClientReal, $ip_list[1]);
                    if ($this->_ipClientReal != $found_ip) {
                        $this->_ipClientReal = $found_ip;
                        break;
                    }
                }
            }
        } else {
            $this->_ipClientReal = $this->getIPClient();
        }
        return $this->_ipClientReal;
    }

    /**
     * Get client's IP addres. A string containing an (IPv4) Internet Protocol dotted address into a proper address
     * @return string
     */
    public function getIPClient() {
        if ($_SERVER['SERVER_NAME'] == 'localhost') {
            $this->_ipClient = '127.0.0.1';
        } else {
            if (isset($_SERVER['HTTP_CLIENT_IP']) && $_SERVER['HTTP_CLIENT_IP'] != null) {
                $this->_ipClient = $_SERVER['HTTP_CLIENT_IP'];
            } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] != null) {
                $this->_ipClient = $_SERVER['HTTP_X_FORWARDED_FOR'];
            } elseif (isset($_SERVER['HTTP_X_FORWARDED']) && $_SERVER['HTTP_X_FORWARDED'] != null) {
                $this->_ipClient = $_SERVER['HTTP_X_FORWARDED'];
            } elseif (isset($_SERVER['HTTP_FORWARDED_FOR']) && $_SERVER['HTTP_FORWARDED_FOR'] != null) {
                $this->_ipClient = $_SERVER['HTTP_FORWARDED_FOR'];
            } elseif (isset($_SERVER['HTTP_FORWARDED']) && $_SERVER['HTTP_FORWARDED'] != null) {
                $this->_ipClient = $_SERVER['HTTP_FORWARDED'];
            } else {
                $this->_ipClient = $_SERVER['REMOTE_ADDR'];
            }
            if ($this->_ipClient == '::1')
                $this->_ipClient = '127.0.0.1';
        }
        return $this->_ipClient;
    }

    /**
     * Know if the the IP client is in the range gived. 
     * @param type $startIP The IP when begin to validate.
     * @param type $endIP The IP when end to validate.
     * @return bool True if the IP client is inside of the range, false otherwise.
     */
    public function getIPinRange($startIP, $endIP = false) {
        if ($endIP === false) {
            if ($startIP == $this->getIPClient()) {
                $this->_inRange = true;
            } else {
                $this->_inRange = false;
            }
        } else {
            if (ip2long($startIP) <= ip2long($this->getIPClient()) && ip2long($endIP) >= ip2long($this->getIPClient())) {
                $this->_inRange = true;
            } else {
                $this->_inRange = false;
            }
        }
        return $this->_inRange;
    }

    /**
     * Get all data of $_COOKIE superglobal variable.
     * If no $key is passed, returns the entire $_COOKIE array.
     *
     * @param string $key
     * @param mixed $default Default value to use if key not found
     * @return mixed Returns null if key does not exist
     */
    public function getCookie($key = null) {
        if (null === $key) {
            $this->_cookieClient = $_COOKIE;
            return $this->_cookieClient;
        } elseif (isset($_COOKIE[$key])) {
            return $_COOKIE[$key];
        }
    }

    /**
     * Get the port on the server machine being used by the web server.
     * @return string Number of server port.
     */
    public function getPort() {
        $this->_port = $_SERVER['SERVER_PORT'];
        return $this->_port;
    }

    /**
     * Get the full URL.
     * "protocol" ":" host [ ":" port ] uri
     * @return string
     */
    public function getUrl() {
        $protocol = $this->getProtocol();
        $port = ($this->getPort() == "80") ? "" : (":" . $this->getPort());
        return $protocol . "://" . $_SERVER['SERVER_NAME'] . $port . $_SERVER['REQUEST_URI'];
    }

    /**
     * Get the client's operating system.
     * @return string
     */
    public function getPlatform() {
        $userAgent = $_SERVER['HTTP_USER_AGENT'];
        if (strpos($userAgent, 'Windows NT 10.0') !== FALSE)
            return "Windows 10";
        elseif (strpos($userAgent, 'Windows NT 6.3') !== FALSE)
            return "Windows 8.1";
        elseif (strpos($userAgent, 'Windows NT 6.2') !== FALSE)
            return "Windows 8";
        elseif (strpos($userAgent, 'Windows NT 6.1') !== FALSE)
            return "Windows 7";
        elseif (strpos($userAgent, 'Windows NT 6.0') !== FALSE)
            return "Windows Vista";
        elseif (strpos($userAgent, 'Windows NT 5.1') !== FALSE)
            return "Windows XP";
        elseif (strpos($userAgent, 'Windows NT 5.2') !== FALSE)
            return 'Windows 2003';
        elseif (strpos($userAgent, 'Windows NT 5.0') !== FALSE)
            return 'Windows 2000';
        elseif (strpos($userAgent, 'Windows ME') !== FALSE)
            return 'Windows ME';
        elseif (strpos($userAgent, 'Win98') !== FALSE)
            return 'Windows 98';
        elseif (strpos($userAgent, 'Win95') !== FALSE)
            return 'Windows 95';
        elseif (strpos($userAgent, 'WinNT4.0') !== FALSE)
            return 'Windows NT 4.0';
        elseif (strpos($userAgent, 'Windows Phone') !== FALSE)
            return 'Windows Phone';
        elseif (strpos($userAgent, 'Windows') !== FALSE)
            return 'Windows';
        elseif (strpos($userAgent, 'iPhone') !== FALSE)
            return 'iPhone';
        elseif (strpos($userAgent, 'iPad') !== FALSE)
            return 'iPad';
        elseif (strpos($userAgent, 'Debian') !== FALSE)
            return 'Debian';
        elseif (strpos($userAgent, 'Ubuntu') !== FALSE)
            return 'Ubuntu';
        elseif (strpos($userAgent, 'Slackware') !== FALSE)
            return 'Slackware';
        elseif (strpos($userAgent, 'Linux Mint') !== FALSE)
            return 'Linux Mint';
        elseif (strpos($userAgent, 'Gentoo') !== FALSE)
            return 'Gentoo';
        elseif (strpos($userAgent, 'Elementary OS') !== FALSE)
            return 'ELementary OS';
        elseif (strpos($userAgent, 'Fedora') !== FALSE)
            return 'Fedora';
        elseif (strpos($userAgent, 'Kubuntu') !== FALSE)
            return 'Kubuntu';
        elseif (strpos($userAgent, 'Linux') !== FALSE)
            return 'Linux';
        elseif (strpos($userAgent, 'FreeBSD') !== FALSE)
            return 'FreeBSD';
        elseif (strpos($userAgent, 'OpenBSD') !== FALSE)
            return 'OpenBSD';
        elseif (strpos($userAgent, 'NetBSD') !== FALSE)
            return 'NetBSD';
        elseif (strpos($userAgent, 'SunOS') !== FALSE)
            return 'Solaris';
        elseif (strpos($userAgent, 'BlackBerry') !== FALSE)
            return 'BlackBerry';
        elseif (strpos($userAgent, 'Android') !== FALSE)
            return 'Android';
        elseif (strpos($userAgent, 'Mobile') !== FALSE)
            return 'Firefox OS';
        elseif (strpos($userAgent, 'Mac OS X+') || strpos($userAgent, 'CFNetwork+') !== FALSE)
            return 'Mac OS X';
        elseif (strpos($userAgent, 'Macintosh') !== FALSE)
            return 'Mac OS Classic';
        elseif (strpos($userAgent, 'OS/2') !== FALSE)
            return 'OS/2';
        elseif (strpos($userAgent, 'BeOS') !== FALSE)
            return 'BeOS';
        elseif (strpos($userAgent, 'Nintendo') !== FALSE)
            return 'Nintendo';
        else
            return 'Unknown Platform';
    }

    /**
     * Get the client's web browser.
     * @return string
     */
    public function getBrowser() {
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        if (strpos($user_agent, 'Maxthon') !== FALSE)
            return "Maxthon";
        elseif (strpos($user_agent, 'SeaMonkey') !== FALSE)
            return "SeaMonkey";
        elseif (strpos($user_agent, 'Vivaldi') !== FALSE)
            return "Vivaldi";
        elseif (strpos($user_agent, 'Arora') !== FALSE)
            return "Arora";
        elseif (strpos($user_agent, 'Avant Browser') !== FALSE)
            return "Avant Browser";
        elseif (strpos($user_agent, 'Beamrise') !== FALSE)
            return "Beamrise";
        elseif (strpos($user_agent, 'Epiphany') !== FALSE)
            return 'Epiphany';
        elseif (strpos($user_agent, 'Chromium') !== FALSE)
            return 'Chromium';
        elseif (strpos($user_agent, 'Iceweasel') !== FALSE)
            return 'Iceweasel';
        elseif (strpos($user_agent, 'Galeon') !== FALSE)
            return 'Galeon';
        elseif (strpos($user_agent, 'Edge') !== FALSE)
            return 'Microsoft Edge';
        elseif (strpos($user_agent, 'Trident') !== FALSE) //IE 11
            return 'Internet Explorer';
        elseif (strpos($user_agent, 'MSIE') !== FALSE)
            return 'Internet Explorer';
        elseif (strpos($user_agent, 'Opera Mini') !== FALSE)
            return "Opera Mini";
        elseif (strpos($user_agent, 'Opera') || strpos($user_agent, 'OPR') !== FALSE)
            return "Opera";
        elseif (strpos($user_agent, 'Firefox') !== FALSE)
            return 'Mozilla Firefox';
        elseif (strpos($user_agent, 'Chrome') !== FALSE)
            return 'Google Chrome';
        elseif (strpos($user_agent, 'Safari') !== FALSE)
            return "Safari";
        elseif (strpos($user_agent, 'iTunes') !== FALSE)
            return 'iTunes';
        elseif (strpos($user_agent, 'Konqueror') !== FALSE)
            return 'Konqueror';
        elseif (strpos($user_agent, 'Dillo') !== FALSE)
            return 'Dillo';
        elseif (strpos($user_agent, 'Netscape') !== FALSE)
            return 'Netscape';
        elseif (strpos($user_agent, 'Midori') !== FALSE)
            return 'Midori';
        elseif (strpos($user_agent, 'ELinks') !== FALSE)
            return 'ELinks';
        elseif (strpos($user_agent, 'Links') !== FALSE)
            return 'Links';
        elseif (strpos($user_agent, 'Lynx') !== FALSE)
            return 'Lynx';
        elseif (strpos($user_agent, 'w3m') !== FALSE)
            return 'w3m';
        else
            return 'No hemos podido detectar su navegador';
    }

}
