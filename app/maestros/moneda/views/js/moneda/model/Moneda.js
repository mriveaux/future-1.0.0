/* global Ext */
Ext.define('Cubasoft.model.Moneda', {
    extend: 'Ext.data.Model',
    fields: [{name: 'idmoneda', type: 'int', useNull: true}, 'codigonum', 'codigoiso', 'moneda', 'pais', 'simbolo', 'presicion', {name: 'factorredondeo', type: 'float'}, {name: 'presicion', type: 'float'}, 'idpais'],
    idProperty: 'idmoneda',
    validations: [
        {type: "length", field: "codigonum", min: 1, max: 3}, 
        {type: "length", field: "codigoiso", min: 1, max: 3}, 
        {type: "length", field: "moneda", min: 1, max: 255}, 
        {type: "length", field: "pais", min: 1, max: 255}, 
        {type: "length", field: "simbolo", min: 1, max: 30}
    ]
});