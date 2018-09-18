<?php

class FuncionalidadesModel extends ModelSecure {

    public function __construct() {
        parent::__construct();
    }

    static public function adicionarFuncionalidad($post) {
        try {
            $nombre = $post->nombre;
            $idmodulo = $post->idmodulo;
            $idpadre = $post->idpadre;
            if (Funcionalidades::buscarFuncionalidadNombre($nombre, $idpadre, $idmodulo) == 0) {
                self::createFunctEstructure($post->src, $post->version);
                $objFunct = new Funcionalidades();
                $objFunct->nombre = $nombre;
                $objFunct->abreviatura = $post->abreviatura;
                $objFunct->src = $post->src;
                $objFunct->descripcion = $post->descripcion;
                $objFunct->idmodulo = $idmodulo;
                $objFunct->idpadre = $idpadre;
                $objFunct->padre = true;
                $objFunct->indice = $post->indice;
                $objFunct->label = $post->label;
                $objFunct->save();
                if ($idpadre != 0) {
                    $objFunctPadre = Doctrine_Core::getTable('Funcionalidades')->find($idpadre);
                    $objFunctPadre->padre = false;
                    $objFunctPadre->save();
                }
                return 1;
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    static public function modificarFuncionalidad($post) {
        try {
            $nombre = $post->nombre;
            $objFunct = Doctrine_Core::getTable('Funcionalidades')->find($post->idnodo);
            if ($objFunct->nombre == $nombre) {
                $objFunct->src = $post->src;
                $objFunct->descripcion = $post->descripcion;
                $objFunct->indice = $post->indice;
                $objFunct->label = $post->label;
                $objFunct->save();
                return 1;
            } else if (Funcionalidades::buscarFuncionalidadNombre($nombre, $objFunct->idpadre, $objFunct->idmodulo) == 0) {
                $objFunct->nombre = $nombre;
                $objFunct->src = $post->src;
                $objFunct->descripcion = $post->descripcion;
                $objFunct->indice = $post->indice;
                $objFunct->label = $post->label;
                $objFunct->save();
                return 1;
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    static public function eliminarFuncionalidad($idfuncionalidad) {
        try {
            $RolesFunct = new RolesFunct();
            if ($RolesFunct->buscarFuncionalidadAsociada($idfuncionalidad) == 0) {
                $objFunct = Doctrine_Core::getTable('Funcionalidades')->find($idfuncionalidad);
                if (Funcionalidades::buscarFuncionalidadIdpadre($objFunct->idpadre) == 1) {
                    $objFunctPadre = Doctrine_Core::getTable('Funcionalidades')->find($objFunct->idpadre);
                    $objFunctPadre->padre = true;
                    $objFunctPadre->save();
                }
                $objFunct->delete();
                return 1;
            } else {
                return 2;
            }
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    static private function createFunctEstructure($argSrc, $argVersion) {
        try {
            extract(self::getVersionStructure($argSrc));
            $dr = $_SERVER['DOCUMENT_ROOT'];
            $nombreClase = ucfirst($controller);
//controllers
            $dirController = $dr . "/app/$module/$funct/controllers";
            if (!file_exists($dirController)) {
                mkdir($dirController, 0777, true);
            }
            $classController = $nombreClase . "Controller.php";
            if (!file_exists($classController)) {
                $fileController = fopen($dirController . "/$classController", 'w');
                $strController = "<?php \n class $nombreClase" . "Controller extends ControllerSecure "
                        . "\n{\n\n" . "private $$controller;\nprivate $$controller" . "Model;\n\npublic "
                        . "function __construct() {\n parent::__construct();\n\$this->$controller = "
                        . "new $nombreClase();\n\$this->$controller" . "Model = new $nombreClase" . "Model"
                        . "(); \n}\npublic function " . $controller . "Action() {\n" . "$"
                        . "this->render('" . $controller . "');\n}\npublic function get$controller" . "Action()"
                        . "{\necho json_encode(\$this->$controller" . "->get$nombreClase" . "es());\n}\n"
                        . "public function add$controller" . "Action() {\necho json_encode(\$this->$controller" . "Model->"
                        . "add$nombreClase(\$this->dataPost));\n}\n\npublic function mod$controller" . "Action()"
                        . " {\necho json_encode(\$this->$controller" . "Model->mod$nombreClase(\$this"
                        . "->dataPost));\n}\n\npublic function del$controller" . "Action() {\necho "
                        . "json_encode(\$this->$controller" . "Model->del$nombreClase(\$this->dataPost));\n}\n\n}";
                fwrite($fileController, $strController);
                fclose($fileController);
            }

//models
            $bussines = $dr . "/app/$module/$funct/models/bussines";
            if (!file_exists($bussines)) {
                mkdir($bussines, 0777, true);
            }
            $classModel = $nombreClase . "Model.php";
            if (!file_exists($classModel)) {
                $fileModel = fopen($bussines . "/$classModel", 'w');
                $strBussinesMethods = "\n\tpublic function add$nombreClase(\$data) {\ntry {\n\$$controller = new"
                        . " $nombreClase();\n\$$controller" . '->' . "id$controller = \$data->id$controller;\n"
                        . "\$$controller" . '->' . "$controller = \$data->$controller;\n\$$controller" . '->'
                        . "save();\nreturn 1;\n} catch (Doctrine_Exception \$e) {\nthrow \$e;\n}\n}\n\npublic "
                        . "function mod$nombreClase(\$data) {\ntry {\n\$$controller = Doctrine_Core::getTable"
                        . "('$nombreClase')->find(\$data->id$controller);\n\$$controller" . '->' . "$controller "
                        . "= \$data->$controller;\n\$$controller" . '->' . "save();\nreturn 1;\n} catch "
                        . "(Doctrine_Exception \$e) {\nthrow \$e;\n}\n}\n\npublic function del$nombreClase"
                        . "(\$id) {\ntry {\n\$$controller = Doctrine_Core::getTable('$nombreClase')->find(\$id);"
                        . "\n\$$controller" . '->' . "delete();\nreturn 1;\n} catch (Doctrine_Exception \$e)"
                        . " {\nthrow \$e;\n}\n}\n\n";
                $strBussinesClass = "<?php \n class $nombreClase" . "Model extends ModelSecure\n{\npublic "
                        . "function __construct()\n {\n parent::__construct(); \n}\n$strBussinesMethods}\n";
                fwrite($fileModel, $strBussinesClass);
                fclose($fileModel);
            }

//domain
            $domain = $dr . "/app/$module/$funct/models/domain";
            if (!file_exists($domain)) {
                mkdir($domain, 0777, true);
            }
            $classDomain = $nombreClase . ".php";
            if (!file_exists($classDomain)) {
                $fileDomain = fopen($domain . "/$classDomain", 'w');
                $strPrimaryKey = "\n\$this->hasColumn('id$controller', 'numeric', null, array('notnull' => "
                        . "true, 'primary' => true, 'sequence' => '$module.$controller" . '_id'
                        . "$controller'));\n\$this->hasColumn('$controller', 'character varying', 255, "
                        . "array('notnull' => false, 'primary' => false));";
                $strTableName = "\$this->setTableName('$module.$controller');" . $strPrimaryKey;
                $strDomain = "<?php \n class $nombreClase extends Doctrine_Record {\n\n\tpublic function "
                        . "setUp() {\n\tparent::setUp();\n }\n\n public function setTableDefinition()"
                        . " {\n$strTableName\n}public function get$nombreClase" . "es(\$post) {\ntry {\n "
                        . "\$query = Doctrine_Query::create();\n\$queryCount = Doctrine_Query::create();"
                        . "\n\$query->from('$nombreClase n')->offset(\$post->start)\n->limit(\$post->"
                        . "limit)->setHydrationMode(Doctrine_Core::HYDRATE_ARRAY);\n\$queryCount->from"
                        . "('$nombreClase n')->setHydrationMode(Doctrine_Core::HYDRATE_RECORD);\nif (isset"
                        . "(\$post->criterio) && strlen(\$post->criterio) > 0) {\n\$criterio = \$post"
                        . "->criterio;\n\$query->addWhere(\"n.$controller ilike '%\" . \$criterio "
                        . ". \"%'\");\n\$queryCount->addWhere(\"n.$controller ilike '%\" . \$criterio "
                        . ". \"%'\");\n}\n\$query->addOrderBy('n.fecha');\n\$result = \$query->execute();"
                        . "\n\$count = \$queryCount->execute();\nreturn array('data' => \$result, 'total' "
                        . "=> \$count->count());\n} catch (Exception \$exc) {\nthrow \$exc;\n}\n}\n}\n";
                fwrite($fileDomain, $strDomain);
                fclose($fileDomain);
            }

            $pathApp = "/app/$module/$funct/views/js/$controller";
            $js = $dr . $pathApp;
            if (!file_exists($js)) {
                mkdir($js, 0777, true);
                self::validateJavaScriptToExtJSVersion($js, $pathApp, $controller, $nombreClase, $argVersion);
            }

            $phtml = $dr . "/app/$module/$funct/views/scripts/$controller";
            if (!file_exists($phtml)) {
//phtml
                mkdir($phtml, 0777, true);
                $classPhtml = $controller . ".phtml";
                $filePhtml = fopen($phtml . "/$classPhtml", 'w');
                $strPhtml = self::validateHtmlToExtJSVersion($controller, $argVersion);
                fwrite($filePhtml, $strPhtml);
                fclose($filePhtml);
            }
            if (!file_exists($dr . "/app/$module/$funct/index.php")) {
                if ($argVersion == '4.2') {
                    copy($dr . "/comun/templates/index-rest.php", $dr . "/app/$module/$funct/index.php");
                } else {
                    copy($dr . "/comun/templates/index.php", $dr . "/app/$module/$funct/index.php");
                }
            }
            self::saveFunctVersion($argSrc, $argVersion);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    static private function validateJavaScriptToExtJSVersion($dirFull, $dirJs, $nomFunc, $nombApp, $verExtJs) {
        $nombreClase = ucfirst($nomFunc);
        if ($verExtJs == '2.2') {
            $classJs = $nomFunc . ".js";
            $fileJs = fopen($dirFull . "/$classJs", 'w');
            $strJs = "/* global Ext, lMask */\nExt.QuickTips.init();\nExt.onReady(function () "
                    . "{\nlMask.hide();\nnew Ext.Viewport({\nlayout: 'fit',\nitems: "
                    . "[new Ext.Panel({\ntitle: '$nombApp'\n})]\n});\n});";
            fwrite($fileJs, $strJs);
            fclose($fileJs);
        } else if ($verExtJs == '4.2') {
            $appFolder = $dirFull . "/app";
            mkdir($appFolder, 0777, true);
            $fileAppJs = fopen($dirFull . "/app$nombreClase.js", 'w');
            $list = $nomFunc . 'list';
            $strApp = "/* global Ext */\nExt.application({\nrequires: ['Ext.container.Viewport', 'Ext.grid.*', "
                    . "'Ext.data.*', 'Ext.toolbar.Paging', 'Ext.ux.ProgressBarPager', "
                    . "'Ext.ux.form.SearchField', 'Ext.ModelManager', 'Ext.tip.QuickTipManager', 'Ext.form.*']"
                    . ",\nname: '$nombreClase',\nappFolder: '$dirJs/app',\ncontrollers: ['$nombreClase'],\nviews:"
                    . " ['List'],\nlaunch: function () {\nExt.tip.QuickTipManager.init();\nExt.create('"
                    . "Ext.container.Viewport', {\nlayout: 'fit',\nitems: [{xtype: '$list'}]\n});\n}\n});\n";
            fwrite($fileAppJs, $strApp);
            fclose($fileAppJs);

            mkdir($appFolder . "/controller", 0777, true);
            $fileJsController = fopen($appFolder . "/controller/$nombreClase.js", 'w');
            $strCtrl = "/* global Ext */\nExt.define('$nombreClase.controller.$nombreClase', {\n "
                    . "extend: 'Ext.app.Controller',\nstores: ['$nombreClase'],\nmodels: "
                    . "['$nombreClase'],\nviews: ['List'],\nrefs: [{ref: 'list', selector: 'grid'}],"
                    . "\n init: function () {\n this.control({\n '$list': {\nselectionchange: "
                    . "this.toggleBtn\n},\n '$list button[action=add]': {\nclick: this.add$nombreClase\n}"
                    . ",\n '$list button[action=mod]': {\nclick: this.edit$nombreClase\n},\n "
                    . "'$list button[action=del]': {\nclick: this.del$nombreClase\n},\n "
                    . "'territorioedit button[action=save]': {\nclick: this.update$nombreClase\n}\n});\n},\n "
                    . "add$nombreClase: function () {\nvar Terr = this.getModel('$nombreClase');\n"
                    . "this.getList().getStore().insert(0, new Terr());\nthis.getList().re$nombreClase.startEdit"
                    . "(0, 0);\n},\n edit$nombreClase: function (grid, record) {\nvar selection = this.getList()"
                    . ".getSelectionModel().getSelection()[0];\nthis.getList().re$nombreClase.startEdit"
                    . "(selection, 0);\n},\n del$nombreClase: function (grid, record) {\nvar me = this;\n"
                    . "var selection = this.getList().getSelectionModel().getSelection()[0];\n"
                    . "var nomb$nombreClase = selection.data.nombre;\nfunction confirmar(btn) {\n"
                    . "if (btn === 'ok'){\nif (selection) {\nme.getList().getStore().remove(selection);\n}\n}"
                    . "\n}\nMensajeInterrogacion('Confirmaci\\xF3n', String.fromCharCode(191) + 'Est\\xE1 "
                    . "seguro que desea eliminar el territorio <b>' + nomb$nombreClase + '</b>?', confirmar);"
                    . "\n},\n update$nombreClase: function (button) {\nvar win = button.up('window'),\nform ="
                    . " win.down('form'),\nrecord = form.getRecord(),\nvalues = form.getValues();\n\nrecord."
                    . "set(values);\nwin.close();\nthis.get" . $nombreClase . "Store().sync();\n},\n toggleBtn: "
                    . "function (selModel, selections) {\nthis.getList().down('#btnModificar').setDisabled"
                    . "(selections.length === 0);\nthis.getList().down('#btnEliminar').setDisabled(selections"
                    . ".length === 0);\n}\n});\n";
            fwrite($fileJsController, $strCtrl);
            fclose($fileJsController);

            $modelFolder = $appFolder . "/model";
            mkdir($modelFolder, 0777, true);
            $fileJsModel = fopen($appFolder . "/model/$nombreClase.js", 'w');
            $strModel = "/* global Ext */\nExt.define('$nombreClase.model.$nombreClase', {\nextend: "
                    . "'Ext.data.Model',\nfields: [{name: 'id$nomFunc', type: 'int', useNull: true}, "
                    . "'$nomFunc'],\nidProperty: 'id$nomFunc',\nvalidations: [{type: 'length', "
                    . "field: 'id$nomFunc', min: 1, max: 19}, {type: 'length', field: '$nomFunc',"
                    . " min: 1, max: 255}]\n});\n";
            fwrite($fileJsModel, $strModel);
            fclose($fileJsModel);

            $storeFolder = $appFolder . "/store";
            mkdir($storeFolder, 0777, true);
            $fileJsStore = fopen($appFolder . "/store/$nombreClase.js", 'w');
            $strStore = "/* global Ext */\nExt.define('$nombreClase.store.$nombreClase', {\nextend: "
                    . "'Ext.data.Store', storeId: '$nombreClase', model: '$nombreClase.model."
                    . "$nombreClase', sorters: ['$nomFunc'], autoLoad: true, autoSync: true, "
                    . "filterOnLoad: false, pageSize: 20,\nproxy: {\ntype: 'ajax',\nactionMethods: "
                    . "{create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'},\n extraParams:"
                    . "{restful: true},\napi: {read: 'get" . $nomFunc . "s', create: 'add$nomFunc', "
                    . "update: 'mod$nomFunc', destroy: 'del$nomFunc'},\nreader: {type: 'json', "
                    . "root: 'data', totalProperty: 'total', successProperty: 'success'},\nwriter: "
                    . "{type: 'json'},\nlisteners: {\nexception: function (proxy, response, operation) "
                    . "{\nExt.MessageBox.show({title: 'Excepci&oacute;n remota', msg: operation."
                    . "getError(), icon: Ext.MessageBox.ERROR, buttons: Ext.Msg.OK});\n}\n}\n},\n"
                    . "listeners: {\n'beforesync': function () {\nshowMask('Cargando...');\n},\n"
                    . "'load': function (store, records, successful, eOpts) {\nhideMask();\n},\n"
                    . "'write': function (proxy, operation) {\noperation.callback = function (records, "
                    . "operat, success) {\nvar msg = '';\nif (success) {\nswitch (operation.action) "
                    . "{\ncase 'create':\nmsg = 'El $nomFunc fue adicionado correctamente.';\n"
                    . "break;\ncase 'update':\nmsg = 'El $nomFunc fue modificado correctamente.';"
                    . "\nbreak;\ncase 'destroy':\nmsg = 'El $nomFunc fue eliminado correctamente.';"
                    . "\nbreak;\n}\nthis.reload();\n}\nshowMsg(1, msg);\n};\nhideMask();\n}\n}\n});";
            fwrite($fileJsStore, $strStore);
            fclose($fileJsStore);

            $viewFolder = $appFolder . "/view";
            mkdir($viewFolder, 0777, true);
            $fileJsView = fopen($appFolder . "/view/List.js", 'w');
            $strView = "/* global Ext */\nExt.define('$nombreClase.view.List', {\nextend: 'Ext.grid.Panel'"
                    . ",\nalias: 'widget." . $nomFunc . "list', title: '$nombreClase', selType: 'rowmodel',"
                    . "\ninitComponent: function () {\nvar grid = this;\n"
                    . "this.re$nombreClase = Ext.create('Ext.grid.plugin.RowEditing', {\n clicksToEdit: "
                    . "2,\n listeners: {\ncanceledit: function (rowEditing, context) {\nif (context."
                    . "record.phantom) {\ngrid.getStore().remove(context.record);\n}\n}\n}\n});\nExt."
                    . "apply(grid, {\nid: 'gpList', store: '$nombreClase', plugins: [this.re$nombreClase]"
                    . ",\ndockedItems: [{xtype: 'toolbar', \nitems: [{action: 'add', itemId: 'btnAdicionar'"
                    . ", text: 'Adicionar', iconCls: 'fa fa-plus bluedark-button'},\n {action: 'mod', "
                    . "itemId: 'btnModificar', text: 'Modificar', iconCls: 'fa fa-edit bluedark-button',"
                    . " disabled: true},\n {action: 'del', itemId: 'btnEliminar', text: 'Eliminar', "
                    . "iconCls: 'fa fa-trash bluedark-button', disabled: true},\n '-', '->', {\nwidth:"
                    . " 300, xtype: 'searchfield', store: '$nombreClase',\nfnOnSearch: function () {\n"
                    . "var store = Ext.data.StoreManager.lookup('$nombreClase');\nstore.clearFilter(true);"
                    . "\nstore.load({params: {criterio: Ext.getCmp('sf$nombreClase').getValue()}});\n},\n"
                    . "fnOnClear: function () {\nvar store = Ext.data.StoreManager.lookup('$nombreClase');"
                    . "\nstore.load({params: {criterio: Ext.getCmp('sf$nombreClase').getValue()}});\n}\n}"
                    . "\n]}],\ncolumns: [{xtype: 'rownumberer'},\n{header: '$nombreClase', dataIndex: "
                    . "'$nomFunc', flex: 1, field: {xtype: 'textfield'}, sortable: true},\n{name: "
                    . "'id$nomFunc', type: 'int', useNull: true, hideable: false, hidden: true, "
                    . "sortable: false}\n],\nbbar: {xtype: 'pagingtoolbar', pageSize: 20, store: "
                    . "'$nombreClase', displayInfo: true, dock: 'bottom'\n}\n});\nthis.callParent"
                    . "(arguments);\n}\n});\n";
            fwrite($fileJsView, $strView);
            fclose($fileJsView);
        } else if ($verExtJs == '6.0') {
            $classJs = $nomFunc . ".js";
            $fileJs = fopen($dirFull . "/$classJs", 'w');
            $strJs = "/* global Ext, lMask */\nExt.QuickTips.init();\nExt.onReady(function () "
                    . "{\nlMask.hide();\nnew Ext.Viewport({\nlayout: 'fit',\nitems: "
                    . "[new Ext.Panel({\ntitle: '$nombApp'\n})]\n});\n});";
            fwrite($fileJs, $strJs);
            fclose($fileJs);
        }
    }

    static private function validateHtmlToExtJSVersion($argClass, $argVersion) {
        if ($argVersion == '2.2') {
            return "<html>\n<head>\n<meta charset=\"UTF-8\" />\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->libjs; ?>Extjs/2.2/resources/css/ext-all.css\"/>\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->libjs; ?>Extjs/2.2/resources/css/iconos.css\"/>\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->libcss; ?>fonts/FontAwesome/css/font-awesome.min.css\"/>\n"
                    . "</head>\n<body>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->libjs; ?>Extjs/2.2/ext/ext-base.js\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->libjs; ?>Extjs/2.2/ext/ext-all.js\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->libjs; ?>Extjs/2.2/lang/ext-lang-es.js\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->libjs; ?>Extjs/2.2/ext/funciones-utiles.js\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->viewjs; ?>/views/js/$argClass/$argClass.js\"></script>\n"
                    . "</body>\n</html>";
        } else if ($argVersion == '4.2') {
            return "<!DOCTYPE html>\n<head>\n<meta charset=\"UTF-8\" />\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->extcss; ?>\"/>\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->libcss; ?>fonts/FontAwesome/css/font-awesome.min.css\"/>\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->libcss; ?>ff/matrix.css\"/>\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->extver; ?>components/BubbleMsg/Ext.BubbleMsg.min.css\"/>\n"
                    . "</head>\n<body>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->extjs; ?>\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->extlang; ?>\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->extver; ?>components/BubbleMsg/Ext.BubbleMsg.min.js\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->extver; ?>ext/fn-utiles.js\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->viewjs; ?>/views/js/$argClass/app$argClass.js\"></script>\n"
                    . "</body>\n</html>";
        } else if ($argVersion == '6.0') {
            return "<!DOCTYPE html>\n<head>\n<meta charset=\"UTF-8\" />\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->extcss; ?>\"/>\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->libcss; ?>fonts/FontAwesome/css/font-awesome.min.css\"/>\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->libcss; ?>ff/matrix.css\"/>\n"
                    . "<link rel=\"stylesheet\" type=\"text/css\" href=\"<?php echo \$this->extver; ?>components/BubbleMsg/Ext.BubbleMsg.min.css\"/>\n"
                    . "</head>\n<body>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->extjs; ?>\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->extlang; ?>\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->extver; ?>components/BubbleMsg/Ext.BubbleMsg.min.js\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->extver; ?>ext/fn-utiles.js\"></script>\n"
                    . "<script type=\"text/javascript\" src=\"<?php echo \$this->viewjs; ?>/views/js/$argClass/app$argClass.js\"></script>\n"
                    . "</body>\n</html>";
        }
    }

    static private function saveFunctVersion($argSrc, $argVersion) {
        try {
            $docRoot = $_SERVER['DOCUMENT_ROOT'];
            $fileAppVersion = $docRoot . "/comun/comun/xml/appVersion.xml";
            $xmlAppVersion = simplexml_load_file($fileAppVersion);
            extract(self::getVersionStructure($argSrc));
            $xmlAppVersion->$module->$funct->$controller = $argVersion;
            $xmlAppVersion->asXML($fileAppVersion);
        } catch (Exception $exc) {
            throw $exc;
        }
    }

    static private function getVersionStructure($uri = false) {
        $e = explode('index.php', $uri);
        $m = explode('/', $e[0]);
        $c = explode('/', $e[1]);
        return array('module' => $m[count($m) - 3], 'funct' => $m[count($m) - 2], 'controller' => $c[1]);
    }

}
