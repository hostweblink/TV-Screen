// Import necessary hooks from React library
import React, { useState, useMemo } from 'react';

// ==========================================
// 1. INITIAL PRODUCTS DATA (Bilingual: Arabic & English)
// ==========================================
const initialProducts = [
    { 
        id: 1, 
        nameAr: "شاشة ألعاب منحنية 27 بوصة 240 هرتز", 
        nameEn: "27\" Curved Gaming Monitor 240Hz", 
        category: "gaming", 
        price: 8500, 
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60", 
        descAr: "سرعة استجابة فائقة 1 مللي ثانية مع دعم G-Sync لألعاب خالية من التقطيع. مصممة للاعبي المحترفين بألوان زاهية وقاعدة مريحة.",
        descEn: "Ultra-responsive 1ms refresh rate with G-Sync support for lag-free gaming. Designed for hardcore gamers with vibrant colors and ergonomic stand." 
    },
    { 
        id: 2, 
        nameAr: "تلفزيون ذكي 55 بوصة 4K أوليد", 
        nameEn: "55\" 4K OLED Smart TV", 
        category: "tv", 
        price: 18900, 
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60", 
        descAr: "ألوان حقيقية ودرجات سوداء عميقة مع نظام ذكي مدمج، نتفليكس، يوتيوب، وصوت محيطي نقي لتجربة سينمائية منزلية.",
        descEn: "True colors and deep blacks with built-in smart system, Netflix, YouTube, and pure surround sound for cinematic home experience." 
    },
    { 
        id: 3, 
        nameAr: "شاشة احترافية عريضة جداً 34 بوصة", 
        nameEn: "34\" Professional Ultrawide Monitor", 
        category: "ultrawide", 
        price: 14200, 
        image: "https://images.unsplash.com/photo-1586210015494-b295d36e2f18?w=500&auto=format&fit=crop&q=60", 
        descAr: "مثالية لمونتاج الفيديو، برمجة وتطوير السوفتوير، مع مساحة عمل بانورامية ضخمة للنوافذ المتعددة.",
        descEn: "Ideal for video editing, software development, and multi-window programming with a massive panoramic workspace." 
    },
    { 
        id: 4, 
        nameAr: "شاشة ألعاب 32 بوصة 4K 144 هرتز", 
        nameEn: "32\" Gaming Monitor 4K 144Hz", 
        category: "gaming", 
        price: 13500, 
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60", 
        descAr: "دقة 4K مذهلة ومعدل تحديث عالي مصمم خصيصاً لأجهزة الكونسول المحترفة وصانعي المحتوى.",
        descEn: "Stunning 4K resolution and high refresh rate tailored for next-gen console and PC professional content creators." 
    },
    { 
        id: 5, 
        nameAr: "شاشة محمولة تعمل باللمس 15.6 بوصة", 
        nameEn: "15.6\" Portable Touch Screen", 
        category: "portable", 
        price: 4600, 
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60", 
        descAr: "رفيقك المثالي للسفر، تدعم اتصال USB Type-C السريع واللمس الكامل لأجهزة اللاب توب والهواتف.",
        descEn: "Your ideal travel companion, supporting fast USB Type-C connectivity, full touch support for laptops and smartphones." 
    },
    { 
        id: 6, 
        nameAr: "تلفزيون سينمائي 65 بوصة QLED", 
        nameEn: "65\" QLED Cinematic TV", 
        category: "tv", 
        price: 24000, 
        image: "https://images.unsplash.com/photo-1567690187548-f07b1d4bf5a9?w=500&auto=format&fit=crop&q=60", 
        descAr: "شاشة ضخمة بتقنية النقاط الكمومية لإضاءة فائقة السطوع، HDR10+, وألوان سينمائية نابضة بالحياة.",
        descEn: "Massive screen with Quantum Dot technology for ultra-bright illumination, HDR10+, and vivid cinematic colors." 
    }
];

// ==========================================
// 2. EGYPTIAN GOVERNORATES (Bilingual list)
// ==========================================
const governorates = [
    { ar: "القاهرة", en: "Cairo" },
    { ar: "الجيزة", en: "Giza" },
    { ar: "القليوبية", en: "Qalyubia" },
    { ar: "الإسكندرية", en: "Alexandria" },
    { ar: "الدقهلية", en: "Dakahlia" },
    { ar: "الشرقية", en: "Sharqia" },
    { ar: "المنوفية", en: "Monufia" },
    { ar: "الغربية", en: "Gharbia" },
    { ar: "البحيرة", en: "Beheira" },
    { ar: "كفر الشيخ", en: "Kafr El Sheikh" },
    { ar: "دمياط", en: "Damietta" },
    { ar: "بورسعيد", en: "Port Said" },
    { ar: "الإسماعيلية", en: "Ismailia" },
    { ar: "السويس", en: "Suez" },
    { ar: "الفيوم", en: "Fayoum" },
    { ar: "بني سويف", en: "Beni Suef" },
    { ar: "المنيا", en: "Minya" },
    { ar: "أسيوط", en: "Asyut" },
    { ar: "سوهاج", en: "Sohag" },
    { ar: "قنا", en: "Qena" },
    { ar: "الأقصر", en: "Luxor" },
    { ar: "أسوان", en: "Aswan" },
    { ar: "البحر الأحمر", en: "Red Sea" },
    { ar: "الوادي الجديد", en: "New Valley" },
    { ar: "مطروح", en: "Matrouh" },
    { ar: "شمال سيناء", en: "North Sinai" },
    { ar: "جنوب سيناء", en: "South Sinai" }
];

// ==========================================
// 3. TRANSLATIONS DICTIONARY
// ==========================================
const translations = {
    ar: {
        storeName: "TV Screen Store",
        cart: "السلة",
        searchPlaceholder: "ابحث عن الشاشات...",
        all: "الكل",
        gaming: "ألعاب",
        tv: "تلفزيونات ذكية",
        ultrawide: "عريض جداً",
        portable: "محمولة",
        heroBadge: "تشكيلة الشاشات الفاخرة 🖥️",
        heroTitle: "اكتشف الشاشات والتلفزيونات الاحترافية",
        heroDesc: "تصفح شاشات الألعاب المتطورة، تلفزيونات 4K الذكية، والشاشات العريضة مع إتمام الطلب فوراً عبر الواتساب.",
        add: "إضافة",
        addToCart: "إضافة للسلة",
        backToHome: "العودة للرئيسية",
        quantity: "الكمية",
        continueShopping: "متابعة التسوق",
        clearCart: "إفراغ السلة",
        emptyCart: "سلة التسوق فارغة حالياً.",
        subtotal: "المجموع الفرعي:",
        shippingFee: "رسوم الشحن:",
        grandTotal: "الإجمالي النهائي:",
        namePlaceholder: "الاسم الكامل",
        phonePlaceholder: "رقم الهاتف",
        addressPlaceholder: "عنوان الشحن بالتفصيل (الشارع، رقم العمارة)",
        selectGov: "اختر المحافظة",
        sendWhatsApp: "إرسال الطلب عبر الواتساب (01127808865)",
        cartTitle: "سلة التسوق وإتمام الطلب",
        currency: "EGP",
        footer: "TV Screen Store © 2026 | متجر عالي الأداء ومتجاوب بالكامل"
    },
    en: {
        storeName: "TV Screen Store",
        cart: "Cart",
        searchPlaceholder: "Search screens...",
        all: "All",
        gaming: "Gaming",
        tv: "Smart TVs",
        ultrawide: "Ultrawide",
        portable: "Portable",
        heroBadge: "Ultimate Display Collection 🖥️",
        heroTitle: "Discover Professional Screens & TVs",
        heroDesc: "Explore high-end gaming monitors, 4K smart TVs, and ultra-wide displays with instant checkout via WhatsApp.",
        add: "Add",
        addToCart: "Add to Cart",
        backToHome: "Back to Home",
        quantity: "Quantity",
        continueShopping: "Continue Shopping",
        clearCart: "Clear All Cart",
        emptyCart: "Your shopping cart is currently empty.",
        subtotal: "Subtotal:",
        shippingFee: "Shipping Fee:",
        grandTotal: "Grand Total:",
        namePlaceholder: "Full Name",
        phonePlaceholder: "Phone number",
        addressPlaceholder: "Detailed Shipping Address (Street, Building No.)",
        selectGov: "Select Governorate",
        sendWhatsApp: "Send Order via WhatsApp (01127808865)",
        cartTitle: "Shopping Cart & Checkout",
        currency: "EGP",
        footer: "TV Screen Store © 2026 | High Performance Responsive Store"
    }
};

export default function App() {
    // ==========================================
    // 4. STATE MANAGEMENT (React Hooks)
    // ==========================================
    const [lang, setLang] = useState("ar"); // Default language Arabic
    const [view, setView] = useState("home"); // "home" | "detail" | "cart"
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [cart, setCart] = useState([]);
    
    // Customer form states
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerGovernorate, setCustomerGovernorate] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    const t = translations[lang];

    // ==========================================
    // 5. SEARCH & FILTER LOGIC
    // ==========================================
    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product => {
            const productName = lang === 'ar' ? product.nameAr : product.nameEn;
            const productDesc = lang === 'ar' ? product.descAr : product.descEn;
            const matchesSearch = productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  productDesc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory, lang]);

    const getCartItem = (id) => cart.find(item => item.id === id);

    // ==========================================
    // 6. CART & QUANTITY MANAGEMENT FUNCTIONS
    // ==========================================
    const handleAddInitial = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
            }
            return [...prev, {...product, qty: 1}];
        });
    };

    const updateQty = (id, delta, isCartView = false) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.id === id) {
                    const newQty = item.qty + delta;
                    if (newQty <= 0 && !isCartView) {
                        return null; 
                    }
                    return {...item, qty: newQty >= 0 ? newQty : 0};
                }
                return item;
            }).filter(Boolean);
        });
    };

    const removeCompletely = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    // ==========================================
    // 7. CART & SHIPPING CALCULATIONS
    // ==========================================
    const activeCartItems = cart.filter(item => item.qty > 0);
    const totalItemsCount = activeCartItems.reduce((sum, item) => sum + item.qty, 0);
    const subTotalPrice = activeCartItems.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty)), 0);

    // Dynamic Shipping Fee based on Governorate (Cairo, Giza, Qalyubia = 100, Others = 150)
    const getShippingFee = () => {
        if (!customerGovernorate) return 0;
        const lowerGov = customerGovernorate.toLowerCase();
        if (
            lowerGov.includes("القاهرة") || lowerGov.includes("cairo") ||
            lowerGov.includes("الجيزة") || lowerGov.includes("giza") ||
            lowerGov.includes("القليوبية") || lowerGov.includes("qalyubia")
        ) {
            return 100;
        }
        return 150;
    };

    const currentShippingFee = customerGovernorate ? getShippingFee() : 0;
    const finalTotalPrice = subTotalPrice > 0 ? subTotalPrice + currentShippingFee : 0;

    // ==========================================
    // 8. WHATSAPP CHECKOUT HANDLER
    // ==========================================
    const handleWhatsAppCheckout = (e) => {
        e.preventDefault();
        
        if (activeCartItems.length === 0) {
            alert(lang === 'ar' ? "يرجى إضافة منتجات للسلة أولاً." : "Please add items to your cart.");
            return;
        }
        if (!customerName || !customerPhone || !customerGovernorate || !customerAddress) {
            alert(lang === 'ar' ? "يرجى تعبئة كافة بيانات الشحن المطلوبة." : "Please fill in all shipping details.");
            return;
        }

        let message = "";
        if (lang === 'ar') {
            message = `*طلب جديد من TV Sreen*\n\n`;
            message += `*العميل:* ${customerName}\n`;
            message += `*الهاتف:* ${customerPhone}\n`;
            message += `*المحافظة:* ${customerGovernorate}\n`;
            message += `*العنوان:* ${customerAddress}\n\n`;
            message += `*المنتجات المطلوبة:*\n`;
            
            activeCartItems.forEach((item, index) => {
                message += `${index + 1}. ${item.nameAr} (الكمية: ${item.qty}) - المجموع الفرعي: ${item.price * item.qty} ${t.currency}\n`;
            });

            message += `\n*المجموع الفرعي:* ${subTotalPrice} ${t.currency}\n`;
            message += `*رسوم الشحن:* ${currentShippingFee} ${t.currency}\n`;
            message += `*الإجمالي النهائي بالشحن:* ${finalTotalPrice} ${t.currency}\n\n`;
            message += `يرجى تأكيد الطلب. شكراً لك!`;
        } else {
            message = `*New Order from TV Screen Store*\n\n`;
            message += `*Customer:* ${customerName}\n`;
            message += `*Phone:* ${customerPhone}\n`;
            message += `*Governorate:* ${customerGovernorate}\n`;
            message += `*Address:* ${customerAddress}\n\n`;
            message += `*Ordered Items:*\n`;
            
            activeCartItems.forEach((item, index) => {
                message += `${index + 1}. ${item.nameEn} (Qty: ${item.qty}) - Subtotal: ${item.price * item.qty} ${t.currency}\n`;
            });

            message += `\n*Subtotal:* ${subTotalPrice} ${t.currency}\n`;
            message += `*Shipping Fee:* ${currentShippingFee} ${t.currency}\n`;
            message += `*Grand Total with Shipping:* ${finalTotalPrice} ${t.currency}\n\n`;
            message += `Please confirm the order. Thank you!`;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = "201127808865";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    // ==========================================
    // 9. RENDER JSX COMPONENT
    // ==========================================
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans w-full transition-all duration-300">
            <div className="w-full flex flex-col min-h-screen">

                {/* HEADER SECTION */}
                <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-10 py-4 flex items-center justify-between shadow-sm">
                    {/* Store Logo & Branding */}
                    <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setView("home")}>
                        <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-110 transition-transform duration-300 rounded-xl">
                            <i className="fa-solid fa-tv"></i>
                        </div>
                        <div>
                            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent block">
                                {t.storeName}
                            </span>
                            <div className="flex items-center space-x-3 text-xs text-slate-500">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors"><i className="fa-brands fa-facebook"></i> Facebook</a>
                                <span>•</span>
                                <a href="https://wa.me/201127808865" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors"><i className="fa-brands fa-whatsapp"></i> WhatsApp</a>
                            </div>
                        </div>
                    </div>

                    {/* Right Header Actions: Language Switcher & Cart */}
                    <div className="flex items-center space-x-3">
                        {/* Language Switcher Button */}
                        <button 
                            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 px-4 py-2 text-xs font-bold text-blue-600 transition-all duration-300 cursor-pointer flex items-center space-x-1.5 shadow-sm active:scale-95 rounded-xl"
                        >
                            <i className="fa-solid fa-globe"></i>
                            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
                        </button>

                        {/* Cart Button with animated badge */}
                        <button 
                            onClick={() => setView("cart")}
                            className="relative bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 flex items-center space-x-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95 group rounded-xl"
                        >
                            <i className="fa-solid fa-cart-shopping text-cyan-200 group-hover:scale-110 transition-transform"></i>
                            <span className="font-bold text-sm">{t.cart}</span>
                            {totalItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 font-black text-xs w-6 h-6 flex items-center justify-center shadow-md animate-bounce rounded-full">
                                    {totalItemsCount}
                                </span>
                            )}
                        </button>
                    </div>
                </header>

                {/* MAIN CONTENT CONTAINER */}
                <main className="flex-grow p-4 md:px-10 py-6 w-full">

                    {/* ================= VIEW 1: HOME PAGE ================= */}
                    {view === "home" && (
                        <div className="space-y-6 w-full animate-fadeIn">
                            {/* Hero Banner */}
                            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white p-6 md:p-10 text-center space-y-3 shadow-xl rounded-2xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
                                <div className="relative z-10 space-y-3">
                                    <span className="inline-block bg-white/20 text-white border border-white/30 text-xs px-3 py-1 font-semibold uppercase tracking-wider backdrop-blur-sm rounded-lg">
                                        {t.heroBadge}
                                    </span>
                                    <h1 className="text-3xl md:text-5xl font-black">{t.heroTitle}</h1>
                                    <p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto">{t.heroDesc}</p>
                                </div>
                            </div>

                            {/* Search Bar & Category Filter Buttons */}
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="relative w-full md:w-96">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 text-sm">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        placeholder={t.searchPlaceholder}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`w-full bg-white border border-slate-300 pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-slate-900 shadow-sm transition-all rounded-xl ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                    />
                                </div>

                                <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
                                    {[
                                        { id: 'all', label: t.all },
                                        { id: 'gaming', label: t.gaming },
                                        { id: 'tv', label: t.tv },
                                        { id: 'ultrawide', label: t.ultrawide },
                                        { id: 'portable', label: t.portable },
                                    ].map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-4 py-2 text-xs font-bold transition-all duration-300 cursor-pointer rounded-xl shadow-sm ${selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Products Responsive Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                {filteredProducts.map(product => {
                                    const cartItem = getCartItem(product.id);
                                    const qty = cartItem ? cartItem.qty : 0;
                                    const productName = lang === 'ar' ? product.nameAr : product.nameEn;
                                    const productDesc = lang === 'ar' ? product.descAr : product.descEn;

                                    return (
                                        <div key={product.id} className="bg-white border border-slate-200 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between rounded-none group">
                                            {/* Product Image & Price Tag (Sharp Corners) */}
                                            <div 
                                                onClick={() => { setSelectedProduct(product); setView("detail"); }}
                                                className="h-36 sm:h-48 overflow-hidden relative cursor-pointer bg-slate-100 rounded-none"
                                            >
                                                <img 
                                                    src={product.image} 
                                                    alt={productName} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-none" 
                                                />
                                                <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-blue-600 font-bold text-[10px] sm:text-xs px-2.5 py-1 border border-slate-200 shadow-sm rounded-lg">
                                                    {product.price} {t.currency}
                                                </span>
                                            </div>

                                            {/* Product Details & Actions */}
                                            <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between space-y-3">
                                                <div onClick={() => { setSelectedProduct(product); setView("detail"); }} className={`cursor-pointer space-y-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                                    <h3 className="font-bold text-xs sm:text-base text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{productName}</h3>
                                                    <p className="text-slate-500 text-[10px] sm:text-xs line-clamp-2">{productDesc}</p>
                                                </div>

                                                {/* Add Button or Quantity Adjuster */}
                                                <div>
                                                    {qty === 0 ? (
                                                        <button 
                                                            onClick={() => handleAddInitial(product)}
                                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 sm:py-2.5 px-2 sm:px-4 text-[11px] sm:text-xs transition-all duration-300 flex items-center justify-center space-x-1 shadow-md hover:shadow-blue-600/25 cursor-pointer active:scale-95 rounded-xl"
                                                        >
                                                            <i className="fa-solid fa-cart-plus"></i>
                                                            <span>{t.add}</span>
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center justify-between bg-slate-100 border border-slate-200 p-1 rounded-xl shadow-inner">
                                                            <button 
                                                                onClick={() => updateQty(product.id, -1, false)}
                                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer transition-colors shadow-sm rounded-lg"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="font-bold text-[11px] sm:text-xs text-blue-600">{qty}</span>
                                                            <button 
                                                                onClick={() => updateQty(product.id, 1, false)}
                                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer transition-colors shadow-sm rounded-lg"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* ================= VIEW 2: PRODUCT DETAIL PAGE ================= */}
                    {view === "detail" && selectedProduct && (
                        <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
                            {/* Back to Home button on the right side */}
                            <div className="flex justify-end">
                                <button 
                                    onClick={() => setView("home")}
                                    className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-4 py-2 text-xs font-semibold flex items-center space-x-2 cursor-pointer transition-colors shadow-sm rounded-xl"
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                    <span>{t.backToHome}</span>
                                </button>
                            </div>

                            <div className="bg-white border border-slate-200 overflow-hidden shadow-2xl rounded-2xl grid grid-cols-1 md:grid-cols-2">
                                {/* Optimized image size for phone & laptop, strictly sharp corners (rounded-none) */}
                                <div className="h-56 sm:h-72 md:h-full relative bg-slate-100 rounded-none">
                                    <img src={selectedProduct.image} alt={lang === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn} className="w-full h-full object-cover rounded-none" />
                                </div>
                                <div className={`p-6 md:p-8 flex flex-col justify-between space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                    <div className="space-y-3">
                                        <span className="inline-block bg-blue-50 text-blue-600 border border-blue-200 text-[10px] px-3 py-1 font-semibold uppercase tracking-wider rounded-lg">
                                            {selectedProduct.category}
                                        </span>
                                        <h1 className="text-2xl font-black text-slate-900">{lang === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}</h1>
                                        <p className="text-blue-600 font-bold text-lg">{selectedProduct.price} {t.currency}</p>
                                        <p className="text-slate-600 text-xs leading-relaxed">{lang === 'ar' ? selectedProduct.descAr : selectedProduct.descEn}</p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-200">
                                        {(() => {
                                            const itemInCart = getCartItem(selectedProduct.id);
                                            const qty = itemInCart ? itemInCart.qty : 0;
                                            return qty === 0 ? (
                                                <button 
                                                    onClick={() => handleAddInitial(selectedProduct)}
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/25 cursor-pointer rounded-xl active:scale-95"
                                                >
                                                    <i className="fa-solid fa-cart-plus"></i>
                                                    <span>{t.addToCart}</span>
                                                </button>
                                            ) : (
                                                <div className="flex items-center justify-between bg-slate-100 border border-slate-200 p-2 rounded-xl shadow-inner">
                                                    <button 
                                                        onClick={() => updateQty(selectedProduct.id, -1, false)}
                                                        className="w-10 h-10 bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center text-sm font-bold cursor-pointer shadow-sm rounded-xl"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-bold text-sm text-blue-600">{t.quantity}: {qty}</span>
                                                    <button 
                                                        onClick={() => updateQty(selectedProduct.id, 1, false)}
                                                        className="w-10 h-10 bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center text-sm font-bold cursor-pointer shadow-sm rounded-xl"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ================= VIEW 3: CART & CHECKOUT PAGE ================= */}
                    {view === "cart" && (
                        <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between gap-3">
                                {cart.length > 0 && (
                                    <button 
                                        onClick={clearCart}
                                        className="bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 px-4 py-2 text-xs font-semibold flex items-center space-x-2 cursor-pointer transition-colors rounded-xl shadow-sm"
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                        <span>{t.clearCart}</span>
                                    </button>
                                )}
                                <button 
                                    onClick={() => setView("home")}
                                    className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-4 py-2 text-xs font-semibold flex items-center space-x-2 cursor-pointer transition-colors shadow-sm rounded-xl ml-auto"
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                    <span>{t.continueShopping}</span>
                                </button>
                            </div>

                            <h1 className="text-xl font-black text-slate-900 flex items-center space-x-2">
                                <i className="fa-solid fa-bag-shopping text-blue-600"></i>
                                <span>{t.cartTitle}</span>
                            </h1>

                            {cart.length === 0 ? (
                                <div className="text-center py-24 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
                                    <i className="fa-solid fa-cart-shopping text-5xl text-slate-300"></i>
                                    <p className="text-slate-500 text-sm">{t.emptyCart}</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map(item => {
                                        const itemName = lang === 'ar' ? item.nameAr : item.nameEn;
                                        return (
                                            <div key={item.id} className="bg-white p-4 border border-slate-200 rounded-2xl flex items-center justify-between space-x-4 shadow-sm">
                                                <div className={`flex-1 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                                    <h4 className="font-bold text-sm text-slate-900">{itemName}</h4>
                                                    <p className="text-blue-600 text-xs font-semibold mt-1">{item.price} {t.currency} × {item.qty} = {item.price * item.qty} {t.currency}</p>
                                                </div>

                                                <div className="flex items-center space-x-3">
                                                    <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200 p-1 rounded-xl">
                                                        <button 
                                                            onClick={() => updateQty(item.id, -1, true)} 
                                                            className="w-7 h-7 bg-white hover:bg-slate-200 flex items-center justify-center text-xs text-slate-700 cursor-pointer transition-colors shadow-sm rounded-lg"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-xs font-bold px-2 text-blue-600">{item.qty}</span>
                                                        <button 
                                                            onClick={() => updateQty(item.id, 1, true)} 
                                                            className="w-7 h-7 bg-white hover:bg-slate-200 flex items-center justify-center text-xs text-slate-700 cursor-pointer transition-colors shadow-sm rounded-lg"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button 
                                                        onClick={() => removeCompletely(item.id)}
                                                        className="w-9 h-9 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 flex items-center justify-center text-xs cursor-pointer transition-colors rounded-xl border border-rose-200"
                                                        title="Remove item"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Order Summary & Customer Form */}
                                    <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 mt-6 shadow-xl" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                                        <div className="space-y-2 text-sm border-b border-slate-200 pb-4">
                                            <div className="flex justify-between text-slate-600">
                                                <span>{t.subtotal}</span>
                                                <span className="font-semibold text-slate-900">{subTotalPrice} {t.currency}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-600">
                                                <span>{t.shippingFee}</span>
                                                <span className="font-semibold text-slate-900">{customerGovernorate ? `${currentShippingFee} ${t.currency}` : (lang === 'ar' ? 'يُحدد عند اختيار المحافظة' : 'Calculated at gov selection')}</span>
                                            </div>
                                            <div className="flex justify-between text-base font-bold text-slate-900 pt-1">
                                                <span>{t.grandTotal}</span>
                                                <span className="text-blue-600">{customerGovernorate ? `${finalTotalPrice} ${t.currency}` : `${subTotalPrice} ${t.currency}`}</span>
                                            </div>
                                        </div>

                                        <form onSubmit={handleWhatsAppCheckout} className="space-y-3">
                                            <input 
                                                type="text" 
                                                placeholder={t.namePlaceholder}
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                required
                                                className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-slate-900 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                            />
                                            <input 
                                                type="tel"
                                                maxLength={11}
                                                minLength={11}
                                                placeholder={t.phonePlaceholder}
                                                value={customerPhone}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '').slice(0, 11);
                                                    setCustomerPhone(val);
                                                }}
                                                required
                                                className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-slate-900 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                            />
                                            
                                            {/* Governorate Search/Select Dropdown */}
                                            <select
                                                value={customerGovernorate}
                                                onChange={(e) => setCustomerGovernorate(e.target.value)}
                                                required
                                                className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-slate-900 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                            >
                                                <option value="" disabled>{t.selectGov}</option>
                                                {governorates.map((gov, index) => (
                                                    <option key={index} value={lang === 'ar' ? gov.ar : gov.en}>
                                                        {lang === 'ar' ? gov.ar : gov.en}
                                                    </option>
                                                ))}
                                            </select>

                                            <textarea 
                                                placeholder={t.addressPlaceholder}
                                                value={customerAddress}
                                                onChange={(e) => setCustomerAddress(e.target.value)}
                                                required
                                                rows="2"
                                                className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 resize-none text-slate-900 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                            ></textarea>

                                            <button 
                                                type="submit"
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/25 text-xs cursor-pointer rounded-xl active:scale-95"
                                            >
                                                <i className="fa-brands fa-whatsapp text-base"></i>
                                                <span>{t.sendWhatsApp}</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </main>

                {/* FOOTER SECTION */}
                <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 w-full shadow-inner">
                    <p>{t.footer}</p>
                </footer>

            </div>
        </div>
    );
}