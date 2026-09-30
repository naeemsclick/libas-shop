import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scratchProducts = JSON.parse(fs.readFileSync(path.join(__dirname, '../scratch_products.json'), 'utf8'));

// Extract blogs mapping
const blogsContent = fs.readFileSync(path.join(__dirname, '../src/data/blogs.ts'), 'utf8');
const blogsMatch = blogsContent.match(/export const blogsData: BlogPost\[\] = (\[[\s\S]*?\]);/);
let blogsData = [];
if (blogsMatch) {
  blogsData = eval(blogsMatch[1]).map(b => ({
    slug: b.slug,
    title: b.title,
    excerpt: b.excerpt || b.excerptBn || '',
    image: b.image
  }));
}

// Extract categories mapping
const categoriesContent = fs.readFileSync(path.join(__dirname, '../src/data/categories.ts'), 'utf8');
const categoriesMatch = categoriesContent.match(/export const categoriesData: Category\[\] = (\[[\s\S]*?\]);/);
let categoriesData = [];
if (categoriesMatch) {
  categoriesData = eval(categoriesMatch[1]).map(c => ({
    slug: c.slug,
    name: c.name,
    description: c.description || '',
    image: c.image
  }));
}

const code = `// Cloudflare Pages Middleware for Dynamic Social Media Open Graph (OG) Meta Tags
const PRODUCTS = ${JSON.stringify(scratchProducts)};
const BLOGS = ${JSON.stringify(blogsData)};
const CATEGORIES = ${JSON.stringify(categoriesData)};

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Serve static assets directly
  const response = await env.ASSETS.fetch(request);

  if (url.pathname.includes('.') && !url.pathname.endsWith('.html')) {
    return response;
  }

  // Dynamic host determination (works on ANY domain - libas-shop.pages.dev, libas.shop, or custom domain)
  const hostHeader = request.headers.get('host') || url.host;
  const hostProtocol = request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
  const hostDomain = \`\${hostProtocol}://\${hostHeader}\`;
  const hostUrl = \`\${hostDomain}\${url.pathname}\`;
  const path = url.pathname;

  let pageTitle = 'LIBAS Shop | YOUR CHOICE OUR PROMISE';
  let pageDesc = 'Discover modern Bangladeshi fashion, Jubba collections, Abayas, Perfumes, Watches, Shoes, and Sunnah essentials. Fast delivery across Bangladesh!';
  let pageImage = \`\${hostDomain}/images/og-share-banner.jpg\`;

  if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '').split('/')[0].split('?')[0];
    const product = PRODUCTS.find(p => p.slug === slug || p.id === slug);
    if (product) {
      pageTitle = \`\${product.name} | LIBAS Shop\`;
      pageDesc = \`Price: ৳\${product.price.toLocaleString('en-BD')}. Discover \${product.name} on LIBAS Shop - YOUR CHOICE OUR PROMISE.\`;
      pageImage = product.image.startsWith('http') ? product.image : \`\${hostDomain}\${product.image}\`;
    }
  } else if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '').split('/')[0].split('?')[0];
    const blog = BLOGS.find(b => b.slug === slug);
    if (blog) {
      pageTitle = \`\${blog.title} | LIBAS Shop Blog\`;
      pageDesc = blog.excerpt || pageDesc;
      if (blog.image) {
        pageImage = blog.image.startsWith('http') ? blog.image : \`\${hostDomain}\${blog.image}\`;
      }
    }
  } else if (path.startsWith('/category/')) {
    const slug = path.replace('/category/', '').split('/')[0].split('?')[0];
    const cat = CATEGORIES.find(c => c.slug === slug);
    if (cat) {
      pageTitle = \`\${cat.name} Collection | LIBAS Shop\`;
      pageDesc = cat.description || pageDesc;
      if (cat.image) {
        pageImage = cat.image.startsWith('http') ? cat.image : \`\${hostDomain}\${cat.image}\`;
      }
    }
  }

  const rewriter = new HTMLRewriter()
    .on('title', {
      element(el) {
        el.setInnerContent(pageTitle);
      }
    })
    .on('meta[name="description"]', {
      element(el) {
        el.setAttribute('content', pageDesc);
      }
    })
    .on('meta[property="og:title"]', {
      element(el) {
        el.setAttribute('content', pageTitle);
      }
    })
    .on('meta[property="og:description"]', {
      element(el) {
        el.setAttribute('content', pageDesc);
      }
    })
    .on('meta[property="og:image"]', {
      element(el) {
        el.setAttribute('content', pageImage);
      }
    })
    .on('meta[property="og:image:secure_url"]', {
      element(el) {
        el.setAttribute('content', pageImage);
      }
    })
    .on('meta[property="og:url"]', {
      element(el) {
        el.setAttribute('content', hostUrl);
      }
    })
    .on('meta[name="twitter:title"]', {
      element(el) {
        el.setAttribute('content', pageTitle);
      }
    })
    .on('meta[name="twitter:description"]', {
      element(el) {
        el.setAttribute('content', pageDesc);
      }
    })
    .on('meta[name="twitter:image"]', {
      element(el) {
        el.setAttribute('content', pageImage);
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
console.log('Successfully generated functions/_middleware.js for Products, Blogs, Categories & Default Fallback');
