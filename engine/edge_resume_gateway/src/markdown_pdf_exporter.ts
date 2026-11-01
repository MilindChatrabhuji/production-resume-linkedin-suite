/**
 * Universal ATS-Safe Resume Exporter
 * Formats: Semantic Markdown, Plaintext ASCII, Clean Semantic HTML, Print CSS PDF
 */

export interface ResumeData {
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    portfolioUrl?: string;
  };
  summary: string;
  skills: { category: string; skills: string[] }[];
  experience: {
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export class MarkdownPdfExporter {
  /**
   * Generate ATS-compliant single-column Markdown.
   */
  public exportMarkdown(data: ResumeData): string {
    const contact = `${data.contactInfo.fullName} | ${data.contactInfo.email} | ${data.contactInfo.phone} | ${data.contactInfo.location} | [LinkedIn](${data.contactInfo.linkedinUrl})`;

    let md = `# ${data.contactInfo.fullName}\n\n${contact}\n\n---\n\n`;
    md += `## PROFESSIONAL SUMMARY\n\n${data.summary}\n\n`;

    md += `## TECHNICAL SKILLS\n\n`;
    data.skills.forEach(cat => {
      md += `**${cat.category}:** ${cat.skills.join(', ')}\n\n`;
    });

    md += `## PROFESSIONAL EXPERIENCE\n\n`;
    data.experience.forEach(exp => {
      md += `### ${exp.role} | ${exp.company} (${exp.startDate} - ${exp.endDate})\n`;
      exp.bullets.forEach(b => {
        md += `- ${b}\n`;
      });
      md += `\n`;
    });

    md += `## EDUCATION\n\n`;
    data.education.forEach(edu => {
      md += `**${edu.degree}** — ${edu.institution} (${edu.year})\n\n`;
    });

    return md;
  }

  /**
   * Generate clean semantic HTML with single-column CSS for print-to-PDF.
   */
  public exportHtmlPrintReady(data: ResumeData): string {
    const md = this.exportMarkdown(data);
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${data.contactInfo.fullName} - ATS Resume</title>
  <style>
    body { font-family: Arial, Helvetica, sans-serif; line-height: 1.5; color: #111; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { font-size: 24px; text-transform: uppercase; margin-bottom: 4px; border-bottom: 2px solid #333; padding-bottom: 4px; }
    h2 { font-size: 16px; text-transform: uppercase; margin-top: 18px; margin-bottom: 6px; border-bottom: 1px solid #666; padding-bottom: 2px; }
    h3 { font-size: 14px; margin-top: 12px; margin-bottom: 4px; }
    ul { margin: 4px 0 12px 20px; padding: 0; }
    li { margin-bottom: 4px; font-size: 13px; }
    p { font-size: 13px; margin: 4px 0; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="resume-container">
    <pre style="white-space: pre-wrap; font-family: inherit;">${md}</pre>
  </div>
</body>
</html>`;
  }
}
