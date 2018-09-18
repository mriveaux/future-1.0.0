Ext.define('Maestros.view.maestros.TabPanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabpanel_maestros',
    initComponent: function() {
        var me = this;
        me.activeTab = 0;
        me.items = [
            {
                title: 'Inicio',
                layout: 'fit',
                iconCls: 'fa fa-home bluedark-button',
                html: '<div class="home-master-area">Seleccione los conceptos de la izquierda para gestionar su contenido</div>'
            }
        ];
        this.callParent(arguments);
    }
});