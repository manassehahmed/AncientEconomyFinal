import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './Weather.css'

function Weather() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [currentYear, setCurrentYear] = useState(-480)
  const [isPlaying, setIsPlaying] = useState(false)
  const playIntervalRef = useRef(null)
  const warLayerRef = useRef(null)
  const tradeLayerRef = useRef(null)
  const grainLayerRef = useRef(null)
  const weatherLayerRef = useRef(null)
  const cityMarkersRef = useRef({})
  const cityCheckboxRef = useRef(null)
  const [showEruption305, setShowEruption305] = useState(false)
  const [showEruption247, setShowEruption247] = useState(false)
  const [showEruption209, setShowEruption209] = useState(false)
  const [showEtesianWinds, setShowEtesianWinds] = useState(false)
  const [showMethana, setShowMethana] = useState(false)
  const [showAtticaRisk, setShowAtticaRisk] = useState(false)
  const [showOkmok, setShowOkmok] = useState(false)
  const [showCyrenaica, setShowCyrenaica] = useState(false)
  const [showBlackSeaStorms, setShowBlackSeaStorms] = useState(false)
  const [showWeatherPanel, setShowWeatherPanel] = useState(false)
  // Location database
  const locationDb = {
    "Athens": [37.9838, 23.7275],
    "Sparta": [37.0733, 22.4297],
    "Thebes": [38.3225, 23.3204],
    "Corinth": [37.9386, 22.9324],
    "Plataea": [38.2117, 23.2753],
    "Mycale": [37.6914, 27.0225],
    "Sestus": [40.2833, 26.4000],
    "Cyprus": [35.1264, 33.4299],
    "Byzantium": [41.0082, 28.9784],
    "Eion": [40.793, 23.892],
    "Scyros": [38.905, 24.532],
    "Carystos": [38.016, 24.421],
    "Naxos": [37.100, 25.500],
    "Eurymedon": [36.8, 31.2],
    "Thasos": [40.77, 24.70],
    "Drabescus": [40.9, 24.2],
    "Mycenae": [37.7308, 22.7565],
    "Egypt": [28.0000, 30.5000],
    "Halieis": [37.33, 23.15],
    "Megara": [37.996, 23.344],
    "Aegina": [37.75, 23.49],
    "Tanagra": [38.31, 23.53],
    "Oenophyta": [38.30, 23.63],
    "Boeotia": [38.4, 23.1],
    "Delphi": [38.4824, 22.5010],
    "Coronea": [38.39, 22.96],
    "Attica": [38.0, 23.9],
    "Euboea": [38.5, 23.9],
    "Samos": [37.75, 26.82],
    "Corcyra": [39.62, 19.92],
    "Sybota": [39.4, 20.2],
    "Potidaea": [40.19, 23.33],
    "Sicily": [37.5, 14.0],
    "Syracuse": [37.0755, 15.2866],
    "Decelea": [38.11, 23.78],
    "Iasus": [37.27, 27.42],
    "Cnidus": [36.68, 27.37],
    "Cynossema": [40.16, 26.37],
    "Abydos": [40.19, 26.40],
    "Arginusae": [39.0, 26.8],
    "Mytilene": [39.10, 26.55],
    "Aegospotami": [40.2, 26.5],
    "Lampsacus": [40.34, 26.68],
    "Cunaxa": [33.32, 44.10],
    "Sardis": [38.48, 28.04],
    "Haliartus": [38.37, 23.10],
    "Nemea": [37.80, 22.71],
    "Argos": [37.63, 22.72],
    "Lechaeum": [37.94, 22.91],
    "Mantinea": [37.61, 22.39],
    "Olynthus": [40.29, 23.34],
    "Leuctra": [38.25, 23.17],
    "Messenia": [37.0, 21.9],
    "Thessaly": [39.5, 22.5],
    "Macedonia": [40.75, 22.5],
    "Sicyon": [37.98, 22.65],
    "Chios": [38.36, 26.13],
    "Rhodes": [36.43, 28.21],
    "Gaugamela": [36.36, 43.15],
    "Babylon": [32.53, 44.42],
    "Susa": [32.18, 48.25],
    "Bactria": [36.7, 66.9],
    "Sogdiana": [40.0, 66.0],
    "Indus": [32.0, 71.0],
    "Amorgos": [36.83, 25.89],
    "Crannon": [39.5, 22.3],
    "Hellespont": [40.2, 26.4],
    "Cappadocia": [38.5, 34.5],
    "Paraetacene": [32.5, 51.5],
    "Gabiene": [33.0, 50.0],
    "Tyre": [33.27, 35.19],
    "Gaza": [31.50, 34.46],
    "Nabataea": [30.3, 35.4],
    "Mesopotamia": [34.0, 43.0],
    "Iran": [32.0, 53.0],
    "Salamis": [35.15, 33.9],
    "Ipsus": [38.8, 30.9],
    "Corupedium": [38.5, 27.5],
    "Heraclea": [40.2, 16.6],
    "Asculum": [41.2, 15.5],
    "Beneventum": [41.13, 14.78],
    "Thrace": [41.5, 25.0],
    "Asia Minor": [39.0, 30.0],
    "Syria": [35.0, 38.0],
    "Cos": [36.89, 27.28],
    "Sellasia": [37.16, 22.41],
    "Ambracus": [39.0, 21.1],
    "Psophis": [37.8, 21.9],
    "Seleucia": [36.12, 35.94],
    "Raphia": [31.28, 34.25],
    "Rome": [41.9028, 12.4964],
    "Carthage": [36.8564, 10.3115],
    "Massilia": [43.2965, 5.3698],
    "Alexandria": [31.2001, 29.9187],
    "Lesbos": [39.10, 26.55],
    "Mende": [39.96, 23.44],
    "Erythrai": [38.38, 26.48],
    "Knidos": [36.68, 27.37],
    "NGR": [40.8, 24.0],
    "SEA": [36.5, 25.5],
    "Adriatic-Ionian": [39.8, 19.5],
    "Pontic": [41.5, 30.0],
    "Italy": [40.5, 16.5],
    "Central Greece": [38.5, 22.8],
    "Punic": [36.8, 10.3],
    "Cyrene": [32.8211, 21.8542],
    "Crimea": [45.0, 34.0],
    "Okmok": [53.43, -168.13],
    "Nile Delta": [31.0, 31.0],
    "Methana": [37.6167, 23.3333],
    "Attica": [38.0, 23.9],
    "Cyrenaica": [32.5, 21.5],
    "Black Sea": [43.0, 33.0]
  }

  const regionList = [
    "Egypt", "Cyprus", "Boeotia", "Attica", "Euboea", "Sicily", "Messenia",
    "Thessaly", "Macedonia", "Bactria", "Sogdiana", "Indus", "Hellespont",
    "Cappadocia", "Paraetacene", "Gabiene", "Nabataea", "Mesopotamia",
    "Iran", "Thrace", "Asia Minor", "Syria", "NGR", "SEA", "Adriatic-Ionian",
    "Pontic", "Italy", "Central Greece", "Punic", "Crimea"
  ]

  const mainCities = [
    "Rome", "Carthage", "Athens", "Alexandria", "Byzantium", "Tyre",
    "Syracuse", "Massilia", "Babylon", "Sparta", "Thebes", "Corinth",
    "Susa", "Rhodes", "Knidos", "Chios", "Macedonia", "Egypt", "Cyrene"
  ]

  const rawEvents = [
    { y: -479, n: "Xerxes' Invasion (Conclusion)", l: ["Plataea", "Mycale", "Sestus"] },
    { y: -478, n: "Allied Greek Campaigns", l: ["Cyprus", "Byzantium"] },
    { y: -476, n: "Capture of Eion", l: ["Eion"] },
    { y: -475, n: "Capture of Scyros", l: ["Scyros"] },
    { y: -474, n: "Capture of Carystos", l: ["Carystos"] },
    { y: -469, n: "Capture of Naxos", l: ["Naxos"] },
    { y: -466, n: "Battle of Eurymedon", l: ["Eurymedon"] },
    { y: -465, n: "Siege of Thasos", l: ["Thasos", "Drabescus"] },
    { y: -464, n: "Siege of Thasos", l: ["Thasos"] },
    { y: -463, n: "Siege of Thasos", l: ["Thasos"] },
    { y: -460, n: "First Peloponnesian War", l: ["Megara", "Halieis"] },
    { y: -459, n: "First Peloponnesian War", l: ["Aegina", "Egypt"] },
    { y: -457, n: "Battle of Tanagra/Oenophyta", l: ["Tanagra", "Oenophyta", "Boeotia"] },
    { y: -456, n: "Athenian Raids", l: ["Peloponnese"] },
    { y: -454, n: "Athenian Raids", l: ["Pharsalus", "Thessaly"] },
    { y: -448, n: "Second Sacred War", l: ["Delphi"] },
    { y: -447, n: "Battle of Coronea", l: ["Coronea", "Boeotia"] },
    { y: -446, n: "Spartan Invasion", l: ["Attica", "Euboea"] },
    { y: -440, n: "Siege of Samos", l: ["Samos"] },
    { y: -435, n: "Corinth-Corcyra War", l: ["Leucimme"] },
    { y: -433, n: "Corinth-Corcyra War", l: ["Sybota"] },
    { y: -432, n: "Siege of Potidaea", l: ["Potidaea"] },
    { y: -431, n: "Peloponnesian War Begins", l: ["Attica", "Plataea"] },
    { y: -415, n: "Sicilian Expedition", l: ["Sicily", "Syracuse"] },
    { y: -414, n: "Sicilian Expedition", l: ["Syracuse"] },
    { y: -413, n: "Spartan Occupation", l: ["Decelea", "Syracuse"] },
    { y: -412, n: "War in Ionia", l: ["Iasus", "Cnidus"] },
    { y: -411, n: "War in Ionia", l: ["Cynossema", "Abydos"] },
    { y: -406, n: "Battle of Arginusae", l: ["Arginusae", "Mytilene"] },
    { y: -405, n: "Battle of Aegospotami", l: ["Aegospotami", "Lampsacus", "Athens"] },
    { y: -401, n: "Revolt of Cyrus", l: ["Cunaxa", "Asia Minor"] },
    { y: -399, n: "Spartan Campaigns", l: ["Asia Minor", "Sardis"] },
    { y: -395, n: "Corinthian War", l: ["Haliartus", "Boeotia"] },
    { y: -394, n: "Corinthian War", l: ["Nemea", "Coronea", "Cnidus"] },
    { y: -390, n: "Corinthian War", l: ["Lechaeum", "Corinth"] },
    { y: -382, n: "Spartan Wars", l: ["Olynthus", "Thebes"] },
    { y: -379, n: "Boeotian War", l: ["Thebes"] },
    { y: -376, n: "Boeotian War", l: ["Naxos"] },
    { y: -371, n: "Battle of Leuctra", l: ["Leuctra", "Sparta"] },
    { y: -370, n: "Theban Hegemony", l: ["Mantinea", "Laconia", "Messenia"] },
    { y: -362, n: "2nd Battle of Mantinea", l: ["Mantinea"] },
    { y: -357, n: "Social War", l: ["Chios", "Rhodes"] },
    { y: -338, n: "Rise of Macedon", l: ["Boeotia"] },
    { y: -334, n: "Alexander's Invasion", l: ["Asia Minor"] },
    { y: -333, n: "Alexander's Campaign", l: ["Syria"] },
    { y: -331, n: "Battle of Gaugamela", l: ["Gaugamela", "Babylon", "Susa"] },
    { y: -329, n: "Central Asian Campaign", l: ["Bactria", "Sogdiana"] },
    { y: -326, n: "Indian Campaign", l: ["Indus"] },
    { y: -323, n: "Lamian War", l: ["Amorgos", "Crannon"] },
    { y: -321, n: "Perdiccas' War", l: ["Egypt", "Cappadocia"] },
    { y: -319, n: "Antigonus vs Eumenes", l: ["Asia Minor"] },
    { y: -317, n: "Antigonus vs Eumenes", l: ["Paraetacene"] },
    { y: -316, n: "Antigonus vs Eumenes", l: ["Gabiene"] },
    { y: -315, n: "3rd Diadochi War", l: ["Tyre", "Gaza"] },
    { y: -312, n: "Seleucid-Antigonid War", l: ["Mesopotamia", "Iran", "Gaza"] },
    { y: -307, n: "Demetrius' Campaigns", l: ["Athens", "Cyprus", "Salamis"] },
    { y: -305, n: "Siege of Rhodes", l: ["Rhodes"] },
    { y: -301, n: "Battle of Ipsus", l: ["Ipsus"] },
    { y: -288, n: "War for Macedonia", l: ["Macedonia"] },
    { y: -281, n: "War for Macedonia", l: ["Corupedium"] },
    { y: -280, n: "Pyrrhic War", l: ["Heraclea"] },
    { y: -279, n: "Gallic Invasions / Pyrrhic", l: ["Macedonia", "Delphi", "Asculum"] },
    { y: -275, n: "Pyrrhic War Ends", l: ["Beneventum", "Argos"] },
    { y: -274, n: "First Syrian War", l: ["Syria"] },
    { y: -267, n: "Chremonidean War", l: ["Athens", "Attica"] },
    { y: -260, n: "Second Syrian War", l: ["Cos", "Asia Minor"] },
    { y: -246, n: "Third Syrian War", l: ["Syria", "Babylon"] },
    { y: -222, n: "Cleomenean War", l: ["Sellasia"] },
    { y: -220, n: "Social War", l: ["Ambracus", "Psophis"] },
    { y: -219, n: "Fourth Syrian War", l: ["Seleucia"] },
    { y: -217, n: "Fourth Syrian War", l: ["Raphia"] }
  ]

  const amphoraeData = [
    { s: -480, e: -450, p: ["Chios", "NGR"], sec: ["Adriatic-Ionian", "SEA"], m: ["Corinth", "Lesbos"] },
    { s: -449, e: -380, p: ["Chios", "Mende", "NGR", "SEA"], sec: ["Adriatic-Ionian", "Lesbos", "Central Greece"], m: ["Corinth", "Erythrai", "Punic", "Italy"] },
    { s: -379, e: -340, p: ["Chios", "NGR", "SEA"], sec: ["Adriatic-Ionian"], m: ["Lesbos", "Mende"] },
    { s: -339, e: -240, p: ["NGR", "SEA", "Pontic"], sec: ["Chios", "Corinth", "Italy", "Central Greece"], m: ["Adriatic-Ionian", "Lesbos"] },
    { s: -239, e: -170, p: ["Rhodes", "Knidos"], sec: ["Punic", "Central Greece"], m: ["Cos", "SEA", "Chios", "NGR", "Italy", "Adriatic-Ionian", "Pontic"] }
  ]

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map
    const map = L.map(mapRef.current, {
      zoomControl: false,
      attributionControl: false,
      minZoom: 4,
      maxZoom: 8
    }).setView([37.0, 24.0], 5)

    mapInstanceRef.current = map

    // Add tile layer
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri',
      maxZoom: 8
    }).addTo(map)

    // Initialize layers
    const warLayer = L.layerGroup().addTo(map)
    const tradeLayer = L.layerGroup().addTo(map)
    const grainLayer = L.layerGroup().addTo(map)
    const weatherLayer = L.layerGroup().addTo(map)

    warLayerRef.current = warLayer
    tradeLayerRef.current = tradeLayer
    grainLayerRef.current = grainLayer
    weatherLayerRef.current = weatherLayer

    // Initialize city markers
    const cityMarkers = {}
    Object.keys(locationDb).forEach(name => {
      const isRegion = regionList.includes(name)
      
      let iconClass, iconSize, iconAnchor
      
      if (isRegion) {
        iconClass = 'region-icon'
        iconSize = [8, 8]
        iconAnchor = [4, 4]
      } else {
        iconClass = 'city-icon-style'
        iconSize = [5, 5]
        iconAnchor = [2.5, 2.5]
      }

      const icon = L.divIcon({
        className: iconClass,
        html: '',
        iconSize: iconSize,
        iconAnchor: iconAnchor
      })

      const marker = L.marker(locationDb[name], { icon: icon }).addTo(map)
        .bindTooltip(name, {
          permanent: true,
          direction: 'bottom',
          className: 'city-label'
        })
      
      cityMarkers[name] = marker
    })

    cityMarkersRef.current = cityMarkers

    // Initialize grain routes
    const dest = locationDb["Athens"]
    const sources = ["Egypt", "Cyrene", "Sicily", "Crimea"]
    
    sources.forEach(sourceName => {
      const src = locationDb[sourceName]
      if (src && dest) {
        L.polyline([src, dest], {
          color: 'black',
          weight: 2,
          opacity: 0.8
        }).addTo(grainLayer)

        const dLat = dest[0] - src[0]
        const dLng = dest[1] - src[1]
        const angleRad = Math.atan2(dLat, dLng)
        const angleDeg = angleRad * 180 / Math.PI
        const rotation = -angleDeg

        const arrowIcon = L.divIcon({
          className: 'arrow-icon',
          html: `<div style="transform: rotate(${rotation}deg); width: 12px; height: 12px;">
                  <svg viewBox="0 0 10 10" width="12" height="12">
                    <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="black" />
                  </svg>
                 </div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        })

        const midLat = (src[0] + dest[0]) / 2
        const midLng = (src[1] + dest[1]) / 2
        
        L.marker([midLat, midLng], { icon: arrowIcon }).addTo(grainLayer)
      }
    })

    // Initial render
    renderYear(-480)

    function getEventsForYear(year) {
      return rawEvents.filter(e => e.y === year)
    }

    function renderYear(year) {
      // Clear war layer
      warLayer.clearLayers()
      const events = getEventsForYear(year)
      const activeWarCities = []

      events.forEach(event => {
        event.l.forEach(locName => {
          activeWarCities.push(locName)
          const coords = locationDb[locName]
          if (coords) {
            const circle = L.circle(coords, {
              color: '#ef4444',
              fillColor: '#b91c1c',
              fillOpacity: 0.6,
              radius: 80000,
              className: 'pulse-animation'
            })
            
            circle.bindPopup(`
              <div style="color: #1f2937; padding: 4px; font-family: serif;">
                <strong style="color: #991b1b; display: block; text-transform: uppercase; font-size: 0.75rem; border-bottom: 1px solid #fecaca; margin-bottom: 4px;">Conflict</strong>
                <div style="font-size: 0.875rem; font-weight: bold;">${event.n}</div>
                <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">${locName}</div>
              </div>
            `)
            warLayer.addLayer(circle)
          }
        })
      })

// Manage city visibility
const showAllLocations = cityCheckboxRef.current?.checked || false

// Collect all unique sources from amphorae data and grain to keep them visible
const tradeSources = new Set()
amphoraeData.forEach(d => {
  [...d.p, ...d.sec, ...d.m].forEach(city => tradeSources.add(city))
})
const grainSources = ["Egypt", "Cyrene", "Sicily", "Crimea"]

Object.keys(cityMarkers).forEach(name => {
  const marker = cityMarkers[name]
  const isMain = mainCities.includes(name)
  const isAtWar = activeWarCities.includes(name)
  const isTradeSource = tradeSources.has(name)
  const isGrainSource = grainSources.includes(name)

  if (showAllLocations || isMain || isAtWar || isTradeSource || isGrainSource) {
    marker.setOpacity(1)
    if (marker.getTooltip()) {
      marker.openTooltip()
    }
  } else {
    marker.setOpacity(0)
    if (marker.getTooltip()) {
      marker.closeTooltip()
    }
  }
})

      // Render trade routes
      tradeLayer.clearLayers()
      
      const activeData = amphoraeData.find(d => year >= d.s && year <= d.e)

      if (activeData) {
        let hubs = ["Athens"]
        const hubCoords = hubs.map(h => locationDb[h]).filter(c => c)

        const drawRoutes = (sources, weight, opacity) => {
          sources.forEach(sourceName => {
            const sCoord = locationDb[sourceName]
            if (sCoord) {
              hubCoords.forEach(hCoord => {
                // Outline: Thicker black dashed line drawn first
                const outline = L.polyline([sCoord, hCoord], {
                  color: 'black',
                  weight: weight + 2,
                  opacity: opacity,
                  dashArray: '4, 8',
                  className: 'trade-route-anim'
                })
                tradeLayer.addLayer(outline)

                // Main: Thinner gold dashed line drawn on top
                const polyline = L.polyline([sCoord, hCoord], {
                  color: '#d4af37',
                  weight: weight,
                  opacity: opacity,
                  dashArray: '4, 8',
                  className: 'trade-route-anim'
                })
                tradeLayer.addLayer(polyline)
              })
            }
          })
        }

        drawRoutes(activeData.p, 3, 0.8)
        drawRoutes(activeData.sec, 2, 0.5)
        drawRoutes(activeData.m, 1, 0.3)
      }
    }

    // Function to render weather events (will be updated via ref)
    const renderWeatherEvents = (events) => {
      weatherLayer.clearLayers()

      // 1. 305–295 BCE Volcanic eruption cluster causing low Nile floods
      if (events.eruption305 && locationDb["Nile Delta"]) {
        const marker = L.circleMarker(locationDb["Nile Delta"], {
          radius: 18,
          fillColor: '#dc2626',
          color: '#991b1b',
          weight: 2,
          fillOpacity: 0.7
        })
        marker.bindPopup(`
          <div style="color: #1f2937; padding: 4px; font-family: serif;">
            <strong style="color: #991b1b; display: block; text-transform: uppercase; font-size: 0.75rem; border-bottom: 1px solid #fecaca; margin-bottom: 4px;">Volcanic Eruption Cluster</strong>
            <div style="font-size: 0.875rem; font-weight: bold;">305–295 BCE Eruption Cluster</div>
            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">305–295 BCE</div>
            <div style="font-size: 0.75rem; color: #374151; margin-top: 4px;">Volcanic eruption cluster causing low Nile floods in Egypt. Reduced grain production affected Mediterranean supply (Manning, Open Sea).</div>
          </div>
        `)
        weatherLayer.addLayer(marker)
      }

      // 2. 247 BCE Major volcanic eruption
      if (events.eruption247 && locationDb["Nile Delta"]) {
        const marker = L.circleMarker(locationDb["Nile Delta"], {
          radius: 16,
          fillColor: '#dc2626',
          color: '#991b1b',
          weight: 2,
          fillOpacity: 0.7
        })
        marker.bindPopup(`
          <div style="color: #1f2937; padding: 4px; font-family: serif;">
            <strong style="color: #991b1b; display: block; text-transform: uppercase; font-size: 0.75rem; border-bottom: 1px solid #fecaca; margin-bottom: 4px;">Volcanic Eruption</strong>
            <div style="font-size: 0.875rem; font-weight: bold;">247 BCE Major Eruption</div>
            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">247 BCE</div>
            <div style="font-size: 0.75rem; color: #374151; margin-top: 4px;">Major volcanic eruption causing multi-year Nile flood suppression (Manning).</div>
          </div>
        `)
        weatherLayer.addLayer(marker)
      }

      // 3. 209 BCE Volcanic event
      if (events.eruption209 && locationDb["Nile Delta"]) {
        const marker = L.circleMarker(locationDb["Nile Delta"], {
          radius: 14,
          fillColor: '#dc2626',
          color: '#991b1b',
          weight: 2,
          fillOpacity: 0.7
        })
        marker.bindPopup(`
          <div style="color: #1f2937; padding: 4px; font-family: serif;">
            <strong style="color: #991b1b; display: block; text-transform: uppercase; font-size: 0.75rem; border-bottom: 1px solid #fecaca; margin-bottom: 4px;">Volcanic Event</strong>
            <div style="font-size: 0.875rem; font-weight: bold;">209 BCE Volcanic Event</div>
            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">209 BCE</div>
            <div style="font-size: 0.75rem; color: #374151; margin-top: 4px;">Volcanic event reducing African monsoon, causing Nile flood failure (Manning).</div>
          </div>
        `)
        weatherLayer.addLayer(marker)
      }

      // 4. Annual Etesian Winds
      if (events.etesianWinds) {
        // Draw wind arrows across Aegean
        const windArrows = [
          { start: [40.0, 25.0], end: [35.0, 25.0] },
          { start: [39.0, 24.0], end: [34.0, 24.0] },
          { start: [38.0, 23.0], end: [33.0, 23.0] },
          { start: [37.0, 22.0], end: [32.0, 22.0] },
          { start: [36.0, 26.0], end: [31.0, 26.0] },
          { start: [35.0, 27.0], end: [30.0, 27.0] }
        ]
        windArrows.forEach(arrow => {
          const polyline = L.polyline([arrow.start, arrow.end], {
            color: '#3b82f6',
            weight: 2,
            opacity: 0.6
          })
          weatherLayer.addLayer(polyline)
          
          // Add arrowhead
          const dLat = arrow.end[0] - arrow.start[0]
          const dLng = arrow.end[1] - arrow.start[1]
          const angleRad = Math.atan2(dLat, dLng)
          const angleDeg = angleRad * 180 / Math.PI
          const rotation = -angleDeg
          
          const arrowIcon = L.divIcon({
            className: 'arrow-icon',
            html: `<div style="transform: rotate(${rotation}deg); width: 12px; height: 12px;">
                    <svg viewBox="0 0 10 10" width="12" height="12">
                      <path d="M0,0 L10,5 L0,10 L3,5 Z" fill="#3b82f6" />
                    </svg>
                   </div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6]
          })
          
          const midLat = (arrow.start[0] + arrow.end[0]) / 2
          const midLng = (arrow.start[1] + arrow.end[1]) / 2
          
          L.marker([midLat, midLng], { icon: arrowIcon }).addTo(weatherLayer)
        })
        // Add marker for label
        const marker = L.marker([37.5, 24.0], {
          icon: L.divIcon({
            className: 'wind-label',
            html: '<div style="background: rgba(59, 130, 246, 0.8); color: white; padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: bold;">Etesian Winds</div>',
            iconSize: [100, 20]
          })
        })
        marker.bindPopup(`
          <div style="color: #1f2937; padding: 4px; font-family: serif;">
            <strong style="color: #1e40af; display: block; text-transform: uppercase; font-size: 0.75rem; border-bottom: 1px solid #bfdbfe; margin-bottom: 4px;">Annual Wind Pattern</strong>
            <div style="font-size: 0.875rem; font-weight: bold;">Etesian Winds</div>
            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">May–September (Annual)</div>
            <div style="font-size: 0.75rem; color: #374151; margin-top: 4px;">Strong N→S winds slowing Egyptian grain ships in Aegean region (Horden & Purcell).</div>
          </div>
        `)
        weatherLayer.addLayer(marker)
      }

      // 5. ca. 230 BCE Methana volcanic eruption
      if (events.methana && locationDb["Methana"]) {
        const marker = L.circleMarker(locationDb["Methana"], {
          radius: 12,
          fillColor: '#dc2626',
          color: '#991b1b',
          weight: 2,
          fillOpacity: 0.7
        })
        marker.bindPopup(`
          <div style="color: #1f2937; padding: 4px; font-family: serif;">
            <strong style="color: #991b1b; display: block; text-transform: uppercase; font-size: 0.75rem; border-bottom: 1px solid #fecaca; margin-bottom: 4px;">Volcanic Eruption</strong>
            <div style="font-size: 0.875rem; font-weight: bold;">Methana Eruption</div>
            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">ca. 230 BCE</div>
            <div style="font-size: 0.75rem; color: #374151; margin-top: 4px;">Methana volcanic eruption (Pausanias 2.34.1), impacts Aegean weather.</div>
          </div>
        `)
        weatherLayer.addLayer(marker)
      }

      // 6. Attica Crop Risk
      if (events.atticaRisk && locationDb["Attica"]) {
        const marker = L.circleMarker(locationDb["Attica"], {
          radius: 15,
          fillColor: '#f59e0b',
          color: '#d97706',
          weight: 2,
          fillOpacity: 0.6
        })
        marker.bindPopup(`
          <div style="color: #1f2937; padding: 4px; font-family: serif;">
            <strong style="color: #d97706; display: block; text-transform: uppercase; font-size: 0.75rem; border-bottom: 1px solid #fde68a; margin-bottom: 4px;">Climate Risk</strong>
            <div style="font-size: 0.875rem; font-weight: bold;">Attica Crop Risk</div>
            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">Annual</div>
            <div style="font-size: 0.75rem; color: #374151; margin-top: 4px;">28% chance of wheat failure yearly due to drought variability (Manning, Table 1).</div>
          </div>
        `)
        weatherLayer.addLayer(marker)
      }

      // 7. 44 BCE Okmok mega-eruption
      if (events.okmok && locationDb["Okmok"]) {
        const marker = L.circleMarker(locationDb["Okmok"], {
          radius: 20,
          fillColor: '#dc2626',
          color: '#991b1b',
          weight: 3,
          fillOpacity: 0.8
        })
        marker.bindPopup(`
          <div style="color: #1f2937; padding: 4px; font-family: serif;">
            <strong style="color: #991b1b; display: block; text-transform: uppercase; font-size: 0.75rem; border-bottom: 1px solid #fecaca; margin-bottom: 4px;">Mega-Eruption</strong>
            <div style="font-size: 0.875rem; font-weight: bold;">Okmok Eruption</div>
            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">44 BCE</div>
            <div style="font-size: 0.75rem; color: #374151; margin-top: 4px;">Okmok mega-eruption causing severe Nile failure and famine; Cleopatra grain-decree (Manning; McConnell et al. PNAS).</div>
          </div>
        `)
        weatherLayer.addLayer(marker)
      }

      // 8. 250–150 BCE Recurrent droughts in Cyrenaica
      if (events.cyrenaica && locationDb["Cyrenaica"]) {
        const marker = L.circleMarker(locationDb["Cyrenaica"], {
          radius: 16,
          fillColor: '#f59e0b',
          color: '#d97706',
          weight: 2,
          fillOpacity: 0.6
        })
        marker.bindPopup(`
          <div style="color: #1f2937; padding: 4px; font-family: serif;">
            <strong style="color: #d97706; display: block; text-transform: uppercase; font-size: 0.75rem; border-bottom: 1px solid #fde68a; margin-bottom: 4px;">Recurrent Drought</strong>
            <div style="font-size: 0.875rem; font-weight: bold;">Cyrenaica Droughts</div>
            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">250–150 BCE</div>
            <div style="font-size: 0.75rem; color: #374151; margin-top: 4px;">Recurrent droughts in Cyrenaica affecting grain export (Horden & Purcell).</div>
          </div>
        `)
        weatherLayer.addLayer(marker)
      }

      // 9. Annual Black Sea storm seasons
      if (events.blackSeaStorms && locationDb["Black Sea"]) {
        const marker = L.circleMarker(locationDb["Black Sea"], {
          radius: 14,
          fillColor: '#3b82f6',
          color: '#1e40af',
          weight: 2,
          fillOpacity: 0.6
        })
        marker.bindPopup(`
          <div style="color: #1f2937; padding: 4px; font-family: serif;">
            <strong style="color: #1e40af; display: block; text-transform: uppercase; font-size: 0.75rem; border-bottom: 1px solid #bfdbfe; margin-bottom: 4px;">Annual Storm Season</strong>
            <div style="font-size: 0.875rem; font-weight: bold;">Black Sea Storms</div>
            <div style="font-size: 0.75rem; color: #6b7280; margin-top: 4px;">Annual</div>
            <div style="font-size: 0.75rem; color: #374151; margin-top: 4px;">Shipping delays and losses affecting Athens' supply (Casson).</div>
          </div>
        `)
        weatherLayer.addLayer(marker)
      }
    }

    // Store renderYear function and renderWeatherEvents
    const renderYearRef = { current: renderYear }
    const renderWeatherEventsRef = { 
      current: (events) => renderWeatherEvents(events)
    }
    window.renderYearRef = renderYearRef
    window.renderWeatherEventsRef = renderWeatherEventsRef

    // Initial render
    renderWeatherEvents({
      eruption305: false,
      eruption247: false,
      eruption209: false,
      etesianWinds: false,
      methana: false,
      atticaRisk: false,
      okmok: false,
      cyrenaica: false,
      blackSeaStorms: false
    })

    return () => {
      if (map) {
        map.remove()
      }
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current)
      }
      delete window.renderYearRef
    }
  }, [])

  useEffect(() => {
    if (window.renderYearRef?.current) {
      window.renderYearRef.current(currentYear)
    }
  }, [currentYear])

  useEffect(() => {
    if (window.renderWeatherEventsRef?.current) {
      window.renderWeatherEventsRef.current({
        eruption305: showEruption305,
        eruption247: showEruption247,
        eruption209: showEruption209,
        etesianWinds: showEtesianWinds,
        methana: showMethana,
        atticaRisk: showAtticaRisk,
        okmok: showOkmok,
        cyrenaica: showCyrenaica,
        blackSeaStorms: showBlackSeaStorms
      })
    }
  }, [showEruption305, showEruption247, showEruption209, showEtesianWinds, showMethana, showAtticaRisk, showOkmok, showCyrenaica, showBlackSeaStorms])

  const handleSliderChange = (e) => {
    if (isPlaying) stopSimulation()
    const year = parseInt(e.target.value)
    setCurrentYear(year)
  }

  const startSimulation = () => {
    setIsPlaying(true)
    playIntervalRef.current = setInterval(() => {
      setCurrentYear(prev => {
        if (prev >= -170) {
          return -480
        } else {
          return prev + 1
        }
      })
    }, 500)
  }

  const stopSimulation = () => {
    setIsPlaying(false)
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current)
    }
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      stopSimulation()
    } else {
      startSimulation()
    }
  }

  useEffect(() => {
    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="weather-page">
      <div id="map" ref={mapRef}></div>
      
      {/* Header Overlay */}
      <div className="header-overlay">
        <div className="glass-panel header-panel">
          <h1 className="header-title">Mediterranean Chronos</h1>
          <p className="header-subtitle">Classical & Hellenistic Era</p>
        </div>
      </div>

      {/* Bottom Timeline Control Panel */}
      <div className="timeline-panel">
        <div className="glass-panel timeline-container">
          <div className="timeline-header">
            <div>
              <span className="timeline-label">Current Year</span>
              <div className="year-display">
                <span className="year-value">{Math.abs(currentYear)} BC</span>
              </div>
            </div>
            
            <div className="play-button-container">
              <button 
                onClick={handlePlayPause}
                className={`play-button ${isPlaying ? 'playing' : ''}`}
              >
                {isPlaying ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                    </svg>
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                    </svg>
                    <span>Simulate</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="slider-container">
            <input
              type="range"
              min="-480"
              max="-170"
              value={currentYear}
              onChange={handleSliderChange}
              className="timeline-slider"
            />
            <div className="slider-labels">
              <span>480 BC</span>
              <span>325 BC</span>
              <span>170 BC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legend & Controls */}
      <div className="legend-panel">
        <div className="glass-panel legend-container">
          <h3 className="legend-title">Legend</h3>
          
          <div className="legend-item">
            <div className="legend-icon red-circle"></div>
            <span>Historical Conflict</span>
          </div>
          
          <div className="legend-item">
            <div className="legend-icon gold-line"></div>
            <span>Amphorae Trade Route</span>
          </div>
          <div className="legend-note">
            Thickness indicates abundance<br/>(High / Moderate / Low)
          </div>

          <div className="legend-item">
            <div className="legend-icon black-arrow"></div>
            <span>Grain Imports (Permanent)</span>
          </div>
          
          <div className="legend-divider"></div>
          
          <div className="legend-item">
            <div className="legend-icon white-circle"></div>
            <span>City / Settlement</span>
          </div>
          <div className="legend-item">
            <div className="legend-icon gold-diamond"></div>
            <span>Region / Province</span>
          </div>

          <div className="legend-divider"></div>
          
          <label className="toggle-label">
            <input
              type="checkbox"
              id="city-toggle"
              ref={cityCheckboxRef}
              onChange={() => {
                if (window.renderYearRef?.current) {
                  window.renderYearRef.current(currentYear)
                }
              }}
            />
            <span>Show All Locations</span>
          </label>
          <div className="legend-divider"></div>
          
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showWeatherPanel}
              onChange={(e) => setShowWeatherPanel(e.target.checked)}
            />
            <span>Show Weather Events</span>
          </label>
        </div>
      </div>

{/* Weather Events Panel */}
<div className={`weather-events-panel ${showWeatherPanel ? 'visible' : ''}`}>
        <style>{`
          /* Position and Size Overrides */
          .weather-events-panel {
            top: 20px !important;
            left: 20px !important;
            right: auto !important;
            bottom: auto !important;
            
            width: 280px;
            max-height: 70vh;
            
            border-radius: 12px !important;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
            z-index: 2000;
            font-family: 'Inter', sans-serif;

            /* Fade Transition Logic */
            opacity: 0;
            pointer-events: none;
            transform: translateY(-10px);
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
          }

          .weather-events-panel.visible {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
          }

          /* Ensure the inner container matches the roundness */
          .glass-panel.weather-events-container {
            border-radius: 12px !important;
            padding: 15px !important;
          }

          /* Custom Scrollbar */
          .weather-events-panel::-webkit-scrollbar {
            width: 4px;
          }
          .weather-events-panel::-webkit-scrollbar-track {
            background: transparent;
          }
          .weather-events-panel::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }

          .weather-events-title {
            font-size: 1rem;
            margin-bottom: 12px;
            font-weight: 600;
            color: #f3f4f6;
            text-align: left;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 8px;
          }

          .event-buttons-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 8px;
            margin-bottom: 12px;
          }
          .event-btn {
            background: rgba(31, 41, 55, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: #d1d5db;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s ease;
            display: flex;
            flex-direction: column;
          }
          .event-btn:hover {
            background: rgba(55, 65, 81, 0.8);
            border-color: rgba(255, 255, 255, 0.3);
          }
          .event-btn.active {
            background: rgba(180, 83, 9, 0.2);
            border-color: #ef4444;
            color: #f3f4f6;
          }
          .event-year-tag {
            font-size: 0.65rem;
            color: #9ca3af;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 2px;
          }
          .event-btn.active .event-year-tag {
            color: #fca5a5;
          }
          .event-label-text {
            font-size: 0.85rem;
            font-family: serif;
            line-height: 1.2;
          }
          .section-header {
            font-size: 0.7rem;
            text-transform: uppercase;
            color: #9ca3af;
            margin-bottom: 8px;
            margin-top: 12px;
            letter-spacing: 0.05em;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 2px;
          }
          
          .weather-toggle-label {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.85rem;
            color: #e5e7eb;
            cursor: pointer;
            padding: 6px 0;
          }
        `}</style>
        <div className="glass-panel weather-events-container">
          <h3 className="weather-events-title">Weather Events</h3>

          {/* Annual Section */}
          <div className="section-header" style={{ marginTop: 0 }}>Annual Conditions</div>

          <label className="weather-toggle-label">
            <input
              type="checkbox"
              checked={showEtesianWinds}
              onChange={(e) => setShowEtesianWinds(e.target.checked)}
            />
            <span>Etesian Winds</span>
          </label>

          <label className="weather-toggle-label">
            <input
              type="checkbox"
              checked={showAtticaRisk}
              onChange={(e) => setShowAtticaRisk(e.target.checked)}
            />
            <span>Attica Crop Risk</span>
          </label>

          <label className="weather-toggle-label">
            <input
              type="checkbox"
              checked={showBlackSeaStorms}
              onChange={(e) => setShowBlackSeaStorms(e.target.checked)}
            />
            <span>Black Sea Storms</span>
          </label>
          
          {/* Specific Events Section */}
          <div className="section-header">Major Events</div>
          
          <div className="event-buttons-grid">
            <button 
              className={`event-btn ${showEruption305 ? 'active' : ''}`}
              onClick={() => {
                setShowEruption247(false); setShowMethana(false); setShowEruption209(false); 
                setShowCyrenaica(false); setShowOkmok(false);
                const newState = !showEruption305
                setShowEruption305(newState)
                if (newState) setCurrentYear(-300)
              }}
            >
              <span className="event-year-tag">305–295 BCE</span>
              <span className="event-label-text">Nile Failure Cluster</span>
            </button>

            <button 
              className={`event-btn ${showEruption247 ? 'active' : ''}`}
              onClick={() => {
                setShowEruption305(false); setShowMethana(false); setShowEruption209(false); 
                setShowCyrenaica(false); setShowOkmok(false);
                const newState = !showEruption247
                setShowEruption247(newState)
                if (newState) setCurrentYear(-247)
              }}
            >
              <span className="event-year-tag">247 BCE</span>
              <span className="event-label-text">Major Volcanic Eruption</span>
            </button>

            <button 
              className={`event-btn ${showMethana ? 'active' : ''}`}
              onClick={() => {
                setShowEruption305(false); setShowEruption247(false); setShowEruption209(false); 
                setShowCyrenaica(false); setShowOkmok(false);
                const newState = !showMethana
                setShowMethana(newState)
                if (newState) setCurrentYear(-230)
              }}
            >
              <span className="event-year-tag">ca. 230 BCE</span>
              <span className="event-label-text">Methana Eruption</span>
            </button>

            <button 
              className={`event-btn ${showEruption209 ? 'active' : ''}`}
              onClick={() => {
                setShowEruption305(false); setShowEruption247(false); setShowMethana(false); 
                setShowCyrenaica(false); setShowOkmok(false);
                const newState = !showEruption209
                setShowEruption209(newState)
                if (newState) setCurrentYear(-209)
              }}
            >
              <span className="event-year-tag">209 BCE</span>
              <span className="event-label-text">African Monsoon Failure</span>
            </button>

            <button 
              className={`event-btn ${showCyrenaica ? 'active' : ''}`}
              onClick={() => {
                setShowEruption305(false); setShowEruption247(false); setShowMethana(false); 
                setShowEruption209(false); setShowOkmok(false);
                const newState = !showCyrenaica
                setShowCyrenaica(newState)
                if (newState) setCurrentYear(-200)
              }}
            >
              <span className="event-year-tag">250–150 BCE</span>
              <span className="event-label-text">Cyrenaica Droughts</span>
            </button>

            <button 
              className={`event-btn ${showOkmok ? 'active' : ''}`}
              onClick={() => {
                setShowEruption305(false); setShowEruption247(false); setShowMethana(false); 
                setShowEruption209(false); setShowCyrenaica(false);
                const newState = !showOkmok
                setShowOkmok(newState)
                if (newState) setCurrentYear(-44)
              }}
            >
              <span className="event-year-tag">44 BCE</span>
              <span className="event-label-text">Okmok Mega-Eruption</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather