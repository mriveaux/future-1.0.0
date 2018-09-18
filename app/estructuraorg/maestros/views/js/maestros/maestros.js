/* global Ext, lMask */
Ext.QuickTips.init();
Ext.onReady(function() {
    lMask.hide();

    var trMaestros = new Ext.tree.TreePanel({
        title:'Maestros',
        region: 'west',
        collapsible: true,
        autoScroll: true,
        animate: false,
        loadMask: true,
        split: true,
        rootVisible: false,
        width: 300,
        minSize: 250,
        maxSize: 400,
        bodyStyle: 'background-color:#FFFFFF;',
        loader: new Ext.tree.TreeLoader({
            dataUrl: 'loadTreeMaestros',
            preloadChildren: false
        }),
        root: new Ext.tree.AsyncTreeNode({
            text: '',
            expanded: true,
            id: 0
        }),
        listeners: {
            click: function(nodo) {
                if (nodo.attributes.src)
                    document.getElementById("iframeMaestros").src = nodo.attributes.src;
            }
        }
    });

    var pAreaInformes = new Ext.Panel({
        region: 'center',
        border: false,
        html: '<iframe id="iframeMaestros" style="width:100%; height: 100%; border:none;"></iframe>',
        layout: 'fit'
    });

    new Ext.Viewport({
        layout: 'border',
        items: [trMaestros, pAreaInformes]
    });
});