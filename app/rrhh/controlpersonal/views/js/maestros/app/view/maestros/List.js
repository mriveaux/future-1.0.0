Ext.define('Maestros.view.maestros.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_maestros',
    store: 'Maestros',
    readOnly: true,
    initComponent: function() {
        var me = this;
        me.title = 'Listado de maestros';
        me.selModel = Ext.create('Ext.selection.RowModel');
        me.columns = [
            {
                flex: 1,
                text: 'Maestro',
                dataIndex: 'maestro',
                width: 110
            }];

        this.callParent(arguments);
    }
});