# 🚀 Generative AI for UI Design Automation

A full-stack application that leverages Generative AI to convert user inputs such as text, voice, or sketches into responsive UI designs and code.

---

## 📌 Overview

This project demonstrates how Generative AI can automate UI design by generating frontend components dynamically from user inputs. It integrates AI models with a full-stack architecture to streamline UI development.

---

## 🧠 Features

* ✨ Convert text prompts into UI layouts
* 🎤 Support for multimodal input (text/voice/sketch) *(extendable)*
* ⚡ AI-powered UI generation
* 🌐 Full-stack architecture (Frontend + Backend)
* 🔌 API integration with OpenAI

---

## 🛠️ Tech Stack

### Frontend

* HTML / CSS / JavaScript *(or mention your framework: React, Tailwind, etc.)*

### Backend

* Node.js
* Express.js

### AI & Tools

* OpenAI API
* (Optional: Hugging Face / LLaVA / CodeLlama if used)

---

## 📂 Project Structure

```
generative-ai/
│── backend/
│   ├── index.js
│   ├── package.json
│   └── uploads/
│
│── frontend/
│   └── (UI files)
│
│── .env.example
│── .gitignore
│── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/AmirthaShreeK/Generative-ai-for-UI-design-automation.git
cd Generative-ai-for-UI-design-automation/generative-ai
```

---

### 2. Install dependencies

#### Backend

```
cd backend
npm install
```

#### Frontend

```
cd ../frontend
npm install
```

---

### 3. Setup environment variables

Create a `.env` file in the backend folder:

```
OPENAI_API_KEY=your-openai-api-key-here
```

⚠️ Do not share your API key publicly

---

### 4. Run the application

#### Start backend

```
cd backend
node index.js
```

#### Start frontend

```
cd frontend
npm start
```

---

## 🚀 Usage

1. Enter a UI description (e.g., "Create a login page with email and password")
2. The AI processes the input
3. Generated UI is displayed dynamically

---

## 🔐 Environment Variables

| Variable       | Description         |
| -------------- | ------------------- |
| OPENAI_API_KEY | Your OpenAI API key |

---


## 📜 License

This project is open-source and available under the MIT License.

---



⭐ If you found this project useful, give it a star!
