import type {Component} from "vue";
import {FormElemType} from "@/enums";

import SchemaCascader from "./cascader/schema-cascader.vue";
import SchemaCheckbox from "./checkbox/schema-checkbox.vue";
import SchemaColorPicker from "./color-picker/schema-color-picker.vue";
import SchemaDatePicker from "./date-picker/schema-date-picker.vue";
import SchemaInput from "./input/schema-input.vue";
import SchemaInputNumber from "./input-number/schema-input-number.vue";
import SchemaRadio from "./radio/schema-radio.vue";
import SchemaRate from "./rate/schema-rate.vue";
import SchemaSelect from "./select/schema-select.vue";
import SchemaSlider from "./slider/schema-slider.vue";
import SchemaSwitch from "./switch/schema-switch.vue";
import SchemaTimePicker from "./time-picker/schema-time-picker.vue";
import SchemaTimeSelect from "./time-select/schema-time-select.vue";
import SchemaTreeSelect from "./tree-select/schema-tree-select.vue";

export default {
    [FormElemType.CASCADER]: SchemaCascader,
    [FormElemType.CHECKBOX]: SchemaCheckbox,
    [FormElemType.COLOR_PICKER]: SchemaColorPicker,
    [FormElemType.DATE_PICKER]: SchemaDatePicker,
    [FormElemType.INPUT]: SchemaInput,
    [FormElemType.INPUT_NUMBER]: SchemaInputNumber,
    [FormElemType.RADIO]: SchemaRadio,
    [FormElemType.RATE]: SchemaRate,
    [FormElemType.SELECT]: SchemaSelect,
    [FormElemType.SLIDER]: SchemaSlider,
    [FormElemType.SWITCH]: SchemaSwitch,
    [FormElemType.TIME_PICKER]: SchemaTimePicker,
    [FormElemType.TIME_SELECT]: SchemaTimeSelect,
    [FormElemType.TREE_SELECT]: SchemaTreeSelect
} as Record<string, Component>