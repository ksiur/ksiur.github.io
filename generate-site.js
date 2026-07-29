#!/usr/bin/env node
/**
 * 精选账号商城 · Patagonia 风格生成器
 * 风格：自然 · 大地色 · 大图hero · 极简排版 · 大量留白
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DIST_DIR = path.join(__dirname, 'dist');

function loadJSON(name) {
    const fp = path.join(DATA_DIR, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fixImg(url, base) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return base + url;
    return url;
}

function loadRootJSON(name) {
    const fp = path.join(__dirname, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}
const SEO = loadRootJSON('seo.json') || {};
const SEO_KEYWORDS = SEO.keywords || '';
const SEO_DESC = SEO.description || '';
const SITE_TITLE = SEO.title || '精选账号商城';
const SEO_TITLE_SUFFIX = SEO.titleSuffix || '';
const SEO_AUTHOR = SEO.author || SITE_TITLE;
const SEO_ROBOTS = SEO.robots || 'index, follow';
const SEO_CANONICAL = SEO.canonical || '';
const SEO_OG = SEO.og || {};
const SEO_TWITTER = SEO.twitter || {};
const SEO_JSON_LD = SEO.jsonLd || {};
const SEO_FAVICON = SEO.favicon || '';

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --white: #FFFFFF;
  --cream: #FAF8F5;
  --sand: #F0EBE3;
  --warm-gray: #E8E2D9;
  --stone: #C4BAA8;
  --earth: #8B7D6B;
  --forest: #2D5016;
  --forest-light: #4A7A2E;
  --slate: #3A3A3A;
  --charcoal: #1A1A1A;
  --text: #2B2B2B;
  --text-secondary: #6B6B6B;
  --text-muted: #999;
  --border: #E5DED4;
  --bg: var(--cream);
  --accent: var(--forest);
  --accent-hover: var(--forest-light);
  --max-w: 1320px;
  --radius: 4px;
  --radius-lg: 8px;
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--cream); color: var(--text); line-height: 1.7;
  min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased;
}

a { color: var(--accent); text-decoration: none; transition: color .3s var(--ease); }
a:hover { color: var(--accent-hover); }
img { max-width: 100%; height: auto; display: block; }
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 40px; }

/* ── Header ── */
.header {
  position: sticky; top: 0; z-index: 1000; height: 64px;
  background: var(--white); border-bottom: 1px solid var(--border);
  transition: box-shadow .3s var(--ease);
}
.header.scrolled { box-shadow: 0 2px 20px rgba(0,0,0,0.06); }
.header-inner {
  max-width: var(--max-w); margin: 0 auto; padding: 0 40px; height: 100%;
  display: flex; align-items: center; justify-content: space-between;
}
.logo-area { display: flex; align-items: center; gap: 12px; }
.logo-mark {
  height: 36px; border-radius: 6px; overflow: hidden;
  flex-shrink: 0;
}
.logo-mark img { height: 100%; width: auto; border-radius: 6px; display: block; }
.logo-text {
  font-family: 'Space Grotesk', sans-serif; font-size: 1.05rem;
  font-weight: 700; color: var(--charcoal); letter-spacing: -0.02em;
}
.logo-sub { font-size: .65rem; color: var(--text-muted); letter-spacing: .3px; }
.logo-sub a { color: var(--text-muted); }
.logo-sub a:hover { color: var(--accent); }
.header-actions { display: flex; align-items: center; gap: 16px; }
.header-badge {
  display: flex; align-items: center; gap: 6px;
  font-size: .72rem; color: var(--forest); font-weight: 600;
  letter-spacing: .5px; text-transform: uppercase;
}
.dot { width: 6px; height: 6px; border-radius: 50%; background: var(--forest); animation: blink 2s ease-in-out infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
.header-cta {
  padding: 8px 24px; border-radius: 2px; font-size: .78rem; font-weight: 700;
  background: var(--charcoal); color: var(--white); letter-spacing: .8px;
  text-transform: uppercase; transition: all .3s var(--ease);
}
.header-cta:hover { background: var(--forest); color: var(--white); transform: translateY(-1px); }

/* ── Hero — Patagonia-style full-bleed ── */
.hero {
  position: relative; min-height: 70vh; display: flex; align-items: center;
  justify-content: center; overflow: hidden;
  background: linear-gradient(165deg, #2D5016 0%, #1A3A0A 40%, #0F2206 100%);
}
.hero-bg {
  position: absolute; inset: 0; opacity: .15;
  background:
    radial-gradient(ellipse at 20% 50%, rgba(74,122,46,0.4), transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(139,125,107,0.3), transparent 50%);
}
.hero-content {
  position: relative; z-index: 1; text-align: center;
  max-width: 800px; padding: 80px 40px;
}
.hero-eyebrow {
  font-size: .75rem; font-weight: 700; letter-spacing: 3px;
  text-transform: uppercase; color: rgba(255,255,255,0.6); margin-bottom: 24px;
}
.hero h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(2.4rem, 6vw, 4.5rem); font-weight: 700;
  letter-spacing: -0.03em; line-height: 1.1; color: var(--white);
  margin-bottom: 24px;
}
.hero-desc {
  font-size: 1.1rem; color: rgba(255,255,255,0.7); max-width: 560px;
  margin: 0 auto 40px; font-weight: 300; line-height: 1.8;
}
.hero-stats {
  display: flex; justify-content: center; gap: 48px; flex-wrap: wrap;
}
.hero-stat { text-align: center; }
.hero-stat .num {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem; font-weight: 700; color: var(--white);
  display: block; letter-spacing: -0.02em;
}
.hero-stat .label {
  font-size: .7rem; letter-spacing: 2px; text-transform: uppercase;
  color: rgba(255,255,255,0.45); font-weight: 600;
}

/* ── Mission Strip (Patagonia-style) ── */
.mission-strip {
  background: var(--white); border-bottom: 1px solid var(--border);
  padding: 48px 0;
}
.mission-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 48px;
  max-width: var(--max-w); margin: 0 auto; padding: 0 40px;
  text-align: center;
}
.mission-item h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: .85rem; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--charcoal); margin-bottom: 8px;
}
.mission-item p {
  font-size: .85rem; color: var(--text-secondary); line-height: 1.7;
}

/* ── Filter ── */
.filter-section { padding: 48px 0 0; }
.section-header {
  text-align: center; margin-bottom: 40px;
}
.section-header h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700;
  color: var(--charcoal); letter-spacing: -0.02em; margin-bottom: 8px;
}
.section-header p {
  font-size: .9rem; color: var(--text-secondary);
}
.filter-bar {
  display: flex; flex-wrap: wrap; justify-content: center; gap: 6px;
  margin-bottom: 48px;
}
.filter-btn {
  padding: 10px 28px; cursor: pointer; font-size: .78rem; font-weight: 600;
  letter-spacing: 1px; text-transform: uppercase;
  transition: all .3s var(--ease);
  background: transparent; color: var(--text-secondary);
  border: 1.5px solid var(--border); border-radius: 2px;
  user-select: none;
}
.filter-btn:hover { color: var(--charcoal); border-color: var(--charcoal); }
.filter-btn.active {
  background: var(--charcoal); color: var(--white);
  border-color: var(--charcoal);
}

/* ── Products ── */
.products-section { padding: 0 0 80px; }
.products-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;
}
.product-card {
  position: relative; display: block; background: var(--white);
  border: 1px solid var(--border); border-radius: var(--radius);
  overflow: hidden; transition: all .4s var(--ease);
  cursor: pointer; text-decoration: none; color: inherit;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  border-color: transparent;
}
.card-img-wrap {
  position: relative; overflow: hidden; height: 220px; background: var(--sand);
}
.card-img-wrap img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform .6s var(--ease);
}
.product-card:hover .card-img-wrap img { transform: scale(1.05); }
.card-tag {
  position: absolute; top: 16px; left: 16px; z-index: 2;
  padding: 4px 12px; font-size: .65rem; font-weight: 700;
  letter-spacing: 1.5px; text-transform: uppercase;
  background: var(--charcoal); color: var(--white); border-radius: 2px;
}
.card-body { padding: 24px; }
.card-cat {
  font-size: .65rem; color: var(--earth); font-weight: 700;
  text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;
}
.card-title {
  font-size: .95rem; font-weight: 600; line-height: 1.6;
  margin-bottom: 16px; color: var(--charcoal);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; min-height: 3em;
}
.card-footer { display: flex; align-items: center; justify-content: space-between; }
.card-price {
  font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; font-weight: 700;
  color: var(--charcoal);
}
.card-price .from {
  font-size: .65rem; font-weight: 400; color: var(--text-muted);
  margin-right: 2px; font-family: 'Plus Jakarta Sans', sans-serif;
}
.card-cta {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--sand); display: flex; align-items: center;
  justify-content: center; color: var(--charcoal); font-size: .9rem;
  transition: all .3s var(--ease);
}
.product-card:hover .card-cta {
  background: var(--forest); color: var(--white);
}

/* ── Features (horizontal, Patagonia-style) ── */
.features-section {
  padding: 80px 0; background: var(--white);
  border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
}
.features-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px;
  max-width: var(--max-w); margin: 0 auto; padding: 0 40px;
}
.feature-item { text-align: center; }
.feature-icon {
  font-size: 2rem; margin-bottom: 16px; display: block;
}
.feature-item h3 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: .8rem; font-weight: 700; letter-spacing: 2px;
  text-transform: uppercase; color: var(--charcoal); margin-bottom: 8px;
}
.feature-item p {
  font-size: .82rem; color: var(--text-secondary); line-height: 1.7;
}

/* ── CTA Banner ── */
.cta-section { padding: 80px 0; }
.cta-banner {
  position: relative; overflow: hidden;
  background: linear-gradient(165deg, #2D5016 0%, #1A3A0A 100%);
  border-radius: var(--radius-lg); padding: 80px 40px;
  text-align: center;
}
.cta-banner h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.6rem, 3.5vw, 2.4rem); font-weight: 700;
  color: var(--white); margin-bottom: 12px; letter-spacing: -0.02em;
}
.cta-banner p {
  color: rgba(255,255,255,0.65); font-size: .95rem; margin-bottom: 32px;
}
.cta-btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 40px; border-radius: 2px;
  background: var(--white); color: var(--forest);
  font-size: .8rem; font-weight: 700; letter-spacing: 1.5px;
  text-transform: uppercase; transition: all .3s var(--ease);
}
.cta-btn:hover {
  background: var(--sand); color: var(--forest);
  transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

/* ── Footer ── */
.footer {
  background: var(--charcoal); color: rgba(255,255,255,0.5);
  text-align: center; padding: 48px 40px 40px;
}
.footer-links { margin-bottom: 16px; }
.footer-links a {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 20px; border: 1px solid rgba(255,255,255,0.15);
  border-radius: 2px; color: rgba(255,255,255,0.7);
  font-size: .78rem; font-weight: 600; letter-spacing: 1px;
  text-transform: uppercase; transition: all .3s;
}
.footer-links a:hover {
  border-color: rgba(255,255,255,0.4); color: var(--white);
}
.footer p { font-size: .72rem; line-height: 1.8; }
.footer a { color: rgba(255,255,255,0.5); }
.footer a:hover { color: var(--white); }

/* ── Animations ── */
.reveal {
  opacity: 0; transform: translateY(20px);
  transition: all .6s var(--ease);
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* ── Responsive ── */
@media (max-width: 768px) {
  .container { padding: 0 20px; }
  .header-inner { padding: 0 20px; }
  .header-badge { display: none; }
  .hero { min-height: 60vh; }
  .hero-content { padding: 60px 20px; }
  .hero h1 { font-size: 2rem; }
  .hero-desc { font-size: .95rem; }
  .hero-stats { gap: 32px; }
  .hero-stat .num { font-size: 1.5rem; }
  .mission-grid { grid-template-columns: 1fr; gap: 32px; padding: 0 20px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; padding: 0 20px; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .card-img-wrap { height: 160px; }
  .card-body { padding: 16px; }
  .card-title { font-size: .85rem; min-height: auto; }
  .card-price { font-size: 1rem; }
  .filter-bar { gap: 4px; }
  .filter-btn { padding: 8px 18px; font-size: .7rem; }
  .cta-banner { padding: 60px 24px; }
}
@media (max-width: 480px) {
  .products-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
  .card-img-wrap { height: 130px; }
  .card-body { padding: 12px; }
  .card-tag { font-size: .58rem; padding: 3px 8px; top: 10px; left: 10px; }
  .card-cta { width: 28px; height: 28px; font-size: .75rem; }
  .hero-stats { gap: 24px; }
  .hero-stat .num { font-size: 1.3rem; }
  .logo-sub { display: none; }
  .features-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
}
`;

const JS = `
function filterCategory(id, el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.product-card').forEach((c, i) => {
    if (id === 'all' || c.dataset.cat == id) {
      c.style.display = '';
      c.style.opacity = '0'; c.style.transform = 'translateY(16px)';
      setTimeout(() => { c.style.transition = 'all .4s cubic-bezier(0.25,0.46,0.45,0.94)'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * 50);
    } else { c.style.display = 'none'; }
  });
}
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
});
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
`;

function main() {
    const config = loadJSON('config.json') || {};
    const categories = loadJSON('categories.json') || [];
    const products = loadJSON('products.json') || [];
    const meta = loadJSON('meta.json') || {};

    if (!products.length) { console.error('❌ 没有商品数据'); process.exit(1); }

    const siteUrl = meta.siteUrl || process.env.SITE_URL;
    const siteName = SITE_TITLE;
    const GITHUB_PAGES_URL = process.env.GITHUB_PAGES_URL;

    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

    function shortCatName(name) {
        return name
            .replace(/谷歌美国电话\/?/i, '')
            .replace(/GoogleVoice\s*\/?\s*GV靓号/i, 'GV靓号')
            .replace(/谷歌邮箱\s*\/?\s*油管\s*\/?\s*Google\s*\/?\s*Gmail/i, '谷歌邮箱')
            .replace(/苹果id\s*\/?\s*Apple\s*id\s*\/?\s*AppStore/i, '苹果ID')
            .replace(/服务类/i, '服务类')
            .trim() || name;
    }

    const activeCats = categories.filter(c => products.some(p => p.category_id === c.id));
    const catBtns = activeCats
        .sort((a, b) => (b.sort || 0) - (a.sort || 0))
        .map(c => `<div class="filter-btn" onclick="filterCategory(${c.id}, this)">${esc(shortCatName(c.name))}</div>`)
        .join('\n            ');

    const cards = products.filter(p => p.active !== 0).sort((a, b) => (b.sort||0) - (a.sort||0)).map((p, i) => {
        const cat = categories.find(c => c.id === p.category_id);
        const catName = cat ? shortCatName(cat.name) : '';
        const img = p.image_url ? fixImg(p.image_url, siteUrl) : '';
        const variants = p.variants || [];
        const minPrice = variants.length ? Math.min(...variants.map(v => v.price)) : 0;
        const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
        const cleanTag = t => t.replace(/b[12]#[0-9a-fA-F]{3,6}/g, '').replace(/#[0-9a-fA-F]{3,6}$/g, '').replace(/\s+/g, ' ').trim();
        const tagLabel = cleanTag(tags[0] || '');

        return `
            <a class="product-card reveal" href="${siteUrl}/product?id=${p.id}" target="_blank" rel="noopener" data-cat="${p.category_id}">
                <div class="card-img-wrap">
                    ${img ? `<img src="${esc(img)}" alt="${esc(p.name)}" loading="lazy">` : ''}
                    ${tagLabel ? `<div class="card-tag">${esc(tagLabel)}</div>` : ''}
                </div>
                <div class="card-body">
                    <div class="card-cat">${esc(catName)}</div>
                    <div class="card-title">${esc(p.name)}</div>
                    <div class="card-footer">
                        <div class="card-price"><span class="from">起</span>¥${minPrice.toFixed(2)}</div>
                        <div class="card-cta">→</div>
                    </div>
                </div>
            </a>`;
    }).join('\n');

    const ogImage = products[0]?.image_url ? fixImg(products[0].image_url, siteUrl) : (meta.siteLogo ? fixImg(meta.siteLogo, siteUrl) : '');

    const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", "name": siteName, "description": SEO_DESC, "url": GITHUB_PAGES_URL, "potentialAction": { "@type": "SearchAction", "target": `${siteUrl}/product?id={search_term_string}`, "query-input": "required name=search_term_string" } };
    const itemListLd = { "@context": "https://schema.org", "@type": "ItemList", "itemListElement": products.filter(p => p.active !== 0).map((p, i) => ({ "@type": "ListItem", "position": i + 1, "item": { "@type": "Product", "name": p.name, "url": `${siteUrl}/product?id=${p.id}`, "image": p.image_url ? fixImg(p.image_url, siteUrl) : '', "offers": { "@type": "Offer", "price": p.variants?.length ? Math.min(...p.variants.map(v => v.price)) : 0, "priceCurrency": "CNY" } } })) };

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(siteName)}${SEO_TITLE_SUFFIX ? ' - ' + esc(SEO_TITLE_SUFFIX) : ''}</title>
    <meta name="description" content="${esc(SEO_DESC)}">
    <meta name="keywords" content="${esc(SEO_KEYWORDS)}">
    <meta name="author" content="${esc(SEO_AUTHOR)}">
    <meta name="robots" content="${esc(SEO_ROBOTS)}">
    <meta name="googlebot" content="${esc(SEO_ROBOTS)}">
    ${SEO_CANONICAL ? `<link rel="canonical" href="${esc(SEO_CANONICAL)}">` : ''}
    <meta property="og:type" content="${esc(SEO_OG.type || 'website')}">
    <meta property="og:url" content="${esc(SEO_OG.url || GITHUB_PAGES_URL)}">
    <meta property="og:title" content="${esc(siteName)}">
    <meta property="og:description" content="${esc(SEO_DESC)}">
    ${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : ''}
    <meta property="og:locale" content="${esc(SEO_OG.locale || 'zh_CN')}">
    <meta property="og:site_name" content="${esc(SEO_OG.siteName || siteName)}">
    <meta name="twitter:card" content="${esc(SEO_TWITTER.card || 'summary_large_image')}">
    <meta name="twitter:title" content="${esc(siteName)}">
    <meta name="twitter:description" content="${esc(SEO_DESC)}">
    ${ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}">` : ''}
    <script type="application/ld+json">${JSON.stringify({...SEO_JSON_LD, ...jsonLd})}</script>
    <script type="application/ld+json">${JSON.stringify(itemListLd)}</script>
    ${SEO_FAVICON ? `<link rel="icon" href="${esc(SEO_FAVICON)}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>${CSS}</style>
</head>
<body>

<header class="header" id="header">
    <div class="header-inner">
        <div class="logo-area">
            <div class="logo-mark">
                <img src="${esc(fixImg(meta.siteLogo || '', siteUrl))}" alt="${esc(siteName)}">
            </div>
            <div class="logo-text-group">
                <div class="logo-text">${esc(siteName)}</div>
                <div class="logo-sub"><a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></div>
            </div>
        </div>
        <div class="header-actions">
            <div class="header-badge"><div class="dot"></div>自动发货</div>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="header-cta">进入商城</a>
        </div>
    </div>
</header>

<section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-content">
        <div class="hero-eyebrow reveal">精选数字账号资源</div>
        <h1 class="reveal">源头直供<br>值得信赖</h1>
        <p class="hero-desc reveal">高品质 Gmail 邮箱、Google Voice 美国号码、Apple ID 及更多数字账号，自动发货，秒级到账</p>
        <div class="hero-stats reveal">
            <div class="hero-stat"><span class="num">${categories.length}</span><span class="label">品类</span></div>
            <div class="hero-stat"><span class="num">${products.filter(p=>p.active!==0).length}</span><span class="label">商品</span></div>
            <div class="hero-stat"><span class="num">${products.reduce((s,p) => s + (p.variants?.length||0), 0)}</span><span class="label">规格</span></div>
        </div>
    </div>
</section>

<section class="mission-strip">
    <div class="mission-grid">
        <div class="mission-item reveal">
            <h3>即时到账</h3>
            <p>付款后系统自动发货，无需排队等待，全天候 24 小时服务</p>
        </div>
        <div class="mission-item reveal">
            <h3>品质保障</h3>
            <p>所有账号均经过严格筛选与验证，质保期内首登异常免费更换</p>
        </div>
        <div class="mission-item reveal">
            <h3>源头价格</h3>
            <p>一手资源直接供应，无中间商环节，让利于每一位用户</p>
        </div>
    </div>
</section>

<section class="filter-section">
    <div class="container">
        <div class="section-header">
            <h2>全部商品</h2>
            <p>精选优质账号资源，满足您的多样化需求</p>
        </div>
        <div class="filter-bar">
            <div class="filter-btn active" onclick="filterCategory('all', this)">全部</div>
            ${catBtns}
        </div>
    </div>
</section>

<section class="products-section">
    <div class="container">
        <div class="products-grid">
            ${cards}
        </div>
    </div>
</section>

<section class="features-section">
    <div class="features-grid">
        <div class="feature-item reveal">
            <div class="feature-icon">⚡</div>
            <h3>即时发货</h3>
            <p>付款即发货，全程自动化处理，无需人工介入</p>
        </div>
        <div class="feature-item reveal">
            <div class="feature-icon">🛡️</div>
            <h3>品质保障</h3>
            <p>质保期内首登异常，免费更换，售后无忧</p>
        </div>
        <div class="feature-item reveal">
            <div class="feature-icon">💎</div>
            <h3>源头直供</h3>
            <p>一手资源，无中间环节，价格透明公正</p>
        </div>
        <div class="feature-item reveal">
            <div class="feature-icon">🎯</div>
            <h3>靓号可选</h3>
            <p>支持自选号码，按需匹配，精准满足需求</p>
        </div>
    </div>
</section>

<section class="cta-section">
    <div class="container">
        <div class="cta-banner reveal">
            <h2>找到适合你的账号了吗？</h2>
            <p>全场自动发货，安全可靠，质保无忧</p>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="cta-btn">前往商城选购</a>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-links"><a href="${siteUrl}" target="_blank" rel="noopener">进入商城</a></div>
        <p style="margin-bottom:6px">© ${new Date().getFullYear()} ${esc(siteName)} · 虚拟数字商品交易平台</p>
        <p><a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></p>
    </div>
</footer>

<script>${JS}</script>
</body>
</html>`;

    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
    console.log(`✅ dist/index.html (${(Buffer.byteLength(html)/1024).toFixed(1)}KB)`);
    console.log(`   商品: ${products.filter(p=>p.active!==0).length} 个`);
    console.log(`   分类: ${activeCats.length} 个`);
    console.log(`   风格: Patagonia 自然系 · 大地色 · 极简排版`);
    console.log(`   链接: 全部指向 ${siteUrl}/product?id=xxx`);
}

main();
