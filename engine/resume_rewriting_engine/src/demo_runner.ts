import { ATSResumeParser } from './ats_resume_parser';
import { LinkedInProfileOptimizer } from './linkedin_profile_optimizer';
import { ClinicalTechBulletRewriter } from './clinical_tech_bullet_rewriter';

console.log("=== Testing Pack 1: Resume & LinkedIn Engine ===");

const parser = new ATSResumeParser();
const audit = parser.parseAndAudit("John Doe | Work Experience | Technical Skills | Education", "TypeScript Cloud Distributed Systems");
console.log("ATS Score:", audit.score, "Compliant:", audit.isAtsCompliant);

const linkedin = new LinkedInProfileOptimizer();
const profile = linkedin.optimizeProfile({
  fullName: "Dr. Alex Taylor",
  currentTitle: "Clinical Informatics Director",
  targetRole: "VP of Healthcare Informatics",
  industry: "health_tech_clinical",
  yearsExperience: 14,
  topAchievements: [
    "Led Epic EHR integration across 18 clinics under HIPAA compliance",
    "Standardized AMA CPT/ICD-10 clinical coding workflow"
  ],
  coreSkills: ["Clinical Informatics", "EHR Systems", "HIPAA", "CPT/ICD-10"]
});
console.log("LinkedIn Headline:", profile.headline);

const rewriter = new ClinicalTechBulletRewriter();
const transformed = rewriter.rewriteBullet({
  rawBullet: "Managed hospital EHR migration",
  domain: "healthcare_informatics"
});
console.log("Transformed Bullet:", transformed.rewritten);
