'use client';

import React, { useRef, useState, use, useMemo } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  BookOpen,
  CheckCircle2,
  Star,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  AlertCircle,
  ChevronDown,
  Mail,
  Phone,
  Layers,
  FileSpreadsheet
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ═══════════════════════════════════════════════════════════════
   ANIMATION CONFIGURATIONS
═══════════════════════════════════════════════════════════════ */
const CUBIC_EASE = [0.22, 1, 0.36, 1] as const;

const componentFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: index * 0.1, ease: CUBIC_EASE },
  }),
};

const microStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ═══════════════════════════════════════════════════════════════
   SHARED INTERACTIVE SUB-COMPONENTS
═══════════════════════════════════════════════════════════════ */
function FloatingParticles() {
  const dynamicDots = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    horizontalPos: Math.random() * 100,
    verticalPos: Math.random() * 100,
    radius: Math.random() * 2 + 1,
    delayOffset: Math.random() * 5,
    animationDuration: Math.random() * 6 + 6,
  }));
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {dynamicDots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute rounded-full bg-white"
          style={{ 
            left: `${dot.horizontalPos}%`, 
            top: `${dot.verticalPos}%`, 
            width: dot.radius, 
            height: dot.radius, 
            opacity: 0 
          }}
          animate={{ opacity: [0, 0.3, 0], y: [0, -25, -50] }}
          transition={{ 
            duration: dot.animationDuration, 
            delay: dot.delayOffset, 
            repeat: Infinity, 
            ease: 'easeInOut' 
          }}
        />
      ))}
    </div>
  );
}

function PremiumSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: CUBIC_EASE }}
      className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase mb-4 text-[#8C1B2E]"
    >
      <span className="block w-6 h-[2px] rounded-full bg-[#8C1B2E]" />
      {children}
    </motion.span>
  );
}

function TypographyReveal({ text, className }: { text: string; className?: string }) {
  const wordsArray = text.split(' ');
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
    >
      {wordsArray.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: CUBIC_EASE } },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   UPDATED CATALOG DATA MAP WITH LOCALIZED PKR PRICING
═══════════════════════════════════════════════════════════════ */
const academicServicesMap: Record<string, any> = {
  'graphs-plotting': {
    title: 'Data Visualization & Graphs Plotting',
    shortTitle: 'Graphs & Plotting',
    pricePKR: 'PKR 8,500 - 25,000',
    priceDetail: 'Pricing scale varies based on data complexity, array sizes, and custom script configurations.',
    tagline: 'Transform raw data points into high-resolution, publication-ready figures and descriptive charts.',
    stats: [
      { label: 'Formatting', value: 'High-Res Vectors' },
      { label: 'Guidelines', value: 'APA / IEEE / Nature' },
      { label: 'Engines', value: 'MATLAB / R / Origin' },
      { label: 'Accuracy', value: '100% Exact' },
    ],
    longDescription: 'Our academic graphing service generates flawless, publication-standard figures directly from your raw dataset or regression summaries. We handle complex mapping tasks, custom scales, vector outputs, and formatting alignments matching top-tier international journals.',
    whoFor: 'Scholars, PhD candidates, and quantitative researchers who need to visualize scientific metrics flawlessly without compression artifacts.',
    provisions: [
      'High-resolution vector plot rendering (EPS, SVG, PDF, or TIFF formats).',
      'Advanced multi-axis, regression lines, error bars, and distribution histograms.',
      'Strict adherence to institutional formatting rules (APA, IEEE, Nature style guides).'
    ],
    guarantees: [
      'Mathematically exact representation of provided data metrics.',
      'No rasterized text elements—all text remains editable and crystal clear.',
      'Complete color palette adjustments optimized for both digital viewing and grayscale print.'
    ],
    milestones: [
      { phase: 'Dataset Architecture Review', focus: 'Analyzing outlier bounds, metric dimensions, and scale intervals across arrays.' },
      { phase: 'Vector Curve Calibration', focus: 'Configuring legends, custom line weights, confidence intervals, and plot axes.' },
      { phase: 'Final Render Validation', focus: 'Exporting assets into pristine, uncompressed formats matching specific publisher guidelines.' }
    ],
    advisor: {
      name: 'Dr. Amara Malik',
      role: 'Lead Data Analytics Consultant & Quantitative Engineer',
      quote: 'Clear data presentation is just as important as the math itself. High-fidelity visual communication helps reviewer panels instantly understand your evidence.'
    },
    faqs: [
      { q: 'What software platforms do you use for rendering plots?', a: 'We typically use high-performance scientific graphing suites including MATLAB, R (ggplot2), OriginPro, and Python (Matplotlib/Seaborn) depending on your needs.' },
      { q: 'Can you regenerate plots if my raw dataset changes?', a: 'Yes. Our automated plotting scripts can quickly adjust to minor dataset updates during revision rounds.' }
    ]
  },
  'research-paper-writing': {
    title: 'Full Research Paper Writing Support',
    shortTitle: 'Research Writing',
    pricePKR: 'PKR 45,000 - 120,000',
    priceDetail: 'Based on global indexing scope (Scopus, WoS), technical domain complexity, and targeted scope lengths.',
    tagline: 'Comprehensive manuscript preparation backed by sound empirical evidence and expert peer analysis.',
    stats: [
      { label: 'Originality', value: 'Turnitin Verified' },
      { label: 'Structure', value: 'IMRaD Standards' },
      { label: 'Citation', value: 'EndNote Managed' },
      { label: 'Sourcing', value: 'Scopus / WoS' },
    ],
    longDescription: 'Our academic team supports the holistic assembly of high-impact research manuscripts. From structural scoping to structural argument layout, we formulate comprehensive studies designed to withstand intense peer-review checkpoints.',
    whoFor: 'Scholars looking for structurally rigorous, end-to-end framework assembly matching high-impact indexing matrices.',
    provisions: [
      'Structured configuration matching standard Abstract, Introduction, Methods, Results, and Discussion (IMRaD) formats.',
      'Comprehensive in-text integration of up-to-date scientific references.',
      'Complete stylistic alignment spanning specialized fields (STEM, Social Sciences, Medicine).'
    ],
    guarantees: [
      'Strict index formatting guidelines alignment.',
      'Comprehensive literature scoping parameters with clear analytical flow.',
      'Zero unauthorized generative content fillers.'
    ],
    milestones: [
      { phase: 'Scope Definition', focus: 'Isolating the primary thesis thesis parameters and establishing core investigative queries.' },
      { phase: 'Draft Compilation', focus: 'Structuring successive chapter modules into standard technical academic prose.' },
      { phase: 'Refinement Polishing', focus: 'Reviewing vocabulary parameters, stylistic frameworks, and referencing accuracy.' }
    ],
    advisor: {
      name: 'Prof. Haris Kamal',
      role: 'Chief Academic Editor',
      quote: 'A scientific paper stands on its narrative clarity. We frame analytical outcomes dynamically to engage journal reviewers immediately.'
    },
    faqs: [
      { q: 'Do you cover specialized scientific domains?', a: 'Yes. Our writing collective spans technical domain experts across STEM, engineering, healthcare, and quantitative humanities frameworks.' }
    ]
  },
  'literature-review': {
    title: 'Literature Review Synthesis',
    shortTitle: 'Literature Review',
    pricePKR: 'PKR 25,000 - 55,000',
    priceDetail: 'Scaled according to historical timeframe requirements and systematic/PRISMA database depths.',
    tagline: 'Systematic, Scoping, and Meta-analysis literature configurations mapped directly to modern research gaps.',
    stats: [
      { label: 'Databases', value: 'PubMed / Scopus' },
      { label: 'Framework', value: 'PRISMA Compliant' },
      { label: 'Mapping', value: 'Thematic Matrix' },
      { label: 'Updates', value: 'Latest 3-5 Years' },
    ],
    longDescription: 'We replace descriptive summaries with critically structured thematic literature configurations. Our reviews trace historical timelines, contextual anomalies, and distinct method biases to ground your academic framework.',
    whoFor: 'Postgraduate scholars and doctoral candidates establishing foundational conceptual validity for upcoming thesis phases.',
    provisions: [
      'Methodical database extractions via complex targeted search syntax protocols.',
      'Structured synthesis tables detailing target variables across historical study parameters.',
      'Exhaustive thematic grouping uncovering critical operational gaps.'
    ],
    guarantees: [
      'Complete inclusion of high-quality peer-reviewed indices.',
      'Zero broken citations or inaccurate tracking records.',
      'Cohesive critical commentary balancing disparate study outcomes.'
    ],
    milestones: [
      { phase: 'Search Configuration', focus: 'Structuring boolean criteria strings across index directories.' },
      { phase: 'Extraction Layout', focus: 'Filtering specific text properties into descriptive thematic tables.' },
      { phase: 'Synthesis Generation', focus: 'Assembling critical comparative prose across established models.' }
    ],
    advisor: {
      name: 'Dr. Zainab Al-Mansoor',
      role: 'Director of Empirical Methodologies',
      quote: 'A powerful literature matrix moves beyond summary. It constructs an unassailable justification for your upcoming experiment designs.'
    },
    faqs: [
      { q: 'Can you design a PRISMA flowchart framework?', a: 'Yes, for systematic updates we build complete extraction documentation charts mapping exact target criteria parameters.' }
    ]
  },
  'graphical-abstract': {
    title: 'Scientific Graphical Abstracts',
    shortTitle: 'Graphical Abstract',
    pricePKR: 'PKR 12,000 - 30,000',
    priceDetail: 'Based on illustrative complexity, biological/mechanical asset demands, and layout layers.',
    tagline: 'Custom vector diagrams and biological flow configurations optimized for rapid editorial assessment.',
    stats: [
      { label: 'Resolution', value: '300+ DPI Print' },
      { label: 'Software', value: 'BioRender / AI' },
      { label: 'Formatting', value: 'RGB / CMYK' },
      { label: 'Delivery', value: 'Vector Source' },
    ],
    longDescription: 'Transform abstract technical theories into visual structural diagrams. We configure custom vector pathways, molecular flows, mechanical schematics, and clear systemic pathways that align smoothly with strict journal art instructions.',
    whoFor: 'Authors targeting publication in high-impact publishers (Elsevier, Springer, ACS, Wiley) requiring explicit graphic visual abstracts.',
    provisions: [
      'High-definition visualization models mapping experimental methodologies.',
      'Custom color configurations optimized across digital distributions and grayscale prints.',
      'Fully localized graphic text layers preserving clear legibility at compact dimensions.'
    ],
    guarantees: [
      '100% original layout architecture—no cookie-cutter shapes or clip-art paths.',
      'Vector output file exports facilitating localized textual changes dynamically.',
      'Rigorous accuracy checking verifying specialized molecular or mechanical interactions.'
    ],
    milestones: [
      { phase: 'Conceptual Sketching', focus: 'Drafting initial visual structural blueprints mapping technical mechanisms.' },
      { phase: 'Vector Layout Rendering', focus: 'Building vector illustrations using customized scale curves and clear labeling.' },
      { phase: 'Export Optimization', focus: 'Packing pristine multi-format outputs matching target publisher parameters.' }
    ],
    advisor: {
      name: 'Dr. Amara Malik',
      role: 'Lead Data Analytics Consultant & Quantitative Engineer',
      quote: 'A striking graphical summary lets review boards interpret your underlying research methodology in under thirty seconds.'
    },
    faqs: [
      { q: 'Are source files provided with the final vectors?', a: 'Yes, editable source layers (AI, EPS, or fully layered PDF) are standard inclusions in our delivery pipelines.' }
    ]
  },
  'assignment-coursework-help': {
    title: 'STEM & Business Coursework Solutions',
    shortTitle: 'Coursework Support',
    pricePKR: 'PKR 6,000 - 18,000',
    priceDetail: 'Depends on computational milestones, algorithmic program targets, and required deadlines.',
    tagline: 'Step-by-step problem path breakdowns aligning strictly with specialized assessment rubrics.',
    stats: [
      { label: 'Coverage', value: 'STEM / Business' },
      { label: 'Accuracy', value: 'Verified Key' },
      { label: 'Delivery', value: 'Step-by-Step' },
      { label: 'Code', value: 'Commented Source' },
    ],
    longDescription: 'Our academic network covers comprehensive guidance across algorithmic code assignments, mechanical equations, advanced financial models, and analytical business case briefs. We structure clear solution paths to support deep concept comprehension.',
    whoFor: 'Undergraduate and postgraduate students managing heavy coursework tracks requiring strict method transparency.',
    provisions: [
      'Exhaustive, step-by-step derivation pathways for complex computational metrics.',
      'Clean source documentation files featuring explicit annotations for programmatic deliverables.',
      'Structural text arguments aligned explicitly with stated rubric objectives.'
    ],
    guarantees: [
      'Comprehensive verification ensuring accurate math or operational models.',
      'Original textual framing satisfying institutional integrity tools.',
      'Clear layout mechanics showcasing fundamental principles.'
    ],
    milestones: [
      { phase: 'Rubric Analysis', focus: 'Deconstructing core assessment conditions and calculation objectives.' },
      { phase: 'Solution Execution', focus: 'Running verification loops or programming tests to confirm output parameters.' },
      { phase: 'Explanatory Documentation', focus: 'Drafting explicit transitional notes unpacking mathematical or case vectors.' }
    ],
    advisor: {
      name: 'Dr. Amara Malik',
      role: 'Lead Data Analytics Consultant',
      quote: 'True academic guidance provides actionable paths. We unpack difficult theories into modular, scannable solutions.'
    },
    faqs: [
      { q: 'Are source code sheets properly annotated?', a: 'Yes, every logic block or software command pipeline is clearly commented to track operational assumptions.' }
    ]
  },
  'thesis-dissertation-chapters': {
    title: 'Thesis & Dissertation Structural Support',
    shortTitle: 'Thesis Chapters',
    pricePKR: 'PKR 80,000 - 250,000',
    priceDetail: 'Offered via custom milestone billing milestones across dynamic Masters/PhD development requirements.',
    tagline: 'Comprehensive, multi-tier chapter assistance from concept declaration through oral defense parameters.',
    stats: [
      { label: 'Integration', value: 'Full Manuscript' },
      { label: 'Format', value: 'Custom University' },
      { label: 'Defense', value: 'Viva Alignment' },
      { label: 'Checking', value: 'Turnitin Clean' },
    ],
    longDescription: 'Manage complex multi-chapter research structures with ease. We support macro development across Introduction modules, Literature reviews, Methodology frameworks, Empirical outcomes, and final Theoretical Discussions.',
    whoFor: 'Master’s and PhD scholars executing longitudinal research projects that demand rigorous developmental consistency.',
    provisions: [
      'Progressive chapter development matching strict departmental formatting schemas.',
      'Dynamic variable linking ensuring logic cohesion from hypotheses to conclusions.',
      'Comprehensive reference synchronization using advanced bibliographic databases.'
    ],
    guarantees: [
      'Incremental phase reviews ensuring alignment with primary supervisory notes.',
      '100% human-crafted technical prose matching high academic registers.',
      'Rigorous methodological validation checking against structural errors.'
    ],
    milestones: [
      { phase: 'Proposal Configuration', focus: 'Structuring the initial framework, problem map, and conceptual scope definitions.' },
      { phase: 'Developmental Iterations', focus: 'Drafting core content modules across discrete chapter configurations.' },
      { phase: 'Global Harmonization', focus: 'Polishing macro transitions, reference matching, and formatting styles.' }
    ],
    advisor: {
      name: 'Dr. Zainab Al-Mansoor',
      role: 'Director of Review Panels',
      quote: 'A doctoral document is an integrated web of logic. Every variable mentioned in chapter one must align cleanly with the final data.'
    },
    faqs: [
      { q: 'Can you assist with minor feedback updates from my supervisor?', a: 'Yes, our model supports progressive tracking modifications as supervisor panels issue updates.' }
    ]
  },
  'journal-paper-editing': {
    title: 'Premium Journal Paper Editing',
    shortTitle: 'Manuscript Polishing',
    pricePKR: 'PKR 15,000 - 40,000',
    priceDetail: 'Calculated according to standard word counts, baseline grammar densities, and timeline urgency tiers.',
    tagline: 'Refine syntax structures, academic tone, and structural styling to meet top tier publication standards.',
    stats: [
      { label: 'Tone', value: 'Native English' },
      { label: 'Indexing', value: 'SCI / Scopus / WoS' },
      { label: 'Revisions', value: 'Unlimited Proof' },
      { label: 'Check', value: 'Clarity Enhanced' },
    ],
    longDescription: 'We help international researchers bridge language barriers. Our editing solutions clean awkward phrase configurations, improve structural paragraph progressions, track style syntax variants, and eliminate typos before submission.',
    whoFor: 'ESL researchers and global scholars looking to optimize the linguistic impact of their work for international journals.',
    provisions: [
      'Thorough linguistic and stylistic checking by professional academic proofreaders.',
      'Structural correction of passive phrase setups, redundant vocabulary, and transitions.',
      'Strict adherence to targeted journal formatting metrics (APA, Chicago, IEEE, Vancouver).'
    ],
    guarantees: [
      'Elimination of administrative rejections caused by linguistic errors.',
      'Completely manual sentence reshaping preserving original scientific meaning.',
      'Comprehensive feedback reporting pinpointing consistent syntax anomalies.'
    ],
    milestones: [
      { phase: 'Grammar Sweep', focus: 'Eliminating syntax irregularities, tense shifts, and typographic issues.' },
      { phase: 'Academic Shaping', focus: 'Modifying vocabulary selections to project an authoritative scholarly tone.' },
      { phase: 'Format Conformation', focus: 'Updating citations, headings, and visual margins to target style guidelines.' }
    ],
    advisor: {
      name: 'Prof. Haris Kamal',
      role: 'Chief Academic Editor',
      quote: 'Brilliant experiments can be overlooked if reviewers struggle with syntax. We make your intellectual findings clear and impactful.'
    },
    faqs: [
      { q: 'Do you track alterations explicitly?', a: 'Yes, all corrections are delivered using standard MS Word Track Changes tools so you review every update.' }
    ]
  },
  'data-analysis': {
    title: 'Advanced Statistical Data Processing',
    shortTitle: 'Data Analysis',
    pricePKR: 'PKR 20,000 - 65,000',
    priceDetail: 'Based on dataset volume size, software runtime environment choice, and complex multi-variable models.',
    tagline: 'Convert complex observational arrays into actionable empirical outcomes and structural equations.',
    stats: [
      { label: 'Environments', value: 'SPSS / R / SmartPLS' },
      { label: 'Validation', value: 'Assumption Matrices' },
      { label: 'Modeling', value: 'SEM / Mediation' },
      { label: 'Reporting', value: 'APA Compliant' },
    ],
    longDescription: 'Our quantitative data infrastructure analyzes raw datasets to generate verified calculations. We construct detailed inferential paths, variable matrices, covariance models, and diagnostic summaries.',
    whoFor: 'Quantitative scholars needing verified computational outputs accompanied by robust methodological reporting templates.',
    provisions: [
      'Comprehensive data filtering, missing field management, and distribution profiling.',
      'Multi-tiered predictive modeling configurations (ANOVA, HLM, AMOS Structural Path Modeling).',
      'Standard tabular output layout generation conforming directly to APA requirements.'
    ],
    guarantees: [
      '100% exact mathematical replication from source file metrics.',
      'Detailed textual interpretation explaining alternative outcomes.',
      'Safe file governance keeping operational records secure.'
    ],
    milestones: [
      { phase: 'Diagnostic Intake', focus: 'Running asset evaluation tests tracking normal data variations.' },
      { phase: 'Computational Pipeline', focus: 'Applying core test metrics to extract statistical significance indicators.' },
      { phase: 'Tabular Translation', focus: 'Assembling structural output models into final descriptive report formats.' }
    ],
    advisor: {
      name: 'Dr. Amara Malik',
      role: 'Lead Data Analytics Consultant',
      quote: 'Data reveals powerful insights when handled correctly. We systematically remove mathematical error to provide unassailable evidence.'
    },
    faqs: [
      { q: 'Are processing log scripts included in outputs?', a: 'Yes, original R code blocks or SPSS output files are consistently included for confirmation purposes.' }
    ]
  },
  'characterization-graphs': {
    title: 'Material Science Characterization Plots',
    shortTitle: 'Characterization Graphs',
    pricePKR: 'PKR 14,000 - 35,000',
    priceDetail: 'Determined by total sample numbers, spectral peaks requiring adjustment, and deconvolution processing iterations.',
    tagline: 'Expert processing of multi-format analytical instrument files into pristine publication layout formats.',
    stats: [
      { label: 'Instruments', value: 'XRD / SEM / FTIR / TEM' },
      { label: 'Peak Analysis', value: 'Deconvolution' },
      { label: 'Export', value: 'Origin Stack / Vector' },
      { label: 'Labels', value: 'Miller Indices' },
    ],
    longDescription: 'We refine raw instrument data strings (ASCII, CSV, DAT) into publication-ready figures. We specialize in stacked XRD patterns with index indicators, baseline-corrected FTIR spectra, deconvolution peak fits, and clear microscopy scale integration.',
    whoFor: 'Material scientists, chemists, and experimental physicists seeking top-quality visual evidence representations.',
    provisions: [
      'Advanced multi-curve stacking, offset adjustments, and baseline subtraction formatting.',
      'Peak fitting parameters, calculating precise FWHM metrics and Miller indices layout.',
      'High-definition image enhancement containing accurate microscale markers.'
    ],
    guarantees: [
      'Zero alteration of underlying experimental data values.',
      'Pristine, crisp vector tracking avoiding pixel distortion under zoom.',
      'Accurate notation markers verifying specific material phases.'
    ],
    milestones: [
      { phase: 'Raw Data Tuning', focus: 'Parsing instrument telemetry arrays and executing noise filtering passes.' },
      { phase: 'Curve Architecture', focus: 'Building stacked configurations, tracking phase reflections, and mapping baselines.' },
      { phase: 'Annotation Fitting', focus: 'Overlaying reference peak numbers and unit markers matching crystal matrices.' }
    ],
    advisor: {
      name: 'Dr. Amara Malik',
      role: 'Lead Data Analytics Consultant & Quantitative Engineer',
      quote: 'Clear materials data relies on exact peak plotting. Proper configuration isolates signal from instrument noise.'
    },
    faqs: [
      { q: 'Can you overlay reference card indicators?', a: 'Yes, we synchronize data streams directly with standard database properties (such as ICDD/COD profiles).' }
    ]
  },
  'research-proposal': {
    title: 'Strategic Research Proposal Engineering',
    shortTitle: 'Research Proposal',
    pricePKR: 'PKR 25,000 - 50,000',
    priceDetail: 'Varies by targeted funding agency guidelines, scholarship models, and regional grant complexities.',
    tagline: 'Develop persuasive grant and candidate declarations targeted directly at international funding parameters.',
    stats: [
      { label: 'Frameworks', value: 'CSC / HEC / PhD' },
      { label: 'Justification', value: 'Novelty Maps' },
      { label: 'Budgeting', value: 'Milestone Timelines' },
      { label: 'Feasibility', value: 'Risk Assessment' },
    ],
    longDescription: 'A research proposal must prove both novelty and execution feasibility. We help configure structured investigative outlines, explicit tracking schedules, resource distribution tables, and clear outcome projections.',
    whoFor: 'Scholars applying for international scholarship allocations (CSC, HEC) or competitive institutional doctoral tracks.',
    provisions: [
      'Clear formulation of the foundational problem map and objective metrics.',
      'Comprehensive methodological outlines demonstrating clear environmental path handling.',
      'Gantt chart configurations detailing clear operational schedules over multi-year bounds.'
    ],
    guarantees: [
      'Strong formatting relevance matching specified grant agency patterns.',
      'Highly persuasive highlighting of practical project novelties.',
      'Strict reference matching demonstrating early state-of-the-art mastery.'
    ],
    milestones: [
      { phase: 'Concept Alignment', focus: 'Structuring core objectives relative to current funding priorities.' },
      { phase: 'Method Mapping', focus: 'Documenting localized research steps and infrastructure requirements.' },
      { phase: 'Impact Refinement', focus: 'Polishing abstract definitions and highlight parameters to capture fast selections.' }
    ],
    advisor: {
      name: 'Dr. Zainab Al-Mansoor',
      role: 'Director of Empirical Methodologies',
      quote: 'Review panels focus on project viability. A proposal must prove its questions are vital and its methods achievable.'
    },
    faqs: [
      { q: 'Do you help build milestone task charts?', a: 'Yes, structured progression schedules and Gantt data flows are provided within our framework packages.' }
    ]
  },
  'ppt-presentation': {
    title: 'Academic Defense & Conference PPT Presentation Design',
    shortTitle: 'PPT Presentation',
    pricePKR: 'PKR 10,000 - 25,000',
    priceDetail: 'Determined based on absolute slide count metrics and required speech note content mapping.',
    tagline: 'High-impact slide decks tailored specifically to withstand intense viva panel cross-examinations.',
    stats: [
      { label: 'Software', value: 'PowerPoint / Keynote' },
      { label: 'Structure', value: 'Slide Script Notes' },
      { label: 'Visuals', value: 'Infographic Layout' },
      { label: 'Pacing', value: '15-20 Min Target' },
    ],
    longDescription: 'Transform extensive written manuscripts into clean, professional visual presentations. We design custom slide layouts that emphasize your methodology, key data nodes, and contributions, avoiding walls of text.',
    whoFor: 'Graduating students preparing for final thesis defenses, viva presentations, or international research conferences.',
    provisions: [
      'Visually engaging layouts that prioritize critical outcomes over dense paragraphs.',
      'Custom infographics mapping data flows, sample sizes, and framework components.',
      'Comprehensive presenter speech notes integrated beneath individual slides.'
    ],
    guarantees: [
      'Seamless structural flow from the introduction slide to the final conclusions.',
      '100% custom typography and design themes—no generic corporate templates.',
      'Fully editable layout assets permitting last-minute data adjustments.'
    ],
    milestones: [
      { phase: 'Content Condensation', focus: 'Isolating high-priority arguments from the larger manuscript.' },
      { phase: 'Visual Storyboarding', focus: 'Translating complex methods into clean, scannable diagrams and slide sequences.' },
      { phase: 'Speaker Sync', focus: 'Drafting presentation talking points to match typical timing constraints.' }
    ],
    advisor: {
      name: 'Prof. Haris Kamal',
      role: 'Chief Academic Editor & Literature Synthesizer',
      quote: 'Your presentation shouldn’t replicate your paper. It should highlight your core contributions clearly to spark engaging academic discussions.'
    },
    faqs: [
      { q: 'Can you match the design to my university guidelines?', a: 'Yes, we can apply your institution’s color schemes, logos, and formal styling requirements.' }
    ]
  },
  'plagiarism-removal': {
    title: 'Professional Plagiarism Removal & Paraphrasing',
    shortTitle: 'Plagiarism Removal',
    pricePKR: 'PKR 12,000 - 35,000',
    priceDetail: 'Scaled proportionally to index overlapping metrics and macro-document text volume.',
    tagline: 'Manual sentence restructuring to guarantee genuine original content indexes below strict institution limits.',
    stats: [
      { label: 'Target Metrics', value: '< 5% Turnitin Similarity' },
      { label: 'Approach', value: '100% Manual Rewrite' },
      { label: 'Integrity', value: 'Preserved Citations' },
      { label: 'Delivery', value: 'Before/After Comparison' },
    ],
    longDescription: 'Avoid the traps of automated rewriting tools that corrupt technical terms. Our service features manual re-phrasing of overlapping text to maintain technical accuracy while delivering a clean similarity score.',
    whoFor: 'Authors whose drafts display elevated similarity reports due to shared standard methods or formulaic blocks.',
    provisions: [
      'Sentence-by-sentence manual restructuring to eliminate structural similarities.',
      'Accurate protection of technical keywords, mathematical notations, and data points.',
      'Comprehensive verification using official Turnitin assessment passes.'
    ],
    guarantees: [
      'No AI-generated text additions or robotic phrasing anomalies.',
      'Full retention of original academic meanings and source citations.',
      'Final similarity score guaranteed to satisfy your target institution’s boundaries.'
    ],
    milestones: [
      { phase: 'Report Assessment', focus: 'Pinpointing overlapping text blocks from your similarity baseline document.' },
      { phase: 'Manual Reshaping', focus: 'Rewriting text structures to alter grammatical patterns while keeping the core meaning.' },
      { phase: 'Verification Audit', focus: 'Running post-rewrite scanning checks to confirm compliance.' }
    ],
    advisor: {
      name: 'Dr. Zainab Al-Mansoor',
      role: 'Director of Empirical Methodologies & Review Panels',
      quote: 'Relying on software spinners often compromises meaning. True clarity requires careful, expert manual editing.'
    },
    faqs: [
      { q: 'Will my citation tags change during editing?', a: 'No, all source links and references remain firmly connected to their corresponding arguments.' }
    ]
  }
};

interface DynamicPageProps {
  params: Promise<{ id: string }>;
}

export default function AcademicServiceDetailView({ params }: DynamicPageProps) {
  const resolvedParams = use(params);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const heroScrollRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({ target: heroScrollRef, offset: ['start start', 'end start'] });

  const customScaleProgress = useSpring(scrollYProgress, { stiffness: 220, damping: 32 });
  const animatedHeroY = useTransform(heroProgress, [0, 1], ['0%', '15%']);
  const animatedHeroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);

  const rawSlug = resolvedParams.id;
  const normalizedSlug = useMemo(() => {
    return rawSlug ? rawSlug.replace(/^-+|-+$/g, '').toLowerCase() : '';
  }, [rawSlug]);

  const targetService = academicServicesMap[normalizedSlug];

  if (!targetService) {
    return (
      <>
        <Navbar />
        <div className="min-h-[65vh] bg-[#F4F5F6] flex flex-col items-center justify-center text-center px-4">
          <div className="p-4 bg-[#8C1B2E]/10 rounded-full mb-4 border border-[#8C1B2E]/20 animate-bounce">
            <AlertCircle className="w-12 h-12 text-[#8C1B2E]" />
          </div>
          <h1 className="font-heading text-2xl font-black text-[#1A1A1A] mb-2 tracking-tight">Academic Asset Not Found</h1>
          <p className="text-sm text-[#1A1A1A]/60 mb-6 max-w-sm font-medium">
            The specific scientific writing module you requested is missing. Check our complete catalog index.
          </p>
          <Link href="/services">
            <button className="bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider hover:shadow-lg transition-all border border-[#B43A4E]">
              View All Academic Solutions
            </button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* Top Premium Theme Line Scroll Bar Tracking */}
      <motion.div className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#8C1B2E] to-[#B43A4E] origin-left z-[999]" style={{ scaleX: customScaleProgress }} />
      <Navbar />

      <main className="bg-white min-h-screen text-[#1A1A1A] antialiased overflow-hidden selection:bg-[#8C1B2E]/20 selection:text-[#1A1A1A]">

        {/* HERO GRADIENT BACKGROUND (MATCHED CRIMSON IMAGE) */}
        <motion.section
          ref={heroScrollRef}
          className="relative overflow-hidden bg-gradient-to-br from-[#B43A4E] via-[#A12C3F] to-[#8C1B2E] text-white pt-24 pb-20 md:pt-32 md:pb-28 border-b-4 border-[#8C1B2E]"
        >
          {/* Grid Pattern Overlay matching the reference screenshot */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)',
              backgroundSize: '45px 45px',
            }}
          />
          
          {/* Decorative Subtle Lighting Glows */}
          <motion.div
            aria-hidden
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-black/10 blur-2xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />

          <FloatingParticles />

          <motion.div
            style={{ y: animatedHeroY, opacity: animatedHeroOpacity }}
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-6"
          >
            {/* Nav Path */}
            <div className="flex items-center gap-2 text-xs text-white/70 flex-wrap font-medium">
              <Link href="/" className="hover:text-white transition-colors">Portal</Link>
              <ChevronRight className="w-3 h-3 text-white/50" />
              <Link href="/#Academic-Support" className="hover:text-white transition-colors">Research Systems</Link>
              <ChevronRight className="w-3 h-3 text-white/50" />
              <span className="text-white font-bold underline decoration-white/30 underline-offset-4">{targetService.shortTitle}</span>
            </div>

            <Link href="/#Academic-Support">
              <motion.div
                whileHover={{ x: -4 }}
                className="inline-flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
                Return to Solutions Catalog
              </motion.div>
            </Link>

            <div className="max-w-4xl space-y-4">
              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
                <TypographyReveal text={targetService.title} />
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                <p className="text-sm sm:text-base md:text-lg text-white/90 font-light italic max-w-2xl leading-relaxed">
                  {targetService.tagline}
                </p>
                {/* Embedded dynamic fast-glance budget badge */}
                <div className="shrink-0 inline-flex bg-white/20 border border-white/30 px-3 py-1 rounded-lg text-xs font-black tracking-wide w-fit">
                  Est: {targetService.pricePKR}
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <motion.div
              variants={microStagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 max-w-3xl"
            >
              {targetService.stats.map((statItem: { label: string; value: string }, idx: number) => (
                <motion.div
                  key={idx}
                  variants={componentFadeUp}
                  custom={idx}
                  className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-xl px-4 py-3 border-l-4 border-l-white transition-all hover:bg-white/15"
                >
                  <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold mb-0.5">{statItem.label}</p>
                  <p className="text-sm font-black text-white tracking-wide">{statItem.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* EMBEDDED NOTIFICATION BANNER */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="bg-gradient-to-r from-[#8C1B2E] via-[#B43A4E] to-[#63101E] text-white p-4 rounded-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-bold border border-white/20">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-white shrink-0 animate-pulse" />
              <p className="text-xs sm:text-sm tracking-wide font-semibold">
                All structural inputs undergo strict data evaluation protocols prior to delivery.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10 shadow-inner tracking-wider uppercase">
              <Star className="w-3.5 h-3.5 fill-white text-white" /> Peer-Reviewed Compliance
            </div>
          </div>
        </section>

        {/* MAIN DOSSIER LAYOUT BLOCK */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-8">

              {/* Text Abstract */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={componentFadeUp}
                className="bg-[#EEEFF1] p-6 sm:p-8 rounded-2xl border-2 border-[#C0C5CE]/50 shadow-sm space-y-4"
              >
                <PremiumSectionLabel>Structural Overview</PremiumSectionLabel>
                <p className="text-sm sm:text-base text-[#1A1A1A] leading-relaxed font-semibold">
                  {targetService.longDescription}
                </p>
                <p className="text-xs sm:text-sm text-[#1A1A1A]/70 leading-relaxed pt-3 border-t border-[#C0C5CE]/70">
                  Our architectural approach preserves structural transparency. System configurations are fully adapted inside native academic tracking pipelines dynamically, eliminating design bottlenecks before the formal review defense takes place.
                </p>
              </motion.div>

              {/* Direct Provisions */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={componentFadeUp}
                className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-sm"
              >
                <PremiumSectionLabel>Core Analysis Components Included</PremiumSectionLabel>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {targetService.provisions.map((provisionText: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#F4F5F6] rounded-xl border-l-4 border-[#8C1B2E] hover:bg-[#EEEFF1] transition-colors group">
                      <CheckCircle2 className="w-5 h-5 text-[#8C1B2E] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-bold text-[#1A1A1A] leading-snug">{provisionText}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Guarantees Matrix */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={componentFadeUp}
                className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-sm space-y-4"
              >
                <PremiumSectionLabel>Academic Safeguards &amp; Procedures</PremiumSectionLabel>
                <div className="grid grid-cols-1 gap-2.5">
                  {targetService.guarantees.map((guaranteeText: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-[#F4F5F6] rounded-xl border border-[#C0C5CE]/40 hover:border-[#8C1B2E] transition-colors">
                      <div className="w-2 h-2 rounded-full bg-[#8C1B2E] shrink-0" />
                      <p className="text-xs sm:text-sm text-[#1A1A1A]/70 font-medium">{guaranteeText}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Operational Roadmap Stages */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={componentFadeUp}
                className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-sm space-y-4"
              >
                <PremiumSectionLabel>System Evaluation Milestones</PremiumSectionLabel>
                <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[15px] before:w-[2px] before:bg-[#F4F5F6]">
                  {targetService.milestones.map((milestoneItem: any, idx: number) => (
                    <div key={idx} className="relative pl-10 group">
                      <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#EEEFF1] border-2 border-[#8C1B2E]/40 flex items-center justify-center text-xs font-black text-[#8C1B2E] group-hover:bg-[#8C1B2E] group-hover:text-white group-hover:border-[#8C1B2E] transition-all duration-300">
                        {idx + 1}
                      </div>
                      <h4 className="font-heading font-extrabold text-sm sm:text-base text-[#1A1A1A] group-hover:text-[#8C1B2E] transition-colors pt-1">{milestoneItem.phase}</h4>
                      <p className="text-xs sm:text-sm text-[#1A1A1A]/60 mt-1 leading-relaxed font-medium">{milestoneItem.focus}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Right Side Sticky Panel / Actionable Forms Area */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              
              {/* ╔══════════════════════════════════════════════════╗
                  ║ NEW INVESTMENT & PKR ESTIMATES BREAKOUT BOX      ║
                  ╚══════════════════════════════════════════════════╝ */}
              <div className="bg-white p-6 rounded-2xl border-2 border-[#8C1B2E] shadow-lg space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#8C1B2E] text-white text-[9px] font-black tracking-widest px-2.5 py-1 rounded-bl-lg uppercase">
                  PKR Quotation
                </div>
                <p className="text-[10px] uppercase font-black text-[#8C1B2E] tracking-widest">Estimated Investment Range</p>
                <div className="text-2xl font-black text-[#1A1A1A] tracking-tight">
                  {targetService.pricePKR}
                </div>
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-medium pt-1 border-t border-[#F4F5F6]">
                  {targetService.priceDetail}
                </p>
                <div className="bg-[#F4F5F6] p-2.5 rounded-xl border border-[#C0C5CE]/30 text-[11px] text-[#1A1A1A]/60 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B43A4E] shrink-0 animate-pulse" />
                  Final adjustments determined upon project scoping.
                </div>
              </div>

              {/* Premium Service Desk Contact Module */}
              <div className="bg-[#EEEFF1] p-6 rounded-2xl shadow-md border border-[#C0C5CE] text-[#1A1A1A] space-y-5">
                <div>
                   <h3 className="font-heading font-black text-xl tracking-tight uppercase text-[#1A1A1A]">Research Craft Solution</h3>
                  <p className="text-[10px] text-[#1A1A1A]/60 font-black tracking-widest uppercase">Official Thesis Support Desk</p>
                </div>

                <div className="space-y-3 font-bold text-xs sm:text-sm">
                  <a href="mailto:hafsainstituteofinternationall@gmail.com" className="flex items-center gap-3 p-3 bg-white hover:bg-white rounded-xl transition-all shadow-sm border-2 border-transparent hover:border-[#8C1B2E]">
                    <Mail className="w-5 h-5 text-[#8C1B2E] shrink-0" />
                    <span className="truncate text-[#1A1A1A] font-bold">hafsainstituteofinternationall@gmail.com</span>
                  </a>
                  
                  <a href="https://wa.me/923147998354" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white hover:bg-white rounded-xl transition-all shadow-sm border-2 border-transparent hover:border-[#8C1B2E]">
                    <Phone className="w-5 h-5 text-[#B43A4E] shrink-0" />
                    <span className="text-[#1A1A1A] font-bold">+92 317 6497173</span>
                  </a>

                  {/* Safely Render Custom Inline Facebook SVG */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-[#C0C5CE]/60">
                    <svg className="w-5 h-5 text-[#8C1B2E] shrink-0 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
                    </svg>
                    <span className="text-[#1A1A1A] font-bold">Research craft solution</span>
                  </div>
                </div>

                <button className="w-full py-3.5 bg-[#8C1B2E] text-white font-black rounded-xl text-xs sm:text-sm tracking-widest uppercase hover:bg-[#63101E] transition-colors shadow-md border border-[#8C1B2E] active:scale-[0.98]">
                  Initiate Alignment Check
                </button>
              </div>

              {/* Advisor Spotlight */}
              <div className="bg-white p-6 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-sm space-y-3">
                <p className="text-[10px] uppercase font-black text-[#8C1B2E] tracking-widest">Lead Academic Reviewer</p>
                <h4 className="font-heading text-base font-black text-[#1A1A1A]">{targetService.advisor.name}</h4>
                <p className="text-xs text-[#1A1A1A]/60 font-bold -mt-1">{targetService.advisor.role}</p>
                <blockquote className="text-xs text-[#1A1A1A]/70 font-medium italic border-l-4 border-[#8C1B2E] pl-3 py-1 bg-[#F4F5F6] rounded-r-lg">
                  &ldquo;{targetService.advisor.quote}&rdquo;
                </blockquote>
              </div>

              {/* Direct Q&A Accordion */}
              <div className="bg-white p-6 rounded-2xl border-2 border-[#C0C5CE]/70 shadow-sm space-y-4">
                <PremiumSectionLabel>Technical Validation Q&amp;A</PremiumSectionLabel>
                <div className="space-y-2">
                  {targetService.faqs.map((faqItem: any, idx: number) => {
                    const isCurrentFaqOpen = openFaqIndex === idx;
                    return (
                      <div key={idx} className="border-b border-[#F4F5F6] pb-2.5 last:border-none last:pb-0">
                        <button
                          onClick={() => setOpenFaqIndex(isCurrentFaqOpen ? null : idx)}
                          className="w-full flex items-center justify-between text-left py-2 text-xs font-black text-[#1A1A1A] hover:text-[#8C1B2E] transition-colors gap-2"
                        >
                          <span>{faqItem.q}</span>
                          <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isCurrentFaqOpen ? 'rotate-180 text-[#8C1B2E]' : 'text-[#1A1A1A]/40'}`} />
                        </button>
                        
                        {isCurrentFaqOpen && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-xs text-[#1A1A1A]/70 font-medium leading-relaxed mt-1.5 bg-[#F4F5F6] p-3 rounded-lg border border-[#C0C5CE]/40"
                          >
                            {faqItem.a}
                          </motion.p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}