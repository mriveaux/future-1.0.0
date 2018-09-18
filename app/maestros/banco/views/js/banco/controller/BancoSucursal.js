/* global Ext */
Ext.define('BancoSucursal.controller.BancoSucursal', {
    extend: 'Ext.app.Controller',
    models: ['Banco', 'Sucursal'], stores: ['Banco', 'Sucursal'], views: ['GridBanco', 'GridSucursal'],
    refs: [{ref: 'grid_banco', selector: 'grid_banco'}, {ref: 'grid_sucursal', selector: 'grid_sucursal'}],
    init: function () {
        var me = this;
        me.control({
            'grid_banco': {
                selectionchange: me.onBancoSelectionChange
            },
            'grid_sucursal': {
                selectionchange: me.onSucursalSelectionChange
            },
            'grid_banco button[action=adicionar]': {
                click: me.addBanco
            },
            'grid_banco button[action=modificar]': {
                click: me.modBanco
            },
            'grid_banco button[action=eliminar]': {
                click: me.delBanco
            },
            'grid_sucursal button[action=adicionar]': {
                click: me.addSucursal
            },
            'grid_sucursal button[action=modificar]': {
                click: me.modSucursal
            },
            'grid_sucursal button[action=eliminar]': {
                click: me.delSucursal
            }
        });
        me.getSucursalStore().on({
            beforeload: {fn: me.setearExtraParams, scope: this}
        });
    },
    setearExtraParams: function (store) {
        var me = this;
        if (me.getGrid_banco().getSelectionModel().hasSelection())
            store.getProxy().extraParams = {
                idbanco: me.getGrid_banco().getSelectionModel().getLastSelected().get('idbanco')
            };
    },
    onBancoSelectionChange: function (sm) {
        var me = this;
        me.getGrid_banco().down('button[action=modificar]').disable();
        me.getGrid_banco().down('button[action=eliminar]').disable();

        if (sm.hasSelection()) {
            var idBanco = me.getGrid_banco().getSelectionModel().getLastSelected().get('idbanco');
            if (idBanco) {
                me.getGrid_sucursal().enable();
                me.getGrid_sucursal().getStore().load({
                    params: {idbanco: me.getGrid_banco().getSelectionModel().getLastSelected().get('idbanco')}
                });
            }
            me.getGrid_banco().down('button[action=modificar]').enable();
            me.getGrid_banco().down('button[action=eliminar]').enable();
        } else {
            me.getGrid_sucursal().disable();
        }
    },
    onSucursalSelectionChange: function (sm) {
        var me = this;
        me.getGrid_sucursal().down('button[action=modificar]').disable();
        me.getGrid_sucursal().down('button[action=eliminar]').disable();

        if (sm.hasSelection()) {
            me.getGrid_sucursal().down('button[action=modificar]').enable();
            me.getGrid_sucursal().down('button[action=eliminar]').enable();
        }
    },
    addBanco: function () {
        var Banco = this.getBancoModel();
        this.getBancoStore().insert(0, new Banco());
        this.getGrid_banco().reBanco.startEdit(0, 0);
    },
    modBanco: function () {
        if (this.getGrid_banco().getSelectionModel().hasSelection()) {
            var selection = this.getGrid_banco().getSelectionModel().getSelection()[0];
            this.getGrid_banco().reBanco.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }
    },
    delBanco: function () {
        var me = this,
                grid = me.getGrid_banco();
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getLastSelected();
            var nombBanco = selection.data.banco;
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        grid.getStore().remove(selection);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombBanco), confirmar);
        } else {
            showMsg(0, futureLang.lbSelDel);
        }
    },
    addSucursal: function () {
        var me = this;
        var Sucursal = this.getSucursalModel();
        this.getSucursalStore().insert(0, new Sucursal({
            idbanco: me.getGrid_banco().getSelectionModel().getLastSelected().get('idbanco')
        }));
        this.getGrid_sucursal().reSucursal.startEdit(0, 0);
    },
    modSucursal: function () {
        if (this.getGrid_sucursal().getSelectionModel().hasSelection()) {
            var selection = this.getGrid_sucursal().getSelectionModel().getSelection()[0];
            this.getGrid_sucursal().reSucursal.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod2);
        }
    },
    delSucursal: function () {
        var me = this,
                grid = me.getGrid_sucursal();
        if (grid.getSelectionModel().hasSelection()) {
            var selection = grid.getSelectionModel().getLastSelected();
            var nombBanco = selection.data.numero;
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        grid.getStore().remove(selection);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar2, nombBanco), confirmar);
        } else {
            showMsg(0, futureLang.lbSelDel2);
        }
    }
});