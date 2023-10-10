export interface SupabaseResponse<T> {
  data: T;
  error: string | null;
}
