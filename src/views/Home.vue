<template>
    <ion-page>
        <ion-content style="
            --background: #F8EEE2;
            --padding-start:2rem;
            --padding-end:2rem;
        ">
            <section>
                <div>
                    <img id="heroImage" src="../../resources/images/my-girl.png"/>
                    <h1 id="tagline">A Space to Express, A Place to Remember</h1>
                    <p>Pour out your thoughts and preserve your memories in a secure, beautifully designed space that’s always there when you need it.</p>
                    <ion-button @click="goToPage('/panel')">Get Started</ion-button>
                </div>
            </section>
        </ion-content>
    </ion-page>
</template>
<script setup lang="ts">
import { IonPage, IonContent, IonButton } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToPage = (path: string) => router.push(path);

</script>

<style scoped>
section{
    height: 100vh;
    justify-content: center;
    align-items: center;
    display: flex;
}
section > div {
    max-width: 450px;
    width: 100%;
}
p{
    margin: unset;
    padding-bottom: 3rem;
    color: #595550;
    font-size: .95rem;
    text-align: center;
}
#tagline{
    color: #403B36;
    font-size:1.8rem;
    padding:2rem;
    padding-bottom: 1rem;
    text-align: center;
    margin:auto;
}
#heroImage{
    margin:auto;
    width:180px;
    display:block;
    margin: 3rem auto 0 auto;
}
ion-button {
    max-width:350px;
    width:100%;
    --color:#FFFDFA;
    --background:#D9614C;
    --padding-top:2rem;
    --padding-bottom:2rem;
    font-size: 1.3rem;
    font-family: NunitoBlack;
    margin:auto;
    display: block;
}
</style>