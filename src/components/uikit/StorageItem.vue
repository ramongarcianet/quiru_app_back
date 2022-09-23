<script setup>
import { computed, ref, watch} from "vue"
import { getMetadataByFileRef, getUrlbyFileRef,  dowFile} from '../../store/storage.js';

const props = defineProps(['storageRef'])
const item = ref()
const url = ref()


if(typeof props.storageRef == "string" ){
    getMetadataByFileRef(props.storageRef).then( r => {
        item.value = r})
    getUrlbyFileRef(props.storageRef).then( r => url.value = r)
}
watch(
    ()=>props.storageRef,
    ()=>{ 
        if(typeof props.storageRef == "string" ) {
            getMetadataByFileRef(props.storageRef).then( r => item.value = r)
            getUrlbyFileRef(props.storageRef).then( r => url.value = r)
        } 
    }
        
)

</script>

<template lang="pug">
td
    a(  :href= 'url' target="_blank") {{item?.name}}  
td {{item?.contentType}}

</template>