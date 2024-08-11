<template>
    <ion-page>
        <ion-content style="
            --background: #F8EEE2;
            --padding-start: 2rem;
            --padding-end: 2rem;
        ">
            <section>
                <div class="header">
                    <ion-icon slot="icon-only" :icon="chevronBackOutline" style="color:#403B36;font-size: 15px;" @click="goToPage('/panel')"></ion-icon>
                    <h3>{{ readableDate }}</h3>
                </div>
                <h3 class="questions">How are you feeling?</h3>
                <swiper
                    :slidesPerView="'auto'"
                    :spaceBetween="10"
                    :pagination="{
                        clickable: true,
                    }"
                    class="emoji-swiper"
                >
                    <swiper-slide v-for="(emoji, index) in emojis" :key="index">
                        <div :class="['emoji-container', feeling === emoji.name.toLowerCase() ? 'selected-emoji' : '']" @click="selectFeeling(emoji.name.toLowerCase())">
                            <div>
                                <h6>{{ emoji.name }}</h6>
                                <img :src="emoji.image?.toLowerCase()" :alt="emoji.name"/>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>


                <h3 class="questions">What's affecting your mood?</h3>
                <div class="mood-container">
                    <ion-chip :outline="true" :class="['mood-chip', mood === moodName ? 'selected-mood' : '']" @click="selectMood(moodName)" v-for="(moodName, index) in affectingMood" :key="index">{{ moodName }}</ion-chip>
                </div>

                <h3 class="questions">How is your day going?</h3>
                <div class="content-container">
                    <ion-textarea
                        placeholder="Start Writing here.."
                        class="content-area"
                        :auto-grow="true"
                        :value="content"
                    >
                    </ion-textarea>
                </div>

                <div class="submit-btn">
                    <ion-button @click="save()">SAVE</ion-button>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import chevronBackOutline from '../../resources/icons/chevron-back-thick.svg'
import { IonPage, IonContent, IonButton, IonChip, IonTextarea, IonIcon, toastController } from '@ionic/vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, Ref, computed } from 'vue'
import DiaryList from '@/components/diary-list.vue'
import moment from 'moment-timezone'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

const router = useRouter()
const route = useRoute()

const year = computed(() => route.params.year ?? moment.tz('Asia/Manila').format('YYYY'))
const month = computed(() => route.params.month ?? moment.tz('Asia/Manila').format('MM'))
const day = computed(() => route.params.day ?? moment.tz('Asia/Manila').format('DD'))

const readableDate = computed(() => moment.tz(`${year.value}-${month.value.toString().padStart(2, '0')}-${day.value.toString().padStart(2, '0')}`, 'Asia/Manila').format('MMMM D, YYYY'))

const emojis = ref([
    { name: 'Angry', image: '../../resources/images/angry.png' },
    { name: 'Sad', image: '../../resources/images/sad.png' },
    { name: 'Neutral', image: '../../resources/images/neutral.png' },
    { name: 'Happy', image: '../../resources/images/happy.png' },
    { name: 'Joy', image: '../../resources/images/joy.png' }
])

const affectingMood = [
    "Work",
    "Hobbies",
    "Relationship",
    "Family",
    "Friends",
    "Health",
    "Sleep",
    "Finances",
    "Diet",
    "Exercise",
    "Weather",
    "Travel",
    "Social Media",
    "Achievements",
    "Environment",
    "Others"
]

const feeling: Ref<string> = ref('')
const mood: Ref<string> = ref('')
const content: Ref<string> = ref('')

const selectFeeling = (params: string) => feeling.value = params
const selectMood = (params: string) => mood.value = params

const save = async () => {
    try{
        if(!feeling.value?.trim()) throw 'Please select how you are feeling'
        if(!mood.value?.trim()) throw 'Please select the main factor affecting your mood.'
        if(!content.value?.trim()) throw 'Please write a brief description of how your day is going.'
    }
    catch(error){
        const toast = await toastController.create({
            message: error,
            duration: 1500,
            position: 'top',
            mode: 'ios'        
        })

        await toast.present()
    }
}

const goToPage = (path: string) => router.push(path)
</script>

<style scoped>
section {
    max-width: 450px;
    width: 100%;
    margin: auto;
}
.questions{
    font-size:1.3rem;
    color:#403B36;
    margin:2.5rem 0 1.5rem 0;
}
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
    user-select: none;
    cursor: pointer;
}
.emoji-swiper .swiper-slide{
    width:116px !important;
}
.emoji-container h6{
    margin: auto;
    padding-bottom: 5px;
    color:#5A5266;
    font-size: .8rem;
}
.emoji-container.selected-emoji{
    border: 4px solid #D9614C
}
.mood-chip{
    color:rgba(64, 59, 54, .5);
    font-family: NunitoBold;
    border-color: rgba(64, 59, 54, .5);
    user-select: none;
}
.mood-chip.selected-mood{
    border-color: #D9614C !important;
    color:#5A5266;
    /* background-color: #D9614C;
    color:#FFFDFA; */
}
ion-textarea.content-area{
    --border-color: #5A5266;
    --border-width: 3px;
    --border-style: solid;
    --highlight-height: 0;
    --padding-top:0;
    --color: #5A5266;
}
.content-container{
    border: 3px solid #403B36;
    border-radius: 10px;
    padding:10px;
    margin-bottom: 1.5rem;
}
.header{
    position:relative;
    padding: 2rem 0 0;
}
.header h3{
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    color:#403B36;
    font-size: 1rem;
}

.submit-btn{
    margin-bottom: 3rem;
}

.submit-btn ion-button {
    width:100%;
    --color:#FFFDFA;
    --background:#D9614C;
    --padding-top:1.5rem;
    --padding-bottom:1.5rem;
    font-size: 1.3rem;
    font-family: NunitoBlack;
    margin:auto;
    display: block;
}
</style>
