<template>
  <div class="auth-layout">
    <main class="auth-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.auth-layout{ position:relative; min-height:100vh; display:flex; flex-direction:column; background:#ffffff; }
.auth-main{ flex:1 0 auto; max-width:520px; margin:48px auto; width:100%; padding:0 24px; box-sizing:border-box; }
@media (max-width:640px){ .auth-main{ margin:32px auto; padding:0 16px; } }
</style>
