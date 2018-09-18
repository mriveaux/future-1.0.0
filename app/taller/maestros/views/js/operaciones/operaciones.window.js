Ext.ns('Maestros.Operaciones');
Maestros.Operaciones.Window = Ext.extend(Ext.Window, {
    constructor: function(params) {
        this.modal = true;
        this.labelAlign = 'top';
        this.frame = true;
        this.resizable = false;
        this.bodyStyle = 'padding:5px 5px 5px';
        this.border = false;
        this.closeAction = 'close';
        this.layout = 'fit';
        this.width = 400;
        this.height = 240;
        this.objOperacion = params;
        this.cargarInterfaz();
        this.initMyEvents();
        this.initFunctions();
        if (this.objOperacion.idoperacion)
            this.loadDataForm(params);
        this.addEvents('afterSave');
        Maestros.Operaciones.Grid.superclass.constructor.call(this, params);
    },
    cargarInterfaz: function() {
        var me = this;
        this.tfCodigo = new Ext.form.TextField({
            fieldLabel: 'C&oacute;digo',
            name: 'tfcodigo',
            maskRe: /^[a-zA-Z0-9\-\.\,\/\(\)\;]+$/,
            allowBlank: false,
            width: 160
        });
        this.tfOperacion = new Ext.form.TextField({
            fieldLabel: 'Operaci&oacute;n',
            name: 'tfoperacion',
            maskRe: /^[ a-zA-Z0-9\-\.\,\/\(\)]+$/,
            allowBlank: false,
            width: 355
        });
        this.stActividad = new Ext.data.Store({
            url: 'getactividades',
            reader: new Ext.data.JsonReader({root: 'data'}, [{name: 'idactividad'}, {name: 'nombre'}])
        });
        this.cbActividad = new Ext.form.ComboBox({
            fieldLabel: 'Actividad',
            id: 'idactividad',
            valueField: 'idactividad',
            displayField: 'nombre',
            store: me.stActividad,
            emptyText: 'Seleccione...',
            mode: 'local',
            triggerAction: 'all',
            allowBlank: false,
            forceSelection: true,
            selectOnFocus: true,
            typeAhead: true,
            resizable: true,
            width: 185
        });
        this.nfCosto = new Ext.form.NumberField({
            fieldLabel: 'Costo',
            name: 'nfcosto',
            allowNegative: false,
            allowBlank: false,
            width: 80
        });
        this.nfTarifa = new Ext.form.NumberField({
            fieldLabel: 'Tarifa',
            name: 'nftarifa',
            allowNegative: false,
            allowBlank: false,
            width: 80
        });
        this.categorias = [
            [['0'], ['EST\xC1NDAR']],
            [['1'], ['LIGERO']],
            [['2'], ['MEDIO']],
            [['3'], ['PESADO']],
            [['4'], ['MOTO']]
        ];
        this.cbCategoria = new Ext.form.ComboBox({
            store: new Ext.data.SimpleStore({
                fields: [{name: 'id'}, {name: 'descripcion'}]
            }),
            fieldLabel: 'Categor&iacute;a',
            emptyText: 'Seleccione...',
            valueField: 'id',
            displayField: 'descripcion',
            allowBlank: false,
            typeAhead: true,
            mode: 'local',
            width: 190,
            forceSelection: true,
            triggerAction: 'all',
            selectOnFocus: true
        });
        this.fpOperaciones = new Ext.FormPanel({
            frame: true,
            id: 'fpaddoperaciones',
            labelAlign: 'top',
            items: [{
                    layout: 'column',
                    items: [{
                            style: 'margin:0 0 0 5',
                            layout: 'form',
                            items: [me.cbCategoria]
                        }, {
                            style: 'margin:0 0 0 5',
                            layout: 'form',
                            items: [me.tfCodigo]
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            style: 'margin:0 0 0 5',
                            layout: 'form',
                            items: [me.tfOperacion]
                        }]
                }, {
                    layout: 'column',
                    items: [{
                            style: 'margin:0 0 0 5',
                            layout: 'form',
                            items: [me.cbActividad]
                        }, {
                            style: 'margin:0 0 0 5',
                            layout: 'form',
                            items: [me.nfCosto]
                        }, {
                            style: 'margin:0 0 0 5',
                            layout: 'form',
                            items: [me.nfTarifa]
                        }]
                }]
        });
        this.items = me.fpOperaciones;
        this.buttons = [me.btnAplicar = new Ext.Button({
                text: '<i class="fa fa-hand-o-right blue-button"></i> <b>Aplicar</b>'
            }), me.btnAceptar = new Ext.Button({
                text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>'
            }),
            me.btnCancelar = new Ext.Button({
                text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>'
            })];
    },
    initMyEvents: function() {
        var me = this;
        me.cbCategoria.store.loadData(me.categorias);
        me.cbActividad.store.load({callback: function() {
                if (me.objOperacion.idactividad)
                    me.cbActividad.setValue(me.objOperacion.idactividad);
            }});
        if (me.objOperacion.idoperacion)
            me.btnAplicar.setVisible(false);

    },
    initFunctions: function() {
        var me = this;
        me.btnAplicar.on({
            click: function() {
                me.guardarOperacion(true);
            }});
        me.btnAceptar.on({
            click: function() {
                me.guardarOperacion();
            }});
        me.btnCancelar.on({
            click: function() {
                me.close();
            }});
        this.guardarOperacion = function(option) {
            if (me.fpOperaciones.getForm().isValid()) {
                var msgProgress = (!me.objOperacion.idoperacion) ? 'Adicionando operaci&oacute;n...' : 'Modificando operaci&oacute;n...';
                MostrarBarraProgreso(msgProgress);
                var msgSuccess = (!me.objOperacion.idoperacion) ? 'La operaci&oacute;n fue adicionada correctamente.' : 'La operaci&oacute;n fue modificada correctamente.';
                var msgError = (!me.objOperacion.idoperacion) ? 'La operaci&oacute;n que intenta adicionar ya existe.<br>Verifique el c&oacute;digo, nombre y la categor&iacute;a de la operaci&oacute;n que desea adicionar.' : 'La operaci&oacute;n que intenta modificar ya existe.<br>Verifique el c&oacute;digo, nombre y la categor&iacute;a de la operaci&oacute;n que desea modificar.';
                Ext.Ajax.request({
                    url: (!me.objOperacion.idoperacion) ? 'addoperacion' : 'modoperacion',
                    method: 'POST',
                    callback: function(options, success, response) {
                        responseData = Ext.decode(response.responseText);
                        Ext.MessageBox.hide();
                        if (responseData == 1) {
                            me.fpOperaciones.getForm().reset();
                            MensajeInformacion(msgSuccess);
                            if (!option)
                                me.fireEvent('afterSave', option);
                        }
                        else if (responseData == 2)
                            MensajeError(msgError);
                        else
                            MensajeError('No fue posible realizar la acci&oacute;n.<br>P&oacute;ngase en contacto con el administrador del sistema para tramitar el problema.');
                    },
                    params: {
                        idoperacion: me.objOperacion.idoperacion,
                        codigo: me.tfCodigo.getValue(),
                        operacion: me.tfOperacion.getValue(),
                        idactividad: me.cbActividad.getValue(),
                        costo: me.nfCosto.getValue(),
                        tarifa: me.nfTarifa.getValue(),
                        categoria: me.cbCategoria.getValue()
                    }
                });
            }
        };

    },
    loadDataForm: function(objParams) {
        var me = this;
        me.tfCodigo.setValue(objParams.codigo);
        me.tfOperacion.setValue(objParams.operacion);
        me.nfCosto.setValue(objParams.tnorma);
        me.nfTarifa.setValue(objParams.tarifa);
        me.cbCategoria.setValue(objParams.categoria);
        me.cbActividad.setValue(objParams.idactividad);
    }
});