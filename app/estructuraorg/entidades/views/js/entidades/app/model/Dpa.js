/* global Ext, futureLang */
Ext.define('Entidades.model.Dpa', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'codigo', type: 'string'},
        {name: 'text', type: 'string'},
        {name: 'idpadre', type: 'int'},
        {name: 'idpais', type: 'int'},
        {name: 'tipodpa', type: 'string'},
        {name: 'idtipodpa', type: 'int'},
        {name: 'leaf', type: 'bool'},
        {name: 'iddpapais', type: 'int'}
    ]
});