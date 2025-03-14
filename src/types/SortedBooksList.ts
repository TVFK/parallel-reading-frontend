import type { Book } from './Book'

export interface BooksSorterByLevels {
  [level: string]: Book[]
}
