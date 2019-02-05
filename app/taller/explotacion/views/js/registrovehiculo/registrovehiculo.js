/* global Ext, lMask */
var indexFila;//almacena el index de la fila seleccionada
var windowopen = false;
var openWindow;
Ext.onReady(function() {
    lMask.hide();
    var tipocambio = [
        ['Tipo veh\xEDculo'], ['Tipo'], ['Marca-modelo'], ['Anno'], ['Serie'],
        ['Color primario'], ['Color secundario'], ['Matricula'], ['Chasis'], ['Motor']
                , ['Circulacion'], ['Vin'], ['Organo']
    ];
    /**************************************MENU BAJA**********************************/
    var stlistabajas, numeroorden, motivobaja, lugardestino, numeroentrega, fechabaja, fechaentrega, fpbajaregistro;
    var menu = new Ext.menu.Menu({
        id: 'mainMenu',
        items: [
            {
                text: 'Dar baja al veh\xEDculo',
                listeners: {
                    click: function() {
                        loadMask('Cargando...');
                        showEditBaja('<i class="fa fa-chevron-circle-down"></i> Dar baja al veh\xEDculo', 'add');
                    }
                }
            },
            {
                text: 'Ver bajas anteriores',
                listeners: {
                    click: function() {
                        showWindowBaja();
                    }
                }
            }
        ]
    });

// btn menuubaja
    var btnmenubaja = new Ext.Button({
        disabled: false,
        id: 'btnmenubaja',
        text: '<i class="fa fa-chevron-circle-down bluedark-button"></i> Dar baja',
        tooltip: 'Baja veh\xEDculo',
        menu: menu
    });
    /******************************************************************************/
    var btnadicionar = new Ext.Button({
        id: 'btnadicionar',
        text: '<i class="fa fa-plus bluedark-button"></i> Adicionar',
        tooltip: 'Adicionar veh\xEDculo',
        disabled: false,
        handler: function() {
            ShowWindowExpediente('<i class="fa fa-plus"></i> Adicionar datos del veh\xEDculo', 'add');
        }
    });
    var btnmodificar = new Ext.Button({
        id: 'btnmodificar',
        text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
        tooltip: 'Modificar veh\xEDculo',
        disabled: true,
        handler: function() {
            ShowWindowExpediente('<i class="fa fa-edit"></i> Modificar datos del veh\xEDculo', 'mod');
        }
    });
    var btnrealizarcambio = new Ext.Button({
        disabled: true,
        id: 'btnrealizarcambio',
        //text : 'Modificar',
        tooltip: 'Realizar cambio al veh\xEDculo',
        iconCls: 'modificar',
        handler: function() {
            switch (Ext.getCmp('tipocambio').getValue()) {
                case 'Tipo veh\xEDculo':
                    {
                        ActualizarRegistro(1);
                        break;
                    }
                case 'Tipo':
                    {
                        ActualizarRegistro(2);
                        break;
                    }
                case 'Marca-modelo':
                    {
                        ActualizarRegistro(3);
                        break;
                    }
                case 'Anno':
                    {
                        ActualizarRegistro(4);
                        break;
                    }
                case 'Serie':
                    {
                        ActualizarRegistro(5);
                        break;
                    }
                case 'Color primario':
                    {
                        ActualizarRegistro(6);
                        break;
                    }
                case 'Color secundario':
                    {
                        ActualizarRegistro(7);
                        break;
                    }
                case 'Matricula':
                    {
                        ActualizarRegistro(8);
                        break;
                    }
                case 'Chasis':
                    {
                        ActualizarRegistro(9);
                        break;
                    }
                case 'Motor':
                    {
                        ActualizarRegistro(10);
                        break;
                    }
                case 'Circulacion':
                    {
                        ActualizarRegistro(11);
                        break;
                    }
                case 'Vin':
                    {
                        ActualizarRegistro(12);
                        break;
                    }
                case 'Organo':
                    {
                        ActualizarRegistro(13);
                        break;
                    }
            }
            Ext.getCmp('tipocambio').reset();
        }
    });
    var menuVistaPrev = new Ext.menu.Menu({
        id: 'menuVistaPrev',
        items: [
            {
                text: 'Mostrar seleccionado',
                listeners: {
                    click: function() {
                        loadDataPreview(1, '', '', ''); //1= seleccionado
                    }
                }
            },
            {
                text: 'Mostrar todos',
                listeners: {
                    click: function() {
                        configImpresion(2);//2= Mostrar todos
                    }
                }
            },
            {
                text: 'Mostrar solo activos',
                listeners: {
                    click: function() {
                        configImpresion(3);//3= Mostrar solo activos
                    }
                }
            },
            {
                text: 'Mostrar solo bajas',
                listeners: {
                    click: function() {
                        configImpresion(4);//4= Mostrar solo bajas
                    }
                }
            }
        ]
    });
// btn imprimir
    var btnimprimir = new Ext.Button({
        id: 'btnimprimir',
        text: '<i class="fa fa-print bluedark-button"></i> Vista previa',
        tooltip: 'Vista previa registro de veh&iacute;culos',
        menu: menuVistaPrev
    });
//textfield buscar
    var tfbuscar = new Ext.form.SearchField({
        id: 'tfbuscar',
        maskRe: /^[ a-zA-Z0-9]+$/,
        width: 200,
        fnOnSearch: function() {
            searchVehiculo(tfbuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            searchVehiculo(tfbuscar.getValue());
        }
    });
//store del cborgano
    var sttipocambio = new Ext.data.SimpleStore({
        fields: [{
                name: 'tipocambio'
            }]
    });
    sttipocambio.loadData(tipocambio);
//combo tipo de cambio
    var cbtipocambio = new Ext.form.ComboBox({
        fieldLabel: 'Tipo de cambio',
        disabled: true,
        mode: 'local',
        id: 'tipocambio',
        emptyText: 'seleccione..',
        store: sttipocambio,
        displayField: 'tipocambio',
        typeAhead: true,
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: false,
        allowBlank: false,
        width: 120
    });
    /******************************************************************************/
// JsonReader del registro
    var rdregistro = new Ext.data.JsonReader({
        root: 'data',
        id: 'idRecord',
        totalProperty: 'total'
    }, [{name: 'idregistrovehiculo'},
        {name: 'colorsecundario'},
        {name: 'idcolorsecundario'},
        {name: 'idcolor'},
        {name: 'idgrupoexplotacion'},
        {name: 'idmarcamodelo'},
        {name: 'idorgano'},
        {name: 'idtipovehiculo'},
        {name: 'tipovehiculo'},
        {name: 'idtipofisico'},
        {name: 'descorgano'},
        {name: 'descgrupoexplotacion'},
        {name: 'fecha'},
        {name: 'desctipovehiculo'},
        {name: 'descmarcamodelo'},
        {name: 'anno'},
        {name: 'serie'},
        {name: 'desccolor'},
        {name: 'nomatricula'},
        {name: 'nochassis'},
        {name: 'nomotor'},
        {name: 'nocirculacion'},
        {name: 'novin'},
        {name: 'idestructura'},
        {name: 'denominacionestruc'},
        {name: 'observaciones'},
        {name: 'baja'},
        {name: 'base64img', type: 'string'}]);
// Store del padmin
    var stregistro = new Ext.data.Store({
        id: 'stregistro',
        name: 'stregistro',
        url: 'getregistrovehiculo',
        reader: rdregistro,
        listeners: {
            load: function(e)
            {
                lMask.hide();
                if (stregistro.getCount() > 0) {
                    smregistro.selectFirstRow();
                }
            }
        },
        baseParams: {
            criterio: ''
        },
        sortInfo: {
            field: 'descmarcamodelo',
            direction: "ASC"
        }
    });
    stregistro.load({
        params: {
            start: 0,
            limit: 20
        }
    });
// RowSelectionModel registro (seleccion simple)
    var smregistro = new Ext.grid.RowSelectionModel({
        singleSelect: true,
        listeners: {
            rowselect: function(smodel, rowIndex, record) {
                btnmodificar.enable();
                indexFila = rowIndex;
                Ext.getCmp('gpregistro').getView().addRowClass(rowIndex, "negrita");
            },
            rowdeselect: function(smodel, rowIndex, record) {
                Ext.getCmp('gpregistro').getView().removeRowClass(rowIndex, "negrita");
            }
        }
    });
// GridPanel registro
    var gpregistro = new Ext.grid.GridPanel({
        id: 'gpregistro',
        title: 'Registro de veh&iacute;culos',
        store: stregistro,
        autoExpandColumn: 'observaciones',
        sm: smregistro,
        border: false,
        loadMask: true,
        stripeRows: true,
        columns: [
            {
                id: 'descorgano',
                hidden: true,
                header: '\xD3rgano',
                sortable: true,
                dataIndex: 'descorgano'
            }, {
                id: 'descgrupoexplotacion',
                hidden: true,
                header: 'Grupo exp',
                sortable: true,
                dataIndex: 'descgrupoexplotacion'
            }, {
                id: 'expand',
                header: 'Tipo veh\xEDculo',
                width: 90,
                sortable: true,
                dataIndex: 'tipovehiculo'
            }, {
                header: 'Tipo f\xEDsico',
                width: 90,
                sortable: true,
                hidden: true,
                dataIndex: 'desctipovehiculo'
            }, {
                id: 'nombmarcamodelo',
                header: 'Marca-modelo',
                width: 120,
                sortable: true,
                dataIndex: 'descmarcamodelo'
            }, {
                id: 'anno',
                header: 'A&ntilde;o',
                width: 40,
                dataIndex: 'anno'
            }, {
                header: 'Fecha inscrip.',
//                hidden: true,
                renderer: format_Fecha,
                dataIndex: 'fecha'
            }, {
                id: 'serie',
                header: 'No. serie',
                width: 100,
                dataIndex: 'serie'
            }, {
                id: 'desccolorprimario',
                header: 'Color',
                width: 70,
                dataIndex: 'desccolor'
            }, {
                id: 'nomatricula',
                header: 'No. matr\xEDcula',
                width: 80,
                sortable: true,
                dataIndex: 'nomatricula'
            }, {
                id: 'nochasis',
                header: 'No. chasis',
                width: 80,
                dataIndex: 'nochassis'
            }, {
                id: 'nomotor',
                header: 'No. motor',
                width: 80,
                dataIndex: 'nomotor'
            }, {
                id: 'circulacion',
                header: 'No. circulaci\xF3n',
                width: 100,
                sortable: true,
                dataIndex: 'nocirculacion'
            }, {
                id: 'vin',
                header: 'Vin',
                width: 80,
                dataIndex: 'novin'
            }, {
                id: 'denominacionestruc',
                hidden: true,
                header: 'Estructura',
                sortable: true,
                dataIndex: 'denominacionestruc'
            },
            {
                id: 'observaciones',
                header: 'Observaciones',
                sortable: true,
                dataIndex: 'observaciones'
            },
            {
                id: 'baja',
                header: 'Baja',
                hidden: true,
                dataIndex: 'baja'
            }],
        tbar: [btnadicionar, btnmodificar, new Ext.Toolbar.TextItem(' '), /*new Ext.Toolbar.Separator(), new Ext.Toolbar.TextItem(' '),
         new Ext.Toolbar.TextItem(' <b>Cambio a realizar</b> '), cbtipocambio,
         new Ext.Toolbar.TextItem(' '), btnrealizarcambio,*/ new Ext.Toolbar.Separator(), btnmenubaja,
            new Ext.Toolbar.Separator(), btnimprimir, '->', tfbuscar],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: stregistro,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
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

                    var mm = rec.json.descmarcamodelo;
                    var nomat = rec.json.nomatricula;
                    var estruc = rec.json.denominacionestruc;
                    var grupoexp = rec.json.descgrupoexplotacion;
                    var color = rec.json.desccolor;
                    var anno = rec.json.anno;
                    var tipo = rec.json.desctipovehiculo;

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
                        html: createWorkerTooltip(src, mm, nomat, estruc, grupoexp, color, anno, tipo),
                        trackMouse: true
                    });
                }

            }

        }
    });
//evento para marcar las ordenes abiertas y las paralizadas
    gpregistro.getView().getRowClass = function(record, index, rowParams, store) {
        //vehiculo de baja
        if (record.data.baja == 1)
            return 'filaRoja';
    };
    new Ext.Viewport({
        layout: 'fit',
        items: gpregistro
    });

    gpregistro.on({
        resize: function(el, l) {
            tfbuscar.setWidth(201);
            gpregistro.doLayout();
        }
    });

//para las teclas de acceso rapido
    var globalKeyMap = new Ext.KeyMap(document);
    globalKeyMap.accessKey = function(key, handler, scope) {
        var h = function(n, e) {
            e.preventDefault();
            handler.call(scope || this, n, e);
        };
        this.on(key, h, scope);
    };

//adicionar orden
    globalKeyMap.accessKey({
        key: 'a',
        alt: true
    }, function() {
        if (!windowopen) {
            ShowWindowExpediente('Adicionar datos del veh\xEDculo', 'add');
        }
    }, Ext.getBody());

//modificar orden de trabajo
    globalKeyMap.accessKey({
        key: 'm',
        alt: true
    }, function() {
        if (!windowopen) {
            ShowWindowExpediente('Modificar datos del veh\xEDculo', 'mod');
        }
    }, Ext.getBody());

    /******************************************************************************/

    /******************************************************************************/
    function crearpanelfoto() {
        return new Ext.Panel({
            id: 'pFoto',
            autoHeight: true,
            autoWidth: true,
            border: true,
            autoShow: true,
            html: '<div id = "divFoto"><center><img ext:qtip = "Click para seleccionar la foto" id="foto" src="' + sin_foto() +
                    '" alt="" style="cursor:pointer;border:1px solid 000; margin: 0 !important;" height="175" width="190" onclick="openWindow.show();" ondbclick="openWindow.show();" /></center></div>'
        });
    }

    var pfoto = crearpanelfoto();
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
                emptyText: 'Solo imagen .jpg, .png, .jpeg',
                fieldLabel: 'Foto',
                regex: /^.+\.(jpg|png|jpeg)$/i,
                regexText: 'Solo se adimiten fotos con formato .jpg, .png, .jpeg',
                name: 'photoname',
                buttonCfg: {
                    text: '<i class="fa fa-search bluedark-button"></i> '
                }
            }],
        buttons: [{
                text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                id: 'aceptar',
                handler: function() {
                    if (Ext.getCmp('photo').getRawValue() == '') {
                        MensajeInformacion('Por favor seleccione una imagen.');
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
                                MensajeInformacion('Por favor seleccione una imagen.');
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
                                MensajeInformacion('Por favor seleccione una imagen.');
                            }
                        }
                        Ext.getCmp('photo').reset();
                    }
                }
            }, {
                text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                handler: function() {
                    openWindow.hide();
                }
            }]
    });

    openWindow = new Ext.Window({
        plain: true,
        title: 'Seleccionar foto',
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

    /******************************************************************************/
//funcion mostrar adicionar
    function ShowWindowExpediente(titulo, accion) {
        loadMask('Cargando...');
        var pfoto = crearpanelfoto();
        //store del cbplantilla
        var sttipovehiculo = new Ext.data.Store({
            url: 'gettipovehiculo',
            reader: new Ext.data.JsonReader({
                id: "idsttipovehiculo"
            }, [{
                    name: 'idtipovehiculo'
                },
                {
                    name: 'nombre'
                }
            ])
        });
        sttipovehiculo.load();
        //combo color predominante
        var cbtipoplantilla = new Ext.form.ComboBox({
            fieldLabel: 'Tipo veh\xEDculo',
            mode: 'local',
            id: 'cbtipoplantilla',
            emptyText: 'Seleccione...',
            store: sttipovehiculo,
            displayField: 'nombre',
            valueField: 'idtipovehiculo',
            typeAhead: true,
            tabIndex: 1,
            forceSelection: false,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 145
        });
        //combo color predominante
        var cbtipofisico = new Ext.form.ComboBox({
            fieldLabel: 'Tipo f\xEDsico',
            mode: 'local',
            id: 'cbtipofisico',
            emptyText: 'Seleccione...',
            store: sttipovehiculo,
            displayField: 'nombre',
            valueField: 'idtipovehiculo',
            tabIndex: 13,
            typeAhead: true,
            forceSelection: false,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: true,
//            allowBlank: false,
            width: 145
        });
        //store del cbmarcamodelo
        var stmarcamodelo = new Ext.data.Store({
            url: 'getmarcamodelo',
            reader: new Ext.data.JsonReader({
                id: "idstmarcamodelo"
            }, [{
                    name: 'idmarcamodelo'
                },
                {
                    name: 'nombre'
                }
            ])
        });
        stmarcamodelo.load();
        //combo  marcamodelo
        var cbmarcamodelo = new Ext.form.ComboBox({
            fieldLabel: 'Marca-modelo',
            mode: 'local',
            id: 'cbmarcamodelo',
            emptyText: 'Seleccione...',
            store: stmarcamodelo,
            displayField: 'nombre',
            valueField: 'idmarcamodelo',
            listWidth: 280,
            tabIndex: 2,
            typeAhead: true,
            resizable: true,
            forceSelection: false,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: true,
            allowBlank: false,
            width: 145
        });
        //textfield anno
        var tfanno = new Ext.form.TextField({
            id: 'idanno',
            fieldLabel: 'A&ntilde;o fabricaci\xF3n',
            name: 'anno',
            tabIndex: 11,
            maskRe: /^[0-9]+$/,
            maxLength: 4,
            minLength: 4,
            editable: false,
            allowBlank: false,
            width: 145
        });
        //textfield serie
        var tfserie = new Ext.form.TextField({
            id: 'idserie',
            fieldLabel: 'No. serie',
            name: 'serie',
            tabIndex: 6,
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 145
        });
        //store del combo estructura
        stestructura = new Ext.data.Store({
            url: 'getestructura',
            reader: new Ext.data.JsonReader({
                id: "idrdestructura"
            }, [{
                    name: 'idestructura'
                },
                {
                    name: 'abreviatura'
                },
                {
                    name: 'nombre'
                },
                {
                    name: 'descripcion'
                }
            ])
        });
        stestructura.load();
        //combo estructura
        var cbestructura = new Ext.form.ComboBox({
            fieldLabel: 'Estructura',
            mode: 'local',
            id: 'cbestructura',
            emptyText: 'Seleccione...',
            store: stestructura,
            displayField: 'nombre',
            valueField: 'idestructura',
            listWidth: 280,
            tabIndex: 15,
            typeAhead: true,
            resizable: true,
            forceSelection: false,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: true,
//            allowBlank: false,
            width: 145
        });
        stcolor = new Ext.data.Store({
            url: 'getcolor',
            reader: new Ext.data.JsonReader({
                id: "idstcolor"
            }, [{
                    name: 'idcolor'
                },
                {
                    name: 'nombre'
                }
            ])
        });
        stcolor.load();
        //combo color marcamodelo
        var cbcolor = new Ext.form.ComboBox({
            fieldLabel: 'Color primario',
            mode: 'local',
            id: 'cbcolor',
            emptyText: 'Seleccione...',
            store: stcolor,
            displayField: 'nombre',
            valueField: 'idcolor',
            tabIndex: 9,
            typeAhead: true,
            forceSelection: false,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 145
        });
        //combo color sec
        var cbcolorsec = new Ext.form.ComboBox({
            fieldLabel: 'Color secundario',
            mode: 'local',
            id: 'cbcolorsec',
            emptyText: 'Seleccione...',
            store: stcolor,
            displayField: 'nombre',
            valueField: 'idcolor',
            tabIndex: 10,
            typeAhead: true,
            forceSelection: false,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 145
        });
        //textfield serie
        var tfmatricula = new Ext.form.TextField({
            id: 'idmatricula',
            fieldLabel: 'No. matr\xEDcula',
            name: 'matricula',
            maxLength: 7,
            minLength: 6,
            tabIndex: 3,
            maskRe: /^[A-Z0-9]+$/,
            allowBlank: false,
            width: 145
        });
        //textfield chasis
        var tfchasis = new Ext.form.TextField({
            id: 'idchasis',
            fieldLabel: 'No. chasis',
            name: 'chasis',
            tabIndex: 8,
            maskRe: /^[a-zA-Z0-9]+$/,
//            allowBlank: false,
            width: 145
        });
        //textfield Motor
        var tfmotor = new Ext.form.TextField({
            id: 'idmotor',
            fieldLabel: 'No. motor',
            name: 'motor',
            tabIndex: 5,
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 145
        });
        //textfield circulacion
        var tfcirculacion = new Ext.form.TextField({
            id: 'idcirculacion',
            fieldLabel: 'No. circulaci\xF3n',
            name: 'circulacion',
            tabIndex: 4,
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 145
        });
        //textfield vin
        var tfvin = new Ext.form.TextField({
            id: 'idvin',
            fieldLabel: 'Vin',
            name: 'vin',
            tabIndex: 7,
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 145
        });
        //store del cborgano
        var storgano = new Ext.data.Store({
            url: 'getorgano',
            reader: new Ext.data.JsonReader({
                id: "idstorgano"
            }, [{
                    name: 'idorgano'
                },
                {
                    name: 'nombre'
                },
                {
                    name: 'descripcion'
                },
                {
                    name: 'identidad'
                }
            ])
        });
        storgano.load();
        //combo color marcamodelo
        var cborgano = new Ext.form.ComboBox({
            fieldLabel: '\xD3rgano',
            mode: 'local',
            id: 'cborgano',
            emptyText: 'Seleccione...',
            store: storgano,
            displayField: 'nombre',
            valueField: 'idorgano',
            tabIndex: 14,
            typeAhead: true,
            forceSelection: false,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: true,
//            allowBlank: false,
            width: 145
        });
        //store del grupo explotacion
        var stgrupoexp = new Ext.data.Store({
            url: 'getgrupoexplotacion',
            reader: new Ext.data.JsonReader({
                id: "idstgrupoexp"
            }, [{
                    name: 'idgrupoexplotacion'
                },
                {
                    name: 'nombre'
                }
            ])
        });
        stgrupoexp.load();
        //combo color marcamodelo
        var cbgrupoexp = new Ext.form.ComboBox({
            fieldLabel: 'Grupo explotaci\xF3n',
            mode: 'local',
            id: 'cbgrupoexp',
            emptyText: 'Seleccione...',
            store: stgrupoexp,
            displayField: 'nombre',
            valueField: 'idgrupoexplotacion',
            tabIndex: 16,
            typeAhead: true,
            forceSelection: false,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: true,
//            allowBlank: false,
            width: 145
        });
        // df fecha
        var dffecha = new Ext.form.DateField({
            id: 'idfecha',
            fieldLabel: 'Fecha inscripci\xF3n',
            tabIndex: 12,
            allowBlank: false,
            format: 'd/m/Y',
            width: 145
        });
        //textarea vin
        var tfobservacion = new Ext.form.TextField({
            fieldLabel: 'Observaciones',
            id: 'idobservacion',
            name: 'observacion',
            tabIndex: 17,
            maskRe: /^[ a-zA-Z0-9]+$/,
            anchor: '100%'
        });

        var fpadicionar = new Ext.FormPanel({
            frame: true,
            id: 'fpadicionar',
            name: 'fpadicionar',
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            style: 'margin:0 0 0 10',
                            layout: 'form',
                            items: [cbtipoplantilla, tfmotor, cbcolor, cbtipofisico]
                        }, {
                            style: 'margin:0 0 0 20',
                            layout: 'form',
                            items: [cbmarcamodelo, tfserie, cbcolorsec, cborgano]
                        }, {
                            style: 'margin:0 0 0 20',
                            layout: 'form',
                            items: [tfmatricula, tfvin, tfanno, cbestructura]
                        }, {
                            style: 'margin:0 0 0 20',
                            layout: 'form',
                            items: [tfcirculacion, tfchasis, dffecha, cbgrupoexp]
                        }, {
                            style: 'margin: 5 0 0 10',
                            id: 'padrefoto',
                            layout: 'form',
                            border: true,
                            frame: true,
                            items: pfoto
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            columnWidth: 1,
                            style: 'margin:0 5 0 10',
                            layout: 'form',
                            items: tfobservacion
                        }]
                }]
        });
        //ventana del adicionar registro
        win = new Ext.Window({
            modal: true,
            labelAlign: 'top',
            frame: true,
            resizable: false,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            closeAction: 'close',
            layout: 'fit',
            width: 900,
            height: 350,
            buttons: [{
                    text: '<i class="fa fa-hand-o-right blue-button"></i> <b>Aplicar</b>',
                    hidden: (accion != 'add') ? true : false,
                    handler: function() {
                        if (Ext.getCmp('fpadicionar').getForm().isValid()) {
                            ActionExpediente('apli');
                        }
                    }
                }, {
                    text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                    handler: function() {
                        if (Ext.getCmp('fpadicionar').getForm().isValid()) {
                            ActionExpediente('acept');
                        }
                    }
                },
                {
                    text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                    handler: function() {
                        fpadicionar.getForm().reset();
                        win.close();
                    }
                }]
        });
        win.add(fpadicionar);
        win.show();
        win.setTitle(titulo);
        cbtipoplantilla.focus(false, 100);
        if (accion != 'add') {
            cargarDatos();
        }
        else {
            tfanno.setValue(new Date().format('Y'));
            dffecha.setValue(new Date().format('d/m/Y'));
            lMask.hide();
        }

        win.on('show', function() {
            windowopen = true;
        });
        win.on('close', function() {
            windowopen = false;
        });

        //funcion adicionar registro
        function ActionExpediente(ind) {
            var progressMsg, url, confirmMsg;

            var params = {
                idplantilla: Ext.getCmp('cbtipoplantilla').getValue(),
                idfisico: (Ext.getCmp('cbtipofisico').getRawValue()) ? Ext.getCmp('cbtipofisico').getValue() : null,
                anno: Ext.getCmp('idanno').getValue(),
                serie: Ext.getCmp('idserie').getValue(),
                colorsec: Ext.getCmp('cbcolorsec').getValue(),
                matricula: Ext.getCmp('idmatricula').getValue(),
                chasis: Ext.getCmp('idchasis').getValue(),
                motor: Ext.getCmp('idmotor').getValue(),
                circulacion: Ext.getCmp('idcirculacion').getValue(),
                vin: Ext.getCmp('idvin').getValue(),
                observacion: Ext.getCmp('idobservacion').getValue(),
                fecha: Ext.getCmp('idfecha').getRawValue(),
                grupoexp: (Ext.getCmp('cbgrupoexp').getRawValue()) ? Ext.getCmp('cbgrupoexp').getValue() : null,
                marca: Ext.getCmp('cbmarcamodelo').getValue(),
                colorprim: Ext.getCmp('cbcolor').getValue(),
                organo: (Ext.getCmp('cborgano').getRawValue()) ? Ext.getCmp('cborgano').getValue() : null,
                estructura: (Ext.getCmp('cbestructura').getRawValue()) ? Ext.getCmp('cbestructura').getValue() : null
            };

            if (accion == 'add') {
                progressMsg = 'Adicionando datos del veh\xEDculo...';
                url = 'addvehiculo';
                confirmMsg = 'Los datos del veh\xEDculo fueron adicionados correctamente.';
            } else {
                progressMsg = 'Modificando datos del veh\xEDculo...';
                url = 'modvehiculo';
                confirmMsg = 'Los datos del veh\xEDculo fueron modificados correctamente.';
                params.idregistrovehiculo = stregistro.data.items[indexFila].get('idregistrovehiculo');
            }

            if (document.getElementById('foto').base64img) {
                params.base64img = document.getElementById('foto').base64img;
            } else {
                params.base64img = '';
            }


            MostrarBarraProgreso(progressMsg);

            Ext.Ajax.request({
                url: url,
                method: 'POST',
                params: params,
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == true) {
                        MensajeInformacion(confirmMsg);
                        fpadicionar.getForm().reset();
                        stregistro.reload();
                        if (ind == 'acept' || accion != 'add')
                            win.close();
                    }
                    else {
                        MensajeError('Ocurri\xF3 un error mientras se ejecutaba la acci\xF3n.<br>P\xF3ngase en contacto con el administrador del sistema.');
                    }
                }
            });

        }

        //carga los datos del registro seleccionado
        function cargarDatos() {
            Ext.getCmp('cbtipofisico').setValue(stregistro.data.items[indexFila].get('idtipofisico'));
            Ext.getCmp('cbtipofisico').setRawValue(stregistro.data.items[indexFila].get('desctipovehiculo'));
            Ext.getCmp('idanno').setValue(stregistro.data.items[indexFila].get('anno'));
            Ext.getCmp('idserie').setValue(stregistro.data.items[indexFila].get('serie'));
            Ext.getCmp('cbcolorsec').setValue(stregistro.data.items[indexFila].get('idcolorsecundario'));
            Ext.getCmp('cbcolorsec').setRawValue(stregistro.data.items[indexFila].get('colorsecundario'));
            Ext.getCmp('idmatricula').setRawValue(stregistro.data.items[indexFila].get('nomatricula'));
            Ext.getCmp('idchasis').setValue(stregistro.data.items[indexFila].get('nochassis'));
            Ext.getCmp('idmotor').setValue(stregistro.data.items[indexFila].get('nomotor'));
            Ext.getCmp('idcirculacion').setValue(stregistro.data.items[indexFila].get('nocirculacion'));
            Ext.getCmp('idvin').setValue(stregistro.data.items[indexFila].get('novin'));
            Ext.getCmp('idobservacion').setValue(stregistro.data.items[indexFila].get('observaciones'));
            Ext.getCmp('idfecha').setRawValue(stregistro.data.items[indexFila].get('fecha'));
            Ext.getCmp('cbgrupoexp').setValue(stregistro.data.items[indexFila].get('idgrupoexplotacion'));
            Ext.getCmp('cbgrupoexp').setRawValue(stregistro.data.items[indexFila].get('descgrupoexplotacion'));
            Ext.getCmp('cbmarcamodelo').setValue(stregistro.data.items[indexFila].get('idmarcamodelo'));
            Ext.getCmp('cbmarcamodelo').setRawValue(stregistro.data.items[indexFila].get('descmarcamodelo'));
            Ext.getCmp('cbtipoplantilla').setValue(stregistro.data.items[indexFila].get('idtipovehiculo'));
            Ext.getCmp('cbtipoplantilla').setRawValue(stregistro.data.items[indexFila].get('tipovehiculo'));
            Ext.getCmp('cbcolor').setValue(stregistro.data.items[indexFila].get('idcolor'));
            Ext.getCmp('cbcolor').setRawValue(stregistro.data.items[indexFila].get('desccolor'));
            Ext.getCmp('cborgano').setValue(stregistro.data.items[indexFila].get('idorgano'));
            Ext.getCmp('cborgano').setRawValue(stregistro.data.items[indexFila].get('descorgano'));
            Ext.getCmp('cbestructura').setValue(stregistro.data.items[indexFila].get('idestructura'));
            Ext.getCmp('cbestructura').setRawValue(stregistro.data.items[indexFila].get('denominacionestruc'));
            if (stregistro.data.items[indexFila].get('base64img')) {
                document.getElementById('foto').src = "data:image/jpg;base64," + stregistro.data.items[indexFila].get('base64img');
                document.getElementById('foto').base64img = stregistro.data.items[indexFila].get('base64img');
            }
            lMask.hide();
        }

    }

//function para la actualizacion
    function ActualizarRegistro(cmp) {
        var obj;
        /******************************************************************************/
        /******************CAMPOS DEL  ACTUAL*****************************/
        //store del cbplantilla actual
        var stplantillaactual = new Ext.data.SimpleStore({
            fields: [{
                    name: 'ejemplo'
                }]
        });
        stplantillaactual.loadData(ejemplo);
        //combo color predominante
        var cbplantillaactual = new Ext.form.ComboBox({
            fieldLabel: 'Tipo veh\xEDculo actual',
            id: 'plantillaactual',
            mode: 'local',
            mptyText: 'seleccione..',
            store: stplantillaactual,
            displayField: 'ejemplo',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 120
        });
        //store del cbtipo actual
        var sttipoactual = new Ext.data.SimpleStore({
            fields: [{
                    name: 'ejemplo'
                }]
        });
        sttipoactual.loadData(ejemplo);
        //combo color predominante
        var cbtipoactual = new Ext.form.ComboBox({
            fieldLabel: 'Tipo actual',
            mode: 'local',
            emptyText: 'seleccione..',
            store: sttipoactual,
            displayField: 'ejemplo',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 120
        });
        //store del cbmarcamodelo actual
        var stmarcamodeloactual = new Ext.data.SimpleStore({
            fields: [{
                    name: 'ejemplo'
                }]
        });
        stmarcamodeloactual.loadData(ejemplo);
        //combo  marcamodelo
        var cbmarcamodeloactual = new Ext.form.ComboBox({
            fieldLabel: 'Marca-modelo actual',
            mode: 'local',
            emptyText: 'seleccione..',
            store: stmarcamodeloactual,
            displayField: 'ejemplo',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 120
        });
        //textfield anno actual
        var tfannoactual = new Ext.form.TextField({
            id: 'idannoactual',
            fieldLabel: 'A&ntilde;o actual',
            name: 'anno',
            maskRe: /^[0-9]+$/,
            maxLength: 4,
            minLength: 4,
            editable: false,
            allowBlank: false,
            width: 120
        });
        //textfield serie actual
        var tfserieactual = new Ext.form.TextField({
            id: 'idserieactual',
            fieldLabel: 'Serie actual',
            name: 'serie',
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 120
        });
        //store del color actual
        stcoloractual = new Ext.data.SimpleStore({
            fields: [{
                    name: 'ejemplo'
                }]
        });
        stcoloractual.loadData(ejemplo);
        //combo color marcamodelo actual
        var cbcoloractual = new Ext.form.ComboBox({
            fieldLabel: 'Color prim. actual',
            mode: 'local',
            emptyText: 'seleccione..',
            store: stcoloractual,
            displayField: 'ejemplo',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 120
        });
        //store del colorsec actual
        var stcolorsecactual = new Ext.data.SimpleStore({
            fields: [{
                    name: 'ejemplo'
                }]
        });
        stcoloractual.loadData(ejemplo);
        //combo color sec actual
        var cbcolorsecactual = new Ext.form.ComboBox({
            fieldLabel: 'Color sec. actual',
            mode: 'local',
            emptyText: 'seleccione..',
            store: stcolorsecactual,
            displayField: 'ejemplo',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 120
        });
        //textfield serie actual
        var tfmatriculaactual = new Ext.form.TextField({
            id: 'idmatriculaactual',
            fieldLabel: 'Matr\xEDcula actual',
            name: 'matricula',
            maxLength: 7,
            minLength: 6,
            maskRe: /^[A-Z0-9]+$/,
            allowBlank: false,
            width: 120
        });
        //textfield chasis actual
        var tfchasisactual = new Ext.form.TextField({
            id: 'idchasisactual',
            fieldLabel: 'Chasis actual',
            name: 'chasis',
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 120
        });
        //textfield Motor actual
        var tfmotoractual = new Ext.form.TextField({
            id: 'idmotoractual',
            fieldLabel: 'Motor actual',
            name: 'motor',
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 120
        });
        //textfield circulacion actual
        var tfcirculacionactual = new Ext.form.TextField({
            id: 'idcirculacionactual',
            fieldLabel: 'Circulacion actual',
            name: 'circulacion',
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 120
        });
        //textfield vin actual
        var tfvinactual = new Ext.form.TextField({
            id: 'idvinactual',
            fieldLabel: 'Vin actual',
            name: 'vin',
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 120
        });
        //store del cborgano actual
        var storganoactual = new Ext.data.SimpleStore({
            fields: [{
                    name: 'ejemplo'
                }]
        });
        storganoactual.loadData(ejemplo);
        //combo color marcamodelo actual
        var cborganoactual = new Ext.form.ComboBox({
            fieldLabel: '\xD3rgano actual',
            mode: 'local',
            emptyText: 'seleccione..',
            store: storganoactual,
            displayField: 'ejemplo',
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 120
        });
        switch (cmp) {
            case 1:
                {
                    obj = cbplantillaactual;
                    break;
                }
            case 2:
                {
                    obj = cbtipoactual
                    break;
                }
            case 3:
                {
                    obj = cbmarcamodeloactual;
                    break;
                }
            case 4:
                {
                    obj = tfannoactual;
                    break;
                }
            case 5:
                {
                    obj = tfserieactual;
                    break;
                }
            case 6:
                {
                    obj = cbcoloractual;
                    break;
                }
            case 7:
                {
                    obj = cbcolorsecactual;
                    break;
                }
            case 8:
                {
                    obj = tfmatriculaactual;
                    break;
                }
            case 9:
                {
                    obj = tfchasisactual;
                    break;
                }
            case 10:
                {
                    obj = tfmotoractual;
                    break;
                }
            case 11:
                {
                    obj = tfcirculacionactual
                    break;
                }
            case 12:
                {
                    obj = tfvinactual;
                    break;
                }
            case 13:
                {
                    obj = cborganoactual;
                    break;
                }
        }
        /******************************************************************************/
        /******************************************************************************/
        //textfield circulacion
        var tfmatriculaact = new Ext.form.TextField({
            id: 'idmatriculaact',
            disabled: true,
            fieldLabel: 'Matr\xEDcula',
            name: 'matriculaact',
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 130
        });
        //textfield organoact
        var tforganoact = new Ext.form.TextField({
            id: 'idtforganoact',
            disabled: true,
            fieldLabel: '\xD3rgano',
            name: 'organoact',
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 130
        });
        //textfield marcamodeloact
        var tfmarcamodeloact = new Ext.form.TextField({
            id: 'idmarcamodeloact',
            disabled: true,
            fieldLabel: 'Marca-modelo',
            name: 'marcamodeloact',
            maskRe: /^[a-zA-Z0-9]+$/,
            allowBlank: false,
            width: 130
        });
        // df fechaact
        var dffechaact = new Ext.form.DateField({
            id: 'idfechaact',
            fieldLabel: 'Fecha',
            allowBlank: false,
            format: 'd/m/Y',
            width: 120
        });
        //textarea observacionact
        var tfobservacionact = new Ext.form.TextField({
            fieldLabel: 'Observaciones',
            id: 'idobservacionact',
            name: 'observacionact',
            maskRe: /^[a-zA-Z0-9]+$/,
            width: 410
        });
        //textfield anterior
        var tfanterior = new Ext.form.TextField({
            id: 'idactual',
            disabled: true,
            fieldLabel: 'Dato anterior',
            name: 'actual',
            width: 130
        });

        /***************************************************************************/

        var fpactualizar = new Ext.FormPanel({
            frame: true,
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            style: 'margin:0 0 0 10',
                            layout: 'form',
                            items: [tfmatriculaact]
                        }, {
                            style: 'margin:0 0 0 15',
                            layout: 'form',
                            items: [tforganoact]
                        }, {
                            style: 'margin:0 0 0 15',
                            layout: 'form',
                            items: [tfmarcamodeloact]
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            style: 'margin:0 0 0 10',
                            layout: 'fit',
                            items: [{
                                    xtype: 'fieldset',
                                    title: 'Cambio realizado',
                                    autoHeight: true,
                                    width: 425,
                                    items: [{
                                            layout: 'column',
                                            items: [{
                                                    items: [{
                                                            layout: 'form',
                                                            labelWidth: 50,
                                                            items: [dffechaact]
                                                        }]
                                                }, {
                                                    items: [{
                                                            layout: 'form',
                                                            labelWidth: 50,
                                                            style: 'margin:0 0 0 15',
                                                            items: [tfanterior]
                                                        }]
                                                }, {
                                                    items: [{
                                                            layout: 'form',
                                                            style: 'margin:0 0 0 15',
                                                            labelWidth: 50,
                                                            items: [obj]
                                                        }]
                                                }]
                                        }]
                                }]
                        }]
                }, , {
                    layout: 'column',
                    items: [{
                            columnWidth: 1,
                            style: 'margin:0 5 0 10',
                            layout: 'form',
                            items: tfobservacionact
                        }]
                }]
        });

        // if(!winact){
        var winact = new Ext.Window({
            modal: true,
            id: 'winact',
            labelAlign: 'top',
            frame: true,
            resizable: false,
            bodyStyle: 'padding:5px 5px 0',
            border: false,
            closable: false,
            closeAction: 'close',
            layout: 'fit',
            title: 'Actualizar datos del veh\xEDculo',
            width: 470,
            height: 320,
            items: fpactualizar,
            buttons: [{
                    text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                    handler: function() {
                        fpactualizar.getForm().reset();
                        winact.close();
                    }
                },
                {
                    text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                    handler: function() {
                        fpactualizar.getForm().reset();
                        winact.close();

                    }
                }]
        });
        winact.show();
        winact.on('show', function() {
            windowopen = true;
        });
        winact.on('close', function() {
            windowopen = false;
        });
    }
//**************FUNCION BUSCAR EXPEDIENTE****************************************
    function searchVehiculo(criterio) {
        stregistro.baseParams.criterio = criterio;
        stregistro.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
    /******************************************************************************/
//funcion configurar impresion
    function configImpresion(ind) {
        //textfield aprobado
        var tfaprobado = new Ext.form.TextField({
            id: 'tfaprobado',
            fieldLabel: 'Aprobado por',
            name: 'tfaprobado',
            //maskRe:/^[ a-zA-Z\.\-0-9]+$/,
            allowBlank: false,
            width: 190
        });
        //textfield unidad
        var tffirmado = new Ext.form.TextField({
            id: 'tffirmado',
            fieldLabel: 'Firmado por',
            name: 'tfunidad',
            tabIndex: 0,
            //maskRe:/^[ a-zA-Z\.\-0-9\´]+$/,
            allowBlank: false,
            width: 190
        });
        //store del cborgano
        var storgano = new Ext.data.Store({
            url: 'getorgano',
            reader: new Ext.data.JsonReader({
                id: "idstorgano"
            }, [{
                    name: 'idorgano'
                },
                {
                    name: 'nombre'
                },
                {
                    name: 'descripcion'
                },
                {
                    name: 'identidad'
                }
            ])
        });
        storgano.load();
//combo organo
        var cborgano = new Ext.form.ComboBox({
            fieldLabel: '&Oacute;rgano',
            mode: 'local',
            id: 'cborgano',
            emptyText: 'Seleccione...',
            store: storgano,
            tabIndex: 1,
            displayField: 'nombre',
            valueField: 'idorgano',
            typeAhead: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: true,
            width: 190
        });
        var fpconfigimpresion = new Ext.FormPanel({
            frame: true,
            id: 'fpconfigimpresion',
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            style: 'margin:0 0 0 5',
                            layout: 'form',
                            items: [tfaprobado, cborgano]
                        }, {
                            style: 'margin:0 0 0 5',
                            layout: 'form',
                            items: [tffirmado]
                        }]
                }]
        });
        /*******************************************************************************/
        win = new Ext.Window({
            modal: true,
            labelAlign: 'top',
            frame: true,
            resizable: false,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            closeAction: 'close',
            layout: 'fit',
            title: '<i class="fa fa-print"></i> Configurar impresi\xF3n',
            width: 430,
            height: 210,
            buttons: [{
                    text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                    handler: function() {
                        if (fpconfigimpresion.getForm().isValid()) {
                            loadDataPreview(ind, tfaprobado.getValue(), (cborgano.getRawValue()) ? cborgano.getValue() : '', tffirmado.getValue());
                        }
                    }
                },
                {
                    text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                    handler: function() {
                        fpconfigimpresion.getForm().reset();
                        win.close();
                    }
                }]
        });
        win.add(fpconfigimpresion);
        win.show();
        tfaprobado.focus(false, 100);
        win.on('show', function() {
            windowopen = true;
        });
        win.on('close', function() {
            windowopen = false;
        });

    }
    /*****************************************************************************/
    function contex(aprob, firm, org) {
        tabla_cabeza = '<table style="font-size:12px; font-family: Arial, Helvetica, sans-serif; border="0" solid #000" width="98%" align="center" cellpadding="0" cellspacing="0" cols="10">' +
                '<tr>' +
                '<td align="center" width="98%" colspan="10" style="font-size:16px;"><b>EMPLANTILLAMIENTO Y REGISTRO DE LOS MEDIOS DE TRANSPORTE DE ' + org + ' </b></td>' +
                '</tr>' +
                '<tr>' +
                '<td height="30" align="left" colspan="2" style="font-size:14px;"></td>' +
                '</tr>' +
                '</table>';

        tabla_pie = '<table style="font-size:10px; font-family: Arial, Helvetica, sans-serif; border="0" solid #000" width="96%" align="center" cellpadding="0" cellspacing="0" cols="10">' +
                '<tr>' +
                '<td align="center" width="100%" height="20px" colspan="6" style="font-size:16px;"></td>' +
                '</tr>' +
                '<tr>' +
                '<td height="50" valign="top" align="left" colspan="2" style="font-size:14px;"><b>Expedido a los ' + new Date().format('d') + ' d\xEDas del mes ' + new Date().format('m') + ' de ' + new Date().format('Y') + '.</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td height="30" width="50%" align="left"style="font-size:14px;">' + '<b>Aprobado:  ' + aprob + '</b></td>' +
                '<td height="30" width="50%" align="right"style="font-size:14px;">' + '<b>Firmado:  ' + firm + '</b></td>' +
                '</tr>' +
                '<tr>' +
                '<td height="30" width="50%" align="left"style="font-size:14px;">' + '<b>Jefe de Transporte \xD3rgano (Provincia)</b></td>' +
                '<td height="30" width="50%" align="right"style="font-size:14px;">' + '<b>Jefe Municipio (Unidad)</b></td>' +
                '</tr></table>';
    }

    function showWindowBaja() {
        var btnmodbaja = new Ext.Button({
            id: 'btnmodbaja',
            disabled: true,
            text: '<i class="fa fa-edit bluedark-button"></i> Modificar',
            tooltip: 'Modificar datos de la baja',
            handler: function() {
                if (smlistabajas.getSelected()) {
                    showEditBaja('<i class="fa fa-edit"></i> Modificar datos de la baja', 'mod');
                    numeroorden.setValue(smlistabajas.getSelected().data.numeroorden);
                    motivobaja.setValue(smlistabajas.getSelected().data.motivo);
                    lugardestino.setValue(smlistabajas.getSelected().data.destino);
                    numeroentrega.setValue(smlistabajas.getSelected().data.numeroentrega);
                    fechabaja.setValue(smlistabajas.getSelected().data.fechaorden);
                    fechaentrega.setValue(smlistabajas.getSelected().data.fechaentrega);
                }
            }
        });
        var tfbuscarbaja = new Ext.form.SearchField({
            id: 'tfbuscar',
            maskRe: /^[ a-zA-Z0-9]+$/,
            width: 200,
            fnOnSearch: function() {
                searchBajaVehiculo(tfbuscarbaja.getValue());
            },
            fnOnClear: function() {
                this.reset();
                searchBajaVehiculo(tfbuscarbaja.getValue());
            }
        });

        var rdlistabajas = new Ext.data.JsonReader({
            root: 'data',
            id: 'idRecord',
            totalProperty: 'total'
        }, [{
                name: 'idregistrovehiculo'
            }, {
                name: 'colorsecundario'
            }, {
                name: 'idcolorsecundario'
            }, {
                name: 'idcolor'
            }, {
                name: 'idgrupoexplotacion'
            }, {
                name: 'idmarcamodelo'
            }, {
                name: 'idorgano'
            }, {
                name: 'idtipovehiculo'
            }, {
                name: 'tipovehiculo'
            }, {
                name: 'idtipofisico'
            }, {
                name: 'descorgano'
            }, {
                name: 'descgrupoexplotacion'
            }, {
                name: 'fecha'
            }, {
                name: 'desctipovehiculo'
            }, {
                name: 'descmarcamodelo'
            }, {
                name: 'anno'
            }, {
                name: 'serie'
            }, {
                name: 'desccolor'
            }, {
                name: 'nomatricula'
            }, {
                name: 'nochassis'
            }, {
                name: 'nomotor'
            }, {
                name: 'nocirculacion'
            }, {
                name: 'novin'
            }, {
                name: 'idestructura'
            }, {
                name: 'denominacionestruc'
            }, {
                name: 'observaciones'
            }, {
                name: 'destino'
            }, {
                name: 'idbajavehiculo'
            }, {
                name: 'fechaorden'
            }, {
                name: 'numeroorden'
            }, {
                name: 'motivo'
            }, {
                name: 'numeroentrega'
            }, {
                name: 'fechaentrega'
            }]);

        stlistabajas = new Ext.data.Store({
            id: 'stlistabajas',
            url: 'getregistrobajas',
            reader: rdlistabajas,
            baseParams: {
                criterio: ''
            },
            sortInfo: {
                field: 'descmarcamodelo',
                direction: "ASC"
            }, listeners: {
                beforeload: function(s, o) {
                    loadMask('Cargando...');
                }, load: function(s, o) {
                    lMask.hide();
                }
            }
        });
        stlistabajas.load({
            params: {
                start: 0,
                limit: 20
            }
        });

        var smlistabajas = new Ext.grid.RowSelectionModel({
            singleSelect: true
        });
        smlistabajas.on('rowselect', function() {
            btnmodbaja.enable();
        });

        var gplistabajas = new Ext.grid.GridPanel({
            id: 'gplistabajas',
            store: stlistabajas,
            sm: smlistabajas,
            border: false,
            columns: [
                {
                    id: 'idregistro',
                    hidden: true,
                    header: 'idregistro',
                    dataIndex: 'idregistrovehiculo'
                }, {
                    id: 'nombmarcamodelo',
                    header: 'Marca-modelo',
                    width: 120,
                    dataIndex: 'descmarcamodelo'
                }, {
                    id: 'nomatricula',
                    header: 'Matr\xEDcula',
                    width: 60,
                    dataIndex: 'nomatricula'
                }, {
                    id: 'numeroorden',
                    header: 'N\xFAmero orden',
                    width: 120,
                    dataIndex: 'numeroorden'
                }, {
                    id: 'fechaorden',
                    header: 'Fecha orden',
                    width: 120,
                    renderer: format_Fecha,
                    dataIndex: 'fechaorden'
                }, {
                    id: 'motivo',
                    header: 'Motivo',
                    width: 120,
                    dataIndex: 'motivo'
                }, {
                    id: 'numeroentrega',
                    header: 'N\xFAmero entrega',
                    width: 120,
                    dataIndex: 'numeroentrega'
                }, {
                    id: 'fechaentrega',
                    header: 'Fecha entrega',
                    width: 120,
                    renderer: format_Fecha,
                    dataIndex: 'fechaentrega'
                }, {
                    id: 'destino',
                    header: 'Destino',
                    width: 120,
                    dataIndex: 'destino'
                }, {
                    id: 'idbajavehiculo',
                    header: 'idbajavehiculo',
                    hidden: true,
                    width: 120,
                    dataIndex: 'idbajavehiculo'
                }],
            tbar: [btnmodbaja, '->', tfbuscarbaja],
            bbar: new Ext.PagingToolbar({
                pageSize: 20,
                store: stlistabajas,
                displayInfo: true,
                displayMsg: 'Resultados de {0} - {1} de {2}',
                emptyMsg: "No hay resultados para mostrar."
            })
        });

        winbaja = new Ext.Window({
            modal: true,
            maximizable: true,
            id: 'winbaja',
            frame: true,
            resizable: false,
            closeAction: 'close',
            layout: 'fit',
            title: '<i class="fa fa-chevron-circle-down"></i> Veh\xEDculos que causaron baja',
            buttons: [{
                    text: '<i class="fa fa-times-circle red-button"></i> <b>Cerrar</b>',
                    handler: function() {
                        winbaja.close();
                    }
                }]
        });

        winbaja.on('show', function() {
            windowopen = true;
        });
        winbaja.on('close', function() {
            windowopen = false;
        });

        winbaja.add(gplistabajas);
        winbaja.show();
        winbaja.maximize();
        winbaja.doLayout();
    }

    function showEditBaja(titulo, accion) {
        numeroorden = new Ext.form.TextField({
            id: 'numeroorden',
            fieldLabel: 'N\xFAmero de orden',
            //maskRe:/^[a-zA-Z0-9]+$/,
            allowBlank: false,
            anchor: '100%'
        });

        motivobaja = new Ext.form.TextField({
            id: 'motivobaja',
            fieldLabel: 'Motivo de la baja',
            //maskRe:/^[a-zA-Z0-9]+$/,
            allowBlank: false,
            anchor: '100%'
        });

        lugardestino = new Ext.form.TextField({
            id: 'lugardestino',
            fieldLabel: 'Lugar de destino',
            //maskRe:/^[a-zA-Z0-9]+$/,
            //allowBlank:false,
            anchor: '100%'
        });

        numeroentrega = new Ext.form.TextField({
            id: 'numeroentrega',
            fieldLabel: 'N\xFAmero de entrega',
            //maskRe:/^[a-zA-Z0-9]+$/,
            anchor: '100%'
        });

        fechabaja = new Ext.form.DateField({
            id: 'fechabaja',
            fieldLabel: 'Fecha de la baja',
            allowBlank: false,
            format: 'd/m/Y',
            anchor: '100%'
        });

        fechaentrega = new Ext.form.DateField({
            id: 'fechaentrega',
            fieldLabel: 'Fecha de entrega',
            format: 'd/m/Y',
            anchor: '100%'
        });

        fpbajaregistro = new Ext.FormPanel({
            frame: true,
            id: 'fpbajaregistro',
            labelAlign: 'top',
            items: [{
                    style: 'margin:0 0 0 5',
                    xtype: 'fieldset',
                    title: '\xD3rden de baja del veh\xEDculo',
                    height: 130,
                    width: 385,
                    items: [{
                            layout: 'column',
                            items: [{
                                    columnWidth: .5,
                                    layout: 'form',
                                    items: numeroorden
                                }, {
                                    columnWidth: .5,
                                    style: 'margin:0 0 0 5',
                                    layout: 'form',
                                    items: fechabaja
                                }]
                        }, {
                            columnWidth: 1,
                            layout: 'form',
                            items: motivobaja
                        }]
                }, {
                    style: 'margin:10 0 0 5',
                    xtype: 'fieldset',
                    title: 'Destino del veh\xEDculo',
                    height: 130,
                    width: 385,
                    items: [{
                            layout: 'column',
                            items: [{
                                    columnWidth: .5,
                                    layout: 'form',
                                    items: numeroentrega
                                }, {
                                    columnWidth: .5,
                                    style: 'margin:0 0 0 5',
                                    layout: 'form',
                                    items: fechaentrega
                                }]
                        }, {
                            columnWidth: 1,
                            layout: 'form',
                            items: lugardestino
                        }]
                }]
        });
        //ventana del adicionar registro
        winbajaregistro = new Ext.Window({
            modal: true,
            id: 'winbajaregistro',
            labelAlign: 'top',
            frame: true,
            resizable: false,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            closeAction: 'close',
            layout: 'fit',
            title: titulo,
            width: 430,
            height: 370,
            buttons: [{
                    text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                    handler: function() {
                        if (Ext.getCmp('fpbajaregistro').getForm().isValid())
                            if (accion == 'add')
                                MensajeInterrogacion('Dar baja al veh\xEDculo', 'Est\xE1 seguro que desea dar baja al veh\xEDculo: Matr\xEDcula <b>' + stregistro.data.items[indexFila].get('nomatricula') + '</b><br> Modelo <b>' + stregistro.data.items[indexFila].get('descmarcamodelo') + '</b>', confirmar)
                            else
                                modBaja();
                    }
                },
                {
                    text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                    handler: function() {
                        fpbajaregistro.getForm().reset();
                        winbajaregistro.close();
                    }
                }]
        });
        winbajaregistro.add(fpbajaregistro);
        winbajaregistro.show();
        fechabaja.setValue(new Date().format('d/m/Y'));
        fechaentrega.setValue(new Date().format('d/m/Y'));
        numeroorden.focus(false, 100);
        lMask.hide();

        winbajaregistro.on('show', function() {
            windowopen = true;
        });
        winbajaregistro.on('close', function() {
            windowopen = false;
        });
    }

    function addBaja() {
        MostrarBarraProgreso('Tramitando baja del veh\xEDculo...');
        Ext.Ajax.request({
            url: 'addbajavehiculo',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('El veh\xEDculo fue dado de baja correctamente.');
                    Ext.getCmp('winbajaregistro').close();
                    stregistro.reload();
                }
                else {
                    Ext.getCmp('winbajaregistro').close();
                    MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
                }
                lMask.hide();
            },
            params: {
                idregistrovehiculo: stregistro.data.items[indexFila].get('idregistrovehiculo'),
                fechaorden: Ext.getCmp('fechabaja').getRawValue(),
                numeroorden: Ext.getCmp('numeroorden').getValue(),
                motivo: Ext.getCmp('motivobaja').getValue(),
                numeroentrega: Ext.getCmp('numeroentrega').getValue(),
                fechaentrega: Ext.getCmp('fechaentrega').getRawValue(),
                destino: Ext.getCmp('lugardestino').getValue()
            }
        });
    }

    function modBaja() {
        MostrarBarraProgreso('Modificando baja del veh\xEDculo...');
        Ext.Ajax.request({
            url: 'setbajavehiculo',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (responseData == 1) {
                    MensajeInformacion('Los datos fueron modificados correctamente.');
                    Ext.getCmp('winbajaregistro').close();
                    stlistabajas.reload();
                }
                else {
                    Ext.getCmp('winbajaregistro').close();
                    MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
                }
                lMask.hide();
            },
            params: {
                idbajavehiculo: Ext.getCmp('gplistabajas').getSelectionModel().getSelected().data.idbajavehiculo,
                fechaorden: Ext.getCmp('fechabaja').getRawValue(),
                numeroorden: Ext.getCmp('numeroorden').getValue(),
                motivo: Ext.getCmp('motivobaja').getValue(),
                numeroentrega: Ext.getCmp('numeroentrega').getValue(),
                fechaentrega: Ext.getCmp('fechaentrega').getRawValue(),
                destino: Ext.getCmp('lugardestino').getValue()
            }
        });
    }

    function searchBajaVehiculo(criterio) {
        stlistabajas.baseParams.criterio = criterio;
        stlistabajas.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }

    function confirmar(btn) {
        if (btn === 'ok')
            addBaja();
    }

    function setImagen(base64Img) {
        document.getElementById('foto').src = 'data:image/jpg;base64,' + base64Img;
        document.getElementById('foto').base64img = base64Img;
        var p = Ext.get('pFoto');
        Ext.get('pFoto').scale(p.getSize().width, p.getSize().heigth);
    }

    function createWorkerTooltip(src, mm, nomat, estruc, grupoexp, color, anno, tipo) {
        var templateTooltip = '<table width="100%" border="0" cellspacing="0" cellpadding="1" style="text-align: center; font-size: 11px">' +
                '<tr>' +
                '<td>' +
                '<table width="100%" border="0" cellspacing="0" cellpadding="4">' +
                '<tr>' + '<td width="10%" style="text-align: center; vertical-align: top">' +
                '<span><img src="' + src + '" width="165" height="165" style="border: 1px solid #CECECE;"></span>' +
                '</td>' +
                '<td style="vertical-align:top; font: normal 11.5px arial, tahoma, helvetica, sans-serif !important;">' +
                '<b><span style="padding-left: 10px; padding-right: 5px;">' + mm + ' [' + tipo + ']' + '</span></b>' +
                '<br><br><span style="padding-left: 10px; padding-right: 5px;"><b>Matr\xEDcula:</b> ' + nomat + '</span>' +
                '<br><br><span style="padding-left: 10px; padding-right: 5px;"><b>Estructura:</b> ' + estruc + '</span>' +
                '<br><br><span style="padding-left: 10px; padding-right: 5px;"><b>Grupo exp:</b> ' + grupoexp + '</span>' +
                '<br><br><span style="padding-left: 10px; padding-right: 5px;"><b>Color:</b> ' + color + '</span>' +
                '<br><br><span style="padding-left: 10px; padding-right: 5px;"><b>A&ntilde;o:</b> ' + anno + '</span>' +
                '</td>' + '</tr>' + '</table>' + '</td>' + '</tr></table></div>';
        return templateTooltip;
    }

    function loadDataPreview(tipo, aprob, org, firm) {
        loadMask('Cargando...');
        Ext.Ajax.request({
            url: 'loadDataPreview',
            method: 'POST',
            params: {
                tipo: tipo,
                aprobado: aprob,
                organo: org,
                firmado: firm
            },
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
            }
        });
    }
});