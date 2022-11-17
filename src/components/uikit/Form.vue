<script setup>
import { ref } from "vue"
const props = defineProps(['onPromise', 'onSuccess', 'onCatch', 'onFunction'])
const loading = ref(false)
const submit = ()=> {
    loading.value = true
   // if(loading.value) return
    if( props.onPromise ) props.onPromise()
        .then((e)=>{
            if(props.onSuccess) props.onSuccess()
            loading.value = false
        }).catch((e)=>{
            if(props.onCatch)props.onCatch(e)
            loading.value = false
        })
    else if ( props.onFunction ) {
        props.onFunction()
        loading.value = false

    }
}

</script>
<template lang="pug">

form( @submit.prevent='submit()' :class='{loading: loading}' )
    slot
</template>

<style lang="sass" >
form
    &.loading
        button[type='submit']
            &::after
                content: '⌛'

</style>