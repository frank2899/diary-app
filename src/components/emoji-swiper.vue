<template>
    <swiper
        :slidesPerView="3"
        :spaceBetween="10"
        :pagination="{
            clickable: true,
        }"
        class="emoji-swiper"
    >
        <swiper-slide>
            <div class="emoji-container">
                <div>
                    <h6>3 - Angry</h6>
                    <img src="../../resources/images/angry.png"/>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="emoji-container">
                <div>
                    <h6>10 - Sad</h6>
                    <img src="../../resources/images/sad.png"/>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="emoji-container">
                <div>
                    <h6>16 - Nuetral</h6>
                    <img src="../../resources/images/nuetral.png"/>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="emoji-container">
                <div>
                    <h6>20 - Happy</h6>
                    <img src="../../resources/images/happy.png"/>
                </div>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="emoji-container">
                <div>
                    <h6>0 - Joy</h6>
                    <img src="../../resources/images/joy.png"/>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
</script>

<style scoped>
.emoji-swiper {
    width: 100%;
    height: 120px;
}
.emoji-container{
    background-color: #FFFDFA;
    border-radius: 15px;
    height: 116px;
    width: 116px;
    display: grid;
    place-items: center;
}
.emoji-swiper .swiper-slide{
    width:116px !important;
}
h6{
    margin: auto;
    padding-bottom: 5px;
    color:#5A5266;
    font-size: .8rem;
}
</style>
