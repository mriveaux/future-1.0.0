/*
 * Español/Latinoamerica Translation by genius551v 04-08-2007
 * Revised by efege, 2007-04-15.
 * Updated by belcross 30/07/2016.
 */

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Cargando...</div>';

if (Ext.LoadMask) {
    Ext.apply(Ext.LoadMask.prototype, {
        msg: 'Cargando...'
    });
}

if (Ext.View) {
    Ext.View.prototype.emptyText = "";
}

if (Ext.grid.Grid) {
    Ext.grid.Grid.prototype.ddText = "{0} fila(s) seleccionada(s)";
}

if (Ext.TabPanelItem) {
    Ext.TabPanelItem.prototype.closeText = "Cerrar esta pesta&ntilde;a";
}

if (Ext.form.Field) {
    Ext.form.Field.prototype.invalidText = "El valor en este campo es inv&aacute;lido";
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
        getMeses: function () {
            var arrayMeses = new Array();
            for (var indexMonth = 0; indexMonth < Date.monthNames.length; indexMonth++) {
                var posMesLangEs = indexMonth + 1;
                arrayMeses.push({idmes: posMesLangEs}, {'mes': Date.monthNames[indexMonth]});
            }
            return arrayMeses;
        }
    });
}

Date.dayNames = [
    "Domingo",
    "Lunes",
    "Martes",
    "Mi&eacute;rcoles",
    "Jueves",
    "Viernes",
    "S&aacute;bado"
];

if (Ext.MessageBox) {
    Ext.MessageBox.buttonText = {
        ok: '<i class="fa fa-check-circle green-button"></i> Aceptar',
        cancel: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        yes: '<i class="fa fa-thumbs-up"></i> S&iacute;',
        no: '<i class="fa fa-thumbs-down"></i> No'
    };
}
if (Ext.Msg) {
    Ext.apply(Ext.Msg.buttonText, {
        ok: '<i class="fa fa-check-circle green-button"></i> Aceptar',
        cancel: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        yes: '<i class="fa fa-thumbs-up"></i> S&iacute;',
        no: '<i class="fa fa-thumbs-down"></i> No'
    });
}

if (Ext.util.Format) {
    Ext.util.Format.date = function (v, format) {
        if (!v)
            return "";
        if (!(v instanceof Date))
            v = new Date(Date.parse(v));
        return v.dateFormat(format || "d/m/Y");
    };
    Ext.util.Format.getMesesObject = function () {
        var arrayMeses = new Array();
        for (var indexMonth = 0; indexMonth < Date.monthNames.length; indexMonth++) {
            var posMesLangEs = indexMonth + 1;
            arrayMeses.push({idmes: posMesLangEs, 'mes': Date.monthNames[indexMonth]});
        }
        return arrayMeses;
    };
    Ext.util.Format.getMesesArray = function () {
        var arrayMeses = new Array();
        for (var indexMonth = 0; indexMonth < Date.monthNames.length; indexMonth++) {
            var arrayMes = new Array();
            var posMesLangEs = indexMonth + 1;
            arrayMes.push(posMesLangEs, Date.monthNames[indexMonth]);
            arrayMeses.push(arrayMes);
        }
        return arrayMeses;
    };
    Ext.util.Format.getMesesHoyArray = function () {
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
    Ext.util.Format.getFirstDayMonth = function (numberMonth, yearFull) {
        var d = new Date();
        var year = d.getFullYear();
        if (yearFull) {
            year = d.setYear(yearFull);
        }
        var result = new Date(year, numberMonth, 1);
        return result;
    };
    Ext.util.Format.getLastDayMonth = function (numberMonth, yearFull) {
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
    Ext.util.Format.getLimitDays = function (numberMonth, yearFull) {
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
    Ext.util.Format.ellipsis = function (text, maxLength) {
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
        format: "d/m/Y"
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

if (Ext.form.VTypes) {
    Ext.apply(Ext.form.VTypes, {
        emailText: 'Este campo debe ser una dirección de correo electrónico con el formato "usuario@dominio.com"',
        emailsText: 'Este campo solo admite direcciones de correo con el formato "usuario@dominio.com" separadas por coma',
        urlText: 'Este campo debe ser una URL con el formato "http:/' + '/www.dominio.com"',
        alphaText: 'Este campo sólo debe contener letras y _',
        alphanumText: 'Este campo sólo debe contener letras, números y _',
        passwordText: 'Las contrase&ntilde;as no coinciden',
        phonesText: 'Este campo solo admite n&uacute;meros telef&oacute;nicos, separados por coma. <strong>Ejemplos: <pre>(+53)78352266, 22637945</pre></strong>',
        IPAddressText: 'Debe ser una direcci&oacute;n IP v&aacute;lida con el formato "127.0.0.1"'
    });
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

if (Ext.SplitLayoutRegion) {
    Ext.apply(Ext.SplitLayoutRegion.prototype, {
        splitTip: "Arrastre para redimensionar.",
        collapsibleSplitTip: "Arrastre para redimensionar. Doble click para ocultar."
    });
}
