<?php

class Future_Exception extends Exception {

    private $_idException;
    private $_description;
    private $_instance;
    private $_docRoot;

    public function getIdException() {
        return $this->_idException;
    }

    public function getDescription() {
        return $this->_description;
    }

    public function getClass() {
        $traces = parent::getTrace();
        return $traces [count($traces) - 1] ['class'];
    }

    public function getMethod() {
        $traces = parent::getTrace();
        return $traces [count($traces) - 1] ['function'];
    }

    public function getInstance() {
        return $this->_instance;
    }

    function __construct($_idException, $_message = NULL) {
        $this->_idException = $_idException;
        $this->_docRoot = $_SERVER['DOCUMENT_ROOT'];
        $dirXmlException = $this->_docRoot . '/comun/comun/xml/exception.xml';
        if (file_exists($dirXmlException)) {
            $xmlAllException = simplexml_load_file($dirXmlException);
            if ($xmlAllException->$_idException) {
                $xmlException = $xmlAllException->$_idException;
                if (@$xmlException->mensaje) {
                    $this->_description = (string) $xmlException->descripcion;
                    if ($_message != NULL) {
                        parent::__construct($_message);
                    } else {
                        parent::__construct((string) $xmlException->mensaje);
                    }
                } else {
                    throw new Exception('La excepci&oacute;n dada no tiene un mensaje declarado.');
                }
            } else {
                throw new Exception('El id de la excepci&oacute;n declarada no existe.');
            }
        } else {
            throw new Exception('No se ha podido cargar el xml de las excepciones en la ruta:' . $dirXmlException);
        }
    }

    function toString() {
        return "-----------------------------------------------------------------------\n"
                . "-------------------------------Exception-------------------------------\n"
                . "Code: " . $this->getIdException() . "\n"
                . "Class: " . $this->getClass() . "\n"
                . "Method: " . $this->getMethod() . "\n"
                . "Line: " . $this->getLine() . "\n"
                . "File: " . $this->getFile() . "\n"
                . "Timestamp: " . date("j/n/Y H:i:s") . "\n"
                . "Message: " . $this->getMessage() . "\n"
                . "Trace: \n" . $this->getTraceAsString() . "\n";
    }

    function toHtml() {
        return "<strong>Code:</strong> " . $this->getIdException() .
                "<br><strong>Class:</strong> " . $this->getClass() .
                "<br><strong>Method:</strong> " . $this->getMethod() .
                "<br><strong>Line:</strong> " . $this->getLine() .
                "<br><strong>File:</strong> " . $this->getFile() .
                "<br><strong>Timestamp:</strong> " . date("j/n/Y H:i:s") .
                "<br><strong>Message:</strong> " . $this->getMessage() .
                "<br><strong>Description:</strong> " . $this->getDescription() .
                "<br><strong>Trace:</strong> <br><pre>" . $this->getTraceAsString() .
                "</pre>";
    }

}
