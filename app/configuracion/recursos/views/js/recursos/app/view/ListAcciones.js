/* global Ext */
Ext.define('Recursos.view.ListAcciones', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_acciones', selType: 'rowmodel', columnLines: true, disabled: true,
    initComponent: function() {
        var grid = this;
        Ext.apply(grid, {
            id: 'gpListAcciones', store: 'Acciones', selType: 'checkboxmodel',
            dockedItems: [{xtype: 'toolbar',
                    items: [
                        {action: 'save', itemId: 'btnSaveAcciones', id: 'btnSaveAcciones', text: futureLang.lbGuardar, tooltip: futureLang.lbTooltipGuardar, iconCls: 'fa fa-save bluedark-button', hidden: true},
                        {action: 'refresh', itemId: 'btnRefreshAcciones', id: 'btnRefreshAcciones', text: futureLang.lbRecargar, tooltip: futureLang.lbTooltipRecargar, iconCls: 'fa fa-refresh bluedark-button', hidden: true}
                    ]}],
            columns: [
                {header: futureLang.lbNombre, dataIndex: 'nombre', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbEstado, dataIndex: 'asociado', align: 'center', width: 130, sortable: true, renderer: this.showStatus},
                {name: 'idrecurso', dataIndex: 'idrecurso', hideable: false, hidden: true, sortable: false},
                {name: 'idaccion', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false}
            ]
        });
        this.callParent(arguments);
    },
    showStatus: function(val) {
        if (val == true) {
            return '<span class="label label-success">' + futureLang.lbAsociado + '</span>';
        }
    }
});
