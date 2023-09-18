import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  try {
    if (req.query.productId) {
      // Convert the query parameter to an array of product IDs
      // console.log(req.query.productId);
      // console.log(req.query.productId.length);
      const productIds = req.query.productId.split(',');
    
      // Find products by productIds
      const product = await Product.find({ productId: { $in: productIds } });
    
      if (product.length > 0) {
        res.status(200).json({ product });
      } else {
        res.status(404).json({ error: "Products not found" });
      }
    }
    else if (req.query.search) {
      const searchQuery = req.query.search.replace(/\s+/g, "");
      const regexPattern = new RegExp(
        searchQuery.split("").map((char) => `${char}.*`).join(""),
        "i"
      );

      let products = await Product.find({
        $or: [
          { productTags: regexPattern },
          { productDescription: regexPattern },
          { productName: regexPattern },
        ],
      });

      products = products.map((product) => ({
        product,
        similarityScore: calculateSimilarityScore(product, searchQuery),
      }));

      products.sort((a, b) => b.similarityScore - a.similarityScore);

      res.status(200).json({ product: products.map((p) => p.product) });
    } else if (req.query.tags) {
      const tagsQuery = req.query.tags.replace(/\s+/g, "");
      const regexPattern = new RegExp(tagsQuery.split("").map((tag) => `${tag}.*`).join(""), "i");
    
      try {
        let products = await Product.find({ productTags: regexPattern });
    
        res.status(200).json({ product: products });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      let products = await Product.find();
      res.status(200).json({ product: products });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function calculateSimilarityScore(product, searchQuery) {
  const productName = product.productName.toLowerCase(); // Convert to lowercase for case-insensitive comparison
  searchQuery = searchQuery.toLowerCase(); // Convert to lowercase for case-insensitive comparison

  let score = 0;

  for (let i = 0; i < productName.length; i++) {
    const char = productName[i];
    if (searchQuery.includes(char)) {
      score++;
    }
  }
  return score;
}


export default connectDb(handler);
