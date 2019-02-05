<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Session.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Post.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Request.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Rest.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Response.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Validator.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/class/Integrator.php');

class ControllerSecure {

    protected $_integrator;
    protected $comun;
    protected $dataPost;
    protected $dataRequest;
    protected $dataRest;
    protected $dataResponse;
    protected $dataSession;
    protected $dirapp;
    protected $env;
    protected $extjs;
    protected $lang;
    protected $libcss;
    protected $libjs;
    protected $libphp;
    protected $url;
    protected $view;
    protected $viewjs;
    protected $appname;
    protected $futureToken;
    protected $uiValidator;

    /**
     * ControllerSecure constructor.
     * @param null $check
     * @param bool $run
     * @throws Exception
     */
    public function __construct($check = null, $run = false) {
        try {
            $this->dataPost = Future_Post::getInstance();
            $this->dataRequest = Future_Request::getInstance();
            $this->dataRest = Future_Rest::getInstance();
            $this->dataResponse = Future_Response::getInstance();
            $this->dataSession = Future_Session::getInstance();
            $this->_integrator = Integrator::getInstance();
            $this->uiValidator = Future_Validator::getInstance();
            $this->futureToken = $this->dataSession->authToken;
            $this->initGlobalPath($check);
            if ($check === null) {
                $this->validarCredenciales();
            } else if (!$run) {
                $this->seeRegistration();
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function render($var) {
        $ds = DIRECTORY_SEPARATOR;
        if ($var != 'index' && $var != 'install') {
            $this->dataSession->arrUiValidations = $this->getuivalidations();
        }
        require_once($this->request('vista') . $ds . 'views' . $ds . 'scripts' . $ds . $var . $ds . $var . '.phtml');
    }

    public function request($var) {
        return $this->dataPost->getRequest($var);
    }

    /**
     * @throws Doctrine_Manager_Exception
     */
    private function seeRegistration() {
        try {
            Doctrine_Manager::checkRegister();
        } catch (Doctrine_Manager_Exception $e) {
            throw $e;
        }
    }

    /**
     * Validate if time of the session has expired.
     */
    public function validarCredenciales() {
        try {
            $host = $this->dataPost->getServer('HTTP_HOST');
            $dr = $this->dataPost->getServer('DOCUMENT_ROOT');
            if (!isset($this->dataSession->logged)) {
                header('HTTP/1.0 401 Unauthorized');
                header("Location: http://$host/comun/Security/Header/401.html");
                exit();
            } else {
                if (isset($this->dataSession->lastAccess)) {
                    $lastAccessed = $this->dataSession->lastAccess;
                    $currentAccessed = $this->dataSession->currentAccess;
                    $passedTime = (strtotime($currentAccessed) - strtotime($lastAccessed));
                    $fileConfigSystem = $dr . "/comun/comun/xml/system.xml";
                    $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
                    $sessiontime = ($xmlConfigSystem != false) ? (int) $xmlConfigSystem->environment->sessiontime : 900;
                    if ($passedTime >= $sessiontime) {
                        $this->dataSession->destroy();
                        header("Location: http://$host/app/index/index.php/index/expired");
                        exit();
                    } else {
                        $this->dataSession->lastAccess = date("Y-n-j H:i:s");
                    }
                } else {
                    $this->dataSession->lastAccess = date("Y-n-j H:i:s");
                }
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Show a message of error.
     * @param string $argMsg Message of error
     * @return void
     */
    protected function showMessageError($argMsg) {
        echo(json_encode(array('code' => 3, 'message' => $argMsg)));
    }

    /**
     * Show a message of information.
     * @param string $argMsg Message of information
     * @return void
     */
    protected function showMessageInfo($argMsg) {
        echo(json_encode(array('code' => 1, 'message' => $argMsg)));
    }

    /**
     * Show a message of warning.
     * @param string $argMsg Message of warning
     * @return void
     */
    protected function showMessageWarning($argMsg) {
        echo(json_encode(array('code' => 0, 'message' => $argMsg)));
    }

    protected function initGlobalPath($_generate_auth_token) {
        $this->dirapp = 'http://' . $this->dataPost->getServer('HTTP_HOST');
        $this->viewjs = dirname($this->dataPost->getServer('SCRIPT_NAME'));
        $this->url = $this->dirapp . '/app/';
        $this->view = dirname(__FILE__);
        $this->libcss = '/lib/css/';
        $this->libjs = '/lib/js/';
        $this->libphp = '/lib/php/';
        $this->comun = '/comun/';
        $docRoot = $this->dataPost->getServer('DOCUMENT_ROOT');
        $fileConfigSystem = $docRoot . "/comun/comun/xml/system.xml";
        $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
        $env = (string) $xmlConfigSystem->environment->var;
        $extJs = $this->getAppVersion();
        $this->lang = $this->getLangUser();
        $this->theme = $this->getAppTheme($extJs);
        $this->workspace = $this->getWorkSpace();
        $this->env = ($env == 'prod') ? 'all' : $env;
        $this->ext = $this->libjs . 'Extjs/';
        $this->extver = $this->libjs . 'Extjs/' . $extJs . '/';
        $this->extjs = $this->extver . 'ext/ext-' . $this->env . '.js';
        $this->extall = $this->extver . 'ext/ext-all.js';
        $this->extcss = $this->extver . 'resources/css/ext-all' . $this->theme . '.css';
        $this->extlang = $this->libjs . 'Extjs/' . $extJs . '/lang/ext-lang-' . $this->lang . '.js';
        $this->extlangmin = $this->extver . 'lang/ext-lang-' . $this->lang . '.min.js';
        $this->appname = $this->getAppName();
    }

    private function getAppVersion() {
        $docRoot = $this->dataPost->getServer('DOCUMENT_ROOT');
        $fileAppVersion = $docRoot . "/comun/comun/xml/appVersion.xml";
        $xmlAppVersion = simplexml_load_file($fileAppVersion);
        extract($this->getVersionStructure());
        if (isset($xmlAppVersion->$module->$funct->$controller))
            return (string) $xmlAppVersion->$module->$funct->$controller;
        else
            return '2.2';
    }

    private function getAppName() {
        $fileAppName = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/license.xml';
        $xmlAppName = simplexml_load_file($fileAppName);
        if (isset($xmlAppName)) {
            if (isset($xmlAppName->producto)) {
                return $xmlAppName->producto;
            } else {
                return 'Not Application name detected';
            }
        } else {
            return 'Not Application name detected';
        }
        extract($this->getVersionStructure());
        if (isset($xmlAppVersion->$module->$funct->$controller))
            return (string) $xmlAppVersion->$module->$funct->$controller;
        else
            return '';
    }

    private function getAppTheme($extVersion) {
        $user_theme = $this->dataSession->theme;
        if (isset($user_theme)) {
            if ($extVersion == '2.2') {
                if ($user_theme == '1' || $user_theme == '3')//3 neptune
                    return '';
                else if ($user_theme == '2')
                    return '-gray';
            } else if ($extVersion == '4.2') {
                if ($user_theme == '1')
                    return '';
                else if ($user_theme == '2')
                    return '-gray';
                else if ($user_theme == '3')
                    return '-neptune';
            }
        } else {
            
        }
    }

    private function getLangUser() {
        $user_lang = $this->dataSession->lang;
        if (isset($user_lang)) {
            if ($user_lang == '1')
                return 'es';
            else if ($user_lang == '2')
                return 'en';
            else if ($user_lang == '3')
                return 'pr';
        } else {
            return $this->getLanguageSystem();
        }
    }

    private function getWorkSpace() {
        $user_ws = $this->dataSession->espaciotrabajo;
        if (isset($user_ws)) {
            if ($user_ws == '1')
                return 'portal';
            else if ($user_ws == '2')
                return 'desktop';
            else if ($user_ws == '3')
                return 'tabview';
        } else {
            return $this->getWorkSpaceSystem();
        }
    }

    protected function getVersionStructure($uri = false) {
        if (!$uri)
            $uri = $_SERVER["PHP_SELF"];
        $e = explode('index.php', $uri);
        $m = explode('/', $e[0]);
        $c = explode('/', $e[1]);
        if ($m[count($m) - 3] == 'app' && $c[1] != 'index') {
            $module = $m[count($m) - 2];
            $funct = $c[1];
            $contr = $c[2];
        } else {
            $module = $m[count($m) - 3];
            $funct = $m[count($m) - 2];
            $contr = $c[1];
        }
        return array('module' => $module, 'funct' => $funct, 'controller' => $contr);
    }

    private function getWorkSpaceSystem() {
        $docRoot = $this->dataPost->getServer('DOCUMENT_ROOT');
        $fileConfigSystem = $docRoot . "/comun/comun/xml/system.xml";
        $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
        return (string) $xmlConfigSystem->environment->workspace;
    }

    protected function getLanguageSystem() {
        $docRoot = $this->dataPost->getServer('DOCUMENT_ROOT');
        $fileConfigSystem = $docRoot . "/comun/comun/xml/system.xml";
        $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
        $langXml = (string) $xmlConfigSystem->environment->lang;
        if (strlen($langXml) > 0) {
            $this->lang = $langXml;
        } else {
            $lang = $this->dataPost->getServer('HTTP_ACCEPT_LANGUAGE');
            $this->lang = substr($lang, 0, 2);
        }
        return $this->lang;
    }

    /**
     * Set system language.
     * @param string $argLang Language to activate.
     * @return string Message of notification or error on failure.
     */
    protected function setLanguageSystem($argLang) {
        $docRoot = $this->dataPost->getServer('DOCUMENT_ROOT');
        $fileConfigSystem = $docRoot . "/comun/comun/xml/system.xml";
        $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
        $xmlConfigSystem->environment->lang = $argLang;
        if ($xmlConfigSystem->asXML($fileConfigSystem) == TRUE) {
            $this->showMessageInfo('El idioma del sitio fue cambiado correctamente.');
        } else {
            $this->showMessageError('El idioma del sitio no fue cambiado correctamente.');
        }
        return;
    }

    public function getuivalidations() {
        $docRoot = $this->dataPost->getServer('DOCUMENT_ROOT');
        $fileConfigSystem = $docRoot . "/comun/comun/xml/system.xml";
        $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
        if ($xmlConfigSystem->validation->frontend == 'true') {
            $src = explode('?', $this->dataPost->getServer('REQUEST_URI'));
            return $this->uiValidator->getDataResources($src[0], $this->dataSession->arridroles);
        } else {
            return array();
        }
    }

    public function getuivalidationsAction() {
        echo json_encode($this->dataSession->arrUiValidations);
    }

}
