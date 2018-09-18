/* global Ext, futureLang */
Ext.define('Entidades.view.TreeEntidad', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.tree_entidad',
    id: 'tpEntidad',
    autoHeight: true,
    useArrows: true,
    rootVisible: true,
    initComponent: function() {
        var tree = this;
        var treeStore = Ext.create('Ext.data.TreeStore', {
            storeId: 'tsEntidad',
            model: 'Entidades.model.Entidad',
            defaultRootProperty: 'reeup',
            defaultRootText: futureLang.lbEntidades,
            defaultRootId: 0,
            autoLoad: false,
            autoSync: false,
            nodeParam: 'node',
            proxy: {type: 'ajax', url: 'cargarentidades', reader: {type: 'json', root: 'data'}},
            root: {expanded: true},
            folderSort: false/*, 
            sorters: [{property: 'text', direction: 'ASC'}]*/
        });
        Ext.apply(tree, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [
                        {action: 'add', itemId: 'btnAdicionar', id: 'btnAdicionar', text: futureLang.lbAdicionar, tooltip: futureLang.lbAdicionarEntidad, iconCls: 'fa fa-plus bluedark-button', disabled: true},
                        {action: 'mod', itemId: 'btnModificar', text: futureLang.lbModificar, tooltip: futureLang.lbModificarEntidad, iconCls: 'fa fa-edit bluedark-button', disabled: true},
                        {action: 'del', itemId: 'btnEliminar', text: futureLang.lbEliminar, tooltip: futureLang.lbEliminarEntidad, iconCls: 'fa fa-trash bluedark-button', disabled: true}, '->',
                        {xtype: 'searchfield', id: 'sfEntidad', store: treeStore,
                            fnOnSearch: function() {
                                treeStore.clearFilter(true);
                                treeStore.load({params: {criterio: Ext.getCmp('sfEntidad').getValue()}});
                            },
                            fnOnClear: function() {
                                treeStore.load({params: {criterio: Ext.getCmp('sfEntidad').getValue()}});
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
                    dataIndex: 'text',
                    sortable: true
                }, {
                    text: futureLang.lbAbreviatura,
                    dataIndex: 'abreviatura',
                    sortable: true
                }, {
                    text: futureLang.lbTelefonos,
                    dataIndex: 'telefonos',
                    sortable: true
                }, {
                    text: futureLang.lbCorreos,
                    dataIndex: 'correos',
                    sortable: true
                }]
        });
        this.callParent(arguments);
    }
});