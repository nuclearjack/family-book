<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <n-loading-bar-provider>
            <nuxt-layout>
              <nuxt-page />
            </nuxt-layout>
          </n-loading-bar-provider>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import type { GlobalThemeOverrides } from 'naive-ui'

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#00403d',
    infoColor: '#a65f00'
  },
  Pagination: {
    itemColorActive: '#00403d',
    itemColorHover: '#00403d',
    itemTextColorActive: '#ffffff',
    itemTextColorHover: '#ffffff',
    itemColorActiveHover: '#00403d'
  },
  Menu: {
    itemTextColor: '#ffffff',
    itemColorActiveHorizontal: '#ffffff',
    itemTextColorActiveHorizontal: '#ffffff',
    itemTextColorActiveHoverHorizontal: '#ffffff',
    itemTextColorHoverHorizontal: '#ffffff',
    itemColorHoverHorizontal: '#ffffff',
    itemTextColorHorizontal: '#ffffff',
    itemBorderRadius: '8px'
  }
}
</script>
