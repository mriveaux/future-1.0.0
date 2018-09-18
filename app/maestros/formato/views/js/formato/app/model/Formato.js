Ext.define('Formato.model.Formato', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'idformato', type: 'int'
        },
        {
            name: 'formato', type: 'string'
        },
        {
            name: 'descripcion', type: 'string'
        },
        {
            name: 'longitud', type: 'int'
        },
        {
            name: 'separador', type: 'string'
        },
        {
            name: 'estructura', type: 'string'
        },
        {
            name: 'vistap', type: 'string'
        },
        {
            name: 'estandar', type: 'int'
        },
        {
            name: 'idmodulo', type: 'int'
        },
        {
            name: 'modulo', type: 'string'
        },
        {
            name: 'propietario', type: 'int'
        }
    ]
});