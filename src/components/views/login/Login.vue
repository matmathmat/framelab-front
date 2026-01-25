<script setup>
import bgLogin from '@/assets/images/login/background.png'

function setCookie(name, value, days) {
    var expires = "";

    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

const submitForm = async (event) => {
    event.preventDefault();

    const form = event.target;

    const data = {
        email: form.email.value,
        password: form.password.value
    }

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    const result = await response.json();
    console.log(result);

    if (!result.success) {
        alert("Email ou mot de passe incorrect");
        return;
    }

    // On sauvegarde le token dans un cookie
    setCookie("token", result.result.token);

    // on redirige vers la page du compte
    window.location = "/me";    
}
</script>

<template>
    <main class="login-page" :style="{
        backgroundImage: `
            url(${bgLogin})
        `
    }">
        <div class="login-container">
            <h1 class="login-title">Mon <span>Compte</span></h1>
            
            <form @submit="submitForm" class="glass-form">
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
                    <a href="#" class="forgot-pass">Mot de passe oublié ?</a>
                </div>
            </form>
        </div>
    </main>
</template>

<style scoped>
@font-face {
  font-family: 'Magilio';
  src: url('../fonts/Magilio.ttf') format('truetype'),
    url('../fonts/MagilioDEMO.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.login-page {
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    padding-top: 80px; 
}

.login-container {
    width: 100%;
    max-width: 450px;
    padding: 2rem;
    text-align: center;
    animation: fadeIn 0.8s ease-out;
}

.login-title {
    font-family: 'Magilio';
    font-size: 3.5rem;
    color: #F9F5F0;
    margin-bottom: 2rem;
    font-weight: 300;
}

.login-title span {
    color: rgb(252, 198, 188);
    font-style: italic;
}

.glass-form {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 3rem 2.5rem;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.input-group {
    text-align: left;
}

label {
    display: block;
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: rgba(249, 245, 240, 0.8);
    margin-bottom: 0.5rem;
}

input {
    width: 100%;
    padding: 12px 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    font-family: var(--font-sans, 'Montserrat', sans-serif);
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

input:focus {
    outline: none;
    border-bottom-color: rgb(252, 198, 188);
}

input::placeholder {
    color: rgba(255, 255, 255, 0.3);
}

.btn-pill {
    margin-top: 1rem;
    padding: 1rem 2.2rem;
    border-radius: 999px;
    background: transparent;
    border: 1.5px solid rgb(252, 198, 188);
    color: rgb(252, 198, 188);
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-pill:hover {
    background: rgb(252, 198, 188);
    color: #2A221E;
    box-shadow: 0 0 15px rgba(252, 198, 188, 0.4);
}

.form-footer {
    margin-top: 0.5rem;
}

.forgot-pass {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.8rem;
    text-decoration: none;
    transition: color 0.3s;
}

.forgot-pass:hover {
    color: rgb(252, 198, 188);
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
    .login-title {
        font-size: 2.5rem;
    }
    
    .glass-form {
        padding: 2rem 1.5rem;
    }
}
</style>