/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  s = s.trim(' ');
  s.trim();
  let isPositive = true;
  let breakEarlyNonDigit = 0;
  let leadingZeros = 0;
  const stringIntegers = [];

  if (s.length === 0) return 0;

  if (s.length === 1 && (s[0] === '-' || s[0] === '+')) return 0;

  const nonZeroReturn = s[0] === '0';

  if (s[0] !== '-' && s[0] !== '+' && s[s.length - 1] === '-') {
    breakEarlyNonDigit++;
  }

  if (s[0] !== '+' && s[0] !== '-' && s[s.length - 1] === '+') {
    breakEarlyNonDigit++;
  }

  if (nonZeroReturn) leadingZeros++;

  for (let i = 0; i < s.length; i++) {
    const value = s[i];

    if (breakEarlyNonDigit === 2) {
      defaultValue(stringIntegers);
      break;
    }

    if (/-/.test(value)) {
      if (breakEarlyNonDigit === 0) {
        isPositive = false;
      }
      breakEarlyNonDigit++;
      continue;
    } else if (/\+/.test(value)) {
      if (breakEarlyNonDigit === 0) {
        isPositive = true;
      }
      breakEarlyNonDigit++;
      continue;
    }

    if (/[0]/.test(value) && leadingZeros > 0 && stringIntegers.length === 0) {
      leadingZeros++;
      continue;
    }

    if (/[0-9]/.test(value)) {
      stringIntegers.push(value);
      continue;
    }

    if (/\D/.test(value)) {
      defaultValue(stringIntegers);
      breakEarlyNonDigit = 2;
      break;
    }
  }

  const stringValue = stringIntegers.join('');

  let parsedValue = parseInt(stringValue);

  if (nonZeroReturn && stringIntegers.length === 0) return 0;

  if (nonZeroReturn && breakEarlyNonDigit === 2) return 0;

  if (nonZeroReturn && breakEarlyNonDigit === 1) return 0;

  if (breakEarlyNonDigit === 2 && stringIntegers.length === 0) return 0;

  if (!isPositive) {
    parsedValue *= -1;
  }

  if (parsedValue > Math.pow(-2, 31) && parsedValue < Math.pow(2, 31) - 1) {
    return parsedValue;
  }

  if (isPositive) {
    return Math.pow(2, 31) - 1;
  }

  return Math.pow(-2, 31);
};

function defaultValue(stringIntegers) {
  if (!stringIntegers.length) {
    stringIntegers.push('0');
  }
}

const result = myAtoi('-123+');
console.log('result ', result);
