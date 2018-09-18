<?php

class ColumnModel {

    public $header = '';
    public $dataIndex = '';
    public $dataType = '';
    public $dataFormat = '';

    public function __construct($header, $dataIndex, $dataType = PHPExcel_Cell_DataType::TYPE_STRING, $dataFormat = null) {
        $this->header = $header;
        $this->dataIndex = $dataIndex;
        $this->dataType = $dataType;
        if ($dataFormat !== null) {
            $this->dataFormat = $dataFormat;
        }
    }

}
