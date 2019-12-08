<style lang="scss">
    .nameplate {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        height: 64px;
        justify-content: space-between;

        &__name {
            cursor: default;
            font-size: 1.05rem;
            letter-spacing: 1px;
            color: #666;
            position: relative;
            border-left: 2px solid #eee;
            padding-left: 10px;

            span {
                font-size: 1.1rem;
                color: #999;
                text-transform: capitalize;
            }

            &:after {
                position: absolute;
                content: '';
                height: 6px;
                width: 40px;
                border-radius: 4px;
                left: 0;
                bottom: -20px;
                opacity: .8;
            }
        }

        &__action {
        }

        @media ($screen-xs-max) {
            flex-flow: column nowrap;
            justify-content: flex-start;
            align-items: flex-start;

            &__name {
                &:after {
                    left: 10px;
                }

                padding-left: 10px;
            }

            &__action {
                margin-top: 20px;
                align-self: flex-end;
                border-bottom: 1px solid #eee;
            }
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
