Ext.define('Seleccion.model.Preseleccion', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idpersona', type: 'int'},
        {name: 'nombre', type: 'string'},
        {name: 'apellidos', type: 'string'},
        {name: 'sexo', type: 'int'},
        {name: 'estadocivil', type: 'int'},
        {name: 'foto', type: 'string'},
        {name: 'status', type: 'int'},
        {name: 'iddocidentidad', mapping: 'Docidentidad[0].iddocidentidad', type: 'int'},
        {name: 'idcategoriadocidentidad', mapping: 'Docidentidad[0].idcategoriadocidentidad', type: 'int'},
        {name: 'numeroidentidad', mapping: 'Docidentidad[0].numero', type: 'string'},
        {name: 'idnacionalidad', mapping: 'Pais.idpais', type: 'int'},
        {name: 'nacionalidad', mapping: 'Pais.nacionalidad', type: 'string'}
    ]
});