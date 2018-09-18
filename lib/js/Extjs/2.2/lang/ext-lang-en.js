/**
 * List compiled by mystix on the extjs.com forums.
 * Thank you Mystix!
 *
 * English Translations
 * Updated by GESI 04/08/2017.
 */
Ext.ns('Ext.lang');
Ext.lang = {
    lbDefault: 'Default value',
    please: 'Please wait...',
    loadingValidations: 'Loading resources...',
    loading: 'Loading...',
    lbAdd: 'Add',
    lbMod: 'Modify',
    lbDel: 'Delete',
    lbPrint: 'Print',
    btnAdd: '<i class="fa fa-plus bluedark-button"></i> Add',
    btnMod: '<i class="fa fa-edit bluedark-button"></i> Modify',
    btnDel: '<i class="fa fa-trash bluedark-button"></i> Delete',
    btnPrint: '<i class="fa fa-print bluedark-button"></i> Print',
    lbSave: 'Save',
    lbApply: 'Apply',
    lbAcept: 'Ok',
    lbCancel: 'Cancel',
    btnApply: '<i class="fa fa-hand-o-right blue-button"></i> <b>Apply</b>',
    btnAcept: '<i class="fa fa-check-circle green-button"></i> <b>Ok</b>',
    btnCancel: '<i class="fa fa-times-circle red-button"></i> <b>Cancel</b>',
    ago: ' ago',
    periodos: ["second", "minute", "hour", "day", "week", "month", "year", "decade"],
    titles: ['Warning', 'Information', 'Confirmation', 'Error', 'Exception'],
    details: ' Details ',
    ttlExc: ' Exception happened during the execution',
    msgErrorServer: 'In these moments the server has not been able to  answer the realized request. Contact with the supplier of support, please.',
    lbmodSeguridad: 'Security',
    lbmodConfiguracion: 'Configuration',
    lbmodEstructura: 'Organizative structure',
    lbmodRRHH: 'Human capital',
    lbmodTaller: 'Workshop',
    lbmodMaestros: 'Masters',
    lbmodSoporte: 'Suport',
    lbmodPortal: 'Portal',
    lbfuncRoles: 'Roles',
    lbfuncGrupoRoles: 'Roles group',
    lbfuncUsuarios: 'Users',
    lbfuncBloqueo: 'Lock users',
    lbfuncTrazas: 'Traces',
    lbfuncTrazasAdmin: 'Traces manager',
    lbfuncSistema: 'System',
    lbfuncAyuda: 'Help',
    lbfuncModulos: 'Modules',
    lbfuncFuncionalidades: 'Functionalities',
    lbfuncRecursos: 'Resources',
    lbfuncTerritorio: 'Territory',
    lbfuncPais: 'Country',
    lbfuncTrabajadores: 'List of workers',
    lbfuncControlPersonal: 'Control of the employees',
    lbfuncMaestros: 'Masters',
    lbfuncRegistroPersonas: 'List of persons',
    lbfuncSeleccionPersonal: 'Selection of the employees',
    lbfuncProcesosSeleccion: 'Selection process',
    lbfuncSeleccion: 'Selection',
    lbfuncReserva: 'Reserve',
    lbfuncSeleccionDirecta: 'Direct selection',
    lbfuncRegistroEmpleados: 'Employed register',
    lbfuncPlantillaCargos: 'Plantilla de cargos',
    lbfuncEntidades: 'Entities',
    lbfuncDpt: 'Regional planning',
    lbfuncExplotacion: 'Explotation',
    lbfuncRegistroVehiculos: 'List of vehicle',
    lbfuncColor: 'Color',
    lbfuncGrupoExplotacion: 'Explotation group',
    lbfuncMarcaModelo: 'Model and mark',
    lbfuncOperaciones: 'Operations',
    lbfuncTipoVehiculo: 'Type of vehicle',
    lbfuncRegVehiculo: 'List of vehicles',
    lbfuncOrgano: '\xD3rgano',
    lbfuncEstructura: 'Structure',
    lbfuncActividad: 'Activity',
    lbfuncPlanMantenimiento: 'Maintenance plain',
    lbfuncNoConformidad: 'Non conformities',
    lbfuncEjercicioFiscal: 'Fiscal year',
    lbfuncFormato: 'Format',
    lbfuncMoneda: 'Currency',
    lbfuncBancoSucursal: 'Banks and subsidiaries',
    lbfuncTipoDpa: 'Type of regional planning',
    lbfuncCliente: 'Customers',
    lbfuncSocioComercial: 'Comercial patners',
    lbfuncProducto: 'Products',
    lbfuncUnidadMedida: 'Unidad de medida'
};

if (Ext.PrintView) {
    Ext.apply(Ext.PrintView.prototype, {
        lbTtlPrintView: 'Configuring design of impression',
        lbFormato: 'Format',
        lbTipoHoja: 'Paper size',
        lbOrientacion: 'Orientation',
        lbReporte: 'Report',
        lbTipoReporte: 'Type of report',
        lbAceptar: 'Ok',
        lbCancelar: 'Cancel',
        lbSeleccione: 'Select...',
        lbHtml: 'Preview',
        lbPdf: 'Portable document file',
        lbExcel: 'Sheet',
        lbTtAceptar: 'Accept configuration and show the report.',
        lbTtCancelar: 'Cancel configuration and close this window.',
        lbGenerar: 'Creating report...',
        lbEsperar: 'Please wait'
    });
}

Ext.UpdateManager.defaults.indicatorText = '<div class="loading-indicator">Loading...</div>';

if (Ext.LoadMask) {
    Ext.apply(Ext.LoadMask.prototype, {
        msg: 'Loading...'
    });
}

if (Ext.View) {
    Ext.View.prototype.emptyText = "";
}

if (Ext.grid.GridPanel) {
    Ext.grid.GridPanel.prototype.ddText = "{0} selected row(s)";
}

if (Ext.TabPanelItem) {
    Ext.TabPanelItem.prototype.closeText = "Close this tab";
}

Date.monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

Date.getShortMonthName = function(month) {
    return Date.monthNames[month].substring(0, 3);
};

if (Ext.Date) {
    Ext.apply(Ext.Date.monthNumbers, {
        Jan: 0,
        Feb: 1,
        Mar: 2,
        Apr: 3,
        May: 4,
        Jun: 5,
        Jul: 6,
        Aug: 7,
        Sep: 8,
        Oct: 9,
        Nov: 10,
        Dec: 11
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
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

Date.getShortDayName = function(day) {
    return Date.dayNames[day].substring(0, 3);
};

if (Ext.MessageBox) {
    Ext.MessageBox.buttonText = {
        ok: "OK",
        cancel: "Cancel",
        yes: "Yes",
        no: "No"
    };
}
if (Ext.Msg) {
    Ext.apply(Ext.Msg.buttonText, {
        ok: '<i class="fa fa-check-circle green-button"></i> Ok',
        cancel: '<i class="fa fa-times-circle red-button"></i> Cancel',
        yes: 'Yes',
        no: 'No'
    });
}

if (Ext.util.Format) {
    Ext.util.Format.date = function(v, format) {
        if (!v)
            return "";
        if (!(v instanceof Date))
            v = new Date(Date.parse(v));
        return v.dateFormat(format || "m/d/Y");
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
        todayText: "Today",
        minText: "This date is before the minimum date",
        maxText: "This date is after the maximum date",
        disabledDaysText: "",
        disabledDatesText: "",
        monthNames: Date.monthNames,
        dayNames: Date.dayNames,
        nextText: 'Next Month (Control+Right)',
        prevText: 'Previous Month (Control+Left)',
        monthYearText: 'Choose a month (Control+Up/Down to move years)',
        todayTip: "{0} (Spacebar)",
        format: "m/d/y",
        okText: "&#160;OK&#160;",
        cancelText: "Cancel",
        startDay: 0
    });
}

if (Ext.PagingToolbar) {
    Ext.apply(Ext.PagingToolbar.prototype, {
        beforePageText: "Page",
        afterPageText: "of {0}",
        firstText: "First Page",
        prevText: "Previous Page",
        nextText: "Next Page",
        lastText: "Last Page",
        refreshText: "Refresh",
        displayMsg: "Displaying {0} - {1} of {2}",
        emptyMsg: 'No data to display'
    });
}

if (Ext.Feet) {
    Ext.apply(Ext.Feet.PagingToolbar.prototype, {
        beforePageText: "Page",
        afterPageText: "of {0}",
        firstText: "First Page",
        prevText: "Previous Page",
        nextText: "Next Page",
        lastText: "Last Page",
        refreshText: "Refresh",
        displayMsg: "Displaying {0} - {1} of {2}",
        emptyMsg: 'No data to display'
    });
}

if (Ext.form.Field) {
    Ext.form.Field.prototype.invalidText = "The value in this field is invalid";
}

if (Ext.form.TextField) {
    Ext.apply(Ext.form.TextField.prototype, {
        minLengthText: "The minimum length for this field is {0}",
        maxLengthText: "The maximum length for this field is {0}",
        blankText: "This field is required",
        regexText: "",
        emptyText: null
    });
}

if (Ext.form.NumberField) {
    Ext.apply(Ext.form.NumberField.prototype, {
        minText: "The minimum value for this field is {0}",
        maxText: "The maximum value for this field is {0}",
        nanText: "{0} is not a valid number"
    });
}

if (Ext.form.DateField) {
    Ext.apply(Ext.form.DateField.prototype, {
        disabledDaysText: "Disabled",
        disabledDatesText: "Disabled",
        minText: "The date in this field must be after {0}",
        maxText: "The date in this field must be before {0}",
        invalidText: "{0} is not a valid date - it must be in the format {1}",
        format: "m/d/y",
        altFormats: "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
    });
}

if (Ext.form.ComboBox) {
    Ext.apply(Ext.form.ComboBox.prototype, {
        loadingText: "Loading...",
        valueNotFoundText: undefined
    });
}

if (Ext.form.SearchField) {
    Ext.apply(Ext.form.SearchField.prototype, {
        clearTooltip: 'Clear filters <b>(Esc)</b>',
        searchTooltip: 'Search data <b>(Enter)</b>',
        searchText: 'Search {0} <b>(Enter)</b>',
        emptyText: 'Search...',
        noResultsText: 'There are not data to display.'
    });
}

if (Ext.form.VTypes) {
    Ext.apply(Ext.form.VTypes, {
        emailText: 'This field should be an e-mail address in the format "user@domain.com"',
        emailsText: 'This field should be an e-mail address in the format "user@domain.com" separadas por coma',
        urlText: 'This field should be a URL in the format "http:/' + '/www.domain.com"',
        alphaText: 'This field should only contain letters and _',
        alphanumText: 'This field should only contain letters, numbers and _',
        passwordText: 'Passwords does not match',
        phonesText: 'This field should be telephone numbers, separated for comma. <b>e.g: <pre>(+53)78352266, 22637945</pre></b>',
        IPAddressText: 'This field should be valid IP address in the format "127.0.0.1"',
        IPRangeText: 'Debe ser un rango IP v&aacute;lido con el formato "127.0.0.1/32"'
    });
}

if (Ext.form.HtmlEditor) {
    Ext.apply(Ext.form.HtmlEditor.prototype, {
        createLinkText: 'Please enter the URL for the link:',
        buttonTips: {
            bold: {
                title: 'Bold (Ctrl+B)',
                text: 'Make the selected text bold.',
                cls: 'x-html-editor-tip'
            },
            italic: {
                title: 'Italic (Ctrl+I)',
                text: 'Make the selected text italic.',
                cls: 'x-html-editor-tip'
            },
            underline: {
                title: 'Underline (Ctrl+U)',
                text: 'Underline the selected text.',
                cls: 'x-html-editor-tip'
            },
            increasefontsize: {
                title: 'Grow Text',
                text: 'Increase the font size.',
                cls: 'x-html-editor-tip'
            },
            decreasefontsize: {
                title: 'Shrink Text',
                text: 'Decrease the font size.',
                cls: 'x-html-editor-tip'
            },
            backcolor: {
                title: 'Text Highlight Color',
                text: 'Change the background color of the selected text.',
                cls: 'x-html-editor-tip'
            },
            forecolor: {
                title: 'Font Color',
                text: 'Change the color of the selected text.',
                cls: 'x-html-editor-tip'
            },
            justifyleft: {
                title: 'Align Text Left',
                text: 'Align text to the left.',
                cls: 'x-html-editor-tip'
            },
            justifycenter: {
                title: 'Center Text',
                text: 'Center text in the editor.',
                cls: 'x-html-editor-tip'
            },
            justifyright: {
                title: 'Align Text Right',
                text: 'Align text to the right.',
                cls: 'x-html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Bullet List',
                text: 'Start a bulleted list.',
                cls: 'x-html-editor-tip'
            },
            insertorderedlist: {
                title: 'Numbered List',
                text: 'Start a numbered list.',
                cls: 'x-html-editor-tip'
            },
            createlink: {
                title: 'Hyperlink',
                text: 'Make the selected text a hyperlink.',
                cls: 'x-html-editor-tip'
            },
            sourceedit: {
                title: 'Source Edit',
                text: 'Switch to source editing mode.',
                cls: 'x-html-editor-tip'
            }
        }
    });
}

if (Ext.form.BasicForm) {
    Ext.form.BasicForm.prototype.waitTitle = "Please wait...";
}

if (Ext.grid.GridView) {
    Ext.apply(Ext.grid.GridView.prototype, {
        sortAscText: "Sort Ascending",
        sortDescText: "Sort Descending",
        lockText: "Lock Column",
        unlockText: "Unlock Column",
        columnsText: "Columns"
    });
}

if (Ext.grid.GroupingView) {
    Ext.apply(Ext.grid.GroupingView.prototype, {
        emptyGroupText: '(None)',
        groupByText: 'Group By This Field',
        showGroupsText: 'Show in Groups'
    });
}

if (Ext.grid.PropertyColumnModel) {
    Ext.apply(Ext.grid.PropertyColumnModel.prototype, {
        nameText: "Name",
        valueText: "Value",
        dateFormat: "m/j/Y"
    });
}

if (Ext.layout.BorderLayout && Ext.layout.BorderLayout.SplitRegion) {
    Ext.apply(Ext.layout.BorderLayout.SplitRegion.prototype, {
        splitTip: "Drag to resize.",
        collapsibleSplitTip: "Drag to resize. Double click to hide."
    });
}
