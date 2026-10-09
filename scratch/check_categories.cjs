const fs = require('fs');

const fileContent = fs.readFileSync('src/data/products.ts', 'utf8');

// Parse products by evaluating or extracting JSON
const match = fileContent.match(/export const productsData: Product\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.error('Could not find productsData');
  process.exit(1);
}

const products = JSON.parse(match[1]);

console.log(`Loaded ${products.length} products.`);

products.forEach(p => {
  const name = p.name.toLowerCase();
  if (p.categorySlug === 'shoes' && (name.includes('vest') || name.includes('coat') || name.includes('jacket') || name.includes('hoodie') || name.includes('cloth') || name.includes('koti') || name.includes('waistcoat') || name.includes('reversible'))) {
    console.log('MISMATCH SHOES:', p.id, p.slug, p.name, '--> Category:', p.category, 'CategorySlug:', p.categorySlug);
  }
  if (p.categorySlug !== 'shoes' && (name.includes('shoe') || name.includes('sandal') || name.includes('snooze') || name.includes('loafer'))) {
    console.log('MISMATCH OTHER TO SHOES:', p.id, p.slug, p.name, '--> Category:', p.category, 'CategorySlug:', p.categorySlug);
  }
});
