<script setup>
import { watch, ref } from "vue"


const props = defineProps(['onEdit', 'onDelete'])

const areYouSure = ref(false)

watch( ()=> areYouSure.value, ()=> {
    if(areYouSure.value) return setTimeout( ()=> areYouSure.value = false, 3000)
})
</script>
<template lang="pug">
.item 
    slot
    button.icon( 
        v-if='onEdit'
        @click=" onEdit() "
    )
        i.fa-solid.fa-pen 
    button.icon( 
        v-if='onDelete'
        :class='{ danger : areYouSure}' 
        @click="areYouSure == false ? areYouSure = true : onDelete() "
    )
        i.fa-solid.fa-trash 
</template>

<style lang="sass">
.item 
    display: flex
    align-items: center
    padding: 0 0.5rem
    margin: 0
    background: var(--color-white)
    border-bottom: 1px solid var(--color-primary)
    &:first-child
        border-top-left-radius: var(--element-border)
        border-top-right-radius: var(--element-border)
    &:last-child
        border-bottom-left-radius: var(--element-border)
        border-bottom-right-radius: var(--element-border)
        border: none
</style>

