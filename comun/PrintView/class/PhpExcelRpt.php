<?php

require_once($_SERVER['DOCUMENT_ROOT'] . "/lib/php/PHPExcel/PHPExcel.php");
define('EOL', (PHP_SAPI == 'cli') ? PHP_EOL : '<br />');

class PhpExcelRpt {

    protected $objPHPExcel;
    protected $arrayObjRpt;
    protected $titleExcel;
    protected $titleSheet;
    protected $excelType = "2007x2003";
    protected $propertiesExcel = array();
    protected $columnModel = array();
    protected $typeScale;
    protected $sizeScale;
    protected $fit2Width;
    protected $fit2Height;
    protected $sheetSize;
    protected $sheetBreak;

    public function __construct($argArrayObjReport, $argReportFormat) {
        if (count($argArrayObjReport) > 0) {
            $this->arrayObjRpt = $argArrayObjReport;
            $this->setActiveSheetExcel(0);
            $this->setExcelOrientation($argReportFormat[1]);
            $this->setExcelScale($this->arrayObjRpt[0]);
            $this->setSizeSheet($argReportFormat[2]);
            $this->setPropertiesExcel($this->arrayObjRpt->propertiesExcel);
            $this->arrayObjRpt[0]->excelType = (strlen($this->arrayObjRpt[0]->excelType) > 0) ? $this->arrayObjRpt[0]->excelType : "2007";
            $this->setExcel($this->arrayObjRpt);
        }
        $this->objPHPExcel = new PHPExcel();
        $this->objPHPExcel->getDefaultStyle()->getFont()->setName('Arial');
        $this->objPHPExcel->getDefaultStyle()->getFont()->setSize(10);
    }

    public function __destruct() {
        $this->objPHPExcel->disconnectWorksheets();
        unset($this->objPHPExcel);
    }

    public function setExcelOrientation($argOrientation) {
        if ($argOrientation == "L") {
            $this->objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE); //L
        } else {
            $this->objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_PORTRAIT); //P
        }
    }

    public function setExcelScale($argObjReport) {
        if ($argObjReport->typeScale == "porciento") {
            $percent = $argObjReport->sizeScale;
            $this->objPHPExcel->getActiveSheet()->getPageSetup()->setFitToPage(false);
            $this->objPHPExcel->getActiveSheet()->getPageSetup()->setScale($percent);
        } else {//Ancho
            $fitToWidth = $argObjReport->fit2Width;
            $fitToHeight = $argObjReport->fit2Height;
            $this->objPHPExcel->getActiveSheet()->getPageSetup()->setFitToWidth($fitToWidth); //dispara setFitToPage(true)
            $this->objPHPExcel->getActiveSheet()->getPageSetup()->setFitToHeight($fitToHeight);
        }
    }

    public function setSizeSheet($argPaperSize) {
        switch ($argPaperSize) {
            case "A4": {
                    $this->objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
                }
                break;
            case "LETTER": {
                    $this->objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_LETTER);
                }
                break;
            case "FOLIO": {
                    $this->objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_FOLIO);
                }
                break;
            case "LEGAL": {
                    $this->objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_LEGAL);
                }
                break;
            default : {
                    $this->objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::ORIENTATION_DEFAULT);
                }
                break;
        }
    }

    public function setActiveSheetExcel($argIndexSheet = 0) {
        $this->objPHPExcel->setActiveSheetIndex($argIndexSheet);
    }

    public function getActiveSheetExcel() {
        return $this->objPHPExcel->getActiveSheet();
    }

    public function setTitleSheetExcel($argIndexSheet, $argNameSheet) {
        $this->objPHPExcel->getSheet($argIndexSheet)->setTitle($argNameSheet);
    }

    public function getSheetExcelByName($argNameSheet) {
        return $this->objPHPExcel->getSheetByName($argNameSheet);
    }

    public function getSheetExcelByIndex($argIndexSheet) {
        return $this->objPHPExcel->getSheet($argIndexSheet);
    }

    public function getSheetsCount() {
        return $this->objPHPExcel->getSheetCount();
    }

    public function setPropertiesExcel($argArrayProperties = array()) {
        $propiedades = $this->objPHPExcel->getProperties();
        if ($argArrayProperties['creator']) {
            $propiedades->setCreator($argArrayProperties['creator']);
        }
        if ($argArrayProperties['modify']) {
            $propiedades->setLastModifiedBy($argArrayProperties['modify']);
        }
        if ($argArrayProperties['title']) {
            $propiedades->setTitle($argArrayProperties['title']);
        }
        if ($argArrayProperties['subject']) {
            $propiedades->setSubject($argArrayProperties['subject']);
        }
        if ($argArrayProperties['description']) {
            $propiedades->setDescription($argArrayProperties['description']);
        }
        if ($argArrayProperties['keywords']) {
            $propiedades->setKeywords($argArrayProperties['keywords']);
        }
        if ($argArrayProperties['created']) {
            $propiedades->setCreated($argArrayProperties['created']);
        }
        if ($argArrayProperties['modified']) {
            $propiedades->setModified($argArrayProperties['modified']);
        }
        if ($argArrayProperties['company']) {
            $propiedades->setCompany($argArrayProperties['modified']);
        }
        if ($argArrayProperties['manager']) {
            $propiedades->setManager($argArrayProperties['manager']);
        }
    }

    public function setLanguage($argLanguage = 'es') {
        $validLocale = PHPExcel_Settings::setLocale($argLanguage);
        if (!$validLocale) {
            echo 'No es posible cargar el idioma ' . $argLanguage . " - por defecto se cargar&aacute; en_us<br />\n";
        }
    }

    public function getCell($argIndexColum, $argIndexRow) {
        $coordinate = $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argIndexColum, $argIndexRow)->getCoordinate();
        return $coordinate;
    }

    public function getCellByCoordinates($argCoordenada) {
        return $this->objPHPExcel->getActiveSheet()->getCell($argCoordenada);
    }

    public function getValueCell($argColumna, $argFila) {
        return $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argColumna, $argFila)->getValue();
    }

    public function getValueCellByCoordinates($argCoordenada) {
        return $this->objPHPExcel->getActiveSheet()->getCell($argCoordenada)->getValue();
    }

    public function setValueCell($argColumna, $argFila, $argValor, $argAutoSize = true) {
        $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($argColumna, $argFila, $argValor);
        $this->objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($argColumna)->setAutoSize($argAutoSize);
        return $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argColumna, $argFila);
    }

    public function setValueCellType($argIndexColumn, $argIndexRow, $argValue, $argValueType = PHPExcel_Cell_DataType::TYPE_STRING, $argValueFormat = null) {
        $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argIndexColumn, $argIndexRow)->setValueExplicit($argValue, $argValueType);
        if ($argValueFormat !== null) {
            $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getNumberFormat()->setFormatCode($argValueFormat);
        }
        $this->objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($argIndexColumn)->setAutoSize(true);
        return $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argIndexColumn, $argIndexRow);
    }

    private function setValueCellTypeFormatDate($argIndexColumn, $argIndexRow, $argDate, $argValueType, $argValueFormat) {
        if (strpos($argDate, "-") != false) {
            $dateFormat = explode('-', $argDate);
            $result = PHPExcel_Shared_Date::FormattedPHPToExcel($dateFormat[0], $dateFormat[1], $dateFormat[2]);
        } else {
            $dateFormat = explode('/', $argDate);
            $result = PHPExcel_Shared_Date::FormattedPHPToExcel($dateFormat[2], $dateFormat[1], $dateFormat[0]);
        }
        $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argIndexColumn, $argIndexRow)->setValueExplicit($result, $argValueType);
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getNumberFormat()->setFormatCode($argValueFormat);
        $this->objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($argIndexColumn)->setAutoSize(true);
        return $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argIndexColumn, $argIndexRow);
    }

    public function addNewSheet($argNombre = '') {
        $this->objPHPExcel->createSheet();
        $numHoja = $this->objPHPExcel->getSheetCount();
        $this->objPHPExcel->setActiveSheetIndex($numHoja - 1);
        if ($argNombre && strlen($argNombre) > 0) {
            $this->objPHPExcel->getActiveSheet()->setTitle($argNombre);
        } else {
            $this->objPHPExcel->getActiveSheet()->setTitle("Hoja " . $numHoja++);
        }
    }

    public function addNewSheetByIndex($argNameSheet, $argIndexSheet) {
        $myWorkSheet = new PHPExcel_Worksheet($this->objPHPExcel, $argNameSheet);
        $this->objPHPExcel->addSheet($myWorkSheet, $argIndexSheet);
    }

    public function deleteSheetByName($argNameSheet) {
        $sheetIndex = $this->objPHPExcel->getIndex($this->objPHPExcel->getSheetByName($argNameSheet));
        $this->objPHPExcel->removeSheetByIndex($sheetIndex);
    }

    public function deleteSheetByIndex($sheetIndex) {
        $this->objPHPExcel->removeSheetByIndex($sheetIndex);
    }

    public function mergeCells($argColumnaInicio, $argColumnaFin, $argFilaInicio, $argFilaFin) {
        $this->objPHPExcel->getActiveSheet()->mergeCellsByColumnAndRow($argColumnaInicio, $argFilaInicio, $argColumnaFin, $argFilaFin);
    }

    public function unmergeCell($argColumnaInicio, $argColumnaFin, $argFilaInicio, $argFilaFin) {
        $this->objPHPExcel->getActiveSheet()->unmergeCellsByColumnAndRow($argColumnaInicio, $argColumnaFin, $argFilaInicio, $argFilaFin);
    }

    public function setWidthColumn($argColumna, $argAncho) {
        $this->objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($argColumna)->setWidth($argAncho);
    }

    public function setWidthColumnAutoFit($argIndexColumn) {
        $this->objPHPExcel->getActiveSheet()->getColumnDimensionByColumn($argIndexColumn)->setAutoSize(true);
    }

    public function getNextRowToWrite() {
        $highestRow = $this->objPHPExcel->getActiveSheet()->getHighestRow();
        return $highestRow + 1;
    }

    public function getLastRowWritenn() {
        $highestRow = $this->objPHPExcel->getActiveSheet()->getHighestRow();
        return $highestRow;
    }

    public function getNextRowToWriteBySheet($argIndexSheet = null, $argNameSheet = '') {

        if ($argIndexSheet !== null) {
            $highestRow = $this->objPHPExcel->getSheet($argIndexSheet)->getHighestRow();
        } elseif (!isset($argIndexSheet) && strlen($argNameSheet) > 0) {
            $highestRow = $this->objPHPExcel->getSheetByName($argNameSheet)->getHighestRow();
        }
        return $highestRow;
    }

    public function setValueCellDate($argIndexColumn, $argIndexRow, $argDate, $argFormatDate = PHPExcel_Style_NumberFormat::FORMAT_DATE_DDMMYYYY) {
        PHPExcel_Cell::setValueBinder(new PHPExcel_Cell_AdvancedValueBinder());
        $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($argIndexColumn, $argIndexRow, $argDate);
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getNumberFormat()->setFormatCode($argFormatDate);
    }

    public function setValueCellNumeric($argIndexColumn, $argIndexRow, $argNumber) {
        $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argIndexColumn, $argIndexRow)->setValueExplicit($argNumber, PHPExcel_Cell_DataType::TYPE_NUMERIC);
    }

    public function setValueCellUrl($argIndexColumn, $argIndexRow, $argValue, $argHyperLink) {
        $this->objPHPExcel->getActiveSheet()->setCellValueByColumnAndRow($argIndexColumn, $argIndexRow, $argValue);
        $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argIndexColumn, $argIndexRow)->getHyperlink()->setUrl($argHyperLink);
    }

    public function setValueCellFont($argIndexColumn, $argIndexRow, $argTipoLetra = 'Arial', $argSize = 8) {
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getFont()->setName($argTipoLetra);
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getFont()->setSize($argSize);
    }

    public function setFormatCellNumeric($argIndexColumn, $argIndexRow, $argFormatNumber = PHPExcel_Style_NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1) {
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getNumberFormat()->setFormatCode($argFormatNumber);
    }

    public function addNewLineCell($argIndexColumn, $argIndexRow, $argValue) {
        $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argIndexColumn, $argIndexRow)->setValue($argValue);
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getAlignment()->setWrapText(true);
    }

    public function setAlignmentTextHorizontal($argIndexColumn, $argIndexRow, $argTipoOrientation = PHPExcel_Style_Alignment::HORIZONTAL_CENTER) {
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getAlignment()->setHorizontal($argTipoOrientation);
    }

    public function getSyleCell($argIndexColumn, $argIndexRow) {
        return $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow);
    }

    public function setForeGroundCell($argIndexColumn, $argIndexRow, $argColorARGB) {
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getBorders()->getTop()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getBorders()->getBottom()->setBorderStyle(PHPExcel_Style_Border::BORDER_THIN);
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getFill()->getStartColor()->setARGB($argColorARGB);
    }

    public function setForeGroundCellRange($argIndexColumnStart, $argIndexRowStart, $argIndexColumnEnd, $argIndexRowEnd, $argColorARGB) {
        $coordinatesStart = $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argIndexColumnStart, $argIndexRowStart)->getCoordinate();
        $coordinatesEnd = $this->objPHPExcel->getActiveSheet()->getCellByColumnAndRow($argIndexColumnEnd, $argIndexRowEnd)->getCoordinate();
        $coordinates = $coordinatesStart . ":" . $coordinatesEnd;
        $this->objPHPExcel->getActiveSheet()->getStyle()->getFill($coordinates)->setFillType(PHPExcel_Style_Fill::FILL_SOLID);
        $this->objPHPExcel->getActiveSheet()->getStyle($coordinates)->getFill()->getStartColor()->setARGB($argColorARGB);
    }

    public function setAlignmentTextVertical($argIndexColumn, $argIndexRow, $argTipoOrientation = PHPExcel_Style_Alignment::VERTICAL_CENTER) {
        $this->objPHPExcel->getActiveSheet()->getStyleByColumnAndRow($argIndexColumn, $argIndexRow)->getAlignment()->setVertical($argTipoOrientation);
    }

    public function setAutoFilterColumn($argIndexColumnInicio, $argIndexRowInicio, $argIndexColumnFin, $argIndexRowFin) {
        $this->objPHPExcel->getActiveSheet()->setAutoFilterByColumnAndRow($argIndexColumnInicio, $argIndexRowInicio, $argIndexColumnFin, $argIndexRowFin);
    }

    public function setExcel($argArrayObjReport, $argBeginWriteData = 'A1', $argNameSheet = 'Hoja ') {
        try {
            $numHoja = $this->objPHPExcel->getSheetCount();
            foreach ($argArrayObjReport as $key => $objReport) {
                $this->objPHPExcel->createSheet($key);
                $this->objPHPExcel->setActiveSheetIndex($key);
                $this->objPHPExcel->getActiveSheet()->setTitle($argNameSheet . $numHoja++);
                $objReport->setSheetHeader($this, $objReport);
                $beginWriteData = $this->getCell(0, $this->getNextRowToWrite());
                $this->bindDataFromArray($objReport, null, $beginWriteData);
                $objReport->setSheetFooter($this, $objReport);
                $titleExcel = preg_replace('/\s/', '_', $objReport->generalData->titulo);
            }
            $this->objPHPExcel->setActiveSheetIndex(0);
            switch ($argArrayObjReport[0]->excelType) {
                case "2003": {
                        $this->saveExcel2003($titleExcel);
                    }
                    break;
                case "2007x2003": {
                        $this->saveExcel2007Compatible2003($titleExcel, true);
                    }
                    break;
                default : {
                        $this->saveExcel2007Compatible2003($titleExcel, true);
                    }
                    break;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function setBodyDataFromSimpleArray($argObjReport, $beginWriteData) {
        $this->objPHPExcel->getActiveSheet()->fromArray($argObjReport->bodyData, NULL, $beginWriteData);
    }

    public function bindDataFromArray($argDataSource = null, $nullValue = null, $startCell = 'A1') {
        try {
            list ($startColumn, $startRow) = PHPExcel_Cell::coordinateFromString($startCell);
            foreach ($argDataSource->bodyData as $rowData) {
                foreach ($argDataSource->columnModel as $indexColumn => $cm) {
                    $binder = $cm->dataIndex;
                    if ($cm->dataFormat) {
                        if ($cm->dataFormat == PHPExcel_Style_NumberFormat::FORMAT_DATE_DDMMYYYY) {
                            $this->setValueCellTypeFormatDate($indexColumn, $startRow, $rowData->{$binder}, $cm->dataType, $cm->dataFormat);
                        } else {
                            $this->setValueCellType($indexColumn, $startRow, $rowData->{$binder}, $cm->dataType, $cm->dataFormat);
                        }
                    } else {
                        $this->setValueCellType($indexColumn, $startRow, $rowData->{$binder});
                    }
                }
                ++$startRow;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    public function saveExcel2003($argNombreExcel) {
        ob_end_clean();
        header('Content-Type: application/vnd.ms-excel; charset=utf-8');
        header('Content-Disposition: attachment;filename="' . strtoupper($argNombreExcel) . '.xls"');
        header('Cache-Control: max-age=0');
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
        $objWriter = PHPExcel_IOFactory::createWriter($this->objPHPExcel, 'Excel5');
        ob_end_clean();
        echo json_encode($objWriter->save('php://output'));
        exit;
    }

    public function saveExcel2007Compatible2003($argNombreExcel, $compatibility = true) {
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8');
        header('Content-Disposition: attachment;filename=' . strtoupper($argNombreExcel) . '.xlsx');
        header('Cache-Control: max-age=0');
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
        header('Cache-Control: cache, must-revalidate');
        header('Pragma: public');
        $objWriter = new PHPExcel_Writer_Excel2007($this->objPHPExcel);
        if ($compatibility) {
            $objWriter->setOffice2003Compatibility($compatibility);
        }
        ob_clean();
        $objWriter->save('php://output');
        exit;
    }

}
