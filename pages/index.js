import Head from "next/head";
import React from "react";
import { Container } from "react-bootstrap";
import ExploreProducts from "../components/ExploreProducts";
import MyHero from "../components/MyHero";
import MyNavbar from "../components/MyNavbar";

export default function Home() {
  return (
    <Container
      fluid
      className="min-vh-100 pb-4"
      style={{ background: "white !important" }}
    >
      <Head>
        <title> Proxley </title>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
        />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta
          name="title"
          content="Get all your packaging and printing needs fulfilled at one place, no running behind multiple parties"
        />
        <meta
          name="description"
          content="Get all your packaging and printing needs fulfilled at one place, no running behind multiple parties"
        />
        <meta name="image" content="" />
        <meta
          itemprop="name"
          content="Get all your packaging and printing needs fulfilled at one place, no running behind multiple parties"
        />
        <meta
          itemprop="description"
          content="Get all your packaging and printing needs fulfilled at one place, no running behind multiple parties."
        />
        <meta itemprop="image" content="" />
        <meta
          name="og:title"
          content="Get all your packaging and printing needs fulfilled at one place, no running behind multiple parties"
        />
        <meta
          name="og:description"
          content="Get all your packaging and printing needs fulfilled at one place, no running behind multiple parties"
        />
        <meta name="og:image" content="" />
        <meta name="og:url" content="" />
        <meta name="og:site_name" content="" />
        <meta name="og:type" content="website" />
        <meta name="theme-color" content="#050303" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/favicon.svg"
        />
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/favicon.svg"
          id="faviconTag"
        />
        <link
          rel="icon"
          type="image/svg"
          sizes="16x16"
          href="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/favicon.svg"
          id="faviconTag"
        />
        <link rel="manifest" href="favicon/site.webmanifest" />

        <link
          rel="stylesheet"
          href="https://proxley.s3.ap-south-1.amazonaws.com/index.css"
        />
        <link
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.8.4/swiper-bundle.css"
          integrity="sha512-ZpcaZ031fgI0ryEPFCdjUms80bt0oV453+GxoI0+Xa4rYj7FQRXy1Lsi7BSkvlpiJcq3iYdxZX5/oDHhj/uomw=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
        <link rel="stylesheet" href="https://use.typekit.net/gpt2ihc.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div>
        <div className="DestopHeader static-header">
          <header id="Header">
            <nav className="DesktopNavbar">
              <div className="DesktopNav-container">
                <a href="/">
                  <img src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/proxleyLogo.png" />
                </a>
                <div className="rightHeader">
                  <div className="aboutUsAndCareers">
                    <a href="#footer-area">Contact Us</a>
                    {/* <a href="">Careers</a> */}
                  </div>
                  <div id="online-btn" className="onlineButton">
                    <p>
                      <a href="/dashboard">Get Started</a>
                    </p>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>
        <section className="main-homepage-design">
          <div className="MobileHeader">
            <nav className="header-menu">
              <div className="container">
                <div className="row">
                  <div className="main-menu-section">
                    <div className="home-logo">
                      <img src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/proxleyLogo.png" />
                    </div>
                    <div className="top-nav-mob">
                      <a href="#" onclick="topMenu()">
                        <i className="fa fa-bars" id="new-demo" />
                        <img
                          className="close-icon"
                          id="close-icon"
                          src="https://cdn.dotpe.in/cfe/image/close-menu-icon-23-nov-2021.png"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="links" id="test">
                    <a href="#footer-area"> Contact Us </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="business-start-part">
            <div className="heading-area-part">
              <h1>Custom Designed Printing and Packaging Solutions</h1>
              <p>
                We design, print and manufacture packages all under one roof
              </p>
              <a href="/dashboard">
                <button type="button" id="landing-form-show-update">
                  Get Started
                </button>
              </a>
            </div>
            <div className="top-design-head-image">
              <img src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/PROXLEY.png" />
            </div>
          </div>
          <div className="accordionForDesktop">
            <div className="DesktopAccordion-section">
              <div className="DesktopAccordion-section-texts">
                <h2 className="DesktopAccordion-section-text">
                  Let us take care of all your <br />{" "}
                  <span>Printing &amp; Packaging</span> <br />
                  requirements
                </h2>
              </div>
              <div className="DesktopAccordions-items">
                <a href="#">
                  <div className="DesktopAccordion-item">
                    <div className="DesktopAccordion-image">
                      <img src="https://cdn.dotpe.in/cfe/image/homepage-design-image-4-23-nov-2021.png" />
                      <div className="DesktopAccordion-image-text">
                        <p className>
                          Say Goodbye <br /> to the hassle of{" "}
                          <span>
                            {" "}
                            <br /> Coordinating
                          </span>{" "}
                          <br /> with multiple parties
                        </p>
                        <div className="DesktopAccordion-image-subtext">
                          <h4>Everything under one roof</h4>
                        </div>
                      </div>
                    </div>
                    <div className="DesktopAccordion-text DesktopAccordion-open-text">
                      <p>Get Started</p>
                      <img
                        className="DesktopArrow-icon"
                        src="https://cdn.dotpe.in/cfe/image/testing-image-3-18-nov.png"
                      />
                    </div>
                  </div>
                </a>
              </div>
              <div className="DesktopAccordion-item">
                <a href="#grow-business-form">
                  <div className="item">
                    <p>
                      Experience a modern approach to printing and packaging
                      with our user-friendly online platform
                    </p>
                    <img
                      className="DesktopBackArrow"
                      src="https://cdn.dotpe.in/cfe/image/testing-image-4-18-nov.png"
                    />
                  </div>
                </a>
                <a href="#grow-business-form">
                  <div className="item">
                    <p>
                      Say goodbye to sourcing paper for your packaging needs{" "}
                      <br /> we've got you covered
                    </p>
                    <img
                      className="DesktopBackArrow"
                      src="https://cdn.dotpe.in/cfe/image/testing-image-4-18-nov.png"
                    />
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="accordianForMobile">
            <div className="accordion-section">
              <div className="accordion-section-texts"></div>
              <div className="accordions-items">
                <div className="accordion-item ">
                  <a href="#">
                    <div className="accordion-image open-accordion">
                      <img
                        src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/getStartedImage.png"
                        alt="img"
                      />
                    </div>
                  </a>
                </div>
                <div className="accordion-item ">
                  <div className="accordion-text">
                    <a href="#grow-business-form">
                      <p>
                        Experience a modern approach to printing and packaging
                        with our user-friendly online platform
                      </p>
                      <img
                        className="arrow-icon"
                        src="https://cdn.dotpe.in/cfe/image/testing-image-4-18-nov.png"
                      />
                    </a>
                  </div>
                </div>
                <div className="accordion-item">
                  <div className="accordion-text">
                    <a href="#grow-business-form">
                      <p>
                        Say goodbye to sourcing paper for your packaging needs{" "}
                        <br />
                        we've got you covered
                      </p>
                      <img
                        className="arrow-icon"
                        src="https://cdn.dotpe.in/cfe/image/testing-image-4-18-nov.png"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="e-comm-website-part">
            <div className="container">
              <div className="business-soution-section-texts">
                <h2 className="business-soution-section-text">
                  Custom printing and packaging <br />{" "}
                  <span>solutions for all industries</span>
                </h2>
              </div>
              <div className="slider-ecom-website-section">
                <div className="swiper-container swiper3">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide" style={{ height: "300px" }}>
                      <img
                        loading="lazy"
                        src="https://cdn.dotpe.in/cfe/image/homepage-design-image-15-23-nov-2021.jpg"
                        alt="carousel-img"
                      />
                    </div>
                    <div className="swiper-slide" style={{ height: "300px" }}>
                      <img
                        loading="lazy"
                        src="https://cdn.dotpe.in/cfe/image/homepage-design-image-16-23-nov-2021.jpg"
                        alt="carousel-img"
                      />
                    </div>
                    <div className="swiper-slide" style={{ height: "300px" }}>
                      <img
                        loading="lazy"
                        src="https://cdn.dotpe.in/cfe/image/homepage-design-image-17-23-nov-2021.jpg"
                        alt="carousel-img"
                      />
                    </div>
                    <div className="swiper-slide" style={{ height: "300px" }}>
                      <img
                        loading="lazy"
                        src="https://cdn.dotpe.in/cfe/image/homepage-design-image-18-23-nov-2021.jpg"
                        alt="carousel-img"
                      />
                    </div>
                    <div className="swiper-slide">
                      <img
                        loading="lazy"
                        src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/Pharmaceutical Industry.png"
                        alt="carousel-img"
                      />
                    </div>
                    <div className="swiper-slide" style={{ height: "300px" }}>
                      <img
                        loading="lazy"
                        src="https://cdn.dotpe.in/cfe/image/homepage-design-image-21-23-nov-2021.jpg"
                        alt="carousel-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="one-stop-solution-part">
            <div className="container">
              <div className="solution-main-head">
                <h2>
                  <span className="bold-text-part"> Explore our suite of</span>{" "}
                  <br /> printing and packaging solutions
                </h2>
              </div>
              <div className="row list-store-needs">
                <div className="new-list-stop-section" id="new-tab-1">
                  <p>Offset Printing</p>
                </div>
                <div className="new-list-stop-section" id="new-tab-2">
                  <p>Digital Printing</p>
                </div>
                <div className="new-list-stop-section" id="new-tab-3">
                  <p>Packaging and Boxes</p>
                </div>
                <div className="new-list-stop-section" id="new-tab-4">
                  <p>Post printing solution</p>
                </div>
                <div className="new-list-stop-section" id="new-tab-5">
                  <p>Lamination</p>
                </div>
                <div className="new-list-stop-section" id="new-tab-5">
                  <p>Paper Sourcing</p>
                </div>
              </div>
            </div>
          </div>
          <div className="create-amazing-website-part">
            <div className="container">
              <div className="row content-1">
                <div className="amazing-detail" id="tab-1">
                  <div className="amazing-website-text-part">
                    <h3>
                      Customizable <br /> Packaging and{" "}
                      <span className="web-text">Boxes</span>
                    </h3>
                    <p>
                      At our all in one solution center we provide end to end
                      solution in making finest quality packages for your
                      company. We are the leading manufacturer of custom printed
                      corrugated boxes , duplex boxes , carry bags. You name
                      your packaging needs and we will be the quickest, most
                      cost efficient and best solution providers.
                    </p>
                    <p>
                      Our team uses the latest technology and materials to
                      ensure that each package is made to the highest standards.
                      From design to production, we are committed to delivering
                      exceptional results and helping our clients stand out in
                      their industry.
                    </p>
                  </div>
                  <div className="amazing-website-image-part">
                    <img src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/packages2-removebg-preview.png" />
                  </div>
                </div>
              </div>
              <div className="row content-2">
                <div className="show-catalog-part" id="tab-2">
                  <div className="show-catalog-text-part">
                    <h3>
                      Premium Offset Printing <br />
                      <span className="catalog">Solution</span>
                    </h3>
                    <p>
                      Offset printing is a printing technique that produces
                      high-quality prints with sharp, vibrant colors and fine
                      details. At our company, we use state-of-the-art offset
                      printing technology to create stunning prints that will
                      make your brand stand out. Our team of experienced
                      professionals ensures that each print is perfect, from the
                      design phase to the finished product.
                    </p>
                    <p>
                      {" "}
                      With our premium offset printing services, you can be
                      confident that your prints will be of the highest quality
                      and will help your brand make a lasting impression on your
                      audience. We believe that printing is an art and only
                      select few companies knows the intricacies involved to get
                      highest quality offset printing which will let you convey
                      the message to your target audience{" "}
                    </p>
                    <img src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/offset_print_1-removebg-preview.png" />
                  </div>
                </div>
                <div className="order-payment" id="tab-4">
                  <div className="order-payment-text-part">
                    <h3>
                      Complete <br />
                      <span className="catalog">Digital Printing Solution</span>
                    </h3>
                    <p>
                      Have you always wanted that exquisite Photo Album for
                      yourself? Do you want to leave longlasting impact on your
                      customers by highest quality custom designed brochures and
                      catalogues?{" "}
                    </p>
                    <p>
                      We will help you in getting your story to your customers
                      by providing finest quality digital print.{" "}
                    </p>
                    <img src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/digital_prints2-removebg-preview.png" />
                  </div>
                </div>
              </div>
              <div className="row content-1">
                <div className="marketing-simple" id="tab-3">
                  <div className="marketing-simple-text">
                    <h3>
                      <span className="marketing">Complete binding and </span>
                      Post binding solution
                    </h3>
                    <p>
                      We know the inconvenience you have to face to get printing
                      done at one firm and then carry the prints to get binded
                      at other firm. We at proxley provide one stop solution for
                      all your post printing requirements.
                    </p>
                    <p>
                      So Do you have a published book and want the finest
                      quality binding at best price We provide quickest and most
                      cost effective solutions of : Binding, Folding, Sewing,
                      Lamination, Spot UV
                    </p>
                  </div>
                  <div className="marketing-simple-image-part">
                    <img src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/pb4-removebg-preview.png" />
                  </div>
                </div>
              </div>
              <div className="row content-2">
                <div className="store-management" id="tab-5">
                  <div className="show-catalog-text-part">
                    <h3>
                      Genuine Customer
                      <br /> <span className="seamless">Centric Service</span>
                    </h3>
                    <p>
                      At Proxley, we are committed to provide “0 hassle
                      customer-centric experience. Our team is dedicated to
                      offering guidance and support throughout the lifetime of
                      your project, whether it's your first or hundredth
                      print/packaging job
                    </p>
                    <p>
                      From custom designs to packaging manufacturing, we work
                      closely with you to ensure your needs are met and your
                      expectations are exceeded.
                    </p>
                    <img src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/customerCentric-removebg-preview.png" />
                  </div>
                </div>
                <div className="india-delivery" id="tab-6">
                  <div className="order-payment-text-part">
                    <h3>
                      <span className="across-pin-text">
                        Fast Turnaround ,<br /> even for Small Quantities
                      </span>
                    </h3>
                    <p>
                      At proxley, we understand that urgent printing/packaging
                      needs can arise at any time, and small quantities can be
                      just as important as larger ones. That's why we offer a
                      fast turnaround for all your printing/packaging needs, no
                      matter how small the quantity or how tight the deadline.
                    </p>
                    <p>
                      {" "}
                      With our state-of-the-art technology and expert team, we
                      ensure that you get high-quality printing/packaging
                      solutions delivered to you on time, every time.
                    </p>
                    <img src="https://proxley.s3.ap-south-1.amazonaws.com/assets/images/packages4-removebg-preview.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-section" id="footer-area">
            <div className="expert-call-part" id="footer-form-link">
              <div className="call-text-head">
                <h2>
                  Get a call <br /> from our experts
                </h2>
              </div>
              <form
                action="#"
                method="POST"
                id="grow-business-form"
                className="md-pb10"
              >
                <div className="form-detail-part">
                  <div className="div-parent test-new">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name"
                      required
                    />
                    <p id="name-err" className="error" />
                  </div>
                  <div className="div-parent test-new">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Enter your email"
                      required
                    />
                    <p id="name-err" className="error" />
                  </div>
                  <div className="div-parent test-new">
                    <input
                      type="number"
                      pattern="[0-9\s]*"
                      onkeydown="if(['Space'].includes(arguments[0].code)){return false;}"
                      inputMode="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Enter Your Phone Number"
                      required
                    />
                    <p id="phone-err" className="error" />
                  </div>
                </div>
                <div className="msg-heading-part">
                  <p>Select Your Business</p>
                </div>
                <div className="div-parent test">
                  <ul className="donate-now" id="form-issue-list">
                    <li>
                      <input
                        type="radio"
                        id="faa"
                        name="restaurant"
                        defaultValue="Fashion & Accessories"
                        className="bsuinesstype"
                        required
                      />
                      <label htmlFor="faa">Fashion &amp; Accessories</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="electronics"
                        name="restaurant"
                        defaultValue="Electronics"
                        className="bsuinesstype"
                        required
                      />
                      <label htmlFor="electronics">Electronics</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="rfb"
                        name="restaurant"
                        defaultValue="Restaurant | F&B"
                        className="bsuinesstype"
                        required
                      />
                      <label htmlFor="rfb">Restaurant | F&amp;B</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="gas"
                        name="restaurant"
                        defaultValue="Grocery & Supermarkets"
                        className="bsuinesstype"
                        required
                      />
                      <label htmlFor="gas">Grocery &amp; Supermarkets</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="aac"
                        name="restaurant"
                        defaultValue="Arts & Crafts"
                        className="bsuinesstype"
                        required
                      />
                      <label htmlFor="aac">Arts &amp; Crafts</label>
                    </li>
                    <li>
                      <input
                        type="radio"
                        id="other"
                        name="restaurant"
                        defaultValue="Other"
                        className="bsuinesstype"
                        required
                      />
                      <label htmlFor="other">Others</label>
                    </li>
                  </ul>
                  <p id="restaurant-error" className="error-rest" />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  id="email-submit-demo"
                >
                  <img src="https://cdn.dotpe.in/cfe/image/homepage-design-image-13-23-nov-2021.png" />{" "}
                  Get a callback
                </button>
              </form>
              {/* <div id="form-success"></div> */}
            </div>
            <div className="testing-display-update" id="form-success">
              <div className="forw-modal-opening">
                <div className="form-submit-mode">
                  <div
                    className="backdrop"
                    id="backdrop"
                    onclick="formCloseDemo()"
                  />
                  <img
                    onclick="formCloseDemo()"
                    src="https://cdn.dotpe.in/cfe/image/Icon-close.svg"
                    alt="form-close"
                  />
                  <p>
                    Thanks for reaching out. Our representatives will connect
                    with you shortly.
                  </p>
                </div>
              </div>
            </div>
            <div className="footer-last-bottom-part">
              <div className="footer-list-part">
                <ul>
                  <li>
                    <a href="/terms-and-conditions">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a href="/privacy-policy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/contact-us">Contact us</a>
                  </li>
                </ul>
              </div>
              <p>
                © <span id="copyright-year" /> Proxley, All rights reserved
              </p>
              <div className="social-icons-list">
                <span className="social-icons">
                  <a href="#">
                    <img
                      className="cursor_pointer"
                      src="https://cdn.dotpe.in/cfe/image/social-icon-3-24-nov-2021.png"
                    />
                  </a>
                  <a href="#">
                    <img
                      className="cursor_pointer"
                      src="https://cdn.dotpe.in/cfe/image/social-icon-2-24-nov-2021.png"
                    />
                  </a>
                  <a href="#">
                    <img
                      className="cursor_pointer"
                      src="https://cdn.dotpe.in/cfe/image/social-icon-1-24-nov-2021.png"
                    />
                  </a>
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
