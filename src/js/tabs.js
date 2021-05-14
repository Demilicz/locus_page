const tab1 = document.querySelector('.');

const blocksList = document.querySelectorAll('.');
const tabsList = document.querySelectorAll('.');


if(blocksList.length > 0 && tabsList.length ) {
  tab1.addEventListener('click', () => {
    tabsHandler(tabsList, blocksList, "someclass", tab1.classList[1])
  });

}

function tabsHandler (tabs, blocks, blockClass, tabClass) {
  tabs.forEach(tab => {
    if(tab.classList.contains(tabClass)){
      tab.classList.add('_active-tab');
    }
    else
      tab.classList.remove('_active-tab');
  });

  blocks.forEach((block) => {
    if(block.classList.contains(blockClass)) {
      block.classList.remove('d-none');
    }
    else
      block.classList.add('d-none');
  });
 }










