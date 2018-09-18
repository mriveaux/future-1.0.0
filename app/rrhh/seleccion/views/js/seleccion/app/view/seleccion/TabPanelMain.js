Ext.define('Seleccion.view.seleccion.TabPanelMain', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabpanel_main',
    initComponent: function() {
        var me = this;
        me.activeTab = 0;
        me.items = [
            {
                title: 'Inicio',
                layout: 'fit',
                iconCls: 'fa fa-home bluedark-button',
                html: '<div class="home-master-area">Seleccione los procesos de la izquierda para gestionar su contenido</div>'
            }
        ];
        this.callParent(arguments);
    }
});