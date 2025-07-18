document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('story-setup-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      localStorage.setItem('storyConfig', JSON.stringify(data));
      window.location.href = 'engine_latest.html';
    });
  }

  const storyContent = document.getElementById('story-content');
  if (storyContent) {
    const config = JSON.parse(localStorage.getItem('storyConfig') || '{}');
    const storyName = {
      'no-way-back': 'No Way Back: The Hotel Room Game',
      'gunmetal-sky': 'Beneath the Gunmetal Sky',
      'burn-to-stay-warm': 'What We Burn to Stay Warm'
    }[config['story-choice']] || 'No story selected';
    storyContent.innerHTML = `
      <p>Welcome to your story, ${config['protagonist-name'] || 'Traveler'}!</p>
      <p>Story: ${storyName}.</p>
      <p>Tone: ${config.tone || 'Not set'}.</p>
      <p>This is a placeholder. Your interactive story will load here.</p>
    `;
  }
});