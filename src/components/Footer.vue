<template>
  <footer class="footer">
    <div class="footer-line"></div>
    <div class="footer-text">2026 By FrameLab All right reserved.</div>
  </footer>
</template>

<style scoped>
.footer {
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-left: 2rem;
  flex-shrink: 0;
}

.footer-line {
  height: 2px;
  background-color: black;
  width: 90%;
}

.footer-text {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
}
</style>