# 🍰 Sweet Crafts Bakery — E-Commerce Web Application

A responsive, multi-page web application built for **Sweet Crafts Bakery**, allowing customers to browse artisanal cake menus, inspect detailed flavor profiles, and place custom orders directly via WhatsApp.

---

## ✨ Features

- **Responsive Mobile Navigation:** React Bootstrap Navbar with automatic auto-collapse on link taps for seamless mobile UX.
- **Custom Route Preloader:** Smooth page transition preloader with a centered spinning bakery icon.
- **Dedicated Flavor Details Page:** Interactive breakdown of cake sponges, fillings, dietary options, and a complete portion/sizing chart.
- **Instant WhatsApp Order Routing:** Pre-filled custom cake order form that constructs structured text messages directly to WhatsApp.
- **Client FAQs & Reviews:** Expandable accordion sections for quick answers and social proof.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React (Vite)
- **UI Components & Styling:** React Bootstrap, Bootstrap 5
- **Routing:** React Router DOM (`react-router-dom`)
- **Icons:** Inline SVG Components

---

## 📂 Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx           # Responsive header & mobile collapse nav
│   └── Preloader.jsx        # Fullscreen loading animation
├── pages/
│   ├── Home.jsx             # Hero section & featured category cards
│   ├── Menu.jsx             # Sponge flavors, fillings & pricing guide
│   ├── FlavorDetails.jsx    # Deep dive into cake specs & portion chart
│   └── Order.jsx            # WhatsApp custom order form & FAQs
├── App.jsx                  # Main router hub & layout wrapper
└── main.jsx                 # Entry point with Bootstrap CSS imports