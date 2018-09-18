<?php

class RptListadoOperaciones extends ElementsReport implements IExcel {

    private $gPageCount;
    private $gDate;

    public function __construct() {
        $this->fieldName = 'operacion';
        $this->gDate = Date('d/m/Y');
        $this->columnModel = array(
            0 => new ColumnModel('CÓDIGO', 'codigo'),
            1 => new ColumnModel('OPERACIÓN', 'operacion'),
            2 => new ColumnModel('ACTIVIDAD', 'actividad'),
            3 => new ColumnModel('T.NORMA/COSTO', 'tnorma'),
            4 => new ColumnModel('TARIFA', 'tarifa')
        );
    }

    public function GetBlankRows($argArrayColumns) {
        $td = "<td style='text-align:center; border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'>&nbsp;</td>";
        return "<tr>$td $td $td $td $td</tr>";
    }

    public function GetHeadTable(&$PAINTEDROWS, $argArrayBodyData, $argPageCount, &$argArrayColumns) {

        $this->gPageCount = $argPageCount;
        return $this->GetHtmlHeadTable($this->generalData);
    }

    public function GetHtmlHeadTable($arg_data) {
        return "<table border='0' style='font-size:10pt; position:relative; border-collapse:collapse; border-spacing:0px;' width='100%'>
                <tr>
                    <td colspan='5' align='center' style='border:none;'><b>LISTADO DE OPERACIONES NORMADAS PARA EL TALLER </br>" . strtoupper($arg_data->entidad)
                . "</b></td>
                  </tr>
                <tr>
                  <td width='8%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>C&Oacute;DIGO</b></td>
                  <td width='54%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>OPERACI&Oacute;N</b></td>
                  <td width='20%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>ACTIVIDAD</b></td>
                  <td width='10%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>T.NORMA/COSTO</b></td>
                  <td width='8%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>TARIFA</b></td>
                </tr>
              ";
    }

    public function GetHtmlValues($argArrayBodyData, $agHeader, $TRBODYTABLE) {
        return $this->GetHTMLBodyFormat($agHeader, $this->GetBodyTable($TRBODYTABLE), $this->getFootTable(0, 0, 0, 0));
    }

    public function NumberRowsPaperFormat() {
        return $this->CasePaperFormat(array(30, 41), array(32, 40), array(27, 49), array(29, 54));
    }

    public function LengthStringPaperFormat(&$argField) {
        $argField = 'operacion';
        return $this->CasePaperFormat(array(60, 20), array(60, 26), array(33, 25), array(32, 23));
    }

    public function RowValues($j, $TR_TEXT, &$TR, $argData, &$FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE) {
        $td = "<td style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'>";
        $tdr = "<td style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;' align='right'>";
        $tdc = "<td style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;' align='center'>";
        if ($j == 0) {
            $TR.="<tr>
                  $td $argData->codigo</td>
                  $td $TR_TEXT</td>
                  $td $argData->actividad</td>
                  $tdr $argData->tnorma</td>
                  $tdc $argData->tarifa</td>
                </tr>";
        } else {
            $TR.= "<tr>
                  $td</td>
                  $td $TR_TEXT</td>
                  $td</td>
                  $td</td>
                  $td </td>
                </tr>";
        }
    }

    public function getFootTable($DIA, $MES, $YEAR, $USUARIO) {
        return "<table border='0' style='font-size:10pt; position:relative; border-collapse:collapse; border-spacing:0px; width:100%;'>
                  <tr>
                    <td height=50; style='text-align:right;' font-size:10pt;'>$this->gPageCount </td>
                  </tr>
                </table>";
    }

    public function setSheetHeader(PhpExcelRpt $excelRpt, & $argObjReport) {
        $COUNTCOLUMNS = count($argObjReport->columnModel);
        $excelRpt->mergeCells(0, $COUNTCOLUMNS - 1, 1, 1);
        $excelRpt->setValueCell(0, 1, $argObjReport->generalData->entidad, true);
        //begin customize
        $excelRpt->setAlignmentTextHorizontal(0, 1);
        $strFechaIni = "Fecha: " . strtoupper($this->gDate);
        $excelRpt->setValueCell(2, 2, $strFechaIni, true);
        $excelRpt->mergeCells(2, 3, 2, 2);
        $excelRpt->setAlignmentTextHorizontal(2, 2);
        //end customize
        $rowToWrite = $excelRpt->getNextRowToWrite();
        foreach ($argObjReport->columnModel as $indexColumn => $columna) {
            $excelRpt->setValueCell($indexColumn, $rowToWrite, strtoupper($columna->header), true);
            $excelRpt->setForeGroundCell($indexColumn, $rowToWrite, '00FFFFFF');
        }
    }

    public function setSheetFooter($excelRpt, & $argObjReport) {
        
    }

}
