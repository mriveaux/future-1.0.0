/* global Ext */
Ext.application({
    requires: ['Ext.container.Viewport', 'Ext.grid.*', 'Ext.data.*', 'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager',
        'Ext.ux.form.SearchField', 'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*', 'Ext.ux.WebSocket', 'Ext.ux.WebSocketManager'],
    name: 'Chat',
    appFolder: '/app/soporte/chat/views/js/chat/app',
    controllers: ['Chat'],
    views: ['List'],
    launch: function() {
        Ext.tip.QuickTipManager.init();
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{xtype: 'chatlist'}]
        });
    }
});
