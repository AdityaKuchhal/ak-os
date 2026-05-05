import { projects } from '@/data/projects';
import type { Project } from '@/types';

function ProjectCard({ project, isLast }: { project: Project; isLast: boolean }) {
  const isPlaceholder = project.placeholder === true;

  return (
    <>
      <div style={{ paddingBottom: 16 }}>
        {isPlaceholder ? (
          <>
            <div
              style={{
                fontFamily: 'var(--font-terminal)',
                color: 'var(--color-text-dim)',
                fontSize: '1rem',
                marginBottom: 4,
              }}
            >
              COMING_SOON.EXE
            </div>
            <div
              style={{
                fontFamily: 'var(--font-terminal)',
                color: 'var(--color-text-dim)',
                fontSize: '0.9rem',
              }}
            >
              [ COMING SOON ]
            </div>
          </>
        ) : (
          <>
            {/* Name */}
            <div
              style={{
                fontFamily: 'var(--font-terminal)',
                color: 'var(--color-primary)',
                fontSize: '1.05rem',
                marginBottom: 6,
              }}
            >
              {project.name}
            </div>

            {/* Stack tags */}
            {project.stack.length > 0 && (
              <div
                style={{
                  fontFamily: 'var(--font-terminal)',
                  color: 'var(--color-text-dim)',
                  fontSize: '0.85rem',
                  marginBottom: 8,
                }}
              >
                {project.stack.join(' · ')}
              </div>
            )}

            {/* Description */}
            <div
              style={{
                fontFamily: 'var(--font-terminal)',
                color: 'var(--color-text)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                marginBottom: 8,
              }}
            >
              {project.description}
            </div>

            {/* Outcome */}
            {project.outcomes && (
              <div
                style={{
                  fontFamily: 'var(--font-terminal)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  display: 'flex',
                  gap: 6,
                }}
              >
                <span style={{ color: 'var(--color-primary)', flexShrink: 0 }}>
                  &gt;
                </span>
                <span style={{ color: 'var(--color-text)' }}>
                  {project.outcomes}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {!isLast && (
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            marginBottom: 16,
          }}
        />
      )}
    </>
  );
}

export default function Projects() {
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
      <div style={{ marginBottom: 4 }}>PROJECTS.EXE</div>
      <div
        style={{
          borderTop: '1px solid var(--color-border)',
          marginBottom: 16,
        }}
      />
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          isLast={index === projects.length - 1}
        />
      ))}
    </div>
  );
}
