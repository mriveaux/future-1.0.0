Ext.define('Registropersona.model.Docidentidad', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'iddocidentidad', type: 'int', useNull: true}, 'numero', 'rector','fechaexpedicion','fechavencimiento',
        {name: 'idcategoriadocidentidad', type: 'int'},
        {name: 'idpersona', type: 'int'},
//        {name: 'fechaexpedicion', type: 'date', format: 'd/m/Y'},
//        {name: 'fechavencimiento', type: 'date', format: 'd/m/Y'},
        {name: 'categoriadoc', mapping: 'Categoriadoc.nombre'}]
});