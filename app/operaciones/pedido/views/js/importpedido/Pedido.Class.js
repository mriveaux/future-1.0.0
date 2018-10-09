Ext.ns('Ext.ImportPedido');
Ext.ImportPedido = {
    Pedido: Ext.data.Record.create([{
            name: 'cantidad'
        }, {
            name: 'entidad'//quitar
        }, {
            name: 'anno'
        }, {
            name: 'codigoproducto'
        }, {
            name: 'ene'
        }, {
            name: 'feb'
        }, {
            name: 'mar'
        }, {
            name: 'abr'
        }, {
            name: 'may'
        }, {
            name: 'jun'
        }, {
            name: 'jul'
        }, {
            name: 'ago'
        }, {
            name: 'sep'
        }, {
            name: 'oct'
        }, {
            name: 'nov'
        }, {
            name: 'dic'
        }]),
    init: function(agPedidos) {
        Ext.QuickTips.init();
        var scope = this;
        var MyObservable = function() {
            this.addEvents({
                'saved': true,
                'close': true
            });
        };
        Ext.extend(MyObservable, Ext.util.Observable);
        scope.events = new MyObservable();
        if (agPedidos.length > 0) {
            if (!scope.UI.wPedido)
                scope.UI = new Ext.ImportPedido.UI();
            scope.UI.wPedido.show(Ext.getBody(), function() {
                this.maximize();
                this.doLayout();
                if (Ext.Msg.getDialog())
                    Ext.Msg.hide();
            });
            scope.UI.wPedido.doLayout();
            generarPedidos();
        } else {
            MensajeError('Ocurri&oacute; un error durante la carga de los pedidos. Por favor, contacte al administrador del sistema.');
        }
        function generarPedidos() {
            for (var i = 0; i < agPedidos.length; i++) {
                var objPedido = new scope.Pedido({
                    cantidad: agPedidos[i].cantidad,
                    entidad: agPedidos[i].entidad,//quitar
                    anno: agPedidos[i].anno,
                    codigoproducto: agPedidos[i].codigo,
                    ene: agPedidos[i].ene,
                    feb: agPedidos[i].feb,
                    mar: agPedidos[i].mar,
                    abr: agPedidos[i].abr,
                    may: agPedidos[i].may,
                    jun: agPedidos[i].jun,
                    jul: agPedidos[i].jul,
                    ago: agPedidos[i].ago,
                    sep: agPedidos[i].sep,
                    oct: agPedidos[i].oct,
                    nov: agPedidos[i].nov,
                    dic: agPedidos[i].dic
                });
                agPedidos[i] = objPedido;
            }
            scope.UI.stPedidos.add(agPedidos);
        }
        ;
        this.fCerrarPedido = function() {
            scope.events.fireEvent('close', this);
            scope.UI.wPedido.close();
        };
        this.fGuardarPedidos = function() {
            MostrarBarraProgreso('Importando pedidos...');
            Ext.Ajax.request({
                method: "POST",
                url: 'importarpedidos',
                params: {
                    pedidos: Ext.encode(getListaPedidos())
                },
                callback: function(options, success, response) {
                    responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData) {
                        MensajeInformacion('Los pedidos fueron importados correctamente. Por favor, recargue la funcionalidad para mostrar los cambios.');
                        scope.events.fireEvent('saved', this);
                        scope.UI.wPedido.close();
                    }
                    else {
                        MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
                    }
                }
            });
        };
        function getListaPedidos() {
            var listPedidos = new Array();
            for (var i = 0; i < agPedidos.length; i++) {
                listPedidos.push(agPedidos[i].data);
            }
            return listPedidos;
        }
        this.UI.btnAceptar.on('click', function() {
            scope.fGuardarPedidos();
        });
        this.UI.btnCerrar.on('click', function() {
            scope.fCerrarPedido();
        });
        return this;
    },
    onSaved: function(fn) {
        this.events.on('saved', fn);
        return this;
    },
    onClose: function(fn) {
        this.events.on('close', fn);
        return this;
    }
};