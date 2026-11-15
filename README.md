# BBC News Homepage Clone

A full-stack clone of the BBC News homepage. Homepage content is served from PostgreSQL, readers can register and sign in, and a login-protected admin panel lets writers create, edit and delete articles (with image upload and a rich-text editor).

> **Disclaimer:** This is an educational project. It is not affiliated with, endorsed by, or connected to the BBC. "BBC" and related names, logos and content belong to their respective owners.

## Features

- Public homepage built from reusable React components (news columns, world news, sport, health, travel, audio sliders, etc.)
- Homepage content stored in PostgreSQL (`content_sections` table) and served through the API
- Reader accounts: register, sign in and sign out from the homepage (separate from staff accounts)
- Article pages at `/article/:id`
- Admin panel at `/admin`: searchable article list, create/edit form with image preview and a Tiptap rich-text editor, delete confirmation and toast messages
- JWT authentication stored in httpOnly cookies (separate cookies for staff and readers; reader tokens are rejected by staff routes)
- Role-based access: `admin` users can manage writer accounts at `/admin/writers`; `writer` users can manage articles
- Storybook for developing UI components in isolation

## Tech stack

| Part | Technologies |
| --- | --- |
| Frontend | React 17, Vite, Tailwind CSS, React Router, Tiptap, Swiper, Storybook |
| Backend | Node.js, Express, PostgreSQL (`pg`), JWT, bcryptjs, multer, cookie-parser, CORS |

## Project structure

```
.
├── Backend/
│   ├── server.js          # Express API
│   ├── routes/
│   │   └── readers.js     # Reader register / sign in / sign out
│   ├── createUser.js      # CLI script to create staff users (admin / writer)
│   ├── seedContent.js     # Loads the homepage content into the database
│   ├── contentData.js     # Seed data for the homepage content
│   ├── schema.sql         # Database tables
│   ├── uploads/           # Uploaded article images (git-ignored)
│   └── .env.example       # Environment variable template
└── Frontend/
    ├── src/
    │   ├── components/    # Layout, Home sections, UI pieces
    │   │   └── auth/      # Sign in / register modal and reader menu
    │   ├── admin/         # Login, admin page, writers page, editor
    │   │   └── components/  # Admin layout, article list and form, modals
    │   ├── api/           # fetch helpers for the backend
    │   └── context/       # ContentContext, ReaderAuthContext
    └── .storybook/
```

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer
- [PostgreSQL](https://www.postgresql.org/) installed and running

### 1. Clone the repository

```bash
git clone https://github.com/odaialkhalaileh2006-netizen/BBC-news-clone.git
cd BBC-news-clone
```

### 2. Set up the database

```bash
createdb bbc_clone
psql -d bbc_clone -f Backend/schema.sql
```

This creates the `articles`, `users`, `readers` and `content_sections` tables.

> On Windows you may need to name the user explicitly:
> `createdb -U postgres bbc_clone` and `psql -U postgres -d bbc_clone -f Backend/schema.sql`

### 3. Set up the backend

```bash
cd Backend
cp .env.example .env      # then open .env and fill in your values
npm install
```

Load the homepage content into the database (required, otherwise the homepage is empty):

```bash
node seedContent.js
```

> Running this again overwrites the homepage content in the database with the data in `contentData.js`.

Create your first admin account:

```bash
node createUser.js admin@example.com your_password admin
```

(The third argument is the role: `admin` or `writer`. It defaults to `writer`.)

Start the API:

```bash
npm run dev
```

The API runs at http://localhost:5000.

### 4. Set up the frontend

In a second terminal:

```bash
cd Frontend
npm install
npm run dev
```

Open http://localhost:5173. The admin panel is at http://localhost:5173/admin. Readers can register and sign in from the buttons in the homepage header.

> The backend only accepts requests from `http://localhost:5173` (CORS), and the frontend expects the API at `http://localhost:5000`.

### Optional: Storybook

```bash
cd Frontend
npm run storybook
```

## Environment variables (`Backend/.env`)

| Variable | Description |
| --- | --- |
| `PORT` | Port for the API (default `5000`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret used to sign login tokens |

## API overview

| Method | Endpoint | Access |
| --- | --- | --- |
| GET | `/api/content` | Public |
| GET | `/api/content/:section` | Public |
| GET | `/api/articles` | Public |
| GET | `/api/articles/:id` | Public |
| POST | `/api/login` | Public |
| POST | `/api/logout` | Public |
| POST | `/api/readers/register` | Public |
| POST | `/api/readers/login` | Public |
| POST | `/api/readers/logout` | Public |
| GET | `/api/readers/me` | Reader |
| GET | `/api/verify` | Staff |
| POST | `/api/articles` | Staff |
| PUT | `/api/articles/:id` | Staff |
| DELETE | `/api/articles/:id` | Staff |
| GET | `/api/users` | Admin |
| POST | `/api/users` | Admin |
| DELETE | `/api/users/:id` | Admin |

## License

Released under the [MIT License](LICENSE).