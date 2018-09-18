Ext.define('Registropersona.model.Nacionalidad', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idpais', type: 'int'},
        {name: 'nombre', type: 'string'},
        {name: 'nacionalidad', type: 'string'}
    ]
//    validations: [{type: "length", field: "codigo", min: 1, max: 19}, {type: "length", field: "abreviatura", min: 1, max: 30}, {type: "length", field: "nombre", min: 1, max: 255}]
});