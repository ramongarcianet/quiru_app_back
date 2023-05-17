<script setup>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { leerEnRegistro, actualizar, leerOdonto, item } from "../../store/formodontograma";
import { onMounted } from "@vue/runtime-core";
import { progressFile, setFile, borrarFile } from '../../store/storage.js';
import { listaDeTratamientos as _Hallazgos } from '../../config/Parametros';
import vSelect from "vue-select"
const { push, back } = useRouter();
const registro = ref([])
const route = useRoute()
if (route.params.idOdontograma) {
  leerOdonto(route.params.idOdontograma)
}
leerEnRegistro(route.params.idOdontograma);
const _listaDeHallazgos = computed(() => {
  return _Hallazgos.filter((elem) => elem.label != "").map(({ label, value }) => ({ label, value }))
});
watch(
  () => item.value?.hallazgos,
  () => {
    let planTrata = (item.value?.planTrata != undefined) ? item.value?.planTrata.length : 0;
    if (item.value?.hallazgos.length > 0 && planTrata == 0) {
      //item.value.planTrata = []
      item.value?.hallazgos.forEach(element => {
        let pz = element.dienteAlterno != "" ? " - " + element.dienteAlterno : "";
        let dg = element.ubicacion != '' ? ' - ' + element.ubicacion : element.ubicacion
        let sg = element.sigla != '' ? ' - ' + element.sigla : '';
        let fila = {
          Pieza: element.diente + pz,
          Diagnostico: element.descripcion + dg + sg,
          Tratamiento: "",
          Cita: "",
          Observación: ""
        }
        registro.value.push(fila)
      });
      //item.value.planTrata=registro.value
      //console.log(item.value.planTrata)
    }
    else if (planTrata > 0) {
      item.value?.planTrata.forEach(element => {
        let fila = {
          Pieza: element.Pieza,
          Diagnostico: element.Diagnostico,
          Tratamiento: element.Tratamiento,
          Cita: element.Cita,
          Observación: element.Observación
        }
        registro.value.push(fila)
      });
    }
  },
  { deep: true }
)
const mensaje = ref('')
const hayError = ref(false)
const crear_ = () => new Promise(async (resolve, reject) => {
  try {
    item.value.planTrata = registro.value
    await actualizar(route.params.idOdontograma)
    progressFile.value = 0
    hayError.value = false
    resolve()
  }
  catch (e) {
    hayError.value = true
    reject(e)
  }
})
//const test = (item) => console.log(item)
</script>
<template lang="pug">
.row
  .col-7.col-md-9
    h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Plan de
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Tratamiento
    button.btn.btn-outline-primary.border-0(@click="back()" )
      i.fa-solid.fa-arrow-left-long.fa-xl
  .col-5.col-md-3
.row
  .col.m-2
    Form( :onPromise="() => crear_(item)" :onSuccess='()=>mensaje= "Actualizado con éxito"' :onCatch='(e) => mensaje = e') 
      .row
        .div(style="background-color: white; border-radius: 2%;")
          table.table.table-hover
            thead(style='position: sticky;top: 0; background-color: var(--color-light)!important; font-weight: bold; color:rgb(57, 93, 86);')
              tr
                th Pieza
                th Diagnóstico
                th Tratamiento 
                th Cita 
                th Observación 
            tbody
              tr(v-for="item of registro")
                td {{ item.Pieza }} 
                td {{ item.Diagnostico }} 
                td    
                  v-select(style ='width: 100%; padding-left: 0.4rem' v-model='item.Tratamiento' :options='_listaDeHallazgos' placeholder='Seleccione un tratamiento' )      
                td 
                  input#party(type='datetime-local', v-model="item.Cita")             
                td 
                  textarea.form-control( rows="1" v-model="item.Observación")
      .row.mt-2
        #mensaje.alert.alert-dismissible( v-if='mensaje' :class='hayError? "alert-danger" : "alert-success" ' ) {{mensaje}}
      .d-flex.mt-2
        button.ms-auto.btn.btn-primary(type="submit") Guardar


</template>

<style lang="sass" scoped>
.opciones
  margin-left: auto
  margin-right: auto
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%
  height: auto
  .outline-quiru
    width: 100%
    height: 75px
    border-radius: 50px
    border: 1px solid var(--color-primary)
    background-color: transparent
    display: flex
    flex-direction: row
    justify-content: space-around
    align-items: center
    &.solid
      background-color: var(--color-primary)
    &.disabled
      border: none
      background-color: gray
      
    .contenido
      display: flex
      flex-direction: column
      align-items: start
      justify-content: start
      width: 150px
      .title
        font-weight: 700
        color: var(--color-primary)

        &.light-quiru
          color: var(--color-white)
          background: transparent
      .subtitle
        font-weight: 400
        color: var(--color-primary)
        &.light-quiru
          color: var(--color-white)
    .icono
      font-size: 26px
      color: var(--color-primary)
      &.light-quiru
        color: var(--color-white)

#myCanvas
  border: 1px solid #9c9898

</style>