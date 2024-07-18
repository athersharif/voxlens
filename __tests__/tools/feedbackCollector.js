import { expect } from 'chai';
import feedbackCollector from '../../src/tools/feedbackCollector';

const options = {
  x: 'xKey',
  y: 'yKey',
  xLabel: 'dummy',
  yLabel: 'label',
  title: 'some title',
  element: document.getElementById('root'),
  debug: true,
  feedbackCollector: {
    email: 'blah@blah.com',
  },
};

describe('feedbackCollector', () => {
  afterEach(() => {
    document.body.childNodes.forEach((child) => {
      if (child.getAttribute('name') === 'voxlens-feedback-collector')
        document.body.removeChild(child);
    });

    document.getElementsByName('voxlens-response')[0]?.remove();
    process.env.FC_SEND_ERROR = '';
  });

  it('should return correct response', () => {
    feedbackCollector(options);

    expect(document.documentElement.innerHTML).to.contain(
      'How accessible is the visualization?'
    );
  });

  it('should return correct response when invalid email provided', () => {
    feedbackCollector({ ...options, feedbackCollector: { email: 'abc' } });

    expect(document.documentElement.innerHTML).to.contain(
      'No or invalid email address provided for feedback collector'
    );
  });

  it('should return correct response when custom scales provided', () => {
    feedbackCollector({
      ...options,
      feedbackCollector: { email: 'blah@blah.com', scales: 7 },
    });

    expect(document.documentElement.innerHTML).to.contain(
      'How accessible is the visualization?'
    );

    expect(
      document.getElementsByName('voxlens-feedback-collector-radio-button')
        .length
    ).to.equal(7);
  });

  it('should return correct response when submit is clicked and radio buttons are not loaded', () => {
    feedbackCollector(options);

    const radios = document.getElementsByName(
      'voxlens-feedback-collector-radio-button'
    );

    for (var i = radios.length - 1; i >= 0; i--) {
      radios[i].remove();
    }

    const button = document.getElementsByName(
      'voxlens-feedback-collector-submit-button'
    )[0];

    button.addEventListener('click', window.submitVoxLensFeedback);
    button.click();

    expect(document.documentElement.innerHTML).to.contain(
      'How accessible is the visualization?'
    );

    expect(document.documentElement.innerHTML).to.not.contain(
      'Please select a score before submitting the feedback'
    );
  });

  it('should return correct response when submit is clicked and score is missing', () => {
    feedbackCollector(options);

    const button = document.getElementsByName(
      'voxlens-feedback-collector-submit-button'
    )[0];

    button.addEventListener('click', window.submitVoxLensFeedback);
    button.click();

    expect(document.documentElement.innerHTML).to.contain(
      'How accessible is the visualization?'
    );

    expect(document.documentElement.innerHTML).to.contain(
      'Please select a score before submitting the feedback'
    );
  });

  it('should return correct response when submit is clicked and score is present but feedback missing', (done) => {
    feedbackCollector(options);

    const radio = document.getElementsByName(
      'voxlens-feedback-collector-radio-button'
    )[2];

    radio.checked = true;

    const button = document.getElementsByName(
      'voxlens-feedback-collector-submit-button'
    )[0];

    button.addEventListener('click', window.submitVoxLensFeedback);
    button.click();

    setTimeout(() => {
      expect(document.documentElement.innerHTML).to.contain(
        'How accessible is the visualization?'
      );

      expect(document.documentElement.innerHTML).to.contain(
        'Your feedback was successfully sent to the visualization creator'
      );

      done();
    });
  });

  it('should return correct response when submit is clicked and score and feedback both present', (done) => {
    feedbackCollector(options);

    const radio = document.getElementsByName(
      'voxlens-feedback-collector-radio-button'
    )[2];
    radio.checked = true;

    const textbox = document.getElementsByName(
      'voxlens-feedback-collector-textbox'
    )[0];
    textbox.value = 'some feedback';

    const button = document.getElementsByName(
      'voxlens-feedback-collector-submit-button'
    )[0];
    button.addEventListener('click', window.submitVoxLensFeedback);
    button.click();

    setTimeout(() => {
      expect(document.documentElement.innerHTML).to.contain(
        'How accessible is the visualization?'
      );

      expect(document.documentElement.innerHTML).to.contain(
        'Your feedback was successfully sent to the visualization creator'
      );

      done();
    });
  });

  it('should return correct response when send error happens', (done) => {
    process.env.FC_SEND_ERROR = 'true';

    feedbackCollector(options);

    const radio = document.getElementsByName(
      'voxlens-feedback-collector-radio-button'
    )[2];
    radio.checked = true;

    const textbox = document.getElementsByName(
      'voxlens-feedback-collector-textbox'
    )[0];
    textbox.value = 'some feedback';

    const button = document.getElementsByName(
      'voxlens-feedback-collector-submit-button'
    )[0];
    button.addEventListener('click', window.submitVoxLensFeedback);
    button.click();

    setTimeout(() => {
      expect(document.documentElement.innerHTML).to.contain(
        'How accessible is the visualization?'
      );

      expect(document.documentElement.innerHTML).to.contain(
        'An error occurred while sending your feedback. Please try again later'
      );

      done();
    });
  });

  it('should return correct response when hideFeedbackCollector is set', () => {
    feedbackCollector({ ...options, debug: { hideFeedbackCollector: true } });

    expect(document.documentElement.innerHTML).to.contain(
      'How accessible is the visualization?'
    );

    expect(
      document
        .getElementsByName('voxlens-feedback-collector')[0]
        .getAttribute('class')
    ).to.equal('hidden');
  });
});
