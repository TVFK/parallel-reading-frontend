import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Sentence } from '@/types/Sentence'

export function useSentenceInteraction(
  pageRef: Ref<Sentence[] | undefined>,
  handlers: {
    showSentence: (sentence: Sentence, event: MouseEvent) => void
    showWord: (word: string, event: MouseEvent) => Promise<void>
  },
) {
  const hoverState = ref<{ sentenceIndex: number; partIndex: number } | null>(null)

  const splitSentence = (text: string) => text.split(/(\s+)/)
  const isSpace = (part: string) => /\s+/.test(part)

  function handleWordHover(sentenceIndex: number, partIndex: number, event: MouseEvent) {
    const sentences = pageRef.value
    if (!sentences) return
    const part = splitSentence(sentences[sentenceIndex].originalText)[partIndex]
    hoverState.value = { sentenceIndex, partIndex: isSpace(part) ? -1 : partIndex }
  }

  async function handleTextClick(sentenceIndex: number, partIndex: number, event: MouseEvent) {
    const sentences = pageRef.value
    if (!sentences) return
    const sentence = sentences[sentenceIndex]
    const parts = splitSentence(sentence.originalText)
    const part = parts[partIndex]

    if (isSpace(part)) {
      handlers.showSentence(sentence, event)
    } else {
      await handlers.showWord(part, event)
    }
  }

  function isPartHighlighted(sentenceIndex: number, partIndex: number) {
    if (!hoverState.value) return false
    return (
      hoverState.value.sentenceIndex === sentenceIndex &&
      (hoverState.value.partIndex === -1 || hoverState.value.partIndex === partIndex)
    )
  }

  return {
    splitSentence,
    handleWordHover,
    handleTextClick,
    isPartHighlighted,
  }
}
