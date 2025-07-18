document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('story-setup-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Stop the form from resetting
      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        // Save user choices to localStorage
        localStorage.setItem('storyConfig', JSON.stringify(data));
        // Redirect to the story engine page
        window.location.href = 'engine_latest.html';
      } catch (error) {
        console.error('Error processing form:', error);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  const storyContent = document.getElementById('story-content');
  if (storyContent) {
    try {
      // Load saved choices from localStorage
      const config = JSON.parse(localStorage.getItem('storyConfig') || '{}');
      const storyName = {
        'no-way-back': 'No Way Back: The Hotel Room Game',
        'gunmetal-sky': 'Beneath the Gunmetal Sky',
        'burn-to-stay-warm': 'What We Burn to Stay Warm'
      }[config['story-choice']] || 'No story selected';
      storyContent.innerHTML = `
        <h2>Welcome, ${config['protagonist-name'] || 'Traveler'}!</h2>
        <p><strong>Story:</strong> ${storyName}</p>
        <p><strong>Tone:</strong> ${config.tone || 'Not set'}</p>
        <p><strong>Protagonist Gender:</strong> ${config['protagonist-gender'] || 'Not set'}</p>
        <p><strong>Partner:</strong> ${config['partner-name'] || 'Not set'} (${config['partner-gender'] || 'Not set'})</p>
        <p><strong>Length:</strong> ${config['story-length'] || 'Not set'}</p>
        <p><strong>Emotional Risk:</strong> ${config['emotional-risk'] || 'Not set'}</p>
        <p>This is a placeholder. Your interactive story will start here soon!</p>
      `;
    } catch (error) {
      console.error('Error loading story:', error);
      storyContent.innerHTML = '<p>Sorry, something went wrong. Please go back and try again.</p>';
    }
  }
});