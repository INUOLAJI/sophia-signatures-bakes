# 🎂 Sophia's Signature Bakes — Official Website

> *"... refined sweetness, perfected"*

A modern, mobile-responsive web application built for **Sophia's Signature Bakes**, showcasing custom artisanal celebration cakes, party-ready small chops packs, and freshly baked pastries with direct WhatsApp order generation.

---

## ✨ Features

- **Warm Golden Brown Theme:** Custom luxury bakery aesthetic styled with a warm golden brown and amber palette.
- **Brand Identity & Logo:** Fully integrated official logo across the navigation header, animated preloader, hero banner, order form, and footer.
- **Complete Cake Sizing & Pricing Guide:** 9 cake sizes ranging from 4" Bento Takeaway to 12" luxury celebration cakes with portion estimations and starting prices in Nigerian Naira (₦).
- **Small Chops & Pastry Menu:** Full catalogue of finger foods (small chops plates, bigger plates, big boxes) and fresh pastries (meat pies, chicken pies, egg rolls, milky doughnuts, foil cakes, cake parfaits).
- **4 Signature Flavors:**
  - 🧁 **Classic Vanilla:** Soft, Moist & Buttery Vanilla
  - 🍫 **Dark Chocolate:** Deep, Rich & Moist Chocolate
  - 🍰 **Red Velvet:** Silky, Moist & Velvety Red Velvet
  - 🍓 **Strawberry Bliss:** Soft, Moist & Delicately Sweet Strawberry
- **Automated WhatsApp Order Generator:** Interactive inquiry form that compiles customer details, cake size, flavour choice, pastry selection, units, and custom notes directly into an instant WhatsApp message to **09118784051**.
- **Prominent Policy & Bulk Discount Notices:**
  - 📌 *Minimum pastry orders:* Orders on pastries (meat pie, chicken pie, egg roll, foil small chops) start from **4 pieces and above**.
  - 🎉 *Bulk discount:* Orders of **10 pieces and above** receive an exclusive bulk discount.
- **Portion & Sizing Reference Chart:** Clear serving recommendations for different event types and guest counts.
- **Ordering FAQs:** Accordion section answering frequently asked questions about notice time, custom references, and payment.

---

## 📋 Menu & Pricing Overview

### 🎂 Cake Sizes & Starting Prices
| Size | Portions | Starting Price |
| :--- | :--- | :--- |
| **4' inches (Bento Takeaway)** | 1 – 2 servings | ₦10,000 |
| **4' inches (Board)** | 2 – 3 servings | ₦12,000 |
| **6 inches** | 4 – 6 servings | ₦14,000 |
| **7 inches** | 8 – 10 servings | ₦18,000 |
| **8 inches** | 12 – 15 servings | ₦22,000 |
| **9 inches** | 18 – 22 servings | ₦28,000 |
| **10 inches** | 25 – 30 servings | ₦35,000 |
| **11 inches** | 35 – 40 servings | ₦42,000 |
| **12 inches** | 45 – 50+ servings | ₦50,000 |

### 🥟 Small Chops Packs
| Package | Contents | Price |
| :--- | :--- | :--- |
| **Small Chops (Plate)** | 1 chops, 5 puffpuff, 1 beef | ₦2,500 |
| **Bigger Plate** | 4 chops, 10 puffpuff, 3 beef | ₦7,500 |
| **Big Box** | 10 chops, 15 puffpuff, 8 beef | ₦18,000 |

### 🥐 Pastries & Desserts
| Item | Details | Price |
| :--- | :--- | :--- |
| **Meat Pie** | Rich minced beef & potato filling *(Min. 4 pcs)* | ₦1,200 |
| **Chicken Pie** | Shredded chicken & savory spices *(Min. 4 pcs)* | ₦1,500 |
| **Egg Roll** | Crisp golden pastry with whole egg *(Min. 4 pcs)* | ₦700 |
| **Milky Doughnut** | Soft powdered milk coated doughnut | ₦1,500 |
| **Milky Doughnut (Box of 3)** | Gift pack of 3 gourmet milky doughnuts | ₦5,500 |
| **Foil Cake** | Moist individual tin cake *(Min. 4 pcs)* | ₦2,500 |
| **Cake Parfait** | Creamy layered dessert cup with toppings | ₦4,000 |

---

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **UI Framework & Styling:** [Bootstrap 5](https://getbootstrap.com/) & [React-Bootstrap](https://react-bootstrap.github.io/)
- **Theme:** Custom Golden Brown CSS Variables & Utility Styles
- **Typography:** Playfair Display & Plus Jakarta Sans (Google Fonts)
- **Routing:** [React Router DOM v7](https://reactrouter.com/)

---

## 📂 Project Structure

```text
cake-website/
├── public/
│   ├── sophia-logo.jpeg     # Official brand logo
│   └── sophia-menu'.jpeg    # Menu reference
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Header with brand logo & auto-collapsing mobile nav
│   │   └── Preloader.jsx    # Golden animated brand loading screen
│   ├── pages/
│   │   ├── Home.jsx         # Hero section, categories, flavors & CTA
│   │   ├── Menu.jsx         # Full pricing menu, small chops & pastries
│   │   ├── FlavorDetails.jsx# 4 Signature flavor profiles & portion chart
│   │   └── Order.jsx        # WhatsApp order form & FAQ accordion
│   ├── App.jsx              # App layout, router & brand footer
│   ├── index.css            # Golden brown design tokens & theme styles
│   └── main.jsx             # React root entry point
├── index.html               # HTML5 template with fonts & favicon
├── package.json             # Dependencies & scripts
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)

### Installation
1. Clone or open the repository folder:
   ```bash
   cd cake-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## 📞 Business Contact

- **Brand:** Sophia's Signature Bakes
- **WhatsApp / Phone:** `09118784051`
- **Location:** Nigeria