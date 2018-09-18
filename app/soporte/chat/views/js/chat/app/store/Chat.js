/* global Ext */
Ext.define('Chat.store.Chat', {
extend: 'Ext.data.Store', storeId: 'Chat', model: 'Chat.model.Chat', sorters: ['chat'], autoLoad: true, autoSync: true, filterOnLoad: false, pageSize: 20,
proxy: {
type: 'ajax',
actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
 extraParams:{restful: true},
api: {read: 'getchats', create: 'addchat', update: 'modchat', destroy: 'delchat'},
reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
writer: {type: 'json'},
listeners: {
exception: function (proxy, response, operation) {
Ext.MessageBox.show({title: 'Excepci&oacute;n remota', msg: operation.getError(), icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});
}
}
},
listeners: {
'beforesync': function () {
showMask('Cargando...');
},
'load': function (store, records, successful, eOpts) {
hideMask();
},
'write': function (proxy, operation) {
operation.callback = function (records, operat, success) {
var msg = '';
if (success) {
switch (operation.action) {
case 'create':
msg = 'El chat fue adicionado correctamente.';
break;
case 'update':
msg = 'El chat fue modificado correctamente.';
break;
case 'destroy':
msg = 'El chat fue eliminado correctamente.';
break;
}
this.reload();
}
showMsg(1, msg);
};
hideMask();
}
}
});