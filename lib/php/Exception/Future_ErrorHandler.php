<?php

/**
 * 
 * @param int $errorCode The exception severity or the level of the error raised, as an integer.
 * @param string $errorStr The error message
 * @param type $errorFile  The filename that the error was raised in.
 * @param type $errorLine The line number the error was raised at.
 * @return boolean or Write in log.
 * @throws ErrorException
 */
function Future_ErrorHandler($errorCode, $errorStr, $errorFile, $errorLine) {
    $docRoot = $_SERVER['DOCUMENT_ROOT'];
    if (!(error_reporting() & $errorCode)) {
        // This error code is not included in error_reporting
        return;
    }
    $fileConfigSystem = $docRoot . "/comun/comun/xml/system.xml";
    $xmlConfigSystem = simplexml_load_file($fileConfigSystem);
    if ((string) $xmlConfigSystem->environment->var == 'prod') {
        switch ($errorCode) {
            case 1:
                $errorType = 'E_ERROR';
                break;
            case 2:
                $errorType = 'E_WARNING';
                break;
            case 4:
                $errorType = 'E_PARSE';
                break;
            case 8:
                $errorType = 'E_NOTICE';
                break;
            case 16:
                $errorType = 'E_CORE_ERROR';
                break;
            case 32:
                $errorType = 'E_CORE_WARNING';
                break;
            case 64:
                $errorType = 'E_COMPILE_ERROR';
                break;
            case 128:
                $errorType = 'E_COMPILE_WARNING';
                break;
            case 256:
                $errorType = 'E_USER_ERROR';
                break;
            case 512:
                $errorType = 'E_USER_WARNING';
                break;
            case 1024:
                $errorType = 'E_USER_NOTICE';
                break;
            case 2047:
                $errorType = 'E_ALL';
                break;
            case 2048:
                $errorType = 'E_STRICT';
                break;
            default:
                $errorType = 'UNDEFINED';
                break;
        }
        $errorHtml = Future_Logger::logError2Html($errorType, $errorCode, $errorStr, $errorFile, $errorLine);
        Future_Logger::writeError(Future_Logger::logError2String($errorType, $errorCode, $errorStr, $errorFile, $errorLine), $errorStr, $errorHtml);
    } else {
        throw new ErrorException($errorStr, 0, $errorCode, $errorFile, $errorLine);
    }
    /* Don't execute PHP internal error handler */
    return true;
}

set_error_handler("Future_ErrorHandler");
