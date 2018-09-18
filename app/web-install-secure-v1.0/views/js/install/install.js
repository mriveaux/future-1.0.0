/* global Ext, lMask, dirApplication */
Ext.QuickTips.init();
lMask.hide();
var regexuser = /^[ a-zA-Z0-9\.\_\-\@]+$/, regexpass = /^[ a-zA-Z0-9\.\,\;\#\*\/\-\+\@]+$/;
var cardNav = function (incr) {
    var l = Ext.getCmp('install-wizard-panel').getLayout();
    var i = l.activeItem.id.split('card-')[1];
    var next = parseInt(i) + incr;
    l.setActiveItem(next);
    Ext.getCmp('card-prev').setDisabled(next == 0);
    Ext.getCmp('card-next').setDisabled(next == 2);
    if (l.activeItem.id == 'card-1') {
        Ext.get('productname').focus();
        Ext.getCmp('card-next').setDisabled(true);
    } else if (l.activeItem.id == 'card-2') {
        Ext.get('dbname').focus();
        Ext.getCmp('card-next').setDisabled(true);
    }
};
var card = new Ext.Panel({
    id: 'install-wizard-panel',
    title: 'Instalaci&oacute;n del sistema',
    bodyStyle: 'padding:15px',
    layout: 'card',
    activeItem: 0,
    height: 430,
    width: 670,
    defaults: {
        border: false
    },
    bbar: ['->', {
            id: 'card-prev',
            text: '<i class="fa fa-chevron-circle-left bluedark-button"></i> Atr&aacute;s',
            handler: cardNav.createDelegate(this, [-1]),
            disabled: true
        }, {
            id: 'card-next',
            text: 'Siguiente <i class="fa fa-chevron-circle-right bluedark-button"></i>',
            handler: cardNav.createDelegate(this, [1])
        }],
    items: [{
            id: 'card-0',
            html: '<div class="icon-location"><img src="/lib/js/Extjs/2.2/resources/images/icon-installer.png" width="150">\n\
                            <div class="wizard-title">Bienvenido al asistente de instalaci&oacute;n</div>\n\
                            <div class="wizard-subtitle">Por favor, lea detenidamente la gu&iacute;a de instalaci&oacute;n</div>\n\
                       </div>\n\
                       <div class="instructions">\n\
                            <p>Antes de empezar es necesario alguna información de la base de datos. Usted necesita saber lo siguiente antes de continuar.</p></br>\n\
                            <p>1. Nombre de la base de datos.</p>\n\
                            <p>2. Usuario de la base de datos.</p>\n\
                            <p>3. Contraseña de la base de datos.</p>\n\
                            <p>4. Servidor de la base de datos.</p></br>\n\
                            <p>Estos elementos le fueron suministrados por su proveedor de alojamiento web. Si no tiene la información necesita contactar con su proveedor antes de continuar.</p>\n\
                       </div>'
        }, {
            id: 'card-1',
            layout: 'fit',
            border: false,
            items: [{
                    layout: 'column',
                    border: false,
                    items: [{columnWidth: 1,
                            border: false,
                            html: '<div class="icon-location"><img src="/lib/js/Extjs/2.2/resources/images/icon-license.png" width="100">\n\
                                        <div class="license-title">Registro del producto</div>\n\
                                        <div class="license-subtitle">Por favor, introduzca cuidadosamente los datos del registro. Si no está <br>seguro de la información contacte al proveedor del producto.</div>\n\
                                        </div>\n\
                                        <div class="inner register">\n\
                                            <input type="text" id="productname" name="productname" placeholder="Nombre del producto" maxlength="100" onkeyup="quitInvalid(\'\productname\'\)" onMouseOver="createTooltip(\'\productname\',\'Nombre del producto\'\)">\n\
                                        </div>\n\
                                        <div class="inner register">\n\
                                            <span><input type="text" id="enterprisename" name="enterprisename" placeholder="Nombre de la empresa" maxlength="100" onkeyup="quitInvalid(\'\enterprisename\'\)" onMouseOver="createTooltip(\'\enterprisename\',\'Nombre de la empresa\'\)"></span>\n\
                                        </div></br>\n\
                                        <div class="inner register">\n\
                                            <input type="text" id="serial" name="serial" placeholder="N&uacute;mero de serie" maxlength="23" onkeyup="quitInvalid(\'\serial\'\)" onMouseOver="createTooltip(\'\serial\',\'N&uacute;mero de serie\'\)">\n\
                                        </div>\n\
                                        <div class="inner register">\n\
                                            <span><input type="text" readOnly="true" id="validtime" name="validtime" placeholder="V&aacute;lido por" /*onMouseOver="createTooltip(\'\validtime\',\'V&aacute;lido por\'\)"*/></span>\n\
                                        </div></br>\n\
                                        <div class="inner register">\n\
                                            <input type="text" readOnly="true" id="registerdate" name="registerdate" placeholder="Fecha de registro" /*onMouseOver="createTooltip(\'\registerdate\',\'Fecha de registro\'\)"*/>\n\
                                        </div>\n\
                                        <div class="inner register">\n\
                                            <span><input type="text" readOnly="true" id="endtime" name="endtime" placeholder="Fecha de caducidad" onMouseOver="createTooltip(\'\endtime\',\'Fecha de caducidad\'\)"></span>\n\
                                        </div></br>\n\
                                        <div class="inner">\n\
                                            <button type="submit" class="btn btn-primary" onclick="validateRegister(false)"><i class="fa fa-check"></i> Verificar</button>\n\
                                        </div>\n\
                                        <div class="inner">\n\
                                            <button type="submit" class="btn btn-primary btn-save" onclick="validateRegister(true)"><i class="fa fa-registered"></i> Registrar</button>\n\
                                        </div>'
                        }]
                }]
        }, {
            id: 'card-2',
            layout: 'fit',
            border: false,
            items: [{
                    layout: 'column',
                    border: false,
                    items: [{columnWidth: 1,
                            border: false,
                            html: '<div class="instructions"><p>A continuación debe introducir los datos para la conexión a su base de datos. Si no está seguro de esta información contacte con su proveedor de alojamiento web.</p></div></br>\n\
                                        <div class="inner">\n\
                                            <input id="dbname" name="dbname" placeholder="Nombre base de datos" maxlength="30" onkeyup="quitInvalid(\'\dbname\'\)" type="text" maxlength="20">\n\
                                        </div>\n\
                                        <div class="inner">\n\
                                            <label> Nombre de la base de datos que quiere utilizar. </label>\n\
                                        </div></br>\n\
                                        <div class="inner">\n\
                                            <input id="dbuser" name="dbuser" placeholder="Usuario" maxlength="30" onkeyup="quitInvalid(\'\dbuser\'\)" onkeypress="if (event.charCode != 0) return maskReg(event.charCode, regexuser)" type="text" maxlength="20">\n\
                                        </div>\n\
                                        <div class="inner">\n\
                                            <label> Nombre de usuario de su base de datos. </label>\n\
                                        </div></br>\n\
                                        <div class="inner">\n\
                                            <input id="dbpass" name="dbpass" placeholder="Contrase&ntilde;a" maxlength="50" onkeyup="quitInvalid(\'\dbpass\'\)" onkeypress="if (event.charCode != 0) return maskReg(event.charCode, regexpass)" type="password" maxlength="20">\n\
                                        </div>\n\
                                        <div class="inner">\n\
                                            <label> Contrase&ntilde;a de la base de datos. </label>\n\
                                        </div></br>\n\
                                        <div class="inner">\n\
                                            <input id="dbhost" name="dbhost" placeholder="Servidor base de datos" maxlength="30" onkeyup="quitInvalid(\'\dbhost\'\)" type="text" maxlength="20" value="localhost">\n\
                                        </div>\n\
                                        <div class="inner">\n\
                                            <label> Direcci&oacute;n IP del servidor de la base de datos. </label>\n\
                                        </div></br>\n\
                                        <div class="inner">\n\
                                            <input id="dbport" name="dbport" placeholder="Puerto" maxlength="4" onkeyup="quitInvalid(\'\dbport\'\)" type="text" maxlength="4" value="5432">\n\
                                        </div>\n\
                                        <div class="inner">\n\
                                            <label> Puerto de conexi&oacute;n a la base de datos. </label>\n\
                                        </div></br>\n\
                                        <div class="inner">\n\
                                            <button type="submit" class="btn btn-success" onclick="validarCampos(true)"><i aria-hidden="true" class="fa fa-check-square-o"></i> Conectar</button>\n\
                                        </div>\n\
                                        <div class="inner">\n\
                                            <button type="submit" class="btn btn-primary btn-save" onclick="validarCampos(false)">Guardar <i aria-hidden="true" class="fa fa-save"></i></button>\n\
                                        </div>'
                        }]
                }]
        }, {
            id: 'card-3',
            html: '<div class="end-wizard-title">Finalizaci&oacute;n del asistente de instalaci&oacute;n<hr></div>\n\
                    <div class="instructions">\n\
                         <p>El asistente de instalaci&oacute;n ha finalizado satisfactoriamente. Si desea utilizar la plataforma web, haga clic en la opc&oacute;n \"Probar sistema\".</p></br>\n\
                    </div>\n\
                    <div class="inner">\n\
                        <button type="submit" class="btn btn-primary" onclick="goToApplication()"><i aria-hidden="true" class="fa fa-sign-in"></i> Probar sistema </button>\n\
                    </div>'
        }]
});
card.render(Ext.get('render-wizard'));

function validarCampos(test) {
    var isValid = true;
    if (Ext.get('dbname').dom.value == '') {
        isValid = false;
        Ext.get('dbname').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
        Ext.get('dbname').focus();
    }
    if (Ext.get('dbuser').dom.value == '') {
        isValid = false;
        Ext.get('dbuser').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
        Ext.get('dbuser').focus();
    }
    if (Ext.get('dbpass').dom.value == '') {
        isValid = false;
        Ext.get('dbpass').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
        Ext.get('dbpass').focus();
    }
    if (Ext.get('dbhost').dom.value == '') {
        isValid = false;
        Ext.get('dbhost').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
        Ext.get('dbhost').focus();
    }
    if (Ext.get('dbport').dom.value == '') {
        isValid = false;
        Ext.get('dbport').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
        Ext.get('dbport').focus();
    }
    if (isValid && test) {
        testConnection();
    } else if (isValid && !test) {
        saveConnection();
    }
}
/**
 * Quita el css de campos validos
 * @param {string} idcomponent
 * @returns {undefined}
 */
function quitInvalid(idcomponent) {
    if (Ext.get(idcomponent).dom.value != '') {
        Ext.get(idcomponent).setStyle({'border-color': '#5599bb'});
    } else {
        Ext.get(idcomponent).setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
    }
}

function validateRegister(register) {
    var isValid = true;
    if (Ext.get('productname').value == '') {
        isValid = false;
        Ext.get('productname').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
        Ext.get('productname').focus();
    }
    if (Ext.get('enterprisename').dom.value == '') {
        isValid = false;
        Ext.get('enterprisename').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
        Ext.get('enterprisename').focus();
    }
    if (Ext.get('serial').dom.value == '') {
        isValid = false;
        Ext.get('serial').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
        Ext.get('serial').focus();
    }
    if (isValid && !register) {
        verifyRegister();
    } else if (isValid && register) {
        var registerValid = true;
        if (Ext.get('validtime').dom.value == '') {
            registerValid = false;
            Ext.get('validtime').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
            Ext.get('validtime').focus();
        }
        if (Ext.get('registerdate').dom.value == '') {
            registerValid = false;
            Ext.get('registerdate').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
            Ext.get('registerdate').focus();
        }
        if (Ext.get('endtime').dom.value == '') {
            registerValid = false;
            Ext.get('endtime').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
            Ext.get('endtime').focus();
        }
        if (registerValid)
            saveRegister();
    }
}
/**
 * Funcion validaCaracteres ->hace de mascara de entrada
 * @param {string} k letra presionada
 * @param {string} regex regular expresion
 * @returns {Boolean}
 */
function maskReg(k, regex) {// k=letra presionada, regex= regular expresion
    if (regex.test(String.fromCharCode(k)) == false)
        return false;
    return true;
}

function testConnection() {
    MostrarBarraProgreso('Comprobando conexi&oacute;n...');
    Ext.Ajax.request({
        url: 'testconnection',
        method: 'POST',
        callback: function (options, success, response) {
            var responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (parseInt(responseData) === 1 || responseData == true) {
                MensajeInformacion('La conexi&oacute;n fue realizada correctamente.');
            } else {
                MensajeError('No fue posible realizar la conexi&oacute;n.<br>Compruebe los datos de su configuraci&oacute;n.');
            }
        },
        params: {
            dbname: Ext.get('dbname').dom.value,
            dbuser: Ext.get('dbuser').dom.value,
            dbpass: Ext.get('dbpass').dom.value,
            dbhost: Ext.get('dbhost').dom.value,
            dbport: Ext.get('dbport').dom.value
        }
    });
}

function saveConnection() {
    MostrarBarraProgreso('Guardando conexi&oacute;n...');
    Ext.Ajax.request({
        url: 'saveconnection',
        method: 'POST',
        callback: function (options, success, response) {
            var responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (parseInt(responseData) === 1 || responseData == true) {
                MensajeInformacion('La configuraci&oacute;n de la conexi&oacute;n fue guardada correctamente.');
                var l = Ext.getCmp('install-wizard-panel').getLayout();
                l.setActiveItem(3);
                Ext.getCmp('card-prev').setVisible(false);
                Ext.getCmp('card-next').setVisible(false);
            } else {
                MensajeError('No fue posible realizar la conexi&oacute;n.<br>Compruebe los datos de su configuraci&oacute;n.');
            }
        },
        params: {
            dbname: Ext.get('dbname').dom.value,
            dbuser: Ext.get('dbuser').dom.value,
            dbpass: Ext.get('dbpass').dom.value,
            dbhost: Ext.get('dbhost').dom.value,
            dbport: Ext.get('dbport').dom.value
        }
    });
}

function verifyRegister() {
    MostrarBarraProgreso('Comprobando n&uacute;mero de serie...');
    Ext.Ajax.request({
        url: 'verifyregister',
        method: 'POST',
        callback: function (options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData.validSerial) {
                Ext.get('validtime').dom.value = responseData.validDays;
                Ext.get('registerdate').dom.value = responseData.registerDate;
                Ext.get('endtime').dom.value = responseData.endDate;
                quitInvalid('validtime');
                quitInvalid('registerdate');
                quitInvalid('endtime');
                MensajeInformacion('El n&uacute;mero de serie es v&aacute;lido.');
            } else {
                Ext.get('validtime').dom.value = '';
                Ext.get('registerdate').dom.value = '';
                Ext.get('endtime').dom.value = '';
                MensajeError('El n&uacute;mero de serie no es v&aacute;lido. Por favor, compruebe los datos suministrados por el proveedor.');
            }
        },
        params: {
            serial: Ext.get('serial').dom.value
        }
    });
}

function saveRegister() {
    MostrarBarraProgreso('Registrando producto...');
    Ext.Ajax.request({
        url: 'saveregister',
        method: 'POST',
        callback: function (options, success, response) {
            responseData = Ext.decode(response.responseText);
            Ext.MessageBox.hide();
            if (responseData == 1) {
                var l = Ext.getCmp('install-wizard-panel').getLayout();
                l.setActiveItem(2);
                MensajeInformacion('El producto fue registrado correctamente.');
            } else if (responseData == 2) {
                Ext.get('validtime').value = '';
                Ext.get('registerdate').dom.value = '';
                Ext.get('endtime').dom.value = '';
                Ext.get('serial').setStyle({'border-color': '#FF0000', 'box-shadow': '0 1px 1px rgba(255, 0, 0, 0.075) inset, 0 0 5px rgba(255, 0, 0, 0.6)'});
                Ext.get('serial').focus();
                MensajeError('El n&uacute;mero de serie no es v&aacute;lido. Por favor, compruebe los datos suministrados por el proveedor.');
            } else {
                MensajeError('Error al procesar los datos.<br>P&oacute;ngase en contacto con el administrador del sistema.');
            }
        },
        params: {
            productname: Ext.get('productname').dom.value,
            enterprisename: Ext.get('enterprisename').dom.value,
            serial: Ext.get('serial').dom.value
        }
    });
}

function goToApplication() {
    window.location = dirApplication;
}

function createTooltip(component, text) {
    return new Ext.ToolTip({
        target: component,
        autoWidth: true,
        autoHeight: true,
        maxWidth: 800,
        minWidth: 500,
        dismissDelay: 0,
        showDelay: 100,
        bodyStyle: "background-color:#d6e3f2;padding:5px 5px;border: 1px solid #5fa2dd; border-radius: 4px;",
        frame: false,
        shadow: false,
        floating: true,
        html: '<table width="100%" border="0" cellspacing="0" cellpadding="1" style="text-align: center; font-size: 12px">' +
                '<tr>' + '<td>' + text + '</td>' + '</tr></table>',
        trackMouse: true
    });
}

Ext.onReady(function () {
    card.render(Ext.get('render-wizard'));
}
);
