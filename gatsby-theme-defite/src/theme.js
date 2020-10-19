export default {
	useBodyStyles: false,
	space: [0, 4, 8, 16, 32],
	fonts: {
		// body: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
		// heading: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
		body: "'Nunito', sans-serif",
		heading: "'Source Sans Pro', sans-serif",
	},
	fontSizes: [
		0, // Zero just not to start headings from 0
		'3.052em', // h1
		'2.441em', // h2
		'1.953em', // h3
		'1.563em', // h4
		'1.25rem', // h5
		'1em', // h6
		'1.690em', // Lead text size
	],
	fontWeights: [400, 500, 600, 700, 800, 900],
	lineHeights: {
		body: '160%',
		heading: '1.125',
	},
	text: {
		heading: {
			fontFamily: 'heading',
			fontWeight: 3,
			lineHeight: 'heading',
			marginTop: 0,
		},
		body: {
			fontFamily: 'body',
			fontWeight: 0,
			lineHeight: 'body',
		},
		p: {
			marginTop: 0,
			marginBottom: '1em',
			lineHeight: 'body',
		},
	},
	styles: {
		root: {
			variant: 'text.body',
		},
		h1: {
			variant: 'text.heading',
			fontSize: 1,
			lineHeight: 'heading',
		},
		h2: {
			variant: 'text.heading',
			fontSize: 2,
		},
		h3: {
			variant: 'text.heading',
			fontSize: 3,
		},
		h4: {
			variant: 'text.heading',
			fontSize: 4,
		},
		h5: {
			variant: 'text.heading',
			fontSize: 5,
		},
		h6: {
			variant: 'text.heading',
			fontSize: 6,
		},
		p: {
			fontSize: 6,
			lineHeight: '32px',
			marginTop: 0,
			marginBottom: '1.82em',
		},
	},
	header: {
		logo: {
			fontFamily: 'heading',
			fontWeight: 3,
			fontSize: '28px',
			lineHeight: 'heading',
		},
		switcher: {
			fontFamily: 'heading',
			fontWeight: 2,
			fontSize: '18px',
		},
	},
	footer: {
		text: {
			fontSize: '1rem',
		},
	},
	menu: {
		fontFamily: 'heading',
		fontWeight: 1,
		fontSize: '18px',
	},
	intro: {
		variant: 'styles',
		p: {
			variant: 'text.body',
			fontSize: 7,
		},
	},
	blog: {
		variant: 'styles',
		h1: {
			variant: 'styles.h2',
		},
		h4: {
			variant: 'styles.h3',
			fontWeight: 2,
		},
		postMeta: {
			fontFamily: 'heading',
			fontWeight: 0,
			fontSize: 5,
		},
		p: {
			variant: 'text.p',
			fontSize: 5,
		},
	},
	post: {
		variant: 'styles',
		h1: {
			variant: 'styles.h2',
		},
		h3: {
			variant: 'styles.h3',
			marginTop: '1em',
		},
		postMeta: {
			fontFamily: 'heading',
			fontWeight: 0,
			fontSize: 5,
		},
		p: {
			variant: 'text.p',
			fontSize: '1.2rem',
		},
		ol: {
			variant: 'post.p'
		}
	},
	cv: {
		h1: {
			variant: 'text.heading',
			fontSize: 6,
			lineHeight: 'heading',
		},
		h2: {
			fontFamily: 'heading',
			fontWeight: 0,
			fontSize: 7,
			lineHeight: '38px',
		},
		h3: {
			variant: 'text.heading',
			fontSize: '2.297em',
			lineHeight: '2em',
		},
		h4: {
			variant: 'text.heading',
			fontSize: '1.741em',
		},
		p: {
			fontSize: 1,
			lineHeight: '32px',
		},
	},
	error404: {
		h2: {
			variant: 'styles.h2',
			fontSize: 2,
		},
		p: {
			variant: 'text.p',
			fontSize: 5,
		},
		errorCode: {
			fontWeight: 0,
		},
	},
};
