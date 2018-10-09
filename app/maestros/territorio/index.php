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

    if (isset($_SERVER["PATH_INFO"])) {
        $cai = '/^\/([a-z]+\w)\/([a-z]+\w)\/([0-9]+)$/';  // /controller/action/id
        $ca = '/^\/([a-z]+\w)\/([a-z]+)$/';              // /controller/action
        $ci = '/^\/([a-z]+\w)\/([0-9]+)$/';               // /controller/id
        $c = '/^\/([a-z]+\w)$/';                             // /controller
        $i = '/^\/([0-9]+)$/';                             // /id
        $matches = array();
        if (preg_match($cai, $_SERVER["PATH_INFO"], $matches)) {
            $classname = $matches[1] . $prefijo_control;
            $accion = $matches[2] . $prefijo_acc;
            $id = $matches[3];
        } else if (preg_match($ca, $_SERVER["PATH_INFO"], $matches)) {
            $classname = $matches[1] . $prefijo_control;
            $accion = $matches[2] . $prefijo_acc;
        } else if (preg_match($ci, $_SERVER["PATH_INFO"], $matches)) {
            $classname = $matches[1] . $prefijo_control;
            $id = $matches[2];
        } else if (preg_match($c, $_SERVER["PATH_INFO"], $matches)) {
            $classname = $matches[1] . $prefijo_control;
        } else if (preg_match($i, $_SERVER["PATH_INFO"], $matches)) {
            $id = $matches[1];
        }

        if (class_exists($classname)) {
            $my_object = new $classname();
            $class_methods = get_class_methods(get_class($my_object));

            if (is_numeric(array_search($accion, $class_methods))) {
                $my_object->$accion();
                new Aspect($path['path'], $classname, end($url));
            } else {
                trigger_error("The action <b>" . $matches[2] . "</b> doesn't exists on $classname.", E_USER_WARNING);
            }
        } else {
            trigger_error("The class: " . $matches[1] . " hasn't been able to get load.", E_USER_WARNING);
        }
    }
} catch (Exception $e) {
    Future_Logger::writeLogException($e);
}