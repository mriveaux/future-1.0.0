/* global Ext */
Ext.define('Chat.model.Chat', {
extend: 'Ext.data.Model',
fields: [{name: 'idchat', type: 'int', useNull: true}, 'chat'],
idProperty: 'idchat',
validations: [{type: 'length', field: 'idchat', min: 1, max: 19}, {type: 'length', field: 'chat', min: 1, max: 255}]
});
