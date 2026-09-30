export function getColorHex(colorName: string): string {
  if (!colorName) return '#1D2A23';
  const name = colorName.toLowerCase().trim();

  if (name.includes('black') || name.includes('কালো')) return '#111111';
  if (name.includes('white') || name.includes('সাদা')) return '#FFFFFF';
  if (name.includes('chocolate') || name.includes('চকলেট')) return '#5C3A21';
  if (name.includes('coffee') || name.includes('কফি')) return '#4A2E1B';
  if (name.includes('ash') || name.includes('grey') || name.includes('gray') || name.includes('অ্যাশ')) return '#8E8E93';
  if (name.includes('navy') || name.includes('নেভি')) return '#1B2A4A';
  if (name.includes('beige') || name.includes('বেইজ')) return '#E8D8C8';
  if (name.includes('orange') || name.includes('কমলা')) return '#E65100';
  if (name.includes('charcoal') || name.includes('চারকোল')) return '#36454F';
  if (name.includes('blue') || name.includes('নীল')) return '#2B4C7E';
  if (name.includes('maroon') || name.includes('মেরুন')) return '#800000';
  if (name.includes('olive') || name.includes('জলপাই')) return '#556B2F';
  if (name.includes('green') || name.includes('সবুজ')) return '#1D2A23';
  if (name.includes('red') || name.includes('লাল')) return '#B71C1C';
  if (name.includes('gold') || name.includes('গোল্ড')) return '#BE9134';

  return '#34443A'; // default muted green
}
