import { InvoicingEngine } from './invoicing_engine';

console.log("=== Testing Pack 3: Career Monetization Kit ===");

const engine = new InvoicingEngine();
const invoice = engine.generateInvoice("2026-001", {
  name: "Dr. Robert Vance",
  email: "client@example.com",
  country: "United States",
  isExport: true
}, [
  {
    description: "Executive Resume + LinkedIn Profile Re-engineering Package",
    packageType: "EXECUTIVE_SUITE",
    amount: 299,
    currency: "USD"
  }
], "USD");

console.log("Generated Invoice #:", invoice.invoiceNumber, "Total:", invoice.totalAmount, invoice.currency);
