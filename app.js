(() => {
  const { kakaoUrl = '', kakaoId = '', qrImage = '' } = window.JADE_CONTACT || {};
  const container = document.getElementById('contact-actions');
  let validUrl = '';
  try {
    const url = new URL(kakaoUrl);
    if ((url.protocol === 'https:' || (url.protocol === 'http:' && url.hostname === 'qr.kakao.com')) && /(^|\.)kakao\.com$/.test(url.hostname)) validUrl = url.href;
  } catch (_) {}
  if (!validUrl && !kakaoId && !qrImage) return;
  container.replaceChildren();
  if (validUrl) {
    const link = document.createElement('a');
    link.className = 'button kakao'; link.href = validUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
    link.append('KakaoTalk 상담');
    const english = document.createElement('span'); english.lang = 'en'; english.textContent = 'Chat with Nhat Le'; link.append(english);
    container.append(link);
    document.querySelectorAll('a[href="#contact"]').forEach(a => { a.href = validUrl; a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  }
  if (qrImage && /^(\.\/)?assets\/[\w.-]+$/.test(qrImage)) {
    const img = document.createElement('img'); img.src = qrImage; img.className = 'qr'; img.alt = 'Nhat Le KakaoTalk QR code'; container.append(img);
    const hint = document.createElement("p"); hint.className = "qr-hint"; hint.append("QR 코드를 스캔하거나 버튼을 눌러주세요."); const hintEn = document.createElement("span"); hintEn.lang = "en"; hintEn.textContent = "Scan the QR code or tap to connect."; hint.append(hintEn); container.append(hint);
  }
  if (kakaoId) {
    const id = document.createElement('p'); id.className = 'kakao-id'; id.textContent = 'KakaoTalk ID: ' + kakaoId; container.append(id);
    const btn = document.createElement('button'); btn.className = 'button'; btn.type = 'button'; btn.textContent = 'ID 복사 · Copy ID';
    const status = document.createElement('p'); status.className = 'copy-status'; status.setAttribute('role', 'status');
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(kakaoId); status.textContent = '복사되었습니다 · ID copied'; }
      catch (_) { status.textContent = '위의 ID를 선택해 복사하세요 · Select and copy the ID above'; }
    }); container.append(btn, status);
  }
})();
