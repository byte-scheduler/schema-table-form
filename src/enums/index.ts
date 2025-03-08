export enum DisplayMode {
    VIEW = 'VIEW', // 详情
    EDIT = 'EDIT', // 编辑
    READONLY = 'READONLY', // 只读
    DISABLED = 'DISABLED', // 禁用
}

export enum FormElemType {
    RADIO = 'schema-radio', // 单选框
    CHECKBOX = 'schema-checkbox', // 多选框
    INPUT = 'schema-input', // 输入框
    INPUT_NUMBER = 'schema-input-number', // 计数器
    SELECT = 'schema-select', // 选择器
    CASCADER = 'schema-cascader', // 级联选择器
    SWITCH = 'schema-switch', // 开关
    SLIDER = 'schema-slider', // 滑块
    TIME_PICKER = 'schema-time-picker', // 时间选择器
    TIME_SELECT = 'schema-time-select', // 时间选择
    TREE_SELECT = 'schema-tree-select', // 树形选择
    DATE_PICKER = 'schema-date-picker', // 日期选择器
    RATE = 'schema-rate', // 评分
    COLOR_PICKER = 'schema-color-picker', // 颜色选择器
}