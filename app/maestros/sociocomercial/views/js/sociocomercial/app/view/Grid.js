/* global Ext, singleSelect, futureLang */
Ext.define('ClientesProveedores.view.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.clienteprov_grid',
    singleSelect: this.singleSelect || true,
    store: 'ClientesProveedores.store.stClienteProv',
    initComponent: function () {
        var me = this;
        this.addEvents('expandbody');
        if (me.singleSelect) {
            me.selModel = Ext.create('Ext.selection.RowModel');
        } else {
            me.selModel = Ext.create('Ext.selection.CheckboxModel');
        }
        me.tbar = [{
                            action: 'add',
                            itemId: 'btnAdd',
                            text: futureLang.lbAdd,
                            tooltip: futureLang.lbAdd2,
                            iconCls: 'fa fa-plus bluedark-button'
                        }, {
                            action: 'mod',
                            itemId: 'btnMod',
                            text: futureLang.lbMod,
                            tooltip: futureLang.lbMod2,
                            iconCls: 'fa fa-edit bluedark-button',
                            disabled: true
                        }, {
                            action: 'del',
                            itemId: 'btnDel',
                            text: futureLang.lbDel,
                            tooltip: futureLang.lbDel2,
                            iconCls: 'fa fa-trash bluedark-button',
                            disabled: true
                        }, '-', {
                            action: 'print',
                            itemId: 'btnPrint',
                            text: futureLang.lbPrint,
                            tooltip: futureLang.lbPrint2,
                            iconCls: 'fa fa-print bluedark-button',
                            disabled: false
                        }, '->', {
                            xtype: 'searchfield',
                            id: 'sfSocioComercial',
                            store: me.store,
                            fnOnSearch: function () {
                                me.store.clearFilter(true);
                                me.store.load({params: {criterio: Ext.getCmp('sfSocioComercial').getValue()}});
                            },
                            fnOnClear: function () {
                                me.store.load({params: {criterio: Ext.getCmp('sfSocioComercial').getValue()}});
                            }
                        }];
        me.columns = [{
                header: futureLang.lbCodigoId,
                dataIndex: 'codigo'
            }, {
                header: futureLang.lbNumeroId,
                dataIndex: 'ci',
                width: 130
            }, {
                header: futureLang.lbFullName,
                dataIndex: 'nombre',
                flex: 1,
                sortable: true
            }, {
                header: futureLang.lbCtaBancaria,
                dataIndex: 'cuentabancaria',
                flex: 1
            }, {
                header: futureLang.lbCaC,
                dataIndex: 'cuentacobrar',
                flex: 1
            }, {
                header: futureLang.lbCaP,
                dataIndex: 'cuentapagar',
                flex: 1
            }, {
                header: futureLang.lbEsEmpresa,
                dataIndex: 'isempresa',
                width: 85,
                align: 'center',
                renderer: function (value, metadata, record, rowIdex, colIndex, store, view) {
                    return parseInt(value) === 1 ? futureLang.lbSi : futureLang.lbNo;
                }
            }];
        me.bbar = Ext.create('Ext.toolbar.Paging', {
            displayInfo: true,
            store: me.store
        });
        me.enableLocking = true; //esto es necesario para ue pinche el rowespander
        var plugin = new Ext.grid.plugin.RowExpander({
            ptype: 'rowexpander',
            pluginId: 'rowexpander',
            /* Poner la Foto aki en el row expander */
            rowBodyTpl: new Ext.XTemplate(
                '<table cellspacing="0" cellpadding="0" border="0" width="auto" style="padding-top: 15px">',
                '<tr>',
                '<td width="62" valign="top" height="62">',
                '<img valign="top" src=\'{foto}\' width="62" height="62" alt="FOTO">',
                '</td>',
                '<td valign="top" style="padding-left: 10px">',
                '<table cellspacing="0" cellpadding="0" border="0" style="font-size: 11px">',
                '<tr>',
                '<td valign="top" rowspan="3"><b>'+futureLang.lbDireccion+':</b></td>',
                '<td valign="top"><i>{direccion}</i></td>',
                '</tr>',
                '<tr>',
                '<td valign="top"><i>{provincia},</i> CP: <i>{codigopostal}</i></td>',
                '</tr>',
                '<tr>',
                '<td valign="top"><i>{pais}</i></td>',
                '</tr>',
                '<tr>',
                '<td valign="top"><b>'+futureLang.lbSitioWeb+':</b></td>',
                '<td valign="top"><i>{sitioweb}</i></td>',
                '</tr>',
                '</table>',
                '</td>',
                '<td valign="top" style="padding-left: 20px">',
                '<table cellspacing="0" cellpadding="0" border="0" style="font-size: 11px">',
                '<tr>',
                '<td valign="top"><b>'+futureLang.lbTelefono+':</b></td>',
                '<td valign="top"><i>{telefono}</i></td>',
                '</tr>',
                '<tr>',
                '<td valign="top"><b>'+futureLang.lbMovil+':</b></td>',
                '<td valign="top"><i>{movil}</i></td>',
                '</tr>',
                '<tr>',
                '<td valign="top"><b>'+futureLang.lbFax+':</b></td>',
                '<td valign="top"><i>{fax}</i></td>',
                '</tr>',
                '<tr>',
                '<td valign="top"><b>'+futureLang.lbCorreo+':</b></td>',
                '<td valign="top"><i>{email}</i></td>',
                '</tr>',
                '</table>',
                '</td>',
                '</tr>',
                '</table>',
                '<p><b>'+futureLang.lbDescripcion+':</b> <i>{descripcion}</i></p>',
                '<div id = \'ctos{idclientesproveedores}\'></div>'
            )
        });
        me.plugins = [plugin];
        this.callParent(arguments);
        me.getView().on({
            expandbody: function (rowNode, record, expanRow, eOpts) {
                me.fireEvent('expandbody', rowNode, record, expanRow, eOpts);
            }
        });
    }
});