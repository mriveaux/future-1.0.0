<?php

class InstallModel extends ModelSecure {

    private $docRoot;
    private $serials = ['BHECP-QP4ZR-HH6DF-7VXMM', 'OB4XR-QSWUA-269W7-S6IRM', '4MK2D-ACR6J-BENJ3-NGAJQ', 'FMBHZ-QHO77-2FDIS-MGGNX', 'W4BZQ-QIAB7-Z9YKV-VC3OJ', 'YABPT-QNOBJ-XKLO7-ZMT2J', 'J4QVG-AACQU-3YI37-6VNDD'];
    private $days = [30, 90, 180, 365, 730, 1825, 3650];

    public function __construct() {
        parent::__construct();
        $this->docRoot = $_SERVER['DOCUMENT_ROOT'];
    }

    public function testConnection($post) {
        try {
            $utiles = new utilesComun();
            $connection = $utiles->testConexionDoctrineDB($post);
            $connection->connect();
            return true;
        } catch (Exception $exc) {
            return 3;
        }
    }

    public function saveConnection($post) {
        try {
            $utiles = new utilesComun();
            $connection = $utiles->testConexionDoctrineDB($post);
            $connection->connect();
            $this->createConfigFile($post);
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function verifyRegister($argRequest) {
        return $this->getSerialNumber($argRequest['serial']);
    }

    public function saveRegister($argRequest) {
        try {
            $serial = $this->getSerialNumber($argRequest['serial']);
            if ($serial->validSerial) {
                $this->createRegisterFile($argRequest, $serial);
                return 1;
            } else {
                return 2; //No. serie invalido
            }
        } catch (Exception $exc) {
            return 3;
        }
    }

    private function getSerialNumber($argSn) {
        $response = new stdClass();
        if (in_array($argSn, $this->serials)) {
            $key = array_search($argSn, $this->serials);
            $response->validSerial = true;
            $response->validDays = $this->days[$key];
            $response->registerDate = date('d/m/Y');
            list($d, $m, $Y) = explode('/', $response->registerDate);
            $response->endDate = date('d/m/Y', mktime(0, 0, 0, $m, $d + $response->validDays, $Y));
        }
        else
            $response->validSerial = false;
        return $response;
    }

    private function generateRegisterToken($endDate) {
        list($d, $m, $Y) = explode('/', $endDate);
        $s1 = ['B3DE-7A67-3CD6-7280-51BE-5555-6512-726D', '7C36-A2FC-8744-64FF-7183-1336-2206-EE3B', '5B69-31C6-119E-F646-07AC-99C1-6F16-6F55', 'C665-87EA-07D2-2DDE-F853-8111-CCD9-BCBD'];
        $s2 = ['5520-ADC9-33B6-C6A1-BC66-C752-0851-C5F7', '2AE7-D959-8CCC-9DD3-68FB-A64C-D3FC-C573', 'B408-F99C-052E-B490-C97A-F0FC-C2C5-D8F3', '0B10-26D1-5F57-A379-279A-9D4A-3078-DFB2'];
        $s3 = ['2ED7-8F45-3DC8-ABC6-2871-5FCE-C54C-85C4', 'F0DF-D027-588C-282E-6713-D816-0B97-BEF0', 'F1C2-2A69-9FC3-5E12-3396-8A5E-1761-E47E', 'C69C-2EBC-8A48-8DC8-D34E-5406-4096-3F4D'];
        $s4 = ['3FEA-9211-90FA-08E8-47C1-87CE-F26B-C1F0', 'C468-C7BE-B86C-69A5-567A-362D-9A2A-ADA8', 'BD14-67AF-3B08-9FB4-035B-7357-2F86-4C14', '6C6C-2AF9-000E-3C11-16F6-02CE-7A11-443B'];
        $phrase = implode('-', $s1) . '-TD' . $d . '-' . implode('-', $s2) . '-TM' . $m . '-' . implode('-', $s3) . '-' . $Y . '-' . implode('-', $s4);
        return base64_encode($phrase);
    }

    private function createConfigFile($postCxn) {
        try {
            $postCxn->dbdriver = (isset($postCxn->driver)) ? $postCxn->driver : 'pgsql';
            $utiles = new utilesComun();
            $dbpass = $utiles->encriptSecret($postCxn->dbpass);
            $fileXmlConfig = $this->docRoot . "/comun/comun/xml/xmlConfig.xml";
            if (file_exists($fileXmlConfig)) {
                $xmlConfigDb = simplexml_load_file($fileXmlConfig);
                $xmlConfigDb->node->driver = $postCxn->dbdriver;
                $xmlConfigDb->node->host = $postCxn->dbhost;
                $xmlConfigDb->node->port = $postCxn->dbport;
                $xmlConfigDb->node->db = $postCxn->dbname;
                $xmlConfigDb->node->usuario = $postCxn->dbuser;
                $xmlConfigDb->node->password = $dbpass;
                $resultWrite = $xmlConfigDb->asXML($fileXmlConfig);
                if ($resultWrite != false) {
                    $utiles->writeSecret();
                    $dirInstall = $INSTALL_DIRECTORY = $this->docRoot . "/app/web-install";
                    $utiles->removeDirectory($dirInstall);
                } else {
                    throw new Exception("The system keys file hasn't been able to be written. Please, contact your administrator.");
                }
            } else {
                throw new Exception("The system configuration file been able to get loaded. Please, contact your administrator.");
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function removeInstallDirectory() {
        try {
            $INSTALL_DIRECTORY = $this->docRoot . "/app/web-install";
            chmod($INSTALL_DIRECTORY, 0777);
            //models
            unlink($INSTALL_DIRECTORY . '/models/bussines/InstallModel.php');
            rmdir($INSTALL_DIRECTORY . '/models/bussines/');
            rmdir($INSTALL_DIRECTORY . '/models/');
            //controller
            unlink($INSTALL_DIRECTORY . '/controllers/InstallController.php');
            rmdir($INSTALL_DIRECTORY . '/controllers');
            //index
            unlink($INSTALL_DIRECTORY . '/index.php');
            //views
            unlink($INSTALL_DIRECTORY . '/views/scripts/install/install.phtml');
            rmdir($INSTALL_DIRECTORY . '/views/scripts/install/');
            rmdir($INSTALL_DIRECTORY . '/views/scripts/');
            unlink($INSTALL_DIRECTORY . '/views/js/install/install.js');
            rmdir($INSTALL_DIRECTORY . '/views/js/install/');
            rmdir($INSTALL_DIRECTORY . '/views/js/');
            rmdir($INSTALL_DIRECTORY . '/views/');
            //DIRECTORY
            rmdir($INSTALL_DIRECTORY);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function createRegisterFile($argParams, $serialData) {
        $lic_dir = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/license.xml';
        if (!file_exists($lic_dir)) {
            $file = fopen($lic_dir, 'w');
            $content = "<?xml version='1.0' encoding='ISO-8859-1'?><root></root> ";
            fwrite($file, $content);
            fclose($file);
        }
        $lic_xml = simplexml_load_file($lic_dir);
        $lic_xml->producto = $argParams['productname'];
        $lic_xml->version = '1.0.0';
        $lic_xml->empresa = $argParams['enterprisename'];
        $lic_xml->noserie = $argParams['serial'];
        $lic_xml->duracion = $serialData->validDays;
        $lic_xml->registro = $serialData->registerDate;
        $lic_xml->caducidad = $serialData->endDate;
        $lic_xml->serial = $this->generateRegisterToken($serialData->endDate);
        $lic_xml->asXML($lic_dir);
    }

}
