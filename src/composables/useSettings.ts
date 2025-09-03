import { ref, watch, onMounted } from 'vue'

export function useSettings() {
  const font = ref(localStorage.getItem('font') || 'lora')
  const textSize = ref(Number(localStorage.getItem('textSize')) || 26)
  const theme = ref(localStorage.getItem('theme') || 'light')

  const applySettings = () => {
    document.body.className = theme.value

    // CSS переменные для шрифта и размера текста
    document.documentElement.style.setProperty('--reading-font', getFontFamily(font.value))
    document.documentElement.style.setProperty('--reading-font-size', `${textSize.value}px`)

    localStorage.setItem('font', font.value)
    localStorage.setItem('textSize', textSize.value.toString())
    localStorage.setItem('theme', theme.value)
  }

  // маппинг шрифтов
  const getFontFamily = (fontName: string) => {
    const fontMap: { [key: string]: string } = {
      lora: '"Lora", serif',
      arial: '"Arial", sans-serif',
      georgia: '"Georgia", serif',
    }
    return fontMap[fontName] || fontMap.lora
  }

  // настройки после монтирования компонента
  onMounted(() => {
    applySettings()
  })

  watch(font, applySettings)
  watch(textSize, applySettings)
  watch(theme, applySettings)

  return { font, textSize, theme, applySettings }
}
