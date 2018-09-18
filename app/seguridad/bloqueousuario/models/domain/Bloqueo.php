<?php

class Bloqueo extends Doctrine_Record {

    public function setTableDefinition() {
        $this->setTableName('seguridad.bloqueo');
        $this->hasColumn('idbloqueo', 'numeric', 19, array('notnull' => true, 'primary' => true, 'sequence' => 'seguridad.bloqueo_idbloqueo'));
        $this->hasColumn('tipobloqueo', 'numeric', 1, array('notnull' => false, 'primary' => false));
        $this->hasColumn('ipbloqueo', 'character varying', 15, array('notnull' => true, 'primary' => false));
        $this->hasColumn('iduserbloqueo', 'numeric', 19, array('notnull' => true, 'primary' => false));
        $this->hasColumn('locked', 'boolean', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('lockedtime', 'date', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('unlockedtime', 'date', null, array('notnull' => true, 'primary' => false));
        $this->hasColumn('iduserunlocker', 'numeric', 19, array('notnull' => true, 'primary' => false));
    }

    public function setUp() {
        parent::setUp();
        $this->hasOne('Usuarios', array('local' => 'iduserbloqueo', 'foreign' => 'idusuario'));
    }

    public function getBloqueousuarios($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->select('b.*, u.usuario as usuario')
                    ->from('Bloqueo b')
                    ->innerJoin('b.Usuarios u')
                    ->where('u.estado = 2')
                    ->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Bloqueo b')->innerJoin('b.Usuarios u')->where('u.estado = 2')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("b.ipbloqueo ilike '%" . $criterio . "%' OR u.usuario ilike '%" . $criterio . "%'");
                $queryCount->addWhere("b.ipbloqueo ilike '%" . $criterio . "%' OR u.usuario ilike '%" . $criterio . "%'");
            }
            $query->addOrderBy('b.lockedtime DESC');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getHisBloqueousuarios($post) {
        try {
            $START = $post->start;
            $LIMIT = $post->limit;
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $SELECT = "b.*, ulock.usuario as usuario, uunlock.usuario as userunlock";
            $SQL = "SELECT $SELECT FROM seguridad.bloqueo b "
                    . "LEFT JOIN seguridad.usuarios ulock ON (b.iduserbloqueo = ulock.idusuario) "
                    . "LEFT JOIN seguridad.usuarios uunlock ON (b.iduserunlocker = uunlock.idusuario)";
            $SQL_COUNT = "SELECT b.idbloqueo FROM seguridad.bloqueo b";
            $ORDER_BY = "ORDER BY b.lockedtime DESC";
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $SQL.=" WHERE b.ipbloqueo ILIKE '%" . $criterio . "%' OR ulock.usuario ILIKE '%" . $criterio . "%' OR uunlock.usuario ILIKE '%" . $criterio . "%'";
                $SQL_COUNT.=" WHERE b.ipbloqueo ILIKE '%" . $criterio . "%' OR ulock.usuario ILIKE '%" . $criterio . "%' OR uunlock.usuario ILIKE '%" . $criterio . "%'";
            }
            $SQL.=" $ORDER_BY OFFSET '$START' LIMIT '$LIMIT'";
            return array('data' => $cc->fetchAll($SQL), 'total' => count($cc->fetchAll($SQL_COUNT)));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getBloqueoUsuario($argIdUser) {
        $query = Doctrine_Query::create();
        $result = $query->select('b.*')
                ->from('Bloqueo b')
                ->where('b.idusuario=' . $argIdUser . ' AND b.locked=true')
                ->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY)
                ->execute();
        return $result;
    }

}
