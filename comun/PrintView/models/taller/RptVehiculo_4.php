<?php

class RptVehiculo_4 extends ElementsReport
{

    private $gPageCount;
    private $gDate;

    public function __construct()
    {
        $this->fieldName = 'baja_destino';
        $this->gDate = Date('d/m/Y');
    }

    public function GetBlankRows($argArrayColumns)
    {
        $td = "<td style='text-align:center; border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'>&nbsp;</td>";
        return "<tr>$td $td $td $td $td $td $td $td</tr>";
    }

    public function GetHeadTable(&$PAINTEDROWS, $argArrayBodyData, $argPageCount, &$argArrayColumns)
    {
        $this->gPageCount = $argPageCount;
        return $this->GetHtmlHeadTable($this->generalData);
    }

    public function GetHtmlHeadTable($arg_data)
    {
        return "<table border='0' style='font-size:10pt; position:relative; border-collapse:collapse; border-spacing:0px; width:100%;'>
                <tr>
                    <td colspan='8' height=50; align='center' style='border:none;'><b>REGISTRO DE BAJA DE LOS MEDIOS DE TRANSPORTE DE " . strtoupper($arg_data->organo) . "</b></td>
                  </tr>
                <tr>
                  <td width='8%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>TIPO F&Iacute;SICO</b></td>
                  <td width='15%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>MARCA-MODELO</b></td>
                  <td width='8%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>F. ORDEN</b></td>
                  <td width='8%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>NO. ORDEN</b></td>
                  <td width='15%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>MOTIVO</b></td>
                  <td width='10%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>NO. ENTREGA</b></td>
                  <td width='8%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>F. ENTREGA</b></td>
                  <td width='20%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>DESTINO</b></td>
                </tr>
              ";
    }

    public function GetHtmlValues($argArrayBodyData, $agHeader, $TRBODYTABLE)
    {
        return $this->GetHTMLBodyFormat($agHeader, $this->GetBodyTable($TRBODYTABLE), $this->getFootTable($this->generalData->dia, $this->generalData->mes, $this->generalData->anno, 0));
    }

    public function NumberRowsPaperFormat()
    {
        return $this->CasePaperFormat(array(25, 40), array(25, 38), array(27, 49), array(29, 54)); //A4, Letter, Folio, Legal
    }

    public function LengthStringPaperFormat(&$argField)
    {
        $argField = 'baja_destino';
        return $this->CasePaperFormat(array(20, 25), array(20, 25), array(33, 25), array(32, 23));
    }

    public function RowValues($j, $TR_TEXT, &$TR, $argData, &$FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE)
    {
        $td = "<td style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'>";
        $TR .= "<tr>
                  $td $argData->desctipovehiculo</td>
                  $td $argData->descmarcamodelo</td>
                  $td $argData->baja_fechaorden</td>
                  $td $argData->baja_numeroorden</td>
                  $td $argData->baja_motivo</td>
                  $td $argData->baja_numeroentrega</td>
                  $td $argData->baja_fechaentrega</td>
                  $td $argData->baja_destino</td>
                </tr>";
    }

    public function getFootTable($DIA, $MES, $YEAR, $USUARIO)
    {
        $aprobado = $this->generalData->aprobado;
        $firmado = $this->generalData->firmado;
        return "<table border='0' style='font-size:10pt; position:relative; border-collapse:collapse; border-spacing:0px; width:100%;'>
                  <tr>
                    <td height=50><b>Expedido a los " . $DIA . " d&iacute;as del mes " . $MES . " de " . $YEAR . ".</b></td>
                  </tr>
                  <tr> 
                    <td width=50% style='text-align:left;'><b>Aprobado:  " . $aprobado . "</b></td>
                    <td width=50% style='text-align:right;'><b>Firmado:  " . $firmado . "</b></td>
                    </tr>
                    <tr>
                    <td width=50% style='text-align:left;'><b>Jefe de Transporte &Oacute;rgano (Provincia)</b></td>
                    <td width=50% style='text-align:right;'> <b>Jefe Municipio (Unidad)</b></td>
                  </tr>
                  <tr>
                    <td height=50 colspan='2' style='text-align:right;'>$this->gPageCount </td>
                  </tr>
                </table>";
    }

}
