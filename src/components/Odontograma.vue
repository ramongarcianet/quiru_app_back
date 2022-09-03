<script setup>
const props = defineProps(['registro'])
</script>
<template lang="pug">
.row( v-for='rows of registro'  ).mb-1
    .d-flex.justify-content-center.mb-2( v-for='row of rows'  style='gap:  10px')
        .d-flex( v-for='col of row' style='gap: 2.5px')
            Diente.small(  v-for='item of col' :item='item' )
</template>