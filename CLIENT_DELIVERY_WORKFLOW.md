# Client Delivery Workflow: Executive Career & Resume Re-engineering

## Standard Operating Procedure (SOP)

### Stage 1: Client Career Intake
1. Provide client with `CLIENT_CAREER_INTAKE_BRIEF.md`.
2. Extract current resume, target job postings (JDs), core technical stack, and target compensation.
3. Review and execute `RESUME_REWRITING_SERVICE_AGREEMENT.md`.

### Stage 2: ATS Audit & Gap Analysis
1. Ingest existing resume into `ats_resume_parser.ts`.
2. Run automated keyword extraction against 3-5 target job descriptions.
3. Calculate baseline ATS parseability score and identify formatting bottlenecks (tables, columns, non-standard headers).

### Stage 3: Quantitative Bullet Re-engineering
1. Pass raw job descriptions and accomplishments through `clinical_tech_bullet_rewriter.ts`.
2. Apply Google's XYZ formula ("Accomplished [X], measured by [Y], by doing [Z]").
3. Validate presence of hard metrics (e.g., latency reduction, cost savings, patient throughput, EHR uptime).

### Stage 4: Executive LinkedIn Optimization
1. Run `linkedin_profile_optimizer.ts` to craft a 220-character high-CTR headline.
2. Draft first-person narrative 'About' section with clear value proposition and call to action.
3. Optimize 50-skill taxonomy aligned with recruiter search filters.

### Stage 5: ATS Clean Export & Client Review
1. Export clean single-column Markdown and PDF via `markdown_pdf_exporter.ts`.
2. Deliver draft to client for Round 1 feedback within 48 hours.
3. Incorporate revisions and finalize assets.

### Stage 6: Settlement & Dual-Currency Invoicing
1. Issue formal invoice via `invoicing_engine.ts` (USD or INR with GST LUT zero-rated export exemption).
2. Archive deliverables in Cloudflare D1 database.
