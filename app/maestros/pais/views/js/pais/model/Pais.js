Ext.define('Pais.model.Pais', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idpais', type: 'int', useNull: true},{name: 'codigo', type: 'int'}, 'siglas', 'pais', 'nacionalidad'],
    idProperty: 'idpais',
    validations: [
        {type: "length", field: "codigo", min: 1, max: 3},
        {type: "length", field: "siglas", min: 1, max: 20},
        {type: "length", field: "pais", min: 1, max: 100},
        {type: "length", field: "nacionalidad", min: 1, max: 100}]
});