<?php

class Directa extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Registropersona', array('local' => 'idpersona', 'foreign' => 'idpersona'));
        $this->hasOne('Registroempleado', array('local' => 'idpersona', 'foreign' => 'idpersona'));
        $this->hasOne('Usuarios', array('local' => 'idusuario', 'foreign' => 'idusuario'));
        $this->hasOne('Cargoplantilla', array('local' => 'idcargoplantilla', 'foreign' => 'idcargoplantilla'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_selecciondirecta');
        $this->hasColumn('idselecciondirecta', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'rrhh.dat_selecciondirecta_idselecciondirecta'));
        $this->hasColumn('idusuario', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idcargoplantilla', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fecha', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('observacion', 'character varing', 255, array('notnull' => false, 'primary' => false));
    }

    public function getPersonas($post, $identidad) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Registropersona rp')->innerJoin('rp.Pais p')
                    ->leftJoin('rp.Docidentidad d')
                    ->where("d.rector = 1 AND rp.identidad = $identidad AND rp.status IN (0,2,3)")
                    ->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Registropersona rp')
                    ->where("rp.identidad = $identidad")
                    ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("rp.nombre ilike '%" . $criterio . "%' OR " . "rp.apellidos ilike '%" . $criterio . "%'");
                $queryCount->addWhere("rp.nombre ilike '%" . $criterio . "%' OR " . "rp.apellidos ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('rp.nombre,rp.apellidos');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getListSelecciones($post, $identidad) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select("d.*,u.*,rp.idpersona,rp.nombre as nombpersona,rp.apellidos,rp.sexo,rp.estadocivil,rp.foto,rp.status,CONCAT(rp.nombre,' ',rp.apellidos) as fullname,di.numero as numeroidentidad ,cp.*,p.nacionalidad as nacionalidad")
                    ->from('Directa d')
                    ->innerJoin('d.Usuarios u')
                    ->innerJoin('d.Registropersona rp')
                    ->leftJoin('rp.Docidentidad di')
                    ->innerJoin('rp.Pais p')
                    ->innerJoin('d.Cargoplantilla cp')
                    ->where("di.rector = 1 AND rp.identidad = $identidad")
                    ->offset($post->start)->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Directa d')
                    ->innerJoin('d.Usuarios u')
                    ->innerJoin('d.Registropersona rp')
                    ->innerJoin('d.Cargoplantilla cp')
                    ->where("rp.identidad = $identidad")
                    ->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
//            if (isset($post->criterio) && strlen($post->criterio) > 0) {
//                $criterio = $post->criterio;
//                $query->addWhere("rp.nombre ilike '%" . $criterio . "%' OR " . "rp.apellidos ilike '%" . $criterio . "%' OR " . "u.usuario ilike '%" . $criterio . "%' OR " . "cp.nombre ilike '%" . $criterio . "%'");
//                $queryCount->addWhere("rp.nombre ilike '%" . $criterio . "%' OR " . "rp.apellidos ilike '%" . $criterio . "%' OR " . "u.usuario ilike '%" . $criterio . "%' OR " . "cp.nombre ilike '%" . $criterio . "%'");
//            }
//            $query->addOrderBy('d.fecha, u.usuario');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getCargoPlantilla() {
        $objCargoPlantilla = new Cargoplantilla();
        $cargos = $objCargoPlantilla->getSimpleCargosDisponiblesService($_SESSION['identidad']);
        return array('data' => $cargos, 'total' => count($cargos));
    }

}

