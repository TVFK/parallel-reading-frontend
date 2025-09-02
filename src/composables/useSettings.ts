import { ref, watch } from 'vue'

export function useSettings() {
  const font = ref(localStorage.getItem('font') || 'lora')
  const textSize = ref(Number(localStorage.getItem('textSize')) || 28)
  const theme = ref(localStorage.getItem('theme') || 'light')

  const applySettings = () => {
    document.body.className = theme.value

    document.querySelectorAll('.text-content').forEach((el) => {
      ;(el as HTMLElement).style.fontFamily = font.value
      ;(el as HTMLElement).style.fontSize = `${textSize.value}px`
    })

    localStorage.setItem('font', font.value)
    localStorage.setItem('textSize', textSize.value.toString())
    localStorage.setItem('theme', theme.value)
  }

  applySettings()

  watch(font, applySettings)
  watch(textSize, applySettings)
  watch(theme, applySettings)

  return { font, textSize, theme, applySettings }
}
