/**
 * UTF-8 & Trilingual Parity Validation Tests
 * Ensures no corrupted characters exist in es.json, ca.json, and en.json
 */

import esContent from '@/content/es.json'
import caContent from '@/content/ca.json'
import enContent from '@/content/en.json'

describe('UTF-8 & Trilingual Content Validation', () => {
  const corruptedPatterns = [
    /ƒ/g,
    /TecnologVa/gi,
    /Coacheo Tecnolƒgico/gi,
  ]

  const checkForCorruption = (text: string, source: string): string[] => {
    const issues: string[] = []
    corruptedPatterns.forEach((pattern) => {
      if (pattern.test(text)) {
        issues.push(`Found corrupted pattern ${pattern} in ${source}`)
      }
    })
    return issues
  }

  const traverseObject = (obj: Record<string, unknown>, path: string = ''): string[] => {
    const issues: string[] = []

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key

      if (typeof value === 'string') {
        issues.push(...checkForCorruption(value, currentPath))
      } else if (typeof value === 'object' && value !== null) {
        issues.push(...traverseObject(value as Record<string, unknown>, currentPath))
      }
    }

    return issues
  }

  it('should not contain corrupted UTF-8 characters in es.json', () => {
    const issues = traverseObject(esContent as unknown as Record<string, unknown>, 'es.json')
    expect(issues).toHaveLength(0)
  })

  it('should not contain corrupted UTF-8 characters in ca.json', () => {
    const issues = traverseObject(caContent as unknown as Record<string, unknown>, 'ca.json')
    expect(issues).toHaveLength(0)
  })

  it('should not contain corrupted UTF-8 characters in en.json', () => {
    const issues = traverseObject(enContent as unknown as Record<string, unknown>, 'en.json')
    expect(issues).toHaveLength(0)
  })

  it('should preserve 1:1 top-level key parity across es.json, ca.json, and en.json', () => {
    const esKeys = Object.keys(esContent).sort()
    const caKeys = Object.keys(caContent).sort()
    const enKeys = Object.keys(enContent).sort()

    expect(caKeys).toEqual(esKeys)
    expect(enKeys).toEqual(esKeys)
  })

  it('should handle Spanish and Catalan characters correctly', () => {
    const sampleText = 'Tecnología y diseño sin fricción · Intel·ligència Artificial a Catalunya'
    const issues = checkForCorruption(sampleText, 'test')
    expect(issues).toHaveLength(0)
    expect(sampleText).toContain('ñ')
    expect(sampleText).toContain('·')
  })
})
