<script setup>
import { ref, reactive ,watch} from 'vue'
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

let _resources = [
  { id: 'a' },
  { id: 'b', eventColor: 'green' },
  { id: 'c', eventColor: 'orange' },
  { id: 'd', eventColor: 'red' }
];
let _event = [
  { id: '2', resourceId: 'a', start: '2022-10-18T09:00:00', end: '2022-10-18T14:00:00', title: 'event 2' },
  { id: '3', resourceId: 'b', start: '2022-10-18T12:00:00', end: '2022-10-18T06:00:00', title: 'event 3' },
  { id: '4', resourceId: 'c', start: '2022-10-19T07:30:00', end: '2022-10-19T09:30:00', title: 'event 4' },
  { id: '5', resourceId: 'd', start: '2022-10-19T10:00:00', end: '2022-10-19T15:00:00', title: 'event 5' }
];
const id = ref(10)

function createEvent(item) {
  _event.push({ id: item.id, resourceId: 'd', start: item.start, end: item.end, title: item.title })
}
const options = reactive({
  locale: esLocale,
  nowIndicator: true,
  plugins: [dayGrigPlugin, timeGrigPlugin, listPlugin, interactionPlugin, bootstrap5Plugin],
  initialView: 'timeGridDay',
  themeSystem: 'standard',
  businessHours: true,
  themeSystem: 'bootstrap5',
  headerToolbar: {
    left: 'prev,next',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  //editable: true,
  selectable: true,
  dayMaxEvents: true,
  weekends: true,
  datesAboveResources: true,
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
  eventClick: (arg) => {
    if (arg.event) {
      //arg.event.remove()
    }
  },
  resources: _resources,
  events: _event,
  eventColor: 'rgb(55, 223, 187)',
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


const route = useRoute()
const {push} = useRouter()
const obtenerRegistro = obtenerTodos();

watch(
    () => registro.value,
    () => {
        setList(registro.value, 1);
    }
)
</script>
<template lang="pug">
.row 
  .contenido
    fullcalendar(v-bind:options='options')
</template>

<style lang="sass" setup>
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
body
  color: rgb(55, 223, 187)
.fc .fc-daygrid-day
  background-color: transparent
</style>