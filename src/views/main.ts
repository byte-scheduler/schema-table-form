import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import Description from './description/App.vue'
import Example from "./example/App.vue"

const App = import.meta.env.MODE === 'EXAMPLE' ? Example : Description
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app')
