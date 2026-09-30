import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scratchProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '../scratch_products.json'), 'utf8'));

const code = `// Cloudflare Pages Middleware for Dynamic Social Media Open Graph (OG) Meta Tags
const PRODUCTS = ${JSON.stringify(scratchProducts)};

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Serve static assets directly
  const response = await env.ASSETS.fetch(request);

  if (url.pathname.includes('.') && !url.pathname.endsWith('.html')) {
    return response;
  }

  const hostUrl = \`\${url.protocol}//\${url.host}\${url.pathname}\`;
  const hostDomain = \`\${url.protocol}//\${url.host}\`;
  const path = url.pathname;

  let product = null;
  if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '').split('/')[0].split('?')[0];
    product = PRODUCTS.find(p => p.slug === slug || p.id === slug);
  }

  const titleText = product ? \`\${product.name} | LIBAS Shop\` : 'LIBAS Shop | YOUR CHOICE OUR PROMISE';
  const descText = product 
    ? \`Price: ৳\${product.price.toLocaleString('en-BD')}. Discover \${product.name} on LIBAS Shop - YOUR CHOICE OUR PROMISE.\`
    : 'Discover modern Bangladeshi fashion, Jubba collections, Abayas, Perfumes, Watches, Shoes, and Sunnah essentials. Fast delivery across Bangladesh!';
  const imageText = product ? product.image : \`\${hostDomain}/images/og-share-banner.jpg\`;

  const rewriter = new HTMLRewriter()
    .on('title', {
      element(el) {
        el.setInnerContent(titleText);
      }
    })
    .on('meta[name="description"]', {
      element(el) {
        el.setAttribute('content', descText);
      }
    })
    .on('meta[property="og:title"]', {
      element(el) {
        el.setAttribute('content', titleText);
      }
    })
    .on('meta[property="og:description"]', {
      element(el) {
        el.setAttribute('content', descText);
      }
    })
    .on('meta[property="og:image"]', {
      element(el) {
        el.setAttribute('content', imageText);
      }
    })
    .on('meta[property="og:image:secure_url"]', {
      element(el) {
        el.setAttribute('content', imageText);
      }
    })
    .on('meta[property="og:url"]', {
      element(el) {
        el.setAttribute('content', hostUrl);
      }
    })
    .on('meta[name="twitter:title"]', {
      element(el) {
        el.setAttribute('content', titleText);
      }
    })
    .on('meta[name="twitter:description"]', {
      element(el) {
        el.setAttribute('content', descText);
      }
    })
    .on('meta[name="twitter:image"]', {
      element(el) {
        el.setAttribute('content', imageText);
      }
    });

  return rewriter.transform(response);
}
`;

const functionsDir = path.join(__dirname, '../functions');
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir);
}

fs.writeFileSync(path.join(functionsDir, '_middleware.js'), code);
console.log('Successfully generated functions/_middleware.js with', scratchProducts.length, 'products');
