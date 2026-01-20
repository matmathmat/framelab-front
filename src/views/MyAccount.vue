<script setup>
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

var token = getCookie('token');

// Vérifier le token de l'utilisateur
if (token) {
    //
} else {
    // Rediriger vers la page de connexion
    window.location = '/login';
}
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