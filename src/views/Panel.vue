<template>
    <ion-page>
        <ion-content style="
            --background: #F8EEE2;
            --padding-start: 2rem;
            --padding-end: 2rem;
        ">
            <section>
                <h3 id="greetings">Here’s how you’re feeling for this month.</h3>

                <EmojiSwiper/>

                <div class="navigation-buttons">
                    <ion-button @click="previousMonth" style="--border-radius:15px;--background:#FFFDFA;">
                        <ion-icon slot="icon-only" :icon="chevronBackOutline" style="color:#D9614C"></ion-icon>
                    </ion-button>
                    <h2 id="calendarHeader">{{ currentMonth.month }} {{ year }}</h2>

                    <ion-button @click="nextMonth" style="--border-radius:15px;--background:#FFFDFA;">
                        <ion-icon slot="icon-only" :icon="chevronForwardOutline" style="color:#D9614C"></ion-icon>
                    </ion-button>
                </div>
                <div id="calendarSection">
                    <div class="calendar-grid">
                        <p id="weeks" v-for="dayName in weekDays" :key="dayName" class="calendar-day-name">
                            {{ dayName }}
                        </p>

                        <div v-for="week in calendarData.calendar.weeks" :key="Array(week).join('-')" class="calendar-week">
                            <div v-for="day in week" :key="day" :class="[
                                'calendar-day',
                                !!day ? 'not-empty' : '',
                                isToday(Number(day), calendarData.calendar.month) ? 'current-day' : '',
                                Number(day) === selectedDay && calendarData.calendar.monthIndex === selectedMonth ? 'selected-day' : ''
                            ]"
                            @click="selectDay(Number(day), calendarData.calendar.monthIndex)">
                                {{ day || '' }}
                            </div>
                        </div>
                    </div>
                </div>

                <DiaryList/>
            </section>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import chevronBackOutline from '../../resources/icons/chevron-back-outline.svg'
import chevronForwardOutline from '../../resources/icons/chevron-forward-outline.svg'
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';
import { generateYearCalendar, YearCalendar } from '../utils/calendar'
import { ref, Ref, computed } from 'vue'
import EmojiSwiper from '@/components/emoji-swiper.vue'
import DiaryList from '@/components/diary-list.vue'
import moment from 'moment-timezone'

const router = useRouter()

const currentDate = moment.tz('Asia/Manila')
const year: Ref<number> = ref(currentDate.year())
const month: Ref<number> = ref(currentDate.month())
const calendarData: Ref<YearCalendar> = ref(generateYearCalendar(year.value, month.value))
const selectedDay: Ref<number | null> = ref(null)
const selectedMonth: Ref<number | null> = ref(null)

const weekDays: string[] = calendarData.value.weekDays

const currentMonth = computed(() => calendarData.value.calendar)

const updateCalendar = () => {
    calendarData.value = generateYearCalendar(year.value, month.value)
}

const previousMonth = () => {
    if (month.value > 0) {
        month.value -= 1
    }
    else{
        month.value = 11
        year.value -= 1
    }

    updateCalendar()
}

const nextMonth = () => {
    if (month.value < 11) {
        month.value += 1
    }
    else{
        month.value = 0
        year.value += 1
    }
    updateCalendar()
}

const isToday = (day: number, monthName: string): boolean => {
    return (
        day === currentDate.date() &&
        monthName === currentDate.format('MMMM') &&
        year.value === currentDate.year()
    )
}

const selectDay = (day: number, monthIndex: number): void => {
    selectedDay.value = day
    selectedMonth.value = monthIndex
    goToPage(`/panel/${year.value}/${monthIndex}/${day}`)
}

const goToPage = (path: string) => router.push(path)
</script>

<style scoped>
#greetings{
    font-size:1.3rem;
    text-align: center;
    color:#403B36;
    width:80%;
    margin:3rem auto 3rem;
}
#calendarHeader{
    color:#403B36;
}
#weeks{
    color:#D9614C;
    display: inline;
    margin: unset;
    font-size: .8rem;
    font-family: NunitoBlack;
}
section {
    max-width: 450px;
    width: 100%;
    margin: auto;
}
#calendarSection{
    max-width: 350px;
    margin: auto;
    margin-bottom: 3rem;
}

.navigation-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 3rem;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 7px;
    margin-top: 1rem;
}

.calendar-day-name, .calendar-day {
    text-align: center;
}

.calendar-day-name {
    font-weight: bold;
}

.calendar-week {
    display: contents;
}

.calendar-day {
    border: 2px solid transparent;
    border-radius: 5px;
    width:37px;
    height:37px;
    position: relative;
    display: grid;
    place-items: center;
    margin: auto;
}
.calendar-day.not-empty{
    color:#595550;
    user-select: none;
    cursor: pointer;
}


.calendar-day.current-day,
.calendar-day.selected-day {
    color: #D9614C;
}
.calendar-day.current-day {
    border-color: #D9614C;
}
</style>
