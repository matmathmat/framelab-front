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

    onBeforeMount(() => {
        const token = getCookie('token');
        console.log(token);

        if (!token) {
            window.location.href = '/login'
        }
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