/* global Ext, lMask */
if (!Ext.form)
    Ext.namespace('Ext.form');
Ext.form.MultiCombo = Ext.extend(Ext.form.ComboBox, {
    constructor: function (params) {
        this.singleSelection = false;
        this.leafSelect = true;
        this.allowBlank = false;
        this.forceSelection = true;
        this.typeAhead = true;
        this.enableKeyEvents = true;
        this.lazyRender = true;
        this.busyRequest = false;
        this.hideTbar = false;
        this.xtype = 'multicombo';
        this.fieldLabel = '';
        this.mode = 'local';
        this.triggerAction = 'all';
        this.anchor = '100%';
        this.selectedClass = '';
        this.emptyText = 'Seleccione...';
        this.blankText = 'Este campo es obligatorio.';
        this.onSelect = Ext.emptyFn;
        this.customvalues = [];
        this.values = [];
        this.buttons = [];
        this.addEvents("beforeload", "load", "loadexception", "mschange");
        if (!this.id) {
            var alreadyExist = Ext.DomQuery.select('div[id*=mcombo]');
            this.idtpl = 'mcombo' + (alreadyExist.length + 1);
        } else {
            this.idtpl = 'mcombo' + this.id;
        }
        this.tpl = '<tpl for="."><div id = \"' + this.idtpl + '\" style = \"height:' + params.listHeight + 'px; !important;\"></div></tpl>';
        this.store = new Ext.data.SimpleStore({fields: [], data: [[]]});
        if (params.store) {
            this.url = params.store.url;
        } else {
            console.log("No se ha definido un store de datos");
        }
        this.multiselect = undefined;
        this.panel = undefined;
        this.loadJs("/comun/Extjs/2.2/ext/Ext.form.SearchField.min", 'SearchField', function () {
            this.initCmp(params);
            this.initEvents();
        });
        Ext.apply(this, params || {});
        return Ext.form.MultiCombo.superclass.constructor.call(this);
    },
    initCmp: function (params) {
        var me = this;
        me.multiselect = new Ext.form.MultiSelect({
            anchor: '100%',
            store: me.store,
            xtype: "multiselect",
            name: "multiselect",
            valueField: me.valueField,
            displayField: me.displayField,
            allowBlank: me.allowBlank,
            listeners: {
                'change': function (ms, idval, val, index, hval) {
                    me.setValue(idval, val);
                    if (ms.hasValues()) {
                        me.fireEvent('select', me, {data: ms.view.store.getAt(index)}, index);
                        me.fireEvent('mschange', ms, ms.store, ms.view);
                        if (ms.store.getCount() == ms.view.getSelectedIndexes().length) {
                            me.btnDescartAll.show();
                            me.btnDescartAll.enable();
                            me.btnSelectAll.disable();
                            me.btnSelectAll.hide();
                        } else {
                            me.btnDescartAll.disable();
                            me.btnDescartAll.hide();
                            me.btnSelectAll.enable();
                            me.btnSelectAll.show();
                        }
                    }
                }
            }
        });
        me.btnSelectAll = new Ext.Button({
            text: '<i class="fa fa-check-square" style="color: #337ab7"></i>',
            style: 'margin 0 10px 0 0',
            tooltip: 'Seleccionar todos',
            disabled: false,
            scope: this,
            handler: function () {
                this.btnSelectAll.disable();
                this.btnSelectAll.hide();
                me.btnDescartAll.show();
                me.btnDescartAll.enable();
                me.setAll(me.valueField, me.displayField);
            }
        });
        me.btnDescartAll = new Ext.Button({
            text: '<i class="fa fa-check-square" style="color: #d9534f"></i>',
            tooltip: 'Descartar selecci&oacute;n',
            disabled: true,
            hidden: true,
            scope: this,
            handler: function () {
                this.btnDescartAll.disable();
                this.btnDescartAll.hide();
                me.btnSelectAll.enable();
                me.btnSelectAll.show();
                me.reset();
            }
        });
        me.panel = new Ext.form.FormPanel({
            layout: 'fit',
            bufferResize: true,
            autoScroll: true,
            tbar: me.toolBarTop = new Ext.Toolbar({
                hidden: me.hideTbar,
                items: (params.tbar != undefined) ? [params.tbar, '->', me.btnSelectAll, me.btnDescartAll] : ['->', me.btnSelectAll, me.btnDescartAll]
            }),
            items: [me.multiselect]
        });
    },
    initEvents: function () {
        var me = this;
        this.on({
            scope: me,
            expand: function (combo) {
                loadMask("Espere, por favor...");
                if (!this.panel.rendered) {
                    this.multiselect.width = (this.panel.autoScroll) ? this.getSize().width + 15 : this.getSize().width;
                    this.panel.render(this.idtpl);
                } else {
                    this.panel.doLayout();
                }
                this.panel.doLayout();
                lMask.hide();
            },
            render: function (combo) {
                this.panel.doLayout();
            }
        });
    },
    getValues: function () {
        if (this.customvalues.length) {
            if (this.customvalues.length == 1) {
                this.values = (this.singleSelection == true) ? this.customvalues[0] : this.customvalues[0].toString().split(',');
            } else if (this.customvalues[0].length > 0) {
                this.values = (this.singleSelection == true) ? this.customvalues[0] : this.customvalues;
            } else {
                this.values = [];
                this.customvalues = [];
            }
            return this.values;
        } else {
            this.values = [];
            return this.values;
        }
    },
    /* override */
    getValue: function () {
        if (this.customvalues.length) {
            return (this.singleSelection) ? this.customvalues[0] : this.customvalues;
        } else {
            this.customvalues = [];
            return '';
        }
    },
    /* override */
    setValue: function (valueField, displayField) {
        this.customvalues = Ext.isArray(valueField) ? valueField : [valueField];
        if (displayField) {
            displayField = Ext.isArray(displayField) ? displayField.join(', ') : displayField;
            Ext.form.MultiCombo.superclass.setValue.call(this, displayField);
        } else {
            var index = this.store.find(this.valueField, valueField);
            var value = Ext.isArray(valueField) ? valueField.join(', ') : valueField;
            if (index !== -1) {
                var record = this.store.getAt(index);
                value = record.data[this.displayField];

                if (this.displayField == '') {
                    value = '';
                    valueField = '';
                }
            } else if (displayField === undefined) {
                value = '';
                valueField = '';
            }
            Ext.form.MultiCombo.superclass.setValue.call(this, value);
        }
    },
    loadJs: function (jsSrc, id, callback) {
        var me = this;
        if (jsSrc != null) {
            var tagScript = document.createElement("script");
            tagScript.setAttribute("type", "text/javascript");
            tagScript.setAttribute("id", id);
            tagScript.setAttribute("src", jsSrc + ".js");
            tagScript.onload = function () {
                if (typeof callback === 'function') {
                    callback.apply(me);
                }
            };
            Ext.DomQuery.selectNode("body").appendChild(tagScript);
        }
    },
    loadCss: function (css) {
        var tag = document.createElement("style");
        tag.type = "text/css";
        if (tag.styleSheet)
            tag.styleSheet.cssText = css;
        else
            tag.appendChild(document.createTextNode(css));
        document.getElementsByTagName("head")[0].appendChild(tag);
    },
    /* override */
    reset: function () {
        if (this.customvalues.length > 0) {
            this.multiselect.reset();
            Ext.form.MultiCombo.superclass.reset.call(this);
            this.customvalues = [];
        }
    },
    setAll: function name(indexValue, displayValue, store) {
        var me = this;
        var st = store || this.store;
        var arrayIndex = st.collect(indexValue, false, true);
        var arrayValues = st.collect(displayValue, false, true);
//        this.setValue(arrayIndex, arrayValues);
        this.customvalues = Ext.isArray(arrayIndex) ? arrayIndex : [arrayIndex];
        Ext.form.MultiCombo.superclass.setValue.call(this, arrayValues);
        this.multiselect.setValue(arrayIndex);
        me.multiselect.fireEvent('change', me.multiselect, arrayIndex, arrayValues, -1);
    }
});
Ext.reg('multicombo', Ext.form.MultiCombo);