/*
 * fgantispam - v1.0.0 beta a tuo rischio 2021 03
 * /
 
/* ATTENZIONE.  Versione beta ma tanto beta per cui pensaci bene !!!!!!! */



;(function (root, factory, name) {
  'use strict';
  root[name] = factory();
  if (typeof define === 'function' && define.amd) {
    define(function() { return root[name]; });
  } else if (typeof exports === 'object') {
    module.exports = root[name];
  }
})((typeof window === 'object' && window) || this, function () {
  'use strict';

  var fgAntiSpam, fgAspam;
  fgAntiSpam = function() {};
  fgAntiSpam.fn = fgAntiSpam.prototype = {
    _version: '0.1.5',
    encryptFn: 'fgAspam.linkDecrypt',

    /**
     * Encrypt or decrypt una stringa (si lo so la mia fantasia raggiunge livelli innimaginabili)
     *
     * @method fgEncDec
     * @param {String} originalString      stringa (ma va??? che fantasia)
     * @param {Number} [nFromCharCode=-1]  encrypt == +1, decrypt == -1 (bho forse mi drogo)
     * @returns {String} Indovina un po !!!!!
     */
    fgEncDec: function(originalString, nFromCharCode) {
      var i, n, newString;
      if (nFromCharCode == null) {
        nFromCharCode = -1;
      }
      i = 0;
      n = 0;
      newString = '';
      while (i < originalString.length) {
        n = originalString.charCodeAt(i);
        if (n >= 8364) {
          n = 128;
        }
        newString += String.fromCharCode(n + nFromCharCode);
        i++;
      }
      return newString;
    }
  };
  fgAspam = new fgAntiSpam();



  /**
   * Crypt given mail
   *
   * @method encrypt
   * @param {String} emailToEncrypt  email da codificare
   * @returns {String} cosa cazzo vuoi che ritorni !!! dai cazzo fantasia
   */
  fgAspam.encrypt = function(emailToEncrypt) {
    return this.fgEncDec('mailto:' + emailToEncrypt, 1);
  };

  /**
   * Initiate the form to encrypt
   *
   * @method encryptForm
   * @param {String} formName    form
   * @param {String} fieldName   campo email
   * @returns void
   */
  fgAspam.encryptForm = function(formName, fieldName) {
    var cryptform, email, emailHtml, encryptedMail, fieldShowEncryptedHtml, fieldShowEncryptedMail, i, radioObj, radioValue;
    formName = formName || 'fgAspam';
    fieldName = fieldName || 'cryptmail_email';
    fieldShowEncryptedMail = 'cryptmail_cryptedmail';
    fieldShowEncryptedHtml = 'cryptmail_html';
    cryptform = document.forms[formName];
    email = cryptform[fieldName].value;
    if (cryptform.cryptmail_email.value.length < 4) {
      return false;
    }
    radioObj = cryptform.cryptmail_radio;
    if (radioObj.length > 0) {
      i = 0;
      while (i < radioObj.length) {
        radioValue = parseInt(radioObj[i].checked ? radioObj[i].value : void 0, 10);
        i++;
      }
    } else {
      radioValue = 0;
    }
    if (radioValue === 1) {
      emailHtml = email.replace(/\./g, '<span class="crypt" aria-hidden="true">.</span>.<span class="crypt" aria-hidden="true">.</span>');
      emailHtml = emailHtml.replace(/@/, '<span class="crypt" aria-hidden="true">.</span>@<span class="crypt" aria-hidden="true">.</span>');
    } else {
      emailHtml = email.replace(/\./g, ' [PUNTO] ');
      emailHtml = emailHtml.replace(/@/, ' [CHIOCCIOLA] ');
    }
    encryptedMail = this.encrypt(email);
    cryptform[fieldShowEncryptedMail].value = encryptedMail;
    cryptform[fieldShowEncryptedHtml].value = '<a href="javascript:' + this.encryptFn + '(\'' + encryptedMail + '\');">' + emailHtml + '</a>';
  };



  /**
   * decritta email e ritorna mailto corretto
   *
   * @method decrypt
   * @param {String} encryptedMail   
   * @returns {String} 
   */
  fgAspam.decrypt = function(encryptedMail) {
    return this.fgEncDec(encryptedMail);
  };

  /**
   * Public function per tags  A 
   *
   * @method linkDecrypt
   * @param {String} encryptedMail   
   * @returns void
   */
  fgAspam.linkDecrypt = function(encryptedMail) {
    location.href = this.decrypt(encryptedMail);
  };



  return fgAspam;
}, 'fgAspam');