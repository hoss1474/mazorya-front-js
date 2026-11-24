(() => {
  'use strict';

  const STORAGE_KEY = 'mazorya.app.workspaces.v1';
  const SELECTED_KEY = 'mazorya.app.selected.v1';
  const MAX_WORKSPACES = 12;
  const $ = (selector) => document.querySelector(selector);

  const site = $('#site');
  const intro = $('#intro');
  const stage = $('#interactiveStage');
  const form = $('#workspaceForm');
  const formView = $('#formView');
  const savedView = $('#savedView');
  const nameInput = $('#workspaceName');
  const urlInput = $('#urlInput');
  const errorMsg = $('#errorMsg');
  const noticeMsg = $('#noticeMsg');
  const preview = $('#resolvedUrl');
  const workspaceList = $('#workspaceList');
  const selectionInfo = $('#selectionInfo');
  const openLink = $('#openPortalLink');
  const cancelAdd = $('#cancelAdd');
  const installButton = $('#installApp');

  let workspaces = readWorkspaces();
  let selectedId = readStorage(SELECTED_KEY);
  let deferredInstallPrompt = null;

  function readStorage(key) {
    try { return localStorage.getItem(key); }
    catch { return null; }
  }

  function store(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  // Never save credentials, query strings or URL fragments in this launcher.
  // A bare client domain follows Mazorya's conventional api.* /admin/login pattern.
  function normalizeWorkspaceUrl(input) {
    let text = String(input || '').trim();
    if (!text) throw new Error('Enter your client domain or panel URL.');
    if (text.startsWith('//') || /[\s\\\u0000-\u001F]/.test(text)) {
      throw new Error('Enter a URL without spaces or backslashes.');
    }

    if (!/^https?:\/\//i.test(text)) {
      if (/^[a-z][a-z\d+.-]*:/i.test(text)) {
        throw new Error('Only secure HTTPS dashboard addresses are supported.');
      }
      text = `https://${text}`;
    }

    let url;
    try { url = new URL(text); }
    catch { throw new Error('Invalid address. Check the domain and try again.'); }

    if (
      url.protocol !== 'https:' ||
      !url.hostname.includes('.') ||
      url.hostname.endsWith('.') ||
      url.username || url.password ||
      url.search || url.hash
    ) {
      throw new Error('Use a secure HTTPS address without credentials or URL parameters.');
    }

    if (url.pathname === '/') {
      const hostname = url.hostname.replace(/^www\./i, '');
      if (!/^(api|apii|panel|dashboard|admin)\./i.test(hostname)) {
        url.hostname = `api.${hostname}`;
      } else {
        url.hostname = hostname;
      }
      url.pathname = '/admin/login';
    }

    return url.href;
  }

  function readWorkspaces() {
    try {
      const value = JSON.parse(readStorage(STORAGE_KEY) || '[]');
      if (!Array.isArray(value)) return [];

      return value.filter((entry) => {
        if (!entry || typeof entry.id !== 'string' || typeof entry.url !== 'string') {
          return false;
        }
        try { return normalizeWorkspaceUrl(entry.url) === entry.url; }
        catch { return false; }
      }).slice(0, MAX_WORKSPACES).map((entry) => ({
        id: entry.id,
        name: String(entry.name || 'My Workspace').slice(0, 48),
        url: entry.url
      }));
    } catch { return []; }
  }

  function setError(message = '') {
    errorMsg.textContent = message;
  }

  function setNotice(message = '') {
    noticeMsg.textContent = message;
  }

  function setSelected(id) {
    selectedId = id;
    store(SELECTED_KEY, id);
    showSaved();
  }

  function showForm(isNew = false) {
    formView.hidden = false;
    savedView.hidden = true;
    cancelAdd.hidden = !isNew;
    setError();
    setNotice();
    preview.textContent = '';
    form.reset();
  }

  function showSaved() {
    if (!workspaces.length) { showForm(false); return; }
    if (!workspaces.some((item) => item.id === selectedId)) {
      selectedId = workspaces[0].id;
      store(SELECTED_KEY, selectedId);
    }

    formView.hidden = true;
    savedView.hidden = false;
    setError();
    setNotice();
    workspaceList.replaceChildren();

    workspaces.forEach((workspace) => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'workspace-choice';
      const isSelected = workspace.id === selectedId;
      item.classList.toggle('selected', isSelected);
      item.setAttribute('aria-pressed', String(isSelected));

      const icon = document.createElement('span');
      icon.className = 'choice-logo';
      icon.textContent = (workspace.name.trim().charAt(0) || 'M').toUpperCase();
      icon.setAttribute('aria-hidden', 'true');

      const copy = document.createElement('span');
      copy.className = 'choice-text';
      const title = document.createElement('strong');
      title.textContent = workspace.name;
      const domain = document.createElement('small');
      domain.textContent = new URL(workspace.url).hostname;
      copy.append(title, domain);

      const tick = document.createElement('span');
      tick.className = 'choice-check';
      tick.textContent = isSelected ? '✓' : '↗';
      tick.setAttribute('aria-hidden', 'true');
      item.append(icon, copy, tick);
      item.addEventListener('click', () => setSelected(workspace.id));
      workspaceList.append(item);
    });

    const selected = workspaces.find((item) => item.id === selectedId);
    if (selected) {
      // The user can inspect the exact destination before opening it.
      selectionInfo.textContent = selected.url;
      openLink.href = selected.url;
      openLink.setAttribute('aria-label', `Open ${selected.name}: ${selected.url}`);
    }
  }

  function generateId() {
    if (crypto?.randomUUID) return crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    setError();
    setNotice();

    let url;
    try { url = normalizeWorkspaceUrl(urlInput.value); }
    catch (error) { setError(error.message); urlInput.focus(); return; }

    if (workspaces.some((item) => item.url === url)) {
      setError('This dashboard is already saved. Select it from your workspaces.');
      return;
    }
    if (workspaces.length >= MAX_WORKSPACES) {
      setError(`You can save up to ${MAX_WORKSPACES} workspaces on this device.`);
      return;
    }

    const hostname = new URL(url).hostname.replace(/^(api|apii)\./i, '');
    const name = nameInput.value.trim().slice(0, 48) || hostname;
    const workspace = { id: generateId(), name, url };
    const updated = [...workspaces, workspace];
    if (!store(STORAGE_KEY, JSON.stringify(updated))) {
      setError('Unable to save on this device. Check browser storage settings.');
      return;
    }

    workspaces = updated;
    selectedId = workspace.id;
    store(SELECTED_KEY, selectedId);
    showSaved();
    setNotice('Saved on this device. Your login remains on the client website.');
  });

  urlInput.addEventListener('input', () => {
    setError();
    if (!urlInput.value.trim()) { preview.textContent = ''; return; }
    try { preview.textContent = `→ ${normalizeWorkspaceUrl(urlInput.value)}`; }
    catch { preview.textContent = ''; }
  });

  $('#addWorkspace').addEventListener('click', () => showForm(true));
  cancelAdd.addEventListener('click', showSaved);

  $('#removeWorkspace').addEventListener('click', () => {
    const selected = workspaces.find((item) => item.id === selectedId);
    if (!selected) return;
    if (!window.confirm(`Remove "${selected.name}" from this device?`)) return;

    const updated = workspaces.filter((item) => item.id !== selected.id);
    if (!store(STORAGE_KEY, JSON.stringify(updated))) {
      setError('Unable to update saved workspaces on this device.');
      return;
    }
    workspaces = updated;
    selectedId = updated[0]?.id || null;
    if (selectedId) store(SELECTED_KEY, selectedId);
    else {
      try { localStorage.removeItem(SELECTED_KEY); } catch { /* unavailable */ }
    }
    if (workspaces.length) { showSaved(); setNotice('Workspace removed.'); }
    else { showForm(false); setNotice('Workspace removed from this device.'); }
  });

  // The client dashboard opens as an external HTTPS page in the browser.
  // There is no iframe or password field inside this launcher.
  openLink.addEventListener('click', (event) => {
    const active = workspaces.find((item) => item.id === selectedId);
    if (!active) { event.preventDefault(); return; }
    try {
      if (normalizeWorkspaceUrl(active.url) !== active.url) throw new Error();
      openLink.href = active.url;
    } catch {
      event.preventDefault();
      setError('Saved URL is invalid. Remove and add this workspace again.');
    }
  });

  // PWA install event is only available when the browser finds the app eligible.
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installButton.hidden = false;
  });

  installButton.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    const prompt = deferredInstallPrompt;
    deferredInstallPrompt = null;
    installButton.hidden = true;
    try { await prompt.prompt(); await prompt.userChoice; }
    catch { /* Browser controls installation feedback. */ }
  });
  window.addEventListener('appinstalled', () => {
    installButton.hidden = true;
    deferredInstallPrompt = null;
  });

  if ('serviceWorker' in navigator && (
    location.protocol === 'https:' || location.hostname === 'localhost'
  )) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch((error) => {
        console.warn('[Mazorya App] Offline setup unavailable:', error);
      });
    });
  }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.setTimeout(() => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('is-ready');
    site.removeAttribute('aria-hidden');
    intro.setAttribute('aria-hidden', 'true');
    window.setTimeout(() => { intro.hidden = true; }, 700);
  }, reducedMotion ? 80 : 2350);

  if (matchMedia('(pointer: fine)').matches && !reducedMotion) {
    let frame = 0;
    stage.addEventListener('pointermove', (event) => {
      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        stage.style.setProperty('--mouse-x', x.toFixed(3));
        stage.style.setProperty('--mouse-y', y.toFixed(3));
        frame = 0;
      });
    }, { passive: true });
    stage.addEventListener('pointerleave', () => {
      stage.style.setProperty('--mouse-x', '0');
      stage.style.setProperty('--mouse-y', '0');
    });
  }

  if (workspaces.length) showSaved();
  else showForm(false);
})();
