<?php

require_once($_SERVER['DOCUMENT_ROOT'] . '/lib/php/Exception/Future_ErrorHandler.php');

class Future_Logger {

    public static function writeLogException($exception, $flag = FALSE) {
        if ($exception instanceof Future_Exception) {
            $strLog = $exception->toString();
            $message = $exception->getMessage();
            $details = $exception->toHtml();
        } else {
            $strLog = self::toString($exception);
            $message = $exception->getMessage();
            $details = self::toHtml($exception);
        }
        $docRoot = $_SERVER['DOCUMENT_ROOT'];
        $_dataSession = Future_Session::getInstance();
        if (isset($_dataSession->logged) && $_dataSession->logged == 'off') {
            $strPageError = file_get_contents($docRoot . "/comun/Security/Header/Error.phtml");
            $newPageError = str_replace('_error', $details, $strPageError);
            echo $newPageError;
            exit;
        }
        self::writeException($strLog, $message, $details);
        if ($flag === TRUE) {
            throw $exception;
        }
    }

    public static function toString($exception) {
        $trace = $exception->getTrace();
        $class = (isset($trace[0]['class'])) ? "Class: " . $trace[0]['class'] : "";
        return "-----------------------------------------------------------------------\n"
                . "-------------------------------Exception-------------------------------\n"
                . "Code: " . $exception->getCode() . "\n"
                . $class . "\n"
                . "Method: " . $trace[0]['function'] . "\n"
                . "Line: " . $exception->getLine() . "\n"
                . "File: " . $exception->getFile() . "\n"
                . "Timestamp: " . date("j/n/Y H:i:s") . "\n"
                . "Message: " . $exception->getMessage() . "\n"
                . "Trace: \n" . $exception->getTraceAsString() . "\n";
    }

    public static function toHtml($exception) {
        $trace = $exception->getTrace();
        $class = (isset($trace[0]['class'])) ? "<br><strong>Class:</strong> " . $trace[0]['class'] : "";
        return "<strong>Code:</strong> " . $exception->getCode() .
                $class .
                "<br><strong>Method:</strong> " . $trace[0]['function'] .
                "<br><strong>Line:</strong> " . $exception->getLine() .
                "<br><strong>File:</strong> " . $exception->getFile() .
                "<br><strong>Timestamp:</strong> " . date("j/n/Y H:i:s") .
                "<br><strong>Message:</strong> " . $exception->getMessage() .
                "<br><strong>Trace:</strong> <br><pre>" . $exception->getTraceAsString() .
                "</pre>";
    }

    public static function writeError($logError2String, $message, $details) {
        $docRoot = $_SERVER['DOCUMENT_ROOT'];
        $fileConfigWeaver = $docRoot . "/comun/comun/xml/weaver.xml";
        if (file_exists($fileConfigWeaver)) {
            $xmlConfigWeaver = simplexml_load_file($fileConfigWeaver);
            if ((string) $xmlConfigWeaver->log['active'] == '1') {
                $fileLogError = $docRoot . '/log/error.log';
                $file = @fopen($fileLogError, "a");
                if (!$file) {
                    $file = @fopen($fileLogError, "w+");
                }
                if ($file) {
                    fputs($file, $logError2String);
                    fclose($file);
                    $fileConfigSystem = $docRoot . "/comun/comun/xml/system.xml";
                    if (file_exists($fileConfigSystem)) {
                        $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
                        if ((string) $xmlConfigSystem->environment->var == 'prod') {
                            $prodMessage = 'Ha ocurrido un error de sistema, por favor vuelva a intentarlo m&aacute;s tarde.';
                            $prodDetails = 'Las causas pueden ser diversas por favor rem&iacute;tase al administrador del sistema.';
                            echo(json_encode(array('code' => 4, 'message' => $prodMessage, 'details' => $prodDetails)));
                        } else {
                            echo(json_encode(array('code' => 4, 'message' => $message, 'details' => $details)));
                        }
                    } else {
                        $systemMessage = "The xml system file hasn't been able to get loaded. Please, contact your administrator.";
                        echo(json_encode(array('code' => 4, 'message' => $systemMessage)));
                    }
                } else {
                    //Hacer algo para avisar que no se puede escribir 
                    //correo alerta y aviso, mensaje
                }
            }
        } else {
            $weaverMessage = "The xml weaver file hasn't been able to get loaded. Please, contact your administrator.";
            echo(json_encode(array('code' => 4, 'message' => $weaverMessage)));
        }
    }

    public static function writeException($logException2String, $message, $details) {
        $docRoot = $_SERVER['DOCUMENT_ROOT'];
        $fileConfigWeaver = $docRoot . "/comun/comun/xml/weaver.xml";
        if (file_exists($fileConfigWeaver)) {
            $xmlConfigWeaver = simplexml_load_file($fileConfigWeaver);
            if ((string) $xmlConfigWeaver->log['active'] == '1') {
                $fileLogExceptions = $docRoot . '/log/exceptions.log';
                $file = @fopen($fileLogExceptions, "a");
                if (!$file) {
                    $file = @fopen($fileLogExceptions, "w+");
                }
                if ($file) {
                    fputs($file, $logException2String);
                    fclose($file);
                    $fileConfigSystem = $docRoot . "/comun/comun/xml/system.xml";
                    if (file_exists($fileConfigSystem)) {
                        $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
                        if ((string) $xmlConfigSystem->environment->var == 'prod') {
                            $prodMessage = 'Ha ocurrido un error de sistema, por favor vuelva a intentarlo m&aacute;s tarde.';
                            $prodDetails = 'Las causas pueden ser diversas por favor rem&iacute;tase al administrador del sistema.';
                            echo(json_encode(array('code' => 4, 'message' => $prodMessage, 'details' => $prodDetails)));
                        } else {
                            echo(json_encode(array('code' => 4, 'message' => $message, 'details' => $details)));
                        }
                    } else {
                        $systemMessage = "The xml system file hasn't been able to get loaded. Please, contact your administrator.";
                        echo(json_encode(array('code' => 4, 'message' => $systemMessage)));
                    }
                } else {
                    //Hacer algo para avisar que no se puede escribir 
                    //correo alerta y aviso, mensaje
                }
            }
        } else {
            $weaverMessage = "The xml weaver file hasn't been able to get loaded. Please, contact your administrator.";
            echo(json_encode(array('code' => 4, 'message' => $weaverMessage)));
        }
    }

    public static function logError2String($errorType, $errorCode, $errorStr, $errorFile, $errorLine) {
        return "-----------------------------------------------------------------------\n"
                . "-------------------------------$errorType-------------------------------\n"
                . "Timestamp: " . date("j/n/Y H:i:s") . "\n"
                . "File: " . $errorFile . "\n"
                . "Line: " . $errorLine . "\n"
                . "Code: " . $errorCode . "\n"
                . "Message: " . $errorStr . "\n";
    }

    public static function LogError2Html($errorType, $errorCode, $errorStr, $errorFile, $errorLine) {
        return "<pre><br><strong>Timestamp:</strong> " . date("j/n/Y H:i:s") .
                "<br><strong>Type:</strong> " . $errorType .
                "<br><strong>File:</strong> " . $errorFile .
                "<br><strong>Line:</strong> " . $errorLine .
                "<br><strong>Code:</strong> " . $errorCode .
                "<br><strong>Message:</strong> " . $errorStr .
                "</pre>";
    }
    
    public static function sendMailtoSupport($data) {
        try {
            $to = 'gesicu@gmail.com';
            $subject = 'Error en el sistema';
            $message = $data->message . "\r\n";
            $serverAdmin = $data->getServer('SERVER_ADMIN');
            $headers = "To: Cubasoft <gesicu@gmail.com>" . "\r\n";
            $headers .= "From: $data->usuario <$serverAdmin>" . "\r\n";
            $headers .= "Reply-To: $serverAdmin" . "\r\n" . 'X-Mailer: PHP/' . phpversion();
            mail($to, $subject, $message, $headers);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
