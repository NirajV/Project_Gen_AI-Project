'use client'

const skills = {
  'ETL & Data Integration': ['Informatica PowerCenter 7.1.1 - 10.5', 'IICS (Informatica Cloud)', 'Informatica IDQ', 'DBT (Data Build Tool)', 'Sqoop', 'Rhapsody Interface Engine'],
  'Data Warehousing': ['Snowflake', 'Teradata', 'Oracle DBMS', 'Netezza', 'DB2', 'Dimensional Modeling', 'EDW/ODS Architecture'],
  'Big Data & Query': ['Hadoop', 'HDFS', 'Hive SQL', 'Spark SQL', 'HBase', 'Query Optimization'],
  'EPIC Systems': ['EPIC Clarity', 'FACETS', 'EPIC Cadence'],
  'BI & Reporting': ['Tableau', 'Business Objects (BO)', 'Data Visualization'],
  'Data Modeling': ['Erwin', 'Microsoft Visio', 'Dimensional Schemas'],
  'Operating Systems': ['Unix', 'Linux', 'Windows'],
  'Project & Team Management': ['Project Management', 'Team Leadership', 'Agile', 'Account Management'],
  'DevOps & Version Control': ['Github', 'Jira', 'Azure DevOps'],
  'Core Skills': ['Query Writing', 'Analytical Solutions', 'VBA', 'Business Analysis', 'Resource Management'],
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-slate-900 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-400">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-400 mb-4">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm hover:bg-blue-600 transition cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
