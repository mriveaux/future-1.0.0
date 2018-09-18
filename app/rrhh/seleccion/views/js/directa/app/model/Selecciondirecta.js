Ext.define('Directa.model.Selecciondirecta', {
    extend: 'Ext.data.Model',
    idProperty: 'idselecciondirecta',
    fields: [
        {name: 'idselecciondirecta', type: 'int'},
        {name: 'idusuario', type: 'int'},
        {name: 'idpersona', type: 'int'},
        {name: 'idcargoplantilla', type: 'int'},
        {name: 'fecha', type: 'string'},
        {name: 'observacion', type: 'string'},
        {name: 'usuario', mapping: 'Usuarios.usuario', type: 'string'},
        {name: 'persona', mapping: 'fullname', type: 'string'},
        {name: 'cargo', mapping: 'Cargoplantilla.nombre', type: 'string'},
        {name: 'nombre', mapping: 'nombpersona', type: 'string'},
        {name: 'apellidos', mapping: 'Registropersona.apellidos', type: 'string'},
        {name: 'sexo', mapping: 'Registropersona.sexo', type: 'int'},
        {name: 'estadocivil', mapping: 'Registropersona.estadocivil', type: 'int'},
        {name: 'foto', mapping: 'Registropersona.foto', type: 'string'},
        {name: 'status', mapping: 'Registropersona.status', type: 'int'},
        {name: 'numeroidentidad', type: 'string'},
        {name: 'nacionalidad', type: 'string'}
    ]
});