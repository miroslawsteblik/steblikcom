document.addEventListener('DOMContentLoaded', function () {
  // Find all the pre elements on the page
  const codeBlocks = document.querySelectorAll('pre');

  codeBlocks.forEach(function (codeBlock) {
    // Create the copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.type = 'button';

    // Add SVG icon instead of text
    copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="copy-icon">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="check-icon">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`;

    // Add the copy button to the code block
    codeBlock.appendChild(copyButton);

    // Add click event listener
    copyButton.addEventListener('click', function () {
      // Get the code content
      const code = codeBlock.querySelector('code')
        ? codeBlock.querySelector('code').innerText
        : codeBlock.innerText;

      // Copy to clipboard
      navigator.clipboard
        .writeText(code)
        .then(function () {
          // Show "copied" state
          copyButton.classList.add('copied');

          // Reset button after 2 seconds
          setTimeout(function () {
            copyButton.classList.remove('copied');
          }, 2000);
        })
        .catch(function () {
          copyButton.classList.add('error');
          setTimeout(function () {
            copyButton.classList.remove('error');
          }, 2000);
        });
    });
  });
});
