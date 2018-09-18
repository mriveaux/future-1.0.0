/* global Ext, lMask */
Ext.onReady(function() {
    lMask.hide();
    new Ext.UiValidations();
    Ext.QuickTips.init();
    var smroles;

    var btnadicionar = new Ext.Button({
        id: 'idbtnadicionar',
        text: Ext.lang.btnAdd,
        tooltip: futureLang.ttaddrol,
        hidden: true,
        handler: function() {
            reRoles.stopEditing();
            reRoles.insertRow();
        }
    });
    var btnmodificar = new Ext.Button({
        disabled: true,
        id: 'idbtnmodificar',
        text: Ext.lang.btnMod,
        tooltip: futureLang.ttmodrol,
        hidden: true,
        handler: function() {
            if (Ext.getCmp('gproles').getSelectionModel().getSelected()) {
                var indexRowSel = Ext.getCmp('gproles').getSelectionModel().getSelectedIndex();
                reRoles.startEditing(indexRowSel);
            } else {
                MensajeInformacion(futureLang.msgselectrol);
            }
        }
    });
    var btneliminar = new Ext.Button({
        disabled: true,
        id: 'idbtneliminar',
        text: Ext.lang.btnDel,
        tooltip: futureLang.ttdelrol,
        hidden: true,
        handler: function() {
            if (Ext.getCmp('gproles').getSelectionModel().getSelected()) {
                if (Ext.getCmp('gproles').getSelectionModel().getSelected().data.idroles.toString().length > 0) {
                    eliminarRol();
                }
            } else {
                MensajeInformacion(futureLang.msgselectrol);
            }
        }
    });
    var btnfuncionalidades = new Ext.Button({
        disabled: true,
        id: 'idbtnfuncionalidades',
        text: '<i class="fa fa-hand-o-down bluedark-button"></i> ' + futureLang.btnasig,
        tooltip: futureLang.lbasig,
        hidden: true,
        handler: function() {
            AsignarFuncionalidades(smroles.getSelected().data.idroles);
        }
    });
    var btnrecursos = new Ext.Button({
        disabled: true,
        id: 'idbtnrecursos',
        text: '<i class="fa fa-hand-o-down bluedark-button"></i> ' + futureLang.btnasigrecurso,
        tooltip: futureLang.btnasigrecurso,
        hidden: true,
        handler: function() {
            AsignarRecursos(smroles.getSelected().data.idroles);
        }
    });

    var stroles = new Ext.data.Store({
        id: 'stmodulos',
        name: 'stmodulos',
        url: 'cargarroles',
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idRecord',
            totalProperty: 'totalrecords'
        }, [{
                name: 'idroles'
            }, {
                name: 'nombre'
            }, {
                name: 'descripcion'
            }]),
        listeners: {
            load: function(e) {
                lMask.hide();
                smroles.fireEvent('rowdeselect');
            }
        }
    });
    stroles.load({
        params: {
            start: 0,
            limit: 20
        }
    });
    var sfBuscar = new Ext.form.SearchField({
        id: 'sfBuscar',
        width: 200,
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s %\"\-\_\/\(\)\[\]\*\.\;\:\#\+\,\&]*)+$/,
        store: stroles,
        fnOnSearch: function() {
            buscar(sfBuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            buscar(sfBuscar.getValue());
        }
    });
    smroles = new Ext.grid.RowSelectionModel({
        id: 'smroles',
        singleSelect: true,
        listeners: {
            rowselect: function() {
                btnmodificar.enable();
                btneliminar.enable();
                btnfuncionalidades.enable();
                btnrecursos.enable();
            },
            rowdeselect: function() {
                btnmodificar.disable();
                btneliminar.disable();
                btnrecursos.disable();
            }

        }
    });
    var reRoles = new Ext.grid.RowEditor({
        id: 'reRoles',
        clicksToEdit: 2,
        saveText: '<i class="fa fa-floppy-o green-button"></i> Guardar',
        cancelText: '<i class="fa fa-times-circle red-button"></i> Cancelar',
        listeners: {
            canceledit: function(editor, grid, changes, record, rowIndex) {
                btnadicionar.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gproles').getBottomToolbar().enable();
                if (Ext.getCmp('gproles').getSelectionModel().getSelected()) {
                    btnmodificar.setDisabled(false);
                    btneliminar.setDisabled(false);
                    btnfuncionalidades.setDisabled(false);
                    btnrecursos.setDisabled(false);
                } else {
                    btnmodificar.setDisabled(true);
                    btneliminar.setDisabled(true);
                    btnfuncionalidades.setDisabled(true);
                    btnrecursos.setDisabled(true);
                }
            },
            beforeedit: function(editor, grid, changes, record, rowIndex) {
                btnadicionar.setDisabled(true);
                btnmodificar.setDisabled(true);
                btneliminar.setDisabled(true);
                btnfuncionalidades.setDisabled(true);
                btnrecursos.setDisabled(true);
                sfBuscar.disable();
                Ext.getCmp('gproles').getBottomToolbar().disable();
            },
            afteredit: function(editor, grid, changes, record, rowIndex) {
                btnadicionar.setDisabled(false);
                btnmodificar.setDisabled(false);
                btneliminar.setDisabled(false);
                btnfuncionalidades.setDisabled(false);
                btnrecursos.setDisabled(false);
                sfBuscar.enable();
                Ext.getCmp('gproles').getBottomToolbar().enable();
                validateChanges(record, changes);
            }
        }
    });
    var gproles = new Ext.grid.EditorGridPanel({
        id: 'gproles',
        store: stroles,
        autoExpandColumn: 'descripcion',
        sm: smroles,
        border: false,
        loadMask: true,
        stripeRows: true,
        plugins: reRoles,
        columns: [
            {
                id: 'nombre',
                header: futureLang.lbnombre,
                width: 200,
                dataIndex: 'nombre',
                editor: new Ext.form.TextField({
                    id: 'tfnombrerol',
                    name: 'tfnombrerol',
                    fieldLabel: futureLang.lbnombrerol,
                    maxLength: 100,
                    allowBlank: false
                })
            }, {
                id: 'descripcion',
                header: futureLang.lbdescripcion,
                width: 90,
                dataIndex: 'descripcion',
                editor: new Ext.form.TextField({
                    id: 'tfdescripcion',
                    name: 'tfdescripcion',
                    fieldLabel: futureLang.lbdescripcion,
                    maxLength: 255,
                    allowBlank: false
                })
            }, {
                id: 'idroles',
                header: 'idroles',
                width: 200,
                hidden: true,
                hideable: false,
                dataIndex: 'idroles'
            }],
        tbar: [btnadicionar, btnmodificar, btneliminar, btnfuncionalidades, btnrecursos, '->', sfBuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stroles,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        })
    });

    new Ext.Viewport({
        layout: 'fit',
        items: gproles
    });

    Ext.grid.RowSelectionModel.override({
        getSelectedIndex: function() {
            return this.grid.store.indexOf(this.selections.itemAt(0));
        }
    });
    function buscar(criterio) {
        var modified = Ext.getCmp('gproles').getStore().getModifiedRecords();
        if (modified.length > 0) {
            MensajeInformacion("A&uacute;n existen cambios realizados que no han sido guardados o descartados");
        } else {
            Ext.getCmp('gproles').getStore().baseParams.criterio = criterio;
            Ext.getCmp('gproles').getBottomToolbar().changePage(1);
            Ext.getCmp('gproles').getStore().reload();
        }
    }

    function validateChanges(record, changes) {
        if (record.data.idroles == "")
            adicionarRol(record.data.nombre, record.data.descripcion);
        else
            modificarRol(record.data.idroles, record.data.nombre, record.data.descripcion);
    }

    function adicionarRol(argNombre, argDescripcion) {
        MostrarBarraProgreso(futureLang.msgaddrol);
        Ext.Ajax.request({
            url: 'adicionarrol',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 0) {// 0 significa que adiciono bien
                    MensajeInformacion(futureLang.msgconfirmaddrol);
                    stroles.reload();
                    smroles.fireEvent('rowdeselect');
                }
                else if (responseData == 1) {// 1 significa que ya existe ese nombre de rol
                    MensajeError(futureLang.msgchangenamerol);
                }
                else {// 2 significa que dio error
                    MensajeError(futureLang.msgajaxerror);
                }
            },
            params: {
                nombre: argNombre,
                descripcion: argDescripcion
            }
        });
    }

    function modificarRol(argIdRol, argNombre, argDescripcion) {
        MostrarBarraProgreso(futureLang.msgmodrol);
        Ext.Ajax.request({
            url: 'modificarrol',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData) {
                    MensajeInformacion(futureLang.msgconfirmmodrol);
                    stroles.reload();
                    smroles.fireEvent('rowdeselect');
                }
                else {
                    MensajeError(futureLang.msgajaxerror);
                }
            },
            params: {
                idrol: argIdRol,
                nombre: argNombre,
                descripcion: argDescripcion
            }
        });
    }

    function eliminarRol() {
        function confirmar(btn)
        {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion('<i class="fa fa-trash"></i> ' + futureLang.lbdelrol, futureLang.questdeleterol, confirmar)

        function eliminaOK() {
            MostrarBarraProgreso(futureLang.msgdelrol);
            Ext.Ajax.request({
                url: 'eliminarrol',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 2) {
                        MensajeInformacion(futureLang.msgconfirmdelrol);
                        stroles.reload();
                    }
                    else if (responseData == 1) {
                        MensajeError(futureLang.msgdelrolasocied);
                    }
                    else {
                        MensajeError(futureLang.msgajaxerror);
                    }
                },
                params: {
                    idrol: smroles.getSelected().data.idroles
                }
            });
        }
    }

    function AsignarFuncionalidades(idrol) {
        var idmod, node;
        var eliminarFunct = new Array();//almacena los que se van a eliminar o se deseleccionaron
        var trfuncionalidades = new Ext.tree.TreePanel({
            title: futureLang.lbfuncionalidades,
            id: 'trfuncionalidades',
            autoScroll: true,
            frame: true,
            animate: false,
            loadMask: true,
            width: 300,
            region: 'east',
            bodyStyle: 'background-color:#FFFFFF;',
            loader: new Ext.tree.TreeLoader({
                dataUrl: 'cargarfuncionalidades',
                preloadChildren: false,
                baseParams: {
                    idmodulo: idmod,
                    idrol: idrol
                }
            }),
            root: new Ext.tree.AsyncTreeNode({
                text: futureLang.lbfuncionalidades,
                expanded: false,
                id: 0
            }),
            listeners: {
                checkchange: function(nodo) {
                    node = nodo;
                    //si se selecciono el nodo lo adiciono a la lista de adicionar
                    if (nodo.attributes.checked == false) {
                        //se verifica antes de adicinarlo que no este ya en el array
                        banderaAdd = true;//se pone en true si hay que adicionar el nodo
                        for (var i = 0; i < eliminarFunct.length; i++) {
                            if (eliminarFunct[i] == nodo.id) {
                                banderaAdd = false;
                                break;
                            }
                        }
                        //se verifica el valor de banderaAdd
                        if (banderaAdd) {
                            eliminarFunct.push(nodo.id);
                        }
                    }
                }
            }
        });

        /******************************************************************************/
        // Store del gest modulos
        var stmodulos = new Ext.data.Store({
            id: 'stmodulos',
            name: 'stmodulos',
            url: 'cargarmodulos',
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
                    name: 'descripcion'
                }]),
            listeners: {
                load: function(e)
                {
                    if (stmodulos.getCount() > 0) {
                        smmodulos.selectFirstRow();
                    }
                    lMask.hide();
                }
            }
        });
        stmodulos.load({params: {start: 0, limit: 100}});
        var smmodulos = new Ext.grid.RowSelectionModel({
            singleSelect: true
        });
        smmodulos.on('rowselect', function() {
            eliminarFunct = new Array();
            trfuncionalidades.getRootNode().setText(smmodulos.getSelected().data.nombre);
            trfuncionalidades.getRootNode().id = 0;
            trfuncionalidades.getLoader().baseParams = {
                idmodulo: smmodulos.getSelected().data.idmodulo,
                idrol: idrol
            };
            if (idmod)
                trfuncionalidades.getLoader().load(trfuncionalidades.getRootNode());
            idmod = smmodulos.getSelected().data.idmodulo;
            trfuncionalidades.getRootNode().expand();
        });

        var gpmodulos = new Ext.grid.GridPanel({
            id: 'gpmodulos',
            title: futureLang.lbmodulos,
            region: 'center',
            frame: true,
            store: stmodulos,
            autoExpandColumn: 'descripcion',
            sm: smmodulos,
            loadMask: true,
            stripeRows: true,
            columns: [
                {
                    id: 'idmod',
                    header: 'idmod',
                    width: 200,
                    hidden: true,
                    dataIndex: 'idmodulo'
                }, {
                    id: 'nombre',
                    header: futureLang.lbnombre,
                    width: 200,
                    dataIndex: 'nombre'
                }, {
                    id: 'icono',
                    header: futureLang.lbicono,
                    width: 120,
                    hidden: true,
                    dataIndex: 'icono'
                },
                {
                    id: 'descripcion',
                    header: futureLang.lbdescripcion,
                    width: 90,
                    dataIndex: 'descripcion'
                }]
        });

        //ventana asignar funct
        var win = new Ext.Window({
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            constrain: true,
            title: '<i class="fa fa-hand-o-down"></i> ' + futureLang.lbasig,
            layout: 'border',
            width: 800,
            height: 500,
            resizable: false,
            modal: true,
            closeAction: 'close',
            buttons: [{
                    id: 'btnaplicar',
                    text: Ext.lang.btnApply,
                    handler: function() {
                        ActualizarRolesFuncionalidades('aplicar');
                    }
                }, {
                    id: 'btnaceptar',
                    text: Ext.lang.btnAcept,
                    handler: function() {
                        ActualizarRolesFuncionalidades('aceptar');
                    }
                },
                {
                    text: Ext.lang.btnCancel,
                    handler: function() {
                        win.close();
                    }
                }
            ],
            items: [gpmodulos, trfuncionalidades]
        });
        win.show();

        function ActualizarRolesFuncionalidades(accion) {
            MostrarBarraProgreso(futureLang.msgconffunct);
            var chequeados = new Array();//almacena los nodos que fueron marcados
            var idcheck = new Array();//almacena los id de los nodos que fueron marcados
            chequeados = trfuncionalidades.getChecked();
            for (var i = 0; i < chequeados.length; i++) {
                idcheck[i] = chequeados[i]['id'];
            }
            //se quitan del array eliminarEnt los que fueron chequeados                
            if (eliminarFunct.length > 0) {
                var newEliminar = new Array();//almacena los que se quedaron deseleccionados
                for (var j = 0; j < eliminarFunct.length; j++) {
                    var nodoTmp = new Array();//nodo temporal
                    nodoTmp.push(trfuncionalidades.getNodeById(eliminarFunct[j]));
                    if (nodoTmp[0].attributes.checked == false) {
                        newEliminar.push(eliminarFunct[j]);
                    }
                }
            }
            //se envian los datos
            Ext.Ajax.request({
                url: 'accesofuncionalidades',
                method: 'POST',
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (!responseData)
                        MensajeError(futureLang.msgajaxerror);
                    else if (accion == 'aplicar') {
                        Ext.getCmp('trfuncionalidades').getRootNode().reload();
                        MensajeInformacion(futureLang.msgchangessuccess);
                    }
                    else {
                        MensajeInformacion(futureLang.msgchangessuccess);
                        win.close();
                    }
                },
                params: {
                    idrol: idrol,
                    idfuncionalidadescheck: Ext.encode(idcheck),
                    idfuncionalidadesuncheck: Ext.encode(newEliminar)
                }
            });
        }
    }

    function AsignarRecursos(idrol) {
        var stFuncRecursos = new Ext.data.GroupingStore({
            id: 'stFuncRecursos',
            url: 'loaddatafuncionalidadesbyrol',
            groupField: 'modulo',
            sortInfo: {field: 'modindice', direction: "ASC"},
            reader: new Ext.data.JsonReader({
                root: 'campos',
                id: 'idRecord',
                totalProperty: 'totalrecords'
            }, [{
                    name: 'idmodulo'
                }, {
                    name: 'idrolesfunct'
                }, {
                    name: 'modulo'
                }, {
                    name: 'idfuncionalidades'
                }, {
                    name: 'nombre'
                }, {
                    name: 'modindice', type: 'float'
                }]),
            listeners: {
                load: function(e)
                {
                    if (!stFuncRecursos.getCount() > 0) {
                        alert('mostrar un mensaje diciendo que no tiene funcionalidades asociadas')
                    }
                }
            }
        });
        stFuncRecursos.load({params: {idrol: idrol}});
        var smFuncRecursos = new Ext.grid.RowSelectionModel({
            singleSelect: true
        });
        var gpFuncRecursos = new Ext.grid.GridPanel({
            id: 'gpFuncRecursos',
            title: futureLang.lbfuncionalidades,
            region: 'west',
            frame: false,
            width: 350,
            store: stFuncRecursos,
            autoExpandColumn: 'nombre',
            sm: smFuncRecursos,
            loadMask: true,
            stripeRows: true,
            columns: [
                {
                    header: futureLang.lbmodulo,
                    hidden: true,
                    hideable: false,
                    dataIndex: 'modulo'
                }, {
                    hidden: true,
                    hideable: false,
                    dataIndex: 'modindice'
                }, {
                    hidden: true,
                    hideable: false,
                    dataIndex: 'idrolesfunct'
                }, {
                    hidden: true,
                    hideable: false,
                    dataIndex: 'idfuncionalidades'
                }, {
                    id: 'nombre',
                    header: futureLang.lbnombre,
                    width: 200,
                    dataIndex: 'nombre'
                }],
            view: new Ext.grid.GroupingView({
                enableGroupingMenu: false,
                hideGroupedColumn: true,
                startCollapsed: true,
                groupTextTpl: futureLang.lbGroupTextTpl
            })
        });
        var stRecursos = new Ext.data.Store({
            id: 'stRecursos',
            url: 'loaddatarecursobyfuncionalidad',
            reader: new Ext.data.JsonReader({
                root: 'campos',
                id: 'idRecord',
                totalProperty: 'totalrecords'
            }, [{
                    name: 'idrecurso'
                }, {
                    name: 'idfuncionalidades'
                }, {
                    name: 'nombre'
                }, {
                    name: 'icono'
                }, {
                    name: 'asociado'
                }]),
            listeners: {
                load: function(st, records, options) {
                    if (st.getCount() > 0) {
                        var arrSelected = new Array();
                        Ext.each(records, function(r) {
                            if (r.data.asociado == true)
                                arrSelected.push(r);
                        });
                        smRecursos. selectRecords(arrSelected);
                    }
                }
            }
        });
        var smRecursos = new Ext.grid.CheckboxSelectionModel({
            singleSelect: false
        });
        var gpRecursos = new Ext.grid.GridPanel({
            id: 'gpRecursos',
            title: futureLang.lbrecursos,
            region: 'center',
            frame: false,
            store: stRecursos,
            autoExpandColumn: 'nombre',
            sm: smRecursos,
            loadMask: true,
            stripeRows: true,
            columns: [smRecursos,
                {
                    hidden: true,
                    hideable: false,
                    dataIndex: 'idrecurso'
                }, {
                    hidden: true,
                    hideable: false,
                    dataIndex: 'idfuncionalidades'
                }, {
                    hidden: true,
                    hideable: false,
                    dataIndex: 'asociado'
                }, {
                    id: 'nombre',
                    header: futureLang.lbnombre,
                    width: 200,
                    dataIndex: 'nombre'
                }, {
                    header: futureLang.lbicono,
                    align: 'center',
                    width: 70,
                    dataIndex: 'icono',
                    renderer: showIcon
                }, {
                    header: futureLang.lbestado,
                    align: 'center',
                    width: 110,
                    dataIndex: 'asociado',
                    renderer: showStatus
                }]
        });
        smFuncRecursos.on('rowselect', function() {
            stRecursos.reload({params: {
                    idfuncionalidad: smFuncRecursos.getSelected().data.idfuncionalidades,
                    ididrolesfunct: smFuncRecursos.getSelected().data.idrolesfunct
                }});
        });
        var win = new Ext.Window({
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            constrain: true,
            title: '<i class="fa fa-hand-o-down"></i> ' + futureLang.lbasigrecurso,
            layout: 'border',
            width: 800,
            height: 500,
            resizable: false,
            modal: true,
            closeAction: 'close',
            buttons: [{
                    id: 'btnaplicar',
                    text: Ext.lang.btnApply,
                    handler: function() {
                        GuardarRecursosAsociados('aplicar');
                    }
                }, {
                    id: 'btnaceptar',
                    text: Ext.lang.btnAcept,
                    handler: function() {
                        GuardarRecursosAsociados('aceptar');
                    }
                },
                {
                    text: Ext.lang.btnCancel,
                    handler: function() {
                        win.close();
                    }
                }
            ],
            items: [gpFuncRecursos, gpRecursos]
        });
        win.show();
        function showIcon(value) {
            return '<i class="fa ' + value + ' bluedark-button"></i>';
        }
        function showStatus(value) {
            if (value == true) {
                return '<span class="label label-success">' + futureLang.lbasociado + '</span>';
            }
        }

        function GuardarRecursosAsociados(accion) {
            MostrarBarraProgreso(futureLang.msgconfrecursos);
            var arrIdRecursos = new Array();
            var seleccion = smRecursos.getSelections();
            Ext.each(seleccion, function(r) {
                arrIdRecursos.push(r.data.idrecurso);
            });
            Ext.Ajax.request({
                url: 'accesorecursos',
                method: 'POST',
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (!responseData)
                        MensajeError(futureLang.msgajaxerror);
                    else if (accion == 'aplicar') {
                        stRecursos.reload();
                        MensajeInformacion(futureLang.msgchangessuccess);
                    }
                    else {
                        MensajeInformacion(futureLang.msgchangessuccess);
                        win.close();
                    }
                },
                params: {
                    idrolesfunct: smFuncRecursos.getSelected().data.idrolesfunct,
                    arridrecursos: Ext.encode(arrIdRecursos)
                }
            });
        }
    }
});