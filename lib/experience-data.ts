export const SUBJECT = {
  first: 'ILHAM',
  last: 'SOBAR WIBAWA',
  full: 'ILHAM SOBAR WIBAWA',
  born: '27.09.2008',
  age: 18,
  prevAge: 17,
  target: 'ITB',
}

export const CONSTELLATION_NODES = [
  { id: 'curious', label: 'CURIOUS', line: 'Always asking what happens if...', x: 0.22, y: 0.30 },
  { id: 'builder', label: 'BUILDER', line: 'Prefers creating something over simply imagining it.', x: 0.46, y: 0.18 },
  { id: 'writer', label: 'WRITER', line: 'Some thoughts become clearer when written.', x: 0.70, y: 0.28 },
  { id: 'otaku', label: 'OTAKU', line: 'Fictional worlds that quietly became real to him.', x: 0.82, y: 0.52 },
  { id: 'creator', label: 'CREATOR', line: 'Turning raw material into something that never existed.', x: 0.62, y: 0.66 },
  { id: 'dreamer', label: 'DREAMER', line: "Still looking toward things that don't exist yet.", x: 0.34, y: 0.72 },
  { id: 'student', label: 'STUDENT', line: 'Learning is not a phase. It is a direction.', x: 0.16, y: 0.58 },
  { id: 'friend', label: 'FRIEND', line: 'Some people become part of your story.', x: 0.50, y: 0.46 },
  { id: 'human', label: 'HUMAN', line: 'More than the things he builds.', x: 0.30, y: 0.46 },
] as const

export const CONSTELLATION_LINKS: [string, string][] = [
  ['curious', 'builder'],
  ['builder', 'writer'],
  ['writer', 'otaku'],
  ['otaku', 'creator'],
  ['creator', 'dreamer'],
  ['dreamer', 'student'],
  ['student', 'human'],
  ['human', 'friend'],
  ['friend', 'builder'],
  ['human', 'curious'],
  ['friend', 'creator'],
]

export const PROFILE = {
  interests: ['TECH', 'ANIME', 'PERSONA', 'WRITING'],
  primaryMode: 'CREATE',
  secondaryMode: 'FEEL',
  status: 'BECOMING',
}

export const ARTIFACTS = [
  {
    id: '01',
    name: 'JARVIS',
    line: 'An AI project born from curiosity and imagination.',
    kind: 'core' as const,
  },
  {
    id: '02',
    name: 'SMARTWATCH',
    line: 'An old phone became the raw material for a new idea.',
    kind: 'watch' as const,
  },
  {
    id: '03',
    name: 'ZOOM GLASSES',
    line: 'An idea about seeing the world differently.',
    kind: 'lens' as const,
  },
  {
    id: '04',
    name: 'GENERATION WEBSITE',
    line: 'Building technology that can be useful to other people.',
    kind: 'browser' as const,
  },
]

export const WHAT_IFS = [
  'WHAT IF I BUILD AN AI?',
  'WHAT IF AN OLD PHONE BECOMES SOMETHING NEW?',
  'WHAT IF GLASSES COULD SEE DIFFERENTLY?',
  'WHAT IF AN IDEA ACTUALLY WORKS?',
  'WHAT IF THE IMPOSSIBLE IS ONLY UNFINISHED?',
]

export const JOURNAL_ENTRIES = [
  { id: '001', title: 'THINGS I STILL WANT TO BUILD.', body: 'A list that keeps growing faster than it shrinks. That is not a problem. That is the fuel.' },
  { id: '002', title: "THINGS I DON'T KNOW HOW TO SAY.", body: 'Some feelings arrive without vocabulary. They wait in the margins until the right night.' },
  { id: '003', title: "THINGS I'M AFRAID I WON'T ACHIEVE.", body: 'Fear is only proof that something matters. The distance is real, but so is the direction.' },
  { id: '004', title: 'THINGS WORTH REMEMBERING.', body: 'The small nights. The quiet wins. The people who stayed while an idea was still ugly.' },
  { id: '005', title: 'THINGS I WANT TO BECOME.', body: 'Not a finished version. A truer one. Someone who keeps building without going cold.' },
]

export const SMALL_THINGS = [
  { id: 'americano', label: 'AMERICANO', line: 'Simple. Strong. No need to explain itself.', x: 0.18, y: 0.30, r: 46 },
  { id: 'persona', label: 'PERSONA', line: 'Sometimes fictional worlds become real memories.', x: 0.72, y: 0.22, r: 58 },
  { id: 'anime', label: 'ANIME', line: 'Endings that stay with you longer than they should.', x: 0.86, y: 0.55, r: 40 },
  { id: 'journal', label: 'JOURNAL', line: 'Some thoughts deserve a place to stay.', x: 0.30, y: 0.64, r: 52 },
  { id: 'novel', label: 'NOVEL', line: 'A world you can hold in a hundred pages.', x: 0.55, y: 0.44, r: 44 },
  { id: 'coding', label: 'CODING', line: 'A language for turning maybe into yes.', x: 0.48, y: 0.78, r: 50 },
  { id: 'ai', label: 'AI', line: 'A mirror that occasionally surprises its maker.', x: 0.68, y: 0.72, r: 42 },
  { id: 'gadgets', label: 'GADGETS', line: 'Objects begging to be opened and understood.', x: 0.12, y: 0.52, r: 38 },
  { id: 'experiments', label: 'EXPERIMENTS', line: 'Most fail. The ones that do not are worth all of them.', x: 0.40, y: 0.20, r: 48 },
]

export const MEMORY_FRAGMENTS = [
  'For the curiosity that never seems to run out.',
  "For every 'what if?' that became a project.",
  'For every strange idea worth trying.',
  'For every night spent figuring something out.',
  'For every page that became a place to put your thoughts.',
  'For every fictional world that gave you somewhere to wander.',
  'For every failure that quietly taught you something.',
  'For every time you kept going while tired.',
  'For everything you managed to create from almost nothing.',
  'For the courage to be both logical and emotional.',
  'For allowing yourself to feel instead of hiding it.',
  'For the people who became part of your story.',
  'For the dreams that still feel impossibly far away.',
  'For the road leading toward ITB.',
  'For the person you are still becoming.',
  "For everything you haven't discovered about yourself yet.",
  'For the version of you that made it this far.',
  'For the version of you that begins today.',
]

export const SECRET_LINES = [
  'Hey, ham.',
  "It's your 18th.",
  "Don't rush to become someone else.",
  "You're still allowed to figure things out.",
  'Keep building.',
  'Keep writing.',
  'Keep feeling.',
  'And when the future feels unclear...',
  '...remember that unclear doesn\'t mean empty.',
]
