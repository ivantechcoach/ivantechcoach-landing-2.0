/**
 * UTF-8 Validation Tests
 * Ensures no corrupted characters exist in content files
 */

import esContent from '@/content/es.json'
import enContent from '@/content/en.json'

describe('UTF-8 Validation', () => {
  const corruptedPatterns = [
    /ƒ/g,
    /TecnologVa/gi,
    /Coacheo Tecnolƒgico/gi,
  ]

  const checkForCorruption = (text: string, source: string): string[] => {
    const issues: string[] = []
    corruptedPatterns.forEach(pattern => {
      if (pattern.test(text)) {
        issues.push(`Found corrupted pattern ${pattern} in ${source}`)
      }
    })
    return issues
  }

  const traverseObject = (obj: any, path: string = ''): string[] => {
    const issues: string[] = []
    
    for (const [key, value] of Object.entries(obj)) {
      const currentPath = path ? `${path}.${key}` : key
      
      if (typeof value === 'string') {
        issues.push(...checkForCorruption(value, currentPath))
      } else if (typeof value === 'object' && value !== null) {
        issues.push(...traverseObject(value, currentPath))
      }
    }
    
    return issues
  }

  it('should not contain corrupted UTF-8 characters in es.json', () => {
    const issues = traverseObject(esContent, 'es.json')
    expect(issues).toHaveLength(0)
  })

  it('should not contain corrupted UTF-8 characters in en.json', () => {
    const issues = traverseObject(enContent, 'en.json')
    expect(issues).toHaveLength(0)
  })

  it('should handle Spanish characters correctly', () => {
    const spanishText = 'Tecnología sin fricción'
    const issues = checkForCorruption(spanishText, 'test')
    expect(issues).toHaveLength(0)
    expect(spanishText).toContain('ñ')
    expect(spanishText).toContain('ó')
  })
})

