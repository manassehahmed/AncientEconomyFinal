# Ancient Mediterranean Grain Trade - Weather Patterns Map

An interactive React + Leaflet map visualizing the ancient Mediterranean grain trade with a focus on **weather patterns** (not war). This map shows how climate, volcanic activity, and seasonal winds affected grain production, pricing, and shipping routes in the ancient world.

## Features

### Cities & Markers
- **15 ancient cities** with detailed markers:
  - Athens (destination with 28% crop failure risk)
  - Alexandria, Nile Delta, Fayum (Egyptian sources with Zenon Papyri grain prices)
  - Chersonesos, Byzantium (Black Sea sources and transit)
  - Syracuse (Sicilian source)
  - Cyrene (North African source)
  - Tyre, Sidon (Phoenician transit ports)
  - Rhodes, Crete, Delos, Aegina, Aspendos (transit points)

### Grain Routes
- **5 curved maritime polylines** showing grain shipping routes:
  - Egypt → Athens
  - Black Sea → Athens
  - Sicily → Athens
  - Cyrene → Athens
  - Phoenicia → Athens

### Weather Overlays
1. **Nile Flood Variability** - Marker showing annual flood variation (15-20%) affecting Egyptian grain production
2. **Methana Volcano** - Marker with popup referencing Thucydides 3.89-90 (c. 425 BCE eruption)
3. **Okmok Volcanic Aerosol** - Global volcanic effects marker (43 BCE) showing climate cooling impact
4. **Etesian Winds** - Animated arrows showing north→south seasonal winds (July-September) across the Aegean

### Interactive Features
- **City Popups**: Display Zenon Papyri grain prices for Egypt and crop failure risk (28%) for Attica
- **Layer Toggles**: Show/hide each weather layer independently
- **Legend**: Visual guide for routes, cities, and weather markers
- **Hover Tooltips**: City names appear on hover
- **Responsive Design**: Works on desktop and mobile devices

### Styling
- **Ancient Parchment Theme**: Sepia-toned map with parchment-like styling
- **Historical Accuracy**: References to Manning, Horden & Purcell, and Oliver in data descriptions

## Data Sources

- **Zenon Papyri**: Grain prices from Ptolemaic Egypt
- **Thucydides**: Historical reference for Methana volcano (3.89-90)
- **Okmok Eruption**: 43 BCE global volcanic aerosol effects
- **Scholarly References**: 
  - Manning (2018) on Nile flood variability
  - Horden & Purcell (2000) on Etesian winds and shipping
  - Oliver on ancient grain trade

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
AncientEconomyFinal/
├── src/
│   ├── components/
│   │   ├── MapComponent.jsx      # Main map component
│   │   └── MapComponent.css      # Map styling
│   ├── data/
│   │   ├── cities.json           # City data with prices and risks
│   │   ├── routes.json           # Grain shipping routes
│   │   └── weather.json          # Weather pattern data
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # App styling
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Technologies

- **React 18** - UI framework
- **Leaflet** - Interactive mapping
- **React-Leaflet** - React bindings for Leaflet
- **Vite** - Build tool and dev server

## Usage

1. Open the map in your browser
2. Use the control panel (top-right) to toggle weather layers
3. Click on city markers to see detailed information including:
   - Zenon Papyri grain prices (Egyptian cities)
   - Crop failure risk percentages (Athens)
   - Weather impact descriptions
4. Hover over cities to see tooltips
5. Click on grain routes to see route descriptions
6. Explore weather markers to understand climate impacts

## Academic Context

This map focuses on **weather patterns** as drivers of ancient grain trade, emphasizing:
- Climate variability (Nile floods, rainfall patterns)
- Volcanic activity (local and global effects)
- Seasonal winds (Etesian winds affecting shipping)
- Agricultural risk (crop failure rates)

The map demonstrates how environmental factors shaped economic relationships in the ancient Mediterranean, independent of political or military considerations.

## License

This project is for educational and research purposes.
