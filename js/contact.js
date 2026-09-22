const contactForm = document.querySelector('.contact-form');
const contactFields = contactForm.querySelectorAll('input, textarea');
const contactSubmit = contactForm.querySelector('button[type="submit"]');
const formStatus = contactForm.querySelector('.form-status');

// 오류 상태와 화면 갱신을 분리합니다. 처음에는 오류를 표시하지 않습니다.
const contactState = {
  errors: { name: '', email: '', message: '' },
  status: 'idle',
};
// 입력값을 검사하고, 문제가 있으면 해당 필드의 오류 문구를 반환합니다.
const validateContactField = (field) => {
  const { name, value } = field;
  const trimmedValue = value.trim();
  const labels = { name: '이름을', email: '이메일을', message: '메시지를' };

  if (!trimmedValue) return `${labels[name]} 입력해 주세요.`;
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return '이메일 형식을 확인해 주세요.\n예:\u00a0hello@example.com';
  }
  return '';
};
// Contact 상태를 필드별 오류, 접근성 속성, 성공 문구에 반영합니다.
const renderContactForm = () => {
  contactFields.forEach((field) => {
    const error = contactState.errors[field.name];
    document.querySelector(`#${field.id}-error`).textContent = error;
    field.setAttribute('aria-invalid', String(Boolean(error)));
  });

  if (contactState.status === 'success') {
    formStatus.textContent = '입력 확인 완료';
  } else {
    formStatus.textContent = '';
  }
};

// 입력·제출 이벤트를 연결하고 폼 검사를 사용할 수 있게 준비합니다.
export const initContactForm = () => {
  contactFields.forEach((field) => {
    field.addEventListener('input', () => {
      contactState.errors[field.name] = validateContactField(field);
      // 제출 결과는 이전 입력에 대한 것이므로 수정하면 지웁니다.
      contactState.status = 'idle';
      renderContactForm();
    });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let firstInvalidField = null;

    // 자동완성 등 input 이벤트가 없었던 경우도 제출 시 전체를 검사합니다.
    contactFields.forEach((field) => {
      const error = validateContactField(field);
      contactState.errors[field.name] = error;
      if (error && !firstInvalidField) firstInvalidField = field;
    });

    contactState.status = firstInvalidField ? 'error' : 'success';
    renderContactForm();
    if (firstInvalidField) firstInvalidField.focus();
  });

  // 브라우저 기본 팝업 대신 필드 근처의 오류 메시지를 사용합니다.
  contactForm.noValidate = true;
  contactSubmit.disabled = false;
  renderContactForm();
};
