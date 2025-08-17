# Project Broadcast

A modern, responsive landing page for Project Broadcast - a comprehensive messaging service that provides APIs for WhatsApp, SMS, and Email communication.

## Features

- **WhatsApp Business API**: Send messages, media, and templates through WhatsApp Business
- **SMS Gateway API**: High-delivery SMS API with global coverage
- **Email Service API**: Transactional and marketing email API with advanced features
- **Web Interface**: Intuitive web interface for quick campaigns without API integration
- **Transparent Pricing**: Clear, competitive pricing plans for all business sizes

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: NextUI
- **Animations**: Framer Motion
- **Icons**: Iconify
- **Build Tool**: Vite
- **Routing**: React Router DOM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:8000](http://localhost:8000) in your browser

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── reusable/       # Generic components
│   └── shared/         # Layout components (navbar, footer)
├── pages/              # Page components
│   └── home.tsx        # Main landing page
├── layout/             # Layout wrappers
├── hooks/              # Custom React hooks
├── store/              # Redux store configuration
└── utils/              # Utility functions and data
```

## Landing Page Sections

1. **Hero Section**: Clear value proposition with call-to-action buttons
2. **Features Section**: Detailed overview of WhatsApp, SMS, and Email APIs
3. **Web Interface Section**: Showcase of the web-based campaign builder
4. **Pricing Section**: Three-tier pricing structure (Starter, Professional, Enterprise)
5. **Call-to-Action**: Final conversion section with sign-up options

## Customization

- Update colors in `tailwind.config.js`
- Modify content in `src/pages/home.tsx`
- Adjust navigation in `src/components/shared/navbar.tsx`
- Update footer links in `src/components/shared/footer.tsx`

## Deployment

The project is configured for easy deployment:
- Build the project with `npm run build`
- Deploy the `dist/` folder to your hosting provider
- Configure your domain and SSL certificates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary software. All rights reserved.
