import { createTemporaryElement, speakResponse } from '../utils';

export default (options) => {
  const instructions = options.element.getAttribute('aria-label');

  window.playVoxLensInstructions = () => {
    speakResponse(instructions, options);
    createTemporaryElement(instructions, options);
  };

  createTemporaryElement(instructions, options);

  const initialInstructions = `
    <p>
      You’re now using the VoxLens debug mode. The interaction responses that you hear will be the exact responses that screen-reader users will hear. The responses will also appear in text format at the end of the visualization. Tested with JAWS, NVDA, and VoiceOver.
    </p>
  `;

  const mainInstructions = `
    <div>
      <p>
        Click on the start button to hear what a screen reader would announce when encountering the visualization element. Using those instructions, you can interact with the tool by pressing the appropriate key combinations.
      </p>
      
      <button onclick="playVoxLensInstructions()">Start</button>
    </div>  
  `;

  let html = '<div name="voxlens-instructions">';
  if (options.debug?.instructions?.onlyMain !== true)
    html += initialInstructions;
  html += mainInstructions;
  html += '</div>';

  options.element.insertAdjacentHTML('beforeBegin', html);
};
