<template lang="pug">

.d-flex.justify-content-center.align-items-center.img-custom.relative
  img.img-fade(loading="eager"  v-bind='$attrs' onload="this.style.opacity=1" )
  slot
</template>

<style lang="sass" >
.img-fade
  opacity: 0
  transition: .3s
.img-custom
  position: relative
  ion-icon
    position: absolute  
</style>