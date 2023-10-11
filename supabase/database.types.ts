import { MergeDeep } from 'type-fest'
import { Database as DatabaseGenerated } from './database-generated.types'
export type { Json } from './database-generated.types'
import { PostgrestError } from '@supabase/supabase-js'

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {}
    }
  }
>

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }>
  ? Exclude<U, null>
  : never

export type DbResultErr = PostgrestError
