<?php

require_once($_SERVER['DOCUMENT_ROOT'] . "/lib/php/Mpdf/mpdf/mpdf.php");
define('_SF', (72 / 2.54));
define('_SFpx', (96 / 72));

class CoreReport {

    private $_mPDF;
    private $_htmlExcel;
    private $objReport;
    private $gMETA = "<meta charset=\"UTF-8\" />";
    private $gDATAHTML = "";
    private $PAGE_COUNT = 0;
    private $gDatoCuerpoWithoutPaging;
    private $gTextTruncated;
    private $gArrayTextTruncated;
    private $gCountArrayTextTruncated;
    private $gWidth;
    private $gHeight;
    private $docRoot;

    public function __construct($argReportFormat, $agArrayReport) {
        $this->docRoot = $_SERVER['DOCUMENT_ROOT'];
        foreach ($agArrayReport as $this->objReport) {
            $this->PAGE_COUNT++;
            $this->objReport->REPORT_TYPE = $argReportFormat[0];
            $this->objReport->REPORT_ORIENTATION = ($argReportFormat[1] == "Horizontal") ? "L" : "P";
            $this->objReport->REPORT_PAPERSIZE = ($this->objReport->REPORT_ORIENTATION == "L") ? $argReportFormat[2] . "-" . $this->objReport->REPORT_ORIENTATION : $argReportFormat[2];
            $this->objReport->FORMAT_PAPERSIZE = $argReportFormat[2];
            $this->objReport->excelType = "2003";
            $this->gDatoCuerpoWithoutPaging = array();
            $this->gTextTruncated = "";
            $this->gArrayTextTruncated = array();
            $this->gCountArrayTextTruncated = 0;
            $this->HtmlWritenPagingRows($this->objReport, $this->objReport->bodyData, array(), $this->objReport->fieldName);
        }
        $DATAHTMLBODY = "<body style='font-family: sans-serif; font-size:9pt;'>$this->gDATAHTML</body>";
        $utf8 = array("Á" => "á", "É" => "é", "Í" => "í", "Ó" => "ó", "Ú" => "ú");
        $tituloRpt = strtr(strtoupper(str_replace(" ", "_", $this->objReport->generalData->titulo)), $utf8);
        switch ($this->objReport->REPORT_TYPE) {
            case "PDF": {
                    $this->_mPDF = new mPDFClass($this->objReport->REPORT_PAPERSIZE, $this->objReport->REPORT_ORIENTATION);
                    return $this->_mPDF->add_html("<!DOCTYPE html><html><head>$this->gMETA</head>$DATAHTMLBODY</html>")->download($tituloRpt);
                } break;
            case "HTML": echo ("<html><head>$this->gMETA" . $this->GetSTYLECSSHTML() . "</head>$DATAHTMLBODY</html>");
                break;
            case "EXCEL": {
                    require_once($this->docRoot . "/comun/PrintView/class/PhpExcelRpt.php");
                    new PhpExcelRpt($agArrayReport, $argReportFormat);
                }
                break;
            default : echo "UPS! ESTE TIPO DE REPORTE NO SE HA CONFIGURADO.";
        }
        exit;
    }

    public function HtmlWritenPagingRows($argReport, $argArrayBodyData, $argArrayColumns, $argFieldName, $argInitialEntry = true) {
        $ROWSTOPAINT = $argReport->NumberRowsPaperFormat();
        $PAINTEDROWS = 0;
        $TRBODYTABLE = "";
        $COUNT = count($argArrayBodyData);
        $REMAINING = $COUNT;
        $FLAGDECREMNT = false;
        $ENDREPORTPAGE = false;
        $FORMATPESOCOLUMNS = array();

        $HEADTABLE = $argReport->GetHeadTable($PAINTEDROWS, $argArrayBodyData, $this->PAGE_COUNT, $argArrayColumns);

        if (count($argArrayColumns) > 0) {
            $argReport->ResetValuesColumns($argArrayColumns);
        }
        foreach ($argArrayBodyData as $i => $data) {
            if ($PAINTEDROWS < $ROWSTOPAINT) {

                if ($argReport instanceof IEStrategyAdicionalPages) {
                    $this->gDatoCuerpoWithoutPaging[] = $data;
                }

                if ($data->$argFieldName == $argReport->textPageBreak || $i == ($COUNT - 1)) {
                    $ENDREPORTPAGE = true;

                    $TRLASTPAGE = $this->GetRowValues($argReport, $data, $argFieldName, $PAINTEDROWS, $ROWSTOPAINT, $FORMATPESOCOLUMNS, $argArrayBodyData, $i, $REMAINING, $FLAGDECREMNT, $argArrayColumns);
                    $TRWHITE = $this->PaintBlankRows($PAINTEDROWS, $ROWSTOPAINT, $argReport->GetBlankRows($argArrayColumns));

                    $TRBODYTABLE .= ($data->$argFieldName == $argReport->textPageBreak) ? $TRWHITE . $TRLASTPAGE : $TRLASTPAGE . $TRWHITE;

                    $this->AddHtml($argReport->GetHtmlValues($argArrayBodyData, $HEADTABLE, $TRBODYTABLE));

                    if ($argInitialEntry) {
                        $argReport->gPaintColumns = array();
                    }

                    if ($argReport instanceof IEStrategyAdicionalPages) {
                        $this->HtmlWritenAdicionalPage($argReport, $this->gDatoCuerpoWithoutPaging, $data);
                    }
                } else if ($argReport->activeSumarize) {
                    $TRBODYTABLE .= $this->GetRowValues($argReport, $data, $argFieldName, $PAINTEDROWS, $ROWSTOPAINT, $FORMATPESOCOLUMNS, $argArrayBodyData, $i, $REMAINING, $FLAGDECREMNT, $argArrayColumns, $this->IsRowSummarizingSaldo($argReport, $data->$argFieldName), false);
                } else {
                    $TRBODYTABLE .= $this->GetRowValues($argReport, $data, $argFieldName, $PAINTEDROWS, $ROWSTOPAINT, $FORMATPESOCOLUMNS, $argArrayBodyData, $i, $REMAINING, $FLAGDECREMNT, $argArrayColumns);
                }
            } elseif (!$ENDREPORTPAGE) {
                $this->AddHtml($argReport->GetHtmlValues($argArrayBodyData, $HEADTABLE, $TRBODYTABLE));
                BREAK;
            } else {
                BREAK;
            }
        }

        if ($REMAINING > 0 || (!$argInitialEntry && count($argReport->bodyDataCopy) > 0)) {
            $this->NewPage($argReport->REPORT_PAPERSIZE);
            if ($REMAINING > 0) {
                $argArrayBodyData = $this->UpdateArrayBodyData(($FLAGDECREMNT) ? ($i - 1) : $i, $argArrayBodyData, $COUNT);
                $this->HtmlWritenPagingRows($argReport, $argArrayBodyData, $argArrayColumns, $argFieldName, $argInitialEntry);
            } else {
                $this->HtmlWritenPagingRowsAndColumns($argReport, $argReport->bodyDataCopy, $argReport->generalData->columnas, $argFieldName);
            }
        } elseif ($argInitialEntry) {
            return $this->gDATAHTML .= $argReport->HTML_PAGES;
        }
    }

    public function HtmlWritenPagingRowsAndColumns($argReport, $argArrayBodyData, $arrayColumnsAdd, $argFieldName) {
        $pagingColumns = $argReport->NumberColumnsPaperFormat();
        $argReport->bodyDataCopy = array();
        $this->gDatoCuerpoWithoutPaging = array();
        return $this->HtmlWritenPagingRows($argReport, $argArrayBodyData, $this->GetPaggingColumns($argReport, $arrayColumnsAdd, $pagingColumns), $argFieldName, false);
    }

    public function HtmlWritenAdicionalPage($argReport, $argArrayBodyData, $argData) {
        $arrayFootData = ($argReport instanceof IEStrategyColumns) ? $argReport->GetNewObjectWithAdditionalData($argArrayBodyData) : $argReport->GetNewObjectWithAdditionalData($argData);
        if (count($arrayFootData) > 0) {
            $this->NewPage($argReport->REPORT_PAPERSIZE);
            $newObjReport = $argReport->InstanceFactoryCreate($arrayFootData);
            if ($argReport instanceof IEStrategyColumns) {
                $this->HtmlWritenPagingRowsAndColumns($newObjReport, $arrayFootData, $newObjReport->gPaintColumns, $newObjReport->fieldName);
            } else {
                $this->HtmlWritenPagingRows($newObjReport, $arrayFootData, array(), $newObjReport->fieldName, false);
            }
        }
    }

    public function GetRowValues($argReport, $argData, $argFieldName, & $PAINTEDROWS, & $ROWSTOPAINT, & $FORMATPESOCOLUMNS, $argArrayBodyData, $i, & $REMAINING, & $FLAGDECREMNT, $argArrayColumns, $keepCero = true, $ENDPAGE = true) {
        $TEXTLENGTH = $argReport->LengthStringPaperFormat($argField);
        $TEXT = (strlen($argField) > 0) ? $argData->$argField : $argData->$argFieldName;

        if (strcmp($this->gTextTruncated, $TEXT) !== 0) {
            $this->gArrayTextTruncated = ($TEXTLENGTH > 0 && strlen($TEXT) > 0 && !$argReport->IsSubTotalRow($TEXT) && $TEXT != $argReport->textPageBreak) ? $this->myTruncate($TEXT, $TEXTLENGTH) : array($TEXT);
            $this->gTextTruncated = $TEXT;
            $this->gCountArrayTextTruncated = count($this->gArrayTextTruncated);
        }

        if (!isset($argReport->fieldDate))
            if (strlen($argData->{$argReport->fieldDate}) > 0) {
                list($year, $month, $day) = explode('-', $argData->{$argReport->fieldDate});
                $argData->{$argReport->fieldDate} = date("d/m/Y", mktime(0, 0, 0, $month, $day, $year));
            }

        if ($i == 0 && $argReport instanceof IEStrategySetSummary) {
            $CURRENTPAGE = $this->PAGE_COUNT;
            $PREVIOUSPAGE = $CURRENTPAGE - 1;
            $TR = $this->GetSumaAcumuladaFolio($argReport, "<strong>VIENEN DEL FOLIO No.$PREVIOUSPAGE</strong>", $FORMATPESOCOLUMNS, $PREVIOUSPAGE);
            if (strlen($TR) > 0) {
                $PAINTEDROWS++;
            }
        }
        $TOTAL_ROWS = $PAINTEDROWS + $this->gCountArrayTextTruncated;
        $ADICIONAL_ROWS = ($argReport instanceof IEStrategySetSummary) ? 2 : 0;
        $LEFTONE_ADICIONAL_ROWS = ($ADICIONAL_ROWS > 0) ? 1 : 0;
        if ($TOTAL_ROWS < $ROWSTOPAINT - $ADICIONAL_ROWS ||
                $TOTAL_ROWS <= $ROWSTOPAINT && $ENDPAGE || (($TOTAL_ROWS <= $ROWSTOPAINT - $LEFTONE_ADICIONAL_ROWS && $TOTAL_ROWS >= $ROWSTOPAINT - $ADICIONAL_ROWS) && ((!$argReport->IsSubTotalRow($argArrayBodyData[$i]->$argFieldName) && !$argReport->IsSubTotalRow($argArrayBodyData[$i + 1]->$argFieldName)) || ($argReport->IsSubTotalRow($argArrayBodyData[$i]->$argFieldName) && ($argArrayBodyData[$i + 1]->$argFieldName == $argReport->textPageBreak || !$argReport->IsSubTotalRow($argArrayBodyData[$i + 1]->$argFieldName)))))) {
            $this->RowValues($argReport, $TR, $argData, $FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE, $PAINTEDROWS);
            $REMAINING--;
        } else {
            $FLAGDECREMNT = true;
        }

        if ((($FLAGDECREMNT && $TOTAL_ROWS >= $ROWSTOPAINT - $ADICIONAL_ROWS) || (!$FLAGDECREMNT && $TOTAL_ROWS == $ROWSTOPAINT - $LEFTONE_ADICIONAL_ROWS)) && !$ENDPAGE && ($argReport instanceof IEStrategySetSummary || $argReport instanceof IEStrategySummary)) {
            $CURRENTPAGE = $this->PAGE_COUNT;
            $PREVIOUSPAGE = $CURRENTPAGE - 1;
            $NEXTPAGE = $CURRENTPAGE + 1;
            $TRSALDOFOLIO = $this->SetSumaAcumuladaFolio($argReport, "<strong>PASAN AL FOLIO No.$NEXTPAGE</strong>", (count($argReport->arrayColumnsSaldoFolio) > 0) ? $argReport->arrayColumnsSaldoFolio : $argArrayBodyData, $argFieldName, ($FLAGDECREMNT) ? $i - 1 : $i, $FORMATPESOCOLUMNS, $CURRENTPAGE, $PREVIOUSPAGE);
            if (strlen($TRSALDOFOLIO) > 0) {
                $TR .= $TRSALDOFOLIO;
                $PAINTEDROWS++;
            }
            $TR .= $this->PaintBlankRows($PAINTEDROWS, $ROWSTOPAINT, $argReport->GetBlankRows($argArrayColumns));
        }
        return $TR;
    }

    public function myTruncate($cadena, $long_min, & $arrayCadena = array()) {
        $cadena = rtrim(trim($cadena));
        if (strlen($cadena) <= $long_min) {
            $subCadena = $cadena;
        } else {
            $subCadena = substr($cadena, 0, $long_min);
            $posFinCadena = strrpos($subCadena, " ");
            if ($posFinCadena != false) {
                $subCadena = substr($cadena, 0, $posFinCadena);
            }
        }
        $arrayCadena[] = $subCadena;
        $cadenaResto = substr($cadena, strlen($subCadena), strlen($cadena));
        if (strlen($cadenaResto) > 0) {
            $this->myTruncate($cadenaResto, $long_min, $arrayCadena);
        }
        return $arrayCadena;
    }

    public function GetSumaAcumuladaFolio($argReport, $TEXTSALDOFOLIO, & $FORMATPESOCOLUMNS, $PREVIOUSPAGE) {
        $TEXTALTERNATIVO = "<strong>DEL FOLIO No. $PREVIOUSPAGE</strong>";
        if (isset($argReport->arraySumaAcumulada[$PREVIOUSPAGE])) {
            if (count($argReport->arraySumaAcumulada[$PREVIOUSPAGE]) > 0) {
                return $argReport->GetSumaAcumuladaFolio($TEXTALTERNATIVO, $TEXTSALDOFOLIO, $FORMATPESOCOLUMNS, $PREVIOUSPAGE);
            }
        }
        return "";
    }

    public function SetSumaAcumuladaFolio($argReport, $TEXTSALDOFOLIO, $argArrayBodyData, $argFieldName, $i, & $FORMATPESOCOLUMNS, $CURRENTPAGE, $PREVIOUSPAGE) {
        $TEXTALTERNATIVO = "<strong>AL FOLIO No." . ($CURRENTPAGE + 1) . "</strong>";
        return $argReport->SetSumaAcumuladaFolio($TEXTALTERNATIVO, $TEXTSALDOFOLIO, $argArrayBodyData, $argFieldName, $i, $PREVIOUSPAGE, $CURRENTPAGE, $FORMATPESOCOLUMNS);
    }

    public function RowValues($argReport, & $TR, $argData, & $FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE, & $PAINTEDROWS) {
        foreach ($this->gArrayTextTruncated as $j => $TR_TEXT) {
            if ($argReport instanceof IEStrategyColumnsGrow) {
                $this->rowValuesColumns($argReport, $argReport->gClassification, $j, $TR_TEXT, $TR, $argData, $FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE);
            } else {
                $argReport->RowValues($j, $TR_TEXT, $TR, $argData, $FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE);
            }

            $PAINTEDROWS++;
        }
    }

    public function rowValuesColumns($argReport, $fieldValueContainColumns, $j, $TR_TEXT, & $TR, $argData, & $FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE) {
        $ARRAYTDCOLUMNS = array();
        $COLUMNASFORUPDATE = array();
        $sumaParcialFila = 0;

        foreach ($argArrayColumns as $columns) {
            $ARRAYTDCOLUMNS[] = "<td style='border-top:1px solid !important; text-align:right; vertical-align:middle;'>&nbsp;</td>";
        }

        if ($ENDPAGE) {
            $argReport->gHtmlRowTotal = $ARRAYTDCOLUMNS;
        }

        $countColumnsDato = count($argData->$fieldValueContainColumns);
        if ($countColumnsDato > 0) {
            foreach ($argData->$fieldValueContainColumns as $COLUMN) {
                $index = $argReport->GetIndexKey($argArrayColumns, $COLUMN[0]);
                if ($index >= 0) {
                    $sumaParcialFila += $COLUMN[1];
                    $ARRAYTDCOLUMNS[$index] = str_replace("&nbsp;", $argReport->ColumnsFormat($FORMATPESOCOLUMNS, $COLUMN[0], $COLUMN[1], $keepCero, $keepCero), $ARRAYTDCOLUMNS[$index]);
                    $argReport->arrayColumnsSaldoFolio[$index] = (isset($argReport->arrayColumnsSaldoFolio[$index])) ? $argReport->arrayColumnsSaldoFolio[$index] + $COLUMN[1] : $COLUMN[1];
                } else {
                    $COLUMNASFORUPDATE [] = $COLUMN;
                }
            }
        }

        $argReport->arrayColumnsSaldoFolio[-1] += $sumaParcialFila;

        if (count($COLUMNASFORUPDATE) <= $countColumnsDato) {
            if (count($COLUMNASFORUPDATE) > 0) {
                $argData->$fieldValueContainColumns = $COLUMNASFORUPDATE;
                $argReport->bodyDataCopy[] = $argData;
                if (count($COLUMNASFORUPDATE) == $countColumnsDato) {
                    return '';
                }
            }
        }
        $TR .= $argReport->RowValueColumn($argData, $sumaParcialFila, $FORMATPESOCOLUMNS, $keepCero) . str_replace('border-top:1px solid !important;', '', implode('', $ARRAYTDCOLUMNS)) . "</tr>";
        if ($ENDPAGE) {
            foreach ($argReport->arrayColumnsSaldoFolio as $k => & $importe) {
                $CURRENTPAGE = $this->PAGE_COUNT;
                $PREVIOUSPAGE = $CURRENTPAGE - 1;
                if (isset($argReport->arraySumaAcumulada[$PREVIOUSPAGE])) {
                    if (count($argReport->arraySumaAcumulada[$PREVIOUSPAGE]) > 0) {
                        $importe += $argReport->arraySumaAcumulada[$PREVIOUSPAGE][$k];
                    }
                }
                $argReport->gHtmlRowTotal[$k] = str_replace("&nbsp;", $argReport->ColumnsFormat($FORMATPESOCOLUMNS, $k, $importe, true), $argReport->gHtmlRowTotal[$k]);
            }
            $argReport->RowValues($j, $TR_TEXT, $TR, $argData, $FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE);
        }
    }

    function PaintBlankRows(& $PAINTEDROWS, $ROWSTOPAINT, $tr_ROW) {
        $ROWS = '';
        if ($PAINTEDROWS < $ROWSTOPAINT) {
            $PAINTROWS = $ROWSTOPAINT - $PAINTEDROWS;
            $PAINTEDROWS += $PAINTROWS;
            WHILE ($PAINTROWS > 0) {
                $ROWS .= $tr_ROW;
                $PAINTROWS--;
            }
        } return $ROWS;
    }

    public function IsRowSummarizingSaldo($argReport, $agText) {
        if ((strpos($agText, "SUBTOTAL") !== false && strpos($agText, "SUBTOTAL") >= 0) || (strpos($agText, "SALDO ACUMULADO") !== false && strpos($agText, "SALDO ACUMULADO") >= 0) || (strpos($agText, $argReport->textPageBreak) !== false && strpos($agText, $argReport->textPageBreak) >= 0)) {
            return true;
        }
        return false;
    }

    public function AddHtml($HTMLINBODYOF) {
        if ($this->objReport->REPORT_TYPE == "HTML") {
            list($this->gWidth, $this->gHeight) = $this->objReport->GetPaperSizeFormat($this->FORMAT_PAPERSIZE, $this->REPORT_ORIENTATION);
            $this->objReport->HTML_PAGES .= $this->objReport->HTMLStyleSheetPaint($this->gWidth, $this->gHeight, $HTMLINBODYOF);
        } else {
            $this->objReport->HTML_PAGES .= $HTMLINBODYOF;
        }
    }

    public function NewPage($PAGEFORMAT) {
        switch ($this->objReport->REPORT_TYPE) {
            case "PDF": {
                    $PAGEBREAK = "<pagebreak sheet-size = \"{$PAGEFORMAT}\" />";
                }break;
            case "HTML": {
                    $PAGEBREAK = "<br clear= 'all'/><div style = 'page-break-after:always; height: 0.5mm !important;'></div>";
                }break;
            case "EXCEL": {
                    $PAGEBREAK = "";
                }break;
        }
        $this->objReport->HTML_PAGES .= $PAGEBREAK;
        $this->PAGE_COUNT++;
    }

    public function UpdateArrayBodyData($i, $argArrayBodyData, $COUNT) {
        $arrayResult = array();
        for ($j = 0; $j < $COUNT; $j++) {
            if ($j >= $i) {
                $arrayResult[] = $argArrayBodyData[$j];
            }
        }
        return $arrayResult;
    }

    public function GetSTYLECSSHTML() {
        return "<style type='text/css'> 
                 @media all {body{display: block; background: none no-repeat scroll 100% 100% #333333;}}
                 @media print {*{visibility: visible; margin: 0 !important; padding: 0 !important; float:none !important;} div{visibility: hidden; top:0; right:0; bottom:0; left:0; height: auto !important; width: auto !important; margin : 0px auto;}}
                 @page {size : A4}                 
                </style>";
    }

    public function GetPaggingColumns($argReport, $columns, $pagingColumns) {
        $columnsAdd = array();
        $columnsForUp = array();
        foreach ($columns as $i => $column) {
            if ($i < $pagingColumns) {
                $columnsAdd[] = $column;
            } else {
                $columnsForUp[] = $column;
            }
        }
        $argReport->generalData->columnas = $columnsForUp;
        return $columnsAdd;
    }

}
