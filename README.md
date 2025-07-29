# 🥤 VendingMachine App

A responsive and interactive vending machine built with React and Vite and tested with Playwright. Users can insert virtual quarters, view available products, and make purchases with real-time feedback.

---

## 🚀 Features

- 💰 **MoneySlot**: Insert virtual quarters to pay for products.
- 📦 **ProductsList**: Display available products like Coke and Pepsi with images.
- ⚠️ **ErrorMessage**: Real-time validation and error messaging (e.g., insufficient funds, out of stock product).

---

## 🛠️ Tech Stack

- React + TypeScript Frontend components and logic
- Vite Lightning-fast build and dev server
- CSS Styling and layout

```text
📁 File Structure
├── assets/
│ └── money/
│ └── images/
│ └── quarter.png
│ └── money/
│ ├── images/
│ | ├── coke.png
│ | └── pepsi.png
├── src/
│ ├── components/
│ │ ├── ErrorMessage.tsx
│ │ ├── MoneySlot.tsx
│ │ └── ProductsList.tsx
│ ├── App.tsx
│ ├── main.tsx
│ └── styles.css
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts
```

🧪 Run Locally

**Clone the repository**

git clone https://github.com/michaelmaio/VendingMachine.git
cd VendingMachine

**Install dependencies**

npm install

**Start the development server**

npm run dev

**Browse to http://localhost:5173/**

**Run the tests**
npx playwright test
