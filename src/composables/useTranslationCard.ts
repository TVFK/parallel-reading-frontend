import { ref, reactive } from 'vue'
import type { Sentence } from '@/types/Sentence'
import { useTranslationStore } from '@/stores/TranlationStore'

export function useTranslationCard(translationStore = useTranslationStore()) {
  const translationCard = reactive({
    show: false,
    original: '',
    text: '',
    loading: false,
    error: false,
    x: 0,
    y: 0,
  })

  const wordTranslationCard = reactive({
    show: false,
    word: '',
    transcription: '',
    definitions: [] as Array<{
      pos: string
      translations: Array<{
        text: string
        aspect?: string
        meanings: string[]
      }>
    }>,
    loading: false,
    error: false,
    x: 0,
    y: 0,
  })

  const closeTranslationCard = () => {
    translationCard.show = false
    document.removeEventListener('click', closeTranslationCard)
  }

  const closeWordTranslationCard = () => {
    wordTranslationCard.show = false
    document.removeEventListener('click', closeWordTranslationCard)
  }

  const showSentenceTranslation = (sentence: Sentence, event: MouseEvent) => {
    translationCard.original = sentence.originalText
    translationCard.text = sentence.translatedText
    translationCard.x = event.clientX
    translationCard.y = event.clientY
    translationCard.show = true
    setTimeout(() => {
      document.addEventListener('click', closeTranslationCard, { once: true })
    }, 10)
  }

  const showWordTranslation = async (word: string, event: MouseEvent) => {
    try {
      wordTranslationCard.show = true
      wordTranslationCard.word = word
      wordTranslationCard.x = event.clientX
      wordTranslationCard.y = event.clientY
      wordTranslationCard.loading = true
      wordTranslationCard.error = false

      const wordTranslation = translationStore.getTranslation(word)

      wordTranslationCard.transcription = wordTranslation.definitions[0]?.ts || ''
      wordTranslationCard.definitions = wordTranslation.definitions.map(
        (def: {
          pos: string
          translations: Array<{
            text: string
            asp?: string
            meanings: string[]
          }>
        }) => ({
          pos: def.pos,
          translations: def.translations.map(
            (tr: { text: string; asp?: string; meanings: string[] }) => ({
              text: tr.text,
              aspect: tr.asp,
              meanings: tr.meanings,
            }),
          ),
        }),
      )
    } catch (err) {
      wordTranslationCard.error = true
    } finally {
      wordTranslationCard.loading = false
    }

    setTimeout(() => {
      document.addEventListener('click', closeWordTranslationCard, { once: true })
    }, 10)
  }

  return {
    translationCard,
    wordTranslationCard,
    showSentenceTranslation,
    showWordTranslation,
  }
}
