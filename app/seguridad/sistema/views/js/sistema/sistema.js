/* global Ext, lMask */
Ext.onReady(function() {
    Ext.QuickTips.init();
    new Ext.UiValidations();
    lMask.hide();
    var authOption = "";//para saber que opcion de autenticacion se marco
    var fpConfigSystem = new Ext.FormPanel({
        id: 'fpConfigSystem',
        url: 'configsystem',
        autoHeigt: true,
        autoScroll: true,
        frame: true,
        layout: 'fit',
        bodyStyle: 'padding:5px 5px 0',
        items: [{
                xtype: 'fieldset',
                title: futureLang.lbConfEntorno,
                collapsible: true,
                autoHeight: true,
                items: [{
                        layout: 'column',
                        items: [{
                                columnWidth: .25,
                                layout: 'form',
                                labelWidth: 60,
                                items: {
                                    xtype: 'radiogroup',
                                    fieldLabel: futureLang.lbEntorno,
                                    columns: 1,
                                    id: 'rgEnvironment',
                                    items: [
                                        {boxLabel: futureLang.lbProduccion, name: 'env', id: 'rProd', inputValue: 'prod'},
                                        {boxLabel: futureLang.lbPrueba, name: 'env', id: 'rTest', inputValue: 'debug'},
                                        {boxLabel: futureLang.lbDesarrollo, name: 'env', id: 'rDev', inputValue: 'dev', checked: true}
                                    ]
                                }
                            }, {
                                columnWidth: .30,
                                layout: 'form',
                                labelWidth: 150,
                                items: [{
                                        xtype: 'spinnerfield',
                                        fieldLabel: futureLang.lbTiempoSesion,
                                        id: 'sfTimeSession',
                                        name: 'timesession',
                                        maxLength: 19,
                                        allowBlank: false,
                                        maskRe: /^[0-9]$/,
                                        width: 120,
                                        incrementValue: 60,
                                        alternateIncrementValue: 60,
                                        minValue: 900,
                                        maxValue: 3600,
                                        value: 900
                                    }, {
                                        xtype: 'checkbox',
                                        checked: false,
                                        labelSeparator: '',
                                        style: 'margin-bottom: 15px',
                                        fieldLabel: futureLang.lbFrontend,
                                        name: 'frontend',
                                        id: 'cbxFrontend'
                                    }, {
                                        xtype: 'checkbox',
                                        checked: false,
                                        labelSeparator: '',
                                        style: 'margin-bottom: 15px',
                                        fieldLabel: futureLang.lbBackend,
                                        name: 'backend',
                                        id: 'cbxBackend'
                                    }]
                            }, {
                                columnWidth: .4,
                                layout: 'form',
                                labelWidth: 345,
                                items: [{
                                        xtype: 'checkbox',
                                        checked: true,
                                        labelSeparator: '',
                                        style: 'margin-bottom: 15px',
                                        fieldLabel: futureLang.lbPermitirFirebug,
                                        name: 'firebug',
                                        id: 'cbxFirebug'
                                    }]
                            }]
                    }],
                buttons: [{
                        id: 'btnSaveEnviromentConfig',
                        hidden: true,
                        text: '<i class="fa fa-save bluedark-button"></i> ' + futureLang.lbGuardar,
                        tooltip: futureLang.lbGuardarCambios,
                        handler: saveConfigEnviroment
                    }]
            }, {
                xtype: 'fieldset',
                title: futureLang.lbConfBloqueo,
                collapsible: true,
                autoHeight: true,
                items: [{
                        layout: 'column',
                        items: [{
                                columnWidth: .2,
                                layout: 'form',
                                items: [{
                                        xtype: 'checkbox',
                                        fieldLabel: futureLang.lbPorUsuario,
                                        id: 'cbxByUser',
                                        anchor: '95%',
                                        checked: false
                                    }, {
                                        xtype: 'checkbox',
                                        fieldLabel: futureLang.lbPorIp,
                                        id: 'cbxByIP',
                                        anchor: '95%',
                                        checked: false
                                    }]
                            }, {
                                columnWidth: .25,
                                layout: 'form',
                                items: [{
                                        xtype: 'spinnerfield',
                                        fieldLabel: futureLang.lbIntentos,
                                        id: 'sfIntentosUser',
                                        name: 'intentosuser',
                                        anchor: '95%',
                                        maxLength: 19,
                                        allowBlank: false,
                                        maskRe: /^[0-9]$/,
                                        minValue: 3,
                                        maxValue: 5,
                                        value: 3
                                    }, {
                                        xtype: 'spinnerfield',
                                        fieldLabel: futureLang.lbIntentos,
                                        id: 'sfIntentosIP',
                                        name: 'intentosip',
                                        anchor: '95%',
                                        maxLength: 19,
                                        allowBlank: false,
                                        maskRe: /^[0-9]$/,
                                        minValue: 3,
                                        maxValue: 5,
                                        value: 3
                                    }]
                            }, {
                                columnWidth: .25,
                                layout: 'form',
                                items: [{
                                        xtype: 'combo',
                                        fieldLabel: futureLang.lbBloqueo,
                                        name: 'tipobloqueouser',
                                        anchor: '95%',
                                        emptyText: futureLang.lbSeleccione,
                                        store: new Ext.data.SimpleStore({
                                            fields: ['tipobloqueo', 'dentipo'],
                                            data: [[1, futureLang.lbPermanente], [2, futureLang.lbTemporal]]
                                        }),
                                        id: 'cbTipoBloqueoUser',
                                        mode: 'local',
                                        displayField: 'dentipo',
                                        hiddenName: 'tipobloqueo',
                                        valueField: 'tipobloqueo',
                                        typeAhead: true,
                                        forceSelection: true,
                                        triggerAction: 'all',
                                        selectOnFocus: true,
                                        editable: false,
                                        allowBlank: false,
                                        value: 1,
                                        listeners: {
                                            'select': function(combo, record, index) {
                                            }
                                        }
                                    }, {
                                        xtype: 'combo',
                                        fieldLabel: futureLang.lbBloqueo,
                                        name: 'tipobloqueoip',
                                        anchor: '95%',
                                        emptyText: futureLang.lbSeleccione,
                                        store: new Ext.data.SimpleStore({
                                            fields: ['tipobloqueo', 'dentipo'],
                                            data: [[1, futureLang.lbPermanente], [2, futureLang.lbTemporal]]
                                        }),
                                        id: 'cbTipoBloqueoIP',
                                        mode: 'local',
                                        displayField: 'dentipo',
                                        hiddenName: 'tipobloqueo',
                                        valueField: 'tipobloqueo',
                                        typeAhead: true,
                                        forceSelection: true,
                                        triggerAction: 'all',
                                        selectOnFocus: true,
                                        editable: false,
                                        allowBlank: false,
                                        value: 1,
                                        listeners: {
                                            'select': function(combo, record, index) {
                                                (parseInt(record.data.tipobloqueo) === 2) ? Ext.getCmp('sfTimeIP').enable() : Ext.getCmp('sfTimeIP').disable();
                                            }
                                        }
                                    }]
                            }, {
                                columnWidth: .25,
                                layout: 'form',
                                items: [{
                                        xtype: 'spinnerfield',
                                        fieldLabel: futureLang.lbTiempo,
                                        id: 'sfTimeUser',
                                        name: 'timeuser',
                                        anchor: '95%',
                                        maxLength: 19,
                                        allowBlank: false,
                                        maskRe: /^[0-9]$/,
                                        incrementValue: 60,
                                        alternateIncrementValue: 60,
                                        minValue: 900,
                                        maxValue: 3600,
                                        value: 900
                                    }, {
                                        xtype: 'spinnerfield',
                                        fieldLabel: futureLang.lbTiempo,
                                        id: 'sfTimeIP',
                                        name: 'timeip',
                                        anchor: '95%',
                                        maxLength: 19,
                                        disabled: true,
                                        allowBlank: false,
                                        maskRe: /^[0-9]$/,
                                        incrementValue: 60,
                                        alternateIncrementValue: 60,
                                        minValue: 900,
                                        maxValue: 3600,
                                        value: 900
                                    }]
                            }]
                    }],
                buttons: [{
                        id: 'btnSaveLock',
                        hidden: true,
                        text: '<i class="fa fa-save bluedark-button"></i> ' + futureLang.lbGuardar,
                        tooltip: futureLang.lbGuardarCambios,
                        handler: saveConfigBlockade
                    }]
            }, {
                xtype: 'fieldset',
                id: 'fpConfigLdap',
                title: futureLang.lbConfAcceso,
                collapsible: true,
                checkboxName: 'ldapStatus',
                autoHeight: true,
                items: [{
                        xtype: 'radiogroup',
                        fieldLabel: futureLang.lbTipo,
                        columns: 3,
                        id: 'rgAccess',
                        items: [
                            {boxLabel: futureLang.lbLdap, name: 'access', id: 'rLdap', inputValue: 'ldap', checked: false,
                                listeners: {
                                    check: function(checkbox, checked) {
                                        if (checkbox.getGroupValue() == 'ldap') {
                                            Ext.getCmp('tfLdapServer').enable();
                                            Ext.getCmp('tfLdapPort').enable();
                                            Ext.getCmp('tfLoginDN').enable();
                                            Ext.getCmp('tfLdapPasswd').enable();
                                            Ext.getCmp('btnTestConfigLdap').enable();
                                            authOption = 'ldap';
                                        } else {
                                            Ext.getCmp('tfLdapServer').disable();
                                            Ext.getCmp('tfLdapPort').disable();
                                            Ext.getCmp('tfLoginDN').disable();
                                            Ext.getCmp('tfLdapPasswd').disable();
                                            Ext.getCmp('btnTestConfigLdap').disable();
                                        }
                                    }
                                }
                            },
                            {boxLabel: futureLang.lbSimple, name: 'access', id: 'rSimple', inputValue: 'simple', checked: true,
                                listeners: {
                                    check: function(checkbox, checked) {
                                        if (checkbox.getGroupValue() == 'simple') {
                                            Ext.getCmp('tfLdapServer').disable();
                                            Ext.getCmp('tfLdapPort').disable();
                                            Ext.getCmp('tfLoginDN').disable();
                                            Ext.getCmp('tfLdapPasswd').disable();
                                            Ext.getCmp('btnTestConfigLdap').disable();
                                            authOption = 'simple';
                                        } else {
                                            Ext.getCmp('tfLdapServer').enable();
                                            Ext.getCmp('tfLdapPort').enable();
                                            Ext.getCmp('tfLoginDN').enable();
                                            Ext.getCmp('tfLdapPasswd').enable();
                                            Ext.getCmp('btnTestConfigLdap').enable();
                                        }
                                    }
                                }
                            },
                            {boxLabel: futureLang.lbMixto, name: 'access', id: 'rMixed', inputValue: 'mixed', checked: false,
                                listeners: {
                                    check: function(checkbox, checked) {
                                        if (checkbox.getGroupValue() == 'mixed') {
                                            Ext.getCmp('tfLdapServer').enable();
                                            Ext.getCmp('tfLdapPort').enable();
                                            Ext.getCmp('tfLoginDN').enable();
                                            Ext.getCmp('tfLdapPasswd').enable();
                                            Ext.getCmp('btnTestConfigLdap').enable();
                                            authOption = 'mixed';
                                        } else {
                                            Ext.getCmp('tfLdapServer').disable();
                                            Ext.getCmp('tfLdapPort').disable();
                                            Ext.getCmp('tfLoginDN').disable();
                                            Ext.getCmp('tfLdapPasswd').disable();
                                            Ext.getCmp('btnTestConfigLdap').disable();
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        layout: 'column',
                        items: [{
                                columnWidth: .5,
                                layout: 'form',
                                items: [{
                                        xtype: 'textfield',
                                        fieldLabel: futureLang.lbServidor,
                                        id: 'tfLdapServer',
                                        name: 'ldapServer',
                                        anchor: '95%',
                                        emptyText: '...',
                                        allowBlank: false,
                                        maxLength: 15
//                                        vtype: 'IPAddress'
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: futureLang.lbLogindn,
                                        emptyText: '...',
                                        allowBlank: false,
                                        id: 'tfLoginDN',
                                        name: 'loginDN',
                                        anchor: '95%'
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: futureLang.lbStandardn,
                                        emptyText: '...',
                                        allowBlank: false,
                                        id: 'tfStandarDN',
                                        name: 'standarDN',
                                        anchor: '95%'
                                    }]
                            }, {
                                columnWidth: .5,
                                layout: 'form',
                                items: [{
                                        xtype: 'textfield',
                                        fieldLabel: futureLang.lbPuerto,
                                        emptyText: '...',
                                        allowBlank: false,
                                        id: 'tfLdapPort',
                                        name: 'ldapPort',
                                        anchor: '95%'
                                    }, {
                                        xtype: 'textfield',
                                        inputType: 'password',
                                        fieldLabel: futureLang.lbContrasenna,
                                        emptyText: '...',
                                        allowBlank: false,
                                        id: 'tfLdapPasswd',
                                        name: 'ldapPasswd',
                                        anchor: '95%'
                                    }]
                            }]
                    }],
                buttons: [{
                        id: 'btnTestConfigLdap',
                        hidden: true,
                        text: '<i class="fa fa-check-square-o greendark-button"></i> ' + futureLang.lbProbar,
                        tooltip: 'Comprobar los datos de la configuraci&oacute;n',
                        handler: testConfigLdap
                    }, {
                        id: 'btnSaveLdap',
                        hidden: true,
                        text: '<i class="fa fa-save bluedark-button"></i> ' + futureLang.lbGuardar,
                        tooltip: futureLang.lbGuardarCambios,
                        handler: saveConfigLdap
                    }]
            }, {
                xtype: 'fieldset',
                id: 'fpConfigSmtp',
                title: futureLang.lbConfSmtp,
                collapsible: true,
                autoHeight: true,
                labelWidth: 200,
                items: [{
                        layout: 'column',
                        items: [{
                                columnWidth: .5,
                                layout: 'form',
                                items: [{
                                        xtype: 'textfield',
                                        fieldLabel: futureLang.lbAdminName,
                                        id: 'tfSmtpName',
                                        name: 'smtpName',
                                        anchor: '95%',
                                        emptyText: '...',
                                        allowBlank: false,
                                        maxLength: 50
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: futureLang.lbEmailAdmin,
                                        emptyText: '...',
                                        allowBlank: false,
                                        id: 'tfSmtpEmail',
                                        name: 'smtpEmail',
                                        anchor: '95%'
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: futureLang.lbSmtpServer,
                                        emptyText: '...',
                                        allowBlank: false,
                                        id: 'tfSmtpServer',
                                        name: 'smtpServer',
                                        anchor: '95%'
                                    }, {
                                        xtype: 'textfield',
                                        fieldLabel: futureLang.lbPuerto,
                                        emptyText: '...',
                                        value: 25,
                                        allowBlank: false,
                                        id: 'tfSmtpPort',
                                        name: 'smtpPort',
                                        anchor: '50%'
                                    }]
                            }, {
                                columnWidth: .5,
                                layout: 'form',
                                items: [{
                                        xtype: 'textfield',
                                        fieldLabel: futureLang.lbAdminUser,
                                        emptyText: '...',
                                        allowBlank: false,
                                        id: 'tfSmtpUser',
                                        name: 'smtpUser',
                                        anchor: '95%'
                                    }, {
                                        xtype: 'textfield',
                                        inputType: 'password',
                                        fieldLabel: futureLang.lbContrasenna,
                                        emptyText: '...',
                                        allowBlank: false,
                                        id: 'tfSmtpPasswd',
                                        name: 'smtpPasswd',
                                        anchor: '95%'
                                    }]
                            }]
                    }],
                buttons: [{
                        id: 'btnTestAdminConfig',
                        hidden: true,
                        text: '<i class="fa fa-check-square-o greendark-button"></i> ' + futureLang.lbProbar,
                        tooltip: futureLang.lbProbarConf,
                        handler: testSmtpConfig
                    }, {
                        id: 'btnSavePostMail',
                        hidden: true,
                        text: '<i class="fa fa-save bluedark-button"></i> ' + futureLang.lbGuardar,
                        tooltip: futureLang.lbGuardarCambios,
                        handler: saveSmtpConfig
                    }]
            }]
    });
    new Ext.Viewport({
        layout: 'fit',
        items: [new Ext.TabPanel({
                id: 'tabview',
                region: 'center',
                margins: '50 5 5 0',
                activeTab: 0,
                border: false,
                enableTabScroll: true,
                items: [{
                        id: 'tab-params',
                        title: futureLang.lbParametros,
                        layout: 'fit',
                        frame: true,
                        autoHeigt: true,
                        autoScroll: true,
                        items: fpConfigSystem
                    }, {
                        id: 'tab-graph',
                        title: '<i class="fa fa-tachometer"></i> ' + futureLang.lbDashboard,
                        layout: 'fit',
                        autoScroll: true,
                        html: '<div id="techcomposition" style="width: 800px; height: 400px; margin: 0 auto"></div>'
                    }]
            })]
    });

    function saveConfigEnviroment() {
        var envConfig = new Object();
        envConfig.var = Ext.getCmp('rProd').getGroupValue();
        envConfig.firebug = (Ext.getCmp('cbxFirebug').getValue() == true) ? 1 : 0;
        envConfig.sessiontime = Ext.getCmp('sfTimeSession').getValue();
        envConfig.frontend = Ext.getCmp('cbxFrontend').getValue();
        envConfig.backend = Ext.getCmp('cbxBackend').getValue();
        MostrarBarraProgreso(futureLang.lbSaveConfAspect);
        Ext.Ajax.request({
            url: 'saveconfigenvironment',
            method: 'POST',
            params: envConfig,
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (parseInt(responseData) === 1) {
                    MensajeInformacion(futureLang.lbSaveConf);
                } else {
                    MensajeInformacion(futureLang.lbConfIncorrecta);
                }
            }
        });
    }
    function saveConfigBlockade() {
        var configBlock = new Object();
        configBlock.byIp = Ext.getCmp('cbxByIP').getValue();
        configBlock.byIpNumber = Ext.getCmp('sfIntentosIP').getValue();
        configBlock.byIpType = Ext.getCmp('cbTipoBloqueoIP').getValue();
        configBlock.byIpCachetime = Ext.getCmp('sfTimeIP').getValue();
        configBlock.byUser = Ext.getCmp('cbxByUser').getValue();
        configBlock.byUserNumber = Ext.getCmp('sfIntentosUser').getValue();
        configBlock.byUserType = Ext.getCmp('cbTipoBloqueoUser').getValue();
        configBlock.byUserSessiontime = Ext.getCmp('sfTimeUser').getValue();
        MostrarBarraProgreso(futureLang.lbSaveConfBloqueo);
        Ext.Ajax.request({
            url: 'saveconfigblockade',
            method: 'POST',
            params: configBlock,
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (parseInt(responseData) === 1) {
                    MensajeInformacion(futureLang.lbSaveConf);
                } else {
                    MensajeInformacion(futureLang.msgError);
                }
            }
        });
    }
    function saveConfigLdap() {
        var ldapConfig = new Object();
        ldapConfig.ldapStatus = true;
        ldapConfig.access = authOption;
        ldapConfig.ldapServer = Ext.getCmp('tfLdapServer').getValue();
        ldapConfig.ldapPort = Ext.getCmp('tfLdapPort').getValue();
        ldapConfig.ldapDN = Ext.getCmp('tfLoginDN').getValue();
        ldapConfig.standarDN = Ext.getCmp('tfStandarDN').getValue();
        ldapConfig.ldapPasswd = Ext.getCmp('tfLdapPasswd').getValue();
        if (ldapConfig.ldapServer.toString().length > 0 && ldapConfig.ldapPort.toString().length > 0
                && ldapConfig.ldapDN.toString().length > 0 && ldapConfig.ldapPasswd.toString().length > 0
                && ldapConfig.standarDN.toString().length > 0) {
            MostrarBarraProgreso(futureLang.lbSaveConfLdap);
            Ext.Ajax.request({
                url: 'saveconfigldap',
                method: 'POST',
                params: ldapConfig,
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (parseInt(responseData) === 1) {
                        MensajeInformacion(futureLang.lbSaveConf);
                    } else {
                        MensajeInformacion(futureLang.msgError);
                    }
                }
            });
        } else {
            MensajeInformacion(futureLang.lbCheckDatos);
            Ext.getCmp('fpConfigLdap').body.stopFx();
            Ext.getCmp('fpConfigLdap').body.highlight();
        }
    }
    function testConfigLdap() {
        var ldapConfig = new Object();
        ldapConfig.ldapServer = Ext.getCmp('tfLdapServer').getValue();
        ldapConfig.ldapPort = Ext.getCmp('tfLdapPort').getValue();
        ldapConfig.ldapDN = Ext.getCmp('tfLoginDN').getValue();
        ldapConfig.ldapPasswd = Ext.getCmp('tfLdapPasswd').getValue();
        if (ldapConfig.ldapServer.toString().length > 0 && ldapConfig.ldapPort.toString().length > 0
                && ldapConfig.ldapDN.toString().length > 0 && ldapConfig.ldapPasswd.toString().length > 0) {
            MostrarBarraProgreso(futureLang.lbCompConfLdap);
            Ext.Ajax.request({
                url: 'testconfigldap',
                method: 'POST',
                params: ldapConfig,
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (parseInt(responseData) === 3) {
                        MensajeInformacion(futureLang.lbNoCnxLdap);
                    }
                    if (parseInt(responseData) === 1) {
                        MensajeInformacion(futureLang.lbConfCorrecta);
                    } else {
                        MensajeInformacion(futureLang.lbConfIncorrecta);
                    }
                }
            });
        } else {
            MensajeInformacion(futureLang.lbCheckDatos);
            Ext.getCmp('fpConfigLdap').body.stopFx();
            Ext.getCmp('fpConfigLdap').body.highlight();
        }
    }
    function saveSmtpConfig() {
        var smtpConfig = new Object();
        smtpConfig.smtpName = Ext.getCmp('tfSmtpName').getValue();
        smtpConfig.smtpEmail = Ext.getCmp('tfSmtpEmail').getValue();
        smtpConfig.smtpServer = Ext.getCmp('tfSmtpServer').getValue();
        smtpConfig.smtpPort = Ext.getCmp('tfSmtpPort').getValue();
        smtpConfig.smtpUser = Ext.getCmp('tfSmtpUser').getValue();
        smtpConfig.smtpPasswd = Base64.encodeSecret(Ext.getCmp('tfSmtpPasswd').getValue(), globalAuthToken);
        if (smtpConfig.smtpName.toString().length > 0 && smtpConfig.smtpEmail.toString().length > 0
                && smtpConfig.smtpServer.toString().length > 0 && smtpConfig.smtpPort.toString().length > 0
                && smtpConfig.smtpUser.toString().length > 0 && smtpConfig.smtpPasswd.toString().length > 0) {
            MostrarBarraProgreso(futureLang.lbCompConfSmtp);
            Ext.Ajax.request({
                url: 'savesmtpconfig',
                method: 'POST',
                params: smtpConfig,
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (parseInt(responseData) === 1) {
                        MensajeInformacion(futureLang.lbSaveConf);
                    } else {
                        MensajeInformacion(futureLang.msgError);
                    }
                }
            });
        } else {
            MensajeInformacion(futureLang.lbCheckDatos);
            Ext.getCmp('fpConfigSmtp').body.stopFx();
            Ext.getCmp('fpConfigSmtp').body.highlight();
        }
    }
    function testSmtpConfig() {
        var smtpConfig = new Object();
        smtpConfig.smtpName = Ext.getCmp('tfSmtpName').getValue();
        smtpConfig.smtpEmail = Ext.getCmp('tfSmtpEmail').getValue();
        smtpConfig.smtpServer = Ext.getCmp('tfSmtpServer').getValue();
        smtpConfig.smtpPort = Ext.getCmp('tfSmtpPort').getValue();
        smtpConfig.smtpUser = Ext.getCmp('tfSmtpUser').getValue();
        smtpConfig.smtpPasswd = Base64.encodeSecret(Ext.getCmp('tfSmtpPasswd').getValue(), globalAuthToken);
        if (smtpConfig.smtpName.toString().length > 0 && smtpConfig.smtpEmail.toString().length > 0
                && smtpConfig.smtpServer.toString().length > 0 && smtpConfig.smtpPort.toString().length > 0
                && smtpConfig.smtpUser.toString().length > 0 && smtpConfig.smtpPasswd.toString().length > 0) {
            MostrarBarraProgreso(futureLang.lbCompConfSmtp);
            Ext.Ajax.request({
                url: 'testsmtpconfig',
                method: 'POST',
                params: smtpConfig,
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (parseInt(responseData) === 1) {
                        MensajeInformacion(futureLang.lbConfCorrecta);
                    } else {
                        MensajeInformacion(futureLang.lbConfIncorrecta);
                    }
                }
            });
        } else {
            MensajeInformacion(futureLang.lbCheckDatos);
            Ext.getCmp('fpConfigSmtp').body.stopFx();
            Ext.getCmp('fpConfigSmtp').body.highlight();
        }
    }
    function techComposition() {
        loadMask(futureLang.lbLoadDashboard);
        Ext.Ajax.request({
            url: 'loadtechcomposition',
            method: 'POST',
            callback: function(options, success, response) {
                responseData = Ext.decode(response.responseText);
                lMask.hide();
                var chart;
                return chart = new Highcharts.Chart({
                    chart: {
                        renderTo: 'techcomposition',
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false
                    },
                    title: {
                        text: 'Composici\xF3n del c\xF3digo fuente por tecnolog\xEDa.'
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>' + this.point.name + '</b>: ' + this.y + futureLang.lbFunct;
                        }
                    },
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                color: '#000000',
                                connectorColor: '#000000',
                                formatter: function() {
                                    return '<b>' + this.point.name + '</b>: ' + this.y + futureLang.lbFunct;
                                }
                            }
                        }
                    },
                    series: [{
                            type: 'pie',
                            name: 'Browser share',
                            data: responseData
                        }]
                });
            }
        });
    }

    (function() {
        MostrarBarraProgreso(futureLang.lbCargarConfSist);
        Ext.Ajax.request({
            url: 'loadconfigsystem',
            method: 'POST',
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText);
                Ext.MessageBox.hide();
                if (parseInt(responseData) === 1) {
                    MensajeInformacion(futureLang.lbNoCargarConfSist);
                    Ext.getCmp('fpConfigSystem').body.mask('Bloqueado');
                } else {
                    var dataSystem = responseData.data;
                    Ext.getCmp('rProd').setValue(dataSystem.environment.var );
                    Ext.getCmp('cbxFirebug').setValue(dataSystem.environment.firebug);
                    Ext.getCmp('sfTimeSession').setValue(dataSystem.environment.sessiontime);
                    Ext.getCmp('cbxFrontend').setValue(dataSystem.validation.frontend);
                    Ext.getCmp('cbxBackend').setValue(dataSystem.validation.backend);
                    Ext.getCmp('cbxByIP').setValue(dataSystem.blockadeip.ip);
                    Ext.getCmp('sfIntentosIP').setValue(dataSystem.blockadeip.number);
                    Ext.getCmp('cbTipoBloqueoIP').setValue(dataSystem.blockadeip.type);
                    Ext.getCmp('cbxByUser').setValue(dataSystem.blockadeuser.ip);
                    Ext.getCmp('sfIntentosUser').setValue(dataSystem.blockadeuser.number);
                    Ext.getCmp('cbTipoBloqueoUser').setValue(dataSystem.blockadeuser.type);
                    (parseInt(dataSystem.blockadeip.type) === 2) ? Ext.getCmp('sfTimeIP').enable() : Ext.getCmp('sfTimeIP').disable();
                    (parseInt(dataSystem.blockadeuser.type) === 2) ? Ext.getCmp('sfTimeUser').enable() : Ext.getCmp('sfTimeUser').disable();
                    Ext.getCmp('sfTimeUser').setValue(dataSystem.blockadeuser.cachetime);
                    Ext.getCmp('sfTimeIP').setValue(dataSystem.blockadeip.cachetime);
                    Ext.getCmp('rLdap').setValue((dataSystem.access.type == 'ldap') ? true : false);
                    Ext.getCmp('rSimple').setValue((dataSystem.access.type == 'simple') ? true : false);
                    Ext.getCmp('rMixed').setValue((dataSystem.access.type == 'mixed') ? true : false);
                    Ext.getCmp('tfLdapServer').setValue(dataSystem.ldap.host);
                    Ext.getCmp('tfLdapPort').setValue(dataSystem.ldap.port);
                    Ext.getCmp('tfLoginDN').setValue(dataSystem.ldap.dn);
                    Ext.getCmp('tfStandarDN').setValue(dataSystem.ldap.stdn);
                    Ext.getCmp('tfLdapPasswd').setValue(dataSystem.ldap.password);
                    if (dataSystem.access.type == 'ldap' || dataSystem.access.type == 'mixed') {
                        Ext.getCmp('tfLdapServer').enable();
                        Ext.getCmp('tfLdapPort').enable();
                        Ext.getCmp('tfLoginDN').enable();
                        Ext.getCmp('tfStandarDN').enable();
                        Ext.getCmp('tfLdapPasswd').enable();
                    } else {
                        Ext.getCmp('tfLdapServer').disable();
                        Ext.getCmp('tfLdapPort').disable();
                        Ext.getCmp('tfLoginDN').disable();
                        Ext.getCmp('tfStandarDN').disable();
                        Ext.getCmp('tfLdapPasswd').disable();
                    }
                    Ext.getCmp('tfSmtpServer').setValue(dataSystem.phpMail.smtpServer);
                    Ext.getCmp('tfSmtpPort').setValue(dataSystem.phpMail.smtpPort);
                    Ext.getCmp('tfSmtpUser').setValue(dataSystem.phpMail.smtpUser);
                    Ext.getCmp('tfSmtpPasswd').setValue(Base64.decodeString(dataSystem.phpMail.smtpPasswd));
                    Ext.getCmp('tfSmtpName').setValue(dataSystem.phpMail.smtpName);
                    Ext.getCmp('tfSmtpEmail').setValue(dataSystem.phpMail.smtpEmail);
                }
                Ext.getCmp('tabview').setActiveTab(1);
                techComposition();
            }
        });
    })();
});