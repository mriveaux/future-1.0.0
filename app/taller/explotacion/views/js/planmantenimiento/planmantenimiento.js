/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function () {
lMask.hide();
new Ext.Viewport({
layout: 'fit',
items: [new Ext.Panel({
title: 'Planmantenimiento'
})]
});
});