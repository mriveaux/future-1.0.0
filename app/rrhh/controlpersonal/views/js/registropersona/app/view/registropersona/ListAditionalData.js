Ext.define('Registropersona.view.registropersona.ListAditionalData', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_aditional_data',
    store: 'AditionalData',
    title: 'Listado de datos adicionales',
    readOnly: true,
    initComponent: function() {
        var me = this;
        var groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: '{name} ({rows.length})',
            hideGroupedHeader: true
        });
        me.selModel = Ext.create('Ext.selection.RowModel');

        me.columns = [
            {
                flex: 1,
                text: 'Agrupador',
                dataIndex: 'agrupador'
            }, {
                flex: 1,
                text: 'Clasificaci&oacute;n',
                dataIndex: 'clasificacion'
            }];

        me.features = [groupingFeature];
        this.callParent(arguments);

    }
});