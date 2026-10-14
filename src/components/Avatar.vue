<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { item, leer, registro, leerEnRegistro, actualizar } from '../store/usuario'
import { cerrarSesion, miUsuario } from '../store/sesion'

const { push } = useRouter()
const modalElement = ref()
const dropdownButton = ref()
let modalInstance
let dropdownInstance
const opinionDefaults = {
  recomendacion: "",
  tuvoError: "",
  comentario: "",
}

const formItem = computed(() => {
  if (!item.value || typeof item.value !== "object") {
    item.value = { ...opinionDefaults }
  }

  return item.value
})

const asegurarCamposOpinion = () => {
  if (!item.value || typeof item.value !== "object") {
    item.value = {}
  }

  if (item.value.recomendacion === undefined || item.value.recomendacion === null) {
    item.value.recomendacion = opinionDefaults.recomendacion
  }
  if (item.value.tuvoError === undefined || item.value.tuvoError === null) {
    item.value.tuvoError = opinionDefaults.tuvoError
  }
  if (item.value.comentario === undefined || item.value.comentario === null) {
    item.value.comentario = opinionDefaults.comentario
  }
}

onMounted(() => {
  leer(miUsuario().uid)
  asegurarCamposOpinion()

  if (modalElement.value) {
    modalInstance = new bootstrap.Modal(modalElement.value)
  }
  if (dropdownButton.value) {
    dropdownInstance = new bootstrap.Dropdown(dropdownButton.value)
  }
})

onBeforeUnmount(() => {
  modalInstance?.dispose?.()
  dropdownInstance?.dispose?.()
})

watch(
  () => registro.value,
  () => {
    const valores = registro.value.find((registroItem) => registroItem.idUsuario == miUsuario().uid)
    if (valores != undefined) {
      leerEnRegistro(miUsuario().uid)
      asegurarCamposOpinion()
    }
  }
)

const adios = () => {
  push({ name: 'iniciar-sesion' })
}

const dejaOpinion = () => {
  asegurarCamposOpinion()
  return actualizar(item.value)
}

const cerrar = () => {
  modalInstance?.hide()
}

const abrirOpinion = () => {
  asegurarCamposOpinion()
  modalInstance?.show()
}

const toggleSesionMenu = () => {
  dropdownInstance?.toggle()
}

const cerrarSesionMenu = () => {
  dropdownInstance?.hide()
}

const irAConfiguracion = () => {
  cerrarSesionMenu()
  push({ name: 'usuario' })
}

const salirSesion = () => {
  cerrarSesionMenu()
  cerrarSesion()
  adios()
}
</script>

<template lang="pug">
teleport(to='body')
  #exampleModal.modal.fade(ref='modalElement' tabindex='-1')
    .modal-dialog.modal-dialog-centered
      .modal-content
        Form(:onPromise='() => dejaOpinion()' :onSuccess='() => cerrar()')
          .modal-header
            h2.primary-text Déjanos tu opinión
            button.btn-close(type='button' @click='cerrar()')
          .modal-body
            p ¿Qué tan probable es que recomiendes QUIRU Dent AI a un amigo o colega?*
            .btn-group(role='group')
              input#btnradio0.btn-check(type='radio' name='btnradio' autocomplete='off' value='0' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio0') 0
              input#btnradio1.btn-check(type='radio' name='btnradio' autocomplete='off' value='1' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio1') 1
              input#btnradio2.btn-check(type='radio' name='btnradio' autocomplete='off' value='2' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio2') 2
              input#btnradio3.btn-check(type='radio' name='btnradio' autocomplete='off' value='3' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio3') 3
              input#btnradio4.btn-check(type='radio' name='btnradio' autocomplete='off' value='4' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio4') 4
              input#btnradio5.btn-check(type='radio' name='btnradio' autocomplete='off' value='5' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio5') 5
              input#btnradio6.btn-check(type='radio' name='btnradio' autocomplete='off' value='6' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio6') 6
              input#btnradio7.btn-check(type='radio' name='btnradio' autocomplete='off' value='7' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio7') 7
              input#btnradio8.btn-check(type='radio' name='btnradio' autocomplete='off' value='8' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio8') 8
              input#btnradio9.btn-check(type='radio' name='btnradio' autocomplete='off' value='9' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio9') 9
              input#btnradio10.btn-check(type='radio' name='btnradio' autocomplete='off' value='10' v-model="formItem.recomendacion")
              label.btn.btn-outline-primary(for='btnradio10') 10
            p.mt-3 ¿Tuviste algún problema en el uso de la aplicación?
              .form-check.form-check-inline
                input#inlineRadio1.form-check-input(type='radio' name='inlineRadioOptions' value='SiError' v-model="formItem.tuvoError")
                label.form-check-label(for='inlineRadio1') Si
              .form-check.form-check-inline
                input#inlineRadio2.form-check-input(type='radio' name='inlineRadioOptions' value='NoError' v-model="formItem.tuvoError")
                label.form-check-label(for='inlineRadio2') No
            .siHayError(v-if="formItem.tuvoError == 'SiError'")
              label.form-label Cuéntanos cuál fue el error
              .input-group
                textarea.form-control(v-model="formItem.comentario")
            label.form-label Déjanos un comentario sobre qué podríamos mejorar
            .input-group
              textarea.form-control(v-model="formItem.comentario")
            .modal-footer
              button.btn.btn-secondary(type='button' @click='cerrar()') Cerrar
              button.btn.btn-primary(type='submit') Enviar

.dropdown
  .row.perfil
    .cuadro
      .comentario.mx-2
        button.btn.btn-outline-primary.d-none.d-md-block(type='button' @click='abrirOpinion()')
          i.bi.bi-emoji-smile.me-1
          | Déjanos tu opinión
      button.avatar(type='button' ref='dropdownButton' @click='toggleSesionMenu()' aria-label='Abrir menú de perfil' aria-haspopup='true')
        i.bi.bi-person-circle.session-icon
      ul.dropdown-menu.dropdown-menu-end
        li
          button.dropdown-item(type='button' @click='irAConfiguracion()')
            i.bi.bi-gear(style="color: var(--color-primary)")
            |  Configuración
        li
          button.dropdown-item(type='button' @click='salirSesion()')
            i.bi.bi-box-arrow-right(style="color: var(--color-primary)")
            |  Salir
  .row.sugerenciaMovil
    .col-6
    .col-6.d-flex.justify-content-end
      button.btn.btn-outline-primary.d-block.d-md-none(type='button' @click='abrirOpinion()')
        i.bi.bi-emoji-smile.me-1
        | Sugerencias
</template>

<style lang="sass" scoped>
.puerta
  display: flex
  flex-direction: row
  justify-content: end
  padding: 10px 20px

.sugerenciaMovil
  margin-top: -30px
  padding: 0px

.perfil
  width: 100%
  height: auto
  margin-top: 0
  margin-left: 0px
  margin-right: 0px
  margin-bottom: 0px
  padding: 0px
  .cuadro
    display: flex
    flex-direction: row
    justify-content: end
    align-items: center
    min-height: 3rem
    .avatar
      border: none
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      width: 44px
      height: 44px
      border-radius: 60px
      background: var(--gradient-brand)
      box-shadow: 0 8px 18px rgba(var(--color-primary-rgb), 0.2)
      cursor: pointer
      .session-icon
        font-size: 1.7rem
        color: white

.dropdown-menu
  padding: 0.45rem
  border-color: var(--color-border)
  .dropdown-item
    display: flex
    align-items: center
    gap: 0.55rem
    padding: 0.65rem 0.75rem
    border-radius: 0.65rem
</style>
