Ext.define('Registropersona.store.Formacion', {
    extend: 'Ext.data.Store',
    model: 'Registropersona.model.Formacion',
    autoLoad: false,
    autoSync: false,
    filterOnLoad: false,
    pageSize: 20,
    proxy: {
        type: 'ajax',
        actionMethods: {create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},
        extraParams: {restful: true},
        api: {
            read: '../formacion/getformacion',
            create: '../formacion/addformacion',
            update: '../formacion/modformacion',
            destroy: '../formacion/delformacion'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total',
            successProperty: 'success'
        },
        writer: {
            type: 'json'
        },
        listeners: {
            exception: function(proxy, response, operation) {
                Ext.MessageBox.show({
                    title: 'Excepci&oacute;n remota',
                    msg: operation.getError(),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    listeners: {
        'beforesync': function() {
            showMask('Cargando...');
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
                            msg = 'Los datos de la formaci&oacute;n regular fueron adicionados correctamente.';
                            break;
                        case 'update':
                            msg = 'Los datos de la formaci&oacute;n regular fueron modificados correctamente.';
                            break;
                        case 'destroy':
                            msg = 'Los datos de la formaci&oacute;n regular fueron eliminados correctamente.';
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