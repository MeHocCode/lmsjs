# LMSJS — Library Management System JS
## Kế hoạch Triển khai (Implementation Guide)

---

## 🎯 Tổng quan

Dự án **LMSJS (Library Management System JS)** là hệ thống quản lý thư viện mini được xây dựng bằng React, dựa trên các bài học và patterns mà giảng viên đã dạy trong khóa FER202.

**Mục tiêu:** Lấy phong cách code và các pattern từ bài học của giảng viên làm nền tảng vững chắc, sau đó tùy chỉnh linh hoạt để phù hợp với thiết kế thực tế của team (ví dụ: đổi danh xưng "admin" thành "librarian", chuẩn hóa dữ liệu). Việc áp dụng code mẫu là để kế thừa kiến thức, không bắt buộc copy 100% một cách máy móc.

---

## 📚 Cấu trúc Module Học tập → Áp dụng

### MODULE 1: ES6 & JavaScript Foundation
**Nguồn học:** `Module1_JS_ES6/`

**Kiến thức áp dụng:**
- Arrow functions (`2_arrow_function.js`)
- Array methods: map, filter, find (`5_array_object.js`)
- Destructuring (`6_destructuring.js`)
- Spread/Rest operators (`4_rest_spead.js`)
- Import/Export modules (`8_using_module.js`)

**Áp dụng vào LMSJS:**
- Tất cả services (bookService.js, memberService.js, borrowRecordService.js)
- Data transformations trong components
- Event handlers sử dụng arrow functions

---

### MODULE 2: UI Design với Bootstrap
**Nguồn học:** `Module2_UI_Design/exercise6/`

**Patterns học được:**


#### 1. Layout Structure với Bootstrap Grid
**File tham khảo:** `exercise6/src/App.js`

```javascript
// Pattern: Container-fluid + Row + Col responsive
<div className="container-fluid main-container">
  <div className="row header-row">
    <div className="col-12 col-lg-6">...</div>
  </div>
</div>
```

**Áp dụng vào LMSJS:**
- `src/pages/HomePage.jsx` — Layout tổng
- `src/pages/BooksPage.jsx` — Danh sách sách với grid responsive
- `src/pages/librarian/LibrarianBooksPage.jsx` — Librarian layout

#### 2. Product Card Pattern → Book Card
**File tham khảo:** `exercise6/src/App.js` (dòng 37-58)

```javascript
// Pattern: Card với image placeholder, thông tin và actions
<div className="product-card">
  {product.sale && <div className="product-ribbon">Sale</div>}
  <div className="product-img-placeholder">
    <img src={product.image} alt={product.name} />
  </div>
  <div className="product-body">
    <div className="product-name">{product.name}</div>
    <div className="product-price-row">
      <span className="price-old">{product.oldPrice}</span>
      <span className="price-new">{product.newPrice}</span>
    </div>
    <div className="product-actions">
      <button className="btn-cart">🛒</button>
      <button className="btn-detail">Xem chi tiết</button>
    </div>
  </div>
</div>
```

**Áp dụng vào LMSJS:**


- **`src/components/book/BookCard.jsx`** — Thay thế product → book

```javascript
// LMSJS BookCard.jsx (dựa trên exercise6 pattern)
<div className="book-card">
  {book.availableCopies === 0 && <div className="book-ribbon">Hết sách</div>}
  <div className="book-img-placeholder">
    <img src={book.coverImage || '/placeholder-book.png'} alt={book.title} />
  </div>
  <div className="book-body">
    <div className="book-title">{book.title}</div>
    <div className="book-author">{book.author}</div>
    <div className="book-availability">
      Còn: {book.availableCopies}/{book.totalCopies}
    </div>
    <div className="book-actions">
      <button className="btn btn-primary btn-sm">Chi tiết</button>
    </div>
  </div>
</div>
```

#### 3. Data Structure Pattern
**File tham khảo:** `exercise6/src/data.js`

```javascript
const data = [
  { id: 1, name: "Product 1", oldPrice: "100,000 vnd", ... },
];
export default data;
```

**Áp dụng vào LMSJS:**
- **`src/data/mockBooks.js`** — Dữ liệu mẫu cho testing
- **`src/data/mockMembers.js`** — Dữ liệu member mẫu

#### 4. Search Bar Pattern
**File tham khảo:** `exercise6/src/App.js` (dòng 16-19)

```javascript
<div className="col-12 col-lg-6 search-box">
  <input type="text" className="form-control search-input" placeholder="Search" />
  <button type="button" className="btn btn-outline-primary search-btn">Search</button>
</div>
```

**Áp dụng vào LMSJS:**
- **`src/components/common/SearchBar.jsx`**


---

### MODULE 3: State & Props Management
**Nguồn học:** `Exercies/exercies11/src/components/`

#### 1. useState Hook Pattern — TodoApp
**File tham khảo:** `exercies11/src/components/TodoApp.jsx`

**Patterns học được:**
```javascript
// 1. Multiple useState declarations
const [tasks, setTasks] = useState([]);
const [input, setInput] = useState('');

// 2. Array state updates (immutable)
const addTask = () => {
  if (input.trim() !== '') {
    setTasks([...tasks, input]);  // Spread operator để copy array
    setInput('');
  }
};

// 3. Filter để delete
const deleteTask = (indexToDelete) => {
  setTasks(tasks.filter((_, index) => index !== indexToDelete));
};

// 4. Controlled input
<input
  value={input}
  onChange={(e) => setInput(e.target.value)}
/>

// 5. Map với key prop
{tasks.map((task, index) => (
  <li key={index}>
    <span>{task}</span>
    <button onClick={() => deleteTask(index)}>Delete</button>
  </li>
))}
```

**Áp dụng vào LMSJS:**

✅ **`src/components/book/BookForm.jsx`** — CRUD Book
- State: `title, author, categoryId, totalCopies`
- Pattern: Controlled inputs y hệt TodoApp

✅ **`src/components/member/MemberForm.jsx`** — CRUD Member
- State: `name, email, phone`

✅ **`src/components/borrowRecord/BorrowRecordForm.jsx`**
- State: `selectedMember, selectedBook, dueDate`


#### 2. useState với Conditional Rendering — Calculator
**File tham khảo:** `exercies11/src/components/Calculator.jsx`

**Patterns học được:**
```javascript
// 1. Multiple related states
const [num1, setNum1] = useState('');
const [num2, setNum2] = useState('');
const [operator, setOperator] = useState('+');
const [result, setResult] = useState(null);

// 2. Validation logic
const calculateResult = () => {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);
  
  if (isNaN(n1) || isNaN(n2)) {
    setResult('Vui lòng nhập số hợp lệ');
    return;
  }
  // ... logic
};

// 3. Conditional rendering với &&
{result !== null && (
  <div className="alert alert-info">
    Result: {result}
  </div>
)}

// 4. Select controlled component
<select value={operator} onChange={(e) => setOperator(e.target.value)}>
  <option value="+">+</option>
  <option value="-">-</option>
</select>
```

**Áp dụng vào LMSJS:**

✅ **`src/components/common/FilterPanel.jsx`**
- State: `selectedCategory, availabilityFilter`
- Pattern: Select dropdown giống Calculator

✅ **`src/components/borrowRecord/BorrowRecordForm.jsx`**
- Validation: Kiểm tra book có available không
- Error messages: Hiển thị lỗi như Calculator


#### 3. Search/Filter Pattern — SearchFilter Component
**File tham khảo:** `exercies11/src/components/SearchFilter.jsx`

**Patterns học được:**
```javascript
// 1. Static data + search term state
const initialItems = ['ReactJS', 'NodeJS / Express', ...];
const [searchTerm, setSearchTerm] = useState('');

// 2. Computed/derived state (không cần useState riêng)
const filteredItems = initialItems.filter((item) =>
  item.toLowerCase().includes(searchTerm.toLowerCase())
);

// 3. Empty state handling
{filteredItems.length > 0 ? (
  filteredItems.map((item, index) => <li key={index}>{item}</li>)
) : (
  <li className="list-group-item text-danger text-center">
    No items match your search.
  </li>
)}
```

**Áp dụng vào LMSJS:**

✅ **`src/components/common/SearchBar.jsx`**
```javascript
// Copy 100% pattern từ SearchFilter
const [searchTerm, setSearchTerm] = useState('');

// Parent component sẽ nhận searchTerm qua props callback
<SearchBar onSearch={(term) => setSearchTerm(term)} />
```

✅ **`src/components/book/BookList.jsx`**
```javascript
// Computed filtering logic
const filteredBooks = books.filter((book) => {
  const matchSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      book.author.toLowerCase().includes(searchTerm.toLowerCase());
  const matchCategory = !selectedCategory || book.categoryId === selectedCategory;
  const matchAvailability = availabilityFilter === 'all' || 
                           (availabilityFilter === 'available' && book.availableCopies > 0);
  return matchSearch && matchCategory && matchAvailability;
});
```


#### 4. Bootstrap Styling Consistency
**Tất cả 3 components trong exercies11 đều dùng:**

```javascript
// Card wrapper
<div className="card shadow-sm p-4 mb-4">
  <h3 className="card-title text-primary mb-3">Title</h3>
  
  // Input group
  <div className="input-group mb-3">
    <input type="text" className="form-control" />
    <button className="btn btn-primary">Button</button>
  </div>
  
  // List group
  <ul className="list-group">
    <li className="list-group-item d-flex justify-content-between">
      <span>Content</span>
      <button className="btn btn-danger btn-sm">Action</button>
    </li>
  </ul>
</div>
```

**Áp dụng vào LMSJS:**
- Tất cả form components dùng `card shadow-sm p-4`
- Buttons: `btn btn-primary`, `btn btn-success`, `btn btn-danger btn-sm`
- Lists: `list-group` + `list-group-item`
- Inputs: `form-control`, `input-group`

---

### MODULE 4: Component Structure & Props
**Nguồn học:** `Module3_React_Component/lab2/src/components/`

#### Component Hierarchy Pattern
**File tham khảo:** `lab2/src/App.js` + `components/Main.jsx`

```javascript
// App.js — Top level
function App() {
  return (
    <div className="container">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

// Content.jsx — Middle level
class Content extends React.Component {
  render() {
    return (
      <div className="row">
        <ContentHeader />
        <Main />
      </div>
    );
  }
}

// Main.jsx — Layout level
class Main extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-8"><ProductList /></div>
        <div className="col-4"><ProductUpdate /></div>
      </div>
    );
  }
}
```

**Áp dụng vào LMSJS:**


✅ **`src/pages/librarian/LibrarianBooksPage.jsx`**
```javascript
// Giống Main.jsx pattern
function LibrarianBooksPage() {
  return (
    <div className="row">
      <div className="col-8">
        <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      <div className="col-4">
        <BookForm book={selectedBook} onSave={handleSave} />
      </div>
    </div>
  );
}
```

✅ **`src/pages/librarian/LibrarianBorrowRecordsPage.jsx`**
```javascript
function LibrarianBorrowRecordsPage() {
  return (
    <div className="row">
      <div className="col-12 mb-3">
        <BorrowRecordForm onSubmit={handleCreateRecord} />
      </div>
      <div className="col-12">
        <BorrowRecordTable records={records} onReturn={handleReturn} />
      </div>
    </div>
  );
}
```

**Lưu ý:** Giảng viên dùng **Class Components** trong Module 3, nhưng Module 4 chuyển sang **Function Components với Hooks**. LMSJS sẽ dùng **Function Components 100%** theo Module 4.

---

### MODULE 5: React Router v6
**Nguồn học:** `Module4_React_Communitcation_REST_API/work_api/src/App.js`

#### Router Setup Pattern
**File tham khảo:** `work_api/src/App.js`

```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Menu />
        <div className="row">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/home" element={<Main />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
          <Aside />
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
```


**Áp dụng vào LMSJS:**

✅ **`src/App.js`**
```javascript
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/common/Navbar";
import HomePage from "./pages/HomePage";
import BooksPage from "./pages/BooksPage";
import BookDetailPage from "./pages/BookDetailPage";
import LoginPage from "./pages/LoginPage";
import MyBorrowRecordsPage from "./pages/MyBorrowRecordsPage";
import LibrarianBooksPage from "./pages/librarian/LibrarianBooksPage";
import LibrarianCategoriesPage from "./pages/librarian/LibrarianCategoriesPage";
import LibrarianMembersPage from "./pages/librarian/LibrarianMembersPage";
import LibrarianBorrowRecordsPage from "./pages/librarian/LibrarianBorrowRecordsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/my-borrow-records" element={<MyBorrowRecordsPage />} />
            
            {/* Librarian Routes */}
            <Route path="/librarian/books" element={<LibrarianBooksPage />} />
            <Route path="/librarian/categories" element={<LibrarianCategoriesPage />} />
            <Route path="/librarian/members" element={<LibrarianMembersPage />} />
            <Route path="/librarian/borrow-records" element={<LibrarianBorrowRecordsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
```

#### Navigation với Link
**File tham khảo:** `work_api/src/templates/Menu.jsx`

```javascript
import { Link } from 'react-router-dom'

export default function Menu() {
  return (
    <ul>
      <li><Link to="/home">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/contact">Contact</Link></li>
    </ul>
  );
}
```


**Áp dụng vào LMSJS:**

✅ **`src/components/common/Navbar.jsx`**
```javascript
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">LMSJS</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">Books</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/my-borrow-records">My Records</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
```

#### useNavigate Hook
**File tham khảo:** `work_api/src/pages/SignIn.jsx` (dòng 9, 40)

```javascript
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate();
  
  const handleSignIn = async () => {
    // ... authentication logic
    if (role === "customer") {
      navigate("/home")
    }
  }
}
```

**Áp dụng vào LMSJS:**
- **`src/pages/LoginPage.jsx`** — Redirect sau khi login thành công
- **`src/components/book/BookForm.jsx`** — Redirect về list sau khi save
- **`src/pages/admin/AdminBorrowRecordsPage.jsx`** — Redirect sau khi tạo BorrowRecord


---

### MODULE 6: API Communication với Axios & useEffect
**Nguồn học:** `Module4_React_Communitcation_REST_API/work_api/`

#### Authentication Pattern với Axios
**File tham khảo:** `work_api/src/pages/SignIn.jsx`

**Patterns học được:**
```javascript
import { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msgError, setMsgError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      // 1. Gửi request với query params
      const response = await axios.get(
        `http://localhost:9999/users?email=${email}&password=${password}`
      )
      
      // 2. Kiểm tra response
      const users = response.data
      if (users.length === 0) {
        setMsgError("This account not exist!");
      } else {
        const existUser = users[0]
        
        // 3. Lưu vào localStorage
        localStorage.setItem(
          'account',
          JSON.stringify({
            uId: existUser.id,
            role: existUser.role,
            name: existUser.fullname
          })
        )
        
        // 4. Navigate dựa vào role
        if (existUser.role === "customer") {
          navigate("/home")
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {msgError && <div className="alert alert-danger">{msgError}</div>}
      <Form>
        <Form.Control onChange={e => setEmail(e.target.value)} />
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        <Button onClick={() => handleSignIn()}>Login</Button>
      </Form>
    </div>
  )
}
```


**Áp dụng vào LMSJS:**

✅ **`src/pages/LoginPage.jsx`** — Copy 100% pattern từ SignIn.jsx

```javascript
import { useState } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msgError, setMsgError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9999/users?email=${email}&password=${password}`
      )
      
      const users = response.data
      if (users.length === 0) {
        setMsgError("Email hoặc mật khẩu không đúng!");
      } else {
        const existUser = users[0]
        localStorage.setItem('account', JSON.stringify({
          uId: existUser.id,
          role: existUser.role,
          name: existUser.fullname
        }))
        
        // Redirect dựa vào role
        if (existUser.role === "librarian") {
          navigate("/librarian/books")
        } else if (existUser.role === "member") {
          navigate("/books")
        }
      }
    } catch (error) {
      console.log(error);
      setMsgError("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  }

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card shadow-sm p-4">
        <h3 className="card-title text-primary mb-3">Đăng nhập</h3>
        {msgError && <div className="alert alert-danger">{msgError}</div>}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            onChange={e => setEmail(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            onChange={e => setPassword(e.target.value)} 
          />
        </div>
        <button 
          className="btn btn-primary" 
          onClick={handleLogin}
        >
          Đăng nhập
        </button>
      </div>
    </div>
  )
}
```

#### useEffect Pattern cho Fetch Data
**File tham khảo:** `work_api/src/pages/SignIn.jsx` (dòng 12-24, đã comment)

```javascript
// Pattern được thầy comment nhưng vẫn dạy:
useEffect(() => {
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:9999/users")
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }
  getUser();
}, [])
```

**Áp dụng vào LMSJS:**

✅ **`src/pages/BooksPage.jsx`** — Fetch books list

```javascript
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const response = await axios.get("http://localhost:9999/books")
        setBooks(response.data)
      } catch (error) {
        console.log(error)
        setError("Không thể tải danh sách sách!")
      } finally {
        setLoading(false)
      }
    }
    fetchBooks();
  }, [])

  if (loading) return <div className="text-center">Đang tải...</div>
  if (error) return <div className="alert alert-danger">{error}</div>

  return (
    <div>
      <h2>Danh sách sách</h2>
      <BookList books={books} />
    </div>
  )
}
```

#### JSON-Server Database Structure
**File tham khảo:** `work_api/database.json`

```json
{
  "users": [
    { "id": 1, "email": "user1@gmail.com", "password": "abc1", 
      "fullname": "Customer 1", "role": "customer" }
  ],
  "product": [],
  "category": [],
  "supliers": []
}
```


**Áp dụng vào LMSJS:**

✅ **`database.json`** — JSON-Server database cho LMSJS

```json
{
  "users": [
    {
      "id": 1,
      "email": "librarian@lmsjs.com",
      "password": "admin123",
      "fullname": "Thủ thư chính",
      "role": "librarian"
    },
    {
      "id": 2,
      "email": "member@lmsjs.com",
      "password": "member123",
      "fullname": "Độc giả 1",
      "role": "member"
    }
  ],
  "categories": [
    { "id": 1, "name": "Công nghệ" },
    { "id": 2, "name": "Văn học" }
  ],
  "books": [
    {
      "id": 1,
      "title": "Clean Code",
      "author": "Robert C. Martin",
      "categoryId": 1,
      "totalCopies": 5,
      "availableCopies": 3,
      "coverImage": "/images/clean-code.jpg"
    },
    {
      "id": 2,
      "title": "Đắc Nhân Tâm",
      "author": "Dale Carnegie",
      "categoryId": 2,
      "totalCopies": 4,
      "availableCopies": 0,
      "coverImage": "/images/dac-nhan-tam.jpg"
    }
  ],
  "members": [
    {
      "id": 1,
      "name": "Nguyễn Văn A",
      "email": "member@lmsjs.com",
      "phone": "0912345678",
      "userId": 2
    }
  ],
  "borrowRecords": [
    {
      "id": 1,
      "bookId": 1,
      "memberId": 1,
      "borrowDate": "2026-06-15",
      "dueDate": "2026-06-29",
      "returnDate": null,
      "status": "borrowed"
    },
    {
      "id": 2,
      "bookId": 2,
      "memberId": 1,
      "borrowDate": "2026-06-01",
      "dueDate": "2026-06-15",
      "returnDate": "2026-06-14",
      "status": "returned"
    }
  ]
}
```

**Khởi động JSON-Server:**
```bash
npx json-server --watch database.json --port 9999
```

---

### MODULE 7: Context API (Global State Management)
**Nguồn học:** Dựa vào Exercise 14 (useContext.docx)

#### AuthContext Pattern

**Áp dụng vào LMSJS:**

✅ **`src/context/AuthContext.jsx`**

```javascript
import { createContext, useState, useEffect, useContext } from 'react';

// 1. Tạo Context
const AuthContext = createContext();

// 2. Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 3. Load user từ localStorage khi mount
  useEffect(() => {

    const storedAccount = localStorage.getItem('account');
    if (storedAccount) {
      setUser(JSON.parse(storedAccount));
    }
    setLoading(false);
  }, []);

  // 4. Login function
  const login = (userData) => {
    localStorage.setItem('account', JSON.stringify(userData));
    setUser(userData);
  };

  // 5. Logout function
  const logout = () => {
    localStorage.removeItem('account');
    setUser(null);
  };

  // 6. Helper functions
  const isLibrarian = () => user?.role === 'librarian';
  const isMember = () => user?.role === 'member';
  const isAuthenticated = () => user !== null;

  const value = {
    user,
    loading,
    login,
    logout,
    isLibrarian,
    isMember,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 7. Custom hook để sử dụng Context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```


#### Sử dụng AuthContext trong App

✅ **`src/App.js`** — Wrap toàn bộ app với AuthProvider

```javascript
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="container-fluid">
          <Navbar />
          {/* ... Routes ... */}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

✅ **`src/pages/LoginPage.jsx`** — Sử dụng useAuth

```javascript
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const response = await axios.get(/*...*/);
      const existUser = response.data[0];
      
      // Dùng login từ Context thay vì localStorage trực tiếp
      login({
        uId: existUser.id,
        role: existUser.role,
        name: existUser.fullname
      });
      
      // Navigate
      if (existUser.role === "librarian") {
        navigate("/admin/books")
      } else {
        navigate("/books")
      }
    } catch (error) {
      console.log(error);
    }
  }
}
```


✅ **`src/components/common/Navbar.jsx`** — Hiển thị menu dựa vào role

```javascript
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const { user, isLibrarian, isMember, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">LMSJS</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">Books</Link>
            </li>
            
            {/* Member only */}
            {isMember() && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-borrow-records">
                  My Records
                </Link>
              </li>
            )}
            
            {/* Librarian only */}
            {isLibrarian() && (
              <>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                    Quản lý (Librarian)
                  </a>
                  <ul className="dropdown-menu">

                    <li><Link className="dropdown-item" to="/librarian/books">Books</Link></li>
                    <li><Link className="dropdown-item" to="/librarian/categories">Categories</Link></li>
                    <li><Link className="dropdown-item" to="/librarian/members">Members</Link></li>
                    <li><Link className="dropdown-item" to="/librarian/borrow-records">Borrow Records</Link></li>
                  </ul>
                </li>
              </>
            )}
          </ul>
          
          {/* Auth buttons */}
          <ul className="navbar-nav">
            {isAuthenticated() ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Xin chào, {user?.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Đăng nhập</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
```

#### Protected Route Pattern

✅ **`src/components/common/ProtectedRoute.jsx`**

```javascript
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, requireLibrarian = false }) {

  const { isAuthenticated, isLibrarian } = useAuth();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requireLibrarian && !isLibrarian()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
```

✅ **`src/App.js`** — Áp dụng ProtectedRoute

```javascript
import ProtectedRoute from "./components/common/ProtectedRoute";

<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/books" element={<BooksPage />} />
  <Route path="/login" element={<LoginPage />} />
  
  {/* Member protected route */}
  <Route 
    path="/my-borrow-records" 
    element={
      <ProtectedRoute>
        <MyBorrowRecordsPage />
      </ProtectedRoute>
    } 
  />
  
  {/* Librarian protected routes */}
  <Route 
    path="/librarian/books" 
    element={
      <ProtectedRoute requireLibrarian={true}>
        <LibrarianBooksPage />
      </ProtectedRoute>
    } 
  />
  {/* ... other librarian routes ... */}
</Routes>
```

---

## 📦 Service Layer Pattern

### Axios Base Configuration

✅ **`src/services/api.js`**

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9999',

  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Response interceptor để xử lý lỗi chung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default api;
```

### Book Service

✅ **`src/services/bookService.js`**

```javascript
import api from './api';

const bookService = {
  // GET all books
  getAllBooks: async () => {
    try {
      const response = await api.get('/books');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET book by ID
  getBookById: async (id) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // CREATE book
  createBook: async (bookData) => {
    try {
      const response = await api.post('/books', bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  // UPDATE book
  updateBook: async (id, bookData) => {
    try {
      const response = await api.put(`/books/${id}`, bookData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE book
  deleteBook: async (id) => {
    try {
      await api.delete(`/books/${id}`);
      return true;
    } catch (error) {
      throw error;
    }
  },

  // SEARCH books (query params)
  searchBooks: async (searchTerm) => {
    try {
      const response = await api.get(`/books?q=${searchTerm}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // FILTER by category
  getBooksByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/books?categoryId=${categoryId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default bookService;
```

### BorrowRecord Service

✅ **`src/services/borrowRecordService.js`**

```javascript
import api from './api';
import bookService from './bookService';

const borrowRecordService = {

  // CREATE borrow record (mượn sách)
  createBorrowRecord: async (recordData) => {
    try {
      // 1. Tạo borrow record
      const response = await api.post('/borrowRecords', {
        ...recordData,
        borrowDate: new Date().toISOString().split('T')[0],
        returnDate: null,
        status: 'borrowed'
      });

      // 2. Cập nhật availableCopies của book (giảm 1)
      const book = await bookService.getBookById(recordData.bookId);
      await bookService.updateBook(recordData.bookId, {
        ...book,
        availableCopies: book.availableCopies - 1
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // RETURN book (trả sách)
  returnBook: async (recordId) => {
    try {
      // 1. Lấy thông tin borrow record
      const recordResponse = await api.get(`/borrowRecords/${recordId}`);
      const record = recordResponse.data;

      // 2. Cập nhật borrow record
      await api.patch(`/borrowRecords/${recordId}`, {
        returnDate: new Date().toISOString().split('T')[0],
        status: 'returned'
      });

      // 3. Cập nhật availableCopies của book (tăng 1)
      const book = await bookService.getBookById(record.bookId);
      await bookService.updateBook(record.bookId, {
        ...book,
        availableCopies: book.availableCopies + 1
      });

      return true;
    } catch (error) {
      throw error;
    }
  },

  // GET all borrow records
  getAllRecords: async () => {
    try {
      const response = await api.get('/borrowRecords?_expand=book&_expand=member');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // GET records by member
  getRecordsByMember: async (memberId) => {
    try {
      const response = await api.get(`/borrowRecords?memberId=${memberId}&_expand=book`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default borrowRecordService;
```

---

## 🗂️ Component Implementation Checklist

### Common Components

#### ✅ SearchBar.jsx
**Pattern nguồn:** `exercies11/SearchFilter.jsx`
- Controlled input với useState
- onChange handler để update search term
- Props: `onSearch` callback để pass search term lên parent

#### ✅ FilterPanel.jsx
**Pattern nguồn:** `exercies11/Calculator.jsx` (select dropdown)
- useState cho `selectedCategory` và `availabilityFilter`
- Select dropdowns với Bootstrap form-select
- Props: `categories`, `onFilterChange` callback

#### ✅ Pagination.jsx
**Pattern nguồn:** Bootstrap pagination component
- Props: `currentPage`, `totalPages`, `onPageChange`
- Bootstrap pagination classes


#### ✅ DataTable.jsx
**Pattern nguồn:** `lab2/ProductList.jsx` + Bootstrap table
- Props: `data`, `columns`, `onEdit`, `onDelete`
- Bootstrap table classes: `table table-striped table-hover`

#### ✅ LoadingSpinner.jsx
**Pattern nguồn:** Bootstrap spinner
```javascript
export default function LoadingSpinner() {
  return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
```

#### ✅ ErrorMessage.jsx
**Pattern nguồn:** SignIn.jsx error handling
```javascript
export default function ErrorMessage({ message }) {
  if (!message) return null;
  return <div className="alert alert-danger">{message}</div>;
}
```

#### ✅ Sidebar.jsx
**Pattern nguồn:** Bootstrap nav-pills vertical — chỉ hiển với Librarian
```javascript
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="d-flex flex-column p-3 bg-light" style={{ minHeight: '100vh', width: '220px' }}>
      <h6 className="text-muted text-uppercase mb-3">Quản lý</h6>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/librarian/books">Books</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/librarian/categories">Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/librarian/members">Members</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/librarian/borrow-records">Mượn/Trả Sách</NavLink>
        </li>
      </ul>
    </div>
  );
}
```
- Dùng `NavLink` để tự highlight route đang active (Bootstrap class `.active`)
- Bọc Sidebar trong Librarian layout pages, không hiển cho Member/Guest

#### ✅ ConfirmModal.jsx
**Pattern nguồn:** Bootstrap Modal component — thay thế `window.confirm()`
```javascript
export default function ConfirmModal({ show, message, onConfirm, onCancel }) {
  if (!show) return null;
  return (
    <div className="modal show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Xác nhận</h5>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>Hủy</button>
            <button className="btn btn-danger" onClick={onConfirm}>Xác nhận</button>
          </div>
        </div>
      </div>
    </div>
  );
}
```
- Props: `show` (boolean), `message` (string), `onConfirm`, `onCancel`
- Sử dụng trong `DataTable.jsx` khi nhấn nút Delete

#### ✅ Toast.jsx (react-toastify wrapper)
**Cài đặt:**
```bash
npm install react-toastify
```

**Setup trong `App.js`:**
```javascript
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Bên trong return của App:
<ToastContainer position="top-right" autoClose={3000} />
```

**Sử dụng trong các component:**
```javascript
import { toast } from 'react-toastify';

// Thay alert('Tạo thành công!') bằng:
toast.success('Tạo phiếu mượn thành công!');

// Thay alert('Có lỗi!') bằng:
toast.error('Không thể tải dữ liệu!');
```
- Thay thế TOÀN BỘ `alert()` và `window.confirm()` (xử lý bằng ConfirmModal) trong các Librarian pages

#### ✅ BookCard.jsx
**Pattern nguồn:** `exercise6/App.js` (product-card)
- Props: `book` object
- Bootstrap card structure
- Conditional ribbon nếu `availableCopies === 0`
- Link to book detail page

#### ✅ BookList.jsx
**Pattern nguồn:** `exercise6/App.js` (products-list mapping)
- Props: `books` array
- Map books → BookCard components
- Bootstrap grid: `row` + `col-12 col-md-6 col-lg-3`

#### ✅ BookForm.jsx
**Pattern nguồn:** `exercies11/TodoApp.jsx` + SignIn form
- Props: `book` (cho edit mode), `onSave`, `onCancel`
- useState cho tất cả form fields
- Controlled inputs
- Validation như Calculator.jsx

### BorrowRecord Module Components

#### ✅ BorrowRecordForm.jsx
**Pattern nguồn:** SignIn.jsx + Calculator.jsx
- Props: `onSubmit` callback
- State: `selectedMemberId`, `selectedBookId`, `dueDate`
- Dropdown cho member selection
- Dropdown cho book selection (chỉ hiện books có availableCopies > 0)
- Date picker cho dueDate
- Validation trước khi submit

#### ✅ BorrowRecordTable.jsx
**Pattern nguồn:** `lab2/ProductList.jsx`
- Props: `records` array, `onReturn` callback
- Bootstrap table với columns: Book, Member, Borrow Date, Due Date, Status, Action
- Nút "Trả sách" chỉ hiện khi status = 'borrowed'
- Conditional rendering cho overdue records (highlight đỏ)

#### ✅ MyBorrowRecordHistory.jsx
**Pattern nguồn:** BorrowRecordTable.jsx nhưng read-only
- Lọc records theo memberId từ AuthContext
- Không có nút action
- Hiển thị return date nếu đã trả

### Member Module Components

#### ✅ MemberForm.jsx
**Pattern nguồn:** BookForm.jsx
- State: `name`, `email`, `phone`
- Validation email format

#### ✅ MemberList.jsx
**Pattern nguồn:** DataTable.jsx
- Display members trong table
- Actions: Edit, Delete

---

## 📄 Pages Implementation

### Public Pages

#### ✅ HomePage.jsx
**Pattern nguồn:** `exercise6/App.js` (banner + featured products)

```javascript
export default function HomePage() {
  return (
    <div>
      {/* Banner */}
      <div className="row banner-row mb-4">
        <div className="col">
          <div className="card bg-primary text-white text-center p-5">
            <h1>Chào mừng đến với LMSJS</h1>
            <p>Hệ thống quản lý thư viện mini</p>
          </div>
        </div>
      </div>

      {/* Featured Books */}
      <div className="row">
        <div className="col-12">
          <h3>Sách nổi bật</h3>
          <BookList books={featuredBooks} />
        </div>
      </div>
    </div>
  );
}
```

#### ✅ BooksPage.jsx
**Pattern nguồn:** Kết hợp useEffect fetch + SearchFilter + exercise6 layout
```javascript
import { useState, useEffect } from 'react';
import bookService from '../services/bookService';
import SearchBar from '../components/common/SearchBar';
import FilterPanel from '../components/common/FilterPanel';
import BookList from '../components/book/BookList';
import Pagination from '../components/common/Pagination';

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books khi search/filter thay đổi
  useEffect(() => {
    let result = books;

    // Search filter
    if (searchTerm) {
      result = result.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((book) => book.categoryId === parseInt(selectedCategory));
    }

    // Availability filter
    if (availabilityFilter === 'available') {
      result = result.filter((book) => book.availableCopies > 0);
    } else if (availabilityFilter === 'unavailable') {
      result = result.filter((book) => book.availableCopies === 0);
    }

    setFilteredBooks(result);
    setCurrentPage(1);
  }, [books, searchTerm, selectedCategory, availabilityFilter]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
      setFilteredBooks(data);
    } catch (err) {
      setError('Không thể tải danh sách sách!');
    } finally {
      setLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2 className="mb-4">Danh sách sách</h2>

      {/* Search & Filter Row */}
      <div className="row mb-4">
        <div className="col-md-6">
          <SearchBar onSearch={setSearchTerm} />
        </div>
        <div className="col-md-6">
          <FilterPanel
            onFilterChange={(category, availability) => {
              setSelectedCategory(category);
              setAvailabilityFilter(availability);
            }}
          />
        </div>
      </div>

      {/* Books List */}
      <BookList books={currentBooks} />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
```

#### ✅ BookDetailPage.jsx
**Pattern nguồn:** useEffect + useParams
```javascript
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetail();
  }, [id]);

  const fetchBookDetail = async () => {
    try {
      const data = await bookService.getBookById(id);
      setBook(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!book) return <ErrorMessage message="Không tìm thấy sách!" />;

  return (
    <div className="card shadow-sm p-4">
      <div className="row">
        <div className="col-md-4">
          <img 
            src={book.coverImage || '/placeholder-book.png'} 
            alt={book.title} 
            className="img-fluid"
          />
        </div>
        <div className="col-md-8">
          <h2>{book.title}</h2>
          <p><strong>Tác giả:</strong> {book.author}</p>
          <p><strong>Tồn kho:</strong> {book.availableCopies}/{book.totalCopies}</p>
          <p className={book.availableCopies > 0 ? 'text-success' : 'text-danger'}>
            {book.availableCopies > 0 ? '✓ Còn sách' : '✗ Hết sách'}
          </p>
          <button className="btn btn-secondary" onClick={() => navigate('/books')}>
            Quay lại
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### ✅ MyBorrowRecordsPage.jsx
**Pattern nguồn:** BooksPage.jsx nhưng filter theo memberId
```javascript
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import borrowRecordService from '../services/borrowRecordService';
import memberService from '../services/memberService';

import MyBorrowRecordHistory from '../components/borrowRecord/MyBorrowRecordHistory';

export default function MyBorrowRecordsPage() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRecords();
  }, []);

  const fetchMyRecords = async () => {
    try {
      // 1. Lấy thông tin member dựa trên userId đang đăng nhập
      const members = await memberService.getAllMembers();
      const currentMember = members.find(m => m.userId === user.uId);
      
      if (currentMember) {
        // 2. Dùng member.id để lấy lịch sử mượn
        const data = await borrowRecordService.getRecordsByMember(currentMember.id);
        setRecords(data);
      } else {
        setRecords([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h2 className="mb-4">Lịch sử mượn sách của tôi</h2>
      <MyBorrowRecordHistory records={records} />
    </div>
  );
}
```

### Librarian Pages

#### ✅ LibrarianBooksPage.jsx
**Pattern nguồn:** `lab2/Main.jsx` (2 column layout)
```javascript
import { useState, useEffect } from 'react';
import bookService from '../../services/bookService';
import BookForm from '../../components/book/BookForm';
import DataTable from '../../components/common/DataTable';

export default function LibrarianBooksPage() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAllBooks();
      setBooks(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (bookData) => {
    try {
      if (selectedBook) {
        // Update existing book
        await bookService.updateBook(selectedBook.id, bookData);
      } else {
        // Create new book
        await bookService.createBook(bookData);
      }
      fetchBooks();
      setSelectedBook(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Bạn có chắc muốn xóa sách này?')) {
      try {
        await bookService.deleteBook(bookId);
        fetchBooks();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Tên sách' },
    { key: 'author', label: 'Tác giả' },
    { key: 'availableCopies', label: 'Còn lại' },
    { key: 'totalCopies', label: 'Tổng số' },
  ];

  if (loading) return <LoadingSpinner />;

  return (
    <div className="row">
      {/* Left: Book List */}
      <div className="col-md-8">
        <h2 className="mb-4">Quản lý sách</h2>
        <DataTable
          data={books}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Right: Book Form */}
      <div className="col-md-4">
        <div className="card shadow-sm p-4 sticky-top">
          <h4 className="mb-3">
            {selectedBook ? 'Chỉnh sửa sách' : 'Thêm sách mới'}
          </h4>
          <BookForm
            book={selectedBook}
            onSave={handleSave}
            onCancel={() => setSelectedBook(null)}
          />
        </div>
      </div>
    </div>
  );
}
```

#### ✅ LibrarianBorrowRecordsPage.jsx
**Pattern nguồn:** Kết hợp TodoApp (add/delete) + SignIn (API calls)
```javascript
import { useState, useEffect } from 'react';
import borrowRecordService from '../../services/borrowRecordService';
import BorrowRecordForm from '../../components/borrowRecord/BorrowRecordForm';
import BorrowRecordTable from '../../components/borrowRecord/BorrowRecordTable';

export default function LibrarianBorrowRecordsPage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const data = await borrowRecordService.getAllRecords();
      setRecords(data);
    } catch (err) {
      setError('Không thể tải danh sách mượn sách!');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRecord = async (recordData) => {
    try {
      await borrowRecordService.createBorrowRecord(recordData);
      fetchRecords();
      alert('Tạo phiếu mượn thành công!');
    } catch (err) {
      console.log(err);
      alert('Có lỗi xảy ra khi tạo phiếu mượn!');
    }
  };

  const handleReturnBook = async (recordId) => {
    if (window.confirm('Xác nhận trả sách?')) {
      try {
        await borrowRecordService.returnBook(recordId);
        fetchRecords();
        alert('Trả sách thành công!');
      } catch (err) {
        console.log(err);
        alert('Có lỗi xảy ra khi trả sách!');
      }
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h2 className="mb-4">Quản lý mượn/trả sách</h2>

      {/* Form tạo borrow record */}
      <div className="card shadow-sm p-4 mb-4">
        <h4 className="mb-3">Tạo phiếu mượn mới</h4>
        <BorrowRecordForm onSubmit={handleCreateRecord} />
      </div>

      {/* Bảng danh sách borrow records */}
      <div className="card shadow-sm p-4">
        <h4 className="mb-3">Danh sách phiếu mượn</h4>
        <BorrowRecordTable 
          records={records} 
          onReturn={handleReturnBook} 
        />
      </div>
    </div>
  );
}
```

#### ✅ LibrarianCategoriesPage.jsx
**Pattern nguồn:** LibrarianBooksPage.jsx (simplified)
- Tương tự LibrarianBooksPage nhưng đơn giản hơn
- Chỉ có field: `id`, `name`

#### ✅ LibrarianMembersPage.jsx
**Pattern nguồn:** LibrarianBooksPage.jsx
- Tương tự LibrarianBooksPage
- Fields: `id`, `name`, `email`, `phone`

---

## 🎨 CSS Styling Strategy

### Bootstrap Classes được sử dụng (theo giảng viên)

**Từ exercise6 và exercies11:**

```css
/* Layout */
.container, .container-fluid
.row, .col, .col-md-6, .col-lg-3

/* Cards */
.card, .shadow-sm, .p-4, .mb-4

/* Forms */
.form-control, .form-select, .form-label
.input-group, .input-group mb-3

/* Buttons */
.btn, .btn-primary, .btn-success, .btn-danger
.btn-outline-primary, .btn-sm

/* Lists */
.list-group, .list-group-item
.list-group-item-action

/* Tables */
.table, .table-striped, .table-hover

/* Utilities */
.d-flex, .justify-content-between, .align-items-center
.text-center, .text-primary, .text-danger, .text-success
.mb-3, .mt-4, .p-4
.fw-bold, .fs-5

/* Alerts */
.alert, .alert-danger, .alert-info, .alert-success

/* Navbar */
.navbar, .navbar-expand-lg, .navbar-dark, .bg-primary
.navbar-brand, .navbar-nav, .nav-item, .nav-link
```

### Custom CSS (nếu cần)

✅ **`src/App.css`** — Minimal custom styles

```css
/* Sticky sidebar cho Admin pages */
.sticky-top {
  top: 20px;
}

/* Book card hover effect */
.book-card {
  transition: transform 0.2s;
  cursor: pointer;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Overdue highlight */
.overdue-record {
  background-color: #ffe6e6;
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
```

---

## 📋 Implementation Roadmap

### Phase 1: Project Setup (Tuần 1)
**Người phụ trách:** Team Lead

✅ Tasks:
1. Create React app: `npx create-react-app lmsjs`
2. Install dependencies:
   ```bash
   npm install react-router-dom axios bootstrap
   ```
3. Setup folder structure theo design
4. Setup JSON-Server với `database.json`
5. Setup Git repository


### Phase 2: Common Components & Layout (Tuần 1-2)
**Người phụ trách:** Người 4 (UI/Common)

✅ Tasks:
1. ✅ Navbar.jsx — Copy pattern từ `work_api/Menu.jsx`
2. ✅ Sidebar.jsx — Bootstrap nav-pills dọc cho Librarian layout
3. ✅ SearchBar.jsx — Copy pattern từ `exercies11/SearchFilter.jsx`
4. ✅ FilterPanel.jsx — Copy pattern từ `exercies11/Calculator.jsx`
5. ✅ Pagination.jsx — Bootstrap pagination
6. ✅ DataTable.jsx — Copy pattern từ `lab2/ProductList.jsx`
7. ✅ LoadingSpinner.jsx
8. ✅ ErrorMessage.jsx
9. ✅ ConfirmModal.jsx — Bootstrap modal thay thế `window.confirm()`
10. ✅ Toast setup — cài `react-toastify`, wrap `<ToastContainer>` trong `App.js`
11. ✅ App.js — Setup Router như `work_api/App.js` **+ React.lazy cho Librarian pages**

**File tham khảo:**
- `Module4_React_Communitcation_REST_API/work_api/src/templates/Menu.jsx`
- `Exercies/exercies11/src/components/SearchFilter.jsx`
- `Exercies/exercies11/src/components/Calculator.jsx`
- `Module3_React_Component/lab2/src/components/ProductList.jsx`

### Phase 3: Auth & Context (Tuần 2)
**Người phụ trách:** Người 3 (Auth/Member)

✅ Tasks:
1. ✅ AuthContext.jsx — Implement useContext pattern
2. ✅ LoginPage.jsx — Copy 100% từ `work_api/SignIn.jsx`
3. ✅ ProtectedRoute.jsx
4. Update Navbar.jsx để sử dụng AuthContext
5. Test login/logout flow

**File tham khảo:**
- `Module4_React_Communitcation_REST_API/work_api/src/pages/SignIn.jsx`
- Exercise 14 (useContext.docx)

### Phase 4: Book Module (Tuần 2-3)
**Người phụ trách:** Người 1 (Book Module)

✅ Tasks:
1. ✅ bookService.js — Implement tất cả API calls
2. ✅ BookCard.jsx — Copy pattern từ `exercise6/App.js` product-card
3. ✅ BookList.jsx — Map array + Bootstrap grid
4. ✅ BookForm.jsx — Copy pattern từ `exercies11/TodoApp.jsx`
5. ✅ HomePage.jsx — Banner + Featured books
6. ✅ BooksPage.jsx — Search/Filter/Pagination
7. ✅ BookDetailPage.jsx — useParams + fetch single book
8. ✅ LibrarianBooksPage.jsx — 2-column layout như `lab2/Main.jsx`

**File tham khảo:**

- `Module2_UI_Design/exercise6/src/App.js` (product-card → book-card)
- `Module2_UI_Design/exercise6/src/data.js` (data structure)
- `Exercies/exercies11/src/components/TodoApp.jsx` (form + CRUD)
- `Exercies/exercies11/src/components/SearchFilter.jsx` (search/filter)
- `Module3_React_Component/lab2/src/components/Main.jsx` (layout)

### Phase 5: BorrowRecord Module (Tuần 3-4)
**Người phụ trách:** Người 2 (BorrowRecord — người vững nhất)

✅ Tasks:
1. ✅ borrowRecordService.js — Logic phức tạp:
   - createBorrowRecord + update book.availableCopies
   - returnBook + update book.availableCopies
2. ✅ BorrowRecordForm.jsx — Dropdowns + validation
3. ✅ BorrowRecordTable.jsx — Table với action buttons
4. ✅ MyBorrowRecordHistory.jsx — Read-only view
5. ✅ LibrarianBorrowRecordsPage.jsx — Full CRUD + Toast thay alert()
6. ✅ MyBorrowRecordsPage.jsx — Filter by memberId

**File tham khảo:**
- `Module4_React_Communitcation_REST_API/work_api/src/pages/SignIn.jsx` (API pattern)
- `Exercies/exercies11/src/components/Calculator.jsx` (dropdowns + validation)
- `Module3_React_Component/lab2/src/components/ProductList.jsx` (table)

**Lưu ý đặc biệt:**
- BorrowRecord có logic liên động với Book (availableCopies)
- Cần test kỹ flow: Mượn → availableCopies giảm → Trả → availableCopies tăng
- Handle edge cases: Book hết sách, member đang mượn quá nhiều, etc.

### Phase 6: Member & Category Module (Tuần 4)
**Người phụ trách:** Người 3 (Member/Category)

✅ Tasks:
1. ✅ memberService.js — CRUD API
2. ✅ categoryService.js — CRUD API
3. ✅ MemberForm.jsx — Copy pattern từ BookForm
4. ✅ MemberList.jsx — Reuse DataTable
5. ✅ CategoryForm.jsx — Simplified BookForm
6. ✅ CategoryList.jsx — Reuse DataTable
7. ✅ LibrarianMembersPage.jsx — Copy LibrarianBooksPage pattern
8. ✅ LibrarianCategoriesPage.jsx — Copy LibrarianBooksPage pattern

**File tham khảo:**
- Reuse patterns từ Book Module
- `Exercies/exercies11/src/components/TodoApp.jsx` (form validation)

### Phase 7: Testing & Polish (Tuần 5)
**Người phụ trách:** Toàn bộ team

✅ Tasks:
1. ✅ Test tất cả user flows:
   - Guest: Xem catalog → Search/Filter → Chi tiết sách
   - Member: Login → Xem catalog → Xem lịch sử mượn
   - Librarian: Login → CRUD Books/Categories/Members → Mượn/Trả sách
2. ✅ Error handling cho tất cả API calls
3. ✅ Loading states cho tất cả async operations
4. ✅ Responsive testing (mobile + desktop)
5. ✅ Bootstrap UI polish
6. ✅ Kiểm tra Toast thay thế hoàn toàn alert()/window.confirm()
7. ✅ Kiểm tra Sidebar hiển đúng cho Librarian, ẩn cho Member/Guest
8. ✅ Kiểm tra Lazy Loading hotạt động (Network tab → thấy chunk file load riêng)
9. ✅ Code review theo patterns của giảng viên
10. ✅ Hoàn thiện `AI_USAGE.md` trước buổi defend

### Phase 8: Deployment (Tuần 5)
**Người phụ trách:** Người 4 (Deploy)

✅ Tasks:
1. ✅ Deploy frontend lên Vercel/Netlify
2. ✅ Deploy JSON-Server lên Render/Railway (hoặc mock API)
3. ✅ Update base URL trong api.js
4. ✅ Test production deployment
5. ✅ Prepare demo data

---

## 🔍 Code Review Checklist

### Patterns phải tuân thủ (theo giảng viên):

#### ✅ Component Structure
- [ ] Tất cả components dùng **Function Components** (không dùng Class)
- [ ] Export default ở cuối file
- [ ] Import thứ tự: React → libraries → components → services → styles

#### ✅ State Management
- [ ] Dùng `useState` cho local state
- [ ] Controlled inputs với `value` và `onChange`
- [ ] Immutable updates: `[...array, newItem]` không dùng `push()`
- [ ] Conditional rendering với `&&` và ternary operator


#### ✅ useEffect Hook
- [ ] Dependency array đúng (tránh infinite loop)
- [ ] Async function bên trong useEffect
- [ ] Cleanup function nếu cần (subscriptions, timers)

#### ✅ API Calls với Axios
- [ ] Try-catch cho tất cả async operations
- [ ] Loading state trước khi fetch
- [ ] Error handling và hiển thị error message
- [ ] Finally block để set loading = false

#### ✅ React Router
- [ ] Dùng `<Link>` thay vì `<a>` cho internal navigation
- [ ] `useNavigate` cho programmatic navigation
- [ ] `useParams` cho dynamic routes
- [ ] ProtectedRoute wrapper cho admin routes

#### ✅ Bootstrap Styling
- [ ] Không viết inline styles trừ khi cần thiết
- [ ] Dùng Bootstrap classes theo pattern của giảng viên
- [ ] Responsive: `col-12 col-md-6 col-lg-3`
- [ ] Form controls: `form-control`, `form-select`
- [ ] Buttons: `btn btn-primary`, `btn-sm`

#### ✅ Code Quality
- [ ] Component names: PascalCase
- [ ] Function names: camelCase
- [ ] Constants: UPPER_SNAKE_CASE
- [ ] Props validation (nếu cần)
- [ ] Key prop trong lists
- [ ] Console.log cleanup trước production

---

## 📚 Reference Files Mapping

### Tổng hợp mapping: LMSJS Component → Learning Materials

| LMSJS File | Learning Material | Pattern |
|---|---|---|
| `src/App.js` | `work_api/App.js` | BrowserRouter + Routes setup |
| `src/context/AuthContext.jsx` | Exercise 14 (useContext.docx) | Context + Provider pattern |
| `src/pages/LoginPage.jsx` | `work_api/pages/SignIn.jsx` | Authentication + axios + localStorage |

| `src/components/common/Navbar.jsx` | `work_api/templates/Menu.jsx` | Navigation với Link |
| `src/components/common/SearchBar.jsx` | `exercies11/SearchFilter.jsx` | Search input + filter logic |
| `src/components/common/FilterPanel.jsx` | `exercies11/Calculator.jsx` | Select dropdowns |
| `src/components/common/DataTable.jsx` | `lab2/ProductList.jsx` | Table structure |
| `src/components/book/BookCard.jsx` | `exercise6/App.js` (product-card) | Card layout + mapping |
| `src/components/book/BookList.jsx` | `exercise6/App.js` (products-list) | Map array + grid |
| `src/components/book/BookForm.jsx` | `exercies11/TodoApp.jsx` | Form + useState + validation |
| `src/pages/BooksPage.jsx` | `exercies11/SearchFilter.jsx` + `exercise6` | Fetch + Search + Filter + Pagination |
| `src/pages/librarian/LibrarianBooksPage.jsx` | `lab2/Main.jsx` | 2-column layout (list + form) |
| `src/pages/librarian/LibrarianBorrowRecordsPage.jsx` | `SignIn.jsx` + `TodoApp.jsx` | CRUD với API + complex logic |
| `database.json` | `work_api/database.json` | JSON-Server structure |

---

## 🚀 Quick Start Commands

```bash
# 1. Create project
npx create-react-app lmsjs
cd lmsjs

# 2. Install dependencies
npm install react-router-dom axios bootstrap

# 3. Setup JSON-Server
npm install -g json-server
# Tạo file database.json (copy structure từ guide)
json-server --watch database.json --port 9999

# 4. Start development
npm start
```

---

## 📝 Final Notes

### Nguyên tắc quan trọng nhất:

1. **Lấy pattern làm nền tảng, linh hoạt tùy chỉnh** — Tham khảo pattern của giảng viên làm nền tảng, nhưng cần điều chỉnh tên gọi (naming như "Librarian") và logic cho phù hợp với thiết kế của team. Không copy 100% một cách máy móc.
2. **Bootstrap first** — Dùng Bootstrap classes như giảng viên, không tự viết CSS phức tạp
3. **Consistent naming** — Theo conventions của team (PascalCase components, camelCase functions)
4. **Error handling everywhere** — Try-catch + loading + error state cho mọi API call

5. **Test incrementally** — Test từng component, từng page trước khi move on
6. **Teamwork** — Phân module rõ ràng, merge code thường xuyên

### Khi gặp vấn đề:

1. **Xem lại file tham khảo** — 90% câu trả lời nằm trong code mẫu của giảng viên
2. **Console.log state** — Debug state changes để hiểu flow
3. **Check Network tab** — Verify API calls đang gửi đúng data
4. **Bootstrap docs** — [getbootstrap.com](https://getbootstrap.com) cho UI components

### Resources:

- **Module 1 (ES6):** `d:\Data\FER202\Module1_JS_ES6\`
- **Module 2 (UI):** `d:\Data\FER202\Module2_UI_Design\exercise6\`
- **Module 3 (Components):** `d:\Data\FER202\Module3_React_Component\lab2\`
- **Module 4 (API):** `d:\Data\FER202\Module4_React_Communitcation_REST_API\work_api\`
- **Exercises:** `d:\Data\FER202\Exercies\exercies11\` (useState patterns)

---

## 🎓 Learning Outcomes

Sau khi hoàn thành LMSJS project, team sẽ nắm vững:

✅ React Fundamentals:
- Function Components
- useState, useEffect, useContext hooks
- Props drilling vs Context API
- Conditional rendering
- List rendering với key

✅ React Router v6:
- BrowserRouter setup
- Routes + Route configuration
- Link vs useNavigate
- useParams for dynamic routes
- Protected routes pattern

✅ API Integration:
- Axios configuration
- REST API CRUD operations
- Async/await pattern
- Error handling
- Loading states

✅ Bootstrap Integration:
- Grid system (container, row, col)
- Form components
- Card layouts
- Tables
- Navbar & navigation

- Responsive design patterns

✅ State Management:
- Local state vs Global state
- Context API for authentication
- Lifting state up
- Derived state (computed values)

✅ Best Practices:
- Component composition
- Separation of concerns (services layer)
- Reusable components
- Code organization
- Git workflow

---

## 📞 Support & Questions

**Khi cần help:**
1. Check file tham khảo trong guide này
2. Review giảng viên's code patterns
3. Debug với console.log và React DevTools
4. Ask team members theo module assignment
5. Document solutions for team reference

---

**Good luck với LMSJS project! 🚀**

**Remember:** The goal is not just to build the app, but to **internalize the patterns** that the instructor teaches. Every line of code should reflect what you learned from the course materials.

---

*Document version: 1.0*  
*Created: 2024*  
*Based on: FER202 Course Materials (Module 1-4, Exercises 6-14)*
