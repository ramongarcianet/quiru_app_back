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
import { obtenerTodos, registro, updateEstado } from "../../store/citas";
import { previousPage, nextPage, setList, registro_, search, setListDelete, SetPage } from "../../config/Paginator";
const { push } = useRouter()
const route = useRoute()
const obtenerRegistro = obtenerTodos();
let showModal = false;
watch(
  () => registro.value,
  () => {
    setList(registro.value, 1);
  }
)
let _resources = [
  { id: 'a' },
  { id: 'b', eventColor: 'green' },
  { id: 'c', eventColor: 'orange' },
  { id: 'd', eventColor: 'red' }
];
let _event = [
  { id: '2', resourceId: 'a', start: '2022-10-18T09:00:00', end: '2022-10-18T14:00:00', title: 'event 2', borderColor: "#0dcaf0", backgroundColor: '#fd7e14' },
  { id: '3', resourceId: 'b', start: '2022-10-20T12:00:00', end: '2022-10-20T06:00:00', title: 'event 3' },
  { id: '4', resourceId: 'c', start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', resourceId: 'c', start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', resourceId: 'c', start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', resourceId: 'c', start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', resourceId: 'c', start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', resourceId: 'c', start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '4', resourceId: 'c', start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '5', resourceId: 'd', start: '2022-10-19T10:00:00', end: '2022-10-19T15:00:00', title: 'event 5' }
];
const id = ref(10)

function createEvent(item) {
  _event.push({ id: item.id, resourceId: 'd', start: item.start, end: item.end, title: item.title })
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
  resources: _resources,
  events: _event,
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
      // Modal Header
      .modal-header
        h4.modal-title Add Your Schedule
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
        button.btn.btn-success(type='button') Add Your Schedule
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