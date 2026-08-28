import React, { useState } from 'react';
import { Container, Card, Form, Button, Accordion, Row, Col, Badge } from 'react-bootstrap';

const ORDER_CATEGORIES = [
  'Custom Celebration Cake',
  'Small Chops Package',
  'Pastries & Desserts (Pies, Doughnuts, Parfaits, Foil Cake)',
  'Mixed / Event Catering Order'
];

const CAKE_SIZES = [
  "4' inches (Bento Takeaway) — ₦10,000",
  "4' inches (Board) — ₦12,000",
  "6 inches — ₦14,000",
  "7 inches — ₦18,000",
  "8 inches — ₦22,000",
  "9 inches — ₦28,000",
  "10 inches — ₦35,000",
  "11 inches — ₦42,000",
  "12 inches — ₦50,000"
];

const SIGNATURE_FLAVORS = [
  'Classic Vanilla (Soft, Moist & Buttery)',
  'Dark Chocolate (Deep, Rich & Moist)',
  'Red Velvet (Silky, Moist & Velvety)',
  'Strawberry Bliss (Soft, Moist & Delicately Sweet)',
  'Not Applicable (Pastries / Small Chops only)'
];

const SMALL_CHOPS_AND_PASTRIES = [
  'None / Only Cake',
  'Small Chops Plate (1 chops, 5 puffpuff, 1 beef) — ₦2,500',
  'Bigger Plate (4 chops, 10 puffpuff, 3 beef) — ₦7,500',
  'Big Box (10 chops, 15 puffpuff, 8 beef) — ₦18,000',
  'Meat Pie — ₦1,200 (Min. 4 pcs)',
  'Chicken Pie — ₦1,500 (Min. 4 pcs)',
  'Egg Roll — ₦700 (Min. 4 pcs)',
  'Milky Doughnut — ₦1,500',
  'Milky Doughnut Box of 3 — ₦5,500',
  'Foil Cake — ₦2,500 (Min. 4 pcs)',
  'Cake Parfait — ₦4,000',
  'Custom Combination / Mixed Platter'
];

const FAQS = [
  { 
    question: "How far in advance should I place my order?", 
    answer: "For custom cakes and large pastry platters, we recommend placing your order at least 2 to 4 days in advance. For small chops and daily snacks, same-day or 24-hour notice is appreciated." 
  },
  { 
    question: "What are the minimum order quantities for pastries?", 
    answer: "Orders for individual pastries including Meat Pie, Chicken Pie, Egg Roll, and Small Chops (foil) start from a minimum of 4 pieces and above." 
  },
  { 
    question: "Is there a discount for bulk orders?", 
    answer: "Yes! When ordering 10 pieces or more of pastries or treats, a special bulk discount is applied to your order." 
  },
  { 
    question: "Can I customize the cake design or send reference pictures?", 
    answer: "Absolutely! Once you click 'Send Order via WhatsApp', you can share your Pinterest photos, color palettes, or topper ideas directly with Sophia's Signature Bakes in the chat." 
  },
  { 
    question: "How is payment and delivery handled?", 
    answer: "We confirm your final order total, delivery location/pickup time, and send direct account transfer details via WhatsApp (09118784051)." 
  }
];

export default function Order() {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '',
    date: '', 
    category: ORDER_CATEGORIES[0],
    cakeSize: CAKE_SIZES[2], 
    flavor: SIGNATURE_FLAVORS[0], 
    pastryItem: SMALL_CHOPS_AND_PASTRIES[0],
    quantity: '1',
    notes: '' 
  });

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    const phone = "2349118784051"; // Sophia's Signature Bakes WhatsApp number from logo
    
    let message = `👋 *Hello Sophia's Signature Bakes! I'd like to place an order:*%0A%0A` +
      `👤 *Customer Name:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Phone Number:* ${encodeURIComponent(formData.phone || 'Provided in chat')}%0A` +
      `📅 *Date Needed:* ${encodeURIComponent(formData.date)}%0A` +
      `📂 *Order Category:* ${encodeURIComponent(formData.category)}%0A`;

    if (formData.category.includes('Cake') || formData.category.includes('Mixed')) {
      message += `🎂 *Cake Size:* ${encodeURIComponent(formData.cakeSize)}%0A` +
                 `🍰 *Signature Flavor:* ${encodeURIComponent(formData.flavor)}%0A`;
    }

    if (formData.pastryItem !== 'None / Only Cake') {
      message += `🥟 *Small Chops / Pastry:* ${encodeURIComponent(formData.pastryItem)}%0A`;
    }

    message += `🔢 *Quantity / Units:* ${encodeURIComponent(formData.quantity)}%0A` +
               `📝 *Special Notes / Theme / Customization:* ${encodeURIComponent(formData.notes || 'None')}%0A%0A` +
               `✨ *Sent from Sophia's Signature Bakes Website*`;

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <Container className="py-5" style={{ maxWidth: '850px' }}>
      {/* Notice Alerts */}
      <Row className="g-3 mb-4">
        <Col sm={6}>
          <div className="notice-box p-3 h-100 d-flex align-items-center gap-2">
            <span className="fs-3">📌</span>
            <div className="small">
              <strong className="text-golden-dark d-block">Pastry Minimum:</strong>
              Meat Pie, Chicken Pie, Egg Roll & Small Chops (foil) start from <strong>4 pcs & above</strong>.
            </div>
          </div>
        </Col>

        <Col sm={6}>
          <div className="discount-ribbon p-3 h-100 d-flex align-items-center gap-2">
            <span className="fs-3">🎉</span>
            <div className="small">
              <strong className="d-block text-white">Bulk Discount:</strong>
              Ordering <strong>10 pieces and above</strong>? A special discount will be given!
            </div>
          </div>
        </Col>
      </Row>

      {/* WhatsApp Form Card */}
      <Card className="border-0 shadow-lg rounded-4 p-4 p-md-5 mb-5 bg-white border-top border-golden">
        <Card.Body>
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center gap-2 mb-2">
              <img 
                src="/sophia-logo.jpeg" 
                alt="Sophia's Signature Bakes" 
                className="rounded-circle shadow-sm border border-golden"
                style={{ width: '40px', height: '40px', objectFit: 'cover' }}
              />
              <Badge className="badge-gold-accent px-3 py-2 rounded-pill">Direct WhatsApp Order</Badge>
            </div>
            <h2 className="fw-bold text-golden-dark" style={{ fontFamily: "'Playfair Display', serif" }}>
              Place Your Custom Order
            </h2>
            <p className="text-muted small">
              Fill in your specifications below to instantly connect with <strong>Sophia's Signature Bakes</strong> on WhatsApp (09118784051).
            </p>
          </div>

          <Form onSubmit={handleWhatsAppOrder}>
            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-golden-dark">Your Full Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    required 
                    placeholder="e.g. Joy Adeleke"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-golden-dark">Phone Number</Form.Label>
                  <Form.Control 
                    type="tel" 
                    placeholder="e.g. 08012345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-golden-dark">Date Needed</Form.Label>
                  <Form.Control 
                    type="date" 
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-golden-dark">Order Category</Form.Label>
                  <Form.Select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {ORDER_CATEGORIES.map((c, idx) => <option key={idx} value={c}>{c}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-golden-dark">Cake Size (If Ordering Cake)</Form.Label>
                  <Form.Select 
                    value={formData.cakeSize}
                    onChange={(e) => setFormData({ ...formData, cakeSize: e.target.value })}
                  >
                    {CAKE_SIZES.map((s, idx) => <option key={idx} value={s}>{s}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-golden-dark">Signature Flavor</Form.Label>
                  <Form.Select 
                    value={formData.flavor}
                    onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                  >
                    {SIGNATURE_FLAVORS.map((f, idx) => <option key={idx} value={f}>{f}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="g-3 mb-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-golden-dark">Small Chops / Pastries / Desserts</Form.Label>
                  <Form.Select 
                    value={formData.pastryItem}
                    onChange={(e) => setFormData({ ...formData, pastryItem: e.target.value })}
                  >
                    {SMALL_CHOPS_AND_PASTRIES.map((p, idx) => <option key={idx} value={p}>{p}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label className="fw-semibold text-golden-dark">Quantity / Units</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="e.g. 1 cake, 10 meat pies"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold text-golden-dark">Design Theme & Additional Notes</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={4} 
                placeholder="Mention cake color theme, message to write on cake, allergies, or reference details..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Form.Group>

            <Button type="submit" size="lg" className="btn-golden w-100 rounded-pill py-3 fw-bold fs-5 shadow">
              💬 Open WhatsApp & Send Order (09118784051)
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* FAQ Accordion */}
      <div className="text-center mb-3">
        <h3 className="fw-bold text-golden-dark" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ordering FAQs
        </h3>
        <p className="text-muted small">Everything you need to know about our ordering process and policies.</p>
      </div>

      <Accordion defaultActiveKey="0" className="shadow-sm rounded-4 overflow-hidden border border-golden mb-4">
        {FAQS.map((faq, idx) => (
          <Accordion.Item eventKey={String(idx)} key={idx} className="border-golden">
            <Accordion.Header>
              <span className="fw-semibold text-golden-dark">{faq.question}</span>
            </Accordion.Header>
            <Accordion.Body className="text-muted">{faq.answer}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}