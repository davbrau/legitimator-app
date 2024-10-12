(function() {
  function createWidget() {
    const widget = document.getElementById('press-widget');
    if (!widget) return;

    const email = widget.getAttribute('data-email');
    const logos = widget.getAttribute('data-logos').split(',');
    const logoSize = widget.getAttribute('data-logo-size');
    const backgroundColor = widget.getAttribute('data-background-color');
    const customColor = widget.getAttribute('data-custom-color');
    const links = JSON.parse(widget.getAttribute('data-links') || '{}');

    const container = document.createElement('div');
    container.style.borderRadius = '0.5rem';
    container.style.padding = '1.5rem';
    container.style.overflow = 'hidden';
    container.style.position = 'relative';

    if (backgroundColor === 'light') {
      container.style.backgroundColor = '#ffffff';
      container.style.color = '#1a202c';
    } else if (backgroundColor === 'dark') {
      container.style.backgroundColor = '#1a202c';
      container.style.color = '#ffffff';
    } else if (backgroundColor === 'custom') {
      container.style.backgroundColor = customColor;
      container.style.color = isLightColor(customColor) ? '#1a202c' : '#ffffff';
    }

    if (backgroundColor !== 'transparent') {
      container.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    }

    const title = document.createElement('h3');
    title.textContent = 'As Seen In';
    title.style.width = '100%';
    title.style.textAlign = 'center';
    title.style.marginBottom = '1rem';
    title.style.fontSize = '1.125rem';
    title.style.fontWeight = 'bold';
    container.appendChild(title);

    const logoContainer = document.createElement('div');
    logoContainer.style.display = 'flex';
    logoContainer.style.flexDirection = 'row';
    logoContainer.style.gap = '1.5rem';
    logoContainer.style.alignItems = 'center';
    logoContainer.style.justifyContent = 'center';
    logoContainer.style.overflow = 'hidden';

    const logoHeight = logoSize === 'small' ? '32px' : logoSize === 'medium' ? '48px' : '64px';

    function createLogoElement(logo) {
      const logoLink = document.createElement('a');
      logoLink.href = links[logo] || '#';
      logoLink.target = '_blank';
      logoLink.rel = 'noopener noreferrer';
      logoLink.style.display = 'flex';
      logoLink.style.alignItems = 'center';
      logoLink.style.justifyContent = 'center';
      logoLink.style.height = logoHeight;
      logoLink.style.flexShrink = '0';
      logoLink.style.backgroundColor = 'transparent';
      logoLink.style.borderRadius = '0.25rem';
      logoLink.style.overflow = 'hidden';

      const img = document.createElement('img');
      img.src = `https://raw.githubusercontent.com/davbrau/legitimator/b4152e17e7b95fa271353be4e138459e07ed447e/logos/${logo}.svg`;
      img.alt = logo;
      img.style.height = '100%';
      img.style.width = 'auto';
      img.style.objectFit = 'contain';

      logoLink.appendChild(img);
      return logoLink;
    }

    logos.forEach(logo => {
      logoContainer.appendChild(createLogoElement(logo));
    });

    container.appendChild(logoContainer);

    // Add gradient masks
    const leftMask = document.createElement('div');
    leftMask.style.position = 'absolute';
    leftMask.style.top = '0';
    leftMask.style.bottom = '0';
    leftMask.style.left = '0';
    leftMask.style.width = '2rem';
    leftMask.style.background = `linear-gradient(to right, ${backgroundColor === 'dark' ? '#1a202c' : '#ffffff'}, transparent)`;
    leftMask.style.zIndex = '1';
    container.appendChild(leftMask);

    const rightMask = document.createElement('div');
    rightMask.style.position = 'absolute';
    rightMask.style.top = '0';
    rightMask.style.bottom = '0';
    rightMask.style.right = '0';
    rightMask.style.width = '2rem';
    rightMask.style.background = `linear-gradient(to left, ${backgroundColor === 'dark' ? '#1a202c' : '#ffffff'}, transparent)`;
    rightMask.style.zIndex = '1';
    container.appendChild(rightMask);

    widget.appendChild(container);

    // Check if logos overflow and apply animation if necessary
    setTimeout(() => {
      const isOverflowing = logoContainer.scrollWidth > logoContainer.clientWidth;

      if (isOverflowing) {
        const clonedLogos = logos.map(createLogoElement);
        clonedLogos.forEach(logo => logoContainer.appendChild(logo));

        logoContainer.style.animation = 'scroll 30s linear infinite';

        logoContainer.addEventListener('mouseenter', () => {
          logoContainer.style.animationPlayState = 'paused';
        });

        logoContainer.addEventListener('mouseleave', () => {
          logoContainer.style.animationPlayState = 'running';
        });
      }
    }, 0);
  }

  function isLightColor(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 155;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }

  // Add keyframe animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `;
  document.head.appendChild(style);
})();