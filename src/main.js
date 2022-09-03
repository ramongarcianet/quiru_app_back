import { createApp } from 'vue'
import {iniciarFirebase} from './config/firebase'
import App from './App.vue'
import Form from './components/uikit/Form.vue'
import Img from './components/uikit/Img.vue'
import router from './config/router'
import "./config/bootstrap/scss/bootstrap.scss"
import './config/basics.sass'

iniciarFirebase()

createApp(App)
.component("Form", Form)
.component("Img", Img)

.use(router)
.mount('#app')

