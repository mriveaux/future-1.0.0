Ext.define('Maestros.controller.Maestros', {
    extend: 'Ext.app.Controller',
    views: ['maestros.List', 'maestros.TabPanel'],
    stores: ['Maestros'],
    model: ['Maestros'],
    refs: [
        {ref: 'list_maestros', selector: 'list_maestros'},
        {ref: 'tabpanel_maestros', selector: 'tabpanel_maestros'}
    ],
    init: function() {
        this.control({
            'list_maestros': {
                selectionchange: this.loadItem
            }
        });
    },
    loadItem: function(sm, selected) {
        var me = this;
        if (sm.hasSelection()) {
            var tabPanel = me.getTabpanel_maestros(),
                    p = tabPanel.down(selected[0].data.alias);
            if (p === null) {
                p = Ext.create(selected[0].data.clsName, {
                    closable: true
                });
                tabPanel.add(p);
            }
            tabPanel.setActiveTab(p);
        }
    }
});