/* global Ext, lMask, futureLang */
Ext.onReady(function() {
    Ext.QuickTips.init();
    new Ext.UiValidations();
    lMask.hide();
    var btnadicionar = new Ext.Button({
        id: 'btnadicionar',
        hidden: true,
        disabled: false,
        text: '<i class="fa fa-plus bluedark-button"></i> ' + futureLang.btnAdd,
        tooltip: futureLang.btnTtAdd,
        handler: mostrarAdicionar
    });
    var btnmodificar = new Ext.Button({
        id: 'btnmodificar',
        hidden: true,
        text: '<i class="fa fa-edit bluedark-button"></i> ' + futureLang.btnMod,
        tooltip: futureLang.btnTtMod,
        handler: mostrarModificar
    });
    var btneliminar = new Ext.Button({
        id: 'btneliminar',
        hidden: true,
        text: '<i class="fa fa-trash bluedark-button"></i> ' + futureLang.btnDel,
        tooltip: futureLang.btnTtDel,
        handler: eliminarModulo
    });
    var stmodulos = new Ext.data.Store({
        id: 'stmodulos',
        name: 'stmodulos',
        url: 'cargarmodulos',
        autoLoad: true, baseParams: {start: 0, limit: 20},
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idRecord',
            totalProperty: 'totalrecords'
        }, [{
                name: 'idmodulo'
            }, {
                name: 'nombre'
            }, {
                name: 'icono'
            }, {
                name: 'abreviatura'
            }, {
                name: 'descripcion'
            }, {
                name: 'indice'
            }, {
                name: 'label'
            }]),
        listeners: {
            'load': function(store, records, options) {
                if (store.getCount() > 0)
                    Ext.getCmp('gpmodulos').getSelectionModel().selectFirstRow();
            }
        }
    });
    var smmodulos = new Ext.grid.RowSelectionModel({
        singleSelect: true
    });
    var gpmodulos = new Ext.grid.GridPanel({
        id: 'gpmodulos',
        store: stmodulos,
        autoExpandColumn: 'descripcion',
        sm: smmodulos,
        border: false,
        loadMask: {
            msg: futureLang.msgLoadFunc
        },
        stripeRows: true,
        columns: [
            {
                id: 'idmod',
                header: 'idmod',
                width: 200,
                hidden: true,
                dataIndex: 'idmodulo'
            }, {
                header: futureLang.lbIndice,
                width: 200,
                dataIndex: 'indice'
            }, {
                id: 'nombre',
                header: futureLang.lbNombre,
                width: 200,
                dataIndex: 'nombre'
            }, {
                id: 'icono',
                header: futureLang.lbIcon,
                width: 120,
                dataIndex: 'icono'
            }, {
                header: futureLang.lbLabel,
                width: 150,
                dataIndex: 'label'
            },
            {
                id: 'descripcion',
                header: futureLang.lbDescripcion,
                width: 90,
                dataIndex: 'descripcion'
            }],
        tbar: [btnadicionar, btnmodificar, btneliminar],
        bbar: new Ext.PagingToolbar({
            pageSize: 20,
            store: stmodulos,
            displayInfo: true
        })
    });
    new Ext.Viewport({layout: 'fit', items: gpmodulos});
    function mostrarAdicionar() {
        var tfnombre = new Ext.form.TextField({
            id: 'idnombre',
            fieldLabel: futureLang.lbNombre,
            name: 'nombre',
            maxLength: 100,
            maskRe: /^[ A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var sfIndice = new Ext.form.SpinnerField({
            id: 'sfIndice',
            fieldLabel: futureLang.lbIndice,
            name: 'indice',
            maxLength: 19,
            allowBlank: false,
            anchor: '100%',
            maskRe: /^[0-9]$/,
            minValue: 0,
            value: 0
        });
        var tfAbreviatura = new Ext.form.TextField({
            id: 'idabreviatura',
            fieldLabel: futureLang.lbAbreviatura,
            name: 'tfAbreviatura',
            maxLength: 50,
            maskRe: /^[ A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var tfLabel = new Ext.form.TextField({
            fieldLabel: futureLang.lbLabel,
            name: 'label',
            maxLength: 100,
            maskRe: /^[ A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1\.]+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var tficono = new Ext.form.TextField({
            id: 'idicono',
            fieldLabel: futureLang.lbIcon,
            name: 'icono',
            maxLength: 50,
            maskRe: /^[ \-a-z]+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var tfdescripcion = new Ext.form.TextArea({
            id: 'iddescripcion',
            fieldLabel: futureLang.lbDescripcion,
            name: 'descripcion',
            maxLength: 255,
            maskRe: /^[ 0-9A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var fpaddmodulos = new Ext.FormPanel({
            autoHeight: true,
            frame: true,
            id: 'fpaddmodulos',
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: 0.6,
                            items: tfnombre
                        }, {
                            style: 'margin:0 8 0 10',
                            layout: 'form',
                            columnWidth: 0.4,
                            items: tfAbreviatura
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: 0.5,
                            items: tfLabel
                        }, {
                            style: 'margin:0 0 0 10',
                            layout: 'form',
                            columnWidth: 0.2,
                            items: sfIndice
                        }, {
                            style: 'margin:0 8 0 10',
                            layout: 'form',
                            columnWidth: 0.3,
                            items: tficono
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: 1,
                            items: tfdescripcion
                        }]
                }]
        });
        var winAddModulo = new Ext.Window({
            autoHeight: true,
            constrain: true,
            modal: true,
            labelAlign: 'top',
            frame: true,
            resizable: true,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            closeAction: 'close',
            layout: 'fit',
            title: '<i class="fa fa-edit"></i> ' + futureLang.btnTtAdd,
            width: 420,
            buttons: [{
                    text: '<i class="fa fa-check-circle green-button"></i> <b>' + futureLang.btnAcept + '</b>',
                    handler: function() {
                        adicionarmodulo();
                    }
                }, {
                    text: '<i class="fa fa-times-circle red-button"></i> <b>' + futureLang.btnCancel + '</b>',
                    handler: function() {
                        fpaddmodulos.getForm().reset();
                        winAddModulo.close();
                    }
                }]
        });
        winAddModulo.add(fpaddmodulos);
        winAddModulo.show();
        function adicionarmodulo() {
            if (Ext.getCmp('fpaddmodulos').getForm().isValid()) {
                MostrarBarraProgreso(futureLang.msgSaveProgress);
                Ext.Ajax.request({
                    url: 'adicionarmodulo',
                    method: 'POST',
                    callback: function(options, success, response) {
                        Ext.MessageBox.hide();
                        var responseData = Ext.decode(response.responseText);
                        if (!responseData == false) {
                            Ext.getCmp('fpaddmodulos').getForm().reset();
                            winAddModulo.close();
                            MensajeInformacion(futureLang.msgAdd1);
                            stmodulos.reload();
                        } else {
                            MensajeError(futureLang.msgError);
                        }
                    },
                    params: {
                        abreviatura: tfAbreviatura.getValue(),
                        nombre: tfnombre.getValue(),
                        descripcion: tfdescripcion.getValue(),
                        icono: tficono.getValue(),
                        indice: sfIndice.getValue(),
                        label: tfLabel.getValue()
                    }
                });
            }
        }
    }
    function mostrarModificar() {
        if (smmodulos.getSelected()) {
            var tfmnombre = new Ext.form.TextField({
                id: 'idmnombre',
                fieldLabel: futureLang.lbNombre,
                name: 'mnombre',
                maxLength: 100,
                maskRe: /^[ A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
                allowBlank: false,
                anchor: '100%'
            });
            var sfmIndice = new Ext.form.SpinnerField({
                id: 'sfmIndice',
                fieldLabel: futureLang.lbIndice,
                name: 'mindice',
                maxLength: 19,
                allowBlank: false,
                anchor: '100%',
                maskRe: /^[0-9]$/,
                minValue: 0,
                value: 0
            });
            var tfmAbreviatura = new Ext.form.TextField({
                id: 'idmabreviatura',
                fieldLabel: futureLang.lbAbreviatura,
                name: 'mAbreviatura',
                maxLength: 50,
                maskRe: /^[ A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
                allowBlank: false,
                anchor: '100%',
                disabled: true,
                readOnly: true
            });
            var tfmLabel = new Ext.form.TextField({
                fieldLabel: futureLang.lbLabel,
                name: 'label',
                maxLength: 100,
                maskRe: /^[ A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1\.]+$/,
                allowBlank: false,
                anchor: '100%'
            });
            var tfmicono = new Ext.form.TextField({
                id: 'idmicono',
                fieldLabel: futureLang.lbIcon,
                name: 'micono',
                maxLength: 50,
                maskRe: /^[ \-a-z]+$/,
                allowBlank: false,
                anchor: '100%'
            });
            var tfmdescripcion = new Ext.form.TextArea({
                id: 'idmdescripcion',
                fieldLabel: futureLang.lbDescripcion,
                name: 'mdescripcion',
                maxLength: 255,
                maskRe: /^[ 0-9A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
                allowBlank: false,
                anchor: '100%'
            });
            var fpmodmodulos = new Ext.FormPanel({
                autoHeight: true,
                frame: true,
                id: 'fpmodmodulos',
                labelAlign: 'top',
                items: [{
                        layout: 'column',
                        items: [{
                                layout: 'form',
                                columnWidth: 0.6,
                                items: tfmnombre
                            }, {
                                style: 'margin:0 8 0 10',
                                layout: 'form',
                                columnWidth: 0.4,
                                items: tfmAbreviatura
                            }]
                    }, {
                        layout: 'column',
                        items: [{
                                layout: 'form',
                                columnWidth: 0.5,
                                items: tfmLabel
                            }, {
                                style: 'margin:0 0 0 10',
                                layout: 'form',
                                columnWidth: 0.2,
                                items: sfmIndice
                            }, {
                                style: 'margin:0 8 0 10',
                                layout: 'form',
                                columnWidth: 0.3,
                                items: tfmicono
                            }]
                    }, {
                        layout: 'column',
                        items: [{
                                layout: 'form',
                                columnWidth: 1,
                                items: tfmdescripcion
                            }]
                    }]
            });
            var winEditModulo = new Ext.Window({
                autoHeight: true,
                constrain: true,
                modal: true,
                labelAlign: 'top',
                frame: true,
                resizable: false,
                bodyStyle: 'padding:5px 5px 5px',
                border: false,
                closeAction: 'close',
                layout: 'fit',
                title: '<i class="fa fa-edit"></i> ' + futureLang.btnTtMod,
                width: 420,
                buttons: [{
                        text: '<i class="fa fa-check-circle green-button"></i> <b>' + futureLang.btnAcept + '</b>',
                        handler: function() {
                            modificarmodulo();
                        }
                    }, {
                        text: '<i class="fa fa-times-circle red-button"></i> <b>' + futureLang.btnCancel + '</b>',
                        handler: function() {
                            fpmodmodulos.getForm().reset();
                            winEditModulo.close();
                        }
                    }]
            });
            winEditModulo.add(fpmodmodulos);
            winEditModulo.show();
            tfmnombre.setValue(smmodulos.getSelected().data.nombre);
            sfmIndice.setValue(smmodulos.getSelected().data.indice);
            tfmAbreviatura.setValue(smmodulos.getSelected().data.abreviatura);
            tfmLabel.setValue(smmodulos.getSelected().data.label);
            tfmicono.setValue(smmodulos.getSelected().data.icono);
            tfmdescripcion.setValue(smmodulos.getSelected().data.descripcion);
        } else {
            MensajeAdvertencia(futureLang.msgSelElem);
        }
        function modificarmodulo() {
            if (Ext.getCmp('fpmodmodulos').getForm().isValid()) {
                MostrarBarraProgreso(futureLang.msgSaveProgress);
                Ext.Ajax.request({
                    url: 'modificarmodulo',
                    method: 'POST',
                    callback: function(options, success, response) {
                        Ext.MessageBox.hide();
                        var responseData = Ext.decode(response.responseText);
                        if (!responseData == false) {
                            Ext.getCmp('fpmodmodulos').getForm().reset();
                            winEditModulo.close();
                            MensajeInformacion(futureLang.msgMod1);
                            stmodulos.reload();
                        } else {
                            MensajeError(futureLang.msgError);
                        }
                    },
                    params: {
                        nombre: tfmnombre.getValue(),
                        descripcion: tfmdescripcion.getValue(),
                        icono: tfmicono.getValue(),
                        idmodulo: smmodulos.getSelected().data.idmodulo,
                        indice: sfmIndice.getValue(),
                        label: tfmLabel.getValue()
                    }
                });
            }
        }
    }
    function eliminarModulo() {
        if (smmodulos.getSelected()) {
            function confirmar(btn)
            {
                if (btn == 'ok') {
                    eliminaOK();
                }
            }
            MensajeInterrogacion('<i class="fa fa-trash"></i> ' + futureLang.btnTtDel, futureLang.promptDelete, confirmar);
            function eliminaOK() {
                MostrarBarraProgreso(futureLang.msgDelProgress);
                Ext.Ajax.request({
                    url: 'eliminarmodulo',
                    method: 'POST',
                    callback: function(options, success, response) {
                        Ext.MessageBox.hide();
                        var responseData = Ext.decode(response.responseText);
                        if (responseData == 1) {
                            MensajeInformacion(futureLang.msgDel1);
                            stmodulos.reload({
                                params: {
                                    start: 0,
                                    limit: 20
                                }
                            });
                        } else if (responseData == 2) {
                            MensajeError(futureLang.msgDel2);
                        } else {
                            MensajeError(futureLang.msgError);
                        }
                    },
                    params: {
                        idmodulo: smmodulos.getSelected().data.idmodulo
                    }
                });
            }
        } else {
            MensajeAdvertencia(futureLang.msgSelElem);
        }

    }
});