<script setup>
import { ref } from 'vue';
import contactBg from '../assets/images/contact.png';

const formData = ref({
  name: '',
  email: '',
  message: ''
});

const submitForm = () => {
  // Todo
  alert("Merci de nous avoir contactés. Nous reviendrons vers vous sous peu.");
};
</script>

<template>
  <main class="main-content">
    <div class="image-fullscreen">
      <img :src="contactBg" alt="Contact Background" />
      
      <div class="content-overlay">
        
        <div class="columns-wrapper">
          <div class="info-col">
            <h1 class="main-title">Contact</h1>
            
            <div class="contact-details">
              <p class="intro-text text-overlay">
                Une question sur le challenge hebdomadaire ? <br>
                Envie de collaborer ou simplement d'échanger sur la photographie ?
              </p>
              
              <div class="details-block">
                <span class="label text-overlay">Email</span>
                <a href="mailto:contact@framelab.fr" class="link text-overlay">contact@framelab.fr</a>
              </div>

              <div class="details-block">
                <span class="label text-overlay">Studio</span>
                <p class="address text-overlay">
                  Châteauroux<br>
                  Indre, France
                </p>
              </div>
            </div>
          </div>

          <div class="form-col">
            <form @submit.prevent="submitForm" class="clean-form">
              <div class="input-group">
                <input 
                  type="text" 
                  id="name" 
                  v-model="formData.name" 
                  placeholder="Votre Nom" 
                  class="text-overlay"
                  required
                />
              </div>

              <div class="input-group">
                <input 
                  type="email" 
                  id="email" 
                  v-model="formData.email" 
                  placeholder="Votre Email" 
                  class="text-overlay"
                  required
                />
              </div>

              <div class="input-group">
                <textarea 
                  id="message" 
                  v-model="formData.message" 
                  placeholder="Votre Message" 
                  rows="4" 
                  class="text-overlay"
                  required
                ></textarea>
              </div>

              <button type="submit" class="submit-btn text-overlay">
                Envoyer →
              </button>
            </form>
          </div>
        </div>

      </div>
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

.main-content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.image-fullscreen {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-fullscreen::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle, rgba(0, 0, 0, 0.2) 1px, transparent 1px);
  background-size: 4px 4px;
  pointer-events: none;
  opacity: 0.3;
  z-index: 1;
}

.image-fullscreen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: contrast(1.15) brightness(0.95);
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

.columns-wrapper {
  display: flex;
  width: 85%;
  max-width: 1400px;
  justify-content: space-between;
  align-items: flex-start;
  gap: 6rem;
}

.info-col {
  flex: 1;
}

.form-col {
  flex: 1;
  padding-top: 2rem;
}

.main-title {
  font-family: 'Magilio';
  font-size: 8rem;
  line-height: 1;
  margin-bottom: 3rem;
  font-weight: normal;
  color: white;
  text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.8);
}

.text-overlay {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
}

.intro-text {
  margin-bottom: 3rem;
  line-height: 1.4;
}

.details-block {
  margin-bottom: 2rem;
}

.label {
  display: block;
  opacity: 1; 
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.link, .address {
  text-decoration: none;
  display: block;
  transition: opacity 0.2s ease;
}

.link:hover {
  opacity: 0.8;
}

.clean-form {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 3rem;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 2px;
}

.input-group {
  width: 100%;
}

.input-group input,
.input-group textarea {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 2px solid #ffffff; 
  padding: 1rem 0;
  outline: none;
  transition: border-bottom-width 0.1s ease;
  font-family: inherit;
}

.input-group input::placeholder,
.input-group textarea::placeholder {
  color: #ffffff;
  opacity: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);
}

.input-group input:focus,
.input-group textarea:focus {
  border-bottom: 4px solid #ffffff;
}

.input-group textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  background: transparent;
  border: 2px solid #ffffff; 
  padding: 1rem 2rem;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.3s ease;
  font-family: inherit;
  text-transform: uppercase;
  margin-top: 1rem;
}

.submit-btn:hover {
  background: rgba(0, 0, 0, 0.4);
  border-color: #ffffff;
}
</style>