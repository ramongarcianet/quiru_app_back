<script setup>
import { onMounted, onUnmounted, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { item, guardar, actualizar, limpiar, leerEnRegistro, revisarDNI, registro, obtenerTodos } from "../../store/paciente";
import { esLetra, esNumero } from '../../config/libreria'
import { connectStorageEmulator } from "@firebase/storage";
const maxDocumento = ref(8);
const obtenerRegistro = obtenerTodos();
const guardarOActualizar = () => {
  var alerta = document.getElementById("alerta");
  alerta.style.display = "none"
  const index = registro.value?.findIndex(i => i.numeroDocumento == item.value.numeroDocumento)
  if (index < 0) {
    return guardar(item.value)
  }
  else {
    if (item.value.id) {
      return actualizar(item.value)
    }
    else {
      alerta.innerHTML = "El N° de DNI ya existe para otro paciente";
      alerta.style.display = "block"
    }
  }
}
const route = useRoute()
const { back, push } = useRouter()
let obtener
if (route.params.idPaciente) {
  leerEnRegistro(route.params.idPaciente)
} else {
  limpiar()
}
onUnmounted(() => {
  if (obtener) obtener();
})
onMounted(() => {
  incompleto();
})
function definirMaxLimit(tipoDocumento) {
  item.value.numeroDocumento = '';
  if (tipoDocumento == 'DNI') {
    maxDocumento.value = 8;
  } else {
    maxDocumento.value = 9;
  }
}
watch(
  () => item.value,
  () => {
    incompleto();
  }
);
function incompleto() {
  var conErrores = '';
  conErrores = conErrores + ((item.value.numeroDocumento?.length < 8) ? ' Número de documento incompleto,' : '');
  conErrores = conErrores + ((item.value.telefono?.length < 9) ? ' el número telefónico debe ser de al menos 9 dígitos,' : '');
  var alerta = document.getElementById("alerta");
  if (alerta != null) {
    if (conErrores.length > 0) {
      alerta.innerHTML = "Te falta completar datos de: " + conErrores + "";
      alerta.style.display = "block"
      btguardar.disabled = true;
    }
    else {
      alerta.innerHTML = "";
      alerta.style.display = "none"
      btguardar.disabled = false;
    }
  }
  return conErrores;
}

</script>

<template lang="pug">
h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Nuevo
h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") paciente
button.btn.btn-outline-primary.border-0(@click="back()" )
  i.fa-solid.fa-arrow-left-long.fa-xl
Form( :onPromise='() => guardarOActualizar()' :onSuccess='() => back()' :onError='incompleto()')
  .row
    .col-md-6 
      label.form-label Nombres y Apellidos*     
      .input-group.mb-12
        input.form-control(placeholder="Nombre", v-model.trim="item.nombre" @keypress="esLetra($event)" required,maxlength="30")
        input.form-control(placeholder="Apellido paterno", v-model.trim="item.apellidoPaterno",type="text" ,required,maxlength="30")
        input.form-control(placeholder="Apellido materno", v-model.trim="item.apellidoMaterno",type="text", required,maxlength="30")

      label.form-label Documento de identidad*
      .input-group.mb-12        
        select.form-select( v-model="item.tipoDocumento",v-on:change="definirMaxLimit(item.tipoDocumento)")
          option(value="DNI") DNI
          option(value="CE") CARNET DE EXTRANJERIA
        input.form-control(v-if='item.id' readonly v-model="item.numeroDocumento" required :maxlength="maxDocumento" :minlength="maxDocumento")
        input.form-control(v-if='!item.id' placeholder="Número documento", v-model="item.numeroDocumento" @keypress="esNumero($event)",required,:maxlength="maxDocumento",:minlength="maxDocumento")
      .row.mb-12
        .col.mb-6
          label.form-label Fecha de nacimiento*
          input.form-control(type="date", v-model="item.fechaNacimiento", max="3000-01-01" onfocus="this.max=new Date().toISOString().split('T')[0]")
        .col.mb-6
          label.form-label Sexo*
          select.form-select(v-model="item.sexo",required)
            option(value="") SELECCIONE
            option(value="M") MASCULINO
            option(value="F") FEMENINO
    .col-md-6
      .col.mb-12
        label.form-label Correo*
        .input-group.mb-12
          input.form-control(placeholder="Correo Electrónico", v-model="item.email", type="email", required,maxlength="30")
      .col.mb-12
        label.form-label Celular*
        .input-group.mb-12
          input.form-control(type="tel", placeholder="Num. celular", v-model="item.telefono",@keypress="esNumero($event)" ,required,minlength="9",maxlength="12")
      .col.mb-12
        label.form-label Consentimiento informado*
        .input-group.mb-12
          select.form-select( v-model="item.constancia")
            option(value="S") SI
            option(value="N") NO
  .col.md-12
    label.form-label Dirección*
    .input-group
      input.form-control(placeholder="Departamento", v-model="item.departamento",type="text" ,required,maxlength="30")
      input.form-control(placeholder="Dirección", v-model="item.Direccion",required,maxlength="40")
  .col.md-12
    label.form-label Comentarios*
    .input-group
      textarea#floatingTextarea.form-control(placeholder='Deja un comentario aquí')
  .col-12.mt-3
    #accordionExample.accordion
    .accordion-item.border.border-dark
      h2#headingOne.accordion-header
        button.accordion-button.collapsed(type='button' data-bs-toggle='collapse' data-bs-target='#HCGeneral')
          | Historia médica general
      #HCGeneral.accordion-collapse.collapse(data-bs-parent='#accordionExample')
        .accordion-body
          .row
            .col-12.col-md-6
              label.form-label Centro laboral
              .input-group.mb-2
                input.form-control(placeholder="Centro laboral", v-model="item.centroLaboral" maxlength="25")
            .col-12.col-md-6
              label.form-label Ocupación
              .input-group.mb-2
                input.form-control( placeholder="Ocupación", v-model="item.ocupacion" maxlength="25")
            .col-6
              label.form-label.col-12 1. ¿Está en la actualidad bajo tratamiento médico?
              .form-check.form-check-inline
                input#inlineRadio11.form-check-input(type='radio' name='inlineRadioOptions' v-model="item.askHCG1" value='Si')
                label.form-check-label(for='inlineRadio11') Si
              .form-check.form-check-inline
                input#inlineRadio12.form-check-input(type='radio' name='inlineRadioOptions' v-model="item.askHCG1" value='No')
                label.form-check-label(for='inlineRadio12') No
            .col-6
              label.form-label.col-12 2. ¿Tiene reacciones alérgicas o es alérgico a algún farmaco o medicamento?
              .form-check.form-check-inline
                input#inlineRadio21.form-check-input(type='radio' name='inlineRadioOptions2' v-model="item.askHCG2" value='Si')
                label.form-check-label(for='inlineRadio21') Si
              .form-check.form-check-inline
                input#inlineRadio22.form-check-input(type='radio' name='inlineRadioOptions2' v-model="item.askHCG2" value='No')
                label.form-check-label(for='inlineRadio22') No
            .col-6
              label.form-label.col-12 3. ¿Ha presentado alguna vez una reacción a la anestesia dental o general?
              .form-check.form-check-inline
                input#inlineRadio31.form-check-input(type='radio' name='inlineRadioOptions3' v-model="item.askHCG3" value='Si')
                label.form-check-label(for='inlineRadio31') Si
              .form-check.form-check-inline
                input#inlineRadio32.form-check-input(type='radio' name='inlineRadioOptions3' v-model="item.askHCG3" value='No')
                label.form-check-label(for='inlineRadio32') No
            .col-6
              label.form-label.col-12 4. ¿Se le ha intervenido alguna vez?
              .form-check.form-check-inline
                input#inlineRadio41.form-check-input(type='radio' name='inlineRadioOptions4' v-model="item.askHCG4" value='Si')
                label.form-check-label(for='inlineRadio41') Si
              .form-check.form-check-inline
                input#inlineRadio42.form-check-input(type='radio' name='inlineRadioOptions4' v-model="item.askHCG4" value='No')
                label.form-check-label(for='inlineRadio42') No
            .col-6
              label.form-label.col-12 5. ¿Ha estado alguna vez hospitalizado?
              .form-check.form-check-inline
                input#inlineRadio51.form-check-input(type='radio' name='inlineRadioOptions5' v-model="item.askHCG5" value='Si')
                label.form-check-label(for='inlineRadio51') Si
              .form-check.form-check-inline
                input#inlineRadio52.form-check-input(type='radio' name='inlineRadioOptions5' v-model="item.askHCG5" value='No')
                label.form-check-label(for='inlineRadio52') No
            .col-6
              label.form-label.col-12 6. Cuando sube las escaleras o pases ¿ha tenido que pararse por dolor torácico o cansancio?
              .form-check.form-check-inline
                input#inlineRadio61.form-check-input(type='radio' name='inlineRadioOptions6' v-model="item.askHCG6" value='Si')
                label.form-check-label(for='inlineRadio61') Si
              .form-check.form-check-inline
                input#inlineRadio62.form-check-input(type='radio' name='inlineRadioOptions6' v-model="item.askHCG6" value='No')
                label.form-check-label(for='inlineRadio62') No
            .col-6
              label.form-label.col-12 7. ¿Ha perdido o ganado involuntariamente más de 4.5Kg en el último año?
              .form-check.form-check-inline
                input#inlineRadio71.form-check-input(type='radio' name='inlineRadioOptions7' v-model="item.askHCG7" value='Si')
                label.form-check-label(for='inlineRadio71') Si
              .form-check.form-check-inline
                input#inlineRadio72.form-check-input(type='radio' name='inlineRadioOptions7' v-model="item.askHCG7" value='No')
                label.form-check-label(for='inlineRadio72') No
            .col-6
              label.form-label.col-12 8. ¿Esta siguiendo alguna dieta especial?
              .form-check.form-check-inline
                input#inlineRadio81.form-check-input(type='radio' name='inlineRadioOptions8' v-model="item.askHCG8" value='Si')
                label.form-check-label(for='inlineRadio81') Si
              .form-check.form-check-inline
                input#inlineRadio82.form-check-input(type='radio' name='inlineRadioOptions8' v-model="item.askHCG8" value='No')
                label.form-check-label(for='inlineRadio82') No
            .col-6
              label.form-label.col-12 9. ¿Tiene contacto, por su trabajo, con sangre, derivados sanguíneos o agujas?
              .form-check.form-check-inline
                input#inlineRadio91.form-check-input(type='radio' name='inlineRadioOptions9' v-model="item.askHCG9" value='Si')
                label.form-check-label(for='inlineRadio91') Si
              .form-check.form-check-inline
                input#inlineRadio92.form-check-input(type='radio' name='inlineRadioOptions9' v-model="item.askHCG9" value='No')
                label.form-check-label(for='inlineRadio92') No
            .col-6(v-if="item.sexo === 'F'")
              label.form-label.col-12 10. ¿Está embarazada?
              .form-check.form-check-inline
                input#inlineRadio01.form-check-input(type='radio' name='inlineRadioOptions0' v-model="item.askHCG0" value='Si')
                label.form-check-label(for='inlineRadio01') Si
              .form-check.form-check-inline
                input#inlineRadio02.form-check-input(type='radio' name='inlineRadioOptions0' v-model="item.askHCG0" value='No')
                label.form-check-label(for='inlineRadio02') No
          .row
            .col-6
              label.form-label Peso   
              input.form-control(placeholder="Peso g.", v-model="item.peso" @keypress="esNumero($event)" maxlength="4")
            .col-6
              label.form-label Estatura
              input.form-control(placeholder="Altura cm.", v-model="item.estatura" @keypress="esNumero($event)" maxlength="5")

  .col-12.col-md-4.mx-auto.mt-3.mb-5
    button#btguardar.w-100.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-5.align-items-center(
      type='submit', disabled style="border-radius: 50px"
    )
      span
        small
          strong(v-if="!item.id") Guardar
          strong(v-if="item.id") Actualizar
        p.mb-0(v-if="!item.id") Nuevo Paciente
        p.mb-0(v-if="item.id") Paciente
      i.fa-solid.fa-save.fa-lg.ms-5(style=" color: white;")
  .row.mt-2
    #alerta.alert.alert-danger.alert-dismissible(style='display:none')   
      strong Cuidado! te falta completar campos
</template>


