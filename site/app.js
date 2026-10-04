// Renders the curriculum. No framework and no build step: plain DOM calls.

const { languages, lessons, gitTrack, gitCheats, projects } = window.CURRICULUM;
const view = document.getElementById('view');

// ---------- small helpers ----------

// el('div', { class: 'x' }, child1, 'text', ...) builds a DOM node.
// Strings become text nodes, so content is never parsed as HTML.
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('on')) node.addEventListener(key.slice(2), value);
    else if (value === true) node.setAttribute(key, '');
    else if (value !== false && value != null) node.setAttribute(key, value);
  }
  node.append(...children.flat().filter((child) => child != null));
  return node;
}

// Progress and preferences are kept in the browser's localStorage.
const store = {
  read(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage can be unavailable (private windows); the site still works.
    }
  },
};

const done = new Set(store.read('done', []));
const total = lessons.length + gitTrack.length;

function setDone(id, isDone) {
  if (isDone) done.add(id);
  else done.delete(id);
  store.write('done', [...done]);
  renderProgress();
}

function renderProgress() {
  const count = [...done].filter(
    (id) => lessons.some((l) => `lesson:${l.id}` === id) || gitTrack.some((s) => `git:${s.id}` === id),
  ).length;
  document.getElementById('progress-fill').style.width = `${(count / total) * 100}%`;
  document.getElementById('progress-text').textContent = `${count} of ${total} steps done`;
}

function doneToggle(id, label) {
  const input = el('input', {
    type: 'checkbox',
    checked: done.has(id),
    onchange: (event) => {
      setDone(id, event.target.checked);
      render();
    },
  });
  return el('label', { class: 'done-toggle' }, input, label);
}

// ---------- lessons view ----------

const sourceCache = new Map();

async function loadSource(langId, lessonId) {
  const lang = languages.find((l) => l.id === langId);
  const path = `languages/${langId}/${lessonId}/${lang.file}`;
  if (!sourceCache.has(path)) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    sourceCache.set(path, await response.text());
  }
  return sourceCache.get(path);
}

function codePane(lesson, slot) {
  const chosen = store.read(`pane:${slot}`, slot === 0 ? 'javascript' : 'java');
  const lang = languages.find((l) => l.id === chosen) ?? languages[0];
  const number = lesson.id.slice(0, 2);

  const select = el(
    'select',
    {
      'aria-label': `Language for pane ${slot + 1}`,
      onchange: (event) => {
        store.write(`pane:${slot}`, event.target.value);
        render();
      },
    },
    languages.map((l) => el('option', { value: l.id, selected: l.id === lang.id }, l.name)),
  );

  const code = el('code', { class: `language-${lang.hl}` }, 'Loading…');
  loadSource(lang.id, lesson.id)
    .then((source) => {
      code.textContent = source;
      if (window.hljs) window.hljs.highlightElement(code);
    })
    .catch(() => {
      code.textContent =
        location.protocol === 'file:'
          ? 'Browsers block file loading on file:// pages.\nRun  .\\scripts\\serve.ps1  and open http://localhost:8000'
          : `Could not load languages/${lang.id}/${lesson.id}/${lang.file}`;
    });

  return el(
    'section',
    { class: 'pane' },
    el('div', { class: 'pane-head' }, select, el('span', { class: 'path' }, `languages/${lang.id}/${lesson.id}/${lang.file}`)),
    el('p', { class: 'notice' }, lesson.notice[lang.id]),
    el('pre', {}, code),
    el('div', { class: 'run' }, el('span', {}, 'Run it'), el('code', {}, `.\\scripts\\run.ps1 ${lang.id} ${number}`)),
  );
}

function lessonsView() {
  const currentId = store.read('lesson', lessons[0].id);
  const lesson = lessons.find((l) => l.id === currentId) ?? lessons[0];

  const list = el(
    'nav',
    { class: 'side', 'aria-label': 'Lessons' },
    lessons.map((l) =>
      el(
        'button',
        {
          class: l.id === lesson.id ? 'active' : '',
          onclick: () => {
            store.write('lesson', l.id);
            render();
          },
        },
        el('span', { class: 'tick' }, done.has(`lesson:${l.id}`) ? '✓' : l.id.slice(0, 2)),
        l.title,
      ),
    ),
  );

  const body = el(
    'article',
    { class: 'content' },
    el('h2', {}, lesson.title),
    el('p', { class: 'lead' }, lesson.summary),
    el('ul', { class: 'concepts' }, lesson.concepts.map((c) => el('li', {}, c))),
    el('div', { class: 'panes' }, codePane(lesson, 0), codePane(lesson, 1)),
    el('div', { class: 'challenge' }, el('h3', {}, 'Your turn'), el('p', {}, lesson.challenge)),
    doneToggle(`lesson:${lesson.id}`, 'I ran this in every language and did the challenge'),
  );

  return el('div', { class: 'split' }, list, body);
}

// ---------- git view ----------

function commandRow(command, description) {
  return el('tr', {}, el('td', {}, el('code', {}, command)), el('td', {}, description));
}

function gitView() {
  const steps = gitTrack.map((step, index) =>
    el(
      'section',
      { class: `step${done.has(`git:${step.id}`) ? ' is-done' : ''}` },
      el('h3', {}, `${index + 1}. ${step.title}`),
      el('p', {}, step.why),
      el('table', { class: 'commands' }, el('tbody', {}, step.commands.map(([c, d]) => commandRow(c, d)))),
      doneToggle(`git:${step.id}`, 'Done'),
    ),
  );

  const results = el('tbody');
  const fillCheats = (query) => {
    const needle = query.trim().toLowerCase();
    const rows = gitCheats.filter((row) => row.join(' ').toLowerCase().includes(needle));
    results.replaceChildren(
      ...(rows.length
        ? rows.map(([group, c, d]) => el('tr', {}, el('td', { class: 'group' }, group), el('td', {}, el('code', {}, c)), el('td', {}, d)))
        : [el('tr', {}, el('td', { colspan: 3, class: 'empty' }, `No command matches "${query}".`))]),
    );
  };
  fillCheats('');

  return el(
    'div',
    { class: 'content narrow' },
    el('h2', {}, 'Git, practised on this repository'),
    el('p', { class: 'lead' }, 'Work through the steps in order. Each one uses the lessons you are already writing as the thing to commit.'),
    steps,
    el('h2', {}, 'Cheat sheet'),
    el('input', {
      type: 'search',
      class: 'search',
      placeholder: 'Filter commands, e.g. undo, branch, stash',
      'aria-label': 'Filter git commands',
      oninput: (event) => fillCheats(event.target.value),
    }),
    el('div', { class: 'table-wrap' }, el('table', { class: 'commands cheats' }, results)),
  );
}

// ---------- projects view ----------

function projectsView() {
  return el(
    'div',
    { class: 'content narrow' },
    el('h2', {}, 'Portfolio projects'),
    el(
      'p',
      { class: 'lead' },
      'A ladder from small to full-stack. Build each on its own branch, merge it when it works, and link it from your GitHub profile.',
    ),
    el(
      'div',
      { class: 'cards' },
      projects.map((project, index) =>
        el(
          'section',
          { class: 'card' },
          el('span', { class: 'badge' }, `Step ${index + 1} · ${project.langs}`),
          el('h3', {}, project.title),
          el('p', {}, project.body),
        ),
      ),
    ),
  );
}

// ---------- routing ----------

const views = { lessons: lessonsView, git: gitView, projects: projectsView };

function currentView() {
  const name = location.hash.slice(1);
  return views[name] ? name : 'lessons';
}

function render() {
  const name = currentView();
  for (const tab of document.querySelectorAll('#tabs button')) {
    tab.setAttribute('aria-selected', String(tab.dataset.view === name));
  }
  view.replaceChildren(views[name]());
}

document.getElementById('tabs').addEventListener('click', (event) => {
  const tab = event.target.closest('button');
  if (tab) location.hash = tab.dataset.view;
});
window.addEventListener('hashchange', render);

renderProgress();
render();
