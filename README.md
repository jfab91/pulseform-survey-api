# Pulseform Survey API

🚧 **This project is currently under active development.** Stay tuned for frequent updates and improvements.

Pulseform Survey API is a powerful, flexible, and scalable backend built with **NestJS** and **MongoDB**, designed to support the creation, deployment, and analysis of dynamic surveys.

---

## 🧩 Features (Planned & In Progress)

### ✅ Authentication & Roles

- JWT-based authentication
- Role-based access control

### 📝 Survey Management

- Create and manage dynamic surveys
- Multiple question types: short text, multiple choice, boolean, rating
- Survey visibility settings and expiration dates
- Shareable unique survey URLs

### 📥 Response Collection

- Save user responses
- Validate answers against dynamic survey schema
- Prevent duplicate submissions

### 📊 Analytics

- Aggregated statistics per question
- MongoDB aggregations for real-time insights
- Designed for easy integration with charting libraries

### 📦 Clean Architecture

- Modular NestJS structure
- DTO validation using `class-validator`
- Global error handling and input sanitization
- Swagger documentation for all endpoints

---

## 📌 Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT & Role Guards
- **Testing**: Jest (planned)
- **Docs**: Swagger (OpenAPI)

---

## 🚀 Project Status

This API is being built incrementally with clean, maintainable code. It’s an ongoing project designed to demonstrate backend architecture, API design, and dynamic schema management in MongoDB.

---
