<template>
    <div class="diary-card" v-for="(entry, index) in props.entries" :key="index">
        <div class="diary-date">
            <h1 style="margin-top: unset;">{{ formatDate(entry.date.toString()).day }}</h1>
            <h6 style="margin-top: unset;margin-bottom: unset;">{{ formatDate(entry.date.toString()).weekday }}</h6>
        </div>
        <div class="diary-content">
            <div class="feeling-section">
                <img :src='`../../resources/images/${entry.feeling}.png`'/>
                <small>- FEELS {{entry.feeling?.toUpperCase()}}</small>
            </div>
            <p>{{ truncateText(entry.content) }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import moment from 'moment-timezone'

const props = defineProps<{
    entries: Array<{
        mood: string,
        feeling: string,
        content: string,
        date: Date
    }>
}>()
const formatDate = (date: string) => {
    const momentDate = moment.tz(date, 'Asia/Manila')
    return {
        day: momentDate.format('DD'),
        weekday: momentDate.format('dd').toUpperCase().split('')[0]
    }
}
const truncateText = (text: string, length: number = 105): string => {
  return text.length > length ? text.substring(0, length) + '...' : text;
}
</script>
<style scoped>
.diary-card{
    margin-bottom: 15px;
    display: flex;
    gap:10px;
}
.diary-date{
    border-radius: 10px;
    background-color: #FFFDFA;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #403B36;
    width: 95px;
}
.diary-content{
    border-radius: 10px;
    background-color: #FFFDFA;
    flex:1;
    padding:1rem;
}
.diary-content p{
    margin-bottom: 0;
    color: #403B36;
    font-size: .9rem;
}
.feeling-section{
    display: flex;
    align-items: center;
}
.feeling-section small{
    color:#403B36;
    font-size: .6rem;
}
.feeling-section img{
    width:18px;
    display: block;
    margin-right:10px;
}
</style>