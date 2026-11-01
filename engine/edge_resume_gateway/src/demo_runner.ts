import { MarkdownPdfExporter } from './markdown_pdf_exporter';
import { IntakeAssessmentAnalyzer } from './intake_assessment_analyzer';

console.log("=== Testing Pack 2: Gateway & Exporters ===");

const exporter = new MarkdownPdfExporter();
const md = exporter.exportMarkdown({
  contactInfo: {
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1-555-0199",
    location: "Austin, TX",
    linkedinUrl: "https://linkedin.com/in/janesmith"
  },
  summary: "Executive Engineering Leader with 15+ years experience.",
  skills: [{ category: "Cloud", skills: ["AWS", "GCP", "Kubernetes"] }],
  experience: [{
    role: "Staff Engineer",
    company: "HealthTech Systems",
    location: "Austin, TX",
    startDate: "2021",
    endDate: "Present",
    bullets: ["Architected microservices handling 50M daily requests."]
  }],
  education: [{ degree: "B.S. Computer Science", institution: "UT Austin", year: "2008" }]
});
console.log("Markdown Export Length:", md.length);

const analyzer = new IntakeAssessmentAnalyzer();
const analysis = analyzer.analyze({
  clientId: "c-101",
  fullName: "Jane Smith",
  targetRole: "Head of Engineering",
  currentSalary: "$180,000",
  targetSalary: "$240,000",
  targetCompanies: ["Tier-1 SaaS", "Health AI"],
  biggestWins: ["Scaled team to 30", "Cut p99 latency by 60%"],
  rawResumeText: "Experienced engineer with cloud platform background"
});
console.log("Intake Package Recommendation:", analysis.recommendedPackage);
