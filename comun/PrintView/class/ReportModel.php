<?php

class ReportModel {

    public function buildReport($argArrayReportData, $argReportFormat) {
        $reportList = array();
        foreach ($argArrayReportData as $objReportData) {
            $objReport = FactoryReport::Create(($objReportData->datoGeneral->reporte) ? $objReportData->datoGeneral->reporte : $objReportData->reporte);
            $objReport->generalData = $objReportData->datoGeneral;
            $objReport->bodyData = $objReportData->datoCuerpo;
            $objReport->footData = (isset($objReportData->datoPie)) ? $objReportData->datoPie : null;
            $reportList[] = $objReport;
        }
        new CoreReport($argReportFormat, $reportList);
    }

    public function createDataFromEXCEL($argFilePath, $argIdSysCont) {
        $PhpExcelRpt = new PhpExcelRpt(array(), array());
        $data = $PhpExcelRpt->importarFileData($argFilePath, $argIdSysCont);
        if (count($data) > 0) {
            return $data;
        } else {
            return false;
        }
    }

}