/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function() {
    lMask.hide();
    var nodo, entidad;
    var btnadicionar = new Ext.Button({
        disabled: false,
        id: 'btnadicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar cargo',
        handler: function() {
            showWindowCargo('add');
        }
    });
    var btnmodificar = new Ext.Button({
        id: 'btnmodificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar cargo',
        disabled: true,
        handler: function() {
            if (smcargoplantilla.getSelected())
                showWindowCargo('mod');
        }
    });
    var btneliminar = new Ext.Button({
        id: 'btneliminar',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar cargo',
        disabled: true,
        handler: function() {
            if (smcargoplantilla.getSelected())
                eliminarCargo();
        }
    });
    var btnimprimir = new Ext.Button({
        id: 'btnimprimir',
        text: '<i class="fa fa-print bluedark-button"></i> Imprimir',
        tooltip: 'Imprimir datos de la plantilla',
        handler: loadDataPreview
    });
    var trEntidades = new Ext.tree.TreePanel({
        title: 'Entidades',
        region: 'west',
        collapsible: true,
        split: true,
        rootVisible: false,
        width: 300,
        minSize: 250,
        maxSize: 350,
        autoScroll: true,
        border: false,
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
            dataUrl: 'loadTreeEntidades',
            preloadChildren: false,
            listeners: {
                load: function() {
                    lMask.hide();
                }
            }
        }),
        listeners: {
            click: function(node) {
                if (node.attributes.id != 0) {
                    loadCargosPlantilla(node.attributes.id);
                    nodo = node.attributes.id;
                    entidad = node.attributes.nombre;
                }
            }
        }
    });
    var stcargoplantilla = new Ext.data.Store({
        id: 'stcargoplantilla',
        url: 'loadcargoplantilla',
        sortInfo: {field: 'nombre', direction: "ASC"},
        reader: new Ext.data.JsonReader({
            root: 'data',
            totalProperty: 'total'
        }, [{
                name: 'idcargoplantilla'
            }, {
                name: 'nombre'
            }, {
                name: 'idtipocargo'
            }, {
                name: 'idtipoescala'
            }, {
                name: 'idgrupoescala'
            }, {
                name: 'idsalario'
            }, {
                name: 'idnivelprep'
            }, {
                name: 'idcategoriaocup'
            }, {
                name: 'identidad'
            }, {
                name: 'idareaentidad'
            }, {
                name: 'cantidad'
            }, {
                name: 'salario',
                mapping: 'Salario.salario'
            }, {
                name: 'tipocargo',
                mapping: 'Tipocargo.nombre'
            }, {
                name: 'tipoescala',
                mapping: 'Tipoescala.nombre'
            }, {
                name: 'nivelprep',
                mapping: 'Nivelprep.nombre'
            }, {
                name: 'categoriaocup',
                mapping: 'Categoriaocup.nombre'
            }]),
        baseParams: {
            cadena: ''
        },
        listeners: {
            load: function(e)
            {
                lMask.hide();
                smcargoplantilla.fireEvent('rowdeselect');
                if (this.getCount() > 0)
                    btnimprimir.enable();
                else
                    btnimprimir.disable();
            }
        }
    });
    var tfbuscar = new Ext.form.SearchField({
        id: 'tfbuscar',
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 200,
        store: stcargoplantilla,
        fnOnSearch: function() {
            buscarCargoPlantilla(tfbuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            buscarCargoPlantilla(tfbuscar.getValue());
        }
    });
    var smcargoplantilla = new Ext.grid.RowSelectionModel({
        singleSelect: true
    });
    smcargoplantilla.on({
        rowselect: function(sm, rowIndex, record) {
            btnmodificar.enable();
            btneliminar.enable();
            Ext.getCmp('gpcargoplantilla').getView().addRowClass(rowIndex, "negrita");
        },
        rowdeselect: function(sm, rowIndex, record) {
            btnmodificar.disable();
            btneliminar.disable();
            Ext.getCmp('gpcargoplantilla').getView().removeRowClass(rowIndex, "negrita");
        }
    });
    var rowActionCargo = new Ext.grid.RowActions({
        id: 'rowActionCargo',
        header: 'Acciones',
        actions: [{
                id: 'actionModificar',
                tooltip: 'Modificar datos del cargo',
                iconCls: 'fa fa-edit bluedark-button',
                icon: 'fa fa-edit bluedark-button',
                marginLeft: 5
            }, {
                id: 'actionEliminar',
                tooltip: 'Eliminar datos del cargo',
                iconCls: 'fa fa-trash bluedark-button',
                icon: 'fa fa-trash bluedark-button',
                marginLeft: 5
            }
        ]
    });
    var gpcargoplantilla = new Ext.grid.GridPanel({
        title: 'Cargos asociados a la plantilla de la entidad',
        id: 'gpcargoplantilla',
        region: 'center',
        store: stcargoplantilla,
        autoExpandColumn: 'expand',
        sm: smcargoplantilla,
        plugins: rowActionCargo,
        border: false,
        disabled: true,
        loadMask: true,
        stripeRows: true,
        columns: [
            {
                hidden: true,
                hideable: false,
                sortable: false,
                dataIndex: 'idcargoplantilla'
            }, {
                id: 'expand',
                header: 'Nombre',
                width: 200,
                dataIndex: 'nombre'
            }, {
                header: 'Tipo cargo',
                width: 120,
                dataIndex: 'tipocargo'
            }, {
                header: 'Tipo escala',
                width: 100,
                dataIndex: 'tipoescala'
            }, {
                header: 'Salario',
                width: 80,
                align: 'right',
                dataIndex: 'salario'
            }, {
                header: 'Nivel de prep.',
                width: 100,
                dataIndex: 'nivelprep'
            }, {
                header: 'Categoria ocup.',
                width: 100,
                dataIndex: 'categoriaocup'
            }, {
                header: 'Cantidad',
                width: 60,
                dataIndex: 'cantidad'
            }, rowActionCargo],
        tbar: [btnadicionar, btnmodificar, btneliminar, btnimprimir, '->', tfbuscar, new Ext.Toolbar.TextItem(' ')],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stcargoplantilla,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });
    new Ext.Viewport({
        layout: 'border',
        items: [trEntidades, gpcargoplantilla]
    });

    rowActionCargo.on('action', function(grid, record, action, rowIndex) {
        switch (action) {
            case 'actionModificar':
                btnmodificar.handler.call();
                break;
            case 'actionEliminar':
                btneliminar.handler.call();
                break;
        }
    });

    function showWindowCargo(ind) {
        var stTipoCargo = new Ext.data.Store({
            id: 'idtipocargo',
            url: 'gettipocargo',
            reader: new Ext.data.JsonReader({root: 'data'}, [{name: 'idtipocargo'}, {name: 'nombre'}, {name: 'abreviatura'}, {name: 'codigo'}]),
            listeners: {
                load: function() {
                    lMask.hide();
                }
            }
        });
        var stTipoEscala = new Ext.data.Store({
            id: 'idtipoescala',
            url: 'gettipoescala',
            reader: new Ext.data.JsonReader({root: 'data'}, [{name: 'idtipoescala'}, {name: 'nombre'}, {name: 'abreviatura'}, {name: 'codigo'}]),
            listeners: {
                load: function() {
                    lMask.hide();
                }
            }
        });
        var stGrupoEscala = new Ext.data.Store({
            id: 'idgrupoescala',
            url: 'getgrupoescala',
            reader: new Ext.data.JsonReader({root: 'data'}, [{name: 'idgrupoescala'}, {name: 'nombre'}, {name: 'abreviatura'}, {name: 'codigo'}]),
            listeners: {
                load: function() {
                    lMask.hide();
                }
            }
        });
        var stSalario = new Ext.data.Store({
            id: 'idsalario',
            url: 'getsalario',
            reader: new Ext.data.JsonReader({root: 'data'}, [{name: 'idsalario'}, {name: 'salario'}]),
            listeners: {
                load: function() {
                    lMask.hide();
                }
            }
        });
        var stNivelPrep = new Ext.data.Store({
            id: 'idnivelprep',
            url: 'getnivelpreparacion',
            reader: new Ext.data.JsonReader({root: 'data'}, [{name: 'idnivelprep'}, {name: 'nombre'}, {name: 'abreviatura'}, {name: 'codigo'}]),
            listeners: {
                load: function() {
                    lMask.hide();
                }
            }
        });
        var stCategoria = new Ext.data.Store({
            id: 'idcategoria',
            url: 'getcategoria',
            reader: new Ext.data.JsonReader({root: 'data'}, [{name: 'idcategoriaocup'}, {name: 'nombre'}, {name: 'abreviatura'}]),
            listeners: {
                load: function() {
                    lMask.hide();
                }
            }
        });
        var stAreaEntidad = new Ext.data.Store({
            url: 'loadareasentidad',
            reader: new Ext.data.JsonReader({root: 'data'}, [{name: 'idareaentidad'}, {name: 'nombre'}]),
            listeners: {
                load: function() {
                    lMask.hide();
                }
            }
        });
        var tfnombre = new Ext.form.TextField({
            id: 'tfnombre',
            fieldLabel: 'Nombre',
            name: 'nombre',
            maxLength: 255,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            allowBlank: false,
            anchor: '100%'
        });
        var cbTipoCargo = new Ext.form.ComboBox({
            fieldLabel: 'Tipo cargo',
            id: 'idtipocargo',
            name: 'idtipocargo',
            valueField: 'idtipocargo',
            displayField: 'nombre',
            store: stTipoCargo,
            emptyText: 'Seleccione...',
            mode: 'local',
            triggerAction: 'all',
            allowBlank: false,
            forceSelection: true,
            selectOnFocus: true,
            typeAhead: true,
            resizable: true,
            anchor: '100%'
        });
        var cbTipoEscala = new Ext.form.ComboBox({
            fieldLabel: 'Tipo escala',
            id: 'idtipoescala',
            name: 'idtipoescala',
            valueField: 'idtipoescala',
            displayField: 'nombre',
            store: stTipoEscala,
            emptyText: 'Seleccione...',
            mode: 'local',
            triggerAction: 'all',
            allowBlank: false,
            forceSelection: true,
            selectOnFocus: true,
            typeAhead: true,
            resizable: true,
            anchor: '100%'
        });
        var cbGrupoEscala = new Ext.form.ComboBox({
            fieldLabel: 'Grupo escala',
            id: 'idgrupoescala',
            name: 'idgrupoescala',
            valueField: 'idgrupoescala',
            displayField: 'nombre',
            store: stGrupoEscala,
            emptyText: 'Seleccione...',
            mode: 'local',
            triggerAction: 'all',
            allowBlank: false,
            forceSelection: true,
            selectOnFocus: true,
            typeAhead: true,
            resizable: true,
            anchor: '100%'
        });
        var cbSalario = new Ext.form.ComboBox({
            fieldLabel: 'Salario',
            id: 'idsalario',
            name: 'idsalario',
            valueField: 'idsalario',
            displayField: 'salario',
            store: stSalario,
            emptyText: 'Seleccione...',
            mode: 'local',
            triggerAction: 'all',
            allowBlank: false,
            forceSelection: true,
            selectOnFocus: true,
            typeAhead: true,
            resizable: true,
            anchor: '100%'
        });
        var cbNivelPrep = new Ext.form.ComboBox({
            fieldLabel: 'Nivel preparacion',
            id: 'idnivelprep',
            name: 'idnivelprep',
            valueField: 'idnivelprep',
            displayField: 'nombre',
            store: stNivelPrep,
            emptyText: 'Seleccione...',
            mode: 'local',
            triggerAction: 'all',
            allowBlank: false,
            forceSelection: true,
            selectOnFocus: true,
            typeAhead: true,
            resizable: true,
            anchor: '100%'
        });
        var cbCategoria = new Ext.form.ComboBox({
            fieldLabel: 'Categoria',
            id: 'idcategoriaocup',
            name: 'idcategoriaocup',
            valueField: 'idcategoriaocup',
            displayField: 'nombre',
            store: stCategoria,
            emptyText: 'Seleccione...',
            mode: 'local',
            triggerAction: 'all',
            allowBlank: false,
            forceSelection: true,
            selectOnFocus: true,
            typeAhead: true,
            resizable: true,
            anchor: '100%'
        });
        var cbAreaEntidad = new Ext.form.ComboBox({
            fieldLabel: '&Aacute;rea entidad',
            id: 'idareaentidad',
            name: 'idareaentidad',
            valueField: 'idareaentidad',
            displayField: 'nombre',
            store: stAreaEntidad,
            emptyText: 'Seleccione...',
            mode: 'local',
            triggerAction: 'all',
            allowBlank: false,
            forceSelection: true,
            selectOnFocus: true,
            typeAhead: true,
            resizable: true,
            anchor: '100%'
        });
        var sfCantidad = new Ext.form.SpinnerField({
            id: 'sfCantidad',
            fieldLabel: 'Cantidad',
            name: 'cantidad',
            maxLength: 19,
            allowBlank: false,
            anchor: '100%',
            maskRe: /^[0-9]$/,
            minValue: 1,
            value: 1
        });
        var fpcargos = new Ext.FormPanel({
            frame: true,
            autoHeight: true,
            id: 'fpcargos',
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            style: 'margin: 0 0 0 5',
                            layout: 'form',
                            columnWidth: '1',
                            items: tfnombre
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            style: 'margin: 0 0 0 5',
                            layout: 'form',
                            columnWidth: '.5',
                            items: cbTipoCargo
                        }, {
                            style: 'margin: 0 0 0 10',
                            layout: 'form',
                            columnWidth: '.5',
                            items: cbAreaEntidad
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            style: 'margin: 0 0 0 5',
                            layout: 'form',
                            columnWidth: '.5',
                            items: cbTipoEscala
                        }, {
                            style: 'margin: 0 0 0 10',
                            layout: 'form',
                            columnWidth: '.5',
                            items: cbGrupoEscala
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            style: 'margin: 0 0 0 5',
                            layout: 'form',
                            columnWidth: '.5',
                            items: cbSalario
                        }, {
                            style: 'margin: 0 0 0 10',
                            layout: 'form',
                            columnWidth: '.5',
                            items: cbNivelPrep
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            style: 'margin: 0 0 0 5',
                            layout: 'form',
                            columnWidth: '.5',
                            items: cbCategoria
                        }, {
                            style: 'margin: 0 0 0 10',
                            layout: 'form',
                            columnWidth: '.5',
                            items: sfCantidad
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
            title: '<i class="fa fa-plus"></i> Adicionar cargo',
            width: 500,
            autoHeight: true,
            buttons: [{
                    text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                    handler: function() {
                        return (ind === 'add') ? adicionarCargo() : modificarCargo();
                    }
                },
                {
                    text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                    handler: function() {
                        win.close();
                    }
                }]
        });
        win.add(fpcargos);
        win.setTitle((ind === 'add') ? '<i class="fa fa-plus"></i> Adicionar cargo' : '<i class="fa fa-edit"></i> Modificar cargo');
        win.show();
        tfnombre.focus(false, 100);
        if (ind !== 'add') {
            loadDataCargo(smcargoplantilla.getSelected().data.idsalario, 'mod');
        } else {
            loadDataCargo(0, 'add');
        }
        cbTipoEscala.on('select', function(combo, record, index) {
            if (cbGrupoEscala.getValue()) {
                stSalario.reload({params: {idtipoescala: record.data.idtipoescala, idgrupoescala: cbGrupoEscala.getValue()}});
            } else {
                cbSalario.reset();
                cbSalario.setValue('');
            }
        });
        cbGrupoEscala.on('select', function(combo, record, index) {
            if (cbTipoEscala.getValue()) {
                stSalario.reload({params: {idgrupoescala: record.data.idgrupoescala, idtipoescala: cbTipoEscala.getValue()}});
            } else {
                cbSalario.reset();
                cbSalario.setValue('');
            }
        });
        function adicionarCargo(apl) {
            if (Ext.getCmp('fpcargos').getForm().isValid()) {
                MostrarBarraProgreso('Adicionando cargo a la entidad...');
                Ext.Ajax.request({
                    url: 'adicionarcargo',
                    method: 'POST',
                    callback: function(options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            MensajeInformacion('El cargo fue adicionado correctamente.');
                            if (apl) {
                                Ext.getCmp('fpcargos').getForm().reset();
                            } else {
                                win.close();
                            }
                            stcargoplantilla.reload();
                        } else if (responseData == 2) {
                            MensajeError('El cargo que intenta adicionar ya existe.');
                        } else {
                            win.close();
                            MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                        }
                    },
                    params: {
                        identidad: nodo,
                        nombre: tfnombre.getValue(),
                        idtipocargo: cbTipoCargo.getValue(),
                        idareaentidad: cbAreaEntidad.getValue(),
                        idtipoescala: cbTipoEscala.getValue(),
                        idgrupoescala: cbGrupoEscala.getValue(),
                        idsalario: cbSalario.getValue(),
                        idnivelprep: cbNivelPrep.getValue(),
                        idcategoriaocup: cbCategoria.getValue(),
                        cantidad: sfCantidad.getValue()
                    }
                });
            }
        }
        function modificarCargo() {
            if (Ext.getCmp('fpcargos').getForm().isValid()) {
                MostrarBarraProgreso('Modificando cargo a la entidad...');
                Ext.Ajax.request({
                    url: 'modificarcargo',
                    method: 'POST',
                    callback: function(options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            MensajeInformacion('La entidad fue modificada correctamente.');
                            win.close();
                            stcargoplantilla.reload();
                        } else if (responseData == 2) {
                            Ext.getCmp('fpaddentidades').getForm().reset();
                            MensajeError('Existe un cargo en la entidad con el nombre proporcionado.');
                        } else {
                            win.close();
                            MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                        }
                    },
                    params: {
                        idcargoplantilla: smcargoplantilla.getSelected().data.idcargoplantilla,
                        identidad: nodo,
                        nombre: tfnombre.getValue(),
                        idtipocargo: cbTipoCargo.getValue(),
                        idareaentidad: cbAreaEntidad.getValue(),
                        idtipoescala: cbTipoEscala.getValue(),
                        idgrupoescala: cbGrupoEscala.getValue(),
                        idsalario: cbSalario.getValue(),
                        idnivelprep: cbNivelPrep.getValue(),
                        idcategoriaocup: cbCategoria.getValue(),
                        cantidad: sfCantidad.getValue()
                    }
                });
            }
        }
        function loadDataCargo(idsalario, action) {
            loadMask('Cargando...');
            Ext.Ajax.request({
                url: 'loadDataCargo',
                method: 'POST',
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    callBackLoadDataCargo(responseData, action);
                },
                params: {
                    idsalario: idsalario,
                    identidad: nodo
                }
            });
        }
        function callBackLoadDataCargo(responseData, action) {
            stTipoCargo.loadData(responseData.Tipocargo);
            stTipoEscala.loadData(responseData.Tipoescala);
            stGrupoEscala.loadData(responseData.Grupoescala);
            stNivelPrep.loadData(responseData.NivelPrep);
            stCategoria.loadData(responseData.Categoriaocup);
            stAreaEntidad.loadData(responseData.AreasEntidad);
            if (action == 'mod') {
                stSalario.loadData(responseData.Salario);
                var data = smcargoplantilla.getSelected().data;
                Ext.getCmp('fpcargos').getForm().loadRecord(new Ext.data.Record({
                    'nombre': data.nombre,
                    'idtipocargo': data.idtipocargo,
                    'idareaentidad': data.idareaentidad,
                    'idtipoescala': data.idtipoescala,
                    'idgrupoescala': data.idgrupoescala,
                    'idsalario': data.idsalario,
                    'idnivelprep': data.idnivelprep,
                    'idcategoriaocup': data.idcategoriaocup,
                    'cantidad': data.cantidad
                }));
            }
        }
    }
    function eliminarCargo() {
        function confirmar(btn)
        {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> Eliminar cargo de la entidad', '&iquest;Est&aacute; seguro que desea eliminar el cargo seleccionado?', confirmar);

        function eliminaOK() {
            MostrarBarraProgreso('Eliminando cargo de la entidad...');
            Ext.Ajax.request({
                url: 'deletecargo',
                method: 'POST',
                callback: function(options, success, response) {
                    var respuesta = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (respuesta == 1) {
                        MensajeInformacion('El cargo de la entidad fue eliminado correctamente.');
                        stcargoplantilla.reload();
                    } else if (respuesta == 2) {
                        MensajeError('El cargo de la entidad tiene datos asociados y no puede ser eliminado.');
                    } else {
                        MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                    }
                },
                params: {
                    idcargoplantilla: smcargoplantilla.getSelected().data.idcargoplantilla
                }
            });
        }
    }
    function loadCargosPlantilla(argIdentidad) {
        gpcargoplantilla.setDisabled(false);
        stcargoplantilla.baseParams.identidad = argIdentidad;
        stcargoplantilla.load({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
    function buscarCargoPlantilla(criterio) {
        Ext.getCmp('gpcargoplantilla').getStore().baseParams.criterio = criterio;
        Ext.getCmp('gpcargoplantilla').getStore().reload();
    }
    function loadDataPreview() {
        loadMask('Cargando...');
        Ext.Ajax.request({
            url: 'loadDataPreview',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                if (responseData.datoCuerpo.length > 0) {
                    var printView = new Ext.PrintView({paperSize: "A4", orientation: "Horizontal", reportType: "HTML", data: responseData});
                    printView.show();
                }
                else {
                    MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
                }
                lMask.hide();
            },
            params: {
                identidad: nodo,
                entidad: entidad
            }
        });
    }
});