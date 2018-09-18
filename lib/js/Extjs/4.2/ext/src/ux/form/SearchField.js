/* global lMask */
Ext.define('Ext.ux.form.SearchField', {
    extend: 'Ext.form.field.Trigger',
    alias: 'widget.searchfield',
    paramName: 'query',
    validationEvent: false,
    validateOnBlur: false,
    selectOnFocus: true,
    hasSearch: false,
    lbTtlElement: undefined,
    trigger1Cls: Ext.baseCSSPrefix + 'form-clear-trigger',
    trigger2Cls: Ext.baseCSSPrefix + 'form-search-trigger',
    clearTooltip: 'Limpiar filtros <strong>(Esc)</strong>',
    searchTooltip: 'Buscar datos <strong>(Enter)</strong>',
    emptyText: 'Criterio a buscar...',
    noResultsText: 'No hay resultados para mostrar.',
    fnOnClear: Ext.emptyFn,
    fnOnSearch: Ext.emptyFn,
    store: undefined,
    loader: undefined,
    width: 200,
    initComponent: function () {
        var me = this;
        if (!this.id) {
            var alreadyExist = Ext.ComponentQuery.query('div [cls*=x-form-search-trigger]');
            this.id = 'sf' + (alreadyExist.length + 1);
        }
        me.callParent(arguments);
        me.on({
            'specialkey': function (f, e) {
                    if (e.getKey() == e.ENTER || e.getKey() == 13) {
                        this.onTrigger2Click();
                    }
                    if (e.getKey() == e.ESC || e.getKey() == 27) {
                        e.stopEvent();
                        this.onTrigger1Click();
                        f.triggerBlur();
                    }
                }
        });
        
        if (Ext.isString(me.store)){
            me.store = Ext.data.StoreManager.lookup(me.store);
        }
        
        if (me.store && me.store.filters) {
            // We're going to use filtering
            me.store.remoteFilter = true;
            // Set up the proxy to encode the filter in the simplest way as a name/value pair
            // If the Store has not been *configured* with a filterParam property, then use our filter parameter name
            if (!me.store.proxy.hasOwnProperty('filterParam')) {
                me.store.proxy.filterParam = me.paramName;
            }
            me.store.proxy.encodeFilters = function (filters) {
                return filters[0].value;
            };
        }
    },
    afterRender: function () {
        this.callParent();
        this.triggerCell.item(0).setDisplayed(false);
    },
    onTrigger1Click: function () {
        var me = this;

        if (me.hasSearch) {
            me.setValue('');
            if (me.store && (me.store.filter || me.store.filters)) {
                me.store.clearFilter();
            }
            me.hasSearch = false;
            me.triggerCell.item(0).setDisplayed(false);
            me.updateLayout();
            if (typeof (me.fnOnClear) == 'function') {
                me.fnOnClear.call();
            }
        }
    },
    onTrigger2Click: function () {
        var me = this,
                value = me.getValue();

        if (value.length > 0) {
            // Param name is ignored here since we use custom encoding in the proxy.
            // id is used by the Store to replace any previous filter
            if (me.store && (me.store.filter || me.store.filters))
                me.store.filter({
                    id: me.paramName,
                    property: me.paramName,
                    value: value
                });
            me.hasSearch = true;
            me.triggerCell.item(0).setDisplayed(true);
            me.updateLayout();
            if (typeof (me.fnOnSearch) == 'function') {
                me.fnOnSearch.call();
            }
            if (me.store && me.store != undefined) {
                me.store.on({
                    'load': function (st, rc, successful, opt) {
                        opt.callback = function () {
                            if (parseInt(st.getTotalCount()) === 0) {
                                if (lMask != undefined)
                                    lMask.hide();
                                MensajeInformacion(this.noResultsText);
                            }
                        };
                    }
                });
            }
        }
    }
});