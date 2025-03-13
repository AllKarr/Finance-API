# Finance API 📊💰

This is a RESTful API for managing financial transactions and budgets. It allows users to track income, expenses, and budgets while providing analytical insights.

## 🚀 Features
- Manage transactions (CRUD)
- Manage budgets (CRUD)
- Get transactions by category
- Calculate average spending per category
- Deployed version for easy access

---

## 📦 Installation & Setup

### 1. Clone the repository
```sh
git clone https://github.com/AllKarr/finance-api.git
cd finance-api
```

### 2. Install dependencies
```sh
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root folder and add:

```env
PORT=5050
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the development server
```sh
npm run dev
```

### 5. Build and start for production
```sh
npm run build
npm start
```

---

## 🌍 Deployed Version
The API is deployed on Render:

🔗 **Base URL:**  
[`https://finance-api-1.onrender.com/api/v1`](https://finance-api-1.onrender.com/api/v1)

---

## 📌 API Endpoints
All endpoints should be prefixed with `/api/v1`.

### 1️⃣ Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/transactions` | Get all transactions |
| **GET** | `/transactions/:id` | Get a single transaction by ID |
| **POST** | `/transactions` | Create a new transaction |
| **PUT** | `/transactions/:id` | Update a transaction |
| **DELETE** | `/transactions/:id` | Delete a transaction |
| **GET** | `/transactions/category/:category` | Get transactions by category |
| **GET** | `/transactions/average-spending` | Get average spending per category |

#### Example Requests
**Get all transactions:**
```sh
curl -X GET https://finance-api-1.onrender.com/api/v1/transactions
```

**Create a transaction:**
```sh
curl -X POST https://finance-api-1.onrender.com/api/v1/transactions \
     -H "Content-Type: application/json" \
     -d '{"description":"Salary","amount":3000,"category":"Income","type":"income"}'
```

---

### 2️⃣ Budgets
| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/budgets` | Get all budgets |
| **GET** | `/budgets/:id` | Get a single budget by ID |
| **POST** | `/budgets` | Create a new budget |
| **PUT** | `/budgets/:id` | Update a budget |
| **DELETE** | `/budgets/:id` | Delete a budget |
| **GET** | `/budgets/category/:category` | Get budgets by category |

#### Example Requests
**Get all budgets:**
```sh
curl -X GET https://finance-api-1.onrender.com/api/v1/budgets
```

**Create a budget:**
```sh
curl -X POST https://finance-api-1.onrender.com/api/v1/budgets \
     -H "Content-Type: application/json" \
     -d '{"category":"Food","limit":500}'
```

---

## 📜 License
Allen Karromi
