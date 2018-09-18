/* global Ext, lMask */
Ext.QuickTips.init();
lMask.hide();
var identidad, identidad_padre, desc_entidad;
function mostrarEntidades() {
    var store = new Ext.data.JsonStore({
        autoLoad: true,
        url: 'futureauthloadentities',
        fields: ['identidad', 'nombre', 'foto', 'idpadre'],
        listeners: {
            load: function(Store, records, options) {
                if (records.length === 1) {
                    identidad = records[0].data.identidad;
                    identidad_padre = records[0].data.idpadre;
                    desc_entidad = records[0].data.nombre;
                    Ext.getCmp('btnEntAceptar').handler().call();
                }
            }
        }
    });
    var tpl = new Ext.XTemplate('<tpl for=".">', '<div class="thumb-wrap" id="{identidad}">', '<div class="thumb"><img src="{foto}" title="{nombre}"></div>', '<span class="x-editable">{shortName}</span></div>', "</tpl>", '<div class="x-clear"></div>');
    var panel = new Ext.Panel({
        id: 'images-view',
        frame: true,
        width: 535,
        height: 310,
        layout: 'fit',
        buttonAlign: 'center',
        title: futureLang.ttentidades,
        items: new Ext.DataView({
            store: store,
            tpl: tpl,
            singleSelect: true,
            overClass: 'x-view-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: futureLang.lbemptyimage,
            prepareData: function(data) {
                data.shortName = Ext.util.Format.ellipsis(data.nombre, 15);
                return data;
            },
            listeners: {
                click: {
                    fn: function(dv, index, node, e) {
                        var record = dv.getRecord(node);
                        identidad = record.data.identidad;
                        identidad_padre = record.data.idpadre;
                        desc_entidad = record.data.nombre;
                        Ext.getCmp('btnEntAceptar').enable();
                        panel.setTitle(futureLang.lbacceder + record.data.nombre);
                    }
                }, containerclick: {
                    fn: function(dv, e) {
                        Ext.getCmp('btnEntAceptar').disable();
                        panel.setTitle(futureLang.ttentidades);
                    }
                }, dblclick: {
                    fn: function(dv, index, node, e) {
                        var record = dv.getRecord(node);
                        identidad = record.data.identidad;
                        identidad_padre = record.data.idpadre;
                        desc_entidad = record.data.nombre;
                        panel.setTitle(futureLang.lbacceder + record.data.nombre);
                        Ext.getCmp('btnEntAceptar').handler.call();
                    }
                }
            }
        }),
        buttons: [{
                text: '<i class="fa fa-sign-out fa-flip-horizontal primary blue-stripe-left"></i> ' + futureLang.btnatras,
                id: 'btnEntAtras',
                handler: function() {
                    loadMask(futureLang.msgloadentidades);
                    Ext.getCmp('images-view').destroy();
                    window.location.reload();
                }
            }, {
                text: '<i class="loading-btn fa fa-sign-in primary blue-stripe-right"></i> ' + futureLang.btnaceptar,
                disabled: true,
                id: 'btnEntAceptar',
                handler: openWorkSpace
            }]
    });
    panel.render('formIndex');
}
/**
 * Funcion que abre el marco de trabajo
 * @returns {undefined}
 */

function openWorkSpace() {
    MostrarBarraProgreso(futureLang.msgloaddataentidad);
    Ext.Ajax.request({
        url: 'futureauthsetentity',
        method: 'POST',
        params: {identidad: identidad, identidad_padre: identidad_padre, desc_entidad: desc_entidad},
        callback: function(options, success, response) {
            var responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData.workspace == 'portal')
                window.parent.location = '/app/engine/index.php/engine/engine';
            else if (responseData.workspace == 'desktop')
                window.parent.location = '/app/engine/index.php/desktop/desktop';
            else if (responseData.workspace == 'tabview')
                window.parent.location = '/app/engine/index.php/tabview/tabview';
            else
                MensajeInformacion(futureLang.msgfailure);
        }
    });
}

Ext.onReady(function() {
    mostrarEntidades();
});