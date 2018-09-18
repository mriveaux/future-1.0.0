<?php

class AyudaModel extends ModelSecure {

    private $docRoot;

    public function __construct() {
        parent::__construct();
        $this->docRoot = $_SERVER['DOCUMENT_ROOT'];
    }

    public function adicionarAyuda($post) {
        try {
            $objAyuda = new Ayuda();
            $objAyuda->idmodulo = $post->idmodulo;
            $objAyuda->idfuncionalidades = $post->idfuncionalidades;
            $objAyuda->referencia = $post->referencia;
            $objAyuda->save();
            $this->createFileEstructure($post->carpeta, $post->subcarpeta);
            return 1;
        } catch (Doctrine_Exception $e) {
            return 3;
        }
    }

    public function eliminarAyuda($argIdConfAyuda) {
        try {
            $objAyuda = Doctrine_Core::getTable('Ayuda')->find($argIdConfAyuda);
            $objAyuda->delete();
            return 1; //elimino
        } catch (Doctrine_Exception $e) {
            throw $e;
        }
    }

    private function createFileEstructure($argFile, $argSubfile) {
        try {
            $file_content = $this->docRoot . "/help/$argFile";
            $sub_file_content = $this->docRoot . "/help/$argFile/$argSubfile";
            $help_archive = $this->docRoot . "/help/$argFile/$argSubfile/$argSubfile.html";
            if (!file_exists($file_content)) {
                mkdir($file_content, 0777, true);
            }
            if (!file_exists($sub_file_content)) {
                mkdir($sub_file_content, 0777, true);
            }
            if (!file_exists($help_archive)) {
                $file = fopen($help_archive, 'w');
                $content = "<html>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\n"
                        . "</head>\n<body>\n<p>Now you write your " . strtolower($argSubfile) . " help code here.</p>"
                        . "</body>\n</html>";
                fwrite($file, $content);
                fclose($file);
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

}
