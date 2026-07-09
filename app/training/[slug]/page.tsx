'use client';

import { useState, useRef, use, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  CheckCircle, Clock, BarChart, 
  Globe, Shield, Sparkles, Code, 
  Database, Cpu, Layers, HelpCircle, 
  Calendar, DollarSign, Briefcase, FileText,
  Award, Users, Target, TrendingUp, Wrench, ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   ANIMATION CONSTANTS & SHARED UTILITIES
═══════════════════════════════════════════════════════════════ */
const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.09, ease: EASE },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#8C1B2E] origin-left z-[999]"
      style={{ scaleX }}
    />
  );
}

function Particles() {
  const dots = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    dur: Math.random() * 6 + 6,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.size, height: d.size, opacity: 0 }}
          animate={{ opacity: [0, 0.45, 0], y: [0, -28, -56], scale: [1, 1.2, 0.6] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function AnimatedTitle({ text, className }: { text: string; className?: string }) {
  const words = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 28, rotateX: -40 },
            visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.55, ease: EASE } },
          }}
        >
          {w}
        </motion.span>
      ))}
    </motion.span>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase mb-3 ${
        light ? 'text-white/60' : 'text-[#8C1B2E]'
      }`}
    >
      <span className={`block w-5 h-[2px] rounded-full ${light ? 'bg-white/40' : 'bg-[#8C1B2E]'}`} />
      {children}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COURSE CONTENT REPOSITORY
   Every field below is written to give a prospective student a
   genuinely complete picture of the program before they enroll:
   what they'll learn, which tools they'll use, what roles they'll
   be ready for, and the exact commitment (time, cost, format).
═══════════════════════════════════════════════════════════════ */
const skillsData: Record<string, any> = {
  'cloud-computing': {
    title: 'Cloud Computing & Systems Architecture',
    icon: Globe,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    description: 'Master AWS, Microsoft Azure, and Google Cloud Platform. Learn to design, deploy, secure, and scale multi-region infrastructure used by real production systems.',
    duration: '12 Weeks',
    level: 'Intermediate',
    investment: '$2,450 (0% APR installment plans available over 6 or 12 months)',
    schedule: 'Tues & Thurs, 6:30–8:30 PM EST, plus a hands-on Saturday lab every other week',
    prerequisites: 'Comfort with the TCP/IP model and basic subnetting, working knowledge of the Linux command line, and at least one scripting language (Bash or Python) at a beginner level.',
    overviewParagraph: 'Cloud platforms now run the majority of production workloads at companies of every size, which is why cloud engineers and architects are consistently among the highest-demand technical roles. This program moves past clicking through a console: you will provision real infrastructure on AWS (with parallel exercises on Azure and GCP), design for high availability and cost efficiency, and defend what you built in a live architecture review — the same format used in professional cloud certification interviews.',
    tools: ['Amazon Web Services (EC2, S3, RDS, Lambda, VPC)', 'Microsoft Azure', 'Google Cloud Platform', 'Terraform', 'Docker', 'Linux (Ubuntu/RHEL)', 'CloudWatch & Azure Monitor', 'Git & GitHub'],
    curriculum: [
      'Cloud Architecture Fundamentals: Compare IaaS, PaaS, and SaaS; understand the Shared Responsibility Model and how billing, quotas, and regions actually work.',
      'Networking in the Cloud: Build custom VPCs with public/private subnets, route tables, NAT gateways, and VPC peering; troubleshoot connectivity with real traffic traces.',
      'Compute & Auto-Scaling: Launch EC2/Azure VM fleets behind load balancers, configure Auto-Scaling Groups, and design health checks that actually catch failures.',
      'Storage & Data Services: Compare S3 storage classes and lifecycle rules, set up managed relational databases (RDS), and configure automated backups and snapshots.',
      'Serverless Computing: Build event-driven applications with AWS Lambda, API Gateway, and EventBridge (or Azure Functions), including cold-start and cost tradeoffs.',
      'Identity & Access Management: Write least-privilege IAM policies, set up roles and federated access, and pass a mock IAM security audit.',
      'Infrastructure as Code: Provision and version your entire environment with Terraform, including remote state, modules, and safe rollback practices.',
      'Monitoring, Cost Control & Disaster Recovery: Set up CloudWatch dashboards and alerts, run a cost-optimization pass on a sample account, and design a cross-region failover plan.'
    ],
    outcomes: [
      'Design a production-grade AWS architecture that would pass a real Well-Architected Framework review.',
      'Migrate a monolithic application to cloud-native services with a documented, low-downtime cutover plan.',
      'Write and apply least-privilege IAM policies and encrypt data at rest and in transit by default.',
      'Identify and eliminate wasted cloud spend using cost-explorer data and right-sizing techniques.'
    ],
    careerPaths: ['Cloud Support Engineer', 'DevOps Engineer', 'Cloud Solutions Architect', 'Site Reliability Engineer (SRE)', 'Infrastructure Engineer'],
    certPrep: 'Curriculum maps directly to the AWS Certified Solutions Architect – Associate exam objectives; many students sit the exam within 4–6 weeks of graduating.',
    faqs: [
      { q: 'Do I need prior cloud experience?', a: 'No — you need solid fundamentals (networking, Linux, one scripting language), but we start from zero cloud-specific knowledge.' },
      { q: 'Which cloud provider will I actually use hands-on?', a: 'The core labs run on AWS, with dedicated modules translating the same concepts to Azure and GCP so you can speak all three in an interview.' },
      { q: 'Is there a capstone project?', a: 'Yes — you will architect, deploy, and present a multi-tier, auto-scaling application in your own sandbox account during the final two weeks.' }
    ]
  },
  'ai-machine-learning': {
    title: 'AI & Machine Learning Engineering',
    icon: Sparkles,
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop',
    description: 'Go from Python fundamentals to production ML systems: classical models, deep neural networks, computer vision, transformer-based LLMs, and MLOps deployment.',
    duration: '16 Weeks',
    level: 'Advanced',
    investment: '$3,200 (0% APR installment plans available over 6 or 12 months)',
    schedule: 'Mon & Wed, 7:00–9:00 PM EST, plus applied lab exercises every Sunday',
    prerequisites: 'Intermediate Python (functions, classes, NumPy/Pandas), linear algebra (matrix multiplication, eigenvectors), basic calculus (derivatives, gradients), and introductory probability/statistics.',
    overviewParagraph: 'This is a math-first, implementation-heavy track rather than a tour of pre-built API wrappers. You will derive and code backpropagation from scratch, train and fine-tune real convolutional and transformer models, and ship a model behind a production API with monitoring and rollback. By the end you should be able to explain — and defend, in a whiteboard interview — every design decision in a model you built yourself.',
    tools: ['Python', 'NumPy & Pandas', 'PyTorch', 'scikit-learn', 'Hugging Face Transformers', 'TensorFlow (intro)', 'Docker', 'MLflow', 'FastAPI'],
    curriculum: [
      'Data Preparation & Feature Engineering: Clean messy real-world datasets, handle missing values and class imbalance, and engineer features that measurably improve model performance.',
      'Classical Supervised Learning: Implement and tune logistic regression, decision trees, random forests, and gradient boosting (XGBoost) on structured data.',
      'Unsupervised Learning: Apply k-means and hierarchical clustering, and use PCA/t-SNE to reduce dimensionality and surface hidden structure in data.',
      'Neural Networks from Scratch: Build a multi-layer perceptron using only NumPy, then implement backpropagation and gradient descent by hand before moving to PyTorch.',
      'NLP & Transformers: Understand tokenization and self-attention, fine-tune a pretrained transformer (e.g., BERT or a small open LLM) on a custom text classification task.',
      'Computer Vision: Build convolutional neural networks for image classification, apply transfer learning, and implement a basic object-detection pipeline.',
      'MLOps & Production Deployment: Track experiments with MLflow, containerize a trained model, serve it through a FastAPI endpoint, and set up drift monitoring.',
      'Responsible AI: Audit a model for demographic bias, generate explainability reports with SHAP, and stress-test with adversarial inputs.'
    ],
    outcomes: [
      'Implement backpropagation and core neural network architectures from first principles, not just from a library call.',
      'Fine-tune a transformer model on a custom dataset and evaluate it with the correct metrics for the task.',
      'Package and deploy a trained model as a monitored API endpoint using standard MLOps practices.',
      'Audit a model for bias and explain its predictions to a non-technical stakeholder.'
    ],
    careerPaths: ['Machine Learning Engineer', 'Data Scientist', 'AI Applications Engineer', 'NLP Engineer', 'MLOps Engineer'],
    certPrep: 'No single vendor exam maps to this track; the capstone project and GitHub portfolio are designed to carry more weight than certifications for ML hiring.',
    faqs: [
      { q: 'How much math will I actually need to do by hand?', a: 'Enough to derive gradient descent and backpropagation yourself in weeks 4–5. After that, PyTorch handles the calculus and you focus on architecture and evaluation.' },
      { q: 'Will I work with large language models?', a: 'Yes — the NLP module covers transformer attention mechanics and includes fine-tuning a real open-weight model, plus a session on retrieval-augmented generation (RAG).' },
      { q: 'Do I need a GPU?', a: 'No personal GPU required — cloud GPU credits for training are included in tuition.' }
    ]
  },
  'cybersecurity': {
    title: 'Cybersecurity & Ethical Hacking',
    icon: Shield,
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    description: 'Learn offensive and defensive security: penetration testing, network defense, incident response, and compliance — taught through authorized attack simulations.',
    duration: '14 Weeks',
    level: 'Intermediate',
    investment: '$2,800 (0% APR installment plans available over 6 or 12 months)',
    schedule: 'Tues & Thurs, 7:00–9:00 PM EST, plus a Saturday capture-the-flag style range exercise',
    prerequisites: 'Solid understanding of the OSI model and how packets actually move across a network, comfort reading Wireshark captures, and basic command-line proficiency (Linux and Windows).',
    overviewParagraph: 'Every offensive technique taught here is practiced exclusively inside an isolated, legally sanctioned lab range — never against live systems. You will learn to think like an attacker (reconnaissance, exploitation, privilege escalation) so you can build defenses that actually hold up, then pivot to the blue-team side: detection, incident response, and the compliance frameworks auditors will actually ask you about.',
    tools: ['Kali Linux', 'Nmap', 'Wireshark', 'Burp Suite', 'Metasploit Framework', 'Splunk (SIEM)', 'OWASP ZAP', 'Active Directory lab environment'],
    curriculum: [
      'Reconnaissance & Enumeration: Run passive and active recon (OSINT, Nmap scans, service fingerprinting) against an isolated lab network.',
      'Vulnerability Analysis & Exploitation: Map discovered services to known CVEs, safely execute exploits in the range, and document proof-of-concept impact.',
      'Network Defense Architecture: Design segmented, zero-trust network zones and configure intrusion detection/prevention rules (Snort/Suricata basics).',
      'Web Application Security (OWASP Top 10): Find and remediate SQL injection, broken authentication, XSS, and access-control flaws using Burp Suite.',
      'Cryptography Essentials: Implement TLS correctly, understand certificate chains and common misconfigurations, and evaluate encryption-at-rest choices.',
      'Identity & Active Directory Security: Harden AD against common attack paths (Kerberoasting, pass-the-hash) and configure MFA and conditional access.',
      'Incident Response & Digital Forensics: Triage a simulated breach end-to-end — log analysis in Splunk, timeline reconstruction, and a written incident report.',
      'Governance, Risk & Compliance: Map a sample environment against SOC 2 and ISO 27001 controls and prepare an audit-readiness checklist.'
    ],
    outcomes: [
      'Execute an authorized penetration test end-to-end and deliver a professional findings report with remediation guidance.',
      'Harden a network and Active Directory environment against the attack techniques most commonly seen in real breaches.',
      'Investigate a security incident using log data and produce a defensible timeline and root-cause analysis.',
      'Assess an environment against SOC 2 / ISO 27001 controls and identify concrete compliance gaps.'
    ],
    careerPaths: ['SOC Analyst', 'Penetration Tester', 'Security Engineer', 'Incident Response Analyst', 'GRC Analyst'],
    certPrep: 'Curriculum aligns with CompTIA Security+ and provides a strong foundation for pursuing CEH or OSCP afterward.',
    faqs: [
      { q: 'Is any of this legal to practice at home?', a: 'All exploitation labs run inside a private, isolated range provided by the program. Attacking systems you do not own or have written authorization for is illegal, and we cover the legal/ethical framework explicitly in week one.' },
      { q: 'Is this offense-focused or defense-focused?', a: 'Both — roughly the first half is offensive (how attacks work), the second half is defensive (detection, response, compliance), because effective defenders need both skill sets.' },
      { q: 'What if I have zero security background?', a: 'The networking and Linux prerequisites are firm, but no prior security experience is assumed — week one starts from first principles.' }
    ]
  },
  'graphic-design': {
    title: 'Graphic Design & UI/UX Strategy',
    icon: Sparkles,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-26c113006238?q=80&w=1200&auto=format&fit=crop',
    description: 'Master visual design and product interface work using industry-standard tools, grounded in real user research and usability testing — not just aesthetics.',
    duration: '10 Weeks',
    level: 'Beginner',
    investment: '$1,950 (0% APR installment plans available over 6 or 12 months)',
    schedule: 'Mon & Wed, 6:00–8:00 PM EST, plus a weekly shared studio critique session',
    prerequisites: 'No prior design or coding experience required. You will need a laptop capable of running Figma and Adobe Creative Cloud, and a genuine willingness to have your work critiqued in front of peers.',
    overviewParagraph: 'Good product design sits at the intersection of visual craft and human behavior. This track trains both: you will build a real typographic and color-theory foundation, get fluent in Photoshop, Illustrator, and Figma, and then apply all of it to genuine UX research — usability testing, information architecture, and interactive prototyping — so the interfaces you design are not just attractive but actually usable.',
    tools: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe XD (intro)', 'Maze (usability testing)', 'Notion (research documentation)'],
    curriculum: [
      'Visual Design Foundations: Typographic hierarchy, grid systems, color theory, and composition principles applied through daily design exercises.',
      'Raster Editing in Photoshop: Non-destructive layer workflows, photo compositing, and asset preparation for both print and digital.',
      'Vector Design in Illustrator: Build scalable logos, icon sets, and brand marks using precise vector paths and boolean operations.',
      'Interface Design in Figma: Component libraries, auto-layout, variants, and responsive frames that adapt across device sizes.',
      'User Research & Usability Testing: Recruit test participants, run moderated usability sessions, and synthesize findings into actionable design changes.',
      'Interactive Prototyping: Build clickable, high-fidelity prototypes with realistic micro-interactions and conditional navigation logic.',
      'Brand Identity Systems: Design a complete identity system — logo, type scale, color tokens, and a written brand style guide.',
      'Developer Handoff: Prepare design files with accurate spacing, color tokens, and exportable assets so engineers can implement your work without guesswork.'
    ],
    outcomes: [
      'Design responsive interfaces that hold up across mobile, tablet, and desktop breakpoints.',
      'Produce a complete, presentation-ready brand identity system for a real or fictional company.',
      'Plan and run a usability test, then translate the findings into specific interface changes.',
      'Ship a recruiter-ready portfolio featuring 3–4 fully documented case studies.'
    ],
    careerPaths: ['UI Designer', 'UX Designer', 'Product Designer', 'Brand & Visual Designer', 'Junior Design Systems Specialist'],
    certPrep: 'No formal certification exam exists in this field — hiring is portfolio-driven, which is why the program is built around producing a complete, presentable case-study portfolio.',
    faqs: [
      { q: 'Do I need to know how to draw?', a: 'No. Digital product design relies on layout, typography, and systematic thinking far more than freehand illustration skill.' },
      { q: 'Will I learn any coding?', a: 'A short developer-handoff module covers reading CSS spacing/color values so you can collaborate with engineers, but this is not a coding course.' },
      { q: 'What software do I need to buy?', a: 'A Figma account (free tier is sufficient) and an Adobe Creative Cloud subscription; student discounts are available through the program.' }
    ]
  },
  'full-stack-development': {
    title: 'Full Stack Web Software Engineering',
    icon: Code,
    imageUrl: 'https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1200&auto=format&fit=crop',
    description: 'Build and ship production applications with modern JavaScript/TypeScript, React, Next.js, and Node.js — from database schema to deployed, authenticated product.',
    duration: '20 Weeks',
    level: 'Beginner to Advanced',
    investment: '$3,800 (0% APR installment plans available over 6 or 12 months)',
    schedule: 'Mon, Wed & Fri, 6:30–9:00 PM EST, plus weekend team-based code sprints',
    prerequisites: 'Basic familiarity with HTML and CSS, and comfort with simple programming logic (variables, loops, conditionals) in any language.',
    overviewParagraph: 'Employers look for engineers who can move across the whole stack: a well-modeled database, a secure API, and a fast, accessible frontend. This program is built around shipping real, deployed applications — not toy exercises — with each project pairing modern JavaScript/TypeScript fundamentals against the production patterns (auth, testing, CI/CD) that separate a bootcamp project from a hireable portfolio.',
    tools: ['JavaScript & TypeScript', 'React', 'Next.js', 'Node.js & Express', 'PostgreSQL', 'MongoDB', 'Prisma / Mongoose', 'Git & GitHub Actions', 'Docker', 'Vercel / Railway (deployment)'],
    curriculum: [
      'Modern JavaScript & TypeScript: Closures, async/await, promise handling, error boundaries, and TypeScript types/interfaces used in real codebases.',
      'React Fundamentals: Component architecture, hooks, state management (Context and Zustand), and performance optimization (memoization, code-splitting).',
      'Next.js & Server-Side Rendering: App Router, server components, data fetching strategies, and SEO/performance implications of each rendering mode.',
      'Styling at Scale: Utility-first CSS with Tailwind, responsive design systems, and smooth animation with Framer Motion.',
      'Backend API Development: Build RESTful and simple GraphQL APIs with Node.js/Express, including request validation and structured error handling.',
      'Database Design: Model relational schemas in PostgreSQL with Prisma, and compare against document modeling in MongoDB for the right use case.',
      'API Integration & Third-Party Services: Consume external APIs safely, handle rate limits and retries, and design your own versioned public API.',
      'Authentication, Testing & Deployment: Implement JWT/session-based auth, write unit and integration tests, containerize with Docker, and ship via CI/CD to a live URL.'
    ],
    outcomes: [
      'Design and build a full-stack application from database schema through deployed, publicly accessible product.',
      'Implement secure authentication and authorization, and defend against common vulnerabilities (CSRF, injection, insecure auth).',
      'Write automated tests and set up a CI/CD pipeline that deploys on every merge to main.',
      'Collaborate on a shared codebase using Git branching workflows, pull requests, and code review.'
    ],
    careerPaths: ['Full Stack Developer', 'Frontend Engineer', 'Backend Engineer', 'Software Engineer (Junior/Mid)', 'Product Engineer'],
    certPrep: 'No vendor certification applies; hiring in this field is driven almost entirely by a GitHub portfolio and take-home/technical interviews, which the capstone project is built to prepare you for.',
    faqs: [
      { q: 'Will I build my own projects or follow a script?', a: 'Both — early weeks are guided builds to establish fundamentals, but weeks 12–20 center on an original capstone application you design, build, and deploy yourself.' },
      { q: 'SQL or NoSQL — which will I actually learn?', a: 'Both. You will model the same application in PostgreSQL and MongoDB so you understand when to reach for each.' },
      { q: 'Is job placement support included?', a: 'The program includes resume/portfolio review and mock technical interviews in the final two weeks; it does not guarantee placement.' }
    ]
  },
  'data-science': {
    title: 'Data Science & Big Data Analytics',
    icon: Database,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    description: 'Turn raw, messy data into decisions: statistical analysis, SQL, Python data workflows, predictive modeling, and dashboards executives actually use.',
    duration: '16 Weeks',
    level: 'Intermediate',
    investment: '$2,900 (0% APR installment plans available over 6 or 12 months)',
    schedule: 'Tues & Thurs, 7:00–9:30 PM EST, working with real-world business case datasets',
    prerequisites: 'Basic algebra, comfort with spreadsheet formulas, and beginner-level programming in any language (Python preferred but not required).',
    overviewParagraph: 'Most business data is messy, incomplete, and scattered across systems before it can answer any question. This program teaches the full pipeline: pulling and cleaning data with SQL and Python, testing hypotheses correctly (including the pitfalls that lead to wrong conclusions), building predictive models, and — critically — communicating results to non-technical stakeholders who will make decisions based on your work.',
    tools: ['Python (Pandas, NumPy, scikit-learn)', 'SQL (PostgreSQL)', 'Tableau', 'Power BI', 'Apache Spark (intro)', 'Jupyter Notebooks', 'Excel (advanced)'],
    curriculum: [
      'Statistics for Decision-Making: Hypothesis testing, confidence intervals, A/B test design, and the common mistakes that produce misleading results.',
      'Data Wrangling & Cleaning: Handle missing data, outliers, and inconsistent formats across multiple real-world messy datasets.',
      'SQL for Analytics: Write complex joins, window functions, and CTEs to extract and aggregate data from relational databases efficiently.',
      'Dashboarding & Business Intelligence: Build interactive, filterable dashboards in Tableau and Power BI that update from live data sources.',
      'Distributed Data Processing: Process datasets too large for a single machine using core Apache Spark concepts and PySpark.',
      'Predictive Modeling: Build and validate regression and classification models, and choose the right evaluation metric for the business question.',
      'Data Pipeline Automation: Build scheduled ETL jobs that pull, clean, and load data automatically using Python.',
      'Executive Communication: Translate technical findings into a clear, decision-ready summary for non-technical stakeholders.'
    ],
    outcomes: [
      'Convert raw, multi-source data into a clean, analysis-ready dataset using documented, repeatable steps.',
      'Design and correctly interpret an A/B test, including identifying when a result is not statistically meaningful.',
      'Build a live, interactive dashboard that a business team can use without touching the underlying code.',
      'Present technical findings to a non-technical audience in a way that leads to a clear decision.'
    ],
    careerPaths: ['Data Analyst', 'Business Intelligence Analyst', 'Data Scientist (Junior)', 'Analytics Engineer', 'Reporting/Insights Analyst'],
    certPrep: 'Curriculum overlaps meaningfully with Google Data Analytics and Microsoft Power BI certification content, and prepares students well for either exam.',
    faqs: [
      { q: 'Is this course more Python or more SQL?', a: 'Both are treated as first-class tools — SQL for extraction and aggregation, Python for cleaning, modeling, and automation. Most analytics roles expect fluency in both.' },
      { q: 'How "big" is the big data in Big Data Analytics?', a: 'The Spark module works with datasets in the tens of millions of rows so you experience real distributed-processing constraints, not just toy CSV files.' },
      { q: 'I already know Excel well — is this course still useful?', a: 'Yes. Excel skills transfer directly into the SQL and Python modules, and the course goes well beyond what Excel alone can do (automation, statistical rigor, and scale).' }
    ]
  },
  'devops-automation': {
    title: 'DevOps Engineering & Automation',
    icon: Cpu,
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?q=80&w=1200&auto=format&fit=crop',
    description: 'Speed up software delivery with CI/CD pipelines, containerization, Kubernetes orchestration, infrastructure as code, and production monitoring.',
    duration: '12 Weeks',
    level: 'Intermediate',
    investment: '$2,600 (0% APR installment plans available over 6 or 12 months)',
    schedule: 'Wed & Fri, 6:30–9:00 PM EST, plus live incident-response and failover simulations',
    prerequisites: 'Solid command-line proficiency (Linux), a working understanding of how applications are built and run, and basic familiarity with Git.',
    overviewParagraph: 'DevOps closes the gap between "code that works on my machine" and "code running reliably in production." This program is built around the actual daily toolchain: containerize an application with Docker, orchestrate it with Kubernetes, automate its path to production with a CI/CD pipeline, and instrument it so you know within minutes when something breaks — because the ability to detect and roll back a bad deploy is as important as shipping the deploy in the first place.',
    tools: ['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'Terraform', 'Ansible', 'Prometheus & Grafana', 'NGINX'],
    curriculum: [
      'Containerization Fundamentals: Write efficient, secure multi-stage Dockerfiles and manage image layers, volumes, and networking.',
      'Kubernetes Orchestration: Deploy, scale, and update applications using Deployments, Services, and Ingress; debug failing pods under time pressure.',
      'Continuous Integration: Build automated test-and-build pipelines in GitHub Actions/Jenkins that gate merges on passing checks.',
      'Continuous Deployment: Implement blue-green and canary deployment strategies to ship changes with zero downtime.',
      'Infrastructure as Code: Provision cloud environments with Terraform and manage server configuration at scale with Ansible.',
      'Observability: Instrument applications with Prometheus metrics and build Grafana dashboards that catch problems before users report them.',
      'Networking & Load Balancing: Configure NGINX as a reverse proxy and load balancer, and set up TLS termination correctly.',
      'Security & Compliance in the Pipeline: Add automated dependency scanning, image vulnerability checks, and secrets management to your CI/CD flow.'
    ],
    outcomes: [
      'Build a CI/CD pipeline that automatically tests, builds, and deploys code to production on every merge.',
      'Deploy and operate a multi-service application on Kubernetes, including rolling updates and self-healing configuration.',
      'Provision and tear down cloud environments reproducibly using Terraform, with state managed safely.',
      'Diagnose a live production incident using metrics and logs, and execute a safe rollback.'
    ],
    careerPaths: ['DevOps Engineer', 'Site Reliability Engineer (SRE)', 'Platform Engineer', 'Release Engineer', 'Cloud Infrastructure Engineer'],
    certPrep: 'Strong preparation for the Certified Kubernetes Administrator (CKA) and HashiCorp Terraform Associate certifications.',
    faqs: [
      { q: 'Do I need cloud experience before starting?', a: 'Basic cloud exposure helps but is not required — core cloud concepts needed for the labs are introduced in week one.' },
      { q: 'Will I actually run Kubernetes clusters myself?', a: 'Yes — every student gets a personal cluster (via a managed sandbox) for the full duration of the course, not shared or simulated access.' },
      { q: 'How realistic are the incident-response simulations?', a: 'We inject real failures — a bad deploy, a resource leak, a misconfigured ingress — into a live environment and you have to find and fix it under time pressure, mirroring an on-call rotation.' }
    ]
  },
  'blockchain': {
    title: 'Blockchain & Web3 Engineering',
    icon: Layers,
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1200&auto=format&fit=crop',
    description: 'Design and deploy secure smart contracts and decentralized applications using Solidity, Ethereum tooling, and modern Layer-2 scaling solutions.',
    duration: '14 Weeks',
    level: 'Advanced',
    investment: '$3,100 (0% APR installment plans available over 6 or 12 months)',
    schedule: 'Mon & Thurs, 7:00–9:30 PM EST, plus live testnet deployment sessions',
    prerequisites: 'Strong programming fundamentals, comfort with asynchronous code and state management, and a working understanding of static typing (any typed language).',
    overviewParagraph: 'Smart contracts are unusual software: once deployed, mistakes are often permanent and can move real money. This program treats security as a first-class subject from day one, not an afterthought — you will write, test, and deploy Solidity smart contracts, connect them to real frontends via Web3 wallets, and specifically practice finding the vulnerability classes responsible for the largest exploits in blockchain history, in a safe testnet environment.',
    tools: ['Solidity', 'Hardhat', 'Foundry', 'OpenZeppelin Contracts', 'Ethers.js', 'MetaMask / WalletConnect', 'Ethereum & Layer-2 Testnets (Sepolia, Arbitrum)'],
    curriculum: [
      'Blockchain & Consensus Fundamentals: How block validation, consensus mechanisms, and cryptographic signatures actually secure a distributed ledger.',
      'Solidity Smart Contract Development: Write, compile, and deploy contracts covering state variables, modifiers, events, and inheritance.',
      'Token Standards: Implement ERC-20 fungible tokens and ERC-721/1155 NFTs correctly, including upgrade-safe patterns.',
      'Local Testing & Debugging: Use Hardhat/Foundry to write comprehensive test suites, simulate gas costs, and debug failed transactions.',
      'Frontend-to-Contract Integration: Connect a React frontend to deployed contracts via Ethers.js and wallet connectors (MetaMask).',
      'DeFi Mechanics: Build a basic decentralized exchange and staking contract to understand liquidity pools and automated market makers.',
      'Layer-2 & Scaling: Deploy the same contract to an Ethereum Layer-2 (Arbitrum or Optimism) and compare gas costs and finality tradeoffs.',
      'Smart Contract Security Auditing: Identify and fix reentrancy, integer overflow, and access-control vulnerabilities using known exploit case studies.'
    ],
    outcomes: [
      'Write, test, and deploy a secure smart contract to a live public testnet.',
      'Build a complete dApp frontend that reads from and writes to a smart contract via a connected wallet.',
      'Conduct a manual security review of a contract and identify common vulnerability classes before deployment.',
      'Compare gas costs and deployment tradeoffs across Ethereum mainnet and Layer-2 networks.'
    ],
    careerPaths: ['Smart Contract Developer', 'Blockchain Engineer', 'Web3 Frontend Developer', 'Smart Contract Security Auditor (Junior)'],
    certPrep: 'No dominant vendor certification exists in this field; hiring is driven by an on-chain portfolio of deployed, verifiable contracts, which the capstone project produces.',
    faqs: [
      { q: 'Will I use real cryptocurrency or real money?', a: 'No — all development and deployment happens on public testnets using free test tokens. No real funds are required or put at risk.' },
      { q: 'Is this only about Ethereum?', a: 'Ethereum and its tooling are the primary teaching environment since most concepts transfer directly to other EVM-compatible chains, which we cover in the Layer-2 module.' },
      { q: 'How seriously is security actually covered?', a: 'Very — an entire module is dedicated to walking through real historical exploits (reentrancy, oracle manipulation, access-control bugs) and practicing the audit techniques that would have caught them.' }
    ]
  }
};

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE RENDER
═══════════════════════════════════════════════════════════════ */
export default function SkillDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const skill = skillsData[resolvedParams.slug];

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '22%']);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 1.04]);

  if (!skill) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFB]">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">Course Not Found</h1>
          <p className="text-sm text-gray-500 max-w-sm">We couldn't find a program matching that link. Please check the URL or browse our full course catalog.</p>
        </div>
      </div>
    );
  }

  const Icon = skill.icon;

  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="overflow-x-hidden bg-white selection:bg-[#8C1B2E] selection:text-white antialiased">
        
        {/* ╔══════════════════════════════════════════════════╗
            ║  HERO SECTION                                   ║
            ╚══════════════════════════════════════════════════╝ */}
        <motion.section
          ref={heroRef}
          className="relative overflow-hidden bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white"
          style={{ minHeight: '580px' }}
        >
          {/* Grid overlay */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
              backgroundSize: '56px 56px',
            }}
            animate={{ backgroundPosition: ['0px 0px', '56px 56px'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Glowing Ambient Orbs */}
          {[
            { cls: '-top-20 -right-20 w-[400px] h-[400px]', dur: 14, delay: 0 },
            { cls: '-bottom-14 -left-14 w-64 h-64', dur: 11, delay: 1.5 },
            { cls: 'top-1/2 left-1/4 w-44 h-44', dur: 9, delay: 3 },
          ].map((orb, i) => (
            <motion.div
              key={i}
              aria-hidden
              className={`absolute rounded-full bg-white/5 ${orb.cls}`}
              animate={{ scale: [1, 1.1, 1], rotate: [0, 8, 0], y: [0, -14, 0] }}
              transition={{ duration: orb.dur, repeat: Infinity, ease: 'easeInOut', delay: orb.delay }}
            />
          ))}

          <Particles />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center pt-32 pb-20 sm:pb-24"
          >
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-xs font-medium mb-6 tracking-wide text-center"
            >
              <Icon className="w-4 h-4 text-white/90 shrink-0" />
              <span>Career-Track Specialization Program</span>
            </motion.div>

            <div className="perspective-[800px] mt-2 mb-6">
              <AnimatedTitle
                text={skill.title}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight block max-w-5xl"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="text-lg sm:text-xl text-white/80 max-w-3xl font-light mb-12 px-2 leading-relaxed"
            >
              {skill.description}
            </motion.p>

            {/* Horizontal Info Row */}
            <motion.div 
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 max-w-4xl w-full text-left"
            >
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold flex items-center gap-1.5"><Clock className="w-3 h-3" /> Duration</p>
                <span className="font-extrabold text-sm md:text-base block">{skill.duration}</span>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-6">
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold flex items-center gap-1.5"><BarChart className="w-3 h-3" /> Skill Level</p>
                <span className="font-extrabold text-sm md:text-base block">{skill.level}</span>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-6">
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold flex items-center gap-1.5"><Calendar className="w-3 h-3" /> Schedule</p>
                <span className="font-bold text-xs md:text-sm block line-clamp-1">{skill.schedule.split(',')[0]}</span>
              </div>
              <div className="space-y-1 border-l border-white/10 pl-6">
                <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Tuition</p>
                <span className="font-bold text-xs md:text-sm block line-clamp-1">{skill.investment.split('(')[0]}</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  CONTENT DEEP-DIVE & SIDE PANEL                 ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
              
              {/* Main Structural Narrative (65%) */}
              <div className="lg:col-span-2 space-y-12">
                <motion.div 
                  variants={stagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-6"
                >
                  <SectionLabel>Program Overview</SectionLabel>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A]">What You'll Actually Learn</h2>
                  
                  <motion.div variants={fadeUp} className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                    <Image 
                      src={skill.imageUrl} 
                      alt={skill.title}
                      fill
                      sizes="(max-w-768px) 100vw, 65vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/30 via-transparent to-transparent" />
                  </motion.div>

                  <motion.p variants={fadeUp} className="text-gray-700 text-lg leading-relaxed font-light pt-2">
                    {skill.overviewParagraph}
                  </motion.p>
                </motion.div>

                {/* Tools & Technologies */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-5"
                >
                  <SectionLabel>Hands-On Toolkit</SectionLabel>
                  <h3 className="text-2xl font-extrabold text-[#1A1A1A]">Tools & Technologies You'll Use</h3>
                  <div className="flex flex-wrap gap-3">
                    {skill.tools.map((tool: string, i: number) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#EEEFF1] border-2 border-[#C0C5CE]/70 rounded-full text-xs font-bold text-[#1A1A1A]"
                      >
                        <Wrench className="w-3 h-3 text-[#8C1B2E]" />
                        {tool}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Sandbox Info Card Container */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-[#EEEFF1] rounded-2xl border-2 border-[#C0C5CE]/70 p-8 flex flex-col sm:flex-row gap-5 items-start"
                >
                  <div className="p-4 bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] text-white rounded-xl shadow-md shrink-0">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-[#1A1A1A]">Live Sandbox Environment Included</h4>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">Every student gets a dedicated cloud sandbox and staging environment for the full length of the program, so you're working with real infrastructure and real tools from day one — no local setup headaches, no shared or simulated access.</p>
                  </div>
                </motion.div>

                {/* Pipeline Registration Sequence */}
                <div className="space-y-6">
                  <SectionLabel>Admissions Process</SectionLabel>
                  <h3 className="text-2xl font-extrabold text-[#1A1A1A]">How Enrollment Works</h3>
                  
                  <motion.div 
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {[
                      { step: '01', title: 'Submit Your Application', desc: 'Fill out a short application with your background and goals — no formal transcripts or test scores required.' },
                      { step: '02', title: 'Schedule a Fit Call', desc: 'An admissions advisor walks through the prerequisites with you and confirms the cohort schedule works for your calendar.' },
                      { step: '03', title: 'Get Your Sandbox Set Up', desc: 'We send pre-work and configure your accounts, tools, and sandbox environment before day one so class time isn\'t lost to setup.' },
                      { step: '04', title: 'Join Your Cohort', desc: 'Get access to live sessions, the student community, and all course materials as soon as your cohort officially kicks off.' }
                    ].map((item, idx) => (
                      <motion.div 
                        variants={scaleIn} 
                        custom={idx}
                        whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(140,27,46,0.06)' }}
                        key={idx} 
                        className="p-6 bg-[#EEEFF1] rounded-2xl border-2 border-[#C0C5CE]/70 relative overflow-hidden group transition-all duration-300"
                      >
                        <span className="absolute -top-2 -right-2 text-5xl font-black text-[#C0C5CE]/30 select-none group-hover:text-[#8C1B2E]/10 transition-colors duration-300">{item.step}</span>
                        <h5 className="font-bold text-sm text-[#1A1A1A] mb-1.5 relative z-10">{item.title}</h5>
                        <p className="text-xs text-gray-500 leading-relaxed font-light relative z-10">{item.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Sidebar Panel Logistics (35%) */}
              <div className="space-y-6 lg:sticky lg:top-28">
                <motion.div 
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="relative bg-[#EEEFF1] rounded-2xl border-2 border-[#C0C5CE]/70 p-8 overflow-hidden transition-all duration-300"
                >
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-[3px] bg-[#8C1B2E]"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-6">Cohort Details</h3>
                  
                  <div className="space-y-5 text-sm">
                    <div className="pb-4 border-b border-[#C0C5CE]/50">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Tuition</span>
                      <p className="text-sm font-bold text-[#8C1B2E] mt-1">{skill.investment}</p>
                    </div>
                    <div className="pb-4 border-b border-[#C0C5CE]/50">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Live Class Times</span>
                      <p className="text-sm font-medium text-gray-700 mt-1 leading-relaxed">{skill.schedule}</p>
                    </div>
                    <div className="pb-4 border-b border-[#C0C5CE]/50">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Prerequisites</span>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{skill.prerequisites}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Enrollment Window</span>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">New cohorts start every 4 weeks. Seats are confirmed on a first-come basis once prerequisites are verified.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Career Paths Panel */}
                <motion.div 
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="relative bg-[#EEEFF1] rounded-2xl border-2 border-[#C0C5CE]/70 p-8 overflow-hidden transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-[#8C1B2E]" />
                    <h4 className="text-sm font-extrabold text-[#1A1A1A] uppercase tracking-widest">Roles You'll Be Ready For</h4>
                  </div>
                  <ul className="space-y-2.5">
                    {skill.careerPaths.map((role: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                        <ChevronRight className="w-3.5 h-3.5 text-[#8C1B2E] shrink-0" />
                        {role}
                      </li>
                    ))}
                  </ul>
                  {skill.certPrep && (
                    <div className="mt-5 pt-5 border-t border-[#C0C5CE]/50 flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-[#8C1B2E] shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-500 leading-relaxed">{skill.certPrep}</p>
                    </div>
                  )}
                </motion.div>

                {/* Additional Informational Asset Box */}
                <motion.div 
                  className="bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] rounded-2xl p-8 text-white relative overflow-hidden shadow-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
                  <SectionLabel light>Cohort Format</SectionLabel>
                  <h4 className="text-xl font-extrabold mb-2">Small, Live, Instructor-Led</h4>
                  <p className="text-xs text-white/80 leading-relaxed">Every session is taught live by a practicing industry professional, with cohort sizes kept small enough for direct feedback on your work every week — not a pre-recorded video library.</p>
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  SYLLABUS ROADMAP MATRIX                         ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-[#F5F7FA] border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <SectionLabel>Curriculum</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A]">Week-by-Week Syllabus</h2>
              <motion.div
                className="mt-4 h-[3px] bg-[#8C1B2E] rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              />
            </div>

            <motion.div 
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skill.curriculum.map((item: string, i: number) => (
                <motion.div 
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(140,27,46,0.08)' }}
                  key={i}
                  className="bg-[#EEEFF1] p-6 rounded-2xl border-2 border-[#C0C5CE]/70 hover:border-[#8C1B2E]/40 transition-all duration-300 flex gap-5 items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8C1B2E] to-[#B43A4E] text-white flex items-center justify-center text-xs font-black shrink-0 shadow-md">
                    W{String(i + 1).padStart(2, '0')}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[#1A1A1A] leading-snug tracking-tight">{item.split(':')[0]}</h4>
                    {item.split(':')[1] && (
                      <p className="text-xs text-gray-500 leading-relaxed font-light pt-0.5">{item.split(':')[1].trim()}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  OUTCOMES                                        ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <SectionLabel>By Graduation</SectionLabel>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#1A1A1A]">What You'll Be Able to Do</h2>
              <motion.div
                className="mt-4 h-[3px] bg-[#8C1B2E] rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
              />
            </div>
            <motion.div 
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto"
            >
              {skill.outcomes.map((outcome: string, i: number) => (
                <motion.div 
                  variants={scaleIn}
                  custom={i}
                  key={i} 
                  className="p-6 bg-[#EEEFF1] border-2 border-[#C0C5CE]/70 rounded-2xl flex items-start gap-4"
                >
                  <Target className="w-4 h-4 text-[#8C1B2E] shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 leading-relaxed font-medium">{outcome}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  VALUE SAFEGUARDS                               ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-[#F5F7FA] border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
              
              <div className="space-y-5">
                <SectionLabel>What's Included</SectionLabel>
                <h3 className="text-3xl font-extrabold text-[#1A1A1A] tracking-tight">Full Tuition Coverage</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Your tuition is fully transparent — every tool license, cloud sandbox credit, and lab environment listed on this page is included with no hidden add-on fees.
                </p>
                <div className="p-4 bg-white rounded-xl border border-[#C0C5CE]/60 flex items-start gap-3">
                  <HelpCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] font-medium text-gray-500 leading-relaxed">
                    Employer tuition reimbursement: our enrollment team can provide the documentation most companies require to process a tuition reimbursement or professional-development benefit claim.
                  </span>
                </div>
              </div>

              <motion.div 
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {[
                  { title: 'Verified Digital Certificate', desc: 'Earn a shareable, verifiable certificate of completion you can add to LinkedIn and your resume.' },
                  { title: '1:1 Mentor Office Hours', desc: 'Book weekly one-on-one time with an instructor to review your code, your designs, or your project architecture.' },
                  { title: 'Employer Portfolio Review', desc: 'Top capstone projects are shared with partner companies in our hiring network at graduation.' },
                  { title: 'Lifetime Materials Access', desc: 'Keep access to course recordings, code repositories, and updated materials long after you graduate.' }
                ].map((benefit, idx) => (
                  <motion.div 
                    variants={scaleIn}
                    custom={idx}
                    key={idx} 
                    className="p-6 bg-white border-2 border-[#C0C5CE]/70 rounded-2xl flex items-start gap-4 hover:border-[#8C1B2E]/40 transition-colors duration-300"
                  >
                    <CheckCircle className="w-4 h-4 text-[#8C1B2E] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <h5 className="font-bold text-sm text-[#1A1A1A] tracking-tight">{benefit.title}</h5>
                      <p className="text-xs text-gray-500 leading-relaxed font-light">{benefit.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  FAQ                                             ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <SectionLabel>Common Questions</SectionLabel>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A1A1A]">Frequently Asked Questions</h2>
            </div>
            <motion.div 
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {skill.faqs.map((faq: { q: string; a: string }, i: number) => (
                <motion.div 
                  variants={fadeUp}
                  custom={i}
                  key={i}
                  className="p-6 bg-[#EEEFF1] rounded-2xl border-2 border-[#C0C5CE]/70 flex gap-4 items-start"
                >
                  <FileText className="w-4 h-4 text-[#8C1B2E] shrink-0 mt-1" />
                  <div className="space-y-1.5">
                    <h5 className="font-bold text-sm text-[#1A1A1A]">{faq.q}</h5>
                    <p className="text-xs text-gray-600 leading-relaxed font-light">{faq.a}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ╔══════════════════════════════════════════════════╗
            ║  BASELINE ENTRANCE BANNER                       ║
            ╚══════════════════════════════════════════════════╝ */}
        <section className="bg-[#1A1A1A] text-white py-14 border-t-4 border-[#8C1B2E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-widest text-[#8C1B2E] flex items-center gap-2">
                <Users className="w-3.5 h-3.5" /> Prerequisites Before You Enroll
              </h4>
              <p className="text-sm text-neutral-400 max-w-5xl font-light leading-relaxed">{skill.prerequisites}</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
