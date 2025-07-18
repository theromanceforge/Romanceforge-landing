const storyTree = {
  "start": {
    "narrative": "Beneath the Gunmetal Sky\n\nChapter One: Reunion Under Fire\n\n\n\nThe war-torn city of Valthorne stretches beneath a gunmetal sky, its skyline a jagged ruin pierced by smoke. The artillery’s thunder has echoed for three years since the war began in 2022, a relentless reminder of the devastation around me. The air smells of gunpowder and carries the chill of a stubborn winter.\n\n\n\nI, a seasoned soldier, crouch behind a crumbling wall in Oldtown. My battered rifle rests heavily on my shoulder, its cold metal clashing with warm memories. Shadows of a broken people linger in the rubble.\n\n\n\nYou emerge from the haze, your tattered uniform and dirt-streaked face a sight that stirs my heart with relief and pain. Our eyes meet, rekindling memories of a lost love from a ceasefire in 2023.\n\n\n\n- \"[MyName],\" you whisper, voice rough, stepping closer despite the bullets.\n\n- \"I thought you were dead.\"\n\n\n\nI pause, memories flooding back, urging me to act.\n\n\n\n- \"Not yet,\" I say, emotion tightening my voice.\n\n\n\nThe choice is mine to make.\n\n",
    "choices": [
      {"text": "Embrace you with cautious hope.", "next": "embrace"},
      {"text": "Question you about the past.", "next": "question"}
    ]
  },
  "embrace": {
    "narrative": "I wrap my arms around you, the war fading as old feelings resurface. Your tension eases slightly, but a nearby explosion jolts us back. Dust fills the air, and I hold you tighter, unsure of what comes next.\n\n",
    "choices": [
      {"text": "Hold you and plan our escape.", "next": "plan"},
      {"text": "Release you and face the danger.", "next": "face"}
    ]
  },
  "question": {
    "narrative": "I step closer, eyeing you with suspicion. 'What happened back then?' I ask, my voice low. You hesitate, the weight of secrets in your silence, as danger nears.\n\n",
    "choices": [
      {"text": "Press for answers.", "next": "press"},
      {"text": "Wait for your response.", "next": "wait"}
    ]
  }
  // Additional nodes can be added later
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('story-setup-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log('Form data submitted:', data);
        localStorage.setItem('storyConfig', JSON.stringify(data));
        sessionStorage.setItem('currentNode', 'start');
        window.location.href = 'engine_latest.html';
      } catch (error) {
        console.error('Error processing form:', error);
        alert('Something went wrong. Please try again.');
      }
    });
  }

  const storyContent = document.getElementById('story-content');
  const choicesDiv = document.getElementById('choices');

  if (storyContent && choicesDiv) {
    const config = JSON.parse(localStorage.getItem('storyConfig') || '{}');
    let currentNode = sessionStorage.getItem('currentNode') || 'start';
    let storyState = JSON.parse(sessionStorage.getItem('storyState') || '{}');

    if (!config || Object.keys(config).length === 0) {
      storyContent.innerHTML = '<p>No story configuration found. Please set up your adventure on the setup page.</p>';
      choicesDiv.innerHTML = '';
    } else {
      console.log('Rendering node with config:', config);
      renderNode(currentNode, config, storyState);
    }

    choicesDiv.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const next = event.target.dataset.next;
        const choiceText = event.target.textContent;
        console.log('Button clicked, next node:', next, 'Choice:', choiceText);
        sessionStorage.setItem('currentNode', next);
        choicesDiv.innerHTML = '';
        generateDynamicNode(next, config, choiceText);
      } else {
        console.log('Click target is not a button:', event.target.tagName);
      }
    });
  }

  function renderNode(nodeId, config, storyState) {
    const node = storyTree[nodeId] || { narrative: storyState.narrative || 'No narrative available.', choices: [] };
    let narrative = node.narrative;
    let myName = 'Dorian';
    let yourName = 'Anne';
    let myPronoun = 'he';
    let myPossessivePronoun = 'his';
    let yourPronoun = 'she';
    let yourPossessivePronoun = 'her';

    if (config['perspective'] === 'anne') {
      myName = 'Anne';
      yourName = 'Dorian';
      myPronoun = 'she';
      myPossessivePronoun = 'her';
      yourPronoun = 'he';
      yourPossessivePronoun = 'his';
    }

    narrative = narrative.replace('[MyName]', myName);
    narrative = narrative.replace(/I/g, myPronoun)
                        .replace(/me/g, myPronoun === 'he' ? 'him' : myPronoun === 'she' ? 'her' : 'them')
                        .replace(/my/g, myPossessivePronoun)
                        .replace(/you/g, yourName)
                        .replace(/your/g, yourPossessivePronoun);

    const words = narrative.split(' ');
    storyContent.innerHTML = '';
    let index = 0;
    choicesDiv.style.display = 'none';

    function typeNextWord() {
      if (index < words.length) {
        const span = document.createElement('span');
        span.textContent = words[index] + ' ';
        span.style.opacity = '0';
        span.style.transition = 'opacity 0.5s';
        storyContent.appendChild(span);
        setTimeout(() => {
          span.style.opacity = '1';
        }, 10);
        index++;
        setTimeout(typeNextWord, 200);
      } else {
        choicesDiv.style.display = 'block';
        if (node.choices && node.choices.length > 0) {
          console.log('Rendering choices:', node.choices);
          renderChoices(node.choices);
        } else {
          console.error('No choices available for node:', nodeId);
          choicesDiv.innerHTML = '<p>No choices available. Please try again.</p>';
        }
      }
    }

    typeNextWord();
  }

  function renderChoices(choices) {
    choicesDiv.innerHTML = '';
    console.log('Attempting to render choices:', choices);
    if (choices && choices.length > 0) {
      choices.forEach((choice, idx) => {
        let buttonText = choice.text;
        if (config['perspective'] === 'anne') {
          buttonText = buttonText.replace('you', 'Dorian');
        } else {
          buttonText = buttonText.replace('you', 'Anne');
        }
        const button = document.createElement('button');
        button.textContent = buttonText;
        button.dataset.next = choice.next;
        button.classList.add('choice-button');
        button.style.background = 'linear-gradient(90deg, #4a1a1a, #8a2b2b)';
        button.style.padding = '1.2rem 2rem';
        button.style.margin = '0.5rem 0';
        button.style.border = 'none';
        button.style.borderRadius = '10px';
        button.style.color = '#e0c0c0';
        button.style.fontSize = '1.2rem';
        button.style.cursor = 'pointer';
        button.style.transition = 'transform 0.3s, box-shadow 0.3s';
        button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
        button.onmouseover = () => {
          button.style.transform = 'scale(1.05)';
          button.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.5)';
        };
        button.onmouseout = () => {
          button.style.transform = 'scale(1)';
          button.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.4)';
        };
        choicesDiv.appendChild(button);
        console.log('Choice button added:', buttonText);
      });
    } else {
      console.error('Choices array is empty or undefined in renderChoices');
      choicesDiv.innerHTML = '<p>No choices available. Please try again.</p>';
    }
  }

  function generateDynamicNode(nodeId, config, previousChoice) {
    console.log('Generating dynamic node for:', nodeId, 'with choice:', previousChoice);
    const riskLevel = config['emotional-risk'] || 'medium';
    let protagonist = 'Dorian';
    let partner = 'Anne';
    let protagonistPronoun = 'he';
    let protagonistPossessivePronoun = 'his';
    let partnerPronoun = 'she';
    let partnerPossessivePronoun = 'her';

    if (config['perspective'] === 'anne') {
      protagonist = 'Anne';
      partner = 'Dorian';
      protagonistPronoun = 'she';
      protagonistPossessivePronoun = 'her';
      partnerPronoun = 'he';
      partnerPossessivePronoun = 'his';
    }

    let narrative = '';
    let choices = [];

    if (nodeId === 'dynamic') {
      switch (previousChoice) {
        case 'Embrace you with cautious hope.':
          narrative = `${protagonistPronoun} wrapped ${partner} in a tight embrace, the war fading as old feelings resurfaced.\n\n${partnerPronoun} tensed, whispering ${protagonist} name with a mix of joy and fear.\n\nA nearby explosion shattered the moment.`;
          choices = [
            {"text": `Hold ${partner} closer with gentle resolve.`, "next": "hold"},
            {"text": `Step back to assess the danger.`, "next": "assess"}
          ];
          break;
        case 'Question you about the past.':
          narrative = `${protagonistPronoun} stepped closer, eyeing ${partner} with suspicion.\n\n- \"What happened back then?\" ${protagonist} asked, voice low.\n\n${partnerPronoun} paused, secrets shadowing ${partnerPossessivePronoun} face.`;
          choices = [
            {"text": `Press for more details.`, "next": "press"},
            {"text": `Wait for ${partnerPronoun} to speak.`, "next": "wait"}
          ];
          break;
      }
    } else {
      const currentNode = storyTree[nodeId] || storyState;
      narrative = currentNode.narrative || `The story with ${partner} continues...`;
      choices = currentNode.choices || [];
    }

    const newState = { narrative, choices };
    storyState = { ...storyState, ...newState };
    sessionStorage.setItem('storyState', JSON.stringify(storyState));
    console.log('New state generated:', newState);
    renderNode(nodeId, config, storyState);
  }

  function getPronoun(gender) {
    switch (gender) {
      case 'male': return 'his';
      case 'female': return 'her';
      case 'no-preference': default: return 'their';
    }
  }

  function getSubjectPronoun(gender) {
    switch (gender) {
      case 'male': return 'he';
      case 'female': return 'she';
      case 'no-preference': default: return 'they';
    }
  }

  function getPossessivePronoun(gender) {
    switch (gender) {
      case 'male': return 'his';
      case 'female': return 'her';
      case 'no-preference': default: return 'their';
    }
  }
});