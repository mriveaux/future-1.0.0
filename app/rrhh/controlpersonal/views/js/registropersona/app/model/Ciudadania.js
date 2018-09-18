Ext.define('Registropersona.model.Ciudadania', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idciudadania', type: 'int', useNull: true},
//        {name: 'fecha', type: 'date', format: 'd/m/Y'},
        {name: 'cuidadania', mapping: 'Pais.nacionalidad', useNull: true}, 'fecha','idpersona', 'idpais']
});