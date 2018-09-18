/* global Ext, futureLang */
Ext.define('Recursos.view.TreeFuncionalidades', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.tree_funcionalidades',
    id: 'tpFuncionalidades',
    autoHeight: true,
    useArrows: true,
    rootVisible: true,
    initComponent: function() {
        var tree = this;
        Ext.apply(tree, {
            store: 'Funcionalidades'
        });
        this.callParent(arguments);
    }
});