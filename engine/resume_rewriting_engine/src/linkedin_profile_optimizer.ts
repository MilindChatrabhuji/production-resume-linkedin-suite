/**
 * Executive LinkedIn Profile Optimizer & Headline Generator
 * Formats high-CTR headlines, first-person narrative summaries, and skill taxonomy.
 */

export interface LinkedInProfileSpec {
  fullName: string;
  currentTitle: string;
  targetRole: string;
  industry: 'tech_software' | 'health_tech_clinical' | 'engineering_leadership';
  yearsExperience: number;
  topAchievements: string[];
  coreSkills: string[];
}

export interface OptimizedLinkedInProfile {
  headline: string; // Max 220 chars
  headlineCharacterCount: number;
  aboutSection: string; // Max 2600 chars
  aboutWordCount: number;
  featuredSectionRecommendations: string[];
  recommendedSkills: string[];
  recruiterSearchKeywords: string[];
}

export class LinkedInProfileOptimizer {
  /**
   * Generate high-CTR executive headline strictly under 220 characters.
   */
  public generateHeadline(spec: LinkedInProfileSpec): string {
    let headline = '';
    if (spec.industry === 'health_tech_clinical') {
      headline = `${spec.targetRole} | Clinical Informatics & Digital Health | Ex-Chief Medical Officer | Scaling EHR & Health AI Solutions | HIPAA & CPT/ICD-10 Governance`;
    } else if (spec.industry === 'engineering_leadership') {
      headline = `Head of Engineering / VP of Technology | Distributed Systems, Cloud Architecture & High-Scale Microservices | Scaling High-Performing Teams (0 to 50+)`;
    } else {
      headline = `Senior Software Architect & Full-Stack Engineer | TypeScript, Distributed Systems & Cloud Platforms | Scaling Mission-Critical SaaS Infrastructure`;
    }

    if (headline.length > 220) {
      headline = headline.substring(0, 217) + '...';
    }
    return headline;
  }

  /**
   * Generate engaging first-person narrative 'About' section under 2,600 characters.
   */
  public generateAboutSection(spec: LinkedInProfileSpec): string {
    const achievementsFormatted = spec.topAchievements.map(a => `• ${a}`).join('\n');
    const skillsFormatted = spec.coreSkills.slice(0, 10).join(' • ');

    return `I am an experienced ${spec.currentTitle} with over ${spec.yearsExperience} years of proven expertise in architecting high-impact solutions at the intersection of technology, operational rigor, and strategic growth.

My focus centers on delivering resilient systems that solve complex real-world problems. Whether designing mission-critical cloud backends, navigating regulatory and clinical governance, or mentoring top engineering talent, I believe sustainable velocity stems from architectural clarity and disciplined execution.

Key Career Highlights:
${achievementsFormatted}

Core Competencies & Technology Stack:
${skillsFormatted}

I am always interested in discussing technical challenges, distributed systems, digital health innovation, and scaling high-performance engineering cultures. Feel free to connect or reach out directly at contact@career.example.com.`;
  }

  /**
   * Optimize full LinkedIn profile package.
   */
  public optimizeProfile(spec: LinkedInProfileSpec): OptimizedLinkedInProfile {
    const headline = this.generateHeadline(spec);
    const aboutSection = this.generateAboutSection(spec);

    return {
      headline,
      headlineCharacterCount: headline.length,
      aboutSection,
      aboutWordCount: aboutSection.split(/\s+/).filter(Boolean).length,
      featuredSectionRecommendations: [
        'Pin your highest-impact whitepaper, system architecture diagram, or clinical study summary.',
        'Link to your open-source GitHub repositories or patented technical solutions.',
        'Feature a milestone post celebrating a major platform migration or clinical product launch.'
      ],
      recommendedSkills: spec.coreSkills,
      recruiterSearchKeywords: [spec.targetRole, 'Cloud Architecture', 'Distributed Systems', 'Health Informatics', 'Agile Leadership', 'System Design']
    };
  }
}
