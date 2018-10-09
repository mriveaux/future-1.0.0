/* global Ext */
Ext.define('Zona.store.Zona', {
    extend: 'Ext.data.Store', storeId: 'Zona', model: 'Zona.model.Zona', sorters: ['zona'], autoLoad: false, autoSync: false, filterOnLoad: false,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {read: 'loaddatazonas', create: 'addzona', update: 'modzona', destroy: 'delzona'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
        writer: {type: 'json'},
        listeners: {
            exception: function(proxy, response, operation) {
                var response = Ext.decode(response.responseText);
                hideMask();
                if (response.codMsg == 2) {
                    var msg = 'AAA';
                    switch (operation.action) {
                        case 'create':
                            msg = futureLang.lbAddExisteZona;
                            break;
                        case 'update':
                            msg = futureLang.lbModExisteZona;
                            break;
                        case 'destroy':
                            msg = futureLang.lbDatosAsociados;
                            break;
                    }
                    showMsg(1, msg);
                    operation.records[0].store.reload();
                } else {
                    Ext.MessageBox.show({
                        title: futureLang.lbExcepRem,
                        msg: operation.getError(),
                        icon: Ext.MessageBox.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            }
        }
    },
    listeners: {
        'beforesync': function() {
            showMask(futureLang.lbMsgCargando);
        },
        'load': function(store, records, successful, eOpts) {
            hideMask();
        },
        'write': function(proxy, operation) {
            operation.callback = function(records, operat, success) {
                var msg = '';
                if (success) {
                    switch (operation.action) {
                        case 'create':
                            msg = futureLang.lbAddOk;
                            break;
                        case 'update':
                            msg = futureLang.lbModOk;
                            break;
                        case 'destroy':
                            msg = futureLang.lbDelOk;
                            break;
                    }
                    this.reload();
                }
                showMsg(1, msg);
            };
            hideMask();
        }
    }
});