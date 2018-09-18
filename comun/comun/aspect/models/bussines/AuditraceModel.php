<?php

class AuditraceModel extends ModelSecure {

    private $docRoot;

    public function __construct() {
        parent::__construct();
        $this->docRoot = $_SERVER['DOCUMENT_ROOT'];
    }

    public function loadAspectsConfig() {
        try {
            $fileConfigWeaver = $this->docRoot . "/comun/comun/xml/weaver.xml";
            $xmlConfigWeaver = simplexml_load_file($fileConfigWeaver);

            $datConfigAspects = new stdClass();
            $datConfigAspects->aspect = new stdClass();
            $datConfigAspects->aspect->loggin = (string) $xmlConfigWeaver->loggin['active'];
            $datConfigAspects->aspect->trace = (string) $xmlConfigWeaver->trace['active'];
            $datConfigAspects->aspect->log = (string) $xmlConfigWeaver->log['active'];
            $result = array('data' => $datConfigAspects);
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function saveAspectsConfig($post) {
        try {
            $fileConfigWeaver = $this->docRoot . "/comun/comun/xml/weaver.xml";
            $xmlObject = simplexml_load_file($fileConfigWeaver);
            $xmlObject->loggin['active'] = $post->loggin;
            $xmlObject->trace['active'] = $post->trace;
            $xmlObject->log['active'] = $post->log;
            if ($xmlObject->asXML($fileConfigWeaver) == TRUE) {
                return 1;
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function deleteTraces($post) {
        try {
            if ($post->loggin) {
                $objTraceAuth = new Traceauth();
                $objTraceAuth->deleteTracesAuth($this->estimateDate($post->loggin));
            }
            if ($post->trace) {
                $objTrace = new Trace();
                $objTrace->deleteTraces($this->estimateDate($post->trace));
            }
            if ($post->log == '1') {
                $this->cleanLogs();
            }
            return 1;
        } catch (Exception $exc) {
            throw $exc;
            return 2;
        }
    }

    public function deleteHisTraces($post) {
        try {
            if ($post->hisloggin) {
                $HisTraceAuth = new Histraceauth();
                $HisTraceAuth->deleteHisTracesAuth($this->estimateDate($post->hisloggin));
            }
            if ($post->histrace) {
                $objHisTrace = new Histrace();
                $objHisTrace->deleteHisTraces($this->estimateDate($post->histrace));
            }
            return 1;
        } catch (Exception $exc) {
            throw $exc;
            return 2;
        }
    }

    private function estimateDate($argIdentificator) {
        $days = $this->getDaysNumber($argIdentificator);
        $today = date('d/m/Y');
        if ($days == 0)
            return "'$today'::date";
        else {
            list($d, $m, $y) = explode('/', $today);
            $date = date('d/m/Y', mktime(0, 0, 0, $m, $d - $days, $y));
            return "'$date'::date";
        }
    }

    private function getDaysNumber($argIdentificator) {
        if ($argIdentificator == 1)
            return 180;
        else if ($argIdentificator == 2)
            return 90;
        else if ($argIdentificator == 3)
            return 30;
        else if ($argIdentificator == 4)
            return 0;
        else if ($argIdentificator == 11)
            return 730;
        else if ($argIdentificator == 12)
            return 365;
    }

    private function cleanLogs() {
        $docRoot = $_SERVER['DOCUMENT_ROOT'];
        $logExceptions = $docRoot . '/log/exceptions.log';
        if (file_exists($logExceptions)) {
            $fileExcep = fopen($logExceptions, "w");
            ftruncate($fileExcep, 0);
            fclose($fileExcep);
        }
        $logError = $docRoot . '/log/error.log';
        if (file_exists($logError)) {
            $fileError = fopen($logError, "w");
            ftruncate($fileError, 0);
            fclose($fileError);
        }
    }

    public function loadDataUsuarios() {
        try {
            $objHisTrace = new Histrace();
            $dataUser = $objHisTrace->loadDataUsuarios();
            $response = array();
            foreach ($dataUser['campos'] as $v) {
                $data = array();
                $data[] = $v['idusuario'];
                $data[] = $v['usuario'];
                $response[] = $data;
            }
            return $response;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadFuncionalidadesPorDia() {
        try {
            list($d, $m, $a) = explode('/', date('d/m/Y'));
            $fechaSemana = date("d/m/Y", mktime(0, 0, 0, $m, $d - 7, $a));
            $objHisTrace = new Histrace();
            $funct = $objHisTrace->loadLastSevenDayFunctionality($fechaSemana, date('d/m/Y'));
            if (count($funct)) {
                $depureFunct = $this->getDepureFunct($funct);
                if (count($depureFunct)) {
                    return $this->formatFuncionalidadesPorDia($depureFunct);
                } else {
                    array();
                }
            } else {
                array();
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getDepureFunct($arrFunct) {
        try {
            $arrDepureFunct = Array();
            foreach ($arrFunct as $v) {
                $explodeFunct = explode('/', $v['url']);
                $reversed = array_reverse($explodeFunct);
                if (($reversed[0] == $reversed[1]) && ($reversed[0] != 'index' && ($reversed[0] != 'escritorio' && $reversed[0] != 'engine'))) {
                    $arrDepureFunct[] = array('fecha' => $v['fecha'], 'url' => $v['url']);
                }
            }
            return $arrDepureFunct;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function formatFuncionalidadesPorDia($funct) {
        try {
            $categories = Array();
            $series = Array();
            setlocale(LC_CTYPE, "es_ES");
            $contSeries = 0;
            $date = $this->getDateFormat($funct[0]['fecha']);
            $categories[] = $date;
            foreach ($funct as $key => $v) {
                $tmpdate = $this->getDateFormat($v['fecha']);
                if ($date != $tmpdate) {
                    $series[] = $this->generateSeries($contSeries, count($categories) - 1, $date, $funct);
                    $categories[] = $tmpdate;
                    $contSeries = 1;
                    $date = $tmpdate;
                } else {
                    $contSeries++;
                }
                if (($key + 1 == count($funct)) && count($series) != count($categories)) {
                    $series[] = $this->generateSeries($contSeries, count($categories) - 1, $date, $funct);
                }
            }
            return array('categories' => $categories, 'series' => $series);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function generateSeries($cant, $color, $name, $funct) {
        try {
            $dataSeries = new stdClass();
            $dataSeries->y = $cant;
            $dataSeries->color = $this->getColor($color);
            $drilldown = new stdClass();
            $drilldown->name = $name;
            $drilldown->color = $dataSeries->color;
            $complementDrill = $this->getComplementDrill($name, $funct);
            $drilldown->categories = $complementDrill['categories'];
            $drilldown->data = $complementDrill['data'];
            $dataSeries->drilldown = $drilldown;
            return $dataSeries;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getComplementDrill($date, $funct) {
        try {
            $dateFunct = array();
            $contElements = array();
            $instanceFunct = new Funcionalidades();
            foreach ($funct as $v) {
                $v_date = $this->getDateFormat($v['fecha']);
                if ($date == $v_date) {
                    $dateFunct[] = $v['url'];
                }
            }
            $unica = array_unique($dateFunct);
            foreach ($unica as $v) {
                $dateFunctDiff[] = $v;
            }
            foreach ($dateFunctDiff as &$fdif) {
                $cantf = 0;
                foreach ($dateFunct as $v) {
                    if ($v == $fdif) {
                        $cantf++;
                    }
                }
                $contElements[] = $cantf;
                $f = $instanceFunct->getFunctionalityByUrl($fdif);
                $fdif = (count($f)) ? $f[0]['nombre'] : $this->getControllerDelete($fdif);
            }
            return array('categories' => $dateFunctDiff, 'data' => $contElements);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getControllerDelete($argFunct) {
        try {
            $parts = explode('/', $argFunct);
            return $parts[count($parts) - 1] . 'Controller';
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadAccesosPorDia() {
        try {
            list($d, $m, $a) = explode('/', date('d/m/Y'));
            $fechaSemana = date("d/m/Y", mktime(0, 0, 0, $m, $d - 7, $a));
            $objHisTraceAuth = new Histraceauth();
            $accesos = $objHisTraceAuth->loadLastSevenDayAccess($fechaSemana, date('d/m/Y'));
            return $this->formatAccesosPorDia($accesos);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadAccesosPorEntidad() {
        try {
            list($d, $m, $a) = explode('/', date('d/m/Y'));
            $fechaSemana = date("d/m/Y", mktime(0, 0, 0, $m, $d - 7, $a));
            $objHisTraceAuth = new Histraceauth();
            $accesos = $objHisTraceAuth->loadUsersAccess($fechaSemana, date('d/m/Y'));
            $usuarios = array();
            foreach ($accesos as $v) {
                if ($v['usuario'] != 'WRONG') {
                    $usuarios[] = $v['usuario'];
                }
            }
            if (count($usuarios)) {
                $usuarios = array_unique($usuarios);
                $dataAccess = $objHisTraceAuth->loadUsersAccessByEntity($fechaSemana, date('d/m/Y'), $usuarios);
                if (count($dataAccess)) {
                    $categories = $this->getCategoriesAccesosPorEntidad($dataAccess);
                    $series = $this->getSeriesAccesosPorEntidad($categories, $dataAccess);
                    return array('categories' => $categories, 'series' => $series);
                } else {
                    return array('categories' => array(), 'series' => array());
                }
            } else {
                return array('categories' => array(), 'series' => array());
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getCategoriesAccesosPorEntidad($argData) {
        $categories = [];
        $cat = null;
        foreach ($argData as $v) {
            if ($cat != $v['entidad']) {
                $categories[] = $v['entidad'];
                $cat = $v['entidad'];
            }
        }
        return $categories;
    }

    private function getSeriesAccesosPorEntidad($argCategories, $argData) {
        $arrSeries = array();
        foreach ($argCategories as $k => $v) {
            $newSerie = new stdClass();
            $newSerie->y = 0;
            $newSerie->color = $this->getColor($k);
            $newSerie->drilldown = $this->makeDrilldownAccesosPorEntidad($v, $newSerie, $argData);
            $arrSeries[] = $newSerie;
        }
        return $arrSeries;
    }

    private function makeDrilldownAccesosPorEntidad($argCategorie, &$objSerie, $argData) {
        $objDrilldown = new stdClass();
        $objDrilldown->name = $argCategorie;
        $objDrilldown->color = $objSerie->color;
        $objDrilldown->categories = array();
        $objDrilldown->data = array();
        foreach ($argData as $v) {
            if ($argCategorie == $v['entidad']) {
                $objDrilldown->categories[] = $v['usuario'];
                $objDrilldown->data[] = floatval($v['cantidad']);
                $objSerie->y += floatval($v['cantidad']);
            }
        }
        return $objDrilldown;
    }

    public function loadLastAccessWrong() {
        try {
            list($d, $m, $a) = explode('/', date('d/m/Y'));
            $fechaMes = date("d/m/Y", mktime(0, 0, 0, $m, $d - 30, $a));
            $objHisTraceAuth = new Histraceauth();
            $accesos = $objHisTraceAuth->loadUsersAccessWrong($fechaMes, date('d/m/Y'));
            return $this->formatLastAccessWrong($accesos);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadTraficLastSevenDays() {
        try {
            list($d, $m, $a) = explode('/', date('d/m/Y'));
            $weekendDate = date("d/m/Y", mktime(0, 0, 0, $m, $d - 7, $a));
            list($day, $month, $year) = explode('/', $weekendDate);
            $objHisTrace = new Histrace();
            $trafic = $objHisTrace->loadLastSevenDayFunctionality($weekendDate, date('d/m/Y'));
            $dateControl = Array();
            $data = array();
            setlocale(LC_CTYPE, "es_ES");
            foreach ($trafic as $v) {
                $date = $this->getDateFormat($v['fecha']);
                if (!in_array($date, $dateControl)) {
                    $dateControl[] = $date;
                    $data = $this->getTraficData($trafic, $v['fecha'], $data);
                }
            }
            return array('day' => $day, 'month' => $month, 'year' => $year, 'data' => $data);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function formatAccesosPorDia($accesos) {
        try {
            $categories = Array();
            $series = new stdClass();
            $series->accesos = Array();
            $series->usuarios = Array();
            setlocale(LC_CTYPE, "es_ES");
            foreach ($accesos as $v) {
                $date = $this->getDateFormat($v['fecha']);
                if (!in_array($date, $categories)) {
                    $categories[] = $date;
                    $userAccess = $this->getCantUsuariosAccesos($accesos, $v['fecha']);
                    $series->accesos[] = $userAccess['accesos'];
                    $series->usuarios[] = $userAccess['usuarios'];
                }
            }
            return array('categories' => $categories, 'series' => $series);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getCantUsuariosAccesos($arrData, $fecha) {
        try {
            $arrUsuarios = Array();
            $intAccesos = 0;
            foreach ($arrData as $v) {
                if ($v['fecha'] == $fecha) {
                    $arrUsuarios[] = $v['usuario'];
                    $intAccesos++;
                }
            }
            $arrUsuariosU = array_unique($arrUsuarios);
            return array('accesos' => $intAccesos, 'usuarios' => count($arrUsuariosU));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function formatLastAccessWrong($accesos) {
        try {
            $categories = Array();
            $series = new stdClass();
            $series->accesos = Array();
            setlocale(LC_CTYPE, "es_ES");
            foreach ($accesos as $v) {
                $date = $this->getDateFormat($v['fecha']);
                if (!in_array($date, $categories)) {
                    $categories[] = $date;
                    $series->accesos[] = $this->getCantUsersAccessWrong($accesos, $v['fecha']);
                }
            }
            return array('categories' => $categories, 'series' => $series);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getCantUsersAccessWrong($arrData, $fecha) {
        try {
            $intAccesos = 0;
            foreach ($arrData as $v) {
                if ($v['fecha'] == $fecha) {
                    $intAccesos++;
                }
            }
            return $intAccesos;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getTraficData($arrData, $fecha, $dataResponse) {
        try {
            $oneTime = 0;
            $twoTime = 0;
            $threeTime = 0;
            $fourTime = 0;
            $fiveTime = 0;
            $sixTime = 0;
            foreach ($arrData as $v) {
                if ($v['fecha'] == $fecha) {
                    $hour = explode(':', $v['hora']);
                    $meridian = explode(' ', $v['hora']);
                    $h = $hour[0];
                    $m = $meridian[1];
                    if ($h >= 12 && $h < 4 && $m == 'AM') {
                        $oneTime++;
                    } else if ($h >= 4 && $h < 8 && $m == 'AM') {
                        $twoTime++;
                    } else if ($h >= 8 && $h < 12 && $m == 'PM') {
                        $threeTime++;
                    } else if ($h >= 12 && $h < 4 && $m == 'PM') {
                        $fourTime++;
                    } else if ($h >= 4 && $h < 12 && $m == 'PM') {
                        $fiveTime++;
                    } else if ($h >= 8 && $h < 12 && $m == 'AM') {
                        $sixTime++;
                    }
                }
            }
            array_push($dataResponse, $oneTime, $twoTime, $threeTime, $fourTime, $fiveTime, $sixTime);
            return $dataResponse;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getDateFormat($date) {
        try {
            if (strpos($date, '/')) {
                list($d, $m, $a) = explode('/', $date);
            } else {
                list($a, $m, $d) = explode('-', $date);
            }
            return date("d/M", mktime(0, 0, 0, $m, $d, $a));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getColor($position) {
        try {
            $arrColors = array('#4572A7', '#AA4643', '#89A54E', '#80699B', '#3D96AE',
                '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92', '#1084C5', '#F7F7F7', '#36480E', '#F9A427', '#3B277E', '#780001', '#A7DBFD', '#D0BE00', '#C8C8C8', '#0095FF');
            return $arrColors[$position];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
