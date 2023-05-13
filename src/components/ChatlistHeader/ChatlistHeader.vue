<script setup lang="ts">
import SearchGlobal from '../SearchGlobal/SearchGlobal.vue'
import UserStatus from '../UserStatus/UserStatus.vue'
</script>

<template>
  <!-- <div class="chatlist_header"> -->
    <user-status />
    <search-global />
  <!-- </div> -->
</template>

<style lang="less" scoped>
.chatlist_header {
  margin: 10px 0;
}
</style>
