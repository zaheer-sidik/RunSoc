# RunSocial Harrow Website

A simple, modern website for the RunSocial Harrow running community.

## Features

- **Responsive Design**: Works beautifully on desktop, tablet, and mobile devices
- **Interactive Carousel**: Showcases community posts with auto-play and manual navigation
- **About Section**: Introduces the running club and its values
- **Sessions Section**: Details of regular running sessions with times and locations
- **Social Links**: Easy access to Facebook, Instagram, and email contact

## Structure

- `index.html` - Main landing page with all sections
- `styles.css` - All styling and responsive design
- `script.js` - Carousel functionality and smooth scrolling
- `images/` - Placeholder folder for images

## Setup

1. Add your actual images to the `images/` folder:
   - `post1.jpg` - First carousel post image
   - `post2.jpg` - Second carousel post image
   - `post3.jpg` - Third carousel post image

2. Update the social media links in `index.html`:
   - Facebook: Replace with your actual Facebook page URL
   - Instagram: Already set to `https://www.instagram.com/runsocharrow/`
   - Email: Replace `info@runsocialharrow.com` with your actual email

3. **Add Real Instagram Posts to Carousel:**
   
   **Option A - Instagram Embed (Recommended):**
   1. Go to any post on https://www.instagram.com/runsocharrow/
   2. Click the "..." (three dots) menu on the post
   3. Select "Embed"
   4. Copy the embed code (it will be a `<blockquote>` tag)
   5. Replace the placeholder `.carousel-slide` divs in `index.html` with the Instagram embed codes
   6. Add Instagram's embed script before the closing `</body>` tag:
      ```html
      <script async src="//www.instagram.com/embed.js"></script>
      ```
   
   **Option B - Manual Update:**
   1. Download images from your Instagram posts
   2. Save them in the `images/` folder
   3. Update the image sources and text content in the carousel slides
   
   **Option C - Third-party Widget:**
   - Use services like SnapWidget, Flockler, or Taggbox to create an Instagram feed widget
   - These services provide embed codes you can insert into the carousel section

4. Customize the content:
   - Update session times and locations in the Sessions section
   - Modify the About Us text to match your community

## To View the Website

Simply open `index.html` in your web browser.

## Customization

### Colors
The main color scheme is defined in CSS variables at the top of `styles.css`:
- `--primary-color`: Main blue color
- `--secondary-color`: Darker blue
- `--accent-color`: Orange/amber accent

### Carousel
- Auto-advances every 5 seconds
- Click arrows or dots to navigate manually
- Keyboard navigation with arrow keys
- Pauses on hover

## Auto-Update Instagram Carousel

The carousel can automatically fetch and display your latest Instagram posts! See `instagram-integration.md` for detailed options.

### Quick Start Options:

**🌟 Easiest (5 minutes):**
1. **SnapWidget** (Free): https://snapwidget.com/
2. **Elfsight** (Free trial): https://elfsight.com/instagram-feed-instashow/
3. **EmbedSocial** (Free tier): https://embedsocial.com/

Just create a widget, connect @runsocharrow, and paste the embed code into your website!

**🔧 Advanced (Full Control):**
- Use Instagram Graph API (requires Facebook Developer account)
- See `instagram-feed.js` for implementation examples

**Current Setup:**
- Manual carousel with placeholder posts
- Links to @runsocharrow Instagram page
- Easy to replace with auto-updating widget

## Future Enhancements

- Add a contact form
- Integrate with Facebook Graph API for live posts
- Add an events calendar
- Include member testimonials
- Add a photo gallery

## Browser Support

Works on all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

---

Created for RunSocial Harrow © 2026
