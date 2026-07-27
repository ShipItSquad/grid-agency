export type Service = {
	number: string;
	title: string;
	summary: string;
	deliverables: string[];
};

export type Project = {
	title: string;
	category: string;
	year: string;
	shape: 'orbit' | 'grid' | 'wave' | 'type';
	color: string;
};

export type Post = {
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	tag: string;
};

export const services: Service[] = [
	{
		number: '01',
		title: 'Identity systems',
		summary: 'Distinct identities built to stay coherent while brands grow and change.',
		deliverables: ['Strategy', 'Visual identity', 'Guidelines', 'Launch direction']
	},
	{
		number: '02',
		title: 'Digital experiences',
		summary: 'Useful, expressive websites and products with a clear point of view.',
		deliverables: ['UX direction', 'Interface design', 'Prototyping', 'Design systems']
	},
	{
		number: '03',
		title: 'Campaign worlds',
		summary: 'Flexible creative platforms that can live across channels, formats, and moments.',
		deliverables: ['Creative concept', 'Art direction', 'Motion', 'Toolkits']
	}
];

export const projects: Project[] = [
	{
		title: 'Common Ground',
		category: 'Identity / Place',
		year: '2026',
		shape: 'orbit',
		color: '#0070f3'
	},
	{
		title: 'After Hours',
		category: 'Campaign / Culture',
		year: '2026',
		shape: 'wave',
		color: '#fafafa'
	},
	{
		title: 'Field Notes',
		category: 'Digital / Editorial',
		year: '2025',
		shape: 'grid',
		color: '#eaeaea'
	},
	{
		title: 'Mono No. 4',
		category: 'Type / Experiment',
		year: '2025',
		shape: 'type',
		color: '#f2f2f2'
	},
	{
		title: 'Open Assembly',
		category: 'Strategy / Identity',
		year: '2025',
		shape: 'grid',
		color: '#d4d4d4'
	},
	{
		title: 'New Rituals',
		category: 'Digital / Commerce',
		year: '2024',
		shape: 'orbit',
		color: '#666666'
	}
];

export const posts: Post[] = [
	{
		title: 'Good systems leave room for accidents',
		excerpt:
			'Why the strongest design languages behave less like rulebooks and more like instruments.',
		date: 'June 18, 2026',
		readTime: '6 min',
		tag: 'Process'
	},
	{
		title: 'A website should have a tempo',
		excerpt: 'Notes on pacing, pause, and making digital work feel less like a sequence of boxes.',
		date: 'May 02, 2026',
		readTime: '4 min',
		tag: 'Digital'
	},
	{
		title: 'The case for showing unfinished work',
		excerpt: 'What our discarded directions teach us, and why we keep a public playground.',
		date: 'March 27, 2026',
		readTime: '5 min',
		tag: 'Studio'
	}
];
