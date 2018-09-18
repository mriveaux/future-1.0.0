<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/Security/Future_Ldap.php');

class SistemaModel extends ModelSecure {

    private $docRoot;

    public function __construct() {
        parent::__construct();
        $this->docRoot = $_SERVER['DOCUMENT_ROOT'];
    }

    public function loadConfigSystem() {
        try {
            $fileConfigSystem = $this->docRoot . "/comun/comun/xml/system.xml";
            $fileConfigWeaver = $this->docRoot . "/comun/comun/xml/weaver.xml";
            $fileConfigLdap = $this->docRoot . "/comun/comun/xml/ldapConfig.xml";
            $fileConfigPhpMail = $this->docRoot . "/comun/comun/xml/phpMail.xml";
            $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
            $xmlConfigWeaver = simplexml_load_file($fileConfigWeaver);
            $xmlConfigLdap = simplexml_load_file($fileConfigLdap);
            $xmlConfigPhpMail = simplexml_load_file($fileConfigPhpMail);

            $datConfigSystem = new stdClass();
            //environment
            $datConfigSystem->environment = new stdClass();
            $datConfigSystem->environment->var = (string) $xmlConfigSystem->environment->var;
            $datConfigSystem->environment->firebug = (int) $xmlConfigSystem->environment->firebug;
            $datConfigSystem->environment->sessiontime = (int) $xmlConfigSystem->environment->sessiontime;
            //validation
            $datConfigSystem->validation = new stdClass();
            $datConfigSystem->validation->frontend = (bool) ($xmlConfigSystem->validation->frontend == 'true') ? true : false;
            $datConfigSystem->validation->backend = (bool) ($xmlConfigSystem->validation->backend == 'true') ? true : false;
            //blockadeip
            $datConfigSystem->blockadeip = new stdClass();
            $datConfigSystem->blockadeip->ip = (bool) ($xmlConfigSystem->blockadeip->ip == 'true') ? true : false;
            $datConfigSystem->blockadeip->number = (int) $xmlConfigSystem->blockadeip->number;
            $datConfigSystem->blockadeip->type = (int) $xmlConfigSystem->blockadeip->type;
            $datConfigSystem->blockadeip->cachetime = (int) $xmlConfigSystem->blockadeip->cachetime;
            //blockadeuser
            $datConfigSystem->blockadeuser = new stdClass();
            $datConfigSystem->blockadeuser->ip = (bool) ($xmlConfigSystem->blockadeuser->ip == 'true') ? true : false;
            $datConfigSystem->blockadeuser->number = (int) $xmlConfigSystem->blockadeuser->number;
            $datConfigSystem->blockadeuser->type = (int) $xmlConfigSystem->blockadeuser->type;
            $datConfigSystem->blockadeuser->cachetime = (int) $xmlConfigSystem->blockadeuser->cachetime;
            //aspect
            $datConfigSystem->aspect = new stdClass();
            $datConfigSystem->aspect->loggin = (string) $xmlConfigWeaver->loggin['active'];
            $datConfigSystem->aspect->trace = (string) $xmlConfigWeaver->trace['active'];
            $datConfigSystem->aspect->log = (string) $xmlConfigWeaver->log['active'];
            //access
            $datConfigSystem->access = new stdClass();
            $datConfigSystem->access->type = (string) $xmlConfigSystem->access->type;
            //ldap
            $datConfigSystem->ldap = new stdClass();
            $datConfigSystem->ldap->status = (string) $xmlConfigLdap->status;
            $datConfigSystem->ldap->host = (string) $xmlConfigLdap->host;
            $datConfigSystem->ldap->port = (int) $xmlConfigLdap->port;
            $datConfigSystem->ldap->dn = (string) $xmlConfigLdap->dn;
            $datConfigSystem->ldap->stdn = (string) $xmlConfigLdap->stdn;
            $datConfigSystem->ldap->password = (string) $xmlConfigLdap->password;
            //phpMail
            $datConfigSystem->phpMail = new stdClass();
            $datConfigSystem->phpMail->smtpServer = (string) $xmlConfigPhpMail->host;
            $datConfigSystem->phpMail->smtpPort = (string) $xmlConfigPhpMail->port;
            $datConfigSystem->phpMail->smtpUser = (string) $xmlConfigPhpMail->user;
            $datConfigSystem->phpMail->smtpPasswd = base64_encode($this->getDecodePassword((string) $xmlConfigPhpMail->password, (string) $xmlConfigPhpMail->token));
            $datConfigSystem->phpMail->smtpName = (string) $xmlConfigPhpMail->fromName;
            $datConfigSystem->phpMail->smtpEmail = (string) $xmlConfigPhpMail->fromEmail;
//            $datConfigSystem->phpMail->token = (string) $xmlConfigPhpMail->token;
            $result = array('data' => $datConfigSystem);
            return $result;
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function loadTechComposition() {
        try {
            $fileAppVersion = $this->docRoot . "/comun/comun/xml/appVersion.xml";
            $xmlAppVersion = simplexml_load_file($fileAppVersion);
            $counter = array('ext2' => 0, 'ext4' => 0, 'ext6' => 0);
            foreach ($xmlAppVersion as $k => $v) {
                $this->recursiveTech($counter, $v);
            }
            return array(array('Ext 2.2', $counter['ext2']), array('Ext 4.2', $counter['ext4']), array('Ext 6.2', $counter['ext6']));
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    private function recursiveTech(&$counter, $data) {
        foreach ($data as $k => $v) {
            if (is_a($k, 'SimpleXMLElement')) {
                $this->recursiveTech($counter, $v);
            } else {
                foreach ($v as $k => $el) {
                    if ($el == '2.2') {
                        $counter['ext2'] ++;
                    } else if ($el == '4.2') {
                        $counter['ext4'] ++;
                    } else {
                        $counter['ext6'] ++;
                    }
                }
            }
        }
    }

    public function saveConfigEnvironment($post) {
        try {
            $fileConfigEnv = $this->docRoot . "/comun/comun/xml/system.xml";
            $xmlObject = simplexml_load_file($fileConfigEnv);
            $xmlObject->environment->var = $post->var;
            $xmlObject->environment->firebug = $post->firebug;
            $xmlObject->environment->sessiontime = $post->sessiontime;
            $xmlObject->validation->frontend = $post->frontend;
            $xmlObject->validation->backend = $post->backend;
            if ($xmlObject->asXML($fileConfigEnv) == TRUE) {
                return 1;
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function saveConfigAspect($post) {
        try {
            $fileConfigWeaver = $this->docRoot . "/comun/comun/xml/weaver.xml";
            $xmlObject = simplexml_load_file($fileConfigWeaver);
            $xmlObject->loggin['active'] = $post->loggin;
            $xmlObject->trace['active'] = $post->trace;
            $xmlObject->log['active'] = $post->log;
            if ($xmlObject->asXML($fileConfigWeaver) == TRUE) {
                return 1;
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function saveConfigBlockade($post) {
        try {
            $fileConfigEnv = $this->docRoot . "/comun/comun/xml/system.xml";
            $xmlObject = simplexml_load_file($fileConfigEnv);
            $xmlObject->blockadeip->ip = $post->byIp;
            $xmlObject->blockadeip->number = $post->byIpNumber;
            $xmlObject->blockadeip->type = $post->byIpType;
            $xmlObject->blockadeip->cachetime = $post->byIpCachetime;
            $xmlObject->blockadeuser->ip = $post->byUser;
            $xmlObject->blockadeuser->number = $post->byUserNumber;
            $xmlObject->blockadeuser->type = $post->byUserType;
            $xmlObject->blockadeuser->sessiontime = $post->byUserSessiontime;
            if ($xmlObject->asXML($fileConfigEnv) == TRUE) {
                return 1;
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function saveConfigLdap($post) {
        try {
            $fileConfigLdap = $this->docRoot . "/comun/comun/xml/ldapConfig.xml";
            $xmlObject = simplexml_load_file($fileConfigLdap);
            $xmlObject->status = $post->ldapStatus;
            $xmlObject->host = $post->ldapServer;
            $xmlObject->port = $post->ldapPort;
            $xmlObject->dn = $post->ldapDN;
            $xmlObject->stdn = $post->standarDN;
            $xmlObject->password = $post->ldapPasswd;

            $fileConfigSystem = $this->docRoot . "/comun/comun/xml/system.xml";
            $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
            $xmlConfigSystem->access->type = $post->access;
            $xmlConfigSystem->asXML($fileConfigSystem);

            if ($xmlObject->asXML($fileConfigLdap) == TRUE) {
                return 1;
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function testConfigLdap($post) {
        try {
            error_reporting(0);
            $objLdap = new Future_Ldap();
            $conLdap = $objLdap->connect($post->ldapServer, $post->ldapPort);
            if ($conLdap) {
                $ldapBind = $objLdap->bind($conLdap, $post->ldapDN, $post->ldapPasswd);
                if ($ldapBind) {
                    return 1;
                } else {
                    return 2;
                }
            } else {
                return 3;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function saveSmtpConfig($post) {
        try {
            $fileConfigPhpMail = $this->docRoot . "/comun/comun/xml/phpMail.xml";
            $xmlObject = simplexml_load_file($fileConfigPhpMail);
            $xmlObject->host = $post->smtpServer;
            $xmlObject->port = $post->smtpPort;
            $xmlObject->user = $post->smtpUser;
            $xmlObject->password = $post->smtpPasswd;
            $xmlObject->fromName = $post->smtpName;
            $xmlObject->fromEmail = $post->smtpEmail;
            $xmlObject->token = $this->dataSession->authToken;

            if ($xmlObject->asXML($fileConfigPhpMail) == TRUE) {
                return 1;
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
            return 3;
        }
    }

    public function testSmtpConfig($post) {
        try {
            $mail = new PHPMailer(true);
            //Server settings
            $mail->SMTPDebug = 0; // Enable verbose debug output
            $mail->isSMTP(); // Set mailer to use SMTP
            $mail->Host = $post->smtpServer; // Specify main and backup SMTP servers
            $mail->SMTPAuth = true; // Enable SMTP authentication
            $mail->Username = $post->smtpUser; // SMTP username
            $mail->Password = $this->getDecodePassword($post->smtpPasswd, $this->dataSession->authToken); // SMTP password
            $mail->SMTPSecure = 'none'; // Enable TLS encryption, `ssl` also accepted
            $mail->Port = $post->smtpPort; // TCP port to connect to
            //Recipients
            $mail->setFrom($post->smtpEmail, $post->smtpName);
            $mail->addAddress($post->smtpEmail, $post->smtpName); // Add a recipient
            //Content
            $mail->isHTML(true); // Set email format to HTML
            $mail->Subject = 'Testing connection with PHPMail';
            $mail->Body = 'If you can see this message it is that the configuration was successful.';
            $mail->AltBody = 'If you can see this message it is that the configuration was successful.';
            $mail->send();
            return 1;
        } catch (Exception $exc) {
            throw $exc;
            return 3;
        }
    }

    public function emptyFilesLogs() {
        $fileLogError = $this->docRoot . "/log/error.log";
        $fileLogCustom = $this->docRoot . "/log/custom.log";
        $fileLogException = $this->docRoot . "/log/exceptions.log";
        $logFiles = array($fileLogError, $fileLogCustom, $fileLogException);
        foreach ($logFiles as $filename) {
            if (is_writable($filename)) {
                $handle = fopen($filename, 'r+');
                ftruncate($handle, 0);
                rewind($handle);
                fclose($handle);
            } else {
                echo "The file $filename is not writable";
            }
        }
        return 1;
    }

}
