/* global Ext, lMask */
var openWindow;
Ext.QuickTips.init();
Ext.onReady(function() {
    lMask.hide();
    var node, areaNode;
    var btnadicionar = new Ext.Button({
        disabled: true,
        id: 'btnadicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> ' + futureLang.lbAdicionar,
        tooltip: futureLang.lbAdicionarEntidad,
        handler: function() {
            showActionWindow('add');
        }
    });
    var btnmodificar = new Ext.Button({
        disabled: true,
        id: 'btnmodificar',
        text: '<i class="fa fa-edit bluedark-button"></i> ' + futureLang.lbModificar,
        tooltip: futureLang.lbModificarEntidad,
        handler: function() {
            showActionWindow('mod');
        }
    });
    var btneliminar = new Ext.Button({
        disabled: true,
        id: 'btnbuscar',
        text: '<i class="fa fa-trash bluedark-button"></i> ' + futureLang.lbEliminar,
        tooltip: futureLang.lbEliminarEntidad,
        handler: deleteEntidad
    });
    var btnAddArea = new Ext.Button({
        disabled: true,
        id: 'btnadicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> ' + futureLang.lbAdicionar,
        tooltip: futureLang.lbAdicionarArea,
        handler: function() {
            showActionWindowArea('add');
        }
    });
    var btnModArea = new Ext.Button({
        disabled: true,
        id: 'btnmodificar',
        text: '<i class="fa fa-edit bluedark-button"></i> ' + futureLang.lbModificar,
        tooltip: futureLang.lbModificarArea,
        handler: function() {
            showActionWindowArea('mod');
        }
    });
    var btnDelArea = new Ext.Button({
        disabled: true,
        id: 'btnbuscar',
        text: '<i class="fa fa-trash bluedark-button"></i> ' + futureLang.lbEliminar,
        tooltip: futureLang.lbEliminarArea,
        handler: deleteArea
    });
    var sfBuscar = new Ext.form.SearchField({
        id: 'sfBuscar',
        lbTtlElement: 'entidad',
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 250,
        fnOnSearch: function() {
            searchEntidad(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            searchEntidad(sfBuscar.getValue());
        }
    });

    var trAreaEntidades = new Ext.tree.TreePanel({
        title: futureLang.lbAreasEntidad,
        tbar: [btnAddArea, btnModArea, btnDelArea],
        region: 'east',
        width: (window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() != 0) ? window.parent.Ext.get('ifContent').getWidth() / 2 : ((window.parent.Ext.get('ifContent') && window.parent.Ext.get('ifContent').getWidth() == 0) ? window.parent.Ext.get('tabview').getWidth() / 2 : window.parent.innerWidth / 2),
        autoScroll: true,
        animate: false,
        disabled: true,
        loadMask: true,
        enableDD: false,
        bodyStyle: 'background-color:#FFFFFF;',
        root: new Ext.tree.AsyncTreeNode({
            text: futureLang.lbAreas,
            expanded: false,
            id: '0'
        }),
        loader: new Ext.tree.TreeLoader({
            dataUrl: 'cargarareaentidad',
            preloadChildren: false,
            listeners: {
                beforeload: function(treeLoader, node) {
                    loadMask("Cargando datos...");
                    btnAddArea.disable();
                    btnModArea.disable();
                    btnDelArea.disable();
                },
                load: function() {
                    lMask.hide();
                }
            }
        }),
        listeners: {
            click: function(nodo) {
                areaNode = nodo;
                if (nodo.attributes.id != 0) {
                    btnAddArea.enable();
                    btnModArea.enable();
                    btnDelArea.setDisabled(!nodo.attributes.leaf);
                } else {
                    btnAddArea.enable();
                    btnModArea.disable();
                    btnDelArea.disable();
                }
            }
        }
    });
    var stProvincias = new Ext.data.Store({
        id: 'idterritorio',
        autoLoad: true,
        url: 'getprovincias',
        reader: new Ext.data.JsonReader({root: 'data', id: 'idterritorio'}, [{name: 'idterritorio'}, {name: 'nombre'}, {name: 'abreviatura'}, {name: 'codigo'}]),
        listeners: {
            beforeload: function() {
                loadMask("Cargando datos...");
            },
            load: function() {
                lMask.hide();
            }
        }
    });
    var trEntidades = new Ext.tree.TreePanel({
        title: futureLang.lbEntidades,
        tbar: [btnadicionar, btnmodificar, btneliminar, '->', sfBuscar],
        region: 'center',
        width: (window.parent.Ext.get('ifContent')) ? window.parent.Ext.get('ifContent').getWidth() / 2 : window.parent.innerWidth / 2,
        autoScroll: true,
        animate: false,
        loadMask: true,
        enableDD: false,
        bodyStyle: 'background-color:#FFFFFF;',
        root: new Ext.tree.AsyncTreeNode({
            text: 'Entidades ',
            expanded: true,
            id: '0'
        }),
        loader: new Ext.tree.TreeLoader({
            dataUrl: 'cargarentidades',
            preloadChildren: false,
            listeners: {
                beforeload: function(treeLoader, node) {
                    if (sfBuscar.hasSearch) {
                        loadMask("Buscando datos...");
                    } else {
                        loadMask("Cargando datos...");
                    }
                    btnadicionar.disable();
                    btnmodificar.disable();
                    btneliminar.disable();
                },
                load: function() {
                    lMask.hide();
                }
            }
        }),
        listeners: {
            click: function(nodo) {
                node = nodo;//se le asigna a la variable node la configuracion del nodo seleccionado
                if (nodo.attributes.id != 0) {
                    trAreaEntidades.setDisabled(false);
                    btnadicionar.enable();
                    btnmodificar.enable();
                    btneliminar.setDisabled(!nodo.attributes.leaf);
                    trAreaEntidades.getRootNode().setText(nodo.attributes.text);
                    trAreaEntidades.getRootNode().id = 0;
                    trAreaEntidades.getLoader().baseParams = {identidad: nodo.attributes.id};
                    trAreaEntidades.getLoader().load(trAreaEntidades.getRootNode());
                } else {
                    trAreaEntidades.setDisabled(true);
                    btnadicionar.enable();
                    btnmodificar.disable();
                    btneliminar.disable();
                }
                btnAddArea.disable();
                btnModArea.disable();
                btnDelArea.disable();
            }
        }
    });
    sfBuscar.loader = trEntidades.getLoader();
    function crearpanelfoto() {
        return new Ext.Panel({
            id: 'pFoto',
            autoHeight: true,
            autoWidth: true,
            border: true,
            autoShow: true,
            html: '<div id = "divFoto"><center><img ext:qtip = ' + futureLang.lbClickFoto + ' id="foto" src="' + sin_foto() +
                    '" alt="" style="cursor:pointer;border:1px solid 000; margin: 0 !important;" height="120" minWidth="140" width="140" onclick="openWindow.show();" ondbclick="openWindow.show();" /></center></div>'
        });
    }
    var formPwindow = new Ext.FormPanel({
        fileUpload: true,
        frame: true,
        border: false,
        buttonAlign: 'right',
        labelWidth: 30,
        items: [{
                xtype: 'fileuploadfield',
                width: '98%',
                id: 'photo',
                emptyText: futureLang.emptyTextImagen,
                fieldLabel: futureLang.lbFoto,
                regex: /^.+\.(jpg|png|jpeg)$/i,
                regexText: futureLang.lbFotosAdmitidas,
                name: 'photoname',
                buttonCfg: {
                    text: '<i class="fa fa-search bluedark-button"></i> '
                }
            }],
        buttons: [{
                text: Ext.lang.btnAcept,
                id: 'aceptar',
                handler: function() {
                    if (Ext.getCmp('photo').getRawValue() == '') {
                        MensajeInformacion(futureLang.lbSelectImagen);
                    } else {
                        /* Validando si el navegador soporta FileReader */
                        if (window.File && window.FileReader && window.FileList && window.Blob) {
                            if (Ext.getCmp('photo').fileInput.dom.files.length) {
                                var file = Ext.getCmp('photo').fileInput.dom.files[0];
                                var reader = new FileReader();
                                reader.onload = function(evt) {
                                    var fileData = evt.target.result;
                                    var bytes = new Uint8Array(fileData);
                                    var base64Img = Base64.encodeByteArray(bytes);

                                    setImagen(base64Img);
                                    openWindow.hide();
                                };
                                reader.readAsArrayBuffer(file);
                            } else {
                                MensajeInformacion(futureLang.lbSelectImagen);
                            }
                        } else {
                            if (formPwindow.getForm().isValid()) {
                                formPwindow.getForm().submit({
                                    url: 'getPicture',
                                    waitMsg: 'etiquetas.lbActFot',
                                    success: function(form, action) {
                                        setImagen(action.result.base64img);
                                        openWindow.hide();
                                    }
                                });
                            } else {
                                MensajeInformacion(futureLang.lbSelectImagen);
                            }
                        }
                        Ext.getCmp('photo').reset();
                    }
                }
            }, {
                text: Ext.lang.btnCancel,
                handler: function() {
                    openWindow.hide();
                }
            }]
    });
    openWindow = new Ext.Window({
        constrain: true,
        plain: true,
        title: futureLang.lbSeleccionarFoto,
        autoHeight: true,
        border: false,
        closeAction: 'hide',
        modal: true,
        layout: 'form',
        width: 500,
        bodyStyle: 'padding: 5px',
        resizable: false,
        closable: false,
        items: formPwindow
    });
    new Ext.Viewport({
        layout: 'border',
        items: [trEntidades, trAreaEntidades]
    });
    function showActionWindow(ind) {
        var pfoto = crearpanelfoto();
        var tfnombre = new Ext.form.TextField({
            id: 'tfnombre',
            fieldLabel: futureLang.lbNombre,
            name: 'nombre',
            maxLength: 255,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var tfabreviatura = new Ext.form.TextField({
            id: 'tfabreviatura',
            fieldLabel: futureLang.lbAbreviatura,
            name: 'abreviatura',
            maxLength: 50,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var tfreeup = new Ext.form.TextField({
            id: 'reeup',
            fieldLabel: futureLang.lbCodigoReeup,
            maxLength: 11,
            minLength: 11,
            name: 'reeup',
            maskRe: /[\d\.]/i,
            regex: /^[\d\.]{11}$/,
            allowBlank: true,
            anchor: '100%'
        });
        var tfnit = new Ext.form.TextField({
            id: 'tfnit',
            fieldLabel: futureLang.lbCodigoNit,
            maxLength: 11,
            minLength: 11,
            name: 'nit',
            maskRe: /[\d\.]/i,
            regex: /^[\d\.]{11}$/,
            allowBlank: true,
            anchor: '100%'
        });
        var tfphones = new Ext.form.TextField({
            id: 'tfphones',
            fieldLabel: futureLang.lbTelefonos,
            name: 'telefonos',
            maxLength: 255,
            minLength: 8,
            allowBlank: true,
            vtype: 'phones',
            anchor: '100%'
        });
        var tfemails = new Ext.form.TextField({
            id: 'tfemails',
            fieldLabel: futureLang.lbCorreos,
            maxLength: 255,
            name: 'correos',
            allowBlank: true,
            vtype: 'emails',
            anchor: '100%'
        });
        var tfweb = new Ext.form.TextField({
            id: 'tfweb',
            fieldLabel: futureLang.lbSitioWeb,
            maxLength: 255,
            name: 'web',
            allowBlank: true,
            vtype: 'url',
            anchor: '100%'
        });
        var tadireccion = new Ext.form.TextArea({
            id: 'tadireccion',
            fieldLabel: futureLang.lbDireccion,
            name: 'direccion',
            maxLength: 255,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\%\"\-\_\(\)\.\#\,\ ]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\%\"\-\_\(\)\.\#\,\ ]*)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\%\"\-\_\(\)\.\#\,\ ]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\%\"\-\_\(\)\.\#\,\ ]*)+$/,
            allowBlank: true,
            anchor: '100%'
        });
        var tadescripcion = new Ext.form.TextArea({
            id: 'tadescripcion',
            fieldLabel: futureLang.lbDescripcion,
            name: 'descripcion',
            maxLength: 255,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var cbProvincia = new Ext.form.ComboBox({
            fieldLabel: futureLang.lbDpa,
            id: 'cbProvincia',
            name: 'idterritorio',
            valueField: 'idterritorio',
            displayField: 'nombre',
            emptyText: futureLang.lbSeleccione,
            store: stProvincias,
            mode: 'local',
            triggerAction: 'all',
            forceSelection: true,
            selectOnFocus: true,
            typeAhead: true,
            allowBlank: false,
            tpl: '<tpl for="."><div ext:qtip="{abreviatura}" class="x-combo-list-item">{nombre}</div></tpl>',
            anchor: '100%'
        });
        var fpentidades = new Ext.FormPanel({
            frame: true,
            autoHeight: true,
            id: 'fpaddentidades',
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: 0.75,
                            items: [{
                                    layout: 'column',
                                    items: [{
                                            layout: 'form',
                                            columnWidth: 0.7,
                                            items: tfnombre
                                        }, {
                                            style: 'margin: 0 0 0 10',
                                            layout: 'form',
                                            columnWidth: 0.3,
                                            items: tfabreviatura
                                        }]
                                }, tadescripcion]
                        }, {
                            style: 'margin: 0 0 0 10',
                            id: 'padrefoto',
                            layout: 'form',
                            anchor: '95%',
                            border: true,
                            frame: true,
                            columnWidth: 0.25,
                            items: pfoto
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: .25,
                            items: tfreeup
                        }, {
                            style: 'margin: 0 0 0 10',
                            layout: 'form',
                            columnWidth: .25,
                            items: tfnit
                        }, {
                            style: 'margin: 0 0 0 10',
                            layout: 'form',
                            columnWidth: .5,
                            items: tfphones
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: .5,
                            items: tfemails
                        }, {
                            style: 'margin: 0 0 0 10',
                            layout: 'form',
                            columnWidth: .5,
                            items: tfweb
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: .5,
                            items: cbProvincia
                        }, {
                            style: 'margin: 0 0 0 10',
                            layout: 'form',
                            columnWidth: .5,
                            items: tadireccion
                        }]
                }]
        });
        var win = new Ext.Window({
            constrain: true,
            modal: true,
            labelAlign: 'top',
            frame: true,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            closeAction: 'close',
            layout: 'fit',
            width: 700,
            autoHeight: true,
            buttons: [{
                    text: Ext.lang.btnAcept,
                    handler: function() {
                        return (ind === 'add') ? adicionarEntidad() : modificarEntidad();
                    }
                },
                {
                    text: Ext.lang.btnCancel,
                    handler: function() {
                        win.close();
                    }
                }]
        });
        win.add(fpentidades);
        win.setTitle((ind === 'add') ? '<i class="fa fa-plus"></i> ' + futureLang.lbAdicionarEntidad : '<i class="fa fa-edit"></i> ' + futureLang.lbModificarEntidad);
        win.on({
            show: function(cmp) {
                if (!trEntidades.getSelectionModel().getSelectedNode().id == 0)
                    trAreaEntidades.setDisabled(false);
            },
            beforeclose: function(cmp) {
                if (trEntidades.getSelectionModel().getSelectedNode().id == 0)
                    trAreaEntidades.setDisabled(true);
                else
                    trAreaEntidades.setDisabled(false);
            }
        });
        win.show();
        tfnombre.focus(false, 100);
        if (ind !== 'add') {//se hace loadData para el modificar
            tfnombre.setValue(node.attributes.text);
            Ext.getCmp('fpaddentidades').getForm().loadRecord(new Ext.data.Record({
                'nombre': node.attributes.text,
                'abreviatura': node.attributes.abreviatura,
                'descripcion': node.attributes.descripcion,
                'reeup': node.attributes.reeup,
                'nit': node.attributes.nit,
                'correos': node.attributes.correos,
                'web': node.attributes.web,
                'telefonos': node.attributes.telefonos,
                'idterritorio': node.attributes.idterritorio,
                'direccion': node.attributes.direccion
            }));
            if (node.attributes.base64img) {
                document.getElementById('foto').src = "data:image/jpg;base64," + node.attributes.base64img;
                document.getElementById('foto').base64img = node.attributes.base64img;
            }
        }
        function adicionarEntidad(apl) {
            if (Ext.getCmp('fpaddentidades').getForm().isValid()) {
                MostrarBarraProgreso(futureLang.lbGuardandoEntidad);
                var params = Ext.getCmp('fpaddentidades').getForm().getValues();
                params.idpadre = node.id;
                params.idterritorio = Ext.getCmp('cbProvincia').getValue();
                params.base64img = (document.getElementById('foto').base64img) ? document.getElementById('foto').base64img : '';
                Ext.Ajax.request({
                    url: 'adicionarentidad',
                    method: 'POST',
                    callback: function(options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            MensajeInformacion(futureLang.lbOkAdicionarEntidad);
                            if (apl) {
                                Ext.getCmp('fpaddentidades').getForm().reset();
                            } else {
                                win.close();
                            }
                            if (node.id != 0) {
                                node.parentNode.reload();
                            } else {
                                trEntidades.getRootNode().reload();
                            }

                        } else if (responseData == 2) {
                            MensajeError(futureLang.lbAdicionarExisteEntidad);
                        } else {
                            win.close();
                            MensajeError(futureLang.lbMsgError);
                        }
                    },
                    params: params
                });
            }
        }
        function modificarEntidad() {
            if (Ext.getCmp('fpaddentidades').getForm().isValid()) {
                MostrarBarraProgreso(futureLang.lbGuardandoEntidad);
                var params = Ext.getCmp('fpaddentidades').getForm().getValues();
                params.idpadre = node.id;
                params.idnodo = node.id;
                params.idterritorio = Ext.getCmp('cbProvincia').getValue();
                params.base64img = (document.getElementById('foto').base64img) ? document.getElementById('foto').base64img : '';
                Ext.Ajax.request({
                    url: 'modificarentidad',
                    method: 'POST',
                    callback: function(options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            MensajeInformacion(futureLang.lbOkModificarEntidad);
                            win.close();
                            if (node.id != 0) {
                                node.parentNode.reload();
                            } else {
                                trEntidades.getRootNode().reload();
                            }
                        } else if (responseData == 2) {
                            Ext.getCmp('fpaddentidades').getForm().reset();
                            MensajeError(futureLang.lbModificarExisteEntidad);
                        } else {
                            win.close();
                            MensajeError(futureLang.lbMsgError);
                        }
                    },
                    params: params
                });
            }
        }
    }
    function setImagen(base64Img) {
        document.getElementById('foto').src = 'data:image/jpg;base64,' + base64Img;
        document.getElementById('foto').base64img = base64Img;
        var p = Ext.get('pFoto');
        Ext.get('pFoto').scale(p.getSize().width, p.getSize().heigth);
    }
    function deleteEntidad() {
        function confirmar(btn)
        {
            if (btn == 'ok') {
                eliminaOK();
            }
        }//fin de la funcion confirmacion
        MensajeInterrogacion('<i class="fa fa-trash"></i> ' + futureLang.lbEliminarEntidad, futureLang.lbPromptEliminarEntidad, confirmar)

        //funcion que manda a eliminar
        function eliminaOK() {
            MostrarBarraProgreso(futureLang.lbEliminandoEntidad);
            Ext.Ajax.request({
                url: 'eliminarentidad',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion(futureLang.lbOkEliminarEntidad);
                        node.parentNode.reload();
                        trAreaEntidades.setDisabled(true);
                        disabledAllButtons();
                    } else if (responseData == 2) {
                        MensajeError(futureLang.lbEliminarError);
                    } else {
                        MensajeError(futureLang.lbMsgError);
                    }
                },
                params: {
                    idnodo: node.id
                }
            });
        }//fin de la funcion eliminaOK   
    }
    function disabledAllButtons() {
        btnadicionar.disable();
        btnmodificar.disable();
        btneliminar.disable();
        btnAddArea.disable();
        btnModArea.disable();
        btnDelArea.disable();
    }
    function searchEntidad(criterio) {
        trEntidades.getLoader().baseParams.criterio = criterio;
        trEntidades.getLoader().load(trEntidades.getRootNode(), function() {
            trEntidades.getRootNode().expand();
        });
    }
    function showActionWindowArea(ind) {
        var tfcodigo = new Ext.form.TextField({
            id: 'tfcodigo',
            name: 'codigo',
            fieldLabel: futureLang.lbCodigo,
            maxLength: 11,
            maskRe: /^[0-9]+$/,
            allowBlank: true,
            anchor: '100%'
        });
        var tfabreviatura = new Ext.form.TextField({
            id: 'tfabreviatura',
            name: 'abreviatura',
            fieldLabel: futureLang.lbAbreviatura,
            maxLength: 50,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var tfnombre = new Ext.form.TextField({
            id: 'tfnombre',
            name: 'nombre',
            fieldLabel: futureLang.lbNombre,
            maxLength: 255,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            allowBlank: false,
            anchor: '100%'
        });

        var fpAreaEntidad = new Ext.FormPanel({
            frame: true,
            autoHeight: true,
            id: 'fpAreaEntidad',
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            layout: 'form',
                            columnWidth: 0.4,
                            items: tfcodigo
                        }, {
                            style: 'margin: 0 0 0 10',
                            layout: 'form',
                            columnWidth: 0.6,
                            items: tfabreviatura
                        }]
                }, {
                    layout: 'form',
                    items: tfnombre
                }]
        });
        var win = new Ext.Window({
            constrain: true,
            modal: true,
            labelAlign: 'top',
            frame: true,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            closeAction: 'close',
            layout: 'fit',
            width: 450,
            autoHeight: true,
            buttons: [{
                    text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                    handler: function() {
                        return (ind === 'add') ? adicionarAreaEntidad() : modificarAreaEntidad();
                    }
                },
                {
                    text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                    handler: function() {
                        win.close();
                    }
                }]
        });
        win.add(fpAreaEntidad);
        win.setTitle((ind === 'add') ? '<i class="fa fa-plus"></i> ' + futureLang.lbAdicionarArea : '<i class="fa fa-edit"></i> ' + futureLang.lbModificarArea);
        win.show();
        tfcodigo.focus(false, 100);
        if (ind !== 'add') {//se hace loadData para el modificar
            Ext.getCmp('fpAreaEntidad').getForm().loadRecord(new Ext.data.Record({
                'codigo': areaNode.attributes.codigo,
                'abreviatura': areaNode.attributes.abreviatura,
                'nombre': areaNode.attributes.nombre
            }));
        }
        function adicionarAreaEntidad() {
            if (Ext.getCmp('fpAreaEntidad').getForm().isValid()) {
                MostrarBarraProgreso(futureLang.lbGuardandoArea);
                var params = Ext.getCmp('fpAreaEntidad').getForm().getValues();
                params.idpadre = areaNode.id;
                params.identidad = node.id;
                Ext.Ajax.request({
                    url: 'adicionarareaentidad',
                    method: 'POST',
                    callback: function(options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            MensajeInformacion(futureLang.lbOkAdicionarArea);
                            win.close();
                            if (areaNode.id != 0) {
                                areaNode.parentNode.reload();
                            } else {
                                trAreaEntidades.getRootNode().reload();
                            }

                        } else if (responseData == 2) {
                            MensajeError(futureLang.lbAdicionarExisteArea);
                        } else {
                            win.close();
                            MensajeError(futureLang.lbMsgError);
                        }
                    },
                    params: params
                });
            }
        }
        function modificarAreaEntidad() {
            if (Ext.getCmp('fpAreaEntidad').getForm().isValid()) {
                MostrarBarraProgreso(futureLang.lbGuardandoArea);
                var params = Ext.getCmp('fpAreaEntidad').getForm().getValues();
                params.idnodo = areaNode.id;
                params.identidad = node.id;
                Ext.Ajax.request({
                    url: 'modificarareaentidad',
                    method: 'POST',
                    callback: function(options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            MensajeInformacion(futureLang.lbOkModificarArea);
                            win.close();
                            if (areaNode.id != 0) {
                                areaNode.parentNode.reload();
                            } else {
                                trAreaEntidades.getRootNode().reload();
                            }
                        } else if (responseData == 2) {
                            Ext.getCmp('fpAreaEntidad').getForm().reset();
                            MensajeError(futureLang.lbModificarExisteArea);
                        } else {
                            win.close();
                            MensajeError(futureLang.lbMsgError);
                        }
                    },
                    params: params
                });
            }
        }
    }
    function deleteArea() {
        function confirmar(btn) {
            if (btn == 'ok') {
                eliminaAreaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> ' + futureLang.lbEliminarArea, futureLang.lbPromptEliminarArea, confirmar);

        function eliminaAreaOK() {
            MostrarBarraProgreso(futureLang.lbEliminandoArea);
            Ext.Ajax.request({
                url: 'eliminarareaentidad',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion(futureLang.lbOkEliminarArea);
                        areaNode.parentNode.reload();
                    } else if (responseData == 2) {
                        MensajeError(futureLang.lbEliminarErrorArea);
                    } else {
                        MensajeError(futureLang.lbMsgError);
                    }
                },
                params: {
                    idnodo: areaNode.id
                }
            });
        }
    }
});