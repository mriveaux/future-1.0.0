/*
 This file is part of Ext JS 4.2
 
 Copyright (c) 2011-2013 Sencha Inc
 
 Contact:  http://www.sencha.com/contact
 
 GNU General Public License Usage
 This file may be used under the terms of the GNU General Public License version 3.0 as
 published by the Free Software Foundation and appearing in the file LICENSE included in the
 packaging of this file.
 
 Please review the following information to ensure the GNU General Public License version 3.0
 requirements will be met: http://www.gnu.org/copyleft/gpl.html.
 
 If you are unsure which license is appropriate for your use, please contact the sales department
 at http://www.sencha.com/contact.
 
 Build date: 2013-05-16 14:36:50 (f9be68accb407158ba2b1be2c226a6ce1f649314)
 */
/**
 * Spanish/Latin American Translation by genius551v 04-08-2007
 * Revised by efege, 2007-04-15.
 * Revised by Rafaga2k 10-01-2007 (mm/dd/yyyy)
 * Revised by FeDe 12-13-2007 (mm/dd/yyyy)
 * Synchronized with 2.2 version of ext-lang-en.js (provided by Condor 8 aug 2008)
 *     by halkon_polako 14-aug-2008
 */
Ext.onReady(function () {

    if (Ext.Date) {
        Ext.Date.monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        Ext.Date.getShortMonthName = function (month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            Ene: 0,
            Feb: 1,
            Mar: 2,
            Abr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Ago: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dic: 11
        };

        Ext.Date.getMonthNumber = function (name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

        Ext.Date.getShortDayName = function (day) {
            if (day == 3)
                return "Mié";
            if (day == 6)
                return "Sáb";
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";
    }

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: '.',
            decimalSeparator: ',',
            currencySign: '\u20ac',
            // Spanish Euro
            dateFormat: 'd/m/Y'
        });
    }
});

Ext.ns('Ext.lang');
Ext.lang = {
    please: 'Por favor espere...',
    loading: 'Cargando...',
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
    ago: ' antes',
    periodos: ['segundo', 'minuto', 'hora', 'd&iacute;a', 'semana', 'mes', 'año', 'd&eacute;cada'],
    titles: ['Advertencia', 'Informaci&oacute;n', 'Confirmaci&oacute;n', 'Error', 'Excepci&oacute;n'],
    details: ' Detalles ',
    ttlExc: ' Excepci&oacute;n ocurrida durante la ejecuci&oacute;n',
    msgErrorServer: 'En estos momentos el servidor no ha podido responder la petici&oacute;n realizada. Contacte con el proveedor de soporte, por favor.'
};

Ext.define("Ext.locale.es.comun.PrintView", {
    override: "Ext.comun.PrintView",
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

Ext.define("Ext.locale.es.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("Ext.locale.es.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} fila(s) seleccionada(s)"
});

// changing the msg text below will affect the LoadMask
Ext.define("Ext.locale.es.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Cargando..."
});

Ext.define("Ext.locale.es.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Hoy",
    minText: "La fecha para este campo debe ser despu&eacute;s de {0}",
    maxText: "La fecha para este campo debe ser antes de {0}",
    invalidText: "{0} no es una fecha v&aacute;lida - debe tener el formato {1}",
    disabledDaysText: "Deshabilitado",
    disabledDatesText: "Deshabilitado",
    nextText: 'Mes Siguiente (Control+Right)',
    prevText: 'Mes Anterior (Control+Left)',
    monthYearText: 'Seleccione un mes (Control+Up/Down para desplazar el año)',
    todayTip: "{0} (Barra espaciadora)",
    format: "d/m/Y",
    startDay: 1
});

Ext.define("Ext.locale.es.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;Aceptar&#160;",
    cancelText: "Cancelar"
});

Ext.define("Ext.locale.es.Feet.PagingToolbar", {
    override: "Ext.Feet.PagingToolbar",
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

Ext.define("Ext.locale.es.toolbar.Paging", {
    override: "Ext.PagingToolbar",
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

Ext.define("Ext.locale.es.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "El valor en este campo es inválido"
});

Ext.define("Ext.locale.es.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "El tamaño mínimo para este campo es de {0}",
    maxLengthText: "El tamaño máximo para este campo es de {0}",
    blankText: "Este campo es obligatorio",
    regexText: "",
    emptyText: null
});

Ext.define("Ext.locale.es.form.field.Number", {
    override: "Ext.form.field.Number",
    decimalSeparator: ",",
    decimalPrecision: 2,
    minText: "El valor mínimo para este campo es de {0}",
    maxText: "El valor máximo para este campo es de {0}",
    nanText: "{0} no es un número válido"
});

Ext.define("Ext.locale.es.form.field.File", {
    override: "Ext.form.field.File",
    buttonText: "Examinar..."
});

Ext.define("Ext.locale.es.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Deshabilitado",
    disabledDatesText: "Deshabilitado",
    minText: "La fecha para este campo debe ser posterior a {0}",
    maxText: "La fecha para este campo debe ser anterior a {0}",
    invalidText: "{0} no es una fecha válida - debe tener el formato {1}",
    format: "d/m/Y",
    altFormats: "d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
});

Ext.define("Ext.locale.es.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function () {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Cargando..."
    });
});

Ext.define("Ext.locale.es.ux.form.SearchField", {
    override: "Ext.ux.form.SearchField",
    clearTooltip: 'Limpiar filtros <b>(Esc)</b>',
    searchTooltip: 'Buscar datos <b>(Enter)</b>',
    searchText: 'Buscar {0} <b>(Enter)</b>',
    emptyText: 'Buscar...',
    noResultsText: 'No hay datos que mostrar.'
});

Ext.define("Ext.locale.es.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Este campo debe ser una dirección de correo electrónico con el formato "usuario@dominio.com"',
    emailsText: 'Este campo solo admite direcciones de correo con el formato "usuario@dominio.com" separadas por coma',
    urlText: 'Este campo debe ser una URL con el formato "http:/' + '/www.dominio.com"',
    alphaText: 'Este campo sólo debe contener letras y _',
    alphanumText: 'Este campo sólo debe contener letras, números y _',
    passwordText: 'Las contrase&ntilde;as no coinciden',
    phonesText: 'Este campo solo admite n&uacute;meros telef&oacute;nicos, separados por coma. <b>Ejemplos: <pre>(+53)78352266, 22637945</pre></b>',
    IPAddressText: 'Debe ser una direcci&oacute;n IP v&aacute;lida con el formato "127.0.0.1"',
    timeText: 'Debe ser una hora v&aacute;lida con el formato "12:34 PM"'
});

Ext.define("Ext.locale.es.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: "Por favor proporcione la URL para el enlace:"
}, function () {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Negritas (Ctrl+B)',
                text: 'Transforma el texto seleccionado en Negritas.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Itálica (Ctrl+I)',
                text: 'Transforma el texto seleccionado en Itálicas.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Subrayado (Ctrl+U)',
                text: 'Subraya el texto seleccionado.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Aumentar la fuente',
                text: 'Aumenta el tamaño de la fuente',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Reducir la fuente',
                text: 'Reduce el tamaño de la fuente.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Color de fondo',
                text: 'Modifica el color de fondo del texto seleccionado.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Color de la fuente',
                text: 'Modifica el color del texto seleccionado.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Alinear a la izquierda',
                text: 'Alinea el texto a la izquierda.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Centrar',
                text: 'Centrar el texto.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Alinear a la derecha',
                text: 'Alinea el texto a la derecha.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Lista de viñetas',
                text: 'Inicia una lista con viñetas.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Lista numerada',
                text: 'Inicia una lista numerada.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Enlace',
                text: 'Inserta un enlace de hipertexto.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Código Fuente',
                text: 'Pasar al modo de edición de código fuente.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

Ext.define("Ext.locale.es.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Ordenar en forma ascendente",
    sortDescText: "Ordenar en forma descendente",
    columnsText: "Columnas",
    lockText: "Bloquear Columna",
    unlockText: "Desbloquear Columna"
});

Ext.define("Ext.locale.es.grid.GroupingFeature", {
    override: "Ext.grid.GroupingFeature",
    emptyGroupText: '(Ninguno)',
    groupByText: 'Agrupar por este campo',
    showGroupsText: 'Mostrar en grupos'
});

Ext.define("Ext.locale.es.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Nombre",
    valueText: "Valor",
    dateFormat: "j/m/Y"
});

Ext.define("Ext.locale.es.grid.RowEditor", {
    override: "Ext.grid.RowEditor",
    saveBtnText: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
    cancelBtnText: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
    errorsText: "Errores",
    dirtyText: "Ud. debe guardar los cambios o cancelar los realizados."
});

Ext.define("Ext.locale.es.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: "La hora en este campo debe ser igual o posterior a {0}",
    maxText: "La hora en este campo debe ser igual o anterior a {0}",
    invalidText: "{0} no es una hora válida",
    format: "g:i A",
    altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
});

Ext.define("Ext.locale.es.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    blankText: "Debe seleccionar al menos un item de este grupo"
});

Ext.define("Ext.locale.es.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    blankText: "Debe seleccionar un item de este grupo"
});

Ext.define("Ext.locale.es.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: '<i class="fa fa-check-circle green-button"></i> Aceptar',
        cancel: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        yes: 'S&iacute;',
        no: 'No'
    }
});

// This is needed until we can refactor all of the locales into individual files
Ext.define("Ext.locale.es.Component", {
    override: "Ext.Component"
});