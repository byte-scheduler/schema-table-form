/**
 * 获取政治面貌列表
 */
export const getPoliticalOutlooks = () => {
    const list = [
        {value: 0, name: '群众'},
        {value: 1, name: '团员'},
        {value: 2, name: '党员'}
    ]
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(list)
        }, 2000)
    })
}

/**
 * 获取地址
 */
export const getAddressList = () => {
    const list = [
        {
            value: '001',
            label: '北京市',
            children: [
                {value: '00101', label: '朝阳区'},
                {value: '00102', label: '海淀区'}
            ]
        },
        {
            value: '002',
            label: '重庆市',
            children: [
                {value: '00201', label: '渝北区'},
                {value: '00202', label: '江北区'},
                {value: '00203', label: '南岸区'},
            ]
        }
    ]
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(list)
        }, 2000)
    })
}