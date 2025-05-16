import { ref, onMounted } from 'vue'
import { useRouter, type RouteLocationNormalizedLoaded } from 'vue-router'
import { useBookContextStore } from '@/stores/BookContextStore'
import { usePagesStore } from '@/stores/PageStore'
import { useChaptersStore } from '@/stores/ChaptersStore'
import type { Book } from '@/types/Book'
import type { Chapter } from '@/types/Chapter'
import type { Page } from '@/types/Page'

export function useBookLoader(route: RouteLocationNormalizedLoaded) {
  const router = useRouter()
  const bookContextStore = useBookContextStore()
  const pageStore = usePagesStore()
  const chaptersStore = useChaptersStore()

  const book = ref<Book | null>(null)
  const chapters = ref<Chapter[]>([])
  const page = ref<Page | undefined>(undefined)

  function goToChapter(pageNumber: number) {
    router.push({ query: { pageNumber } })
  }

  async function nextPage() {
    await pageStore.navigatePage('next')
    page.value = pageStore.currentPage
  }

  async function prevPage() {
    await pageStore.navigatePage('prev')
    page.value = pageStore.currentPage
  }

  onMounted(async () => {
    const title = route.params.bookTitle as string
    const pageNumber = Number(route.query.pageNumber) || 1

    if (bookContextStore.currentBook?.title !== title) {
      await bookContextStore.fetchBookByTitle(title)
    }
    book.value = bookContextStore.currentBook

    if (book.value) {
      await pageStore.fetchPageByBookId(book.value.id, pageNumber)
      page.value = pageStore.currentPage
      chapters.value = chaptersStore.getChapters(book.value.id)
    }
  })

  return { book, chapters, page, goToChapter, nextPage, prevPage }
}
