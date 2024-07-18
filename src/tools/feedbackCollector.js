import range from 'lodash/range';
import emailjs from '@emailjs/browser';
import { createTemporaryElement } from '../utils';

/* eslint-disable no-useless-escape */
const validateEmail = (email) =>
  email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
/* eslint-enable no-useless-escape */

const submitFeedback = (options) => {
  const buttonLoaded =
    document.getElementsByName('voxlens-feedback-collector-radio-button')
      .length > 0;

  if (buttonLoaded) {
    const radioButtons = Array.from(
      document.getElementsByName('voxlens-feedback-collector-radio-button')
    );
    const score = radioButtons.find((e) => e.checked)?.value;

    const feedbackTextbox = document.getElementsByName(
      'voxlens-feedback-collector-textbox'
    )[0];
    const feedback = feedbackTextbox.value;

    if (!score) {
      createTemporaryElement(
        'Please select a score before submitting the feedback.',
        options
      );
    } else {
      let text = 'Overall accessibility rating: ' + score + '. ';
      if (feedback) text += 'Message from user: ' + feedback;
      else text += 'User did not provide any additional feedback.';

      const emailParams = {
        to_email: options.feedbackCollector.email,
        viz_url: window.location.href,
        feedback: text,
      };

      // please use your own account info for sending emails
      // you can register at: https://www.emailjs.com/docs/
      // also: https://www.emailjs.com/docs/faq/is-it-okay-to-expose-my-public-key/
      emailjs
        .send(
          '4zc8v1fv9gzn0lw3bc9vg0ya',
          '0rxen88bhfvu6kd3bxxj5u25',
          emailParams,
          'qpJQfTWeKD-iEUEZ-'
        )
        .then(
          () => {
            createTemporaryElement(
              'Your feedback was successfully sent to the visualization creator.',
              options
            );
            radioButtons.forEach((r) => {
              r.checked = false;
            });
            feedbackTextbox.value = '';
          },
          (error) => {
            createTemporaryElement(
              'An error occurred while sending your feedback. Please try again later.',
              options
            );
            console.error(error);
          }
        );
    }
  }
};

const addFeedbackCollectorElements = (options, isEmailValid) => {
  const className =
    options.debug && options.debug.hideFeedbackCollector !== true
      ? ''
      : 'hidden';

  let html =
    '<div name="voxlens-feedback-collector" class="' + className + '">';

  if (isEmailValid) {
    const scales =
      options.feedbackCollector.scales &&
      Number.isInteger(options.feedbackCollector.scales)
        ? options.feedbackCollector.scales
        : 5;

    const ids = Array.apply(null, Array(scales)).map(() =>
      Math.random().toString(36).slice(2)
    );

    let radioButtons = `
      <div>
        <span>How accessible is the visualization? (1 being not accessible)</span>
        <span>
    `;

    range(scales).forEach((i) => {
      radioButtons += `
        <input type="radio" name="voxlens-feedback-collector-radio-button" value="${
          i + 1
        }" id="${ids[i]}" />
        <label for="${ids[i]}">${i + 1}</label>
      `;
    });

    radioButtons += `
        </span>
      </div>
    `;

    const textBox = `
      <div>
        <textarea name="voxlens-feedback-collector-textbox" cols="70" placeholder="Any additional anonymous feedback for the developers? (optional)"></textarea>
      </div>
    `;

    const submitButton = `
      <div>
        <button name="voxlens-feedback-collector-submit-button" onclick="submitVoxLensFeedback()">Submit Feedback</button>
      </div>
    `;

    html += radioButtons;
    html += textBox;
    html += submitButton;
  } else {
    const errorHtml = `
      <p>
        No or invalid email address provided for feedback collector.
      </p>
    `;

    html += errorHtml;
  }

  html += '</div>';

  options.element.insertAdjacentHTML('afterend', html);
};

export default (options) => {
  const email = options.feedbackCollector?.email;
  const isEmailValid = !!email && validateEmail(email);

  if (isEmailValid) {
    window.submitVoxLensFeedback = () => submitFeedback(options);
  }

  addFeedbackCollectorElements(options, isEmailValid);
};
