/* global Ext */
var lMask;
if (Ext) {
    var winExceptionDetails;
    Ext.Loader.setConfig({
    	enabled: true,
        paths:{
            'Ext.locale': '/lib/js/Extjs/4.2/lang',
            'Ext.ux': '/lib/js/Extjs/4.2/ext/src/ux',
            'Ext.comun': '/comun/PrintView/views/js',
            'Ext.Feet': '/lib/js/Extjs/4.2/components/grid/PagingToolBar'
        }
    });
    var requireCmp = ['Ext.data.Connection', 'Ext.Ajax', 'Ext.data.proxy.Ajax', 'Ext.window.MessageBox', 'Ext.LoadMask', 'Ext.form.field.VTypes', 'Ext.dom.Element', 'Ext.comun.PrintView', 'Ext.Feet.PagingToolbar'];
    Ext.require(requireCmp, function () {
        Ext.Ajax.on({
            'requestcomplete': function (conn, response, options, eOpts) {
                var respText = response.responseText;
                var respXML = response.responseXML;
                if (respText && !respXML) {
                    var responseObject = Ext.decode(respText);
                    if (responseObject != null) {
                        var code = (Ext.isNumber(responseObject.code)) ? parseInt(responseObject.code) : responseObject.code;
                        if (responseObject.code && (code === 3 || code === 4)) {
                            showMsg(code, responseObject.message, Ext.emptyFn, responseObject.details);
                        }
                    }else{
                        showMsg(3, Ext.lang.msgErrorServer);
                    }

                }
            }
        });
    });
    /**
     * A modal floating component which may be shown 
     * above a specified component while loading data.
     * @param {string} msg Message
     * @param {Ext.data.Store} store (optional)
     */
    function showMask(msg, store) {
        var config = new Object();
//        config.target = Ext.getBody();
        config.msg = msg;
        if (store) {
            config.store = Ext.data.StoreManager.lookup(store);
            lMask = new Ext.LoadMask(config);
            lMask.show();
        } else {
            Ext.getBody().mask(config.msg);
        }
    }
    /**
     * Hide the modal floating mask.
     * @param {string} id Identifier of component that is masked.
     */
    function hideMask(id) {
        if (id) {
            Ext.get(id).unmask();
        } else {
            Ext.getBody().unmask();
        }
        if (lMask)
            lMask.hide();
    }
    /**
     * Displays a message box.
     * @param {string} msg Message of update bar.
     * @param {string} ttl Title of update bar.
     */
    function loadProgress(msg, ttl) {
        Ext.Msg.show({
            title: ttl || Ext.lang.please,
            width: 300,
            progress: true,
            closable: false,
            autoHeight: true,
            wait: true,
            waitConfig: {
                interval: 60,
                duration: 50000,
                increment: 60,
                text: msg
            }
        });
    }
    /**
     * Displays a message bubble of WARNING.
     * @param {string} msg Message
     * @returns {undefined}
     */
    function MensajeAdvertencia(msg) {
        Ext.BubbleMsg.msg(Ext.lang.titles[0], msg, Ext.MessageBox.WARNING);
    }
    /**
     * Displays a message bubble of INFO.
     * @param {string} msg Message
     * @returns {undefined}
     */
    function MensajeInformacion(msg) {
        Ext.BubbleMsg.msg(Ext.lang.titles[1], msg, Ext.MessageBox.INFO);
    }
    /**
     * Displays a message box with OK and Cancel buttons
     * @param {string} ttl Title
     * @param {string} msg Message
     * @param {function} fn Callback function
     * @returns {undefined}
     */
    function MensajeInterrogacion(ttl, msg, fn) {
        Ext.Msg.show({
            title: ttl || Ext.lang.titles[2],
            buttons: Ext.Msg.OKCANCEL,
            msg: msg,
            icon: Ext.MessageBox.QUESTION,
            fn: fn
        });
    }
    /**
     * Displays a message bubble of ERROR.
     * @param {string} msg Message
     * @returns {undefined}
     */
    function MensajeError(msg) {
        Ext.BubbleMsg.msg(Ext.lang.titles[3], msg, Ext.MessageBox.ERROR);
    }
    /**
     * Show a message of notification according to the given code.<br>
     * <ul><li>0 Warning</li><li> 1 Information</li><li> 2 Question</li><li> 3 Error</li><li> 4 Exception</li></ul>
     * @param {int} code  
     * @param {string} msg Message
     * @param {function} fn
     * @param {string} details
     */
    function showMsg(code, msg, fn, details) {
        switch (code) {
            case 4:
                Ext.create('Ext.window.Window', {
                    title: Ext.lang.ttlExc,
                    modal: true, resizable: false,
                    autoHeight: true, constrain: true,
                    maximizable: true, frame: true,
                    alias: 'widget.winexception',
                    id: 'winException',
                    width: 640, buttonAlign: 'center', layout: 'fit',
                    items: {
                        xtype: 'panel', layout: 'form',
                        border: false,
                        frame: true,
                        autoHeight: true,
                        items: [{
                                layout: 'column',
                                frame: true,
                                border: false,
                                defaults: {
                                    xtype: 'panel', style: 'border:0px',
                                    border: false, frame: true
                                },
                                items: [{
                                        columnWidth: 0.1,
                                        html: '<div id="pnlException" class="exception"> <i class="fa fa-bug fa-5x danger"></i> </div>'
                                    }, {
                                        columnWidth: 0.9,
                                        html: '<div id="pnlMessage">' + msg + '</div>'
                                    }]
                            }, {
                                layout: 'form',
                                frame: true,
                                defaults: {
                                    border: false, frame: false,
                                    autoHeight: true, autoScroll: true
                                },
                                items: {
                                    xtype: 'fieldset', id: 'fsException',
                                    collapsed: true, collapsible: true,
                                    title: Ext.lang.details, html: '<div id="pnlDetails"><pre>' + details + '</pre></div>'
                                }
                            }
                        ]
                    },
                    buttons: [{
                            action: 'acept',
                            text: '<i class="fa fa-check-circle green-button"></i> <b>' + Ext.lang.lbAcept + '</b>',
                            scope: this,
                            handler: function () {
                                Ext.getCmp('winException').close();
                                if (typeof (fn) == 'function') {
                                    fn();
                                }
                            }
                        }],
                    listeners: {
                        'show': function () {
                            Ext.get("pnlMessage").dom.innerHTML = msg;
                            Ext.get("pnlDetails").dom.innerHTML = details;
                        }
                    }
                }).show();
                break;
            case 3:
                MensajeError(msg);
                break;
            case 2:
                if (typeof (msg) == 'object') {
                    var ttl = msg.title;
                    var sms = msg.message;
                    MensajeInterrogacion(ttl, sms, fn);
                } else {
                    if (fn !== null && (typeof (fn) == 'function' || typeof (fn) == 'object'))
                        Ext.MessageBox.show({
                            title: Ext.lang.titles[2],
                            msg: msg,
                            buttons: Ext.Msg.OKCANCEL,
                            icon: Ext.Msg.QUESTION,
                            fn: fn
                        });
                    else
                        Ext.MessageBox.show({
                            title: Ext.lang.titles[2],
                            msg: msg,
                            buttons: Ext.Msg.OKCANCEL,
                            icon: Ext.Msg.QUESTION
                        });
                }
                break;
            case 1:
                MensajeInformacion(msg);
                break;
            case 0:
                MensajeAdvertencia(msg);
                break;
            default:
                if (fn !== null && (typeof (fn) == 'function' || typeof (fn) == 'object')) {
                    var winButtons = new Array(Ext.Msg.OK, Ext.Msg.OKCANCEL, Ext.Msg.OK);
                    var winIcons = new Array(Ext.Msg.INFO, Ext.Msg.QUESTION, Ext.Msg.ERROR);
                    Ext.MessageBox.show({
                        title: Ext.lang.titles[code - 2],
                        msg: msg,
                        buttons: winButtons[code - 1],
                        icon: winIcons[code - 1],
                        fn: fn
                    });
                } else
                    MensajeInformacion(msg);
        }
    }

    if (Ext.form && Ext.form.field) {
        Ext.apply(Ext.form.field.VTypes, {
            /**
             * Validate a range of dates.
             * @param {date} val
             * @param {Ext.form.DateField} field
             * @returns {Boolean} If the range of dates are not right.
             */
            daterange: function (val, field) {
                var date = field.parseDate(val);
                if (!date) {
                    return;
                }
                if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
                    var start = Ext.getCmp(field.startDateField);
                    start.setMaxValue(date);
                    start.validate();
                    this.dateRangeMax = date;
                } else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
                    var end = Ext.getCmp(field.endDateField);
                    end.setMinValue(date);
                    end.validate();
                    this.dateRangeMin = date;
                }
                return true;
            },
            /**
             * Validate the sames password.
             * @param {string} val
             * @param {Ext.form.TextField} field
             * @returns {Boolean} If the passwods are not right.
             */
            password: function (val, field) {
                if (field.initialPassField) {
                    var comparepass = Ext.getCmp(field.initialPassField);
                    return (val == comparepass.getValue());
                }
                return true;
            },
            passwordText: 'La contrase&ntilde;a no coincide',
            /**
             * Validate a correct numeric IP address.
             * @param {string} val
             * @returns {Boolean} If the IP address is not right.
             */
            IPAddress: function (val) {
                return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(val);
            },
            IPAddressText: 'Debe ser una direcci&oacute;n IP v&aacute;lida con el formato "127.0.0.1"',
            IPAddressMask: /[\d\.]/i,
            /**
             * Validate that the telephone(s) is/are correct.
             * @param {string} val
             * @returns {Boolean} If the telephone is/are not right.
             */
            phones: function (val) {
                return /^(\(\+\d{2,3}\))?\d{8}((\,{1}\s{0,1}(\(\+\d{2,3}\))?\d{8})+)*$/.test(val);
            },
            phonesText: 'Este campo solo admite n&uacute;meros telef&oacute;nicos, separados por coma. <strong>Ejemplos: <pre>(+53)78352266, 22637945</pre></strong>',
            phonesMask: /[\d\,\s\+\(\)]/i,
            /**
             * Validate that the email(s) is/are correct.
             * @param {string} val
             * @returns {Boolean} If the email is/are not right.
             */
            emails: function (val) {
                return /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}(((\,{1}\s{0,1})([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4})+)*$/.test(val);
            },
            emailsText: 'Este campo solo admite direcciones de correo con el formato "usuario@dominio.com" separadas por coma',
            emailsMask: /[A-Za-z0-9@\,\.\-\s]/i,
            /**
             * Validate that the time is correct.
             * @param {string} val
             * @returns {Boolean} If the time is not right.
             */
            time: function (val) {
                return /^([1-9]|1[0-9]):([0-5][0-9])(\s[a|p]m)$/i.test(val);
            },
            timeText: 'Debe ser una hora v&aacute;lida con el formato "12:34 PM"',
            timeMask: /[\d\s:amp]/i
        });
    }

    /**
     * Funcion para convertir el formato de la fecha
     * @param {type} f
     * @returns {format_Fecha.fs|String}
     */
    function format_Fecha(f) {
        if (Ext.isDate(f) == true) {
            return Ext.util.Format.date(f, 'd/m/Y');
        } else {
            var s = '/';
            if (f != null && f != '') {
                if (strpos(f, '-') != false) {
                    var fs = f.toString().split('-');
                    var result = fs[2] + s + fs[1] + s + fs[0];
                    return result;
                }
                return f;
            }
        }
    }
}
/**
 * Get the time elapsed between now and given date.
 * @param {timestamp} argTime
 * @returns {String} Time elapsed
 */
function ago(argTime) {
    var duraciones = ["60", "60", "24", "7", "4.35", "12", "10"];
    var now = Math.floor(new Date().getTime() / 1000);
    var passedTime = Math.floor(new Date(argTime).getTime() / 1000);
    var diferencia = now - passedTime;
    var j = 0;
    for (j; diferencia >= duraciones[j] && j < duraciones.length - 1; j++) {
        diferencia /= duraciones[j];
    }
    diferencia = Math.round(diferencia);

    if (diferencia != 1) {
        if (j != 5) {
            Ext.lang.periodos[j] += "s";
        } else {
            Ext.lang.periodos[j] += "es";
        }
    }

    return "hace " + diferencia + " " + Ext.lang.periodos[j];
}

/**
 * Encuentra la posici&oacute;n num&eacute;rica de la primera aparici&oacute;n del needle (aguja) en el string haystack (pajar). 
 * Si no existen coincidencias devuelve falso.
 * example: strpos('Kevin van Zonneveld', 'e', 5);<br>
 * returns: 14
 * @param {string } haystack El string en donde buscar.<br>
 * @param {string } needle puede ser un string de uno o m&aacute;s caracteres. 
 * @param {int} offset Si se espec&iacute;fica, la b&uacute;squeda iniciar&aacute; en &eacute;ste n&uacute;mero de caracteres contados desde el inicio del string
 * @returns {Number|Boolean}
 */
function strpos(haystack, needle, offset) {
    var i = (haystack + '').indexOf(needle, (offset || 0));
    return i === -1 ? false : i;
}

Ext.UiValidations = function() {
    loadProgress(Ext.lang.loadingValidations);
    Ext.Ajax.request({
        url: 'getuivalidations',
        method: 'POST',
        callback: function(options, success, response) {
            Ext.MessageBox.hide();
            var responseData = Ext.decode(response.responseText);
            if (responseData.length > 0) {
                for (var i = 0; i < responseData.length; i++) {
                    if (responseData[i].idbtn != 'no-action')
                        if (Ext.getCmp(responseData[i].idbtn))
                            Ext.getCmp(responseData[i].idbtn).setVisible(true);
                }
            }
            Ext.MessageBox.hide();
        }
    });
};