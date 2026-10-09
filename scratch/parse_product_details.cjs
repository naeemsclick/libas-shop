const fs = require('fs');
const path = require('path');

const productUrls = [
  'https://libas.shop/product/shirt-collar-jubba/',
  'https://libas.shop/product/elite-jubba-deep-olive-v-2/',
  'https://libas.shop/product/elite-jubba-ash-v-2/',
  'https://libas.shop/product/elite-jubba-coffee-v-2/'
];

async function parseProduct(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    
    // Title
    const titleMatch = html.match(/<h1[^>]*class="[^"]*product_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i) ||
                       html.match(/<title>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').replace('- Libas Shop', '').trim() : '';

    // Prices
    const priceMatch = html.match(/<p[^>]*class="[^"]*price[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    const priceHtml = priceMatch ? priceMatch[1] : '';
    
    // Extract numbers with ৳ or tk or bdt
    const delMatch = priceHtml.match(/<del[^>]*>([\s\S]*?)<\/del>/i);
    const insMatch = priceHtml.match(/<ins[^>]*>([\s\S]*?)<\/ins>/i);
    
    const regularPriceStr = delMatch ? delMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    const salePriceStr = insMatch ? insMatch[1].replace(/<[^>]+>/g, '').trim() : priceHtml.replace(/<[^>]+>/g, '').trim();

    // Clean numeric prices
    const regularPrice = parseInt(regularPriceStr.replace(/[^\d]/g, ''), 10) || 0;
    const salePrice = parseInt(salePriceStr.replace(/[^\d]/g, ''), 10) || 0;

    // Images
    const imgMatches = [...html.matchAll(/(https:\/\/libas\.shop\/wp-content\/uploads\/[^"\s\?]+\.(?:jpg|jpeg|png|webp))/gi)];
    const images = [...new Set(imgMatches.map(m => m[1]))].filter(img => !img.includes('logo') && !img.includes('814-x-400') && !img.includes('icon'));

    // Og image
    const ogImg = html.match(/<meta property="og:image" content="([^"]+)"/i);
    if (ogImg && ogImg[1] && !images.includes(ogImg[1])) {
      images.unshift(ogImg[1]);
    }

    // Description
    const descMatch = html.match(/<div[^>]*class="[^"]*woocommerce-product-details__short-description[^"]*"[^>]*>([\s\S]*?)<\/div>/i) ||
                      html.match(/<div[^>]*id="tab-description"[^>]*>([\s\S]*?)<\/div>/i);
    let description = descMatch ? descMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';

    // Stock
    const stockMatch = html.match(/class="[^"]*in-stock[^"]*"/i);
    const inStock = !!stockMatch;

    return {
      url,
      title,
      regularPrice: regularPrice || salePrice,
      price: salePrice || regularPrice,
      discount: regularPrice && salePrice && regularPrice > salePrice ? Math.round(((regularPrice - salePrice) / regularPrice) * 100) : 0,
      images,
      description,
      inStock
    };
  } catch (err) {
    console.error('Error parsing product:', url, err);
    return null;
  }
}

async function main() {
  const results = [];
  for (const url of productUrls) {
    console.log('Parsing:', url);
    const data = await parseProduct(url);
    if (data) results.push(data);
  }
  fs.writeFileSync('scratch/jubba_products_parsed.json', JSON.stringify(results, null, 2));
  console.log('Successfully saved to scratch/jubba_products_parsed.json');
}

main();
