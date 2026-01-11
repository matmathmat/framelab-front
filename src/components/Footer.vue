<template>
  <footer class="footer">
    <div class="footer-text">2026 by FrameLab</div>
  </footer>
</template>

<style scoped>
.footer {
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: transparent;
  z-index: 1000;
}

.footer-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  z-index: 2;
}
</style>