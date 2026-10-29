'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { TerminalWindow } from '@/components/shared/TerminalWindow';

type Segment = { text: string; className?: string };
type Line = Segment[];

const SCENARIOS: { command: string; output: Line[] }[] = [
  {
    command: 'devops-hub query --category=all --verified',
    output: [
      [{ text: '✓ 8 Core Engineering Hubs synchronized', className: 'font-semibold text-emerald-400' }],
      [{ text: '✓ Production Reference Cheatsheets ready to deploy', className: 'text-zinc-300' }],
      [
        {
          text: 'CI/CD · Containers · Cloud · IaC · Security · Networking · Observability',
          className: 'text-xs text-zinc-500',
        },
      ],
    ],
  },
  {
    command: 'kubectl get cheatsheets --all-namespaces | head -5',
    output: [
      [
        { text: 'NAME', className: 'text-purple-400' },
        { text: '                        ' },
        { text: 'STATUS', className: 'text-cyan-400' },
        { text: '    ' },
        { text: 'CATEGORY', className: 'text-amber-400' },
      ],
      [
        { text: 'docker-engine-reference      ' },
        { text: 'Ready     ', className: 'text-emerald-400' },
        { text: 'Containerization' },
      ],
      [
        { text: 'k8s-pod-networking-guide     ' },
        { text: 'Ready     ', className: 'text-emerald-400' },
        { text: 'Containerization' },
      ],
      [
        { text: 'terraform-state-locking      ' },
        { text: 'Ready     ', className: 'text-emerald-400' },
        { text: 'Infrastructure' },
      ],
      [
        { text: 'github-actions-ci-matrix     ' },
        { text: 'Ready     ', className: 'text-emerald-400' },
        { text: 'CI/CD' },
      ],
    ],
  },
  {
    command: 'devops-hub open --tool docker --mode=cheatsheet',
    output: [
      [{ text: '✓ Resolved Docker Cheatsheet (Containerization)', className: 'font-semibold text-emerald-400' }],
      [{ text: '→ Syntax-highlighted sections · copy-ready blocks', className: 'text-zinc-300' }],
      [{ text: 'Tip: press ⌘K anywhere to jump between guides', className: 'text-xs text-zinc-500' }],
    ],
  },
];

const TYPE_SPEED_MS = 34;
const LINE_DELAY_MS = 380;
const SCENARIO_HOLD_MS = 4200;

/** Hero terminal that types commands and prints output on a loop. */
export function HeroTerminal() {
  const reduceMotion = useReducedMotion();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [typed, setTyped] = useState(0);
  const [shownLines, setShownLines] = useState(0);

  const scenario = SCENARIOS[scenarioIndex];

  useEffect(() => {
    if (reduceMotion) return;

    if (typed < scenario.command.length) {
      const timer = setTimeout(() => setTyped((count) => count + 1), TYPE_SPEED_MS);
      return () => clearTimeout(timer);
    }
    if (shownLines < scenario.output.length) {
      const timer = setTimeout(() => setShownLines((count) => count + 1), LINE_DELAY_MS);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setScenarioIndex((index) => (index + 1) % SCENARIOS.length);
      setTyped(0);
      setShownLines(0);
    }, SCENARIO_HOLD_MS);
    return () => clearTimeout(timer);
  }, [typed, shownLines, scenario, reduceMotion]);

  const command = reduceMotion ? scenario.command : scenario.command.slice(0, typed);
  const output = reduceMotion ? scenario.output : scenario.output.slice(0, shownLines);

  return (
    <TerminalWindow
      title="bash — devops-hub v1.1.0"
      statusRight={
        <span className="flex items-center gap-2 font-sans text-xs text-zinc-400">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          <span className="hidden sm:inline">connected: hub-cluster-prod</span>
        </span>
      }
      bodyClassName="space-y-3 overflow-x-auto text-xs leading-relaxed sm:text-sm"
    >
      <div className="flex items-center gap-2 text-cyan-400">
        <span className="select-none text-zinc-500">$</span>
        <span>{command}</span>
        <span aria-hidden className="animate-caret inline-block h-4 w-[7px] rounded-[1px] bg-cyan-400/80" />
      </div>
      <div className="space-y-1.5 border-l border-zinc-800 pl-4 text-zinc-400">
        {output.map((line, lineIndex) => (
          <p key={lineIndex}>
            {line.map((segment, segmentIndex) => (
              <span key={segmentIndex} className={segment.className}>
                {segment.text}
              </span>
            ))}
          </p>
        ))}
      </div>
    </TerminalWindow>
  );
}
