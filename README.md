# Weatherly — Simple Weather Data Viewer

A lightweight static web app that fetches and displays weather data from the **Visual Crossing API**.
---

## 🚀 Features

* **Live Weather Data:** Retrieves real-time weather information.
* **Temperature Line Chart:** Displays min/max temperature trends using Chart.js.
* **No Frameworks:** Pure HTML, CSS, and JavaScript.

---

## 🛠️ Tech Stack

* **Vite** — Bundler and dev server
* **Chart.js** — For rendering the line chart
* **Visual Crossing API** — Weather data source
* **HTML / CSS / JavaScript** — Core frontend tech

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# Install dependencies
npm install

```

---

## 🔧 Usage
### Visit the already build site here:

[Live Site](https://3psilon0.github.io/weather-app/)

### To run the app locally:

1. Install the app using the instructions above.
2. Make a Visual Crossing Account or sign in with your existing account and copy your API key.
3. Create a `.env` file in the project root with the following variables:

```
VITE_API_BASE_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline
VITE_API_KEY=your_visual_crossing_api_key_here
```
4. Now you can build the code or run it in the dev server.
```bash
   # Run in the dev server
   npm run dev

   # Build and preview
   npm run build && npm run preview
```

---

## 📜 License

MIT License. Feel free to use, modify, and distribute.

---


If you like the project, consider giving it a ⭐ on GitHub.
