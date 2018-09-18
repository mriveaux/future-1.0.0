Ext.define('Formato.model.NivelFormato', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idparteformato', type: 'int'},
        {name: 'parteformato', type: 'string'},
        {name: 'abreviatura', type: 'string'},
        {name: 'nivel', type: 'int'},
        {name: 'longitud', type: 'int'},
        {name: 'idformato', type: 'int'}
    ],
    idProperty: 'idparteformato',
    validations: [
        {type: 'length', field: 'parteformato', min: 1, max: 255},
        {type: 'length', field: 'abreviatura', min: 1, max: 50}
    ]
});