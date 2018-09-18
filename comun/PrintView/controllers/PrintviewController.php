<?php

class PrintviewController extends ControllerSecure {

    function __construct() {
        parent::__construct();
    }

    function savePostAction() {
        try {
            $this->dataSession->REPORT_CONFIG = array($this->dataPost->reportType, $this->dataPost->reportOrientation, $this->dataPost->reportPaperSize, $this->dataPost->dataSources);
            echo ("{info: true}");
        } catch (Exception $ex) {
            echo ("{info: false}");
        }
    }

    function buildReportAction() {
        $dataSources = $this->dataSession->REPORT_CONFIG;
        if (count($dataSources) > 0) {
            $objReportModel = new ReportModel();
            $result = json_decode(stripslashes($dataSources[3]));
            if (!is_array($result)) {
                $result = array($result);
            }
            $objReportModel->buildReport($result, array($dataSources[0], $dataSources[1], $dataSources[2]));
        } else {
            echo "ERROR CARGANDO DATOS";
        }
    }

    function importDataAction() {
        $idsistema = $_POST['id'];
        $type = $_POST['tipo'];
        $dirFile = $_FILES['fileUpload']['tmp_name'];
        $strReportModel = "/comun/PrintView/class/ReportModel.php";
        $this->getFile($strReportModel, 'ReportModel');
        $objReportModel = new ReportModel();
        switch ($type) {
            case 'DBF': //dbf
//                $result = $objReportModel->createDataFromDBF($dirFile, $idsistema);
//                if (count($result->data) > 0) {
//                    echo json_encode(array('datos' => $result));
//                } else {
//                    echo "{success: false}";
//                }
                break;
            case 'EXCEL':
                $result = $objReportModel->createDataFromEXCEL($dirFile, $idsistema);
                if ($result) {
                    echo json_encode(array('success' => true, 'datos' => $result));
                } else {
                    echo "{success: false}";
                }
                break;
            case 'XML':
                $contenido = file_get_contents($dirFile);
                $contenido = ltrim($contenido);
                if ($obj = simplexml_load_string($contenido)) {
                    $xmlcargado = $obj;
                    try {
                        $this->arrayainsertar($xmlcargado, $idsistema, '');
                        echo "{success: true}";
                    } catch (Exception $exc) {
                        echo "{success: false}";
                    }
                } else {
                    echo "{success: false}";
                }
                break;
            default:break;
        }
    }

    public function getFile($argPathFile, $argNameFile) {
        $apps = $_SERVER['DOCUMENT_ROOT'];
        if (file_exists($apps . $argPathFile)) {
            require_once($apps . $argPathFile);
        } else {
            die("LA CLASE <b>$argNameFile</b> NO HA SIDO ENCONTRADA EN EL SERVIDOR.</br> <b>RUTA</b>:  $argPathFile </br>");
        }
    }

}
