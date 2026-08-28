import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Table, Modal, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const FLAVOR_PROFILES = [
  {
    name: 'Classic Vanilla',
    description: 'Soft, Moist & Buttery Vanilla',
    notes: 'A timeless recipe made with pure rich butter and fragrant natural vanilla essence for a delicate, melt-in-the-mouth texture.',
    badge: 'Timeless Classic',
    image: '/vanillaflavour.jpeg',
    pairsWith: 'Ideal for all custom birthday cakes, bento boxes, wedding tiers & celebrations.'
  },
  {
    name: 'Dark Chocolate',
    description: 'Deep, Rich & Moist Chocolate',
    notes: 'Crafted with premium dark cocoa to deliver an intensely rich, chocolatey indulgence with superior moisture in every crumb.',
    badge: 'Rich & Decadent',
    image: '/chocolateflavour.jpeg',
    pairsWith: 'Perfect for chocolate lovers, drip cakes, and luxurious milestone events.'
  },
  {
    name: 'Red Velvet',
    description: 'Silky, Moist & Velvety Red Velvet',
    notes: 'A luxurious crimson sponge with subtle cocoa undertones and an exceptionally tender, velvety crumb that dissolves deliciously.',
    badge: 'Customer Favorite',
    image: '/redvioletflavour.jpeg',
    pairsWith: 'Ideal for romantic celebrations, anniversaries, birthday surprises & parfaits.'
  },
  {
    name: 'Strawberry Bliss',
    description: 'Soft, Moist & Delicately Sweet Strawberry',
    notes: 'Infused with the natural sweetness and aroma of ripe strawberries, offering a refreshing and fruity berry flavor.',
    badge: 'Delicate & Sweet',
    image: '/strawberryflavour.jpeg',
    pairsWith: 'Great for summer parties, baby showers, feminine themes & dessert tables.'
  }
];

const CAKE_SIZING_TABLE = [
  { size: "4' inches (Bento Takeaway)", priceNum: 10000, servings: "1 – 2 portions", bestFor: "Solo treat, intimate gift, mini celebration", price: "₦10,000" },
  { size: "4' inches (Board)", priceNum: 12000, servings: "2 – 3 portions", bestFor: "Photo sessions, cute birthday bento on board", price: "₦12,000" },
  { size: "6 inches", priceNum: 14000, servings: "4 – 6 portions", bestFor: "Small family gathering, close friends", price: "₦14,000" },
  { size: "7 inches", priceNum: 18000, servings: "8 – 10 portions", bestFor: "Standard birthday party & home events", price: "₦18,000" },
  { size: "8 inches", priceNum: 22000, servings: "12 – 15 portions", bestFor: "Medium celebrations, dinner parties", price: "₦22,000" },
  { size: "9 inches", priceNum: 28000, servings: "18 – 22 portions", bestFor: "Family milestones, larger parties", price: "₦28,000" },
  { size: "10 inches", priceNum: 35000, servings: "25 – 30 portions", bestFor: "Office parties, grand birthdays", price: "₦35,000" },
  { size: "11 inches", priceNum: 42000, servings: "35 – 40 portions", bestFor: "Big social events & weddings", price: "₦42,000" },
  { size: "12 inches", priceNum: 50000, servings: "45 – 50+ portions", bestFor: "Major celebrations & showstopper events", price: "₦50,000" },
];

export default function FlavorDetails() {
  const navigate = useNavigate();
  const { addToCart, totalItemCount } = useCart();
  const [selectedFlavorForOrder, setSelectedFlavorForOrder] = useState(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(2); // default 6 inches

  const handleAddConfiguredCake = () => {
    if (!selectedFlavorForOrder) return;
    const sizeObj = CAKE_SIZING_TABLE[selectedSizeIndex];
    addToCart({
      name: `${sizeObj.size} Cake`,
      price: sizeObj.price,
      priceNum: sizeObj.priceNum,
      category: 'Cakes'
    }, 1, selectedFlavorForOrder.name);
    setSelectedFlavorForOrder(null);
  };

  return (
    <Container className="py-5">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <div>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => navigate(-1)} 
            className="btn-outline-golden rounded-pill mb-2"
          >
            ← Back
          </Button>
          <h1 className="fw-bold text-golden-dark display-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Signature Flavors & Portion Chart
          </h1>
          <p className="text-muted mb-0">
            Discover our 4 signature baked sponge recipes and comprehensive cake portion guide.
          </p>
        </div>

        <Link to="/order" className="btn btn-golden rounded-pill px-4 d-flex align-items-center gap-2">
          <span>🛒 View Cart</span>
          <Badge bg="white" text="dark">{totalItemCount}</Badge>
        </Link>
      </div>

      {/* Prominent Notes & Discount Alerts */}
      <Row className="g-3 mb-5">
        <Col md={6}>
          <div className="notice-box p-3 h-100 d-flex align-items-center gap-3">
            <span className="fs-2">📌</span>
            <div>
              <strong className="text-golden-dark d-block">Order Notice:</strong>
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
              <strong className="d-block text-white">Bulk Discount:</strong>
              <span className="small text-white opacity-90">
                Ordering <strong>10 pieces and above</strong>? Enjoy an exclusive discount on your bulk pastry/snack order!
              </span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Flavor Breakdown Cards */}
      <div className="mb-5">
        <h3 className="fw-bold text-golden-dark mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
          Our 4 Signature Flavors
        </h3>
        <Row className="g-4">
          {FLAVOR_PROFILES.map((flavor, idx) => (
            <Col lg={6} key={idx}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white card-hover">
                <Row className="g-0 h-100">
                  <Col sm={5}>
                    <img 
                      src={flavor.image} 
                      alt={flavor.name} 
                      className="w-100 h-100" 
                      style={{ minHeight: '220px', objectFit: 'cover' }} 
                    />
                  </Col>
                  <Col sm={7}>
                    <Card.Body className="p-4 d-flex flex-column justify-content-between h-100">
                      <div>
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h4 className="fw-bold text-golden-dark mb-0">{flavor.name}</h4>
                          <Badge className="badge-gold-accent">{flavor.badge}</Badge>
                        </div>
                        <p className="text-golden fw-semibold small mb-2">{flavor.description}</p>
                        <p className="text-muted small mb-3">{flavor.notes}</p>
                        <p className="text-muted small fst-italic mb-3">
                          <strong>Best For:</strong> {flavor.pairsWith}
                        </p>
                      </div>
                      <div>
                        <Button 
                          onClick={() => setSelectedFlavorForOrder(flavor)} 
                          className="btn-golden w-100 rounded-pill btn-sm d-flex align-items-center justify-content-center gap-1"
                        >
                          <span>+ Add {flavor.name} Cake to Cart</span>
                        </Button>
                      </div>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Sizing & Servings Guide Table */}
      <Card className="border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white mb-5 border-golden">
        <div className="text-center mb-4">
          <Badge className="badge-gold-accent px-3 py-2 rounded-pill mb-2">Size Reference Guide</Badge>
          <h3 className="fw-bold text-golden-dark mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Cake Size, Portions & Pricing Guide
          </h3>
          <p className="text-muted small">
            Use this guide to choose the ideal cake size for your guest count and occasion.
          </p>
        </div>

        <Table responsive hover className="align-middle mb-0">
          <thead className="bg-golden-subtle">
            <tr>
              <th className="py-3 text-golden-dark">Cake Size</th>
              <th className="py-3 text-golden-dark">Estimated Servings</th>
              <th className="py-3 text-golden-dark">Recommended For</th>
              <th className="py-3 text-golden-dark text-end">Starting Price</th>
            </tr>
          </thead>
          <tbody>
            {CAKE_SIZING_TABLE.map((row, idx) => (
              <tr key={idx}>
                <td className="fw-bold text-golden-dark py-3">{row.size}</td>
                <td className="text-muted">{row.servings}</td>
                <td className="text-muted small">{row.bestFor}</td>
                <td className="text-golden fw-bold fs-6 text-end">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="text-center mt-4 pt-3 border-top border-golden">
          <Button as={Link} to="/order" className="btn-golden rounded-pill px-5 py-2 fs-6">
            Go To Cart & Checkout ({totalItemCount} Items) 💬
          </Button>
        </div>
      </Card>

      {/* Modal for picking cake size for selected flavor */}
      <Modal show={!!selectedFlavorForOrder} onHide={() => setSelectedFlavorForOrder(null)} centered>
        <Modal.Header closeButton className="border-golden bg-golden-light">
          <Modal.Title className="fw-bold text-golden-dark fs-5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Add {selectedFlavorForOrder?.name} Cake
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <p className="text-muted small mb-3">
            Flavor selected: <strong>{selectedFlavorForOrder?.name}</strong> ({selectedFlavorForOrder?.description})
          </p>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold text-golden-dark">Choose Cake Size & Price:</Form.Label>
            <Form.Select 
              value={selectedSizeIndex} 
              onChange={(e) => setSelectedSizeIndex(parseInt(e.target.value, 10))}
              className="py-2"
            >
              {CAKE_SIZING_TABLE.map((size, idx) => (
                <option key={idx} value={idx}>
                  {size.size} — {size.price} ({size.servings})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-golden">
          <Button variant="outline-secondary" onClick={() => setSelectedFlavorForOrder(null)} className="rounded-pill">
            Cancel
          </Button>
          <Button onClick={handleAddConfiguredCake} className="btn-golden rounded-pill px-4">
            🛒 Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}