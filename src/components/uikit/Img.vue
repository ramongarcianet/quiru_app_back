
<template lang="pug">
img.img-fade(loading="eager"  v-bind='$attrs' onload="this.style.opacity=1" )
</template>

<style lang="sass">
.img-fade
  opacity: 0
  transition: .3s
</style>