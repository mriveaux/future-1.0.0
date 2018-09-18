<?php

class TrabajadorModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function adicionarTrabajador($post) {
        try {
            $objTrab = new Trabajador();
            $objTrab->apellidos = $post->apellidos;
            $objTrab->cidentidad = $post->cidentidad;
            $objTrab->direccion = $post->direccion;
            $objTrab->fechaentrada = $post->fechaentrada;
            $objTrab->expediente = $post->expediente;
            $objTrab->militancia = $post->militancia;
            $objTrab->nivelescolar = $post->nivel;
            $objTrab->nombre = $post->nombre;
            $objTrab->ocupacion = $post->ocupacion;
            $objTrab->telefono = $post->telefono;
            $objTrab->identidad = $this->dataSession->identidad;
            if (isset($post->base64img)) {
                $objTrab->foto = $post->base64img;
            }
            $objTrab->save();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function modificarTrabajador($post) {
        try {
            $objTrab = Doctrine_Core::getTable('Trabajador')->find($post->idtrabajador);
            $objTrab->apellidos = $post->apellidos;
            $objTrab->cidentidad = $post->cidentidad;
            $objTrab->direccion = $post->direccion;
            $objTrab->fechaentrada = $post->fechaentrada;
            $objTrab->expediente = $post->expediente;
            $objTrab->militancia = $post->militancia;
            $objTrab->nivelescolar = $post->nivel;
            $objTrab->nombre = $post->nombre;
            $objTrab->ocupacion = $post->ocupacion;
            $objTrab->telefono = $post->telefono;
            if (isset($post->base64img)) {
                $objTrab->foto = $post->base64img;
            }
            $objTrab->save();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function eliminarTrabajador($idtrabajador) {
        try {
            $objTrab = Doctrine_Core::getTable('Trabajador')->find($idtrabajador);
            $objTrab->delete();
            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function Actualizar(Trabajador $objTrabajador) {
        try {
            $objTrabajador->save();
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function BajaTrabajador($post) {
        try {
            $idtrabajador = $post->idtrabajador;
            $fechabaja = $post->fechabaja;
            $motivo = $post->motivo;
            $objBtrab = new Bajatrabajador();
            $objBtrab->idtrabajador = $idtrabajador;
            $objBtrab->fechabaja = $fechabaja;
            $objBtrab->motivo = $motivo;
            $objBtrab->save();

            $objTrab = Doctrine_Core::getTable('Trabajador')->find($idtrabajador);
            $objTrab->baja = 1;
            $objTrab->save();

            return true;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadDataPreview() {
        try {
            $obj_trabajador = new Trabajador();
            $trabajadores = $obj_trabajador->loadDataTrabajadores();
            foreach ($trabajadores as &$v) {
                $v['fechaentrada'] = implode('/', array_reverse(explode('-', $v['fechaentrada'])));
            }
            $datoGeneral = new stdClass();
            $datoGeneral->reporte = 'RRHH001';
            $datoGeneral->titulo = 'Plantilla_trabajadores';
            $datoGeneral->entidad = $_SESSION['desc_entidad'];
            return array('datoGeneral' => $datoGeneral, 'datoCuerpo' => $trabajadores);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function uploadedImg2Base64($source) {
        try {
            $response = array('base64img' => -1);
            if ($_FILES['photoname']["error"] == 0) {
                $fp = fopen($source, "r");
                $contents = file_get_contents($source);
                $base64 = base64_encode($contents);
                fclose($fp);
                $response = array('base64img' => "$base64", 'success' => TRUE);
            }
            return $response;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
