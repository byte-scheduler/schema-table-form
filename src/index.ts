import {App} from 'vue';

import SchemaForm from "@/components/form/schema-form.vue";
import SchemaTable from "@/components/table/schema-table.vue";

export * from '@/types/form'
export * from '@/enums'

export default {
    install(app: App) {
        app.component('SchemaForm', SchemaForm)
        app.component('SchemaTable', SchemaTable)
    }
}
