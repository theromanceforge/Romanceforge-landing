const storyTree = {
  "start": {
    "narrative": "🎖️ Beneath the Gunmetal Sky\n\nA RomanceForge Story\n\nInteractive Romance | War | Betrayal | Lust | Survival\n\n\n\n📜 PROLOGUE: The Last Quiet Before Fire\n\n\n\nThe sky over Gunmetal never darkens fully—it smolders with a dull, poisoned glow, an old wound refusing to heal. Once, this city had spires, rail lines, and quiet corners for lovers. Now, it’s ash, steel, and ghosts—concrete husks with blasted windows and endless sirens.\n\n\n\nI, Anne Verrin, former recon officer for the Forherr Republic, stand scarred beneath my armor, rifle across my back. I stopped believing in happy endings after the Dreff compound fell and my third falsified report. The war took my unit, reassigned me to this dead city choking on secrets.\n\n\n\nThen he returns—Dorian Calder. My second-in-command, my lover, who vanished with classified intel and my heart. I buried him in my mind, but now he’s alive, marked by the ruins.\n\n\n\n- \"Anne,\" he says, voice rough, stepping closer. \"I thought you were gone.\"\n\n\n\nMy pulse races. He claims a traitor in Forherr command feeds the Imperial blockade. Part of me believes him—the part that recalls his kiss on the south wall at Vass Line.\n\n\n\nThe choice is mine.\n\n",
    "choices": [
      {"text": "Trust Dorian and confront him.", "next": "trust"},
      {"text": "Distrust him and prepare to fight.", "next": "distrust"}
    ]
  },
  "trust": {
    "narrative": "I step toward Dorian, trusting the flicker of hope in his eyes. The war’s noise fades as I ask about the traitor. His voice trembles with truth, revealing a name. Smoke swirls, and I feel the weight of our past.\n\n",
    "choices": [
      {"text": "Dig deeper into the betrayal.", "next": "dig"},
      {"text": "Plan our next move together.", "next": "plan"}
    ]
  },
  "distrust": {
    "narrative": "I grip my rifle, distrust hardening my stance. Dorian’s words feel like a trap. I demand proof, my voice sharp as footsteps echo nearby. The tension thickens in the smoky air.\n\n",
    "choices": [
      {"text": "Demand evidence now.", "next": "evidence"},
      {"text": "Attack to end the threat.", "next": "attack"}
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
    let myName = 'Anne';
    let yourName = 'Dorian';
    let myPronoun = 'I';
    let myPossessivePronoun = 'my';
    let yourPronoun = 'you';
    let yourPossessivePronoun = 'your';

    if (config['perspective'] === 'dorian') {
      myName = 'Dorian';
      yourName = 'Anne';
      myPronoun = 'I';
      myPossessivePronoun = 'my';
      yourPronoun = 'you';
      yourPossessivePronoun = 'your';
    }

    narrative = narrative.replace('[MyName]', myName);
    narrative = narrative.replace(/I/g, myPronoun)
                        .replace(/me/g, myPronoun === 'I' ? 'me' : myPronoun === 'he' ? 'him' : 'her')
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
    let protagonist = 'Anne';
    let partner = 'Dorian';
    let protagonistPronoun = 'I';
    let protagonistPossessivePronoun = 'my';
    let partnerPronoun = 'you';
    let partnerPossessivePronoun = 'your';

    if (config['perspective'] === 'dorian') {
      protagonist = 'Dorian';
      partner = 'Anne';
      protagonistPronoun = 'I';
      protagonistPossessivePronoun = 'my';
      partnerPronoun = 'you';
      partnerPossessivePronoun = 'your';
    }

    let narrative = '';
    let choices = [];

    if (nodeId === 'dynamic') {
      switch (previousChoice) {
        case 'Trust Dorian and confront him.':
          narrative = `${protagonistPronoun} stepped toward ${partner}, trusting the hope in ${partnerPossessivePronoun} eyes. The war’s noise faded as ${protagonistPronoun} asked about the traitor.\n\n- \"Tell me the truth,\" ${protagonistPronoun} said, voice steady.\n\n${partnerPronoun} nodded, revealing a hint of the conspiracy.`;
          choices = [
            {"text": `Ask for more details about the traitor.`, "next": "details"},
            {"text": `Plan our escape with ${partner}.`, "next": "escape"}
          ];
          break;
        case 'Distrust him and prepare to fight.':
          narrative = `${protagonistPronoun} gripped ${protagonistPossessivePronoun} rifle, distrust hardening ${protagonistPossessivePronoun} stance. ${partnerPronoun} spoke, but ${protagonistPronoun} demanded proof.\n\n- \"Show me evidence,\" ${protagonistPronoun} snapped.\n\nFootsteps echoed nearby.`;
          choices = [
            {"text": `Insist on immediate proof.`, "next": "proof"},
            {"text": `Attack ${partner} to end the tension.`, "next": "confront"}
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