/* global Ext, futureLang */
Ext.define('Entidades.controller.Entidad', {
    extend: 'Ext.app.Controller',
    models: ['Entidad', 'Area', 'Dpa'],
    stores: ['Entidad', 'Area', 'Dpa'],
    views: ['TreeEntidad', 'TreeArea', 'EditEntidad', 'EditArea'],
    refs: [{ref: 'tree_entidad', selector: 'tree_entidad'}, {ref: 'tree_area', selector: 'tree_area'}, {ref: 'edit_entidad', selector: 'edit_entidad'}, {ref: 'edit_area', selector: 'edit_area'}],
    init: function() {
        var me = this, concatDpa = new Array();
        me.control({
            'tree_entidad': {
                select: me.selectEntidad,
                load: me.onLoadEntidad
            },
            'tree_area': {
                select: me.selectArea,
                load: me.onLoadArea
            },
            '#iddpa': {
                itemclick: me.onSelectDpa
            },
            'tree_entidad button[action=add]': {
                click: me.addEntidad
            },
            'tree_entidad button[action=mod]': {
                click: me.modEntidades
            },
            'tree_entidad button[action=del]': {
                click: me.delEntidades
            },
            'edit_entidad button[action=aceptar]': {
                click: this.saveEntidad
            },
            'tree_area button[action=add]': {
                click: me.addArea
            },
            'tree_area button[action=mod]': {
                click: me.modArea
            },
            'tree_area button[action=del]': {
                click: me.delArea
            },
            'edit_area button[action=aceptar]': {
                click: this.saveArea
            }
        });
    },
    selectEntidad: function(el, record, index, eOpts) {
        var me = this;
        me.getTree_entidad().down('button[action=add]').setDisabled(false);
        me.getTree_entidad().down('button[action=mod]').setDisabled((record.data.id == '0') ? true : false);
        me.getTree_entidad().down('button[action=del]').setDisabled((record.data.id == '0' || record.data.leaf == false) ? true : false);
        me.getTree_area().setDisabled(false);
        if (record.data.id != '0') {
            me.getTree_area().getRootNode().updateInfo(true, {text: record.data.text, id: 0});
            me.getTree_area().getStore().proxy.extraParams.identidad = record.data.id;
            me.getTree_area().getStore().load({
                params: {identidad: record.data.id, node: 0},
                callback: function() {
                    if (!me.getTree_area().getRootNode().isExpanded())
                        me.getTree_area().getRootNode().expand();
                }
            });
        } else {
            me.getTree_area().setDisabled(true);
            me.getTree_area().getRootNode().updateInfo(true, {text: futureLang.lbAreas, id: 0});
            me.actionBtnSelectArea(true);
        }
    },
    selectArea: function(el, record, index, eOpts) {
        var me = this;
        me.getTree_area().down('button[action=add]').setDisabled(false);
        if (record.data.id != '0') {
            me.getTree_area().down('button[action=mod]').setDisabled((record.data.id == '0') ? true : false);
            me.getTree_area().down('button[action=del]').setDisabled((record.data.id == '0' || record.data.leaf == false) ? true : false);
        } else {
            me.actionBtnSelectArea(true);
            me.getTree_area().down('button[action=add]').setDisabled(false);
        }
    },
    actionBtnSelectArea: function(flag) {
        var me = this;
        me.getTree_area().down('button[action=add]').setDisabled(flag);
        me.getTree_area().down('button[action=mod]').setDisabled(flag);
        me.getTree_area().down('button[action=del]').setDisabled(flag);
    },
    addEntidad: function() {
        var me = this;
        if (!me.winEditEntidad) {
            me.winEditEntidad = Ext.widget('edit_entidad');
        }
        me.winEditEntidad.show();
        me.winEditEntidad.setTitle(futureLang.lbttAdicionarEntidad);
        this.resetEditEntidad();
        var form = me.winEditEntidad.getComponent('basic_data').getForm();
        form.findField('nombre').focus();
    },
    modEntidades: function(grid, record) {
        var me = this, selection = me.getTree_entidad().getSelectionModel().getSelection()[0];

        if (selection.data.id != 0) {
            if (!me.winEditEntidad) {
                me.winEditEntidad = Ext.widget('edit_entidad');
            }
            me.winEditEntidad.show();
            me.winEditEntidad.setTitle(futureLang.lbttModificarEntidad);
            this.resetEditEntidad();

            var form = me.winEditEntidad.getComponent('basic_data').getForm();
            form.loadRecord(selection);

            var str = selection.get('dpaext').split(',').reverse();
            form.findField('iddpa').setValue(selection.get('iddpa'));
            form.findField('iddpa').setRawValue(str[0]);

            if (selection.get('foto')) {
                me.winEditEntidad.down('image[name=foto]').setSrc(selection.get('foto'));
            }
            var form = me.winEditEntidad.getComponent('basic_data').getForm();
            form.findField('nombre').focus();
        }
    },
    delEntidades: function(grid, record) {
        var me = this;
        selection = me.getTree_entidad().getSelectionModel().getSelection()[0];
        if (selection.data.id != 0) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    loadProgress(futureLang.lbEliminandoEntidad);
                    Ext.Ajax.request({
                        url: 'eliminarentidad',
                        method: 'POST',
                        params: {
                            idnodo: selection.data.identidad
                        },
                        callback: function(options, success, response) {
                            var responseData = Ext.decode(response.responseText);
                            Ext.MessageBox.hide();
                            if (responseData == 1) {
                                MensajeInformacion(futureLang.lbOkEliminarEntidad);
                                me.getTree_area().setDisabled(true);
                                me.getTree_area().getRootNode().updateInfo(true, {text: futureLang.lbAreas, id: 0});
                                me.actionBtnSelectArea(true);
                                if (selection.data.idpadre == 0) {
                                    me.getTree_entidad().getStore().load({params: {node: 0}});
                                } else {
                                    me.getTree_entidad().getStore().reload({params: {node: selection.data.idpadre}});
                                }
                            } else if (responseData == 2) {
                                MensajeError(futureLang.lbEliminarError);
                            } else {
                                MensajeError(futureLang.lbMsgError);
                            }
                        }
                    });
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> ' + futureLang.lbEliminarEntidad, 'message': futureLang.lbPromptEliminarEntidad}, confirmar);
        }
    },
    onLoadEntidad: function(store, node, records, successful, eOpts) {
        if (records.length == 0)
            node.updateInfo(true, {leaf: true});
    },
    saveEntidad: function(btn) {
        var me = this,
                win = btn.up('window'),
                form = win.getComponent('basic_data').getForm(),
                datosEntidad = {};
        selection = me.getTree_entidad().getSelectionModel().getSelection()[0];

        if (form.isValid()) {
            loadProgress(futureLang.lbGuardandoEntidad);
            datosEntidad = form.getValues();

            datosEntidad.idpadre = selection.data.id;
            datosEntidad.dpaext = form.findField('dpaext').getValue();

            if (win.down('image[name=foto]').src)
                datosEntidad.foto = win.down('image[name=foto]').src;
            else
                datosEntidad.foto = null;

            Ext.Ajax.request({
                url: 'saveentidad',
                method: 'POST',
                params: {
                    datos: Ext.encode(datosEntidad)
                },
                callback: function(options, success, response) {
                    Ext.MessageBox.hide();
                    var responseData = Ext.decode(response.responseText);
                    if (responseData.success) {
                        (win.header.title == futureLang.lbttAdicionarEntidad) ? MensajeInformacion(futureLang.lbOkAdicionarEntidad) : MensajeInformacion(futureLang.lbOkModificarEntidad);
                        win.close();
                        me.getTree_area().setDisabled(true);
                        me.getTree_area().getRootNode().updateInfo(true, {text: futureLang.lbAreas, id: 0});
                        me.actionBtnSelectArea(true);
                        if (selection.data.leaf)
                            selection.updateInfo(true, {leaf: false});
                        if (selection.data.id == 0) {
                            me.getTree_entidad().getStore().load({params: {node: 0}});
                        } else {
                            me.getTree_entidad().getStore().getNodeById(selection.data.id).store.reload();
                        }
                    } else {
                        if (responseData.codMsg == 2) {
                            MensajeError(futureLang.lbAdicionarExisteEntidad);
                        } else
                            MensajeError(futureLang.lbMsgError);
                    }
                }
            });
        }
    },
    resetEditEntidad: function() {
        var win = this.getEdit_entidad();
        win.down('image[name=foto]').setSrc(win.DEFAULT_IMAGE);
        win.down('form').getForm().reset();
        win.down('#iddpa').setRawValue('');
    },
    onSelectDpa: function(tree, record, item, index, e, eOpts) {
        var me = this;
        me.concatDpa = new Array();
        var form = this.getEdit_entidad().down('form').getForm();
        me.getParentInformation(tree, record);
        var strDpa = me.concatDpa.reverse();
        form.findField('dpaext').setValue(strDpa);
    },
    getParentInformation: function(tree, record) {
        var me = this;
        if (record.data.idpadre == 0 || record.data.idpadre == null)
            return me.concatDpa.push(record.data.text);
        else {
            me.concatDpa.push(record.data.text);
            record = tree.store.getNodeById(record.data.idpadre);
            return me.getParentInformation(tree, record);
        }
    },
    addArea: function() {
        var me = this;
        if (!me.winEditArea) {
            me.winEditArea = Ext.widget('edit_area');
        }
        me.winEditArea.show();
        me.winEditArea.setTitle(futureLang.lbttAdicionarArea);
        this.resetEditArea();
        var form = me.winEditArea.getComponent('basic_data').getForm();
        form.findField('codigo').focus();
    },
    modArea: function(grid, record) {
        var me = this, selection = me.getTree_area().getSelectionModel().getSelection()[0];

        if (selection.data.id != 0) {
            if (!me.winEditArea) {
                me.winEditArea = Ext.widget('edit_area');
            }
            me.winEditArea.show();
            me.winEditArea.setTitle(futureLang.lbttModificarArea);
            this.resetEditArea();

            var form = me.winEditArea.getComponent('basic_data').getForm();
            form.loadRecord(selection);
            var form = me.winEditArea.getComponent('basic_data').getForm();
            form.findField('codigo').focus();
        }
    },
    delArea: function(grid, record) {
        var me = this;
        selection = me.getTree_area().getSelectionModel().getSelection()[0];
        if (selection.data.id != 0) {
            function confirmar(btn) {
                if (btn == 'ok') {
                    loadProgress(futureLang.lbEliminandoArea);
                    Ext.Ajax.request({
                        url: 'eliminarareaentidad',
                        method: 'POST',
                        params: {
                            idnodo: selection.data.idareaentidad
                        },
                        callback: function(options, success, response) {
                            var responseData = Ext.decode(response.responseText);
                            Ext.MessageBox.hide();
                            if (responseData == 1) {
                                MensajeInformacion(futureLang.lbOkEliminarArea);
                                me.actionBtnSelectArea(true);
                                me.getTree_area().down('button[action=add]').setDisabled(false);
                                if (selection.data.idpadre == 0) {
                                    me.getTree_area().getStore().load({params: {identidad: me.getTree_entidad().getSelectionModel().getSelection()[0].data.id, node: 0}});
                                } else {
                                    me.getTree_area().getStore().reload({params: {identidad: me.getTree_entidad().getSelectionModel().getSelection()[0].data.id, node: selection.data.idpadre}});
                                }
                            } else if (responseData == 2) {
                                MensajeError(futureLang.lbEliminarErrorArea);
                            } else {
                                MensajeError(futureLang.lbMsgError);
                            }
                        }
                    });
                }
            }
            showMsg(2, {'title': '<i class="fa fa-trash"></i> ' + futureLang.lbEliminarArea, 'message': futureLang.lbPromptEliminarArea}, confirmar);
        }
    },
    onLoadArea: function(store, node, records, successful, eOpts) {
        if (records.length == 0)
            node.updateInfo(true, {leaf: true});
    },
    saveArea: function(btn) {
        var me = this,
                win = btn.up('window'),
                form = win.getComponent('basic_data').getForm(),
                datosArea = {};
        selection = me.getTree_area().getSelectionModel().getSelection()[0];

        if (form.isValid()) {
            loadProgress(futureLang.lbGuardandoArea);
            datosArea = form.getValues();
            datosArea.idpadre = selection.data.id;
            datosArea.identidad = me.getTree_entidad().getSelectionModel().getSelection()[0].data.id;

            Ext.Ajax.request({
                url: 'saveareaentidad',
                method: 'POST',
                params: {
                    datos: Ext.encode(datosArea)
                },
                callback: function(options, success, response) {
                    Ext.MessageBox.hide();
                    var responseData = Ext.decode(response.responseText);
                    if (responseData.success) {
                        (win.header.title == futureLang.lbttAdicionarArea) ? MensajeInformacion(futureLang.lbOkAdicionarArea) : MensajeInformacion(futureLang.lbOkModificarArea);
                        win.close();
                        me.actionBtnSelectArea(true);
                        me.getTree_area().down('button[action=add]').setDisabled(false);
                        if (selection.data.leaf && !selection.data.idareaentidad) {
                            selection.updateInfo(true, {leaf: false});
                        }
                        if (selection.data.id == 0 || (selection.data.idpadre == 0 && datosArea.idareaentidad)) {
                            me.getTree_area().getStore().load({
                                params: {identidad: datosArea.identidad, node: 0},
                                callback: function() {
                                    if (!me.getTree_area().getRootNode().isExpanded())
                                        me.getTree_area().getRootNode().expand();
                                }
                            });
                        } else {
                            me.getTree_area().getStore().reload({
                                params: {identidad: datosArea.identidad, node: selection.data.idpadre}
                            });
                        }
                    } else {
                        if (responseData.codMsg == 2) {
                            MensajeError(futureLang.lbAdicionarExisteArea);
                        } else
                            MensajeError(futureLang.lbEliminarErrorArea);
                    }
                }
            });
        }
    },
    resetEditArea: function() {
        var win = this.getEdit_area();
        win.down('form').getForm().reset();
    }
});
