<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import '@fullcalendar/core/vdom'
import fullcalendar from '@fullcalendar/vue3'
import { Calendar } from '@fullcalendar/core';
import dayGrigPlugin from '@fullcalendar/daygrid'
import timeGrigPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
//import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRoute, useRouter } from 'vue-router';
import { obtenerTodos, registro, cita, guardarCita, actualizar, _event, eliminar } from "../../store/citas";
import { obtenerTodos as obtenerTodosPaciente, leer as leerPaciente, registro as RegPaciente, item as itemPaciente, leerDniRegistro, guardar as guardarPaciente, leerEnRegistro as leerEnRegistroPac } from "../../store/paciente";
import { item as ItemUsuario, leer as LeerUser, registro as RegistroUsuario, leerEnRegistro, item } from '../../store/usuario'
import { miUsuario } from '../../store/sesion'
import { isLetter, isNumber } from '../../config/libreria'
const maxDocumento = ref(9);
const { push, back } = useRouter();
const route = useRoute()
const _obtenerRegistro = obtenerTodos();
const _obtenerTodosPaciente = obtenerTodosPaciente();
const NombreDoctor = ref("");
onMounted(() => {
  LeerUser(miUsuario().uid);
});
watch(
  () => RegistroUsuario.value,
  () => {
    let valores = RegistroUsuario.value.find(item => item.idUsuario == miUsuario().uid)
    if (valores != undefined) {
      leerEnRegistro(miUsuario().uid);
      NombreDoctor.value = ItemUsuario.nombre + " " + ItemUsuario.apellidoPaterno
    }
  }
);

const id = ref(10)
const mostrar = ref(false);
function createEvent(item) {
  let horadiotext = ""
  let newTimeStart = item.start.toLocaleTimeString('es-ES');
  let startStr = newTimeStart.substr(0, 5)
  let newTimeEnd = item.end.toLocaleTimeString('es-ES');
  let endStr = newTimeEnd.substr(0, 5)
  const opciones = { weekday: 'long', month: 'long', day: 'numeric' };
  itemPaciente.value = {}
  horadiotext = item.start.toLocaleDateString('es-ES', opciones) + '     ' + startStr + " - " + endStr;
  cita.value = {
    idPaciente: '',
    start: item.start.toISOString(),
    end: item.end.toISOString(),
    title: item.title,
    borderColor: "#0dcaf0",
    backgroundColor: "#37dfbb",
    timedisplay: horadiotext,
    fechaDeCreacion: new Date().toISOString().slice(0, 10),
    UserId: ItemUsuario.id,
    timeStart: startStr,
    timeEnd: endStr
  };
  let control = document.getElementById("btnschedule");
  if (item) {
    control.click();
  } else {
    control.click();
  }
}
function updateEvent(arg) {
  let horadiotext = ""
  let newTimeStart = arg.start.toLocaleTimeString('es-ES');
  let startStr = newTimeStart.substr(0, 5)
  let newTimeEnd = arg.end.toLocaleTimeString('es-ES');
  let endStr = newTimeEnd.substr(0, 5)

  const opciones = { weekday: 'long', month: 'long', day: 'numeric' };
  itemPaciente.value = {}
  horadiotext = arg.start.toLocaleDateString('es-ES', opciones) + '     ' + startStr + " - " + endStr;
  let _item = {
    id: arg.id,
    start: arg.start.toISOString(),
    end: arg.end.toISOString(),
    timedisplay: horadiotext
  }
  actualizar(_item)
}
function addHoursToDate(date, hours) {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}

function deleteEvent(id) {
  eliminar(id)
}
function viewEvents(_id) {
  let item_data = registro.value.find(item => item.id == _id)
  leerEnRegistroPac(item_data.idPaciente);
  cita.value = {
    idPaciente: item_data.idPaciente,
    start: item_data.start,
    end: item_data.end,
    title: item_data.title,
    borderColor: item_data.borderColor,
    backgroundColor: item_data.backgroundColor,
    timedisplay: item_data.timedisplay,
    fechaDeCreacion: new Date().toISOString().slice(0, 10),
    UserId: item_data.UserId,
    id: item_data.id
  };

  let control = document.getElementById("btnschedule");
  control.click();
}
const options = reactive({
  longPressDelay: 200,
  editable: true,
  selectable: true,
  weekends: true,
  plugins: [dayGrigPlugin, timeGrigPlugin, listPlugin, interactionPlugin, bootstrap5Plugin],
  locale: esLocale,
  nowIndicator: true,
  initialView: 'timeGridWeek',
  timeFormat: 'h(:mm)t',
  dayMaxEvents: true,
  datesAboveResources: true,
  themeSystem: 'bootstrap5',
  slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: true, hour12: false },
  slotMinTime: '08:00:00',
  slotMaxTime: '22:00:00',
  allDaySlot: false,
  contentHeight: 'auto',
  headerToolbar: {
    left: 'prev',
    center: 'title,dayGridMonth,timeGridWeek,today',
    right: 'next'
  },
  views: {
    dayGridMonth: {
      titleFormat: { month: 'long' }
    },
    timeGridWeek: {
      titleFormat: {
        month: 'long'
      }
    },
    listDay: {
      titleFormat: {
        year: 'numeric', month: 'short', day: 'numeric'
      }
    }
  },
  select: (arg) => {
    id.value = id.value + 1
    const cal = arg.view.calendar
    cal.unselect()
    createEvent(
      {
        id: "0",
        title: "",
        start: arg.start,
        end: arg.end
      })
  },
  events: registro.value,
  eventAdd: (arg) => {
    createEvent(
      {
        id: arg.event.id,
        title: arg.event.title,
        start: arg.event.start,
        end: arg.event.end
      }
    )
  },
  eventChange: (arg) => {
    updateEvent(
      {
        id: arg.event.id,
        start: arg.event.start,
        end: arg.event.end,
      }
    )
  },
  eventRemove: (arg) => {
    deleteEvent(
      {

      }, arg.event.id
    )
  },
  eventClick: (arg) => {
    viewEvents(arg.event.id)
  },
})
watch(
  () => registro.value,
  () => {
    let valores = registro.value.find(item => item.UserId == miUsuario().uid)
    if (valores != undefined) {
      options.events = [];
      options.events = registro.value;
    }
  }
);
const guardarAmbas = () => {
  if (mostrar.value == true) {
    return new Promise(resolve => guardarPaciente(itemPaciente.value)
      .then(idPaciente => guardarCitaCompleta(idPaciente)
        .then(() => resolve())))
  }
  else {
    return guardarCitaCompleta()
  }
}
const guardarCitaCompleta = (idPaciente) => {
  cita.value.idPaciente = idPaciente || itemPaciente.value.id;
  let index = registro.value?.findIndex(i => i.id == cita.value.id);
  if (index == -1 || index == undefined) {
    return guardarCita(cita.value);
  }
  else {
    return actualizar(cita.value);
  }
};

function GetPaciente(val) {
  if (val.target.value == '') {
    return
  }
  leerDniRegistro(val.target.value);

}
const guardarPacienteNuevo = () => {
  guardarPaciente().then((id) => {
    guardarCitaCompleta()
  })
}
function closeEvent() {
  let control = document.getElementById("btnsclose");
  control.click();
}
</script>

<template lang="pug">
.row
  .col-4.col-md-9
    h1.my-0(style="color: #395D56; font-size: 1.5em; font-family: var(--font-family)") Lista
    h1(style="color: #37DFBB; font-weight:bold; font-size: 1.5em; font-family: var(--font-family)") de citas
.row
  .contenido(style="overflow-y: scroll; height: 100vh")
    fullcalendar(v-bind:options='options')
.row
#btnschedule.button.btn.btn-primary.ms-auto(type='button' hidden="hidden" data-bs-toggle='modal' data-bs-target='#schedule-add') 
#schedule-add.modal(tabindex='-1')
  .modal-dialog
    .modal-content(style="background-color: var(--color-light) !important")
      Form( :onPromise='()=>guardarAmbas()' :onSuccess='()=>closeEvent()')
        .modal-header
          i.fa.fa-calendar-plus-o.fa-2x(style="color: var(--color-primary)")
          h4.modal-title Agendar Cita
          #btnsclose.button.btn.btn-primary(type='button', data-bs-dismiss='modal') &times;
        .modal-body
          .input-group.mb-3
            span#basic-addon1.input-group-text
              i.fa.fa-text-height
            input.form-control(placeholder="Añade un Título", v-model="cita.title", required)       
          .input-group.mb-3
            span#basic-addon1.input-group-text
              i.fa.fa-clock-o
            input.form-control(v-model="cita.timedisplay"  style="font-weight:bold")
          .input-group.mb-3
            span#basic-addon1.input-group-text
              input.form-check-input( type='checkbox' id="checkbox" v-model="mostrar" )
            input.form-control(placeholder='Registrar un nuevo paciente', readonly, style="font-weight:bold")
          .input-group.mb-3(v-if="mostrar == false")
            span#basic-addon1.input-group-text
              i.fa-solid.fa-magnifying-glass
            input.form-control(placeholder='Buscar paciente por documento de identidad' required :maxlength="maxDocumento" @keypress="isNumber($event)" v-model="itemPaciente.numeroDocumento" v-on:focusout="GetPaciente($event)")
          .input-group.mb-3(v-if="mostrar == false")
            span#basic-addon1.input-group-text
              i.fa.fa-id-card
            input.form-control(placeholder='Nombre Paciente', required, v-model="itemPaciente.nombre" readonly )
            input.form-control(placeholder='Apellido Paciente', required, v-model="itemPaciente.apellidoPaterno" readonly)
          .pacienteNuevo(v-if="mostrar == true")
            .input-group.mb-3
              span#basic-addon1.input-group-text 
                i.fa.fa-user-o
              input.form-control(placeholder='Nombre Paciente', required, v-model="itemPaciente.nombre" )
              input.form-control(placeholder='Apellido Paciente', required, v-model="itemPaciente.apellidoPaterno" )
              input.form-control(placeholder='Apellido Paciente', required, v-model="itemPaciente.apellidoMaterno" )
            .input-group.mb-3
              span#basic-addon1.input-group-text
                i.fa.fa-id-card
              select.form-select(v-model="itemPaciente.tipoDocumento")
                option(value="DNI" selected) DNI
                option(value="CE") CARNET DE EXTRANJERIA
              input.form-control(placeholder='DNI/CE. Paciente', required, :maxlength="maxDocumento" @keypress="isNumber($event)" v-model="itemPaciente.numeroDocumento")
            .input-group.mb-3
              span#basic-addon1.input-group-text
                i.fa.fa-at
              input.form-control(placeholder='Email', type="email" required, v-model="itemPaciente.email")
              input.form-control(placeholder='Celular' required @keypress="isNumber($event)" minlength="9" maxlength="12" v-model="itemPaciente.telefono")
          .input-group.mb-3(hidden="true")
            span#basic-addon1.input-group-text
              i.fa.fa-user-md
            input.form-control(v-model="ItemUsuario.nombre", readonly, style="font-weight:bold")
          .input-group
            span#basic-addon1.input-group-text 
              i.fa.fa-paint-brush
            span#basic-addon1.input-group-text(style="background-color: #37dfbb")
              input#html(type='radio' name='Quiru' value='#37dfbb' checked v-model="cita.backgroundColor")
            span#basic-addon1.input-group-text(style="background-color: #33b679")
              input#html(type='radio' name='Verde' value='#33b679' v-model="cita.backgroundColor")
            span#basic-addon1.input-group-text(style="background-color: #3f51b5")
              input#html(type='radio' name='Azul' value='#3f51b5' v-model="cita.backgroundColor")
            span#basic-addon1.input-group-text(style="background-color: #d50000")
              input#html(type='radio' name='Rojo' value='#d50000' v-model="cita.backgroundColor")
            span#basic-addon1.input-group-text(style="background-color: #f6bf26")
              input#html(type='radio' name='Amarillo' value='#f6bf26' v-model="cita.backgroundColor")
            span#basic-addon1.input-group-text(style="background-color: #933aab")
              input#html(type='radio' name='Morado' value='#933aab' v-model="cita.backgroundColor")
            span#basic-addon1.input-group-text(style="background-color: #e67c73")
              input#html(type='radio' name='Rosado' value='#e67c73' v-model="cita.backgroundColor")
            span#basic-addon1.input-group-text(style="background-color: #616161")
              input#html(type='radio' name='Gris' value='#616161' v-model="cita.backgroundColor")
        .modal-footer
          button.btn.btn-secondary(type='button', data-bs-dismiss='modal') Cancelar
          button.ms-auto.btn.btn-danger(v-if="cita.id" type='button', data-bs-dismiss='modal' @click="deleteEvent(cita.id)") Borrar
          button.ms-auto.btn.btn-primary(type="submit") Grabar
</template>
<style lang="sass">
.btn-primary
  color:#fff
thead
  background-color: rgb(55, 223, 187)
th
  border-color: white !important
.fc-theme-bootstrap5
  .fc-list, .fc-scrollgrid, td, th
    border: 1px solid rgb(55, 223, 187)
.fc .fc-daygrid-day
  background-color: transparent
.fc-theme-bootstrap5 a:not([href]) 
  color: rgb(57, 93, 86)
  text-decoration: inherit
.fc .fc-toolbar-title
  color: rgb(57, 93, 86) !important
.fc .fc-timegrid-slot-label
  color: rgb(57, 93, 86) !important
.fc .fc-toolbar-chunk
  button
    margin:0px 3px
</style>