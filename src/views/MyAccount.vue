<script setup>
import { onBeforeMount } from 'vue'

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

async function loadProfile() {
    const userResponse = await fetch('api/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const result = await userResponse.json();

    const firstname = result.result.firstname;
    const lastname = result.result.lastname;
    const email = result.result.email;
    const userId = result.result.userId;
    const isAdmin = result.result === 1;

    console.log(result);
}

onBeforeMount(() => {
    const token = getCookie('token');
    console.log(token);

    if (!token) {
        window.location.href = '/login';
        return;
    }

    loadProfile();
})
</script>

<template>
    <div>
        <h1>Mon compte</h1>
        <p>Bienvenue sur la page mon compte de FrameLab.</p>
    </div>
</template>

<style scoped>
h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}
</style>