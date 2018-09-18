/* global Ext */
Ext.define('Gruporoles.view.Listroles', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.roleslist', title: 'Roles', selType: 'rowmodel', columnLines: true,
    initComponent: function() {
        var grid = this;
        Ext.apply(grid, {
            id: 'gpListRoles', store: 'Roles', selType: 'checkboxmodel', disabled: true,
            dockedItems: [{xtype: 'toolbar',
                    items: [
                        {action: 'save', itemId: 'btnSave', id: 'btnSave', text: futureLang.lbGuardar, tooltip: futureLang.lbttGuardar, iconCls: 'fa fa-save bluedark-button', hidden: true},
                        {action: 'refresh', itemId: 'btnRefresh', id: 'btnRefresh', text: futureLang.lbRecargar, tooltip: futureLang.lbttRecargar, iconCls: 'fa fa-refresh bluedark-button', hidden: true},
                        '->', {
                            xtype: 'searchfield', id: 'sfRoles', store: 'Roles',
                            fnOnSearch: function() {
                                var store = Ext.data.StoreManager.lookup('Roles');
                                store.clearFilter(true);
                                store.load({params: {criterio: Ext.getCmp('sfRoles').getValue()}});
                            },
                            fnOnClear: function() {
                                var store = Ext.data.StoreManager.lookup('Roles');
                                store.load({params: {criterio: Ext.getCmp('sfRoles').getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {header: futureLang.lbNombre, dataIndex: 'nombre', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbDescripcion, dataIndex: 'descripcion', flex: 1, field: {xtype: 'textfield'}, sortable: true},
                {header: futureLang.lbEstado, dataIndex: 'asociado', align: 'center', width: 130, sortable: true, renderer: this.showStatus},
                {name: 'idroles', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false}
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
