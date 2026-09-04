// Import necessary hooks from React library
import React, { useState, useMemo, useEffect } from 'react';

// ==========================================
// 1. INITIAL PRODUCTS DATA (12 Bilingual Products)
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
    },
    { 
        id: 7, 
        nameAr: "شاشة ألعاب سريعة 24.5 بوصة 360 هرتز", 
        nameEn: "24.5\" Fast Gaming Monitor 360Hz", 
        category: "gaming", 
        price: 11200, 
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60", 
        descAr: "معدل تحديث خارق 360 هرتز للألعاب التنافسية والرياضات الإلكترونية مع زمن استجابة 0.5 مللي ثانية.",
        descEn: "Blazing 360Hz refresh rate designed for esports and competitive gaming with ultra-low 0.5ms response time." 
    },
    { 
        id: 8, 
        nameAr: "تلفزيون ذكي 75 بوصة 4K كريستال", 
        nameEn: "75\" 4K Crystal Smart TV", 
        category: "tv", 
        price: 29500, 
        image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=500&auto=format&fit=crop&q=60", 
        descAr: "شاشة عملاقة بمعالج كريستالي ذكي لتحسين الدقة إلى 4K، مع دعم المساعد الصوتي وتطبيق AirPlay.",
        descEn: "Gigantic display with crystal processor 4K upscaling, smart voice assistant support, and Apple AirPlay integration." 
    },
    { 
        id: 9, 
        nameAr: "شاشة عريضة مقوسة 49 بوصة Dual QHD", 
        nameEn: "49\" Curved Super Ultrawide Monitor Dual QHD", 
        category: "ultrawide", 
        price: 32000, 
        image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=500&auto=format&fit=crop&q=60", 
        descAr: "تجربة بصرية فائقة تعادل شاشتين 27 بوصة مدمجتين، مثالية للتداول، صناعة الموسيقى وإدارة المهام المتعددة.",
        descEn: "Super ultrawide display equivalent to dual 27-inch setups, perfect for financial trading, music production, and multitasking." 
    },
    { 
        id: 10, 
        nameAr: "شاشة محمولة 16 بوصة 2K 120 هرتز", 
        nameEn: "16\" Portable 2K Display 120Hz", 
        category: "portable", 
        price: 6200, 
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=60", 
        descAr: "شاشة خفيفة الوزن ونحيفة للغاية بدقة 2K ومعدل 120 هرتز، ممتازة للعمل أثناء السفر ولأجهزة الكونسول المحمولة.",
        descEn: "Ultra-slim and lightweight 2K 120Hz portable monitor, perfect for remote workflows and handheld gaming consoles." 
    },
    { 
        id: 11, 
        nameAr: "تلفزيون ذكي 43 بوصة Full HD بنظام أندرويد", 
        nameEn: "43\" Full HD Smart Android TV", 
        category: "tv", 
        price: 9800, 
        image: "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&auto=format&fit=crop&q=60", 
        descAr: "حجم عملي مناسب لغرف النوم والمكاتب بنظام Android TV مع متجر Google Play وChromecast مدمج.",
        descEn: "Practical size for bedrooms and offices featuring Android TV OS, built-in Chromecast, and Google Play access." 
    },
    { 
        id: 12, 
        nameAr: "شاشة ألعاب 27 بوصة IPS 2K 165 هرتز", 
        nameEn: "27\" 2K QHD Gaming IPS Monitor 165Hz", 
        category: "gaming", 
        price: 10400, 
        image: "https://images.unsplash.com/photo-1616763355548-1b606f43848c?w=500&auto=format&fit=crop&q=60", 
        descAr: "توازن مثالي بين دقة 2K وزوايا الرؤية الواسعة للوحة IPS مع تقنية FreeSync ومعدل تحديث 165 هرتز.",
        descEn: "Sweet spot 2K resolution with wide IPS viewing angles, AMD FreeSync technology, and smooth 165Hz refresh rate." 
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
        downloadApp: "تحميل التطبيق",
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
        downloadApp: "Download App",
        footer: "TV Screen Store © 2026 | High Performance Responsive Store"
    }
};

export default function App() {
    // ==========================================
    // 4. STATE MANAGEMENT & LOCALSTORAGE PERSISTENCE
    // ==========================================
    const [lang, setLang] = useState(() => localStorage.getItem('store_lang') || "ar");
    const [view, setView] = useState("home"); 
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Standalone app / PWA state
    const [isAppInstalled, setIsAppInstalled] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    // Cart state
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('store_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Error reading cart from localStorage:", error);
            return [];
        }
    });
    
    // Customer form states
    const [customerName, setCustomerName] = useState(() => localStorage.getItem('store_cust_name') || "");
    const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem('store_cust_phone') || "");
    const [customerGovernorate, setCustomerGovernorate] = useState(() => localStorage.getItem('store_cust_gov') || "");
    const [customerAddress, setCustomerAddress] = useState(() => localStorage.getItem('store_cust_addr') || "");

    useEffect(() => {
        localStorage.setItem('store_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('store_lang', lang);
    }, [lang]);

    useEffect(() => {
        localStorage.setItem('store_cust_name', customerName);
        localStorage.setItem('store_cust_phone', customerPhone);
        localStorage.setItem('store_cust_gov', customerGovernorate);
        localStorage.setItem('store_cust_addr', customerAddress);
    }, [customerName, customerPhone, customerGovernorate, customerAddress]);

    useEffect(() => {
        const isStandalone = 
            window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true;

        if (isStandalone) {
            setIsAppInstalled(true);
        }

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const t = translations[lang];

    const handleDownloadApp = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    setDeferredPrompt(null);
                    setIsAppInstalled(true);
                }
            });
        } else {
            const link = document.createElement('a');
            link.href = '/app.apk'; 
            link.download = 'TV-Screen-Store.apk';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

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
        localStorage.removeItem('store_cart');
    };

    const handleContinueShopping = () => {
        setCart(prev => prev.filter(item => item.qty > 0));
        setView("home");
    };

    // ==========================================
    // 7. CART & SHIPPING CALCULATIONS
    // ==========================================
    const activeCartItems = cart.filter(item => item.qty > 0);
    const totalItemsCount = activeCartItems.reduce((sum, item) => sum + item.qty, 0);
    const subTotalPrice = activeCartItems.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty)), 0);

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
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans w-full max-w-full overflow-x-hidden transition-all duration-300">
            <div className="w-full flex flex-col min-h-screen">

                {/* HEADER / TOOLBAR */}
                <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 md:px-10 py-2.5 sm:py-3.5 flex items-center justify-between shadow-sm w-full">
                    <div 
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none min-w-0" 
                        onClick={() => {
                            setCart(prev => prev.filter(item => item.qty > 0));
                            setView("home");
                        }}
                    >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-black text-base sm:text-xl shadow-md group-hover:scale-105 transition-transform duration-300 rounded-lg sm:rounded-xl">
                            <i className="fa-solid fa-tv"></i>
                        </div>
                        <div className="min-w-0">
                            <span className="text-sm sm:text-base md:text-lg font-black tracking-tight bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent truncate block">
                                {t.storeName}
                            </span>
                            <div className="hidden md:flex items-center space-x-2 text-[11px] text-slate-500">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors"><i className="fa-brands fa-facebook"></i> Facebook</a>
                                <span>•</span>
                                <a href="https://wa.me/201127808865" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors"><i className="fa-brands fa-whatsapp"></i> WhatsApp</a>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
                        {!isAppInstalled && (
                            <button 
                                onClick={handleDownloadApp}
                                title={t.downloadApp}
                                className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 p-2 sm:px-3 sm:py-2 text-xs font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 rounded-lg sm:rounded-xl"
                            >
                                <i className="fa-solid fa-mobile-screen-button text-emerald-600 text-xs sm:text-sm"></i>
                                <span className="hidden md:inline">{t.downloadApp}</span>
                            </button>
                        )}

                        <button 
                            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
                            title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
                            className="bg-slate-100 hover:bg-slate-200 border border-slate-300 p-2 sm:px-3 sm:py-2 text-xs font-bold text-blue-600 transition-all duration-300 cursor-pointer flex items-center gap-1.5 shadow-sm active:scale-95 rounded-lg sm:rounded-xl"
                        >
                            <i className="fa-solid fa-globe text-xs sm:text-sm"></i>
                            <span className="hidden sm:inline">{lang === 'ar' ? 'English' : 'العربية'}</span>
                            <span className="sm:hidden text-[10px] font-black uppercase">{lang === 'ar' ? 'EN' : 'ع'}</span>
                        </button>

                        <button 
                            onClick={() => setView("cart")}
                            className="relative bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-2 sm:px-4 sm:py-2 flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95 group rounded-lg sm:rounded-xl"
                        >
                            <i className="fa-solid fa-cart-shopping text-cyan-200 text-xs sm:text-sm group-hover:scale-110 transition-transform"></i>
                            <span className="font-bold text-xs sm:text-sm hidden xs:inline">{t.cart}</span>
                            {totalItemsCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black text-[10px] sm:text-xs w-5 h-5 flex items-center justify-center shadow-md animate-bounce rounded-full border border-white">
                                    {totalItemsCount}
                                </span>
                            )}
                        </button>
                    </div>
                </header>

                {/* MAIN CONTENT CONTAINER */}
                <main className="flex-grow p-3 sm:p-6 md:px-10 py-5 w-full">

                    {/* ================= VIEW 1: HOME PAGE ================= */}
                    {view === "home" && (
                        <div className="space-y-6 w-full animate-fadeIn">
                            
                            {/* SEARCH & CATEGORIES (CENTERED & STACKED FOR PC & MOBILE) */}
                            <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 w-full max-w-2xl mx-auto my-2">
                                {/* Search Bar (Centered on Top) */}
                                <div className="relative w-full max-w-lg">
                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        placeholder={t.searchPlaceholder}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className={`w-full bg-white border border-slate-300 pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-slate-900 shadow-sm transition-all rounded-xl ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                    />
                                </div>

                                {/* Category Filter Buttons (Directly Below & Centered) */}
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center w-full">
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
                                            className={`px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold transition-all duration-300 cursor-pointer rounded-lg sm:rounded-xl shadow-sm ${selectedCategory === cat.id ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'}`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Responsive Products Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                                {filteredProducts.map(product => {
                                    const cartItem = getCartItem(product.id);
                                    const qty = cartItem ? cartItem.qty : 0;
                                    const productName = lang === 'ar' ? product.nameAr : product.nameEn;
                                    const productDesc = lang === 'ar' ? product.descAr : product.descEn;

                                    return (
                                        <div key={product.id} className="bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between rounded-none group">
                                            <div 
                                                onClick={() => { setSelectedProduct(product); setView("detail"); }}
                                                className="h-32 sm:h-48 overflow-hidden relative cursor-pointer bg-slate-100 rounded-none"
                                            >
                                                <img 
                                                    src={product.image} 
                                                    alt={productName} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none" 
                                                />
                                                <span className="absolute top-2 right-2 bg-white/95 backdrop-blur-md text-blue-600 font-bold text-[9px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 border border-slate-200 shadow-sm rounded-md">
                                                    {product.price} {t.currency}
                                                </span>
                                            </div>

                                            <div className="p-2.5 sm:p-4 flex flex-col flex-grow justify-between space-y-2 sm:space-y-3">
                                                <div onClick={() => { setSelectedProduct(product); setView("detail"); }} className={`cursor-pointer space-y-0.5 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                                    <h3 className="font-bold text-[11px] sm:text-sm text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{productName}</h3>
                                                    <p className="text-slate-500 text-[9px] sm:text-xs line-clamp-2">{productDesc}</p>
                                                </div>

                                                <div>
                                                    {qty === 0 ? (
                                                        <button 
                                                            onClick={() => handleAddInitial(product)}
                                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 sm:py-2.5 px-2 text-[10px] sm:text-xs transition-all duration-300 flex items-center justify-center space-x-1 shadow-sm hover:shadow-blue-600/25 cursor-pointer active:scale-95 rounded-lg sm:rounded-xl"
                                                        >
                                                            <i className="fa-solid fa-cart-plus"></i>
                                                            <span>{t.add}</span>
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center justify-between bg-slate-100 border border-slate-200 p-0.5 sm:p-1 rounded-lg sm:rounded-xl shadow-inner">
                                                            <button 
                                                                onClick={() => updateQty(product.id, -1, false)}
                                                                className="w-6 h-6 sm:w-8 sm:h-8 bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer transition-colors shadow-sm rounded-md"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="font-bold text-[10px] sm:text-xs text-blue-600">{qty}</span>
                                                            <button 
                                                                onClick={() => updateQty(product.id, 1, false)}
                                                                className="w-6 h-6 sm:w-8 sm:h-8 bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer transition-colors shadow-sm rounded-md"
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
                        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                            <div className="flex justify-end">
                                <button 
                                    onClick={() => setView("home")}
                                    className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold flex items-center space-x-2 cursor-pointer transition-colors shadow-sm rounded-xl"
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                    <span>{t.backToHome}</span>
                                </button>
                            </div>

                            <div className="bg-white border border-slate-200 overflow-hidden shadow-xl rounded-2xl grid grid-cols-1 md:grid-cols-2">
                                <div className="h-56 sm:h-72 md:h-full relative bg-slate-100 rounded-none">
                                    <img src={selectedProduct.image} alt={lang === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn} className="w-full h-full object-cover rounded-none" />
                                </div>
                                <div className={`p-5 sm:p-8 flex flex-col justify-between space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                    <div className="space-y-2 sm:space-y-3">
                                        <span className="inline-block bg-blue-50 text-blue-600 border border-blue-200 text-[10px] px-2.5 py-0.5 font-semibold uppercase tracking-wider rounded-md">
                                            {selectedProduct.category}
                                        </span>
                                        <h1 className="text-xl sm:text-2xl font-black text-slate-900">{lang === 'ar' ? selectedProduct.nameAr : selectedProduct.nameEn}</h1>
                                        <p className="text-blue-600 font-bold text-base sm:text-lg">{selectedProduct.price} {t.currency}</p>
                                        <p className="text-slate-600 text-xs leading-relaxed">{lang === 'ar' ? selectedProduct.descAr : selectedProduct.descEn}</p>
                                    </div>

                                    <div className="pt-3 border-t border-slate-200">
                                        {(() => {
                                            const itemInCart = getCartItem(selectedProduct.id);
                                            const qty = itemInCart ? itemInCart.qty : 0;
                                            return qty === 0 ? (
                                                <button 
                                                    onClick={() => handleAddInitial(selectedProduct)}
                                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 sm:py-3 px-4 text-xs sm:text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-md shadow-blue-600/25 cursor-pointer rounded-xl active:scale-95"
                                                >
                                                    <i className="fa-solid fa-cart-plus"></i>
                                                    <span>{t.addToCart}</span>
                                                </button>
                                            ) : (
                                                <div className="flex items-center justify-between bg-slate-100 border border-slate-200 p-1.5 sm:p-2 rounded-xl shadow-inner">
                                                    <button 
                                                        onClick={() => updateQty(selectedProduct.id, -1, false)}
                                                        className="w-8 h-8 sm:w-10 sm:h-10 bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer shadow-sm rounded-lg sm:rounded-xl"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-bold text-xs sm:text-sm text-blue-600">{t.quantity}: {qty}</span>
                                                    <button 
                                                        onClick={() => updateQty(selectedProduct.id, 1, false)}
                                                        className="w-8 h-8 sm:w-10 sm:h-10 bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer shadow-sm rounded-lg sm:rounded-xl"
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
                        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
                            <div className="flex items-center justify-between gap-2">
                                {cart.length > 0 && (
                                    <button 
                                        onClick={clearCart}
                                        className="bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-colors rounded-xl shadow-sm"
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                        <span>{t.clearCart}</span>
                                    </button>
                                )}
                                <button 
                                    onClick={handleContinueShopping}
                                    className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition-colors shadow-sm rounded-xl ml-auto"
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                    <span>{t.continueShopping}</span>
                                </button>
                            </div>

                            <h1 className="text-lg sm:text-xl font-black text-slate-900 flex items-center space-x-2">
                                <i className="fa-solid fa-bag-shopping text-blue-600"></i>
                                <span>{t.cartTitle}</span>
                            </h1>

                            {cart.length === 0 ? (
                                <div className="text-center py-16 sm:py-24 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
                                    <i className="fa-solid fa-cart-shopping text-4xl sm:text-5xl text-slate-300"></i>
                                    <p className="text-slate-500 text-xs sm:text-sm">{t.emptyCart}</p>
                                </div>
                            ) : (
                                <div className="space-y-3 sm:space-y-4">
                                    {cart.map(item => {
                                        const itemName = lang === 'ar' ? item.nameAr : item.nameEn;
                                        return (
                                            <div key={item.id} className="bg-white p-3 sm:p-4 border border-slate-200 rounded-xl sm:rounded-2xl flex items-center justify-between gap-2 shadow-sm">
                                                <div className={`flex-1 min-w-0 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                                                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{itemName}</h4>
                                                    <p className="text-blue-600 text-[11px] sm:text-xs font-semibold mt-0.5">{item.price} {t.currency} × {item.qty} = {item.price * item.qty} {t.currency}</p>
                                                </div>

                                                <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                                                    <div className="flex items-center space-x-1 bg-slate-100 border border-slate-200 p-0.5 sm:p-1 rounded-lg">
                                                        <button 
                                                            onClick={() => updateQty(item.id, -1, true)} 
                                                            className="w-6 h-6 sm:w-7 sm:h-7 bg-white hover:bg-slate-200 flex items-center justify-center text-xs text-slate-700 cursor-pointer transition-colors shadow-sm rounded-md"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="text-[11px] sm:text-xs font-bold px-1.5 text-blue-600">{item.qty}</span>
                                                        <button 
                                                            onClick={() => updateQty(item.id, 1, true)} 
                                                            className="w-6 h-6 sm:w-7 sm:h-7 bg-white hover:bg-slate-200 flex items-center justify-center text-xs text-slate-700 cursor-pointer transition-colors shadow-sm rounded-md"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <button 
                                                        onClick={() => removeCompletely(item.id)}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 flex items-center justify-center text-xs cursor-pointer transition-colors rounded-lg sm:rounded-xl"
                                                        title="Remove item"
                                                    >
                                                        <i className="fa-solid fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {/* Order Summary & Form */}
                                    <div className="bg-white border border-slate-200 p-4 sm:p-6 rounded-2xl space-y-3 sm:space-y-4 mt-4 sm:mt-6 shadow-lg" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                                        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm border-b border-slate-200 pb-3">
                                            <div className="flex justify-between text-slate-600">
                                                <span>{t.subtotal}</span>
                                                <span className="font-semibold text-slate-900">{subTotalPrice} {t.currency}</span>
                                            </div>
                                            <div className="flex justify-between text-slate-600">
                                                <span>{t.shippingFee}</span>
                                                <span className="font-semibold text-slate-900">{customerGovernorate ? `${currentShippingFee} ${t.currency}` : (lang === 'ar' ? 'يُحدد عند اختيار المحافظة' : 'Calculated at gov selection')}</span>
                                            </div>
                                            <div className="flex justify-between text-sm sm:text-base font-bold text-slate-900 pt-1">
                                                <span>{t.grandTotal}</span>
                                                <span className="text-blue-600">{customerGovernorate ? `${finalTotalPrice} ${t.currency}` : `${subTotalPrice} ${t.currency}`}</span>
                                            </div>
                                        </div>

                                        <form onSubmit={handleWhatsAppCheckout} className="space-y-2.5 sm:space-y-3">
                                            <input 
                                                type="text" 
                                                placeholder={t.namePlaceholder}
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                required
                                                className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-slate-900 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
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
                                                className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-slate-900 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                            />
                                            
                                            <select
                                                value={customerGovernorate}
                                                onChange={(e) => setCustomerGovernorate(e.target.value)}
                                                required
                                                className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-slate-900 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
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
                                                className={`w-full bg-slate-50 border border-slate-300 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 resize-none text-slate-900 transition-all ${lang === 'ar' ? 'text-right' : 'text-left'}`}
                                            ></textarea>

                                            <button 
                                                type="submit"
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 sm:py-3.5 px-4 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/25 text-xs cursor-pointer rounded-xl active:scale-95"
                                            >
                                                <i className="fa-brands fa-whatsapp text-sm sm:text-base"></i>
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
                <footer className="bg-white border-t border-slate-200 py-3 sm:py-4 text-center text-[11px] sm:text-xs text-slate-500 w-full shadow-inner">
                    <p>{t.footer}</p>
                </footer>

            </div>
        </div>
    );
}