export interface Experience {
	company: string;
	role: string;
	startDate: Date;
	endDate: Date | 'Present';
	location: string;
	description?: string;
	highlights?: string[];
}

export interface Education {
	institution: string;
	degree: string;
	field?: string;
	startYear: number;
	endYear: number;
}

export interface Certification {
	name: string;
}

export interface Award {
	name: string;
	issuer: string;
}

export interface Patent {
	title: string;
	number: string;
	jurisdictions: string[];
	year: number;
	assignee: string;
	status: 'Granted' | 'Published';
}

export interface Language {
	name: string;
	proficiency: string;
}

export interface CVData {
	summary: string;
	experience: Experience[];
	education: Education[];
	patents: Patent[];
	certifications: Certification[];
	awards: Award[];
	languages: Language[];
}

export const cvData: CVData = {
	summary:
		'Passionate about enabling new opportunities through the understanding of users\u2019 needs with the support of the right technologies.',

	experience: [
		{
			company: 'Roche',
			role: 'Senior Manager IT Products Architecture (Lab & Point of Care)',
			startDate: new Date('2024-09-01'),
			endDate: 'Present',
			location: 'Sant Cugat del Vall\u00e8s, Spain',
		},
		{
			company: 'Roche',
			role: 'International Business Product Manager',
			startDate: new Date('2021-12-01'),
			endDate: new Date('2024-09-01'),
			location: 'Barcelona, Spain',
		},
		{
			company: 'Roche',
			role: 'Senior Innovation and Delivery Lead',
			startDate: new Date('2020-01-01'),
			endDate: new Date('2021-12-01'),
			location: 'Barcelona, Spain',
		},
		{
			company: 'Roche',
			role: 'Senior Manager IT Products Software Architecture',
			startDate: new Date('2015-09-01'),
			endDate: new Date('2020-01-01'),
			location: 'Barcelona, Spain',
		},
		{
			company: 'Roche',
			role: 'IT Products (Lab & Point of Care) Software Architect Leader',
			startDate: new Date('2015-05-01'),
			endDate: new Date('2020-01-01'),
			location: 'Switzerland',
		},
		{
			company: 'Roche',
			role: 'Software Architect',
			startDate: new Date('2011-09-01'),
			endDate: new Date('2015-05-01'),
			location: 'Barcelona, Spain',
			highlights: [
				'Definition, planning, coordination and reporting of all software activities',
				'Specification, design, development, testing and documentation of software solutions',
				'Software analysis, code analysis, requirements analysis and system risk analysis',
				'Analysis, prototyping and evaluation of new technologies',
				'Define and maintain the structure and organization of the system architecture',
				'Design, review and execute performance and usability analysis',
			],
		},
		{
			company: 'Roche',
			role: 'Senior Engineer',
			startDate: new Date('2011-01-01'),
			endDate: new Date('2011-09-01'),
			location: 'Barcelona, Spain',
		},
		{
			company: 'Roche',
			role: 'Software Developer',
			startDate: new Date('2008-05-01'),
			endDate: new Date('2011-01-01'),
			location: 'Barcelona, Spain',
		},
		{
			company: 'T-Systems',
			role: 'Developer / Analyst',
			startDate: new Date('2007-08-01'),
			endDate: new Date('2008-05-01'),
			location: 'Barcelona, Spain',
		},
		{
			company: 'Byrom plc',
			role: 'Senior Developer',
			startDate: new Date('2007-01-01'),
			endDate: new Date('2007-06-01'),
			location: 'United Kingdom',
		},
		{
			company: 'Roche Diagnostic Corp',
			role: 'Software Engineer',
			startDate: new Date('2005-04-01'),
			endDate: new Date('2007-01-01'),
			location: 'Barcelona, Spain',
		},
	],

	education: [
		{
			institution: 'ESADE Business & Law School',
			degree: 'Master of Business Administration (MBA)',
			field: 'Business Administration and Management',
			startYear: 2018,
			endYear: 2019,
		},
		{
			institution: 'Universitat de Girona',
			degree: 'Computer Science',
			startYear: 2000,
			endYear: 2005,
		},
	],

	certifications: [
		{ name: 'Software Architecture Professional Certificate' },
		{ name: 'SEI Architecture Tradeoff Analysis Method (ATAM) Evaluator Certificate' },
		{ name: 'ITIL (v4) Foundation Certificate in IT Service Management' },
		{ name: 'SAFe Agilist (SA) Certification' },
	],

	patents: [
		{
			title: 'Point-of-Care Testing System',
			number: 'US10515718B2',
			jurisdictions: ['EP', 'US', 'CN', 'JP'],
			year: 2019,
			assignee: 'Roche Diagnostics Operations, Inc.',
			status: 'Granted',
		},
		{
			title: 'Interface Proxy Device for Cyber Security',
			number: 'JP2022050588A',
			jurisdictions: ['EP', 'US', 'CN', 'JP'],
			year: 2022,
			assignee: 'F. Hoffmann-La Roche AG',
			status: 'Published',
		},
		{
			title: 'Method and System for Processing Analytical Instrument Data',
			number: 'JP2019012995A',
			jurisdictions: ['EP', 'US', 'CN', 'JP'],
			year: 2019,
			assignee: 'F. Hoffmann-La Roche AG',
			status: 'Published',
		},
		{
			title: 'Point-of-Care Testing System (Configuration Management)',
			number: 'EP3091458A1',
			jurisdictions: ['EP', 'US', 'JP'],
			year: 2016,
			assignee: 'F. Hoffmann-La Roche AG',
			status: 'Published',
		},
		{
			title: 'Point of Care Testing (POCT) System',
			number: 'US20180075223A1',
			jurisdictions: ['WO', 'US'],
			year: 2018,
			assignee: 'Roche Diagnostics Operations, Inc.',
			status: 'Published',
		},
		{
			title: 'Point of Care Testing (POCT) Remote Configuration System',
			number: 'JP2021056238A',
			jurisdictions: ['EP', 'JP'],
			year: 2021,
			assignee: 'F. Hoffmann-La Roche AG',
			status: 'Published',
		},
		{
			title: 'Techniques for Controlling Automated Analyzers',
			number: 'JP2021110747A',
			jurisdictions: ['EP', 'US', 'CN', 'JP'],
			year: 2021,
			assignee: 'F. Hoffmann-La Roche AG',
			status: 'Published',
		},
		{
			title: 'Intelligent User Guidance for Solving Laboratory Problems',
			number: 'JP2023133249A',
			jurisdictions: ['EP', 'US', 'CN', 'JP'],
			year: 2023,
			assignee: 'F. Hoffmann-La Roche AG',
			status: 'Published',
		},
		{
			title: 'Healthcare Data Management System',
			number: 'JP2023088893A',
			jurisdictions: ['EP', 'US', 'CN', 'JP'],
			year: 2023,
			assignee: 'F. Hoffmann-La Roche AG',
			status: 'Published',
		},
		{
			title: 'Method for Operating a Laboratory Automation System',
			number: 'EP4074635A1',
			jurisdictions: ['EP'],
			year: 2022,
			assignee: 'Roche Diagnostics GmbH',
			status: 'Published',
		},
		{
			title: 'System and Method for Monitoring Performance of a Medical Device',
			number: 'EP4199001A1',
			jurisdictions: ['EP'],
			year: 2023,
			assignee: 'F. Hoffmann-La Roche AG',
			status: 'Published',
		},
	],

	awards: [
		{ name: 'Professional Diagnostics Innovation Award', issuer: 'Roche' },
		{ name: 'Inventor Recognition Award', issuer: 'Roche' },
	],

	languages: [
		{ name: 'Spanish', proficiency: 'Native' },
		{ name: 'Catalan', proficiency: 'Native' },
		{ name: 'English', proficiency: 'Professional Working' },
		{ name: 'German', proficiency: 'Elementary' },
		{ name: 'Italian', proficiency: 'Elementary' },
	],
};

export function formatDateShort(date: Date): string {
	return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function calculateDuration(start: Date, end: Date | 'Present'): string {
	const endDate = end === 'Present' ? new Date() : end;
	const months =
		(endDate.getFullYear() - start.getFullYear()) * 12 +
		(endDate.getMonth() - start.getMonth());
	const years = Math.floor(months / 12);
	const rem = months % 12;
	if (years === 0) return `${rem} mo`;
	if (rem === 0) return `${years} yr`;
	return `${years} yr ${rem} mo`;
}
