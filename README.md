# Harvest Nutrition Website

A modern, responsive web application built with Next.js for Harvest Nutrition. This website provides information about healthy living, nutritious recipes, meal plans, and wellness tips.

## Features

- 🌱 Modern, responsive design with Tailwind CSS
- 🎨 Dark mode support
- 📱 Mobile-friendly navigation
- ⚡ Built with Next.js 16 and React 19
- 🔤 TypeScript for type safety
- 🎯 SEO optimized

## Pages

- **Home**: Welcome page with hero section and key features
- **About**: Information about Harvest Nutrition's mission and values
- **Contact**: Contact form and contact information

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Harvest-Nutrition/Harvest-Website-Updated.git
cd Harvest-Website-Updated
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── about/
│   │   │   └── page.tsx      # About page
│   │   ├── contact/
│   │   │   └── page.tsx      # Contact page
│   │   ├── layout.tsx        # Root layout with metadata
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   └── ...
├── public/                   # Static assets
├── amplify.yml               # AWS Amplify build configuration
├── package.json
└── README.md
```

## Technologies Used

- **Next.js 16**: React framework for production
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **ESLint**: Code linting

## Deployment

### AWS Amplify

This application is configured for deployment on AWS Amplify. The `amplify.yml` file contains the build configuration.

**To deploy on AWS Amplify:**

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket, or AWS CodeCommit)
2. Go to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. Click "New app" > "Host web app"
4. Connect your Git repository
5. AWS Amplify will automatically detect the `amplify.yml` configuration
6. Review the build settings and deploy

The build configuration includes:
- Automatic dependency installation with `npm ci`
- Production build with `npm run build`
- Caching for faster subsequent builds

### Alternative: Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Learn More

To learn more about Next.js and AWS Amplify:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [AWS Amplify Hosting](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html) - AWS Amplify documentation

## License

© 2025 Harvest Nutrition. All rights reserved.

