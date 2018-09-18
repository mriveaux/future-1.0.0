/* global Ext */
Ext.ns('Ext.comun');
Ext.define('Ext.comun.PrintView', {
    extend: 'Ext.window.Window', alias: 'widget.printview', 
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
    closeAction: 'destroy', layout: 'border', bodyStyle: 'padding:5px 5px 5px', paperSize: "A4", orientation: "Horizontal", reportType: "HTML",
    width: 380, height: 280, autoShow: true, resizable: false, constrain: true, modal: true, frame: true, data: new Object(),
    urlSavePost: '/comun/PrintView/index.php/printview/savePost',
    urlBuildRpt: '/comun/PrintView/index.php/printview/buildReport',
    initComponent: function (config) {
        // Your preprocessing here
        Ext.QuickTips.init();
        this.title = '<i class="fa fa-file-text-o"></i> ' + this.lbTtlPrintView;
        this.items = [this.pnlWest(), this.pnlCenter()];
        this.buttons = [{
                text: '<i class="fa fa-check-circle green-button"></i> <b>' + this.lbAceptar + '</b>',
                tooltip: this.lbTtAceptar,
                scope: this,
                action: 'aprint',
                handler: this.buildReport
            }, {
                text: '<i class="fa fa-times-circle red-button"></i> <b>' + this.lbCancelar + '</b>',
                tooltip: this.lbTtCancelar,
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
        // Your postprocessing here
    },
    pnlCenter: function () {
        var winPrintView = this;
        winPrintView.dvImage = Ext.create('Ext.view.View', {
            store: winPrintView.getDataStore(winPrintView.orientation + winPrintView.reportType),
            tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                    '<center><div style="margin-bottom: 10px; margin-top: 20px;" class="thumb-wrap" id="{name}">',
                    '<div style="vertical-align:middle;" class="thumb"><img src="{url}" title="{name}"></div>',
                    '</div></center>',
                    '</tpl>',
                    '<div class="x-clear"></div>'
                    ),
            autoHeight: true, autoShow: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images available'
        });
        winPrintView.lSize = Ext.create('Ext.form.Label', {
            xtype: 'label',
            id: 'lSize',
            style:"margin-left: 30px",
            text: winPrintView.getSizePage(winPrintView.cbxTipoHoja.getValue())
        });
        winPrintView.pnlCenter = Ext.create('Ext.form.Panel', {
            region: 'center', labelAlign: 'top', frame: true,
            items: [winPrintView.dvImage, winPrintView.lSize]
        });
        return winPrintView.pnlCenter;
    },
    pnlWest: function () {
        var winPrintView = this;
        winPrintView.stTipoHoja = Ext.create('Ext.data.Store', {
            fields: ['id', 'tipo'],
            data: [{"id": "A4", "tipo": "A4"}, {"id": "LETTER", "tipo": "CARTA"}, {"id": "LEGAL", "tipo": "OFICIO"}]
        });
        winPrintView.cbxTipoHoja = Ext.create('Ext.form.ComboBox', {
            store: winPrintView.stTipoHoja,
            displayField: 'tipo', valueField: 'id', hiddenName: 'id', queryMode: 'local', anchor: '100%', labelAlign: 'top',
            editable: true, typeAhead: true, forceSelection: true, selectOnFocus: true,
            fieldLabel: this.lbTipoHoja, emptyText: this.lbSeleccione, itemSelector: 'div.search-item',
            tpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '<div class="x-boundlist-item search-item"><div class="name-item">{tipo}</div><div class="desc-item">{id}</div></div>',
                    '</tpl>'
                    ),
            displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '{tipo}',
                    '</tpl>'
                    ),
            listeners: {
                render: function (component) {
                    component.setValue(winPrintView.paperSize);
                },
                select: function (combo, record, index) {
                    winPrintView.lSize.setText(winPrintView.getSizePage(combo.getValue()));
                }
            }
        });
        winPrintView.stOrientacion = Ext.create('Ext.data.Store', {
            fields: ['id'],
            data: [{"id": "Horizontal"}, {"id": "Vertical"}]
        });
        winPrintView.cbxOrientacion = Ext.create('Ext.form.ComboBox', {
            store: winPrintView.stOrientacion,
            displayField: 'id', valueField: 'id', hiddenName: 'id', queryMode: 'local', anchor: '100%', labelAlign: 'top',
            editable: true, typeAhead: true, forceSelection: true, selectOnFocus: true,
            fieldLabel: this.lbOrientacion, emptyText: this.lbSeleccione,
            tpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '<div ext:qtip="{id}" class="x-boundlist-item">{id}</div>',
                    '</tpl>'
                    ),
            displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '{id}',
                    '</tpl>'
                    ),
            listeners: {
                render: function (component) {
                    component.setValue(winPrintView.orientation);
                },
                select: function (combo, record, index) {
                    winPrintView.orientation = (combo.getValue() == "Horizontal") ? "Horizontal" : "Vertical";
                    winPrintView.dvImage.bindStore(winPrintView.getDataStore(combo.getValue() + winPrintView.cbxTipoReporte.getValue()));
                    winPrintView.lSize.setText(winPrintView.getSizePage(winPrintView.cbxTipoHoja.getValue()));
                }
            }
        });
        winPrintView.stTipoReporte = Ext.create('Ext.data.Store', {
            fields: ['id', 'desc'],
            data: [{"id": "HTML", "desc": this.lbHtml}, {"id": "PDF", "desc": this.lbPdf}, {"id": "EXCEL", "desc": this.lbExcel}]
        });
        winPrintView.cbxTipoReporte = Ext.create('Ext.form.ComboBox', {
            store: winPrintView.stTipoReporte,
            displayField: 'id', valueField: 'id', hiddenName: 'id', queryMode: 'local', anchor: '100%', labelAlign: 'top',
            editable: true, typeAhead: true, forceSelection: true, selectOnFocus: true,
            fieldLabel: this.lbTipoReporte, emptyText: this.lbSeleccione, itemSelector: 'div.search-item',
            tpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '<div class="x-boundlist-item search-item"><div class="name-item">{id}</div><div class="desc-item">{desc}</div></div>',
                    '</tpl>'
                    ),
            displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '{id}',
                    '</tpl>'
                    ),
            listeners: {
                render: function (component) {
                    component.setValue(winPrintView.reportType);
                },
                select: function (combo, record, index) {
                    winPrintView.cbxTipoHoja.enable();
                    winPrintView.cbxOrientacion.enable();
                    winPrintView.lSize.show();
                    winPrintView.dvImage.bindStore(winPrintView.getDataStore(winPrintView.cbxOrientacion.getValue() + combo.getValue()));
                }
            }
        });
        winPrintView.pnlWest = Ext.create('Ext.form.Panel', {
            frame: true, width: 200, region: 'west', labelAlign: 'top',
            items: [{
                    xtype: 'fieldset',
                    title: this.lbFormato,
                    autoHeight: true,
                    autoWidth: true,
                    items: [winPrintView.cbxTipoHoja, winPrintView.cbxOrientacion]
                }, {
                    xtype: 'fieldset',
                    title: this.lbReporte,
                    autoHeight: true,
                    autoWidth: true,
                    items: [winPrintView.cbxTipoReporte]
                }]
        });
        return winPrintView.pnlWest;
    },
    getDataStore: function (name) {
        return new Ext.data.Store({
            fields: ['url', 'name'],
            data: [{"url": "/comun/PrintView/views/images/" + name + ".png", "name": name}]
        });
    },
    getSizePage: function (sheet) {
        var size, winPrintView = this;
        switch (sheet) {
            case 'LETTER' :
                size = (winPrintView.orientation == "Horizontal") ? "11 x 8.5" : "8.5 x 11";
                break;
            case 'FOLIO' :
                size = (winPrintView.orientation == "Horizontal") ? "13 x 8.5" : "8.5 x 13";
                break;
            case 'LEGAL' :
                size = (winPrintView.orientation == "Horizontal") ? "14 x 8.5" : "8.5 x 14";
                break;
            default :
                size = (winPrintView.orientation == "Horizontal") ? "11.7 x 8.3" : "8.3 x 11.7";
        }
        return size + " in \u2192 \u2191";
    },
    buildReport: function () {
        var winPrintView = this;
        if (!Ext.Object.isEmpty(winPrintView.data)) {
            Ext.Msg.wait(this.lbGenerar, this.lbEsperar);
            Ext.Ajax.request({
                method: "POST",
                params: {
                    dataSources: Ext.encode(winPrintView.data),
                    reportType: winPrintView.cbxTipoReporte.getValue(),
                    reportOrientation: winPrintView.cbxOrientacion.getValue(),
                    reportPaperSize: winPrintView.cbxTipoHoja.getValue()
                },
                url: winPrintView.urlSavePost,
                callback: function (options, success, response) {
                    winPrintView.responseData = Ext.decode(response.responseText);
                    if (winPrintView.responseData.info == true) {
                        var gWindow = window.open(winPrintView.urlBuildRpt, "", "menubar = yes, scrollbars = yes, status = no, toolbar = no, location = yes, resizable = no, titlebar = no", true);
                        winPrintView.showMask(gWindow);
                        if (winPrintView.cbxTipoReporte.getValue() == "HTML") {
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
        }
    },
    showMask: function (win) {
        var div1 = document.createElement("div");
        div1.setAttribute("id", "loading-mask");
        div1.setAttribute("style", " background-color; blue;  position:absolute;left:45%; top:40%;padding:2px; z-index:20001; color:#444;font:bold 13px Helvetica, Arial, sans-serif; height:auto;");
        div1.innerHTML = ' <img src="http://' + document.location.host + '/lib/js/Extjs/2.2/resources/images/cargando.gif" width="32" height="32" style="margin-right:8px;float:left;vertical-align:top;"/>Cargando...<br /><span id="loading-msg" style = "font-size: 10px; font-weight: normal;"> Por favor espere...</span>';
        win.document.getElementsByTagName("body")[0].appendChild(div1);
    }
});