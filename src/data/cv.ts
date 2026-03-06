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
			role: 'Architect Lead & AI Process/Software Engineer',
			startDate: new Date('2025-09-01'),
			endDate: 'Present',
			location: 'Sant Cugat del Vall\u00e8s, Spain',
			highlights: [
				'Identifying where AI can support existing program roles to amplify their capabilities and accelerate decision-making',
				'Reshaping processes collaboratively with stakeholders to operate with AI as a first-class citizen towards higher efficiency and quality improvements, while ensuring compliance and risk management',
				'Transforming documents and other artefacts into actionable information that enables cross-functional collaboration and answers questions that previously took significant effort to find breaking the tool-first for value-first',
				'Reducing tool sprawl for simplicity and enabling a unified "corporate brain" — a single AI-powered knowledge layer across the organisation',
				'Enabling end-to-end visibility at enterprise level into product capabilities and solution building blocks (SBBs)',
				'Driving a solution-oriented architecture over vertically siloed products, unlocking cross-product synergies',
				'Architecting AI instructions, commands, and skills for predictable, regulation-compliant outcomes which carefully identified HITL steps while optimising information delivery for efficient consumption over traditional document-based approaches',
				'Onboarding and supporting trailblazers in the organisation adopting the new AI-powered ways of working',
				'Coaching Expeditioners or Coaches on how to leverage the new AI-Powered Software Development Lifecycle Framework and the AI capabilities embedded within it to maximise their impact',
				
			],
		},
		{
			company: 'Roche',
			role: 'Architect Lead',
			startDate: new Date('2024-09-01'),
			endDate: new Date('2025-09-01'),
			location: 'Sant Cugat del Vall\u00e8s, Spain',
			highlights: [
				'Leading the definition and implementation of the architectural vision for Roche Diagnostics IT Products, ensuring alignment with business goals and technological advancements',
				'Driving the adoption of modern architectural principles and practices across the organization, fostering a culture of innovation and continuous improvement',
				'Collaborating with cross-functional teams to design scalable, secure, and high-performance solutions that meet the evolving needs of the diagnostics industry',
				'Overseeing the evaluation and integration of emerging technologies, such as AI and cloud computing, to enhance product capabilities and maintain competitive advantage',
				'Mentoring and guiding architects and engineers, promoting best practices in software design, development, and deployment',
				'Ensuring compliance with industry regulations and standards while delivering innovative solutions that drive business growth',
				'Facilitating communication and collaboration between technical teams and business stakeholders to ensure architectural decisions align with organizational objectives',
				'Leading architectural reviews and providing strategic guidance on technology investments and roadmap planning',
				'Representing Roche Diagnostics IT Products in industry forums and conferences, sharing insights and thought leadership on architectural trends and innovations',
				'Driving the evolution of the architectural framework to support the integration of AI capabilities across products, enabling intelligent automation and enhanced user experiences',
				'Exploring the usage of new technologies to enhance the architectural vision and drive innovation within the organization',
			],
		},
		{
			company: 'Roche',
			role: 'International Business Product Manager',
			startDate: new Date('2021-12-01'),
			endDate: new Date('2024-09-01'),
			location: 'Barcelona, Spain',
			highlights: [
				'Leading the global product strategy and execution for Roche Diagnostics IT Products for the brand critical portal and digital marketplace, driving innovation and growth in the diagnostics industry',
				'Collaborating with cross-functional teams to define product roadmaps, prioritize features, and ensure successful product launches that meet customer needs and business objectives',
				'Collaborating with marketing, branding, sales, enterprise value chain owners, and other stakeholders to ensure successful product launches and market adoption timed with the overall brand strategy launch and design',
				'Created the new Digital Marketplace for Roche Diagnostics IT Products, a unified platform for customers to discover, evaluate, and acquire digital solutions that enhance their diagnostic capabilities, driving revenue growth and customer satisfaction',
				'Applied ABX (Account-Based Experience) principles to create personalized and engaging experiences for key accounts, resulting in increased customer loyalty and revenue growth',
				'Conducted market research and competitive analysis to identify trends, customer needs, and opportunities for product differentiation in the diagnostics industry',
				'Defined and tracked key performance indicators (KPIs) to measure product success and inform data-driven decision-making, leading to continuous improvement and optimization of product offerings with the creation of multiple dashboards',
				'Managed the entire product lifecycle, from ideation to retirement, ensuring products meet quality standards, regulatory requirements, and customer expectations',
				'From conceptualization to launch, led the development of the brand critical portal and digital marketplace, driving innovation and growth in the diagnostics industry while ensuring alignment with overall brand strategy and design',
				'Scaled the digital marketplace (from initial concept to global rollout) through collaboration with more than 100 affiliates worldwide, ensuring successful adoption and integration of digital solutions across diverse markets and customer segments, launching the product in more than 130 countries in 14 months',
			],
		},
		{
			company: 'Roche',
			role: 'Senior Innovation and Delivery Lead',
			startDate: new Date('2020-01-01'),
			endDate: new Date('2021-12-01'),
			location: 'Barcelona, Spain',
			highlights: [
				'Leading cross-functional teams to drive innovation and successful delivery of Roche Diagnostics IT Products, ensuring alignment with business goals and customer needs',
				'Collaborating with stakeholders to define and execute product strategies, roadmaps, and go-to-market plans that drive growth and enhance customer satisfaction',
				'Driving the adoption of agile methodologies and best practices to improve team performance, product quality, and time-to-market',
				'Application of design thinking principles to foster a customer-centric approach to product development, resulting in innovative solutions that meet user needs and drive business success',
				'Leading the research and discovery phases of new products and features opportunities, ensuring the collection and validation of meaningful hypotheses and assumptions for the Feasibility, Viability, and Desirability (FVD) framework',
				'Collaborating with cross-disciplinary lifecycle teams of the management and the innovation funnel to support them prioritizing and identifying good opportunities to feed the pipeline',
				'Saved significant time and costs by rapidly validating business ideas and their underlying assumptions with a test-and-learn approach, enabling data-driven decision-making and reducing the risk of product failure',
				'Facilitating communication and collaboration between technical teams and business stakeholders to ensure successful product delivery and alignment with organizational objectives',
			],
		},
		{
			company: 'Roche',
			role: 'Senior Manager IT Products Software Architecture',
			startDate: new Date('2015-05-01'),
			endDate: new Date('2020-01-01'),
			location: 'Barcelona, Spain, Rotkreuz, Switzerland',
			highlights: [
				'Leading the architectural design and implementation of Roche Diagnostics IT Products across 3 countries (Germany, Spain, Switzerland), ensuring scalability, security, and performance to meet the evolving needs of the diagnostics industry',
				'Collaborating with cross-functional teams to define architectural standards, best practices, and guidelines that drive innovation and maintain technical excellence across products',
				'Overseeing the evaluation and integration of emerging technologies, such as cloud computing and microservices, to enhance product capabilities and maintain competitive advantage',
				'Applying governance and practices from ITIL, TOGAF and SEI ATAM (Carnegie Mellon University) to ensure robust architectural design and risk management, while fostering a culture of continuous improvement and innovation',
				'Mentoring and guiding architects and engineers, promoting best practices in software design, development, and deployment to ensure high-quality solutions',
				'Ensuring compliance with industry regulations and standards while delivering innovative solutions that drive business growth',
				'Facilitating communication and collaboration between technical teams and business stakeholders to ensure architectural decisions align with organizational objectives',
				'Leading architectural reviews and providing strategic guidance on technology investments and roadmap planning to support the long-term vision of Roche Diagnostics IT Products',
				'Representing Roche Diagnostics IT Products in industry forums and conferences, sharing insights and thought leadership on architectural trends and innovations',
				'Conducted 2 supervised SEI ATAM (Architecture Tradeoff Analysis Method) evaluations for Roche Diagnostics IT Products, identifying architectural risks and providing actionable recommendations that led to improved system robustness, scalability, and maintainability, while fostering a culture of continuous improvement and innovation across the organization',
			],
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
