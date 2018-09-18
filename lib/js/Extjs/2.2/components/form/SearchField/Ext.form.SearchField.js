/* global Ext */
if (!Ext.form)
    Ext.ns('Ext.form');
Ext.form.SearchField = Ext.extend(Ext.form.TwinTriggerField, {
    validationEvent: false,
    validateOnBlur: false,
    selectOnFocus: true,
    hasSearch: false,
    hideTrigger1: true,
    lbTtlElement: undefined,
    trigger1Class: 'x-form-clear-trigger',
    trigger2Class: 'x-form-search-trigger',
    clearTooltip: 'Limpiar filtros <strong>(Esc)</strong>',
    searchTooltip: 'Buscar datos <strong>(Enter)</strong>',
    searchText: 'Buscar {0} <strong>(Enter)</strong>',
    emptyText: 'Criterio a buscar...',
    noResultsText: 'No hay resultados para mostrar.',
    fnOnClear: Ext.emptyFn,
    fnOnSearch: Ext.emptyFn,
    width: 200,
    store: undefined,
    loader: undefined,
    initComponent: function (config) {
        Ext.apply(this, config);
        if (!this.id) {
            var alreadyExist = Ext.DomQuery.select('span img[class*=x-form-search-trigger]');
            this.id = 'x-form-search' + (alreadyExist.length + 1);
        }
        Ext.form.SearchField.superclass.initComponent.call(this);
        this.triggerConfig.cn[0].qtip = this.clearTooltip;
        this.triggerConfig.cn[1].qtip = (this.lbTtlElement != undefined) ? String.format(this.searchText, this.lbTtlElement) : this.searchTooltip;
        this.on({
            specialkey: {
                fn: function (f, e) {
                    if (e.getKey() == e.ENTER || e.getKey() == 13) {
                        this.onTrigger2Click();
                    }
                    if (e.getKey() == e.ESC || e.getKey() == 27) {
                        e.stopEvent();
                        this.onTrigger1Click();
                        f.triggerBlur();
                    }
                },
                scope: this
            }
        });
    },
    onTrigger1Click: function () {
        this.el.dom.value = '';
        this.blur();
        this.reset();
        if (this.hasSearch) {
            this.hasSearch = false;
            this.triggers[0].hide();
            if (typeof (this.fnOnClear) == 'function') {
                this.fnOnClear();
            }
        }
    },
    onTrigger2Click: function () {
        var v = this.getRawValue();
        if (v.length < 1) {
            this.onTrigger1Click();
            return;
        }
        this.hasSearch = true;
        this.triggers[0].show();
        if (typeof (this.fnOnSearch) == 'function') {
            this.fnOnSearch();
        }
        if (this.store && this.store != undefined) {
            this.store.on({
                'load': function (st, rc, opt) {
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
        if (this.loader && this.loader != undefined) {
            this.loader.on({
                'load': function (ld, nd, rps) {
                    var _responseData = Ext.decode(rps.responseText);
                    if (parseInt(_responseData.length) === 0)
                        MensajeInformacion(this.noResultsText);
                }
            });
        }
    }
});
Ext.reg('searchfield', Ext.form.SearchField);