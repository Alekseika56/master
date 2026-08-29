const steps = [
  { eyebrow: 'Refund request', title: 'Choose refund reason', helper: 'Select the service for which you want to receive a refund', type: 'options' },
  { eyebrow: 'Customer charge', title: 'Select the charge', helper: 'Select the charge the customer is referring to', type: 'charges' },
  { eyebrow: 'System check', title: 'Check possible errors', helper: 'Please check for possible system errors. The issue may have occurred because of them', type: 'errors' },
  { eyebrow: 'Final answer', title: 'Refund confirmation', helper: 'The selected refund amount for the customer is 1 dollar. The refund will be processed within the next 1–3 business days', type: 'finish' },
];

let stepIndex = 0;
const state = { service: '', charge: '', error: '' };
const content = document.querySelector('#procedureContent');
const nextBtn = document.querySelector('#nextBtn');
const backBtn = document.querySelector('#backBtn');

function checkbox(name, value, label, checked = false) {
  return `<label><input name="${name}" value="${value}" type="checkbox" ${checked ? 'checked' : ''}><span>${label}</span></label>`;
}

function renderContent(step) {
  if (step.type === 'options') {
    const options = ['Transaction Alerts', 'Pro Subscription', 'Monthly Payment', 'Incorrect fund transfer', 'Another option'];
    content.innerHTML = `<div class="soft-card checklist">${options.map((item) => checkbox('service', item, item, state.service === item)).join('')}</div>`;
  }
  if (step.type === 'charges') {
    const rows = [
      ['22.08.2025', '09:00', 'Transaction Alerts', '•••• 8816 card', '- $1'],
      ['21.07.2025', '10:25', 'Transaction Alerts', '•••• 8816 card', '- $1'],
      ['20.06.2025', '10:02', 'Transaction Alerts', '•••• 8816 card', '- $1'],
    ];
    content.innerHTML = `<button class="filter">Filter ⌄</button><div class="soft-card charge-list">${rows.map((row, index) => `<label class="charge"><input name="charge" value="${index}" type="checkbox" ${state.charge === String(index) ? 'checked' : ''}><span><small>${row[0]}   ${row[1]}</small><b>${row[2]}</b><small>${row[3]}</small></span><strong>${row[4]}</strong><span>⌄</span></label>`).join('')}<div class="pager"><span>1</span><span>›</span></div></div>`;
  }
  if (step.type === 'errors') {
    const rows = [
      ['22.08.2025', 'Account Display Error', 'There may be an account display error in app version 2.102.03.'],
      ['22.08.2025', 'Cashback system error', 'Cashback accruals are not working'],
      ['21.08.2025', 'Application Error', 'The app crashes in version 2.101.01.'],
    ];
    content.innerHTML = `<div class="soft-card error-list">${rows.map((row, index) => `<label class="error-row"><input name="error" value="${index}" type="checkbox" ${state.error === String(index) ? 'checked' : ''}><span><small>${row[0]}</small><b>${row[1]}</b><small>${row[2]}</small></span></label>`).join('')}</div>`;
  }
  if (step.type === 'finish') {
    content.innerHTML = `<div class="finish-stack"><div class="soft-card info-card"><p>${step.helper}</p><span>ⓘ</span></div><div class="soft-card info-card"><p>A refund of 1 dollars has been processed. The funds will be credited to your account within 1–3 days</p><span>⧉</span></div></div>`;
    document.querySelector('#composeText').textContent = 'A refund of 1 dollars has been processed. The funds will be credited to your account within 1–3 days';
  } else {
    document.querySelector('#composeText').textContent = 'Enter a message';
  }
}

function render() {
  const step = steps[stepIndex];
  document.querySelector('#eyebrow').textContent = step.eyebrow;
  document.querySelector('#stepTitle').textContent = step.title;
  document.querySelector('#helperText').textContent = step.helper;
  nextBtn.textContent = step.type === 'finish' ? 'Finish' : 'Next';
  backBtn.disabled = stepIndex === 0;
  renderContent(step);
  content.querySelectorAll('input').forEach((input) => input.addEventListener('change', (event) => {
    const { name, value } = event.target;
    state[name] = state[name] === value ? '' : value;
    render();
  }));
}

nextBtn.addEventListener('click', () => { stepIndex = Math.min(steps.length - 1, stepIndex + 1); render(); });
backBtn.addEventListener('click', () => { stepIndex = Math.max(0, stepIndex - 1); render(); });
render();
