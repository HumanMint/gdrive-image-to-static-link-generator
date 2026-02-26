const inputLink = document.getElementById('inputLink');
const outputLink = document.getElementById('outputLink');
const convertBtn = document.getElementById('convertBtn');
const copyBtn = document.getElementById('copyBtn');
const result = document.getElementById('result');
const imageAnchor = document.getElementById('imageAnchor');
const previewImg = document.getElementById('previewImg');
const statusText = document.getElementById('statusText');

function extractDriveFileId(text) {
  const raw = text.trim();
  if (!raw) return null;

  // Already just an ID
  if (/^[a-zA-Z0-9_-]{20,}$/.test(raw)) return raw;

  // /file/d/<id>/...
  const dMatch = raw.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (dMatch?.[1]) return dMatch[1];

  // id=<id>
  const idParamMatch = raw.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch?.[1]) return idParamMatch[1];

  return null;
}

function toStaticLink(fileId) {
  return `https://lh3.googleusercontent.com/d/${fileId}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function setStatus(message, ok = false) {
  statusText.textContent = message;
  statusText.className = `status ${ok ? 'ok' : 'bad'}`;
}

function resetPreview() {
  result.classList.add('hidden');
  previewImg.removeAttribute('src');
  imageAnchor.href = '#';
  setStatus('', false);
}

convertBtn.addEventListener('click', async () => {
  const fileId = extractDriveFileId(inputLink.value);

  if (!fileId) {
    outputLink.value = '';
    copyBtn.disabled = true;
    resetPreview();
    result.classList.remove('hidden');
    setStatus('Could not find a valid Google Drive file ID in that input.', false);
    return;
  }

  const staticLink = toStaticLink(fileId);
  outputLink.value = staticLink;
  copyBtn.disabled = false;

  // Auto-copy after conversion
  const copied = await copyText(staticLink);

  imageAnchor.href = staticLink;
  previewImg.src = staticLink;
  result.classList.remove('hidden');

  previewImg.onload = () => {
    setStatus(copied
      ? 'Success: image loaded and static link copied to clipboard.'
      : 'Success: image loaded. Clipboard auto-copy was blocked by your browser. Use Copy button. ', true);
  };

  previewImg.onerror = () => {
    setStatus('Conversion worked, but image failed to load. It may not be public or the link may be invalid.', false);
  };
});

copyBtn.addEventListener('click', async () => {
  if (!outputLink.value) return;
  const copied = await copyText(outputLink.value);
  if (copied) {
    setStatus('Copied static link to clipboard.', true);
  } else {
    setStatus('Copy failed. Your browser blocked clipboard access.', false);
  }
});
