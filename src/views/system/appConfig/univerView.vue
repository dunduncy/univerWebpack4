<template>
  <div></div>
</template>
<script>
import { createUniver, defaultTheme, LocaleType, merge } from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/presets/preset-sheets-core';
import UniverPresetSheetsCoreZhCN from '@univerjs/presets/preset-sheets-core/locales/zh-CN';
 
import '@univerjs/presets/lib/styles/preset-sheets-core.css';
 
const { univer, univerAPI } = createUniver({
  locale: LocaleType.ZH_CN,
  locales: {
    [LocaleType.ZH_CN]: merge(
      {},
      UniverPresetSheetsCoreZhCN,
    ),
  },
  theme: defaultTheme,
  presets: [
    UniverSheetsCorePreset({
      container: 'app',
    }),
  ],
});
 
univerAPI.createWorkbook({ name: 'Test Sheet' });
</script>
<style scoped>
</style>