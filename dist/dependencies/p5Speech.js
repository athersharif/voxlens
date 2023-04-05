"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
(function (root, factory) {
  if (typeof define === 'function' && define.amd) define('p5.speech', ['p5'], function (p5) {
    factory(p5);
  });else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') factory(require('../p5'));else factory(root['p5']);
})(void 0, function (p5) {
  p5.Speech = function (_dv, _callback) {
    this.synth = window.speechSynthesis;
    this.utterance = new SpeechSynthesisUtterance();
    this.isLoaded = 0;
    this.interrupt = false;
    this.onLoad;
    this.onStart;
    this.onPause;
    this.onResume;
    this.onEnd;
    this.voices = [];
    this.initvoice;
    if (_dv !== undefined) this.initvoice = _dv;
    if (_callback !== undefined) this.onLoad = _callback;
    var that = this;
    window.speechSynthesis.onvoiceschanged = function () {
      if (that.isLoaded == 0) {
        that.voices = window.speechSynthesis.getVoices();
        that.isLoaded = 1;
        console.log('p5.Speech: voices loaded!');
        if (that.initvoice != undefined) {
          that.setVoice(that.initvoice);
          console.log('p5.Speech: initial voice: ' + that.initvoice);
        }
        if (that.onLoad != undefined) that.onLoad();
        that.utterance.onstart = function (e) {
          if (that.onStart != undefined) that.onStart(e);
        };
        that.utterance.onpause = function (e) {
          if (that.onPause != undefined) that.onPause(e);
        };
        that.utterance.onresume = function (e) {
          if (that.onResume != undefined) that.onResume(e);
        };
        that.utterance.onend = function (e) {
          if (that.onEnd != undefined) that.onEnd(e);
        };
      }
    };
  };
  p5.Speech.prototype.listVoices = function () {
    if (this.isLoaded) {
      for (var i = 0; i < this.voices.length; i++) {
        console.log(this.voices[i].name);
      }
    } else {
      console.log('p5.Speech: voices not loaded yet!');
    }
  };
  p5.Speech.prototype.setVoice = function (_v) {
    if (typeof _v == 'string') this.utterance.voice = this.voices.filter(function (v) {
      return v.name == _v;
    })[0];else if (typeof _v == 'number') this.utterance.voice = this.voices[Math.min(Math.max(_v, 0), this.voices.length - 1)];
  };
  p5.Speech.prototype.setVolume = function (_v) {
    this.utterance.volume = Math.min(Math.max(_v, 0.0), 1.0);
  };
  p5.Speech.prototype.setRate = function (_v) {
    this.utterance.rate = Math.min(Math.max(_v, 0.1), 2.0);
  };
  p5.Speech.prototype.setPitch = function (_v) {
    this.utterance.pitch = Math.min(Math.max(_v, 0.01), 2.0);
  };
  p5.Speech.prototype.setLang = function (_lang) {
    this.utterance.lang = _lang;
  };
  p5.Speech.prototype.speak = function (_phrase) {
    if (this.interrupt) this.synth.cancel();
    this.utterance.text = _phrase;
    this.synth.speak(this.utterance);
  };
  p5.Speech.prototype.pause = function () {
    this.synth.pause();
  };
  p5.Speech.prototype.resume = function () {
    this.synth.resume();
  };
  p5.Speech.prototype.stop = function () {
    this.synth.cancel();
  };
  p5.Speech.prototype.cancel = function () {
    this.synth.cancel();
  };
  p5.Speech.prototype.started = function (_cb) {
    this.onStart = _cb;
  };
  p5.Speech.prototype.ended = function (_cb) {
    this.onEnd = _cb;
  };
  p5.Speech.prototype.paused = function (_cb) {
    this.onPause = _cb;
  };
  p5.Speech.prototype.resumed = function (_cb) {
    this.onResume = _cb;
  };
  p5.SpeechRec = function (_lang, _callback) {
    if ('webkitSpeechRecognition' in window) {
      this.rec = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    } else {
      this.rec = new Object();
      console.log('p5.SpeechRec: Speech Recognition not supported in this browser.');
    }
    if (_lang !== undefined) this.rec.lang = _lang;
    this.onResult;
    this.onStart;
    this.onError;
    this.onEnd;
    if (_callback !== undefined) this.onResult = _callback;
    this.continuous = false;
    this.interimResults = false;
    this.resultJSON;
    this.resultValue;
    this.resultString;
    this.resultConfidence;
    var that = this;
    this.rec.onresult = function (e) {
      that.resultJSON = e;
      that.resultValue = e.returnValue;
      that.resultString = e.results[e.results.length - 1][0].transcript.trim();
      that.resultConfidence = e.results[e.results.length - 1][0].confidence;
      if (that.onResult != undefined) that.onResult();
    };
    this.rec.onstart = function (e) {
      if (that.onStart != undefined) that.onStart(e);
    };
    this.rec.onerror = function (e) {
      if (that.onError != undefined) that.onError(e);
    };
    this.rec.onend = function () {
      if (that.onEnd != undefined) that.onEnd();
    };
  };
  p5.SpeechRec.prototype.start = function (_continuous, _interim) {
    if ('webkitSpeechRecognition' in window) {
      if (_continuous !== undefined) this.continuous = _continuous;
      if (_interim !== undefined) this.interimResults = _interim;
      this.rec.continuous = this.continuous;
      this.rec.interimResults = this.interimResults;
      this.rec.start();
    }
  };
  p5.SpeechRec.prototype.stop = function () {
    if ('webkitSpeechRecognition' in window) {
      this.rec.stop();
    }
  };
});