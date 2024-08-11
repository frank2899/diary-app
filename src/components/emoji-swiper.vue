<template>
    <swiper
        :slidesPerView="'auto'"
        :spaceBetween="10"
        :pagination="{
            clickable: true,
        }"
        class="emoji-swiper"
    >
        <swiper-slide v-for="(emoji, index) in emojis" :key="index">
            <div class="emoji-container">
                <div>
                    <h6>{{ emoji.rating }} - {{ emoji.name }}</h6>
                    <img :src="emoji.image?.toLowerCase()" :alt="emoji.name"/>
                </div>
            </div>
        </swiper-slide>
    </swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { ref } from 'vue';

const emojis = ref([
    { rating: 3, name: 'Angry', image: '../../resources/images/angry.png' },
    { rating: 10, name: 'Sad', image: '../../resources/images/sad.png' },
    { rating: 16, name: 'Neutral', image: '../../resources/images/neutral.png' },
    { rating: 20, name: 'Happy', image: '../../resources/images/happy.png' },
    { rating: 0, name: 'Joy', image: '../../resources/images/joy.png' }
])
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
