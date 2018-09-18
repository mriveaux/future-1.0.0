<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Doctrine/Doctrine.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Session.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/class/utilesComun.php');

class Future_DbSession {

    public $connDb = NULL;
    public $utiles;
    public $xmlconfig;
    public $dataSession;
    private static $instance;

    function __construct() {
        session_set_save_handler(array($this, "open_session"), array($this, "close_session"), array($this, "read_session"), array($this, "write_session"), array($this, "destroy_session"), array($this, "clean_session"));
        $this->utiles = new utilesComun();
        $this->xmlconfig = $_SERVER['DOCUMENT_ROOT'] . '/comun/comun/xml/xmlConfig.xml';
//        $this->dataSession = Session::getInstance();
    }
    
    /**
     *  Clone no permitido
     */
    public function __clone() { }

    /**
     * Returns the instance of the conection for the Session. 
     * Must be used EOF when we call this class: session_write_close();
     * @return    object
     * */
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self;
        }
//        self::$instance->open_session();
        return self::$instance;
    }

    /**
     *  Define the open_session() function that should open the database connection.
     */
    public function open_session() {
        try {
            $this->utiles->includeModulos($_SERVER['DOCUMENT_ROOT'] . '/comun/comun/class');
            $confConnDb = $this->utiles->xmlReader($this->xmlconfig);
            if (is_array($confConnDb)) {
                $this->connDb = $this->utiles->conexionDoctrineDB($confConnDb['root']['node'][0], dirname(__FILE__));
            } else {
                throw new Exception("Error en la configuración de los parametros de conexión.");
            }
            return true;
        } catch (Doctrine_Exception $dexc) {
            throw $dexc;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     *  Define the close_session() function that closes the database connection. 
     */
    public function close_session() {
        try {
            $this->connDb->close();
        } catch (Doctrine_Exception $dexc) {
            throw $dexc;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Define the read_session() function: 
     * @global type $connDb
     * @param type $sid the session ID. 
     * @return string This function retrieves the session data
     */
    public function read_session($sid) {
        try {
            $sql = "SELECT * FROM seguridad.sesion WHERE idsesion = '$sid'";
            $result = $this->connDb->fetchAll($sql);
            if (count($result) == 1) {
                $sessionDb = $result[0];
//                $this->dataSession->sessionId = $sid;
//                $this->dataSession->sessionDb = $sessionDb;
                return $sessionDb;
            } else {
                return '';
            }
        } catch (Doctrine_Exception $dexc) {
            throw $exc;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Define the write_session(), Store in the database the session.
     * @global type $connDb
     * @param type $sid the session ID
     * @param type $data the session data
     * @return type
     */
    public function write_session($sid, $data) {
        try {
            $sql = "SELECT * FROM seguridad.sesion WHERE idsesion = '$sid';";
//            $cant = $this->connDb->count($sql);
            $cant = $this->connDb->fetchAll($sql);
            if (count($cant) > 0) {
                $acceso = date("Y-n-j H:i:s");
                $sql = "UPDATE seguridad.sesion SET idsesion = '$sid', data = '$data'::text, ultimoacceso = '$acceso'::timestamp;";
            } else {
                $sql = "INSERT INTO seguridad.sesion (idsesion, data) VALUES ('$sid', '$data');";
            }
            $this->connDb->fetchAll($sql);
        } catch (Doctrine_Exception $dexc) {
            throw $dexc;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Define the destroy_session() function.
     * Delete from the database the session and clear the $_SESSION array: 
     * @global type $connDb
     * @param type $sid the session ID.
     * @return type
     */
    public function destroy_session($sid) {
        try {
            $sql = "DELETE FROM seguridad.session WHERE id = '$sid'";
            $this->connDb->fetchAll($sql);
            $this->dataSession->destroy();
        } catch (Doctrine_Exception $dexc) {
            throw $dexc;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Define the clean_session() function and delete old sessions.
     * @global type $connDb
     * @param type $expire
     * @return type
     */
    public function clean_session($expire = '1 hour') {
        try {
            global $connDb;
            $sql = "SELECT s.* FROM seguridad.sesion s WHERE s.ultimoacceso - interval $expire < NOW()";
            $this->connDb->fetchAll($sql);
        } catch (Doctrine_Exception $dexc) {
            throw $dexc;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}