/* global Ext */
Ext.define('Codmercadologico.store.Categoriaservicio', {
    extend: 'Ext.data.Store',
    storeId: 'Categoriaservicio',
    model: 'Codmercadologico.model.Categoriaservicio',
    autoLoad: true, autoSync: true, filterOnLoad: false,
    proxy: {
        type: 'ajax',
        actionMethods: {read: 'POST'},
        extraParams: {restful: true},
        api: {read: 'loaddatacategoriaservicio'},
        reader: {type: 'json', root: 'data', totalProperty: 'total', successProperty: 'success'},
        writer: {type: 'json'},
        listeners: {
            exception: function(proxy, response, operation) {
                Ext.MessageBox.show({
                    title: futureLang.lbExcepRem,
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        'beforesync': function() {
            showMask(Ext.lang.loading);
        },
        'load': function(store, records, successful, eOpts) {
            hideMask();
        }
    }
});