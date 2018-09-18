/* global Ext, lMask, UIIdleTimeout, Base64 */
var dataMenu = {};
var usuario, imgSrc;

function initDesktop() {
    Ext.Ajax.request({
        url: 'loaddesktop',
        method: 'POST',
        callback: function(options, success, response) {
            if (success) {
                dataMenu = Ext.decode(response.responseText);
                getUserData();
                updateNotification();
            } else {
                lMask.hide();
                Ext.MessageBox.show({
                    title: "Fall&oacute; la carga",
                    buttons: Ext.MessageBox.OK,
                    msg: "No fue posible cargar su configuraci&oacute;n.<br> Por favor, cierre la ventana actual y entre nuevamente al sistema.</br>",
                    icon: Ext.MessageBox.ERROR
                });
            }
        }
    });
}
function getUserData() {
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
                setMenuProfile(window.perfil.nameperfil);
                MyDesktop.initApp();
                Ext.sessionTime = dataUser.sessiontime;
            }

        }
    });
}
function setMenuProfile(user) {
    if (window.perfil.base64img !== null) {
        if (window.perfil.base64img.toString().length > 0) {
            imgSrc = '"data:image/png;base64,' + window.perfil.base64img + '"';
        }
    } else {
        imgSrc = '/lib/js/Extjs/2.2/resources/images/no-picture.png';
    }
    usuario = user;
}
function getMenuButtons() {
    menuButtons = [{
            text: '<i class="fa fa-1x fa-fw fa-user"></i> &nbsp;' + futureLang.mviewperfil,
            handler: function() {
                showPerfilWindow();
            }
        }, {
            text: '<i class="fa fa-1x fa-fw fa-key"></i> &nbsp;' + futureLang.mchangepassword,
            handler: function() {
                cambiarContrasenna();
            }
        }, {
            text: '<i class="fa fa-1x fa-fw fa-home"></i> &nbsp;' + futureLang.mchangeentity,
            handler: function() {
                makeActionWindow('idw2changeentity', futureLang.mchangeentity, '/app/index/index.php/index/reindex');
            }
        }, {
            text: '<i class="fa fa-1x fa-fw fa-desktop"></i> &nbsp;' + futureLang.maparience,
            handler: function() {
                makeActionWindow('idw2aparience', futureLang.maparience, '/app/engine/index.php/engine/apariencia');
            }
        }, '-',
        {
            text: '<i class="fa fa-1x fa-fw fa-address-book"></i> &nbsp;' + futureLang.mcontact,
            handler: function() {
                makeActionWindow('idw2contact', futureLang.mcontact, '/app/engine/index.php/contacto/contacto');
            }
        }, {
            text: '<i class="fa fa-1x fa-fw fa-life-bouy"></i> &nbsp;' + futureLang.msoport,
            menu: {
                items: [
                    {
                        text: '<i class="fa fa-1x fa-fw fa-question-circle blue-button"></i> &nbsp;' + futureLang.mhelp,
                        handler: function() {
                            makeActionWindow('idw2help', futureLang.mhelp, '/app/configuracion/ayudaviewer/index.php/ayudaviewer/ayudaviewer');
                        }
                    }, {
                        text: '<i class="fa fa-1x fa-fw fa-thumbs-up warning"></i> &nbsp;' + futureLang.mrecomend,
                        handler: function() {
                            regUserRecomendation();
                        }
                    }, {
                        text: '<i class="fa fa-1x fa-fw fa-exclamation-triangle danger"></i> &nbsp;' + futureLang.mnoconf,
                        handler: function() {
                            regNonConformity();
                        }
                    }, '-',
                    {
                        text: '<i class="fa fa-1x fa-fw fa-legal danger"></i> &nbsp;' + futureLang.mlegal,
                        handler: function() {
                            makeActionWindow('idw2legal', futureLang.mlegal, '/app/engine/index.php/engine/legal');
                        }
                    }, {
                        text: '<i class="fa fa-1x fa-fw fa-exclamation-circle info"></i> &nbsp;' + futureLang.mabout,
                        handler: function() {
                            makeActionWindow('idw2about', futureLang.mabout, '/app/engine/views/scripts/engine/about.phtml');
                        }
                    }
                ]
            }
        }, '-',
        {
            text: '<i class="fa fa-1x fa-fw fa-power-off"></i> &nbsp;' + futureLang.mclosesession,
            handler: function() {
                cerrarSesion();
            }
        }];
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
            draggable: false,
            shim: false,
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
    wincambiarpass.toFront();
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
//******************************************************************************
MyDesktop = new Ext.app.App({
    init: function() {
        Ext.QuickTips.init();
    },
    getModules: function() {
        return getMenuModules();
    },
    // config for the start menu
    getStartConfig: function() {
        getMenuButtons();
        return {
            iconCls: 'user_login',
            title: futureLang.muser + usuario,
            src: imgSrc,
            toolItems: menuButtons
        };
    }
});
MyDesktop.BogusModule = Ext.extend(Ext.app.Module, {
    init: function() {
        this.launcher = {
            text: 'ddd',
            iconCls: 'bogus',
            handler: this.createWindow,
            scope: this,
            windowId: 'ddd'
        };
    },
    createWindow: function(src) {
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('win' + src.aWinConfig.idfuncionalidades);
        if (!win) {
            win = desktop.createWindow({
                id: 'win' + src.aWinConfig.idfuncionalidades,
                title: getMenuName(src.aWinConfig.label),
                layout: 'fit',
                items: new Ext.Panel({
                    id: 'iframe' + src.aWinConfig.idfuncionalidades,
                    border: false,
                    html: '<iframe id="ifContent' + src.aWinConfig.idfuncionalidades + '" style="width:100%; height: 100%; border:none;"></iframe>',
                    layout: 'fit'
                }),
                width: 800,
                maximized: true,
                height: 490,
                minWidth: 800,
                minHeight: 480,
                iconCls: 'bogus',
                shim: false,
                animCollapse: false,
                constrainHeader: true
            });
        }
        win.show();
        document.getElementById('ifContent' + src.aWinConfig.idfuncionalidades).src = src.aWinConfig.src;
    }
});
MyDesktop.BogusMenuModule = Ext.extend(MyDesktop.BogusModule, {
    init: function() {
        this.launcher = {
            text: 'asda',
            iconCls: 'bogus',
            handler: function() {
                return false;
            },
            menu: {
                items: getMenuItems(this, dataMenu)
            }
        };
    }
});
function getMenuItems(objDesk, objson) {
    var arrayItems = Array();
    if (objson && objson.length) {
        for (var i = 0; i < objson.length; i++) {
            if (objson[i].menu) {
                arrayItems[i] = {
                    text: getMenuName(objson[i].label),
                    iconCls: 'btn',
                    icon: '',
                    handler: function() {
                        return false;
                    },
                    menu: {
                        items: getMenuItems(objDesk, objson[i].menu)
                    }
                };
            }
            else {
                arrayItems[i] = {
                    text: getMenuName(objson[i].label),
                    iconCls: 'btn',
                    icon: '',
                    handler: objDesk.createWindow,
                    scope: objDesk,
                    aWinConfig: objson[i],
                    a: 'hola',
                    windowId: objson[i].id
                };
            }
        }
    }
    return arrayItems;
}
function createMenuModules(aMenu, aPos) {
    var icono = (aMenu.icono) ? aMenu.icono : 'bogus';
    var menu = 'text:\'<span style="color: #000 !important; font: 12px tahoma,arial,sans-serif;position: absolute;left: 40px !important;">' + getMenuName(aMenu.label) + '</span>\'';
    eval('MyDesktop.Subsistema' + aPos + ' = Ext.extend(MyDesktop.BogusModule, {init : function(){this.launcher = {' + menu + ',cls: "' + icono + ' fa-fw blueDark btn-menu margin-bottom margin-bottom-5' + '",icon: "",handler: function() {return false;},menu: {items:getMenuItems(this, aMenu.menu) }}}});');
}
function getMenuName(arg) {
    return eval(arg);
}
function getMenuModules() {

    var arrayModules = [];
    arrayModules = '[';
    for (var i = 0; i < dataMenu.length; i++) {
        arrayModules += (i + 1 == dataMenu.length) ? 'new MyDesktop.Subsistema' + i + '()]' : 'new MyDesktop.Subsistema' + i + '(),';
        if (dataMenu[i].menu)
            createMenuModules(dataMenu[i], i);
    }
    return eval(arrayModules);
}
function makeActionWindow(agId, agTitle, src) {
    var desktop = MyDesktop.getDesktop();
    var win = desktop.getWindow('win' + agId);
    if (!win) {
        win = desktop.createWindow({
            id: 'win' + agId,
            title: agTitle,
            layout: 'fit',
            items: new Ext.Panel({
                id: 'iframe' + agId,
                border: false,
                html: '<iframe id="ifContent' + agId + '" style="width:100%; height: 100%; border:none;"></iframe>',
                layout: 'fit'
            }),
            width: 800,
            maximized: true,
            height: 490,
            minWidth: 800,
            minHeight: 480,
            iconCls: 'bogus',
            shim: false,
            animCollapse: false,
            constrainHeader: true
        });
    }
    win.show();
    document.getElementById('ifContent' + agId).src = src;
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
        dataNotifications.text = strMessages;
        desktopMenu.updateMenu(dataNotifications);
    } else {
        strMessages += '<li><a href="#"> ' + futureLang.lbnotnew + '</a></li>';
        dataNotifications.text = strMessages;
        desktopMenu.updateMenu(dataNotifications);
    }
}

Ext.onReady(function() {
    jQuery(document).ready(function() {
        var docXml = loadXML('/comun/comun/xml/system.xml');
        var sessionTime = docXml.getElementsByTagName("sessiontime")[0].childNodes[0].nodeValue;
        UIIdleTimeout.init(sessionTime);
        initDesktop();
    });
});
