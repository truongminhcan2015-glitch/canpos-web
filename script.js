// Function to switch phone image on right device
function switchRightPhone(src, btn) {
    const img = document.getElementById('right-phone-img');
    if (img) {
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = src;
            img.style.opacity = '1';
        }, 150);
    }
    if (btn && btn.parentElement) {
        const btns = btn.parentElement.querySelectorAll('.phone-pill-btn');
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}
window.switchRightPhone = switchRightPhone;

function initCANPOS() {
    // 1. Pricing Toggle Logic
    const pricingToggleBtn = document.getElementById('pricing-toggle-btn');
    const billingMonthly = document.getElementById('billing-monthly');
    const billingYearly = document.getElementById('billing-yearly');
    const priceValues = document.querySelectorAll('.price-value');

    function togglePricing(isYearly) {
        if (!pricingToggleBtn || !billingMonthly || !billingYearly) return;
        
        if (isYearly) {
            pricingToggleBtn.classList.add('active');
            billingYearly.classList.add('active');
            billingMonthly.classList.remove('active');
            
            priceValues.forEach(price => {
                const yearlyPrice = price.getAttribute('data-yearly');
                if (!yearlyPrice) return;
                price.style.opacity = '0';
                setTimeout(() => {
                    price.textContent = yearlyPrice;
                    price.style.opacity = '1';
                }, 150);
            });
        } else {
            pricingToggleBtn.classList.remove('active');
            billingYearly.classList.remove('active');
            billingMonthly.classList.add('active');
            
            priceValues.forEach(price => {
                const monthlyPrice = price.getAttribute('data-monthly');
                if (!monthlyPrice) return;
                price.style.opacity = '0';
                setTimeout(() => {
                    price.textContent = monthlyPrice;
                    price.style.opacity = '1';
                }, 150);
            });
        }
    }

    if (pricingToggleBtn && billingMonthly && billingYearly) {
        pricingToggleBtn.addEventListener('click', () => {
            const isYearly = !pricingToggleBtn.classList.contains('active');
            togglePricing(isYearly);
        });

        billingMonthly.addEventListener('click', () => togglePricing(false));
        billingYearly.addEventListener('click', () => togglePricing(true));
    }


    // 0. Hero Mockup View Switcher (POS, Mobile, Report)
    const mockupBtns = document.querySelectorAll('.mockup-tab-btn');
    const mockupViews = document.querySelectorAll('.mockup-view');

    mockupBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetView = btn.getAttribute('data-view');
            mockupBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            mockupViews.forEach(view => {
                view.classList.remove('active');
                if (view.getAttribute('id') === 'view-' + targetView) {
                    view.classList.add('active');
                }
            });
        });
    });

    // 1.1 Features Tab Switcher Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Toggle active state for tab buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle active state for tab contents
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === targetTab) {
                    content.classList.add('active');
                }
            });
        });
    });


    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking link (Mobile)
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }


    // 3. Contact Form Submission with Custom Toast
    const registerForm = document.getElementById('register-form');
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullnameElem = document.getElementById('fullname');
            const phoneElem = document.getElementById('phone');
            const storeTypeElem = document.getElementById('store_type');
            
            if (!fullnameElem || !phoneElem) return;
            
            const fullname = fullnameElem.value.trim();
            
            // Show simulated loading on submit button
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang xử lý...';
                
                // Simulate Firebase Database push or API call
                setTimeout(() => {
                    showSuccessToast(`Cảm ơn bạn, ${fullname}! Yêu cầu tư vấn của bạn đã gửi thành công. Chúng tôi sẽ liên hệ trong 15 phút.`);
                    registerForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, 1200);
            }
        });
    }

    // Custom Toast Helper
    function showSuccessToast(message) {
        const existingToast = document.querySelector('.custom-toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fa-solid fa-circle-check toast-icon"></i>
                <div class="toast-msg">${message}</div>
            </div>
            <button class="toast-close">&times;</button>
        `;
        
        // Style toast dynamically to preserve CSS separation
        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            background: 'linear-gradient(135deg, #27c93f, #1f942f)',
            color: '#ffffff',
            padding: '16px 24px',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(39, 201, 63, 0.3)',
            zIndex: '9999',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.95rem',
            fontWeight: '500',
            maxWidth: '380px',
            display: 'flex',
            align-items: 'center',
            justify-content: 'space-between',
            gap: '16px',
            opacity: '0',
            transform: 'translateY(20px)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        });
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '1';
            toast.style.transform = 'translateY(0)';
        }, 50);
        
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.style.background = 'none';
            closeBtn.style.border = 'none';
            closeBtn.style.color = '#ffffff';
            closeBtn.style.fontSize = '1.3rem';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.opacity = '0.7';
            
            closeBtn.addEventListener('click', () => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
                setTimeout(() => toast.remove(), 400);
            });
        }
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px)';
                setTimeout(() => toast.remove(), 400);
            }
        }, 5000);
    }
    
    // Inject mobile navbar styling dynamically if needed
    const styleElem = document.createElement('style');
    styleElem.textContent = `
        @media (max-width: 768px) {
            .nav-menu.active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background: rgba(10, 5, 20, 0.98);
                border-bottom: 1px solid var(--border-glass);
                padding: 30px 24px;
                gap: 20px;
                animation: slideDown 0.3s ease forwards;
            }
            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        }
    `;
    document.head.appendChild(styleElem);
}

// Robust document ready detection to avoid race conditions
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCANPOS);
} else {
    initCANPOS();
}
