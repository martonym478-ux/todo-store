# ToDo — Full-Stack E-Commerce Store

A bilingual (English / Arabic, RTL) online store built with **Node.js, Express and MongoDB** and a vanilla **HTML / CSS / JavaScript** front end. No front-end framework.

## Features
- Product catalog with categories, search, sorting, offers and a product details view
- Cart page with editable quantities, free-shipping threshold and order summary
- Wishlist page with account sidebar
- Real accounts: registration with **email verification code**, login, **forgot password**, JWT sessions, bcrypt-hashed passwords
- Checkout (login required), saved addresses from previous orders, payment method selection
- Order tracking page (Placed → Processing → Shipped → Delivered)
- **Admin panel** (`/admin.html`): dashboard stats, manage orders and statuses, products CRUD, users list
- Language (EN/AR) and currency (USD, EGP, SAR, AED, EUR) switcher, dark/light theme
- Security basics: server-side validation, password rules, rate limiting, security headers

> **Note:** card payments are a **demo only** (no real charge, no card data is sent or stored). Cash on delivery is the working payment method.

## Tech stack
Node.js · Express · MongoDB (Mongoose) · JWT · bcryptjs · Nodemailer / Brevo API · Helmet · express-rate-limit

## Getting started
```bash
git clone <your-repo-url>
cd todo-store
npm install
cp .env.example .env      # then fill in your values
npm run seed              # loads the 18 sample products
npm start                 # http://localhost:3000
```

### Environment variables
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Long random string used to sign sessions |
| `BREVO_API_KEY`, `MAIL_FROM_EMAIL`, `MAIL_FROM_NAME` | Sends verification / reset codes by email (HTTPS API) |
| `SMTP_*` | Optional SMTP alternative for local testing |
| `NODE_ENV` | Use `production` when deployed (enables rate limiting) |

Without any email settings the verification code is printed in the server console (development only).

### Make yourself an admin
Register and verify an account in the store, then:
```bash
node make-admin.js you@example.com
```
Open `/admin.html`.

### Change an order status from the terminal
```bash
node set-status.js A1B2C3 shipped
```

## Deploying (Vercel, no credit card)
The repo includes `vercel.json` and `api/index.js`, so the Express API runs as a serverless function and `public/` is served as static files.
1. Push the project to GitHub.
2. On vercel.com choose **Add New → Project**, import the repo and keep the defaults.
3. Add the environment variables (`MONGODB_URI`, `JWT_SECRET`, `BREVO_API_KEY`, `MAIL_FROM_EMAIL`, `MAIL_FROM_NAME`).
4. In MongoDB Atlas → Network Access allow `0.0.0.0/0`.

## Project structure
```
server.js         Express app + API routes
mailer.js         Email sending (Brevo API / SMTP / console)
models/           Mongoose models (Product, Order, User)
public/           Store front end (index.html, script.js, style.css) and admin panel (admin.*)
products.json     Sample data used by `npm run seed`
```

## Screenshots
_Add screenshots of the home page, cart, wishlist, order tracking and admin panel here._

## License
MIT
