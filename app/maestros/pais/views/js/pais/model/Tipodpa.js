/* global Ext */
Ext.define('Pais.model.Tipodpa', {
    extend: 'Ext.data.Model', 
    fields: [{name: 'idtipodpa', type: 'int'}, {name: 'denominacion', type: 'string'}],
    idProperty: 'idtipodpa'
});