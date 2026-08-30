import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category';
import Product from '../models/Product';
import Review from '../models/Review';

dotenv.config();

const IMG = {
  a: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c',
  b: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
  c: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb',
  d: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a',
  e: 'https://images.unsplash.com/photo-1592301933927-35b597393c0a',
  f: 'https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75',
  g: 'https://images.unsplash.com/photo-1612722432474-b971cdcea546',
  h: 'https://images.unsplash.com/photo-1633934542430-0905ccb5f050',
  i: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e',
  j: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8',
  k: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f',
  l: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9',
  m: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30',
  n: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b',
  o: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f',
  p: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed',
  q: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1',
  r: 'https://images.unsplash.com/photo-1549517045-bc93de075e53',
  s: 'https://images.unsplash.com/photo-1519657337289-077653f724ed',
  t: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00',
};

const w = (key: keyof typeof IMG, size = 800) => `${IMG[key]}?w=${size}`;

const categoriesData = [
  { name: 'सिल्क साड़ी', image: w('a', 600), description: 'शुद्ध सिल्क से बनी, शादी और त्योहारों के लिए उपयुक्त' },
  { name: 'कॉटन साड़ी', image: w('b', 600), description: 'हल्की और आरामदायक, रोज़ाना पहनने के लिए' },
  { name: 'बनारसी साड़ी', image: w('c', 600), description: 'बनारस की पारंपरिक ज़री वाली साड़ियाँ' },
  { name: 'पैठणी साड़ी', image: w('d', 600), description: 'महाराष्ट्र की प्रसिद्ध पैठणी साड़ियाँ' },
  { name: 'डिज़ाइनर साड़ी', image: w('e', 600), description: 'आधुनिक डिज़ाइन, पार्टी और समारोह के लिए' },
];

// Products will reference category IDs after creation
const productsData = [
  { name: 'रॉयल बनारसी सिल्क साड़ी', price: 15500, originalPrice: 18000, description: 'शुद्ध बनारसी सिल्क साड़ी, सोने की ज़री का बारीक काम। शादी और विशेष अवसरों के लिए एकदम उपयुक्त। इस साड़ी में पारंपरिक बूटी डिज़ाइन है जो इसे और भी खास बनाता है।', images: [w('a'), w('c'), w('g'), w('h')], categoryName: 'बनारसी साड़ी', fabric: 'शुद्ध सिल्क', color: 'लाल', occasion: 'शादी', isNewArrival: true, isFeatured: true, inStock: true },
  { name: 'गोल्डन पैठणी साड़ी', price: 22000, description: 'पैठण की प्रसिद्ध हैंडलूम साड़ी, मोर डिज़ाइन के साथ। महाराष्ट्र की परंपरा और शिल्प का अनूठा संगम।', images: [w('d'), w('f'), w('i'), w('j')], categoryName: 'पैठणी साड़ी', fabric: 'सिल्क', color: 'सुनहरा', occasion: 'त्योहार', isNewArrival: true, isFeatured: true, inStock: true },
  { name: 'सॉफ्ट कॉटन हैंडलूम साड़ी', price: 3500, originalPrice: 4200, description: 'हल्की और मुलायम कॉटन साड़ी, रोज़ाना पहनने के लिए एकदम सही। गर्मियों में आरामदायक और स्टाइलिश।', images: [w('b'), w('k'), w('l'), w('m')], categoryName: 'कॉटन साड़ी', fabric: 'शुद्ध कॉटन', color: 'नीला', occasion: 'कैज़ुअल', isNewArrival: false, isFeatured: true, inStock: true },
  { name: 'कांजीवरम सिल्क साड़ी', price: 28000, description: 'दक्षिण भारत की प्रसिद्ध कांजीवरम सिल्क साड़ी। भारी ज़री का काम और समृद्ध रंग इसे शादी के लिए पहली पसंद बनाते हैं।', images: [w('c'), w('n'), w('o'), w('p')], categoryName: 'सिल्क साड़ी', fabric: 'कांजीवरम सिल्क', color: 'बैंगनी', occasion: 'शादी', isNewArrival: false, isFeatured: true, inStock: true },
  { name: 'डिज़ाइनर सीक्वेंस साड़ी', price: 8500, originalPrice: 10000, description: 'आधुनिक डिज़ाइन की सीक्वेंस वर्क साड़ी। पार्टी और रिसेप्शन के लिए एकदम सही। हल्की और ग्लैमरस।', images: [w('e'), w('q'), w('r'), w('s')], categoryName: 'डिज़ाइनर साड़ी', fabric: 'जॉर्जेट', color: 'काला', occasion: 'पार्टी', isNewArrival: true, isFeatured: false, inStock: true },
  { name: 'बनारसी ऑर्गेंज़ा साड़ी', price: 12000, description: 'हल्की ऑर्गेंज़ा पर बनारसी ज़री का सुंदर काम। त्योहारों और पूजा के लिए एकदम उपयुक्त।', images: [w('f'), w('a'), w('h'), w('t')], categoryName: 'बनारसी साड़ी', fabric: 'ऑर्गेंज़ा', color: 'गुलाबी', occasion: 'त्योहार', isNewArrival: false, isFeatured: false, inStock: true },
  { name: 'पैठणी सिल्क ब्रोकेड', price: 35000, description: 'प्रीमियम पैठणी साड़ी, शुद्ध सोने के धागे से बुनी हुई। शादी और भव्य समारोहों के लिए।', images: [w('g'), w('d'), w('i'), w('n')], categoryName: 'पैठणी साड़ी', fabric: 'शुद्ध सिल्क', color: 'हरा', occasion: 'शादी', isNewArrival: true, isFeatured: true, inStock: true },
  { name: 'लिनन कॉटन साड़ी', price: 2800, description: 'प्रीमियम लिनन कॉटन मिक्स साड़ी। ऑफिस और रोज़ाना पहनने के लिए। आरामदायक और एलिगेंट।', images: [w('k'), w('b'), w('o'), w('j')], categoryName: 'कॉटन साड़ी', fabric: 'लिनन कॉटन', color: 'बेज', occasion: 'कैज़ुअल', isNewArrival: false, isFeatured: false, inStock: true },
  { name: 'तुसर सिल्क साड़ी', price: 9500, originalPrice: 11000, description: 'प्राकृतिक तुसर सिल्क से बनी साड़ी। हाथ से बुनी हुई, हर टुकड़ा अनूठा। पूजा और त्योहारों के लिए।', images: [w('l'), w('c'), w('p'), w('r')], categoryName: 'सिल्क साड़ी', fabric: 'तुसर सिल्क', color: 'पीला', occasion: 'त्योहार', isNewArrival: false, isFeatured: false, inStock: true },
  { name: 'मेरून बनारसी ब्राइडल', price: 45000, description: 'दुल्हन के लिए विशेष बनारसी साड़ी। भारी ज़री, कुंदन वर्क और शाही डिज़ाइन। आपके खास दिन के लिए खास साड़ी।', images: [w('m'), w('a'), w('q'), w('e')], categoryName: 'सिल्क साड़ी', fabric: 'शुद्ध सिल्क', color: 'मैरून', occasion: 'शादी', isNewArrival: true, isFeatured: true, inStock: true },
];

const reviewsData = [
  { name: 'प्रिया शर्मा', location: 'बड़वाह', rating: 5, message: 'बहुत ही सुंदर साड़ियाँ! मैंने अपनी बेटी की शादी के लिए यहाँ से बनारसी साड़ी ली थी। सबने तारीफ की। क्वालिटी बेहतरीन है।', status: 'approved' as const },
  { name: 'अंजली पटेल', location: 'मुंबई', rating: 5, message: 'ऑनलाइन ऑर्डर किया और साड़ी बिल्कुल वैसी ही आई जैसी फोटो में थी। पैकिंग भी बहुत अच्छी थी। बहुत खुश हूँ।', status: 'approved' as const },
  { name: 'सुनीता देशमुख', location: 'पुणे', rating: 5, message: 'पैठणी साड़ी का कलेक्शन कमाल का है। असली पैठणी मिलती है यहाँ। दाम भी उचित हैं। ज़रूर विज़िट करें।', status: 'approved' as const },
  { name: 'रेखा जोशी', location: 'बड़वाह', rating: 4, message: 'मैं पिछले 10 सालों से यहीं से साड़ियाँ खरीदती हूँ। हमेशा नए डिज़ाइन मिलते हैं और स्टाफ बहुत हेल्पफुल है।', status: 'approved' as const },
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing data');

    // Seed categories
    const createdCats = await Category.insertMany(categoriesData);
    console.log(`Created ${createdCats.length} categories`);

    // Build category name → id map
    const catMap = new Map<string, mongoose.Types.ObjectId>();
    for (const cat of createdCats) {
      catMap.set(cat.name, cat._id as mongoose.Types.ObjectId);
    }

    // Seed products
    const productsToInsert = productsData.map(({ categoryName, ...rest }) => ({
      ...rest,
      category: catMap.get(categoryName)!,
    }));
    const createdProducts = await Product.insertMany(productsToInsert);
    console.log(`Created ${createdProducts.length} products`);

    // Update category counts
    for (const cat of createdCats) {
      const count = await Product.countDocuments({ category: cat._id });
      await Category.findByIdAndUpdate(cat._id, { count });
    }
    console.log('Updated category counts');

    // Seed reviews
    const createdReviews = await Review.insertMany(reviewsData);
    console.log(`Created ${createdReviews.length} reviews`);

    await mongoose.disconnect();
    console.log('Seed complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedData();
