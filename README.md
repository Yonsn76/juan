# Casa Biker - Astro Version

Modern website for Zona Biker 15, built with Astro for improved performance and developer experience.

## Features

- 🚀 Built with Astro for optimal performance
- 📱 Fully responsive design
- 🛒 Interactive shopping cart
- 🎠 Dynamic image carousel
- 🎨 Modern, clean UI with custom styling
- 🔍 SEO optimized
- 🌐 Multi-page application

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/casa-biker-astro.git
cd casa-biker-astro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Project Structure

```
casa_biker_astro/
├── public/              # Static assets (images, videos)
├── src/
│   ├── components/     # Reusable Astro components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   ├── scripts/        # TypeScript utilities
│   └── styles/         # CSS styles
├── astro.config.mjs    # Astro configuration
└── tsconfig.json       # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run setup` - Copy assets from original project

## Components

### Layout
The main layout component that wraps all pages. Includes:
- Meta tags
- Global styles
- Header
- Footer

### Header
Navigation component with:
- Logo
- Responsive menu
- Cart button

### Carousel
Image slider component with:
- Auto-play functionality
- Navigation buttons
- Indicators
- Touch support

### Cart
Shopping cart functionality with:
- Add/remove items
- Quantity adjustment
- Total calculation
- WhatsApp/Email checkout

## Styles

The project uses a modular CSS approach with:
- Global variables for colors and sizes
- Component-specific styles
- Responsive design utilities
- Animation classes

## Browser Support

The site is optimized for modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
