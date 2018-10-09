Ext.ImportPedido.UI = Ext.extend(Ext.Component, {
    constructor: function(arg) {
        Ext.apply(this, arg);
        this.init();
        return Ext.ImportPedido.UI.superclass.constructor.call(this);
    },
    init: function() {
        var scope = this;
        scope.lMask = function(body, msg) {
            return new Ext.LoadMask(body, {
                msg: msg
            });
        };
        scope.initWindowPedido = function() {
            this.btnCerrar = new Ext.Button({
                text: '<i class="fa fa-times-circle red-button"></i> <b>Cancelar</b>',
                scope: this
            });
            this.btnAceptar = new Ext.Button({
                text: '<i class="fa fa-check-circle green-button"></i> <b>Aceptar</b>',
                scope: this
            });
            this.gpPedidos = new Ext.grid.GridPanel({
                id: 'gpPedidos',
                region: 'center',
                layout: 'fit',
                autoScroll: true,
                frame: false,
                border: false,
                sm: this.smPedidos = new Ext.grid.RowSelectionModel({
                    singleSelect: true
                }),
                columns: [{
                        header: 'C&oacute;digo',
                        width: 120,
                        dataIndex: 'codigoproducto',
                        sortable: true
                    }, {
                        header: 'Cant. total',
                        width: 100,
                        dataIndex: 'cantidad',
                        sortable: true,
                        align: 'center'
                    }, {
                        header: 'A&ntilde;o',
                        width: 100,
                        dataIndex: 'anno',
                        align: 'center'
                    }, {
                        header: 'E',
                        width: 40,
                        dataIndex: 'ene'
                    }, {
                        header: 'F',
                        width: 40,
                        dataIndex: 'feb'
                    }, {
                        header: 'M',
                        width: 40,
                        dataIndex: 'mar'
                    }, {
                        header: 'A',
                        width: 40,
                        dataIndex: 'abr'
                    }, {
                        header: 'M',
                        width: 40,
                        dataIndex: 'may'
                    }, {
                        header: 'J',
                        width: 40,
                        dataIndex: 'jun'
                    }, {
                        header: 'J',
                        width: 40,
                        dataIndex: 'jul'
                    }, {
                        header: 'A',
                        width: 40,
                        dataIndex: 'ago'
                    }, {
                        header: 'S',
                        width: 40,
                        dataIndex: 'sep'
                    }, {
                        header: 'O',
                        width: 40,
                        dataIndex: 'oct'
                    }, {
                        header: 'N',
                        width: 40,
                        dataIndex: 'nov'
                    }, {
                        header: 'D',
                        width: 40,
                        dataIndex: 'dic'
                    }],
                store: this.stPedidos = new Ext.data.SimpleStore({
                    remoteSort: false,
                    fields: [{
                            name: 'cantidad', type: 'float'
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
                        }],
                    data: []
                })
            });

            this.wPedido = new Ext.Window({
                id: 'wPedido',
                border: false,
                title: 'Importar datos de los pedidos',
                monitorResize: true,
                closable: false,
                modal: true,
                resizable: false,
                layout: 'fit',
                constrain: true,
                items: scope.gpPedidos,
                buttons: [this.btnAceptar, this.btnCerrar]
            });
        };
        scope.initWindowPedido();
    }
});