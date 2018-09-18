Ext.define('Registropersona.model.Nacimiento', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idnacimiento', type: 'int', useNull: true}, 'idpersona', 'nombremadre', 'nombrepadre', 'registrocivil', 'tomo', 'folio', 'fechanacimiento'
    ]
});