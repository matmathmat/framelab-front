<script setup>
// On configure la communication entre composant enfant et parent
const emit = defineEmits(['switch-to-login'])

const submitRegister = async (event) => {
     // On capture le form pour récupérer ses données
    const form = event.target;

    // On vérifie que les deux mots de passes sont similaires
    if (form.password.value !== form.confirmPassword.value) {
        alert("Les mots de passe ne correspondent pas");
        return;
    }

    const data = {
        lastname: form.lastname.value,
        firstname: form.firstname.value,
        email: form.email.value,
        password: form.password.value
    }

     // on fait une requete api pour créer le compte
    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        const result = await response.json();
        console.log(result);
        alert("Compte créé avec succès !");
        emit('switch-to-login');
    } else {
        alert("Erreur lors de la création du compte");
    }
}
</script>

<template>
    <form @submit.prevent="submitRegister" class="glass-form">
        <div class="input-group">
            <label>Nom</label>
            <input type="text" name="lastname" required placeholder="Doe">
        </div>

        <div class="input-group">
            <label>Prénom</label>
            <input type="text" name="firstname" required placeholder="John">
        </div>

        <div class="input-group">
            <label>Email</label>
            <input type="email" name="email" required placeholder="votre@email.com">
        </div>

        <div class="input-group">
            <label>Mot de passe</label>
            <input type="password" name="password" required placeholder="••••••••">
        </div>

        <div class="input-group">
            <label>Confirmer mot de passe</label>
            <input type="password" name="confirmPassword" required placeholder="••••••••">
        </div>

        <button type="submit" class="btn-pill">Confirmer</button>
        
        <div class="form-footer">
            <a href="#" class="toggle-link" @click.prevent="$emit('switch-to-login')">J'ai un compte</a>
        </div>
    </form>
</template>