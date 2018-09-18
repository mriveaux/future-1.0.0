<?php

class RegistrovehiculoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addVehiculo($post) {
        try {
            $objVehiculo = new Registrovehiculo();
            $objVehiculo->tipofisico = $post->idfisico;
            $objVehiculo->anno = $post->anno;
            $objVehiculo->serie = $post->serie;
            $objVehiculo->colorsecundario = $post->colorsec;
            $objVehiculo->nomatricula = $post->matricula;
            $objVehiculo->nochassis = $post->chasis;
            $objVehiculo->nomotor = $post->motor;
            $objVehiculo->nocirculacion = $post->motor;
            $objVehiculo->novin = $post->vin;
            $objVehiculo->observaciones = $post->observacion;
            $objVehiculo->fecha = $post->fecha;
            $objVehiculo->idgrupoexplotacion = $post->grupoexp;
            $objVehiculo->idmarcamodelo = $post->marca;
            $objVehiculo->idtipovehiculo = $post->idplantilla;
            $objVehiculo->idcolor = $post->colorprim;
            $objVehiculo->idorgano = $post->organo;
            $objVehiculo->idestructura = $post->estructura;
            $objVehiculo->identidad = $this->dataSession->identidad;
            $objVehiculo->foto = $post->base64img;
            $objVehiculo->save();
//            print_r($objVehiculo);die;
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modVehiculo($post) {
        try {
            $objVehiculo = Doctrine_Core::getTable('Registrovehiculo')->find($post->idregistrovehiculo);
            $objVehiculo->tipofisico = $post->idfisico;
            $objVehiculo->anno = $post->anno;
            $objVehiculo->serie = $post->serie;
            $objVehiculo->colorsecundario = $post->colorsec;
            $objVehiculo->nomatricula = $post->matricula;
            $objVehiculo->nochassis = $post->chasis;
            $objVehiculo->nomotor = $post->motor;
            $objVehiculo->nocirculacion = $post->motor;
            $objVehiculo->novin = $post->vin;
            $objVehiculo->observaciones = $post->observacion;
            $objVehiculo->fecha = $post->fecha;
            $objVehiculo->idgrupoexplotacion = $post->grupoexp;
            $objVehiculo->idmarcamodelo = $post->marca;
            $objVehiculo->idtipovehiculo = $post->idplantilla;
            $objVehiculo->idcolor = $post->colorprim;
            $objVehiculo->idorgano = $post->organo;
            $objVehiculo->idestructura = $post->estructura;
            $objVehiculo->identidad = $this->dataSession->identidad;
            $objVehiculo->foto = $post->base64img;
            $objVehiculo->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delRegistrovehiculo($id) {
        try {
            $registrovehiculo = Doctrine_Core::getTable('Registrovehiculo')->find($id);
            $registrovehiculo->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function addBajaVehiculo($post) {
        try {
            $objregistro = Doctrine::getTable('Registrovehiculo')->find($post->idregistrovehiculo);
            $objregistro->baja = 1;
            $objregistro->save();
            $objbaja = new Bajavehiculo();
            $objbaja->idregistrovehiculo = $post->idregistrovehiculo;
            $objbaja->fechaorden = $post->fechaorden;
            $objbaja->numeroorden = $post->numeroorden;
            $objbaja->motivo = $post->motivo;
            $objbaja->numeroentrega = $post->numeroentrega;
            $objbaja->fechaentrega = $post->fechaentrega;
            $objbaja->destino = $post->destino;
            $objbaja->save();
            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function modBajaVehiculo($post) {
        try {
            $objbaja = Doctrine::getTable('Bajavehiculo')->find($post->idbajavehiculo);
            $objbaja->fechaorden = $post->fechaorden;
            $objbaja->numeroorden = $post->numeroorden;
            $objbaja->motivo = $post->motivo;
            $objbaja->numeroentrega = $post->numeroentrega;
            $objbaja->fechaentrega = $post->fechaentrega;
            $objbaja->destino = $post->destino;
            $objbaja->save();
            return true;
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function loadDataPreview($arg_params) {
        $datoGeneral = new stdClass();
        $obj_registro = new Registrovehiculo();
        $organo = $this->getDataOrgano($arg_params->organo);
        if ($arg_params->tipo == 1) { //mostrar el modelo cuando es solo uno
            $datoGeneral->reporte = 'TALL002';
            $dato_cuerpo = array();
        } else {
            $datoGeneral->reporte = ($arg_params->tipo == 2) ? 'TALL003' : ($arg_params->tipo == 3) ? 'TALL004' : 'TALL005';
            $dato_cuerpo = $obj_registro->loadDataPrintExpedientes($arg_params->tipo, $organo->idorgano);
        }

        $datoGeneral->titulo = 'Emplantillamiento_de_los_medios';
        $datoGeneral->entidad = $_SESSION['desc_entidad'];
        $datoGeneral->organo = $organo->nombre;
        $datoGeneral->aprobado = $arg_params->aprobado;
        $datoGeneral->firmado = $arg_params->firmado;
        $datoGeneral->dia = date('d');
        $datoGeneral->mes = date('m');
        $datoGeneral->anno = date('Y');
        return array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $dato_cuerpo);
    }

    public function getDataOrgano($idorgano = 0) {
        $Organo = new Organo();
        $organos = $Organo->getOrganoService('estatal');
        $data_return = new stdClass();
        if ($idorgano) {
            foreach ($organos as $org) {
                if ($org['idorgano'] == $idorgano) {
                    $data_return->idorgano = array($org['idorgano']);
                    $data_return->nombre = $org['nombre'];
                    break;
                }
            }
        } else {
            $array_id = array();
            $array_nomb = array();
            foreach ($organos as $org) {
                $array_id[] = $org['idorgano'];
                $array_nomb[] = $org['nombre'];
            }
            $data_return->idorgano = $array_id;
            $data_return->nombre = implode(', ', $array_nomb);
        }
        return $data_return;
    }

}
