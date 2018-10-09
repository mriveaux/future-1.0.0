/* global Ext, futureLang */
Ext.define('Ura.view.CentroatencionList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.centroatencionlist',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.groupingFeature = Ext.create('Ext.grid.feature.Grouping', {
            groupHeaderTpl: '{name} ({rows.length})',
            hideGroupedHeader: true
        });
        Ext.apply(grid, {
            title: futureLang.lbCentroatencion,
            region: 'west',
            store: 'Centroatencion',
            features: [this.groupingFeature],
            columns: [
                {xtype: 'rownumberer'},
                {header: futureLang.lbDT, dataIndex: 'padre'},
                {width: 150, header: futureLang.lbCentroatencion, dataIndex: 'abreviatura', flex: 1, sortable: true},
                {name: 'identidad', type: 'int', hideable: false, hidden: true, sortable: false}
            ]
        });
        this.callParent(arguments);
    }
});