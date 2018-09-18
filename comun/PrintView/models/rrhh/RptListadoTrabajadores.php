<?php

class RptListadoTrabajadores extends ElementsReport implements IExcel {

    private $gPageCount;
    private $gDate;

    public function __construct() {
        $this->fieldName = 'nombre';
        $this->gDate = Date('d/m/Y');
        $this->columnModel = array(
            0 => new ColumnModel('NOMBRE', 'nombre'),
            1 => new ColumnModel('C. IDENTIDAD', 'cidentidad'),
            2 => new ColumnModel('OCUPACIÓN', 'ocupacion'),
            3 => new ColumnModel('F. ENTRADA', 'fechaentrada'),
            4 => new ColumnModel('TELÉFONO', 'telefono'),
            5 => new ColumnModel('DIRECCIÓN', 'direccion')
        );
    }

    public function GetBlankRows($argArrayColumns) {
        $td = "<td style='text-align:center; border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'>&nbsp;</td>";
        return "<tr>$td $td $td $td $td $td</tr>";
    }

    public function GetHeadTable(&$PAINTEDROWS, $argArrayBodyData, $argPageCount, &$argArrayColumns) {

        $this->gPageCount = $argPageCount;
        return $this->GetHtmlHeadTable($this->generalData);
    }

    public function GetHtmlHeadTable($arg_data) {
        return "<table border='0' style='font-size:10pt; position:relative; border-collapse:collapse; border-spacing:0px; width:100%;'>
                <tr>
                    <td colspan='6' align='center' style='border:none;'><strong>PLANTILLA DE LOS TRABAJADORES DE <br>" . strtoupper($arg_data->entidad) . "</strong></td>
                  </tr>
                  <tr>
                    <td colspan='6' align='right' style='border:none;'>Fecha: $this->gDate</td>
                  </tr>
                <tr>
                  <td width='21%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><strong>NOMBRE</strong></td>
                  <td width='10%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><strong>C. IDENTIDAD</strong></td>
                  <td width='11%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><strong>OCUPACI&Oacute;N</strong></td>
                  <td width='9%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><strong>F. ENTRADA</strong></td>
                  <td width='8%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><strong>TEL&Eacute;FONO</strong></td>
                  <td width='41%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><strong>DIRECCI&Oacute;N</strong></td>
                </tr>
              ";
    }

    public function GetHtmlValues($argArrayBodyData, $agHeader, $TRBODYTABLE) {
        return $this->GetHTMLBodyFormat($agHeader, $this->GetBodyTable($TRBODYTABLE), $this->getFootTable(0, 0, 0, 0));
    }

    public function NumberRowsPaperFormat() {
        return $this->CasePaperFormat(array(26, 41), array(27, 40), array(27, 49), array(29, 54));
    }

    public function LengthStringPaperFormat(&$argField) {
        $argField = 'nombre';
        return $this->CasePaperFormat(array(31, 20), array(32, 26), array(33, 25), array(32, 23));
    }

    public function RowValues($j, $TR_TEXT, &$TR, $argData, &$FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE) {
        $td = "<td style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'>";
        $TR .= "<tr>
                  $td $argData->nombre $argData->apellidos</td>
                  $td $argData->cidentidad</td>
                  $td $argData->ocupacion</td>
                  $td $argData->fechaentrada</td>
                  $td $argData->telefono</td>
                  $td $argData->direccion</td>
                </tr>";
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