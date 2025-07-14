# 🌍 Smart Travel Dashboard

A simple web app built with React.js and Tailwind CSS that helps travelers by using real-life browser features through Web APIs.

## How i used API ?
I have used  useeffect() hook for using web browser APIs because this hook is used to handle side effects.
syntax  useEffect(setup,dependencies?)

##  API USED

1. **Geolocation API** - Fetches and displays your current location.
2. **Canvas API** - Shows a marker on a canvas map.
3. **Intersection Observer API** - Lazy-loads travel tips when in view.
4. **Network Information API** - Displays your connection type and warns on slow networks.

##  Features:
1. Show current location on a canvas map.

2. Detect network connection type and alert if slow.

3. Lazy-load travel tips when they come into view.

4. Use background sync simulation (via setTimeout) to save trip notes.



## 🛠️ Technologies Used

- React.js
- Tailwind CSS
- HTML5 Canvas
- Web APIs

## 🚀 Setup Instructions

```bash
git clone https://github.com/your-username/smart-travel-dashboard.git
cd smart-travel-dashboard
npm install
npm start
```

> Note: You need to enable location permissions to see your position.

## 📂 Folder Structure

- `src/App.js` - Main logic with all API integrations
- `src/index.js` - Entry point
- `src/index.css` - Tailwind CSS import
- `tailwind.config.js` - Tailwind configuration

---

Made by Jitendra kumar for a frontend assignment.
