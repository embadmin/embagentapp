import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import tailwindcss from '@tailwindcss/vite';


// CHANGE THIS:
const repoName = 'embagentapp'; // same as your GitHub repo name

export default defineConfig({
  base: `/${repoName}/`, // ✅ this sets the correct base URL
  plugins: [react()],
});