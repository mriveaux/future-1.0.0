/* global Ext */
Ext.define('Chat.view.List', {
extend: 'Ext.grid.Panel',
alias: 'widget.chatlist', title: 'Chat', selType: 'rowmodel',
initComponent: function () {
var grid = this;
this.reChat = Ext.create('Ext.grid.plugin.RowEditing', {
 clicksToEdit: 2,
 listeners: {
canceledit: function (rowEditing, context) {
if (context.record.phantom) {
grid.getStore().remove(context.record);
}
}
}
});
Ext.apply(grid, {
id: 'gpList', store: 'Chat', plugins: [this.reChat],
dockedItems: [{xtype: 'toolbar', 
items: [{action: 'add', itemId: 'btnAdicionar', text: 'Adicionar', iconCls: 'fa fa-plus bluedark-button'},
 {action: 'mod', itemId: 'btnModificar', text: 'Modificar', iconCls: 'fa fa-edit bluedark-button', disabled: true},
 {action: 'del', itemId: 'btnEliminar', text: 'Eliminar', iconCls: 'fa fa-trash bluedark-button', disabled: true},
 '-', '->', {
width: 300, xtype: 'searchfield', store: 'Chat',
fnOnSearch: function () {
var store = Ext.data.StoreManager.lookup('Chat');
store.clearFilter(true);
store.load({params: {criterio: Ext.getCmp('sfChat').getValue()}});
},
fnOnClear: function () {
var store = Ext.data.StoreManager.lookup('Chat');
store.load({params: {criterio: Ext.getCmp('sfChat').getValue()}});
}
}
]}],
columns: [{xtype: 'rownumberer'},
{header: 'Chat', dataIndex: 'chat', flex: 1, field: {xtype: 'textfield'}, sortable: true},
{name: 'idchat', type: 'int', useNull: true, hideable: false, hidden: true, sortable: false}
],
bbar: {xtype: 'pagingtoolbar', pageSize: 20, store: 'Chat', displayInfo: true, dock: 'bottom'
}
});
this.callParent(arguments);
}
});
