// Internationalization (i18n) System for 4sight AI Website
class I18n {
    constructor() {
        this.currentLang = 'en';
        this.translations = {};
        this.availableLanguages = ['en', 'es', 'fr', 'de', 'zh'];
        this.languageNames = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'zh': '中文'
        };
        this.languageSymbols = {
            'en': '🌍',
            'es': '🇪🇸',
            'fr': '🇫🇷',
            'de': '🇩🇪',
            'zh': '🇨🇳'
        };
        this.init();
    }

    async init() {
        // Load current language from localStorage or default to 'en'
        const savedLang = localStorage.getItem('4sight-ai-lang');
        if (savedLang && this.availableLanguages.includes(savedLang)) {
            this.currentLang = savedLang;
        }

        // Load all translations
        await this.loadTranslations();

        // Create language selector
        this.createLanguageSelector();

        // Apply current language
        this.applyTranslations();

        // Set up event listeners
        this.setupEventListeners();
    }

    async loadTranslations() {
        const promises = this.availableLanguages.map(async (lang) => {
            try {
                const response = await fetch(`locales/${lang}.json`);
                if (response.ok) {
                    this.translations[lang] = await response.json();
                } else {
                    console.warn(`Failed to load translations for ${lang}`);
                }
            } catch (error) {
                console.error(`Error loading translations for ${lang}:`, error);
            }
        });

        await Promise.all(promises);
    }

    createLanguageSelector() {
        // Check if language selector already exists in HTML
        const existingSelector = document.querySelector('.language-selector');
        if (existingSelector) {
            existingSelector.remove(); // Remove the existing one to replace with the new one
        }

        // Create language selector container
        const selector = document.createElement('div');
        selector.className = 'language-selector';
        selector.innerHTML = `
            <button class="lang-toggle" id="langToggle">
                <svg width="20" height="20" fill="none" stroke="#00e5ff" stroke-width="2" viewBox="0 0 24 24" class="globe-icon">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span class="sr-only">Language selector</span>
                <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24" class="dropdown-arrow">
                    <path d="M7 10l5 5 5-5z"/>
                </svg>
            </button>
            <div class="lang-dropdown" id="langDropdown">
                ${this.availableLanguages.map(lang => `
                    <button class="lang-option ${lang === this.currentLang ? 'active' : ''}" data-lang="${lang}">
                        <span class="lang-option-symbol">${this.languageSymbols[lang]}</span>
                        ${this.languageNames[lang]}
                    </button>
                `).join('')}
            </div>
        `;

        // Insert into navigation
        const nav = document.querySelector('nav');
        if (nav) {
            nav.appendChild(selector);
        }

        // Add CSS styles
        this.addLanguageSelectorStyles();
    }

    addLanguageSelectorStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .language-selector {
                position: absolute;
                top: 50%;
                right: 2rem;
                transform: translateY(-50%);
                z-index: 1000;
            }

            .lang-toggle {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                color: var(--white);
                padding: 0.5rem 1rem;
                border-radius: 25px;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.9rem;
                backdrop-filter: blur(10px);
            }

            .lang-toggle:hover {
                background: rgba(255, 255, 255, 0.2);
                border-color: rgba(0, 229, 255, 0.5);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(0, 229, 255, 0.3);
            }

            .lang-dropdown {
                position: absolute;
                top: 100%;
                right: 0;
                background: var(--primary-navy);
                border: 1px solid rgba(0, 229, 255, 0.3);
                border-radius: 10px;
                padding: 0.5rem;
                margin-top: 0.5rem;
                min-width: 120px;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s ease;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }

            .language-selector.active .lang-dropdown {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }

            .lang-option {
                display: block;
                width: 100%;
                padding: 0.5rem 1rem;
                background: none;
                border: none;
                color: var(--white);
                text-align: left;
                cursor: pointer;
                border-radius: 5px;
                transition: all 0.2s ease;
                font-size: 0.9rem;
            }

            .lang-option:hover {
                background: rgba(0, 229, 255, 0.1);
                color: var(--secondary-cyan);
            }

            .lang-option.active {
                background: var(--secondary-cyan);
                color: var(--primary-navy);
                font-weight: 600;
            }

            @media (max-width: 768px) {
                .language-selector {
                    position: static;
                    transform: none;
                    margin: 1rem;
                    text-align: center;
                }

                .lang-toggle {
                    margin: 0 auto;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        // Language toggle button
        const toggle = document.getElementById('langToggle');
        const selector = document.querySelector('.language-selector');

        if (toggle && selector) {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                selector.classList.toggle('active');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!selector.contains(e.target)) {
                    selector.classList.remove('active');
                }
            });
        }

        // Language options
        document.querySelectorAll('.lang-option').forEach(option => {
            option.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.changeLanguage(lang);
                selector.classList.remove('active');
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && selector.classList.contains('active')) {
                selector.classList.remove('active');
            }
        });
    }

    changeLanguage(lang) {
        if (!this.availableLanguages.includes(lang) || lang === this.currentLang) {
            return;
        }

        this.currentLang = lang;
        localStorage.setItem('4sight-ai-lang', lang);

        // Update active state in dropdown
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });

        // Update toggle button text
        const toggleText = document.querySelector('.current-lang');
        if (toggleText) {
            toggleText.textContent = this.languageNames[lang];
        }

        // Update toggle button symbol
        const toggleSymbol = document.querySelector('.lang-symbol');
        if (toggleSymbol) {
            toggleSymbol.textContent = this.languageSymbols[lang];
        }

        // Apply translations
        this.applyTranslations();

        // Dispatch custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
    }

    applyTranslations() {
        const translation = this.translations[this.currentLang];
        if (!translation) return;

        // Use data-i18n attributes to find and translate elements
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const text = this.getNestedTranslation(translation, key);
            if (text) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    getNestedTranslation(obj, path) {
        return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    translateElement(key, text) {
        const elements = document.querySelectorAll(`[data-i18n="${key}"]`);
        elements.forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        });
    }

    // Utility method to get current translation
    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];

        for (const k of keys) {
            value = value?.[k];
        }

        return value || key;
    }

    // Get available languages
    getAvailableLanguages() {
        return this.availableLanguages;
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLang;
    }
}

// Initialize i18n when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18n();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18n;
}
