# Borena National Park — Starter Site

Scaffolded with Vite + React + Tailwind for rapid development.

Quick start

```bash
cd borena-site
npm install
npm run dev
```

Next steps

- Integrate Mapbox/Leaflet for interactive maps
	- Implemented Leaflet + react-leaflet map with sample POIs in `src/components/MapView.jsx`.

Run with Docker (no Node/npm required locally)

```bash
# build image and run container
docker build -t borena-site .
docker run --rm -p 5000:5000 borena-site

# or with docker-compose
docker compose up --build
```

After the container starts, open http://localhost:5000 to view the site.

Troubleshooting (Windows)

If the site won't run, check your environment with the bundled PowerShell helper:

```powershell
cd borena-site
.\scripts\check-env.ps1
```

Common issues:
- `npm` not found: install Node.js LTS (includes npm). Recommended via `winget`:

```powershell
winget install --id OpenJS.NodeJS.LTS -e
```

- `docker` not found: install Docker Desktop (requires virtualization enabled). Recommended via `winget`:

```powershell
winget install --id Docker.DockerDesktop -e
```

After installing, restart your terminal and run the check script again. Then use the Docker or npm instructions above to run the site.
- Add headless CMS (Sanity/Strapi) for content
- Implement booking/donation APIs and secure backend
- Add PWA support and image optimization
