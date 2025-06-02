import React, { useEffect, useState } from 'react';
import axios from 'axios'

const BlogList = () =>  {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);
    const baseUrl = import.meta.env.VITE_API_BASE_URL
    console.log(baseUrl)

    useEffect(() => {
        const fetchBlogs = async () => {
        try {
            const response = await axios.get(baseUrl)
            setBlogs(response.data)
        } catch (error) {
            setError(error.message);
            console.error('Error fetching blogs:', error);
            }
        }
        fetchBlogs()
    }, [])


    if (error) {
        return (
        <div className="flex justify-center items-center h-screen">
            <p className="text-xl text-red-600">Error: {error}</p>
        </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-10">All Blog Posts</h2>
        {blogs.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No blog posts found. Add one!</p>
        ) : (
            <div className="space-y-8">
            {blogs.map((blog) => (
                <div key={blog._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <h3 className="text-2xl font-semibold text-blue-700 mb-2">{blog.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{blog.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By: <span className="font-medium text-gray-600">{blog.author}</span></span>
                    <span>On: {new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
}

export default BlogList
