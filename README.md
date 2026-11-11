# Clean Vehicle Solutions Limited (C.L.E.V.A.)

Official web platform for Clean Vehicle Solutions Limited (C.L.E.V.A.) showcasing our Next-Generation Passenger EV Standard and full vehicle portfolio.

## Tech Stack
- **HTML5 & CSS3** (Tailwind CSS v4 & custom responsive stylesheets)
- **TypeScript & JavaScript (ES6+)**
- **Vite** build system

---

## 🚀 How to Run Locally

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the local development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

---

## 📦 How to Upload to GitHub (Fixing "File size is big" error)

If GitHub failed with a **"file size is big"** or **"Yowza, that's a lot of files"** error, it is caused by trying to upload the `node_modules/` folder (which has over 20,000 files and 200MB+ of dependencies). You should **never upload `node_modules`** to GitHub; anyone cloning your repo will simply run `npm install`.

### Option A: Using Git CLI (Recommended)
Inside your local project folder in your terminal:
```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Add files (automatically ignores node_modules thanks to .gitignore)
git add .

# 3. Commit
git commit -m "Initial commit"

# 4. Set your main branch and remote repository
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Push cleanly to GitHub
git push -u origin main
```

### Option B: Uploading via GitHub Web Interface
If you prefer dragging and dropping files or uploading a ZIP:
1. Make sure to **delete or exclude the `node_modules` folder** before dragging your files or creating your upload ZIP.
2. Ensure you also exclude `dist/` if you previously ran `npm run build`.
3. Upload the remaining clean source files directly to GitHub.
