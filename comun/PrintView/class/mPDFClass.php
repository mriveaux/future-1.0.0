<?php

require_once($_SERVER['DOCUMENT_ROOT']  . "/lib/php/Mpdf/mpdf/mpdf.php");

class mPDFClass {

    private $_mpdf;

    public function __construct($format = 'A4', $orientation = 'P') {
        $this->init($format, $orientation);
    }

    //ccourier		ctimes    chelvetica  sans-serif
    public function init($format, $orientation, $mode= 'UTF-8', $default_font_size = 9, $default_font= 'sans-serif', $mgl=15, $mgr=10, $mgt=10, $mgb=10, $mgh=9, $mgf=9) {
        $this->_mpdf = new mPDF($mode, $format, $default_font_size, $default_font, $mgl, $mgr, $mgt, $mgb, $mgh, $mgf, $orientation);
        //$this->_mpdf->debugfonts = true;
        $this->_mpdf->forcePortraitHeaders = true;
        $this->_mpdf->forcePortraitMargins = true;
        //$this->_mpdf->mirrorMargins = true; 
        $this->_mpdf->repackageTTF = true;
        $this->_mpdf->keep_table_proportions = true;
        $this->_mpdf->onlyCoreFonts = TRUE;
        $this->_mpdf->allow_charset_conversion = true;
        $this->_mpdf->charset_in = 'UTF-8';
        $this->_mpdf->SetDisplayMode('fullpage');
        return $this;
    }

    public function set_controller($_this, $agValues, $agControllerName, $agPdfName, $agDirComponentsName = false) {
        if ($agDirComponentsName)
            $_this->view->setBasePath($_SERVER['DOCUMENT_ROOT'] . "/$agDirComponentsName/$agControllerName/views/");

        $request = $_this->getRequest();

        if ($agDirComponentsName)
            $request->setControllerName($agControllerName);

        $request->setActionName($agControllerName);
        $_this->view->datos = $agValues;
        $_this->getResponse()->appendBody($html = $_this->view->render($_this->getViewScript()));
        $this->init()->add_html($html)->open($agPdfName);
    }

    public function download($file_name) {
        $this->_mpdf->Output("$file_name.pdf", "D");
        return true;
    }

    public function open($file_name) {
        $this->_mpdf->Output("$file_name.pdf", "I");
        return true;
    }

    public function new_page($format='LETTER') {
        $this->_mpdf->WriteHTML("<pagebreak sheet-size=\"{$format}\" />");
        return $this;
    }

    public function add_html($agBody, $agFoot = 'false') {
        //$this->_mpdf->WriteHTML(b_convert_encoding($agBody, "ISO-8859-1?, "UTF-8?), 2);
        //$this->_mpdf->WriteHTML(mb_convert_encoding($agBody, 'UTF-8', mb_detect_encoding($agBody)), 2);
        //utf8_encode($agFoot)
        //$Cadena = str_replace('ñ','&ntilde;',str_replace('Ñ','&Ntilde;',$agBody));
        //$this->_mpdf->SetHTMLHeader("<meta http-equiv= 'Content-Type' content= 'text/html; charset=UTF-8' />");
        $this->_mpdf->WriteHTML($agBody, 2);
        if ($agFoot != 'false')
            $this->_mpdf->SetHTMLFooter($agFoot);
        return $this;
    }

    public function add_css($dir_content) {
        $this->_mpdf->WriteHTML(file_get_contents("$dir_content.css"), 1);
        return $this;
    }

    public function getCurrentPage() {
        $CURRENTPAGE = $this->_mpdf->PageNo();
        if ($CURRENTPAGE == 0)
            return 1;
        return $CURRENTPAGE;
    }

    public function getPaperSizeFormat($FORMAT_PAPERSIZE, $REPORT_ORIENTATION) {
        list($width, $height) = $this->_mpdf->_getPageFormat($FORMAT_PAPERSIZE);
        return ($REPORT_ORIENTATION == "L") ? array($height, $width) : array($width, $height);
    }

}