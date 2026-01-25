<script setup>
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
    <main class="main-content">
        <div class="content-overlay">
            <form @submit="submitForm">
                <label>Email:</label>
                <input type="text" name="email" required>

                <label>Password:</label>
                <input type="password" name="password" required>

                <button type="submit">Login</button>
            </form>
        </div>
    </main>
</template>

<style scoped>
.main-content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.content-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 10vh;
    overflow-y: auto;
}

form {
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

button:hover {
    background-color: #218838;
}
</style>