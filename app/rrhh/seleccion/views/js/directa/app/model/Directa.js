Ext.define('Directa.model.Directa', {
    extend: 'Ext.data.Model',
    idProperty: 'iddirecta',
    fields: [
        //Datos basicos de la persona
        {name: 'idpersona', type: 'int'},
        {name: 'nombre', type: 'string'},
        {name: 'apellidos', type: 'string'},
        {name: 'sexo', type: 'int'},
        {name: 'estadocivil', type: 'int'},
        {name: 'foto', type: 'string'},
        {name: 'status', type: 'int'},
        //Documento de identificacion
        {name: 'iddocidentidad', mapping: 'Docidentidad[0].iddocidentidad', type: 'int'},
        {name: 'idcategoriadocidentidad', mapping: 'Docidentidad[0].idcategoriadocidentidad', type: 'int'},
        {name: 'numeroidentidad', mapping: 'Docidentidad[0].numero', type: 'string'},
        //Nacionalidad
        {name: 'idnacionalidad', mapping: 'Pais.idpais', type: 'int'},
        {name: 'nacionalidad', mapping: 'Pais.nacionalidad', type: 'string'}
    ]
});