<template lang="pug">
.container-fluid.vh-100
    .row
        .col-12.col-md-6.light.d-flex.flex-column.justify-content-center.align-items-center
            Img.w-100( width='500' src="https://firebasestorage.googleapis.com/v0/b/quiru-b444f.appspot.com/o/landing%2FGroup%20153.png?alt=media&token=f5263883-0fe1-48b1-98af-fd08ad11149c")
        .col-12.col-md-6.light.d-flex.flex-column.h-100.justify-content-center.align-items-center.p-0
            router-view
</template>
<style lang="sass" scoped>
.container-fluid.vh-100
    background-color: var(--color-primary) 
</style>
