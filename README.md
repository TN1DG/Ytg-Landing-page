# YTG Landing Page

A professional, responsive landing page for YTG (Your Talent Grid) - a portfolio-first alternative to LinkedIn powered by AI. This landing page is designed to validate the concept by collecting waitlist signups from both job seekers and employers.

## 🎯 Project Overview

YTG aims to revolutionize professional networking by putting portfolios first. Instead of CV-heavy profiles, users showcase their actual work, which is then AI-ranked and made discoverable to employers who value real skills over keywords.

## ✨ Features

- **Modern SaaS Design**: Clean, minimalist aesthetic with professional typography
- **Fully Responsive**: Mobile-first design that works on all devices
- **Interactive Animations**: Smooth scroll animations and engaging micro-interactions
- **Portfolio Animation**: Hero section showcases the upload → AI transformation process
- **Waitlist Form**: Segmented signup for job seekers vs employers
- **Analytics Ready**: Google Analytics integration with conversion tracking
- **Performance Optimized**: Lazy loading, efficient CSS, and optimized assets

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Open** `index.html` in your browser
3. **No build process required** - it's ready to use!

## 📁 Project Structure

```
YTG landing Page/
├── index.html          # Main HTML structure
├── styles.css          # Complete CSS styling and responsive design
├── script.js           # Interactive functionality and animations
├── README.md           # This file
└── (images/)           # Optional: add your custom images here
```

## 🛠 Customization

### Colors
The CSS uses CSS custom properties for easy theming. Update these in `styles.css`:

```css
:root {
    --primary-color: #2563eb;    /* Main brand color */
    --accent-color: #0891b2;     /* Accent color */
    --gray-50: #f8fafc;          /* Light background */
    /* ... more colors */
}
```

### Content
Update the content directly in `index.html`:

- **Hero Section**: Update headlines, subheadings, and CTAs
- **How It Works**: Modify the 3-step process
- **Testimonials**: Replace with real customer quotes
- **Contact Info**: Update footer links

### Analytics
Replace the placeholder Google Analytics ID in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA_ID"></script>
<script>
    gtag('config', 'YOUR_GA_ID');
</script>
```

## 📱 Responsive Breakpoints

The design is mobile-first with these breakpoints:

- **Mobile**: < 480px
- **Tablet**: 480px - 768px  
- **Desktop**: 768px - 1024px
- **Large Desktop**: > 1024px

## 🎨 Design System

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold (700-800 weight)
- **Body**: Regular (400 weight)
- **Scale**: Modular scale from 0.75rem to 3.75rem

### Color Palette
- **Primary**: Blue (#2563eb)
- **Accent**: Teal (#0891b2)
- **Success**: Green (#059669)
- **Error**: Red (#dc2626)
- **Neutrals**: Gray scale from #f8fafc to #0f172a

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Scale**: 1x, 2x, 3x, 4x, 5x, 6x, 8x, 10x, 12x, 16x, 20x, 24x

## 🔧 Backend Integration

The landing page includes a mock waitlist form. To integrate with your backend:

### 1. Replace the Mock Function
In `script.js`, replace the `submitToWaitlist` function:

```javascript
async function submitToWaitlist(data) {
    const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    return await response.json();
}
```

### 2. Data Structure
The form sends this data structure:

```javascript
{
    name: "John Doe",
    email: "john@example.com",
    userType: "job-seeker" | "employer",
    timestamp: "2024-01-01T00:00:00.000Z",
    source: "landing_page"
}
```

### 3. Popular Integration Options

#### Airtable
```javascript
const response = await fetch('https://api.airtable.com/v0/YOUR_BASE_ID/waitlist', {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        fields: data
    })
});
```

#### Mailchimp
```javascript
const response = await fetch('/api/mailchimp/subscribe', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email_address: data.email,
        status: 'subscribed',
        merge_fields: {
            FNAME: data.name,
            USERTYPE: data.userType
        }
    })
});
```

#### Google Sheets
Use Google Apps Script or a service like Zapier to connect the form to Google Sheets.

## 📊 Analytics Events

The page tracks these events automatically:

- **Page Views**: When users land on the page
- **Scroll Depth**: 25%, 50%, 75%, 100% scroll milestones
- **CTA Clicks**: Button clicks with type tracking
- **Section Views**: When sections come into view
- **Form Submissions**: Waitlist signups with user type
- **Time on Page**: Session duration tracking

## 🚀 Deployment Options

### Static Hosting (Recommended)
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect to your Git repo
- **GitHub Pages**: Push to a repo and enable Pages
- **AWS S3 + CloudFront**: For enterprise hosting

### Traditional Hosting
- **cPanel/FTP**: Upload files to public_html
- **WordPress**: Use as a custom page template

### CDN Setup
For best performance, serve assets via CDN:
1. Upload images to a CDN (Cloudinary, AWS CloudFront)
2. Update image paths in HTML
3. Consider using a CDN for CSS/JS if serving globally

## 🔍 SEO Optimization

The page includes:

- **Meta Tags**: Title, description, viewport
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Image descriptions
- **Schema Markup**: Consider adding structured data
- **Open Graph**: Add for social sharing

To improve SEO:
1. Add more specific meta descriptions
2. Include relevant keywords naturally in content
3. Add schema markup for better search appearance
4. Create a sitemap.xml
5. Set up robots.txt

## ⚡ Performance Optimization

Current optimizations:

- **CSS**: Single file with critical styles inlined
- **Images**: Lazy loading and fallbacks
- **Fonts**: Preconnect to Google Fonts
- **JavaScript**: Efficient event handling and animations

For further optimization:
1. Minimize and compress CSS/JS
2. Optimize images (WebP format)
3. Implement service worker for caching
4. Use resource hints (prefetch, preload)

## 🧪 Testing Checklist

Before deploying:

- [ ] Test on mobile devices (iOS/Android)
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify form submission works
- [ ] Check animations perform smoothly
- [ ] Validate HTML and CSS
- [ ] Test loading speed (aim for < 3 seconds)
- [ ] Verify analytics tracking works
- [ ] Test accessibility (keyboard navigation, screen readers)

## 📞 Support & Customization

Need help customizing or have questions?

1. Check the code comments for guidance
2. All styles use CSS custom properties for easy theming
3. JavaScript functions are modular and well-documented
4. Consider hiring a developer for complex customizations

## 📜 License

This landing page is created for YTG. All rights reserved.

---

**Built with ❤️ following modern web standards and best practices.**