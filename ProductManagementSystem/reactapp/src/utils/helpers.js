export const highlightText = (text, highlight) => {
  if (!highlight.trim()) {
    return text;
  }
  
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  );
};

export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};