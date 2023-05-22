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
      item.value?.hallazgos.forEach(element => {
        let pz = element.dienteAlterno != "" ? " - " + element.dienteAlterno : "";
        let dg = element.ubicacion != '' ? ' - ' + element.ubicacion : element.ubicacion
        let sg = element.sigla != '' ? ' - ' + element.sigla : '';
        let fila = {
          Pieza: element.diente + pz,
          Diagnostico: element.descripcion + dg + sg,
          Tratamiento: "",
          Observación: "",
          Atendido: element.Atendido !== undefined ? element.Atendido : false
        }
        if (fila.Atendido === undefined) {
          fila.Atendido = false;
        }
        registro.value.push(fila)
      });
    }
    else if (planTrata > 0) {
      item.value?.planTrata.forEach(element => {
        let fila = {
          Pieza: element.Pieza,
          Diagnostico: element.Diagnostico,
          Tratamiento: element.Tratamiento,
          Observación: element.Observación,
          Atendido: element.Atendido
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
    registro.value.forEach(item => {
      if (item.Atendido === undefined) {
        item.Atendido = false;
      }
    });
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
        //.card.mb-2.p-2.d-block.d-md-none
          .row.align-items-center.p-1
            .input(type='date')
        .card.mb-1.d-md-block.d-none(style="border-radius: 30px; background-color:var(--color-light) !important;")
          .row.align-items-center.p-1(style="color:rgb(57, 93, 86);font-weight: bold;")
            .col-1 Pieza
            .col-3 Diagónstico
            .col-3 Tratamiento
            .col-3 Observación
            .col-2 Atendido
        //vista móvil
        .card.mb-2.p-2.d-block.d-md-none(v-for="item of registro" style="border-radius: 40px")
          .row.align-items-center.p-1
            .col-12.py-1 {{ item.Pieza  }} {{ item.Diagnostico }}
            .col-12.py-1
              v-select(v-model='item.Tratamiento' :options='_listaDeHallazgos' placeholder='Seleccione un tratamiento' )
            .col-12.py-1
              textarea.form-control( rows="1" v-model="item.Observación")
            .col-8.pt-3
              p Tratamiento realizado
            .col-4
              .row
                .col-2
                  label.form-check-label No
                .col-4
                  .form-switch
                    input.form-check-input(type='checkbox' role='switch' v-model="item.Atendido")
                .col-2
                  label.form-check-label Si
        //vista pc
        .card.mb-2.p-2.d-none.d-md-block(v-for="item of registro" style="border-radius: 40px")
          .row.align-items-center.p-1
            .col-1 {{ item.Pieza  }}
            .col-3 {{ item.Diagnostico }}
            .col-3
              v-select(v-model='item.Tratamiento' :options='_listaDeHallazgos' placeholder='Seleccione un tratamiento' )
            .col-3
              textarea.form-control( rows="1" v-model="item.Observación")
            .col-2
              .row
                .col-2
                  label.form-check-label No
                .col-4
                  .form-switch
                    input.form-check-input(type='checkbox' role='switch' v-model="item.Atendido" :disabled="item.Tratamiento === ''")
                .col-2
                  label.form-check-label Si
      .row.mt-2
        #mensaje.alert.alert-dismissible( v-if='mensaje' :class='hayError? "alert-danger" : "alert-success" ' ) {{mensaje}}
      .d-flex.mt-2.mb-5
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