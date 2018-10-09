<?php

class PedidoModel {

    public function setUp() {
        
    }

    public function __construct() {
        
    }

    public function Adicionar($argRequest) {
        try {
            $objPedido = new Pedido();
            //se verifica que no exista el pedido
            $existe = $objPedido->buscarPedidoporNombreProducto($argRequest->idproducto, $argRequest->anno);
            if (!$existe) {
                $objPedido = new Pedido();
                $objPedido->idproducto = $argRequest->idproducto;
                $objPedido->cantidad = $this->getCantidad($argRequest);
                $objPedido->fechapedido = date("d/m/Y");
                $objPedido->anno = $argRequest->anno;
                $objPedido->identidades = $_SESSION['identidad'];
                $objPedido->ene = ($argRequest->ene != '') ? $argRequest->ene : 0;
                $objPedido->feb = ($argRequest->feb != '') ? $argRequest->feb : 0;
                $objPedido->mar = ($argRequest->mar != '') ? $argRequest->mar : 0;
                $objPedido->abr = ($argRequest->abr != '') ? $argRequest->abr : 0;
                $objPedido->may = ($argRequest->may != '') ? $argRequest->may : 0;
                $objPedido->jun = ($argRequest->jun != '') ? $argRequest->jun : 0;
                $objPedido->jul = ($argRequest->jul != '') ? $argRequest->jul : 0;
                $objPedido->ago = ($argRequest->ago != '') ? $argRequest->ago : 0;
                $objPedido->sep = ($argRequest->sep != '') ? $argRequest->sep : 0;
                $objPedido->oct = ($argRequest->oct != '') ? $argRequest->oct : 0;
                $objPedido->nov = ($argRequest->nov != '') ? $argRequest->nov : 0;
                $objPedido->dic = ($argRequest->dic != '') ? $argRequest->dic : 0;
                $objPedido->save();
                return 0; // 0 significa que adiciono bien
            } else
                return 1; // 1 significa que ya existe ese nombre de pedido 
        } catch (Exception $exc) {
            echo $exc;
            return 2; // 2 significa que dio error
        }
    }

    public function Modificar($argRequest) {
        try {
            $objPedido = new Pedido();
            //se verifica que no exista el pedido
            $existe = $objPedido->buscarPedidoporNombreProducto($argRequest->idproducto, $argRequest->idpedido);
            if (!$existe) {
                //se cargan los datos del pedido a modificar
                $objPedido = Doctrine::getTable('Pedido')->find($argRequest->idpedido);
                $objPedido->idproducto = $argRequest->idproducto;
                $objPedido->cantidad = $this->getCantidad($argRequest);
                $objPedido->anno = $argRequest->anno;
                $objPedido->estado = 0;
                $objPedido->motivo = '';
                $objPedido->ene = ($argRequest->ene != '') ? $argRequest->ene : 0;
                $objPedido->feb = ($argRequest->feb != '') ? $argRequest->feb : 0;
                $objPedido->mar = ($argRequest->mar != '') ? $argRequest->mar : 0;
                $objPedido->abr = ($argRequest->abr != '') ? $argRequest->abr : 0;
                $objPedido->may = ($argRequest->may != '') ? $argRequest->may : 0;
                $objPedido->jun = ($argRequest->jun != '') ? $argRequest->jun : 0;
                $objPedido->jul = ($argRequest->jul != '') ? $argRequest->jul : 0;
                $objPedido->ago = ($argRequest->ago != '') ? $argRequest->ago : 0;
                $objPedido->sep = ($argRequest->sep != '') ? $argRequest->sep : 0;
                $objPedido->oct = ($argRequest->oct != '') ? $argRequest->oct : 0;
                $objPedido->nov = ($argRequest->nov != '') ? $argRequest->nov : 0;
                $objPedido->dic = ($argRequest->dic != '') ? $argRequest->dic : 0;
                $objPedido->save();
                return 0;
            } else
                return 1; // 1 significa que ya existe ese nombre de pedido 
        } catch (Exception $exc) {
            return 2; // 2 significa que dio error
        }
    }

    public function Eliminar($idpedido) {
        try {
            $objPedido = Doctrine::getTable('Pedido')->find($idpedido);
            if ($objPedido->delete())
                return 0; //elimino bien
            else {
                return 1; //tiene datos asociados
            }
        } catch (Exception $exc) {
            throw $exc;
            return 3; //dio error
        }
    }

    private function getCantidad($argData) {
        return $argData->ene + $argData->feb + $argData->mar + $argData->abr + $argData->may + $argData->jun + $argData->jul + $argData->ago + $argData->sep + $argData->oct + $argData->nov + $argData->dic;
    }

    private function getCantidadObj($argData) {
        return $argData->ene + $argData->feb + $argData->mar + $argData->abr + $argData->may + $argData->jun + $argData->jul + $argData->ago + $argData->sep + $argData->oct + $argData->nov + $argData->dic;
    }

    public function ImportarPedidos($argData) {
        try {
            $Pedido = new Doctrine_Collection('Pedido');
            $k = 0;
            $listProd = Producto::dameproducto(array(1, 2, 3, 4));
            foreach ($argData as $v) {
                $prod = $this->getLocalProdByCodigo($listProd, $v->codigoproducto);
                if ($prod) {
                    $Pedido[$k]->idproducto = $prod['idproducto'];
                    $Pedido[$k]->cantidad = $this->getCantidadObj($v);
                    $Pedido[$k]->fechapedido = date("d/m/Y");
                    $Pedido[$k]->anno = $v->anno;
                    $Pedido[$k]->identidades = (isset($v->entidad)) ? $v->entidad : $_SESSION['identidad'];
                    $Pedido[$k]->ene = ($v->ene != '') ? $v->ene : 0;
                    $Pedido[$k]->feb = ($v->feb != '') ? $v->feb : 0;
                    $Pedido[$k]->mar = ($v->mar != '') ? $v->mar : 0;
                    $Pedido[$k]->abr = ($v->abr != '') ? $v->abr : 0;
                    $Pedido[$k]->may = ($v->may != '') ? $v->may : 0;
                    $Pedido[$k]->jun = ($v->jun != '') ? $v->jun : 0;
                    $Pedido[$k]->jul = ($v->jul != '') ? $v->jul : 0;
                    $Pedido[$k]->ago = ($v->ago != '') ? $v->ago : 0;
                    $Pedido[$k]->sep = ($v->sep != '') ? $v->sep : 0;
                    $Pedido[$k]->oct = ($v->oct != '') ? $v->oct : 0;
                    $Pedido[$k]->nov = ($v->nov != '') ? $v->nov : 0;
                    $Pedido[$k]->dic = ($v->dic != '') ? $v->dic : 0;
                    $k++;
                }
            }
            $Pedido->save();
            return true;
        } catch (Exception $exc) {
            throw $exc;
            return false;
        }
    }

    /*
      private function createFormatPedido($argProd, $argDataPed) {
      $arrProducto = array();
      $arrProducto ['idproducto'] = $argProd['idproducto'];
      $arrProducto ['identidad'] = $argDataPed->entidad; //quitar
      $arrProducto ['anno'] = $argDataPed->anno;
      $arrProducto ['ene'] = $argDataPed->ene;
      $arrProducto ['feb'] = $argDataPed->feb;
      $arrProducto ['mar'] = $argDataPed->mar;
      $arrProducto ['abr'] = $argDataPed->abr;
      $arrProducto ['may'] = $argDataPed->may;
      $arrProducto ['jun'] = $argDataPed->jun;
      $arrProducto ['jul'] = $argDataPed->jul;
      $arrProducto ['ago'] = $argDataPed->ago;
      $arrProducto ['sep'] = $argDataPed->sep;
      $arrProducto ['oct'] = $argDataPed->oct;
      $arrProducto ['nov'] = $argDataPed->nov;
      $arrProducto ['dic'] = $argDataPed->dic;
      return $arrProducto;
      }
     */

    private function getLocalProdByCodigo($arrListProd, $argCodigo) {
        foreach ($arrListProd as $v) {
            if ($v['codigo'] == $argCodigo)
                return $v;
        }
        return false;
    }

    public function cambiarEstado($argRequest) {
        try {
            $objPedido = Doctrine::getTable('Pedido')->find($argRequest->idpedido);
            $objPedido->estado = $argRequest->status;
            $objPedido->motivo = $argRequest->obs;
            $objPedido->save();
            return 0;
        } catch (Exception $exc) {
            return 2; // 2 significa que dio error
        }
    }

}
