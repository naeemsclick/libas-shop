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
    
    // Find all product links or titles
    const matches = html.match(/<a[^>]+href="([^"]*product[^"]*)"[^>]*>([^<]*)<\/a>/gi);
    if (matches) {
      console.log(`Found ${matches.length} product matches in ${url}`);
      matches.slice(0, 30).forEach(m => console.log(m));
    }

    // Look for product names mentioned in prompt
    const targets = ['Elite Jubba', 'Shirt Collar', 'Coffee', 'Ash', 'Deep Olive'];
    targets.forEach(t => {
      if (html.toLowerCase().includes(t.toLowerCase())) {
        console.log(`Found target term: "${t}" in ${url}`);
      }
    });
  }
}

main();
