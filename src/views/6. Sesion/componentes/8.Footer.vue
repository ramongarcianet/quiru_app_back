<script setup>
import { useRouter } from "vue-router";
import Logo from "../../../assets/logoQuiru.vue"

const {push} = useRouter()

</script>

<template lang="pug">

.container.d-flex.w-100
    .d-flex.w-100.justify-content-between.align-items-center
        div
            img( height='50' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/Group%2073%20(1).png?alt=media&token=13f628f8-46ea-41f4-a4f4-b4d2aa604323")
            p.m-0
                small 2022 Quiru | Trujillo - Perú
        .d-flex
            i.fa-brands.fa-facebook.fa-2x.primary-text.me-2
            i.fa-brands.fa-instagram.fa-2x.primary-text
    
</template>

