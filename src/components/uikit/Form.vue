<script setup>
import { ref } from "vue"

const props = defineProps(['onPromise', 'onSuccess', 'onCatch', 'onFunction'])
const loading = ref(false)
const submit = ()=> {
    loading.value = true
    if( props.onPromise ) props.onPromise()
        .then(()=>{
            if(props.onSuccess) props.onSuccess()
            loading.value = false
        }).catch(()=>{
            if(props.onCatch)props.onCatch()
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