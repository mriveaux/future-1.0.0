/* global Ext */
if (!Ext.grid)
    Ext.namespace('Ext.grid');
Ext.grid.RowEditor = Ext.extend(Ext.Panel, {
    floating: true,
    shadow: false,
    layout: 'table',
    cls: 'x-small-editor',
    buttonAlign: 'center',
    baseCls: 'x-row-editor',
    elements: 'header,footer,body',
    frameWidth: 5,
    buttonPad: 3,
    clicksToEdit: 'auto',
    monitorValid: true,
    focusDelay: 250,
    errorSummary: true,
    defaults: {
        normalWidth: true
    },
    initComponent: function () {
        Ext.grid.RowEditor.superclass.initComponent.call(this);
        Ext.override(Ext.grid.ColumnModel, {
            getColumnAt: function (index) {
                return this.config[index];
            }
        });
        this.addEvents(
                /**
                 * @event beforeedit
                 * Se dispara antes de que el editor de la fila(row) sea activado.
                 * Si el listener devuelve <tt>false</tt> el editor no sera activado.
                 * @param {Ext.grid.RowEditor} roweditor This object
                 * @param {Ext.grid.EditorGridPanel} grid Grid que esta siendo editado.
                 * @param {Ext.data.Record} r El Record que ha sido editado.
                 * @param {Number} rowIndex Numero de la fila a editar
                 */
                'beforeedit',
                /**
                 * @event validateedit
                 * Se dispara despues de que una fila ha sido editada y pasa la validacion
                 * If the listener returns <tt>false</tt> changes to the record will not be set.
                 * @param {Ext.grid.RowEditor} roweditor Este objeto
                 * @param {Ext.grid.EditorGridPanel} grid Grid que esta siendo editado.
                 * @param {Object} changes Objeto con todos los cambios hechos al record.
                 * @param {Ext.data.Record} r El Record que ha sido editado.
                 * @param {Number} rowIndex El numero de la fila a editar
                 */
                'validateedit',
                /**
                 * @event afteredit
                 * Se dispara despues de que una fila ha sido editada y despues
                 * que el evento update del store ha sido disparado con la edicion.
                 * @param {Ext.grid.RowEditor} roweditor Este objeto
                 * @param {Ext.grid.EditorGridPanel} grid Grid que esta siendo editado.
                 * @param {Object}  Objeto con todos los cambios hechos al record.
                 * @param {Ext.data.Record} r El Record que ha sido editado.
                 * @param {Number} rowIndex El numero de la fila editaada
                 */
                'afteredit',
                /**
                 * @event canceledit
                 * Se dispara despues cuando se cancela la edici�n del record.
                 * @param {Ext.grid.RowEditor} roweditor Este objeto
                 * @param {Ext.data.Record} r El Record que ha sido editado.
                 * @param {Number} rowIndex El numero de la fila editada
                 */
                'canceledit',
                /**
                 * @event oninitsetvalue
                 * Se dispara antes de setear el valor de record en el editor.
                 * Es necesario retornar falso si cambia el valor, para que no se ejecute el del componente.
                 * @param {Ext.grid.RowEditor} roweditor Este objeto
                 * @param {Number} f El editor que va a cambiar
                 * @param {Ext.data.Record} r El Record que ha sido editado.
                 */
                'oninitsetvalue'
                );
    },
    init: function (grid) {
        this.arreliminados = new Array();
        this.recordInEdit = Ext.data.Record.create(new Array());
        this.grid = grid;
        this.ownerCt = grid;
        if (this.clicksToEdit === 2) {
            grid.on('rowdblclick', this.onRowDblClick, this);
        } else {
            grid.on('rowclick', this.onRowClick, this);
            if (Ext.isIE) {
                grid.on('rowdblclick', this.onRowDblClick, this);
            }
        }
        grid.getStore().on('remove', function () {
            this.stopEditing(false);
        }, this);
        grid.on({
            scope: this,
            keydown: this.onGridKey,
            columnresize: this.verifyLayout,
            columnmove: this.refreshFields,
            reconfigure: this.refreshFields,
            destroy: this.destroy,
            bodyscroll: {
                buffer: 250,
                fn: this.positionButtons
            },
            validateedit: function (evtObj) {
                /* remover el evento para que no actualice los cambios hasta tanto
                 * no se presione guardar */
                return false;
            },
            beforeedit: function (evtObj) {
                /* remover el evento para que no active nunca la edicion del grid a menos que sea por el roweditor */
                return false;
            }
        });
        grid.getColumnModel().on('hiddenchange', this.verifyLayout, this, {delay: 1});
        grid.getView().on('refresh', this.stopEditing.createDelegate(this, []));
    },
    refreshFields: function () {
        this.initFields();
        this.verifyLayout();
    },
    isDirty: function () {
        var dirty;
        this.items.each(function (f) {
            if (String(this.values[f.id]) !== String(f.getValue())) {
                dirty = true;
                return false;
            }
        }, this);
        return dirty;
    },
    startEditing: function (rowIndex, doFocus) {
        if (typeof rowIndex == 'object') {
            rowIndex = this.grid.getStore().indexOf(rowIndex);
        }
        var g = this.grid, view = g.getView();
        var row = view.getRow(rowIndex);
        if (!Ext.isEmpty(row)) {
            this.editing = true;
            var record = g.store.getAt(rowIndex);
            if (this.fireEvent('beforeedit', this, this.grid, record, rowIndex) !== false) {
                this.record = record;
                this.recordInEdit = record;
                /* Si el record fue annadido y no editado se define como record fantasma */
                this.record.isGhostRecord = (this.record.json) ? false : !this.record.dirty;
                this.rowIndex = rowIndex;
                this.values = {};
                if (!this.rendered) {
                    this.render(view.getEditorParent());
                }

                var w = Ext.fly(row).getSize().width;
                this.setSize(w);
                if (!this.initialized) {
                    this.initFields();
                }
                var cm = g.getColumnModel(), fields = this.items.items, f, val;
                for (var i = 0; i < fields.length; i++) {
                    val = this.preEditValue(record, cm.getDataIndex(i));
                    f = fields[i];
                    if (this.fireEvent('oninitsetvalue', this, f, record) !== false) {
//                        if (f.selectedClass == 'x-combo-selected' || f.lazyRender == true) {
//                            Ext.getCmp(f.id+'').setRawValue(val);
//                        } else {
                        f.setValue(val);
//                        }
                    }
                    this.values[f.id] = val || '';
                }
                this.verifyLayout(true);
                if (!this.isVisible()) {
                    this.setPagePosition(Ext.fly(row).getXY());
                } else {
                    this.el.setXY(Ext.fly(row).getXY(), {duration: 0.15});
                }
                if (!this.isVisible()) {
                    this.show().doLayout();
                }
                if (doFocus !== false) {
                    this.doFocus.defer(this.focusDelay, this);
                }
                this.getComponent(0).focus();
            }
        }
    },
    removeAll: function (autoDestroy) {
        this.initItems();
        var item, rem = [], items = [];
        this.items.each(function (i) {
            rem.push(i);
        });
        for (var i = 0, len = rem.length; i < len; ++i) {
            item = rem[i];
            this.remove(item, autoDestroy);
            if (item.ownerCt !== this) {
                items.push(item);
            }
        }
        return items;
    },
    stopEditing: function (saveChanges) {
        this.editing = false;
        if (!this.isVisible()) {
            return;
        }
        var isValid = this.isValid();
        if (saveChanges === false || !isValid) {
            this.hide();
            this.fireEvent('canceledit', this, this.record, this.rowIndex);
            /* Si es un record que no posee ningun valor (record fantasma) se eliminar el record anadido */
            if (this.record.isGhostRecord) {
                this.grid.getSelectionModel().clearSelections();
                this.grid.getStore().remove(this.record);
            }
            return;
        }

        var changes = {}, r = this.record, hasChange = false;
        var cm = this.grid.colModel, fields = this.items.items;
        for (var i = 0, len = cm.getColumnCount(); i < len; i++) {
            if (!cm.isHidden(i)) {
                var dindex = cm.getDataIndex(i);
                var isEditable = cm.isCellEditable(i, this.rowIndex);

                if (isEditable && !Ext.isEmpty(dindex)) {
                    var oldValue = r.data[dindex];
                    if (fields[i].selectedClass == 'x-combo-selected' || fields[i].lazyRender == true) {
                        var indexVal = this.grid.getStore().find(dindex, fields[i].getValue());
                        if (indexVal != -1) {
                            var valRecord = this.grid.getStore().getAt(indexVal).data[fields[i].valueField];
                            changes[fields[i].valueField] = valRecord;
                        } else {
                            changes[fields[i].valueField] = fields[i].getValue();
                        }
                    }
                    var val = (fields[i].savedisplayField) ? fields[i].getRawValue() : fields[i].getValue();
                    var value = this.postEditValue(val, oldValue, r, dindex);
                    if (String(oldValue) !== String(value)) {
                        changes[dindex] = value;
                        hasChange = true;
                    }
                }
            }
        }

        var flagValidate = this.fireEvent('validateedit', this, this.grid, changes, r, this.rowIndex);

        if (hasChange && flagValidate !== false) {
            r.beginEdit();
            for (var k in changes) {
                if (changes.hasOwnProperty(k)) {
                    r.set(k, changes[k]);
                }
            }
            delete this.record.isGost;
            r.endEdit();
            this.fireEvent('afteredit', this, this.grid, changes, r, this.rowIndex);
        }
        if (flagValidate !== false) {
            this.hide();
        }
    },
    verifyLayout: function (force) {
        if (this.el && (this.isVisible() || force === true)) {
            var row = this.grid.getView().getRow(this.rowIndex);
            this.setSize(Ext.fly(row).getSize().width, Ext.isIE ? Ext.fly(row).getSize().height + (Ext.isBorderBox ? 9 : 0) : undefined);
            var cm = this.grid.getColumnModel(), fields = this.items.items;
            for (var i = 0, len = fields.length; i < len; i++) {
                if (!cm.isHidden(i)) {
                    var adjust = 0;
                    if (i === 0) {
                        adjust += 0; // outer padding
                    }
                    if (i === (len - 1)) {
                        adjust += 3; // outer padding
                    } else {
                        adjust += 1;
                    }
                    fields[i].show();
                    fields[i].setWidth(cm.getColumnWidth(i) - adjust);
                } else {
                    fields[i].hide();
                }
            }
            this.doLayout();
            this.positionButtons();
        }
    },
    slideHide: function () {
        this.hide();
    },
    initFields: function () {
        var cm = this.grid.getColumnModel(), pm = Ext.layout.ContainerLayout.prototype.parseMargins;
        this.removeAll(false);
        for (var i = 0, len = cm.getColumnCount(); i < len; i++) {
            var c = cm.getColumnAt(i);
            if (c.editor) { // si la columna tiene editor
                var ed = c.editor.field;
                if (!ed) {
                    ed = c.displayEditor || new Ext.form.TextField();
                }

                ed.style = 'margin-left: 2px';
                ed.setWidth(cm.getColumnWidth(i) - 2);
                ed.column = c;
                if (ed.ownerCt !== this) {
                    ed.on('focus', this.ensureVisible, this);
                    ed.on('specialkey', this.onKey, this);
                }
                this.insert(i, ed);
            }
        }
        this.initialized = true;
    },
    onKey: function (f, e) {
        if (e.getKey() === e.ENTER) {
            this.stopEditing(true);
            e.stopPropagation();
        }
    },
    onGridKey: function (e) {
        if (e.getKey() === e.ENTER && !this.isVisible()) {
            var r = this.grid.getSelectionModel().getSelected();
            if (r) {
                var index = this.grid.store.indexOf(r);
                this.startEditing(index);
                e.stopPropagation();
            }
        }
    },
    ensureVisible: function (editor) {
        if (this.isVisible()) {
            this.grid.getView().ensureVisible(this.rowIndex, this.grid.colModel.getIndexById(editor.column.id), true);
        }
    },
    onRowClick: function (g, rowIndex, e) {
        if (this.clicksToEdit == 'auto') {
            var li = this.lastClickIndex;
            this.lastClickIndex = rowIndex;
            if (li != rowIndex && !this.isVisible()) {
                return;
            }
        }
        this.startEditing(rowIndex, false);
        this.doFocus.defer(this.focusDelay, this, [e.getPoint()]);
    },
    onRowDblClick: function (grid, rowIndex, e) {
        this.startEditing(rowIndex, false);
        this.doFocus.defer(this.focusDelay, this, [e.getPoint()]);
    },
    onRender: function () {
        Ext.grid.RowEditor.superclass.onRender.apply(this, arguments);
        this.el.swallowEvent(['keydown', 'keyup', 'keypress']);

        var saveBtnConf = {
            id: 'saveBtn',
            text: this.saveText || 'Guardar',
//              iconCls: (this.iconClsSave) ? 'guardar' : 'btn',
//              cls: (this.cls) ? 'fa fa-save' : 'btn',
            minWidth: this.minButtonWidth,
            handler: this.stopEditing.createDelegate(this, [true]),
            tooltip: 'Guardar cambios'
        };

        var cancelBtnConf = {
            id: 'cancelBtn',
//              iconCls: (this.iconClsSave) ? 'cancelar' : 'btn',
//              cls: (this.cls) ? 'fa fa-times-circle-o' : 'btn',
            text: this.cancelText || 'Cancelar',
            minWidth: this.minButtonWidth,
            handler: this.stopEditing.createDelegate(this, [false]),
            tooltip: 'Cancelar edici&oacute;n'
        };

//          if(this.iconSave) {
//              saveBtnConf.icon = this.iconSave;
//          }
//
//          if(this.iconCancel) {
//              cancelBtnConf.icon = this.iconCancel;
//          }
//
//          if(this.iconCls) {
//              saveBtnConf.iconCls = this.iconClsSave || this.iconCls;
//              cancelBtnConf.iconCls = this.iconClsCancel || this.iconCls;
//          }

        this.saveBtn = new Ext.Button(saveBtnConf);
        this.cancelBtn = new Ext.Button(cancelBtnConf);

        this.btns = new Ext.Panel({
            baseCls: 'x-plain',
            cls: 'x-btns',
            elements: 'body',
            layout: 'table',
            items: [this.saveBtn, this.cancelBtn]
        });
        this.btns.render(this.bwrap);
    },
    afterRender: function () {
        Ext.grid.RowEditor.superclass.afterRender.apply(this, arguments);
        this.positionButtons();
        if (this.monitorValid) {
            this.startMonitoring();
        }
    },
    onShow: function () {
        if (this.monitorValid) {
            this.startMonitoring();
        }
        Ext.grid.RowEditor.superclass.onShow.apply(this, arguments);
    },
    onHide: function () {
        Ext.grid.RowEditor.superclass.onHide.apply(this, arguments);
        this.stopMonitoring();
        this.grid.getView().focusRow(this.rowIndex);
    },
    positionButtons: function () {
        if (this.btns) {
            var h = this.el.dom.clientHeight;
            var view = this.grid.getView();
            var scroll = view.scroller.dom.scrollLeft;
            var width = view.mainBody.getSize().width;
            var bw = this.btns.getSize().width;
            this.btns.el.shift({left: (width / 2) - (bw / 2) + scroll, top: h - 2, stopFx: true, duration: 0.2});
        }
    },
    preEditValue: function (r, field) {
        var value = r.data[field];
        return this.autoEncode && typeof value === 'string' ? Ext.util.Format.htmlDecode(value) : value;
    },
    postEditValue: function (value, originalValue, r, field) {
        return this.autoEncode && typeof value == 'string' ? Ext.util.Format.htmlEncode(value) : value;
    },
    doFocus: function (pt) {
        if (this.isVisible()) {
            var index = 0;
            if (pt) {
                index = this.getTargetColumnIndex(pt);
            }
            var cm = this.grid.getColumnModel();
            var fields = this.items.items;
            for (var i = 0; i < fields.length; i++) {
                if (fields[i].hidden) {
                    fields[i].focus();
                    break;
                }
            }
        }
    },
    getTargetColumnIndex: function (pt) {
        var grid = this.grid, v = grid.view;
        var x = pt.left;
        var cms = grid.colModel.config;
        var i = 0, match = false;
        for (var len = cms.length, c; c = cms[i]; i++) {
            if (!c.hidden) {
                if (Ext.fly(v.getHeaderCell(i)).getRegion().right >= x) {
                    match = i;
                    break;
                }
            }
        }
        return match;
    },
    startMonitoring: function () {
        if (!this.bound && this.monitorValid) {
            this.bound = true;
            Ext.TaskMgr.start({
                run: this.bindHandler,
                interval: this.monitorPoll || 200,
                scope: this
            });
        }
    },
    stopMonitoring: function () {
        this.bound = false;
    },
    isValid: function () {
        var valid = true;
        if (this.items) {
            this.items.each(function (f) {
                var value = f.getValue(),
                        regex = /^\s+$/g;
                if (!f.isValid(true)) {
                    valid = false;
                    return false;
                } else if (!f.allowBlank && (!value || regex.test(value))) {
                    valid = false;
                    f.markInvalid(f.blankText);
                }
            });
        }
        return valid;
    },
    // private
    bindHandler: function () {
        if (!this.bound) {
            return false;
        }
        var valid = this.isValid(), changes = {}, hasChange = false;
        var validateChange = (this.validateChange !== false) ? true : false;
        if (valid && validateChange) {
            Ext.each(this.items.items, function (item) {
                var field = item.column.dataIndex;
                var oldvalue = this.record.data[field];
                if (item.getValue() != oldvalue) {
                    changes[field] = oldvalue;
                    hasChange = true;
                    return false;
                }

            }, this);
        }
        this.saveBtn.setDisabled(!(validateChange ? (valid && hasChange) : valid));
        this.fireEvent('validation', this, valid, hasChange, changes);
    },
    showTooltip: function (msg) {
        var t = this.tooltip;
        if (!t) {
            t = this.tooltip = new Ext.ToolTip({
                maxWidth: 600,
                cls: 'errorTip',
                width: 300,
                title: 'Errors',
                autoHide: false,
                anchor: 'left',
                anchorToTarget: true,
                mouseOffset: [40, 0]
            });
        }
        t.initTarget(this.items.last().getEl());
        if (!t.rendered) {
            t.show();
            t.hide();
        }
        t.body.update(msg);
        t.doAutoWidth();
        t.show();
    },
    getErrorText: function () {
        var data = ['<ul>'];
        this.items.each(function (f) {
            if (!f.isValid(true)) {
                data.push('<li>', f.activeError, '</li>');
            }
        });
        data.push('</ul>');
        return data;
    },
    insertRow: function (defaultValue) {
        var arrdinamico = new Array();
        var objdinamico = {};
        for (var i = 0; i < this.grid.getStore().fields.keys.length; i++) {
            arrdinamico.push({name: this.grid.getStore().fields.keys[i]}, {type: this.grid.getStore().fields.items[i].type}, {dateFormat: this.grid.getStore().fields.items[i].dateFormat});
            if (defaultValue != undefined && defaultValue[this.grid.getStore().fields.keys[i]] != null) {
                objdinamico[this.grid.getStore().fields.keys[i]] = defaultValue[this.grid.getStore().fields.keys[i]];
            } else {
                objdinamico[this.grid.getStore().fields.keys[i]] = '';
            }
        }
        objdinamico.valid = false;
        var Recdinamico = Ext.data.Record.create(arrdinamico);
        var total = this.grid.getStore().getCount();
        this.stopEditing();
        /* BeginEdit*/
        this.recordInEdit = new Recdinamico(objdinamico);
        this.grid.getStore().insert(total, this.recordInEdit);
        this.grid.getView().refresh();
        this.grid.getSelectionModel().selectRow(total);
        this.startEditing(total);
        this.grid.getColumnModel().getCellEditor(0, total).field.focus();
        //Evento que se dispara cuando se inserta una fila
        this.fireEvent('insertrow', this, this.recordInEdit);
    },
    deleteRows: function () {
        var seleccionados = this.grid.getSelectionModel().getSelections();
        var cantseleccionados = seleccionados.length;
        if (cantseleccionados > 0) {
            for (var i = 0; i < cantseleccionados; i++) {
                this.arreliminados.push(seleccionados[i]);
                seleccionados[i].commit();
                this.grid.getStore().remove(seleccionados[i]);
            }
        } else {
            MensajeInformacion("No se ha seleccionado ning&uacute;n elemento.");
        }
    },
    undoChages: function () {
        this.arreliminados = new Array();
        this.grid.getStore().commitChanges();
        this.grid.getStore().removeAll();
        this.grid.getStore().reload();
    },
    getCurrentRecordInEdit: function () {
        return this.recordInEdit;
    },
    getChangedRecords: function () {
        var modified = this.grid.getStore().getModifiedRecords();
        var newModifieds = new Array();
        for (var j = 0, lenghtModified = modified.length; j < lenghtModified; j++) {
            newModifieds.push(modified[j].data);
        }
        var arreliminados = this.arreliminados;
        var newDeleteds = new Array();
        for (var i = 0, long = arreliminados.length; i < long; i++) {
//            if (!Ext.isEmpty(arreliminados[i].data.idnomoperaciones)) {
            newDeleteds.push(arreliminados[i].data);
//            }
        }
        var result = new Object();
        result.newModifieds = newModifieds;
        result.newDeleteds = newDeleteds;
        return result;
    }
});
Ext.reg('roweditor', Ext.grid.RowEditor);