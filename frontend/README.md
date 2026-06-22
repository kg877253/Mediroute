<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

# MediRoute Client Interface

This package holds the graphical frontend interface constructed predominantly via **React**, styled beautifully with **Tailwind CSS**, and bundled seamlessly by **Vite**.

## 🎨 User Experience Directives
The presentation layer is intended for high cognitive clarity so that users managing clinical distress are logically driven towards their resolution loop in three distinct steps: Symptom definition, specialized rendering, and local doctor matching. 

## 🛠 Configuration

Before launching, assure that local environment variables are properly pointing towards an active instance of the MediRoute backend APIs.

```bash
# Clone example 
cp .env.example .env
```
Inside `.env`, verify: `<VITE_API_URL=http://localhost:5000>`

## 🚀 Execution

1. Build system dependencies
    ```bash
    npm install
    ```
2. Spawn local execution server
    ```bash
    npm run dev
    ```

3. To format output for deployment environments:
   ```bash
   npm run build
   ```

## 🌐 Deployed Operations

When migrating this repository to continuous deployment services such as Vercel, ensure you override the local local `VITE_API_URL` to route requests dynamically to the externally secured `Render` backend production server URL.
