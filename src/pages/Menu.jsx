import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const SIGNATURE_FLAVORS = [
  {
    name: 'Classic Vanilla',
    desc: 'Soft, Moist & Buttery Vanilla',
    badge: 'Timeless Classic',
    image: '/vanillaflavour.jpeg'
  },
  {
    name: 'Dark Chocolate',
    desc: 'Deep, Rich & Moist Chocolate',
    badge: 'Rich & Decadent',
    image: '/chocolateflavour.jpeg'
  },
  {
    name: 'Red Velvet',
    desc: 'Silky, Moist & Velvety Red Velvet',
    badge: 'Customer Favorite',
    image: '/redvioletflavour.jpeg'
  },
  {
    name: 'Strawberry Bliss',
    desc: 'Soft, Moist & Delicately Sweet Strawberry',
    badge: 'Delicate & Sweet',
    image: '/strawberryflavour.jpeg'
  }
];

const CAKE_PRICING = [
  { name: "4' inches (Bento Takeaway)", price: "₦10,000", priceNum: 10000, servings: "1 - 2 portions", tag: "Cute Bento", image: "/cake4inchestakeaway.jpeg" },
  { name: "4' inches (Board)", price: "₦12,000", priceNum: 12000, servings: "2 - 3 portions", tag: "Mini Board", image: "/fourinchesboard.jpeg" },
  { name: "6 inches", price: "₦14,000", priceNum: 14000, servings: "4 - 6 portions", tag: "Popular", image: "/6inchesboard.jpeg" },
  { name: "7 inches", price: "₦18,000", priceNum: 18000, servings: "8 - 10 portions", tag: "Standard Party", image: "/7inchesboard.jpeg" },
  { name: "8 inches", price: "₦22,000", priceNum: 22000, servings: "12 - 15 portions", tag: "Best Seller", image: "/8inchesboard.jpeg" },
  { name: "9 inches", price: "₦28,000", priceNum: 28000, servings: "18 - 22 portions", tag: "Family Celebration", image: "/9inchesboard.jpeg" },
  { name: "10 inches", price: "₦35,000", priceNum: 35000, servings: "25 - 30 portions", tag: "Large Gathering", image: "/10inchesboard.jpeg" },
  { name: "11 inches", price: "₦42,000", priceNum: 42000, servings: "35 - 40 portions", tag: "Grand Party", image: "/11inchesboard.jpeg" },
  { name: "12 inches", price: "₦50,000", priceNum: 50000, servings: "45 - 50+ portions", tag: "Showstopper", image: "/12inchesboard.jpeg" },
];

const SMALL_CHOPS_PACKS = [
  {
    name: "Small Chops (Plate)",
    price: "₦2,500",
    priceNum: 2500,
    contents: "1 chops (samosa/spring roll), 5 puffpuff and 1 beef",
    badge: "Solo Pack",
    category: "Small Chops",
    image: "/smallchops.jpeg"
  },
  {
    name: "Bigger Plate",
    price: "₦7,500",
    priceNum: 7500,
    contents: "4 chops, 10 puffpuff and 3 beef",
    badge: "Share Pack",
    category: "Small Chops",
    image: "/bigboxofsmallchops.jpeg"
  },
  {
    name: "Big Box",
    price: "₦18,000",
    priceNum: 18000,
    contents: "10 chops, 15 puffpuff and 8 beef",
    badge: "Party Box",
    category: "Small Chops",
    image: "/bigboxofsmallchops.jpeg"
  }
];

const PASTRIES_AND_DESSERTS = [
  {
    name: "Meat Pie",
    price: "₦1,200",
    priceNum: 1200,
    desc: "Flaky golden buttery crust loaded with richly seasoned minced beef and potatoes.",
    minOrderNote: "Min. 4 pieces",
    minOrder: 4,
    category: "Pastries",
    image: "/meatpie.jpeg"
  },
  {
    name: "Chicken Pie",
    price: "₦1,500",
    priceNum: 1500,
    desc: "Golden baked pastry filled with tender shredded chicken, savory veggies & spices.",
    minOrderNote: "Min. 4 pieces",
    minOrder: 4,
    category: "Pastries",
    image: "/meatpie.jpeg"
  },
  {
    name: "Egg Roll",
    price: "₦700",
    priceNum: 700,
    desc: "Crisp golden fried pastry dough wrapped around a whole seasoned boiled egg.",
    minOrderNote: "Min. 4 pieces",
    minOrder: 4,
    category: "Pastries",
    image: "/eggroll.jpeg"
  },
  {
    name: "Milky Doughnut",
    price: "₦1,500",
    priceNum: 1500,
    desc: "Ultra fluffy, golden fried doughnut generously coated with sweet premium powdered milk.",
    minOrderNote: "Single Piece",
    minOrder: 1,
    category: "Pastries",
    image: "/milkydoughnut.jpeg"
  },
  {
    name: "Milky Doughnut (Box of 3)",
    price: "₦5,500",
    priceNum: 5500,
    desc: "Pack of 3 premium melt-in-the-mouth milky doughnuts in a gift box.",
    minOrderNote: "Box Pack",
    minOrder: 1,
    category: "Pastries",
    image: "/milkydoughnut.jpeg"
  },
  {
    name: "Foil Cake",
    price: "₦2,500",
    priceNum: 2500,
    desc: "Freshly baked, super moist individual tin cake topped with delicious glaze.",
    minOrderNote: "Min. 4 pieces",
    minOrder: 4,
    category: "Pastries",
    image: "/foilcake.jpeg"
  },
  {
    name: "Cake Parfait",
    price: "₦4,000",
    priceNum: 4000,
    desc: "Rich layered cup dessert with moist cake crumble, velvety cream, and assorted toppings.",
    minOrderNote: "Individual Cup",
    minOrder: 1,
    category: "Desserts",
    image: "/parfait.jpeg"
  }
];

export default function Menu() {
  const { addToCart, totalItemCount } = useCart();
  const [selectedCake, setSelectedCake] = useState(null);
  const [cakeFlavor, setCakeFlavor] = useState('Classic Vanilla');
  const [cakeQty, setCakeQty] = useState(1);

  const handleOpenCakeModal = (cake) => {
    setSelectedCake(cake);
    setCakeFlavor('Classic Vanilla');
    setCakeQty(1);
  };

  const handleAddCakeToCart = () => {
    if (!selectedCake) return;
    addToCart(selectedCake, cakeQty, cakeFlavor);
    setSelectedCake(null);
  };

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-4">
        <Badge className="badge-gold-accent px-3 py-2 rounded-pill mb-2">Our Complete Bakery Menu</Badge>
        <h1 className="fw-bold text-golden-dark display-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Menu & Price List
        </h1>
        <p className="text-golden-text-muted">
          Select items to add them directly to your order cart.
        </p>
      </div>

      {/* Important Notices Banner */}
      <Row className="g-3 mb-5">
        <Col md={6}>
          <div className="notice-box p-3 h-100 d-flex align-items-center gap-3">
            <span className="fs-2">📌</span>
            <div>
              <strong className="text-golden-dark d-block">Minimum Pastry Orders:</strong>
              <span className="small text-muted">
                Orders on pastries like <strong>Meat Pie, Chicken Pie, Egg Roll, and Small Chops (foil)</strong> start from <strong>4 pieces and above</strong>.
              </span>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="discount-ribbon p-3 h-100 d-flex align-items-center gap-3">
            <span className="fs-2">🎉</span>
            <div>
              <strong className="d-block text-white">Bulk Order Discount:</strong>
              <span className="small text-white opacity-90">
                Ordering <strong>10 pieces and above</strong>? A special bulk discount will be automatically applied at checkout!
              </span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Section 1: Signature Flavors */}
      <div className="mb-5">
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 border-bottom border-golden pb-3">
          <div>
            <h2 className="fw-bold text-golden-dark mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Signature Flavors
            </h2>
            <p className="text-muted small mb-0">Choose your base cake flavor for any custom cake size</p>
          </div>
          <Button as={Link} to="/flavor-details" variant="link" className="text-golden text-decoration-none fw-bold p-0 mt-2 mt-sm-0">
            View Flavor Profiles →
          </Button>
        </div>

        <Row className="g-4">
          {SIGNATURE_FLAVORS.map((item, idx) => (
            <Col sm={6} lg={3} key={idx}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover bg-white text-center">
                <Card.Img variant="top" src={item.image} style={{ height: '170px', objectFit: 'cover' }} />
                <Card.Body className="p-3">
                  <Badge className="badge-gold-accent mb-2">{item.badge}</Badge>
                  <h5 className="fw-bold text-golden-dark mb-1">{item.name}</h5>
                  <p className="text-muted small mb-0">{item.desc}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Custom Cake Order Studio Banner */}
      <div className="p-4 p-md-5 rounded-4 mb-5 shadow-sm border border-golden bg-white">
        <Row className="align-items-center gy-3">
          <Col md={8}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <Badge className="badge-gold-accent px-3 py-1 rounded-pill">✨ Bespoke Studio</Badge>
              <span className="small text-muted">Multi-tier, Flavors, Fillings & Toppers</span>
            </div>
            <h3 className="fw-bold text-golden-dark mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Looking for a Fully Customized Cake?
            </h3>
            <p className="text-muted mb-0 small">
              Use our interactive <strong>Custom Order Form</strong> to select custom tier counts, heart shapes, custom acrylic toppers, fresh florals, and get an instant quote ready for WhatsApp.
            </p>
          </Col>
          <Col md={4} className="text-md-end">
            <Button as={Link} to="/custom-order" className="btn-golden rounded-pill px-4 py-2">
              ✨ Build Custom Cake →
            </Button>
          </Col>
        </Row>
      </div>

      {/* Section 2: Cake Sizing & Pricing */}
      <div className="mb-5 pt-3">
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 border-bottom border-golden pb-3">
          <div>
            <h2 className="fw-bold text-golden-dark mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cake Sizing & Starting Prices
            </h2>
            <p className="text-muted small mb-0">
              Click any size to select your favorite flavor and add it to your cart.
            </p>
          </div>
          <Link to="/order" className="btn btn-outline-golden rounded-pill px-4 btn-sm mt-2 mt-sm-0 d-flex align-items-center gap-2">
            <span>🛒 Cart</span>
            <Badge bg="danger">{totalItemCount}</Badge>
          </Link>
        </div>

        <Row className="g-4">
          {CAKE_PRICING.map((cake, idx) => (
            <Col sm={6} md={4} lg={4} key={idx}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover bg-white">
                <Card.Img variant="top" src={cake.image} style={{ height: '180px', objectFit: 'cover' }} />
                <Card.Body className="p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold text-golden-dark mb-0">{cake.name}</h5>
                      <Badge className="badge-golden">{cake.tag}</Badge>
                    </div>
                    <p className="text-muted small mb-3">Estimated: {cake.servings}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pt-2 border-top border-golden">
                    <div>
                      <span className="small text-muted d-block" style={{ fontSize: '0.75rem' }}>Starting Price</span>
                      <span className="fw-bold text-golden fs-5">{cake.price}</span>
                    </div>
                    <Button 
                      onClick={() => handleOpenCakeModal(cake)} 
                      className="btn-golden rounded-pill px-3 btn-sm d-flex align-items-center gap-1"
                    >
                      <span>+ Add Cake</span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Section 3: Small Chops Combos */}
      <div className="mb-5 pt-3">
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 border-bottom border-golden pb-3">
          <div>
            <h2 className="fw-bold text-golden-dark mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Small Chops Packages
            </h2>
            <p className="text-muted small mb-0">Hot, crispy & freshly prepared for events, cravings & parties.</p>
          </div>
          <Badge className="badge-gold-accent px-3 py-2 rounded-pill">Party Ready</Badge>
        </div>

        <Row className="g-4">
          {SMALL_CHOPS_PACKS.map((pack, idx) => (
            <Col md={4} key={idx}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover bg-white">
                <div className="position-relative">
                  <Card.Img variant="top" src={pack.image} style={{ height: '200px', objectFit: 'cover' }} />
                  <span className="position-absolute top-0 end-0 m-3 badge bg-golden-primary rounded-pill px-3 py-2">
                    {pack.badge}
                  </span>
                </div>
                <Card.Body className="p-4 d-flex flex-column justify-content-between">
                  <div>
                    <h4 className="fw-bold text-golden-dark mb-2">{pack.name}</h4>
                    <p className="text-muted small mb-3">
                      <strong>Contents:</strong> {pack.contents}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top border-golden">
                    <span className="fw-bold text-golden fs-4">{pack.price}</span>
                    <Button 
                      onClick={() => addToCart(pack, 1)} 
                      className="btn-golden rounded-pill px-4 btn-sm"
                    >
                      + Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Section 4: Pastries, Doughnuts & Desserts */}
      <div className="mb-5 pt-3">
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 border-bottom border-golden pb-3">
          <div>
            <h2 className="fw-bold text-golden-dark mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Pastries, Doughnuts & Parfaits
            </h2>
            <p className="text-muted small mb-0">
              Freshly baked snacks, creamy dessert cups & decadent treats.
            </p>
          </div>
          <div className="small text-muted fst-italic">
            *Pastries start from 4 pcs & above
          </div>
        </div>

        <Row className="g-4">
          {PASTRIES_AND_DESSERTS.map((item, idx) => (
            <Col sm={6} lg={4} key={idx}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover bg-white">
                <Card.Img variant="top" src={item.image} style={{ height: '180px', objectFit: 'cover' }} />
                <Card.Body className="p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <h5 className="fw-bold text-golden-dark mb-0">{item.name}</h5>
                      <Badge bg="light" text="dark" className="border border-golden small">
                        {item.minOrderNote}
                      </Badge>
                    </div>
                    <p className="text-muted small mb-3">{item.desc}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pt-2 border-top border-golden">
                    <span className="fw-bold text-golden fs-5">{item.price}</span>
                    <Button 
                      onClick={() => addToCart(item, item.minOrder || 1)} 
                      size="sm" 
                      className="btn-golden rounded-pill px-3"
                    >
                      + Add {item.minOrder > 1 ? `(${item.minOrder} pcs)` : ''}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Quick Order CTA */}
      <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 bg-golden-subtle border border-golden text-center">
        <h3 className="fw-bold text-golden-dark mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ready to Check Out Your Items?
        </h3>
        <p className="text-muted mb-4 max-w-lg mx-auto">
          You currently have <strong>{totalItemCount}</strong> item(s) in your cart. Review your order and submit directly on WhatsApp.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button as={Link} to="/order" className="btn-golden rounded-pill px-5 py-3 fs-5 shadow">
            🛒 View Cart & Send Order to WhatsApp ({totalItemCount} Items)
          </Button>
        </div>
      </Card>

      {/* Modal for selecting cake flavor before adding to cart */}
      <Modal show={!!selectedCake} onHide={() => setSelectedCake(null)} centered>
        <Modal.Header closeButton className="border-golden bg-golden-light">
          <Modal.Title className="fw-bold text-golden-dark fs-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Configure {selectedCake?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="text-center mb-3">
            <h4 className="fw-bold text-golden mb-1">{selectedCake?.price}</h4>
            <small className="text-muted">Servings: {selectedCake?.servings}</small>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-golden-dark">Select Your Signature Flavor:</Form.Label>
            <Form.Select 
              value={cakeFlavor} 
              onChange={(e) => setCakeFlavor(e.target.value)}
              className="py-2"
            >
              <option value="Classic Vanilla">Classic Vanilla (Soft, Moist & Buttery)</option>
              <option value="Dark Chocolate">Dark Chocolate (Deep, Rich & Moist)</option>
              <option value="Red Velvet">Red Velvet (Silky, Moist & Velvety)</option>
              <option value="Strawberry Bliss">Strawberry Bliss (Soft, Moist & Delicately Sweet)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-golden-dark">Number of Cakes:</Form.Label>
            <Form.Control 
              type="number" 
              min="1" 
              value={cakeQty} 
              onChange={(e) => setCakeQty(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-golden">
          <Button variant="outline-secondary" onClick={() => setSelectedCake(null)} className="rounded-pill">
            Cancel
          </Button>
          <Button onClick={handleAddCakeToCart} className="btn-golden rounded-pill px-4">
            🛒 Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}