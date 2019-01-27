<?php

class utilesComun {

    public function __construct() {
        
    }

    /**
     * @param $dir
     * @throws Exception
     */
    public function includeModulos($dir) {
        try {
            $dir = str_replace('//', '/', $dir);
            $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir), RecursiveIteratorIterator::LEAVES_ONLY);
            foreach ($it as $file) {
                $e = explode('.', $file->getFileName());
                if (end($e) === 'php') {
                    require_once(str_replace('\\', '/', $file->getPathName()));
                }
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @return string
     * @throws Exception
     */
    public function getUrl() {
        try {
            $s = empty($_SERVER["HTTPS"]) ? '' : ($_SERVER["HTTPS"] == "on") ? "s" : "";
            $protocol = $this->strleft(strtolower($_SERVER["SERVER_PROTOCOL"]), "/") . $s;
            $port = ($_SERVER["SERVER_PORT"] == "80") ? "" : (":" . $_SERVER["SERVER_PORT"]);
            return $protocol . "://" . $_SERVER['SERVER_NAME'] . $port . $_SERVER['REQUEST_URI'];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @param $s1
     * @param $s2
     * @return bool|string
     * @throws Exception
     */
    public function strleft($s1, $s2) {
        try {
            return substr($s1, 0, strpos($s1, $s2));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @param $archivo
     * @return array
     * @throws Exception
     */
    public function xmlReader($archivo) {
        try {
            if (file_exists($archivo)) {
                $xml = @simplexml_load_file($archivo);
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

    /**
     * Example of use: <br/> $xml = new SimpleXMLElement('<rootTag/>');<br> xmlWriter($arrayXml, $simpleXml);
     * @param array $arrayXml
     * @param SimpleXMLElement $simpleXml
     * @return SimpleXMLElement SimpleXMLElement
     * @throws Exception
     */
    public function xmlWriter(array $arrayXml, SimpleXMLElement $simpleXml, $filePath = NULL) {
        try {
            foreach ($arrayXml as $k => $v) {
                is_array($v) ? $this->xmlWriter($v, $simpleXml->addChild($k)) : $simpleXml->addChild($k, $v);
            }
            return (isset($filePath) && $filePath != NULL) ? $simpleXml->asXML($filePath) : $simpleXml;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @param $conect
     * @return Doctrine_Connection
     * @throws Exception
     */
    public function conexionDoctrineDB($conect) {
        try {
            spl_autoload_register(array('Doctrine', 'autoload'));
//            if (Doctrine_Manager::beforeConnection($this->getParamsConecction())) {
            //$pass = $this->decript($conect['password']);
//            print_r($pass);die;
            $conn = Doctrine_Manager::connection($conect['driver'] . '://' . $conect['usuario'] . ':' .
                            $pass . '@' . $conect['host'] . ':' . $conect['port'] . '/' . $conect['db']);
            return $conn;
//            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @param $argCxn
     * @return Doctrine_Connection
     * @throws Exception
     */
    public function testConexionDoctrineDB($argCxn) {
        try {
            if (!isset($argCxn->driver)) {
                $argCxn->driver = 'pgsql';
            }
            if (!isset($argCxn->dbport)) {
                $argCxn->dbport = 5432;
            }
            spl_autoload_register(array('Doctrine', 'autoload'));
            return Doctrine_Manager::connection($argCxn->driver . '://' . $argCxn->dbuser . ':' .
                            $argCxn->dbpass . '@' . $argCxn->dbhost . ':' . $argCxn->dbport . '/' . $argCxn->dbname);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @param $dir_modelos
     * @param string $model
     * @throws Exception
     */
    public function cargarModelos($dir_modelos, $model = 'models') {
        try {
            spl_autoload_register(array('Doctrine', 'autoload'));
            if (file_exists($dir_modelos . DIRECTORY_SEPARATOR . $model)) {
                Doctrine_Core::loadModels($dir_modelos . DIRECTORY_SEPARATOR . $model);
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @param $key
     * @param array $array
     * @return array
     * @throws Exception
     */
    public function obtenerArray($key, $array = array()) {
        try {
            $result = array();
            foreach ($array as $v) {
                $result[] = $v[$key];
            }
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @param $encoded_pass
     * @return string
     * @throws Exception
     */
    function decript($encoded_pass) {
        try {
            $RSA = new RSA();
            $keys = $RSA->generate_keys($RSA->get_public_key(), $RSA->get_private_key());
            $decoded = $RSA->decrypt($encoded_pass, $keys[2], $keys[0]);
            return $decoded;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @param $plainText
     * @return string
     * @throws Exception
     */
    function encriptSecret($plainText) {
        try {
            $RSA = new RSA();
            $keys = $RSA->generate_keys($RSA->get_public_key(), $RSA->get_private_key());
            $encoded = $RSA->encrypt($plainText, $keys[1], $keys[0], 2);
            return $encoded;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @return array
     * @throws Exception
     */
    private function getParamsConecction() {
        try {
            $RSA = new RSA();
            $a = $RSA->generate_private_Key();
            $xml = $this->xmlReader($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/keys.xml');
            $b = (isset($xml['root']['address'])) ? $xml['root']['address'] : null;
            return array('a' => $a, 'b' => $b);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @throws Exception
     */
    public function writeSecret() {
        try {
            $RSA = new RSA();
            $RSA->do_write_address();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * @throws Exception
     */
    public function rewriteSecret() {
        try {
            $RSA = new RSA();
            $RSA->do_rewrite_address();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function removeDirectory($carpeta) {
        chmod($carpeta, 0777);
        foreach (glob($carpeta . "/*") as $archives_folders) {
            if (is_dir($archives_folders)) {
                $this->removeDirectory($archives_folders);
            } else {
                unlink($archives_folders);
            }
        }
        rmdir($carpeta);
    }

    /**
     * @return string
     * @throws Exception
     */
    public function getGuid() {
        try {
            if (function_exists('com_create_guid')) {
                $uuid = com_create_guid();
            } else {
                mt_srand((double) microtime() * 10000); //optional for php 4.2.0 and up.
                $charid = strtoupper(md5(uniqid(rand(), true)));
                $hyphen = chr(45); // "-"
                $uuid = chr(123)// "{"
                        . substr($charid, 0, 8) . $hyphen
                        . substr($charid, 8, 4) . $hyphen
                        . substr($charid, 12, 4) . $hyphen
                        . substr($charid, 16, 4) . $hyphen
                        . substr($charid, 20, 12)
                        . chr(125); // "}"
            }
            return $uuid;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function setDateFormat(&$argData, $argFields, $format = 'd/m/Y') {
        foreach ($argData as &$row) {
            foreach ($argFields as &$field) {
                if (isset($row [$field])) {
                    list($y, $m, $d) = explode('-', $row [$field]);
                    $row [$field] = date($format, mktime(0, 0, 0, $m, $d, $y));
                }
            }
        }
    }

    public function getArgParamsToJSON() {
        return json_encode($_POST);
    }

}
