import { ref, watch } from 'vue'

// Composable для общих настроек (шрифт, размер, тема)
export function useSettings() {
  const font = ref(localStorage.getItem('font') || 'lora')
  const textSize = ref(Number(localStorage.getItem('textSize')) || 26)
  const theme = ref(localStorage.getItem('theme') || 'light')

  // Сохраняем изменения в localStorage
  watch(font, (val) => localStorage.setItem('font', val))
  watch(textSize, (val) => localStorage.setItem('textSize', val.toString()))
  watch(theme, (val) => localStorage.setItem('theme', val))

  return { font, textSize, theme }
}
