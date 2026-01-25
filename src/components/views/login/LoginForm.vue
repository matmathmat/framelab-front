<script setup>
// On configure la communication entre composant enfant et parent
const emit = defineEmits(['switch-to-register'])

function setCookie(name, value, days) {
    var expires = "";

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const submitLogin = async (event) => {
    // On capture le form pour récupérer ses données
    const form = event.target;
    const data = {
        email: form.email.value,
        password: form.password.value
    }

    // on fait une requete api pour se log
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    // On lit le résultat
    const result = await response.json();

    // Si erreur on affiche un message d'erreur et on quitte
    if (!result.success) {
        alert("Email ou mot de passe incorrect");
        return;
    }

    // Si on a réussit on sauvegarde le token dans un cookie
    setCookie("token", result.result.token);

    // on redirige vers la page de l'utilisateur
    window.location = "/me";    
}
</script>

<template>
    <form @submit.prevent="submitLogin" class="glass-form">
        <div class="input-group">
            <label>Email</label>
            <input type="text" name="email" required placeholder="votre@email.com">
        </div>

        <div class="input-group">
            <label>Mot de passe</label>
            <input type="password" name="password" required placeholder="••••••••">
        </div>

        <button type="submit" class="btn-pill">Se connecter</button>
        
        <div class="form-footer">
            <a href="#" class="toggle-link" @click.prevent="$emit('switch-to-register')">Créer un compte</a>
        </div>
    </form>
</template>