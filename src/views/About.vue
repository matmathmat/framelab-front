<template>
  <div class="photo-wall">
    <div class="photo-grid">
      <div class="photo-item photo-1">
        <div class="pin pin-red"></div>
        <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800" alt="Couple">
        <div class="overlay">
          <h2>Moments Précieux</h2>
          <p>Capturez l'essence de vos relations et créez des souvenirs inoubliables.</p>
        </div>
      </div>

      <div class="photo-item photo-2">
        <div class="pin pin-blue"></div>
        <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800" alt="Portrait">
        <div class="overlay">
          <h2>Expressions Naturelles</h2>
          <p>Des photos qui capturent votre vraie joie et énergie positive.</p>
        </div>
      </div>

      <div class="photo-item photo-3">
        <div class="pin pin-red"></div>
        <img src="https://images.unsplash.com/photo-1554080353-a576cf803bda?w=800" alt="Photographe">
        <div class="overlay">
          <h2>Passion Créative</h2>
          <p>L'art de la photographie avec une approche professionnelle.</p>
        </div>
      </div>

      <div class="photo-item photo-4">
        <div class="pin pin-green"></div>
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800" alt="Portrait femme">
        <div class="overlay">
          <h2>Portraits Authentiques</h2>
          <p>Révélez votre personnalité unique à travers des portraits naturels.</p>
        </div>
      </div>

      <div class="label-card">
        <div class="pin pin-blue"></div>
        <h1>FrameLab</h1>
      </div>

      <div class="photo-item photo-5">
        <div class="pin pin-green"></div>
        <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800" alt="Sourire">
        <div class="overlay">
          <h2>Émotions Sincères</h2>
          <p>Chaque sourire raconte une histoire, chaque regard une émotion.</p>
        </div>
      </div>

      <div class="photo-item photo-6">
        <div class="pin pin-red"></div>
        <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800" alt="Appareil photo">
        <div class="overlay">
          <h2>Derrière l'Objectif</h2>
          <p>La magie opère quand passion rencontre professionnalisme.</p>
        </div>
      </div>

      <div class="photo-item photo-7">
        <div class="pin pin-teal"></div>
        <img src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800" alt="Groupe">
        <div class="overlay">
          <h2>Souvenirs Partagés</h2>
          <p>Immortalisez vos moments ensemble et créez une galerie mémorable.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.photo-wall {
  min-height: 100vh;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-grid {
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  padding: 0;
}

.photo-item {
  position: relative;
  background: white;
  padding: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease;
  aspect-ratio: 4/3;
}

.photo-item:hover {
  transform: translateY(-5px) rotate(2deg);
  z-index: 10;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
}

.overlay {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 8px;
  background: rgba(0, 0, 0, 0.88);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  padding: 20px;
  text-align: center;
}

.photo-item:hover .overlay {
  opacity: 1;
}

.photo-item:hover img {
  filter: blur(2px);
}

.overlay h2 {
  color: #fff;
  font-size: 1.3em;
  margin-bottom: 10px;
  font-weight: 600;
}

.overlay p {
  color: #e0e0e0;
  font-size: 0.85em;
  line-height: 1.5;
}

.pin {
  position: absolute;
  top: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.pin-red {
  background: #e74c3c;
  left: 15px;
}

.pin-blue {
  background: #3498db;
  left: 50%;
  transform: translateX(-50%);
}

.pin-green {
  background: #2ecc71;
  right: 15px;
}

.pin-teal {
  background: #1abc9c;
  right: 20px;
}

.photo-1 {
  grid-column: 1;
  grid-row: 1;
  transform: rotate(-3deg);
}

.photo-2 {
  grid-column: 2;
  grid-row: 1;
  transform: rotate(2deg);
}

.photo-3 {
  grid-column: 3;
  grid-row: 1;
  transform: rotate(-2deg);
}

.photo-4 {
  grid-column: 1;
  grid-row: 2;
  transform: rotate(1deg);
}

.label-card {
  grid-column: 2;
  grid-row: 2;
  background: white;
  padding: 25px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transform: rotate(-1deg);
}

.label-card h1 {
  font-family: 'Brush Script MT', cursive;
  font-size: 2em;
  color: #333;
}

.photo-5 {
  grid-column: 3;
  grid-row: 2;
  transform: rotate(2deg);
}

.photo-6 {
  grid-column: 1;
  grid-row: 3;
  transform: rotate(-2deg);
}

.photo-7 {
  grid-column: 2 / 4;
  grid-row: 3;
  transform: rotate(1deg);
  aspect-ratio: 8/3; 
}

@media (max-width: 1366px) {
  .photo-grid {
    max-width: 1000px;
    gap: 12px;
  }
  
  .overlay h2 {
    font-size: 1.2em;
  }
  
  .overlay p {
    font-size: 0.8em;
  }
  
  .label-card h1 {
    font-size: 1.8em;
  }
}

@media (max-width: 1024px) {
  .photo-grid {
    max-width: 850px;
    gap: 12px;
  }
  
  .overlay h2 {
    font-size: 1.1em;
  }
  
  .overlay p {
    font-size: 0.75em;
  }
  
  .label-card h1 {
    font-size: 1.7em;
  }
}

@media (max-width: 768px) {
  .photo-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    max-width: 400px;
  }

  .photo-1, .photo-2, .photo-3, .photo-4, .photo-5, .photo-6, .photo-7 {
    grid-column: 1 !important;
    grid-row: auto !important;
  }

  .label-card {
    grid-column: 1 !important;
    grid-row: auto !important;
  }
  
  .overlay h2 {
    font-size: 1.4em;
  }
  
  .overlay p {
    font-size: 0.9em;
  }
}
</style>