import { PRDDocument } from '../types/prd';

export function exportAsMarkdown(prd: PRDDocument): void {
  const content = formatPRDToMarkdown(prd);
  downloadBlob(content, `${sanitizeFilename(prd.title)}_PRD.md`, 'text/markdown');
}

export function exportAsJSON(prd: PRDDocument): void {
  const content = JSON.stringify(prd, null, 2);
  downloadBlob(content, `${sanitizeFilename(prd.title)}_PRD.json`, 'application/json');
}

export function exportAsText(prd: PRDDocument): void {
  const content = formatPRDToText(prd);
  downloadBlob(content, `${sanitizeFilename(prd.title)}_PRD.txt`, 'text/plain');
}

export function exportAsPDF(prd: PRDDocument): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const sectionsHTML = prd.sections.map(sec => `
    <div class="section">
      <h2>${sec.title}</h2>
      <pre>${escapeHTML(sec.content)}</pre>
    </div>
  `).join('');

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${escapeHTML(prd.title)} - Product Requirements Document</title>
        <style>
          body { font-family: 'Inter', sans-serif; padding: 40px; color: #0F172A; max-width: 800px; margin: 0 auto; line-height: 1.6; }
          h1 { color: #5B4BFF; font-size: 24px; border-bottom: 2px solid #E2E8F0; padding-bottom: 12px; }
          .meta { font-size: 13px; color: #64748B; margin-bottom: 30px; }
          .badge { background: #EEF0FF; color: #5B4BFF; padding: 4px 8px; border-radius: 4px; font-weight: 600; font-size: 12px; margin-right: 6px; }
          .section { margin-bottom: 32px; page-break-inside: avoid; }
          h2 { font-size: 18px; color: #1E293B; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px; margin-bottom: 12px; }
          pre { background: #F8FAFC; padding: 16px; border-radius: 8px; border: 1px solid #E2E8F0; white-space: pre-wrap; font-family: inherit; font-size: 13px; color: #334155; }
        </style>
      </head>
      <body>
        <h1>${escapeHTML(prd.title)}</h1>
        <div class="meta">
          <span>Platform: <strong>${escapeHTML(prd.platformName)}</strong></span> | 
          <span>Created: <strong>${escapeHTML(prd.createdAt)}</strong></span>
          <br/><br/>
          ${prd.techTags.map(t => `<span class="badge">${escapeHTML(t)}</span>`).join('')}
        </div>
        ${sectionsHTML}
        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}

export function exportPRDDocument(prd: PRDDocument, format: 'markdown' | 'pdf' | 'json' | 'txt' = 'markdown'): void {
  if (format === 'pdf') exportAsPDF(prd);
  else if (format === 'json') exportAsJSON(prd);
  else if (format === 'txt') exportAsText(prd);
  else exportAsMarkdown(prd);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

function formatPRDToMarkdown(prd: PRDDocument): string {
  let md = `# ${prd.title}\n\n`;
  md += `**Platform**: ${prd.platformName}\n`;
  md += `**Created Date**: ${prd.createdAt}\n`;
  md += `**Tech Stack & Presets**: ${prd.techTags.join(', ')}\n\n`;
  md += `---\n\n`;

  prd.sections.forEach(sec => {
    md += `## ${sec.title}\n\n`;
    md += `${sec.content}\n\n`;
    md += `---\n\n`;
  });

  return md;
}

function formatPRDToText(prd: PRDDocument): string {
  let txt = `===================================================\n`;
  txt += `${prd.title.toUpperCase()} - PRODUCT REQUIREMENTS DOCUMENT\n`;
  txt += `===================================================\n\n`;
  txt += `Platform: ${prd.platformName}\n`;
  txt += `Date: ${prd.createdAt}\n`;
  txt += `Stack: ${prd.techTags.join(' | ')}\n\n`;

  prd.sections.forEach(sec => {
    txt += `---------------------------------------------------\n`;
    txt += `SECTION: ${sec.title.toUpperCase()}\n`;
    txt += `---------------------------------------------------\n`;
    txt += `${sec.content}\n\n`;
  });

  return txt;
}

function downloadBlob(content: string, filename: string, contentType: string): void {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

function escapeHTML(str: string): string {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
