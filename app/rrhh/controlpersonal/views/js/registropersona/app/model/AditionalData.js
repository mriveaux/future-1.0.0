Ext.define('Registropersona.model.AditionalData', {
    extend: 'Ext.data.Model',
    idProperty: 'idaditionaldata',
    fields: [
        {name: 'agrupador', type: 'string'},
        {name: 'clasificacion', type: 'string'},
        {name: 'componente', type: 'string'}, 'clsname', 'alias'
    ]
});