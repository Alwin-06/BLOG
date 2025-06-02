import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    console.log(baseUrl)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!title || !content || !author) {
        setMessage('Please fill in all fields.')
        return
        }

        try {
            const response = await  axios.post(baseUrl,{title,content,author,})
            setMessage('Blog added successfully!')
            console.log('Blog added:', response.data)
            setTitle('')
            setContent('')
            setAuthor('')
            setTimeout(() => {
                navigate('/')
            }, 1500)
        } catch (error) {
            setMessage('Network error. Please try again.')
            console.error('Error submitting blog:', error)
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New Blog Post</h2>
        {message && (
            <p className={`text-center mb-4 p-2 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
            </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
            </label>
            <input
                type="text"
                id="title"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            </div>
            <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
            </label>
            <textarea
                id="content"
                rows="6"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            ></textarea>
            </div>
            <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                Author
            </label>
            <input
                type="text"
                id="author"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            </div>
            <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
            Add Blog
            </button>
        </form>
        </div>
    )
}

export default AddBlog
