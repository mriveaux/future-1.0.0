<?php

abstract class ElementsReport {

    public $gTitle;
    public $gClassification;
    public $gReportIdentifier;
    public $generalData;
    public $bodyData;
    public $footData;
    public $fieldName;
    public $fieldDate = "";
    public $textPageBreak = "";
    public $textSummaryPage = "<strong>SUMA ACUMULADA FOLIO</strong>";
    public $haveAddTableFoot;
    public $HTML_PAGES;
    public $REPORT_TYPE;
    public $REPORT_ORIENTATION;
    public $REPORT_PAPERSIZE;
    public $FORMAT_PAPERSIZE;
    public $codeSeparator;
    public $arrayColumnsSaldoFolio = array();
    public $arraySumaAcumulada = array();
    public $bodyDataCopy = array();
    public $gPaintColumns = array();
    public $gHtmlRowTotal = array();
    public $activeSumarize = false;

    final function GetPaperSizeFormat() {
        //cm
        switch ($this->FORMAT_PAPERSIZE) {
            case 'LETTER': {
                    $sizes = array(21.6, 27.9);
                }BREAK;
            case 'FOLIO': {
                    $sizes = array(21.6, 33.0);
                }BREAK;
            case 'LEGAL': {
                    $sizes = array(21.6, 35.6);
                }BREAK;
            default: {
                    $sizes = array(21.0, 29.7);
                }
        }
        return ($this->REPORT_ORIENTATION == "L") ? array_reverse($sizes) : $sizes;
    }

    final function HTMLStyleSheetPaint($width, $height, $HTMLINOF) {
        return "<div class = 'div1' style='margin: auto !important; position:static; border: 0.5mm solid; background: none repeat scroll 0% 0% rgb(255, 255, 255); width:" . $width . "cm; height:" . $height . "cm;'><div style='margin: 5mm 5mm 5mm 15mm;'>$HTMLINOF</div></div>";
    }

    final protected function GetSubEspecialidad(& $PAINTEDROWS, $argArrayBodyData) {
        $SUBESPECIALIDAD = (strlen($argArrayBodyData[0]->subespecialidad) > 0) ? $this->ExcludeLevels($argArrayBodyData[0]->subespecialidad) : $argArrayBodyData[0]->subespecialidad;
        if (strlen($SUBESPECIALIDAD) > 0)
            $PAINTEDROWS++;
        return $SUBESPECIALIDAD;
    }

    final public function ResetValuesColumns(& $argArrayColumns) {
        $this->arrayColumnsSaldoFolio = array();
        foreach ($argArrayColumns as $i => $column)
            $this->arrayColumnsSaldoFolio[] = 0;
    }

    final private function FindIndexKey($argList, $argValue) {
        for ($i = 0; $i < count($argList); $i++)
            if ($argList[$i] - 1 == $argValue)
                return $i;
        return -1;
    }

    final public function GetIndexKey($argList, $argValue) {
        for ($i = 0; $i < count($argList); $i++)
            if ($argList[$i] == $argValue)
                return $i;
        return -1;
    }

    final private function ExcludeLevels($string, $excludeLevels = array(1)) {
        $arrayString = explode($this->codeSeparator, $string);
        $arrayStringCopy = array();
        foreach ($arrayString as $j => $string)
            if ($this->FindIndexKey($excludeLevels, $j) < 0)
                $arrayStringCopy[] = $string;
        return implode($this->codeSeparator, $arrayStringCopy);
    }

    final private function GetReportColumns($argDataColumns) {
        for ($m = 0; $m < count($argDataColumns); $m++)
            if ($this->GetIndexKey($this->gPaintColumns, $argDataColumns[$m][0]) < 0)
                $this->gPaintColumns[] = $argDataColumns[$m][0];
    }

    protected function Format($num, $keepCero = false) {
        if ($num == 0) {
            if (!$keepCero)
                return ''; else if ($keepCero)
                return number_format($num, '2', '.', ',');
        }
        elseif ($num < 0)
            return '(' . number_format($num * -1, '2', '.', ',') . ')';
        else
            return number_format($num, '2', '.', ',');
    }

    protected function FormatThousands($num) {
        if ($num == 0) {
            return '';
        } elseif ($num < 0) {
            return '(' . number_format($num * -1) . ')';
        } else
            return number_format($num);
    }

    protected function GetHTMLBodyFormat($agHeader, $agBody, $agFooter = "") {
        return "<div>$agHeader" . "$agBody" . "$agFooter</div>";
    }

    protected function GetBodyTable($TRBODYTABLE) {
        return "$TRBODYTABLE</table>";
    }

    protected function GetLetFootData($argData, $fieldName, $fieldName1, $fieldName2, $fieldName3, $fieldName4) {
        $result = array();
        $resultCopy = array();
        foreach ($this->footData as $data)
            if ($argData->$fieldName == $data->$fieldName && $argData->$fieldName4 == $data->$fieldName4 && $argData->$fieldName1 == $data->$fieldName1 && $argData->$fieldName2 == $data->$fieldName2 && (strcmp($argData->$fieldName3, $data->$fieldName3) === 0))
                $result[] = $data;
            else
                $resultCopy[] = $data;
        $this->footData = $resultCopy;
        return $result;
    }

    protected function GetFootDataColumns($argArrayBodyData, $argFieldValueColumns, $argFieldValue) {
        $arrayFootData = array();
        for ($j = 0; $j <= count($argArrayBodyData); $j++)
            if (isset($argArrayBodyData[$j]->$argFieldValue)) {
                $this->GetReportColumns($argArrayBodyData[$j]->$argFieldValueColumns);
                $arrayFootData[] = $argArrayBodyData[$j];
            }
        return $arrayFootData;
    }

    protected function CasePaperFormat($argSizesA4, $argSizesLetter, $argSizesFolio, $argSizesLegal) {
        switch ($this->REPORT_PAPERSIZE) {
            CASE 'LETTER-L':RETURN $argSizesLetter[0];
            CASE 'LETTER':RETURN $argSizesLetter[1];
            CASE 'FOLIO-L':RETURN $argSizesFolio[0];
            CASE 'FOLIO':RETURN $argSizesFolio[1];
            CASE 'LEGAL-L':RETURN $argSizesLegal[0];
            CASE 'LEGAL':RETURN $argSizesLegal[1];
            CASE 'A4-L':RETURN $argSizesA4[0];
            DEFAULT: RETURN $argSizesA4[1];
        }
    }

    public function LengthStringPaperFormat(& $argField) {
        $argField = '';
        return 0;
    }

    public function IsSubTotalRow($argText) {
        if (strpos($argText, "SUBTOTAL") !== false)
            return true;
        return false;
    }
    
    public function setTitleRpt($argTitle) {
        $this->gTitle = $argTitle;
    }

    public function IsTotalSummaryRow($argText) {
        if (strpos($argText, "TOTAL") !== false)
            return true;
        return false;
    }

    public function ColumnsFormat(& $FORMATPESOCOLUMNS, $i, $valueField, $keepCero = false, $keepSignoPeso = true) {
        $valueField = $this->Format($valueField, $keepCero);
        if (strlen($valueField) > 0 && !isset($FORMATPESOCOLUMNS[$i])) {
            $FORMATPESOCOLUMNS[$i] = '$';
            return '$' . $valueField;
        } elseif ($keepCero && $keepSignoPeso)
            return '$' . $valueField;
        return $valueField;
    }

    public function GetSumaAcumuladaFolio($TEXTALTERNATIVO, $TEXTSALDOFOLIO, & $FORMATPESOCOLUMNS, $PREVIOUSPAGE) {
        return "";
    }

    public function SetSumaAcumuladaFolio($TEXTALTERNATIVO, $TEXTSALDOFOLIO, $argArrayBodyData, $argFieldName, $i, $PREVIOUSPAGE, $CURRENTPAGE, & $FORMATPESOCOLUMNS) {
        return "";
    }

    abstract public function NumberRowsPaperFormat();

    abstract public function GetHeadTable(& $PAINTEDROWS, $argArrayBodyData, $argPageCount, & $argArrayColumns);

    abstract public function RowValues($j, $TR_TEXT, & $TR, $argData, & $FORMATPESOCOLUMNS, $keepCero, $argArrayColumns, $ENDPAGE);

    abstract public function GetBlankRows($argArrayColumns);

    abstract public function GetHtmlValues($argArrayBodyData, $agHeader, $TRBODYTABLE);
}