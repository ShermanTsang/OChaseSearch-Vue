<style lang="scss" scoped>
.setting-preference {
  position: relative;

  &__block {
    color: #666;
    font-size: .95rem;
    margin-bottom: 40px;
  }

  &__list {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
  }

}
</style>

<template>
  <LayoutRow class="setting-preference">
    <LayoutCol :xs="{span:24}" :sm="{span:24}" :md="{span:24}" :lg="{span:24}" :xl="{span:24}">
      <div class="setting-preference__block">
        <Nameplate>
          {{ $t('setting.i18n') }}
        </Nameplate>
        <SettingItem :name="$t('setting.setLang')">
          <div slot="action">
            <Btn v-for="item in config.langList" :key="item.key" class="lang-switch__item"
                 @click="activeLang = item.key">
              <Icon v-if="activeLang === item.key" name="check" color="#aaa" style="margin-right: 10px" />
              {{ item.text }}
            </Btn>
          </div>
        </SettingItem>
      </div>
    </LayoutCol>
  </LayoutRow>
</template>

<script>
  export default {
    name: 'SettingPreference',
    props: {},
    data() {
      return {
        config: {
          langList: [
            {key: 'zh', text: '中文'},
            {key: 'en', text: 'English'},
          ]
        },
        state: {}
      }
    },
    computed: {
      activeLang: {
        get() {
          return this.$store.getters.lang
        },
        set(value) {
          this.$i18n.locale = value
          this.$store.commit('SET_LANG', value)
          this.$toast.success(this.$t('lang.setSuccess') + this.$t('lang.current'))
        }
      }
    },
    methods: {}
  }
</script>
