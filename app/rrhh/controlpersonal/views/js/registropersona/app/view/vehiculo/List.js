Ext.define('Registropersona.view.vehiculo.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_vehiculo',
    title: 'Veh&iacute;culos',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function () {
        var grid = this;
        this.reVehiculo = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                edit: function (editor, e) {
                    e.record.data.idpersona = grid.getStore().proxy.extraParams.idpersona;
                    grid.getStore().sync();
                }, cancelEdit: function (rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                }
            }
        });
        Ext.apply(grid, {
            store: Ext.data.StoreManager.lookup('Vehiculo'),
            plugins: [this.reVehiculo],
            dockedItems: [{
                xtype: 'toolbar',
                items: [{
                    action: 'add',
                    itemId: 'btnAdd',
                    text: 'Adicionar',
                    iconCls: 'fa fa-plus bluedark-button'
                }, {
                    action: 'mod',
                    itemId: 'btnMod',
                    text: 'Modificar',
                    iconCls: 'fa fa-edit bluedark-button',
                    disabled: true
                }, {
                    action: 'del',
                    itemId: 'btnDel',
                    text: 'Eliminar',
                    iconCls: 'fa fa-trash bluedark-button',
                    disabled: true
                }, '->', {
                    xtype: 'searchfield',
                    store: Ext.data.StoreManager.lookup('Vehiculo'),
                    fnOnSearch: function () {
                        var sf = this, store = Ext.data.StoreManager.lookup('Vehiculo');
                        store.clearFilter(true);
                        store.load({params: {criterio: sf.getValue()}});
                    },
                    fnOnClear: function () {
                        var sf = this, store = Ext.data.StoreManager.lookup('Vehiculo');
                        store.load({params: {criterio: sf.getValue()}});
                    }
                }
                ]
            }],
            columns: [
                {
                    header: 'id',
                    dataIndex: 'id',
                    type: 'int',
                    useNull: true,
                    hideable: false,
                    hidden: true,
                    sortable: false
                },
                {
                    header: 'idvehiculo',
                    dataIndex: 'idvehiculo',
                    type: 'int',
                    useNull: true,
                    hideable: false,
                    hidden: true,
                    sortable: false
                },
                {
                    flex: 1, header: 'N.\xBA veh&iacute;culo', dataIndex: 'nomatricula', width: 200, sortable: true,
                    editor: {
                        xtype: 'combobox',
                        flex: 1,
                        maxLength: 255,
                        margins: '0 5 0 0',
                        allowBlank: false,
                        typeAhead: true,
                        queryMode: 'local',
                        store: Ext.data.StoreManager.lookup('RegVehiculo'),
                        name:'idvehiculo',
                        hiddenName:'idvehiculo',
                        displayField: 'nomatricula',
                        valueField: 'idvehiculo',
                    }
                },
                {
                    flex: 1,
                    header: 'Fecha expedido',
                    dataIndex: 'fechaexpedido',
                    width: 200,
                    sortable: true,
                    renderer: format_Fecha,
                    editor: {xtype: 'datefield', format: 'd/m/Y'}
                },
                {
                    flex: 1,
                    header: 'Fecha vencimiento',
                    dataIndex: 'fechavencimiento',
                    width: 200,
                    sortable: true,
                    renderer: format_Fecha,
                    editor: {xtype: 'datefield', format: 'd/m/Y'}
                }
            ],
            bbar: {
                xtype: 'feetpagingtoolbar',
                pageSize: 20,
                store: Ext.data.StoreManager.lookup('Vehiculo'),
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    }
});