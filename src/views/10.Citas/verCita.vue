<script setup>
  import { useRoute, useRouter } from 'vue-router';
  const route = useRoute()
  const {push} = useRouter()
  
 
</script>
<template lang="pug">

.row
  .col-6.pb-2.col-md-9
    button.mb-3.btn(@click="push({name: 'citas'})")
      ion-icon(name="return-down-back-outline" style="color: var(--color-primary); font-size: 40px" )
    h1.my-0(style="color: #395D56; font-size: 1.8em; font-family: var(--font-family)") Ver
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.8em; font-family: var(--font-family)") cita
  .col-6.col-md-3.align-self-center
    .col.mt-5.left
      button.ms-5.btn(title='Editar' @click="")
        ion-icon(name="create-outline" size="large" style="color: var(--color-primary)")
      button.btn(title='Eliminar' @click="")
        ion-icon(name="notifications-outline" size="large" style="color: var(--color-primary)")
  
.row.eventoInfo
  .col.fecha
    span
      small Lunes 22-09
  .col.info
    h1 16:00
    span
      small Revisión de frenos odontológicos y limpieza con eliminación de caries
  .divider
  .row.mb-3
    .col-md-63
      label.form-label Nombre del paciente
      .input-group.mb-2
        input.form-control(placeholder="Nombre"              disabled)
        input.form-control(placeholder="Apellido paterno"    disabled)
        input.form-control(placeholder="Apellido materno"    disabled)
      label.form-label Datos de contacto
      .input-group.mb-2
        input.form-control(placeholder="Correo Electrónico"  disabled type="email")
        //la opcion de numero podría abrir el cel para efectuar la llamada
        input.form-control(placeholder="Teléfono",           disabled type="tel")
.row
  .col
    button.outline-quiru( @click='' )
      .contenido
        .title Crear
        .subtitle paciente
      ion-icon(name="person-add-outline").icono 

</template>
<style lang="sass" scoped>
.eventoInfo
  display: flex
  flex-direction: column
  justify-content: space-evenly
  align-items: center
  background-color: var(--color-white)
  margin: auto
  padding: 20px
  border-radius: 30px
  margin-top: 15px
  margin-bottom: 25px
  width: 100%
  .divider
    height: .5px
    opacity: .4
    background-color: var(--color-dark)
    width: 90%
    margin-bottom: 40px
    margin-top: 30px
    border: none
    border-radius: 50%
  .fecha
    margin-top: 20px
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    >span
      color: var(--color-dark)
      margin: 0px
      font-weight: 400
      opacity: .4
  .info
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    width: 100%
    >span
      margin-top: 15px
      font-size: 18px
      color: var(--color-dark)
      font-weight: 400
      text-align: center
      width: 70%
    >h1
      color: var(--color-primary)
      font-size: 40px
      font-weight: 400
      letter-spacing: 1px
      margin: 6px
</style>