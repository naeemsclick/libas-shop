const fs = require('fs');

const urls = [
  'https://libas.shop/product/shirt-collar-jubba/',
  'https://libas.shop/product/elite-jubba-deep-olive-v-2/',
  'https://libas.shop/product/elite-jubba-ash-v-2/',
  'https://libas.shop/product/elite-jubba-coffee-v-2/'
];

async function fetchVariations(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const html = await res.text();

    // Extract attributes / variations form
    const formMatch = html.match(/<form[^>]*class="[^"]*variations_form[^"]*"[^>]*data-product_variations="([^"]+)"/i);
    let variations = [];
    if (formMatch) {
      const jsonStr = formMatch[1].replace(/&quot;/g, '"');
      try {
        variations = JSON.parse(jsonStr);
      } catch (e) {}
    }

    // Extract size options from select dropdown
    const sizeSelectMatch = html.match(/<select[^>]*id="pa_size"[^>]*>([\s\S]*?)<\/select>/i) ||
                            html.match(/<select[^>]*name="attribute_pa_size"[^>]*>([\s\S]*?)<\/select>/i) ||
                            html.match(/<select[^>]*data-attribute_name="attribute_pa_size"[^>]*>([\s\S]*?)<\/select>/i);
    const sizeOptions = [];
    if (sizeSelectMatch) {
      const matches = sizeSelectMatch[1].matchAll(/<option[^>]*>([^<]+)<\/option>/gi);
      for (const m of matches) {
        const text = m[1].trim();
        if (text && !text.toLowerCase().includes('choose') && !text.toLowerCase().includes('select')) {
          sizeOptions.push(text);
        }
      }
    }

    // Extract color options from select dropdown
    const colorSelectMatch = html.match(/<select[^>]*id="pa_color"[^>]*>([\s\S]*?)<\/select>/i) ||
                             html.match(/<select[^>]*name="attribute_pa_color"[^>]*>([\s\S]*?)<\/select>/i);
    const colorOptions = [];
    if (colorSelectMatch) {
      const matches = colorSelectMatch[1].matchAll(/<option[^>]*>([^<]+)<\/option>/gi);
      for (const m of matches) {
        const text = m[1].trim();
        if (text && !text.toLowerCase().includes('choose') && !text.toLowerCase().includes('select')) {
          colorOptions.push(text);
        }
      }
    }

    return {
      url,
      sizeOptions,
      colorOptions,
      variationsCount: variations.length
    };
  } catch (e) {
    console.error(url, e);
    return null;
  }
}

async function main() {
  for (const u of urls) {
    const data = await fetchVariations(u);
    console.log('--- URL:', u);
    console.log('  Sizes:', data.sizeOptions);
    console.log('  Colors:', data.colorOptions);
  }
}

main();
