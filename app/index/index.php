<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Session.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/class/utilesComun.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/lib/php/Doctrine/Doctrine.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/lib/php/Exception/Future_Logger.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/lib/php/Exception/Future_Exception.php');
try {
    $dataSession = Future_Session::getInstance();
    $dataSession->lastAccess = date("Y-n-j H:i:s");
    if (ini_get('date.timezone') == '') {
        ini_set('date.timezone', 'America/Havana');
    }
    $utiles = new utilesComun();
    $utiles->includeModulos($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/class');
    $xmlconfig = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/xmlConfig.xml';
    $con = $utiles->xmlReader($xmlconfig);
    if (is_array($con)) {
        $utiles->conexionDoctrineDB($con['root']['node'][0], dirname(__FILE__));
    }
    $utiles->cargarModelos(dirname(__FILE__));
    $utiles->includeModulos(dirname(__FILE__));
    extract($_REQUEST);
    $path = parse_url($utiles->getUrl());
    $url = explode('/', $path['path']);
    $prefijo_acc = 'Action';
    $prefijo_control = 'Controller';
    $_REQUEST['vista'] = dirname(__FILE__);
    $_REQUEST['js'] = dirname($_SERVER['SCRIPT_NAME']);
    $_REQUEST['libcss'] = '/lib/css/';
    $_REQUEST['libjs'] = '/lib/js/';
    $_REQUEST['libphp'] = '/lib/php/';
    $_REQUEST['comun'] = '/comun/';
    $_REQUEST['url'] = 'http://' . $_SERVER['HTTP_HOST'] . '/app/';
    $_REQUEST['dir-application'] = 'http://' . $_SERVER['HTTP_HOST'];
    if (class_exists($url[count($url) - 2] . $prefijo_control)) {
        $classname = $url[count($url) - 2] . $prefijo_control;
        $my_object = new $classname();
        $class_methods = get_class_methods(get_class($my_object));

        if (is_numeric(array_search(end($url) . $prefijo_acc, $class_methods))) {
            $accion = end($url) . $prefijo_acc;
            $my_object->$accion();
            new Aspect($path['path'], $classname, end($url), $utiles->getArgParamsToJSON());
        } else {
            trigger_error("The action <b>" . end($url) . "</b> doesn't exists on $classname.", E_USER_WARNING);
        }
    } else {
        trigger_error("The class: " . $url[count($url) - 2] . " hasn't been able to get load.", E_USER_WARNING);
    }
} catch (Exception $e) {
    Future_Logger::writeLogException($e);
}