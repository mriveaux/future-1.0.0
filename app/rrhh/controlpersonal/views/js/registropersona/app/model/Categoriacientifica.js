Ext.define('Registropersona.model.Categoriacientifica', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idcategoriacientifica', type: 'int', useNull: true}, 'idpersona','fecha',
        {name: 'nombre', type: 'string'}
//        {name: 'fecha', type: 'date', format: 'd/m/Y', useNull: true}
    ]
});