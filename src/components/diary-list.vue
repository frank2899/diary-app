<template>
    <div class="diary-card">
        <div class="diary-date">
            <h1 style="margin-top: unset;">01</h1>
            <h6 style="margin-top: unset;margin-bottom: unset;">TH</h6>
        </div>
        <div class="diary-content">
            <div class="feeling-section">
                <img src="../../resources/images/happy.png"/>
                <small>FEELS HAPPY</small>
            </div>
            <p>{{ truncateText("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime enim, totam porro, alias cum culpa est dolorem quidem, praesentium eius accusantium! Maiores tenetur magnam aliquid magni eum. Quos, in molestias.") }}</p>
        </div>
    </div>
    <div class="diary-card">
        <div class="diary-date">
            <h1 style="margin-top: unset;">23</h1>
            <h6 style="margin-top: unset;margin-bottom: unset;">F</h6>
        </div>
        <div class="diary-content">
            <div class="feeling-section">
                <img src="../../resources/images/angry.png"/>
                <small>FEELS ANGRY</small>
            </div>
            <p>{{ truncateText("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime enim, totam porro, alias cum culpa est dolorem quidem, praesentium eius accusantium! Maiores tenetur magnam aliquid magni eum. Quos, in molestias.") }}</p>
        </div>
    </div>
    <div class="diary-card">
        <div class="diary-date">
            <h1 style="margin-top: unset;">31</h1>
            <h6 style="margin-top: unset;margin-bottom: unset;">S</h6>
        </div>
        <div class="diary-content">
            <div class="feeling-section">
                <img src="../../resources/images/sad.png"/>
                <small>FEELS SAD</small>
            </div>
            <p>{{ truncateText("Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime enim, totam porro, alias cum culpa est dolorem quidem, praesentium eius accusantium! Maiores tenetur magnam aliquid magni eum. Quos, in molestias.") }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
const truncateText = (text: string, length: number = 115): string => {
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