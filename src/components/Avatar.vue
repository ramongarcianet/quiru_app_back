<script setup>
import { onUnmounted, onMounted, ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { item, leer, registro, leerEnRegistro, actualizar  } from '../store/usuario'
import { cerrarSesion, miUsuario } from '../store/sesion'

const route = useRoute()
const { push } = useRouter()
onMounted(() => {
  leer(miUsuario().uid);
});
watch(
    () => registro.value,
    () => {
        let valores= registro.value.find(item => item.idUsuario == miUsuario().uid)
        if(valores !=undefined) {
            leerEnRegistro(miUsuario().uid);
        }
    }
);
const siglas = computed ( ()=> item.nombre.charAt(0) + item.apellido.charAt(0)||"")
const adios = ()=> {
  location.replace('https://app.quiru.app/')
}
const dejaOpinion = () => {
  return actualizar(item.value)
}
const cerrar = ()=> {
  let control = document.getElementById("btnsclose");
  control.click();
}
</script>

<template lang="pug">
#exampleModal.modal.fade(tabindex='-1')
  .modal-dialog
    .modal-content
      Form( :onPromise='() => dejaOpinion()' :onSuccess='() => cerrar()')
        .modal-header
          h2.primary-text Déjanos tu opinión
          #btnsclose.button.btn-close(type='button' data-bs-dismiss='modal')
        .modal-body
          p ¿Qué tan probable es que recomiendes Quiru a un amigo o colega?*
          .btn-group(role='group')
            input#btnradio0.btn-check(type='radio' name='btnradio' autocomplete='off' value='0' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio0') 0
            input#btnradio1.btn-check(type='radio' name='btnradio' autocomplete='off' value='1' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio1') 1
            input#btnradio2.btn-check(type='radio' name='btnradio' autocomplete='off' value='2' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio2') 2
            input#btnradio3.btn-check(type='radio' name='btnradio' autocomplete='off' value='3' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio3') 3
            input#btnradio4.btn-check(type='radio' name='btnradio' autocomplete='off' value='4' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio4') 4
            input#btnradio5.btn-check(type='radio' name='btnradio' autocomplete='off' value='5' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio5') 5
            input#btnradio6.btn-check(type='radio' name='btnradio' autocomplete='off' value='6' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio6') 6
            input#btnradio7.btn-check(type='radio' name='btnradio' autocomplete='off' value='7' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio7') 7
            input#btnradio8.btn-check(type='radio' name='btnradio' autocomplete='off' value='8' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio8') 8
            input#btnradio9.btn-check(type='radio' name='btnradio' autocomplete='off' value='9' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio9') 9
            input#btnradio10.btn-check(type='radio' name='btnradio' autocomplete='off' value='10' v-model="item.recomendacion")
            label.btn.btn-outline-primary(for='btnradio10') 10
          p.mt-3 ¿Tuviste algún problema en el uso de la aplicación?
            .form-check.form-check-inline
              input#inlineRadio1.form-check-input(type='radio' name='inlineRadioOptions' value='SiError'  v-model="item.tuvoError")
              label.form-check-label(for='inlineRadio1') Si
            .form-check.form-check-inline
              input#inlineRadio2.form-check-input(type='radio' name='inlineRadioOptions' value='NoError' v-model="item.tuvoError")
              label.form-check-label(for='inlineRadio2' ) No
          .siHayError(v-if="item.tuvoError == 'SiError' ")
            label.form-label Cuentanos cual fue el error
            .input-group
              textarea.form-control(v-model="item.comentario")
          label.form-label Déjanos un comentario sobre que podriamos mejorar
          .input-group
            textarea.form-control(v-model="item.comentario")
          .modal-footer
            button.btn.btn-secondary(type='button' data-bs-dismiss='modal') Cerrar
            button.btn.btn-primary(type='submit') Enviar
.dropdown(style="height: 3.7rem;")
  .row.perfil
    .cuadro
      .comentario.mx-2
        button.btn.btn-outline-warning.d-none.d-md-block(data-bs-toggle="modal" data-bs-target="#exampleModal" )
          i.fa-regular.fa-face-smile.me-1
          | Déjanos tu opinión
        button.btn.btn-outline-warning.d-block.d-md-none(data-bs-toggle="modal" data-bs-target="#exampleModal" )
          i.fa-regular.fa-face-smile.me-1
          | Sugerencias
      .avatar(type='button' data-bs-toggle='dropdown')
        .text(v-if="item.nombre") {{item.nombre.substr(0,1) + item.nombre.substr(1,1)}}
        .tuerca(v-else)
          i.fa-solid.fa-user.fa-sm(style="color: var(--color-light)")
          
      .col.dropdown-menu.dropdown-menu-end.dropdown-menu-lg-start
        li.d-flex(@click="push({name:'usuario'})" style="cursor: pointer")
        li                    
          a.dropdown-item(@click="push({name:'usuario'})" style="cursor: pointer") 
            i.fa-solid.fa-gear.fa-sm(style="color: var(--color-primary)")
            |     Configuración
        li
        li                    
          a.dropdown-item(@click="cerrarSesion(), adios()" style="cursor: pointer") 
            i.fa-solid.fa-right-from-bracket.fa-sm(style="color: var(--color-primary)")
            |     Salir

</template>
<style lang="sass" scoped>
.puerta
  display: flex
  flex-direction: row
  justify-content: end
  padding: 10px 20px
.perfil
  width: 100%
  height: 90px
  margin-top: -50px
  margin-left: 0px
  margin-right: 0px
  margin-bottom: 0px
  padding: 0px
  .cuadro
    display: flex
    flex-direction: row
    justify-content: end
    align-items: center
    height: 3rem
    .avatar
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      width: 50px
      height: 50px
      border-radius: 60px
      background-color: var(--color-primary)
      .text
        font-size: 20px
        color: var(--color-light)

</style>