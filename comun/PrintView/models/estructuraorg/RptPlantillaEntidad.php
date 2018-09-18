<?php

class RptPlantillaEntidad extends ElementsReport implements IExcel {

    private $gPageCount;

    public function __construct() {
        $this->fieldName = 'nombre';
        $this->columnModel = array(
            0 => new ColumnModel('NO.', 'No'),
            1 => new ColumnModel('AREA', 'abrevarea'),
            2 => new ColumnModel('CARGO', 'nombre'),
            3 => new ColumnModel('CATEGORIA. OCUP', 'categoria'),
//            4 => new ColumnModel('GRUPO ESCALA', 'grupoescala'),
            4 => new ColumnModel('SALARIO', 'salario', PHPExcel_Cell_DataType::TYPE_NUMERIC, PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1),
            5 => new ColumnModel('CANTIDAD', 'cantidad'),
            6 => new ColumnModel('DISPONIBLE', 'disponible')
        );
    }

    public function GetBlankRows($argArrayColumns) {
        $td = "<td style='text-align:center; border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'>&nbsp;</td>";
        return "<tr>$td $td $td $td $td $td $td</tr>";
    }

    public function GetHeadTable(&$PAINTEDROWS, $argArrayBodyData, $argPageCount, &$argArrayColumns) {
        $this->gPageCount = $argPageCount;
        return $this->GetHtmlHeadTable($this->generalData);
    }

    public function GetHtmlHeadTable($arg_data) {
        return "<table border='0' style='font-size:10pt; position:relative; border-collapse:collapse; border-spacing:0px;' width='100%'>
                <tr>
                    <td colspan='5' align='left' style='border:none;'><b>Plantilla de: </b>" . strtoupper($arg_data->entidad) . "</td>
                    <td colspan='2' align='right' style='border:none;'><b>Fecha: </b>" . $arg_data->fecha . "</td>
                  </tr>
                <tr>
                  <td width='5%' align='center' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>No.</b></td>
                  <td width='15%' align='center' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>&Aacute;rea</b></td>
                  <td width='25%' align='center' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>Cargo</b></td>
                  <td width='12%' align='center' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>Categor&iacute;a. ocup</b></td>
                  <td width='8%' align='center' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>Salario</b></td>
                  <td width='8%' align='center' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>Cantidad</b></td>
                  <td width='8%' align='center' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'><b>Disponible</b></td>
                </tr>
              ";
    }

    public function GetHtmlValues($argArrayBodyData, $agHeader, $TRBODYTABLE) {
        return $this->GetHTMLBodyFormat($agHeader, $this->GetBodyTable($TRBODYTABLE), $this->getFootTable(0, 0, 0, 0));
    }

    public function NumberRowsPaperFormat() {
        return $this->CasePaperFormat(array(31, 41), array(32, 40), array(27, 49), array(29, 54));
    }

    public function LengthStringPaperFormat(&$argField) {
        $argField = 'nombre';
        return $this->CasePaperFormat(array(65, 40), array(65, 40), array(33, 25), array(32, 23));
    }

    public function RowValues($j, $TR_TEXT, &$TR, $argData, &$FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE) {
        $td = "<td style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'>";
        $tdRight = "<td align='right' style='border-left: 1px solid; border-right: 1px solid; border-top: 1px solid; border-bottom: 1px solid;'>";
        if ($j == 0) {
            $TR.="<tr>
                  $td $argData->No</td>
                  $td $argData->abrevarea</td>
                  $td $TR_TEXT</td>
                  $td $argData->categoria</td>
<!--                 $tdRight $argData->grupoescala</td> -->
                  $tdRight $argData->salario</td>
                  $tdRight $argData->cantidad</td>
                  $tdRight $argData->disponible</td>
                </tr>";
        } else {
            $TR.= "<tr>
                  $td</td>
                  $td</td>
                  $td $TR_TEXT</td>
                  $td</td>
                  $td</td>
                  $td</td>
                  $td</td>
                </tr>";
        }
    }

    public function getFootTable($DIA, $MES, $YEAR, $USUARIO) {
        return "<table border='0' style='font-size:10pt; position:relative; border-collapse:collapse; border-spacing:0px;' width='100%'>
                  <tr>
                    <td height=50; style='text-align:right;'>$this->gPageCount </td>
                  </tr>
                </table>";
    }

    public function setSheetFooter($excelRpt, &$argObjReport) {
        
    }

    public function setSheetHeader(PhpExcelRpt $excelRpt, & $argObjReport) {
        $COUNTCOLUMNS = count($argObjReport->columnModel);
        $excelRpt->mergeCells(0, $COUNTCOLUMNS - 1, 1, 1);
        $excelRpt->setValueCell(0, 1, 'PLANTILLA DE ' . strtoupper($argObjReport->generalData->entidad), true);
        //begin customize
        $excelRpt->setAlignmentTextHorizontal(0, 1);
        $strFecha = "Fecha: " . strtoupper($argObjReport->generalData->fecha);
        $excelRpt->setValueCell(2, 2, $strFecha, true);
        $excelRpt->mergeCells(2, 3, 2, 2);
        $excelRpt->setAlignmentTextHorizontal(2, 2);
        //end customize
        $rowToWrite = $excelRpt->getNextRowToWrite();
        foreach ($argObjReport->columnModel as $indexColumn => $columna) {
            $excelRpt->setValueCell($indexColumn, $rowToWrite, strtoupper($columna->header), true);
            $excelRpt->setForeGroundCell($indexColumn, $rowToWrite, '00FFFFFF');
        }
    }

}
