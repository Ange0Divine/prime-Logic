# Performance Optimization Quick Checklist

## 🚨 CRITICAL - Do These First

### 1. Image Optimization (HIGHEST PRIORITY)
```bash
# Compress all images in assets/img/
# Target sizes:
# - Hero images: < 200KB
# - Card images: < 100KB  
# - Icons/logos: < 50KB
```

**Tools:**
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/

**Action:** Upload all images from `assets/img/` folder and replace with compressed versions

---

### 2. Add Image Dimensions (CRITICAL for CLS)
```html
<!-- BEFORE (causes layout shift) -->
<img src="image.jpg" alt="Description" loading="lazy">

<!-- AFTER (prevents layout shift) -->
<img src="image.jpg" alt="Description" width="800" height="600" loading="lazy">
```

**Action:** Add width and height attributes to EVERY image in all HTML files

---

### 3. Minify CSS & JavaScript
```bash
# CSS Minification
# Use: https://cssminifier.com/
# Input: assets/css/styles.css
# Output: assets/css/styles.min.css

# JavaScript Minification  
# Use: https://javascript-minifier.com/
# Input: assets/js/main.js
# Output: assets/js/main.min.js
```

**Action:** 
1. Minify both files
2. Update HTML references from `.css` to `.min.css` and `.js` to `.min.js`

---

### 4. Server Configuration
```apache
# Create/update .htaccess file in root directory
# Copy configuration from PERFORMANCE-OPTIMIZATION.md
# Enables: Gzip compression, Browser caching, Keep-Alive
```

**Action:** Add .htaccess file with caching and compression rules

---

## ⚡ QUICK WINS (30 minutes)

### 5. Convert Images to WebP
```html
<!-- Replace standard images with WebP + fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

**Tool:** https://squoosh.app/ (drag & drop conversion)

---

### 6. Add Resource Hints
```html
<!-- Add to <head> of all pages -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
<link rel="dns-prefetch" href="https://images.unsplash.com">
```

---

### 7. Defer Non-Critical Scripts
```html
<!-- BEFORE -->
<script src="assets/js/main.js"></script>

<!-- AFTER -->
<script src="assets/js/main.min.js" defer></script>
```

---

## 📊 Testing (After Changes)

### Run These Tests:
1. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Test homepage
   - Target: 90+ score

2. **GTmetrix**: https://gtmetrix.com/
   - Check waterfall
   - Verify caching

3. **Mobile Test**: Chrome DevTools
   - Device Mode
   - Throttle to "Fast 3G"
   - Check usability

---

## ✅ Verification Checklist

After completing optimizations, verify:

- [ ] All images compressed (< 200KB each)
- [ ] All images have width/height attributes
- [ ] CSS minified and referenced correctly
- [ ] JavaScript minified and referenced correctly
- [ ] .htaccess file added with caching rules
- [ ] PageSpeed score 90+ on mobile
- [ ] PageSpeed score 95+ on desktop
- [ ] No layout shifts (CLS < 0.1)
- [ ] LCP < 2.5 seconds
- [ ] All pages load in < 3 seconds on 3G

---

## 🎯 Core Web Vitals Targets

| Metric | Target | Status |
|--------|--------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ⚠️ Needs image optimization |
| **FID** (First Input Delay) | < 100ms | ✅ Likely passing |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ⚠️ Add image dimensions |

---

## 📁 Files to Optimize

### Images (Priority Order)
1. `assets/img/prime-logic-logo.png` - Compress
2. `assets/img/about.jpg` - Compress + add dimensions
3. `assets/img/1.png` - Compress + add dimensions
4. `assets/img/2.png` - Compress + add dimensions
5. All Unsplash images - Replace with compressed versions

### Code Files
1. `assets/css/styles.css` → `styles.min.css`
2. `assets/js/main.js` → `main.min.js`
3. `assets/js/hero-scroll.js` → `hero-scroll.min.js`

### HTML Files (Add image dimensions)
- index.html
- about.html
- services.html
- products.html
- insights.html
- blog-article-sample.html
- case-studies.html
- logic-audit.html
- contact.html

---

## 🚀 Expected Results

### Before Optimization
- Page Size: ~2-3 MB
- Load Time: 4-6 seconds
- PageSpeed Score: 60-70

### After Optimization
- Page Size: < 1 MB ✅
- Load Time: < 2 seconds ✅
- PageSpeed Score: 90-95 ✅

---

## 📞 Need Help?

**Prime Logic Support:**
- Email: info@primelogiclab.com
- Phone: +250 796 694 798
- WhatsApp: https://wa.me/250796694798

---

**Quick Start:** Focus on items 1-4 first. These will give you the biggest performance boost with minimal effort.

**Time Estimate:** 2-3 hours for critical optimizations
