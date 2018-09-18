/* global Ext, futureLang */
Ext.define('ClientesProveedores.controller.ClientesProveedores', {
    extend: 'Ext.app.Controller',
    views: [
        'ClientesProveedores.view.Grid',
        'ClientesProveedores.view.GridCuentaBancaria',
        'ClientesProveedores.view.Edit',
        'ClientesProveedores.view.ViewContacto',
        'ClientesProveedores.view.EditContacto'
    ],
    stores: [
        'ClientesProveedores.store.stClienteProv',
        'ClientesProveedores.store.Compania',
        'ClientesProveedores.store.Pais',
        'ClientesProveedores.store.CuentaContable',
        'ClientesProveedores.store.CuentaBancaria'
    ],
    models: [
        'ClientesProveedores.model.mdClienteProv',
        'ClientesProveedores.model.Compania',
        'ClientesProveedores.model.Pais',
        'ClientesProveedores.model.CuentaContable',
        'ClientesProveedores.model.CuentaBancaria'
    ],
    refs: [
        {ref: 'clienteprov_grid', selector: 'clienteprov_grid'},
        {ref: 'grid_cuentabancaria', selector: 'grid_cuentabancaria'},
        {ref: 'edit_clienteproveedor', selector: 'edit_clienteproveedor'},
        {ref: 'view_contacto', selector: 'view_contacto'},
        {ref: 'edit_contacto', selector: 'edit_contacto'}
    ],
    init: function () {
        var me = this;
        this.listen({
            component: {
                'clienteprov_grid': {
                    selectionchange: me.onGridSelectionChange,
                    expandbody: me.onGridExpandBody
                },
                'view_contacto': {
                    selectionchange: me.onContactoSelectionChange
                },
                'clienteprov_grid button[action=add]': {
                    click: me.addClienteProveedor
                },
                'clienteprov_grid button[action=mod]': {
                    click: me.modClienteProveedor
                },
                'clienteprov_grid button[action=del]': {
                    click: me.delClienteProveedor
                },
                'clienteprov_grid button[action=print]': {
                    click: me.printData
                },
                'edit_clienteproveedor checkboxfield[name=cliente]': {
                    change: me.onSelectChbCliente
                },
                'edit_clienteproveedor checkboxfield[name=proveedor]': {
                    change: me.onSelectChbProveedor
                },
                'edit_clienteproveedor checkboxfield[name=empresa]': {
                    change: me.onSelectChbEmpresa
                },
                'edit_clienteproveedor button[action=adicionar_contacto]': {
                    click: me.onAddContacto
                },
                'edit_clienteproveedor button[action=eliminar_contacto]': {
                    click: me.onDelContacto
                },
                'edit_clienteproveedor button[action=aceptar]': {
                    click: me.saveClienteProveedor
                },
                'edit_clienteproveedor button[action=aplicar]': {
                    click: me.saveClienteProveedor
                },
                'grid_cuentabancaria button[action=adicionar]': {
                    click: me.onAddCuentaBancaria
                },
                'edit_contacto button[action=aceptar]': {
                    click: me.saveContacto
                }
            }
        });
    },
    onGridExpandBody: function (rowNode, record, expanRow, eOpts) {
        if (!record.get('dataview')) {
            var contactos = record.get('contactos');
            record.set({dataview: true});
            if (record.get('isempresa') && contactos.length) {
                var ctos = Ext.create('ClientesProveedores.view.ViewContacto', {});
                var fieldset = Ext.create('Ext.form.FieldSet', {
                    title: '<span style="font-size: 11px !important; color: #000000"><b>' + futureLang.lbContactos + '</b></span>',
                    items: [ctos]
                });
                if (!fieldset.rendered) {
                    ctos.getStore().loadData(record.get('contactos'));
                    fieldset.setWidth(Ext.fly(expanRow).getWidth() - 20);
                    var a = Ext.fly(rowNode).getHeight();
                    fieldset.render('ctos' + record.get('idclientesproveedores'));
                    Ext.fly(rowNode).setHeight(a + fieldset.getHeight() + 10);
                }
            }
        }
    },
    onGridSelectionChange: function (sm) {
        var me = this;
        if (sm.hasSelection()) {
            me.getClienteprov_grid().down('button[action=mod]').enable();
            me.getClienteprov_grid().down('button[action=del]').enable();
        } else {
            me.getClienteprov_grid().down('button[action=mod]').disable();
            me.getClienteprov_grid().down('button[action=del]').disable();
        }
    },
    addClienteProveedor: function (btn) {
        var win = Ext.widget('edit_clienteproveedor');
        win.setTitle(futureLang.lbAdd2);
        win.down('button[action=aplicar]').show();
    },
    modClienteProveedor: function (btn) {
        if (this.getClienteprov_grid().getSelectionModel().hasSelection()) {
            var win = Ext.widget('edit_clienteproveedor');
            win.setTitle(futureLang.lbMod2);
            win.down('button[action=aplicar]').hide();
            var form = win.down('form');
            var record = this.getClienteprov_grid().getSelectionModel().getLastSelected();
            form.loadRecord(record);
        }
    },
    delClienteProveedor: function (btn) {
        var me = this;
        var sm = this.getClienteprov_grid().getSelectionModel();
        if (sm.hasSelection()) {
            function confirmar(btn) {
                if (btn === 'ok') {
                    var records = sm.getSelection();
                    var ids = [];
                    records.every(function (record) {
                        ids.push(record.get('idclientesproveedores'));
                    });
                    me.delete(ids, me);
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], futureLang.lbConfirmar, confirmar);
        }
    },
    delete: function (ids, me) {
        var grid = me.getClienteprov_grid();
        var myMask = new Ext.LoadMask(grid, {msg: futureLang.lbWait});
        myMask.show();
        Ext.Ajax.request({
            url: 'delete',
            method: 'POST',
            params: {
                ids: Ext.encode(ids)
            },
            callback: function (options, success, response) {
                myMask.hide();
                responseData = Ext.decode(response.responseText);
                if (responseData.errors && responseData.errors.length > 0) {
                    showMsg(3, futureLang.lbErrorServer);
                }
                grid.getStore().reload();

            }
        });
    },
    printData: function () {
        var me = this;
        Ext.Msg.wait(futureLang.lbLoading, futureLang.lbWait);
        Ext.Ajax.request({
            method: "POST",
            url: "getdatarpt",
            callback: function (options, success, response) {
                var responseData = Ext.decode(response.responseText);
                Ext.Msg.hide();
                if (responseData.datoCuerpo.length > 0) {
                    var winPrintView = Ext.create('Ext.comun.PrintView');
                    winPrintView.data = responseData;
                } else {
                    showMsg(1, futureLang.lbNoResults);
                }
            }
        });
    },
    onSelectChbCliente: function (f, newValue) {
        var formContabilidad = f.up('window').down('tabpanel').getComponent('tabContabilidad').down('form');
        if (newValue) {
            formContabilidad.down('combobox[name=idcuentacobrar]').show();
        } else {
            formContabilidad.down('combobox[name=idcuentacobrar]').hide();
        }
    },
    onSelectChbProveedor: function (f, newValue) {
        var formContabilidad = f.up('window').down('tabpanel').getComponent('tabContabilidad').down('form');
        if (newValue) {
            formContabilidad.down('combobox[name=idcuentapagar]').show();
        } else {
            formContabilidad.down('combobox[name=idcuentapagar]').hide();
        }
    },
    onSelectChbEmpresa: function (f, newValue) {
        if (newValue) {
            f.up('form').down('combobox[name=idempresa]').hide();
            f.up('window').down('tabpanel').getComponent('tabContacto').enable();
            f.up('window').down('tabpanel').getComponent('tabContacto').show();
        } else {
            f.up('form').down('combobox[name=idempresa]').show();
            f.up('window').down('tabpanel').getComponent('tabContacto').disable();
            f.up('window').down('tabpanel').getComponent('tabContacto').hide();
            f.up('window').down('tabpanel').setActiveTab(0);
        }
    },
    onContactoSelectionChange: function (sm, records) {
        var me = this;
        if (sm.hasSelection()) {
            me.getEdit_clienteproveedor().down('button[action=eliminar_contacto]').enable();
        } else {
            me.getEdit_clienteproveedor().down('button[action=eliminar_contacto]').disable();
        }
    },
    onAddContacto: function (btn) {
        var win = Ext.widget('edit_contacto');
        win.setTitle(futureLang.lbWinAddContacto);
    },
    onDelContacto: function (btn) {
        var me = this, dataView = btn.up('panel').down('dataview');
        if (dataView.getSelectionModel().hasSelection()) {
            var st = dataView.getStore();
            var record = dataView.getSelectionModel().getLastSelected();
            st.remove(record);
        }
    },
    onAddCuentaBancaria: function (btn) {
        var grid = btn.up('grid');
        grid.getStore().insert(0, {numerocuenta: '', banco: '', predeterminada: true});
        grid.getPlugin('cellplugin').startEditByPosition({row: 0, column: 0});
    },
    saveClienteProveedor: function (btn) {
        var me = this,
                win = btn.up('window'),
                form = win.down('form').getForm(),
                viewContacto = me.getView_contacto(),
                viewAdd = me.getEdit_clienteproveedor();

        if (form.isValid()) {
            var tabpanel = win.down('tabpanel');
            var tabContabilidad = tabpanel.getComponent('tabContabilidad');
            var contabilidad = tabContabilidad.down('form').getForm().getValues();
            contabilidad.modifiedAccounts = new Array();
            contabilidad.deletedAccounts = new Array();
            var cuentasBancaria = tabContabilidad.down('grid_cuentabancaria').getStore().getModifiedRecords();
            Ext.each(cuentasBancaria, function (record) {
                contabilidad.modifiedAccounts.push(record.getData());
            });
            var modifiedContacts = new Array();
            Ext.each(viewContacto.getStore().getModifiedRecords(), function (record) {
                modifiedContacts.push(record.getData());
            });
            var deletedContacts = new Array();
            contabilidad.deletedAccounts = new Array();
            //Caso de modificar
            if (!Ext.isEmpty(form.findField('idsociocomercial'))) {
                Ext.each(tabContabilidad.down('grid_cuentabancaria').getStore().getRemovedRecords(), function (record) {
                    contabilidad.deletedAccounts.push(record.get('idcuentacliente'));
                });
                Ext.each(me.getView_contacto().getStore().getRemovedRecords(), function (record) {
                    if (!Ext.isEmpty(record.get('idcontacto'))) {
                        deletedContacts.push(record.get('idcontacto'));
                    }
                });
            }
            var contactos = {
                modifiedContacts: modifiedContacts,
                deletedContacts: deletedContacts
            };
            var myMask = new Ext.LoadMask(win, {msg: futureLang.lbSaving});
            myMask.show();
            form.submit({
                submitEmptyText: false,
                params: {
                    foto: win.down('form').down('image[name=foto]').src,
                    descripcion: tabpanel.getComponent('tabDescripcion').down('textarea').getValue(),
                    contabilidad: Ext.encode(contabilidad),
                    contactos: Ext.encode(contactos)
                },
                success: function (response, action) {
                    // En action.result viene el objeto que se devuelve en el controller
                    // AKI PONER UN MECANISMO PA MOSTRAR LOS ERRORES OCURRIDOS
                    myMask.hide();
                    if (btn.action === 'aceptar') {
                        win.close();
                        me.getClienteprov_grid().getStore().load();
                    } else {
                        form.reset();
                        tabContabilidad.down('grid_cuentabancaria').getStore().removeAll();
                        tabContabilidad.down('combobox[name=idcuentacobrar]').reset();
                        tabContabilidad.down('combobox[name=idcuentapagar]').reset();
                        tabContabilidad.down('textfield[name=credito]').reset();
                        me.getView_contacto().getStore().removeAll();
                        win.down('form').down('image[name=foto]').setSrc(viewAdd.DEFAULT_IMAGE);
                        win.down('form').down('image[name=foto]').setSrc(viewContacto.DEFAULT_IMAGE);
                    }
                },
                failure: function (response, opts) {
                    myMask.hide();
                }
            });
        }
    },
    saveContacto: function (btn) {
        var me = this,
                win = btn.up('window'),
                form = win.down('form').getForm();
        if (form.isValid()) {
            var stContacto = me.getView_contacto().getStore();
            var values = form.getValues();
            values.foto = win.down('form').down('image[name=foto]').src;
            stContacto.add(values);
            if (btn.action === 'aceptar') {
                win.close();
            } else {
                form.reset();
            }
        }
    }
});