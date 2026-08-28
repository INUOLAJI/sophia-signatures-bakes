import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SIGNATURE_FLAVORS = [
  {
    name: 'Classic Vanilla',
    desc: 'Soft, Moist & Buttery Vanilla',
    badge: 'Timeless Classic',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Dark Chocolate',
    desc: 'Deep, Rich & Moist Chocolate',
    badge: 'Rich & Decadent',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Red Velvet',
    desc: 'Silky, Moist & Velvety Red Velvet',
    badge: 'Customer Favorite',
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Strawberry Bliss',
    desc: 'Soft, Moist & Delicately Sweet Strawberry',
    badge: 'Delicate & Sweet',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600'
  }
];

const CAKE_PRICING = [
  { size: "4' inches (Bento Takeaway)", price: "₦10,000", servings: "1 - 2 portions", tag: "Cute Bento", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600" },
  { size: "4' inches (Board)", price: "₦12,000", servings: "2 - 3 portions", tag: "Mini Board", image: "https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&q=80&w=600" },
  { size: "6 inches", price: "₦14,000", servings: "4 - 6 portions", tag: "Popular", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600" },
  { size: "7 inches", price: "₦18,000", servings: "8 - 10 portions", tag: "Standard Party", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=600" },
  { size: "8 inches", price: "₦22,000", servings: "12 - 15 portions", tag: "Best Seller", image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600" },
  { size: "9 inches", price: "₦28,000", servings: "18 - 22 portions", tag: "Family Celebration", image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=600" },
  { size: "10 inches", price: "₦35,000", servings: "25 - 30 portions", tag: "Large Gathering", image: "https://images.unsplash.com/photo-1506459225024-1428097a7e18?auto=format&fit=crop&q=80&w=600" },
  { size: "11 inches", price: "₦42,000", servings: "35 - 40 portions", tag: "Grand Party", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600" },
  { size: "12 inches", price: "₦50,000", servings: "45 - 50+ portions", tag: "Showstopper", image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600" },
];

const SMALL_CHOPS_PACKS = [
  {
    name: "Small Chops (Plate)",
    price: "₦2,500",
    contents: "1 chops (samosa/spring roll), 5 puffpuff and 1 beef",
    badge: "Solo Pack",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Bigger Plate",
    price: "₦7,500",
    contents: "4 chops, 10 puffpuff and 3 beef",
    badge: "Share Pack",
    image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Big Box",
    price: "₦18,000 (18k)",
    contents: "10 chops, 15 puffpuff and 8 beef",
    badge: "Party Box",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600"
  }
];

const PASTRIES_AND_DESSERTS = [
  {
    name: "Meat Pie",
    price: "₦1,200",
    desc: "Flaky golden buttery crust loaded with richly seasoned minced beef and potatoes.",
    minOrderNote: "Min. 4 pieces",
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Chicken Pie",
    price: "₦1,500",
    desc: "Golden baked pastry filled with tender shredded chicken, savory veggies & spices.",
    minOrderNote: "Min. 4 pieces",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Egg Roll",
    price: "₦700",
    desc: "Crisp golden fried pastry dough wrapped around a whole seasoned boiled egg.",
    minOrderNote: "Min. 4 pieces",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Milky Doughnut",
    price: "₦1,500",
    desc: "Ultra fluffy, golden fried doughnut generously coated with sweet premium powdered milk.",
    minOrderNote: "Single Piece",
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Milky Doughnut (Box of 3)",
    price: "₦5,500",
    desc: "Pack of 3 irresistible melt-in-the-mouth milky doughnuts in a gift box.",
    minOrderNote: "Box Pack",
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Foil Cake",
    price: "₦2,500",
    desc: "Freshly baked, super moist individual tin cake topped with delicious glaze.",
    minOrderNote: "Min. 4 pieces",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600"
  },
  {
    name: "Cake Parfait",
    price: "₦4,000",
    desc: "Rich layered cup dessert with moist cake crumble, velvety cream, and assorted toppings.",
    minOrderNote: "Individual Cup",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600"
  }
];

export default function Menu() {
  return (
    <Container className="py-5">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-4">
        <Badge className="badge-gold-accent px-3 py-2 rounded-pill mb-2">Our Complete Bakery Menu</Badge>
        <h1 className="fw-bold text-golden-dark display-5" style={{ fontFamily: "'Playfair Display', serif" }}>
          Menu & Price List
        </h1>
        <p className="text-golden-text-muted">
          All our cakes and pastries are baked fresh to order using the finest ingredients.
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
                Ordering <strong>10 pieces and above</strong>? A generous discount will be automatically applied to your order!
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

      {/* Section 2: Cake Sizing & Pricing */}
      <div className="mb-5 pt-3">
        <div className="d-flex flex-wrap justify-content-between align-items-end mb-4 border-bottom border-golden pb-3">
          <div>
            <h2 className="fw-bold text-golden-dark mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cake Sizing & Starting Prices
            </h2>
            <p className="text-muted small mb-0">
              Prices start from 4" bento takeaway to grand 12" celebration tiers.
            </p>
          </div>
          <Button as={Link} to="/order" className="btn-golden rounded-pill px-4 btn-sm mt-2 mt-sm-0">
            Order Custom Cake
          </Button>
        </div>

        <Row className="g-4">
          {CAKE_PRICING.map((item, idx) => (
            <Col sm={6} md={4} lg={4} key={idx}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover bg-white">
                <Card.Img variant="top" src={item.image} style={{ height: '180px', objectFit: 'cover' }} />
                <Card.Body className="p-4 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="fw-bold text-golden-dark mb-0">{item.size}</h5>
                      <Badge className="badge-golden">{item.tag}</Badge>
                    </div>
                    <p className="text-muted small mb-3">Estimated: {item.servings}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pt-2 border-top border-golden">
                    <div>
                      <span className="small text-muted d-block" style={{ fontSize: '0.75rem' }}>Price</span>
                      <span className="fw-bold text-golden fs-5">{item.price}</span>
                    </div>
                    <Button as={Link} to="/order" size="sm" className="btn-outline-golden rounded-pill px-3">
                      Select
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
                    <Button as={Link} to="/order" className="btn-golden rounded-pill px-4 btn-sm">
                      Order Pack
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
                    <Button as={Link} to="/order" size="sm" className="btn-outline-golden rounded-pill px-3">
                      Order
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
          Need a Custom Combination or Catering for an Event?
        </h3>
        <p className="text-muted mb-4 max-w-lg mx-auto">
          We cater for birthdays, weddings, office meetings, and party celebrations with personalized dessert boxes and small chops platters.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button as={Link} to="/order" className="btn-golden rounded-pill px-5 py-2 fs-5">
            Proceed to WhatsApp Order Form 💬
          </Button>
        </div>
      </Card>
    </Container>
  );
}