<?php

class FactoryReport {

    /**
     * Create an instance of report once his id was given:<ol> 
     * <li>Capital Humano <b>RRHHxxx</b></li> 
     * <li>Estructura organizativa <b>ESTRxxx</b></li> 
     * <li>Taller <b>TALLxxx</b></li> 
     * <li>Comercial <b>CRMxxx</b></li> 
     * <li>Datos Maestros <b>DMxxx</b></li> 
     * </ol>
     */
    public static function Create($argIdRpt) {
        switch ($argIdRpt) {
            case 'RRHH001' : return new RptListadoTrabajadores();
            case 'ESTR001' : return new RptPlantillaEntidad();
            case 'TALL001' : return new RptListadoOperaciones();
            case 'TALL002' : return new RptVehiculo_1();
            case 'TALL003' : return new RptVehiculo_2();
            case 'TALL004' : return new RptVehiculo_3();
            case 'TALL005' : return new RptVehiculo_4();
            case 'CRM001' : return new RptCliente();
            case 'DM001' : return new RptPais();
            default : die('CONFIGURE CORRECTAMENTE EL REPORTE');
        }
    }

}
