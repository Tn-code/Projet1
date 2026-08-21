// Polyfill pour crypto dans l'environnement de build
if (typeof window !== 'undefined' && !window.crypto) {
  window.crypto = {
    getRandomValues: function(array) {
      for (let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
      return array;
    }
  };
}
