/* global Ext */
Ext.QuickTips.init();
Ext.application({
requires: ['Ext.container.Viewport','Ext.grid.*', 'Ext.data.*','Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField','Ext.ModelManager','Ext.tip.QuickTipManager', 'Ext.form.*'],name: 'Notificacion',
paths: {'Notificacion': 'D:/PROYECTOS/FUTURE/app/soporte/notificacion/views/js/notificacion/app'},
controllers: [],
views: [],
launch: function() {
Ext.tip.QuickTipManager.init();
Ext.create('Ext.container.Viewport', {
layout: 'fit',
items: [new Ext.Panel({
title: 'Notificacion'
})]
});
}
});