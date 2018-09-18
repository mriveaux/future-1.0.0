<?php

class SociocomercialModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function getSociocomerciales($data) {
        try {
            $utf8 = array("à" => "À", "è" => "È", "ì" => "Ì", "ò" => "Ò", "ù" => "Ù", "á" => "Á", "é" => "É", "í" => "Í", "ó" => "Ó", "ú" => "Ú", "â" => "Â", "ê" => "Ê", "î" => "Î", "ô" => "Ô", "û" => "Û", "ç" => "Ç");
            $conditions = ["identidad = " . $this->dataSession->identidad];
            if (!empty($data->filter)) {
                $filter = $data->filter;
                $conditions[] = "(lower(nombre) ILIKE lower('%$filter%') OR lower(descripcion) ILIKE lower('%$filter%'))";
            }
            $conditions = implode(" AND ", $conditions);
            $result = Sociocomercial::GetByConditionSQL($conditions);
            if (count($result)) {
                foreach ($result as &$clienteprov) {
                    $clienteprov['contactos'] = ($clienteprov['isempresa'] == 1) ?
                            Contacto::GetByCondition('idclientesprovedores = ?', array($clienteprov['idsociocomercial']), TRUE) : array();
                    if (!empty($result['filter'])) {
                        $clienteprov['nombre'] = str_replace(strtr($filter, $utf8), "<span style=\"background-color: rgb(255, 255, 0);\">" . strtr($filter, $utf8) . "</span>", strtr($clienteprov['nombre'], $utf8));
                        $clienteprov['descripcion'] = str_replace(strtr($filter, $utf8), "<span style=\"background-color: rgb(255, 255, 0);\">" . strtr($filter, $utf8) . "</span>", strtr($clienteprov['descripcion'], $utf8));
                    }
                }
            }
            $paging = ['success' => TRUE, 'total' => count($result), 'data' => $result];
            return $paging;
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

    public function saveSocioComercial($data) {
        try {
            $response = array('errors' => array(), 'success' => array());
            if (!empty($data->nombre) && !empty($data->codigoidentificacion) && (!empty($data->cliente) || !empty($data->proveedor))) {
                $flagmodify = FALSE;
                $estructura = $this->dataSession->identidad;
                if (!empty($data->idsociocomercial) && is_numeric($data->idsociocomercial)) {
                    /* Si se esta modificando */
                    $objeto = Sociocomercial::GetById($data->idsociocomercial);
                    $flagmodify = TRUE;
                } else {
                    $objeto = new Sociocomercial();
                }
//                $dataCont = json_decode(stripslashes($data->contabilidad));
                $dataContacto = json_decode(stripslashes($data->contactos));
                if (!$flagmodify) {
                    $alreadyExist = $this->alreadyExist($data, $estructura);
                    if ($alreadyExist) {
                        /* Ya existe el cliente o proveedor */
                        $response['success'] = FALSE;
                        $response['errors'][] = array('code' => 'CP01', 'ci' => $data->codigoidentificacion);
                        return $response;
                    }
                } else {
                    /* Eliminar los contactos que a eliminar */
                    if (!empty($dataCont->deletedAccounts)) {
                        $this->delBankAccount($dataCont->deletedAccounts);
                    }
                    /* Eliminar los contactos que a eliminar */
                    if (!empty($dataContacto->deletedAccounts)) {
                        $this->delContact($dataContacto->deletedContacts);
                    }
                }
                $tipo = 0;
                if (!empty($data->cliente)) {
                    $tipo += 1;
                }
                if (!empty($data->proveedor)) {
                    $tipo += 2;
                }
                $objeto->nombre = $data->nombre;
                $objeto->tipo = $tipo;
                $objeto->ci = $data->codigoidentificacion;
                $objeto->codigo = $data->codigoidentificacion;
                $objeto->descripcion = !empty($data->descripcion) ? $data->descripcion : NULL;
                $objeto->telefono = !empty($data->telefono) ? $data->telefono : NULL;
                $objeto->idpais = !empty($data->idpais) ? $data->idpais : NULL;
                $objeto->provincia = !empty($data->idprovincia) ? $data->idprovincia : NULL;
                $objeto->direccion = !empty($data->direccion) ? $data->direccion : NULL;
                $objeto->codpostal = !empty($data->codigopostal) ? $data->codigopostal : NULL;
                $objeto->sitioweb = !empty($data->sitioweb) ? $data->sitioweb : NULL;
                $objeto->movil = !empty($data->movil) ? $data->movil : NULL;
                $objeto->fax = !empty($data->fax) ? $data->fax : NULL;
//                $objeto->idcuentacobrar = !empty($dataCont->idcuentacobrar) ? $dataCont->idcuentacobrar : NULL;
//                $objeto->idcuentapagar = !empty($dataCont->idcuentapagar) ? $dataCont->idcuentapagar : NULL;
                $objeto->creditoconcedido = !empty($dataCont->credito) ? $dataCont->credito : NULL;
                $objeto->idempresa = !empty($data->idempresa) && is_numeric($data->idempresa) ? $data->idempresa : NULL;
                $objeto->isempresa = !empty($data->empresa) ? 1 : NULL;
                $objeto->identidad = $estructura;
                $objeto->foto = !empty($data->foto) ? $data->foto : NULL;
                $idsociocomercial = $objeto->persist();
                if (!is_numeric($idsociocomercial)) {
                    /* Ocurrio un error al insertar el cliente o proveedor */
                    return array('success' => false, code => 3, 'message' => 'futureLang.msgAddFAIL');
                } else {
                    /* agregando las cuentas bancarias */
                    if (!empty($dataCont->modifiedAccounts)) {
                        $resBA = $this->addBankAccount($dataCont->modifiedAccounts, $idsociocomercial);
                        $response['errors'] = array_merge($response['errors'], $resBA['errors']);
                    }
                    if (!empty($data->empresa) && !empty($dataContacto->modifiedContacts)) {
                        $res = $this->addContacts($dataContacto->modifiedContacts, $idsociocomercial);
                        $response['errors'] = array_merge($response['errors'], $res['errors']);
                    }
                    if ($tipo == 1) {
                        $mensaje = $flagmodify ? 'futureLang.msgModCOK' : 'futureLang.msgAddCOK';
                    } elseif ($tipo == 2) {
                        $mensaje = $flagmodify ? 'futureLang.msgModPOK' : 'futureLang.msgAddPOK';
                    } else {
                        $mensaje = $flagmodify ? 'futureLang.msgModCPOK' : 'futureLang.msgAddCPOK';
                    }
                    return array('success' => true, code => 1, 'message' => $mensaje);
                }
            } else {
                /* Faltan datos para adicionar el campo contable */
                return array('success' => false, 'code' => 3, 'message' => 'futureLang.msgAddNoData');
            }

            return $response;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modSocioComercial($data) {
        try {
            $sociocomercial = Doctrine_Core::getTable('Sociocomercial')->find($data->idsociocomercial);
            $sociocomercial->sociocomercial = $data->sociocomercial;
            $sociocomercial->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delSocioComercial($id) {
        try {
            $sociocomercial = Doctrine_Core::getTable('Sociocomercial')->find($id);
            $sociocomercial->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function getDataRpt() {
        $datoGeneral = new stdClass();
        $datoGeneral->reporte = 'CRM001';
        $datoGeneral->titulo = 'Listado_socios_comerciales';
        $datoGeneral->entidad = $this->dataSession->desc_entidad;
        $objSocioComercial = new Sociocomercial();
        $data = $objSocioComercial->getListSociosComerciales();
        return array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $data);
    }

    private function alreadyExist($data, $entidad) {
        try {
            if (!empty($data->idempresa) && is_numeric($data->idempresa)) {
                $condition = 'identidad = ? AND (codigo = ? OR nombre = ?)';
                $params = array($entidad, $data->codigo, $data->nombre);
            } else {
                $condition = 'identidad = ? AND (codigo = ? OR ci = ?)';
                $params = array($entidad, $data->codigoidentificacion, $data->codigoidentificacion);
            }
            $check = Sociocomercial::GetByCondition($condition, $params, TRUE);
            return (count($check) > 0) ? TRUE : FALSE;
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

}
