# Website Customization Guide

This guide will help you customize your personal researcher website.

## Quick Start

Your website is built with React, TypeScript, and Tailwind CSS. All content can be modified by editing the component files in the `src/components/` directory.

## Project Structure

```
src/
├── components/
│   ├── Header.tsx         # Navigation and social links
│   ├── About.tsx          # Profile and bio section
│   ├── Publications.tsx   # Research papers and projects
│   ├── Experience.tsx     # Work history and education
│   └── Footer.tsx         # Footer with copyright
├── pages/
│   └── Index.tsx          # Main page layout
└── index.css              # Design system (colors, fonts)
```

## Common Customizations

### 1. Update Your Personal Information

**Profile Picture** (`src/components/About.tsx`):
```tsx
// Find this line and replace with your image URL
<img src="https://github.com/YOUR_GITHUB_USERNAME.png" />
```

**Bio and Research Interests** (`src/components/About.tsx`):
- Edit the paragraph text in the About section
- Modify the research interests list

**Social Links** (`src/components/Header.tsx`):
```tsx
// Update these URLs with your profiles
<a href="mailto:your.email@domain.com">
<a href="https://github.com/yourusername">
<a href="https://linkedin.com/in/yourprofile">
<a href="https://scholar.google.com/citations?user=YOUR_ID">
```

### 2. Add/Edit Publications

Open `src/components/Publications.tsx` and modify the `publications` array:

```tsx
const publications = [
  {
    title: "Your Paper Title",
    authors: "Author Names",
    venue: "Conference/Journal Name",
    year: "2024",
    links: [
      { label: "Paper", url: "https://..." },
      { label: "Code", url: "https://github.com/..." }
    ]
  },
  // Add more publications...
];
```

### 3. Update Experience and Education

Edit `src/components/Experience.tsx`:

**Work Experience**:
```tsx
const experiences = [
  {
    title: "Your Position",
    organization: "Company/Institution",
    period: "Start - End",
    description: "What you did..."
  }
];
```

**Education**:
```tsx
const education = [
  {
    degree: "Ph.D. in Computer Science",
    institution: "University Name",
    period: "2020 - 2024"
  }
];
```

### 4. Customize Colors and Styling

All colors are defined in `src/index.css` using CSS variables. The design system uses HSL color values for easy customization.

**Change Primary Color**:
```css
/* In src/index.css */
:root {
  --primary: 221 83% 53%;  /* Blue */
  --accent: 271 91% 65%;   /* Purple */
}
```

**Adjust Typography**:
Font sizes and styles are set using Tailwind classes in components. Common classes:
- `text-4xl` - Large headings
- `text-xl` - Section titles
- `text-base` - Body text
- `font-semibold` - Bold text

### 5. Add New Sections

To add a new section (e.g., Teaching, Blog):

1. Create a new component file: `src/components/Teaching.tsx`
2. Import and add it to `src/pages/Index.tsx`:

```tsx
import Teaching from "@/components/Teaching";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <About />
        <Publications />
        <Experience />
        <Teaching />  {/* New section */}
      </main>
      <Footer />
    </div>
  );
};
```

3. Update navigation links in `src/components/Header.tsx`

## Development Workflow

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Making Changes

1. Edit the relevant component file
2. Save the file - changes appear instantly in the browser
3. Test on different screen sizes (mobile, tablet, desktop)

### Deployment

This site is configured to deploy automatically when you push changes to GitHub. Your updates will be live within minutes.

## Design System

The site uses a design token system for consistency:

- **Colors**: Defined in `src/index.css` and `tailwind.config.ts`
- **Spacing**: Use Tailwind's spacing scale (`p-4`, `mb-6`, etc.)
- **Shadows**: Predefined in card components
- **Animations**: `animate-fade-in`, `animate-slide-in`

## Tips

- **Keep it simple**: Focus on content over complex features
- **Mobile-first**: Test on mobile devices regularly
- **Consistency**: Use existing components as templates for new sections
- **Visual Edits**: Use Lovable's Visual Edits feature for quick text/color changes

## Need Help?

- Check the [Lovable Documentation](https://docs.lovable.dev/)
- Review the code comments in component files
- Use Lovable AI for specific customization requests

## Common Issues

**Images not loading**: Make sure URLs are publicly accessible
**Layout broken**: Check that all JSX tags are properly closed
**Colors not changing**: Ensure you're using HSL format in `index.css`
