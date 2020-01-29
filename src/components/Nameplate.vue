<style lang="scss" scoped>
    .nameplate {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;

        &__name {
            position: relative;
            cursor: default;
            font-size: 1rem;
            letter-spacing: 1px;
            border-left: 4px solid $theme-default-color;
            padding: 4px 16px;
            @include theme-color();
            @include theme-border-color();

            span {
                font-size: 1.1rem;
                color: #666;
                text-transform: capitalize;
            }

        }

        &__action {
            color: #999;
        }

    }
</style>

<template>
    <div class="nameplate">
        <div class="nameplate__name">
            {{ name }}
            <slot />
            <span>{{ subName }}<slot name="subName" /></span>
        </div>
        <div class="nameplate__action">
            <slot name="action" />
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Nameplate',
    props: {
      name: {
        type: String,
        default: ''
      },
      subName: {
        type: String,
        default: ''
      }
    }
  }
</script>
