/*
  CONTENT ENGINE — reads plain .md files and renders cards + article pages.
  You never need to edit this file. It powers Projects (Controls, AI/Data)
  and Notes (IC Engine) the same way.

  HOW TO ADD A NEW ITEM (project or note):
  1. Create a new .md file inside the relevant "content" folder
     (e.g. controls/content/my-project.md)
  2. Add its filename (no .md) as a new line in that folder's list.txt
  3. Save. That's it — no HTML or JS editing.

  MARKDOWN FILE FORMAT:
  Every file starts with a metadata block between --- lines, then plain
  markdown content below. Example:

    ---
    title: My Project Title
    tagline: One sentence summary shown on the card.
    tech: Python, OpenCV, Raspberry Pi
    status: in-progress
    date: 2026-08-01
    ---

    ## Problem
    Write normally here. **Bold**, *italic*, tables, images all work.

    ## Approach
    ...

  Notes: `status` and `tech` are optional (used for projects, not needed for
  blog notes — just omit the line if not relevant).
*/

async function fetchText(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error('Failed to fetch ' + path);
  return res.text();
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    meta[key] = value;
  });
  return { meta, body: match[2].trim() };
}

async function fetchSlugList(listPath) {
  try {
    const text = await fetchText(listPath);
    return text.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'));
  } catch (e) {
    return [];
  }
}

function formatDate(d) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/*
  Renders a grid of cards into containerId.
  contentDir: e.g. "content"
  pageFile: e.g. "project.html" or "note.html" — the generic viewer page
  showStatus: true for projects (adds Completed/In Progress badge), false for notes
*/
async function renderContentGrid(containerId, contentDir, pageFile, showStatus) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const slugs = await fetchSlugList(`${contentDir}/list.txt`);

  if (slugs.length === 0) {
    container.innerHTML = `<div class="projects-placeholder">Nothing published yet — add a file to <code>${contentDir}/</code> and list it in <code>${contentDir}/list.txt</code>.</div>`;
    return;
  }

  const items = [];
  for (const slug of slugs) {
    try {
      const raw = await fetchText(`${contentDir}/${slug}.md`);
      const { meta } = parseFrontmatter(raw);
      items.push({ slug, ...meta });
    } catch (e) {
      console.warn('Could not load', slug, e);
    }
  }

  items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));

  const grid = document.createElement('div');
  grid.className = showStatus ? 'project-grid' : 'post-grid';

  items.forEach(item => {
    const techTags = (item.tech || '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
      .map(t => `<span class="tag">${t}</span>`)
      .join('');

    const card = document.createElement('a');
    card.href = `${pageFile}?p=${encodeURIComponent(item.slug)}`;

    if (showStatus) {
      const statusClass = item.status === 'in-progress' ? 'in-progress' : 'completed';
      const statusLabel = item.status === 'in-progress' ? 'In Progress' : 'Completed';
      card.className = 'project-card-link';
      card.innerHTML = `
        <div class="pc-top">
          <h3>${item.title || item.slug}</h3>
          <span class="status-badge ${statusClass}">${statusLabel}</span>
        </div>
        <p>${item.tagline || ''}</p>
        <div class="tag-cloud">${techTags}</div>
        <div class="pc-meta">
          <span>${formatDate(item.date)}</span>
          <span class="read">View project →</span>
        </div>
      `;
    } else {
      card.className = 'post-card';
      card.innerHTML = `
        <div class="post-cat">${item.category || ''}</div>
        <h3>${item.title || item.slug}</h3>
        <p>${item.tagline || item.excerpt || ''}</p>
        <div class="post-meta">
          <span>${formatDate(item.date)}</span>
          <span class="read">${item.readtime || 'Read →'}</span>
        </div>
      `;
    }
    grid.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(grid);
}

/*
  Renders a single article/project page into containerId, reading ?p=slug from the URL.
  contentDir: e.g. "content"
  showStatus: true to show the status banner (projects), false to skip (notes)
  backLinkHref / backLinkLabel: where the "back" link points
*/
async function renderContentArticle(containerId, contentDir, showStatus, backLinkHref, backLinkLabel) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get('p');

  if (!slug) {
    container.innerHTML = '<div class="no-results">No item specified.</div>';
    return;
  }

  let raw;
  try {
    raw = await fetchText(`${contentDir}/${slug}.md`);
  } catch (e) {
    container.innerHTML = `<div class="no-results">Could not find "${slug}". Check that <code>${contentDir}/${slug}.md</code> exists.</div>`;
    return;
  }

  const { meta, body } = parseFrontmatter(raw);
  document.title = `${meta.title || slug} — Nishant Tyagi`;

  const techTags = (meta.tech || '')
    .split(',').map(t => t.trim()).filter(Boolean)
    .map(t => `<span class="tag">${t}</span>`).join('');

  let statusHtml = '';
  if (showStatus) {
    const statusClass = meta.status === 'in-progress' ? 'in-progress' : 'completed';
    const statusLabel = meta.status === 'in-progress' ? 'In Progress' : 'Completed';
    statusHtml = `<div class="status-banner ${statusClass}"><span class="dot"></span>${statusLabel}</div>`;
  }

  let linksHtml = '';
  if (meta.github || meta.demo) {
    linksHtml = '<div class="pd-links">';
    if (meta.github) linksHtml += `<a href="${meta.github}" target="_blank" rel="noopener" class="primary">View Code →</a>`;
    if (meta.demo) linksHtml += `<a href="${meta.demo}" target="_blank" rel="noopener">Live Demo →</a>`;
    linksHtml += '</div>';
  }

  const bodyHtml = (typeof marked !== 'undefined') ? marked.parse(body) : `<pre>${body}</pre>`;

  container.innerHTML = `
    <header class="article-header">
      <a href="${backLinkHref}" class="back-link">← ${backLinkLabel}</a>
      ${statusHtml}
      <h1>${meta.title || slug}</h1>
      <div class="article-meta">
        ${meta.date ? `<span>${formatDate(meta.date)}</span>` : ''}
        ${meta.readtime ? `<span>${meta.readtime}</span>` : ''}
      </div>
      ${techTags ? `<div class="tag-cloud">${techTags}</div>` : ''}
      ${linksHtml}
    </header>
    <article class="post-body">
      ${bodyHtml}
    </article>
    <div class="article-footer">
      <a href="${backLinkHref}" class="back-link">← ${backLinkLabel}</a>
      <span>Nishant Tyagi</span>
    </div>
  `;
}
