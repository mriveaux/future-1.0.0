/* global Ext */
Ext.QuickTips.init();
Ext.application({
requires: ['Ext.container.Viewport','Ext.grid.*', 'Ext.data.*','Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', 'Ext.ux.form.SearchField','Ext.ModelManager','Ext.tip.QuickTipManager', 'Ext.form.*'],name: 'Registroempleado',
paths: {'Registroempleado': 'D:/Repos/future_framework/app/rrhh/controlpersonal/views/js/registroempleado/app'},
controllers: [],
views: [],
launch: function() {
Ext.tip.QuickTipManager.init();
Ext.create('Ext.container.Viewport', {
layout: 'fit',
items: [new Ext.Panel({
title: 'Registroempleado'
})]
});
}
});