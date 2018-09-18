Ext.define('Registropersona.model.Fenotipo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'idfenotipo', type: 'int', useNull: true}, 'idpersona', 'estatura', 'peso', 'observacion',
        {name: 'idcolorojos', type: 'int'},
        {name: 'idcolorpelo', type: 'int'},
        {name: 'idcolorpiel', type: 'int'},
        {name: 'idgruposanguineo', type: 'int'},
        {name: 'gruposanguineo', mapping: 'Gruposanguineo.nombre'},
        {name: 'colorojos', mapping: 'Colorojos.nombre'},
        {name: 'colorpiel', mapping: 'Colorpiel.nombre'},
        {name: 'colorpelo', mapping: 'Colorpelo.nombre'}
    ]
});