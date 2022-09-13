<template lang="pug">
.container-fluid.vh-100
    .row
        .col-12.col-md-6.light.d-flex.flex-column.justify-content-center.align-items-center
            Img.w-100( width='500' src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fdescuentos.webp?alt=media&token=681a5c26-f1d3-4c94-a99e-09452c2dddd5 ")
        .col-12.col-md-6.light.d-flex.flex-column.h-100.justify-content-center.align-items-center.p-0
            router-view
</template>
<style lang="sass" scoped>
.container-fluid.vh-100
    background-color: var(--color-primary) 
</style>
