<?php

class Registropersona extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
        $this->hasOne('Pais', array('local' => 'idnacionalidad', 'foreign' => 'idpais'));
        $this->hasMany('Docidentidad', array('local' => 'idpersona', 'foreign' => 'idpersona'));
        $this->hasMany('Tipocontrato', array('local' => 'idpersona', 'foreign' => 'idpersona'));
    }

    public function setTableDefinition() {
        $this->setTableName('rrhh.dat_persona');
        $this->hasColumn('idpersona', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'rrhh.dat_persona_idpersona'));
        $this->hasColumn('nombre', 'character varying', 50, array('notnull' => true, 'primary' => false));
        $this->hasColumn('apellidos', 'character varying', 100, array('notnull' => true, 'primary' => false));
        $this->hasColumn('sexo', 'numeric', 1, array('notnull' => true, 'primary' => false));
        $this->hasColumn('estadocivil', 'numeric', 1, array('notnull' => true, 'primary' => false));
        $this->hasColumn('foto', 'text', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('status', 'numeric', 1, array('notnull' => true, 'primary' => false));
        $this->hasColumn('idnacionalidad', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('identidad', 'numeric', 19, array('notnull' => true, 'primary' => false));
    }

    public function getRegistropersonas($post, $identidad) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Registropersona rp')->innerJoin('rp.Pais p')
                    ->leftJoin('rp.Docidentidad d')
                    ->where("d.rector = 1 AND rp.identidad = $identidad")
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

    public function getCategoriadocs() {
        try {
            $obj_categoria = new Categoriadoc();
            return array('data' => $obj_categoria->getListCategoriadocsService());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getNacionalidad() {
        try {
            $obj_pais = new Pais();
            return array('data' => $obj_pais->getListPaisesService());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getAditionalData() {
        try {
            $obj_aditional = new Aditionaldata();
            return array('data' => $obj_aditional->getListAditionalDataService());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getPersonasByStatusService($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Registropersona rp')->innerJoin('rp.Pais p')
                    ->leftJoin('rp.Docidentidad d')
                    ->where('d.rector = 1')
                    ->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Registropersona rp')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("rp.nombre ilike '%" . $criterio . "%' OR " . "rp.apellidos ilike '%" . $criterio . "%'");
                $queryCount->addWhere("rp.nombre ilike '%" . $criterio . "%' OR " . "rp.apellidos ilike '%" . $criterio . "%'");
            }
            if (isset($post->status)) {
                $arrStatus = implode(',', $post->status);
                $query->addWhere("rp.status IN ($arrStatus)");
                $queryCount->addWhere("rp.status IN ($arrStatus)");
            }
            $query->addWhere("rp.identidad = " . $_SESSION['identidad']);
            $queryCount->addWhere("rp.identidad = " . $_SESSION['identidad']);
            $query->addOrderBy('rp.nombre,rp.apellidos');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
