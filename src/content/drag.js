// Helper function to make an element draggable
function makeDraggable(container, dragHandle) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  dragHandle.addEventListener('mousedown', dragMouseDown);

  function dragMouseDown(e) {
    e.preventDefault(); 
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener('mouseup', closeDragElement);
    document.addEventListener('mousemove', elementDrag);
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    container.style.top = (container.offsetTop - pos2) + "px";
    container.style.left = (container.offsetLeft - pos1) + "px";
    
    container.style.right = 'auto';
    container.style.bottom = 'auto';
  }

  function closeDragElement() {
    document.removeEventListener('mouseup', closeDragElement);
    document.removeEventListener('mousemove', elementDrag);
  }
}
