/* global Ext */
var UIIdleTimeout = function () {
    return {
        sessionTime: 840,
        //main function to initiate the module
        init: function (sessiontime) {
            this.sessionTime = sessiontime || 840;
            // cache a reference to the countdown element so we don't have to query the DOM for it on each ping.
            var $countdown;
            $('body').append('<div class="modal fade" id="idle-timeout-dialog" data-backdrop="static"><div class="modal-dialog modal-small"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Advertencia: Su sesi&oacute;n est&aacute; a punto de expirar.</h4></div><div class="modal-body"><p><i class="fa fa-fw fa-3x fa-warning warning"></i> Su sesi&oacute;n expirar&aacute; exactamente dentro de <span id="idle-timeout-counter"></span> segundos.</p><center><p>&iquest;Desea continuar?</p></center></div><div class="modal-footer"><button id="idle-timeout-dialog-keepalive" type="button" class="btn btn-primary" data-dismiss="modal">S&iacute;, Continuar</button><button id="idle-timeout-dialog-logout" type="button" class="btn btn-danger">No, Salir</button></div></div></div></div>');
            // start the idle timer plugin
            $.idleTimeout('#idle-timeout-dialog', '.modal-content button:first', {
                timeout: 30000, //30000 miliseconds = 30 seconds to timeout
                idleAfter: this.sessionTime, // 840 = 14 min 30 seconds
                pollingInterval: 180, // 300s = 5 min, 180s = 3 min
                keepAliveURL: 'updatenotifications',
                Type: 'POST',
                serverResponseEquals: 'OK',
                onCloseSession: function () {
                    Ext.Msg.wait("Recargando...", "Espere por favor");
                    Ext.Ajax.request({
                        url: 'closesession',
                        method: 'POST',
                        callback: function () {
                            Ext.MessageBox.hide();
                            window.location = '/app/index/index.php/index/index';
                        }
                    });
                },
                onTimeout: function () {
                    Ext.Ajax.request({
                        url: 'updatenotifications',
                        method: 'POST',
                        params: {displayedNotificationNum: (Ext.fly("numNotifications").dom.innerHTML) ? Ext.fly("numNotifications").dom.innerHTML : 0},
                        callback: function (options, success, response) {
                            var responseData = Ext.decode(response.responseText);
                            if (parseInt(responseData.total) > 0) {
                                var strMenuInboxEnabled = '<span class="badge badge-danger" id="numNotifications">' + responseData.total + '</span><i class="fa fa-bell"></i> Bandeja<span class="caret"></span>';
                                Ext.DomHelper.overwrite(Ext.fly('menuinbox'), strMenuInboxEnabled);
                                Ext.fly('dropdownmenuinbox').removeClass('disabled');
                                var strMessages = '';
                                for (var i = 0; i < responseData.total; i++) {
                                    var dataNotificacion = responseData.data[i];
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
                                strMessages += '<li class="divider"></li><li><a href="javascript:updateNotification()"><i class="fa fa-refresh primary"></i> Actualizar</a></li><li><a href="javascript:goToNotification()"><i class="fa fa-list-ul success"> </i> Ver todos</a></li>';
                                Ext.DomHelper.overwrite(Ext.fly('dropdownmessageinbox'), strMessages);
                            } else {
                                var strMenuInboxDisabled = '<span class="badge" id="numNotifications"> 0 </span><i class="fa fa-bell-slash"></i> Bandeja<span class="caret"></span>';
                                Ext.DomHelper.overwrite(Ext.fly('menuinbox'), strMenuInboxDisabled);
                                Ext.fly('dropdownmenuinbox').addClass('disabled');
                            }
                        }
                    });
                },
                onIdle: function () {
                    $('#idle-timeout-dialog').modal('show');
                    $countdown = $('#idle-timeout-counter');

                    $('#idle-timeout-dialog-keepalive').on('click', function () {
                        $('#idle-timeout-dialog').modal('hide');
                    });

                    $('#idle-timeout-dialog-logout').on('click', function () {
                        $('#idle-timeout-dialog').modal('hide');
                        $.idleTimeout.options.onCloseSession.call(this);
                    });
                },
                onCountdown: function (counter) {
                    $countdown.html(counter); // update the counter
                    if (counter === 1) {
                        $.idleTimeout.options.onCloseSession.call(this);
                    }
                }
            });
        }
    };
}();