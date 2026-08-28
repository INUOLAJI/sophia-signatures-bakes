import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge, Accordion, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer, cardHover } from '../animations';

const OCCASIONS = [
  { id: 'birthday', name: 'Birthday Celebration 🎂', icon: '🎂' },
  { id: 'wedding', name: 'Wedding / Reception 💍', icon: '💍' },
  { id: 'anniversary', name: 'Anniversary 🥂', icon: '🥂' },
  { id: 'bridal_shower', name: 'Bridal Shower 👰', icon: '👰' },
  { id: 'baby_shower', name: 'Baby Shower 🍼', icon: '🍼' },
  { id: 'graduation', name: 'Graduation / Milestone 🎓', icon: '🎓' },
  { id: 'kids_party', name: 'Kids Themed Party 🎈', icon: '🎈' },
  { id: 'corporate', name: 'Corporate / Brand Launch 💼', icon: '💼' },
  { id: 'romantic', name: "Valentine's / Romantic 💖", icon: '💖' },
  { id: 'other', name: 'Just Because / Custom ✨', icon: '✨' },
];

const CAKE_TIERS_AND_SIZES = [
  // Bento & Minis
  { 
    id: 'bento_takeaway', 
    name: "4' Bento Box Cake (Takeaway)", 
    category: 'Bento & Minis',
    price: 10000, 
    servings: '1 - 2 portions', 
    desc: 'Cute mini lunchbox cake, perfect for intimate surprises & gifting',
    badge: 'Popular Gift',
    image: '/cake4inchestakeaway.jpeg'
  },
  { 
    id: 'bento_board', 
    name: "4' Bento Cake (On Board)", 
    category: 'Bento & Minis',
    price: 12000, 
    servings: '2 - 3 portions', 
    desc: 'Bento size presented elegantly on a sturdy decorated cake board',
    badge: 'Mini Board',
    image: '/fourinchesboard.jpeg'
  },
  // Single Tier Cakes
  { 
    id: 'single_6', 
    name: '6 inches Single Tier', 
    category: 'Single Tier',
    price: 14000, 
    servings: '4 - 6 portions', 
    desc: 'Ideal for small intimate gatherings & family dinners',
    badge: 'Standard',
    image: '/6inchesboard.jpeg'
  },
  { 
    id: 'single_7', 
    name: '7 inches Single Tier', 
    category: 'Single Tier',
    price: 18000, 
    servings: '8 - 10 portions', 
    desc: 'Standard party cake size with balanced height and portioning',
    badge: 'Party Favorite',
    image: '/7inchesboard.jpeg'
  },
  { 
    id: 'single_8', 
    name: '8 inches Single Tier', 
    category: 'Single Tier',
    price: 22000, 
    servings: '12 - 15 portions', 
    desc: 'Our most requested size for birthday celebrations and parties',
    badge: 'Best Seller ⭐',
    image: '/8inchesboard.jpeg'
  },
  { 
    id: 'single_9', 
    name: '9 inches Single Tier', 
    category: 'Single Tier',
    price: 28000, 
    servings: '18 - 22 portions', 
    desc: 'Substantial celebration cake for big groups and reunions',
    badge: 'Family Size',
    image: '/9inchesboard.jpeg'
  },
  { 
    id: 'single_10', 
    name: '10 inches Single Tier', 
    category: 'Single Tier',
    price: 35000, 
    servings: '25 - 30 portions', 
    desc: 'Generous single tier centerpiece for large celebrations',
    badge: 'Crowd Pleaser',
    image: '/10inchesboard.jpeg'
  },
  { 
    id: 'single_11', 
    name: '11 inches Single Tier', 
    category: 'Single Tier',
    price: 42000, 
    servings: '35 - 40 portions', 
    desc: 'Grand luxury single-tier statement piece',
    badge: 'Grand Feast',
    image: '/11inchesboard.jpeg'
  },
  { 
    id: 'single_12', 
    name: '12 inches Single Tier', 
    category: 'Single Tier',
    price: 50000, 
    servings: '45 - 50+ portions', 
    desc: 'Extra-large celebration masterpiece for lavish events',
    badge: 'Showstopper',
    image: '/12inchesboard.jpeg'
  },
];

const CAKE_SHAPES = [
  { id: 'round', name: 'Classic Round', extraPrice: 0, desc: 'Timeless elegant cylindrical shape' },
  { id: 'heart', name: 'Romantic Heart Shape', extraPrice: 1500, desc: 'Trendy heart silhouette with intricate piping' },
  { id: 'square', name: 'Modern Square / Cube', extraPrice: 2000, desc: 'Clean sharp contemporary edges' },
  { id: 'double_barrel', name: 'Tall Double Barrel', extraPrice: 4500, desc: 'Extra tall multi-layered modern cylinder' },
];

const FLAVORS = [
  { id: 'vanilla', name: 'Classic Vanilla', extraPrice: 0, note: 'Soft, moist & buttery vanilla sponge' },
  { id: 'chocolate', name: 'Rich Dark Chocolate', extraPrice: 0, note: 'Deep, decadent & intensely moist' },
  { id: 'red_velvet', name: 'Velvet Red Velvet', extraPrice: 0, note: 'Silky smooth ruby crumb with hint of cocoa' },
  { id: 'strawberry', name: 'Strawberry Bliss', extraPrice: 0, note: 'Infused with delicate natural strawberry essence' },
  { id: 'marble', name: 'Marble Swirl (Vanilla + Chocolate)', extraPrice: 1500, note: 'Best of both worlds swirled into every slice' },
];

const FILLINGS = [
  { id: 'vanilla_buttercream', name: 'Signature Vanilla Buttercream', extraPrice: 0 },
  { id: 'chocolate_ganache', name: 'Rich Chocolate Ganache Fudge', extraPrice: 1000 },
  { id: 'strawberry_compote', name: 'Fresh Strawberry Fruit Compote', extraPrice: 1200 },
];

const LUXURY_ADDONS = [
  { id: 'acrylic_topper', name: 'Custom Name Acrylic Cake Topper', price: 2500, icon: '👑', desc: 'E.g. "Happy Birthday [Name]", "Mr & Mrs"' },
  { id: 'gold_leaf', name: '24k Edible Gold Leaf / Flakes', price: 1500, icon: '✨', desc: 'Luxurious shimmering real edible gold accents' },
  { id: 'fresh_flowers', name: 'Fresh / Dried Floral Arrangement', price: 3500, icon: '🌸', desc: 'Handpicked food-safe roses, baby breath or dried florals' },
  { id: 'ferrero_chocs', name: 'Ferrero Rocher & Chocolate Treats', price: 2500, icon: '🍫', desc: 'Premium chocolates, macarons & confectionery on top' },
  { id: 'butterflies_pearls', name: '3D Butterfly Accents & Sugar Pearls', price: 1500, icon: '🦋', desc: 'Delicate edible butterflies and shimmering pearls' },
  { id: 'mini_tiara', name: 'Royal Mini Tiara / Crown Topper', price: 3000, icon: '👸', desc: 'Sparkling princess crown topper for queen/milestone vibes' },
  { id: 'sparkler_candles', name: 'Sparkler Firework Candle + Number Candles', price: 1000, icon: '🕯️', desc: 'Spectacular fountain sparkler candle and gold numbers' },
  { id: 'mini_liquor', name: 'Mini Liquor / Wine Bottle Decor', price: 4000, icon: '🍾', desc: 'Mini decorative bottle perched on top' },
  { id: 'matching_cupcakes', name: 'Matching Themed Cupcakes (Box of 4)', price: 4500, icon: '🧁', desc: '4 matching buttercream cupcakes complementing your cake' },
];

const PARTY_COMBOS = [
  { id: 'small_chops_plate', name: 'Small Chops (Solo Plate)', price: 2500, icon: '🥟', desc: '1 chops, 5 puff puff, 1 seasoned beef' },
  { id: 'small_chops_bigger', name: 'Small Chops (Bigger Plate)', price: 7500, icon: '🥟', desc: '4 chops, 10 puff puff, 3 seasoned beef' },
  { id: 'small_chops_box', name: 'Small Chops (Big Box)', price: 18000, icon: '📦', desc: '10 chops, 15 puff puff, 8 seasoned beef' },
  { id: 'milky_doughnuts_3', name: 'Milky Doughnuts (Box of 3)', price: 5500, icon: '🍩', desc: '3 ultra-fluffy melt-in-mouth milky doughnuts' },
  { id: 'cake_parfait_2', name: 'Cake Parfait Dessert Cups (2 Cups)', price: 8000, icon: '🍨', desc: '2 rich layered cake & cream dessert cups' },
];

export default function CustomOrder() {
  const { addToCart } = useCart();

  // Form State
  const [occasion, setOccasion] = useState('birthday');
  const [selectedSizeId, setSelectedSizeId] = useState('single_8');
  const [selectedShapeId, setSelectedShapeId] = useState('round');
  const [flavorId, setFlavorId] = useState('red_velvet');
  const [fillingId, setFillingId] = useState('vanilla_buttercream');
  const [cakeInscription, setCakeInscription] = useState('');
  
  // Luxury Add-ons & Combos (sets of IDs)
  const [selectedAddons, setSelectedAddons] = useState(['acrylic_topper', 'sparkler_candles']);
  const [selectedCombos, setSelectedCombos] = useState([]);

  // Customer & Delivery Details
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (9:00 AM - 12:00 PM)');
  const [deliveryMethod, setDeliveryMethod] = useState('Pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [designNotes, setDesignNotes] = useState('');

  // UI state
  const [filterTierCategory, setFilterTierCategory] = useState('All');
  const [addedToCartSuccess, setAddedToCartSuccess] = useState(false);

  // Active cake data lookup
  const selectedSizeObj = useMemo(() => {
    return CAKE_TIERS_AND_SIZES.find(s => s.id === selectedSizeId) || CAKE_TIERS_AND_SIZES[4];
  }, [selectedSizeId]);

  const selectedShapeObj = useMemo(() => {
    return CAKE_SHAPES.find(sh => sh.id === selectedShapeId) || CAKE_SHAPES[0];
  }, [selectedShapeId]);

  const selectedFlavorObj = useMemo(() => {
    return FLAVORS.find(f => f.id === flavorId) || FLAVORS[0];
  }, [flavorId]);

  const selectedFillingObj = useMemo(() => {
    return FILLINGS.find(fl => fl.id === fillingId) || FILLINGS[0];
  }, [fillingId]);

  // Toggle addons
  const handleToggleAddon = (id) => {
    setSelectedAddons(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Toggle combos
  const handleToggleCombo = (id) => {
    setSelectedCombos(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Addons total
  const addonsTotal = useMemo(() => {
    return selectedAddons.reduce((sum, id) => {
      const addon = LUXURY_ADDONS.find(a => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);
  }, [selectedAddons]);

  // Combos total
  const combosTotal = useMemo(() => {
    return selectedCombos.reduce((sum, id) => {
      const combo = PARTY_COMBOS.find(c => c.id === id);
      return sum + (combo ? combo.price : 0);
    }, 0);
  }, [selectedCombos]);

  // Flavors extra total
  const flavorsExtraTotal = useMemo(() => {
    return selectedFlavorObj.extraPrice + selectedFillingObj.extraPrice;
  }, [selectedFlavorObj, selectedFillingObj]);

  // Total calculated price estimate
  const estimatedTotal = useMemo(() => {
    return selectedSizeObj.price + 
      selectedShapeObj.extraPrice + 
      flavorsExtraTotal + 
      addonsTotal + 
      combosTotal;
  }, [selectedSizeObj, selectedShapeObj, flavorsExtraTotal, addonsTotal, combosTotal]);

  // Filtered Cake Sizes
  const filteredCakeSizes = useMemo(() => {
    if (filterTierCategory === 'All') return CAKE_TIERS_AND_SIZES;
    return CAKE_TIERS_AND_SIZES.filter(c => c.category === filterTierCategory);
  }, [filterTierCategory]);

  // Build text breakdown summary for WhatsApp or Cart
  const buildCustomOrderSummary = () => {
    const occObj = OCCASIONS.find(o => o.id === occasion);

    const addonsList = selectedAddons.map(id => {
      const a = LUXURY_ADDONS.find(x => x.id === id);
      return a ? `${a.name} (+₦${a.price.toLocaleString()})` : '';
    }).filter(Boolean);

    const combosList = selectedCombos.map(id => {
      const c = PARTY_COMBOS.find(x => x.id === id);
      return c ? `${c.name} (+₦${c.price.toLocaleString()})` : '';
    }).filter(Boolean);

    return {
      occasion: occObj ? occObj.name : occasion,
      cakeSize: selectedSizeObj.name,
      cakeCategory: selectedSizeObj.category,
      servings: selectedSizeObj.servings,
      shape: selectedShapeObj.name,
      flavor: selectedFlavorObj.name,
      filling: selectedFillingObj.name,
      inscription: cakeInscription || 'None requested',
      addons: addonsList,
      combos: combosList,
      customerName: customerName.trim() || 'Valued Customer',
      phone: phone.trim() || 'In WhatsApp Chat',
      date: date || 'To be confirmed',
      timeSlot,
      deliveryMethod,
      deliveryAddress: deliveryAddress.trim() || 'N/A',
      designNotes: designNotes.trim() || 'None',
      estimatedTotal
    };
  };

  // WhatsApp Submission Handler
  const handleWhatsAppSubmit = (e) => {
    if (e) e.preventDefault();

    if (!date) {
      alert("Please select the date you need this custom order for!");
      const dateInput = document.getElementById('cake-needed-date');
      if (dateInput) dateInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const summary = buildCustomOrderSummary();
    const phoneNum = "2349118784051"; // Sophia's Signature Bakes official WhatsApp

    let addonsText = summary.addons.length > 0 
      ? summary.addons.map(a => `   • ${a}`).join('%0A')
      : '   None selected';

    let combosText = summary.combos.length > 0 
      ? summary.combos.map(c => `   • ${c}`).join('%0A')
      : '   None';

    let message = `🎂 *CUSTOM CAKE & CELEBRATION ORDER INQUIRY*%0A` +
      `*Sophia's Signature Bakes*%0A` +
      `━━━━━━━━━━━━━━━━━━━━━━%0A%0A` +
      `👤 *Customer Name:* ${encodeURIComponent(summary.customerName)}%0A` +
      `📞 *Phone / WhatsApp:* ${encodeURIComponent(summary.phone)}%0A` +
      `🎉 *Occasion:* ${encodeURIComponent(summary.occasion)}%0A` +
      `📅 *Date Needed:* ${encodeURIComponent(summary.date)}%0A` +
      `⏰ *Preferred Time:* ${encodeURIComponent(summary.timeSlot)}%0A` +
      `🚚 *Delivery Method:* ${encodeURIComponent(summary.deliveryMethod)}` +
      (summary.deliveryAddress !== 'N/A' ? ` (${encodeURIComponent(summary.deliveryAddress)})` : '') + `%0A%0A` +
      `🎂 *CAKE SPECIFICATIONS:*%0A` +
      `   • *Size:* ${encodeURIComponent(summary.cakeSize)} (${encodeURIComponent(summary.servings)})%0A` +
      `   • *Shape:* ${encodeURIComponent(summary.shape)}%0A` +
      `   • *Flavor:* ${encodeURIComponent(summary.flavor)}%0A` +
      `   • *Filling:* ${encodeURIComponent(summary.filling)}%0A` +
      `   • *Cake Inscription / Topper Text:* "${encodeURIComponent(summary.inscription)}"%0A%0A` +
      `✨ *SELECTED LUXURY ADD-ONS & TOPPERS:*%0A` +
      addonsText + `%0A%0A`;

    if (summary.combos.length > 0) {
      message += `🥟 *PARTY SNACKS & COMBOS:*%0A` +
        combosText + `%0A%0A`;
    }

    message += `📝 *SPECIAL INSTRUCTIONS / DESIGN THEME:*%0A` +
      `   ${encodeURIComponent(summary.designNotes)}%0A%0A` +
      `💰 *ESTIMATED TOTAL:* ₦${summary.estimatedTotal.toLocaleString()}%0A` +
      `━━━━━━━━━━━━━━━━━━━━━━%0A` +
      `📸 *Reference Photo:* (I will attach my Pinterest / Instagram photo reference directly in this chat)%0A%0A` +
      `✨ _Sent from Sophia's Signature Bakes Custom Order Studio_`;

    window.open(`https://wa.me/${phoneNum}?text=${message}`, '_blank');
  };

  // Add Custom Cake to Cart Handler
  const handleAddToCart = () => {
    const summary = buildCustomOrderSummary();
    const customItem = {
      name: `Custom Cake: ${selectedSizeObj.name}`,
      price: `₦${summary.estimatedTotal.toLocaleString()}`,
      priceNum: summary.estimatedTotal,
      image: selectedSizeObj.image,
      category: 'Custom Cake',
      flavor: summary.flavor,
      customDetails: summary,
      minOrder: 1
    };

    addToCart(customItem, 1, customItem.flavor, summary);
    setAddedToCartSuccess(true);
    setTimeout(() => setAddedToCartSuccess(false), 4000);
  };

  return (
    <div className="bg-golden-light py-5">
      <Container style={{ maxWidth: '1180px' }}>

        {/* Page Header */}
        <motion.div
          className="text-center mb-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Badge className="badge-gold-accent px-3 py-2 rounded-pill mb-2 fs-6 shadow-sm">
            ✨ Bespoke & Handcrafted Studio
          </Badge>
          <h1 className="fw-bold text-golden-dark display-4 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Design Your Custom Cake
          </h1>
          <p className="text-golden-text-muted fs-5 max-w-2xl mx-auto" style={{ maxWidth: '750px' }}>
            Build your dream celebration cake layer by layer. Customize your tiers, signature flavors, luscious fillings, luxury toppers, and get an instant quote ready for WhatsApp!
          </p>
          <motion.div
            className="d-flex justify-content-center gap-3 mt-3 flex-wrap"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {['✨ 100% Freshly Baked', '🎨 Pinterest & Instagram Themes', '💬 Instant WhatsApp Consultation'].map((label, i) => (
              <motion.span key={i} custom={i} variants={scaleIn} className="badge bg-white text-golden-dark border border-golden px-3 py-2 rounded-pill shadow-sm">
                {label}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {addedToCartSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <Alert variant="success" className="rounded-4 border-0 shadow-sm mb-4 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-4">🎉</span>
                  <div><strong>Custom Cake Added to Cart!</strong> You can continue designing or proceed to checkout.</div>
                </div>
                <Button as={Link} to="/order" size="sm" className="btn-golden rounded-pill px-3">View Cart →</Button>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Row className="g-4">
          {/* Main Customization Column */}
          <Col lg={8}>

            {/* Step 1: Occasion */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border border-golden">
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="badge bg-golden-primary rounded-circle p-2 fs-6" style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center' }}>
                  1
                </span>
                <div>
                  <h4 className="fw-bold text-golden-dark mb-0 fs-5">What's the Occasion?</h4>
                  <small className="text-muted">Select the celebration so our bakers can style accordingly</small>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 pt-2">
                {OCCASIONS.map((occ, i) => (
                  <motion.button
                    key={occ.id}
                    type="button"
                    onClick={() => setOccasion(occ.id)}
                    className={`btn rounded-pill px-3 py-2 text-start ${
                      occasion === occ.id ? 'btn-golden text-white shadow-sm' : 'btn-outline-golden text-golden-dark bg-white'
                    }`}
                    style={{ fontSize: '0.9rem' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.93 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    {occ.name}
                  </motion.button>
                ))}
              </div>
            </Card>
            </motion.div>

            {/* Step 2: Size, Tiers & Shape */}
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border border-golden">
              <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-golden-primary rounded-circle p-2 fs-6" style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center' }}>
                    2
                  </span>
                  <div>
                    <h4 className="fw-bold text-golden-dark mb-0 fs-5">Cake Size & Servings</h4>
                    <small className="text-muted">Choose your preferred portion size</small>
                  </div>
                </div>

                {/* Filter categories */}
                <div className="btn-group btn-group-sm rounded-pill p-1 bg-golden-subtle border border-golden">
                  {['All', 'Bento & Minis', 'Single Tier'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilterTierCategory(cat)}
                      className={`btn rounded-pill px-3 py-1 fw-semibold ${
                        filterTierCategory === cat ? 'btn-golden text-white' : 'btn-link text-golden-dark text-decoration-none'
                      }`}
                      style={{ fontSize: '0.8rem' }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cake Size Grid */}
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Row className="g-3 mb-4">
                {filteredCakeSizes.map((cake, idx) => {
                  const isSelected = selectedSizeId === cake.id;
                  return (
                    <Col sm={6} md={4} key={cake.id}>
                      <motion.div
                        custom={idx}
                        variants={scaleIn}
                        whileHover={{ scale: 1.03, y: -4 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedSizeId(cake.id)}
                        className={`rounded-4 h-100 border position-relative d-flex flex-column justify-content-between overflow-hidden ${
                          isSelected ? 'border-2 border-golden bg-golden-subtle shadow-md' : 'border-golden bg-white'
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="position-relative" style={{ height: '140px' }}>
                          <img 
                            src={cake.image} 
                            alt={cake.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          {cake.badge && (
                            <span 
                              className={`badge position-absolute top-0 end-0 m-2 rounded-pill shadow-sm ${
                                isSelected ? 'bg-golden-dark text-white' : 'badge-gold-accent'
                              }`}
                              style={{ fontSize: '0.7rem' }}
                            >
                              {cake.badge}
                            </span>
                          )}
                        </div>
                        <div className="p-3 d-flex flex-column justify-content-between flex-grow-1">
                          <div>
                            <h6 className="fw-bold text-golden-dark mb-1 lh-sm" style={{ fontSize: '0.95rem' }}>
                              {cake.name}
                            </h6>
                            <div className="badge bg-white text-golden-dark border border-golden mb-2" style={{ fontSize: '0.75rem' }}>
                              👥 {cake.servings}
                            </div>
                            <p className="text-muted small mb-0 lh-sm" style={{ fontSize: '0.8rem' }}>
                              {cake.desc}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-top border-golden d-flex justify-content-between align-items-center">
                            <span className="fw-bold text-golden fs-6">₦{cake.price.toLocaleString()}</span>
                            <span className={`small fw-semibold ${isSelected ? 'text-golden-dark fw-bold' : 'text-muted'}`}>
                              {isSelected ? '✓ Selected' : 'Select'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </Col>
                  );
                })}
              </Row>
              </motion.div>

              {/* Cake Shape Option */}
              <div className="pt-3 border-top border-golden">
                <label className="fw-bold text-golden-dark mb-2 d-block small text-uppercase" style={{ letterSpacing: '0.5px' }}>
                  Choose Cake Shape
                </label>
                <Row className="g-2">
                  {CAKE_SHAPES.map(shape => {
                    const isShapeSelected = selectedShapeId === shape.id;
                    return (
                      <Col sm={6} md={3} key={shape.id}>
                        <div
                          onClick={() => setSelectedShapeId(shape.id)}
                          className={`p-2 rounded-3 text-center cursor-pointer border transition-all ${
                            isShapeSelected 
                              ? 'bg-golden-primary text-white border-golden shadow-sm' 
                              : 'bg-golden-light text-golden-dark border-golden hover-bg'
                          }`}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="fw-bold small">{shape.name}</div>
                          <div className="small opacity-90" style={{ fontSize: '0.75rem' }}>
                            {shape.extraPrice > 0 ? `+₦${shape.extraPrice.toLocaleString()}` : 'Included'}
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Card>

            {/* Step 3: Flavors & Fillings */}
            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border border-golden">
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="badge bg-golden-primary rounded-circle p-2 fs-6" style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center' }}>
                  3
                </span>
                <div>
                  <h4 className="fw-bold text-golden-dark mb-0 fs-5">Signature Flavors & Fillings</h4>
                  <small className="text-muted">Choose your mouthwatering sponge crumb and velvety center fillings</small>
                </div>
              </div>

              {/* Flavor */}
              <div className="mb-4">
                <label className="fw-bold text-golden-dark mb-2 d-flex justify-content-between align-items-center">
                  <span>Cake Sponge Flavor</span>
                  <Link to="/flavor-details" target="_blank" className="small text-golden text-decoration-none">
                    View Flavor Notes ↗
                  </Link>
                </label>
                <Row className="g-2">
                  {FLAVORS.map(fl => {
                    const isFlSelected = flavorId === fl.id;
                    return (
                      <Col sm={6} md={4} key={fl.id}>
                        <div
                          onClick={() => setFlavorId(fl.id)}
                          className={`p-3 rounded-3 border h-100 cursor-pointer transition-all ${
                            isFlSelected 
                              ? 'bg-golden-subtle border-2 border-golden shadow-sm' 
                              : 'bg-white border-golden'
                          }`}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="d-flex justify-content-between align-items-start">
                            <span className="fw-bold text-golden-dark small">{fl.name}</span>
                            {fl.extraPrice > 0 && (
                              <Badge className="badge-gold-accent" style={{ fontSize: '0.65rem' }}>
                                +₦{fl.extraPrice.toLocaleString()}
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted mb-0 mt-1" style={{ fontSize: '0.75rem' }}>
                            {fl.note}
                          </p>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>

              {/* Layer Filling */}
              <div className="pt-2">
                <label className="fw-bold text-golden-dark mb-2 d-block small text-uppercase" style={{ letterSpacing: '0.5px' }}>
                  Select Cake Layer Filling
                </label>
                <Row className="g-2">
                  {FILLINGS.map(fill => {
                    const isFillSelected = fillingId === fill.id;
                    return (
                      <Col sm={6} md={4} key={fill.id}>
                        <div
                          onClick={() => setFillingId(fill.id)}
                          className={`p-2 rounded-3 border cursor-pointer transition-all ${
                            isFillSelected
                              ? 'bg-golden-primary text-white border-golden shadow-sm'
                              : 'bg-golden-light text-golden-dark border-golden'
                          }`}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="fw-semibold small">{fill.name}</div>
                          <div className="small opacity-80" style={{ fontSize: '0.7rem' }}>
                            {fill.extraPrice > 0 ? `+₦${fill.extraPrice.toLocaleString()}` : 'Included'}
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </Card>

            {/* Step 4: Luxury Add-ons & Toppers */}
            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border border-golden">
              <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-golden-primary rounded-circle p-2 fs-6" style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center' }}>
                    4
                  </span>
                  <div>
                    <h4 className="fw-bold text-golden-dark mb-0 fs-5">Luxury Toppers & Decor Add-ons</h4>
                    <small className="text-muted">Select interactive add-ons to elevate your cake design</small>
                  </div>
                </div>
                <Badge className="badge-gold-accent px-3 py-2 rounded-pill">
                  {selectedAddons.length} Selected (+₦{addonsTotal.toLocaleString()})
                </Badge>
              </div>

              <Row className="g-3">
                {LUXURY_ADDONS.map(addon => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <Col sm={6} md={4} key={addon.id}>
                      <div
                        onClick={() => handleToggleAddon(addon.id)}
                        className={`p-3 rounded-4 border h-100 cursor-pointer transition-all d-flex flex-column justify-content-between ${
                          isChecked 
                            ? 'bg-golden-subtle border-2 border-golden shadow-sm' 
                            : 'bg-white border-golden'
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <span className="fs-4">{addon.icon}</span>
                            <Form.Check 
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="cursor-pointer"
                            />
                          </div>
                          <h6 className="fw-bold text-golden-dark mb-1" style={{ fontSize: '0.88rem' }}>
                            {addon.name}
                          </h6>
                          <p className="text-muted small mb-0 lh-sm" style={{ fontSize: '0.75rem' }}>
                            {addon.desc}
                          </p>
                        </div>
                        <div className="mt-2 pt-2 border-top border-golden fw-bold text-golden small">
                          +₦{addon.price.toLocaleString()}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card>

            {/* Step 5: Party Combos & Small Chops Platter */}
            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border border-golden">
              <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
                <div className="d-flex align-items-center gap-3">
                  <span className="badge bg-golden-primary rounded-circle p-2 fs-6" style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center' }}>
                    5
                  </span>
                  <div>
                    <h4 className="fw-bold text-golden-dark mb-0 fs-5">Add Party Snacks & Combos (Optional)</h4>
                    <small className="text-muted">Pair your celebration cake with delicious small chops or doughnuts</small>
                  </div>
                </div>
              </div>

              <Row className="g-3">
                {PARTY_COMBOS.map(combo => {
                  const isChecked = selectedCombos.includes(combo.id);
                  return (
                    <Col sm={6} key={combo.id}>
                      <div
                        onClick={() => handleToggleCombo(combo.id)}
                        className={`p-3 rounded-4 border h-100 cursor-pointer transition-all d-flex justify-content-between align-items-center gap-3 ${
                          isChecked 
                            ? 'bg-golden-subtle border-2 border-golden shadow-sm' 
                            : 'bg-white border-golden'
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <span className="fs-3">{combo.icon}</span>
                          <div>
                            <h6 className="fw-bold text-golden-dark mb-1" style={{ fontSize: '0.9rem' }}>
                              {combo.name}
                            </h6>
                            <p className="text-muted small mb-0 lh-sm" style={{ fontSize: '0.75rem' }}>
                              {combo.desc}
                            </p>
                            <span className="fw-bold text-golden small">
                              +₦{combo.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Form.Check 
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="cursor-pointer fs-5"
                        />
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Card>

            {/* Step 6: Customer & Delivery Details */}
            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4 bg-white border border-golden">
              <div className="d-flex align-items-center gap-3 mb-3">
                <span className="badge bg-golden-primary rounded-circle p-2 fs-6" style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center' }}>
                  6
                </span>
                <div>
                  <h4 className="fw-bold text-golden-dark mb-0 fs-5">Event Date & Delivery Details</h4>
                  <small className="text-muted">Tell us when and where to prepare your celebration order</small>
                </div>
              </div>

              <Row className="g-3">
                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold small text-golden-dark">Your Full Name *</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="e.g. Adebayo Blessing"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="rounded-3 border-golden"
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold small text-golden-dark">WhatsApp / Phone Number *</Form.Label>
                    <Form.Control 
                      type="tel" 
                      placeholder="e.g. 08012345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-3 border-golden"
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold small text-golden-dark">Date Needed *</Form.Label>
                    <Form.Control 
                      id="cake-needed-date"
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="rounded-3 border-golden"
                    />
                    <small className="text-muted" style={{ fontSize: '0.72rem' }}>
                      ⚡ Recommended: Book at least 2-4 days in advance for custom cakes.
                    </small>
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold small text-golden-dark">Preferred Time Slot</Form.Label>
                    <Form.Select 
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="rounded-3 border-golden"
                    >
                      <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                      <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col sm={12}>
                  <Form.Group>
                    <Form.Label className="fw-bold small text-golden-dark">Delivery Method</Form.Label>
                    <div className="d-flex gap-3 mb-2">
                      <Form.Check 
                        type="radio"
                        id="del-pickup"
                        label="Pickup at Bakery (Free)"
                        name="delMethod"
                        checked={deliveryMethod === 'Pickup'}
                        onChange={() => setDeliveryMethod('Pickup')}
                        className="fw-semibold text-golden-dark"
                      />
                      <Form.Check 
                        type="radio"
                        id="del-delivery"
                        label="Doorstep Delivery"
                        name="delMethod"
                        checked={deliveryMethod === 'Doorstep Delivery'}
                        onChange={() => setDeliveryMethod('Doorstep Delivery')}
                        className="fw-semibold text-golden-dark"
                      />
                    </div>
                  </Form.Group>
                </Col>

                {deliveryMethod === 'Doorstep Delivery' && (
                  <Col sm={12}>
                    <Form.Group>
                      <Form.Label className="fw-bold small text-golden-dark">Delivery Address & Landmark</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="House / Street address, estate name, nearest landmark & city area"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="rounded-3 border-golden"
                      />
                    </Form.Group>
                  </Col>
                )}

                <Col sm={12}>
                  <Form.Group>
                    <Form.Label className="fw-bold small text-golden-dark">
                      Custom Cake / Board Inscription (Optional)
                    </Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder='e.g., "Happy 30th Birthday Queen Anita!", "Happy Anniversary Dearest"'
                      value={cakeInscription}
                      onChange={(e) => setCakeInscription(e.target.value)}
                      className="rounded-3 border-golden"
                    />
                  </Form.Group>
                </Col>

                <Col sm={12}>
                  <Form.Group>
                    <Form.Label className="fw-bold small text-golden-dark">
                      Special Design Instructions & Pinterest / Photo Notes
                    </Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3} 
                      placeholder="Describe your theme (e.g. vintage ribbons, crown topper, floral placement, dietary allergies, or mention that you will send a photo via WhatsApp)..."
                      value={designNotes}
                      onChange={(e) => setDesignNotes(e.target.value)}
                      className="rounded-3 border-golden"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Photo Reference Help Box */}
              <div className="notice-box p-3 mt-3">
                <div className="d-flex align-items-start gap-2">
                  <span className="fs-5">📸</span>
                  <div className="small">
                    <strong className="text-golden-dark">Have an Instagram or Pinterest Cake Photo?</strong>
                    <p className="mb-0 text-muted">
                      When you click <strong>"Send Order via WhatsApp"</strong>, your custom specs will load directly into WhatsApp (09118784051). You can attach your reference picture right inside the chat!
                    </p>
                  </div>
                </div>
              </div>
            </Card>

          </Col>

          {/* Right Column: Live Sticky Summary Card */}
          <Col lg={4}>
            <div className="position-sticky" style={{ top: '100px' }}>
              <Card className="border-0 shadow-lg rounded-4 p-4 bg-white border border-golden">
                <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-golden">
                  <h4 className="fw-bold text-golden-dark mb-0 fs-5">
                    Custom Order Summary
                  </h4>
                  <Badge className="badge-gold-accent px-2 py-1 rounded-pill small">
                    Live Estimate
                  </Badge>
                </div>

                {/* Selected Cake Preview */}
                <div className="p-3 rounded-3 bg-golden-subtle mb-3 border border-golden">
                  <div className="d-flex gap-3 align-items-center mb-2">
                    <img 
                      src={selectedSizeObj.image} 
                      alt={selectedSizeObj.name} 
                      className="rounded-3 shadow-sm border border-golden" 
                      style={{ width: '60px', height: '60px', objectFit: 'cover' }} 
                    />
                    <div className="flex-grow-1">
                      <strong className="text-golden-dark fs-6 d-block lh-sm">{selectedSizeObj.name}</strong>
                      <span className="fw-bold text-golden">₦{selectedSizeObj.price.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="small text-muted mb-1">
                    Shape: <strong>{selectedShapeObj.name}</strong> {selectedShapeObj.extraPrice > 0 && `(+₦${selectedShapeObj.extraPrice.toLocaleString()})`}
                  </div>
                  <div className="small text-muted">
                    Portions: <strong>{selectedSizeObj.servings}</strong>
                  </div>
                </div>

                {/* Breakdown List */}
                <div className="d-flex flex-column gap-2 small mb-3">
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Occasion:</span>
                    <span className="fw-semibold text-golden-dark">{OCCASIONS.find(o => o.id === occasion)?.name}</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Flavor:</span>
                    <span className="fw-semibold text-golden-dark text-end" style={{ maxWidth: '180px' }}>
                      {selectedFlavorObj.name}
                    </span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Filling:</span>
                    <span className="fw-semibold text-golden-dark text-end">{selectedFillingObj.name}</span>
                  </div>

                  {cakeInscription && (
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">Inscription:</span>
                      <span className="fw-semibold text-golden-dark fst-italic text-end" style={{ maxWidth: '160px' }}>
                        "{cakeInscription}"
                      </span>
                    </div>
                  )}

                  {selectedAddons.length > 0 && (
                    <div className="pt-2 border-top border-golden">
                      <span className="text-muted d-block mb-1">Luxury Toppers ({selectedAddons.length}):</span>
                      {selectedAddons.map(id => {
                        const a = LUXURY_ADDONS.find(x => x.id === id);
                        return a ? (
                          <div key={id} className="d-flex justify-content-between opacity-80" style={{ fontSize: '0.78rem' }}>
                            <span>• {a.name}</span>
                            <span>+₦{a.price.toLocaleString()}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}

                  {selectedCombos.length > 0 && (
                    <div className="pt-2 border-top border-golden">
                      <span className="text-muted d-block mb-1">Party Combos ({selectedCombos.length}):</span>
                      {selectedCombos.map(id => {
                        const c = PARTY_COMBOS.find(x => x.id === id);
                        return c ? (
                          <div key={id} className="d-flex justify-content-between opacity-80" style={{ fontSize: '0.78rem' }}>
                            <span>• {c.name}</span>
                            <span>+₦{c.price.toLocaleString()}</span>
                          </div>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>

                {/* Total Box */}
                <div className="p-3 rounded-3 bg-golden-primary text-white text-center mb-3 shadow-sm">
                  <div className="small text-uppercase fw-semibold" style={{ letterSpacing: '0.5px' }}>
                    Estimated Custom Cake Total
                  </div>
                  <div className="display-6 fw-bold my-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ₦{estimatedTotal.toLocaleString()}
                  </div>
                  <small className="opacity-75" style={{ fontSize: '0.72rem' }}>
                    *Final price confirmed with reference photos via WhatsApp
                  </small>
                </div>

                {/* Action Buttons */}
                <div className="d-grid gap-2">
                  <Button 
                    onClick={handleWhatsAppSubmit}
                    className="btn-golden rounded-pill py-3 fw-bold fs-6 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  >
                    <span>💬 Send Order via WhatsApp</span>
                  </Button>

                  <Button 
                    variant="outline-golden"
                    onClick={handleAddToCart}
                    className="btn-outline-golden rounded-pill py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                  >
                    <span>🛒 Add Custom Cake to Cart</span>
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    Need instant advice? Call / Chat <strong>09118784051</strong>
                  </small>
                </div>
              </Card>
            </div>
          </Col>
        </Row>

        {/* FAQs & Guidelines */}
        <div className="mt-5 pt-4">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-golden-dark" style={{ fontFamily: "'Playfair Display', serif" }}>
              Custom Order Guidelines & FAQs
            </h3>
            <p className="text-muted">Everything you need to know about placing a bespoke order</p>
          </div>

          <Row className="justify-content-center">
            <Col lg={9}>
              <Accordion defaultActiveKey="0" className="shadow-sm rounded-4 overflow-hidden">
                <Accordion.Item eventKey="0" className="border-golden">
                  <Accordion.Header>
                    <strong>📅 How early in advance should I book my custom cake?</strong>
                  </Accordion.Header>
                  <Accordion.Body className="text-muted">
                    We recommend placing custom cake orders at least <strong>2 to 4 days in advance</strong>. Booking ahead ensures our bakers can reserve your date and source custom acrylic toppers or specialty florals.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1" className="border-golden">
                  <Accordion.Header>
                    <strong>📸 Can I send a picture from Pinterest or Instagram?</strong>
                  </Accordion.Header>
                  <Accordion.Body className="text-muted">
                    Yes! We love bringing your visual inspiration to life. Once you submit this form, simply attach your photos, color swatches, or invitation card in our WhatsApp chat (09118784051) and our cake artist will review the design with you.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2" className="border-golden">
                  <Accordion.Header>
                    <strong>💳 How is payment confirmed?</strong>
                  </Accordion.Header>
                  <Accordion.Body className="text-muted">
                    After reviewing your custom specifications on WhatsApp, we confirm delivery arrangements and provide our official bank transfer details. A 70% deposit (or 100% full payment) secures your bake slot.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3" className="border-golden">
                  <Accordion.Header>
                    <strong>🚚 How are cake deliveries handled?</strong>
                  </Accordion.Header>
                  <Accordion.Body className="text-muted">
                    We offer safe, temperature-controlled doorstep delivery across our service coverage areas, as well as easy pickup directly from our bakery.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>
        </div>

      </Container>
    </div>
  );
}
