import { ref, reactive } from 'vue'
import type { Sentence } from '@/types/Sentence'
import { useTranslationStore } from '@/stores/TranlationStore'

export function useTranslationCard(translationStore = useTranslationStore()) {
  const sentenceTranslationCard = reactive({
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
    context: '',
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

  let sentenceCardRef: HTMLElement | null = null
  let wordCardRef: HTMLElement | null = null

  function setSentenceCardRef(el: HTMLElement | null) {
    sentenceCardRef = el
  }

  function setWordCardRef(el: HTMLElement | null) {
    wordCardRef = el
  }

  const closeSentenceTranslationCard = (event?: MouseEvent) => {
    if (event && sentenceCardRef && sentenceCardRef.contains(event.target as Node)) {
      return
    }
    sentenceTranslationCard.show = false
    document.removeEventListener('click', closeSentenceTranslationCard)
  }

  const closeWordTranslationCard = (event?: MouseEvent) => {
    if (event && wordCardRef && wordCardRef.contains(event.target as Node)) {
      return
    }
    wordTranslationCard.show = false
    document.removeEventListener('click', closeWordTranslationCard)
  }

  const showSentenceTranslation = (sentence: Sentence, event: MouseEvent) => {
    closeSentenceTranslationCard()
    sentenceTranslationCard.original = sentence.originalText
    sentenceTranslationCard.text = sentence.translatedText
    sentenceTranslationCard.x = event.clientX
    sentenceTranslationCard.y = event.clientY
    if (sentenceTranslationCard.text) {
      // Проверяем, есть ли перевод; если пусто, не показываем или показываем ошибку
      sentenceTranslationCard.show = true
    } else {
      sentenceTranslationCard.error = true
      sentenceTranslationCard.show = true // Можно показать с ошибкой "Нет перевода"
    }
    document.addEventListener('click', closeSentenceTranslationCard)
  }

  const showWordTranslation = async (word: string, context: string, event: MouseEvent) => {
    closeWordTranslationCard()
    try {
      wordTranslationCard.word = word
      wordTranslationCard.loading = true
      wordTranslationCard.error = false

      const wordTranslation = await translationStore.getTranslation(word)

      if (wordTranslation) {
        wordTranslationCard.show = true
        wordTranslationCard.x = event.clientX
        wordTranslationCard.y = event.clientY
        wordTranslationCard.context = context
        wordTranslationCard.transcription = wordTranslation?.definitions[0]?.ts || ''
        wordTranslationCard.definitions =
          wordTranslation?.definitions.map(
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
          ) || []
      } else {
        wordTranslationCard.error = true
      }
    } catch (err) {
      wordTranslationCard.error = true
    } finally {
      wordTranslationCard.loading = false
    }

    document.addEventListener('click', closeWordTranslationCard)
  }

  return {
    sentenceTranslationCard,
    wordTranslationCard,
    showSentenceTranslation,
    showWordTranslation,
    setSentenceCardRef,
    setWordCardRef,
  }
}
