Ext.define('Registropersona.view.nacimiento.Container', {
    extend: 'Ext.container.Container',
    alias: 'widget.container_nacimiento',
    title: 'Datos de nacimiento',
    layout: 'border',
    initComponent: function() {
        this.items = [Ext.widget('edit_nacimiento'), Ext.widget('list_nacimiento')];
        this.callParent(arguments);
    }
});