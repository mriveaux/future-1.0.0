<?php

class FormatoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function addFormato($data) {
        try {
            $formato = new Formato();
            $formato->descripcion = $data->descripcion;
            $formato->idmodulo = $data->idmodulo;
            $formato->formato = $data->formato;
            $formato->separador = $data->separador;
            $formato->estandar = ($data->estandar) ? 1 : 0;
            $formato->identidad = $this->dataSession->identidad;
            $formato->save();
            if ($formato->idformato) {
                $formatoEntidad = new FormatoEntidad();
                $formatoEntidad->identidad = $this->dataSession->identidad;
                $formatoEntidad->idformato = $formato->idformato;
                $formatoEntidad->save();
                return 1;
            } else {
                return 2;
            }
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function modFormato($data) {
        try {
            $formato = Doctrine_Core::getTable('Formato')->find($data->idformato);
            $formato->formato = $data->formato;
            $formato->save();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    public function delFormato($post) {
        try {
            $formato = Doctrine_Core::getTable('Formato')->find($post->idformato);
            $formato->delete();
            return 1;
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }


    public function addParteFormato($data) {
        try {
            $parteFormato = new Parteformato();
            $parteFormato->idformato = $data->idformato;
            $parteFormato->parteformato = $data->parteformato;
            $parteFormato->abreviatura = $data->abreviatura;
            $parteFormato->longitud = $data->longitud;
            $parteFormato->nivel = $data->nivel;
            $existe = $this->buscarParteFormato($data);
            if ($existe == 0) {
                $parteFormato->save();
                return 1;
            } else {
                return 2;
            }
        } catch (Doctrine_Exception $exc) {
            throw $exc;
        }
    }

    public function modParteFormato($data) {
        try {
            $parteFormato = Doctrine_Core::getTable('ParteFormato')->find($data->idparteformato);
            $parteFormato->idformato = $data->idformato;
            $parteFormato->parteformato = $data->parteformato;
            $parteFormato->abreviatura = $data->abreviatura;
            $parteFormato->longitud = $data->longitud;
            $parteFormato->nivel = $data->nivel;
            $existe = $this->buscarParteFormato($data);
            if ($existe == 0) {
                $parteFormato->save();
                return 1;
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function delParteFormato($data) {
        try {
            $parteFormato = Doctrine_Core::getTable('ParteFormato')->find($data->idparteformato);
            $parteFormato->delete();
            return 1;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function buscarParteFormato($data) {
        try {
            $idParteFormato = $data->idparteformato;
            $parteFormato = $data->parteformato;
            $abreviatura = $data->abreviatura;
            $nivel = $data->nivel;
            $idFormato = $data->idformato;
            $where = (strlen($idParteFormato) > 0) ? "(pf.parteformato = '$parteFormato' OR pf.abreviatura = '$abreviatura' OR pf.nivel = $nivel) AND pf.idformato = $idFormato AND pf.idparteformato <> $idParteFormato" : "(pf.parteformato = '$parteFormato' OR pf.abreviatura = '$abreviatura' OR pf.nivel = $nivel) AND pf.idformato = $idFormato";
            $query = Doctrine_Query::create();
            $result = $query->select('pf.*')
                ->from('Parteformato pf')
                ->where($where)
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();
            return (count($result) > 0) ? 1 : 0;

        } catch (Doctrine_Exception $exc) {
            print_r($exc);die;
            throw $exc;
        }
    }

}
