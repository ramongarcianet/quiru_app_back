<script setup>
import {computed, ref} from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const filePreview = computed( ()=> 
    props.modelValue.map( item => item instanceof File 
        ? URL.createObjectURL( props.modelValue ) 
        : item.indexOf('https://') > -1 
            ? item
            : "" 
    ) 
)
const file = computed( ()=> props.modelValue )
const getFile = e => e.target.files.length > 0 
    ? emit( 'update:modelValue', e.target.files )
    : null

</script>
<template lang="pug">
input.form-control( v-if="!file || file.length != 0" type='file' accept="image/*,.pdf" @change='getFile'  multiple v-bind='$attrs')
template(v-else)
    Img.m-1( :src='filePreview' style='width: 90%; ' )
        ion-icon( name="close-outline" size='large' @click='emit("update:modelValue")' )
</template>
<style scoped>
ion-icon {
  position: relative;
  top: -50%;
  left: 0%;
  cursor: pointer
}
</style>