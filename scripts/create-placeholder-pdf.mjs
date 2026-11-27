import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const content = [
  'BT /F1 26 Tf 72 760 Td (CV PLACEHOLDER) Tj ET',
  'BT /F2 12 Tf 72 720 Td (This document is a placeholder, not a CV.) Tj ET',
  'BT /F2 12 Tf 72 690 Td (Replace it with your verified PDF before publishing.) Tj ET',
  'BT /F2 11 Tf 72 650 Td (File location: public/assets/documents/cv.pdf) Tj ET',
  'BT /F2 11 Tf 72 625 Td (Update the cvUrl value in src/data/site.ts.) Tj ET',
  'BT /F1 14 Tf 72 560 Td (No qualifications or experience are claimed here.) Tj ET',
].join('\n');

const objects = [
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
  `<< /Length ${Buffer.byteLength(content, 'latin1')} >>\nstream\n${content}\nendstream`,
];

let pdf = '%PDF-1.4\n';
const offsets = [];

objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf, 'latin1'));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});

const xrefOffset = Buffer.byteLength(pdf, 'latin1');
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += '0000000000 65535 f \n';
offsets.forEach((offset) => {
  pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
});
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

const target = resolve('public/assets/documents/cv-placeholder.pdf');
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, pdf, 'latin1');
console.log(`Created ${target}`);
