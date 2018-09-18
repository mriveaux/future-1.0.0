/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function() {
    new Ext.UiValidations();
    var btnadicionar = new Ext.Button({
        disabled: false,
        hidden: true,
        id: 'btnadicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> ' + futureLang.btnadd,
        tooltip: futureLang.tooltipadd,
        handler: MostrarAdicionar
    });
    var btnmodificar = new Ext.Button({
        id: 'btnmodificar',
        disabled: true,
        hidden: true,
        text: '<i class="fa fa-edit bluedark-button"></i> ' + futureLang.btnmod,
        tooltip: futureLang.tooltipmod,
        handler: MostrarModificar
    });
    var btneliminar = new Ext.Button({
        id: 'btneliminar',
        disabled: true,
        hidden: true,
        text: '<i class="fa fa-trash bluedark-button"></i> ' + futureLang.btndel,
        tooltip: futureLang.tooltipdel,
        handler: eliminarUsuario
    });
    var btncambiarpass = new Ext.Button({
        id: 'btncambiarpass',
        disabled: true,
        hidden: true,
        text: '<i class="fa fa-key bluedark-button"></i> ' + futureLang.btnchangepass,
        tooltip: futureLang.tooltipchangepass,
        handler: cambiarContrasenna
    });
    var btnasignarperfil = new Ext.Button({
        id: 'btnasignarperfil',
        disabled: true,
        hidden: true,
        text: '<i class="fa fa-hand-o-down bluedark-button"></i> ' + futureLang.btnasigperfil,
        tooltip: futureLang.tooltipasigperfil,
        handler: asignarPerfil
    });
    var btnasignarent = new Ext.Button({
        id: 'btnasignarent',
        disabled: true,
        hidden: true,
        text: '<i class="fa fa-home bluedark-button"></i> ' + futureLang.btnasigentidad,
        tooltip: futureLang.tooltipasigentidad,
        handler: asignarEntidades
    });
    var btnbuscarldap = new Ext.Button({
        id: 'btnbuscarldap',
        hidden: true,
        text: '<i class="fa fa-users bluedark-button"></i> ' + futureLang.btnbuscarldap,
        tooltip: futureLang.tooltipbuscarldap,
        handler: filtrarLdap
    });
    var stusuarios = new Ext.data.Store({
        id: 'stusuarios',
        name: 'stusuarios',
        url: 'cargarusuarios',
        autoLoad: true,
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idRecord',
            totalProperty: 'totalrecords'
        }, [{
                name: 'idusuario'
            }, {
                name: 'usuario'
            }, {
                name: 'nombre'
            }, {
                name: 'apellidos'
            }, {
                name: 'idgruporoles'
            }, {
                name: 'nombreGrupoRol'
            }, {
                name: 'cargo'
            }, {
                name: 'estado'
            }, {
                name: 'email'
            }, {
                name: 'rangoip'
            }, {
                name: 'tema'
            }, {
                name: 'idioma'
            }, {
                name: 'espaciotrabajo'
            }, {
                name: 'perfil'
            }, {
                name: 'dataperfil'
            }, {
                name: 'identidad'
            }]),
        baseParams: {cadena: '', start: 0, limit: 20},
        listeners: {
            load: function(e)
            {
                lMask.hide();
                smusuarios.fireEvent('rowdeselect');
            }
        }
    });
    var sfbuscar = new Ext.form.SearchField({
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 200,
        store: stusuarios,
        fnOnSearch: function() {
            Buscar(sfbuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            Buscar(sfbuscar.getValue());
        }
    });
    var smusuarios = new Ext.grid.RowSelectionModel({
        singleSelect: true,
        listeners: {
            rowselect: function() {
                if (smusuarios.getSelected().data.identidad == window.parent.perfil.identidad) {
                    if (smusuarios.getSelected().data.estado != 2)
                        btnmodificar.enable();
                    btneliminar.enable();
                    btncambiarpass.enable();
                    btnasignarent.enable();
                    btnasignarperfil.enable();
                }
            },
            rowdeselect: function() {
                btnmodificar.disable();
                btneliminar.disable();
                btncambiarpass.disable();
                btnasignarent.disable();
                btnasignarperfil.disable();
            }
        }
    });
    var gpusuarios = new Ext.grid.GridPanel({
        id: 'gpusuarios',
        store: stusuarios,
        autoExpandColumn: 'expand',
        sm: smusuarios,
        border: false,
        loadMask: true,
        stripeRows: true,
        autoScroll: true,
        columns: [
            {
                header: 'idusuario',
                width: 200,
                hidden: true,
                hideable: false,
                dataIndex: 'idusuario'
            }, {
                header: 'idgruporoles',
                hidden: true,
                hideable: false,
                dataIndex: 'idgruporoles'
            }, {
                header: 'identidad',
                hidden: true,
                hideable: false,
                dataIndex: 'identidad'
            }, {
                header: futureLang.lbnombre,
                width: 120,
                dataIndex: 'nombre'
            }, {
                id: 'expand',
                width: 140,
                header: futureLang.lbapellidos,
                dataIndex: 'apellidos'
            }, {
                header: futureLang.lbusuario,
                width: 120,
                dataIndex: 'usuario'
            }, {
                header: futureLang.lbgruporol,
                width: 120,
                dataIndex: 'nombreGrupoRol'
            }, {
                header: futureLang.lbcargo,
                width: 90,
                dataIndex: 'cargo'
            }, {
                header: futureLang.lbemail,
                width: 120,
                dataIndex: 'email'
            }, {
                header: futureLang.lbperfil,
                width: 140,
                dataIndex: 'dataperfil'
            }, {
                header: futureLang.lbestado,
                width: 90,
                dataIndex: 'estado',
                renderer: showStatus
            }, {
                header: futureLang.lbrangoip,
                width: 110,
                dataIndex: 'rangoip'
            }, {
                header: futureLang.lbtema,
                width: 80,
                dataIndex: 'tema',
                renderer: getTema
            }, {
                header: futureLang.lbidioma,
                width: 80,
                align: 'center',
                dataIndex: 'idioma',
                renderer: getIdioma
            }, {
                header: futureLang.lbworkspace,
                width: 120,
                align: 'left',
                dataIndex: 'espaciotrabajo',
                renderer: getWorkspace
            }],
        tbar: [btnadicionar, btnmodificar, btneliminar, btncambiarpass, btnasignarperfil, btnasignarent, btnbuscarldap, '->', sfbuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stusuarios,
            displayInfo: true
        })
    });
    new Ext.Viewport({
        layout: 'fit',
        items: gpusuarios
    });
    function MostrarAdicionar(argParams) {
        var tfnombre = new Ext.form.TextField({
            id: 'tfnombre',
            fieldLabel: futureLang.lbnombre,
            name: 'tfnombre',
            maxLength: 50,
            editable: false,
            allowBlank: false,
            width: 160
        });
        var tfapellidos = new Ext.form.TextField({
            id: 'tfapellidos',
            fieldLabel: futureLang.lbapellidos,
            name: 'tfapellidos',
            maxLength: 100,
            editable: false,
            allowBlank: false,
            width: 370
        });
        var tfusuario = new Ext.form.TextField({
            id: 'tfusuario',
            fieldLabel: futureLang.lbusuario,
            name: 'tfusuario',
            maxLength: 30,
            maskRe: /^[ a-zA-Z0-9\.\_\-\@]+$/,
            regex: /^([a-zA-Z0-9\xd1\xf1\s \.\_\-\@]+ ?[a-zA-Z0-9\xd1\xf1\s \.\_\-\@]*)+$/,
            editable: false,
            allowBlank: false,
            width: 160
        });
        var tfcargo = new Ext.form.TextField({
            id: 'tfcargo',
            fieldLabel: futureLang.lbcargo,
            name: 'tfcargo',
            maxLength: 100,
            editable: false,
            allowBlank: false,
            width: 200
        });
        var tfcontrasenna = new Ext.form.TextField({
            id: 'tfcontrasenna',
            name: 'tfcontrasenna',
            maskRe: /^[ a-zA-Z0-9\.\,\;\#\*\/\-\+\@]+$/,
            regex: /^([a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]+ ?[a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]*)+$/,
            invalidText: futureLang.maskpass,
            minLength: 8,
            maxLength: 50,
            fieldLabel: futureLang.lbpass,
            inputType: 'password',
            allowBlank: false,
            width: 160
        });
        var stgruporoles = new Ext.data.Store({
            url: 'cargargruporoles',
            autoLoad: true,
            reader: new Ext.data.JsonReader({root: 'data'}, [{name: 'idgruporoles'}, {name: 'nombre'}, {name: 'descripcion'}]),
            listeners: {
                'beforeload': function() {
                    loadMask(futureLang.lbloadingroles);
                },
                'load': function() {
                    lMask.hide();
                }
            }
        });
        var cbgruporoles = new Ext.form.ComboBox({
            fieldLabel: futureLang.lbgruporol,
            mode: 'local',
            id: 'cbgruporoles',
            listWidth: 180,
            emptyText: futureLang.lbempty,
            store: stgruporoles,
            displayField: 'nombre',
            valueField: 'idgruporoles',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            itemSelector: 'div.search-item',
            tpl: new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name-item">{nombre}</div><div class="desc-item">{descripcion}</div></div></tpl>'),
            width: 160
        });
        var tfemail = new Ext.form.TextField({
            id: 'tfemail',
            fieldLabel: futureLang.lbemail,
            name: 'tfemail',
            allowBlank: false,
            maxLength: 255,
            vtype: 'emails',
            width: 330
        });
        var tfrangoinicio = new Ext.form.TextField({
            id: 'tfrangoinicio',
            fieldLabel: futureLang.lbrangoip,
            name: 'tfrangoinicio',
            maskRe: /^[0-9\.\/]+$/,
            maxLength: 17,
            editable: false,
            allowBlank: false,
            vtype: 'IPRange',
            value: '0.0.0.0/0',
            width: 200
        });
        var cbTema = new Ext.form.ComboBox({
            id: 'idTema',
            fieldLabel: futureLang.lbtema,
            emptyText: futureLang.lbempty,
            store: new Ext.data.SimpleStore({
                fields: ['idtema', 'tema'],
                data: [[1, futureLang.lbazul], [2, futureLang.lbgris]]
            }),
            mode: 'local',
            displayField: 'tema',
            valueField: 'idtema',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 150,
            value: 1
        });
        var cbIdioma = new Ext.form.ComboBox({
            id: 'idIdioma',
            fieldLabel: futureLang.lbidioma,
            emptyText: futureLang.lbempty,
            store: new Ext.data.SimpleStore({
                fields: ['ididioma', 'idioma'],
                data: [[1, futureLang.lbespannol], [2, futureLang.lbingles], [3, futureLang.lbportugues]]
            }),
            mode: 'local',
            displayField: 'idioma',
            valueField: 'ididioma',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 155,
            value: 1
        });
        var cbWorkspace = new Ext.form.ComboBox({
            id: 'cbWorkspace',
            fieldLabel: futureLang.lbworkspace,
            emptyText: futureLang.lbempty,
            store: new Ext.data.SimpleStore({
                fields: ['idworkspace', 'workspace'],
                data: [[1, futureLang.lbwebportal], [2, futureLang.lbwebdesktop], [3, futureLang.lbtabview]]
            }),
            mode: 'local',
            displayField: 'workspace',
            valueField: 'idworkspace',
            typeAhead: true,
            resizable: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 190,
            value: 1
        });
        var btngeneratepass = new Ext.Button({
            id: 'btngeneratepass',
            text: '<i class="fa fa-key bluedark-button"></i> ' + futureLang.lbgeneratepass,
            tooltip: futureLang.tooltipchangepass,
            minWidth: 95,
            handler: function() {
                tfcontrasenna.setValue(generateRandomPassword(16));
            }
        });
        var paddusuario = new Ext.FormPanel({
            frame: true,
            border: false,
            items: [{
                    layout: 'form',
                    labelAlign: 'top',
                    items: [{
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 0 0 5',
                                    layout: 'form',
                                    items: tfnombre
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: tfapellidos
                                }]
                        }, {
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 0 0 5',
                                    layout: 'form',
                                    items: tfusuario
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: cbgruporoles
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: tfcargo
                                }]
                        },
                        {
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 0 0 5',
                                    layout: 'form',
                                    items: tfcontrasenna
                                }, {
                                    style: 'margin:20 0 0 10',
                                    layout: 'form',
                                    items: btngeneratepass
                                }, {
                                    style: 'margin:15 0 0 10; font-size:12px;',
                                    layout: 'form',
                                    items: [{
                                            defaultType: 'checkbox',
                                            items: [{
                                                    checked: false,
                                                    boxLabel: futureLang.lbshowpass,
                                                    id: 'ckshowpass',
                                                    name: 'ckshowpass'
                                                }]
                                        }]
                                }]
                        },
                        {
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 0 0 5',
                                    layout: 'form',
                                    items: tfemail
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: tfrangoinicio
                                }]
                        },
                        {
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 0 15 5; font-size:12px;',
                                    layout: 'form',
                                    items: [{
                                            defaultType: 'checkbox',
                                            items: [{
                                                    checked: false,
                                                    boxLabel: futureLang.lbsendmail,
                                                    id: 'ckbsendmail',
                                                    name: 'ckbsendmail'
                                                }]
                                        }]
                                }, {
                                    style: 'margin:0 0 15 10; font-size:12px;',
                                    layout: 'form',
                                    items: [{
                                            defaultType: 'checkbox',
                                            items: [{
                                                    checked: true,
                                                    boxLabel: futureLang.lbactivaruser,
                                                    id: 'ckbactivar',
                                                    name: 'ckbactivar'
                                                }]
                                        }]
                                }]
                        },
                        {
                            xtype: 'fieldset',
                            style: 'margin:0 0 0 5',
                            title: futureLang.lbapariencia,
                            height: 80,
                            width: 540,
                            layout: 'column',
                            items: [{
                                    layout: 'form',
                                    items: cbTema
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: cbIdioma
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: cbWorkspace
                                }]
                        }
                    ]
                }]
        });
        var winEditUser = new Ext.Window({
            modal: true,
            labelAlign: 'top',
            frame: true,
            resizable: false,
            bodyStyle: 'padding:5px 5px 5px',
            closeAction: 'close',
            layout: 'fit',
            title: '<i class="fa fa-plus"></i> ' + futureLang.tooltipadd,
            width: 580,
            height: 420,
            items: paddusuario,
            buttons: [{
                    text: Ext.lang.btnAcept,
                    handler: function() {
                        adicionarUsuario();
                    }
                },
                {
                    text: Ext.lang.btnCancel,
                    handler: function() {
                        winEditUser.close();
                    }
                }]
        });
        winEditUser.show();
        tfnombre.focus(false, 1000);
        Ext.getCmp('ckshowpass').on('check', function(el, checked) {
            if (checked)
                document.getElementById('tfcontrasenna').type = 'text';
            else
                document.getElementById('tfcontrasenna').type = 'password';
        });
        if (argParams.usuario) {
            tfusuario.setValue(argParams.usuario);
            tfnombre.setValue(argParams.nombre);
            tfapellidos.setValue(argParams.primapellido);
            tfcargo.setValue(argParams.cargo);
            tfemail.setValue(argParams.correo);
        }
        function adicionarUsuario() {
            if (paddusuario.getForm().isValid()) {
                if (validateIpRange(tfrangoinicio.getValue())) {
                    MostrarBarraProgreso(futureLang.lbprogresadduser);
                    Ext.Ajax.request({
                        url: 'adicionarusuario',
                        method: 'POST',
                        callback: function(options, success, response) {
                            var responseData = Ext.decode(response.responseText);
                            Ext.MessageBox.hide();
                            if (responseData == 2) {
                                MensajeInformacion(futureLang.msgusersuccess);
                                winEditUser.close();
                                stusuarios.reload();
                                smusuarios.fireEvent('rowdeselect');
                            } else if (responseData == 1) {
                                MensajeError(futureLang.msguserexist);
                            } else if (responseData == 4) {
                                MensajeError(futureLang.msginvalidip);
                            } else if (responseData == 5) {
                                MensajeError(futureLang.msgrangoip);
                            } else {
                                winEditUser.close();
                                MensajeError(futureLang.msgerror);
                            }
                        },
                        params: {
                            nombre: tfnombre.getValue(),
                            apellidos: tfapellidos.getValue(),
                            usuario: tfusuario.getValue(),
                            cargo: tfcargo.getValue(),
                            gruporoles: cbgruporoles.getValue(),
                            contrasenna: Base64.encodeSecret(tfcontrasenna.getValue(), globalAuthToken),
                            estado: (Ext.getCmp('ckbactivar').getValue() == true) ? 1 : 0,
                            email: tfemail.getValue(),
                            sendmail: Ext.getCmp('ckbsendmail').getValue(),
                            rangoip: tfrangoinicio.getValue(),
                            tema: cbTema.getValue(),
                            idioma: cbIdioma.getValue(),
                            espaciotrabajo: cbWorkspace.getValue()
                        }
                    });
                } else {
                    MensajeError(futureLang.msginvalidip);
                }
            }
        }
    }
    function MostrarModificar() {
        var tfnombre = new Ext.form.TextField({
            id: 'tfnombre',
            fieldLabel: futureLang.lbnombre,
            name: 'tfnombre',
            maxLength: 50,
            editable: false,
            allowBlank: false,
            width: 160
        });
        var tfapellidos = new Ext.form.TextField({
            id: 'tfapellidos',
            fieldLabel: futureLang.lbapellidos,
            name: 'tfapellidos',
            maxLength: 100,
            editable: false,
            allowBlank: false,
            width: 370
        });
        var tfcargo = new Ext.form.TextField({
            id: 'tfcargo',
            fieldLabel: futureLang.lbcargo,
            name: 'tfcargo',
            maxLength: 100,
            editable: false,
            allowBlank: false,
            width: 230
        });
        var stgruporoles = new Ext.data.Store({
            url: 'cargargruporoles',
            autoLoad: true,
            reader: new Ext.data.JsonReader({root: 'data'}, [{name: 'idgruporoles'}, {name: 'nombre'}, {name: 'descripcion'}]),
            listeners: {
                'beforeload': function() {
                    loadMask(futureLang.lbloadingroles);
                },
                'load': function() {
                    lMask.hide();
                }
            }
        });
        var cbgruporoles = new Ext.form.ComboBox({
            fieldLabel: futureLang.lbgruporol,
            mode: 'local',
            id: 'cbgruporoles',
            listWidth: 180,
            emptyText: futureLang.lbempty,
            store: stgruporoles,
            displayField: 'nombre',
            valueField: 'idgruporoles',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            itemSelector: 'div.search-item',
            tpl: new Ext.XTemplate('<tpl for="."><div class="search-item"><div class="name-item">{nombre}</div><div class="desc-item">{descripcion}</div></div></tpl>'),
            width: 160
        });
        var tfemail = new Ext.form.TextField({
            id: 'tfemail',
            fieldLabel: futureLang.lbemail,
            name: 'tfemail',
            allowBlank: false,
            maxLength: 255,
            vtype: 'emails',
            width: 325
        });
        var tfrangoinicio = new Ext.form.TextField({
            id: 'tfrangoinicio',
            fieldLabel: futureLang.lbrangoip,
            maskRe: /^[0-9\.\/]+$/,
            name: 'tfrangoinicio',
            maxLength: 17,
            editable: false,
            vtype: 'IPRange',
            allowBlank: false,
            width: 200
        });
        var cbTema = new Ext.form.ComboBox({
            id: 'idTema',
            fieldLabel: futureLang.lbtema,
            emptyText: futureLang.lbempty,
            store: new Ext.data.SimpleStore({
                fields: ['idtema', 'tema'],
                data: [[1, futureLang.lbazul, ], [2, futureLang.lbgris]]
            }),
            mode: 'local',
            displayField: 'tema',
            valueField: 'idtema',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 150,
            value: 1
        });
        var cbIdioma = new Ext.form.ComboBox({
            id: 'idIdioma',
            fieldLabel: futureLang.lbidioma,
            emptyText: futureLang.lbempty,
            store: new Ext.data.SimpleStore({
                fields: ['ididioma', 'idioma'],
                data: [[1, futureLang.lbespannol], [2, futureLang.lbingles], [3, futureLang.lbportugues]]
            }),
            mode: 'local',
            displayField: 'idioma',
            valueField: 'ididioma',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 155,
            value: 1
        });
        var cbWorkspace = new Ext.form.ComboBox({
            id: 'cbWorkspace',
            fieldLabel: futureLang.lbworkspace,
            emptyText: futureLang.lbempty,
            store: new Ext.data.SimpleStore({
                fields: ['idworkspace', 'workspace'],
                data: [[1, futureLang.lbwebportal], [2, futureLang.lbwebdesktop], [3, futureLang.lbtabview]]
            }),
            mode: 'local',
            displayField: 'workspace',
            valueField: 'idworkspace',
            typeAhead: true,
            resizable: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 190,
            value: 1
        });
        var paddusuario = new Ext.FormPanel({
            labelAlign: 'top',
            frame: true,
            border: false,
            items: [{
                    layout: 'form',
                    labelAlign: 'top',
                    items: [{
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 0 0 5',
                                    layout: 'form',
                                    items: tfnombre
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: tfapellidos
                                }]
                        }, {
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 0 0 5',
                                    layout: 'form',
                                    items: cbgruporoles
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: tfcargo
                                }, {
                                    style: 'margin:15 0 0 10; font-size:12px;',
                                    layout: 'form',
                                    items: [{
                                            defaultType: 'checkbox',
                                            items: [{
                                                    checked: false,
                                                    boxLabel: futureLang.lbactivaruser,
                                                    id: 'ckbmactivar',
                                                    name: 'ckbmactivar'
                                                }]
                                        }]
                                }]
                        },
                        {
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 0 0 5',
                                    layout: 'form',
                                    items: tfemail
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: tfrangoinicio
                                }]
                        },
                        {
                            xtype: 'fieldset',
                            style: 'margin:0 0 0 5',
                            title: futureLang.lbapariencia,
                            height: 80,
                            width: 540,
                            layout: 'column',
                            items: [{
                                    layout: 'form',
                                    items: cbTema
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: cbIdioma
                                }, {
                                    style: 'margin:0 0 0 10',
                                    layout: 'form',
                                    items: cbWorkspace
                                }]
                        }
                    ]
                }]
        });

        var winEditUser = new Ext.Window({
            modal: true,
            labelAlign: 'top',
            frame: true,
            resizable: false,
            bodyStyle: 'padding:5px 5px 5px',
            closeAction: 'close',
            layout: 'fit',
            title: '<i class="fa fa-edit"></i> ' + futureLang.tooltipmod,
            width: 580,
            height: 330,
            items: paddusuario,
            buttons: [{
                    text: Ext.lang.btnAcept,
                    handler: function() {
                        modificarUsuario();
                    }
                },
                {
                    text: Ext.lang.btnCancel,
                    handler: function() {
                        winEditUser.close();
                    }
                }]
        });
        winEditUser.show();
        //se cargan los datos a modificar en la ventana   smusuarios.getSelected().data.usuario
        tfnombre.setValue(smusuarios.getSelected().data.nombre);
        tfapellidos.setValue(smusuarios.getSelected().data.apellidos);
        tfcargo.setValue(smusuarios.getSelected().data.cargo);
        cbgruporoles.setValue(smusuarios.getSelected().data.idgruporoles);
        cbgruporoles.setRawValue(smusuarios.getSelected().data.nombreGrupoRol);
        tfemail.setValue(smusuarios.getSelected().data.email);
        Ext.getCmp('ckbmactivar').setValue((smusuarios.getSelected().data.estado == 1) ? true : false);
        Ext.getCmp('ckbmactivar').setRawValue((smusuarios.getSelected().data.estado == 1) ? true : false);
        tfrangoinicio.setValue(smusuarios.getSelected().data.rangoip);
        cbTema.setValue(smusuarios.getSelected().data.tema);
        cbIdioma.setValue(smusuarios.getSelected().data.idioma);
        cbWorkspace.setValue(smusuarios.getSelected().data.espaciotrabajo);
        tfnombre.focus(false, 1000);
        function modificarUsuario() {
            if (paddusuario.getForm().isValid()) {
                if (validateIpRange(tfrangoinicio.getValue())) {
                    MostrarBarraProgreso(futureLang.lbprogresmoduser);
                    Ext.Ajax.request({
                        url: 'modificarusuario',
                        method: 'POST',
                        callback: function(options, success, response) {
                            responseData = Ext.decode(response.responseText);
                            Ext.MessageBox.hide();
                            if (responseData == 1) {
                                MensajeInformacion(futureLang.msgmodusersuccess);
                                winEditUser.close();
                                stusuarios.reload();
                                smusuarios.fireEvent('rowdeselect');
                            } else if (responseData == 4) {
                                MensajeError(futureLang.msginvalidip);
                            } else if (responseData == 5) {
                                MensajeError(futureLang.msgrangoip);
                            } else {
                                winEditUser.close();
                                MensajeError(futureLang.msgerror);
                            }
                        },
                        params: {
                            idusuario: smusuarios.getSelected().data.idusuario,
                            nombre: tfnombre.getValue(),
                            apellidos: tfapellidos.getValue(),
                            cargo: tfcargo.getValue(),
                            gruporoles: cbgruporoles.getValue(),
                            estado: (Ext.getCmp('ckbmactivar').getValue() == true) ? 1 : 0,
                            email: tfemail.getValue(),
                            rangoip: tfrangoinicio.getValue(),
                            tema: cbTema.getValue(),
                            idioma: cbIdioma.getValue(),
                            espaciotrabajo: cbWorkspace.getValue()
                        }
                    });
                } else {
                    MensajeError(futureLang.msginvalidip);
                }
            }
        }
    }
    function eliminarUsuario() {
        function confirmar(btn)
        {
            if (btn == 'ok') {
                eliminaOK();
            }
        }//fin de la funcion confirmacion
        MensajeInterrogacion('<i class="fa fa-trash"></i> ' + futureLang.tooltipdel, futureLang.msgquestiondeleteuser, confirmar);

        //funcion que manda a eliminar
        function eliminaOK() {
            MostrarBarraProgreso(futureLang.msgprogresdeluser);
            Ext.Ajax.request({
                url: 'eliminarusuario',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == 1) {
                        MensajeInformacion(futureLang.msgdelusersuccess);
                        stusuarios.reload();
                        smusuarios.fireEvent('rowdeselect');
                    } else {
                        MensajeError(futureLang.msgerror);
                    }
                },
                params: {
                    idusuario: smusuarios.getSelected().data.idusuario
                }
            });
        }//fin de la funcion eliminaOK   
    }
    function cambiarContrasenna() {
        var tfcargarusuario = new Ext.form.TextField({
            id: 'tfcargarusuario',
            name: 'tfcargarusuario',
            readOnly: true,
            fieldLabel: futureLang.lbusuario,
            width: 140
        });
        var tfnewpassword = new Ext.form.TextField({
            id: 'newpassword',
            name: 'newpassword',
            minLength: 8,
            maxLength: 50,
            maskRe: /^[ a-zA-Z0-9\.\,\;\#\*\/\-\+\@]+$/,
            regex: /^([a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]+ ?[a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]*)+$/,
            invalidText: futureLang.maskpass,
            fieldLabel: futureLang.lbnewpass,
            inputType: 'password',
            allowBlank: false,
            width: 140
        });
        var tfreppassword = new Ext.form.TextField({
            id: 'reppassword',
            name: 'reppassword',
            minLength: 8,
            maxLength: 50,
            maskRe: /^[ a-zA-Z0-9\.\,\;\#\*\/\-\+\@]+$/,
            regex: /^([a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]+ ?[a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]*)+$/,
            invalidText: futureLang.maskpass,
            fieldLabel: futureLang.lbconfirmpass,
            inputType: 'password',
            allowBlank: false,
            vtype: 'password',
            initialPassField: 'newpassword',
            width: 140
        });
        var pcambiarpass = new Ext.form.FormPanel({
            labelWidth: 140,
            id: 'pcambiarpass',
            border: false,
            items: [tfcargarusuario, tfnewpassword, tfreppassword]
        });
        if (!wincambiarpass) {
            var wincambiarpass = new Ext.Window({
                bodyStyle: 'padding:5px 5px 5px',
                border: false,
                title: '<i class="fa fa-key"></i> ' + futureLang.btnchangepass,
                layout: 'fit',
                width: 320,
                height: 170,
                resizable: false,
                modal: true,
                closeAction: 'close',
                buttons: [{
                        id: 'btnaceptar',
                        text: Ext.lang.btnAcept,
                        handler: function() {
                            cambiarPass();
                        }
                    },
                    {
                        text: Ext.lang.btnCancel,
                        handler: function() {
                            wincambiarpass.close();
                        }
                    }
                ],
                items: [pcambiarpass]
            });
        }
        pcambiarpass.getForm().reset();
        tfcargarusuario.setValue(smusuarios.getSelected().data.usuario);
        wincambiarpass.show();
        function cambiarPass()
        {
            if (pcambiarpass.getForm().isValid())
            {
                MostrarBarraProgreso(futureLang.msgprogreschangepass);
                Ext.Ajax.request({
                    url: 'changepasswd',
                    method: 'POST',
                    callback: function(options, success, response) {
                        responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData) {
                            wincambiarpass.close();
                            MensajeInformacion(futureLang.msgchangepasssuccess);
                        } else {
                            wincambiarpass.close();
                            MensajeError(futureLang.msgerror);
                        }
                    },
                    params: {
                        usuario: tfcargarusuario.getValue(),
                        newpass: hex_md5(tfnewpassword.getValue())
                    }
                });
            }
        }
    }
    function asignarEntidades() {
        var stroles = new Ext.data.Store({
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
                load: function(e)
                {
                    lMask.hide();
                }
            }
        });
        stroles.load({params: {idgruporoles: smusuarios.getSelected().data.idgruporoles}});
        var smroles = new Ext.grid.RowSelectionModel({id: 'smroles', singleSelect: true});
        var gproles = new Ext.grid.GridPanel({
            title: futureLang.lbroles,
            store: stroles,
            region: 'center',
            autoExpandColumn: 'descripcion',
            sm: smroles,
            loadMask: true,
            stripeRows: true,
            columns: [
                {
                    id: 'idroles',
                    header: 'idroles',
                    width: 200,
                    hidden: true,
                    hideable: false,
                    dataIndex: 'idroles'
                }, {
                    id: 'nombre',
                    header: futureLang.lbnombre,
                    width: 180,
                    dataIndex: 'nombre'
                }, {
                    id: 'descripcion',
                    header: futureLang.lbdescripcion,
                    dataIndex: 'descripcion'
                }]
        });
        var eliminarEnt = new Array();//almacena los que se van a eliminar o se deseleccionaron
        var trentidades = new Ext.tree.TreePanel({
            title: futureLang.lbentidades,
            disabled: true,
            autoScroll: true,
            frame: false,
            animate: false,
            loadMask: true,
            enableDD: false,
            region: 'east',
            width: 350,
            bodyStyle: 'background-color:#FFFFFF;',
            root: new Ext.tree.AsyncTreeNode({
                text: futureLang.lbentidades,
                expanded: false,
                id: window.parent.perfil.identidad_padre
            }),
            loader: new Ext.tree.TreeLoader({
                dataUrl: 'cargarEntidades',
                preloadChildren: false,
                baseParams: {
                    idusuario: smusuarios.getSelected().data.idusuario
                }
            }),
            listeners: {
                'checkchange': function(nodo) {
                    //si se selecciono el nodo lo adiciono a la lista de adicionar
                    if (nodo.attributes.checked == false) {
                        //se verifica antes de adicinarlo que no este ya en el array
                        banderaAdd = true;//se pone en true si hay que adicionar el nodo
                        for (var i = 0; i < eliminarEnt.length; i++) {
                            if (eliminarEnt[i] == nodo.id) {
                                banderaAdd = false;
                                break;
                            }
                        }
                        //se verifica el valor de banderaAdd
                        if (banderaAdd) {
                            eliminarEnt.push(nodo.id);
                        }
                    }
                }
            }
        });

        smroles.on('rowselect', function() {
            trentidades.setDisabled(false);
            trentidades.getLoader().baseParams.idroles = smroles.getSelected().data.idroles;
            trentidades.getRootNode().reload();
        });
        smroles.on('rowdeselect', function() {
            trentidades.setDisabled(true);
            trentidades.collapseAll();
            eliminarEnt = new Array();
        });

        winAsigEnt = new Ext.Window({
            modal: true,
            labelAlign: 'top',
            resizable: false,
            bodyStyle: 'padding:5px 5px 5px',
            closeAction: 'close',
            layout: 'border',
            title: '<i class="fa fa-home"></i> ' + futureLang.lbtitleasocentidad,
            width: 750,
            height: 400,
            items: [gproles, trentidades],
            buttons: [{
                    text: Ext.lang.btnApply,
                    handler: function() {
                        asociarRolEntidades('apply');
                    }
                }, {
                    text: Ext.lang.btnAcept,
                    handler: asociarRolEntidades
                },
                {
                    text: Ext.lang.btnCancel,
                    handler: function() {
                        winAsigEnt.close();
                    }
                }]
        });
        winAsigEnt.show();

        function asociarRolEntidades(action) {
            if (trentidades.getChecked().length > 0 || eliminarEnt.length > 0) {
                MostrarBarraProgreso(futureLang.msgconfigacceso);
                var chequeados = new Array();//almacena los nodos que fueron marcados
                var idcheck = new Array();//almacena los id de los nodos que fueron marcados
                chequeados = trentidades.getChecked();
                for (var i = 0; i < chequeados.length; i++) {
                    idcheck[i] = chequeados[i]['id'];
                }
                //se quitan del array eliminarEnt los que fueron chequeados                
                if (eliminarEnt.length > 0) {
                    var newEliminar = new Array();//almacena los que se quedaron deseleccionados
                    for (var j = 0; j < eliminarEnt.length; j++) {
                        var nodoTmp = new Array();//nodo temporal
                        nodoTmp.push(trentidades.getNodeById(eliminarEnt[j]));
                        if (nodoTmp[0].attributes.checked == false) {
                            newEliminar.push(eliminarEnt[j]);
                        }
                    }
                }
                //se envian los datos
                Ext.Ajax.request({
                    url: 'saveconfigaccesoentidades',
                    method: 'POST',
                    callback: function(options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (!responseData)
                            MensajeError(futureLang.msgerror);
                        else
                            MensajeInformacion(futureLang.msgaccesosuccess);
                        if (action != 'apply')
                            winAsigEnt.close();
                    },
                    params: {
                        idusuario: smusuarios.getSelected().data.idusuario,
                        idroles: smroles.getSelected().data.idroles,
                        identidadescheck: Ext.encode(idcheck),
                        identidadesuncheck: Ext.encode(newEliminar)
                    }
                });
            }
        }
    }
    function asignarPerfil() {
        var stperfil = new Ext.data.GroupingStore({
            url: 'cargarperfiles',
            reader: new Ext.data.JsonReader({
                root: 'campos',
                id: 'idRecord',
                totalProperty: 'totalRecords'
            }, [
                {name: 'idperfil', mapping: 'idtrabajador'},
                {name: 'nombre'},
                {name: 'apellidos'},
                {name: 'cidentidad'},
                {name: 'direccion'},
                {name: 'nivelescolar'},
                {name: 'ocupacion'},
                {name: 'grado'},
                {name: 'militancia'},
                {name: 'telefono'},
                {name: 'fechaentrada'},
                {name: 'baja'},
                {name: 'base64img', type: 'string'}
            ]),
            listeners: {
                load: function(store, records, options)
                {
                    lMask.hide();
                }
            },
            baseParams: {
                cadena: ''
            },
            sortInfo: {
                field: 'nombre',
                direction: "ASC"
            }
        });
        stperfil.load({
            params: {
                start: 0,
                limit: 20
            }
        });
        smperfil = new Ext.grid.RowSelectionModel({
            id: 'smperfil',
            singleSelect: true
        });
        smperfil.on('rowselect', function(sm, rowIndex, record) {
            Ext.getCmp('gpperfil').getView().addRowClass(rowIndex, "negrita");
        });
        smperfil.on('rowdeselect', function(sm, rowIndex, record) {
            Ext.getCmp('gpperfil').getView().removeRowClass(rowIndex, "negrita");
        });
        var gpperfil = new Ext.grid.GridPanel({
            id: 'gpperfil',
            store: stperfil,
            sm: smperfil,
            loadMask: true,
            autoExpandColumn: 'direccion',
            columns: [{
                    id: 'idperfil',
                    header: futureLang.lbcodigo,
                    width: 60,
                    dataIndex: 'idperfil'
                },
                {
                    id: 'nombre',
                    header: futureLang.lbnombre,
                    width: 100,
                    sortable: true,
                    dataIndex: 'nombre'
                },
                {
                    id: 'apellidos',
                    header: futureLang.lbapellidos,
                    width: 130,
                    sortable: true,
                    dataIndex: 'apellidos'
                },
                {
                    id: 'cidentidad',
                    header: futureLang.lbcidentidad,
                    width: 80,
                    sortable: true,
                    dataIndex: 'cidentidad'
                },
                {
                    id: 'direccion',
                    header: futureLang.lbdireccion,
                    width: 75,
                    sortable: true,
                    dataIndex: 'direccion'
                },
                {
                    id: 'nivelescolar',
                    header: futureLang.lbnivel,
                    hidden: true,
                    sortable: true,
                    width: 70,
                    dataIndex: 'nivelescolar'
                },
                {
                    id: 'ocupacion',
                    header: futureLang.lbocupacion,
                    width: 100,
                    sortable: true,
                    dataIndex: 'ocupacion'
                },
                {
                    id: 'fechaentrada',
                    header: futureLang.lbfechaentrada,
                    width: 80,
                    sortable: true,
                    dataIndex: 'fechaentrada',
                    renderer: format_Fecha
                }],
            tbar: [new Ext.form.SearchField({
                    id: 'sfPerfil',
                    maxLength: 30,
                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                    width: 300,
                    store: stperfil,
                    fnOnSearch: function() {
                        stperfil.baseParams.cadena = this.getValue();
                        stperfil.reload({params: {start: 0, limit: 20}});
                    },
                    fnOnClear: function() {
                        this.reset();
                        stperfil.baseParams.cadena = this.getValue();
                        stperfil.reload({params: {start: 0, limit: 20}});
                    }
                })],
            bbar: new Ext.Feet.PagingToolbar({
                pageSize: 20,
                store: stperfil,
                displayInfo: true
            }),
            listeners: {
                mouseover: function(event) {
                    var t = event.getTarget();
                    var v = this.getView();
                    var rowIndex = v.findRowIndex(t);
                    if (rowIndex !== false) { //Para que distinga bien entre 0 y false
                        var rec = this.getStore().getAt(rowIndex);
                        var src = sin_foto();
                        if (rec.json.base64img) {
                            src = 'data:image/jpg;base64,' + rec.json.base64img;
                        }

                        var name = rec.json.nombre + ' ' + rec.json.apellidos;
                        var dni = rec.json.cidentidad;
                        var ocupation = rec.json.ocupacion;

                        new Ext.ToolTip({
                            target: t,
                            autoWidth: true,
                            autoHeight: true,
                            maxWidth: 800,
                            minWidth: 500,
                            dismissDelay: 0,
                            showDelay: 100,
                            bodyStyle: "background-color:#d6e3f2;padding:5px 5px;border: 2px solid #5fa2dd; border-radius: 4px;",
                            frame: false,
                            shadow: false,
                            floating: true,
                            html: createWorkerTooltip(src, name, dni, ocupation),
                            trackMouse: true
                        });
                    }

                }

            }
        });
        function createWorkerTooltip(src, name, dni, ocupation) {
            var templateTooltip = '<table width="100%" border="0" cellspacing="0" cellpadding="1" style="text-align: center; font-size: 11px">' +
                    '<tr>' +
                    '<td>' +
                    '<table width="100%" border="0" cellspacing="0" cellpadding="4">' +
                    '<tr>' + '<td width="10%" style="text-align: center; vertical-align: top">' +
                    '<span><img src="' + src + '" width="90" height="90" style="border: 1px solid #CECECE;"></span>' +
                    '</td>' +
                    '<td style="vertical-align:top; font: normal 11.5px arial, tahoma, helvetica, sans-serif !important;">' +
                    '<b><span style="padding-left: 10px; padding-right: 5px;">' + name + '</span></b>' +
                    '<br><br><span style="padding-left: 10px; padding-right: 5px;"><b>' + futureLang.lbci + '</b> ' + dni + '</span>' +
                    '<br><br><span style="padding-left: 10px; padding-right: 5px;"><b>' + futureLang.lbocupacion + ':</b> ' + ocupation + '</span>' +
                    '</td>' + '</tr>' + '</table>' + '</td>' + '</tr></table></div>';
            return templateTooltip;
        }
        winAsigPerfil = new Ext.Window({
            modal: true,
            labelAlign: 'top',
            frame: true,
            resizable: false,
            closeAction: 'close',
            layout: 'fit',
            title: '<i class="fa fa-hand-o-down"></i> ' + futureLang.tooltipasigperfil,
            width: 320,
            height: 450,
            items: gpperfil,
            buttons: [{
                    text: Ext.lang.btnAcept,
                    handler: function() {
                        if (smperfil.getSelected()) {
                            MostrarBarraProgreso(futureLang.msgprogresasigperfiluser);
                            Ext.Ajax.request({
                                url: 'asignarperfil',
                                method: 'POST',
                                callback: function(options, success, response) {
                                    var responseData = Ext.decode(response.responseText);
                                    Ext.MessageBox.hide();
                                    if (!responseData)
                                        MensajeError(futureLang.msgerror);
                                    else
                                        MensajeInformacion(futureLang.msgaccesosuccess);
                                    winAsigPerfil.close();
                                    stusuarios.reload();
                                },
                                params: {
                                    idusuario: smusuarios.getSelected().data.idusuario,
                                    idperfil: smperfil.getSelected().data.idperfil
                                }
                            });
                        } else {
                            MensajeInformacion(futureLang.msgselecttrabajador);
                        }
                    }
                },
                {
                    text: Ext.lang.btnCancel,
                    handler: function() {
                        winAsigPerfil.close();
                    }
                }]
        });
        winAsigPerfil.show();
        winAsigPerfil.maximize();
    }
    function filtrarLdap() {
        var stloadldap = new Ext.data.GroupingStore({
            url: 'getldapusers',
            reader: new Ext.data.JsonReader({
                root: 'campos',
                id: 'idRecord',
                totalProperty: 'totalRecords'
            }, [
                {name: 'usuario', mapping: 'username'},
                {name: 'nombre', mapping: 'firstname'},
                {name: 'primapellido', mapping: 'lastname'},
                {name: 'segapellido', mapping: 'secondlastname'},
                {name: 'unidadorganizativa', mapping: 'ou'},
                {name: 'correo', mapping: 'mail'},
                {name: 'telefono', mapping: 'telephonenumber'},
                {name: 'departamento', mapping: 'department'},
                {name: 'cargo', mapping: 'job'}
            ]),
            listeners: {
                load: function(store, records, options)
                {
                    lMask.hide();
                }
            },
            baseParams: {
                cadena: ''
            },
            sortInfo: {
                field: 'nombre',
                direction: "ASC"
            }
        });
        smloadldap = new Ext.grid.RowSelectionModel({
            id: 'smloadldap',
            singleSelect: true
        });
        smloadldap.on('rowselect', function(sm, rowIndex, record) {
            Ext.getCmp('gploadldap').getView().addRowClass(rowIndex, "negrita");
        });
        smloadldap.on('rowdeselect', function(sm, rowIndex, record) {
            Ext.getCmp('gploadldap').getView().removeRowClass(rowIndex, "negrita");
        });
        var gploadldap = new Ext.grid.GridPanel({
            id: 'gploadldap',
            store: stloadldap,
            sm: smloadldap,
            loadMask: true,
            autoExpandColumn: 'expanded',
            columns: [{
                    header: futureLang.lbusuario,
                    width: 120,
                    dataIndex: 'usuario'
                },
                {
                    header: futureLang.lbnombre,
                    width: 140,
                    sortable: true,
                    dataIndex: 'nombre'
                },
                {
                    header: futureLang.lbapellidos,
                    width: 180,
                    sortable: true,
                    dataIndex: 'primapellido'
                },
                {
                    header: futureLang.lbuorganizativa,
                    width: 120,
                    sortable: true,
                    dataIndex: 'unidadorganizativa'
                },
                {
                    header: futureLang.lbemail,
                    width: 180,
                    sortable: true,
                    dataIndex: 'correo'
                },
                {
                    header: futureLang.lbtelefono,
                    sortable: true,
                    width: 140,
                    dataIndex: 'telefono'
                },
                {
                    header: futureLang.lbdepartamento,
                    sortable: true,
                    width: 150,
                    dataIndex: 'departamento'
                },
                {
                    id: 'expanded',
                    header: futureLang.lbcargo,
                    width: 120,
                    sortable: true,
                    dataIndex: 'cargo'
                }],
            tbar: [new Ext.form.SearchField({
                    id: 'sfloadldap',
                    maxLength: 30,
                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                    width: 300,
                    store: stloadldap,
                    fnOnSearch: function() {
                        stloadldap.baseParams.cadena = this.getValue();
                        stloadldap.reload();
                    },
                    fnOnClear: function() {
                        this.reset();
                        stloadldap.baseParams.cadena = this.getValue();
                        stloadldap.reload();
                    }
                })]
        });
        winloadldap = new Ext.Window({
            modal: true,
            labelAlign: 'top',
            frame: true,
            resizable: false,
            closeAction: 'close',
            layout: 'fit',
            title: '<i class="fa fa-users"></i> ' + futureLang.lbtitlebuscarldap,
            width: 320,
            height: 450,
            items: gploadldap,
            buttons: [{
                    text: Ext.lang.btnAcept,
                    handler: function() {
                        if (smloadldap.getSelected()) {
                            MostrarBarraProgreso(futureLang.msgloaddatauser);
                            winloadldap.close();
                            MostrarAdicionar(smloadldap.getSelected().data);
                            Ext.MessageBox.hide();
                        } else {
                            MensajeInformacion(futureLang.msgselectdatauser);
                        }
                    }
                },
                {
                    text: Ext.lang.btnCancel,
                    handler: function() {
                        winloadldap.close();
                    }
                }]
        });
        winloadldap.show();
        winloadldap.maximize();
        Ext.getCmp('sfloadldap').focus(false, 1000);
    }
    function Buscar(cadena) {
        stusuarios.baseParams.cadena = cadena;
        stusuarios.reload();
        Ext.getCmp('gpusuarios').getBottomToolbar().changePage(1);
    }
    function showStatus(value, metaData, record, rowIndex, colIndex, store) {
        if (value == 1) {
            return '<span class="label label-success">' + futureLang.lbactivo + '</span>';
        } else if (value == 0) {
            return '<span class="label label-default">' + futureLang.lbinactivo + '</span>';
        } else {
            return '<span class="label label-danger">' + futureLang.lbbloqueado + '</span>';
        }
    }
    function getTema(v) {
        if (v == '1') {
            return '<span class="label label-info">' + futureLang.lbazul + '</span>';
        } else if (v == '2') {
            return '<span class="label label-default">' + futureLang.lbgris + '</span>';
        }
    }
    function getIdioma(value, metaData, record, rowIndex, colIndex, store) {
        if (value == '1') {
            metaData.attr = 'ext:qtip="' + futureLang.lbespannol + '"';
            return '<img ext:qtip="' + futureLang.lbespannol + '" src="/lib/js/Extjs/2.2/resources/images/langs/espannol.png" style="width:25px">';
        } else if (value == '2') {
            metaData.attr = 'ext:qtip="' + futureLang.lbingles + '"';
            return '<img ext:qtip="' + futureLang.lbingles + '" src="/lib/js/Extjs/2.2/resources/images/langs/ingles.png" style="width:25px">';
        } else if (value == '3') {
            metaData.attr = 'ext:qtip="' + futureLang.lbportugues + '"';
            return '<img ext:qtip="' + futureLang.lbportugues + '" src="/lib/js/Extjs/2.2/resources/images/langs/portugues.png" style="width:25px">';
        }
    }
    function getWorkspace(v) {
        if (v == '1') {
            return '<span class="label label-info">' + futureLang.lbwebportal + '</span>';
        } else if (v == '2') {
            return '<span class="label label-default">' + futureLang.lbwebdesktop + '</span>';
        } else if (v == '3') {
            return '<span class="label label-primary">' + futureLang.lbtabview + '</span>';
        }
    }
    function generateRandomPassword(long) {
        var dictionary = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-*/@";
        var passw = "";
        for (var i = 0; i < long; i++)
            passw += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
        return passw;
    }
});