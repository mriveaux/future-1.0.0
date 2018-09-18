/* global Ext, lMask, UIIdleTimeout, Base64 */
Ext.QuickTips.init();
var dataMenu = {}, dataUser;
function getMenuBar() {
    new Ext.Viewport({
        layout: 'border',
        items: [{
                region: 'west',
                id: 'west-panel',
                title: '<i class="fa fa-list-ul"></i> ' + futureLang.tmenu,
                split: true,
                width: 220,
                minSize: 200,
                maxSize: 400,
                collapsible: true,
                margins: '50 0 5 5',
                cmargins: '50 5 5 5',
                layout: 'accordion',
                layoutConfig: {
                    animate: true
                },
                items: getAcordionMenu(dataMenu)
            }, new Ext.Panel({
                region: 'center',
                margins: '50 5 5 0',
                border: false,
                html: '<iframe id="ifContent" style="width:100%; height: 100%; border:none;"></iframe>',
                layout: 'fit'
            })
        ]
    });
    Ext.get('ifContent').dom.src = '/app/engine/views/scripts/engine/home' + getTheme() + '.html';
    lMask.hide();
}
function getAcordionMenu(agDataMenu) {
    var arrElements = Array();
    if (agDataMenu.length) {
        for (var i = 0; i < agDataMenu.length; i++) {
            if (agDataMenu[i]) {
                arrElements[i] = {
                    title: '<i class="' + agDataMenu[i].icono + ' fa-fw blueDark btn-menu margin-bottom margin-bottom-5' + '"></i> ' + getMenuName(agDataMenu[i].label),
                    autoScroll: true,
                    border: false,
                    shim: false,
                    animCollapse: false,
                    items: getTreeMenuElements(agDataMenu[i].idmodulo)
                };
            }
        }
    }
    return arrElements;
}
function getTreeMenuElements(idmodulo) {
    return new Ext.tree.TreePanel({
        autoHeight: true,
        autoScroll: true,
        rootVisible: false,
        lines: false,
        border: false,
        singleExpand: true,
        useArrows: true,
        bodyStyle: 'background-color:#FFFFFF;',
        loader: new Ext.tree.TreeLoader({
            dataUrl: 'loadfunctionalities',
            preloadChildren: false,
            baseParams: {
                idmodulo: idmodulo
            },
            listeners: {
                load: function(obj, node, response) {
                    var iterator = 0;
                    Ext.each(node.childNodes, function(e) {
                        node.childNodes[iterator].setText(getMenuName(e.attributes.label));
                        iterator++;
                    });
                }
            }
        }),
        root: new Ext.tree.AsyncTreeNode({
            expanded: true,
            id: 0
        }),
        listeners: {
            click: function(nodo) {
                if (nodo.attributes.leaf === true && nodo.attributes.src.length > 10) {
                    window.parent.perfil.currentPath = nodo.attributes.src;
                    Ext.get('ifContent').dom.src = nodo.attributes.src;
                }
            }
        }
    });
}
function loadDataModules() {
    loadMask(futureLang.msgloadmodule);
    Ext.Ajax.request({
        url: 'loadAccordionMenu',
        method: 'POST',
        callback: function(options, success, response) {
            if (success) {
                dataMenu = Ext.decode(response.responseText);
                if (dataMenu.length > 0) {
                    getMenuBar();
                    loadDataProfile();
                } else {
                    lMask.hide();
                    function btnAction(btn) {
                        window.location = '/app/index/index.php/index/index';
                    }
                    Ext.MessageBox.show({
                        title: futureLang.msgloadfailure,
                        buttons: Ext.MessageBox.OK,
                        msg: futureLang.msgloadmoduleerror,
                        icon: Ext.MessageBox.ERROR,
                        fn: btnAction
                    });
                }
            } else {
                lMask.hide();
                Ext.MessageBox.show({
                    title: futureLang.msgloadfailure,
                    buttons: Ext.MessageBox.OK,
                    msg: futureLang.msgloadmoduleerror,
                    icon: Ext.MessageBox.ERROR
                });
            }
        }
    });
}
function loadDataProfile() {
    loadMask(futureLang.msgloadperfil);
    Ext.Ajax.request({
        url: 'loaddatauser',
        method: 'POST',
        callback: function(options, success, response) {
            dataUser = Ext.decode(response.responseText);
            if (dataUser == undefined) {
                lMask.hide();
                Ext.MessageBox.show({
                    title: futureLang.msgloaduserfailure,
                    buttons: Ext.MessageBox.OK,
                    msg: futureLang.msgloadperfilerror,
                    icon: Ext.MessageBox.ERROR,
                    fn: function() {
                        window.location = '/app/index/index.php/index/index';
                    }
                });
            } else {
                window.perfil = dataUser;
                window.perfil.nameperfil = (dataUser.nameperfil !== futureLang.notperfil) ? dataUser.nameperfil : dataUser.nombre + ' ' + dataUser.apellidos;
                lMask.hide();
                getMenuProfile(window.perfil.nameperfil);
                var htmlEntidad = document.createElement("div");
                htmlEntidad.innerHTML = "<i class='fa fa-fort-awesome'></i> " + dataUser.entidad;
                document.getElementById("entity").appendChild(htmlEntidad);
                Ext.sessionTime = dataUser.sessiontime;
            }
        }
    });
}
function getMenuName(arg) {
    return eval(arg);
}
function getMenuProfile(user) {
    if (window.perfil.base64img !== null) {
        if (window.perfil.base64img.toString().length > 0) {
            var strMenuProfile = '<img class="user-image" src="data:image/png;base64,' + window.perfil.base64img + '">' + user;
        }
    } else {
        var strMenuProfile = '<i class="fa fa-1x fa-fw fa-user-circle-o"></i>' + user + '<span class="caret"></span>';
    }
    Ext.DomHelper.overwrite(Ext.fly('usermenuprofile'), strMenuProfile);
    if (window.perfil.menu && window.perfil.menu.type == 'classic') {
        new Ext.Button({
            id: 'btnMenuProfile',
            text: strMenuProfile,
            iconCls: 'user-image',
            renderTo: 'profile-menu-location',
            menu: new Ext.menu.Menu({
                minWidth: 120,
                cls: 'aling-user-menu',
                items: [{
                        cls: 'fa fa-lg blueProfile',
                        text: '<span style="color: #000 !important; font: 14px tahoma,arial,sans-serif;">' + futureLang.lbmyperfil + '</span>',
                        handler: showPerfilWindow
                    }, {
                        cls: 'fa fa-key greenPasswd',
                        text: '<span style="color: #000 !important; font: 14px tahoma,arial,sans-serif;">' + futureLang.lbchangepassword + '</span>',
                        handler: cambiarContrasenna
                    }, {
                        cls: 'fa fa-lg violetEntity',
                        text: '<span style="color: #000 !important; font: 14px tahoma,arial,sans-serif;">' + futureLang.lbchangeentity + '</span>',
                        handler: goToChangeEntity
                    }, {
                        cls: 'fa fa-lg redExit',
                        text: '<span style="color: #000 !important; font: 14px tahoma,arial,sans-serif;">' + futureLang.lbexit + '</span>',
                        handler: cerrarSesion
                    }],
                listeners: {
                    show: function(m) {
                        m.suspendEvents();
                        m.showAt(window.innerWidth - 200, 37);
                        m.resumeEvents();
                    }
                }
            })
        });
    } else {
        if (window.perfil.notificationsIni && window.perfil.notificationsIni.total !== undefined)
            setBarNotification(window.perfil.notificationsIni);
    }

}
function cambiarContrasenna() {
    var btnaceptar = new Ext.Button({
        id: 'btnaceptar',
        text: '<i class="fa fa-check-circle green-button"></i> ' + futureLang.btnaceptar,
        handler: function() {
            cambiarpass();
        }
    });
    var tfpassword = new Ext.form.TextField({
        id: 'password',
        name: 'password',
        minLength: 8,
        maxLength: 50,
        fieldLabel: futureLang.lbactualpass,
        inputType: 'password',
        maskRe: /^[ a-zA-Z0-9\.\,\;\#\*\/\-\+\@]+$/,
        regex: /^([a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]+ ?[a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]*)+$/,
        invalidText: futureLang.lbamaskpass,
        allowBlank: false,
        width: 140
    });
    var tfnewpassword = new Ext.form.TextField({
        id: 'newpassword',
        name: 'newpassword',
        fieldLabel: futureLang.lbnewpass,
        minLength: 8,
        maxLength: 50,
        maskRe: /^[ a-zA-Z0-9\.\,\;\#\*\/\-\+\@]+$/,
        regex: /^([a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]+ ?[a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]*)+$/,
        invalidText: futureLang.lbamaskpass,
        inputType: 'password',
        allowBlank: false,
        width: 140
    });
    var tfreppassword = new Ext.form.TextField({
        id: 'reppassword',
        name: 'reppassword',
        fieldLabel: futureLang.lbconfirmpass,
        minLength: 8,
        maxLength: 50,
        maskRe: /^[ a-zA-Z0-9\.\,\;\#\*\/\-\+\@]+$/,
        regex: /^([a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]+ ?[a-zA-Z0-9\xd1\xf1\s \.\,\;\#\*\/\-\+\@]*)+$/,
        invalidText: futureLang.lbamaskpass,
        inputType: 'password',
        allowBlank: false,
        vtype: 'password',
        initialPassField: 'newpassword', // id of the initial password field
        width: 140
    });
    var pcambiarpass = new Ext.form.FormPanel({
        labelWidth: 130,
        id: 'pcambiarpass',
        border: false,
        items: [tfpassword, tfnewpassword, tfreppassword]
    });
    if (!wincambiarpass) {
        var wincambiarpass = new Ext.Window({
            animateTarget: 'btnMenuProfile',
            constrain: true,
            bodyStyle: 'padding:5px 5px 5px',
            border: false,
            title: '<i class="fa fa-key"></i> ' + futureLang.lbchangepassword,
            layout: 'fit',
            width: 320,
            height: 170,
            resizable: false,
            modal: true,
            closeAction: 'close',
            buttons: [btnaceptar,
                {
                    text: '<i class="fa fa-times-circle red-button"></i> ' + futureLang.btncancelar,
                    handler: function() {
                        wincambiarpass.close();
                    }
                }
            ],
            items: pcambiarpass
        });
    }
    pcambiarpass.getForm().reset();
    wincambiarpass.show();
    function cambiarpass() {
        if (pcambiarpass.getForm().isValid()) {
            MostrarBarraProgreso(futureLang.ttchanginpass);
            Ext.Ajax.request({
                url: 'changepasswd',
                method: 'POST',
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    Ext.MessageBox.hide();
                    if (responseData === 1) {
                        wincambiarpass.close();
                        MensajeInformacion(futureLang.msgchangepasssuccess);
                    } else if (responseData === 2) {
                        MensajeAdvertencia(futureLang.msgchangepasswrong);
                    } else {
                        wincambiarpass.close();
                        MensajeError(futureLang.msgchangepassfailure);
                    }
                },
                params: {
                    pass: hex_md5(tfpassword.getValue()), /* MD5 */
                    newpass: hex_md5(tfnewpassword.getValue()) /* MD5 */
                }
            });
        }
    }
}
function cerrarSesion() {
    function validaraccion(btn) {
        if (btn === 'ok') {
            MostrarBarraProgreso(futureLang.msggotoexit);
            Ext.Ajax.request({
                url: 'closesession',
                method: 'POST',
                callback: function() {
                    Ext.MessageBox.hide();
                    window.location = '/app/index/index.php/index/index';
                }
            });
        }
    }
    MensajeInterrogacion(futureLang.ttclosesesion, String.fromCharCode(191) + futureLang.msgclosesesion, validaraccion);
}
function showPerfilWindow() {
    var pfoto = crearpanelfoto();
    var tfNombre = new Ext.form.TextField({
        fieldLabel: futureLang.lbname,
        disabled: true,
        width: 190,
        disabledClass: 'disabled-component'
    });
    var tfUsuario = new Ext.form.TextField({
        fieldLabel: futureLang.lbuser,
        disabled: true,
        width: 190,
        disabledClass: 'disabled-component'
    });
    var tfRol = new Ext.form.TextField({
        fieldLabel: futureLang.lbrole,
        disabled: true,
        width: 190,
        disabledClass: 'disabled-component'
    });
    var tfCargo = new Ext.form.TextField({
        fieldLabel: futureLang.lbjob,
        disabled: true,
        width: 190,
        disabledClass: 'disabled-component'
    });
    var tfEntidad = new Ext.form.TextField({
        fieldLabel: futureLang.lbentity,
        disabled: true,
        width: 190,
        disabledClass: 'disabled-component'
    });
    var pdatostrabajador = new Ext.FormPanel({
        border: false,
        labelWidth: 70,
        items: [{
                layout: 'column',
                border: false,
                items: [{
                        style: 'margin: 0 0 0 10',
                        layout: 'form',
                        columnWidth: .6,
                        border: false,
                        items: [tfNombre, tfUsuario, tfRol, tfCargo, tfEntidad]
                    }, {
                        style: 'margin: 0 0 0 20',
                        columnWidth: .4,
                        id: 'padrefoto',
                        layout: 'form',
                        border: false,
                        items: pfoto
                    }]
            }]
    });
    var win = new Ext.Window({
        animateTarget: 'btnMenuProfile',
        constrain: true,
        modal: true,
        resizable: false,
        border: false,
        bodyStyle: 'padding:10px 10px 10px',
        closeAction: 'close',
        layout: 'fit',
        width: 500,
        height: 260,
        buttons: [{
                text: '<i class="fa fa-times-circle red-button"></i> ' + futureLang.btncerrar,
                handler: function() {
                    win.close();
                }
            }]
    });
    win.add(pdatostrabajador);
    win.setTitle('<i class="fa fa-user"></i> ' + futureLang.lbuserperfil);
    win.show();
    tfNombre.setValue(((dataUser.nameperfil)) ? dataUser.nameperfil : dataUser.nombre + ' ' + dataUser.apellidos);
    tfUsuario.setValue(dataUser.usuario);
    tfRol.setValue(dataUser.rol);
    tfCargo.setValue(dataUser.cargo);
    tfEntidad.setValue(dataUser.entidad);
    if (dataUser.perfil) {
        Ext.get('foto').dom.src = "data:image/jpg;base64," + dataUser.base64img;
        Ext.get('foto').dom.base64img = dataUser.base64img;
    }
}
function crearpanelfoto() {
    return new Ext.Panel({
        id: 'pFoto',
        autoHeight: true,
        autoWidth: true,
        border: false,
        autoShow: true,
        html: '<div id = "divFoto"><center><img id="foto" src="' + sin_foto() +
                '" alt="" style="cursor:pointer;border:1px solid 000; margin: 0 !important;border-radius: 5%;" height="130" width="140"/></center></div>'
    });
}
function updateNotification() {
    loadMask(futureLang.msgloadnotification);
    Ext.Ajax.request({
        url: 'updatenotifications',
        method: 'POST',
        params: {displayedNotificationNum: (!isNaN(Ext.fly("numNotifications").dom.innerHTML)) ? Ext.fly("numNotifications").dom.innerHTML : 0},
        callback: function(options, success, response) {
            var responseData = Ext.decode(response.responseText);
            if (lMask) {
                lMask.hide();
            }
            if (responseData && responseData.total !== undefined)
                setBarNotification(responseData);
        }
    });
}
function setBarNotification(dataNotifications) {
    var strMessages = '';
    if (parseInt(dataNotifications.total) > 0) {
        var strMenuInboxEnabled = '<span class="badge badge-danger" id="numNotifications">' + dataNotifications.total + '</span><i class="fa fa-bell"></i> ' + futureLang.lbbandeja + '<span class="caret"></span>';
        Ext.DomHelper.overwrite(Ext.fly('menuinbox'), strMenuInboxEnabled);
        Ext.fly('dropdownmenuinbox').removeClass('disabled');
        for (var i = 0; i < dataNotifications.total; i++) {
            var dataNotificacion = dataNotifications.data[i];
            var msgNotificacion = Ext.util.Format.ellipsis(dataNotificacion.notificacion, 15);
            var timestamp = ago(dataNotificacion.tiempo);
            var colorlabel = 'label-default';
            switch (parseInt(dataNotificacion.prioridad)) {
                case 1 :
                    colorlabel = 'label-warning';
                    break;
                case 2 :
                    colorlabel = 'label-primary';
                    break;
                case 3 :
                    colorlabel = 'label-success';
                    break;
                case 4 :
                    colorlabel = 'label-danger';
                    break;
                default :
                    colorlabel = 'label-default';
                    break;
            }
            strMessages += '<li><a href="#">' + msgNotificacion + '<span class="label ' + colorlabel + '">' + timestamp + '</span></a></li>';
        }
        strMessages += '<li class="divider"></li><li><a href="javascript:updateNotification()"><i class="fa fa-refresh primary"></i> ' + futureLang.lbupdate + '</a></li><li><a href="javascript:goToNotification()"><i class="fa fa-list-ul success"> </i> ' + futureLang.lbviewall + '</a></li>';
        Ext.DomHelper.overwrite(Ext.fly('dropdownmessageinbox'), strMessages);
    } else {
        var strMenuInboxDisabled = '<span class="badge" id="numNotifications"> 0 </span><i class="fa fa-bell-slash"></i> ' + futureLang.lbbandeja + '<span class="caret"></span>';
        Ext.DomHelper.overwrite(Ext.fly('menuinbox'), strMenuInboxDisabled);
        Ext.fly('dropdownmenuinbox').addClass('disabled');
        strMessages += '<li><a href="#"> ' + futureLang.lbnotnew + '</a></li><li class="divider"></li><li><a href="javascript:updateNotification()"><i class="fa fa-refresh primary"></i> ' + futureLang.lbupdate + '</a></li><li><a href="javascript:goToNotification()"><i class="fa fa-list-ul success"> </i> ' + futureLang.lbviewall + '</a></li>';
        Ext.DomHelper.overwrite(Ext.fly('dropdownmessageinbox'), strMessages);
    }
}
function regUserRecomendation() {
    var winUserRecomendation = new Ext.Window({
        id: 'winUserRecomendation', closeAction: 'close', layout: 'fit',
        title: '<i class="fa fa-tag"></i> ' + futureLang.ttuserrecomendation,
        animateTarget: 'navEngine',
        constrain: true, modal: true, resizable: false, border: false,
        bodyStyle: 'padding:10px/10px',
        width: 600, defaultButton: 1,
        buttons: [{
                text: '<i class="fa fa-check-circle green-button"></i> ' + futureLang.btnaceptar,
                handler: function() {
                    if (Ext.getCmp('fpUserRecomendation').getForm().isValid()) {
                        MostrarBarraProgreso(futureLang.msgregisterrecomendation);
                        var params = Ext.getCmp('fpUserRecomendation').getForm().getValues();
                        Ext.Ajax.request({
                            url: 'registerrecomendation',
                            method: 'POST',
                            params: params,
                            callback: function(options, success, response) {
                                var responseData = Ext.decode(response.responseText);
                                Ext.Msg.hide();
                                if (parseInt(responseData) === 1) {
                                    MensajeInformacion(futureLang.msgrecomendationsuccess);
                                    Ext.getCmp('fpUserRecomendation').getForm().reset();
                                    winUserRecomendation.close();
                                } else {
                                    MensajeError(futureLang.msgerror);
                                }
                            }
                        });
                    }
                }
            }, {
                text: '<i class="fa fa-times-circle red-button"></i> ' + futureLang.btncancelar,
                handler: function() {
                    winUserRecomendation.close();
                }
            }],
        items: [new Ext.FormPanel({
                frame: true, autoHeight: true,
                id: 'fpUserRecomendation', labelAlign: 'top',
                items: [{
                        layout: 'column',
                        items: [{
                                layout: 'form', anchor: '95%', columnWidth: 0.7,
                                items: new Ext.form.TextField({
                                    id: 'tfUsuario', fieldLabel: futureLang.lbuser,
                                    name: 'usuario', emptyText: futureLang.lbuser,
                                    maxLength: 255, tabIndex: 1,
                                    maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\"\-\_\(\)\.\#\,\\]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                                    regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\"\-\_\(\)\.\#\,\\]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                                    allowBlank: false, disabled: true, readOnly: true,
                                    value: perfil.nameperfil, anchor: '99%'
                                })
                            }, {
                                layout: 'form', anchor: '95%', columnWidth: 0.3,
                                items: new Ext.form.DateField({
                                    id: 'dfFecha', fieldLabel: futureLang.lbdate,
                                    name: 'fecha', format: 'd/m/Y',
                                    allowBlank: false, disabled: true, readOnly: true,
                                    value: new Date(), anchor: '99%'
                                })
                            }]
                    }, new Ext.form.TextArea({
                        id: 'taDescripcionNc', name: 'recomendacion',
                        fieldLabel: futureLang.lbrecomendation,
                        emptyText: futureLang.lbberecomend,
                        maxLength: 255, tabIndex: 2,
                        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                        allowBlank: false, anchor: '99%'
                    }), {
                        xtype: 'hidden',
                        name: 'idusuario',
                        value: dataUser.id
                    }]
            })],
        listeners: {
            show: function() {
                Ext.getCmp('taDescripcionNc').focus(false, 100);
            }
        }
    });
    winUserRecomendation.show();
    winUserRecomendation.doLayout();
}
function regNonConformity() {
    function setImagen(base64Img) {
        Ext.get('imagen').dom.src = 'data:image/jpg;base64,' + base64Img;
        Ext.get('imagen').dom.base64img = base64Img;
        var p = Ext.get('pImagen');
        Ext.get('pImagen').scale(p.getSize().width, p.getSize().heigth);
    }
    winRegImagenNc = new Ext.Window({
        id: 'winRegImagenNc',
        constrain: true,
        plain: true,
        title: futureLang.lbselectimage,
        autoHeight: true,
        border: false,
        closeAction: 'hide',
        modal: true,
        layout: 'form',
        width: 500,
        bodyStyle: 'padding: 5px',
        resizable: false,
        closable: false,
        items: new Ext.FormPanel({
            id: 'fpRegImagenNc',
            fileUpload: true,
            frame: true,
            border: false,
            buttonAlign: 'right',
            labelWidth: 30,
            items: [{
                    xtype: 'fileuploadfield',
                    width: '98%',
                    id: 'imagen',
                    emptyText: futureLang.lbemptyimage,
                    fieldLabel: futureLang.lbimage,
                    regex: /^.+\.(jpg|png|jpeg|gif)$/i,
                    regexText: futureLang.lbemptyimage,
                    name: 'imagename',
                    buttonCfg: {
                        text: '<i class="fa fa-search bluedark-button"></i> '
                    }
                }],
            buttons: [{
                    text: '<i class="fa fa-check-circle green-button"></i> ' + futureLang.btnaceptar,
                    id: 'aceptar',
                    handler: function() {
                        if (Ext.getCmp('imagen').getRawValue() == '') {
                            MensajeInformacion(futureLang.msgpleaseselect);
                        } else {
                            /* Validando si el navegador soporta FileReader */
                            if (window.File && window.FileReader && window.FileList && window.Blob) {
                                if (Ext.getCmp('imagen').fileInput.dom.files.length) {
                                    var file = Ext.getCmp('imagen').fileInput.dom.files[0];
                                    var reader = new FileReader();
                                    reader.onload = function(evt) {
                                        var fileData = evt.target.result;
                                        var bytes = new Uint8Array(fileData);
                                        var base64Img = Base64.encodeByteArray(bytes);

                                        setImagen(base64Img);
                                        Ext.getCmp('winRegImagenNc').hide();
                                    };
                                    reader.readAsArrayBuffer(file);
                                } else {
                                    MensajeInformacion(futureLang.msgpleaseselect);
                                }
                            } else {
                                if (Ext.getCmp('fpRegImagenNc').getForm().isValid()) {
                                    Ext.getCmp('fpRegImagenNc').getForm().submit({
                                        url: 'getPicture',
                                        waitMsg: 'etiquetas.lbActFot',
                                        success: function(form, action) {
                                            setImagen(action.result.base64img);
                                            Ext.getCmp('winRegImagenNc').hide();
                                        }
                                    });
                                } else {
                                    MensajeInformacion(futureLang.msgpleaseselect);
                                }
                            }
                            Ext.getCmp('imagen').reset();
                        }
                    }
                }, {
                    text: '<i class="fa fa-times-circle red-button"></i> ' + futureLang.btncancelar,
                    handler: function() {
                        Ext.getCmp('winRegImagenNc').hide();
                    }
                }]
        })
    });
    var winNonConformity = new Ext.Window({
        id: 'winNonConformity', closeAction: 'close', layout: 'fit',
        title: '<i class="fa fa-bug"></i> ' + futureLang.ttnoconformity,
        animateTarget: 'navEngine',
        constrain: true, modal: true, resizable: false, border: false,
        bodyStyle: 'padding:10px/10px',
        width: 600, defaultButton: 1,
        buttons: [{
                text: '<i class="fa fa-check-circle green-button"></i> ' + futureLang.btnaceptar,
                handler: function() {
                    if (Ext.getCmp('fpRegNonConformity').getForm().isValid()) {
                        MostrarBarraProgreso(futureLang.msgnoconformity);
                        var params = Ext.getCmp('fpRegNonConformity').getForm().getValues();
                        params.base64img = (Ext.get('imagen').dom.base64img) ? Ext.get('imagen').dom.base64img : '';
                        Ext.Ajax.request({
                            url: 'registernonconformity',
                            method: 'POST',
                            params: params,
                            callback: function(options, success, response) {
                                var responseData = Ext.decode(response.responseText);
                                Ext.Msg.hide();
                                if (parseInt(responseData) === 1) {
                                    MensajeInformacion(futureLang.msgnoconformitysuccess);
                                    Ext.getCmp('fpRegNonConformity').getForm().reset();
                                    winNonConformity.close();
                                } else {
                                    MensajeError(futureLang.msgerror);
                                }
                            }
                        });
                    }
                }
            }, {
                text: '<i class="fa fa-times-circle red-button"></i> ' + futureLang.btncancelar,
                handler: function() {
                    winNonConformity.close();
                }
            }],
        items: [new Ext.FormPanel({
                frame: true,
                autoHeight: true,
                id: 'fpRegNonConformity',
                labelAlign: 'top',
                items: [{
                        layout: 'column',
                        items: [{
                                layout: 'form',
                                anchor: '95%',
                                columnWidth: 0.7,
                                items: [new Ext.form.TextField({
                                        id: 'tfRuta',
                                        fieldLabel: futureLang.lbruta,
                                        name: 'ruta',
                                        emptyText: futureLang.lbemptyruta,
                                        maxLength: 255, tabIndex: 1,
                                        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\"\-\_\(\)\.\#\,\\]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                                        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\"\-\_\(\)\.\#\,\\]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                                        allowBlank: false,
                                        anchor: '99%'
                                    }), new Ext.form.TextArea({
                                        id: 'tadescripcion',
                                        fieldLabel: futureLang.lbdescription,
                                        emptyText: futureLang.lbdetailnc,
                                        name: 'noconformidad',
                                        maxLength: 255, tabIndex: 2,
                                        maskRe: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                                        regex: /^([a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \/\"\-\_\(\)\.\#\,]+ ?[a-zA-Z0-9\xf3\xf1\xe1\xe9\xed\xfa\xd1\xc1\xc9\xcd\xd3\xda\xfc\s \"\-\_\(\)\.\#\,]*)+$/,
                                        allowBlank: false,
                                        anchor: '99%'
                                    })]
                            }, {
                                id: 'imagenfoto',
                                layout: 'form',
                                anchor: '95%',
                                border: true,
                                frame: true,
                                columnWidth: 0.3,
                                items: new Ext.Panel({
                                    id: 'pImagen', tabIndex: 3,
                                    autoWidth: true,
                                    border: true,
                                    autoShow: true,
                                    html: '<div id = "divImagen"><center><img ext:qtip = "' + futureLang.lbclicktoselect + '" id="imagen" src="' + sin_imagennc() +
                                            '" alt="" style="cursor:pointer;border:1px solid 000; margin: 0 !important; border-radius: 3px;" minWidth="140" width="150" heigth="140" onclick="winRegImagenNc.show();" ondbclick="winRegImagenNc.show();" /></center></div>'
                                })
                            }]
                    }, {
                        xtype: 'hidden',
                        name: 'idusuario',
                        value: dataUser.id
                    }]
            })],
        listeners: {
            show: function() {
                Ext.getCmp('tfRuta').focus(false, 100);
            }
        }
    });
    winNonConformity.show();
    winNonConformity.doLayout();
}
function goToIndex() {
    Ext.get('ifContent').dom.src = '/app/engine/views/scripts/engine/home.html';
}
function goToDashboard() {
    Ext.get('ifContent').dom.src = '/app/dashboard/index.php/dashboard/dashboard';
}
function goToContact() {
    Ext.get('ifContent').dom.src = '/app/engine/index.php/contacto/contacto';
}
function goToAboutUs() {
    Ext.get('ifContent').dom.src = '/app/engine/views/scripts/engine/about.phtml';
}
function goToLegalInfo() {
    Ext.get('ifContent').dom.src = '/app/engine/index.php/engine/legal';
}
function goToHelp() {
    Ext.get('ifContent').dom.src = '/app/configuracion/ayudaviewer/index.php/ayudaviewer/ayudaviewer';
}
function goToChangeEntity() {
    Ext.get('ifContent').dom.src = "/app/index/index.php/index/reindex";
}
function showAparience() {
    Ext.get('ifContent').dom.src = "/app/engine/index.php/engine/apariencia";
}
function goToNotification() {
    Ext.get('ifContent').dom.src = "/app/soporte/index.php/soporte/notificacion";
}
function runTaskNotifications() {
    var taskNotifications = {
        run: function() {
            Ext.Ajax.request({
                url: 'updatenotifications',
                method: 'POST',
                params: {displayedNotificationNum: (!isNaN(Ext.fly("numNotifications").dom.innerHTML)) ? Ext.fly("numNotifications").dom.innerHTML : 0},
                callback: function(options, success, response) {
                    var responseData = Ext.decode(response.responseText);
                    if (lMask) {
                        lMask.hide();
                    }
                    if (responseData && responseData.total !== undefined)
                        setBarNotification(responseData);
                }
            });
        },
        interval: 180000 //180000 miliseconds = 180 seconds = 3 mins 
    };
    var runner = new Ext.util.TaskRunner();
    runner.start(taskNotifications);
}
function setMenuLang() {
    var strhome = '<span><i class="fa fa-1x fa-home"></i> ' + futureLang.mhome + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('idhomelink'), strhome);
    var strcontact = '<span><i class="fa fa-1x fa-address-book"></i> ' + futureLang.mcontact + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('idcontactlink'), strcontact);
    var strsoport = '<span><i class="fa fa-1x fa-life-bouy"></i> ' + futureLang.msoport + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('idsoportlink'), strsoport);
    var strhelp = '<span><i class="fa fa-1x fa-question-circle blue-button"></i> ' + futureLang.mhelp + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('idhelplink'), strhelp);
    var strrecomend = '<span><i class="fa fa-1x fa-thumbs-up warning"></i> ' + futureLang.mrecomend + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('idrecomendlink'), strrecomend);
    var strnoconf = '<span><i class="fa fa-1x fa-exclamation-triangle danger"></i> ' + futureLang.mnoconf + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('idnoconflink'), strnoconf);
    var strlegal = '<span><i class="fa fa-1x fa-legal danger"></i> ' + futureLang.mlegal + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('idlegallink'), strlegal);
    var strabout = '<span><i class="fa fa-1x fa-exclamation-circle info"></i> ' + futureLang.mabout + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('idaboutlink'), strabout);
    var strupdate = '<span><i class="fa fa-1x fa-refresh primary"></i> ' + futureLang.mupdate + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('idupdatelink'), strupdate);
    var strviewalll = '<span><i class="fa fa-1x fa-list-ul success"></i> ' + futureLang.mviewall + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('idviewalllink'), strviewalll);
    var strUserProfile = '<span><i class="fa fa-1x fa-fw fa-user greenlight-button"></i> ' + futureLang.mviewperfil + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('dmUserProfile'), strUserProfile);
    var strChangePasswd = '<span><i class="fa fa-1x fa-fw fa-key warning"></i> ' + futureLang.mchangepassword + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('dmChangePasswd'), strChangePasswd);
    var strChangeEntity = '<span><i class="fa fa-1x fa-fw fa-home blue-button"></i> ' + futureLang.mchangeentity + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('dmChangeEntity'), strChangeEntity);
    var strAparience = '<span><i class="fa fa-1x fa-fw fa-desktop info"></i> ' + futureLang.maparience + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('dmAparience'), strAparience);
    var strCloseSession = '<span><i class="fa fa-1x fa-fw fa-power-off danger"></i> ' + futureLang.mclosesession + '</span>';
    Ext.DomHelper.overwrite(Ext.fly('dmCloseSession'), strCloseSession);
}
Ext.onReady(function() {
    jQuery(document).ready(function() {
        $('[data-toggle="dropdown"]').dropdownHover();
        var docXml = loadXML('/comun/comun/xml/system.xml');
        var sessionTime = docXml.getElementsByTagName("sessiontime")[0].childNodes[0].nodeValue;
        UIIdleTimeout.init(sessionTime);
        loadDataModules();
        setMenuLang();
    });
});