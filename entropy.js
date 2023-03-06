function getEntropy(prefixString) {
    const frequencies = {};
    const length = prefixString.length;
    let entropy = 0;
  
    // Count the frequency of each character
    for (let i = 0; i < length; i++) {
      const char = prefixString[i];
      if (frequencies[char]) {
        frequencies[char]++;
      } else {
        frequencies[char] = 1;
      }
    }
  
    // Calculate the probability of each character and entropy
    Object.keys(frequencies).forEach(char => {
      const probability = frequencies[char] / length;
      entropy -= probability * (Math.log2(probability));
    });
  
    return entropy;
  }
  
  // Example usage
  const prefixString = "123";
  const entropy = getEntropy(prefixString);
  console.log(`Entropy of "${prefixString}" is ${entropy}`);
  