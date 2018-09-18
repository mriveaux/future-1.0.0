Ext.define('Registropersona.model.Contacto', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idcontacto', type: 'int', useNull: true}, 'idtipocontacto', 'idmediocontacto', 'idpersona', 'rector',
        {name: 'contacto', type: 'string', useNull: true},
        {name: 'tipocontacto', mapping: 'Tipocontacto.nombre'},
        {name: 'mediocontacto', mapping: 'Mediocontacto.nombre'}
    ]
});