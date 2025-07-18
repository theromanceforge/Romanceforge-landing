const storyTree = {
  "start": {
    "narrative": "No Way Back\n\nChapter One: Unfinished Business\nDetective [protagonist-name] had seen [partner-name-pronoun] fair share of nightmares. Bloodied crime scenes. Hollowed-out junkies. The cold, vacant stares of the guilty and the damned. But none of it rattled [partner-name-pronoun] quite like [partner-name]. [partner-name] stood in the middle of [protagonist-name-pronoun] interrogation room, arms crossed, [partner-gender-pronoun] brown eyes narrowed like [partner-name-pronoun] was ready to fight. [partner-name-pronoun] was always ready to fight—especially with [protagonist-name].\n\n\"This is bullshit, [protagonist-name],\" [partner-name] snapped, tossing a manila folder onto the table. \"Do you know how hard I worked to keep that kid in a stable home? And now, because your department botched the arrest, [partner-gender-pronoun] father’s back on the streets?\"\n\n[protagonist-name] leaned back in [protagonist-name-pronoun] chair, arms draped over the rests like [partner-name-pronoun] had all the time in the world. [protagonist-name-pronoun] knew better than to take [partner-name-pronoun] anger personally. That didn’t mean [partner-name-pronoun] wasn’t enjoying the way [partner-name-pronoun] frustration made [partner-gender-pronoun] chest rise and fall, the way that fitted blazer hugged curves that didn’t belong in a government-issued cubicle.\n\n\"Didn’t know you cared so much about my job performance,\" [protagonist-name] drawled, [protagonist-name-pronoun] voice rough from too much coffee and too little sleep. \"Or is this just an excuse to get in my face again?\"\n\n[partner-name] exhaled sharply, [partner-gender-pronoun] perfectly glossed lips tightening. \"You think this is funny?\"\n\n[protagonist-name] smirked. [partner-name-pronoun] loved pissing [partner-name] off. Almost as much as [partner-name-pronoun] loved thinking about what [partner-name] looked like when [partner-name-pronoun] wasn’t wearing that suit.\n\n\"I think,\" [protagonist-name] said slowly, standing to [protagonist-name-pronoun] full height, watching the way [partner-name] instinctively stiffened, \"that you don’t give a damn about the arrest. You just wanted an excuse to see me.\"\n\n[partner-name] scoffed, rolling [partner-gender-pronoun] eyes. \"You’re insufferable.\"\n\n\"And yet, you’re still standing here,\" [protagonist-name] murmured, stepping closer, invading [partner-gender-pronoun] space. [partner-name] didn’t back up. [partner-name-pronoun] never did. That was the problem.\n\nThis was how it always started with them. Tension crackling like a live wire. Words sharpened into weapons. A push, a pull, a slow, inevitable burn.\n\n\"Tell me, [partner-name],\" [protagonist-name] continued, [protagonist-name-pronoun] voice dipping lower. \"Did you come here for justice? Or because you missed me?\"\n\n[partner-name-pronoun] breath hitched, but [partner-name-pronoun] covered it quickly. Too quickly. \"I came here because you screwed up. Because this kid matters—more than your ego, more than whatever the hell this is between us.\"\n\n[protagonist-name-pronoun] jaw flexed. [partner-name-pronoun] could play games all day, but this part? The part where [partner-name] made [protagonist-name] feel like a man with a heart instead of just a badge? That was dangerous.\n\n[partner-name] took a deep breath, glancing at the door like [partner-name-pronoun] was debating whether to walk away. But [partner-name-pronoun] didn’t.\n\n\"I can’t do this with you again,\" [partner-name] muttered, [partner-gender-pronoun] voice softer now. \"Every time I get close, I—\"\n\n\"You what?\" [protagonist-name] was in front of [partner-name] now, so close [protagonist-name-pronoun] could feel the heat of [partner-gender-pronoun] body through the air between them.\n\n[partner-name] swallowed hard. [protagonist-name-pronoun] knew what [partner-name-pronoun] wanted to say. [protagonist-name-pronoun] also knew [partner-name-pronoun]’d never admit it.\n\nInstead, [partner-name] grabbed the folder off the table, shoved it against [protagonist-name-pronoun] chest. \"Fix this,\" [partner-name] whispered, turning on [partner-gender-pronoun] heel.\n\n[partner-name-pronoun] was almost out the door when [protagonist-name] called after [partner-name]. \"You ever gonna let me finish what we started?\"\n\n[partner-name-pronoun] hesitated—just long enough for [protagonist-name] to catch it.\n\nThen [partner-name] walked out, leaving [protagonist-name] alone in that interrogation room, aching for a case [protagonist-name-pronoun] had no clue how to solve.\nAnd for a [partner-name] who knew exactly how to ruin [protagonist-name].",
    "choices": [
      {"text": "Follow [partner-name] out and confront [partner-gender-pronoun] feelings.", "next": "dynamic"},
      {"text": "Stay and review the case file with focused determination.", "next": "dynamic"},
      {"text": "Leave the precinct to clear [protagonist-name-pronoun] mind.", "next": "dynamic"}
    ]
  }
  // Dynamic branches will be generated by AI
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('story-setup-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
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

    // Immediate render on load with fallback
    if (!config || Object.keys(config).length === 0) {
      storyContent.innerHTML = '<p>No story configuration found. Please set up your adventure on the setup page.</p>';
      choicesDiv.innerHTML = '';
    } else {
      renderNode(currentNode, config, storyState);
    }

    choicesDiv.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const next = event.target.dataset.next;
        const choiceText = event.target.textContent;
        sessionStorage.setItem('currentNode', next);
        choicesDiv.innerHTML = ''; // Clear choices immediately
        generateDynamicNode(next, config, choiceText); // Generate new content
      }
    });
  }

  function renderNode(nodeId, config, storyState) {
    const node = storyTree[nodeId] || { narrative: storyState.narrative || 'No narrative available.', choices: [] };
    let narrative = node.narrative;
    narrative = narrative.replace('[protagonist-name]', config['protagonist-name'] || 'Traveler');
    narrative = narrative.replace('[partner-name]', config['partner-name'] || 'Partner');
    narrative = narrative.replace('[partner-gender-pronoun]', getPronoun(config['partner-gender'] || 'no-preference'));
    narrative = narrative.replace('[partner-name-pronoun]', getSubjectPronoun(config['partner-gender'] || 'no-preference'));
    narrative = narrative.replace('[protagonist-name-pronoun]', getSubjectPronoun(config['protagonist-gender'] || 'no-preference'));

    // Split narrative into words for typing effect
    const words = narrative.split(' ');
    storyContent.innerHTML = ''; // Clear previous content
    let index = 0;
    choicesDiv.style.display = 'none'; // Hide choices initially

    function typeNextWord() {
      if (index < words.length) {
        const span = document.createElement('span');
        span.textContent = words[index] + ' ';
        span.style.opacity = '0';
        span.style.transition = 'opacity 0.5s';
        storyContent.appendChild(span);
        setTimeout(() => {
          span.style.opacity = '1';
        }, 10); // Smooth fade-in
        index++;
        setTimeout(typeNextWord, 200); // 200ms per word
      } else {
        // Show choices only after all words are typed
        choicesDiv.style.display = 'block';
        renderChoices(node.choices);
      }
    }

    typeNextWord();
  }

  function renderChoices(choices) {
    choicesDiv.innerHTML = '';
    choices.forEach((choice, idx) => {
      const button = document.createElement('button');
      button.textContent = choice.text;
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
    });
  }

  function generateDynamicNode(nodeId, config, previousChoice) {
    // Simulate AI generation (using Grok's capabilities)
    const riskLevel = config['emotional-risk'] || 'medium';
    const protagonist = config['protagonist-name'] || 'Traveler';
    const partner = config['partner-name'] || 'Partner';
    let pronoun = getPronoun(config['partner-gender'] || 'no-preference');
    let subjectPronoun = getSubjectPronoun(config['partner-gender'] || 'no-preference');
    let protagonistPronoun = getSubjectPronoun(config['protagonist-gender'] || 'no-preference');
    let narrative = '';
    let choices = [];

    if (nodeId === 'dynamic') {
      switch (previousChoice) {
        case 'Follow [partner-name] out and confront [partner-gender-pronoun] feelings.':
          narrative = `${protagonistPronoun} follow ${partner} out, catching ${pronoun} arm just outside the precinct. "We need to talk," ${protagonist} say, voice firm. ${subjectPronoun} turn, eyes wide, caught off guard.`;
          choices = [
            {"text": `Press ${partner} for an honest confession with ${riskLevel === 'raw' ? 'raw' : 'gentle'} intensity.`, "next": "dynamic"},
            {"text": `Softly ask ${pronoun} true feelings with ${riskLevel === 'raw' ? 'edgy' : 'cautious'} care.`, "next": "dynamic"},
            {"text": `Step back and suggest a private talk with ${riskLevel === 'raw' ? 'fierce' : 'calm'} resolve.`, "next": "dynamic"}
          ];
          break;
        case 'Stay and review the case file with focused determination.':
          narrative = `${protagonist} stay behind, flipping open the case file. The details blur as ${protagonistPronoun} think of ${partner}, but a new lead emerges—a name linked to the child’s father.`;
          choices = [
            {"text": `Chase the lead with ${riskLevel === 'raw' ? 'intense' : 'focused'} urgency.`, "next": "dynamic"},
            {"text": `Call ${partner} for input with ${riskLevel === 'raw' ? 'sharp' : 'firm'} tone.`, "next": "dynamic"},
            {"text": `Pause to reassess with ${riskLevel === 'raw' ? 'bold' : 'wary'} caution.`, "next": "dynamic"}
          ];
          break;
        case 'Leave the precinct to clear [protagonist-name-pronoun] mind.':
          narrative = `${protagonist} step into the night, the cool air doing little to ease ${protagonistPronoun} thoughts of ${partner}. A shadow moves nearby, hinting at danger.`;
          choices = [
            {"text": `Investigate the shadow with ${riskLevel === 'raw' ? 'defiant' : 'bittersweet'} curiosity.`, "next": "dynamic"},
            {"text": `Return to the precinct with ${riskLevel === 'raw' ? 'aggressive' : 'careful'} haste.`, "next": "dynamic"},
            {"text": `Head home with ${riskLevel === 'raw' ? 'reckless' : 'desperate'} intent.`, "next": "dynamic"}
          ];
          break;
      }
    } else {
      narrative = storyTree[nodeId]?.narrative || `The story with ${partner} continues in unexpected ways...`;
      choices = storyTree[nodeId]?.choices || [
        {"text": `Explore a new path with ${riskLevel === 'raw' ? 'bold' : 'curious'} intent.`, "next": "dynamic"},
        {"text": `Retreat with ${riskLevel === 'raw' ? 'cautious' : 'hesitant'} care.`, "next": "dynamic"},
        {"text": `Charge ahead with ${riskLevel === 'raw' ? 'fierce' : 'determined'} resolve.`, "next": "dynamic"}
      ];
    }

    // Store the generated state
    const newState = { narrative, choices };
    storyState = { ...storyState, ...newState };
    sessionStorage.setItem('storyState', JSON.stringify(storyState));
    renderNode(nodeId, config, storyState);
  }

  function getPronoun(gender) {
    switch (gender) {
      case 'male':
        return 'his';
      case 'female':
        return 'her';
      case 'no-preference':
      default:
        return 'their';
    }
  }

  function getSubjectPronoun(gender) {
    switch (gender) {
      case 'male':
        return 'he';
      case 'female':
        return 'she';
      case 'no-preference':
      default:
        return 'they';
    }
  }
});