const fs = require('fs');

async function fetchPage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const html = await res.text();
    console.log(`Fetched ${url}, status: ${res.status}, length: ${html.length}`);
    return html;
  } catch (err) {
    console.error('Error fetching:', err);
    return '';
  }
}

async function main() {
  const urls = [
    'https://libas.shop/product-category/all-product/jubba/',
    'https://libas.shop/product-category/jubba/',
    'https://libas.shop/?s=jubba&post_type=product'
  ];

  for (const url of urls) {
    console.log('--- FETCHING:', url);
    const html = await fetchPage(url);

    // Save html for analysis
    const filename = url.replace(/[^a-zA-Z0-9]/g, '_') + '.html';
    fs.writeFileSync(`scratch/${filename}`, html);
    
    // Find all product links
    const matches = html.match(/href="(https:\/\/libas\.shop\/product\/[^"]+)"/gi);
    if (matches) {
      const uniqueLinks = [...new Set(matches.map(m => m.replace(/^href="/, '').replace(/"$/, '')))];
      console.log(`Found ${uniqueLinks.length} unique product links in ${url}:`);
      uniqueLinks.forEach(l => console.log('  -', l));
    }
  }
}

main();
