Ext.define('Registropersona.view.contacto.List', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.list_contacto',
    title: 'Contactos',
    selType: 'rowmodel',
    columnLines: true,
    initComponent: function() {
        var grid = this;
        this.reContacto = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2,
            listeners: {
                edit: function(editor, e) {
                    e.record.data.idpersona = grid.getStore().proxy.extraParams.idpersona;
                    grid.getStore().sync();
                }, cancelEdit: function(rowEditing, context) {
                    if (context.record.phantom) {
                        grid.getStore().remove(context.record);
                    }
                }
            }
        });
        Ext.apply(grid, {
            store: 'Contacto',
            plugins: [this.reContacto],
            dockedItems: [{xtype: 'toolbar',
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
                            store: 'Contacto',
                            fnOnSearch: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Contacto');
                                store.clearFilter(true);
                                store.load({params: {criterio: sf.getValue()}});
                            },
                            fnOnClear: function() {
                                var sf = this, store = Ext.data.StoreManager.lookup('Contacto');
                                store.load({params: {criterio: sf.getValue()}});
                            }
                        }
                    ]}],
            columns: [
                {name: 'idcontacto', dataIndex: 'idcontacto', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false},
                {flex: 1, header: 'Tipo de contacto', dataIndex: 'tipocontacto', width: 200, sortable: true,
                    field: {xtype: 'combobox', name: 'tipocontacto', displayField: 'nombre',
                        valueField: 'idtipocontacto', store: 'Tipocontacto', queryMode: 'local'}},
                {flex: 1, header: 'Medio de contacto', dataIndex: 'mediocontacto', width: 200, sortable: true,
                    field: {xtype: 'combobox', name: 'mediocontacto', displayField: 'nombre',
                        valueField: 'idmediocontacto', store: 'Mediocontacto', queryMode: 'local'}},
                {flex: 1, header: 'Contacto', dataIndex: 'contacto', width: 200, field: {xtype: 'textfield'}, sortable: true},
                {header: 'Principal', flex: 1, dataIndex: 'rector', field: {xtype: 'checkbox'}, sortable: true, renderer: this.showPrincipal}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                pageSize: 20,
                store: 'Contacto',
                displayInfo: true,
                plugins: new Ext.ux.ProgressBarPager()
            }
        });
        this.callParent(arguments);
    },
    showPrincipal: function(val) {
        if (val == '0') {
            return '<span class="label label-danger">No</span>';
        } else {
            return '<span class="label label-success">Si</span>';
        }
    }
});