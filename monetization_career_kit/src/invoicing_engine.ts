/**
 * Dual-Currency Invoicing Engine (USD & INR) for Career Packages & Corporate Retainers
 * Supports: Individual packages ($149 / $299 / $599) and Corporate Retainers ($300 / $750 / $1,500).
 */

export interface CareerInvoiceItem {
  description: string;
  packageType: 'STARTER_RESUME' | 'EXECUTIVE_SUITE' | 'FULL_CAREER' | 'CORPORATE_RETAINER';
  amount: number;
  currency: 'USD' | 'INR';
}

export interface ClientProfile {
  name: string;
  email: string;
  country: string;
  isExport: boolean;
  gstin?: string;
}

export interface GeneratedCareerInvoice {
  invoiceNumber: string;
  date: string;
  client: ClientProfile;
  items: CareerInvoiceItem[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  currency: 'USD' | 'INR';
  paymentDetails: {
    domesticUpi: string;
    internationalPaypal: string;
  };
  notes: string;
}

export class InvoicingEngine {
  private domesticUpi = 'milind.chatrabhuji@okhdfcbank';
  private internationalPaypal = 'milind.chatrabhuji@gmail.com';

  public generateInvoice(
    invoiceId: string,
    client: ClientProfile,
    items: CareerInvoiceItem[],
    currency: 'USD' | 'INR' = 'USD'
  ): GeneratedCareerInvoice {
    let subtotal = 0;
    items.forEach(i => subtotal += i.amount);

    // GST Rule: If export under LUT, GST rate is 0%. If domestic Indian client, 18% GST.
    const gstRate = client.isExport ? 0.00 : 0.18;
    const gstAmount = subtotal * gstRate;
    const totalAmount = subtotal + gstAmount;

    return {
      invoiceNumber: `INV-CAR-${invoiceId}`,
      date: new Date().toISOString().split('T')[0],
      client,
      items,
      subtotal,
      gstAmount,
      totalAmount,
      currency,
      paymentDetails: {
        domesticUpi: this.domesticUpi,
        internationalPaypal: this.internationalPaypal
      },
      notes: client.isExport
        ? 'Export of Professional Services under Letter of Undertaking (LUT) without payment of IGST under Rule 96A of CGST Rules 2017.'
        : 'Domestic Career Consulting & Professional Services. Standard 18% GST applied.'
    };
  }
}
