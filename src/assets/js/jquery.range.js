var
  range = document.getElementById('range'),
  rangeV = document.getElementById('rangeV'),
  setValue = () => {
    var
      newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
      newPosition = 10 - (newValue * 0.2);
    rangeV.innerHTML = `<span>Price below: $${range.value}</span>`;
    // rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
  };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);