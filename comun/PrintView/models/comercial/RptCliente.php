<?php

class RptCliente extends ElementsReport implements IExcel {

    private $gPageCount;
    private $gDate;

    public function __construct() {
        $this->fieldName = 'nombre';
        $this->gDate = Date('d/m/Y');
        $this->columnModel = array(
            0 => new ColumnModel('NOMBRE', 'nombre'),
            1 => new ColumnModel('ABREVIATURA', 'abreviatura'),
            2 => new ColumnModel('CÓDIGO REEUP', 'reeup'),
            3 => new ColumnModel('CÓDIGO NIT', 'nit'),
            4 => new ColumnModel('ORGANISMO', 'organismo')
        );
    }

    public function GetBlankRows($argArrayColumns) {
        return "";
    }

    public function GetHeadTable(&$PAINTEDROWS, $argArrayBodyData, $argPageCount, &$argArrayColumns) {

        $this->gPageCount = $argPageCount;
        return $this->GetHtmlHeadTable($this->generalData);
    }

    public function GetHtmlHeadTable($arg_data) {
        return "<table border='0' style='font-size:10pt; position:relative; border-collapse:collapse; border-spacing:0px; width:100%;'>
                <tr>
                    <td colspan='6' align='center' style='border:none;'><b>LISTADO DE CLIENTES DE <br>" . strtoupper($arg_data->entidad) . "</b></td>
                  </tr>
                  <tr>
                    <td colspan='6' align='right' style='border:none;'>Fecha: $this->gDate</td>
                  </tr>
                <tr>
                  <td width='35%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>NOMBRE</b></td>
                  <td width='15%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>ABREVIATURA</b></td>
                  <td width='15%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;' align='center'><b>C&Oacute;DIGO REEUP</b></td>
                  <td width='15%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;' align='center'><b>C&Oacute;DIGO NIT</b></td>
                  <td width='20%' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>ORGANISMO</b></td>
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
        return $this->CasePaperFormat(array(51, 40), array(52, 46), array(53, 45), array(52, 43));
    }

    public function RowValues($j, $TR_TEXT, &$TR, $argData, &$FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE) {
        $td = "<td style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'>";
        $td_center = "<td style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;' align='center'>";
        $TR .= "<tr>
                  $td $TR_TEXT</td>
                  $td $argData->abreviatura</td>
                  $td_center $argData->reeup</td>
                  $td_center $argData->nit</td>
                  $td $argData->organismo</td>
                </tr>";
    }

    public function getFootTable($DIA, $MES, $YEAR, $USUARIO) {
        return "";
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