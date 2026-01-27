import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Experts first (needed for Insights)
  const expert1 = await prisma.expert.create({
    data: {
      name: 'Sarah Chen',
      slug: 'sarah-chen',
      role: 'Managing Partner, Digital Transformation',
      bio: 'Sarah leads our digital transformation practice with over 20 years of experience helping Fortune 500 companies modernize their operations.',
      expertise: JSON.stringify(['Digital Strategy', 'AI & ML', 'Cloud Migration', 'Agile Transformation']),
      locations: JSON.stringify(['New York', 'San Francisco']),
      email: 'sarah.chen@jas.com',
      linkedin: 'https://linkedin.com/in/sarahchen',
      featured: true,
      image: '/images/experts/sarah-chen.jpg'
    }
  });

  const expert2 = await prisma.expert.create({
    data: {
      name: 'Michael Rodriguez',
      slug: 'michael-rodriguez',
      role: 'Partner, Financial Services',
      bio: 'Michael specializes in financial services transformation, risk management, and regulatory compliance.',
      expertise: JSON.stringify(['Risk Management', 'Regulatory Compliance', 'Financial Technology', 'M&A Advisory']),
      locations: JSON.stringify(['New York', 'London']),
      email: 'michael.rodriguez@jas.com',
      linkedin: 'https://linkedin.com/in/michaelrodriguez',
      featured: true,
      image: '/images/experts/michael-rodriguez.jpg'
    }
  });

  // Create Industries
  const financeIndustry = await prisma.industry.create({
    data: {
      name: 'Financial Services',
      slug: 'financial-services',
      description: 'Transform your financial institution with cutting-edge technology and strategic insights',
      overview: 'Navigate the complex landscape of modern finance with our comprehensive consulting services.',
      challenges: JSON.stringify(['Regulatory Compliance', 'Digital Disruption', 'Cybersecurity Threats', 'Legacy System Modernization']),
      trends: JSON.stringify(['Open Banking', 'DeFi & Blockchain', 'AI-Powered Risk Management', 'Embedded Finance']),
      featured: true,
      image: '/images/industries/financial-services.jpg'
    }
  });

  const healthcareIndustry = await prisma.industry.create({
    data: {
      name: 'Healthcare & Life Sciences',
      slug: 'healthcare-life-sciences',
      description: 'Innovate patient care and operational excellence in healthcare',
      overview: 'Transform healthcare delivery with data-driven insights and digital innovation.',
      challenges: JSON.stringify(['Patient Data Security', 'Interoperability', 'Cost Management', 'Regulatory Compliance']),
      trends: JSON.stringify(['Telemedicine', 'AI Diagnostics', 'Personalized Medicine', 'Value-Based Care']),
      featured: true,
      image: '/images/industries/healthcare.jpg'
    }
  });

  // Create Services
  const digitalService = await prisma.service.create({
    data: {
      name: 'Digital Transformation',
      slug: 'digital-transformation',
      description: 'End-to-end digital transformation to modernize your business',
      overview: 'We help organizations reimagine their business models, operations, and customer experiences through digital innovation.',
      methodologies: JSON.stringify(['Design Thinking', 'Agile', 'DevOps', 'Lean Startup']),
      tools: JSON.stringify(['AWS', 'Azure', 'Salesforce', 'SAP', 'Tableau']),
      featured: true,
      image: '/images/services/digital-transformation.jpg'
    }
  });

  const strategyService = await prisma.service.create({
    data: {
      name: 'Strategy & Operations',
      slug: 'strategy-operations',
      description: 'Strategic planning and operational excellence for sustainable growth',
      overview: 'Develop winning strategies and optimize operations to achieve your business objectives.',
      methodologies: JSON.stringify(['Porter\'s Five Forces', 'Blue Ocean Strategy', 'Balanced Scorecard', 'Six Sigma']),
      tools: JSON.stringify(['Tableau', 'Power BI', 'SAP', 'Oracle']),
      featured: true,
      image: '/images/services/strategy.jpg'
    }
  });

  // Create SubServices
  await prisma.subService.createMany({
    data: [
      { name: 'Cloud Migration', description: 'Seamless transition to cloud infrastructure', serviceId: digitalService.id },
      { name: 'AI & Machine Learning', description: 'Intelligent automation and predictive analytics', serviceId: digitalService.id },
      { name: 'Business Model Innovation', description: 'Reimagine your value proposition', serviceId: strategyService.id },
      { name: 'Operational Excellence', description: 'Optimize processes and reduce costs', serviceId: strategyService.id }
    ]
  });

  // Create Insights
  const insight1 = await prisma.insight.create({
    data: {
      title: 'The Future of Banking: AI-Powered Customer Experience',
      slug: 'future-banking-ai-customer-experience',
      type: 'Article',
      content: 'Artificial intelligence is revolutionizing how banks interact with customers...',
      excerpt: 'Discover how AI is transforming customer experience in banking',
      featured: true,
      trending: true,
      gated: false,
      image: '/images/insights/ai-banking.jpg',
      readTime: 8,
      authorId: expert1.id,
      topics: JSON.stringify(['Artificial Intelligence', 'Customer Experience', 'Banking']),
      regions: JSON.stringify(['North America', 'Europe'])
    }
  });

  const insight2 = await prisma.insight.create({
    data: {
      title: 'Healthcare Digital Transformation: A Comprehensive Guide',
      slug: 'healthcare-digital-transformation-guide',
      type: 'Whitepaper',
      content: 'This comprehensive guide explores the key strategies for successful digital transformation in healthcare...',
      excerpt: 'Complete roadmap for healthcare digital transformation',
      featured: true,
      gated: true,
      downloadUrl: '/downloads/healthcare-digital-guide.pdf',
      image: '/images/insights/healthcare-digital.jpg',
      readTime: 15,
      authorId: expert2.id,
      topics: JSON.stringify(['Digital Transformation', 'Healthcare', 'Technology']),
      regions: JSON.stringify(['Global'])
    }
  });

  // Connect relationships
  await prisma.expert.update({
    where: { id: expert1.id },
    data: {
      industries: { connect: [{ id: financeIndustry.id }] },
      services: { connect: [{ id: digitalService.id }] }
    }
  });

  await prisma.expert.update({
    where: { id: expert2.id },
    data: {
      industries: { connect: [{ id: healthcareIndustry.id }] },
      services: { connect: [{ id: strategyService.id }] }
    }
  });

  await prisma.insight.update({
    where: { id: insight1.id },
    data: {
      industries: { connect: [{ id: financeIndustry.id }] },
      services: { connect: [{ id: digitalService.id }] }
    }
  });

  await prisma.insight.update({
    where: { id: insight2.id },
    data: {
      industries: { connect: [{ id: healthcareIndustry.id }] },
      services: { connect: [{ id: digitalService.id }] }
    }
  });

  // Create Offices
  await prisma.office.createMany({
    data: [
      {
        name: 'New York',
        slug: 'new-york',
        region: 'North America',
        country: 'United States',
        city: 'New York',
        address: '200 West Street, New York, NY 10013',
        phone: '+1 212 555 0100',
        email: 'newyork@jas.com',
        lat: 40.7128,
        lng: -74.0060,
        image: '/images/offices/new-york.jpg'
      },
      {
        name: 'London',
        slug: 'london',
        region: 'Europe',
        country: 'United Kingdom',
        city: 'London',
        address: '1 Canada Square, Canary Wharf, London E14 5AB',
        phone: '+44 20 7123 4567',
        email: 'london@jas.com',
        lat: 51.5074,
        lng: -0.1278,
        image: '/images/offices/london.jpg'
      }
    ]
  });

  // Create Careers
  await prisma.career.createMany({
    data: [
      {
        title: 'Senior Management Consultant',
        slug: 'senior-management-consultant',
        department: 'Consulting',
        location: 'New York, NY',
        type: 'Full-time',
        experience: 'Senior',
        description: 'Lead strategic consulting engagements for Fortune 500 clients...',
        requirements: JSON.stringify(['MBA or equivalent', '5+ years consulting experience', 'Strong analytical skills']),
        benefits: JSON.stringify(['Competitive salary', 'Health insurance', '401k matching', 'Flexible work']),
        featured: true,
        expiresAt: new Date('2025-12-31')
      },
      {
        title: 'Data Scientist',
        slug: 'data-scientist',
        department: 'Technology',
        location: 'San Francisco, CA',
        type: 'Full-time',
        experience: 'Mid-level',
        description: 'Build AI/ML solutions for client engagements...',
        requirements: JSON.stringify(['MS in Computer Science or related', '3+ years ML experience', 'Python, TensorFlow']),
        benefits: JSON.stringify(['Competitive salary', 'Stock options', 'Learning budget', 'Remote work']),
        featured: true,
        expiresAt: new Date('2025-12-31')
      }
    ]
  });

  // Create Media Items
  await prisma.mediaItem.createMany({
    data: [
      {
        title: 'JAS.COM Announces New AI Practice',
        slug: 'jas-announces-ai-practice',
        type: 'Press Release',
        content: 'JAS.COM today announced the launch of its new AI & Machine Learning practice...',
        excerpt: 'New practice to help clients leverage AI for business transformation',
        featured: true,
        image: '/images/media/ai-practice.jpg',
        attachments: JSON.stringify(['/downloads/press-release-ai.pdf'])
      },
      {
        title: 'JAS.COM Named Leader in Digital Transformation',
        slug: 'jas-leader-digital-transformation',
        type: 'News',
        content: 'Industry analyst firm recognizes JAS.COM as a leader in digital transformation consulting...',
        excerpt: 'Recognition for excellence in digital transformation services',
        featured: true,
        image: '/images/media/award.jpg',
        attachments: JSON.stringify([])
      }
    ]
  });

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
