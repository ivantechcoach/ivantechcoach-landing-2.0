import { getContent, isValidLanguage, getDefaultLanguage, supportedLanguages } from '@/lib/content'

describe('lib/content', () => {
  describe('getContent', () => {
    it('should return Spanish content for "es"', async () => {
      const content = await getContent('es')
      expect(content).toBeDefined()
      expect(content.nav.home).toBe('Inicio')
    })

    it('should return Catalan content for "ca"', async () => {
      const content = await getContent('ca')
      expect(content).toBeDefined()
      expect(content.nav.home).toBe('Inici')
    })

    it('should return English content for "en"', async () => {
      const content = await getContent('en')
      expect(content).toBeDefined()
      expect(content.nav.home).toBe('Home')
    })

    it('should default to Spanish for invalid language', async () => {
      const content = await getContent('invalid')
      expect(content).toBeDefined()
      expect(content.nav.home).toBe('Inicio')
    })
  })

  describe('isValidLanguage', () => {
    it('should return true for supported languages (es, ca, en)', () => {
      expect(isValidLanguage('es')).toBe(true)
      expect(isValidLanguage('ca')).toBe(true)
      expect(isValidLanguage('en')).toBe(true)
    })

    it('should return false for unsupported languages', () => {
      expect(isValidLanguage('fr')).toBe(false)
      expect(isValidLanguage('de')).toBe(false)
      expect(isValidLanguage('invalid')).toBe(false)
    })
  })

  describe('getDefaultLanguage', () => {
    it('should return the default language', () => {
      expect(getDefaultLanguage()).toBe('es')
    })
  })

  describe('supportedLanguages', () => {
    it('should contain es, ca, and en', () => {
      expect(supportedLanguages).toContain('es')
      expect(supportedLanguages).toContain('ca')
      expect(supportedLanguages).toContain('en')
    })
  })
})
