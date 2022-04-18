<template lang="pug">
.container-fluid
    .row 
        .col-12.col-md-6.light
        .col-12.col-md-6.primary
            router-view
</template>
<style lang="sass" scoped>
.container-fluid
    height: 100vh
    padding: 0
    .row
        height: 100%
        .col-12
            height: 100%
            display: flex
            align-items: center
            justify-content: center
</style>