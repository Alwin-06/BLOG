import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import BlogList from './components/BlogList'
import AddBlog from './components/AddBlog'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-white text-2xl font-bold rounded-md px-3 py-2 hover:bg-blue-700 transition duration-300">
              Blog
            </Link>
            <div className="space-x-4">
              <Link  to="/" className="text-white text-lg font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                View Blogs
              </Link>
              <Link  to="/add"  className="text-white text-lg font-medium px-4 py-2 rounded-md bg-blue-700 hover:bg-blue-800 transition duration-300">
                Add New Blog
              </Link>
            </div>
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/add" element={<AddBlog />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
