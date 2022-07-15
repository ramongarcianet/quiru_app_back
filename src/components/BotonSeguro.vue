<script setup>
import {ref, watch} from 'vue'
const props = defineProps(['onSuccess'])
const quitarSeguro = ref(false)
watch(
  ()=> quitarSeguro.value && setTimeout( 
         ()=> quitarSeguro.value = false,
        3000
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