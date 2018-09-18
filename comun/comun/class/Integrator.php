<?php

class Integrator {

    private static $instance;

    public function __construct() {
        
    }

    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function cargarContexto($module, $nameService) {
        $xmlIntegrator = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/integrator.xml';
        $services = $this->xmlReader($xmlIntegrator);
        if (is_array($services)) {
            $dir_modelos = $_SERVER['DOCUMENT_ROOT'] . $services['root'][$module][0][$nameService]['src'];
            spl_autoload_register(array('Doctrine', 'autoload'));
            Doctrine::loadModels($dir_modelos . DIRECTORY_SEPARATOR . 'models', Doctrine::MODEL_LOADING_CONSERVATIVE);

            $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir_modelos . '/models'), RecursiveIteratorIterator::LEAVES_ONLY);
            foreach ($it as $file) {
                $e = explode('.', $file->getFileName());
                if (end($e) === 'php') {
                    require_once($file->getPathName());
                }
            }
        }
    }

    //carga los modelos solicitados por un servicio determinado
    public function setModels($module, $nameService) {
        $xmlIntegrator = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/integrator.xml';
        $services = $this->xmlReader($xmlIntegrator);
        if (is_array($services)) {
            $dir_modelos = $_SERVER['DOCUMENT_ROOT'] . $services['root'][$module][0][$nameService]['src'];
            spl_autoload_register(array('Doctrine', 'autoload'));
            Doctrine::loadModels($dir_modelos . DIRECTORY_SEPARATOR . 'models', Doctrine::MODEL_LOADING_CONSERVATIVE);
            if (file_exists($dir_modelos . '/models/domain/generated')) {
                $itg = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir_modelos . '/models/domain/generated'), RecursiveIteratorIterator::CHILD_FIRST);
                foreach ($itg as $file) {
                    $e = explode('.', $file->getFileName());
                    if (end($e) === 'php') {
                        require_once($file->getPathName());
                    }
                }
            }
            $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir_modelos . '/models'), RecursiveIteratorIterator::LEAVES_ONLY);
            foreach ($it as $file) {
                $e = explode('.', $file->getFileName());
                if (end($e) === 'php') {
                    require_once($file->getPathName());
                }
            }
        }
    }

    //lee el xml y lo convierte a array
    public function xmlReader($archivo) {
        $xmlArray = array();
        if (file_exists($archivo)) {
            $xml = simplexml_load_file($archivo);
            if ($xml) {
                $xmlObj = new XmlToArray($xml->asXML());
                $xmlArray = $xmlObj->createArray();
                return $xmlArray;
            }
        }
    }

}
