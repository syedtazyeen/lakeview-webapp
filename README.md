Here's the content you can directly copy into a `.md` file:

```markdown
# Lakeview Webapp

Lakeview is a hotel booking platform with a booking management system, customer side functionality, and a dashboard. It includes rooms, categories and floors, guest directories, and profiles.

## Features

- **Customer Side**: Browse rooms, view categories and floors, and book reservations.
- **Admin Dashboard**: Manage bookings, guests, profiles, rooms, and more.
- **Guest Directory**: View and manage guest information and booking history.
- **Profiles**: Manage hotel and guest profiles.

## Tech Stack

- **Frontend**: Next.js
- **UI Components**: ShadCN
- **Styling**: Tailwind CSS
- **Image Management**: Cloudinary
- **State Management**: Zustand
- **API Requests**: Axios

## Installation

### With PNPM

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

### With NPM

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Make sure to configure the necessary environment variables. Create a `.env.local` file in the root directory and add the following:

```env
NEXT_PUBLIC_API_BASE_URL=""
NEXT_PUBLIC_CLOUDINARY_URL=""
```

## License

This project is open-source and available under the [MIT License](LICENSE).