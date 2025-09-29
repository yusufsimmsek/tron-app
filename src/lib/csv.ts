import { type Entry } from './storage';

export const generateCSV = (entries: Entry[]): string => {
  const headers = [
    'id',
    'email', 
    'ts',
    'ig_cb',
    'x_cb',
    'ig_tron',
    'x_tron',
    'tweet',
    'prize'
  ];

  const csvContent = [
    headers.join(','),
    ...entries.map(entry => [
      entry.id,
      entry.email,
      entry.ts,
      entry.tasks.ig_cb,
      entry.tasks.x_cb,
      entry.tasks.ig_tron,
      entry.tasks.x_tron,
      entry.tasks.tweet,
      entry.prize
    ].join(','))
  ].join('\n');

  return csvContent;
};

export const downloadCSV = (entries: Entry[], filename: string = 'tran-app-entries.csv'): void => {
  const csvContent = generateCSV(entries);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Minimal Excel export (.xls via HTML table) - opens in Excel without extra deps
export const downloadExcel = (entries: Entry[], filename: string = 'tran-app-entries.xls'): void => {
  const headers = [
    'id', 'email', 'ts', 'ig_cb', 'x_cb', 'ig_tron', 'x_tron', 'tweet', 'prize'
  ];

  const escapeHtml = (value: unknown) => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const rows = entries.map(e => [
    e.id,
    e.email,
    e.ts,
    e.tasks.ig_cb ? 'TRUE' : 'FALSE',
    e.tasks.x_cb ? 'TRUE' : 'FALSE',
    e.tasks.ig_tron ? 'TRUE' : 'FALSE',
    e.tasks.x_tron ? 'TRUE' : 'FALSE',
    e.tasks.tweet ? 'TRUE' : 'FALSE',
    e.prize
  ]);

  const tableHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><table border="1"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></body></html>`;

  const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
