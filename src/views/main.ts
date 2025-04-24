import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

import README from './readme/App.vue'
import EXAMPLES from "./examples/App.vue"

const App = import.meta.env.MODE === 'README' ? README : EXAMPLES
const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.mount('#app')
