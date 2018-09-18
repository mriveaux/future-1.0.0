Ext.define('Seleccion.view.seleccion.ListProceso', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_proceso',
    store: 'Proceso',
    title: 'Procesos de selecci&oacute;n',
    autoScroll: true,
    initComponent: function() {
        var me = this;
        me.id = 'list_proceso';
        me.selModel = Ext.create('Ext.selection.RowModel');

        me.columns = [
            {
                flex: 1,
                text: 'Nombre del proceso',
                dataIndex: 'nombre'
            }, {
                text: 'Fecha fin',
                width: 100,
                dataIndex: 'fechafin'
            }];

        this.callParent(arguments);
    }
});