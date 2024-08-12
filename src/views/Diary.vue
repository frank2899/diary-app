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
                    <h3>{{ readableDate.format('MMMM D, YYYY') }}</h3>
                </div>

                <div v-if="isFetching" style="margin-top:3rem">
                    <Loader />
                </div>
                <div v-else>
                    <h3 class="questions">How are you feeling?</h3>
                    <swiper
                        :slidesPerView="'auto'"
                        :spaceBetween="10"
                        :pagination="{
                            clickable: true,
                        }"
                        class="emoji-swiper"
                    >
                        <swiper-slide>
                            <div :class="['emoji-container', feeling === 'angry' ? 'selected-emoji' : '']" @click="selectFeeling('angry')">
                                <div>
                                    <h6>Angry</h6>
                                    <img src="../../resources/images/angry.png"/>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div :class="['emoji-container', feeling === 'sad' ? 'selected-emoji' : '']" @click="selectFeeling('sad')">
                                <div>
                                    <h6>Sad</h6>
                                    <img src="../../resources/images/sad.png"/>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div :class="['emoji-container', feeling === 'neutral' ? 'selected-emoji' : '']" @click="selectFeeling('neutral')">
                                <div>
                                    <h6>Neutral</h6>
                                    <img src="../../resources/images/neutral.png"/>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div :class="['emoji-container', feeling === 'happy' ? 'selected-emoji' : '']" @click="selectFeeling('happy')">
                                <div>
                                    <h6>Happy</h6>
                                    <img src="../../resources/images/happy.png"/>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide>
                            <div :class="['emoji-container', feeling === 'joy' ? 'selected-emoji' : '']" @click="selectFeeling('joy')">
                                <div>
                                    <h6>Joy</h6>
                                    <img src="../../resources/images/joy.png"/>
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
                            v-model="content"
                        >
                        </ion-textarea>
                    </div>

                    <div class="submit-btn" v-if="!isSaving">
                        <ion-button @click="save()">SAVE</ion-button>
                    </div>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import chevronBackOutline from '../../resources/icons/chevron-back-thick.svg'
import { IonPage, IonContent, IonButton, IonChip, IonTextarea, IonIcon, toastController } from '@ionic/vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, Ref, computed, onMounted } from 'vue'
import moment from 'moment-timezone'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import { useDiarySore } from '@/store'
import Loader from '@/components/loader.vue'

const { handleCreateDiary, handleUpdateDiary, handleGetDiary } = useDiarySore()

const router = useRouter()
const route = useRoute()

const year = computed(() => route.params.year ?? moment.tz('Asia/Manila').format('YYYY'))
const month = computed(() => route.params.month ?? moment.tz('Asia/Manila').format('MM'))
const day = computed(() => route.params.day ?? moment.tz('Asia/Manila').format('DD'))
const hasDiary: Ref<boolean> = ref(false)
const isFetching: Ref<boolean> = ref(false)
const isSaving: Ref<boolean> = ref(false)

const readableDate = computed(() => moment.tz(`${year.value}-${(Number(month.value) + 1).toString().padStart(2, '0')}-${day.value.toString().padStart(2, '0')}`, 'Asia/Manila'))

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
        isSaving.value = true
        if(!feeling.value?.trim()) throw 'Please select how you are feeling'
        if(!mood.value?.trim()) throw 'Please select the main factor affecting your mood.'
        if(!content.value?.trim().length) throw 'Please write a brief description of how your day is going.'

        const payload = {
            mood: mood.value,
            feeling: feeling.value,
            content: content.value,
            date: moment.tz(`${year.value}-${(Number(month.value) + 1).toString().padStart(2, '0')}-${day.value.toString().padStart(2, '0')}`, 'Asia/Manila').toDate()
        }

        if(hasDiary.value) await handleUpdateDiary(payload)
        else await handleCreateDiary(payload)

        handleFetchDiary()

        throw 'Successfully Saved!'
    }
    catch(error){
        const toast = await toastController.create({
            message: error as string,
            duration: 1500,
            position: 'top',
            mode: 'ios'        
        })

        await toast.present()
    }
    finally{
        isSaving.value = false
    }
}

const goToPage = (path: string) => router.push(path)

const handleFetchDiary = async () => {
    try{
        isFetching.value = true
        const getDiary = await handleGetDiary(moment.tz(`${year.value}-${(Number(month.value) + 1).toString().padStart(2, '0')}-${day.value.toString().padStart(2, '0')}`, 'Asia/Manila').format('MM-DD-YYYY'))

        hasDiary.value = !!getDiary?.data

        if(!!getDiary.data){
            const data = getDiary.data

            mood.value = data.mood
            feeling.value = data.feeling
            content.value = data.content
        }
    }
    catch(error){
        const toast = await toastController.create({
            message: error as string,
            duration: 1500,
            position: 'top',
            mode: 'ios'        
        })

        await toast.present()
    }
    finally{
        isFetching.value = false
    }
}

onMounted(() => {
    handleFetchDiary()
})
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
