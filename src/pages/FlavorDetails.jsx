import React from 'react';
import { Container, Row, Col, Card, Badge, Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const FLAVOR_PROFILES = [
  {
    name: 'Classic Vanilla',
    description: 'Soft, Moist & Buttery Vanilla',
    notes: 'A timeless recipe made with pure rich butter and fragrant natural vanilla essence for a delicate, melt-in-the-mouth texture.',
    badge: 'Timeless Classic',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=800',
    pairsWith: 'Ideal for all custom birthday cakes, bento boxes, wedding tiers & celebrations.'
  },
  {
    name: 'Dark Chocolate',
    description: 'Deep, Rich & Moist Chocolate',
    notes: 'Crafted with premium dark cocoa to deliver an intensely rich, chocolatey indulgence with superior moisture in every crumb.',
    badge: 'Rich & Decadent',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    pairsWith: 'Perfect for chocolate lovers, drip cakes, and luxurious milestone events.'
  },
  {
    name: 'Red Velvet',
    description: 'Silky, Moist & Velvety Red Velvet',
    notes: 'A luxurious crimson sponge with subtle cocoa undertones and an exceptionally tender, velvety crumb that dissolves deliciously.',
    badge: 'Customer Favorite',
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&q=80&w=800',
    pairsWith: 'Ideal for romantic celebrations, anniversaries, birthday surprises & parfaits.'
  },
  {
    name: 'Strawberry Bliss',
    description: 'Soft, Moist & Delicately Sweet Strawberry',
    notes: 'Infused with the natural sweetness and aroma of ripe strawberries, offering a refreshing and fruity berry flavor.',
    badge: 'Delicate & Sweet',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800',
    pairsWith: 'Great for summer parties, baby showers, feminine themes & dessert tables.'
  }
];

const CAKE_SIZING_TABLE = [
  { size: "4' inches (Bento Takeaway)", servings: "1 – 2 portions", bestFor: "Solo treat, intimate gift, mini celebration", price: "₦10,000" },
  { size: "4' inches (Board)", servings: "2 – 3 portions", bestFor: "Photo sessions, cute birthday bento on board", price: "₦12,000" },
  { size: "6 inches", servings: "4 – 6 portions", bestFor: "Small family gathering, close friends", price: "₦14,000" },
  { size: "7 inches", servings: "8 – 10 portions", bestFor: "Standard birthday party & home events", price: "₦18,000" },
  { size: "8 inches", servings: "12 – 15 portions", bestFor: "Medium celebrations, dinner parties", price: "₦22,000" },
  { size: "9 inches", servings: "18 – 22 portions", bestFor: "Family milestones, larger parties", price: "₦28,000" },
  { size: "10 inches", servings: "25 – 30 portions", bestFor: "Office parties, grand birthdays", price: "₦35,000" },
  { size: "11 inches", servings: "35 – 40 portions", bestFor: "Big social events & weddings", price: "₦42,000" },
  { size: "12 inches", servings: "45 – 50+ portions", bestFor: "Major celebrations & showstopper events", price: "₦50,000" },
];

export default function FlavorDetails() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      {/* Page Header */}
      <div className="mb-4">
        <Button 
          variant="outline-secondary" 
          size="sm" 
          onClick={() => navigate(-1)} 
          className="btn-outline-golden rounded-pill mb-3"
        >
          ← Back
        </Button>
        <h1 className="fw-bold text-golden-dark display-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Signature Flavors & Portion Chart
        </h1>
        <p className="text-muted">
          Discover our 4 signature baked sponge recipes and comprehensive cake portion guide.
        </p>
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
                        <Button as={Link} to="/order" className="btn-golden w-100 rounded-pill btn-sm">
                          Order in {flavor.name}
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
            Go To Order Form 💬
          </Button>
        </div>
      </Card>
    </Container>
  );
}