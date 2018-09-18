Ext.define('Registropersona.model.Direccion', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'iddireccion', type: 'int', useNull: true}, 'idlocalidad', 'idpersona', 'direccion', 'rector', 'fdesde', 'fhasta'
//        {name: 'fdesde', type: 'string'},
//        {name: 'fhasta', type: 'string'}
    ]
});