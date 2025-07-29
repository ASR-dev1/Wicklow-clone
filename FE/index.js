document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('setup-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const typeInput = document.querySelector('input[name="type"]:checked');
    const type = typeInput ? typeInput.value.trim() : '';

    const height = document.getElementById('height').value.trim();
    const width = document.getElementById('width').value.trim();
    const divisions = parseInt(document.getElementById('divisions').value.trim());

    if (!height || !width || height < 1 || width < 1 ||
        !divisions || divisions < 1 || !type) {
      if (!height || !width || height < 1 || width < 1) {
        alert('Please enter valid height and width.');
      } else if (!type) {
        alert('Please select a type (door or window).');
      }
      return;
    }

    if (type === 'door' && divisions > 4) {
      alert('Doors can have a maximum of 4 lites.');
      return;
    }

    if (type === 'window' && divisions > 3) {
      alert('Windows can have a maximum of 3 lites.');
      return;
    }

    const windowData = {
      height: parseInt(height),
      width: parseInt(width),
      divisions: divisions,
      type: type
    };

    localStorage.setItem('windowData', JSON.stringify(windowData));
    console.log('Window data saved:', windowData);

    const preview = document.getElementById('preview');
    preview.innerHTML = ''; // Clear previous preview

    const containerSize = 200;
    const margin = 10;
    const maxAvailable = containerSize - 2 * margin;

    const scale = Math.min(
      maxAvailable / windowData.width,
      maxAvailable / windowData.height,
      1 // never scale up
    );

    const scaledWidth = windowData.width * scale;
    const scaledHeight = windowData.height * scale;

    const box = document.createElement('div');
    box.style.width = `${scaledWidth}px`;
    box.style.height = `${scaledHeight}px`;
    box.style.border = '2px solid black';
    box.style.boxSizing = 'border-box';
    box.style.margin = 'auto';
    box.style.position = 'absolute';
    box.style.top = '50%';
    box.style.left = '50%';
    box.style.transform = 'translate(-50%, -50%)';
    box.style.display = 'flex'; // horizontal division layout
    box.style.backgroundColor = '#fff';

    // Create vertical divisions
    for (let i = 0; i < divisions; i++) {
      const subDiv = document.createElement('div');
      subDiv.dataset.style = "0"; // default style
      subDiv.style.flex = '1';
      subDiv.style.borderLeft = i !== 0 ? '1px solid #666' : 'none';
      subDiv.style.height = '100%';
      subDiv.style.position = 'relative';
      subDiv.style.cursor = 'pointer';
      subDiv.style.overflow = 'hidden';

      subDiv.addEventListener('click', function () {
        let styleIndex = parseInt(subDiv.dataset.style || "0");
        styleIndex = (styleIndex + 1) % 4;
        subDiv.dataset.style = styleIndex.toString();
        applyStyle(subDiv, styleIndex);
      });

      box.appendChild(subDiv);
    }

    // Style preview container
    preview.style.position = 'relative';
    preview.style.width = '200px';
    preview.style.height = '200px';
    preview.style.border = '1px solid #ccc';
    preview.style.boxSizing = 'border-box';
    preview.style.overflow = 'hidden';

    preview.appendChild(box);
  });

  // Style applying function
  function applyStyle(div, styleIndex) {
    div.innerHTML = '';
    div.style.backgroundImage = '';
    div.style.backgroundSize = '';
    div.style.backgroundRepeat = '';
    div.style.display = 'block';

    if (styleIndex === 1) {
        // Diamond mesh
        div.style.background = `
            repeating-linear-gradient(135deg, #aaa 0 1px, transparent 1px 6px),
            repeating-linear-gradient(45deg, #aaa 0 1px, transparent 1px 6px)
        `;
        div.style.backgroundSize = '8px 8px';
        div.style.backgroundRepeat = 'repeat';
        const span = document.createElement('span');
        span.innerText = 'V';
        span.style.position = 'absolute';
        span.style.top = '50%';
        span.style.left = '50%';
        span.style.transform = 'translate(-50%, -50%)';
        span.style.fontSize = 'calc(100% + 1.5vw)';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '20px';
        div.appendChild(span);
    } else if (styleIndex === 2) {
        // 'F' in center
        const span = document.createElement('span');
        span.innerText = 'F';
        span.style.position = 'absolute';
        span.style.top = '50%';
        span.style.left = '50%';
        span.style.transform = 'translate(-50%, -50%)';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '20px';
        div.appendChild(span);
    }  else if (styleIndex === 3) {
        // Single large 'V' centered
        const span = document.createElement('span');
        span.innerText = 'V';
        span.style.position = 'absolute';
        span.style.top = '50%';
        span.style.left = '50%';
        span.style.transform = 'translate(-50%, -50%)';
        span.style.fontWeight = 'bold';
        span.style.fontSize = 'calc(100% + 1.5vw)';
        span.style.color = '#000';
        div.appendChild(span);
        }
  }
});
