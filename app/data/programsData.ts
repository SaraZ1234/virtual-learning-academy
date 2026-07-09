// src/data/programsData.ts
import { BookOpen, Award, Zap, Users, type LucideIcon } from 'lucide-react';

export interface ScheduleSlot {
  session: string;
  time: string;
}

export interface SyllabusItem {
  week: string;
  title: string;
  desc: string;
}

export interface ProgramDetail {
  slug: string;
  title: string;
  tag: string;
  icon: LucideIcon;
  duration: string;
  skillLevel: string;
  scheduleLabel: string;
  tuition: string;
  description: string;
  tools: string[];
  sandboxIncluded: boolean;
  admissionsSteps: string[];
  cohortTimes: string;
  prerequisites: string;
  enrollmentWindow: string;
  roles: string[];
  syllabus: SyllabusItem[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
}

export const programsDetailed: ProgramDetail[] = [
  {
    slug: 'data-science-big-data-analytics',
    title: 'Data Science & Big Data Analytics',
    tag: 'Career-Track Specialization Program',
    icon: Zap,
    duration: '16 Weeks',
    skillLevel: 'Intermediate',
    scheduleLabel: 'Tues & Thurs',
    tuition: '$2,900',
    description: "Most business data is messy, incomplete, and scattered across systems before it can answer any question. This program teaches the full pipeline: pulling and cleaning data with SQL and Python, testing hypotheses correctly (including the pitfalls that lead to wrong conclusions), building predictive models, and — critically — communicating results to non-technical stakeholders who will make decisions based on your work.",
    tools: ['Python (Pandas, NumPy, scikit-learn)', 'SQL (PostgreSQL)', 'Tableau', 'Power BI', 'Apache Spark (intro)', 'Jupyter Notebooks', 'Excel (advanced)'],
    sandboxIncluded: true,
    admissionsSteps: [
      'Submit Your Application: Fill out a short application with your background and goals — no formal transcripts required.',
      'Schedule a Fit Call: An admissions advisor walks through the prerequisites with you and confirms the schedule.',
      'Get Your Sandbox Set Up: We send pre-work and configure your accounts, tools, and sandbox environment before day one.',
      'Join Your Cohort: Get access to live sessions, the student community, and all course materials immediately.'
    ],
    cohortTimes: 'Tues & Thurs, 7:00–9:30 PM EST, working with real-world business case datasets',
    prerequisites: 'Basic algebra, comfort with spreadsheet formulas, and beginner-level programming in any language (Python preferred but not required).',
    enrollmentWindow: 'New cohorts start every 4 weeks. Seats are confirmed on a first-come basis once prerequisites are verified.',
    roles: ['Data Analyst', 'Business Intelligence Analyst', 'Data Scientist (Junior)', 'Analytics Engineer', 'Reporting/Insights Analyst'],
    syllabus: [
      { week: 'W01', title: 'Statistics for Decision-Making', desc: 'Hypothesis testing, confidence intervals, A/B test design, and common mistakes.' },
      { week: 'W02', title: 'Data Wrangling & Cleaning', desc: 'Handle missing data, outliers, and inconsistent formats across multi-source systems.' },
      { week: 'W03', title: 'SQL for Analytics', desc: 'Write complex joins, window functions, and CTEs to extract data from databases efficiently.' },
      { week: 'W04', title: 'Dashboarding & Business Intelligence', desc: 'Build interactive, filterable dashboards in Tableau and Power BI that update dynamically.' },
      { week: 'W05', title: 'Distributed Data Processing', desc: 'Process datasets too large for a single machine using core Apache Spark concepts and PySpark.' },
      { week: 'W06', title: 'Predictive Modeling', desc: 'Build and validate regression and classification models, and choose the right evaluation metric.' },
      { week: 'W07', title: 'Data Pipeline Automation', desc: 'Build scheduled ETL jobs that pull, clean, and load data automatically using Python.' },
      { week: 'W08', title: 'Executive Communication', desc: 'Translate technical findings into a clear, decision-ready summary for stakeholders.' }
    ],
    outcomes: [
      'Convert raw, multi-source data into a clean, analysis-ready dataset using documented, repeatable steps.',
      'Design and correctly interpret an A/B test, including identifying when a result is not statistically meaningful.',
      'Build a live, interactive dashboard that a business team can use without touching the underlying code.',
      'Present technical findings to a non-technical audience in a way that leads to a clear decision.'
    ],
    faqs: [
      { q: 'Is this course more Python or more SQL?', a: 'Both are treated as first-class tools — SQL for extraction and aggregation, Python for cleaning, modeling, and automation.' },
      { q: 'How "big" is the big data in Big Data Analytics?', a: 'The Spark module works with datasets in the tens of millions of rows so you experience real distributed-processing constraints.' },
      { q: 'I already know Excel well — is this course still useful?', a: 'Yes. Excel skills transfer directly into the SQL and Python modules, and the course goes well beyond what Excel alone can do.' }
    ]
  },
  {
    slug: 'british-curriculum',
    title: 'British Curriculum (Pre-K to Grade 7)',
    tag: 'Academic Track',
    icon: BookOpen,
    duration: 'Full Year',
    skillLevel: 'Beginner to Intermediate',
    scheduleLabel: 'Sunday – Thursday',
    tuition: 'Contact Admissions',
    description: 'Complete British Curriculum education with standard Oxford and Cambridge textbooks, built entirely around interactive remote instruction.',
    tools: ['Oxford Textbooks', 'Cambridge Assessment Planners', 'Google Workspace for Education'],
    sandboxIncluded: false,
    admissionsSteps: ['Submit Request', 'Academic Assessment Eval', 'Class Placement Confirmation'],
    cohortTimes: 'Morning (09:00 AM - 12:00 PM KSA) & Evening (03:00 PM - 06:00 PM KSA)',
    prerequisites: 'Age-appropriate previous grade transcripts or basic assessments evaluation screening.',
    enrollmentWindow: 'Rolling admissions quarterly basis.',
    roles: ['Progressive Year Progression', 'Cambridge Primary Framework Match'],
    syllabus: [
      { week: 'M01', title: 'English Core Foundations', desc: 'Phonics, reading structures, conversational clarity and grammar setups.' },
      { week: 'M02', title: 'Mathematical Operations', desc: 'Core calculation matrices, fractional visualizations, and geometric primers.' }
    ],
    outcomes: ['Achieve benchmark fluency milestones outlined under Cambridge evaluation metrics.'],
    faqs: [{ q: 'Are standard materials provided?', a: 'Yes, digital guides and core curriculum textbooks are assigned upon verified registration.' }]
  }
];