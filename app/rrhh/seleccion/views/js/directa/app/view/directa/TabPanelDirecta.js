Ext.define('Directa.view.directa.TabPanelDirecta', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabpanel_directa',
    initComponent: function() {
        var me = this;
//        me.items = [
//            /*{
//                title: 'Realizar selecci&oacute;n',
//                layout: 'fit',
//                iconCls: 'fa fa-check-square bluedark-button',
//                items: {border: false, xtype: 'list_persona'}
//            },*/ {
//                title: 'Selecciones realizadas',
//                layout: 'fit',
//                iconCls: 'fa fa-list bluedark-button'
//            }
//        ];
        this.callParent(arguments);
    }
});