import { createApp } from 'vue'
import {iniciarFirebase} from './config/firebase'
import App from './App.vue'
import Form from './components/uikit/Form.vue'
import Dialog from './components/uikit/Dialog.vue'
import Diente from './components/Diente.vue'
import BotonSeguro from './components/BotonSeguro.vue'
import BotonNuevo from './components/BotonNuevo.vue'
import Odontograma from './components/Odontograma.vue'

import MicroButton from './components/MicroButton.vue'
import Calendario from './components/Calendario.vue'


import Avatar from './components/Avatar.vue'
import Img from './components/uikit/Img.vue'
import StorageItem from './components/uikit/StorageItem.vue'

import router from './config/router'
import "./config/bootstrap/scss/bootstrap.scss"
import './config/basics.sass'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import BootstrapVue3 from 'bootstrap-vue-3';

iniciarFirebase()

createApp(App)
.component("Form", Form)
.component("Img", Img)
.component("StorageItem", StorageItem)

.component("Dialog", Dialog)
.component("Diente", Diente)
.component("MicroButton", MicroButton)
.component("Odontograma", Odontograma)
.component("BotonSeguro", BotonSeguro)
.component("BotonNuevo", BotonNuevo)
.component("Calendario", Calendario)
.component("Avatar", Avatar)





.use(router)
.use(BootstrapVue3)
.mount('#app')

