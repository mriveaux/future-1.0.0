/* global Ext */
if (!Ext.PrintView)
    Ext.ns('Ext.PrintView');
Ext.PrintView = Ext.extend(Ext.Window, {
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
    lbEsperar: 'Por favor espere',
    bodyStyle: 'padding:5px 5px 5px',
    closeAction: 'close', layout: 'border',
    width: 380, height: 320,
    resizable: false, constrain: true,
    modal: true, frame: true,
    paperSize: "A4", orientation: "Horizontal",
    reportType: "HTML", data: new Object(),
    initComponent: function (config) {
        // Your preprocessing here
        Ext.QuickTips.init();
        this.title = '<i class="fa fa-file-text-o"></i> ' + this.lbTtlPrintView;
        this.items = [this.pnlWest(), this.pnlCenter()];
        this.buttons = [new Ext.Button({
                id: 'btnPrintViewAcept',
                text: '<i class="fa fa-check-circle green-button"></i> <b>' + this.lbAceptar + '</b>',
                tooltip: this.lbTtAceptar,
                scope: this,
                handler: function () {
                    this.buildReport();
                }}), new Ext.Button({
                id: 'btnPrintViewCancel',
                text: '<i class="fa fa-times-circle red-button"></i> <b>' + this.lbCancelar + '</b>',
                tooltip: this.lbTtCancelar,
                scope: this,
                handler: function () {
                    this.close();
                }})];
        Ext.apply(this, config);
        Ext.PrintView.superclass.initComponent.call(this);
        // Your postprocessing here
    },
    onEsc: function () {
        this.close();
    },
    pnlCenter: function () {
        var meWinPrintView = this;
        return new Ext.form.FormPanel({
            frame: true,
            id: 'pnlCenter',
            region: 'center',
            labelAlign: 'top',
            items: [new Ext.DataView({
                    id: 'dvImage',
                    style: 'margin:55 0 0 25',
                    store: meWinPrintView.getDataStore(meWinPrintView.orientation + meWinPrintView.reportType),
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
                    emptyText: 'No images to display'
                }), new Ext.form.Label({
                    id: 'lSize',
                    style: 'margin:5 0 0 25',
                    text: meWinPrintView.getSizePage(Ext.getCmp('cbxTipoHoja').getValue())
                })]
        });
    },
    pnlWest: function () {
        var meWinPrintView = this;
        return new Ext.form.FormPanel({
            frame: true,
            region: 'west',
            id: 'pnlWest',
            width: 200,
            labelAlign: 'top',
            items: [{
                    xtype: 'fieldset',
                    title: this.lbFormato,
                    autoHeight: true,
                    autoWidth: true,
                    items: [meWinPrintView.cbxTipoHoja = new Ext.form.ComboBox({
                            id: 'cbxTipoHoja',
                            fieldLabel: this.lbTipoHoja,
                            store: meWinPrintView.stTipoHoja = new Ext.data.SimpleStore({
                                fields: ['id', 'tipo'],
                                data: [['A4', 'A4'], ['LETTER', 'CARTA'], ["LEGAL", "OFICIO"]]
                            }),
                            valueField: 'id',
                            displayField: 'tipo',
                            hiddenName: 'id',
                            tpl: new Ext.XTemplate(
                                    '<tpl for="."><div class="search-item">',
                                    '<div class="name-item">{tipo}</div>',
                                    '<div class="desc-item">{id}</div>',
                                    '</div></tpl>'
                                    ),
                            itemSelector: 'div.search-item',
                            anchor: '90%',
                            typeAhead: true,
                            mode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: this.lbSeleccione,
                            selectOnFocus: true,
                            listeners: {
                                render: function (component) {
                                    component.setValue(meWinPrintView.paperSize);
                                },
                                select: function (combo, record, index) {
                                    Ext.getCmp('lSize').setText(meWinPrintView.getSizePage(combo.getValue()));
                                }
                            }
                        }), meWinPrintView.cbxOrientacion = new Ext.form.ComboBox({
                            id: 'cbxOrientacion',
                            fieldLabel: this.lbOrientacion,
                            store: meWinPrintView.stOrientacion = new Ext.data.SimpleStore({
                                fields: ['id'],
                                data: [['Horizontal'], ['Vertical']]
                            }),
                            valueField: 'id',
                            displayField: 'id',
                            hiddenName: 'id',
                            tpl: '<tpl for="."><div ext:qtip="{id}" class="x-combo-list-item">{id}</div></tpl>',
                            anchor: '90%',
                            typeAhead: true,
                            mode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: this.lbSeleccione,
                            selectOnFocus: true,
                            listeners: {
                                render: function (component) {
                                    component.setValue(meWinPrintView.orientation);
                                },
                                select: function (combo, record, index) {
                                    meWinPrintView.orientation = (combo.getValue() == "Horizontal") ? "Horizontal" : "Vertical";
                                    Ext.getCmp('dvImage').setStore(meWinPrintView.getDataStore(combo.getValue() + Ext.getCmp('cbxTipoReporte').getValue()));
                                    Ext.getCmp('lSize').setText(meWinPrintView.getSizePage(Ext.getCmp('cbxTipoHoja').getValue()));
                                }
                            }
                        })]
                }, {
                    xtype: 'fieldset',
                    title: this.lbReporte,
                    autoHeight: true,
                    autoWidth: true,
                    items: [meWinPrintView.cbxTipoReporte = new Ext.form.ComboBox({
                            id: 'cbxTipoReporte',
                            fieldLabel: this.lbTipoReporte,
                            store: meWinPrintView.stTipoReporte = new Ext.data.SimpleStore({
                                fields: ['id', 'desc'],
                                data: [['HTML', this.lbHtml], ['PDF', this.lbPdf], ['EXCEL', this.lbExcel]]
                            }),
                            valueField: 'id',
                            displayField: 'id',
                            hiddenName: 'tipo',
                            tpl: new Ext.XTemplate(
                                    '<tpl for="."><div class="search-item">',
                                    '<div class="name-item">{id}</div>',
                                    '<div class="desc-item">{desc}</div>',
                                    '</div></tpl>'
                                    ),
                            itemSelector: 'div.search-item',
                            anchor: '90%',
                            typeAhead: true,
                            mode: 'local',
                            forceSelection: true,
                            triggerAction: 'all',
                            emptyText: this.lbSeleccione,
                            selectOnFocus: true,
                            listeners: {
                                render: function (component) {
                                    component.setValue(meWinPrintView.reportType);
                                },
                                select: function (combo, record, index) {
                                    switch (combo.getValue()) {
                                        case 'DBF':
                                            {
                                                Ext.getCmp('cbxTipoHoja').disable();
                                                Ext.getCmp('cbxOrientacion').disable();
                                                Ext.getCmp('lSize').hide();
                                                Ext.getCmp('dvImage').setStore(meWinPrintView.getDataStore(combo.getValue()));
                                            }
                                            break;
                                        case 'XML':
                                            {
                                                Ext.getCmp('cbxTipoHoja').disable();
                                                Ext.getCmp('cbxOrientacion').disable();
                                                Ext.getCmp('lSize').hide();
                                                Ext.getCmp('dvImage').setStore(meWinPrintView.getDataStore(combo.getValue()));
                                            }
                                            break;
                                        default :
                                            {
                                                Ext.getCmp('cbxTipoHoja').enable();
                                                Ext.getCmp('cbxOrientacion').enable();
                                                Ext.getCmp('lSize').show();
                                                Ext.getCmp('dvImage').setStore(meWinPrintView.getDataStore(Ext.getCmp('cbxOrientacion').getValue() + combo.getValue()));
                                            }
                                            break;
                                    }
                                }
                            }
                        })]
                }]
        });
    },
    getDataStore: function (name) {
        return new Ext.data.SimpleStore({
            fields: ['url', 'name'],
            data: [["/comun/PrintView/views/images/" + name + ".png", name]]
        });
    },
    getSizePage: function (sheet) {
        var size, meWinPrintView = this;
        switch (sheet)
        {
            case 'LETTER' :
                size = (meWinPrintView.orientation == "Horizontal") ? "11 x 8.5" : "8.5 x 11";
                break;
            case 'FOLIO' :
                size = (meWinPrintView.orientation == "Horizontal") ? "13 x 8.5" : "8.5 x 13";
                break;
            case 'LEGAL' :
                size = (meWinPrintView.orientation == "Horizontal") ? "14 x 8.5" : "8.5 x 14";
                break;
            default :
                size = (meWinPrintView.orientation == "Horizontal") ? "11.7 x 8.3" : "8.3 x 11.7";
        }
        return size + " in \u2192 \u2191";
    },
    buildReport: function () {
        var meWinPrintView = this;
        Ext.Msg.wait(this.lbGenerar, this.lbEsperar);
        Ext.Ajax.request({
            method: "POST",
            params: {
                dataSources: Ext.encode(meWinPrintView.data),
                reportType: Ext.getCmp('cbxTipoReporte').getValue(),
                reportOrientation: Ext.getCmp('cbxOrientacion').getValue(),
                reportPaperSize: Ext.getCmp('cbxTipoHoja').getValue()
            },
            url: "/comun/PrintView/index.php/printview/savePost",
            callback: function (options, success, response) {
                meWinPrintView.responseData = Ext.decode(response.responseText);
                if (meWinPrintView.responseData.info == true) {
                    var gWindow = window.open("/comun/PrintView/index.php/printview/buildReport", "", "menubar = yes, scrollbars = yes, status = no, toolbar = no, location = yes, resizable = no, titlebar = no", true);
                    meWinPrintView.showMask(gWindow);
                    if (Ext.getCmp('cbxTipoReporte').getValue() == "HTML") {
                        gWindow.onload = function () {
                            Ext.Msg.hide();
                        };
                    }
                    gWindow.onbeforeunload = function () {
                        Ext.Msg.hide();
                    };
                    gWindow.focus();
                } else
                    Ext.Msg.hide();
            }
        });
    },
    showMask: function (win) {
        var div1 = document.createElement("div");
        div1.setAttribute("id", "loading-mask");
        div1.setAttribute("style", " background-color; blue;  position:absolute;left:45%; top:40%;padding:2px; z-index:20001; color:#444;font:bold 13px Helvetica, Arial, sans-serif; height:auto;");
        div1.innerHTML = ' <img src="http://' + document.location.host + '/lib/js/Extjs/2.2/resources/images/cargando.gif" width="32" height="32" style="margin-right:8px;float:left;vertical-align:top;"/>Cargando...<br /><span id="loading-msg" style = "font-size: 10px; font-weight: normal;"> Por favor espere...</span>';
        win.document.getElementsByTagName("body")[0].appendChild(div1);
    }
});
Ext.reg('printview', Ext.PrintView);