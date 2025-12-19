import productModel from "../models/productModel.js";

// Function to search products based on user query and list all matches
const searchProducts = async (query) => {
    try {
        // Break the query into meaningful keywords (ignore very short tokens)
        const keywords = query
            .toLowerCase()
            .split(/[\s,.;:!?()]+/)
            .filter((kw) => kw.length > 2);

        // Build AND conditions so all keywords must appear in any of the searchable fields
        const andConditions = keywords.length
            ? keywords.map((kw) => ({
                  $or: [
                      { name: new RegExp(kw, "i") },
                      { description: new RegExp(kw, "i") },
                      { category: new RegExp(kw, "i") },
                      { subCategory: new RegExp(kw, "i") },
                  ],
              }))
            : [
                  {
                      $or: [
                          { name: new RegExp(query, "i") },
                          { description: new RegExp(query, "i") },
                          { category: new RegExp(query, "i") },
                          { subCategory: new RegExp(query, "i") },
                      ],
                  },
              ];

        // Return all products that satisfy the combined conditions (no limit)
        const products = await productModel.find({ $and: andConditions });
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

// Function to get products by brand/label keyword
const getProductsByBrand = async (brand) => {
    try {
        const products = await productModel.find({ 
            $or: [
                { category: new RegExp(brand, 'i') },
                { subCategory: new RegExp(brand, 'i') },
                { name: new RegExp(brand, 'i') },
                { description: new RegExp(brand, 'i') },
            ]
        });
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

        // Brand mapping (add more if needed)
        const brandKeywords = [
            { brand: 'Yonex', patterns: /(yonex)/ },
            { brand: 'Lining', patterns: /(lining|li-ning|li ning)/ },
            { brand: 'Victor', patterns: /(victor)/ },
            { brand: 'Apacs', patterns: /(apacs)/ },
            { brand: 'Mizuno', patterns: /(mizuno)/ },
        ];

        // Playstyle keywords
        const playstyleKeywords = [
            { label: 'tấn công', patterns: /(công|tấn công|attack|power)/ },
            { label: 'phòng thủ', patterns: /(thủ|phòng thủ|defense|control)/ },
            { label: 'cân bằng', patterns: /(cân bằng|allround|linh hoạt|toàn diện)/ },
            { label: 'dễ chơi', patterns: /(mới chơi|entry|beginner|dễ đánh|dễ chơi)/ },
        ];

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
        // Generic racket intent without brand/playstyle -> ask for clarification
        else if (
            lowerMessage.match(/(vợt|racket)/) &&
            !brandKeywords.some(({ patterns }) => lowerMessage.match(patterns)) &&
            !playstyleKeywords.some(({ patterns }) => lowerMessage.match(patterns))
        ) {
            response.text = "Bạn muốn tìm vợt theo phong cách nào (tấn công, phòng thủ, cân bằng, dễ chơi) và của hãng nào (Yonex, Lining, Victor, Apacs, Mizuno)?";
            response.products = [];
        }
        // Brand specific requests
        else if (brandKeywords.some(({ patterns }) => lowerMessage.match(patterns))) {
            const matchedBrand = brandKeywords.find(({ patterns }) => lowerMessage.match(patterns));
            const products = await getProductsByBrand(matchedBrand.brand);
            response.text = products.length > 0
                ? `Tôi tìm thấy ${products.length} sản phẩm phù hợp với thương hiệu ${matchedBrand.brand}:`
                : `Hiện chưa có sản phẩm phù hợp thương hiệu ${matchedBrand.brand}.`;
            response.products = products;
        }
        // Playstyle requests
        else if (playstyleKeywords.some(({ patterns }) => lowerMessage.match(patterns))) {
            const matchedStyle = playstyleKeywords.find(({ patterns }) => lowerMessage.match(patterns));
            const products = await searchProducts(matchedStyle.label);
            response.text = products.length > 0
                ? `Tôi tìm thấy ${products.length} sản phẩm phù hợp với phong cách ${matchedStyle.label}:`
                : `Hiện chưa có sản phẩm phù hợp với phong cách ${matchedStyle.label}.`;
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
                response.text = `Tôi tìm thấy ${products.length} sản phẩm phù hợp với mô tả của bạn:`;
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

