import { defineStore } from 'pinia'
import { AppState, Diary } from './types'
import { CapacitorHttp } from '@capacitor/core'
import moment from 'moment-timezone'

export const useDiarySore = defineStore('diary', {
    state: (): AppState => ({
        baseUrl : 'https://mobile-diary-backend.vercel.app/api',
        // baseUrl: 'http://localhost:3000/api',
        monthDiary: []
    }),
    actions: {
        async handleCreateDiary({ date, mood, feeling, content }: Diary) {
            const api = await CapacitorHttp.put(
                {
                    url: `${this.baseUrl}/diary/create`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        date, mood, feeling, content
                    }
                }
            )

            return api.data
        },
        async handleUpdateDiary({ date, mood, feeling, content }: Diary) {
            const api = await CapacitorHttp.post(
                {
                    url: `${this.baseUrl}/diary/date/${moment.tz(date, 'Asia/Manila')?.format('MM-DD-YYYY')}`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: {
                        mood, feeling, content
                    }
                }
            )

            return api.data
        },
        async handleGetDiary(date: string){
            const api = await CapacitorHttp.get({ 
                url: `${this.baseUrl}/diary/date/${date}`
            })

            return api.data
        },
        async handleGetMonthDiary({month, year}: {month: string, year: string}){
            const api = await CapacitorHttp.get({ url: `${this.baseUrl}/diary/?month=${month}&year=${year}` })

            this.monthDiary = api.data

            return api.data
        }
    },
})