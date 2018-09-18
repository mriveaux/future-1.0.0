<?php

/**
 * IExcel interface
 * Obliga implementar los m&eacute;todos para crear el encabezado y pie de p&aacute;gina en las hojas de c&aacute;lculo de los reportes que ser&aacute;n exportados a excel.
 */
interface IExcel {

    /** Crear encabezado para la hoja de c&aacute;lculo de excel.
     * @param PhpExcelRpt $excelRpt Instancia de la clase Reporte excel, que permite personalizar el encabezado de la hoja de c&aacute;lculo.
     * @param $argObjReport Instancia del reporte que se quiere exportar.
     */
    public function setSheetHeader(PhpExcelRpt $excelRpt, & $argObjReport);

    /** Crear pie de p&aacute;gina para la hoja de c&aacute;lculo de excel.
     * @param PhpExcelRpt $excelRpt Instancia de la clase Reporte excel, que permite personalizar el pie de p&aacute;gina de la hoja de c&aacute;lculo.
     * @param $argObjReport Instancia del reporte que se quiere exportar.
     */
    public function setSheetFooter($excelRpt, & $argObjReport);
}

?>