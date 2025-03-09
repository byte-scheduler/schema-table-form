import {App} from 'vue'

import SchemaForm from "@/components/form/schema-form.vue"
import SchemaTable from "@/components/table/schema-table.vue"

export * from '@/hooks/use-form-options'
export * from '@/types/schema'
export * from '@/enums'

export {SchemaForm, SchemaTable}

export default {
    install(app: App) {
        app.component('SchemaForm', SchemaForm)
        app.component('SchemaTable', SchemaTable)
    }
}
