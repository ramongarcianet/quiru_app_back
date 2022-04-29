import { createApp } from 'vue'
import {iniciarFirebase} from './config/firebase'
import App from './App.vue'
import Button from './components/uikit/Button.vue'
import Col from './components/uikit/Col.vue'
import Row from './components/uikit/Row.vue'
import Container from './components/uikit/Container.vue'
import Item from './components/uikit/Item.vue'
import Form from './components/uikit/Form.vue'

import router from './config/router'
import "bootstrap/scss/bootstrap.scss"
import 'bootstrap'
import './config/basics.sass'
import './config/buttons.sass'
import './config/inputs.sass'



iniciarFirebase()

createApp(App)
.component("Button", Button)
.component("Col", Col)
.component("Row", Row)
.component("Container", Container)
.component("Item", Item)
.component("Form", Form)


.use(router)
.mount('#app')

