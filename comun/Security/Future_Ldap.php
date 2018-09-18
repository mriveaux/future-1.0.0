<?php

class Future_Ldap {

    const LDAP_STARTED = TRUE;
    const LDAP_NOT_STARTED = FALSE;

    private $ldapState = self::LDAP_NOT_STARTED;
    public $version = 3;
    public $ldapServer = "127.0.0.1";
    public $ldapPort = 389;
    public $loginDN = "cn=Manager,dc=maxcrc,dc=com";
//    public $baseDN2 = "cn=John Smith, sn=Smith, ou=Accounts,o=My Company,c=US, mail=jonj@example.com";
    public $ldapConnection = FALSE;

    /**
     * How to use: <br>
     * require_once('class.ldap.php');<br>
     * $ldap = new LDAP();<br>
     * Connect to LDAP Server  - connect(ldap_server, port)<br>
     * $connection = $ldap->connect($ldap->ldapserver,$ldap->ldapport);<br>
     * Bind with LDAP instance<br>
     * $ldap->bind($connection,'cn=admin,dc=web-sistem,dc=com','yourldap_password')<hr><br>;
     * Search LDAP directory
     * Search with a wildcard<br>
     * $ldap->search($connection,'o=hosting,dc=web-sistem,dc=com','vd=*');<br>
     * Search with no attributes specified<br>
     * $ldap->search($connection,'o=hosting,dc=web-sistem,dc=com','vd=plugged.in');<br>
     * Search with attributes (attributes must be an array)<br>
     * $ldap->search($connection,'o=hosting,dc=web-sistem,dc=com','vd=web-sistem.com', array('custID'));<br>
     * Prepare data to insert<br>
     * Please change the record entry as required by your company directory structure<br>
     * $insert_data['objectclass'][0] = "top";<br>
     * $insert_data['objectclass'][1] = "VirtualDomain";<br>
     * $insert_data["accountActive"] = "TRUE";<br>
     * $insert_data["delete"] = "FALSE";<br>
     * $insert_data["lastChange"] = "103";<br>
     * $insert_data["vd"] = "plugged.in";<br>
     * $insert_data["adminID"] = "3";<br>
     * $insert_data["custID"] = "2";<br>
     * $insert_data["editAV"] = "FALSE";<br>
     * $insert_data["maxAlias"] = "20";<br>
     * $insert_data["maxMail"] = "22";<br>
     * $insert_data["maxQuota"] = "300";<br>
     * $insert_data["postfixTransport"] = "maildrop:";<br>
     * LDAP Insert DN<br>
     * $addDN = "vd=plugged.in,o=hosting,dc=web-sistem,dc=com";<br>
     * $ldap->addRecord($connection,$addDN,$insert_data);<br>
     * Prepare data to modify<br>
     * Please change the record entry as required by your company directory structure<br>
     * $modify_data["adminID"] = "3213";<br>
     * $modify_data["custID"] = "2441";<br>
     * LDAP Modify DN<br>
     * $modifyDN = "vd=plugged.in,o=hosting,dc=web-sistem,dc=com";<br>
     * $ldap->modifyRecord($connection,$modifyDN,$modify_data);<br>
     * Delete LDAP record   (third parameter is "Recursive")<br>
     * $deleteDN = "vd=plugged.in,o=hosting,dc=web-sistem,dc=com";<br>
     * $ldap->deleteRecord($connection,$deleteDN,true);<br>
     * Close LDAP Connection<br>
     * $ldap->close($connection);
     * 
     */
    function __construct() {
        $this->ldapConnection = FALSE;
        $this->ldapState = self::LDAP_NOT_STARTED;
    }
    
    /**
     *  Clone no permitido
     */
    public function __clone() { }

    /**
     * Returns the singleton instance. We get the instance: $data = LDAP::getInstance(); 
     * @return object
     * */
    public static function getInstance($ldapServer, $ldapPort = 389) {
        try {
            if (!isset(self::$instance)) {
                return new Future_Ldap($ldapServer, $ldapPort);
            }
            return self::$instance->connect($ldapServer, $ldapPort);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Connect to LDAP Server
     * @param string $server Hostname or URL to connect.
     * @param int $port Port to connect, not used when use URL
     * @return resource or an LDAP link identifier.
     */
    public function connect($server, $port = "389") {
        try {
            $this->ldapConnection = ldap_connect($server, $port);
            ldap_set_option($this->ldapConnection, LDAP_OPT_PROTOCOL_VERSION, 3);
            if ($this->ldapConnection != FALSE) {
                $this->ldapState = self::LDAP_STARTED;
            }
            return $this->ldapConnection;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Bind with LDAP instance. 
     * <br>$ldap->bind($connection,'cn=admin,dc=web-sistem,dc=com','yourldap_password')
     * @param type $connection An LDAP link identifier, returned by ldap_connect.
     * @param type $loginDN LDAP rdn or dn 
     * @param type $basePass Associated password
     */
    public function bind($connection, $loginDN, $basePass) {
        try {
            $bind = @ldap_bind($connection, $loginDN, $basePass);
            if ($bind) {
                return TRUE;
            } else {
                return FALSE;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    /**
     * Search in LDAP directory.<br>
     * <strong>Search with a wildcard: </strong><br>
     * $ldap->search($connection,'o=hosting,dc=web-sistem,dc=com','vd=*');<br>
     * <strong>Search with no attributes specified: </strong><br>
     * $ldap->search($connection,'o=hosting,dc=web-sistem,dc=com','vd=plugged.in');<br>
     * <strong>Search with attributes (attributes must be an array): </strong><br>
     * $ldap->search($connection,'o=hosting,dc=web-sistem,dc=com','vd=web-sistem.com', array('custID'));<br>
     * @param type $connection An LDAP link identifier, returned by ldap_connect.
     * @param type $searchDn
     * @param type $filter
     * @param type $attributes
     * @return array Data represents the ldap entries and Count represents how many are the entries.
     */
    public function search($connection, $searchDn, $filter, $attributes = array()) {
        $sr = @ldap_search($connection, $searchDn, $filter, $attributes);
        $count = 0;
        $result = array();
        if ($sr) {
            $count = ldap_count_entries($connection, $sr);
            $result = ldap_get_entries($connection, $sr);
        }
        return array('data' => $result, 'count' => $count);
    }

    /**
     * LDAP Insert DN
     * @param type $connection An LDAP link identifier, returned by ldap_connect.
     * @param type $addDn $dn = "vd=plugged.in,o=hosting,dc=web-sistem,dc=com";
     * @param type $record
     */
    function addRecord($connection, $addDn, $record) {
        $statusProcess = FALSE;
        $addProcess = ldap_add($connection, $addDn, $record);
        if ($addProcess) {
            $statusProcess = TRUE;
        }
        return $statusProcess;
    }

    /**
     * Prepare data to modify. <br>
     * @param type $connection An LDAP link identifier, returned by ldap_connect.
     * @param type $modifyDn $dn = "vd=plugged.in,o=hosting,dc=web-sistem,dc=com";
     * @param type $record
     */
    function modifyRecord($connection, $modifyDn, $record) {
        $statusProcess = FALSE;
        $modifyProcess = ldap_modify($connection, $modifyDn, $record);
        if ($modifyProcess) {
            $statusProcess = TRUE;
        }
        return $statusProcess;
    }

    /**
     * Delete LDAP record. <br>
     * @param type $connection An LDAP link identifier, returned by ldap_connect.
     * @param type $deleteDN $dn = "vd=plugged.in,o=hosting,dc=web-sistem,dc=com";
     * @param type $recursive is "Recursive"
     * @return type
     */
    function deleteRecord($connection, $deleteDN, $recursive = false) {
        if ($recursive == false) {
            return(ldap_delete($connection, $deleteDN));
        } else {
            // Search for child entries         
            $sr = ldap_list($connection, $deleteDN, "ObjectClass=*", array(""));
            $info = ldap_get_entries($connection, $sr);
            for ($i = 0; $i < $info['count']; $i++) {
                $result = myldap_delete($connection, $info[$i]['dn'], $recursive);
                if (!$result) {
                    return($result);
                }
            }
            return(ldap_delete($connection, $deleteDN));
        }
    }

    /**
     * Close LDAP Connection.
     * @param type $connection
     */
    public function close($connection) {
        ldap_close($connection);
    }

    /**
     * Check an user in the LDAP server.
     * @param type $connection An LDAP link identifier, returned by ldap_connect.
     * @param type $username
     * @param type $passwd
     * @param type $domain
     * @param type $ldapServer
     * @return bool TRUE on success or FALSE on failure.
     */
    public function checkUser($connection, $username, $passwd, $domain) {
        $userAuth = $username . "@" . $domain;
        if ($this->bind($connection, $userAuth, $passwd)) {
            $this->close($connection);
            return TRUE;
        }
        $this->close($connection);
        return FALSE;
    }

    /**
     * This function checks group membership of the user, 
     * searching only in specified group (not recursively).
     */
    public function checkGroup($connection, $userdn, $groupdn) {
        $attributes = array('members');
        $result = ldap_read($connection, $userdn, "(memberof={$groupdn})", $attributes);
        if ($result === FALSE) {
            return FALSE;
        }
        $entries = ldap_get_entries($connection, $result);
        return ($entries['count'] > 0);
    }

}
