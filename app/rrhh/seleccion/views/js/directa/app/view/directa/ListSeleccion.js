Ext.define('Directa.view.directa.ListSeleccion', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_seleccion',
    store: 'Selecciondirecta',
    readOnly: true,
    title: 'Selecciones realizadas',
    iconCls: 'fa fa-list bluedark-button',
    columnLines: true,
    initComponent: function() {
        var me = this;
        me.id = 'list_seleccion';
        me.selModel = Ext.create('Ext.selection.RowModel');

        me.bbar = Ext.create('Ext.toolbar.Paging', {
            displayInfo: true,
            store: me.store,
            plugins: new Ext.ux.ProgressBarPager()
        });

        me.tbar = [
            '->',
            {
                xtype: 'searchfield',
                store: 'Selecciondirecta',
                maxLength: 50,
                vtype: 'alphanum',
                fnOnSearch: function() {
                    var sf = this, store = Ext.data.StoreManager.lookup('Selecciondirecta');
                    store.clearFilter(true);
                    store.load({params: {criterio: sf.getValue()}});
                },
                fnOnClear: function() {
                    var sf = this, store = Ext.data.StoreManager.lookup('Selecciondirecta');
                    store.load({params: {criterio: sf.getValue()}});
                }
            }
        ];

        me.columns = [
            {
                text: 'idselecciondirecta',
                dataIndex: 'idselecciondirecta',
                hidden: true
            }, {
                text: 'Fecha',
                dataIndex: 'fecha',
                width: 100
            }, {
                text: 'Usuario',
                dataIndex: 'usuario',
                width: 120
            }, {
                flex: 1,
                text: 'Cargo',
                dataIndex: 'cargo',
                width: 160
            }, {
                flex: 1,
                text: 'Empleado',
                dataIndex: 'persona',
                width: 100
            }, {
                flex: 1,
                text: 'Observaci\xF3n',
                dataIndex: 'observacion',
                width: 100
            }];

        this.callParent(arguments);
    },
    showSexo: function(val) {
        if (val === 0) {
            return '<center><i class="fa fa-venus red-button"></i></center>';
        } else {
            return '<center><i class="fa fa-mars blue-button"></i></center>';
        }
    },
    showEstadoCivil: function(val) {
        if (val === 0) {
            return 'Soltero';
        } else if (val === 1) {
            return 'Casado';
        } else {
            return 'Viudo';
        }
    },
    showStatus: function(val) {
        if (val === 0) {
            return '<span class="label label-primary">Bolsa</span>';
        } else if (val === 1) {
            return '<span class="label label-success">Contratado</span>';
        } else if (val === 2) {
            return '<span class="label label-warning">Reserva</span>';
        } else if (val === 3) {
            return '<span class="label label-danger">Reserva</span>';
        } else {
            return '<span class="label label-default">Selecci\xF3n</span>';
        }
    }
});