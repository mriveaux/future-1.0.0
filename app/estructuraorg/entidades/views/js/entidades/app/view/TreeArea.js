/* global Ext, futureLang */
Ext.define('Entidades.view.TreeArea', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.tree_area',
    id: 'tpArea',
    disabled: true,
    autoHeight: true,
    useArrows: true,
    rootVisible: true,
    initComponent: function() {
        var tree = this;
        var treeStore = Ext.create('Ext.data.TreeStore', {
            storeId: 'tsArea',
            model: 'Entidades.model.Area',
            defaultRootProperty: 'text',
            defaultRootText: futureLang.lbAreas,
            defaultRootId: 0,
            autoLoad: false,
            autoSync: false,
            proxy: {type: 'ajax', url: 'cargarareaentidad', reader: {type: 'json', root: 'data'}},
            root: {expanded: false},
            folderSort: false, sorters: [{property: 'text', direction: 'ASC'}]
        });
        Ext.apply(tree, {
            dockedItems: [{xtype: 'toolbar',
                    items: [
                        {action: 'add', itemId: 'btnAdicionar', text: futureLang.lbAdicionar, tooltip: futureLang.lbAdicionarArea, iconCls: 'fa fa-plus bluedark-button', disabled: true},
                        {action: 'mod', itemId: 'btnModificar', text: futureLang.lbModificar, tooltip: futureLang.lbModificarArea, iconCls: 'fa fa-edit bluedark-button', disabled: true},
                        {action: 'del', itemId: 'btnEliminar', text: futureLang.lbEliminar, tooltip: futureLang.lbEliminarArea, iconCls: 'fa fa-trash bluedark-button', disabled: true}, '->',
                        {xtype: 'searchfield', id: 'sfAreaEntidad', store: treeStore,
                            fnOnSearch: function() {
                                treeStore.clearFilter(true);
                                treeStore.load({params: {criterio: Ext.getCmp('sfAreaEntidad').getValue()}});
                            },
                            fnOnClear: function() {
                                treeStore.load({params: {criterio: Ext.getCmp('sfAreaEntidad').getValue()}});
                            }
                        }
                    ]}],
            store: treeStore,
            columns: [{
                    text: 'idpadre',
                    dataIndex: 'idpadre',
                    hidden: true
                }, {
                    text: 'id',
                    dataIndex: 'id',
                    hidden: true
                }, {
                    xtype: 'treecolumn',
                    text: futureLang.lbNombre,
                    flex: 1,
                    sortable: true,
                    dataIndex: 'text'
                }, {
                    text: futureLang.lbAbreviatura,
                    dataIndex: 'abreviatura',
                    sortable: true
                }]
        });
        this.callParent(arguments);
    }
});