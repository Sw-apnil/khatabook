# 📒 Khaatabook – Mini Backend Project

Khaatabook is a simple file-based ledger application inspired by daily expense tracking.  
It allows users to create, view, edit, and delete daily **hisaab** entries using Node.js and Express, with data stored as `.txt` files.

This project was built as a **backend learning exercise** to understand routing, file system operations, and server-side rendering with EJS.

---

## 🚀 Features

- 📅 Create hisaab entries based on date (`DD-MM-YYYY`)
- 🧾 Store data in human-readable `.txt` files
- ✏️ Edit existing hisaab
- 👀 View hisaab in read-only mode
- 🗑️ Delete hisaab entries
- 🔁 Automatically handles multiple hisaabs on the same day  
  (e.g. `12-08-2024.txt`, `12-08-2024(2).txt`)
- 🎨 Clean UI using EJS and custom CSS

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Templating Engine:** EJS
- **Storage:** File System (`fs` module)
- **Styling:** CSS (served via Express static middleware)

---

## 📁 Project Structure

khaatabook/
│
├── app.js
├── package.json
│
├── hisaab/ # Stores all .txt files
│
├── views/
│ ├── index.ejs # Dashboard
│ ├── create.ejs # Create new hisaab
│ ├── view.ejs # View hisaab
│ └── edit.ejs # Edit hisaab
│
├── public/
│ └── style.css # Styling


---

## ⚙️ How It Works

1. **Create Hisaab**
   - User submits a form
   - Server generates a date-based filename
   - If a file already exists, `(2)`, `(3)` is appended
   - Data is saved as a `.txt` file

2. **View Hisaab**
   - Reads file content from disk
   - Displays it in read-only format

3. **Edit Hisaab**
   - Pre-fills existing data in a textarea
   - Updates file content on submission

4. **Delete Hisaab**
   - Removes the file from the filesystem

---

## ▶️ Running the Project Locally

```bash
# install dependencies
npm install

# start server
node app.js
