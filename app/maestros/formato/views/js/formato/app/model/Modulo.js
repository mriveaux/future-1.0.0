Ext.define('Formato.model.Modulo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idmodulo', type: 'int'},
        {name: 'modulo', mapping:'nombre',  type: 'string'},
        {name: 'descripcion',  type: 'string'},
        {name: 'icono',  type: 'string'}
    ]
});