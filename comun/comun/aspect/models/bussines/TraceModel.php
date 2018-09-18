<?php

class TraceModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    /**
     * adiciona traza de tipo accion
     */
    public function addActionTrace($url, $className, $actionName, $jsonParams) {
        try {
            $objTrace = new Trace();
            $objTrace->usuario = $this->dataSession->datuser;
            $objTrace->tipotraza = 'ACCION';
            $objTrace->accion = $actionName;
            $objTrace->origen = $className;
            $objTrace->url = $url;
            $objTrace->parametros = $jsonParams;
            $objTrace->ip = self::getIPClientReal();
            $objTrace->hora = date('h:i:s A');
            $objTrace->memoria = 65465465;
            $objTrace->tiempor = 6546565;
            $objTrace->identidad = $this->dataSession->identidad;
            $objTrace->save();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function addLogginTrace($url, $className, $actionName, $jsonParams) {
        try {
            $objTraceAuth = new Traceauth();
            $objTraceAuth->usuario = (isset($this->dataSession->datuser)) ? $this->dataSession->datuser : 'WRONG';
            $objTraceAuth->tipotraza = 'AUTENTICACION';
            $objTraceAuth->accion = $actionName;
            $objTraceAuth->origen = $className;
            $objTraceAuth->url = $url;
            $objTraceAuth->parametros = $jsonParams;
            $objTraceAuth->ip = self::getIPClientReal();
            $objTraceAuth->hora = date('h:i:s A');
            $objTraceAuth->memoria = 65465465;
            $objTraceAuth->tiempor = 6546565;
            $objTraceAuth->opsystem = $this->getPlatform();
            $objTraceAuth->browser = $this->getBrowser();
            $objTraceAuth->save();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadTipoTraza() {
        try {
            $records = array();
            $aspectConfig = $this->loadAspectElements();
            foreach ($aspectConfig as $v) {
                $records[] = $v;
            }
            return array('campos' => $records);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function loadAspectElements() {
        try {
            $weaverXML = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/weaver.xml';
            $aspectConfig = $this->xmlReader($weaverXML);
            return $aspectConfig['aspect'];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * lee el xml y lo convierte a array
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

    public function loadDataUsuarios() {
        try {
            $objTrace = new Trace();
            $dataUser = $objTrace->loadDataUsuarios();
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

    /**
     * Carga las funcionlidades accedidas por dia
     */
    public function loadFuncionalidadesPorDia() {
        try {
            list($d, $m, $a) = explode('/', date('d/m/Y'));
            $fechaSemana = date("d/m/Y", mktime(0, 0, 0, $m, $d - 7, $a));
            $objTrace = new Trace();
            $funct = $objTrace->loadLastSevenDayFunctionality($fechaSemana, date('d/m/Y'));
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

    /**
     * Crea el formato para la grafica de funcionalidades por dia
     * @param Array $funct
     * @return Array
     */
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

    /**
     * Carga los accesos de los usuarios por dia
     */
    public function loadAccesosPorDia() {
        try {
            list($d, $m, $a) = explode('/', date('d/m/Y'));
            $fechaSemana = date("d/m/Y", mktime(0, 0, 0, $m, $d - 7, $a));
            $objTraceAuth = new Traceauth();
            $accesos = $objTraceAuth->loadLastSevenDayAccess($fechaSemana, date('d/m/Y'));
            return $this->formatAccesosPorDia($accesos);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Crea el formato para la grafica de accesos por dia
     * @param Array $accesos
     * @return Array
     */
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
                '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92');
            return $arrColors[$position];
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * carga los datos para la vista previa del reporte
     */
    public function loadDataPreview() {
        try {
            $obj_trabajador = new Trabajador();
            $trabajadores = $obj_trabajador->loadDataTrabajadores();
            foreach ($trabajadores as &$v) {
                $v['fechaentrada'] = implode('/', array_reverse(explode('-', $v['fechaentrada'])));
            }
            $datoGeneral = new stdClass();
            $datoGeneral->reporte = 1001;
            $datoGeneral->titulo = 'Plantilla_trabajadores';
            $datoGeneral->entidad = $this->dataSession->desc_entidad;
            return array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $trabajadores);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private static function getIPClient() {
        try {
            if ($_SERVER['SERVER_NAME'] == 'localhost') {
                $ipClient = '127.0.0.1';
            } else {
                if (isset($_SERVER['HTTP_CLIENT_IP']) && $_SERVER['HTTP_CLIENT_IP'] != null) {
                    $ipClient = $_SERVER['HTTP_CLIENT_IP'];
                } else if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] != null) {
                    $ipClient = $_SERVER['HTTP_X_FORWARDED_FOR'];
                } else {
                    $ipClient = $_SERVER['REMOTE_ADDR'];
                }
            }
            return $ipClient;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private static function getIPClientReal() {
        try {
            if (isset($_SERVER['HTTP_X_FORWARDED_FOR']) && $_SERVER['HTTP_X_FORWARDED_FOR'] != '') {
                $ipClientReal = (!empty($_SERVER['REMOTE_ADDR']) ) ?
                        $_SERVER['REMOTE_ADDR'] :
                        ( (!empty($_ENV['REMOTE_ADDR']) ) ?
                                $_ENV['REMOTE_ADDR'] :
                                "unknown" );

                // los proxys van añadiendo al final de esta cabecera
                // las direcciones ip que van "ocultando". Para localizar la ip real
                // del usuario se comienza a mirar por el principio hasta encontrar 
                // una dirección ip que no sea del rango privado. En caso de no 
                // encontrarse ninguna se toma como valor el REMOTE_ADDR

                $entries = preg_split('/[, ]/', $_SERVER['HTTP_X_FORWARDED_FOR']);

                reset($entries);
                while (list(, $entry) = each($entries)) {
                    $entry = trim($entry);
                    if (preg_match("/^([0-9]+\.[0-9]+\.[0-9]+\.[0-9]+)/", $entry, $ip_list)) {
                        // http://www.faqs.org/rfcs/rfc1918.html
                        $private_ip = array(
                            '/^0\./',
                            '/^127\.0\.0\.1/',
                            '/^192\.168\..*/',
                            '/^172\.((1[6-9])|(2[0-9])|(3[0-1]))\..*/',
                            '/^10\..*/');

                        $found_ip = preg_replace($private_ip, $ipClientReal, $ip_list[1]);

                        if ($ipClientReal != $found_ip) {
                            $ipClientReal = $found_ip;
                            break;
                        }
                    }
                }
            } else {
                $ipClientReal = self::getIPClient();
            }
            return $ipClientReal;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function getPlatform() {
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        if (strpos($user_agent, 'Windows NT 10.0') !== FALSE)
            return "Windows 10";
        elseif (strpos($user_agent, 'Windows NT 6.3') !== FALSE)
            return "Windows 8.1";
        elseif (strpos($user_agent, 'Windows NT 6.2') !== FALSE)
            return "Windows 8";
        elseif (strpos($user_agent, 'Windows NT 6.1') !== FALSE)
            return "Windows 7";
        elseif (strpos($user_agent, 'Windows NT 6.0') !== FALSE)
            return "Windows Vista";
        elseif (strpos($user_agent, 'Windows NT 5.1') !== FALSE)
            return "Windows XP";
        elseif (strpos($user_agent, 'Windows NT 5.2') !== FALSE)
            return 'Windows 2003';
        elseif (strpos($user_agent, 'Windows NT 5.0') !== FALSE)
            return 'Windows 2000';
        elseif (strpos($user_agent, 'Windows ME') !== FALSE)
            return 'Windows ME';
        elseif (strpos($user_agent, 'Win98') !== FALSE)
            return 'Windows 98';
        elseif (strpos($user_agent, 'Win95') !== FALSE)
            return 'Windows 95';
        elseif (strpos($user_agent, 'WinNT4.0') !== FALSE)
            return 'Windows NT 4.0';
        elseif (strpos($user_agent, 'Windows Phone') !== FALSE)
            return 'Windows Phone';
        elseif (strpos($user_agent, 'Windows') !== FALSE)
            return 'Windows';
        elseif (strpos($user_agent, 'iPhone') !== FALSE)
            return 'iPhone';
        elseif (strpos($user_agent, 'iPad') !== FALSE)
            return 'iPad';
        elseif (strpos($user_agent, 'Debian') !== FALSE)
            return 'Debian';
        elseif (strpos($user_agent, 'Ubuntu') !== FALSE)
            return 'Ubuntu';
        elseif (strpos($user_agent, 'Slackware') !== FALSE)
            return 'Slackware';
        elseif (strpos($user_agent, 'Linux Mint') !== FALSE)
            return 'Linux Mint';
        elseif (strpos($user_agent, 'Gentoo') !== FALSE)
            return 'Gentoo';
        elseif (strpos($user_agent, 'Elementary OS') !== FALSE)
            return 'ELementary OS';
        elseif (strpos($user_agent, 'Fedora') !== FALSE)
            return 'Fedora';
        elseif (strpos($user_agent, 'Kubuntu') !== FALSE)
            return 'Kubuntu';
        elseif (strpos($user_agent, 'Linux') !== FALSE)
            return 'Linux';
        elseif (strpos($user_agent, 'FreeBSD') !== FALSE)
            return 'FreeBSD';
        elseif (strpos($user_agent, 'OpenBSD') !== FALSE)
            return 'OpenBSD';
        elseif (strpos($user_agent, 'NetBSD') !== FALSE)
            return 'NetBSD';
        elseif (strpos($user_agent, 'SunOS') !== FALSE)
            return 'Solaris';
        elseif (strpos($user_agent, 'BlackBerry') !== FALSE)
            return 'BlackBerry';
        elseif (strpos($user_agent, 'Android') !== FALSE)
            return 'Android';
        elseif (strpos($user_agent, 'Mobile') !== FALSE)
            return 'Firefox OS';
        elseif (strpos($user_agent, 'Mac OS X+') || strpos($user_agent, 'CFNetwork+') !== FALSE)
            return 'Mac OS X';
        elseif (strpos($user_agent, 'Macintosh') !== FALSE)
            return 'Mac OS Classic';
        elseif (strpos($user_agent, 'OS/2') !== FALSE)
            return 'OS/2';
        elseif (strpos($user_agent, 'BeOS') !== FALSE)
            return 'BeOS';
        elseif (strpos($user_agent, 'Nintendo') !== FALSE)
            return 'Nintendo';
        else
            return 'Unknown Platform';
    }

    private function getBrowser() {
        $user_agent = $_SERVER['HTTP_USER_AGENT'];
        if (strpos($user_agent, 'Maxthon') !== FALSE)
            return "Maxthon";
        elseif (strpos($user_agent, 'SeaMonkey') !== FALSE)
            return "SeaMonkey";
        elseif (strpos($user_agent, 'Vivaldi') !== FALSE)
            return "Vivaldi";
        elseif (strpos($user_agent, 'Arora') !== FALSE)
            return "Arora";
        elseif (strpos($user_agent, 'Avant Browser') !== FALSE)
            return "Avant Browser";
        elseif (strpos($user_agent, 'Beamrise') !== FALSE)
            return "Beamrise";
        elseif (strpos($user_agent, 'Epiphany') !== FALSE)
            return 'Epiphany';
        elseif (strpos($user_agent, 'Chromium') !== FALSE)
            return 'Chromium';
        elseif (strpos($user_agent, 'Iceweasel') !== FALSE)
            return 'Iceweasel';
        elseif (strpos($user_agent, 'Galeon') !== FALSE)
            return 'Galeon';
        elseif (strpos($user_agent, 'Edge') !== FALSE)
            return 'Microsoft Edge';
        elseif (strpos($user_agent, 'Trident') !== FALSE) //IE 11
            return 'Internet Explorer';
        elseif (strpos($user_agent, 'MSIE') !== FALSE)
            return 'Internet Explorer';
        elseif (strpos($user_agent, 'Opera Mini') !== FALSE)
            return "Opera Mini";
        elseif (strpos($user_agent, 'Opera') || strpos($user_agent, 'OPR') !== FALSE)
            return "Opera";
        elseif (strpos($user_agent, 'Firefox') !== FALSE)
            return 'Mozilla Firefox';
        elseif (strpos($user_agent, 'Chrome') !== FALSE)
            return 'Google Chrome';
        elseif (strpos($user_agent, 'Safari') !== FALSE)
            return "Safari";
        elseif (strpos($user_agent, 'iTunes') !== FALSE)
            return 'iTunes';
        elseif (strpos($user_agent, 'Konqueror') !== FALSE)
            return 'Konqueror';
        elseif (strpos($user_agent, 'Dillo') !== FALSE)
            return 'Dillo';
        elseif (strpos($user_agent, 'Netscape') !== FALSE)
            return 'Netscape';
        elseif (strpos($user_agent, 'Midori') !== FALSE)
            return 'Midori';
        elseif (strpos($user_agent, 'ELinks') !== FALSE)
            return 'ELinks';
        elseif (strpos($user_agent, 'Links') !== FALSE)
            return 'Links';
        elseif (strpos($user_agent, 'Lynx') !== FALSE)
            return 'Lynx';
        elseif (strpos($user_agent, 'w3m') !== FALSE)
            return 'w3m';
        else
            return 'No hemos podido detectar su navegador';
    }

}
