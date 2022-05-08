<template lang="pug">
div( v-bind='$attrs') 
    svg( viewBox="0 0 166 150"  xmlns="http://www.w3.org/2000/svg")
        path(fill="currentColor" d="M164.439 38.362C160.371 14.6592 144.987 0.676977 122.25 0C121.381 0 118.773 0.121509 116.574 0.329809C110.473 1.15148 104.463 2.54931 98.6259 4.5045C98.0175 4.73016 95.5577 5.75431 92.7069 6.84788C89.5014 8.06809 86.0985 8.68887 82.668 8.6792C79.2375 8.68966 75.8344 8.06886 72.6292 6.84788C69.7696 5.75431 67.3186 4.73016 66.7101 4.5045C60.8728 2.55006 54.8632 1.15225 48.7619 0.329809C46.5455 0.121509 43.9902 0 43.0776 0C20.3402 0.676977 4.96468 14.6592 0.870919 38.362C-0.215537 44.8367 -0.302453 56.7967 0.705778 63.0544C1.29738 67.2496 2.12733 71.4078 3.19159 75.509C7.36358 92.0602 22.7739 137.062 43.5817 147.225C46.069 148.476 48.782 149.217 51.5606 149.404C54.6715 149.586 57.7788 148.99 60.5999 147.668C64.2591 145.81 69.3959 140.594 75.4626 134.163C77.8789 131.603 80.2604 129.997 82.668 129.867C85.0756 129.997 87.4571 131.603 89.8734 134.163C95.9575 140.594 101.068 145.81 104.727 147.668C107.549 148.989 110.656 149.586 113.767 149.404C116.546 149.219 119.259 148.478 121.746 147.225C142.606 137.062 157.972 92.0602 162.136 75.509C163.203 71.4138 164.036 67.2614 164.63 63.0717C165.638 56.7967 165.552 44.8367 164.439 38.362Z")
    #circles 
        .circle
        .circle
        .circle
</template>
<style lang="sass" scoped>
div
    color: var(--bs-white)
    position: relative
    --size: 4rem
    svg
        width: var(--size)
        height: calc( var(--size) * 0.87)      
   
        
    #circles
        top: calc( var(--size) * 0.15)
        bottom: 0
        margin: auto
        height: 1rem
        position: absolute
        display: flex
        gap: calc( var(--size) * 0.08)
        width: 100%
        justify-content: center
        .circle
            height: calc( var(--size) * 0.12)
            width: calc( var(--size) * 0.12)
            border-radius: 50%
            background-color: var(--bs-primary)
    &.active
        #circles
            .circle
                animation-name: rebote
                animation-duration: .4s
                animation-iteration-count: infinite
                animation-direction: alternate 
                animation-delay: .2s
                &:first-child
                    animation-delay: 0s
                &:last-child
                    animation-delay: .4s    
@keyframes rebote 
    from
        transform: translateY(0)
    to
        transform: translateY( calc( -0.1 * var(--size) ) )
</style>