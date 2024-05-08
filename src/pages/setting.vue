<style lang="scss" scoped>
.setting {
}
</style>

<template>
  <div class="setting">
    <SettingLayout activeTab="engine" />
  </div>
</template>

<script>
  export default {
    name: 'setting',
    computed: {
      style() {
        return {
          color: this.color,
          fontSize: this.size,
          cursor: this.cursor
        }
      }
    }
  }
</script>
