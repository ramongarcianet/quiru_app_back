<script setup>
import {ref, watchEffect} from 'vue'
const props = defineProps(['onSuccess'])
const quitarSeguro = ref(false)
const onSuccess_ = () => {
  quitarSeguro.value = false
  props.onSuccess()
}
watchEffect(
  ()=> quitarSeguro.value && setTimeout( 
         ()=> quitarSeguro.value = false,
        2300
       )
)
</script>
<template lang='pug'>
button.btn( @click='quitarSeguro ? onSuccess_() : quitarSeguro = true' :class='quitarSeguro? "btn-danger" : ""' )
  span( v-if='quitarSeguro') Confirmar
  template( v-else )
    slot
</template>
<style scoped lang='sass'>

button
  margin-top: 5px
  line-height: 10px
  span
    font-size: 12px
    
</style>