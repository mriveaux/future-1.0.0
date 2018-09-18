<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Session.php');
$dataSession = Session::getInstance();
$dataSession->lastAccess = date("Y-n-j H:i:s");
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/SecureSession.php');
//clase utilidades(includeModulos,xmlReader,conexionDoctrineDB......)
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/class/utilesComun.php');
//carga el framework doctrine
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Doctrine/Doctrine.php');
//direccion del fichero xml de configuraciones
$xmlconfig = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/xmlConfig.xml';
$utiles = new utilesComun();
//inclusion de las clases del framework
$utiles->includeModulos($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/class');

$con = $utiles->xmlReader($xmlconfig);

//conexion a la base de datos
if (is_array($con))
    $utiles->conexionDoctrineDB($con['root']['node'][0], dirname(__FILE__));
$utiles->cargarModelos(dirname(__FILE__));

//inclusion de las clases del componente
$utiles->includeModulos(dirname(__FILE__));

extract($_REQUEST);
$path = parse_url($utiles->getUrl());
$url = explode('/', $path['path']);
//prefijo de la accion
$prefijo_acc = 'Action';
//prefijo de la clase control
$prefijo_control = 'Controller';

$_REQUEST['vista'] = dirname(__FILE__);
$_REQUEST['js'] = dirname($_SERVER['SCRIPT_NAME']);
$_REQUEST['comun'] = '/comun/Extjs/';
$_REQUEST['comun_c'] = '/comun/';
$port = '';
$_REQUEST['url'] = 'http://' . $_SERVER['HTTP_HOST'] . $port . '/app/';

if (class_exists($url[count($url) - 2] . $prefijo_control)) {

    $classname = $url[count($url) - 2] . $prefijo_control;
    $my_object = new $classname();
    $class_methods = get_class_methods(get_class($my_object));

    if (is_numeric(array_search(end($url) . $prefijo_acc, $class_methods))) {
        $accion = end($url) . $prefijo_acc;
        $my_object->$accion();
        new Aspect($path['path'], $classname, end($url), $utiles->getArgParamsToJSON());
    } else {
        trigger_error("La accion : " . end($url) . ' no existe', E_USER_WARNING);
    }
} else {
    trigger_error("No es posible cargar la clase: " . $url[count($url) - 2], E_USER_WARNING);
}
