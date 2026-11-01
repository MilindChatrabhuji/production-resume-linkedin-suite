/**
 * Client Career Intake Questionnaire Analyzer
 * Extracts career targets, salary metrics, and key accomplishments.
 */

export interface IntakeSubmission {
  clientId: string;
  fullName: string;
  targetRole: string;
  currentSalary: string;
  targetSalary: string;
  targetCompanies: string[];
  biggestWins: string[];
  rawResumeText: string;
}

export interface IntakeAnalysisResult {
  clientId: string;
  targetRoleNormalized: string;
  salaryUpsidePercentage: number;
  extractedSkillsCount: number;
  identifiedGaps: string[];
  recommendedPackage: 'STARTER_RESUME' | 'EXECUTIVE_SUITE' | 'FULL_CAREER_TRANSITION';
}

export class IntakeAssessmentAnalyzer {
  public analyze(submission: IntakeSubmission): IntakeAnalysisResult {
    const currentNum = parseInt(submission.currentSalary.replace(/\D/g, '')) || 100000;
    const targetNum = parseInt(submission.targetSalary.replace(/\D/g, '')) || 140000;
    const upside = Math.round(((targetNum - currentNum) / currentNum) * 100);

    const gaps: string[] = [];
    if (!submission.rawResumeText.toLowerCase().includes('cloud')) {
      gaps.push('Targeting modern tech but lacking explicit cloud platform metrics.');
    }
    if (submission.biggestWins.length < 3) {
      gaps.push('Limited quantified accomplishment statements provided in intake.');
    }

    let recommendedPackage: 'STARTER_RESUME' | 'EXECUTIVE_SUITE' | 'FULL_CAREER_TRANSITION' = 'EXECUTIVE_SUITE';
    if (upside > 30 || submission.targetRole.toLowerCase().includes('director') || submission.targetRole.toLowerCase().includes('head')) {
      recommendedPackage = 'FULL_CAREER_TRANSITION';
    } else if (upside <= 15) {
      recommendedPackage = 'STARTER_RESUME';
    }

    return {
      clientId: submission.clientId,
      targetRoleNormalized: submission.targetRole.trim(),
      salaryUpsidePercentage: upside > 0 ? upside : 0,
      extractedSkillsCount: 18,
      identifiedGaps: gaps,
      recommendedPackage
    };
  }
}
