<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import '@fullcalendar/core/vdom'
import fullcalendar from '@fullcalendar/vue3'
import dayGrigPlugin from '@fullcalendar/daygrid'
import timeGrigPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/es';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRoute, useRouter } from 'vue-router';
import { obtenerTodos, registro, cita, guardarCita, actualizar, _event } from "../../store/citas";
import { obtenerTodos as obtenerTodosPaciente, leer as LeerPaciente, registro as RegPaciente, item as itemPaciente, leerDniRegistro, guardar as guardarPaciente } from "../../store/paciente";
import { item as ItemUsuario, leer as LeerUser, registro as RegistroUsuario, leerEnRegistro } from '../../store/usuario'
import { miUsuario } from '../../store/sesion'
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
  let newTime = item.start.toLocaleTimeString('en-US');
  let hour = newTime.split(":")[0];
  let amPm = newTime.split(" ")[1];
  let seconds = newTime.split(":")[2].replace(amPm, '');
  let noSeconds = newTime.replace(":" + seconds, ' ');

  let newTim2 = item.end.toLocaleTimeString('en-US');
  let hour2 = newTime.split(":")[0];
  let amPm2 = newTim2.split(" ")[1];
  let seconds2 = newTim2.split(":")[2].replace(amPm2, '');
  let noSeconds2 = newTim2.replace(":" + seconds2, ' ');

  const opciones = { weekday: 'long', month: 'long', day: 'numeric' };
  if (parseInt(hour) < 9) {
    noSeconds = "0" + noSeconds
  }
  if (parseInt(hour2) < 9) {
    noSeconds2 = "0" + noSeconds2
  }
  itemPaciente.value = {}
  horadiotext = item.start.toLocaleDateString('es-ES', opciones) + '     ' + noSeconds + " - " + noSeconds2;
  cita.value = {
    idPaciente: '',
    start: item.start.toISOString(),
    end: item.end.toISOString(),
    title: item.title,
    borderColor: "#0dcaf0",
    backgroundColor: "#37dfbb",
    descripcion: item.descripcion,
    timedisplay: horadiotext,
    fechaDeCreacion: new Date().toISOString().slice(0, 10),
    UserId: ItemUsuario.id
  };
  //registro.value.push(cita)
  let control = document.getElementById("btnschedule");
  if (item) {
    control.click();
  } else {
    control.click();
  }
}
const options = reactive({
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
  slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: true, hour12: true },
  slotMinTime: '08:00:00',
  slotMaxTime: '22:00:00',
  allDaySlot: false,
  contentHeight: 'auto',
  headerToolbar: {
    left: 'prev,next',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  views: {
    dayGridMonth: {
      titleFormat: { month: 'long' }
    },
    timeGridWeek: {
      titleFormat: {
        month: 'short'
      }
    },
    timeGridDay: {
      titleFormat: {
        day: '2-digit'
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
    /*updateEvent(
      {
        id: arg.event.id,
        title: arg.event.title,
        start: arg.event.start,
        end: arg.event.end,
        allDay: arg.event.allDay
      }, arg.event.id
    )*/
  },
  eventRemove: (arg) => {
    //deleteEvent(arg.event.id)
  }
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
  if (mostrar == true) {
    guardarPaciente()
    guardarCitaCompleta()
  }
  else {
    guardarCitaCompleta()
  }
}
const guardarCitaCompleta = () => {
  if (cita.value.id) {
    return actualizar(cita.value);
  }
  else {
    let index = registro.value?.findIndex(i => i.id == cita.value.id);
    if (index == -1 || index == undefined) {
      cita.value.idPaciente = itemPaciente.value.id;
    };
    return guardarCita(cita.value);
  }
};
function isNewPaciente(val) {
  mostrar.value = val.target.checked;
}
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
  .contenido
    fullcalendar(v-bind:options='options')
.row
#btnschedule.button.btn.btn-primary.ms-auto(type='button' hidden="hidden" data-bs-toggle='modal' data-bs-target='#schedule-add') 
#schedule-add.modal(tabindex='-1')
  .modal-dialog
    .modal-content(style="background-color: var(--color-light) !important")
      Form( :onPromise='()=>guardarCitaCompleta()' :onSuccess='()=>closeEvent()')
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
            input.form-control(placeholder='Horario', v-model="cita.timedisplay", readonly, style="font-weight:bold")
          .input-group.mb-3
            span#basic-addon1.input-group-text 
              input.form-check-input(type='checkbox', id="checkbox", v-model="checked", @change="isNewPaciente($event)")
            input.form-control(placeholder='Registrar un nuevo paciente', readonly, style="font-weight:bold")
          .input-group.mb-3(v-if="mostrar == false")
            span#basic-addon1.input-group-text
              i.fa-solid.fa-magnifying-glass
            input.form-control(placeholder='Buscar paciente por DNI', required, v-on:focusout="GetPaciente($event)")
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
              input.form-control(placeholder='DNI Paciente', required , v-model="itemPaciente.numeroDocumento")
            .input-group.mb-3
              span#basic-addon1.input-group-text
                i.fa.fa-at
              input.form-control(placeholder='Email', required, v-model="itemPaciente.email")
              input.form-control(placeholder='Celular', required, v-model="itemPaciente.telefono")
          .input-group.mb-3
            span#basic-addon1.input-group-text 
              i.fa.fa-align-left
            input.form-control(placeholder='Añade una descripción de la cita', v-model="cita.descripcion")
          .input-group.mb-3
            span#basic-addon1.input-group-text 
              i.fa.fa-user-md
            input.form-control(placeholder='Odontólogo', v-model="ItemUsuario.nombre", readonly, style="font-weight:bold")
          .input-group.mb-3
            span#basic-addon1.input-group-text 
              i.fa.fa-paint-brush
            input#exampleColorInput.form-control.form-control-color(type='color', title='Choose your color', v-model="cita.backgroundColor")
        .modal-footer
          button.btn.btn-danger(type='button', data-bs-dismiss='modal') Cancelar
          button.ms-auto.btn.btn-primary(type="submit") Grabar
</template>

<style lang="sass">
.btn-primary
  --bs-btn-color:#fff
  --bs-btn-bg:rgb(55, 223, 187)
  --bs-btn-border-color:rgb(55, 223, 187)
  --bs-btn-hover-color:#fff
  --bs-btn-hover-bg:rgb(55, 223, 187)
  --bs-btn-hover-border-color:rgb(55, 223, 187)
  --bs-btn-focus-shadow-rgb:49, 132, 253
  --bs-btn-active-color:#fff
  --bs-btn-active-bg:rgb(55, 223, 187)
  --bs-btn-active-border-color:rgb(55, 223, 187)
  --bs-btn-active-shadow:inset 0 3px 5px rgba(0, 0, 0, 0.125)
  --bs-btn-disabled-color:#fff
  --bs-btn-disabled-bg:rgb(55, 223, 187)
  --bs-btn-disabled-border-color:rgb(55, 223, 187)
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
.btn-outline-primary
  --bs-btn-color:rgb(55, 223, 187)
  --bs-btn-border-color:rgb(55, 223, 187)
  --bs-btn-hover-color:#fff
  --bs-btn-hover-bg:rgb(55, 223, 187)
  --bs-btn-hover-border-color:rgb(55, 223, 187)
  --bs-btn-focus-shadow-rgb:13, 110, 253
  --bs-btn-active-color:#fff
  --bs-btn-active-bg:rgb(55, 223, 187)
  --bs-btn-active-border-color:rgb(55, 223, 187)
  --bs-btn-active-shadow:inset 0 3px 5px rgba(0, 0, 0, 0.125)
  --bs-btn-disabled-color:rgb(55, 223, 187)
  --bs-btn-disabled-bg:transparent
  --bs-btn-disabled-border-color:rgb(55, 223, 187)
  --bs-gradient:none
thead
    background-color: rgb(55, 223, 187)
th
  border-color: white !important
</style>