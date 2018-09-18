/* global Ext */
Ext.define('Noconformidad.model.Noconformidad', {
    extend: 'Ext.data.Model',
   fields: [{name: 'idnoconformidad', type: 'int', useNull: true}, 'noconformidad', 'ruta', 'idusuario', 'usuario', 'fecha', 'imagen', 'estado', 'percent'],
    idProperty: 'idnoconformidad',
    validations: [{type: 'length', field: 'noconformidad', min: 1, max: 255}, {type: 'length', field: 'ruta', min: 1, max: 255}]
});
