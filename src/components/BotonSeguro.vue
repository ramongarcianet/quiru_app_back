<script setup>
import {ref, watch} from 'vue'
const props = defineProps(['onSuccess'])
const quitarSeguro = ref(false)
watch(
  ()=> quitarSeguro.value && setTimeout( 
         ()=> quitarSeguro.value = false,
        1500
       )
)
</script>
<template lang='pug'>
button.btn( @click='quitarSeguro ? onSuccess() : quitarSeguro = true' :class='quitarSeguro? "btn-danger" : ""' )
 slot
</template>