import React, { useState, useMemo } from 'react';

const initialProducts = [
    { 
        id: 1, 
        name: "27\" Curved Gaming Monitor 240Hz", 
        category: "gaming", 
        price: 8500, 
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60", 
        desc: "Ultra-responsive 1ms refresh rate with G-Sync support for lag-free gaming. Designed for hardcore gamers with vibrant colors and ergonomic stand." 
    },
    { 
        id: 2, 
        name: "55\" 4K OLED Smart TV", 
        category: "tv", 
        price: 18900, 
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500&auto=format&fit=crop&q=60", 
        desc: "True colors and deep blacks with built-in smart system, Netflix, YouTube, and pure surround sound for cinematic home experience." 
    },
    { 
        id: 3, 
        name: "34\" Professional Ultrawide Monitor", 
        category: "ultrawide", 
        price: 14200, 
        image: "https://images.unsplash.com/photo-1586210015494-b295d36e2f18?w=500&auto=format&fit=crop&q=60", 
        desc: "Ideal for video editing, software development, and multi-window programming with a massive panoramic workspace." 
    },
    { 
        id: 4, 
        name: "32\" Gaming Monitor 4K 144Hz", 
        category: "gaming", 
        price: 13500, 
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=60", 
        desc: "Stunning 4K resolution and high refresh rate tailored for next-gen console and PC professional content creators." 
    },
    { 
        id: 5, 
        name: "15.6\" Portable Touch Screen", 
        category: "portable", 
        price: 4600, 
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60", 
        desc: "Your ideal travel companion, supporting fast USB Type-C connectivity, full touch support for laptops and smartphones." 
    },
    { 
        id: 6, 
        name: "65\" QLED Cinematic TV", 
        category: "tv", 
        price: 24000, 
        image: "https://images.unsplash.com/photo-1567690187548-f07b1d4bf5a9?w=500&auto=format&fit=crop&q=60", 
        desc: "Massive screen with Quantum Dot technology for ultra-bright illumination, HDR10+, and vivid cinematic colors." 
    }
];

const SHIPPING_FEE = 50;

export default function App() {
    const [view, setView] = useState("home"); // "home" | "detail" | "cart"
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [cart, setCart] = useState([]);
    
    // Checkout form state
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [orderSuccess, setOrderSuccess] = useState(false);

    // Filter products
    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  product.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const getCartItem = (id) => cart.find(item => item.id === id);

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
                        return null; // Remove entirely if from home/detail page
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

    // Calculations
    const activeCartItems = cart.filter(item => item.qty > 0);
    const totalItemsCount = activeCartItems.reduce((sum, item) => sum + item.qty, 0);
    const subTotalPrice = activeCartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const finalTotalPrice = subTotalPrice > 0 ? subTotalPrice + SHIPPING_FEE : 0;

    // WhatsApp Checkout Handler
    const handleWhatsAppCheckout = (e) => {
        e.preventDefault();
        if (activeCartItems.length === 0) {
            alert("Please add items with quantity greater than 0 to checkout.");
            return;
        }
        if (!customerName || !customerPhone || !customerAddress) {
            alert("Please fill in shipping details (Name, Phone, Address).");
            return;
        }

        let message = `🛒 *New Order from TV Screen Store*\n\n`;
        message += `👤 *Customer:* ${customerName}\n`;
        message += `📞 *Phone:* ${customerPhone}\n`;
        message += `📍 *Address:* ${customerAddress}\n\n`;
        message += `📦 *Ordered Items:*\n`;
        
        activeCartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name} (Qty: ${item.qty}) - Subtotal: ${item.price * item.qty} EGP\n`;
        });

        message += `\n🚚 *Shipping Fee:* ${SHIPPING_FEE} EGP\n`;
        message += `💰 *Grand Total: ${finalTotalPrice} EGP*\n\n`;
        message += `Please confirm the order. Thank you!`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = "201127808865";
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        setOrderSuccess(true);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full">
            <div className="w-full flex flex-col min-h-screen">

                {/* HEADER (Full Width) */}
                <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 md:px-10 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView("home")}>
                        <div className="w-10 h-10 rounded-none bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
                            <i className="fa-solid fa-tv"></i>
                        </div>
                        <div>
                            <span className="text-lg font-black tracking-wider bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent block">
                                TV Screen Store
                            </span>
                            <div className="flex items-center space-x-3 text-xs text-slate-400">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-cyan-400"><i className="fa-brands fa-facebook"></i> Facebook</a>
                                <span>•</span>
                                <a href="https://wa.me/201127808865" target="_blank" rel="noreferrer" className="hover:text-emerald-400"><i className="fa-brands fa-whatsapp"></i> WhatsApp</a>
                            </div>
                        </div>
                    </div>

                    {/* Cart Button */}
                    <button 
                        onClick={() => setView("cart")}
                        className="relative bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2.5 rounded-none flex items-center space-x-2 transition-all cursor-pointer"
                    >
                        <i className="fa-solid fa-cart-shopping text-cyan-400"></i>
                        <span className="font-bold text-sm">Cart</span>
                        {totalItemsCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-cyan-500 text-slate-950 font-black text-xs w-6 h-6 rounded-none flex items-center justify-center shadow animate-bounce">
                                {totalItemsCount}
                            </span>
                        )}
                    </button>
                </header>

                {/* MAIN CONTENT AREA (Full Width) */}
                <main className="flex-grow p-4 md:px-10 py-6 w-full">

                    {/* VIEW 1: HOME */}
                    {view === "home" && (
                        <div className="space-y-6 w-full">
                            {/* Hero Banner */}
                            <div className="bg-gradient-to-r from-slate-900 to-slate-900/60 border border-slate-800 rounded-none p-6 md:p-10 text-center space-y-3 shadow-inner">
                                <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs px-3 py-1 rounded-none font-semibold uppercase tracking-wider">
                                    Ultimate Display Collection 🖥️
                                </span>
                                <h1 className="text-3xl md:text-5xl font-black text-slate-100">Discover Professional Screens & TVs</h1>
                                <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">Explore high-end gaming monitors, 4K smart TVs, and ultra-wide displays with instant checkout via WhatsApp.</p>
                            </div>

                            {/* Search & Categories Bar */}
                            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                                <div className="relative w-full md:w-96">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 text-sm">
                                        <i className="fa-solid fa-magnifying-glass"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        placeholder="Search screens..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-none pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-slate-100 shadow-inner"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-2 justify-center w-full md:w-auto">
                                    {[
                                        { id: 'all', label: 'All' },
                                        { id: 'gaming', label: 'Gaming' },
                                        { id: 'tv', label: 'Smart TVs' },
                                        { id: 'ultrawide', label: 'Ultrawide' },
                                        { id: 'portable', label: 'Portable' },
                                    ].map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-4 py-2 rounded-none text-xs font-bold transition-all cursor-pointer ${selectedCategory === cat.id ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20' : 'bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800'}`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Products Grid: 2 columns on mobile, up to 4-5 columns on PC to fill the screen */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
                                {filteredProducts.map(product => {
                                    const cartItem = getCartItem(product.id);
                                    const qty = cartItem ? cartItem.qty : 0;

                                    return (
                                        <div key={product.id} className="bg-slate-900 border border-slate-800 rounded-none overflow-hidden shadow-lg flex flex-col justify-between hover:border-cyan-500/40 transition-all">
                                            {/* Sharp Image Frame */}
                                            <div 
                                                onClick={() => { setSelectedProduct(product); setView("detail"); }}
                                                className="h-36 sm:h-48 overflow-hidden relative cursor-pointer group rounded-none"
                                            >
                                                <img 
                                                    src={product.image} 
                                                    alt={product.name} 
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-none" 
                                                />
                                                <span className="absolute top-2 right-2 bg-slate-950/90 backdrop-blur text-cyan-400 font-bold text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-none border border-slate-700">
                                                    {product.price} EGP
                                                </span>
                                            </div>

                                            {/* Info & Actions */}
                                            <div className="p-3 sm:p-5 flex flex-col flex-grow justify-between space-y-3">
                                                <div onClick={() => { setSelectedProduct(product); setView("detail"); }} className="cursor-pointer space-y-1">
                                                    <h3 className="font-bold text-xs sm:text-base text-slate-100 line-clamp-1">{product.name}</h3>
                                                    <p className="text-slate-400 text-[10px] sm:text-xs line-clamp-2">{product.desc}</p>
                                                </div>

                                                {/* Quantity Control or Add Button */}
                                                <div>
                                                    {qty === 0 ? (
                                                        <button 
                                                            onClick={() => handleAddInitial(product)}
                                                            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 sm:py-2.5 px-2 sm:px-4 rounded-none text-[11px] sm:text-xs transition-all flex items-center justify-center space-x-1 sm:space-x-2 shadow cursor-pointer"
                                                        >
                                                            <i className="fa-solid fa-cart-plus"></i>
                                                            <span>Add</span>
                                                        </button>
                                                    ) : (
                                                        <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-none p-1">
                                                            <button 
                                                                onClick={() => updateQty(product.id, -1, false)}
                                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-none flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="font-bold text-[11px] sm:text-xs text-cyan-400">{qty}</span>
                                                            <button 
                                                                onClick={() => updateQty(product.id, 1, false)}
                                                                className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-none flex items-center justify-center text-xs sm:text-sm font-bold cursor-pointer"
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

                    {/* VIEW 2: PRODUCT DETAIL */}
                    {view === "detail" && selectedProduct && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            <button 
                                onClick={() => setView("home")}
                                className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-4 py-2 rounded-none text-xs font-semibold flex items-center space-x-2 cursor-pointer"
                            >
                                <i className="fa-solid fa-arrow-left"></i>
                                <span>Back to Home</span>
                            </button>

                            <div className="bg-slate-900 border border-slate-800 rounded-none overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">
                                <div className="h-72 md:h-full relative rounded-none">
                                    <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover rounded-none" />
                                </div>
                                <div className="p-6 md:p-8 flex flex-col justify-between space-y-4">
                                    <div className="space-y-3">
                                        <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] px-3 py-1 rounded-none font-semibold uppercase tracking-wider">
                                            {selectedProduct.category}
                                        </span>
                                        <h1 className="text-2xl font-black text-slate-100">{selectedProduct.name}</h1>
                                        <p className="text-cyan-400 font-bold text-lg">{selectedProduct.price} EGP</p>
                                        <p className="text-slate-300 text-xs leading-relaxed">{selectedProduct.desc}</p>
                                    </div>

                                    <div className="pt-4 border-t border-slate-800">
                                        {(() => {
                                            const itemInCart = getCartItem(selectedProduct.id);
                                            const qty = itemInCart ? itemInCart.qty : 0;
                                            return qty === 0 ? (
                                                <button 
                                                    onClick={() => handleAddInitial(selectedProduct)}
                                                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 px-4 rounded-none text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/15 cursor-pointer"
                                                >
                                                    <i className="fa-solid fa-cart-plus"></i>
                                                    <span>Add to Cart</span>
                                                </button>
                                            ) : (
                                                <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-none p-2">
                                                    <button 
                                                        onClick={() => updateQty(selectedProduct.id, -1, false)}
                                                        className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-none flex items-center justify-center text-sm font-bold cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-bold text-sm text-cyan-400">Quantity: {qty}</span>
                                                    <button 
                                                        onClick={() => updateQty(selectedProduct.id, 1, false)}
                                                        className="w-10 h-10 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-none flex items-center justify-center text-sm font-bold cursor-pointer"
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

                    {/* VIEW 3: CART */}
                    {view === "cart" && (
                        <div className="max-w-2xl mx-auto space-y-6">
                            <div className="flex items-center justify-between">
                                <button 
                                    onClick={() => setView("home")}
                                    className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 px-4 py-2 rounded-none text-xs font-semibold flex items-center space-x-2 cursor-pointer"
                                >
                                    <i className="fa-solid fa-arrow-left"></i>
                                    <span>Continue Shopping</span>
                                </button>
                                {cart.length > 0 && (
                                    <button 
                                        onClick={clearCart}
                                        className="bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 px-4 py-2 rounded-none text-xs font-semibold flex items-center space-x-2 cursor-pointer"
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                        <span>Clear All Cart</span>
                                    </button>
                                )}
                            </div>

                            <h1 className="text-xl font-black text-slate-100 flex items-center space-x-2">
                                <i className="fa-solid fa-bag-shopping text-cyan-400"></i>
                                <span>Shopping Cart & Checkout</span>
                            </h1>

                            {cart.length === 0 ? (
                                <div className="text-center py-24 bg-slate-900/50 rounded-none border border-slate-800 space-y-3">
                                    <i className="fa-solid fa-cart-shopping text-5xl text-slate-600"></i>
                                    <p className="text-slate-400 text-sm">Your shopping cart is currently empty.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cart.map(item => (
                                        <div key={item.id} className="bg-slate-900 p-4 rounded-none border border-slate-800 flex items-center justify-between space-x-4">
                                            <div className="flex-1">
                                                <h4 className="font-bold text-sm text-slate-200">{item.name}</h4>
                                                <p className="text-cyan-400 text-xs font-semibold mt-1">{item.price * item.qty} EGP</p>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-none p-1">
                                                    <button 
                                                        onClick={() => updateQty(item.id, -1, true)} 
                                                        className="w-7 h-7 rounded-none bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs text-slate-300 cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-xs font-bold px-2 text-cyan-400">{item.qty}</span>
                                                    <button 
                                                        onClick={() => updateQty(item.id, 1, true)} 
                                                        className="w-7 h-7 rounded-none bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs text-slate-300 cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button 
                                                    onClick={() => removeCompletely(item.id)}
                                                    className="w-9 h-9 rounded-none bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 flex items-center justify-center text-xs cursor-pointer"
                                                    title="Remove item"
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Summary & Checkout Form */}
                                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-none space-y-4 mt-6">
                                        <div className="space-y-2 text-sm border-b border-slate-800 pb-4">
                                            <div className="flex justify-between text-slate-400">
                                                <span>Subtotal:</span>
                                                <span className="text-slate-200 font-semibold">{subTotalPrice} EGP</span>
                                            </div>
                                            <div className="flex justify-between text-slate-400">
                                                <span>Shipping Fee:</span>
                                                <span className="text-slate-200 font-semibold">{SHIPPING_FEE} EGP</span>
                                            </div>
                                            <div className="flex justify-between text-base font-bold text-slate-100 pt-1">
                                                <span>Grand Total:</span>
                                                <span className="text-cyan-400">{finalTotalPrice} EGP</span>
                                            </div>
                                        </div>

                                        <form onSubmit={handleWhatsAppCheckout} className="space-y-3">
                                            <input 
                                                type="text" 
                                                placeholder="Full Name"
                                                value={customerName}
                                                onChange={(e) => setCustomerName(e.target.value)}
                                                required
                                                className="w-full bg-slate-950 border border-slate-800 rounded-none px-4 py-2.5 text-xs focus:outline-none focus:border-cyan-500 text-slate-100"
                                            />
                                            <input 
                                                type="tel" 
                                                placeholder="Phone Number"
                                                value={customerPhone}
                                                onChange={(e) => setCustomerPhone(e.target.value)}
                                                required
                                                className="w-full bg-slate-950 border border-slate-800 rounded-none px-4 py-2.5 text-xs focus:outline-none focus:border-cyan-500 text-slate-100"
                                            />
                                            <textarea 
                                                placeholder="Detailed Shipping Address"
                                                value={customerAddress}
                                                onChange={(e) => setCustomerAddress(e.target.value)}
                                                required
                                                rows="2"
                                                className="w-full bg-slate-950 border border-slate-800 rounded-none px-4 py-2.5 text-xs focus:outline-none focus:border-cyan-500 resize-none text-slate-100"
                                            ></textarea>

                                            <button 
                                                type="submit"
                                                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-none transition-all flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/20 text-xs cursor-pointer"
                                            >
                                                <i className="fa-brands fa-whatsapp text-base"></i>
                                                <span>Send Order via WhatsApp (01127808865)</span>
                                            </button>
                                        </form>

                                        {orderSuccess && (
                                            <p className="text-emerald-400 text-xs text-center font-semibold">
                                                WhatsApp chat opened successfully with your order!
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                </main>

                {/* FOOTER */}
                <footer className="bg-slate-900 border-t border-slate-800 py-4 text-center text-xs text-slate-500 w-full">
                    <p>TV Screen Store © 2026 | Full Screen Responsive PC & Mobile View</p>
                </footer>

            </div>
        </div>
    );
}