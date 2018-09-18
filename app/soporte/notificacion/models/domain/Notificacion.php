<?php

class Notificacion extends Doctrine_Record {

    public function setUp() {
        parent::setUp();
    }

    public function setTableDefinition() {
        $this->setTableName('soporte.notificacion');
        $this->hasColumn('idnotificacion', 'numeric', null, array('notnull' => true, 'primary' => true, 'sequence' => 'soporte.notificacion_idnotificacion'));
        $this->hasColumn('notificacion', 'character varying', 255, array('notnull' => false, 'primary' => false));
        $this->hasColumn('idusuario', 'numeric', 19, array('notnull' => false, 'primary' => false));
        $this->hasColumn('fecha', 'date', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('tiempo', 'timestamp', null, array('notnull' => false, 'primary' => false));
        $this->hasColumn('estado', 'numeric', 1, array('notnull' => false, 'primary' => false));
        $this->hasColumn('prioridad', 'numeric', 1, array('notnull' => false, 'primary' => false));
    }

    public function getNotificaciones($post) {
        try {
            $query = Doctrine_Query::create();
            $queryCount = Doctrine_Query::create();
            $query->from('Notificacion n')->offset($post->start)
                    ->limit($post->limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);
            $queryCount->from('Notificacion n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            if (isset($post->criterio) && strlen($post->criterio) > 0) {
                $criterio = $post->criterio;
                $query->addWhere("n.notificacion ilike '%" . $criterio . "%'");
                $queryCount->addWhere("n.notificacion ilike '%" . $criterio . "%'");
            }
            if (isset($post->idusuario) && strlen($post->idusuario) > 0) {
                $idUsuario = $post->idusuario;
                $query->addWhere("n.idusuario = ?", $idUsuario);
                $queryCount->addWhere("n.idusuario = ?", $idUsuario);
            }
            $query->addOrderBy('n.fecha');
            $result = $query->execute();
            $count = $queryCount->execute();
            return array('data' => $result, 'total' => $count->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function getNotificacionesByUser($argIdUsuario) {
        try {
            $query = Doctrine_Query::create();
            $query->from('Notificacion n')->where("n.idusuario = ? AND n.estado = 1", $argIdUsuario)
                    ->orderBy('n.tiempo, n.prioridad')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);
            $result = $query->execute();
            return array('data' => $result->toArray(), 'total' => $result->count());
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function delAllNotificaciones($idUsuario) {
        try {
            $sql = "DELETE FROM soporte.notificacion WHERE recipientUid = $idUsuario;";
            $cc = Doctrine_Manager::getInstance()->getCurrentConnection();
            $result = $cc->fetchAll($sql);
            if (count($result) > 0) {
                return 1;
            }
            return -1;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function updateNotifications($argPost, $argSession) {
        $idUsuario = isset($argPost->idusuario) ? $argPost->idusuario : $argSession->datiduser;
        $displayedNotificationNum = (int) $argPost->displayedNotificationNum;
        $dataNotifications = $this->getNotificacionesByUser($idUsuario);
//        do {
//            sleep(0);
//            $dataNotifications = $this->getNotificacionesByUser($idUsuario);
//            $updatedNotificationNum = $dataNotifications['total'];
//        } while ($updatedNotificationNum == $displayedNotificationNum);
        return $dataNotifications;
    }

}
