/* global Ext */
Ext.define('Noconformidad.controller.Noconformidad', {
    extend: 'Ext.app.Controller',
    stores: ['Noconformidad'],
    models: ['Noconformidad'],
    views: ['List'],
    refs: [{ref: 'list', selector: 'grid'}],
    init: function() {
        this.control({
            'noconformidadlist': {
                selectionchange: this.toggleBtn
            },
            'noconformidadlist button[action=add]': {
                click: this.addNoconformidad
            },
            'noconformidadlist button[action=mod]': {
                click: this.editNoconformidad
            },
            'noconformidadlist button[action=del]': {
                click: this.delNoconformidad
            },
            'territorioedit button[action=save]': {
                click: this.updateNoconformidad
            }
        });
        this.listen({
            store: {
                '#Noconformidad': {
                    load: this.toggleDockedBar
                }
            }
        });
    },
    toggleDockedBar: function(store, records, successful, eOpts) {
        this.getList().getDockedComponent('topbar').enable();
    },
    addNoconformidad: function() {
        var Terr = this.getModel('Noconformidad');
        this.getList().getStore().insert(0, new Terr());
        this.getList().reNoconformidad.startEdit(0, 0);
    },
    editNoconformidad: function(grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            this.getList().reNoconformidad.startEdit(selection, 0);
        } else {
            showMsg(0, futureLang.lbSelMod);
        }
    },
    delNoconformidad: function(grid, record) {
        var me = this;
        if (me.getList().getSelectionModel().hasSelection()) {
            var selection = me.getList().getSelectionModel().getSelection()[0];
            var nombNoconformidad = selection.data.noconformidad;
            function confirmar(btn) {
                if (btn === 'ok') {
                    if (selection) {
                        me.getList().getStore().remove(selection);
                    }
                }
            }
            MensajeInterrogacion(Ext.lang.titles[2], Ext.String.format(futureLang.lbMsgConfirmar, nombNoconformidad), confirmar);
        } else {
            showMsg(1, futureLang.lbSelDel);
        }
    },
    updateNoconformidad: function(button) {
        var win = button.up('window'),
                form = win.down('form'),
                record = form.getRecord(),
                values = form.getValues();

        record.set(values);
        win.close();
        this.getNoconformidadStore().sync();
    },
    toggleBtn: function(selModel, selections) {
        this.getList().down('#btnModificar').setDisabled(selections.length === 0);
        this.getList().down('#btnEliminar').setDisabled(selections.length === 0);
    }
});
