/* global Ext, lMask, openWindow, format_Fecha */
        Ext.onReady(function() {
    ﻿Ext.QuickTips.init();
    windowopen = false;
    var datamilitancia = [['PCC'], ['UJC'], ['No tiene']];
    var dataocupacion = [['mec\xE1nico'], ['electricista'], ['chapista'], ['fregador'], ['servicios'], ['pintor'], ['ponchero'], ['mec\xE1nico taller']];
    var datanivel = [['6to grado'], ['9no grado'], ['12mo grado'], ['Obrero calificado'], ['T\xE9cnico medio'], ['Universitario']];
    var btnaddtrabajador = new Ext.Button({
        id: 'btnaddtrabajador',
        text: '<i class="fa fa-plus bluedark-button"></i> <u>A</u>dicionar',
        tooltip: 'Adicionar trabajador (<b>Alt + A</b>)',
        handler: function() {
            if (!windowopen)
                showActionWindow('add');
        }
    });
    var btnmodtrabajador = new Ext.Button({
        disabled: true,
        id: 'btnmodtrabajador',
        text: '<i class="fa fa-edit bluedark-button"></i> <u>M</u>odificar',
        tooltip: 'Modificar trabajador (<b>Alt + M</b>)',
        handler: function() {
            if (!windowopen)
                showActionWindow('mod');
        }
    });
    var btndeltrabajador = new Ext.Button({
        disabled: true,
        id: 'btndeltrabajador',
        text: '<i class="fa fa-trash bluedark-button"></i> Eliminar',
        tooltip: 'Eliminar trabajador',
        handler: function() {
            if (!windowopen)
                EliminarTrabajador();
        }
    });
    var menu = new Ext.menu.Menu({
        id: 'mainMenu',
        items: [
            {
                text: '<i class="fa fa-user-times bluedark-button"></i> Dar baja al trabajador',
                listeners: {
                    click: function() {
                        bajaTrabajador();
                    }
                }
            },
            {
                text: '<i class="fa fa-eye bluedark-button"></i> Ver bajas anteriores',
                listeners: {
                    click: function() {
                        mostrarVentanaBaja();
                    }
                }
            }
        ]
    });
    var btnbajatrabajador = new Ext.Button({
        disabled: true,
        id: 'btnbajatrabajador',
        text: '<i class="fa fa-user-times bluedark-button"></i> Bajas',
        tooltip: 'Dar baja trabajador',
        menu: menu
    });
    var btnimprimir = new Ext.Button({
        id: 'btnimprimir',
        text: '<i class="fa fa-print bluedark-button"></i> Imprimir',
        tooltip: 'Imprimir',
        handler: loadDataPreview
    });
    var sttrabajador = new Ext.data.GroupingStore({
        url: 'cargartrabajadores',
        reader: new Ext.data.JsonReader({
            root: 'campos',
            id: 'idRecord',
            totalProperty: 'totalRecords'
        }, [
            {name: 'idtrabajador'},
            {name: 'nombre'},
            {name: 'apellidos'},
            {name: 'cidentidad'},
            {name: 'direccion'},
            {name: 'nivelescolar'},
            {name: 'ocupacion'},
            {name: 'expediente'},
            {name: 'militancia'},
            {name: 'telefono'},
            {name: 'fechaentrada'},
            {name: 'baja'},
            {name: 'base64img', type: 'string'}
        ]),
        listeners: {
            load: function(store, records, options)
            {
                if (sttrabajador.getCount() > 0) {
                    smtrabajador.selectFirstRow();
                }
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
    var tfbuscar = new Ext.form.SearchField({
        id: 'tfbuscar',
        maxLength: 30,
        maskRe: /^[ a-zA-Z0-9]+$/,
        width: 200,
        store: sttrabajador,
        fnOnSearch: function() {
            BuscarTrabajador(tfbuscar.getValue());
        },
        fnOnClear: function() {
            this.reset();
            BuscarTrabajador(tfbuscar.getValue());
        }
    });
    sttrabajador.load({
        params: {
            start: 0,
            limit: 20
        }
    });
    var smtrabajador = new Ext.grid.RowSelectionModel({
        id: 'smtrabajador',
        singleSelect: true,
        listeners: {
            'rowselect': function(sm, rowIndex, record) {
                if (record.data.baja == 0) {
                    btnmodtrabajador.enable();
                    btndeltrabajador.enable();
                    btnbajatrabajador.enable();
                } else {
                    btnmodtrabajador.disable();
                    btndeltrabajador.disable();
                    btnbajatrabajador.disable();
                }
                Ext.getCmp('gptrabajador').getView().addRowClass(rowIndex, "negrita");
            },
            'rowdeselect': function(sm, rowIndex, record) {
                btnmodtrabajador.disable();
                btndeltrabajador.disable();
                btnbajatrabajador.disable();
                Ext.getCmp('gptrabajador').getView().removeRowClass(rowIndex, "negrita");
            }
        }
    });
    var gptrabajador = new Ext.grid.GridPanel({
        id: 'gptrabajador',
        layout: 'fit',
        store: sttrabajador,
        sm: smtrabajador,
        border: false,
        loadMask: true,
        autoExpandColumn: 'direccion',
        viewConfig: {
            autoFill: true,
            forceFit: true
        },
        columns: [{
                header: 'C&oacute;digo',
                width: 60,
                hidden: true,
                hiddeable: true,
                dataIndex: 'idtrabajador'
            },
            {
                header: 'C. identidad',
                tooltip: 'N&#xBA. Carn&eacute; de identidad',
                width: 80,
                sortable: true,
                dataIndex: 'cidentidad'
            },
            {
                header: 'Nombre',
                tooltip: 'Nombre del trabajador',
                width: 100,
                sortable: true,
                dataIndex: 'nombre'
            },
            {
                header: 'Apellidos',
                tooltip: 'Apellidos del trabajador',
                width: 130,
                sortable: true,
                dataIndex: 'apellidos'
            },
            {
                header: "N&#xBA. expediente",
                tooltip: "N&#xBA. expediente laboral",
                width: 90,
                dataIndex: 'expediente'
            },
            {
                header: "Ocupaci\xF3n",
                width: 100,
                sortable: true,
                dataIndex: 'ocupacion'
            },
            {
                header: "Fecha entrada",
                width: 80,
                sortable: true,
                dataIndex: 'fechaentrada',
                renderer: format_Fecha
            },
            {
                header: "Nivel escolar",
                tooltip: "Nivel de escolaridad",
                sortable: true,
                width: 100,
                dataIndex: 'nivelescolar'
            },
            {
                header: "Militancia",
                tooltip: "Militancia del trabajador",
                width: 60,
                sortable: true,
                dataIndex: 'militancia'
            },
            {
                header: "Tel&eacute;fonos",
                width: 70,
                sortable: true,
                dataIndex: 'telefono'
            },
            {
                id: 'direccion',
                header: ' Direcci\xF3n',
                width: 75,
                sortable: true,
                dataIndex: 'direccion'
            }],
        tbar: [btnaddtrabajador, btnmodtrabajador, btndeltrabajador, btnbajatrabajador, btnimprimir, '->', tfbuscar, new Ext.Toolbar.TextItem(' ')],
        bbar: new Ext.Feet.PagingToolbar({
            pageSize: 20,
            store: sttrabajador,
            displayInfo: true,
            displayMsg: 'Resultados de {0} - {1} de {2}',
            emptyMsg: "No hay resultados para mostrar."
        }),
        listeners: {
            mouseover: function(event) {
                var t = event.getTarget();
                var v = this.getView();
                var rowIndex = v.findRowIndex(t);
                if (rowIndex !== false) {
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

            },
            resize: function(el, l) {
                tfbuscar.setWidth(201);
                gptrabajador.doLayout();
            }
        }
    });
    gptrabajador.getView().getRowClass = function(record, index, rowParams, store) {
        if (record.data.baja == true) { //baja
            return 'filaRoja';
        }
    };
    new Ext.Viewport({
        layout: 'fit',
        items: [new Ext.Panel({
                title: 'Trabajadores de la entidad',
                layout: 'fit',
                items: [gptrabajador]
            })]
    });
    var globalKeyMap = new Ext.KeyMap(document);
    globalKeyMap.accessKey = function(key, handler, scope) {
        var h = function(n, e) {
            e.preventDefault();
            handler.call(scope || this, n, e);
        };
        this.on(key, h, scope);
    };
    globalKeyMap.accessKey({
        key: 'a',
        alt: true
    }, function() {
        if (!windowopen) {
            showActionWindow('add');
        }
    }, Ext.getBody());
    globalKeyMap.accessKey({
        key: 'm',
        alt: true
    }, function() {
        if (!windowopen && !btnmodtrabajador.disabled) {
            showActionWindow('mod');
        }
    }, Ext.getBody());
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
                    text: '<i class="fa fa-search bluedark-button"></i>'
                }
            }],
        buttons: [{
                text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                id: 'aceptar',
                handler: function() {
                    if (Ext.getCmp('photo').getRawValue() == '') {
                        MensajeAdvertencia('Por favor seleccione una imagen.');
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
                                MensajeAdvertencia('Por favor seleccione una imagen.');
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
                                MensajeAdvertencia('Por favor seleccione una imagen.');
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
        constrain: true,
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
    function crearpanelfoto() {
        return new Ext.Panel({
            id: 'pFoto',
            autoHeight: true,
            autoWidth: true,
            border: true,
            autoShow: true,
            html: '<div id = "divFoto"><center><img ext:qtip = "Click para seleccionar la foto" id="foto" src="' + sin_foto() +
                    '" alt="" style="cursor:pointer;border:1px solid 000; margin: 0 !important;" height="130" width="140" onclick="openWindow.show();" ondbclick="openWindow.show();" /></center></div>'
        });
    }
    var pfoto = crearpanelfoto();
    function showActionWindow(ind) {
        var pfoto = crearpanelfoto();
        var tfnoidentidad = new Ext.form.TextField({
            fieldLabel: 'C. identidad',
            name: 'noidentidad',
            tabIndex: 3,
            width: 140,
            maskRe: /^[0-9]+$/,
            maxLength: 11,
            minLength: 11,
            allowBlank: false
        });
        var tfnombre = new Ext.form.TextField({
            fieldLabel: 'Nombre',
            name: 'nombre',
            maxLength: 30,
            tabIndex: 1,
            width: 140,
            maskRe: /^[\xE1\xE9\xED\xF3\xFA\xF1\xC1\xC9\xCD\xD3\xDA\xD1A-Za-z ]+$/, //vocales mayus y minusc con tilde, ñ min y may, letras
            allowBlank: false
        });
        var tfapellidos = new Ext.form.TextField({
            fieldLabel: 'Apellidos',
            name: 'apellidos',
            maxLength: 50,
            tabIndex: 2,
            width: 140,
            maskRe: /^[\xE1\xE9\xED\xF3\xFA\xF1\xC1\xC9\xCD\xD3\xDA\xD1A-Za-z ]+$/, //vocales mayus y minusc con tilde, ñ min y may, letras
            allowBlank: false
        });
        var tfexpediente = new Ext.form.TextField({
            fieldLabel: 'No. expediente',
            maxLength: 20,
            tabIndex: 8,
            width: 140,
            maskRe: /^[ a-zA-Z0-9]+$/,
            allowBlank: false
        });
        var tftelefono = new Ext.form.TextField({
            fieldLabel: 'Tel&eacute;fono',
            name: 'telefono',
            maxLength: 255,
            minLength: 8,
            vtype: 'phones',
            tabIndex: 4,
            width: 140,
            allowBlank: true
        });
        var tfdireccion = new Ext.form.TextArea({
            fieldLabel: 'Direcci\xF3n',
            name: 'direcccion',
            maxLength: 255,
            tabIndex: 10,
            anchor: '98%',
            allowBlank: false
        });
        var dffechaentrada = new Ext.form.DateField({
            id: 'iddffechaentrada',
            fieldLabel: 'Fecha ingreso',
            allowBlank: false,
            tabIndex: 9,
            width: 140,
            format: 'd/m/Y'
        });
        var stmilitancia = new Ext.data.SimpleStore({
            fields: [{
                    name: 'militancia'
                }]
        });
        stmilitancia.loadData(datamilitancia);
        var cbmilitancia = new Ext.form.ComboBox({
            fieldLabel: 'Militancia',
            mode: 'local',
            emptyText: 'Seleccione...',
            displayField: 'militancia',
            store: stmilitancia,
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 140,
            tabIndex: 7
        });
        var stocupacion = new Ext.data.SimpleStore({
            fields: [{
                    name: 'ocupacion'
                }],
            sortInfo: {
                field: 'ocupacion',
                direction: "ASC"
            }
        });
        stocupacion.loadData(dataocupacion);
        var cbocupacion = new Ext.form.TextField({
            fieldLabel: 'Ocupaci\xF3n',
            name: 'ocupacion',
            maxLength: 255,
            tabIndex: 5,
            allowBlank: false
        });
        var cbocupacionOLD = new Ext.form.ComboBox({
            fieldLabel: 'Ocupaci\xF3n',
            mode: 'local',
            emptyText: 'Seleccione...',
            displayField: 'ocupacion',
            store: stocupacion,
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 140,
            tabIndex: 5
        });
        var stnivel = new Ext.data.SimpleStore({
            fields: [{
                    name: 'nivel'
                }]
        });
        stnivel.loadData(datanivel);
        var cbnivel = new Ext.form.ComboBox({
            fieldLabel: 'Nivel',
            mode: 'local',
            emptyText: 'Seleccione...',
            displayField: 'nivel',
            store: stnivel,
            typeAhead: true,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true,
            editable: false,
            allowBlank: false,
            width: 140,
            tabIndex: 6
        });
        var pdatostrabajador = new Ext.FormPanel({
            autoHeight: true,
            frame: true,
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            style: 'margin: 0 0 0 10',
                            layout: 'form',
                            items: [tfnombre, tfexpediente, cbnivel]
                        }, {
                            style: 'margin: 0 0 0 20',
                            layout: 'form',
                            items: [tfapellidos, cbocupacion, cbmilitancia]
                        }, {
                            style: 'margin: 0 0 0 20',
                            layout: 'form',
                            items: [tfnoidentidad, dffechaentrada, tftelefono]
                        }, {
                            style: 'margin: 0 0 0 20',
                            id: 'padrefoto',
                            layout: 'form',
                            border: true,
                            frame: true,
                            items: pfoto
                        }]
                }, {
                    style: 'margin: 0 0 0 10',
                    layout: 'form',
                    columnWidth: 1,
                    items: tfdireccion
                }]
        });
        var win = new Ext.Window({
            constrain: true,
            modal: true,
            resizable: false,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            closeAction: 'close',
            layout: 'fit',
            width: 690,
            buttons: [{
                    text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                    handler: function() {
                        return (ind === 'add') ? adicionartrabajador() : modificartrabajador();
                    }
                },
                {
                    text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                    handler: function() {
                        win.close();
                    }
                }]
        });
        win.add(pdatostrabajador);
        win.setTitle((ind === 'add') ? 'Adicionar trabajador' : 'Modificar trabajador');
        win.show();
        tfnombre.focus(false, 100);
        windowopen = true;
        if (ind !== 'add') {
            loadDataModificar();
        }
        win.on('close', function() {
            windowopen = false;
        });
        var strAddTrab = 'El trabajador fue adicionado correctamente.';
        var strModTrab = 'El trabajador fue modificado correctamente.';
        function adicionartrabajador() {
            if (pdatostrabajador.getForm().isValid()) {
                MostrarBarraProgreso('Adicionando trabajador...');
                var params = {
                    nombre: tfnombre.getValue(),
                    apellidos: tfapellidos.getValue(),
                    cidentidad: tfnoidentidad.getValue(),
                    direccion: tfdireccion.getValue(),
                    nivel: cbnivel.getValue(),
                    ocupacion: cbocupacion.getValue(),
                    expediente: tfexpediente.getValue(),
                    militancia: cbmilitancia.getValue(),
                    telefono: tftelefono.getValue(),
                    fechaentrada: dffechaentrada.getRawValue()
                };
                if (document.getElementById('foto').base64img) {
                    params.base64img = document.getElementById('foto').base64img;
                }
                Ext.Ajax.request({
                    url: 'adicionartrabajador',
                    method: 'POST',
                    params: params,
                    callback: function(options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData === true || parseInt(responseData) === 1) {
                            win.close();
                            MensajeInformacion(strAddTrab);
                            sttrabajador.baseParams.cadena = '';
                            sttrabajador.reload({
                                params: {
                                    start: 0,
                                    limit: 20
                                }
                            });
                        } else {
                            MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
                            win.close();
                        }
                    }
                });
            }
        }
        function modificartrabajador() {
            if (pdatostrabajador.getForm().isValid()) {
                MostrarBarraProgreso('Modificando trabajador...');
                var params = {
                    nombre: tfnombre.getValue(),
                    apellidos: tfapellidos.getValue(),
                    cidentidad: tfnoidentidad.getValue(),
                    direccion: tfdireccion.getValue(),
                    nivel: cbnivel.getValue(),
                    ocupacion: cbocupacion.getValue(),
                    expediente: tfexpediente.getValue(),
                    militancia: cbmilitancia.getValue(),
                    telefono: tftelefono.getValue(),
                    fechaentrada: dffechaentrada.getRawValue(),
                    idtrabajador: smtrabajador.getSelected().data.idtrabajador
                };
                if (document.getElementById('foto').base64img) {
                    params.base64img = document.getElementById('foto').base64img;
                }
                Ext.Ajax.request({
                    url: 'modificartrabajador',
                    method: 'POST',
                    params: params,
                    callback: function(options, success, response) {
                        var responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == true || parseInt(responseData) === 1) {
                            win.close();
                            sttrabajador.baseParams.cadena = '';
                            sttrabajador.reload({params: {start: 0, limit: 20}});
                            MensajeInformacion(strModTrab);
                        } else {
                            MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
                            win.close();
                        }
                    }
                });
            }
        }
        function loadDataModificar() {
            tfnombre.setValue(smtrabajador.getSelected().data.nombre);
            tfapellidos.setValue(smtrabajador.getSelected().data.apellidos);
            tfnoidentidad.setValue(smtrabajador.getSelected().data.cidentidad);
            tfdireccion.setValue(smtrabajador.getSelected().data.direccion);
            tfexpediente.setValue(smtrabajador.getSelected().data.expediente);
            cbocupacion.setValue(smtrabajador.getSelected().data.ocupacion);
            cbnivel.setValue(smtrabajador.getSelected().data.nivelescolar);
            cbmilitancia.setValue(smtrabajador.getSelected().data.militancia);
            tftelefono.setValue(smtrabajador.getSelected().data.telefono);
            dffechaentrada.setValue(format_Fecha(smtrabajador.getSelected().data.fechaentrada, '/'));
            dffechaentrada.setValue(format_Fecha(smtrabajador.getSelected().data.fechaentrada, '/'));
            if (smtrabajador.getSelected().data.base64img) {
                document.getElementById('foto').src = "data:image/jpg;base64," + smtrabajador.getSelected().data.base64img;
                document.getElementById('foto').base64img = smtrabajador.getSelected().data.base64img;
            }
        }
    }
    function setImagen(base64Img) {
        document.getElementById('foto').src = 'data:image/jpg;base64,' + base64Img;
        document.getElementById('foto').base64img = base64Img;
        var p = Ext.get('pFoto');
        Ext.get('pFoto').scale(p.getSize().width, p.getSize().heigth);
    }
    function BuscarTrabajador(cadena) {
        sttrabajador.baseParams.cadena = cadena;
        sttrabajador.reload({
            params: {
                start: 0,
                limit: 20
            }
        });
    }
    function EliminarTrabajador() {
        function confirmar(btn) {
            if (btn == 'ok')
                delTrabajador();
        }
        MensajeInterrogacion('Confirmaci\xF3n', '&iquest;Est\xE1 seguro que desea eliminar el trabajador seleccionado?', confirmar)

        function delTrabajador() {
            MostrarBarraProgreso('Eliminando trabajador...');
            Ext.Ajax.request({
                url: 'eliminartrabajador',
                method: 'POST',
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData == true) {
                        MensajeInformacion('El trabajador fue eliminado correctamente.');
                        sttrabajador.baseParams.cadena = '';
                        sttrabajador.reload();
                    } else if (responseData == false) {
                        MensajeError('El trabajador tiene datos asociados y no puede ser eliminado.');
                    } else {
                        MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
                    }
                },
                params: {
                    idtrabajador: smtrabajador.getSelected().data.idtrabajador
                }
            });
        }//fin de la funcion delTrabajador
    }
    function bajaTrabajador() {
        var t = smtrabajador.getSelected().data.nombre + ' ' + smtrabajador.getSelected().data.apellidos;
        function confirmar(btn) {
            if (btn == 'ok')
                showWinBaja();
        }//fin de la funcion confirmacion
        MensajeInterrogacion('Confirmaci\xF3n', '&iquest;Est\xE1 seguro que desea dar baja al trabajador seleccionado?', confirmar);

        var tfNombreBaja, dfFechaBaja, taMotivoBaja, pBaja, winBaja;
        //funcion que manda a eliminar
        function showWinBaja() {
            tfNombreBaja = new Ext.form.TextField({
                fieldLabel: 'Nombre trabajador',
                name: 'tfnombreBaja',
                disabled: true,
                disabledClass: 'disabled-component',
                anchor: '100%'
            });
            // df fecha entrada
            dfFechaBaja = new Ext.form.DateField({
                id: 'dfFechaBaja',
                fieldLabel: 'Fecha baja',
                allowBlank: false,
                tabIndex: 1,
                anchor: '100%',
                format: 'd/m/Y'
            });
            taMotivoBaja = new Ext.form.TextArea({
                fieldLabel: 'Motivo por el cual causa baja',
                name: 'tamotivoBaja',
                maskRe: /^[\xE1\xE9\xED\xF3\xFA\xF1\xC1\xC9\xCD\xD3\xDA\xD1\-\_\(\)0-9A-Za-z ]+$/, //vocales mayus y minusc con tilde, ñ min y may, letras
                tabIndex: 2,
                maxLength: 255,
                anchor: '100%',
                allowBlank: false
            });
            pBaja = new Ext.FormPanel({
                frame: true,
                labelAlign: 'top',
                items: [{
                        layout: 'column',
                        items: [{
                                columnWidth: .7,
                                layout: 'form',
                                items: tfNombreBaja
                            }, {
                                columnWidth: .3,
                                style: 'margin: 0 0 0 20',
                                layout: 'form',
                                items: dfFechaBaja
                            }]
                    }, {
                        layout: 'form',
                        items: taMotivoBaja
                    }]
            });

            winBaja = new Ext.Window({
                constrain: true,
                modal: true,
                resizable: false,
                bodyStyle: 'padding:5px 5px 5px',
                border: false,
                closeAction: 'close',
                layout: 'fit',
                title: 'Baja trabajador',
                width: 515,
                height: 230,
                buttons: [{
                        text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                        handler: function() {
                            darBaja();
                        }
                    },
                    {
                        text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                        handler: function() {
                            winBaja.close();
                        }
                    }]
            });
            winBaja.add(pBaja);
            winBaja.show();
            tfNombreBaja.setValue(t);
            dfFechaBaja.focus(false, 100);
            windowopen = true;

            winBaja.on('close', function() {
                windowopen = false;
            });
        }

        function darBaja() {
            if (pBaja.getForm().isValid()) {
                MostrarBarraProgreso('Tramitando baja...');
                Ext.Ajax.request({
                    url: 'bajatrabajador',
                    method: 'POST',
                    callback: function(options, success, response) {
                        responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        winBaja.close();
                        if (responseData == true) {
                            MensajeInformacion('El trabajador ' + t + ' fue dado de baja.');
                            sttrabajador.baseParams.cadena = '';
                            sttrabajador.reload();
                        } else {
                            MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
                        }
                    },
                    params: {
                        idtrabajador: smtrabajador.getSelected().data.idtrabajador,
                        fechabaja: dfFechaBaja.getRawValue(),
                        motivo: taMotivoBaja.getValue()
                    }
                });
            }
        }//fin de la funcion darBaja
    }
    function mostrarVentanaBaja() {
        var tfbuscarbaja = new Ext.form.SearchField({
            id: 'tfbuscarbaja',
            maxLength: 30,
            maskRe: /^[ a-zA-Z0-9]+$/,
            width: 200,
            fnOnSearch: function() {
                buscarBajas(tfbuscarbaja.getValue());
            },
            fnOnClear: function() {
                this.reset();
                buscarBajas(tfbuscarbaja.getValue());
            }
        });
        function buscarBajas(cadena) {
            stBajas.baseParams.cadena = cadena;
            stBajas.reload({
                params: {
                    start: 0,
                    limit: 20
                }
            });
        }
        var stBajas = new Ext.data.Store({
            url: 'cargarBajas',
            reader: new Ext.data.JsonReader({
                root: 'campos',
                totalProperty: 'totalRecords'
            }, [
                {name: 'idtrabajador'},
                {name: 'nombre'},
                {name: 'apellidos'},
                {name: 'cidentidad'},
                {name: 'direccion'},
                {name: 'nivelescolar'},
                {name: 'ocupacion'},
                {name: 'expediente'},
                {name: 'militancia'},
                {name: 'telefono'},
                {name: 'fechaentrada'},
                {name: 'baja'},
                {name: 'base64img', type: 'string'},
                {name: 'estadia'},
                {name: 'fechabaja'},
                {name: 'motivo'}
            ]),
            listeners: {
                beforeload: function(store, records, options)
                {
                    loadMask('Cargando..');
                },
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
        stBajas.load({
            params: {
                start: 0,
                limit: 20
            }
        });
        function generateTpl() {
            var src = sin_foto();
            if ("{base64img}") {
                src = 'data:image/jpg;base64,{base64img}';
            }
            return new Ext.Template(
                    '<table width="100%" border="0" cellspacing="0" cellpadding="1" style="text-align: center; font-size: 11px">' +
                    '<tr>' +
                    '<td>' +
                    '<table width="100%" border="0" cellspacing="0" cellpadding="4" style="background-color: #DFE8F6;">' +
                    '<tr>' + '<td width="10%" style="text-align: center; vertical-align: middle;">' +
                    '<span><img src="' + src + '" width="80" height="80" style="border: 1px solid;"></span>' +
                    '</td>' +
                    '<td style="vertical-align:top; font: normal 13px arial, tahoma, helvetica, sans-serif !important;">' +
                    '<span style="padding-left: 10px; padding-right: 5px;"><b>C&oacute;digo:</b> {idtrabajador}</span>' +
                    '<br><span style="padding-left: 10px; padding-right: 5px;"><b>Direcci\xF3n:</b> {direccion}</span>' +
                    '<br><span style="padding-left: 10px; padding-right: 5px;"><b>Tiempo de servicio:</b> {estadia} d&iacute;as</span>' +
                    '<br><br><span style="padding-left: 10px; padding-right: 5px;"><b>Fecha baja:</b> {fechabaja}</span>' +
                    '<br><span style="padding-left: 10px; padding-right: 5px;"><b>Motivo de la  baja:</b> {motivo}</span>' +
                    '</td>' + '</tr>' + '</table>' + '</td>' + '</tr></table></div>'
                    );
        }
        var expander = new Ext.grid.RowExpander({
            tpl: generateTpl()
        });

        var gpBajas = new Ext.grid.GridPanel({
            plugins: expander,
            collapsible: true,
            animCollapse: false,
            store: stBajas,
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true
            }),
            cm: new Ext.grid.ColumnModel([
                expander,
                {id: 'idtrabajador', header: 'C&oacute;digo', width: 60, dataIndex: 'idtrabajador', hidden: true, hideable: false},
                {id: 'expediente', header: "No. expediente", tooltip: 'No. expediente laboral', width: 90, sortable: true, dataIndex: 'expediente'},
                {id: 'cidentidad', header: 'C. identidad', tooltip: 'No. Carn&eacute; de identidad', width: 80, sortable: true, dataIndex: 'cidentidad'},
                {id: 'nombre', header: 'Nombre', width: 100, sortable: true, dataIndex: 'nombre'},
                {id: 'apellidos', header: 'Apellidos', width: 130, sortable: true, dataIndex: 'apellidos'},
                {id: 'ocupacion', header: "Ocupaci\xF3n", tooltip: 'Cargo u ocupaci&oacute;n', width: 100, sortable: true, dataIndex: 'ocupacion'},
                {id: 'nivelescolar', header: "Nivel escolar", tooltip: 'Nivel de escolaridad', hidden: true, sortable: true, width: 70, dataIndex: 'nivelescolar'},
                {id: 'fechaentrada', header: "Fecha ingreso", width: 80, sortable: true, dataIndex: 'fechaentrada', renderer: format_Fecha},
                {id: 'militancia', header: "Militancia", width: 60, sortable: true, hidden: true, dataIndex: 'militancia'},
                {id: 'telefono', header: "Tel&eacute;fono ", width: 60, sortable: true, hidden: true, dataIndex: 'telefono'},
                {id: 'direccion', header: 'Direcci\xF3n', width: 75, sortable: true, dataIndex: 'direccion', hidden: true}

            ]),
            viewConfig: {
                forceFit: true
            },
            tbar: ['->', tfbuscarbaja, new Ext.Toolbar.TextItem(' ')],
            bbar: new Ext.Feet.PagingToolbar({
                pageSize: 20,
                store: stBajas,
                displayInfo: true,
                displayMsg: 'Resultados de {0} - {1} de {2}',
                emptyMsg: "No hay resultados para mostrar."
            })
        });
        var winbaja = new Ext.Window({
            constrain: true,
            modal: true,
            maximizable: true,
            id: 'winbaja',
            frame: true,
            border: false,
            resizable: false,
            closeAction: 'close',
            layout: 'fit',
            title: 'Trabajadores que causaron baja',
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
        winbaja.add(gpBajas);
        winbaja.show();
        winbaja.maximize();
        winbaja.doLayout();
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
                } else {
                    MensajeError('Error al procesar los datos.<br>P\xF3ngase en contacto con el administrador del sistema.');
                }
                lMask.hide();
            }
        });
    }
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
                '<br><br><span style="padding-left: 10px; padding-right: 5px;"><b>CI:</b> ' + dni + '</span>' +
                '<br><br><span style="padding-left: 10px; padding-right: 5px;"><b>Ocupaci&oacute;n:</b> ' + ocupation + '</span>' +
                '</td>' + '</tr>' + '</table>' + '</td>' + '</tr></table></div>';
        return templateTooltip;
    }
});