Ext.define('Ejercicio.view.PeriodoGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.periodo_grid',
    store: 'Ejercicio.store.Periodo',
    initComponent: function() {
        var me = this;
        me.title = futureLang.lbTitlePeriodos;
        me.selModel = Ext.create('Ext.selection.RowModel');

        me.columns = [
            {
                header: futureLang.lbNombre,
                dataIndex: 'periodo',
                flex: 1,
                width: 100
            },
            {
                header: futureLang.lbFechainicio,
                flex: 1,
                width: 120,
                dataIndex: 'inicio',
                align: 'right',
                renderer: Ext.util.Format.dateRenderer('d/m/Y')
            }, {
                header: futureLang.lbFechafin,
                flex: 1,
                width: 120,
                dataIndex: 'fin',
                align: 'right',
                renderer: Ext.util.Format.dateRenderer('d/m/Y')
            }
        ];

        this.callParent(arguments);
    }
});