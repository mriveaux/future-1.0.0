<?php

class DemandaModel {

    public function __construct() {
        
    }

    public function setUp() {
        
    }

    public function Adicionar($argRequest) {
        try {
            $arrPedidos = json_decode($argRequest->arrpedidos);
            $objDemanda = new Demanda();
            //se verifica que no exista la demanda
            $existe = $objDemanda->buscarDemandaporAnno($argRequest->anno);
            if (!$existe) {
                $objDemanda = new Demanda();
                $objDemanda->anno = $argRequest->anno;
                $objDemanda->fecha = date("d/m/Y");
                $objDemanda->estado = 0; //en proceso
                $objDemanda->identidades = $_SESSION['identidad'];
                $objDemanda->save();
                if ($this->adicionarProductosDemandados($objDemanda->identifier(), $arrPedidos)) {
                    $this->cambiarEstadoPedido($arrPedidos, 1);
                    return 0; // 0 significa que adiciono bien
                }
            } else
                return 1; // 1 significa que ya existe ese nombre de demanda 
        } catch (Exception $exc) {
            return 2; // 2 significa que dio error
        }
    }

    public function Modificar($argRequest) {
        try {
            $pedidosDelete = json_decode($argRequest->arrpedidosdelete);
            $pedidosAdd = json_decode($argRequest->arrpedidosadd);
            //se elimina la asociacion a proddemandado y se liberan los pedidos
            $this->deleteAsociacionProdDemandado($pedidosDelete);
            $arrObjPedidosDelete = array();
            foreach ($pedidosDelete as $v) {
                $del = new stdClass();
                $del->idpedido = $v;
                $arrObjPedidosDelete[] = $del;
            }
            $this->cambiarEstadoPedido($arrObjPedidosDelete, 0);
            //se guardan 
            $this->adicionarProductosDemandados(array('iddemanda' => $argRequest->iddemanda), $pedidosAdd);
            $this->cambiarEstadoPedido($pedidosAdd, 1);
            //se cargan los datos del demanda a modificar
            $objDemanda = Doctrine::getTable('Demanda')->find($argRequest->iddemanda);
            $objDemanda->fecha = date("d/m/Y");
            $objDemanda->save();
            return 0;
        } catch (Exception $exc) {
            return 2;
        }
    }

    public function Eliminar($agIdDemanda, $agArrPedidos) {
        try {
            if ($this->cambiarEstadoPedido($agArrPedidos, 0)) {
                $objDemanda = Doctrine::getTable('Demanda')->find($agIdDemanda);
                $objDemanda->delete();
                return 1; //elimino bien
            }
        } catch (Exception $exc) {
            return 3; //dio error
        }
    }

    public function Aprobar($agIdDemanda) {
        try {
            $obj_Demanda = new Demanda();
            //se verifica que no haya demanda en uso
            $demandas = $obj_Demanda->cargarDemanda();
            if (count($demandas['campos']) > 1) {
                $objDemanda = Doctrine::getTable('Demanda')->find($agIdDemanda);
                $objDemanda->estado = 1;
                $objDemanda->save();
            } else {
                $objDemanda = Doctrine::getTable('Demanda')->find($agIdDemanda);
                $objDemanda->estado = 2;
                $objDemanda->save();
            }

            return 1; //aprobo bien
        } catch (Exception $exc) {
            throw $exc; //dio error
        }
    }

    public function adicionarProductosDemandados($agIdDemanda, $arrProductos) {
        try {
            $objProdDemandado = new Doctrine_Collection('Productodemandado');
            foreach ($arrProductos as $k => $v) {
                $objProdDemandado[$k]->cantidad = $v->cantidad;
                $objProdDemandado[$k]->idpedido = $v->idpedido;
                $objProdDemandado[$k]->iddemanda = $agIdDemanda['iddemanda'];
                $objProdDemandado[$k]->idcliente = $v->idcliente;
            }
            $objProdDemandado->save();
            return true;
        } catch (Exception $exc) {
            return false;
        }
    }

    public function deleteAsociacionProdDemandado($arrIdPedidos) {
        try {
            $objProdDemandado = new Productodemandado();
            $arrIdProdDemandados = $objProdDemandado->getIdProductosDemandadosByIdPedido($arrIdPedidos);
            foreach ($arrIdProdDemandados as $v) {
                $objProductodemandado = Doctrine::getTable('Productodemandado')->find($v);
                $objProductodemandado->delete();
            }
            return true;
        } catch (Exception $exc) {
            return false;
        }
    }

    public function cambiarEstadoPedido($arrPedidos, $argEstado) {
        try {
            foreach ($arrPedidos as $v) {
                $objPedido = Doctrine::getTable('Pedido')->find($v->idpedido);
                $objPedido->estado = $argEstado;
                $objPedido->save();
            }
            return true;
        } catch (Exception $exc) {
            return false;
        }
    }

    public function getAllPedidosToModify($argIdDemanda, $argAnno, $cadena = null) {
        $prodDemandado = new Productodemandado();
        $listProdDemandados = $prodDemandado->getProductosDemandados($argIdDemanda);
        $arrIdPedido = array();
        foreach ($listProdDemandados as $v) {
            $arrIdPedido[] = $v['idpedido'];
        }
        $objDemanda = new Demanda();
        $listPedidos = $objDemanda->getAllPedidosMod($argAnno, $arrIdPedido, $cadena);
        foreach ($listPedidos as &$v) {
            if (in_array($v['idpedido'], $arrIdPedido)) {
                $v['selected'] = true;
            }
        }
        return array('campos' => (count($listPedidos)) ? $listPedidos : array());
    }

    public function getAllPedidosDemanda($argIdDemanda, $cadena = null) {
        try {
            $prodDemandado = new Productodemandado();
            $listProdDemandados = $prodDemandado->getDetailProductosDemandados($argIdDemanda, $cadena);
            foreach ($listProdDemandados as &$v) {
                $entidad = $v['entidad'];
                $orden = $v['orden'];
                $v = $v['Pedido'];
                $v['entidad'] = $entidad;
                $v['orden'] = $orden;
            }
            return array('campos' => (count($listProdDemandados)) ? $listProdDemandados : array());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /*
     * carga los datos para la vista previa del reporte
     */

    public function loadDataPreview($argPost) {
        $argIdDemanda = $argPost->iddemanda;
        $argType = $argPost->type;
        $objDemanda = Doctrine::getTable('Demanda')->find($argIdDemanda);
//        $listProdDemandados = $prodDemandado->getDetailProductosDemandados($argIdDemanda);
        if ($argType == 0) {
            return $this->getPreviewConsolidate($objDemanda);
        } else if ($argType == 1) {
            return $this->getPreviewDesagregate($objDemanda);
        } else {
            return $this->getPreviewRecursos($objDemanda);
        }
    }

    private function getPreviewRecursos($objDemanda) {
        $dataEnt = new Entidades();
        $arrEntidades = $dataEnt->getAllEntity('orden');
        $prodD = new Productodemandado();
        $arrProd = $prodD->getMetrallaRecursosData($objDemanda->iddemanda);
        foreach ($arrProd as $k => &$v) {
            $cantidad = 0;
            $this->createTerritoryStructure($v, $arrEntidades);
            foreach ($v['Pedido'] as $p) {
                $terr = $this->foundTerritoryStructure($p['identidades'], $arrEntidades);
                $v[$terr] += $p['cantidad'];
                $cantidad += $p['cantidad'];
            }
            $v['consecutivo'] = $k + 1;
            $v['cantidad'] = $cantidad;
            $v['valor'] = number_format($cantidad * $v['precio'], 2, ',', '.');
            $v['precio'] = number_format($v['precio'], 2, ',', '.');
            $v['unidadmedida'] = $v['Unidadmedida']['abreviatura'];
            unset($v['Pedido']);
            unset($v['Unidadmedida']);
        }
        $datoGeneral = new stdClass();
        $datoGeneral->reporte = 'OPER003';
        $datoGeneral->titulo = 'Demanda por recursos';
        $datoGeneral->entidad = $_SESSION['desc_entidad'];
        $datoGeneral->anno = $objDemanda->anno;
        return array('success' => true, 'elements' => array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $arrProd));
    }

    private function createTerritoryStructure(&$row, $arrEntities) {
        foreach ($arrEntities as $v) {
            $row[$v['nombre']] = 0;
        }
    }

    private function foundTerritoryStructure($idEntidad, $arrEntities) {
        foreach ($arrEntities as $v) {
            if ($v['identidades'] == $idEntidad)
                return $v['nombre'];
        }
    }

    private function getPreviewConsolidate($objDemanda) {
        $prodD = new Productodemandado();
        $anno = $objDemanda->anno;
        $dataEnt = new Entidades();
        $arrEntidades = $dataEnt->getAllEntity();
        foreach ($arrEntidades as $v) {
            $listEntidades[] = $v['identidad'];
        }
        $listEntidades = implode(',', $listEntidades);
        $listProdDemandados = $prodD->getDetailProductosDemandadosTest($objDemanda->iddemanda, $anno, $listEntidades);
        $elements = array();
        $lenght = count($listProdDemandados);
        $prodDemandado = new Productodemandado();
        if ($lenght) {
            foreach ($listProdDemandados as $k => $list) {
                $metrallaData = $prodDemandado->getMetrallaData($list['codigo']);
                $prod = new stdClass();
                $prod->consecutivo = $k + 1;
                $prod->codigo = $metrallaData[0]['codigo'];
                $prod->precio = number_format($metrallaData[0]['precio'], 2, ',', '.');
                $prod->producto = $metrallaData[0]['nombre'];
                $prod->cuenta = $metrallaData[0]['cuenta'];
                $prod->cantidad = $this->eliminarCeroFinal(number_format($list['cantidad'], 2, ',', '.'));
                $prod->unidadmedida = $metrallaData[0]['Unidadmedida']['abreviatura'];
//                $prod->fecha = implode('/', array_reverse(explode('-', $list['Pedido']['fechapedido'])));
                $prod->anno = $anno;
                $prod->ene = $this->eliminarCeroFinal(number_format($list['ene'], 2, ',', '.'));
                $prod->feb = $this->eliminarCeroFinal(number_format($list['feb'], 2, ',', '.'));
                $prod->mar = $this->eliminarCeroFinal(number_format($list['mar'], 2, ',', '.'));
                $prod->abr = $this->eliminarCeroFinal(number_format($list['abr'], 2, ',', '.'));
                $prod->may = $this->eliminarCeroFinal(number_format($list['may'], 2, ',', '.'));
                $prod->jun = $this->eliminarCeroFinal(number_format($list['jun'], 2, ',', '.'));
                $prod->jul = $this->eliminarCeroFinal(number_format($list['jul'], 2, ',', '.'));
                $prod->ago = $this->eliminarCeroFinal(number_format($list['ago'], 2, ',', '.'));
                $prod->sep = $this->eliminarCeroFinal(number_format($list['sep'], 2, ',', '.'));
                $prod->oct = $this->eliminarCeroFinal(number_format($list['oct'], 2, ',', '.'));
                $prod->nov = $this->eliminarCeroFinal(number_format($list['nov'], 2, ',', '.'));
                $prod->dic = $this->eliminarCeroFinal(number_format($list['dic'], 2, ',', '.'));
                $prod->valor = number_format($list['cantidad'] * $metrallaData[0]['precio'], 2, ',', '.');

                $elements[] = $prod;
            }
        }
        $datoGeneral = new stdClass();
        $datoGeneral->reporte = 'OPER001';
        $datoGeneral->titulo = 'Demanda consolidada';
        $datoGeneral->entidad = $_SESSION['desc_entidad'];
        $datoGeneral->anno = $anno;
        return array('success' => true, 'elements' => array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $elements));
    }

    private function getPreviewDesagregate($objDemanda) {
        $report = array();
        $prodD = new Productodemandado();
        $anno = $objDemanda->anno;
        $dataEnt = new Entidades();
        $arrEntidades = $dataEnt->getAllEntity();
        foreach ($arrEntidades as $e) {
            $elements = array();
            $listProdDemandados = $prodD->getDetailProductosDemandadosDesagregate($objDemanda->iddemanda, $anno, $e['identidad']);
            $lenght = count($listProdDemandados);
            $prodDemandado = new Productodemandado();
            if ($lenght) {
                foreach ($listProdDemandados as $k => $list) {
                    $metrallaData = $prodDemandado->getMetrallaData($list['codigo']);
                    $prod = new stdClass();
                    $prod->consecutivo = $k + 1;
                    $prod->codigo = $metrallaData[0]['codigo'];
                    $prod->precio = number_format($metrallaData[0]['precio'], 2, ',', '.');
                    $prod->producto = $metrallaData[0]['nombre'];
                    $prod->cuenta = $metrallaData[0]['cuenta'];
                    $prod->cantidad = $this->eliminarCeroFinal(number_format($list['cantidad'], 2, ',', '.'));
                    $prod->unidadmedida = $metrallaData[0]['Unidadmedida']['abreviatura'];
//                    $prod->fecha = implode('/', array_reverse(explode('-', $list['Pedido']['fechapedido'])));
                    $prod->anno = $anno;
                    $prod->ene = $this->eliminarCeroFinal(number_format($list['ene'], 2, ',', '.'));
                    $prod->feb = $this->eliminarCeroFinal(number_format($list['feb'], 2, ',', '.'));
                    $prod->mar = $this->eliminarCeroFinal(number_format($list['mar'], 2, ',', '.'));
                    $prod->abr = $this->eliminarCeroFinal(number_format($list['abr'], 2, ',', '.'));
                    $prod->may = $this->eliminarCeroFinal(number_format($list['may'], 2, ',', '.'));
                    $prod->jun = $this->eliminarCeroFinal(number_format($list['jun'], 2, ',', '.'));
                    $prod->jul = $this->eliminarCeroFinal(number_format($list['jul'], 2, ',', '.'));
                    $prod->ago = $this->eliminarCeroFinal(number_format($list['ago'], 2, ',', '.'));
                    $prod->sep = $this->eliminarCeroFinal(number_format($list['sep'], 2, ',', '.'));
                    $prod->oct = $this->eliminarCeroFinal(number_format($list['oct'], 2, ',', '.'));
                    $prod->nov = $this->eliminarCeroFinal(number_format($list['nov'], 2, ',', '.'));
                    $prod->dic = $this->eliminarCeroFinal(number_format($list['dic'], 2, ',', '.'));
                    $prod->valor = number_format($list['cantidad'] * $metrallaData[0]['precio'], 2, ',', '.');
                    $elements[] = $prod;
                }
            }
            $datoGeneral = new stdClass();
            $datoGeneral->reporte = 'OPER001';
            $datoGeneral->titulo = 'Demanda por territorios';
            $datoGeneral->entidad = $e['nombre'];
            $datoGeneral->anno = $anno;
            $datos = new stdClass();
            $datos->datoGeneral = $datoGeneral;
            $datos->datoCuerpo = $elements;
            $report[] = $datos;
        }

        return array('success' => true, 'elements' => $report);
    }

    public function eliminarCeroFinal($v) {
        $ps = explode(',', "$v");
        $mi = $ps[0];
        $md = $ps[1];
        $n_md = '';
        $revMd = strrev($md);
        if (strlen($revMd) > 0)
            while (strlen($revMd) > 0 && (stripos($revMd, '0') == '0')) {
                $revMd = substr($revMd, 1);
            }
        return (strlen($revMd) > 0) ? $mi . "." . $n_md : $mi;
    }

    private function getPreviewConsolidateRESPALDO($objDemanda, $listProdDemandados) {
        $elements = array();
        $anno = $objDemanda->anno;
        if (count($listProdDemandados))
            for ($v = 0; $v < count($listProdDemandados); $v++) {
//                print_r($listProdDemandados[$v]);die;
                $lenght = count($listProdDemandados);
                if ($listProdDemandados[$v] != null) {
                    $prod = new stdClass();
                    $prod->codigo = $listProdDemandados[$v]['Pedido']['Producto']['codigo'];
                    $prod->precio = $listProdDemandados[$v]['Pedido']['Producto']['precio'];
                    $prod->producto = $listProdDemandados[$v]['Pedido']['Producto']['nombre'];
                    $prod->cantidad = $listProdDemandados[$v]['Pedido']['cantidad'];
                    $prod->unidadmedida = $listProdDemandados[$v]['Pedido']['Producto']['Unidadmedida']['abreviatura'];
//                    $prod->fecha = implode('/', array_reverse(explode('-', $listProdDemandados[$v]['Pedido']['fechapedido'])));
                    $prod->anno = $anno;
                    $prod->ene = $listProdDemandados[$v]['Pedido']['ene'];
                    $prod->feb = $listProdDemandados[$v]['Pedido']['feb'];
                    $prod->mar = $listProdDemandados[$v]['Pedido']['mar'];
                    $prod->abr = $listProdDemandados[$v]['Pedido']['abr'];
                    $prod->may = $listProdDemandados[$v]['Pedido']['may'];
                    $prod->jun = $listProdDemandados[$v]['Pedido']['jun'];
                    $prod->jul = $listProdDemandados[$v]['Pedido']['jul'];
                    $prod->ago = $listProdDemandados[$v]['Pedido']['ago'];
                    $prod->sep = $listProdDemandados[$v]['Pedido']['sep'];
                    $prod->oct = $listProdDemandados[$v]['Pedido']['oct'];
                    $prod->nov = $listProdDemandados[$v]['Pedido']['nov'];
                    $prod->dic = $listProdDemandados[$v]['Pedido']['dic'];
                    for ($i = $v + 1; $i < $lenght; $i++) {
                        if ($listProdDemandados[$i] != null) {
                            $codigo = $listProdDemandados[$i]['Pedido']['Producto']['codigo'];
                            $cantidad = $listProdDemandados[$i]['cantidad'];
                            if ($prod->codigo == $codigo) {
                                $prod->cantidad = $prod->cantidad + $cantidad;
                                $prod->ene = $prod->ene += $listProdDemandados[$i]['Pedido']['ene'];
                                $prod->feb = $prod->feb += $listProdDemandados[$i]['Pedido']['feb'];
                                $prod->mar = $prod->mar += $listProdDemandados[$i]['Pedido']['mar'];
                                $prod->abr = $prod->abr += $listProdDemandados[$i]['Pedido']['abr'];
                                $prod->may = $prod->may += $listProdDemandados[$i]['Pedido']['may'];
                                $prod->jun = $prod->jun += $listProdDemandados[$i]['Pedido']['jun'];
                                $prod->jul = $prod->jul += $listProdDemandados[$i]['Pedido']['jul'];
                                $prod->ago = $prod->ago += $listProdDemandados[$i]['Pedido']['ago'];
                                $prod->sep = $prod->sep += $listProdDemandados[$i]['Pedido']['sep'];
                                $prod->oct = $prod->oct += $listProdDemandados[$i]['Pedido']['oct'];
                                $prod->nov = $prod->nov += $listProdDemandados[$i]['Pedido']['nov'];
                                $prod->dic = $prod->dic += $listProdDemandados[$i]['Pedido']['dic'];
                                unset($listProdDemandados[$i]);
                            }
                        }
                    }
                    $prod->valor = $prod->cantidad * $prod->precio;
                    $elements[] = $prod;
                }
            }
        $datoGeneral = new stdClass();
        $datoGeneral->reporte = 'OPER001';
        $datoGeneral->titulo = 'Datos de la demanda';
        $datoGeneral->entidad = $_SESSION['desc_entidad'];
        $datoGeneral->anno = $anno;
        return array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $elements);
    }

    function verificarAddDemanda() {
        try {
            $obj_Demanda = new Demanda();
            $annoDemanda = $obj_Demanda->getLastDemanda();
            $nextDemanda = (isset($annoDemanda[0]['anno'])) ? $annoDemanda[0]['anno'] + 1 : date('Y') + 1;
            if ($nextDemanda > 0) {
                $pedidosDemanda = $obj_Demanda->getAllPedidos($nextDemanda);
                $pedidosDemanda['anno'] = $nextDemanda;
                return $pedidosDemanda;
            } else {
                return array('anno' => $nextDemanda, 'campos' => array());
            }
        } catch (Exception $exc) {
            echo $exc;
        }
    }

    function verificarDelDemanda() {
        $obj_Demanda = new Demanda();
        $annoDemanda = $obj_Demanda->getLastDemanda();
        return $annoDemanda[0]['anno'];
    }

    function verificarAprobDemanda($argRequest) {
        $obj_Demanda = new Demanda();
        return $obj_Demanda->buscarDatosDemandaporAnno($argRequest->anno);
    }

    public function cerrarDemanda($argIdDemanda) {
        try {
            //se cierra la demanda actual
            $objDemanda = Doctrine::getTable('Demanda')->find($argIdDemanda);
            $objDemanda->estado = 3;
            $objDemanda->save();
            //se pone en uso la siguiente demanda
            $annoCerrado = $objDemanda->anno;
            $obj_Demanda = new Demanda();
            $usarDemanda = $obj_Demanda->buscarDatosDemandaporAnno($annoCerrado + 1);
            if (count($usarDemanda)) {
                $objDemanda = Doctrine::getTable('Demanda')->find($usarDemanda[0]->iddemanda);
                $objDemanda->estado = 2;
                $objDemanda->save();
            }
            return 1;
        } catch (Exception $exc) {
            return 3;
        }
    }

}
