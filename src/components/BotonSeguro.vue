<script setup>
import {ref, watchEffect} from 'vue'
const props = defineProps(['onSuccess'])
const quitarSeguro = ref(false)
watchEffect(
  ()=> quitarSeguro.value && setTimeout( 
         ()=> quitarSeguro.value = false,
        2300
       )
)
</script>
<template lang='pug'>
button.btn( @click='quitarSeguro ? onSuccess() : quitarSeguro = true' :class='quitarSeguro? "btn-danger" : ""' )
  span( v-if='quitarSeguro') ¿Estás seguro?
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