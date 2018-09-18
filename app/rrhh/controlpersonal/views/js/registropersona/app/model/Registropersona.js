Ext.define('Registropersona.model.Registropersona', {
    extend: 'Ext.data.Model',
    idProperty: 'idregistropersona',
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
        //Datos de nacimiento
//        {name: 'idnacimiento', mapping: 'DatNacimiento.idnacimiento', type: 'date', convert: null},
//        {name: 'fechanacimiento', mapping: 'DatNacimiento.fechanacimiento', type: 'date', convert: null},
//        {name: 'lugarnacimiento', mapping: 'DatNacimiento.lugarnacimiento', type: 'date', convert: null},
        //Nacionalidad
        {name: 'idnacionalidad', mapping: 'Pais.idpais', type: 'int'},
        {name: 'nacionalidad', mapping: 'Pais.nacionalidad', type: 'string'}
    ]
//    validations: [{type: "length", field: "codigo", min: 1, max: 19}, {type: "length", field: "abreviatura", min: 1, max: 30}, {type: "length", field: "nombre", min: 1, max: 255}]
});