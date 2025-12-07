import productModel from "../models/productModel.js";

// Function to search products based on user query
const searchProducts = async (query) => {
    try {
        const searchRegex = new RegExp(query, 'i'); // Case-insensitive search
        
        const products = await productModel.find({
            $or: [
                { name: searchRegex },
                { description: searchRegex },
                { category: searchRegex },
                { subCategory: searchRegex }
            ]
        }).limit(5); // Limit to 5 recommendations
        
        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Function to get bestseller products
const getBestsellers = async () => {
    try {
        const products = await productModel.find({ bestseller: true }).limit(5);
        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Function to get products by category
const getProductsByCategory = async (category) => {
    try {
        const products = await productModel.find({ 
            category: new RegExp(category, 'i') 
        }).limit(5);
        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Main chatbot handler
const chatWithBot = async (req, res) => {
    try {
        const { message } = req.body;
        const lowerMessage = message.toLowerCase().trim();
        
        let response = {
            text: '',
            products: []
        };

        // Greeting patterns
        if (lowerMessage.match(/^(hi|hello|chào|xin chào|hey)/)) {
            response.text = "Xin chào! Tôi có thể giúp bạn tìm sản phẩm. Bạn đang tìm gì?";
        }
        // Bestseller requests
        else if (lowerMessage.match(/(bestseller|bán chạy|phổ biến|nổi bật)/)) {
            const products = await getBestsellers();
            response.text = products.length > 0 
                ? `Đây là ${products.length} sản phẩm bán chạy nhất:`
                : "Hiện chưa có sản phẩm bán chạy.";
            response.products = products;
        }
        // Category requests
        else if (lowerMessage.match(/(yonex|vợt|racket)/)) {
            const products = await getProductsByCategory('Yonex');
            response.text = products.length > 0
                ? `Tôi tìm thấy ${products.length} sản phẩm Yonex:`
                : "Hiện chưa có sản phẩm Yonex.";
            response.products = products;
        }
        // Price range requests
        else if (lowerMessage.match(/(dưới|dưới|dưới|cheap|rẻ)/)) {
            const products = await productModel.find({})
                .sort({ price: 1 })
                .limit(5);
            response.text = products.length > 0
                ? `Đây là các sản phẩm có giá tốt nhất:`
                : "Hiện chưa có sản phẩm.";
            response.products = products;
        }
        // General product search
        else {
            const products = await searchProducts(message);
            if (products.length > 0) {
                response.text = `Tôi tìm thấy ${products.length} sản phẩm phù hợp:`;
                response.products = products;
            } else {
                response.text = "Hiện chưa có sản phẩm phù hợp với yêu cầu của bạn.";
                response.products = [];
            }
        }

        res.json({ success: true, response });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { chatWithBot };

