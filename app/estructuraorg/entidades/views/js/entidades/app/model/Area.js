/* global Ext */
Ext.define('Entidades.model.Area', {
    extend: 'Ext.data.Model',
    fields: ['id', 'idareaentidad', 'text', 'codigo', 'abreviatura', 'nombre', 'idpadre', 'leaf', 'identidad']
});