/* global Ext */
function PrintData(requestDataSources, defaultComponentsValue, propertiesWindow) {
    Ext.QuickTips.init();
    this.component_path = "/comun/PrintView/";
    this.requestDataSources = requestDataSources;
    Ext.apply(this, defaultComponentsValue);
    this.gPaperWidth = 11.69;
    this.gPaperHeight = 8.27;
    scopePrintData = this;
    scopePrintData.typeAction = scopePrintData.typeAction || 'export';
    if (!document.getElementById('FileUploadField')) {
        this.loadJs("/lib/js/Extjs/2.2/components/form/FileUploadField/FileUploadField", 'FileUploadField');
        this.loadCSS("/lib/js/Extjs/2.2/resources/css/file-upload");
    }
    this.keyMap = new Ext.KeyMap(Ext.getBody(), [{
            key: 'x',
            alt: true,
            fn: function() {
                scopePrintData.close();
            }
        }, {
            key: Ext.EventObject.ENTER,
            fn: function() {
                if (!Ext.getCmp('btnAceptar').disabled)
                    Ext.getCmp('btnAceptar').handler.call();
            },
            scope: scopePrintData
        }, {
            key: Ext.EventObject.TAB, //TAB
            fn: function() {
                if (document.activeElement.tabIndex == 204) {
                    Ext.getCmp('cbxSysCont').focus(false, 10);
                }
            },
            scope: scopePrintData
        }, {
            key: Ext.EventObject.TAB, //SHIFT+TAB
            shift: true,
            fn: function() {
                if (document.activeElement.tabIndex == 200) {
                    if (Ext.getCmp('btnAceptar').disabled == false) {
                        Ext.getCmp('btnAceptar').focus();
                    } else {
                        Ext.getCmp('btnCancelar').focus();
                    }
                }
            },
            scope: scopePrintData
        }], "keydown");
    scopePrintData.dataStore = new Array();
    scopePrintData.flOption = '';
    scopePrintData.hdCombo = true;
    scopePrintData.lbBtnAceptar = (scopePrintData.typeAction == 'export') ? 'Aceptar configuraci&oacute;n y exportar datos' : 'Aceptar configuraci&oacute;n e importar datos';
    scopePrintData.ttlWinReport = (scopePrintData.typeAction == 'export') ? 'Configuraci&oacute;n para exportar los datos' : 'Configuraci&oacute;n para importar los datos';
    scopePrintData.flfsFormato = 'Formato contable';
    scopePrintData.flOption = 'Formato';
    scopePrintData.dataStore = [['EXCEL']/*, ['DBF']*/];
    Ext.Window.call(this, (propertiesWindow) ? propertiesWindow : {
        onEsc: function() {
            scopePrintData.close();
        },
        title: scopePrintData.ttlWinReport,
        bodyStyle: 'padding:5px 10px 5px 10px',
        resizable: false,
        modal: true,
        id: 'wReporte',
        layout: 'border',
        height: (scopePrintData.typeAction == 'export') ? 220 : 270,
        width: 400,
        defaultButton: (scopePrintData.typeAction == 'export') ? 1 : 0,
        animateTarget: 'btnVistaReporte',
        items: [scopePrintData.fContentPrintInPanelWest(), scopePrintData.fContentPrintInPanelCenter()],
        buttons: [new Ext.Button({
                id: 'btnAceptar',
                text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                disabled: (scopePrintData.typeAction == 'export') ? false : true,
                tabIndex: 204,
                handler: function() {
                    if (scopePrintData.typeAction == 'export') {
                        scopePrintData.fBUILDReport();
                    } else {
                        scopePrintData.fImportData();
                    }
                }
            }), new Ext.Button({
                id: 'btnCancelar',
                text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                tabIndex: 203,
                handler: function() {
                    scopePrintData.close();
                }
            })],
        keys: scopePrintData.keyMap
    });
    return this;
}
PrintData.prototype = new Ext.Window();
PrintData.prototype.loadJs = function(jsSrc, id) {
    if (jsSrc != null)
    {
        var tagScript = document.createElement("script");
        tagScript.setAttribute("id", id);
        tagScript.setAttribute("src", jsSrc + ".js");
        tagScript.setAttribute("type", "text/javascript");
        document.getElementsByTagName("body")[0].appendChild(tagScript);
    }
};
PrintData.prototype.loadCSS = function(dirCSS) {
    if (dirCSS != null)
    {
        var css_style = document.createElement("link");
        css_style.setAttribute("rel", "stylesheet");
        css_style.setAttribute("type", "text/css");
        css_style.setAttribute("href", dirCSS + ".css");
        document.getElementsByTagName("head")[0].appendChild(css_style);
    }
};
PrintData.prototype.fContentPrintInPanelWest = function() {
    PrintData.prototype.cbxSysCont = new Ext.form.ComboBox({
        tabIndex: 200,
        id: 'cbxSysCont',
        fieldLabel: 'Sistemas compatibles',
        store: PrintData.prototype.stTipoReporte = new Ext.data.SimpleStore({
            fields: ['id', 'descripcion'],
            data: [['default', 'DEFAULT']]
//            data: [['zun', 'ZUN ACC'], ['etes', 'DISTRA']]
        }),
        valueField: 'id',
        displayField: 'descripcion',
        hiddenName: 'id',
        tpl: '<tpl for="."><div ext:qtip="{descripcion}" class="x-combo-list-item">{descripcion}</div></tpl>',
        anchor: '95%',
        typeAhead: true,
        mode: 'local',
        value: 'default',
        forceSelection: true,
        triggerAction: 'all',
        emptyText: 'Seleccione...',
        selectOnFocus: true
    });
    PrintData.prototype.cbxTipoReporte = new Ext.form.ComboBox({
        tabIndex: 201,
        id: 'cbxTipoReporte',
        fieldLabel: scopePrintData.flOption,
        store: PrintData.prototype.stTipoReporte = new Ext.data.SimpleStore({
            fields: ['id'],
            data: scopePrintData.dataStore
        }),
        valueField: 'id',
        displayField: 'id',
        hiddenName: 'tipo',
        tpl: '<tpl for="."><div ext:qtip="{id}" class="x-combo-list-item">{id}</div></tpl>',
        anchor: '95%',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        emptyText: 'Seleccione...',
        selectOnFocus: true,
        listeners: {
            render: function(component) {
                component.setValue(scopePrintData.reportType);
            },
            select: function(combo, record, index) {
                Ext.getCmp('dvImage').setStore(scopePrintData.fDataStore(combo.getValue()));
                Ext.getCmp('lSize').hide();
                if (scopePrintData.typeAction == 'import') {
                    Ext.getCmp('sfUpload').reset();
                    Ext.getCmp('btnAceptar').disable();
                }
                switch (combo.getValue()) {
                    case 'DBF':
                        {
                            scopePrintData.fValidateFile();
                        }
                        break;
                    case 'EXCEL':
                        {
                            scopePrintData.fValidateFile();
                        }
                        break;
                    default :
                        {
                            Ext.getCmp('lSize').show();
                            scopePrintData.fValidateFile();
                        }
                        break;
                }
            }
        }
    });
    PrintData.prototype.sfUpload = new Ext.form.FileUploadField({
        tabIndex: 202,
        xtype: 'fileuploadfield',
        width: '98%',
        id: 'sfUpload',
        emptyText: 'Solo archivos .dbf o .xls',
        fieldLabel: 'Archivo',
        minLength: 4,
        regex: /^.+\.(dbf|xls|xlsx|xml|csv)$/i,
        regexText: 'Solo admite archivos con formato .dbf o .xls.',
        name: 'fileUpload',
        tooltip: 'Explorar y buscar archivos para exportar',
        buttonCfg: {
            text: '<i class="fa fa-search bluedark-button"></i> '
        },
        listeners: {
            'invalid': function() {
                Ext.getCmp('btnAceptar').disable();
                Ext.getCmp('btnCancelar').focus(false, 100);
            },
            'valid': function(f) {
                if (f.getValue().length > 0) {
                    scopePrintData.fValidateFile();
                    Ext.getCmp('btnAceptar').enable();
                }
            }
        }
    });
    PrintData.prototype.fsOpciones = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: 'Opciones',
        autoHeight: true,
        autoWidth: true,
        items: (scopePrintData.typeAction == 'export') ? [PrintData.prototype.cbxSysCont, PrintData.prototype.cbxTipoReporte] : [PrintData.prototype.cbxSysCont, PrintData.prototype.cbxTipoReporte, PrintData.prototype.sfUpload]
    });
    return PrintData.prototype.fpPrintView = new Ext.form.FormPanel({
        frame: true,
        border: false,
        region: 'west',
        id: 'fpContentPrintInPanelWest',
        width: 220,
        autoHeight: true,
        fileUpload: true,
        labelAlign: 'top',
        items: [PrintData.prototype.fsOpciones]
    });
};
PrintData.prototype.fContentPrintInPanelCenter = function() {
    var labelHtml = '<center>&nbsp;</center>';
    return new Ext.form.FormPanel({
        frame: true,
        id: 'fpContentPrintInPanelCenter',
        region: 'center',
        labelAlign: 'top',
        items: [new Ext.DataView({
                id: 'dvImage',
                style: 'margin:25 0 0 20',
                store: scopePrintData.fDataStore(scopePrintData.reportType),
                tpl: new Ext.XTemplate(
                        '<tpl for=".">',
                        '<div class="thumb-wrap" id="{name}">',
                        '<div class="thumb"><img src="{url}" title="{name}"></div>',
                        '<span class="x-editable">{shortName}</span></div>',
                        '</tpl>',
                        '<div class="x-clear"></div>'
                        ),
                autoHeight: true,
                autoShow: true,
                overClass: 'x-view-over',
                itemSelector: 'div.thumb-wrap',
                emptyText: 'No existen im&aacute;genes para mostrar.'
            }), new Ext.form.Label({
                id: 'lSize',
                html: labelHtml
            })
        ]
    });
};
PrintData.prototype.fDataStore = function(name) {
    return new Ext.data.SimpleStore({
        fields: ['url', 'name'],
        data: [["/comun/PrintView/views/images/" + name + ".png", name]]
    });
};
PrintData.prototype.onAfterReportShow = function() {
    Ext.CONT.Componentes.HideBox('msgbIniciando');
};
PrintData.prototype.fBUILDReport = function() {
    Ext.CONT.Componentes.MessageBox('msgbIniciando');
    scopePrintData.paramsAjax = {
        dataSources: Ext.encode(scopePrintData.requestDataSources),
        reportType: Ext.getCmp('cbxTipoReporte').getValue(),
        systemCont: Ext.getCmp('cbxSysCont').getValue(),
        typeAction: 'export'
    };
    if (Ext.getCmp('cbxTipoReporte').getValue() == 'EXCEL') {
        Ext.Ajax.request({
            method: "POST",
            params: scopePrintData.paramsAjax,
            url: scopePrintData.component_path + "index.php/printview/savePost",
            callback: function(options, success, response)
            {
                this.responseData = Ext.decode(response.responseText);
                switch (this.responseData.info) {
                    case true:
                        var gWindow = window.open(scopePrintData.component_path + "iindex.php/printview/buildReport", "", "menubar = yes, scrollbars = yes, status = no, toolbar = no, location = yes, resizable = no, titlebar = no", true);
                        scopePrintData.showMask(gWindow);
                        gWindow.onbeforeunload = function() {
                            scopePrintData.onAfterReportShow();
                        };
                        gWindow.focus();
                        break
                    default:
                        scopePrintData.onAfterReportShow();
                        break
                }

            }
        });
    } else {
        Ext.Ajax.request({
            method: "POST",
            params: scopePrintData.paramsAjax,
            url: scopePrintData.component_path + "index.php/printview/exportReport",
            callback: function(options, success, response)
            {
                this.responseData = Ext.decode(response.responseText);
                scopePrintData.onAfterReportShow();
                switch (Ext.getCmp('cbxTipoReporte').getValue()) {
                    case 'DBF':
                        {
                            Ext.DomHelper.append(document.body, {
                                tag: 'iframe',
                                id: 'downloadIframe',
                                frameBorder: 0,
                                width: 0,
                                height: 0,
                                css: 'display:none;visibility:hidden;height:0px;',
                                src: this.responseData.url
                            });
                        }
                        break;
                    case 'XML':
                        {
                            var formexport = document.getElementById('fpContentPrintInPanelWest');
                            formexport.method = 'POST';
                            formexport.target = '_blank';
                            formexport.action = scopePrintData.component_path + "index.php/printview/exportReport";
                            formexport.submit();
                        }
                        break;
                    default:
                        {
                            var gWindow = window.open(this.responseData.url, "", "menubar = yes, scrollbars = yes, status = no, toolbar = no, location = yes, resizable = no, titlebar = no", true);
                            scopePrintData.showMask(gWindow);
                            gWindow.onload = function() {
                                scopePrintData.onAfterReportShow();
                            };
                            gWindow.onbeforeunload = function() {
                                scopePrintData.onAfterReportShow();
                            };
                            gWindow.focus();
                        }
                        break;
                }
            }
        });
    }
};
PrintData.prototype.showMask = function(win) {
    var div1 = document.createElement("div");
    div1.setAttribute("id", "loading-mask");
    div1.setAttribute("style", " background-color; blue;  position:absolute;left:45%; top:40%;padding:2px; z-index:20001; color:#444;font:bold 13px Helvetica, Arial, sans-serif; height:auto;");
    div1.innerHTML = ' <img src="http://' + document.location.host + '/comun/Extjs/resources/images/cargando.gif" width="32" height="32" style="margin-right:8px;float:left;vertical-align:top;"/>Cargando...<br /><span id="loading-msg" style = "font-size: 10px; font-weight: normal;"> Por favor espere...</span>';
    win.document.getElementsByTagName("body")[0].appendChild(div1);
};
PrintData.prototype.fImportData = function() {
    if (Ext.getCmp('sfUpload').getRawValue() == '') {
        MensajeError('Debe introducir un archivo .dbf o .xls.');
    } else {
        if (scopePrintData.fpPrintView.getForm().isValid()) {
            scopePrintData.fpPrintView.getForm().submit({
                url: scopePrintData.component_path + "index.php/printview/importData",
                waitMsg: 'Cargando datos...',
                waitTitle: 'Por favor espere',
                success: function(form, action) {
                    var respData = Ext.decode(action.response.responseText);
                    if (respData.datos.length > 0) {
                        Ext.ImportPedido.init(respData.datos).onSaved(function() {
                            Ext.getCmp('sfUpload').reset();
                            scopePrintData.close();
                        }).onClose(function() {
                            Ext.getCmp('sfUpload').reset();
                            scopePrintData.close();
                        });
                    } else {
                        MensajeInformacion('No existen datos para importar. Por favor, verifique la fuente de los datos.');
                    }
                },
                failure: function(form, action) {
                    var respData = Ext.decode(action.response.responseText);
                    if (action.result.success == false) {
                        MensajeError('Ocurri&oacute; un error durante la ejecuci&oacute;n. Por favor, contacte al administrador del sistema.');
                    }
                    Ext.getCmp('sfUpload').reset();
                    scopePrintData.close();
                }
            });
        } else {
            MensajeError('Debe introducir un archivo .dbf o .xls.');
        }
    }
};
PrintData.prototype.fValidateFile = function() {
    var formatFile = Ext.getCmp('cbxTipoReporte').getValue();
    switch (formatFile) {
        case 'DBF':
            {
                if (scopePrintData.typeAction == 'import') {
                    Ext.getCmp('sfUpload').regex = /^.+\.(dbf)$/i;
                    Ext.getCmp('sfUpload').regexText = 'Debe introducir un archivo dBase(*.dbf).';
                    Ext.getCmp('sfUpload').validateValue(Ext.getCmp('sfUpload').getValue());
                    if (Ext.getCmp('sfUpload').isValid()) {
                        Ext.getCmp('btnAceptar').focus(false, 100);
                    }
                }
            }
            break;
        case 'EXCEL':
            {
                if (scopePrintData.typeAction == 'import') {
                    Ext.getCmp('sfUpload').regex = /^.+\.(xls|xlsx)$/i;
                    Ext.getCmp('sfUpload').regexText = 'Debe introducir un archivo Hoja de cálculo de Microsoft Excel(*.xls).';
                    Ext.getCmp('sfUpload').validateValue(Ext.getCmp('sfUpload').getValue());
                    if (Ext.getCmp('sfUpload').isValid()) {
                        Ext.getCmp('btnAceptar').focus(false, 100);
                    }
                }
            }
            break;
        case 'CSV':
            {
                if (scopePrintData.typeAction == 'import') {
                    Ext.getCmp('sfUpload').regex = /^.+\.(csv)$/i;
                    Ext.getCmp('sfUpload').regexText = 'Debe introducir un archivo Comma Separated Values(*.csv).';
                    Ext.getCmp('sfUpload').validateValue(Ext.getCmp('sfUpload').getValue());
                }
            }
            break;
        case 'XML':
            {
                if (scopePrintData.typeAction == 'import') {
                    Ext.getCmp('sfUpload').regex = /^.+\.(xml)$/i;
                    Ext.getCmp('sfUpload').regexText = 'Debe introducir un archivo eXtensible Markup Language(*.xml).';
                    Ext.getCmp('sfUpload').validateValue(Ext.getCmp('sfUpload').getValue());
                }
            }
            break;
        default :
            {
                Ext.getCmp('dvImage').setStore(scopePrintData.fDataStore(formatFile));
                Ext.getCmp('lSize').show();
            }
            break;
    }
};
