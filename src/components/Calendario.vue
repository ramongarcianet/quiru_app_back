<script setup>
  import moment from 'moment'
  import {ref, computed, onMounted} from "vue"
  import {cita } from "../store/citas";
  
  moment.locale('es-ES');
  
  const props = defineProps(['mostrar','selected'])
  const emits = defineEmits(['fecha'])
  const defaultDate = ref(moment(new Date))
  const changeDate = ( q, unit) => defaultDate.value = moment(defaultDate.value).add(q, unit)
  const diaDeSemanaActual = computed( ()=> defaultDate.value.day() )
  const currentMonth = computed( ()=> defaultDate.value.month() )
  const currentMonthTitle = computed( ()=> defaultDate.value.format('MMMM'))
  const currentYear = computed( ()=> defaultDate.value.year())
  const selectDay = ref()
  const diasDelMes = computed( ()=> ( min = false ) => {
    const r = []
    for( let i = 0; i < defaultDate.value.daysInMonth(); i++) {
      
      const date = moment({
        year: currentYear.value,
        month: currentMonth.value,
        date: i+1
      })
      
      if( !min && i == 0 ) {
        const weekDay = date.day()
        for( let j = 0; j < weekDay; j++){
          r.push({})
        }
      }
      
      const today = moment(new Date())
      const isToday = moment( today.format('YYYY-MM-DD') )
        .isSame( moment(date).format('YYYY-MM-DD') )
      
      const isAfter = moment(moment(date).format('YYYY-MM-DD'))
        .isSameOrAfter( today.format('YYYY-MM-DD') )
      const isSelected = moment( moment(selectDay.value) )
        .isSame( moment(date).format('YYYY-MM-DD') )
      
      selectDay
      r.push({index: i, date, value:  date.format("YYYY-MM-DD"),   diaNum: date.format("DD"), diaText: date.format("ddd"), isToday, isAfter, isSelected })
      
      if( !min && i == defaultDate.value.daysInMonth() - 1 ) {
        const weekDay = date.day()
        for( let j = 0; j < 6 - weekDay; j++){
          r.push({})
        }
      }
    }
    return r
  })
  
  const test = day => {
    console.log(day,)
    
  }
  
  onMounted(()=> {
    const body = document.getElementsByClassName("body")
    const days = document.querySelectorAll("[isToday='true'")
    for( let day of days) {
      day.parentNode.scrollLeft = day.offsetLeft
    }
  })
</script>
<template lang="pug">
#calendario(v-if='props.mostrar == "big"')
  .header 
    button.btn( @click='changeDate(-1, "months")')
      ion-icon(name="chevron-back-outline" size="small" style="color: var(--color-primary)")
    div
      h4(style="color: var(--color-dark)") {{currentYear}} 
      h1(style="color: var(--color-primary); font-weight:500") {{currentMonthTitle}} 
    button.btn( @click='changeDate(1, "months")')
      ion-icon(name="chevron-forward-outline" size="small" style="color: var(--color-primary)")
  .body
    div( 
      v-for='dia of diasDelMes()' 
      :isToday='dia.isToday' 
      :isAfter='dia.isAfter' 
      :isSelected='dia.isSelected' 
      @click="selectDay = dia.value, $emit('fecha', dia.value)"
    ) 
      h6.numero {{dia.diaText}}
      h3.nombre {{dia.diaNum}}
#calendario.min(v-if='props.mostrar == "slim"')
  .header 
    button.btn( @click='changeDate(-1, "months")')
        ion-icon(name="chevron-back-outline" size="small" style="color: var(--color-primary)")
    div
      h4(style="color: var(--color-dark)") {{currentYear}} 
      h1(style="color: var(--color-primary); font-weight:500") {{currentMonthTitle}} 
    button.btn( @click='changeDate(1, "months")')
        ion-icon(name="chevron-forward-outline" size="small" style="color: var(--color-primary)")

  .body
    div( 
        v-for='dia of diasDelMes(true)' 
        :isToday='dia.isToday' 
        :isAfter='dia.isAfter' 
        :isSelected='dia.isSelected' 
        @click='selectDay = dia.value, test(dia.value)'
    )
      h5.nombre {{dia.diaNum}}
      h2.numero {{dia.diaText}}
    //-Aqu'i van los elementos filtrados individualmente
    
    //-.contenido
      span xd
    
</template>
<style lang="sass" scoped>
#calendario
  .header
    display: flex
    justify-content: space-evenly
    background-color: var(--color-white)
    height: 100px
    margin-bottom: 0px
    border-radius: 20px 20px 0px 0px
    >div
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      >h4
        color: var(--color-dark) !important
        opacity: .5
  .body
    display: flex
    flex-wrap: wrap
    gap: 4px
    background-color: var(--color-white)
    padding-bottom: 30px
    border-radius: 0px 0px 20px 20px
    >div
      width: calc( (100% - ( 4px * 6 )) / 7)
      height: 50px
      background-color: var(--color-white)
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      background-color: var(--color-white)
      cursor: pointer
      .nombre, .numero
        color: var(--color-dark) !important
        opacity: .5
        margin: 0
      .nombre
        font-weight: 400
        margin-bottom: 0px
        color: var(--color-primary ) !important
      &[isAfter]
        cursor: pointer
      &[isAfter='true']
        background-color: var(--color-white)
        cursor: pointer
        .nombre, .numero
            color: var(--color-dark) !important
            opacity: .5
            margin: 0
        .nombre
            font-weight: 400
            margin-bottom: 0px
            color: var(--color-primary ) !important
      &[isToday='true']
        background: var(--color-primary)
        opacity: .4
        border-radius: 50%
        .nombre, .numero
            color: var(--color-white) !important
            opacity: 1
            margin: 0
            font-weight: 300
        .nombre
            font-weight: 500
            margin-bottom: 0px
        cursor: pointer
      &[isSelected='true']
        border-radius: 50%
        background: var(--color-primary)
        cursor: pointer
        .nombre, .numero
            color: var(--color-white) !important
            margin: 0
            opacity: 1
        .nombre
            font-weight: 400
            margin-bottom: 0px
  &.min
    .header
      display: flex
      justify-content: space-evenly
      background-color: transparent
      height: 100px
      margin-bottom: 0px
      border-radius: 20px 20px 0px 0px
      >div
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        >h4
          color: var(--color-dark) !important
          opacity: .5
    .body
      flex-wrap: nowrap
      width: 100%
      overflow: auto
      background-color: transparent
      >div
        width: 80px
        height: 80px
        border-radius: 50px
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        margin-right: 10px
        flex-shrink: 0
        background-color: var(--color-white)
        .nombre, .numero
            color: var(--color-primary) !important
            margin: 0
        .nombre
            font-weight: 400
            margin-bottom: 0px
        &[isAfter]
            cursor: pointer
        &[isAfter='true']
            background-color: var(--color-white)
            cursor: pointer
            .nombre, .numero
                color: var(--color-primary) !important
                margin: 0
            .nombre
                font-weight: 400
                margin-bottom: 0px
        &[isToday='true']
            background: var(--color-primary)
            opacity: .4
            cursor: pointer
            .nombre, .numero
                color: var(--color-white) !important
                margin: 0
            .nombre
                font-weight: 400
                margin-bottom: 0px
        &[isSelected='true']
            background: var(--color-primary)
            cursor: pointer
            .nombre, .numero
                color: var(--color-white) !important
                margin: 0
            .nombre
                font-weight: 400
                margin-bottom: 0px
      .contenido
        width: 100vw
        height: 50vh
        display: flex
        position: absolute
        bottom: 0
        background-color: red
        z-index: 0


</style>
