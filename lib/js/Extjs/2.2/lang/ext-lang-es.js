/*
 * Español/Latinoamerica
 * Revised by efege, 2007-04-15.
 * Updated by GESI 30/07/2016.
 * Updated by GESI 04/08/2017.
 */
Ext.ns('Ext.lang');
Ext.lang = {
    lbDefault: 'Valor por defecto',
    please: 'Por favor espere...',
    loading: 'Cargando...',
    loadingValidations: 'Cargando recursos...',
    lbAdd: 'Adicionar',
    lbMod: 'Modificar',
    lbDel: 'Eliminar',
    lbPrint: 'Imprimir',
    btnAdd: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
    btnMod: '<i class="fa fa-edit bluedark-button"></i> Modificar',
    btnDel: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
    btnPrint: '<i class="fa fa-print bluedark-button"></i> Imprimir',
    lbSave: 'Guardar',
    lbApply: 'Aplicar',
    lbAcept: 'Aceptar',
    lbCancel: 'Cancelar',
    btnApply: '<i class="fa fa-hand-o-right blue-button"></i> <b>Aplicar</b>',
    btnAcept: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
    btnCancel: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
    lbActions: 'Acciones',
    lbSelect: 'Seleccione...',
    ago: ' antes',
    periodos: ["segundo", "minuto", "hora", "d&iacute;a", "semana", "mes", "año", "d&eacute;cada"],
    titles: ['Advertencia', 'Informaci&oacute;n', 'Confirmaci&oacute;n', 'Error', 'Excepci&oacute;n'],
    details: ' Detalles ',
    ttlExc: ' Excepci&oacute;n ocurrida durante la ejecuci&oacute;n',
    msgErrorServer: 'En estos momentos el servidor no ha podido responder la petici&oacute;n realizada. Contacte con el proveedor de soporte, por favor.',
    lbmodSeguridad: 'Seguridad',
    lbmodConfiguracion: 'Configuraci\xF3n',
    lbmodEstructura: 'Estructura organizativa',
    lbmodRRHH: 'Capital humano',
    lbmodTaller: 'Taller',
    lbmodMaestros: 'Maestros',
    lbmodSoporte: 'Soporte',
    lbmodPortal: 'Portal',
    lbmodOperaciones: 'Operaciones',
    lbfuncRoles: 'Roles',
    lbfuncGrupoRoles: 'Grupo de roles',
    lbfuncUsuarios: 'Usuarios',
    lbfuncBloqueo: 'Bloqueo de usuarios',
    lbfuncTrazas: 'Trazas',
    lbfuncTrazasAdmin: 'Administrar trazas',
    lbfuncSistema: 'Sistema',
    lbfuncAyuda: 'Ayuda',
    lbfuncModulos: 'M\xF3dulos',
    lbfuncFuncionalidades: 'Funcionalidades',
    lbfuncRecursos: 'Recursos',
    lbfuncTerritorio: 'Territorio',
    lbfuncPais: 'Pa\xEDs',
    lbfuncTrabajadores: 'Trabajadores',
    lbfuncControlPersonal: 'Control del personal',
    lbfuncMaestros: 'Maestros',
    lbfuncRegistroPersonas: 'Registro de personas',
    lbfuncSeleccionPersonal: 'Selecci\xF3n del personal',
    lbfuncProcesosSeleccion: 'Procesos de selecci\xF3n',
    lbfuncSeleccion: 'Selecci\xF3n',
    lbfuncReserva: 'Reserva',
    lbfuncSeleccionDirecta: 'Selecci\xF3n directa',
    lbfuncRegistroEmpleados: 'Registro de empleados',
    lbfuncPlantillaCargos: 'Plantilla de cargos',
    lbfuncEntidades: 'Entidades',
    lbfuncDpt: 'DPA',
    lbfuncExplotacion: 'Explotaci\xF3n',
    lbfuncRegistroVehiculos: 'Registro de veh\xEDculos',
    lbfuncColor: 'Color',
    lbfuncGrupoExplotacion: 'Grupo explotaci\xF3n',
    lbfuncMarcaModelo: 'Marca modelo',
    lbfuncOperaciones: 'Operaciones',
    lbfuncTipoVehiculo: 'Tipo veh\xEDculo',
    lbfuncRegVehiculo: 'Registro of veh\xEDculos',
    lbfuncOrgano: '\xD3rgano',
    lbfuncEstructura: 'Estructura',
    lbfuncActividad: 'Actividad',
    lbfuncPlanMantenimiento: 'Plan de mantenimiento',
    lbfuncNoConformidad: 'No conformidades',
    lbfuncEjercicioFiscal: 'Ejercicio contable',
    lbfuncFormato: 'Formato',
    lbfuncMoneda: 'Moneda',
    lbfuncBancoSucursal: 'Bancos y sucursales',
    lbfuncTipoDpa: 'Tipos DPA',
    lbfuncCliente: 'Clientes',
    lbfuncSocioComercial: 'Socios comerciales',
    lbfuncProducto: 'Productos',
    lbfuncUnidadMedida: 'Unidad de medida',
    lbfuncAdminPedidos: 'Administrar pedidos',
    lbfuncPedidos: 'Pedidos',
    lbfuncDemanda: 'Demanda'
};

if (Ext.PrintView) {
    Ext.apply(Ext.PrintView.prototype, {
        lbTtlPrintView: 'Configurar dise&ntilde;o de impresi&oacute;n',
        lbFormato: 'Formato',
        lbTipoHoja: 'Tamaño del papel',
        lbOrientacion: 'Orientaci&oacute;n',
        lbReporte: 'Reporte',
        lbTipoReporte: 'Tipo de reporte',
        lbAceptar: 'Aceptar',
        lbCancelar: 'Cancelar',
        lbSeleccione: 'Seleccione...',
        lbHtml: 'Vista previa',
        lbPdf: 'Documento digital portable',
        lbExcel: 'Hoja de c&aacute;lculo',
        lbTtAceptar: 'Aceptar la configuraci&oacute;n y mostrar el reporte',
        lbTtCancelar: 'Cancelar la configuraci&oacute;n y cerrar esta ventana',
        lbGenerar: 'Generando reporte...',
        lbEsperar: 'Por favor espere'
    });
}

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Cargando...</div>';

if (Ext.LoadMask) {
    Ext.apply(Ext.LoadMask.prototype, {
        msg: 'Cargando...'
    });
}

if (Ext.View) {
    Ext.View.prototype.emptyText = "";
}

if (Ext.grid.GridPanel) {
    Ext.grid.GridPanel.prototype.ddText = "{0} fila(s) seleccionada(s)";
}

if (Ext.TabPanelItem) {
    Ext.TabPanelItem.prototype.closeText = "Cerrar esta pesta&ntilde;a";
}

Date.monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

Date.getShortMonthName = function(month) {
    return Date.monthNames[month].substring(0, 3);
};

if (Ext.Date) {
    Ext.apply(Ext.Date.monthNumbers, {
        "Enero": 1,
        "Febrero": 2,
        "Marzo": 3,
        "Abril": 4,
        "Mayo": 5,
        "Junio": 6,
        "Julio": 7,
        "Agosto": 8,
        "Septiembre": 9,
        "Octubre": 10,
        "Noviembre": 11,
        "Diciembre": 12
    });
    Ext.apply(Ext.Date, {
        getMeses: function() {
            var arrayMeses = new Array();
            for (var indexMonth = 0; indexMonth < Date.monthNames.length; indexMonth++) {
                var posMesLangEs = indexMonth + 1;
                arrayMeses.push({idmes: posMesLangEs}, {'mes': Date.monthNames[indexMonth]});
            }
            return arrayMeses;
        }
    });
}

Date.getMonthNumber = function(name) {
    return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
};

Date.dayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Mi&eacute;rcoles",
    "Jueves",
    "Viernes",
    "S&aacute;bado"
];

Date.getShortDayName = function(day) {
    return Date.dayNames[day].substring(0, 3);
};

if (Ext.MessageBox) {
    Ext.MessageBox.buttonText = {
        ok: '<i class="fa fa-check-circle green-button"></i> Aceptar',
        cancel: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        yes: 'S&iacute;',
        no: 'No'
    };
}
if (Ext.Msg) {
    Ext.apply(Ext.Msg.buttonText, {
        ok: '<i class="fa fa-check-circle green-button"></i> Aceptar',
        cancel: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        yes: 'S&iacute;',
        no: 'No'
    });
}

if (Ext.util.Format) {
    Ext.util.Format.date = function(v, format) {
        if (!v)
            return "";
        if (!(v instanceof Date))
            v = new Date(Date.parse(v));
        return v.dateFormat(format || "d/m/Y");
    };
    Ext.util.Format.getMesesObject = function() {
        var arrayMeses = new Array();
        for (var indexMonth = 0; indexMonth < Date.monthNames.length; indexMonth++) {
            var posMesLangEs = indexMonth + 1;
            arrayMeses.push({idmes: posMesLangEs, 'mes': Date.monthNames[indexMonth]});
        }
        return arrayMeses;
    };
    Ext.util.Format.getMesesArray = function() {
        var arrayMeses = new Array();
        for (var indexMonth = 0; indexMonth < Date.monthNames.length; indexMonth++) {
            var arrayMes = new Array();
            var posMesLangEs = indexMonth + 1;
            arrayMes.push(posMesLangEs, Date.monthNames[indexMonth]);
            arrayMeses.push(arrayMes);
        }
        return arrayMeses;
    };
    Ext.util.Format.getMesesHoyArray = function() {
        var d = new Date();
        var arrayMeses = new Array();
        for (var indexMonth = 0; indexMonth <= d.getMonth(); indexMonth++) {
            var arrayMes = new Array();
            var posMesLangEs = indexMonth + 1;
            arrayMes.push(posMesLangEs, Date.monthNames[indexMonth]);
            arrayMeses.push(arrayMes);
        }
        return arrayMeses;
    };
    Ext.util.Format.getFirstDayMonth = function(numberMonth, yearFull) {
        var d = new Date();
        var year = d.getFullYear();
        if (yearFull) {
            year = d.setYear(yearFull);
        }
        var result = new Date(year, numberMonth, 1);
        return result;
    };
    Ext.util.Format.getLastDayMonth = function(numberMonth, yearFull) {
        d = new Date();
        var year = d.getFullYear();
        if (yearFull) {
            year = d.setYear(yearFull);
        }
        Date.daysInMonth[1] = d.isLeapYear() ? 29 : 28;
        var lastDay = Date.daysInMonth[numberMonth];
        var result = new Date(year, numberMonth, lastDay);
        return result;
    };
    Ext.util.Format.getLimitDays = function(numberMonth, yearFull) {
        var d = new Date();
        var year = d.getFullYear();
        if (yearFull) {
            year = d.setYear(yearFull);
        }
        var start = new Date(year, numberMonth, 1);
        Date.daysInMonth[1] = d.isLeapYear() ? 29 : 28;
        var lastDay = Date.daysInMonth[numberMonth];
        var end = new Date(year, numberMonth, lastDay);
        var result = new Object();
        result.start = start;
        result.end = end;
        return result;
    };
    Ext.util.Format.ellipsis = function(text, maxLength) {
        if (text.length > maxLength) {
            return text.substr(0, maxLength - 3) + '...';
        }
        return text;
    };
}

if (Ext.DatePicker) {
    Ext.apply(Ext.DatePicker.prototype, {
        todayText: "Hoy",
        minText: "Esta fecha es anterior a la fecha mínima",
        maxText: "Esta fecha es posterior a la fecha máxima",
        disabledDaysText: "",
        disabledDatesText: "",
        monthNames: Date.monthNames,
        dayNames: Date.dayNames,
        nextText: 'Mes Siguiente (Control+Right)',
        prevText: 'Mes Anterior(Control+Left)',
        monthYearText: 'Seleccione un mes (Control+Up/Down para desplazar el a&ntilde;o)',
        todayTip: "{0} (Barra espaciadora)",
        format: "d/m/Y",
        okText: "&#160;OK&#160;",
        cancelText: "Cancelar",
        startDay: 0
    });
}

if (Ext.PagingToolbar) {
    Ext.apply(Ext.PagingToolbar.prototype, {
        beforePageText: "P&aacute;gina",
        afterPageText: "de {0}",
        firstText: "Primera p&aacute;gina",
        prevText: "P&aacute;gina anterior",
        nextText: "P&aacute;gina siguiente",
        lastText: "&Uacute;ltima p&aacute;gina",
        refreshText: "Actualizar",
        displayMsg: "Mostrando {0} - {1} de {2}",
        emptyMsg: 'Sin datos para mostrar'
    });
}

if (Ext.Feet.PagingToolbar) {
    Ext.apply(Ext.Feet.PagingToolbar.prototype, {
        beforePageText: "P&aacute;gina",
        afterPageText: "de {0}",
        firstText: "Primera p&aacute;gina",
        prevText: "P&aacute;gina anterior",
        nextText: "P&aacute;gina siguiente",
        lastText: "&Uacute;ltima p&aacute;gina",
        refreshText: "Actualizar",
        displayMsg: "Mostrando {0} - {1} de {2}",
        emptyMsg: 'Sin datos para mostrar'
    });
}

if (Ext.form.Field) {
    Ext.form.Field.prototype.invalidText = "El valor en este campo es inv&aacute;lido";
}

if (Ext.form.TextField) {
    Ext.apply(Ext.form.TextField.prototype, {
        minLengthText: "El tama&ntilde;o m&iacute;nimo para este campo es de {0}",
        maxLengthText: "El tama&ntilde;o m&aacute;ximo para este campo es de {0}",
        blankText: "Este campo es obligatorio",
        regexText: "",
        emptyText: null
    });
}

if (Ext.form.NumberField) {
    Ext.apply(Ext.form.NumberField.prototype, {
        minText: "El valor m&iacute;nimo para este campo es de {0}",
        maxText: "El valor m&aacute;ximo para este campo es de {0}",
        nanText: "{0} no es un n&uacute;mero válido"
    });
}

if (Ext.form.DateField) {
    Ext.apply(Ext.form.DateField.prototype, {
        disabledDaysText: "Deshabilitado",
        disabledDatesText: "Deshabilitado",
        minText: "La fecha para este campo debe ser despu&eacute;s de {0}",
        maxText: "La fecha para este campo debe ser antes de {0}",
        invalidText: "{0} no es una fecha v&aacute;lida - debe tener el formato {1}",
        format: "d/m/Y"
    });
}

if (Ext.form.ComboBox) {
    Ext.apply(Ext.form.ComboBox.prototype, {
        loadingText: "Cargando...",
        valueNotFoundText: undefined
    });
}

if (Ext.form.SearchField) {
    Ext.apply(Ext.form.SearchField.prototype, {
        clearTooltip: 'Limpiar filtros <b>(Esc)</b>',
        searchTooltip: 'Buscar datos <b>(Enter)</b>',
        searchText: 'Buscar {0} <b>(Enter)</b>',
        emptyText: 'Criterio a buscar...',
        noResultsText: 'No hay resultados para mostrar.'
    });
}

if (Ext.form.VTypes) {
    Ext.apply(Ext.form.VTypes, {
        emailText: 'Este campo debe ser una dirección de correo electrónico con el formato "usuario@dominio.com"',
        emailsText: 'Este campo solo admite direcciones de correo con el formato "usuario@dominio.com" separadas por coma',
        urlText: 'Este campo debe ser una URL con el formato "http:/' + '/www.dominio.com"',
        alphaText: 'Este campo sólo debe contener letras y _',
        alphanumText: 'Este campo sólo debe contener letras, números y _',
        passwordText: 'Las contrase&ntilde;as no coinciden',
        phonesText: 'Este campo solo admite n&uacute;meros telef&oacute;nicos, separados por coma. <b>Ejemplos: <pre>(+53)78352266, 22637945</pre></b>',
        IPAddressText: 'Debe ser una direcci&oacute;n IP v&aacute;lida con el formato "127.0.0.1"',
        IPRangeText: 'Debe ser un rango IP v&aacute;lido con el formato "127.0.0.1/32"'
    });
}

if (Ext.form.HtmlEditor) {
    Ext.apply(Ext.form.HtmlEditor.prototype, {
        createLinkText: 'Por favor ingrese la URL para el enlance:',
        buttonTips: {
            bold: {
                title: 'Negrita (Ctrl+B)',
                text: 'Aplica el formato de negrita del texto',
                cls: 'x-html-editor-tip'
            },
            italic: {
                title: 'Cursiva (Ctrl+I)',
                text: 'Aplica el formato de cursiva al texto.',
                cls: 'x-html-editor-tip'
            },
            underline: {
                title: 'Subrayado (Ctrl+U)',
                text: 'Aplica el formato de subrayado al texto.',
                cls: 'x-html-editor-tip'
            },
            increasefontsize: {
                title: 'Aumentar tama&ntilde;o de texto',
                text: 'Aumenta el tama&ntilde;o de fuente.',
                cls: 'x-html-editor-tip'
            },
            decreasefontsize: {
                title: 'Reducir tama&ntilde;o de texto',
                text: 'Disminuir el tama&ntilde;o de fuente.',
                cls: 'x-html-editor-tip'
            },
            backcolor: {
                title: 'Color de resaltado del texto',
                text: 'Cambiar el color de fondo del texto seleccionado.',
                cls: 'x-html-editor-tip'
            },
            forecolor: {
                title: 'Color de fuente',
                text: 'Cambiar el color del texto seleccionado.',
                cls: 'x-html-editor-tip'
            },
            justifyleft: {
                title: 'Alinear a la izquierda',
                text: 'Alinear texto a la izquierda.',
                cls: 'x-html-editor-tip'
            },
            justifycenter: {
                title: 'Centrar texto',
                text: 'Centrar texto en el editor.',
                cls: 'x-html-editor-tip'
            },
            justifyright: {
                title: 'Alinear a la derecha',
                text: 'Alinear texto a la derecha.',
                cls: 'x-html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Lista de vi&ntilde;etas',
                text: 'Crear una lista con vi&ntilde;etas.',
                cls: 'x-html-editor-tip'
            },
            insertorderedlist: {
                title: 'Lista numerada',
                text: 'Crear una lista numerada.',
                cls: 'x-html-editor-tip'
            },
            createlink: {
                title: 'Hiperv&iacute;nvulo',
                text: 'Crear un hiperv&iacute;nvulo con el texto seleccionado.',
                cls: 'x-html-editor-tip'
            },
            sourceedit: {
                title: 'Editar c&oacute;digo fuente',
                text: 'Cambiar a modo edici&oacute;n de c&oacute;digo fuente.',
                cls: 'x-html-editor-tip'
            }
        }
    });
}

if (Ext.form.BasicForm) {
    Ext.form.BasicForm.prototype.waitTitle = "Por favor espere...";
}

if (Ext.grid.GridView) {
    Ext.apply(Ext.grid.GridView.prototype, {
        sortAscText: "Ordenar en forma ascendente",
        sortDescText: "Ordenar en forma descendente",
        lockText: "Bloquear Columna",
        unlockText: "Desbloquear Columna",
        columnsText: "Columnas"
    });
}

if (Ext.grid.GroupingView) {
    Ext.apply(Ext.grid.GroupingView.prototype, {
        groupByText: "Agrupar por este campo",
        showGroupsText: "Mostrar en grupos"
    });
}

if (Ext.grid.PropertyColumnModel) {
    Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
        nameText: "Nombre",
        valueText: "Valor",
        dateFormat: "d/m/Y"
    });
}

if (Ext.layout.BorderLayout && Ext.layout.BorderLayout.SplitRegion) {
    Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
        splitTip: "Arrastre para redimensionar.",
        collapsibleSplitTip: "Arrastre para redimensionar. Doble click para ocultar."
    });
}

if (Ext.SplitLayoutRegion) {
    Ext.apply(Ext.SplitLayoutRegion.prototype, {
        splitTip: "Arrastre para redimensionar.",
        collapsibleSplitTip: "Arrastre para redimensionar. Doble click para ocultar."
    });
}
