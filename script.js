document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('story-setup-form');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      localStorage.setItem('storyConfig', JSON.stringify(data));
      localStorage.setItem('currentNode', 'start');
      window.location.href = 'engine_latest.html';
    });
  }

  const storyContent = document.getElementById('story-narrative');
  const choicesContainer = document.getElementById('story-choices');
  if (storyContent && choicesContainer) {
    const config = JSON.parse(localStorage.getItem('storyConfig') || '{}');
    const currentNode = localStorage.getItem('currentNode') || 'start';
    renderStory(currentNode, config);
  }

  function renderStory(nodeId, config) {
    const story = getStoryData(nodeId, config);
    storyContent.innerHTML = story.narrative.replaceAll('[protagonist]', config['protagonist-name'] || 'You').replaceAll('[partner]', config['partner-name'] || 'Partner');
    choicesContainer.innerHTML = '';
    story.choices.forEach((choice, index) => {
      const button = document.createElement('button');
      button.classList.add('choice-button');
      button.textContent = choice.text;
      button.onclick = () => {
        localStorage.setItem('currentNode', choice.nextNode);
        renderStory(choice.nextNode, config);
      };
      choicesContainer.appendChild(button);
    });
  }

  function getStoryData(nodeId, config) {
    const storyMap = {
      'start': {
        narrative: `The door to the hotel room clicks shut behind you, the sound echoing like a final verdict in a courtroom. The air is thick with the scent of cheap cologne and lingering cigarette smoke, the kind that clings to secrets and bad decisions. You, [protagonist], stand there in your rumpled detective coat, the badge on your belt feeling heavier than ever. Across the room, [partner] leans against the window, his silhouette framed by the neon glow from the city below. He's not the man you remember from the academy—hardened now, eyes shadowed by years of undercover work and the demons that come with it. "You shouldn't be here," he murmurs, his voice a low rumble that sends a shiver down your spine. But you both know why you are. The case that bound you together—a string of disappearances in the city's underbelly—has led to this moment, where lines blur between duty and desire.

The room is a time capsule of forgotten nights: a king-sized bed with rumpled sheets, a mini-bar stocked with regrets, and a mirror that reflects back the trauma you've both buried. Your heart races as you step closer, the floorboards creaking under your boots. [partner] turns, his gaze locking onto yours, intense and unyielding. "We can't keep doing this, [protagonist]," he says, but his hand reaches out, fingers brushing your arm with a touch that's both gentle and possessive. The addiction is mutual—the thrill of the chase, the obsession with justice, the trauma bond forged in the fires of shared pain. You feel the pull, the raw edge of emotion that makes everything feel alive, dangerous. The city lights flicker outside, a reminder of the world waiting, but in this room, it's just you and him, teetering on the brink.

You recall the first time you met—partners on a stakeout, adrenaline pumping as you took down a suspect. That night sparked something, a flame that burned through professional boundaries. Now, with the case closing in, the obsession deepens. [partner]'s breath is warm against your skin as he pulls you closer, his lips hovering near your ear. "One last time?" he whispers, the words laced with bittersweet longing. Your mind races: the evidence you uncovered points to corruption higher up, but confronting it could destroy everything—including this fragile connection. The power-play between you is intoxicating, a dance of dominance and surrender that masks the underlying trauma. Do you give in to the moment, or pull back to focus on the case?`,
        choices: [
          { text: 'Give in to the moment and kiss [partner], letting passion take over.', nextNode: 'kiss' },
          { text: 'Pull away and insist on discussing the case evidence first.', nextNode: 'discuss_case' },
          { text: 'Suggest leaving the room to find a safer place to talk.', nextNode: 'leave_room' }
        ]
      },
      'kiss': {
        narrative: `The tension snaps like a taut wire, and you lean in, your lips meeting [partner]'s in a kiss that's equal parts desperation and fire. His hands slide around your waist, pulling you close, the heat between you igniting like a match to dry tinder. The world outside—the case, the corruption, the looming danger—fades into a distant hum as the kiss deepens, his mouth claiming yours with a possessiveness that sends sparks through your body. Your coat falls to the floor, forgotten, as you press against him, fingers tangling in his hair. The trauma bond pulses stronger than ever, a mix of shared pain and addiction that makes every touch feel like salvation and destruction rolled into one. [partner]'s breath is ragged when he pulls back slightly, his forehead resting against yours. "[protagonist]," he whispers, voice rough with emotion, "you know this could ruin us both." But there's no regret in his eyes, only the bittersweet hunger that has kept you coming back.

The room spins with the intensity of it all, the mini-bar light casting shadows that dance like ghosts from your past. You feel the obsession creeping in—the way his touch erases the nightmares of the disappearances, the way his presence makes the power-play feel like a game you both win. But even as the passion builds, a knock at the door shatters the moment. It's soft, insistent, like a warning. [partner] tenses, his hand moving instinctively to the gun at his hip. "That's not room service," he mutters, eyes narrowing. Your heart races again, the steamy haze clearing to reveal the reality: the case isn't over, and someone knows you're here. The trauma bond tugs at you, urging you to stay, but the detective in you senses danger.`,
        choices: [
          { text: 'Ignore the knock and continue the intimate moment, locking the door.', nextNode: 'ignore_knock' },
          { text: 'Answer the door cautiously, with [partner] covering you from behind.', nextNode: 'answer_door' },
          { text: 'Grab your coat and suggest escaping through the window to avoid confrontation.', nextNode: 'escape_window' }
        ]
      },
      'ignore_knock': {
        narrative: `The knock echoes again, but you push it from your mind, your lips finding [partner]'s once more. The world narrows to the heat of his body against yours, the way his hands roam with a familiarity that borders on possession. You fumble for the door lock, twisting it shut without breaking the kiss, the click a small act of defiance against whatever lurks outside. [partner]'s low chuckle vibrates through you, his fingers tracing the curve of your back as he guides you toward the bed. "Reckless as ever, [protagonist]," he murmurs, his voice laced with amusement and desire. The addiction surges, a trauma bond that makes the danger feel like foreplay. The room's cheap lamp casts warm shadows, turning the space into a cocoon of steamy isolation. Your coat is discarded, shirts unbuttoned in a frenzy of need, the bittersweet taste of forbidden love mingling with the salt of sweat. For a moment, the case—the disappearances, the corruption—fades, replaced by the raw intensity of this connection, a power-play where you both surrender and conquer.

But as things escalate, [partner]'s phone buzzes on the nightstand, shattering the illusion. He glances at it, his expression darkening. "It's my handler," he whispers, the word carrying a weight that pulls you back to reality. The obsession flickers—do you trust him enough to stay, or is this the moment the trauma unravels? The knock has stopped, but the tension lingers, a reminder that your choices have consequences.`,
        choices: [
          { text: 'Insist on checking the phone message together, blending passion with caution.', nextNode: 'check_phone' },
          { text: 'Push the phone away and pull him back into the moment, letting desire override suspicion.', nextNode: 'push_phone' },
          { text: 'Break away and listen at the door, prioritizing safety over intimacy.', nextNode: 'listen_door' }
        ]
      },
      // Add more nodes as needed for other choices
      'discuss_case': {
        narrative: `You pull away from [partner], the moment broken as you shake your head. "Not now. We need to talk about the evidence first," you say, your voice steady despite the racing pulse. [partner]'s eyes flash with frustration, but he nods, stepping back to give you space. The room feels colder suddenly, the steamy tension dissipating like smoke. You retrieve your coat from the floor, pulling out the folder of documents you've hidden—photos of the missing persons, encrypted emails pointing to corruption in the department, and a list of names that could bring it all crashing down. [partner] watches as you spread them on the bed, his expression a mix of obsession and caution. "This could get us killed, [protagonist]," he warns, but his hand reaches for the papers, the trauma bond pulling him into the investigation once more. The power-play shifts from personal to professional, the addiction to justice overriding desire.`,
        choices: [
          { text: 'Share your suspicions about the department head.', nextNode: 'suspicions_dept' },
          { text: 'Ask [partner] about his undercover contacts.', nextNode: 'undercover_contacts' },
          { text: 'Suggest calling in an anonymous tip.', nextNode: 'anonymous_tip' }
        ]
      },
      'leave_room': {
        narrative: `You step back from [partner], the moment shattered by the weight of reality. "This isn't safe. Let's find a better place to talk," you say, your voice low and urgent. [partner] hesitates, his eyes searching yours, but he nods, grabbing his jacket. The room feels too exposed, the walls too thin for the secrets you carry. You crack the door open, peering into the hallway—empty for now, but the air hums with potential danger. The trauma bond tugs at you, making the decision bittersweet, but the obsession with survival wins out. As you slip out, [partner] close behind, the city night envelops you, a labyrinth of shadows and neon. The power-play between you lingers, a promise of what might have been, but now the focus is on escaping the invisible net closing in.`,
        choices: [
          { text: 'Head to a nearby diner for cover.', nextNode: 'diner_cover' },
          { text: 'Go to your safehouse across town.', nextNode: 'safehouse' },
          { text: 'Split up to confuse any followers.', nextNode: 'split_up' }
        ]
      },
      // Placeholder for more branches
      'answer_door': {
        narrative: `You motion for [partner] to cover you, your hand on your gun as you approach the door. The knock comes again, sharper this time. With a deep breath, you open it a crack, peering out into the dimly lit hallway. A shadowy figure stands there, face obscured by a hood. "Detective [protagonist]?" the voice is low, feminine, familiar yet out of place. It's your former partner from the academy, Sarah, her eyes wide with urgency. "You need to get out—now. They're coming for you both." The revelation hits like a punch, the corruption deeper than you thought. [partner] tenses behind you, his gun drawn. The steamy moment is forgotten, replaced by the raw edge of betrayal and danger. The trauma bond with [partner] strengthens in the face of threat, but trust is fracturing.`,
        choices: [
          { text: 'Let Sarah in to hear her out.', nextNode: 'let_sarah_in' },
          { text: 'Demand proof before letting her inside.', nextNode: 'demand_proof' },
          { text: 'Close the door and escape through the window.', nextNode: 'close_door_escape' }
        ]
      },
      'escape_window': {
        narrative: `You grab [partner]'s arm, whispering, "Window—now." He nods, and you both move to the fire escape, the knock growing more insistent. The window sticks, but with a shove, it opens, cool night air rushing in. You climb out first, [partner] following, the city sprawl below a dizzying drop. The trauma bond feels like a lifeline as you descend the metal stairs, hearts pounding from more than just the kiss. The obsession with the case drives you forward, but the power-play shifts to survival. Sirens wail in the distance, a reminder that your choices have consequences. At the bottom, you blend into the crowd, the night hiding you—for now.`,
        choices: [
          { text: 'Head to a safe location to regroup.', nextNode: 'safe_location' },
          { text: 'Confront the threat directly.', nextNode: 'confront_threat' },
          { text: 'Call for backup from trusted allies.', nextNode: 'call_backup' }
        ]
      },
      'ignore_knock': {
        narrative: `The knock echoes again, but you push it from your mind, your lips finding [partner]'s once more. The world narrows to the heat of his body against yours, the way his hands roam with a familiarity that borders on possession. You fumble for the door lock, twisting it shut without breaking the kiss, the click a small act of defiance against whatever lurks outside. [partner]'s low chuckle vibrates through you, his fingers tracing the curve of your back as he guides you toward the bed. "Reckless as ever, [protagonist]," he murmurs, his voice laced with amusement and desire. The addiction surges, a trauma bond that makes the danger feel like foreplay. The room's cheap lamp casts warm shadows, turning the space into a cocoon of steamy isolation. Your coat is discarded, shirts unbuttoned in a frenzy of need, the bittersweet taste of forbidden love mingling with the salt of sweat. For a moment, the case—the disappearances, the corruption—fades, replaced by the raw intensity of this connection, a power-play where you both surrender and conquer.

But as things escalate, [partner]'s phone buzzes on the nightstand, shattering the illusion. He glances at it, his expression darkening. "It's my handler," he whispers, the word carrying a weight that pulls you back to reality. The obsession flickers—do you trust him enough to stay, or is this the moment the trauma unravels? The knock has stopped, but the tension lingers, a reminder that your choices have consequences.`,
        choices: [
          { text: 'Insist on checking the phone message together, blending passion with caution.', nextNode: 'check_phone' },
          { text: 'Push the phone away and pull him back into the moment, letting desire override suspicion.', nextNode: 'push_phone' },
          { text: 'Break away and listen at the door, prioritizing safety over intimacy.', nextNode: 'listen_door' }
        ]
      },
      // Add additional nodes for each branch...
    };

    return storyMap[nodeId] || { narrative: 'Story node not found.', choices: [] };
  }
});