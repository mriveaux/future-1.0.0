/* global Ext, futureLang */
Ext.define('ClientesProveedores.view.GridCuentaBancaria', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.grid_cuentabancaria',
    initComponent: function () {
        var me = this;
        //me.selType = 'rowmodel';
        //me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
        //    clicksToMoveEditor: 1,
        //    clicksToEdit: 2,
        //    pluginId: 'myRowEditor'
        //});
        me.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            pluginId: 'cellplugin',
            clicksToEdit: 1
        });
        me.store = Ext.create('Ext.data.Store', {
            fields: ['idcuentacliente', 'numerocuenta', 'banco', 'predeterminada']
        });
        me.tbar = [{
                text: futureLang.lbAdd,
                tooltip: futureLang.lbAdd3,
                iconCls: 'fa fa-plus bluedark-button',
                action: 'adicionar'
            },{
                text: futureLang.lbDel,
                tooltip: futureLang.lbDel3,
                iconCls: 'fa fa-trash bluedark-button',
                action: 'eliminar'
            }];
        me.columns = [{
                header: futureLang.lbCtaBancaria,
                dataIndex: 'numerocuenta',
                editor: {
                    allowBlank: false,
                    emptyText: futureLang.lbNoCuenta
                },
                flex: 1
            }, {
                header: futureLang.lbBanco,
                dataIndex: 'banco',
                editor: {
                    allowBlank: false,
                    emptyText: futureLang.lbNombreBanco
                },
                flex: 1
            }, {
                xtype: 'checkcolumn',
                header: futureLang.lbPredeterminada,
                dataIndex: 'predeterminada',
                width: 110,
                editor: {
                    xtype: 'checkbox',
                    cls: 'x-grid-checkheader-editor'
                },
                stopSelection: false
            }, {
                xtype: 'actioncolumn',
                width:30,
                sortable: false,
                items: [{
                    iconCls: 'fa fa-trash bluedark-button',
                    tooltip: futureLang.lbBtnEliminar,
                    handler: function (grid, rowIndex) {
                        grid.getStore().removeAt(rowIndex);
                    }
                }]
            }];
        me.plugins = [me.cellEditing];
        this.callParent(arguments);
    }
});