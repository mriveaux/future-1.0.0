/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport',
        'Ext.grid.*', 'Ext.data.*',
        'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField',
        'Ext.ModelManager',
        'Ext.tip.QuickTipManager', 'Ext.form.*'],
    name: 'Registropersona',
    paths: {
        'Registropersona': '/app/rrhh/controlpersonal/views/js/registropersona/app'
    },
    controllers: ['Registropersona', 'Docidentidad', 'Ciudadania', 'Contacto', 'Direccion', 'Tallaje', 'Nacimiento', 'Fenotipo', 'Categoriacientifica', 'Superacion', 'Formacion'],
    views: ['registropersona.Ficha', 'registropersona.List'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'border',
            items: [
                {
                    region: 'west',
                    xtype: 'ficha_persona',
                    margin: '5 0 5 5',
                    width: 250,
                    collapsible: true,
                    split: true,
                    minWidth: 200,
                    maxWidth: 300
                },
                {
                    region: 'center',
                    xtype: 'list_persona',
                    readOnly: false,
                    margin: '5 5 5 0'
                }
            ]
        });
    }
});