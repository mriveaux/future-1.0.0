/* global Ext */
Ext.define('Dpa.model.Pais', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idpais', type: 'int'}, {name: 'pais', type: 'string'}, {name: 'siglas', type: 'string'}, {name: 'nacionalidad', type: 'string'}, {name: 'codigo', type: 'int'}]
});

