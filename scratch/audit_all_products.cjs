const fs = require('fs');

const fileContent = fs.readFileSync('src/data/products.ts', 'utf8');
const match = fileContent.match(/export const productsData: Product\[\] = (\[[\s\S]*\]);/);
const products = JSON.parse(match[1]);

console.log('Auditing all 106 products:');
products.forEach((p, idx) => {
  console.log(`[${idx+1}] ID: ${p.id} | Slug: ${p.slug} | Name: ${p.name} | Cat: ${p.category} | CatSlug: ${p.categorySlug}`);
});
