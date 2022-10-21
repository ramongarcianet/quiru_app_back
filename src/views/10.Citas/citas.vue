<script setup>
import { ref, reactive, watch } from 'vue'
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
import { obtenerTodos, registro, cita, guardarCita, actualizar } from "../../store/citas";
import { previousPage, nextPage, setList, registro_, search, setListDelete, SetPage } from "../../config/Paginator";

const { push, back } = useRouter();
const route = useRoute()
const obtenerRegistro = obtenerTodos();
let _event = [
  { id: '2', dni: "", start: '2022-10-18T09:00:00', end: '2022-10-18T14:00:00', title: 'event 2', borderColor: "#0dcaf0", backgroundColor: '#fd7e14' },
  { id: '3', dni: "", start: '2022-10-20T12:00:00', end: '2022-10-20T06:00:00', title: 'event 3' },
  { id: '4', dni: "", start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', dni: "", start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', dni: "", start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', dni: "", start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', dni: "", start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', dni: "", start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', dni: "", start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '5', dni: "", start: '2022-10-19T10:00:00', end: '2022-10-19T15:00:00', title: 'event 5' }
];
const id = ref(10)

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
  horadiotext = item.start.toLocaleDateString('es-ES', opciones) + '     ' + noSeconds + " - " + noSeconds2;
  cita.value = {
    idPaciente: item.idPaciente,
    start: item.start,
    end: item.end,
    title: item.title,
    borderColor: "#0dcaf0",
    backgroundColor: '#fd7e14',
    descripcion: '',
    timedisplay: horadiotext,
    fechaDeCreacion: new Date().toISOString().slice(0, 10)
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
  plugins: [dayGrigPlugin, timeGrigPlugin, listPlugin, interactionPlugin, bootstrap5Plugin],
  locale: esLocale,
  nowIndicator: true,
  initialView: 'timeGridWeek',
  businessHours: true,
  timeFormat: 'h(:mm)t',
  selectable: true,
  dayMaxEvents: true,
  weekends: true,
  datesAboveResources: true,
  themeSystem: 'bootstrap5',
  slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: true, hour12: true },
  slotMinTime: '13:00:00',
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
        day: '2-digit'
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
    cal.addEvent({
      id: `${id.value}`,
      title: `New event ${id.value}`,
      start: arg.start,
      end: arg.end
    })
  },
  events: registro,
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

const guardarOActualizar = () => {
  if (cita.value.id) {
    return actualizar(cita.value);
  }
  else {
    let index = registro.value?.findIndex(i => i.id == cita.value.id);
    if (index == -1 || index == undefined) {
      cita.value.idPaciente="00005"
      return guardarCita(cita.value);
    }
    else {
      alert("existe registro")
    }
  }
};
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
#btnschedule.button.btn.btn-primary.ms-auto(type='button' hidden="hidden" data-bs-toggle='modal' data-bs-target='#schedule-add') Ayuda
#schedule-add.modal.fade(tabindex='-1' aria-hidden='true')
  .modal-dialog
    .modal-content
      Form( :onPromise='()=>guardarOActualizar()' :onSuccess='()=>back()')
        // Modal Header
        .modal-header
          h4.modal-title Agregar Cita
          button.close(type='button', data-dismiss='modal') &times;
        // Modal body
        .modal-body    
          .input-group.mb-3
            span#basic-addon1.input-group-text 
              i.fa.fa-text-height(aria-hidden='true')
            input.form-control(type='text' placeholder="Añade un Título", v-model="cita.title")        
          .input-group.mb-3
            span#basic-addon1.input-group-text 
              i.fa.fa-clock-o(aria-hidden='true')
            input.form-control(type='text', placeholder='Horario', v-model="cita.timedisplay")
          .input-group.mb-3
            span#basic-addon1.input-group-text 
              i.fa.fa-user-plus(aria-hidden='true')
            input.form-control(type='text', placeholder='Añade Paciente')
          .input-group.mb-3
            span#basic-addon1.input-group-text 
              i.fa.fa-align-left(aria-hidden='true')
            input.form-control(type='text', placeholder='Añade una Descripción', v-model="cita.descripcion")
          .input-group.mb-3
            span#basic-addon1.input-group-text 
              i.fa.fa-calendar-o(aria-hidden='true')
            input.form-control(type='text', placeholder='Odontólogo')
          .input-group.mb-3
            span#basic-addon1.input-group-text 
              i.fa.fa-paint-brush(aria-hidden='true')
            input#exampleColorInput.form-control.form-control-color(type='color', title='Choose your color' , v-model="cita.backgroundColor")        
        // Modal footer
        .modal-footer
          button.btn.btn-danger(type='button', data-dismiss='modal') Cancelar
          button.ms-auto.btn.btn-primary(type="submit") Grabar
      // Edit Modal
#schedule-edit.modal.fade
  .modal-dialog
    .modal-content
      // Modal Header
      .modal-header
        h4.modal-title Edit Your Schedule
        button.close(type='button', data-dismiss='modal') &times;
      // Modal body
      .modal-body
        form
          .form-group
            label Schedule Name:
            input.form-control(type='text')
      // Modal footer
      .modal-footer
        button.btn.btn-danger(type='button', data-dismiss='modal') Close
        button.btn.btn-success(type='button') Save Your Schedule
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
  color: rgb(55, 223, 187)
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
.nav-link
  color: rgb(55, 223, 187)
.nav-link:hover, .nav-link:focus
    hover-color:#fff
</style>