import { createApp } from 'vue'
import {iniciarFirebase} from './config/firebase'
import App from './App.vue'
import Button from './components/uikit/Button.vue'
import Col from './components/uikit/Col.vue'
import Row from './components/uikit/Row.vue'
import Container from './components/uikit/Container.vue'
import Item from './components/uikit/Item.vue'
import router from './config/router'

import './config/bootstrap-grid.css'

iniciarFirebase()

createApp(App)
.component("Button", Button)
.component("Col", Col)
.component("Row", Row)
.component("Container", Container)
.component("Item", Item)

.use(router)
.mount('#app')

