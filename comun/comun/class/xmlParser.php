<?php

class XmlToArray {

    var $xml = '';

    /**
     * Default Constructor
     * @param $xml = xml data
     * @return none
     */
    public function __construct($xml) {
        $this->xml = $xml;
    }

    /**
     * _struct_to_array($values, &$i)
     *
     * This is adds the contents of the return xml into the array for easier processing.
     * Recursive, Static
     *
     * @access    private
     * @param    array  $values this is the xml data in an array
     * @param    int    $i  this is the current location in the array
     * @return    Array
     */
    function _struct_to_array($values, &$i) {
        $child = array();
        if (isset($values[$i]['value']))
            array_push($child, $values[$i]['value']);

        while ($i++ < count($values)) {
            switch ($values[$i]['type']) {
                case 'cdata':
                    array_push($child, $values[$i]['value']);
                    break;

                case 'complete':
                    $name = $values[$i]['tag'];
                    if (!empty($name)) {
                        $child[$name] = (isset($values[$i]['value'])) ? ($values[$i]['value']) : '';
                        if (isset($values[$i]['attributes'])) {
                            $child[$name] = $values[$i]['attributes'];
                        }
                    }
                    break;

                case 'open':
                    $name = $values[$i]['tag'];
                    $size = isset($child[$name]) ? sizeof($child[$name]) : 0;
                    $child[$name][$size] = $this->_struct_to_array($values, $i);
                    break;

                case 'close':
                    return $child;
                    break;
            }
        }
        return $child;
    }

//_struct_to_array

    /**
     * createArray($data)
     *
     * This is adds the contents of the return xml into the array for easier processing.
     *
     * @access    public
     * @param    string    $data this is the string of the xml data
     * @return    Array
     */
    function createArray() {
        $xml = $this->xml;
        $values = array();
        $index = array();
        $array = array();
        $parser = xml_parser_create();
        xml_parser_set_option($parser, XML_OPTION_SKIP_WHITE, 1);
        xml_parser_set_option($parser, XML_OPTION_CASE_FOLDING, 0);
        xml_parse_into_struct($parser, $xml, $values, $index);
        xml_parser_free($parser);
        $i = 0;
        $name = $values[$i]['tag'];
        $array[$name] = isset($values[$i]['attributes']) ? $values[$i]['attributes'] : '';
        $array[$name] = $this->_struct_to_array($values, $i);
        return $array;
    }

//createArray
}

//XmlToArray

class array2xml extends DomDocument {

    public $nodeName;
    private $xpath;
    private $root;
    private $node_name;

    /**
     * Constructor, duh
     *
     * Set up the DOM environment
     *
     * @param    string    $root        The name of the root node
     * @param    string    $nod_name    The name numeric keys are called
     *
     */
    public function __construct($root = 'root', $node_name = 'node') {
        parent::__construct();

        /*         * * set the encoding ** */
        $this->encoding = "ISO-8859-1";

        /*         * * format the output ** */
        $this->formatOutput = true;

        /*         * * set the node names ** */
        $this->node_name = $node_name;

        /*         * * create the root element ** */
        $this->root = $this->appendChild($this->createElement($root));

        $this->xpath = new DomXPath($this);
    }

    /*
     * creates the XML representation of the array
     *
     * @access    public
     * @param    array    $arr    The array to convert
     * @aparam    string    $node    The name given to child nodes when recursing
     *
     */

    public function createNode($arr, $node = null) {
        if (is_null($node)) {
            $node = $this->root;
        }
        foreach ($arr as $element => $value) {
            $element = is_numeric($element) ? $this->node_name : $element;

            $child = $this->createElement($element, (is_array($value) ? null : $value));
            $node->appendChild($child);

            if (is_array($value)) {
                self::createNode($value, $child);
            }
        }
    }

    /*
     * Return the generated XML as a string
     *
     * @access    public
     * @return    string
     *
     */

    public function __toString() {
        return $this->saveXML();
    }

    /*
     * array2xml::query() - perform an XPath query on the XML representation of the array
     * @param str $query - query to perform
     * @return mixed
     */

    public function query($query) {
        return $this->xpath->evaluate($query);
    }

}