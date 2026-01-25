<script setup>
import { ref, onBeforeMount } from 'vue'

function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

const firstname = ref('');
const lastname = ref('');

async function loadProfile() {
    const userResponse = await fetch('api/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const result = await userResponse.json();

    firstname.value = result.result.firstname;
    lastname.value = result.result.lastname;

    console.log(result);
}

onBeforeMount(() => {
    const token = getCookie('token');

    if (!token) {
        window.location.href = '/login';
        return
    }

    loadProfile();
})
</script>

<template>
    <div>
        <h1>Mon compte</h1>
        <h2>Bonjour {{ firstname }} {{ lastname }}</h2>
        <p>Bienvenue sur la page mon compte de FrameLab.</p>
    </div>
</template>

<style scoped>
 h1 {
     font-size: 2rem;
     margin-bottom: 1rem;
 }
</style>