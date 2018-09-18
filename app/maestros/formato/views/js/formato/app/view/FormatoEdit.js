/* global Ext, futureLang */
Ext.define('Formato.view.FormatoEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.formato_edit',
    layout: 'fit',
    modal: true,
    resizable: false,
    autoShow: true,
    width: 500,
    initComponent: function () {
        this.items = [Ext.create('Ext.form.Panel',{
                xtype: 'form',
                fieldDefaults: {
                    labelAlign: 'top',
                    msgTarget: 'side',
                    anchor: '100%',
                    labelWidth: 60
                },
                frame: true,
                border: false,
                bodyPadding: '5 5 0',
                items: [{
                        xtype: 'hidden',
                        name: 'idformato'
                    }, {
                        xtype: 'container',
                        anchor: '100%',
                        layout: 'hbox',
                        items: [{
                            xtype: 'container',
                            flex: 2,
                            layout: 'anchor',
                            items: [{
                                tabIndex: 1,
                                xtype: 'textfield',
                                fieldLabel: futureLang.lbFormato,
                                allowBlank: false,
                                name: 'formato',
                                anchor: '95%',
                                regex: /^([a-zA-Z\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\/\(\)\.\#\+]+ ?[a-zA-Z\s]*)+$/,
                                maskRe: /^([a-zA-Z\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\/\(\)\.\#\+]+ ?[a-zA-Z\s]*)+$/
                            }, {
                                tabIndex: 3,
                                xtype: 'combobox',
                                fieldLabel: futureLang.lbModulo,
                                name: 'idmodulo',
                                anchor: '95%',
                                store: 'Formato.store.Modulo',
                                editable: true,
                                emptyText: futureLang.lbSeleccione,
                                forceSelection: true,
                                allowBlank: false,
                                valueField: 'idmodulo',
                                displayField: 'nombre',
                                queryMode: 'local',
                                typeAhead: true,
                                selectOnFocus: true,
                                tpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '<div class="x-boundlist-item search-item"><div class="name-item">{nombre}</div><div class="desc-item">{descripcion}</div></div>',
                                    '</tpl>'
                                ),
                                displayTpl: Ext.create('Ext.XTemplate',
                                    '<tpl for=".">',
                                    '{nombre}',
                                    '</tpl>'
                                ),
                                itemSelector: 'div.search-item'
                            }]
                        }, {
                            xtype: 'container',
                            flex: 1,
                            layout: 'anchor',
                            items: [{
                                tabIndex: 2,
                                xtype: 'combobox',
                                fieldLabel: futureLang.lbSeparador,
                                name: 'separador',
                                anchor: '95%',
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['separador'],
                                    data: [
                                        {separador:'*'},
                                        {separador:'/'},
                                        {separador:'-'},
                                        {separador:':'},
                                        {separador:'|'},
                                        {separador:'.'},
                                        {separador:';'},
                                        {separador:','}
                                    ]
                                }),
                                editable: false,
                                maxLength: 1,
                                emptyText: futureLang.lbSeleccione,
                                triggerAction: 'all',
                                forceSelection: true,
                                allowBlank: false,
                                valueField: 'separador',
                                displayField: 'separador',
                                mode: 'local'
                            }, {
                                tabIndex: 4,
                                xtype: 'checkbox',
                                fieldLabel: futureLang.lbEstandar,
                                name: 'estandar',
                                anchor: '95%'
                            }]
                        }]
                    }, {
                        tabIndex: 5,
                        xtype: 'textarea',
                        fieldLabel: futureLang.lbDescripcion,
                        name: 'descripcion',
                        allowBlank: false,
                        maxLength: 255,
                        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\/\(\)\.\#\+]+ ?[a-zA-Z\s]*)+$/,
                        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\/\(\)\.\#\+]+ ?[a-zA-Z\s]*)+$/
                    }]
            })];
        this.buttons = [{
                text: Ext.lang.btnApply,
                action: 'aplicar'
            }, {
                text: Ext.lang.btnAcept,
                action: 'aceptar'
            }, {
                text: Ext.lang.btnCancel,
                action: 'cancelar',
                scope: this,
                handler: this.close
            }];
        this.callParent(arguments);
    }
});