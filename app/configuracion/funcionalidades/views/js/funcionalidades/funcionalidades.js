/* global Ext, lMask, futureLang */
Ext.onReady(function() {
    Ext.QuickTips.init();
    new Ext.UiValidations();
    lMask.hide();
    var idmod, node = 0, abrevMod, strSrc = "/app/{0}/{1}/index.php/{1}/{1}";
    var btnadicionar = new Ext.Button({
        id: 'btnadicionar',
        hidden: true,
        disabled: true,
        text: '<i class="fa fa-plus bluedark-button"></i> ' + futureLang.btnAdd,
        tooltip: futureLang.btnTtAdd,
        handler: mostrarAdicionar
    });
    var btnmodificar = new Ext.Button({
        id: 'btnmodificar',
        hidden: true,
        disabled: true,
        text: '<i class="fa fa-edit bluedark-button"></i> ' + futureLang.btnMod,
        tooltip: futureLang.btnTtMod,
        handler: mostrarModificar
    });
    var btneliminar = new Ext.Button({
        id: 'btneliminar',
        hidden: true,
        disabled: true,
        text: '<i class="fa fa-trash bluedark-button"></i> ' + futureLang.btnDel,
        tooltip: futureLang.btnTtDel,
        handler: eliminarFuncionalidad
    });
    var stmodulos = new Ext.data.Store({
        id: 'stmodulos',
        name: 'stmodulos',
        url: 'cargarmodulos',
        autoLoad: true,
        baseParams: {start: 0, limit: 20},
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idRecord',
            totalProperty: 'totalrecords'
        }, [{
                name: 'idmodulo'
            }, {
                name: 'abreviatura'
            }, {
                name: 'nombre'
            }, {
                name: 'icono'
            }, {
                name: 'descripcion'
            }]),
        listeners: {
            'load': function(store, records, options) {
                if (store.getTotalCount() > 0)
                    Ext.getCmp('gpmodulos').getSelectionModel().selectFirstRow();
            }
        }
    });
    var smmodulos = new Ext.grid.RowSelectionModel({
        singleSelect: true,
        listeners: {
            'rowselect': function(smodel, index, record) {
                idmod = record.data.idmodulo;
                abrevMod = record.data.abreviatura;
                var treefunc = Ext.getCmp('trfuncionalidades');
                treefunc.getRootNode().id = 0;
                treefunc.getRootNode().attributes.id = 0;
                treefunc.getRootNode().setText(record.data.nombre);
                treefunc.getLoader().baseParams = {idmodulo: idmod, node: node};
                if (!treefunc.disabled)
                    treefunc.getLoader().load(treefunc.getRootNode());
                else
                    treefunc.setDisabled(false);
                treefunc.getRootNode().expand();
                btnadicionar.disable();
                btnmodificar.disable();
                btneliminar.disable();
            }
        }
    });
    var gpmodulos = new Ext.grid.GridPanel({
        id: 'gpmodulos',
        title: futureLang.lbModulo,
        region: 'center',
        frame: true,
        store: stmodulos,
        autoExpandColumn: 'descripcion',
        sm: smmodulos,
        loadMask: true,
        stripeRows: true,
        columns: [{
                id: 'idmod',
                header: 'idmod',
                width: 200,
                hidden: true,
                dataIndex: 'idmodulo'
            }, {
                id: 'nombre',
                header: futureLang.lbNombre,
                width: 200,
                dataIndex: 'nombre'
            }, {
                id: 'icono',
                header: futureLang.lbIcon,
                width: 120,
                hidden: true,
                dataIndex: 'icono'
            }, {
                id: 'descripcion',
                header: futureLang.lbDescripcion,
                width: 90,
                dataIndex: 'descripcion'
            }],
        bbar: new Ext.PagingToolbar({
            pageSize: 20,
            store: stmodulos,
            displayInfo: true
        })
    });
    var trfuncionalidades = new Ext.tree.TreePanel({
        title: futureLang.lbFuncionalidades,
        id: 'trfuncionalidades',
        autoScroll: true,
        frame: true,
        disabled: true,
        animate: false,
        loadMask: true,
        width: 400,
        region: 'east',
        bodyStyle: 'background-color:#FFFFFF;',
        loader: new Ext.tree.TreeLoader({
            dataUrl: 'cargarfuncionalidades',
            clearOnLoad: true,
            preloadChildren: false,
            requestMethod: 'POST',
            baseParams: {
                idmodulo: idmod
            },
            listeners: {
                beforeload: function() {
                    Ext.getCmp('trfuncionalidades').body.mask(futureLang.msgLoadFunc, 'x-mask-loading');
                },
                load: function() {
                    Ext.getCmp('trfuncionalidades').body.unmask();
                }
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            text: 'Funcionalidades ',
            expanded: false,
            id: 0
        }),
        listeners: {
            click: function(nodo) {
                node = nodo;//se le asigna a la variable node la configuracion del nodo seleccionado
                if (nodo.attributes.id != 0) {
                    btnadicionar.enable();
                    btnmodificar.enable();
                } else {
                    btnadicionar.enable();
                    btnmodificar.disable();
                }
                //si no es padre se habilita el btn de eliminar
                if (nodo.attributes.id != 0 && nodo.attributes.leaf == true) {
                    btneliminar.enable();
                } else
                    btneliminar.disable();
            }
        }
    });
    var pfuncionalidades = new Ext.Panel({
        layout: 'border',
        border: true,
        items: [gpmodulos, trfuncionalidades],
        tbar: [btnadicionar, btnmodificar, btneliminar]
    });
    new Ext.Viewport({
        layout: 'fit',
        items: pfuncionalidades
    });
    function mostrarAdicionar() {
        var tfnombre = new Ext.form.TextField({
            id: 'idnombre',
            fieldLabel: futureLang.lbNombre,
            name: 'nombre',
            maxLength: 100,
            maskRe: /^[ 0-9A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
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
            maskRe: /^[ 0-9A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
            allowBlank: false,
            anchor: '100%',
            enableKeyEvents: true,
            listeners: {
                keyup: function() {
                    Ext.getCmp('tfsrc').setValue(String.format(strSrc, abrevMod, this.getValue()));
                }
            }

        });
        var tfLabel = new Ext.form.TextField({
            fieldLabel: futureLang.lbLabel,
            name: 'label',
            maxLength: 100,
            maskRe: /^[ 0-9A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1\.]+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var cbVersion = new Ext.form.ComboBox({
            id: 'idVersion',
            fieldLabel: futureLang.lbVerExtJs,
            anchor: '100%',
            emptyText: futureLang.lbSeleccion,
            store: new Ext.data.SimpleStore({
                fields: ['idversion', 'version'],
                data: [[2.2, '2.2'], [4.2, '4.2'], [6.2, '6.2']]
            }),
            mode: 'local',
            displayField: 'version',
            valueField: 'idversion',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            value: '2.2'
        });
        var tfsrc = new Ext.form.TextField({
            id: 'tfsrc',
            fieldLabel: futureLang.lbReferencia,
            name: 'src',
            maxLength: 255,
            maskRe: /^[\/a-z\.\"0-9A-z]+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var tadescripcion = new Ext.form.TextArea({
            id: 'iddescripcion',
            fieldLabel: futureLang.lbDescripcion,
            name: 'descripcion',
            maxLength: 255,
            maskRe: /^[ \.0-9A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
            allowBlank: false,
            height: 40,
            anchor: '100%'
        });
        var fpaddfuncionalidades = new Ext.FormPanel({
            autoHeight: true,
            frame: true,
            id: 'fpaddfuncionalidades',
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: .55,
                            items: tfnombre
                        }, {
                            style: 'margin:0 0 0 10',
                            layout: 'form',
                            columnWidth: .45,
                            items: tfLabel
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: .45,
                            items: tfAbreviatura
                        }, {
                            style: 'margin:0 0 0 10',
                            layout: 'form',
                            columnWidth: .25,
                            items: sfIndice
                        }, {
                            style: 'margin:0 0 0 10',
                            layout: 'form',
                            columnWidth: .3,
                            items: cbVersion
                        }]
                }, tadescripcion, tfsrc]
        });
        var winAddFuncionalidad = new Ext.Window({
            modal: true,
            labelAlign: 'top',
            frame: true,
            constrain: true,
            resizable: true,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            closeAction: 'close',
            layout: 'fit',
            title: '<i class="fa fa-plus"></i> ' + futureLang.btnTtAdd,
            width: 450,
            buttons: [{
                    text: '<i class="fa fa-check-circle green-button"></i> <b>' + futureLang.btnAcept + '</b>',
                    handler: function() {
                        adicionarFuncionalidad();
                    }
                }, {
                    text: '<i class="fa fa-times-circle red-button"></i> <b>' + futureLang.btnCancel + '</b>',
                    handler: function() {
                        fpaddfuncionalidades.getForm().reset();
                        winAddFuncionalidad.close();
                    }
                }]
        });
        winAddFuncionalidad.add(fpaddfuncionalidades);
        winAddFuncionalidad.show();
        tfLabel.setValue('Ext.lang.lbDefault');
        function adicionarFuncionalidad() {
            if (Ext.getCmp('fpaddfuncionalidades').getForm().isValid()) {
                MostrarBarraProgreso(futureLang.msgSaveProgress);
                Ext.Ajax.request({
                    url: 'adicionarfuncionalidad',
                    method: 'POST',
                    callback: function(options, success, response) {
                        Ext.MessageBox.hide();
                        var responseData = Ext.decode(response.responseText);
                        if (parseInt(responseData) === 1) {
                            MensajeInformacion(futureLang.msgAdd1);
                            winAddFuncionalidad.close();
                            Ext.getCmp('trfuncionalidades').getRootNode().reload();
                        } else if (parseInt(responseData) === 2) {
                            fpaddfuncionalidades.getForm().reset();
                            MensajeError(futureLang.msgAdd2);
                        } else {
                            winAddFuncionalidad.close();
                            MensajeError(futureLang.msgError);
                        }
                    },
                    params: {
                        nombre: tfnombre.getValue(),
                        src: tfsrc.getValue(),
                        descripcion: tadescripcion.getValue(),
                        idmodulo: idmod,
                        modulo: abrevMod,
                        idpadre: node.id,
                        abreviatura: tfAbreviatura.getValue(),
                        version: cbVersion.getValue(),
                        indice: sfIndice.getValue(),
                        label: tfLabel.getValue()
                    }
                });
            }
        }
    }
    function mostrarModificar() {
        if (smmodulos.getSelected()) {
            var tfnombre = new Ext.form.TextField({
                id: 'idnombre',
                fieldLabel: futureLang.lbNombre,
                name: 'nombre',
                maxLength: 100,
                maskRe: /^[ 0-9A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
                allowBlank: false,
                anchor: '100%'
            });
            var tfAbreviatura = new Ext.form.TextField({
                id: 'idabreviatura',
                fieldLabel: futureLang.lbAbreviatura,
                name: 'tfAbreviatura',
                disabled: true,
                maxLength: 50,
                maskRe: /^[ 0-9A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
                allowBlank: false,
                anchor: '100%',
                enableKeyEvents: true,
                listeners: {
                    keyup: function() {
                        Ext.getCmp('tfsrc').setValue(String.format(strSrc, abrevMod, this.getValue()));
                    }
                }

            });
            var tfLabel = new Ext.form.TextField({
                fieldLabel: futureLang.lbLabel,
                name: 'label',
                maxLength: 100,
                maskRe: /^[ 0-9A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1\.]+$/,
                allowBlank: false,
                anchor: '100%'
            });
            var sfIndice = new Ext.form.SpinnerField({
                id: 'sfIndice',
                fieldLabel: futureLang.lbIndice,
                name: 'mindice',
                maxLength: 19,
                allowBlank: false,
                anchor: '100%',
                maskRe: /^[0-9]$/,
                minValue: 0,
                value: 0
            });
            var tfsrc = new Ext.form.TextField({
                id: 'tfsrc',
                fieldLabel: futureLang.lbReferencia,
                name: 'src',
                maxLength: 255,
                maskRe: /^[\/a-z\.\"0-9A-z]+$/,
                allowBlank: false,
                anchor: '100%'
            });
            var tadescripcion = new Ext.form.TextArea({
                id: 'iddescripcion',
                fieldLabel: futureLang.lbDescripcion,
                name: 'descripcion',
                maxLength: 255,
                maskRe: /^[ \.0-9A-Za-z\xC1\xC9\xCD\xD3\xDA\xD1\xE1\xE9\xED\xF3\xFA\xF1]+$/,
                allowBlank: false,
                height: 40,
                anchor: '100%'
            });
            var fpmodfuncionalidades = new Ext.FormPanel({
                autoHeight: true,
                frame: true,
                id: 'fpmodfuncionalidades',
                labelAlign: 'top',
                items: [{
                        layout: 'column',
                        items: [{
                                layout: 'form',
                                columnWidth: .55,
                                items: tfnombre
                            }, {
                                style: 'margin:0 0 0 10',
                                layout: 'form',
                                columnWidth: .45,
                                items: tfLabel
                            }]
                    }, {
                        layout: 'column',
                        items: [{
                                layout: 'form',
                                columnWidth: .45,
                                items: tfAbreviatura
                            }, {
                                style: 'margin:0 0 0 10',
                                layout: 'form',
                                columnWidth: .25,
                                items: sfIndice
                            }]
                    }, tadescripcion, tfsrc]
            });
            var winModFuncionalidad = new Ext.Window({
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
                width: 450,
                buttons: [{
                        text: '<i class="fa fa-check-circle green-button"></i> <b>' + futureLang.btnAcept + '</b>',
                        handler: function() {
                            modificarFuncionalidad();
                        }
                    },
                    {
                        text: '<i class="fa fa-times-circle red-button"></i> <b>' + futureLang.btnCancel + '</b>',
                        handler: function() {
                            fpmodfuncionalidades.getForm().reset();
                            winModFuncionalidad.close();
                        }
                    }]
            });
            winModFuncionalidad.add(fpmodfuncionalidades);
            winModFuncionalidad.show();
            tfnombre.setValue(node.text);
            tfAbreviatura.setValue(node.attributes.abreviatura);
            tfLabel.setValue(node.attributes.label);
            sfIndice.setValue(node.attributes.indice ? node.attributes.indice : 0);
            tfsrc.setValue(node.attributes.src);
            tadescripcion.setValue(node.attributes.descripcion);
            function modificarFuncionalidad() {
                if (Ext.getCmp('fpmodfuncionalidades').getForm().isValid()) {
                    MostrarBarraProgreso(futureLang.msgSaveProgress);
                    Ext.Ajax.request({
                        url: 'modificarfuncionalidad',
                        method: 'POST',
                        callback: function(options, success, response) {
                            Ext.MessageBox.hide();
                            var responseData = Ext.decode(response.responseText);
                            if (parseInt(responseData) === 1) {
                                MensajeInformacion(futureLang.msgMod1);
                                winModFuncionalidad.close();
                                Ext.getCmp('trfuncionalidades').getRootNode().reload();
                            } else if (parseInt(responseData) === 2) {
                                fpmodfuncionalidades.getForm().reset();
                                MensajeError(futureLang.msgMod2);
                            } else {
                                winModFuncionalidad.close();
                                MensajeError(futureLang.msgError);
                            }
                        },
                        params: {
                            nombre: tfnombre.getValue(),
                            src: tfsrc.getValue(),
                            descripcion: tadescripcion.getValue(),
                            idnodo: node.id,
                            indice: sfIndice.getValue(),
                            label: tfLabel.getValue()
                        }
                    });
                }
            }
        } else {
            MensajeAdvertencia(futureLang.msgSelElem);
        }
    }
    function eliminarFuncionalidad() {
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
                url: 'eliminarfuncionalidad',
                method: 'POST',
                callback: function(options, success, response) {
                    Ext.MessageBox.hide();
                    var responseData = Ext.decode(response.responseText);
                    if (responseData == 1) {
                        MensajeInformacion(futureLang.msgDel1);
                        Ext.getCmp('trfuncionalidades').getRootNode().reload();
                    } else if (responseData == 2) {
                        MensajeError(futureLang.msgDel2);
                    } else {
                        MensajeError(futureLang.msgError);
                    }
                },
                params: {
                    idnodo: node.id
                }
            });
        }
    }
});