/**
 * 判断值是否为真值 (严格模式)
 * - 处理规则: null / undefined / 空字符串 / NaN / 0 视为假值
 * - 注意: 空数组([])/空对象({}) 仍视为真值（符合JS默认真值逻辑）
 */
export const isTruthValue = (val: unknown): boolean => {
    if (val === null || val === undefined) return false;

    switch (typeof val) {
        case 'string':
            return val.trim() !== '';
        case 'boolean':
            return val;
        case 'number':
            return val !== 0 && !Number.isNaN(val);
        default:
            // 对象/数组/Symbol 等依赖隐式转换
            return !!val;
    }
};