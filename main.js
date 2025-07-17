import { hotelRoomScene } from './scenes/hotel_room.js';
import { getUrlParams } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  const { story, tone } = getUrlParams();
  const scene = hotelRoomScene; // More logic can route by story later

  document.getElementById('story-title').textContent = scene.title;
  document.getElementById('tone').textContent = tone;
  document.getElementById('mood').textContent = scene.mood;

  const feed = document.getElementById('story-feed');
  const choiceArea = document.getElementById('choice-area');

  feed.innerHTML = '';
  scene.intro.forEach(text => {
    const p = document.createElement('p');
    p.className = 'text-lg text-gray-200 fade-in';
    p.textContent = text;
    feed.appendChild(p);
  });

  for (const [key, lines] of Object.entries(scene.choices)) {
    const btn = document.createElement('button');
    btn.className = 'bg-rose-700 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition';
    btn.textContent = key.replace(/^(.)/, c => c.toUpperCase());
    btn.onclick = () => {
      feed.innerHTML = '';
      lines.forEach(line => {
        const p = document.createElement('p');
        p.className = 'text-lg text-gray-200 fade-in';
        p.textContent = line;
        feed.appendChild(p);
      });
      choiceArea.innerHTML = '<p class="text-center text-gray-400 mt-6">(To be continued...)</p>';
    };
    choiceArea.appendChild(btn);
  }
});