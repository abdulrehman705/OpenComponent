import { InitialData, serverClient } from 'oc-server';
import styles from './styles.css';
import logo from '../public/logo.png';
import { getSettings } from 'oc-server';

const onRender = (cb: (element: HTMLElement) => void) => {
  const { id } = getSettings();
  window.oc.events.on('oc:rendered', (e, data) => {
    if (data.id === id) {
      cb(document.querySelector(`[id="${id}"]`)!);
    }
  });
};

export default ({ firstName, lastName, hobbies, born }: InitialData) => {
  onRender((element) => {
    element
      .querySelector(`.${styles.button}`)
      ?.addEventListener('click', async () => {
        const { funFact } = await serverClient.funFact({ year: born });
        element.querySelector('#fun-year-fact')!.innerHTML = funFact;
      });
  });

  return /* html */ `
    <div class="${styles.container}">
      <img width="50" height="50" src="${logo}" alt="Logo" />
      <h1 style="margin: 0 0 20px 0;">
        Hello, <span style="text-decoration: underline;">${firstName}</span> ${lastName}
      </h1>
      <div class=${styles.info}>
        <div class=${styles.block}>Born: ${born}</div>
        <div class=${styles.block}>
          <div>Hobbies: ${hobbies.map((x) => x.toLowerCase()).join(', ')}</div>
        </div>
      </div>
      <div id="fun-year-fact"></div>
      <button class=${styles.button}>
        Fun year fact
      </button>
    </div>
  `;
};
