<template>
    <div class="loader-container">
        <div class="loader"></div>
    </div>
</template>
<style scoped>
.loader {
    width: 50px;
    height: 20px;
    position: relative;
    margin: auto;
}
.loader:before {
    content: '';
    position: absolute;
    border-radius: 50px;
    box-shadow: 0 0 0 3px inset #D9614C;
    animation: l3 0.75s infinite alternate;
}
@keyframes l3 {
    0% {
        inset: 0 20px 0 0;
    }
    50% {
        inset: 0 0 0 0;
    }
    100% {
        inset: 0 0 0 20px;
    }
}
</style>
