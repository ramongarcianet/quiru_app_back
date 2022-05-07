import { createApp } from 'vue'
import {iniciarFirebase} from './config/firebase'
import App from './App.vue'
import Form from './components/uikit/Form.vue'
import Dialog from './components/uikit/Dialog.vue'
import Diente from './components/Diente.vue'

import Img from './components/uikit/Img.vue'
import router from './config/router'
import "./config/bootstrap/scss/bootstrap.scss"
import './config/basics.sass'
import './config/buttons.sass'
import './config/inputs.sass'

iniciarFirebase()

createApp(App)
.component("Form", Form)
.component("Img", Img)
.component("Dialog", Dialog)
.component("Diente", Diente)



.use(router)
.mount('#app')

