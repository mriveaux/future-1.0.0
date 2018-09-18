/* global Ext, lMask, futureLang */
Ext.QuickTips.init();
Ext.onReady(function () {
    lMask.hide();
    var btnadicionar = new Ext.Button({
        disabled: false,
        id: 'btnadicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> ' + futureLang.lbAdicionar,
        tooltip: futureLang.lbAdicionarCliente,
        handler: function () {
            mostrarRegCliente();
        }
    });
    var btnmodificar = new Ext.Button({
        id: 'btnmodificar',
        disabled: true,
        text: '<i class="fa fa-edit bluedark-button"></i> ' + futureLang.lbModificar,
        tooltip: futureLang.lbModificarCliente,
        handler: function () {
            mostrarRegCliente('mod');
        }
    });
    var btneliminar = new Ext.Button({
        id: 'btnbuscar',
        disabled: true,
        text: '<i class="fa fa-trash bluedark-button"></i> ' + futureLang.lbEliminar,
        tooltip: futureLang.lbEliminarCliente,
        handler: eliminarCliente
    });
    var btnimprimir = new Ext.Button({
        id: 'btnimprimir',
        text: '<i class="fa fa-print bluedark-button"></i> ' + futureLang.lbImprimir,
        tooltip: futureLang.lbImprimirCliente,
        handler: loadDataPreview
    });
    var stcliente = new Ext.data.GroupingStore({
        groupField: 'organismo',
        sortInfo: {
            field: "organismo",
            direction: "ASC"
        },
        storeId: 'stcliente',
        url: 'cargarcliente',
        autoLoad: true,
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idcliente',
            totalProperty: 'totalrecords'
        }, [{
                name: 'idcliente'
            }, {
                name: 'nombre'
            },
            {
                name: 'abreviatura'
            },
            {
                name: 'codigoreeup'
            }, {
                name: 'codigonit'
            }, {
                name: 'descripcion'
            }, {
                name: 'estado'
            },
            {name: 'idorganismo'},
            {name: 'organismo'},
            {
                name: 'tipopersona'
            },
            {
                name: 'tipo'
            }
            , {name: 'direccion'},
            {name: 'sitioweb'}, {name: 'correos'}, {name: 'telefonos'},
            {name: 'idcontactocliente'},
        ]),
        baseParams: {
            start: 0,
            limit: 20,
            cadena: ''
        },
        listeners: {
            load: function (e)
            {
                lMask.hide();
            }
        }
    });
    var tfbuscar = new Ext.form.SearchField({
        id: 'tfbuscar',
        maxLength: 30,
        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
        width: 200,
        store: stcliente,
        fnOnSearch: function () {
            buscarCliente(tfbuscar.getValue());
        },
        fnOnClear: function () {
            buscarCliente(tfbuscar.getValue());
        }
    });
    var smcliente = new Ext.grid.RowSelectionModel({
        singleSelect: true,
        listeners: {
            'rowselect': function () {
                btnmodificar.enable();
                btneliminar.enable();
            },
            'rowdeselect': function () {
                btnmodificar.disable();
                btneliminar.disable();
            }
        }
    });
    var stOrganismos = new Ext.data.Store({
        url: 'getorganismos',
        reader: new Ext.data.JsonReader({
            root: 'data',
            id: 'idorganismo'
        }, [{name: 'idorganismo'}, {name: 'nombre'}, {name: 'abreviatura'}])
    });
    var gpcliente = new Ext.grid.GridPanel({
        layout: 'fit',
        id: 'gpcliente',
        store: stcliente,
        autoExpandColumn: 'descripcion',
        sm: smcliente,
        border: false,
        loadMask: true,
        stripeRows: true,
        viewConfig: {forceFit: false, autoFill: true},
        view: new Ext.grid.GroupingView({
            forceFit: true,
            ShowGroupName: true,
            enableNoGroup: false,
            enableGroupingMenu: false,
            hideGroupedColumn: true,
            groupTextTpl: futureLang.lbGroupTextTpl
        }),
        columns: [
            {
                header: futureLang.lbOrganismo,
                width: 120,
                dataIndex: 'organismo',
                sortable: true
            },
            {
                header: futureLang.lbCodigoReeup,
                width: 120,
                dataIndex: 'codigoreeup',
                sortable: true
            }, {
                header: futureLang.lbCodigoNit,
                width: 120,
                dataIndex: 'codigonit',
                sortable: true
            },
            {
                header: futureLang.lbAbreviatura,
                width: 120,
                dataIndex: 'abreviatura',
                sortable: true
            },
            {
                id: 'nombre',
                header: futureLang.lbNombre,
                width: 250,
                dataIndex: 'nombre',
                sortable: true
            }, {
                id: 'descripcion',
                header: futureLang.lbDescripcion,
                width: 250,
                dataIndex: 'descripcion',
                hidden: true,
                sortable: true
            },
            {
                header: futureLang.lbDireccion,
                width: 250,
                dataIndex: 'direccion',
                hidden: true,
                sortable: true
            }, {
                header: futureLang.lbSitioWeb,
                width: 200,
                dataIndex: 'sitioweb',
                hidden: true,
                sortable: true
            }, {
                header: futureLang.lbCorreos,
                width: 200,
                dataIndex: 'correos',
                hidden: true,
                sortable: true
            }, {
                header: futureLang.lbTelefonos,
                width: 200,
                dataIndex: 'telefonos',
                hidden: true,
                sortable: true
            },
            {
                header: futureLang.lbEstado,
                width: 120,
                dataIndex: 'estado',
                align: 'center',
                sortable: true,
                renderer: function (value) {
                    if (parseInt(value) === 1) {
                        return '<span class="label label-success"> ' + futureLang.lbActivo + ' </span>';
                    } else {
                        return '<span class="label label-danger"> ' + futureLang.lbInactivo + ' </span>';
                    }
                }
            }
            , {
                header: 'idcliente',
                hideable: false,
                hidden: true,
                dataIndex: 'idcliente'
            }, {
                header: futureLang.lbSocioComercial,
                sortable: true,
                dataIndex: 'tipo',
                align: 'center',
                renderer: function (value) {
                    switch (parseInt(value)) {
                        case 1:
                            return '<span class="label label-info"> ' + futureLang.lbCliente + ' </span>';
                            break;
                        case 2:
                            return '<span class="label label-orange"> ' + futureLang.lbProveedor + ' </span>';
                            break;
                        default:
                            return '<span class="label label-purple"> ' + futureLang.lbAmbos + ' </span>';
                            break;
                    }
                }
            }, {
                header: futureLang.lbTipoPersona,
                sortable: true,
                dataIndex: 'tipopersona',
                align: 'center',
                renderer: function (value) {
                    if (parseInt(value) === 1) {
                        return '<span class="label label-greenDark"> ' + futureLang.lbJuridica + ' </span>';
                    } else {
                        return '<span class="label label-greenLight"> ' + futureLang.lbNatural + ' </span>';
                    }
                }
            }
        ],
        tbar: [btnadicionar, btnmodificar, btneliminar, btnimprimir, '->', tfbuscar, new Ext.Toolbar.TextItem(' ')],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stcliente,
            displayInfo: true
        }),
        listeners: {
            mouseover: function (event) {
                var t = event.getTarget();
                var v = this.getView();
                var rowIndex = v.findRowIndex(t);
                if (rowIndex !== false) {
                    var rec = this.getStore().getAt(rowIndex);
                    var contactosClientes = rec.json.Contactocliente;
                    var ttHtml = "";
                    if (contactosClientes.length > 0) {
                        for (var i = 0; i < contactosClientes.length; i++) {
                            var nombre = contactosClientes[i]['nombre'];
                            var cargo = contactosClientes[i]['cargo'];
                            var correos = contactosClientes[i]['correos'] ? contactosClientes[i]['correos'] : 'Sin definir';
                            var telefonos = contactosClientes[i]['telefonos'] ? contactosClientes[i]['telefonos'] : 'Sin definir';
                            ttHtml += '<span style="padding-left: 10px; padding-right: 5px;"><b>Nombre: </b>' + nombre + ', <b>Cargo: </b>' + cargo + ', <b>Correos: </b>' + correos + ', <b>Tel&eacute;fonos: </b> ' + telefonos + '</span> <br><br>';
                        }

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
                            trackMouse: true,
                            html: '<table width="100%" border="0" cellspacing="0" cellpadding="1" style="text-align: center; font-size: 11px">' +
                                    '<tr><table width="100%" border="0" cellspacing="0" cellpadding="2">' +
                                    '<tr>' + '<td style="vertical-align:top; font: normal 11.5px arial, tahoma, helvetica, sans-serif !important;">' +
                                    '<span style="padding-left: 10px; padding-right: 5px;"><b>'+futureLang.lbDataCliente+':</b> ' + rec.json.nombre + '</span>' +
                                    '<br><br>' + ttHtml + '</td>' + '</tr>' + '</table>' + '</td>' + '</tr></table></div>'
                        });
                    }
                }

            }
        }
    });
    new Ext.Viewport({
        layout: 'fit',
        items: gpcliente
    });
    function mostrarRegCliente(mod) {
        loadMask(futureLang.lbCargandoOrganismos);
        stOrganismos.load({
            callback: function () {
                lMask.hide();
            }
        });
        var tfCodigo = new Ext.form.TextField({
            id: 'tfCodigo',
            name: 'codigoreeup',
            fieldLabel: futureLang.lbCodigoReeup,
            anchor: '100%',
            tabIndex: 4,
            maxLength: 11,
            minLength: 11,
            maskRe: /[\d\.]/i,
            regex: /^[\d\.]{11}$/,
            allowBlank: false
        });
        var tfCodigoNIT = new Ext.form.TextField({
            id: 'tfCodigoNIT',
            name: 'codigonit',
            fieldLabel: futureLang.lbCodigoNit,
            anchor: '100%',
            tabIndex: 5,
            maxLength: 11,
            minLength: 11,
            maskRe: /[\d\.]/i,
            regex: /^[\d\.]{11}$/,
            allowBlank: false
        });
        var tfAbreviatura = new Ext.form.TextField({
            id: 'tfAbreviatura',
            name: 'abreviatura',
            fieldLabel: futureLang.lbAbreviatura,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
            tabIndex: 2,
            maxLength: 30,
            allowBlank: false,
            anchor: '100%'
        });
        var tfNombre = new Ext.form.TextField({
            id: 'tfNombre',
            name: 'nombre',
            fieldLabel: futureLang.lbNombre,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
            tabIndex: 1,
            maxLength: 255,
            allowBlank: false,
            anchor: '100%'
        });
        var taDescripcion = new Ext.form.TextArea({
            id: 'taDescripcion',
            name: 'descripcion',
            fieldLabel: futureLang.lbDescripcion,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
            allowBlank: true,
            tabIndex: 5,
            maxLength: 255,
            anchor: '100%'
        });
        var cbOrganismos = new Ext.form.ComboBox({
            tabIndex: 3,
            id: 'cbOrganismos',
            fieldLabel: futureLang.lbOrganismo,
            anchor: '100%',
            mode: 'local',
            triggerAction: 'all',
            displayField: 'abreviatura',
            hiddenName: 'idorganismo',
            valueField: 'idorganismo',
            typeAhead: true,
            forceSelection: true,
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            store: stOrganismos,
            tpl: '<tpl for="."><div ext:qtip="{nombre}" class="x-combo-list-item">{abreviatura}</div></tpl>'
        });
        var cbTipoSocioComercial = new Ext.form.ComboBox({
            id: 'cbTipoSocioComercial',
            name: 'tipo',
            tabIndex: 5,
            fieldLabel: futureLang.lbSocioComercial,
            mode: 'local',
            emptyText: futureLang.lbSeleccione,
            store: new Ext.data.SimpleStore({
                fields: ['tipo', 'dentipo'],
                data: [[1, futureLang.lbCliente], [2, futureLang.lbProveedor], [3, futureLang.lbAmbos]]
            }),
            displayField: 'dentipo',
            hiddenName: 'tipo',
            valueField: 'tipo',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            anchor: '100%',
            value: 1
        });
        var cbTipoPersona = new Ext.form.ComboBox({
            id: 'cbTipoPersona',
            name: 'tipopersona',
            tabIndex: 6,
            fieldLabel: futureLang.lbTipoPersona,
            mode: 'local',
            emptyText: 'Seleccione..',
            store: new Ext.data.SimpleStore({
                fields: ['tipopersona', 'dentipopersona'],
                data: [[1, futureLang.lbJuridica], [2, futureLang.lbNatural]]
            }),
            displayField: 'dentipopersona',
            hiddenName: 'tipopersona',
            valueField: 'tipopersona',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            anchor: '100%',
            value: 1
        });
        var cbEstado = new Ext.form.ComboBox({
            id: 'cbEstado',
            name: 'estado',
            tabIndex: 7,
            fieldLabel: futureLang.lbEstado,
            mode: 'local',
            emptyText: futureLang.lbSeleccione,
            store: new Ext.data.SimpleStore({
                fields: ['estado', 'denestado'],
                data: [[1, futureLang.lbActivo], [2, futureLang.lbInactivo]]
            }),
            displayField: 'denestado',
            valueField: 'estado',
            hiddenName: 'estado',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            anchor: '100%',
            value: 1
        });
        var tfSitioWeb = new Ext.form.TextField({
            id: 'tfSitioWeb',
            name: 'sitioweb',
            maxLength: 255,
            tabIndex: 7,
            fieldLabel: futureLang.lbSitioWeb,
            allowBlank: true,
            anchor: '100%',
            maskRe: /^[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \:\"\-\_\(\)\.\#\,\%\?\’\/\\\+\&\;\$]$/,
            regex: /^((ht|f)tp(s?)\:\/\/)?[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\’\/\\\+&amp;%\$#_]*)?$/,
            invalidText: futureLang.lbUrlInvalida
        });
        var taDireccion = new Ext.form.TextArea({
            id: 'taDireccion',
            name: 'direccion',
            maxLength: 255,
            tabIndex: 8,
            fieldLabel: futureLang.lbDireccion,
            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
            allowBlank: true,
            anchor: '100%'
        });
        var btnAddContacto = new Ext.Button({
            id: 'btnAddContacto',
            text: '<i class="fa fa-plus bluedark-button"></i> ' + futureLang.lbAdicionar,
            tooltip: futureLang.lbAdicionarContacto,
            handler: function () {
                reContacto.stopEditing();
                reContacto.insertRow();
            }
        });
        var reContacto = new Ext.grid.RowEditor({
            id: 'reContacto',
            clicksToEdit: 2,
            iconCls: 'btn',
            saveText: '<i class="fa fa-floppy-o green-button"></i> ' + Ext.lang.lbSave,
            cancelText: '<i class="fa fa-times-circle red-button"></i> ' + Ext.lang.lbCancel
        });
        var raContacto = new Ext.grid.RowActions({
            id: 'raContacto',
            header: futureLang.lbAcciones,
            widthSlope: 60,
            actions: [{
                    id: 'actionEliminar',
                    tooltip: futureLang.lbEliminarContacto,
                    iconCls: 'fa fa-trash bluedark-button',
                    icon: 'fa fa-trash bluedark-button',
                    marginLeft: 5
                }
            ]
        });
        raContacto.on('action', function (grid, record, action, rowIndex) {
            switch (action) {
                case 'actionEliminar':
                    eliminarContacto(record);
                    break;
            }
        });
        var stContactos = new Ext.data.Store({
            storeId: 'stContactos',
            url: 'cargarcontactos',
            autoLoad: false,
            reader: new Ext.data.JsonReader({
                root: 'campos',
                id: 'idcontactocliente',
                totalProperty: 'totalrecords'
            }, [{name: 'nombre'}, {name: 'cargo'}, {name: 'correos'}, {name: 'telefonos'}, {name: 'idcontactocliente'}, {name: 'idcliente'}])
        });
        var gpContactos = new Ext.grid.EditorGridPanel({
            sm: new Ext.grid.RowSelectionModel({id: 'smContactos', singleSelect: true}),
            store: stContactos,
            columns: [{id: "Nombre", header: futureLang.lbNombre, width: 100, dataIndex: 'nombre', editor: new Ext.form.TextField({
                        maxLength: 255,
                        selectOnFocus: true,
                        allowBlank: false,
                        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
                        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/
                    })},
                {header: futureLang.lbCargo, width: 100, dataIndex: 'cargo', editor: new Ext.form.TextField({
                        maxLength: 255,
                        allowBlank: false,
                        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
                        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/
                    })},
                {header: futureLang.lbCorreos, width: 100, dataIndex: 'correos', editor: new Ext.form.TextField({
                        allowBlank: true,
                        maxLength: 255,
                        vtype: 'emails'
                    })},
                {header: futureLang.lbTelefonos, width: 100, dataIndex: 'telefonos', editor: new Ext.form.TextField({
                        maxLength: 255,
                        minLength: 8,
                        allowBlank: true,
                        vtype: 'phones'
                    })},
                {id: 'idcliente', header: "idcliente", dataIndex: 'idcliente', hidden: true, hideable: false},
                {id: 'idcontactocliente', header: "idcontactocliente", dataIndex: 'idcontactocliente', hidden: true, hideable: false}, raContacto],
            title: futureLang.lbDatosContacto, autoExpandColumn: 'Nombre', layout: 'fit',
            border: true, loadMask: true, stripeRows: true, collapsible: true, collapsed: true,
            viewConfig: {forceFit: true, autoFill: true},
            tbar: [btnAddContacto],
            plugins: [raContacto, reContacto],
            height: 150
        });
        var pnlDataCliente = new Ext.FormPanel({
            labelAlign: 'top', frame: true, border: false, autoHeight: true,
            items: [{
                    layout: 'form',
                    labelAlign: 'top',
                    items: [{
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 5 0 5',
                                    layout: 'form',
                                    columnWidth: 0.65,
                                    items: tfNombre
                                }, {
                                    style: 'margin:0 10 0 5',
                                    layout: 'form',
                                    columnWidth: 0.35,
                                    items: tfAbreviatura
                                }]
                        }, {
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 10 0 5',
                                    layout: 'form',
                                    columnWidth: 0.3,
                                    items: cbOrganismos
                                }, {
                                    style: 'margin:0 5 0 10',
                                    layout: 'form',
                                    columnWidth: 0.35,
                                    items: tfCodigo
                                }, {
                                    style: 'margin:0 5 0 5',
                                    layout: 'form',
                                    columnWidth: 0.35,
                                    items: tfCodigoNIT
                                }]
                        }, {
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 10 0 5',
                                    layout: 'form',
                                    columnWidth: 1,
                                    items: taDescripcion
                                }]
                        }, {
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 10 0 5',
                                    layout: 'form',
                                    columnWidth: 0.34,
                                    items: cbTipoSocioComercial
                                }, {
                                    style: 'margin:0 5 0 10',
                                    layout: 'form',
                                    columnWidth: 0.33,
                                    items: cbTipoPersona
                                }, {
                                    style: 'margin:0 5 0 5',
                                    layout: 'form',
                                    columnWidth: 0.33,
                                    items: cbEstado
                                }]
                        }, {
                            layout: 'column',
                            items: [{
                                    style: 'margin:0 10 0 5',
                                    layout: 'form',
                                    columnWidth: 1,
                                    items: taDireccion
                                }]
                        }
//                        {
//                            layout: 'column',
//                            items: [{
//                                    style: 'margin:0 5 0 10',
//                                    layout: 'form',
//                                    columnWidth: 0.5,
//                                    items: tfCorreos
//                                }, {
//                                    style: 'margin:0 10 0 5',
//                                    layout: 'form',
//                                    columnWidth: 0.5,
//                                    items: tfTelefonos
//                                }]
//                        }, {
//                            layout: 'column',
//                            items: [{
//                                    style: 'margin:0 5 0 10',
//                                    layout: 'form',
//                                    columnWidth: 0.5,
//                                    items: tfResponsable
//                                }, {
//                                    style: 'margin:0 10 0 5',
//                                    layout: 'form',
//                                    columnWidth: 0.5,
//                                    items: tfCargo
//                                }]
//                        },
                    ]
                }]
        });
        var winDataCliente = new Ext.Window({
            title: (mod) ? futureLang.lbModificarCliente : futureLang.lbAdicionarCliente,
            layout: 'fit', closeAction: 'close', labelAlign: 'top', bodyStyle: 'padding:5px 5px 5px',
            constrain: true, modal: true, frame: true, resizable: true, width: 800,
            items: [pnlDataCliente, gpContactos],
            buttons: [{
                    text: Ext.lang.btnApply,
                    hidden: (mod) ? true : false,
                    handler: function () {
                        if (mod) {
                            modificarCliente();
                        } else {
                            adicionarCliente('apl');
                        }
                    }
                }, {
                    text: Ext.lang.btnAcept,
                    handler: function () {
                        if (mod) {
                            modificarCliente();
                        } else {
                            adicionarCliente();
                        }
                    }
                }, {
                    text: Ext.lang.btnCancel,
                    handler: function () {
                        winDataCliente.close();
                    }
                }],
            listeners: {
                'show': function () {
                    if (mod) {
                        loadMask(futureLang.lbCargandoDatos);
                        pnlDataCliente.getForm().loadRecord(smcliente.getSelected());
                        gpContactos.getStore().load({
                            params: {
                                idcliente: gpcliente.getSelectionModel().getSelected().data.idcliente
                            },
                            callback: function () {
                                lMask.hide();
                            }
                        });
                    } else {
                        pnlDataCliente.getForm().reset();
                        tfNombre.focus(false, 100);
                    }
                }
            }
        });
        winDataCliente.show();
        winDataCliente.doLayout();
        function adicionarCliente(apl) {
            if (pnlDataCliente.getForm().isValid()) {
                MostrarBarraProgreso(futureLang.lbGuardandoCliente);
                var paramsAdd = pnlDataCliente.getForm().getValues();
                var paramsContactos = new Array();
                if (gpContactos.getStore().getCount() > 0) {
                    for (var i = 0; i < gpContactos.getStore().getCount(); i++) {
                        paramsContactos.push(gpContactos.getStore().getAt(i).data);
                    }
                    paramsAdd.contactos = Ext.encode(paramsContactos);
                } else {
                    paramsAdd.contactos = Ext.encode(new Array());
                }
                Ext.Ajax.request({
                    url: 'addcliente',
                    method: 'POST',
                    params: paramsAdd,
                    callback: function (options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (parseInt(responseData) === 1) {
                            MensajeInformacion(futureLang.lbOkAddCliente);
                            pnlDataCliente.getForm().reset();
                            if (!apl) {
                                winDataCliente.close();
                            }
                            stcliente.reload();
                            smcliente.fireEvent('rowdeselect');
                        } else if (parseInt(responseData) === 2) {
                            MensajeError(futureLang.lbClienteExiste);
                        } else {
                            winDataCliente.close();
                            MensajeError(futureLang.lbError);
                        }
                    }
                });
            }
        }
        function modificarCliente() {
            if (pnlDataCliente.getForm().isValid()) {
                MostrarBarraProgreso(futureLang.lbGuardandoCliente);
                var paramsMod = pnlDataCliente.getForm().getValues();
                paramsMod.idcliente = smcliente.getSelected().data.idcliente;
                var paramsContactos = new Array();
                if (gpContactos.getStore().getCount() > 0) {
                    for (var i = 0; i < gpContactos.getStore().getCount(); i++) {
                        gpContactos.getStore().getAt(i).data.idcliente = smcliente.getSelected().data.idcliente;
                        paramsContactos.push(gpContactos.getStore().getAt(i).data);
                    }
                    paramsMod.contactos = Ext.encode(paramsContactos);
                } else {
                    paramsMod.contactos = Ext.encode(new Array());
                }
                Ext.Ajax.request({
                    url: 'modcliente',
                    method: 'POST',
                    params: paramsMod,
                    callback: function (options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (parseInt(responseData) === 1) {
                            MensajeInformacion(futureLang.lbOkModCliente);
                            pnlDataCliente.getForm().reset();
                            winDataCliente.close();
                            stcliente.reload();
                            smcliente.fireEvent('rowdeselect');
                        } else if (parseInt(responseData) === 2) {
                            MensajeError(futureLang.lbClienteExisteMod);
                        } else {
                            winDataCliente.close();
                            MensajeError(futureLang.lbError);
                        }
                    }
                });
            }
        }
        function eliminarContacto(record) {
            if (record.data.idcontactocliente) {
                MensajeInterrogacion(futureLang.lbEliminarContacto, futureLang.lbPromptEliminarContacto, function (btn) {
                    if (btn == 'ok') {
                        gpContactos.getStore().remove(record);
                        MostrarBarraProgreso(futureLang.lbEliminandoContacto);
                        Ext.Ajax.request({
                            url: 'delcontacto',
                            method: 'POST',
                            params: {idcontactocliente: record.data.idcontactocliente},
                            callback: function (options, success, response) {
                                var responseData = Ext.decode(response.responseText);
                                Ext.MessageBox.hide();
                                if (parseInt(responseData) === 1) {
                                    MensajeInformacion(futureLang.lbOkDelContacto);
                                    gpContactos.getStore().reload();
                                } else {
                                    winDataCliente.close();
                                    MensajeError(futureLang.lbError);
                                }
                            }
                        });
                    }
                });
            } else {
                gpContactos.getStore().remove(record);
            }

        }
    }
    function eliminarCliente() {
        function confirmar(btn) {
            if (btn == 'ok') {
                eliminaOK();
            }
        }
        MensajeInterrogacion(futureLang.lbEliminarCliente, futureLang.lbPromptEliminarCliente, confirmar);
        function eliminaOK() {
            MostrarBarraProgreso(futureLang.lbEliminandoCliente);
            Ext.Ajax.request({
                url: 'delcliente',
                method: 'POST',
                params: {
                    idcliente: smcliente.getSelected().data.idcliente
                },
                callback: function (options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (parseInt(responseData) === 1) {
                        MensajeConfirmacion(futureLang.lbOkDelCliente);
                        stcliente.reload();
                        smcliente.fireEvent('rowdeselect');
                    } else {
                        MensajeError(futureLang.lbError);
                    }
                }

            });
        }
    }
    function loadDataPreview() {
        loadMask(futureLang.lbCargandoDatos);
        Ext.Ajax.request({
            url: 'getdatapreview',
            method: 'POST',
            callback: function (options, success, response) {
                var responseData = Ext.decode(response.responseText);
                if (responseData.datoCuerpo.length > 0) {
                    var printView = new Ext.PrintView({paperSize: "A4", orientation: "Horizontal", reportType: "HTML", data: responseData});
                    printView.show();
                } else {
                    MensajeError(futureLang.lbError);
                }
                lMask.hide();
            }
        });
    }
    function buscarCliente(cadena) {
        stcliente.baseParams.cadena = cadena;
        stcliente.reload();
    }
});

