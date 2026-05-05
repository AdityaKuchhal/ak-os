import { skillCategories } from '@/data/skills';

const DIVIDER = '═'.repeat(35);

const HEADER_MAP: Record<string, string> = {
  'Languages': 'LANGUAGES',
  'Frameworks': 'FRAMEWORKS',
  'Testing': 'TESTING',
  'Cloud / DevOps': 'CLOUD & DEVOPS',
  'Databases': 'DATABASES',
  'AI / ML': 'AI/ML',
};

function Tag({ name }: { name: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        border: '1px solid var(--color-border)',
        padding: '2px 8px',
        margin: 2,
        fontFamily: 'var(--font-terminal)',
        color: 'var(--color-text)',
        fontSize: '0.9rem',
        borderRadius: 0,
      }}
    >
      {name}
    </span>
  );
}

export default function TechStack() {
  const totalSkills = skillCategories.reduce(
    (sum, cat) => sum + cat.skills.length,
    0
  );

  return (
    <div
      style={{
        fontFamily: 'var(--font-terminal)',
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        padding: 16,
        fontSize: '1rem',
        lineHeight: 1.7,
      }}
    >
      <div style={{ marginBottom: 4 }}>TECH_STACK.CFG</div>
      <div style={{ color: 'var(--color-border)', marginBottom: 16 }}>
        {DIVIDER}
      </div>

      {skillCategories.map((cat) => {
        const header = HEADER_MAP[cat.category] ?? cat.category.toUpperCase();
        return (
          <div key={cat.category} style={{ marginBottom: 16 }}>
            <div
              style={{
                color: 'var(--color-primary)',
                marginBottom: 6,
              }}
            >
              [{header}]
            </div>
            <div>
              {cat.skills.map((skill) => (
                <Tag key={skill.name} name={skill.name} />
              ))}
            </div>
          </div>
        );
      })}

      <div style={{ color: 'var(--color-border)', marginBottom: 8 }}>
        {DIVIDER}
      </div>
      <div style={{ color: 'var(--color-text-dim)', fontSize: '0.9rem' }}>
        [SYSTEM] {skillCategories.length} categories loaded.{' '}
        {totalSkills}+ technologies indexed.
      </div>
    </div>
  );
}
