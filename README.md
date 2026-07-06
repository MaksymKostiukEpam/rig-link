# RigLink

> A modern offshore logistics and operations dashboard built with React, TypeScript, Tailwind CSS and Leaflet.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)

---

## Overview

RigLink is a modern web application for monitoring offshore oil rigs, logistics, and warehouse operations.

The application provides an intuitive operational dashboard that allows operators to monitor offshore assets, visualize infrastructure on an interactive map, inspect rig details, and manage logistics requests.

This project was built as a frontend demonstration emphasizing:

- Modern UI/UX
- Interactive geospatial visualization
- Component-driven architecture
- Responsive design
- Dark/Light themes
- Clean TypeScript code

---

## Features

### Dashboard

- Operational overview
- Production metrics
- Fleet statistics
- Interactive world map
- Live status indicators

---

### Interactive Map

- Offshore rig locations
- Warehouse locations
- Custom animated markers
- Marker selection
- Information side panel
- Automatic map fitting
- Dark & Light map themes

---

### Rig Management

- Browse all rigs
- Status overview
- Production information
- Crew details
- Equipment information
- Individual rig pages

---

### Logistics

Each rig includes a logistics section where users can:

- View incoming shipments
- View outgoing shipments
- Request new supplies
- Choose cargo type
- Specify quantity
- Select transport method

---

### Warehouses *(Coming Soon)*

Future functionality includes:

- Warehouse inventory
- Capacity monitoring
- Stock transfers
- Inventory analytics

---

### Shipments *(Coming Soon)*

Future functionality includes:

- Shipment tracking
- Route planning
- Delivery history
- Cargo manifests
- ETA updates

---

## Technology Stack

### Frontend

- React
- TypeScript
- React Router
- Tailwind CSS

### UI

- shadcn/ui
- Lucide Icons

### Maps

- Leaflet
- React Leaflet

### Tooling

- Vite
- ESLint

---

## Project Structure

```
src/
│
├── app/
│   ├── layout/
│   └── router/
│
├── components/
│   ├── ui/
│   ├── map/
│   ├── dashboard/
│   └── logistics/
│
├── hooks/
│
├── pages/
│
├── types/
│
├── data/
│
└── lib/
```

---

## UI Highlights

- Modern glassmorphism inspired design
- Fully responsive layout
- Dark / Light mode
- Animated map markers
- Professional industrial color palette
- Smooth transitions
- Clean typography
- Consistent spacing system
- Accessible components

---

## Current Pages

| Page | Status |
|-------|--------|
| Dashboard | ✅ |
| Rigs | ✅ |
| Rig Details | ✅ |
| Logistics | ✅ |
| Interactive Map | ✅ |
| Shipments | 🚧 Coming Soon |
| Warehouses | 🚧 Coming Soon |

---

## Roadmap

Planned improvements include:

- Authentication
- Real-time updates
- Live vessel tracking
- Weather integration
- Inventory management
- Warehouse management
- Shipment lifecycle
- Notifications
- Charts & analytics
- Role-based permissions
- Search & filtering
- Mobile optimizations
- Backend API integration

---

## Running the Project

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Screenshots

> Add screenshots here.

- Dashboard
- Interactive Map
- Rig Details
- Logistics
- Dark Theme
- Light Theme

---

## Design Goals

RigLink aims to deliver an experience similar to modern industrial control software by focusing on:

- Fast information discovery
- Low visual clutter
- Clear operational status
- Smooth user interactions
- Professional enterprise aesthetics

---

## License

This project was created as a demonstration application and is intended for educational and portfolio purposes.