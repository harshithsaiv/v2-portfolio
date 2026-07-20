const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

let initialized = false;

function loadGtag() {
  if (initialized || !GA_ID || typeof window === 'undefined') return;
  initialized = true;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // We send page_view manually on route change since this is a client-routed SPA.
  window.gtag('config', GA_ID, { send_page_view: false });
}

export function trackPageView(path) {
  if (!GA_ID) return;
  loadGtag();
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(name, params = {}) {
  if (!GA_ID || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
