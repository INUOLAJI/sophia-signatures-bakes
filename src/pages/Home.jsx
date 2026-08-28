import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FEATURED_CATEGORIES = [
  { 
    title: 'Custom Celebration Cakes', 
    desc: 'From 4" Bento Takeaways to grand 12" luxury cakes. Starting from ₦10,000.',
    priceBadge: 'From ₦10,000',
    image: '/8inchesboard.jpeg',
    link: '/menu'
  },
  { 
    title: 'Small Chops & Finger Foods', 
    desc: 'Crispy samosas, spring rolls, fluffy puff puff, and seasoned beef plates & big boxes.', 
    priceBadge: 'From ₦2,500',
    image: '/smallchops.jpeg',
    link: '/menu'
  },
  { 
    title: 'Pastries, Doughnuts & Parfaits', 
    desc: 'Golden meat pies, chicken pies, milky doughnuts, foil cakes, and rich cake parfaits.', 
    priceBadge: 'From ₦700',
    image: '/milkydoughnut.jpeg',
    link: '/menu'
  },
];

const SIGNATURE_FLAVORS = [
  {
    name: 'Classic Vanilla',
    desc: 'Soft, Moist & Buttery Vanilla',
    tag: 'Classic Favorite',
    image: '/vanillaflavour.jpeg'
  },
  {
    name: 'Dark Chocolate',
    desc: 'Deep, Rich & Moist Chocolate',
    tag: 'Best Seller',
    image: '/chocolateflavour.jpeg'
  },
  {
    name: 'Red Velvet',
    desc: 'Silky, Moist & Velvety Red Velvet',
    tag: 'Crowd Pleaser',
    image: '/redvioletflavour.jpeg'
  },
  {
    name: 'Strawberry Bliss',
    desc: 'Soft, Moist & Delicately Sweet Strawberry',
    tag: 'Fruity & Fresh',
    image: '/strawberryflavour.jpeg'
  }
];

export default function Home() {
  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="align-items-center gy-4 mb-5 pb-3">
        <Col lg={6}>
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill badge-gold-accent mb-3">
            <img 
              src="/sophia-logo.jpeg" 
              alt="Sophia's Signature Bakes" 
              className="rounded-circle"
              style={{ width: '24px', height: '24px', objectFit: 'cover' }}
            />
            <span className="small fw-bold">Sophia's Signature Bakes</span>
          </div>
          <h1 className="display-4 fw-bold text-golden-dark mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Freshly Baked Bliss For Every Celebration.
          </h1>
          <p className="fst-italic text-golden mb-3" style={{ fontSize: '1.05rem', letterSpacing: '0.3px' }}>
            ..... refined sweetness, perfected
          </p>
          <p className="lead text-golden-text-muted mb-4" style={{ fontSize: '1.1rem' }}>
            Handcrafted custom cakes, golden fluffy pastries, signature milky doughnuts, and irresistible small chops boxes baked fresh for your special moments.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Button as={Link} to="/custom-order" className="btn-golden rounded-pill px-4 py-2 fs-5">
              ✨ Custom Cake Order Form
            </Button>
            <Button as={Link} to="/menu" className="btn-outline-golden rounded-pill px-4 py-2 fs-5">
              Explore Menu & Prices
            </Button>
          </div>

          {/* Quick Notice Banner */}
          <div className="notice-box p-3 mt-4">
            <div className="d-flex align-items-start gap-2">
              <span className="fs-5">🎁</span>
              <div className="small">
                <strong className="text-golden-dark">Special Bulk Discount:</strong> Ordering 10 pieces or more on pastries & treats? A special discount will be given!
              </div>
            </div>
          </div>
        </Col>

        <Col lg={6}>
          <div className="position-relative">
            <img 
              src="/12inchesboard.jpeg" 
              alt="Artisanal Golden Cake" 
              className="img-fluid rounded-4 shadow-lg w-100"
              style={{ maxHeight: '480px', objectFit: 'cover' }}
            />
            <div 
              className="position-absolute bottom-0 start-0 m-3 p-3 rounded-3 bg-white shadow-sm border border-golden d-none d-sm-block"
              style={{ maxWidth: '240px' }}
            >
              <p className="mb-0 fw-bold text-golden-dark small">⭐ 100% Fresh Daily</p>
              <p className="mb-0 text-muted small" style={{ fontSize: '0.8rem' }}>Baked with premium butter, rich cocoa & genuine passion</p>
            </div>
          </div>
        </Col>
      </Row>

      {/* Featured Categories */}
      <div className="text-center mb-4 mt-5">
        <h2 className="fw-bold text-golden-dark" style={{ fontFamily: "'Playfair Display', serif" }}>
          What We Bake Best
        </h2>
        <p className="text-muted">Explore our signature cakes, assorted small chops packs, and mouthwatering snacks.</p>
      </div>

      <Row className="g-4 mb-5">
        {FEATURED_CATEGORIES.map((item, idx) => (
          <Col md={4} key={idx}>
            <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden card-hover bg-white">
              <div className="position-relative">
                <Card.Img 
                  variant="top" 
                  src={item.image} 
                  alt={item.title}
                  style={{ height: '220px', objectFit: 'cover' }} 
                />
                <span className="position-absolute top-0 end-0 m-3 badge bg-golden-primary rounded-pill px-3 py-2 shadow-sm">
                  {item.priceBadge}
                </span>
              </div>
              <Card.Body className="p-4 d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold text-golden-dark fs-5">{item.title}</Card.Title>
                  <Card.Text className="text-muted small">{item.desc}</Card.Text>
                </div>
                <div className="mt-3 pt-2 border-top border-golden">
                  <Button 
                    as={Link} 
                    to={item.link} 
                    variant="link" 
                    className="p-0 text-golden text-decoration-none fw-bold"
                  >
                    View Menu & Pricing →
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Custom Cake Feature Banner */}
      <div className="p-4 p-md-5 rounded-4 mb-5 shadow-sm border border-golden bg-white position-relative overflow-hidden">
        <Row className="align-items-center gy-4">
          <Col lg={7}>
            <Badge className="badge-gold-accent px-3 py-2 rounded-pill mb-2">
              🎨 Interactive Cake Studio
            </Badge>
            <h2 className="fw-bold text-golden-dark display-6 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Have a Unique Cake Idea or Theme?
            </h2>
            <p className="text-golden-text-muted mb-4 fs-6">
              Use our brand new <strong>Custom Order Form</strong> to choose your tiers (4" Bento to 12" Grand or 3-Tier Weddings), customize delicious sponge flavors & fillings, luxury toppers, and receive an instant quote ready for WhatsApp!
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Button as={Link} to="/custom-order" className="btn-golden rounded-pill px-4 py-2">
                Open Custom Order Form →
              </Button>
              <Button as={Link} to="/flavor-details" className="btn-outline-golden rounded-pill px-4 py-2">
                Explore Flavors
              </Button>
            </div>
          </Col>
          <Col lg={5}>
            <div className="position-relative">
              <img 
                src="/10inchesboard.jpeg" 
                alt="Luxury Custom Celebration Cake"
                className="img-fluid rounded-4 shadow w-100"
                style={{ maxHeight: '280px', objectFit: 'cover' }}
              />
              <span className="position-absolute bottom-0 end-0 m-3 badge bg-golden-dark text-white rounded-pill px-3 py-2 shadow-sm">
                🎂 Tailored For Your Event
              </span>
            </div>
          </Col>
        </Row>
      </div>

      {/* Signature Flavors Section */}
      <div className="bg-golden-subtle p-4 p-md-5 rounded-4 mb-5 border border-golden">
        <div className="text-center mb-4">
          <Badge className="badge-gold-accent px-3 py-2 rounded-pill mb-2">Our Signature Recipes</Badge>
          <h2 className="fw-bold text-golden-dark" style={{ fontFamily: "'Playfair Display', serif" }}>
            Handcrafted Signature Flavors
          </h2>
          <p className="text-muted">Baked to moist perfection with rich, natural ingredients.</p>
        </div>

        <Row className="g-4">
          {SIGNATURE_FLAVORS.map((flavor, idx) => (
            <Col sm={6} lg={3} key={idx}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white text-center">
                <Card.Img 
                  variant="top" 
                  src={flavor.image} 
                  alt={flavor.name} 
                  style={{ height: '160px', objectFit: 'cover' }} 
                />
                <Card.Body className="p-3 d-flex flex-column justify-content-between">
                  <div>
                    <Badge className="badge-gold-accent mb-2">{flavor.tag}</Badge>
                    <h5 className="fw-bold text-golden-dark mb-1">{flavor.name}</h5>
                    <p className="text-muted small mb-0">{flavor.desc}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div className="text-center mt-4 pt-2">
          <Button as={Link} to="/flavor-details" className="btn-golden rounded-pill px-4">
            See All Flavor Profiles & Sizing Chart
          </Button>
        </div>
      </div>

      {/* Call To Action Banner */}
      <div className="discount-ribbon p-4 p-md-5 text-center shadow-sm">
        <h3 className="fw-bold mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Ready to Delight Your Guests?
        </h3>
        <p className="mb-4 lead fs-6 opacity-90">
          Order custom cakes, small chops trays, puff puff boxes, meat pies & desserts directly on WhatsApp with fast confirmation.
        </p>
        <Button as={Link} to="/order" variant="light" size="lg" className="rounded-pill px-5 fw-bold text-golden-dark shadow">
          Order Now on WhatsApp 💬
        </Button>
      </div>
    </Container>
  );
}