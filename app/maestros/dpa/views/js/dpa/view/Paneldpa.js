/* global Ext, futureLang */
Ext.define('Dpa.view.PanelDpa', {
    extend: 'Ext.form.Panel',
    alias: 'widget.panel_dpa',
    bodyPadding: 5,
    id: 'pnlDataDpa',
    disabled: true,
    title: futureLang.lbDatosDpa,
    frame: true,
    floatable: false, collapsible: true, split: true,collapsed: true,
    margins: '5 0 0 0',
    minWidth: 330,
    maxWidth: 400,
    initComponent: function () {
        Ext.apply(this, {
            width: 330,
            fieldDefaults: {
                labelAlign: 'left',
                labelWidth: 90,
                anchor: '100%',
                msgTarget: 'side',
                allowBlank: false
            },
            items: [{
                    split: true,
                    region: 'east',
                    xtype: 'fieldset',
                    title: futureLang.lbDetallesDpa,
                    defaultType: 'textfield',
                    items: [{
                            fieldLabel: futureLang.lbDenominacion,
                            name: 'text',
                            anchor: '100%',
                            width: '95%',
                            selectOnFocus: true,
                            maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/,
                            regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]+)+$/
                        }, {
                            fieldLabel: futureLang.lbCodigo,
                            name: 'codigo',
                            anchor: '100%',
                            width: '95%',
                            maskRe: /[\d\.]/i
                        }, {
                            name: 'idtipodpa',
                            xtype: 'combo',
                            fieldLabel: futureLang.lbTipoDpa,
                            queryMode: 'local',
                            store: 'Tipodpa',
                            id: 'cbTipoDpa',
                            valueField: 'idtipodpa',
                            hiddenName: 'idtipodpa',
                            displayField: 'denominacion',
                            emptyText: futureLang.lbSeleccione,
                            typeAhead: true,
                            forceSelection: true,
                            anchor: '100%',
                            width: '95%',
                            tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div data-qtip="{denominacion}" class="x-boundlist-item">{denominacion}</div>',
                                    '</tpl>'
                                    ),
                            displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{denominacion}',
                                    '</tpl>'
                                    )
                        }, {
                            xtype:'hiddenfield',
                            name: 'idpais'
                        }, {
                            xtype:'hiddenfield',
                            name: 'idpadre'
                        }, {
                            xtype:'hiddenfield',
                            name: 'id'
                        },{
                            xtype: 'radiogroup',
                            fieldLabel: futureLang.lbEstado,
                            columns: 2,
                            defaults: {
                                name: 'estado' //Each radio has the same name so the browser will make sure only one is checked at once
                            },
                            items: [{
                                    inputValue: true,
                                    boxLabel: futureLang.lbActivo
                                }, {
                                    inputValue: false,
                                    boxLabel: futureLang.lbInactivo
                                }]
                        }]
                }],
            buttons: [{
                    text: Ext.lang.btnAcept,
                    tooltip: futureLang.lbSave2,
                    action: 'save'
                }, {
                    text: Ext.lang.btnCancel,
                    tooltip: futureLang.lbReset,
                    action: 'cancel'
                }]
        });
        this.callParent(arguments);
    }
});


