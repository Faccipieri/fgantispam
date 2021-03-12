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
    _version: '1.0.0',
    encryptFn: 'fgAspam.linkDecrypt',

    /**
     * Encrypt or decrypt una stringa (si lo so la mia fantasia raggiunge livelli innimaginabili)
     *
     * @method fgEncDec
     * @param {String} originalString      stringa (ma va??? che fantasia) 
     * @returns {String} Indovina un po !!!!!
     */
    fgEncDec: function(originalString) {
      var i, n, newString, nFromCharCode = -1;      
			
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