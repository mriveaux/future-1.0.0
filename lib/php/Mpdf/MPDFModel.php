<?php
/**
 * Created by Team Fluency.
 * User: Javier Gonzalez Rodriguez
 * Date: 10/02/13
 * Time: 21:03
 */
require_once($_SERVER['DOCUMENT_ROOT'] . '/comun/mpdf/mpdf.php');

class MPDFModel
{
    //private $mpdf;

    public function getMpdf()
    {
        return $this->mpdf;
    }

    /*public function __construct($mpdf)
    {
        $this->mpdf = $mpdf;
    }*/

    public function __construct($format = 'A4', $orientation = 'P',$mgl=15, $mgr=15, $mgt=15, $mgb=15, $mgh=9, $mgf=9) {
        $this->init($format, $orientation,'','','',$mgl,$mgr,$mgt,$mgb,$mgh,$mgf);
    }

    public function download($filename)
    {
        $this->mpdf->Output($filename . '.pdf', 'D');
        exit;
    }

    /**
     * @param string $format
     * @return \Fluency\Bundle\MPDFBundle\Model\MPDFModel
     */
    public function new_page($format = 'A4')
    {
        $this->mpdf->WriteHTML("<pagebreak sheet-size=\"{$format}\" />");
        return $this;
    }

    /**
     * @param $html
     * @return \Fluency\Bundle\MPDFBundle\Model\MPDFModel
     */
    public function add_html($html)
    {
        $this->mpdf->WriteHTML($html);
        return $this;
    }
	/**
     * @param $orienttion
     * @return the page orientation
     */
	public function add_page($orientation)
    {
        $this->mpdf->AddPage($orientation);
        return $this;
    }

    /**
     * @param $css
     * url del css que desea incluir ( base_url() . "common/css/print_static.css" )
     * recomendable todo el css en un solo fichero
     * @return \Fluency\Bundle\MPDFBundle\Model\MPDFModel
     */
    public function add_css($css)
    {
        $stylesheet = file_get_contents($css);
        $this->mpdf->WriteHTML($stylesheet,1);
        return $this;
    }

    /**
     * @param string $mode
     * @param string $format
     * @param int $default_font_size
     * @param string $default_font
     * @param int $mgl
     * @param int $mgr
     * @param int $mgt
     * @param int $mgb
     * @param int $mgh
     * @param int $mgf
     * @param string $orientation
     * @return \Fluency\Bundle\MPDFBundle\Model\MPDFModel
     */
    //public function init($mode = '', $format = 'A4', $default_font_size = 0, $default_font = '', $mgl = 15, $mgr = 15, $mgt = 16, $mgb = 16, $mgh = 9, $mgf = 9, $orientation = 'P')
    public function init($format, $orientation, $mode= 'UTF-8', $default_font_size = 11, $default_font= 'sans-serif', $mgl=15, $mgr=15, $mgt=15, $mgb=15, $mgh=9, $mgf=9)
    {//print_r($mgr);die;
        $this->mpdf = new mPDF($mode, $format, $default_font_size, $default_font, $mgl, $mgr, $mgt, $mgb, $mgh, $mgf, $orientation);
        return $this;
    }
}
