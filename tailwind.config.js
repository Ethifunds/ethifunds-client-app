/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
	theme: {
    	extend: {
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
    			primary: {
    				'100': '#FBEDDC',
    				'200': '#F6DBB8',
    				'300': '#F2C995',
    				'400': '#EDB772',
    				'500': '#E9A54E',
    				'600': '#D1811B',
    				'700': '#B26E17',
    				'800': '#935B13',
    				'900': '#74480F',
    				'1000': '#55340B',
    				DEFAULT: '#E4932B'
    			},
    			secondary: {
    				'100': '#D7F8FE',
    				'200': '#B0F0FD',
    				'300': '#88E9FC',
    				'400': '#60E1FA',
    				'500': '#39DAF9',
    				'600': '#07BCE0',
    				'700': '#06A0BF',
    				'800': '#05859E',
    				'900': '#04697C',
    				'1000': '#034D5B',
    				DEFAULT: '#11D2F8'
    			},
    			neutral: {
    				'100': '#E4E4E4',
    				'200': '#CFCECE',
    				'300': '#BAB8B8',
    				'400': '#A5A1A1',
    				'500': '#908B8B',
    				'600': '#7A7474',
    				'700': '#655F5F',
    				'800': '#4E4949',
    				'900': '#383434',
    				'1000': '#221F1F',
    				base_white: '#FAFAFA',
    				base_black: '#0B0A0A'
    			},
    			success: {
    				'100': '#A4F4E7',
    				'200': '#15B097',
    				'300': '#0B7B69',
    				DEFAULT: '#A4F4E7'
    			},
    			warning: {
    				'100': '#F4C790',
    				'200': '#EDA145',
    				'300': '#CC7914',
    				DEFAULT: '#F4C790'
    			},
    			error: {
    				'100': '#E4626F',
    				'200': '#C03744',
    				'300': '#8C1823',
    				DEFAULT: '#E4626F'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		fontFamily: {
    			nunito: [
    				'Nunito',
    				'serif'
    			]
    		},
    		fontSize: {
    			'desktop-display-1': '144px',
    			'desktop-display-2': '96px',
    			'desktop-display-3': '64px',
    			'desktop-heading-1': '56px',
    			'desktop-heading-2': '48px',
    			'desktop-heading-3': '40px',
    			'desktop-heading-4': '32px',
    			'desktop-body-hero': '28px',
    			'desktop-body-feature': '24px',
    			'desktop-body-highlight': '18px',
    			'desktop-body-content': '16px',
    			'desktop-body-caption': '14px',
    			'mobile-display-1': '44px',
    			'mobile-display-2': '40px',
    			'mobile-display-3': '32px',
    			'mobile-heading-1': '28px',
    			'mobile-heading-2': '24px',
    			'mobile-heading-3': '20px',
    			'mobile-heading-4': '18px',
    			'mobile-body-hero': '24px',
    			'mobile-body-feature': '18px',
    			'mobile-body-highlight': '16px',
    			'mobile-body-content': '14px',
    			'mobile-body-caption': '12px',
    			'mobile-body-footnote': '10px'
    		},
    		lineHeight: {
    			'desktop-display-1': '172.8px',
    			'desktop-display-2': '115.2px',
    			'desktop-display-3': '76.8px',
    			'desktop-heading-1': '67.2px',
    			'desktop-heading-2': '57.6px',
    			'desktop-heading-3': '48px',
    			'desktop-heading-4': '38.4px',
    			'desktop-body-hero': '33.6px',
    			'desktop-body-feature': '28.8px',
    			'desktop-body-highlight': '21.6px',
    			'desktop-body-content': '19.2px',
    			'desktop-body-caption': '16.8px',
    			'mobile-display-1': '52.8px',
    			'mobile-display-2': '48px',
    			'mobile-display-3': '38.4px',
    			'mobile-heading-1': '33.6px',
    			'mobile-heading-2': '28.8px',
    			'mobile-heading-3': '24px',
    			'mobile-heading-4': '21.6px',
    			'mobile-body-hero': '21.6px',
    			'mobile-body-feature': '21.6px',
    			'mobile-body-highlight': '19.2px',
    			'mobile-body-content': '16.8px',
    			'mobile-body-caption': '14.4px',
    			'mobile-body-footnote': '12px'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};
