<?php

require_once ($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/aspect/controllers/TrazaController.php');

class Aspect {

    private $docRoot;

    public function __construct($url, $className, $actionName, $jsonParams) {
        $this->docRoot = $_SERVER['DOCUMENT_ROOT'];
        $this->initAspect($url, $className, $actionName, $jsonParams);
    }

    private function initAspect($url, $className, $actionName, $jsonParams) {
        try {
            $enbledAspects = $this->loadAspectClass();
            $genTrace = new TrazaController();
            foreach ($enbledAspects as $asp) {
                if ($asp == 'loggin' && $this->isLoggin($actionName)) {
                    $genTrace->addLogginTrace($url, $className, $actionName, $jsonParams);
                    break;
                } else if ($asp == 'trace') {
                    if (isset($_SESSION['identidad'])) {
                        $genTrace->addActionTrace($url, $className, $actionName, $jsonParams);
                    }
                    break;
                } else if ($asp == 'log') {
                    $genTrace->addLogTrace($url, $className, $actionName, 'LOGGIN', $jsonParams);
                    break;
                }
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function isLoggin($actionName) {
        try {
            $fragArray = explode('_', $actionName); //se picotea y se pregunta si contiene _loggin_
            if (count($fragArray) > 1) {
                return ($fragArray[1] == 'loggin') ? true : false;
            }
            return false;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Carga las clases para un apecto determinado
     */
    private function loadAspectClass() {
        try {
            $weaverXML = $this->docRoot . '/comun/comun/xml/weaver.xml';
            $aspectConfig = $this->xmlReader($weaverXML);
            $enbledAspects = array();
            if (is_array($aspectConfig)) {
                foreach ($aspectConfig['aspect'] as $v) {
                    if ($v['active'] == 1) {
                        $this->loadClass($v['src']);
                        $enbledAspects[] = $v['name'];
                    }
                }
            }
            return $enbledAspects;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Carga las clases para un apecto determinado
     */
    private function loadClass($src) {
        try {
            $dir_modelos = $this->docRoot . $src;
            spl_autoload_register(array('Doctrine', 'autoload'));
            Doctrine::loadModels($dir_modelos . '/models', Doctrine::MODEL_LOADING_CONSERVATIVE);

            $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir_modelos . '/models'), RecursiveIteratorIterator::LEAVES_ONLY);
            foreach ($it as $file) {
                $e = explode('.', $file->getFileName());
                if (end($e) === 'php') {
                    require_once($file->getPathName());
                }
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Lee el xml y lo convierte a array
     */
    private function xmlReader($archivo) {
        try {
            $xmlArray = array();
            if (file_exists($archivo)) {
                $xml = simplexml_load_file($archivo);
                if ($xml) {
                    $xmlObj = new XmlToArray($xml->asXML());
                    $xmlArray = $xmlObj->createArray();
                    return $xmlArray;
                }
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
