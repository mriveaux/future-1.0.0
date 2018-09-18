/* global Ext */
Ext.define('Dpa.model.Treedpa', {
    extend: 'Ext.data.Model',
    fields: ['id', 'denominacion', {name: 'codigo'}, 'text', 'idtipodpa', 'idpais', 'idpadre', 'tipodpa','leaf', 'iddpapais', {name: 'estado', type: 'boolean'}]
});