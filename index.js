const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const multer = require('multer');
const Product = require('./models/product');
const { title } = require('process');

const app = express();
const port = process.env.PORT || 3000


// middleware
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

// database connection
mongoose.connect('mongodb://localhost:27017/prime-pick', {
    useUnifiedTopology: true,
})
    .then(() => {
        console.log(`
            database connected
            `)
    })
    .catch((err) => {
        console.log('database connecting error', err);
    })


// Setting up multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // folder to store uploaded files
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });



const brandName = 'prime pick'

app.get('/', async (req, res) => {
    try {
        // Fetch all product details from the database
        const products = await Product.find();  // Fetch all products

        // You can destructure to only pass necessary details to the view if you prefer
        const productDetails = products.map(product => ({
            title: product.title,
            instock: product.hms,  // Assuming 'hms' represents stock count
            uploadedImg: product.Image
        }));

        // Render the 'index' view, passing the brand name and product details
        res.render('index', {
            brandName: 'Your Brand Name',  // Replace with your actual brand name
            productDetails
        });
    } catch (error) {
        console.error('Error fetching product details:', error);
        res.status(500).send('Error fetching products.');
    }
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        brandName
    });
})



// admin controll routes
app.get('/admin/controll-panel', (req, res) => {
    res.render('admin', {
        brandName
    })
})


// Define the route for uploading products
app.post('/admin/upload-product', upload.single('img'), async (req, res) => {
    try {
        const { title, instock } = req.body;
        const uploadedImg = '/uploads/' + req.file.filename;

        // Log the data to the console
        console.log({
            title,
            instock,
            uploadedImg
        });

        // Create a new product document
        const newProduct = new Product({
            title,
            hms: instock,
            Image: uploadedImg
        });

        // Save the product to the database
        await newProduct.save();
        res.send('Product uploaded successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error uploading product.');
    }
});


app.listen(port, () => {
    console.log(`
        server running on ${port}
        http://localhost:${port}
        `);
})