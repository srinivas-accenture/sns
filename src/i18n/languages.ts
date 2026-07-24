export type Language = {
  code: string
  label: string
}

// Single source of truth for supported languages.
// To add a new language, append an entry here — no other file needs to change.
export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English' },
  { code: 'mr', label: 'Marathi' },
]

export const DEFAULT_LANGUAGE_CODE = 'en'
