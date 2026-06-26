# Virtual Learning Academy Website

A professional, responsive, multi-page website for a Virtual Learning Academy built with React, TypeScript, Tailwind CSS, and Framer Motion animations.

## 🎨 Design Features

- **Premium Color Scheme**: Maroon (#8C1B2E), Light Maroon (#B43A4E), Dark Maroon (#5A0F1C), with metallic silver accents
- **Modern UI/UX**: Clean, academic aesthetic with generous white space
- **Smooth Animations**: Framer Motion-powered transitions and interactions
- **Responsive Design**: Mobile-first approach with seamless scaling to desktop
- **Interactive Elements**: Hover effects, gradient hero sections, and engaging CTAs

## 📱 Pages

### 1. **Home Page** (`/`)
- Animated hero section with gradient background
- Key highlights section with checkmarks
- "Why Choose Us" feature cards with icons
- Call-to-action sections
- Smooth scroll animations

### 2. **About Page** (`/about`)
- Company story and mission
- Vision statement
- Core values display
- Why we exist section
- Professional layout with structured content

### 3. **Programs Page** (`/programs`)
- 4 main program cards:
  - Online School Program
  - IGCSE & O Level Preparation
  - A Level Coaching
  - One-to-One Tutoring
- Quran & Islamic Studies Program section
- 5-step learning process visualization
- Subject and grade information

### 4. **Testimonials Page** (`/testimonials`)
- Statistics display (students, satisfaction rate, teachers, countries)
- 6 testimonial cards with star ratings
- FAQ section with common questions
- Community engagement messaging

### 5. **Contact Page** (`/contact`)
- Contact information cards (phone, email, address)
- Functional contact form with validation
- Business hours information
- Additional contact benefits section
- Free trial booking CTA

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Framer Motion** - Smooth animations and interactions
- **Lucide React** - Icon library

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The app will be available at `http://localhost:3000`

## 📂 Project Structure

```
app/
├── layout.tsx              # Root layout with metadata
├── globals.css            # Global styles and theme
├── page.tsx               # Home page
├── about/
│   └── page.tsx          # About page
├── programs/
│   └── page.tsx          # Programs page
├── testimonials/
│   └── page.tsx          # Testimonials page
└── contact/
    └── page.tsx          # Contact page

components/
├── Navbar.tsx            # Navigation bar with mobile menu
└── Footer.tsx            # Footer with links and contact info
```

## 🎯 Key Features

### Navigation
- **Sticky Navbar**: Always accessible with VLA branding
- **Mobile Menu**: Hamburger menu for responsive navigation
- **Active State Indicators**: Hover effects on navigation links

### Design System
- Custom component classes in Tailwind:
  - `.btn-primary` - Main CTA button
  - `.btn-secondary` - Secondary button
  - `.section-heading` - Large section titles
  - `.section-subheading` - Subsection titles
  - `.card-feature` - Feature cards with hover animation
  - `.gradient-hero` - Maroon gradient backgrounds

### Animations
- Page entrance animations
- Staggered item reveals
- Hover-triggered scale and translate effects
- Smooth scroll-triggered animations
- Interactive button feedback

### Forms
- Contact form with validation
- Responsive input fields
- Success message feedback
- Subject dropdown selection

## 📋 Color Theme

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Maroon | #8C1B2E | Buttons, headings, branding |
| Light Maroon | #B43A4E | Hover states, gradients |
| Dark Maroon | #5A0F1C | Footer, strong CTAs |
| Metallic Silver | #C0C5CE | Borders, icons, accents |
| Charcoal Black | #1A1A1A | Body text, footer text |
| Pure White | #FFFFFF | Backgrounds, cards |
| Light Gray | #F5F7FA | Alternate sections |

## ✨ Components

### Navbar Component
- Responsive navigation menu
- Mobile hamburger menu with smooth animation
- Free trial button CTA
- Brand logo with VLA text

### Footer Component
- Company information
- Quick links navigation
- Contact information display
- Copyright and legal links
- Dark maroon background for contrast

## 🔧 Customization

### Modify Colors
Edit the color values in `/app/globals.css` in the `@layer components` section and update Tailwind classes.

### Change Content
Update text content in each page file (`app/[page]/page.tsx`). Content from your PDF is integrated throughout the pages.

### Add New Pages
Create a new folder under `/app` with a `page.tsx` file and import the Navbar and Footer components.

### Update Contact Information
Edit the contact details in:
- `components/Footer.tsx`
- `app/contact/page.tsx`

## 📊 Performance

- Optimized images and animations
- Lazy-loaded components with Framer Motion
- Efficient CSS with Tailwind v4
- Server-side rendering with Next.js
- Responsive viewport optimization

## 🌐 SEO

- Proper metadata in `layout.tsx`
- Semantic HTML structure
- Mobile viewport configuration
- Theme color optimization
- Descriptive page titles and descriptions

## 🚀 Deployment

Deploy to Vercel for optimal performance:

```bash
# Push to GitHub
git push origin main

# Deploy on Vercel
vercel deploy
```

## 📝 Notes

- All content follows the provided color theme guide
- Website maintains premium, academic aesthetic
- Mobile responsiveness tested across breakpoints
- Animations use Framer Motion for smooth performance
- Icons from Lucide React provide consistent visual language

## 📞 Support

For questions or modifications, refer to:
- Framer Motion docs: https://www.framer.com/motion/
- Tailwind CSS: https://tailwindcss.com/
- Next.js: https://nextjs.org/docs
- Lucide Icons: https://lucide.dev/

---

**Created with React, TypeScript, Tailwind CSS, and Modern Web Technologies**
