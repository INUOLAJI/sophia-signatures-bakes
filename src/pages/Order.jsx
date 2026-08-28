import React, { useState } from 'react';
import { Container, Card, Form, Button, Accordion, Row, Col, Badge, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer } from '../animations';

const QUICK_ADD_ITEMS = [
  { name: 'Meat Pie (Min. 4 pcs)', price: '₦1,200', priceNum: 1200, minOrder: 4, category: 'Pastries' },
  { name: 'Chicken Pie (Min. 4 pcs)', price: '₦1,500', priceNum: 1500, minOrder: 4, category: 'Pastries' },
  { name: 'Milky Doughnut', price: '₦1,500', priceNum: 1500, minOrder: 1, category: 'Pastries' },
  { name: 'Milky Doughnut (Box of 3)', price: '₦5,500', priceNum: 5500, minOrder: 1, category: 'Pastries' },
  { name: 'Cake Parfait', price: '₦4,000', priceNum: 4000, minOrder: 1, category: 'Desserts' },
  { name: 'Small Chops (Plate)', price: '₦2,500', priceNum: 2500, minOrder: 1, category: 'Small Chops' },
  { name: 'Bigger Plate', price: '₦7,500', priceNum: 7500, minOrder: 1, category: 'Small Chops' },
  { name: 'Foil Cake (Min. 4 pcs)', price: '₦2,500', priceNum: 2500, minOrder: 4, category: 'Pastries' },
];

const FAQS = [
  { question: "How far in advance should I place my order?", answer: "For custom cakes and large pastry platters, we recommend placing your order at least 2 to 4 days in advance. For small chops and daily snacks, same-day or 24-hour notice is appreciated." },
  { question: "What are the minimum order quantities for pastries?", answer: "Orders for individual pastries including Meat Pie, Chicken Pie, Egg Roll, and Small Chops (foil) start from a minimum of 4 pieces and above." },
  { question: "Is there a discount for bulk orders?", answer: "Yes! When ordering 10 pieces or more of pastries or treats, a special bulk discount is applied to your order." },
  { question: "Can I customize the cake design or send reference pictures?", answer: "Absolutely! Once you click 'Send Order via WhatsApp', you can share your Pinterest photos, color palettes, or topper ideas directly with Sophia's Signature Bakes in the chat." },
  { question: "How is payment and delivery handled?", answer: "We confirm your final order total, delivery location/pickup time, and send direct account transfer details via WhatsApp (09118784051)." },
];

export default function Order() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, totalItemCount, subtotal, isBulkDiscount, discountAmount, finalTotal, addToCart } = useCart();

  const [formData, setFormData] = useState({ name: '', phone: '', date: '', deliveryType: 'Pickup', address: '', notes: '' });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) { alert("Your cart is empty! Please add at least 1 item to proceed."); return; }

    const phone = "2349118784051";
    let itemsSummary = "";
    cartItems.forEach((item, idx) => {
      const flavorTxt = item.flavor ? ` [Flavor: ${item.flavor}]` : '';
      const priceNum = item.priceNum || parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
      const itemTotal = priceNum * item.quantity;
      let customSpecs = "";
      if (item.customDetails) {
        const d = item.customDetails;
        customSpecs = `%0A     • Occasion: ${encodeURIComponent(d.occasion)}` +
          `%0A     • Shape: ${encodeURIComponent(d.shape)}` +
          (d.inscription && d.inscription !== 'None requested' ? `%0A     • Text: "${encodeURIComponent(d.inscription)}"` : '') +
          (d.addons && d.addons.length > 0 ? `%0A     • Add-ons: ${encodeURIComponent(d.addons.join(', '))}` : '');
      }
      itemsSummary += `${idx + 1}. *${item.name}*${flavorTxt}%0A   Qty: ${item.quantity} × ₦${priceNum.toLocaleString()} = ₦${itemTotal.toLocaleString()}${customSpecs}%0A`;
    });

    let message = `👋 *Hello Sophia's Signature Bakes! I'd like to place an order:*%0A%0A` +
      `👤 *Customer Name:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Phone Number:* ${encodeURIComponent(formData.phone || 'In chat')}%0A` +
      `📅 *Date Needed:* ${encodeURIComponent(formData.date)}%0A` +
      `🚚 *Delivery / Pickup:* ${encodeURIComponent(formData.deliveryType)}` +
      (formData.address ? ` (${encodeURIComponent(formData.address)})` : '') + `%0A%0A` +
      `🛒 *ORDER ITEMS (${totalItemCount} pcs total):*%0A` + itemsSummary + `%0A` +
      `💰 *Subtotal:* ₦${subtotal.toLocaleString()}%0A`;

    if (isBulkDiscount) {
      message += `🎉 *Bulk Discount (10+ Items):* -₦${discountAmount.toLocaleString()}%0A🏷️ *FINAL ESTIMATED TOTAL:* ₦${finalTotal.toLocaleString()}%0A`;
    } else {
      message += `🏷️ *ESTIMATED TOTAL:* ₦${subtotal.toLocaleString()}%0A`;
    }
    message += `%0A📝 *Custom Notes:* ${encodeURIComponent(formData.notes || 'None')}%0A%0A✨ *Order sent from Sophia's Signature Bakes Website*`;

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    clearCart();
    setOrderSubmitted(true);
  };

  return (
    <Container className="py-5" style={{ maxWidth: '950px' }}>

      {/* Title */}
      <motion.div className="text-center mb-4" variants={fadeUp} initial="hidden" animate="visible">
        <Badge className="badge-gold-accent px-3 py-2 rounded-pill mb-2">Cart & WhatsApp Checkout</Badge>
        <h1 className="fw-bold text-golden-dark display-5" style={{ fontFamily: "'Playfair Display', serif" }}>Your Order Cart</h1>
        <p className="text-muted">Review your selected items, adjust quantities, and compile your order directly to WhatsApp.</p>
      </motion.div>

      {/* Notices */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <Row className="g-3 mb-4">
          {[
            { icon: '📌', title: 'Pastry Minimum:', body: <>Meat Pie, Chicken Pie, Egg Roll & Small Chops (foil) start from <strong>4 pcs & above</strong>.</>, ribbon: false },
            { icon: '🎉', title: 'Bulk Discount:', body: isBulkDiscount ? <span>🎉 <strong>5% Bulk Discount</strong> is active on your cart!</span> : <span>Order <strong>10 pieces and above</strong> to unlock a special discount! ({10 - totalItemCount > 0 ? `Add ${10 - totalItemCount} more` : 'Active!'})</span>, ribbon: true },
          ].map((n, i) => (
            <Col sm={6} key={i}>
              <motion.div custom={i} variants={scaleIn}>
                <div className={`${n.ribbon ? 'discount-ribbon' : 'notice-box'} p-3 h-100 d-flex align-items-center gap-2`}>
                  <span className="fs-3">{n.icon}</span>
                  <div className="small">
                    <strong className={`${n.ribbon ? 'text-white' : 'text-golden-dark'} d-block`}>{n.title}</strong>
                    <span className={n.ribbon ? 'text-white' : ''}>{n.body}</span>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>

      <Row className="g-4 mb-5">
        {/* Cart Items */}
        <Col lg={7}>
          <motion.div variants={fadeLeft} initial="hidden" animate="visible">
            <Card className="border-0 shadow-sm rounded-4 p-4 bg-white border border-golden h-100">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-golden">
                <h4 className="fw-bold text-golden-dark mb-0 fs-5">Cart Items ({totalItemCount})</h4>
                {cartItems.length > 0 && (
                  <Button variant="link" onClick={clearCart} className="text-muted small text-decoration-none p-0">Clear All</Button>
                )}
              </div>

              {cartItems.length === 0 ? (
                <motion.div className="text-center py-5" variants={scaleIn} initial="hidden" animate="visible">
                  <div className="fs-1 mb-2">🛒</div>
                  <h5 className="fw-bold text-golden-dark mb-2">Your Cart is Empty</h5>
                  <p className="text-muted small mb-4">You haven't added any cakes, small chops, or pastries yet.</p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button as={Link} to="/menu" className="btn-golden rounded-pill px-4">Explore Menu & Add Items</Button>
                  </motion.div>
                </motion.div>
              ) : (
                <div className="d-flex flex-column gap-3 mb-3">
                  <AnimatePresence>
                    {cartItems.map((item) => {
                      const priceNum = item.priceNum || parseInt(String(item.price).replace(/[^0-9]/g, ''), 10) || 0;
                      const itemTotal = priceNum * item.quantity;
                      return (
                        <motion.div
                          key={item.key}
                          layout
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="p-3 rounded-3 bg-golden-light border border-golden d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3"
                        >
                          <div className="d-flex align-items-center gap-3">
                            {item.image && (
                              <motion.img
                                src={item.image}
                                alt={item.name}
                                className="rounded-3"
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.25 }}
                              />
                            )}
                            <div>
                              <h6 className="fw-bold text-golden-dark mb-1">{item.name}</h6>
                              {item.flavor && <Badge className="badge-gold-accent mb-1 small me-1">Flavor: {item.flavor}</Badge>}
                              {item.customDetails && (
                                <div className="small text-muted mb-1" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                                  <span>• {item.customDetails.occasion} ({item.customDetails.shape})</span>
                                  {item.customDetails.inscription && item.customDetails.inscription !== 'None requested' && (
                                    <div>• Inscription: "{item.customDetails.inscription}"</div>
                                  )}
                                </div>
                              )}
                              <div className="text-golden fw-semibold small">₦{priceNum.toLocaleString()} each</div>
                            </div>
                          </div>

                          <div className="d-flex align-items-center justify-content-between gap-3 ms-auto">
                            <div className="d-flex align-items-center border border-golden rounded-pill bg-white px-2 py-1">
                              <motion.button type="button" className="btn btn-sm btn-link text-golden-dark p-0 fw-bold fs-6 text-decoration-none" style={{ width: '22px' }} onClick={() => updateQuantity(item.key, -1)} whileTap={{ scale: 0.8 }}>–</motion.button>
                              <motion.span key={item.quantity} initial={{ scale: 0.7 }} animate={{ scale: 1 }} className="px-2 fw-bold text-golden-dark small">{item.quantity}</motion.span>
                              <motion.button type="button" className="btn btn-sm btn-link text-golden-dark p-0 fw-bold fs-6 text-decoration-none" style={{ width: '22px' }} onClick={() => updateQuantity(item.key, 1)} whileTap={{ scale: 0.8 }}>+</motion.button>
                            </div>
                            <div className="text-end" style={{ minWidth: '85px' }}>
                              <motion.span key={itemTotal} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="fw-bold text-golden-dark d-block">
                                ₦{itemTotal.toLocaleString()}
                              </motion.span>
                            </div>
                            <motion.button type="button" className="btn btn-sm text-danger p-0" title="Remove item" onClick={() => removeFromCart(item.key)} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }}>✕</motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}

              {/* Custom Cake Callout */}
              <motion.div
                className="p-3 rounded-3 bg-golden-subtle border border-golden mb-3 d-flex justify-content-between align-items-center flex-wrap gap-2"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="d-flex align-items-center gap-2">
                  <span className="fs-4">🎨</span>
                  <div className="small">
                    <strong className="text-golden-dark d-block">Need a Custom Celebration Cake?</strong>
                    <span className="text-muted">Choose your custom tiers, fillings, vintage piping & luxury toppers.</span>
                  </div>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button as={Link} to="/custom-order" size="sm" className="btn-golden rounded-pill px-3">Custom Cake Form →</Button>
                </motion.div>
              </motion.div>

              {/* Quick Add */}
              <div className="mt-auto pt-3 border-top border-golden">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-golden-dark small">Quick Add Snacks & Pastries:</span>
                  <Link to="/menu" className="text-golden small text-decoration-none fw-semibold">Full Menu →</Link>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {QUICK_ADD_ITEMS.map((q, idx) => (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={() => addToCart(q, q.minOrder || 1)}
                      className="btn btn-sm btn-outline-golden rounded-pill py-1 px-2 small"
                      style={{ fontSize: '0.75rem' }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.93 }}
                    >
                      + {q.name} ({q.price})
                    </motion.button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </Col>

        {/* Checkout Form */}
        <Col lg={5}>
          <motion.div variants={fadeRight} initial="hidden" animate="visible">
            <Card className="border-0 shadow-lg rounded-4 p-4 bg-white border-top border-golden">
              <h4 className="fw-bold text-golden-dark mb-3 fs-5" style={{ fontFamily: "'Playfair Display', serif" }}>
                Customer & Order Details
              </h4>
              <Form onSubmit={handleWhatsAppOrder}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-golden-dark small">Your Full Name *</Form.Label>
                  <Form.Control type="text" required placeholder="e.g. Joy Adeleke" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </Form.Group>
                <Row className="g-2 mb-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold text-golden-dark small">Phone Number</Form.Label>
                      <Form.Control type="tel" placeholder="e.g. 08012345678" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold text-golden-dark small">Date Needed *</Form.Label>
                      <Form.Control type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-golden-dark small">Delivery or Pickup</Form.Label>
                  <Form.Select value={formData.deliveryType} onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}>
                    <option value="Pickup">Pickup at Bakery</option>
                    <option value="Home/Office Delivery">Home / Office Delivery</option>
                    <option value="Event Venue Delivery">Event Venue Delivery</option>
                  </Form.Select>
                </Form.Group>
                {formData.deliveryType !== 'Pickup' && (
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold text-golden-dark small">Delivery Address / Area</Form.Label>
                    <Form.Control type="text" placeholder="Enter street, estate or area..." value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                  </Form.Group>
                )}
                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold text-golden-dark small">Special Notes / Custom Cake Text / Allergies</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="e.g. Write 'Happy Birthday Sarah' on the cake, pink & gold theme..." value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
                </Form.Group>

                {/* Cost Summary */}
                <motion.div
                  className="p-3 rounded-3 bg-golden-subtle border border-golden mb-4"
                  layout
                >
                  <div className="d-flex justify-content-between small text-muted mb-1">
                    <span>Items Total ({totalItemCount} pcs):</span>
                    <motion.span key={subtotal} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>₦{subtotal.toLocaleString()}</motion.span>
                  </div>
                  <AnimatePresence>
                    {isBulkDiscount && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="d-flex justify-content-between small text-success fw-bold mb-1"
                      >
                        <span>Bulk Discount (10+ Items):</span>
                        <span>-₦{discountAmount.toLocaleString()}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="d-flex justify-content-between fw-bold text-golden-dark fs-5 pt-2 border-top border-golden">
                    <span>Estimated Total:</span>
                    <motion.span key={isBulkDiscount ? finalTotal : subtotal} initial={{ scale: 1.15, color: '#C58B35' }} animate={{ scale: 1, color: '#64380E' }} transition={{ duration: 0.3 }}>
                      ₦{(isBulkDiscount ? finalTotal : subtotal).toLocaleString()}
                    </motion.span>
                  </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Button type="submit" size="lg" className="btn-golden w-100 rounded-pill py-3 fw-bold fs-6 shadow d-flex align-items-center justify-content-center gap-2" disabled={cartItems.length === 0}>
                    <span>💬 Send Order to WhatsApp</span>
                  </Button>
                </motion.div>
                <small className="text-muted text-center d-block mt-2" style={{ fontSize: '0.75rem' }}>
                  Sends to <strong>09118784051</strong> for immediate confirmation
                </small>
              </Form>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* FAQs */}
      <motion.div className="text-center mb-3" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h3 className="fw-bold text-golden-dark" style={{ fontFamily: "'Playfair Display', serif" }}>Ordering FAQs</h3>
        <p className="text-muted small">Everything you need to know about our ordering process and policies.</p>
      </motion.div>

      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Accordion defaultActiveKey="0" className="shadow-sm rounded-4 overflow-hidden border border-golden mb-4">
          {FAQS.map((faq, idx) => (
            <motion.div key={idx} custom={idx} variants={fadeUp}>
              <Accordion.Item eventKey={String(idx)} className="border-golden">
                <Accordion.Header><span className="fw-semibold text-golden-dark">{faq.question}</span></Accordion.Header>
                <Accordion.Body className="text-muted">{faq.answer}</Accordion.Body>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>

      {/* Success Modal */}
      <Modal show={orderSubmitted} onHide={() => setOrderSubmitted(false)} centered>
        <Modal.Header closeButton className="border-golden bg-golden-light">
          <Modal.Title className="fw-bold text-golden-dark fs-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            🎉 Order Forwarded to WhatsApp!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4 text-center">
          <motion.div className="fs-1 mb-3" animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ duration: 0.6, delay: 0.1 }}>💬✨</motion.div>
          <h5 className="fw-bold text-golden-dark mb-2">Thank you, {formData.name || 'valued customer'}!</h5>
          <p className="text-muted small mb-3">
            Your full order details have been forwarded to <strong>Sophia's Signature Bakes (09118784051)</strong> on WhatsApp.
          </p>
          <div className="p-3 bg-golden-subtle rounded-3 border border-golden text-start small text-muted mb-3">
            ✅ <strong>Your cart has been cleared.</strong><br />
            ✅ <strong>Next Step:</strong> Simply hit "Send" inside WhatsApp to finalize your delivery date & payment.
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button as={Link} to="/menu" onClick={() => setOrderSubmitted(false)} className="btn-golden rounded-pill px-4">
              Browse Menu & Order More
            </Button>
          </motion.div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
