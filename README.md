# 🎟️ Ticket Management System — React Version

A responsive and accessible **Ticket Management Web App** built with **React** as part of the **HNGi13 Stage 2 Frontend Task**.

This project demonstrates key frontend engineering concepts such as component-based architecture, state management, form validation, data persistence with localStorage, and responsive UI design.

---

## 🚀 Features

### 🏠 Landing Page
- Full-height hero section with call-to-action buttons.
- Consistent color scheme (blue & lemon gradient).
- Fully responsive layout for desktop, tablet, and mobile.

### 🔐 Authentication Screen
- Mock login system with validation (`admin / 1234`).
- Stores session token in `localStorage`.
- Displays error messages for invalid credentials.

### 📊 Dashboard
- Displays ticket statistics:
  - Total Tickets  
  - Open Tickets  
  - Resolved Tickets  
- Includes quick actions to:
  - Manage Tickets  
  - Seed Demo Tickets  

### 🎫 Ticket Management
- LocalStorage-based CRUD system (Create, Read, Update, Delete).
- Inline editing and deletion.
- Form validation to prevent empty submissions.
- Responsive table layout for all screen sizes.

### ♿ Accessibility
- Semantic HTML structure.
- ARIA labels and roles for screen reader support.
- Keyboard-navigable form inputs and buttons.

---

## 🧱 Tech Stack

| Technology | Purpose |
|-------------|----------|
| **React (Vite or CRA)** | UI Framework |
| **CSS3 / Flexbox / Media Queries** | Styling & Responsive Design |
| **localStorage API** | Persistent Data Storage |
| **JSX + ES6 Modules** | Component Logic |
| **Git / GitHub** | Version Control & Hosting |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/<your-username>/ticket-management-react.git
cd ticket-management-react
2️⃣ Install Dependencies
If you used Create React App:

bash
Copy code
npm install
Or for Vite setup:

bash
Copy code
npm install
3️⃣ Run the App
bash
Copy code
npm start
Then visit 👉 http://localhost:3000 in your browser.

🧩 Project Structure
pgsql
Copy code
ticket-management-react/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx          # Main React component (Landing, Login, Dashboard, Tickets)
│   ├── index.js
│   ├── styles.css       # Global responsive styling
│   └── assets/          # SVGs and shared graphics
├── package.json
└── README.md
🧠 How It Works
On launch, users land on the Landing Page.

Clicking “Get Started” leads to the Login Page.

After successful login, a token is saved to localStorage, and the Dashboard loads.

Dashboard statistics read from stored tickets.

Clicking “Manage Tickets” opens the Ticket Management screen, where users can:

Add new tickets

Edit existing tickets

Delete tickets

Data persists between reloads.

📱 Responsiveness
The app automatically adapts across devices:

✅ Desktop (≥ 1024px)

✅ Tablet (768–1023px)

✅ Mobile (≤ 767px)

It uses CSS flexbox and media queries to ensure consistent design and usability.

🔐 Demo Credentials
Username	Password
admin	1234

📸 Screenshots
(You can replace these with your own)

Landing Page	Dashboard	Tickets

🧑‍💻 Author
Barnabas Olayinka Affonshike
Frontend Developer | HNGi13 Cohort
📧 Email: barnabasolayinka@gmail.com
🌐 Portfolio: https://vercel.com/barnabas001s-projects

🏁 Next Steps
Implement backend integration (e.g., Node.js + Express API)

Add authentication using JWT

Deploy to Vercel or Netlify

✨ Built with passion and precision for the HNGi13 Frontend Task.
