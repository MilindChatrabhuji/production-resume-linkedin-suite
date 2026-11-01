/**
 * Production ATS Resume Parser & Compliance Scoring Engine
 * Evaluates single-column parseability, keyword match density, and format traps.
 */

export interface ATSParseReport {
  score: number; // 0 to 100
  isAtsCompliant: boolean;
  detectedSections: string[];
  missingCrucialSections: string[];
  keywordDensity: { keyword: string; count: number; recommendedMin: number }[];
  layoutIssues: string[];
  recommendations: string[];
}

export class ATSResumeParser {
  private standardSections = [
    'professional summary',
    'work experience',
    'technical skills',
    'education',
    'certifications',
    'projects'
  ];

  private layoutTraps = [
    { pattern: /<table/i, description: 'HTML tables detected (incompatible with legacy ATS parsers)' },
    { pattern: /column-count|display:\s*grid|float:\s*(left|right)/i, description: 'Multi-column layout styling detected' },
    { pattern: /<img|<svg/i, description: 'Graphical icons or images inside body text' },
    { pattern: /\t{3,}/, description: 'Excessive tab indentation causing token dislocation' }
  ];

  /**
   * Parse resume text and evaluate compatibility with modern ATS platforms (Workday, Greenhouse, Lever).
   */
  public parseAndAudit(resumeText: string, targetJobDescription: string = ''): ATSParseReport {
    const textLower = resumeText.toLowerCase();
    const detectedSections: string[] = [];
    const missingSections: string[] = [];
    const layoutIssues: string[] = [];
    const recommendations: string[] = [];

    // 1. Audit standard section headings
    this.standardSections.forEach(sec => {
      if (textLower.includes(sec)) {
        detectedSections.push(sec);
      } else {
        missingSections.push(sec);
      }
    });

    if (missingSections.includes('work experience')) {
      layoutIssues.push('Critical section missing: Work Experience / Professional Experience.');
    }
    if (missingSections.includes('technical skills')) {
      layoutIssues.push('Technical Skills section missing or non-standard naming.');
    }

    // 2. Audit layout traps
    this.layoutTraps.forEach(trap => {
      if (trap.pattern.test(resumeText)) {
        layoutIssues.push(trap.description);
      }
    });

    // 3. Keyword density matching
    const keywordsToExtract = this.extractTopKeywords(targetJobDescription);
    const keywordDensity: { keyword: string; count: number; recommendedMin: number }[] = [];

    keywordsToExtract.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      const matches = (resumeText.match(regex) || []).length;
      keywordDensity.push({ keyword: kw, count: matches, recommendedMin: 2 });
    });

    // 4. Calculate ATS Score
    let score = 100;
    score -= missingSections.length * 8;
    score -= layoutIssues.length * 15;
    
    const missingKeywords = keywordDensity.filter(k => k.count === 0).length;
    score -= missingKeywords * 4;

    if (score < 0) score = 0;
    if (score > 100) score = 100;

    // 5. Generate actionable recommendations
    if (layoutIssues.length > 0) {
      recommendations.push('Convert resume to a strictly single-column layout without tables or text boxes.');
    }
    if (missingKeywords > 0) {
      recommendations.push(`Naturally integrate missing target keywords: ${keywordDensity.filter(k => k.count === 0).slice(0, 5).map(k => k.keyword).join(', ')}.`);
    }
    if (!textLower.includes('quantified') && !/\d+%|\$\d+|₹\d+/.test(resumeText)) {
      recommendations.push('Strengthen bullet points by adding quantified metrics (%, $, scale, velocity).');
    }

    return {
      score,
      isAtsCompliant: score >= 80 && layoutIssues.length === 0,
      detectedSections,
      missingCrucialSections: missingSections,
      keywordDensity,
      layoutIssues,
      recommendations
    };
  }

  private extractTopKeywords(jd: string): string[] {
    if (!jd || jd.trim().length === 0) {
      return ['typescript', 'react', 'cloud architecture', 'distributed systems', 'ehr', 'hipaa', 'api', 'ci/cd'];
    }
    const words = jd.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
    const freq: Record<string, number> = {};
    const stopwords = new Set(['with', 'that', 'this', 'from', 'have', 'more', 'will', 'your', 'about', 'their', 'work']);

    words.forEach(w => {
      if (!stopwords.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });

    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(entry => entry[0]);
  }
}
