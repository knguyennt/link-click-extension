const keyCombinationToElement = {};
let typedKeys = '';
let typingTimeout;
let isKeyBoxVisible = false;
let openInNewTab = false;

const KEY_COMBINATION_TIMEOUT = 500;

const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let isActive = false;

function isClickable(element) {
  return (
    element && 
    (element.tagName === 'BUTTON' || 
    element.tagName === 'A' || 
    (element.hasAttribute('role') && element.getAttribute('role').includes('button')))
  );
}

function generateUniqueKeyCombination(index) {
  const firstChar = characters[Math.floor(index / characters.length)];
  const secondChar = characters[index % characters.length];
  return firstChar + secondChar;
}

function assignKeyCombinationToElement() {
  const clickableElements = document.querySelectorAll('button, a, [role="button"]');
  
  clickableElements.forEach((element, index) => {
    const keyCombination = generateUniqueKeyCombination(index);
    keyCombinationToElement[keyCombination] = element;

    const keyDisplay = document.createElement('div');
    keyDisplay.innerText = keyCombination;
    keyDisplay.style.position = 'absolute';
    keyDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    keyDisplay.style.color = 'white';
    keyDisplay.style.padding = '5px 10px';
    keyDisplay.style.borderRadius = '5px';
    keyDisplay.style.fontSize = '12px';
    keyDisplay.style.zIndex = '9999';
    keyDisplay.style.pointerEvents = 'none';

    const rect = element.getBoundingClientRect();
    keyDisplay.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (keyDisplay.offsetWidth / 2)}px`;
    keyDisplay.style.top = `${rect.top + window.scrollY - keyDisplay.offsetHeight - 5}px`;

    document.body.appendChild(keyDisplay);
  });
}

function toggleKeyBoxVisibility() {
  const allKeyDisplays = document.querySelectorAll('div');
  allKeyDisplays.forEach((box) => {
    if (box.innerText.length === 2) {
      box.style.display = isKeyBoxVisible ? 'block' : 'none';
    }
  });
}

document.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  
  if (event.metaKey && key === 'k') {
    isActive = !isActive;
    isKeyBoxVisible = isActive;
    openInNewTab = false;
    toggleKeyBoxVisibility();
    
    if (isActive) {
      assignKeyCombinationToElement();
    }
    return;
  }

  if (!isActive || !isKeyBoxVisible) {
    return;
  }

  if (characters.includes(key)) {
    typedKeys += key;

    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
      const element = keyCombinationToElement[typedKeys];
      if (element) {
        if (openInNewTab && element.tagName === 'A') {
          window.open(element.href, '_blank');
        } else {
          element.click();
        }
      }
      
      typedKeys = '';
      openInNewTab = false;
    }, KEY_COMBINATION_TIMEOUT);
  }
});

window.addEventListener('beforeunload', () => {
  typedKeys = '';
  openInNewTab = false;
  isKeyBoxVisible = false;
  toggleKeyBoxVisibility();
});

window.addEventListener('load', () => {});
