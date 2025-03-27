const Product = require('../models/productModel');
const upload = require('../middleware/productMiddleware'); // Import the Multer middleware

// Add product with image upload
exports.addProduct = (req, res) => {
  upload.single('productImage')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const newProduct = new Product({
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      productPrice: req.body.productPrice,
      productImage: req.file.path,
      productCategory: req.body.productCategory
      // Save the file path in the database
    });

    newProduct.save()
      .then(product => res.json(product))
      .catch(err => res.status(400).json({ message: err.message }));
  });
};

// Get all products
exports.getAllProducts = (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json({ message: err.message }));
};

// Get product by ID
exports.getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    })
    .catch(err => res.status(400).json({ message: err.message }));
};

// Update product
exports.updateProduct = (req, res) => {
  upload.single('productImage')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const updatedProduct = {
      productName: req.body.productName,
      productDesc: req.body.productDesc,
      productPrice: req.body.productPrice,
      productImage: req.file ? req.file.path : req.body.productImage,
      productCategory: req.body.productCategory
       // Update the file path if a new file is uploaded
    };
    Product.findByIdAndUpdate(req.params.id, updatedProduct, { new: true })
      .then(product => {
        if (!product) {
          return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
      })
      .catch(err => res.status(400).json({ message: err.message }));
  });
};

// Search product by name
exports.searchProduct = (req, res) => {
  const productName = req.params.productName;
  Product.find({ productName: { $regex: productName, $options: 'i' } })
    .then(products => res.json(products))
    .catch(err => res.status(400).json({ message: err.message }));
};

//filter Product by category
exports.getProductByCategory = async (req, res) => {
  try {
    const category = req.query.category; // Get category from query parameters

    // console.log("Received Category:", category); // Debugging

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    //  Ensure `productCategory` is properly filtered
    const products = await Product.find({ productCategory: { $regex: new RegExp(`^${category}$`, "i") } });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found in this category." });
    }

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Delete product
exports.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
    })
    .catch(err => res.status(400).json({ message: err.message }));
};

