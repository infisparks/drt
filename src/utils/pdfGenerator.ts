import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { NABETDomain, NABETParameter, NABETEvidence } from '../types/nabet';
import { SCHOOL_INFO, CURRENT_SESSION } from '../data/mockData';
import { NABET_EDITION, NABET_TARGET_CYCLE } from '../data/nabetData';

/**
 * Generates an official, comprehensive NABET Accreditation Executive Dossier PDF
 * and returns the generated Blob URL for viewing/downloading in the browser.
 */
export function generateNABETDossierBlobUrl(
  domains: NABETDomain[],
  parameters: NABETParameter[],
  evidenceList: NABETEvidence[]
): string {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const primaryNavy: [number, number, number] = [23, 59, 112]; // #173B70
  const secondaryBlue: [number, number, number] = [53, 106, 230]; // #356AE6
  const textDark: [number, number, number] = [32, 41, 56]; // #202938
  const textMuted: [number, number, number] = [100, 116, 139]; // #64748B

  // Helper for footer on every page
  const addFooter = (pageNum: number, totalPagesPlaceholder?: string) => {
    const pageHeight = doc.internal.pageSize.getHeight();
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.text(
      `INFiSPARK SCHOOL ERP • NABET Accreditation Standard for Quality School Governance (${NABET_EDITION})`,
      14,
      pageHeight - 8
    );
    doc.text(
      `Page ${pageNum}${totalPagesPlaceholder ? ` of ${totalPagesPlaceholder}` : ''}`,
      pageWidth - 25,
      pageHeight - 8
    );
  };

  // -------------------------------------------------------------
  // PAGE 1: HEADER & EXECUTIVE SUMMARY
  // -------------------------------------------------------------
  
  // Top Banner
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(SCHOOL_INFO.name.toUpperCase(), 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(220, 230, 250);
  doc.text(`${SCHOOL_INFO.address} | Affiliation: ${SCHOOL_INFO.affiliationNo}`, 14, 18);
  doc.text(`Official Portal: ${SCHOOL_INFO.website} | UDISE: ${SCHOOL_INFO.udiseCode}`, 14, 23);

  // Document Title Section
  let yPos = 38;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('NABET ACCREDITATION READINESS EXECUTIVE DOSSIER', 14, yPos);

  yPos += 5.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(
    `Standard for Quality School Governance – ${NABET_EDITION} • Cycle: ${NABET_TARGET_CYCLE}`,
    14,
    yPos
  );

  yPos += 8;
  // Summary KPI Cards Box
  doc.setFillColor(245, 247, 252);
  doc.setDrawColor(220, 226, 240);
  doc.roundedRect(14, yPos, pageWidth - 28, 26, 3, 3, 'FD');

  const totalParams = parameters.length;
  const fullyCompliant = parameters.filter(p => p.complianceStatus === 'Fully Compliant').length;
  const substantial = parameters.filter(p => p.complianceStatus === 'Substantially Compliant').length;
  const inProgress = parameters.filter(p => p.complianceStatus === 'In Progress' || p.complianceStatus === 'Partially Compliant').length;
  const verifiedDocs = evidenceList.filter(e => e.verificationStatus === 'Verified').length;
  const avgScore = Math.round(domains.reduce((acc, d) => acc + d.complianceScore, 0) / domains.length);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text(`${avgScore}%`, 25, yPos + 10);
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('READINESS SCORE', 25, yPos + 16);
  doc.setTextColor(16, 120, 70);
  doc.text('Level 4 (Dynamic)', 25, yPos + 21);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text(`${totalParams}`, 72, yPos + 10);
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('TOTAL PARAMETERS', 72, yPos + 16);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('14 NABET Standards', 72, yPos + 21);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(16, 120, 70);
  doc.text(`${fullyCompliant + substantial}`, 120, yPos + 10);
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('COMPLIANT CLAUSES', 120, yPos + 16);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`${inProgress} in progress`, 120, yPos + 21);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(secondaryBlue[0], secondaryBlue[1], secondaryBlue[2]);
  doc.text(`${verifiedDocs}`, 165, yPos + 10);
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('VERIFIED EVIDENCE', 165, yPos + 16);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Digitally Stamped', 165, yPos + 21);

  yPos += 32;

  // Domain Breakdown Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('1. THREE OFFICIAL NABET ASSESSMENT DOMAINS', 14, yPos);

  const domainRows = domains.map(d => [
    `Domain ${d.domainNumber}`,
    d.name,
    d.standardsRange,
    `${d.parametersCount} Params`,
    `${d.complianceScore}%`,
    d.maturityLevel,
    `${d.verifiedEvidenceCount} Docs`
  ]);

  autoTable(doc, {
    startY: yPos + 3,
    head: [['Domain', 'Domain Title', 'Standards Range', 'Parameters', 'Readiness', 'Maturity Level', 'Verified Docs']],
    body: domainRows,
    theme: 'grid',
    headStyles: {
      fillColor: primaryNavy,
      textColor: 255,
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'left'
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: textDark
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 20 },
      1: { cellWidth: 48 },
      2: { cellWidth: 30 },
      3: { cellWidth: 20 },
      4: { fontStyle: 'bold', cellWidth: 20 },
      5: { cellWidth: 28 },
      6: { cellWidth: 20 }
    },
    margin: { left: 14, right: 14 }
  });

  // -------------------------------------------------------------
  // PAGE 2 & 3: ALL 36 PARAMETERS MATRIX
  // -------------------------------------------------------------
  doc.addPage();
  addFooter(2);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('2. OFFICIAL 36 ASSESSMENT PARAMETERS COMPLIANCE MATRIX', 14, 16);

  const paramRows = parameters.map(p => [
    p.parameterNumber,
    p.title,
    `Std ${p.standardNumber}`,
    p.leadOwner.split('(')[0].trim(),
    `${p.selfAssessmentScore}/5`,
    p.complianceStatus,
    `${p.readinessPercentage}%`
  ]);

  autoTable(doc, {
    startY: 20,
    head: [['No.', 'Parameter Title & Requirement', 'Standard', 'Lead Process Owner', 'Score', 'Compliance Status', 'Readiness']],
    body: paramRows,
    theme: 'striped',
    headStyles: {
      fillColor: primaryNavy,
      textColor: 255,
      fontSize: 7.5,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 6.8,
      textColor: textDark,
      cellPadding: 1.5
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 16 },
      1: { cellWidth: 70 },
      2: { cellWidth: 16 },
      3: { cellWidth: 32 },
      4: { fontStyle: 'bold', halign: 'center', cellWidth: 14 },
      5: { fontStyle: 'bold', cellWidth: 28 },
      6: { halign: 'right', cellWidth: 16 }
    },
    margin: { left: 14, right: 14 },
    didDrawPage: (data) => {
      addFooter(data.pageNumber);
    }
  });

  // -------------------------------------------------------------
  // PAGE 4: MASTER EVIDENCE INDEX & STATUTORY ATTESTATION
  // -------------------------------------------------------------
  doc.addPage();
  const lastPageNum = doc.getNumberOfPages();
  addFooter(lastPageNum);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('3. NABET DESK REVIEW MASTER EVIDENCE INDEX (VERIFIED REPOSITORY)', 14, 16);

  const evidenceRows = evidenceList.slice(0, 15).map(e => [
    e.documentNo,
    e.title,
    `Param ${e.parameterId}`,
    e.category,
    e.uploadedBy.split('(')[0].trim(),
    e.verificationStatus,
    e.uploadDate
  ]);

  autoTable(doc, {
    startY: 20,
    head: [['Doc Code', 'Evidence Document Title', 'Clause', 'Category', 'Uploaded By', 'Verification', 'Date']],
    body: evidenceRows,
    theme: 'grid',
    headStyles: {
      fillColor: primaryNavy,
      textColor: 255,
      fontSize: 7.5,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 6.8,
      textColor: textDark,
      cellPadding: 1.5
    },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 28 },
      1: { cellWidth: 62 },
      2: { cellWidth: 18 },
      3: { cellWidth: 24 },
      4: { cellWidth: 24 },
      5: { fontStyle: 'bold', cellWidth: 20 },
      6: { cellWidth: 16 }
    },
    margin: { left: 14, right: 14 }
  });

  let endY = (doc as any).lastAutoTable.finalY + 8;

  // Advisory Disclaimer Box
  doc.setFillColor(254, 249, 235);
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(14, endY, pageWidth - 28, 16, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(146, 64, 14);
  doc.text('STATUTORY NABET READINESS ADVISORY NOTICE', 18, endY + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.text(
    'The INFiSPARK School Quality Management System records institutional compliance data for preparatory purposes.',
    18,
    endY + 9
  );
  doc.text(
    'This dossier does not itself grant accreditation or guarantee an accreditation outcome. Formal certification requires an on-site audit by QCI / NABET.',
    18,
    endY + 13
  );

  endY += 24;

  // Executive Signatures Block
  doc.setDrawColor(200, 210, 230);
  doc.line(18, endY + 12, 60, endY + 12);
  doc.line(78, endY + 12, 120, endY + 12);
  doc.line(140, endY + 12, 182, endY + 12);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Mrs. Shaheen Shaikh', 22, endY + 16);
  doc.text('Mr. Iqbal Virani', 84, endY + 16);
  doc.text('Shabnam Shaikh', 146, endY + 16);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Principal & Head of QA', 23, endY + 20);
  doc.text('Elected Authority & Compliance', 79, endY + 20);
  doc.text('Chair Person (SMC) & Trustee', 142, endY + 20);

  // Generate output blob and return blob URL
  const pdfBlob = doc.output('blob');
  return URL.createObjectURL(pdfBlob);
}

/**
 * Generates an official Executive Operational Dossier PDF for the Command Centre
 */
export function generateExecutiveDossierBlobUrl(): string {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const primaryNavy: [number, number, number] = [23, 59, 112];
  const textDark: [number, number, number] = [32, 41, 56];
  const textMuted: [number, number, number] = [100, 116, 139];

  // Header Banner
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(SCHOOL_INFO.name.toUpperCase(), 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(220, 230, 250);
  doc.text(`${SCHOOL_INFO.address} | CBSE Affiliation: ${SCHOOL_INFO.affiliationNo}`, 14, 18);
  doc.text(`Official Executive Dossier | Academic Session ${CURRENT_SESSION}`, 14, 23);

  let yPos = 38;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('EXECUTIVE OPERATIONAL SCORECARD & COMPLIANCE SUMMARY', 14, yPos);

  const kpiData = [
    ['Total Enrolled Students', '1,248 Students (Class Nursery to XII across 42 sections)', '+3.2% vs last term', 'Optimal Capacity'],
    ['Daily Student Attendance', '94.6% Average (1,181 Present today)', 'Rule 13 Compliant', 'Satisfactory'],
    ['Tuition Fee Collection', '₹82.4 Lakhs collected to date (81.5% target achieved)', '₹18.6L Outstanding', 'Reconciliation Active'],
    ['Active Faculty & Staff', '86 Verified (62 Teaching, 16 Support, 8 Admin)', '100% Biometric Verified', 'NCTE Compliant'],
    ['CBSE Statutory Compliance', '87% Aggregate (Fire NOC, Building Stability, Safe Water)', '4 renewals in progress', 'Action Underway'],
    ['NABET Accreditation Status', '85.2% Readiness (Fourth Edition, June 2025 – 36 Params)', '128 Verified Docs', 'Pre-Audit Active']
  ];

  autoTable(doc, {
    startY: yPos + 4,
    head: [['Operational KPI', 'Institutional Benchmark & Details', 'Trend / Variance', 'Administrative Status']],
    body: kpiData,
    theme: 'grid',
    headStyles: {
      fillColor: primaryNavy,
      textColor: 255,
      fontSize: 8.5,
      fontStyle: 'bold'
    },
    bodyStyles: {
      fontSize: 8,
      textColor: textDark
    },
    margin: { left: 14, right: 14 }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 12;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text('EXECUTIVE LEADERSHIP ATTESTATION', 14, finalY);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(
    `Certified as a true digital extract of the DRT Smart School ERP records for Academic Session ${CURRENT_SESSION}.`,
    14,
    finalY + 5
  );

  doc.setDrawColor(200, 210, 230);
  doc.line(18, finalY + 24, 60, finalY + 24);
  doc.line(140, finalY + 24, 182, finalY + 24);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text('Mrs. Shaheen Shaikh', 22, finalY + 28);
  doc.text('Shabnam Shaikh', 146, finalY + 28);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('Principal & Head of Institution', 22, finalY + 32);
  doc.text('Chair Person (SMC) & Trustee', 142, finalY + 32);

  const pdfBlob = doc.output('blob');
  return URL.createObjectURL(pdfBlob);
}

/**
 * Generates an official single-document evidence certificate / extract PDF
 */
export function generateEvidenceExtractBlobUrl(
  documentNo: string,
  title: string,
  category: string,
  paramId: number,
  uploadedBy: string,
  verificationStatus: string
): string {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const primaryNavy: [number, number, number] = [23, 59, 112];
  const textDark: [number, number, number] = [32, 41, 56];

  // Header Banner
  doc.setFillColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.rect(0, 0, pageWidth, 28, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(SCHOOL_INFO.name.toUpperCase(), 14, 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(220, 230, 250);
  doc.text(`${SCHOOL_INFO.address} | CBSE Affiliation: ${SCHOOL_INFO.affiliationNo}`, 14, 18);
  doc.text('Official NABET Quality Assurance Evidence Certificate', 14, 23);

  let yPos = 40;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryNavy[0], primaryNavy[1], primaryNavy[2]);
  doc.text(`EVIDENCE DOCUMENT: ${documentNo}`, 14, yPos);

  const details = [
    ['Document Title', title],
    ['Document Reference No.', documentNo],
    ['Evidence Category', category],
    ['Target Assessment Clause', `Parameter ${paramId} (NABET 4th Edition, June 2025)`],
    ['Uploaded & Cataloged By', uploadedBy],
    ['Verification Status', verificationStatus],
    ['Digital Audit Stamp', `Verified & Digitally Stamped on ${new Date().toLocaleDateString('en-GB')}`],
    ['Institutional Registry', 'DRT Central Accreditation & Compliance Repository']
  ];

  autoTable(doc, {
    startY: yPos + 4,
    body: details,
    theme: 'striped',
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 130 }
    },
    bodyStyles: {
      fontSize: 8.5,
      textColor: textDark,
      cellPadding: 3
    },
    margin: { left: 14, right: 14 }
  });

  const pdfBlob = doc.output('blob');
  return URL.createObjectURL(pdfBlob);
}
