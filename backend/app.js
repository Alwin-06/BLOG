const express = require('express')
const app = express()
const port = process.env.PORT || 5000 

const Blog = require('./models/blog')
const cors = require('cors')
app.use(express.json())

app.use(cors());

const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.MONGODB_URL)

main()
    .then(() => console.log("DB connected..."))
    .catch(err => console.error(err))

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
}

// Add a new blog
app.post('/', async (req, res) => {
    try {
        const { title, content, author } = req.body

        if (!title || !content || !author) {
            return res.status(400).json({ error: "Please provide title, content, and author." })
        }

        const blog = new Blog({ title, content, author })
        await blog.save();
        res.status(201).json({ message: "Blog post added", data: blog })
    } catch (error) {
        console.error( error)
        res.status(500).json({ Error: error.message })
    }
});

// Get all blog
app.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 })
        console.log(blogs);
        res.status(200).json(blogs)
    } catch (error) {
        console.error(error)
        res.status(500).json({ Error: error.message })
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});