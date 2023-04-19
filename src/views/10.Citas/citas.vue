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
import { item as ItemUsuario, leer as LeerUser, registro as RegistroUsuario, leerEnRegistro } from '../../store/usuario'
import { miUsuario, item as itemUser } from '../../store/sesion'
import { esLetra, esNumero } from '../../config/libreria'
import { gapi } from 'gapi-script';
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const maxDocumento = ref(9);
const { push, back } = useRouter();
const route = useRoute()
const _obtenerRegistro = obtenerTodos();
const _obtenerTodosPaciente = obtenerTodosPaciente();
const NombreDoctor = ref("");
let itemSelect = {};
let EventSelect = {};
let gcalendar = {};
let _calendarId = "";
onMounted(() => {
  LeerUser(miUsuario().uid);
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: 'AIzaSyCjAPoUZWjo_-xUEsgpiLn9-2TLcAcpJZ0',
      clientId: '226083957898-5bq5sd9ha906pq41oiha6bsb6ae82jp7.apps.googleusercontent.com',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar'
    }).then(() => {
      gapi.client.calendar.calendarList.list().then(function (response) {
        var calendars = response.result.items;
        for (var i = 0; i < calendars.length; i++) {
          var calendar = calendars[i];
          _calendarId = calendar.id
        }
      }
        , (error) => {
          signIn()
        });
    }, (error) => {
      console.log('Error loading Google API client:', error);
    });
  });
});
function getEvents() {
  var request = gapi.client.calendar.events.list({
    'calendarId': _calendarId,
    'timeMin': (new Date(2023, 3, 1)).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  });

  request.execute(function (response) {
    var events = response.items;
    console.log(events);
  });
}
function signIn() {
  gapi.auth2.getAuthInstance().signIn().then(function (googleUser) {
    gapi.client.calendar.calendarList.list().then(function (response) {
      var calendars = response.result.items;
      for (var i = 0; i < calendars.length; i++) {
        var calendar = calendars[i];
        _calendarId = calendar.id
        console.log('Calendar ID:', calendar.id);
        console.log('Calendar Summary:', calendar.summary);
        console.log('Calendar Time Zone:', calendar.timeZone);
      }
    });
  }
    , (error) => {
      console.log('Error signing in user:');
    });
}

function addEvent(_cita) {
  const startDate = new Date(itemSelect.start);
  const endDate = new Date(itemSelect.end);
  startDate.setTime(startDate.getTime() + (5 * 60 * 60 * 1000));
  endDate.setTime(endDate.getTime() + (5 * 60 * 60 * 1000));
  const event = {
    'summary': _cita.title,
    'location': _cita.location,
    'description': 'Cita Odontológica',
    'start': {
      'dateTime': startDate.toISOString(),
      'timeZone': userTimeZone
    },
    'end': {
      'dateTime': endDate.toISOString(),
      'timeZone': userTimeZone
    },
    'reminders': {
      'useDefault': false,
      'overrides': [
        { 'method': 'popup', 'minutes': 30 }
      ]
    },
    'attendees': [
      {
        "email": miUsuario().email,
        "responseStatus": "needsAction"
      },
      {
        "email": _cita.email,
        "responseStatus": "needsAction"
      }
    ],
    'timeZone': userTimeZone
  };

  const request = gapi.client.calendar.events.insert({
    'calendarId': _calendarId,
    'resource': event
  });

  request.execute((event) => {
    _cita.gcalendar = event.result
    guardarCita(_cita)
  });
}

function updateEventGCal(arg, sumary) {
  let item_data = registro.value.find(item => item.id == arg.id)
  const eventId = item_data.gcalendar.id;
  const startDate = new Date(arg.start);
  const endDate = new Date(arg.end);
  startDate.setTime(startDate.getTime() + (5 * 60 * 60 * 1000));
  endDate.setTime(endDate.getTime() + (5 * 60 * 60 * 1000));

  const request = gapi.client.calendar.events.get({
    'calendarId': _calendarId,
    'eventId': eventId
  });

  request.execute((event) => {
    event.summary = (sumary == "") ? item_data.title : sumary;;
    event.start.dateTime = startDate.toISOString();
    event.start.timeZone = userTimeZone;
    event.end.dateTime = endDate.toISOString();
    event.end.timeZone = userTimeZone;
    event.timeZone = userTimeZone;
    const updateRequest = gapi.client.calendar.events.update({
      'calendarId': _calendarId,
      'eventId': eventId,
      'resource': event
    });

    updateRequest.execute((event) => {
      console.log('Evento actualizado: ');
    });
  });
}
function deleteEventGCal(id) {
  let item_data = registro.value.find(item => item.id == id)
  const eventId = item_data.gcalendar.id;

  gapi.client.calendar.events.delete({
    'calendarId': _calendarId,
    'eventId': eventId
  }).then(function (response) {
    console.log('Evento eliminado:');
  }, function (error) {
    console.error('Error al eliminar evento:', error);
  });

}

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
  itemSelect = item
  let horadiotext = ""
  const startDate = new Date(item.start);
  const endDate = new Date(item.end);
  startDate.setTime(startDate.getTime() + (5 * 60 * 60 * 1000));
  endDate.setTime(endDate.getTime() + (5 * 60 * 60 * 1000));

  let newTimeStart = startDate.toLocaleTimeString('es-ES');
  let startStr = newTimeStart.substr(0, 5)
  let newTimeEnd = endDate.toLocaleTimeString('es-ES');
  let endStr = newTimeEnd.substr(0, 5)
  const opciones = { weekday: 'long', month: 'long', day: 'numeric' };
  itemPaciente.value = {}
  horadiotext = startDate.toLocaleDateString('es-ES', opciones) + '     ' + startStr + " - " + endStr;
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
  updateEventGCal(_item, "")
}
function addHoursToDate(date, hours) {
  return new Date(new Date(date).setHours(date.getHours() + hours));
}

function deleteEvent(id) {
  eliminar(id)
  deleteEventGCal(id)
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
  timeZone: userTimeZone,
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
  slotLabelFormat: { hour: 'numeric', minute: '2-digit', omitZeroMinute: true, hour12: true },
  slotMinTime: '08:00:00',
  slotMaxTime: '22:00:00',
  allDaySlot: false,
  height: '100%',
  contentHeight: 'auto',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
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
        month: 'short', day: 'numeric'
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
const guardarCitaCompleta = (idPaciente) => new Promise((resolve, reject) => {
  cita.value.idPaciente = idPaciente || itemPaciente.value.id;
  cita.value.email = "" || itemPaciente.value.email;
  cita.value.location = "" || ItemUsuario.value.nombreconsultorio + " - " + ItemUsuario.value.direccion;
  let index = registro.value?.findIndex(i => i.id == cita.value.id);
  if (index == -1 || index == undefined) {
    addEvent(cita.value)
    resolve()
    return
  }
  else {
    let _item = {
      id: cita.value.id,
      start: cita.value.start,
      end: cita.value.end,
    }
    actualizar(cita.value);
    updateEventGCal(_item, cita.value.title)
    resolve()
    return
  }
});

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
.row.desplazable
  .contenido( style="background-color: #fff")
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
            input.form-control(v-model="cita.timedisplay" readonly style="font-weight:bold")
          .input-group.mb-3
            span#basic-addon1.input-group-text
              input.form-check-input( type='checkbox' id="checkbox" v-model="mostrar" )
            input.form-control(placeholder='Registrar un nuevo paciente', readonly, style="font-weight:bold")
          .input-group.mb-3(v-if="mostrar == false")
            span#basic-addon1.input-group-text
              i.fa-solid.fa-magnifying-glass
            input.form-control(placeholder='Buscar paciente por documento de identidad' required :maxlength="maxDocumento" @keypress="esNumero($event)" v-model="itemPaciente.numeroDocumento" v-on:focusout="GetPaciente($event)")
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
              input.form-control(placeholder='DNI/CE. Paciente', required, :maxlength="maxDocumento" @keypress="esNumero($event)" v-model="itemPaciente.numeroDocumento")
            .input-group.mb-3
              span#basic-addon1.input-group-text
                i.fa.fa-at
              input.form-control(placeholder='Email', type="email" required, v-model="itemPaciente.email")
              input.form-control(placeholder='Celular' required @keypress="esNumero($event)" minlength="9" maxlength="12" v-model="itemPaciente.telefono")
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
        .modal-footer
          button.btn.btn-info(v-if="cita.id" type='button' data-bs-dismiss='modal' @click="push({ name: 'pacienteVer', params: { idPaciente: itemPaciente.id } })") Atender
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
  font-size: 13px
  color: rgb(57, 93, 86)
  text-decoration: inherit
.fc .fc-toolbar-title
  color: rgb(57, 93, 86) !important
.fc .fc-timegrid-slot-label
  color: rgb(57, 93, 86) !important
.fc .fc-toolbar-chunk
  button
    margin:0px 3px

.desplazable
  display: flex
  flex-direction: row
  height: 80vh
  width: auto
  overflow: auto
  
  scroll-snap-type: x mandatory
  padding: 10px
  gap: 12px
  scroll-padding: 10px


  justify-content: start
  align-items: center
  padding-bottom: 40px
  &::-webkit-scrollbar-track 
    border-radius: 50px 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1) 
  &::-webkit-scrollbar-thumb 
    background-color: var(--color-primary) 
    outline: 1px solid var(--color-primary)
    border-radius: 50px 
  &::-webkit-scrollbar 
    width: 1em
    height: 10px
@media (min-width: 800px)
  .desplazable
    display: flex
    flex-direction: row
    height: auto
    width: 100%
    overflow: hidden
    .item
      flex: 0 0 50%
      scroll-snap-align: start
      scroll-snap-stop: always
  .inputs-manual
    display: flex
    justify-content: center
    align-items: center
</style>