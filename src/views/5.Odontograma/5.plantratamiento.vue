<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { leerEnRegistro, actualizar, leerOdonto, item } from "../../store/formodontograma";
import { progressFile } from '../../store/storage.js';
import { listaDeTratamientos as _Hallazgos } from '../../config/Parametros';
import { esLetra, esNumero } from '../../config/libreria'
import vSelect from "vue-select"
//import { item as itemusuario, actualizar as actualizarUser, leer } from '../../store/usuario'
import { miUsuario } from '../../store/sesion'
import { registroParametro, actualizar as actualizarParametro, guardar as GuardarParametro, obtenerTodos, itemParam } from "../../store/parametros";
const { push, back } = useRouter();
const registro = ref([])
const registroTratamiento = ref([])
const registroActualizado = ref([]);
const registroSeleccionado = ref({})
const registroRevertido = computed(() => registro.value.slice().reverse());
const route = useRoute()
const guardarTratamiento = () => {
  registro.value.push({
    Pieza: '',
    Atendido: false,
    Diagnostico: 'Sin diagnóstico',
    Tratamiento: []
  })
}
const AgregarTratamiento = () => {
  registroTratamiento.value.push({
    Tratamiento: '',
    Fecha: '',
    Precio: 0.0,
    Acuenta: 0.0,
    Resto: 0,
    Observacion: "",
    Receta: ""
  })
}
watch(registroActualizado, (newValue) => {
  registro.value = newValue
}, { deep: true })
if (route.params.idOdontograma) {
  leerOdonto(route.params.idOdontograma)
}
leerEnRegistro(route.params.idOdontograma);
const _listaDeHallazgos = computed(() => {
  return _Hallazgos.filter((elem) => elem.label != "").map(({ label, value }) => ({ label, value }))
});
/*const _listaDeHallazgosManuales = ref([]);
watch(
  () => itemusuario.value?.Diagnosticos,
  () => {
    _listaDeHallazgosManuales.value = itemusuario.value?.Diagnosticos
  }
);*/
const _listaTratamientos = ref([]);

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
          Tratamiento: [],
          Observación: "",
          Atendido: element.Atendido !== undefined ? element.Atendido : false
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
const borrar = (item) => {
  const index = registro.value.indexOf(item)
  if (index !== -1) {
    registro.value.splice(index, 1)
    return actualizar(route.params.idOdontograma)
  }
}
const mensaje = ref('')
const hayError = ref(false)
const crear_ = () => new Promise(async (resolve, reject) => {
  try {
    registro.value.forEach(item => {
      if (item.Atendido === undefined) {
        item.Atendido = false;
      }
      if (item.Diagnostico === undefined) {
        item.Diagnostico = "Sin diagnóstico";
      }
      if (item.Observación === undefined) {
        item.Observación = "";
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
function esNumeroGuion($event) {
  var patron = /^[0-9\s-]+$/;
  if (patron.test($event.key)) {
    return true;
  } else {
    $event.preventDefault();
  }
}
/*const guardarOActualizar = () => {
  return actualizarUser(itemusuario.value)
}*/
onMounted(() => {
  //leer(miUsuario().uid);
  obtenerTodos();
});
function verDiagnostico(fila) {
  registroSeleccionado.value = fila
  registroTratamiento.value = registroSeleccionado.value.Tratamiento;
}
watch(
  () => registroParametro.value,
  () => {
    if (registroParametro.value[0]?.Tratamientos != undefined) {
      registroParametro.value[0]?.Tratamientos.forEach(item => {
        _listaTratamientos.value.push(item);
      })
    }
  }
);
const _listaTratamientos1 = computed(() => {
  itemParam.value = registroParametro.value[0] || [];
  return itemParam.value?.Tratamientos?.filter((elem) => elem.label != "").map(({ label, value }) => ({ label, value }))
});
function crearPT() {
  try {
    registro.value.forEach(_item => {
      if (registroSeleccionado.value.Pieza == _item.Pieza && registroSeleccionado.value.Diagnostico == _item.Diagnostico) {
        registroSeleccionado.value.Tratamiento = registroTratamiento.value;
        _item.Tratamiento = registroSeleccionado.value.Tratamiento;
      }
    });
    item.value.planTrata = registro.value
    //Guardar parametros
    if (registroParametro.value != undefined && registroParametro.value?.Tratamientos == undefined) {
      itemParam.value = registroParametro.value[0];
    }
    if (itemParam.value != undefined && itemParam.value?.Tratamientos == undefined) {
      itemParam.value.Tratamientos = []
    }
    if (itemParam.value != undefined && itemParam.value?.Tratamientos != undefined) {
      registroTratamiento.value.forEach(_item => {
        let filt = _item.Tratamiento?.label || _item.Tratamiento;
        let _Tratamientos = itemParam.value?.Tratamientos.filter((elem) => elem.label == filt);
        if (_Tratamientos.length == 0) {
          itemParam.value?.Tratamientos.push({
            label: filt,
            value: filt
          })
        }
      })
      actualizarParametro(itemParam.value)
    }
    else {
      itemParam.value = {
        UserId: miUsuario().uid,
        Tratamientos: []
      }
      registroTratamiento.value.forEach(_item => {
        let filt = _item.Tratamiento?.label || _item.Tratamiento;
        itemParam.value?.Tratamientos.push({
          label: filt,
          value: filt
        })
      })
      GuardarParametro(itemParam.value)
    }
    registroParametro.value[0] = itemParam.value
    actualizar(route.params.idOdontograma)
    progressFile.value = 0
    hayError.value = false
  }
  catch (e) {
    hayError.value = true
  }
}
const borrarPP = (item) => {
  const index = registroTratamiento.value.indexOf(item)

  if (index !== -1) {
    registroTratamiento.value.splice(index, 1)
    registro.value.forEach(_item => {
      if (registroSeleccionado.value.Pieza == _item.Pieza && registroSeleccionado.value.Diagnostico == _item.Diagnostico) {
        registroSeleccionado.value.Tratamiento = registroTratamiento.value;
        _item.Tratamiento = registroSeleccionado.value.Tratamiento;
      }
    });
    item.value.planTrata = registro.value
    actualizar(route.params.idOdontograma)
  }
}

function crearPT2() {
  try {
    registro.value.forEach(_item => {
      if (registroSeleccionado.value.Pieza == _item.Pieza && registroSeleccionado.value.Diagnostico == _item.Diagnostico) {
        registroSeleccionado.value.Tratamiento = registroTratamiento.value;
        _item.Tratamiento = registroSeleccionado.value.Tratamiento;
      }
    });
    item.value.planTrata = registro.value
    //Guardar parametros
    if (registroParametro.value != undefined && registroParametro.value?.Tratamientos == undefined) {
      itemParam.value = registroParametro.value[0];
    }
  
    registroParametro.value[0] = itemParam.value
    actualizar(route.params.idOdontograma)
    progressFile.value = 0
    hayError.value = false
  }
  catch (e) {
    hayError.value = true
  }
}


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
    .row.align-items-center.p-1
      .text-end
        button.ms-auto.btn.btn-primary(@click="guardarTratamiento()")
          .row
            .col-2
              i.fa.fa-solid.fa-circle-plus
            .col-9
              h4 Agregar
    Form( :onPromise="() => crear_(item)" :onSuccess='()=>mensaje= "Actualizado con éxito"' :onCatch='(e) => mensaje = e') 
      .row
        .card(style="border-radius: 30px; background-color:var(--color-light) !important;")
          .row.align-items-center.p-1(style="color:rgb(57, 93, 86);font-weight: bold;")
            .col-2 Pieza
            .col-4 Diagónstico
            .col-2 Planinicar
            .col-2 Atender
            .col-1 
        //vista móvil
        //vista pc
        .card(v-for="item of registroRevertido" style="border-radius: 40px")
          .row.align-items-center.p-1
            .col-2(v-if="item.Pieza.length <= 5 && item.Diagnostico == 'Sin diagnóstico' && !item.Tratamiento?.label")
              input.form-control(v-model="item.Pieza" @keypress="esNumeroGuion($event)" type="text" maxlength="7")
            .col-2(v-else) {{ item.Pieza }}
            .col-4 {{ item.Diagnostico }}
            .col-2
              button.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-3.align-items-center(@click="verDiagnostico(item)" type='button' style="width: 3rem;", data-bs-toggle='modal', data-bs-target='#tratamientosModal')               
                i.fa-solid.fa-list(style="color: white")
            .col-3
              button.text-white.text-start.btn.btn-primary.d-flex.justify-content-between.px-3.align-items-center(@click="verDiagnostico(item)" type='button' style="width: 3rem;", data-bs-toggle='modal', data-bs-target='#tratamientosAtModal')               
                i.fa-solid.fa-notes-medical(style="color: white")
            .col-1.text-center
              BotonSeguro.mt-0( :onSuccess= '() => borrar(item)' )
                i.fa.fa-trash-o
      .row.mt-2
        .alert.alert-dismissible( v-if='mensaje' role='alert' :class='hayError? "alert-danger" : "alert-success" ' ) 
          strong {{mensaje}}
          button.btn-close(type='button' data-bs-dismiss='alert')
      .d-flex.mt-2.mb-5
        button.ms-auto.btn.btn-primary(type="submit") Guardar


  #tratamientosModal.modal.fade(tabindex='-1', aria-labelledby='exampleModalLabel', aria-hidden='true')
    .modal-dialog.modal-fullscreen
      .modal-content
        .modal-header
          h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Generar plan de Tratamiento
          button.btn-close(type='button', data-bs-dismiss='modal', aria-label='Close')
        .modal-body
          form
            .mb-3
              .row
                .col-xs-12.col-sm-4.col-md-4.col-lg-5
                  h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Diagónstico:  {{registroSeleccionado.Diagnostico}}                 
                .col-xs-12.col-sm-4.col-md-4.col-lg-3
                  h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Pieza: {{registroSeleccionado.Pieza}}
                .col-xs-12.col-sm-4.col-md-4.col-lg-2
                  button.btn.btn-primary(type='button' @click="AgregarTratamiento()") Agregar tratamiento
            .mb-3
              .row
                .card(style="border-radius: 30px; background-color:var(--color-light) !important;")
                  .row.p-1(style="color:rgb(57, 93, 86);font-weight: bold;")
                    .col-xs-12.col-sm-4.col-md-3.col-lg-4 Tratamiento
                    .col-xs-12.col-sm-2.col-md-3.col-lg-2 Fecha
                    .col-xs-12.col-sm-2.col-md-2.col-lg-1.text-center Precio
                    .col-xs-12.col-sm-2.col-md-2.col-lg-1.text-center A cuenta
                    .col-xs-12.col-sm-2.col-md-1.col-lg-1.text-center Resto
                    .col-xs-12.col-sm-1.col-md-1.col-lg-1
                .card(v-for="item of registroTratamiento" style="border-radius: 40px; border-color: #839192")
                  .row.p-1
                    .col-xs-12.col-sm-4.col-md-3.col-lg-4
                      v-select(v-model='item.Tratamiento' :options='_listaTratamientos1' placeholder='Seleccione/Agregue' taggable)     
                    .col-xs-12.col-sm-2.col-md-3.col-lg-2
                      input.form-control#party(v-model='item.Fecha' type='datetime-local', name='partydate')
                    .col-xs-12.col-sm-2.col-md-2.col-lg-1
                      input.form-control(v-model='item.Precio' maxlength="7" style="text-align: right;" type="number" min="0.00" max="10000.00" step="0.01")
                    .col-xs-12.col-sm-2.col-md-2.col-lg-1
                      input.form-control(v-model='item.Acuenta' maxlength="7" style="text-align: right;"  type="number" min="0.00" max="10000.00" step="0.01")
                    .col-xs-12.col-sm-2.col-md-1.col-lg-1.text-center {{ item.Precio - item.Acuenta }}
                    .col-xs-12.col-sm-1.col-md-1.col-lg-1.text-center
                      BotonSeguro.mt-0(  @click="borrarPP(item)" )
                        i.fa.fa-trash-o
                .card(style="border-radius: 30px; background-color:var(--color-light) !important;")
                  .row.p-1(style="color:rgb(57, 93, 86);font-weight: bold;")
                    .col-xs-12.col-sm-4.col-md-3.col-lg-4 
                    .col-xs-12.col-sm-2.col-md-3.col-lg-2 Total
                    .col-xs-12.col-sm-2.col-md-2.col-lg-1(style="text-align: right;") {{ registroTratamiento.reduce((acc, array) => acc + array.Precio, 0) }}
                    .col-xs-12.col-sm-2.col-md-2.col-lg-1(style="text-align: right;") {{ registroTratamiento.reduce((acc, array) => acc + array.Acuenta, 0) }}
                    .col-xs-12.col-sm-2.col-md-1.col-lg-1.text-center {{registroTratamiento.reduce((acc, array) => acc + array.Precio, 0) - registroTratamiento.reduce((acc, array) => acc + array.Acuenta, 0)}}
                    .col-xs-12.col-sm-1.col-md-1.col-lg-1
        .modal-footer
          button.btn.btn-secondary(type='button', data-bs-dismiss='modal') Cancelar
          button.btn.btn-primary(type='button'  @click="crearPT()") Grabar


  #tratamientosAtModal.modal.fade(tabindex='-1', aria-labelledby='exampleModalLabel', aria-hidden='true')
    .modal-dialog.modal-fullscreen
      .modal-content
        .modal-header
          h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") Atender
          button.btn-close(type='button', data-bs-dismiss='modal', aria-label='Close')
        .modal-body
          form
            .mb-3
              .row
                .col-xs-12.col-sm-4.col-md-4.col-lg-5
                  h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Diagónstico:  {{registroSeleccionado.Diagnostico}}                 
                .col-xs-12.col-sm-4.col-md-4.col-lg-3
                  h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Pieza: {{registroSeleccionado.Pieza}}
             
            .mb-3
              .row
                .card(style="border-radius: 30px; background-color:var(--color-light) !important;")
                  .row.p-1(style="color:rgb(57, 93, 86);font-weight: bold;")
                    .col-xs-12.col-sm-4.col-md-3.col-lg-4 Tratamiento
                    .col-xs-12.col-sm-2.col-md-3.col-lg-4 Comentarios
                    .col-xs-12.col-sm-2.col-md-2.col-lg-4 Receta
                .card(v-for="item of registroTratamiento" style="border-radius: 40px; border-color: #839192")
                  .row.p-1
                    .col-xs-12.col-sm-2.col-md-3.col-lg-4 {{item.Tratamiento.label}}
                    .col-xs-12.col-sm-2.col-md-3.col-lg-4
                      textarea.form-control( rows="1" v-model="item.Observación" placeholder='Comentarios')
                    .col-xs-12.col-sm-2.col-md-2.col-lg-4
                      textarea.form-control( rows="1" v-model="item.Receta" placeholder='Receta')                    

        .modal-footer
          button.btn.btn-secondary(type='button', data-bs-dismiss='modal') Cancelar
          button.btn.btn-primary(type='button'  @click="crearPT2()") Grabar

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