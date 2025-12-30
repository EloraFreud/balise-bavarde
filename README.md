# PFE Cursor App - Map Interface

This project implements a Figma design for a mobile map interface using HTML, CSS (Tailwind), and JavaScript.

## Project Structure

```
Cursor/
├── index.html          # Main HTML file with the map interface
├── script.js           # JavaScript for interactivity
├── design-system.json  # Design system with all Figma variables
└── README.md          # This file
```

## Design System

The `design-system.json` file contains all design tokens extracted from Figma:

- **Colors**: Background, content, border, shadow, and gradient colors
- **Spacing**: Margin and padding values (0px to 24px)
- **Border Radius**: From none to 3xl (24px)
- **Typography**: Font families, sizes, weights, line heights, and letter spacing
- **Shadows**: Base, 2xl, and navbar shadow definitions
- **Components**: Predefined component styles

## Features

- ✅ Responsive mobile-first design (390px width)
- ✅ Interactive navigation bar
- ✅ Search bar with filter button
- ✅ Map pins with hover effects
- ✅ Location pin button
- ✅ System status bar (iOS style)
- ✅ Design system JSON for consistency

## Usage

1. Open `index.html` in a web browser
2. The design uses Tailwind CSS via CDN (no build step required)
3. Images are loaded from the Figma localhost server (http://localhost:3845/assets/)

## Customization

To customize the design:

1. **Colors**: Update values in `design-system.json` and apply them in the HTML/CSS
2. **Spacing**: Use the spacing values from the design system
3. **Components**: Modify component styles in the HTML or add custom CSS

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The map image and icons are loaded from the Figma localhost server
- For production, you should download and host these assets locally
- The design follows the exact specifications from the Figma file
- All design tokens are documented in `design-system.json`

