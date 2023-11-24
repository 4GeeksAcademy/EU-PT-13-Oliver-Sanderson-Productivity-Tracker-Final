import React, { useEffect, useRef } from 'react';

const Footer = () => {
  const footerRef = useRef();

  useEffect(() => {
    const adjustFooter = () => {
      const footer = footerRef.current;
      const bodyHeight = document.body.offsetHeight;
      const newFooterPosition = window.innerHeight - bodyHeight + footer?.offsetHeight;

      if (footer && bodyHeight < window.innerHeight) {
        footer.style.marginTop = newFooterPosition + 'px';
      }
    };

    adjustFooter();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(adjustFooter, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-dark bd-footer py-4 py-md-5 mt-5 text-body-light">
      <div className="container py-4 py-md-5 px-4 px-md-3 text-body-">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <a className="d-inline-flex align-items-center mb-2 text-body-emphasis text-decoration-none" href="/" aria-label="Bootstrap">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" className="d-block me-2" viewBox="0 0 118 94" role="img">
                {/* ... SVG Path ... */}
              </svg>
              <span className="fs-5 "><strong>KorYoku</strong></span>
            </a>
            <ul className="list-unstyled small text-white">
              <li className="mb-2">Designed and built by KorYoku's team and powered by <a href="https://4geeksacademy.com/us/index">4geeksAcademy</a>.</li>
              <li className="mb-2">Code licensed <a href="https://github.com/twbs/bootstrap/blob/main/LICENSE" target="_blank" rel="license noopener">MIT</a>, docs <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noopener">CC BY 3.0</a>.</li>
              <li className="mb-2">Currently v5.3.2.</li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 offset-lg-1 mb-3 text-white">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/home" className="text-secondary">Home</a></li>
              <li className="mb-2"><a href="/dashboard" className="text-secondary">Dashboard</a></li>
             
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3 text-white">
            <h5>Guides</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/docs/5.3/getting-started/" className="text-secondary">Getting started</a></li>
              {/* ... more list items ... */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
