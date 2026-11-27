import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const root = process.cwd();

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: resolve(root, 'index.html'),
        about: resolve(root, 'about.html'),
        work: resolve(root, 'work.html'),
        skillsEducation: resolve(root, 'skills-education.html'),
        achievements: resolve(root, 'achievements.html'),
        contact: resolve(root, 'contact.html'),
      },
    },
  },
});
