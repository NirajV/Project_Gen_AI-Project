'use client'

const experiences = [
  {
    title: 'Application Developer Team Lead',
    company: 'Geisinger',
    duration: 'August 2021 - Present',
    location: 'Danville, Pennsylvania',
    highlights: [
      'Leading and managing large-scale IT programs and projects overseeing project managers',
      'Actively working on GHP Data Engineering platform for accurate data processing and analysis',
      'Supervising approximately 20 individuals to ensure alignment with company goals',
      'Leading ETL Group with technical direction and ETL design',
      'Collaborating on major projects: Medicaid Expansion, CHIP, CMS Interop, Informatica to IICS Migration, DBT Model Development',
      'Creating DBT SEEDS/Snapshots and Model jobs with advanced features like Macros and Deployment YML',
    ]
  },
  {
    title: 'Lead ETL Developer',
    company: 'Geisinger',
    duration: 'October 2019 - August 2021',
    location: 'Danville, Pennsylvania',
    highlights: [
      'Spearheaded design and development of enterprise and regulatory reporting analytics for COVID-19',
      'Optimized development time across analytics departments by designing enterprise data model',
      'Integrated clinical, billing, and claims data for comprehensive analysis',
      'Led data provider workflows for Cardiovascular Accident Machine Learning Project',
      'Demonstrated extensive experience with Hadoop tools including Sqoop, Hive, Spark SQL, HBase',
    ]
  },
  {
    title: 'ETL Developer Senior',
    company: 'Geisinger',
    duration: 'May 2013 - October 2019',
    location: 'Danville, PA',
    highlights: [
      'Designed and developed custom data ingestion pipeline for 100+ clinical and health plan data sources',
      'Achieved 50% reduction in nightly load times across HDFS zones',
      'Led seamless migration of EPIC Clarity to new platform ensuring uninterrupted data flow',
      'Worked on CDIS data warehouse migration from Informatica/Teradata to Hadoop',
      'Designed Cerner Inbound/Outbound data feed processing 100 GB daily',
    ]
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-slate-950 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-400">Experience</h2>
        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="border-l-4 border-blue-600 pl-6 py-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                <div>
                  <h3 className="text-2xl font-bold">{exp.title}</h3>
                  <p className="text-blue-400">{exp.company}</p>
                </div>
                <span className="text-slate-400 text-sm md:text-right">{exp.duration}</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">{exp.location}</p>
              <ul className="space-y-2 text-slate-300">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
