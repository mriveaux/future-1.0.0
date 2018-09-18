<?php

class BloqueoModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    public function bloquearUsuario($post) {
        try {
            $objBloqueo = new Bloqueo();
            $objBloqueo->tipobloqueo = $post->tipobloqueo;
            $objBloqueo->ipbloqueo = $post->ipbloqueo;
            $objBloqueo->iduserbloqueo = $post->idusuario;
             $objBloqueo->lockedtime = date('d/m/Y H:i:s');
            $objBloqueo->save();

            $objUsuario = Doctrine_Core::getTable('Usuarios')->find($post->idusuario);
            $objUsuario->estado = 2;
            $objUsuario->save();
            return 1;
        } catch (Doctrine_Exception $dexc) {
            throw $dexc;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function desbloquearUsuario($post) {
        try {
            $objBloqueo = Doctrine_Core::getTable('Bloqueo')->find($post->idbloqueo);
            $objBloqueo->locked = false;
            $objBloqueo->unlockedtime = date('d/m/Y H:i:s');
            $objBloqueo->iduserunlocker = $this->dataSession->datiduser;
            $objBloqueo->save();

            $objUsuario = Doctrine_Core::getTable('Usuarios')->find($objBloqueo->iduserbloqueo);
            $objUsuario->estado = 1;
            $objUsuario->save();
            return 1;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
