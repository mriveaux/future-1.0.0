Ext.ns('Ext.Desktop');
Ext.Desktop = function(app) {
    this.taskbar = new Ext.ux.TaskBar(app);
    var taskbar = this.taskbar;

    var desktopEl = Ext.get('x-desktop');
    var taskbarEl = Ext.get('ux-taskbar');
    var shortcuts = Ext.get('x-shortcuts');

    var windows = new Ext.WindowGroup();
    var activeWindow;

    function minimizeWin(win) {
        win.minimized = true;
        win.hide();
    }

    function markActive(win) {
        if (activeWindow && activeWindow != win) {
            markInactive(activeWindow);
        }
        taskbar.setActiveButton(win.taskButton);
        activeWindow = win;
        Ext.fly(win.taskButton.el).addClass('active-win');
        win.minimized = false;
    }

    function markInactive(win) {
        if (win == activeWindow) {
            activeWindow = null;
            Ext.fly(win.taskButton.el).removeClass('active-win');
        }
    }

    function removeWin(win) {
        taskbar.removeTaskButton(win.taskButton);
        layout();
    }

    function layout() {
        desktopEl.setHeight(Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight());
    }
    Ext.EventManager.onWindowResize(layout);

    this.layout = layout;

    this.createWindow = function(config, cls) {
        var win = new (cls || Ext.Window)(
                Ext.applyIf(config || {}, {
            manager: windows,
            minimizable: true,
            maximizable: true
        })
                );
        win.render(desktopEl);
        win.taskButton = taskbar.addTaskButton(win);

        win.cmenu = new Ext.menu.Menu({
            items: [
            ]
        });

        win.animateTarget = win.taskButton.el;

        win.on({
            'activate': {
                fn: markActive
            },
            'beforeshow': {
                fn: markActive
            },
            'deactivate': {
                fn: markInactive
            },
            'minimize': {
                fn: minimizeWin
            },
            'close': {
                fn: removeWin
            }
        });

        layout();
        return win;
    };

    this.getManager = function() {
        return windows;
    };

    this.getWindow = function(id) {
        return windows.get(id);
    };

    this.getWinWidth = function() {
        var width = Ext.lib.Dom.getViewWidth();
        return width < 200 ? 200 : width;
    };

    this.getWinHeight = function() {
        var height = (Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight());
        return height < 100 ? 100 : height;
    };

    this.getWinX = function(width) {
        return (Ext.lib.Dom.getViewWidth() - width) / 2
    };

    this.getWinY = function(height) {
        return (Ext.lib.Dom.getViewHeight() - taskbarEl.getHeight() - height) / 2;
    };

    layout();

    if (shortcuts) {
        shortcuts.on('click', function(e, t) {
            if (t = e.getTarget('dt', shortcuts)) {
                e.stopEvent();
                var module = app.getModule(t.id.replace('-shortcut', ''));
                if (module) {
                    module.createWindow();
                }
            }
        });
    }
};

Ext.app.App = function(cfg) {
    Ext.apply(this, cfg);
    this.addEvents({
        'ready': true,
        'beforeunload': true
    });
};

Ext.extend(Ext.app.App, Ext.util.Observable, {
    isReady: false,
    startMenu: null,
    modules: null,
    getStartConfig: function() {

    },
    initApp: function() {
        this.startConfig = this.startConfig || this.getStartConfig();

        this.desktop = new Ext.Desktop(this);

        this.launcher = this.desktop.taskbar.startMenu;

        this.modules = this.getModules();
        if (this.modules) {
            this.initModules(this.modules);
        }

        this.init();

        Ext.EventManager.on(window, 'beforeunload', this.onUnload, this);
        this.fireEvent('ready', this);
        this.isReady = true;
    },
    getModules: Ext.emptyFn,
    init: Ext.emptyFn,
    initModules: function(ms) {
        for (var i = 0, len = ms.length; i < len; i++) {
            var m = ms[i];
            this.launcher.add(m.launcher);
            m.app = this;
        }
    },
    getModule: function(name) {
        var ms = this.modules;
        for (var i = 0, len = ms.length; i < len; i++) {
            if (ms[i].id == name || ms[i].appType == name) {
                return ms[i];
            }
        }
        return '';
    },
    onReady: function(fn, scope) {
        if (!this.isReady) {
            this.on('ready', fn, scope);
        } else {
            fn.call(scope, this);
        }
    },
    getDesktop: function() {
        return this.desktop;
    },
    onUnload: function(e) {
        if (this.fireEvent('beforeunload', this) === false) {
            e.stopEvent();
        }
    }
});

Ext.app.Module = function(config) {
    Ext.apply(this, config);
    Ext.app.Module.superclass.constructor.call(this);
    this.init();
};

Ext.extend(Ext.app.Module, Ext.util.Observable, {
    init: Ext.emptyFn
});


//***********************************************************************************
//***********************************************************************************
//***********************************************************************************
Ext.ns('Ext.menu.Notificaciones');
Ext.menu.Notificaciones = Ext.extend(Ext.util.Observable, {
    constructor: function(config) {
        var me = this;
        this.notificaciones = config.notificaciones || [];
        this.top = config.top || -10;
        this.events = {};
        this.marginRight = config.marginRight || 0;
        Ext.menu.Notificaciones.superclass.constructor.apply(this, arguments);
        this.idNotificationArea = 'notification-area';
        this.created = false;
        this.fixMenu();
        this.addMenu();
        window.onresize = function(e) {
            me.doLayout();
        };
        Ext.menu.Noti = this;
    },
    doLayout: function() {
        this.fixMenu();
        if (this.left_menu != Ext.get(this.idNotificationArea).getX()) {
            Ext.get(this.idNotificationArea).setX(this.left_menu);
        }
    },
    addMenu: function() {
        this.span = new Ext.Template('<span id={id} style="position: absolute;width:{ancho}px; height: 30px; top:{top}px; left:{left}px; z-index:99999">{html}</span>');
        this.template = new Ext.XTemplate('<span id={id} style="position: absolute;width:{ancho}px; height: 30px; top:{top}px; left:{left}px; z-index:99999">{html}</span>');
        this.template = new Ext.XTemplate(
                '<ul class="nav ace-nav">',
                '<li class="dropdown">',
                '<a id="menuinbox" class="dropdown-toggle" data-toggle="dropdown" role="menu" aria-expanded="false"><span class="badge badge-danger" id="numNotifications">',
                '<tpl for="notificaciones">',        
                '<tpl if="total != 0">',
                '{total}</span><i class="fa fa-1x fa-bell">&nbsp;</i><tpl>{futureLang.lbbandeja}</tpl></a>',
                '</tpl>',
                '<tpl if="total == 0">',
                '{total}</span><i class="fa fa-1x fa-bell-slash">&nbsp;</i><tpl>{futureLang.lbbandeja}</tpl></a>',
                '</tpl>',
                '<ul id="dropdownmessageinbox" class="dropdown-menu alert-dropdown">',
                '{text}',
                '</tpl>',
                '<li class="divider"></li>',
                '<li><a id="idupdatelink" href="javascript:updateNotification()"><span><i class="fa fa-1x fa-refresh primary"></i> <tpl>{futureLang.lbupdate}</tpl></span></a></li>',
                '<li><a id="idviewalllink" href="javascript:goToNotification()"><span><i class="fa fa-1x fa-list-ul success"></i>  <tpl>{futureLang.lbviewall}</tpl></span></a></li>',
                '</ul>',
                '</li>',
                '</ul>'
                );
        this.span.compile();
        var html = this.getBodyMenu();
        this.span.append(Ext.getBody(), {id: this.idNotificationArea, html: html, left: this.left_menu, ancho: this.width_menu, top: this.top});
        this.created = true;
    },
    getPosition: function() {
        return  window.innerWidth - this.width_menu - this.marginRight;
    },
    getTotalCount: function() {
        return this.notificaciones.total;
    },
    getBodyMenu: function() {
        return this.template.apply({notificaciones: this.notificaciones, cantidad_total: this.cantidad_total});
    },
    getWidthMenu: function() {
        var st = this.cantidad_total + '';
        return st.visualLength() + 120;
    },
    fixMenu: function() {
        this.cantidad_total = this.getTotalCount();
        this.width_menu = this.getWidthMenu();
        this.left_menu = this.getPosition();
        if (this.created) {
            Ext.get(this.idNotificationArea).setWidth(this.width_menu);
            Ext.get(this.idNotificationArea).setX(this.left_menu);
        }
    },
    updateMenu: function(notis) {
        this.notificaciones = notis === false ? [] : notis;
        this.fixMenu();
        this.template.overwrite(this.idNotificationArea, {notificaciones: this.notificaciones, cantidad_total: this.cantidad_total});
        this.fireEvent('update', this, this.notificaciones, this.cantidad_total);
    }
});

String.prototype.visualLength = function() {
    var span = document.getElementById("ruler") || document.createElement('span');
    span.id = 'ruler';
    span.style = 'display:none';
    span.innerHTML = this;
    document.body.appendChild(span);
    return span.offsetWidth;
};

if (!desktopMenu)
    var desktopMenu = new Ext.menu.Notificaciones({
        notificaciones: new Array(),
        marginRight: 2
    });