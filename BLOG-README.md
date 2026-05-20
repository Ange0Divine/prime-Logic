# Prime Logic Blog / Insights Upgrade

## Overview
The Insights page has been upgraded into a full-featured, SEO-optimized blog platform designed for thought leadership and content marketing.

## Key Features

### 1. **Search & Filter Functionality**
- Real-time search across article titles and excerpts
- Category filtering (Strategy, Systems, Adoption, Visibility)
- Smooth animations and transitions
- "No results" state handling

### 2. **Article Card Layout**
- **Featured Card**: Large 2-column span for hero article
- **Standard Cards**: 3-column responsive grid
- Featured images with hover effects
- Category badges with color coding
- Read time estimates
- Author information
- "Read More" links

### 3. **SEO Optimizations**

#### Meta Tags
- Comprehensive title and description tags
- Open Graph tags for social sharing (Facebook)
- Twitter Card tags
- Keyword meta tags
- Author attribution

#### Schema.org Markup
- BlogPosting structured data
- Organization schema
- Article metadata (author, publisher, date)
- Helps Google understand content structure

#### Semantic HTML
- Proper heading hierarchy (H1 → H2 → H3)
- Article tags for blog posts
- Descriptive alt text for images
- ARIA labels for accessibility

#### Performance
- Lazy loading for images
- Optimized image sizes
- Minimal JavaScript
- CSS-based animations

### 4. **Content Structure**

#### Blog Index Page (`insights.html`)
- Hero section with page description
- Search bar with icon
- Category filter buttons
- Responsive article grid
- 6 sample articles included

#### Individual Article Page (`blog-article-sample.html`)
- Full article template
- Meta information (author, date, read time)
- Featured image
- Rich content formatting
- Callout boxes
- Article CTA section
- Tags and social sharing
- Related articles section

### 5. **Category System**
Four main categories aligned with Prime Logic's services:

1. **Strategy** (Blue) - Planning, frameworks, methodology
2. **Systems** (Blue) - Technology, platforms, integration
3. **Adoption** (Green) - Change management, training, capability
4. **Visibility** (Teal) - Marketing, campaigns, media

### 6. **Responsive Design**
- Desktop: 3-column grid with featured card
- Tablet: 2-column grid
- Mobile: Single column stack
- Touch-friendly filter buttons
- Optimized typography for all screens

## File Structure

```
Prime Logic/
├── insights.html              # Main blog index page
├── blog-article-sample.html   # Sample article template
├── assets/
│   ├── css/
│   │   └── styles.css        # Blog styles added at end
│   ├── js/
│   │   └── main.js           # Search/filter functionality
│   └── img/
│       ├── insights1.jpg     # Featured images
│       ├── insight2.jpg
│       ├── insights3.webp
│       ├── product.jpg
│       ├── product2.jpg
│       └── services.jpg
```

## Usage Instructions

### Adding New Articles

#### 1. Add to Blog Index (`insights.html`)

```html
<article class="blog-card reveal" data-category="strategy">
  <a href="your-article.html" class="blog-card__img-link">
    <div class="blog-card__img-wrap blog-card__img-wrap--sm">
      <img src="assets/img/your-image.jpg" alt="Article title" class="blog-card__img" loading="lazy">
    </div>
  </a>
  <div class="blog-card__body">
    <div class="blog-card__meta">
      <span class="blog-card__cat blog-card__cat--blue">Strategy</span>
      <span class="blog-card__read">8 min read</span>
    </div>
    <h3 class="blog-card__title blog-card__title--sm">
      <a href="your-article.html">Your Article Title</a>
    </h3>
    <p class="blog-card__excerpt blog-card__excerpt--sm">
      Your article excerpt goes here...
    </p>
    <div class="blog-card__footer">
      <div class="blog-card__author">
        <div class="blog-card__author-avatar">PL</div>
        <div>
          <div class="blog-card__author-name">Prime Logic Team</div>
        </div>
      </div>
      <a href="your-article.html" class="blog-card__read-btn">Read More →</a>
    </div>
  </div>
</article>
```

#### 2. Create Article Page

Copy `blog-article-sample.html` and customize:
- Update title, meta tags, and Open Graph tags
- Change featured image
- Update article content
- Modify Schema.org structured data
- Update related articles section

### Category Colors

Use these CSS classes for category badges:

- `blog-card__cat--blue` - Strategy & Systems
- `blog-card__cat--green` - Adoption
- `blog-card__cat--teal` - Visibility

### Featured Article

To make an article featured (large card):
```html
<article class="blog-card blog-card--featured reveal" data-category="strategy">
  <!-- Use blog-card__img-wrap without --sm modifier -->
  <div class="blog-card__img-wrap">
    <!-- Larger image -->
  </div>
  <!-- Rest of content -->
</article>
```

## SEO Best Practices

### 1. **Title Tags**
- Keep under 60 characters
- Include primary keyword
- Format: "Article Title — PRIME LOGIC LTD"

### 2. **Meta Descriptions**
- 150-160 characters
- Include call-to-action
- Summarize article value

### 3. **Headings**
- One H1 per page (article title)
- Use H2 for main sections
- Use H3 for subsections
- Maintain logical hierarchy

### 4. **Images**
- Use descriptive file names
- Add alt text for all images
- Optimize file size (under 200KB)
- Use WebP format when possible

### 5. **Internal Linking**
- Link to related articles
- Link to service pages
- Use descriptive anchor text
- Include CTAs to Logic Audit

### 6. **Content Length**
- Aim for 1,500+ words for pillar content
- 800-1,200 words for standard articles
- Include actionable insights
- Use bullet points and lists

### 7. **URL Structure**
- Use descriptive slugs
- Keep URLs short and readable
- Use hyphens, not underscores
- Example: `logic-audit-framework.html`

## Customization Options

### Colors
Update category colors in `styles.css`:
```css
.blog-card__cat--blue {
  background: rgba(26,43,122,.08);
  color: var(--prime-blue);
}
```

### Grid Layout
Adjust columns in `styles.css`:
```css
.blog-grid {
  grid-template-columns: repeat(3, 1fr); /* Change number */
}
```

### Search Behavior
Modify search logic in `main.js`:
```javascript
var matchesSearch = currentSearch === '' || searchText.includes(currentSearch);
```

## Performance Tips

1. **Image Optimization**
   - Compress images before upload
   - Use appropriate dimensions
   - Enable lazy loading

2. **Caching**
   - Set browser cache headers
   - Use CDN for assets
   - Enable gzip compression

3. **Minification**
   - Minify CSS and JavaScript for production
   - Combine files where possible

## Analytics Integration

Add Google Analytics or similar:
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-ID');
</script>
```

## Social Sharing

Update Open Graph images:
```html
<meta property="og:image" content="https://yourdomain.com/assets/img/article-image.jpg">
```

## Maintenance

### Regular Tasks
- Add new articles monthly
- Update existing content quarterly
- Check broken links
- Monitor search performance
- Review analytics data

### Content Calendar
Plan articles around:
- Service offerings
- Client case studies
- Industry trends
- Seasonal topics
- FAQ responses

## Support

For questions or customization needs:
- Email: info@primelogiclab.com
- Phone: +250 796 694 798
- WhatsApp: https://wa.me/250796694798

---

**Version:** 1.0  
**Last Updated:** January 2025  
**Maintained by:** Prime Logic LTD
