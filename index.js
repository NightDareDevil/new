document.addEventListener('DOMContentLoaded', () => {
    const barsContainer = document.getElementById('bars-container');
    const newArrayButton = document.getElementById('new-array');
    const bubbleSortButton = document.getElementById('bubble-sort');
    const selectionSortButton = document.getElementById('selection-sort');
    const insertionSortButton = document.getElementById('insertion-sort');
    const quickSortButton = document.getElementById('quick-sort');
    const mergeSortButton = document.getElementById('merge-sort');
    const restartButton = document.getElementById('restart');
    const slowButton = document.getElementById('slow');
    const mediumButton = document.getElementById('medium');
    const fastButton = document.getElementById('fast');
    // default speed of sorting
    let speed = 200;
    let bars = [];
    const DEFAULT_COLOR = 'bg-blue-500'; // Original bar color
    const COMPARE_COLOR = 'bg-red-500'; // Color during comparison

    //=========================================================
    // initially mark isSorting as false
    let isSorting = false; // shows that no sorting is taking place till now

    // after clicking on any of the sorting -> ensure that other buttons are disabled so that sorting will not interrupt
    function disableSortingButtons() {
        const sortingButtons = document.querySelectorAll('#bubble-sort, #selection-sort, #insertion-sort, #quick-sort, #merge-sort');
        sortingButtons.forEach(button => button.disabled = true);
    }
    // function to enable the button after sorting
    function enableSortingButtons() {
        const sortingButtons = document.querySelectorAll('#bubble-sort, #selection-sort, #insertion-sort, #quick-sort, #merge-sort');
        sortingButtons.forEach(button => button.disabled = false);
    }

    //========================================================

    // generate 80 number randomly from 1 to 100 using random function and some calculations
    function generateRandomArray(size = 80, min = 1, max = 100) {
        return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }

    // create bars
    function createBars(array) {
        barsContainer.innerHTML = ''; // Clear previous bars
        bars = [];
        // for each value in the array create a div tag
        array.forEach(value => {
            const bar = document.createElement('div');
            bar.classList.add(DEFAULT_COLOR, 'inline-block');
            bar.style.width = '8px';
            bar.style.height = `${value * 3}px`; // Scale the height
            bar.style.marginRight = '2px'; // Adjust margin between bars
            barsContainer.appendChild(bar);
            bars.push(bar);
        });
    }

    function handleButtonClick(clickedButton) {
        // Remove 'button-active' class from all buttons
        [bubbleSortButton, selectionSortButton, insertionSortButton, mergeSortButton, quickSortButton].forEach(button => {
            button.classList.remove('bg-deepBlueHead'); // all are in their default color
            button.classList.add('bg-gray2');
        });

        // Add 'button-active' class to the clicked button
        clickedButton.classList.remove('bg-gray2');
        clickedButton.classList.add('bg-deepBlueHead'); // change the color of button that was clicked
    }

    // for the speeding buttons 
    // bring the default bg color for all other buttons rather than clicked one
    slowButton.addEventListener('click', () => {
        speed = 400; // Slower speed
        slowButton.classList.remove('bg-gray2');
        slowButton.classList.add('bg-deepBlueHead');

        mediumButton.classList.remove('bg-deepBlueHead');
        mediumButton.classList.add('bg-gray2');

        fastButton.classList.remove('bg-deepBlueHead');
        fastButton.classList.add('bg-gray2');
    });

    mediumButton.addEventListener('click', () => {
        speed = 200; // Medium speed
        mediumButton.classList.remove('bg-gray2');
        mediumButton.classList.add('bg-deepBlueHead');

        slowButton.classList.remove('bg-deepBlueHead');
        slowButton.classList.add('bg-gray2');

        fastButton.classList.remove('bg-deepBlueHead');
        fastButton.classList.add('bg-gray2');
    });

    fastButton.addEventListener('click', () => {
        speed = 50; // Faster speed
        fastButton.classList.remove('bg-gray2');
        fastButton.classList.add('bg-deepBlueHead');

        mediumButton.classList.remove('bg-deepBlueHead');
        mediumButton.classList.add('bg-gray2');

        slowButton.classList.remove('bg-deepBlueHead');
        slowButton.classList.add('bg-gray2');
    });

    function swapBars(bar1, bar2) {
        const tempHeight = bar1.style.height;
        bar1.style.height = bar2.style.height;
        bar2.style.height = tempHeight;
    }

    // async function for bubble sort implementation
    async function bubbleSort() {
        const n = bars.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                // color the bar with red when comparing
                bars[j].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
                bars[j + 1].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);

                await new Promise(resolve => setTimeout(resolve, speed));

                const height1 = parseInt(bars[j].style.height);
                const height2 = parseInt(bars[j + 1].style.height);

                if (height1 > height2) {
                    swapBars(bars[j], bars[j + 1]);
                }

                bars[j].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
                bars[j + 1].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
            }
        }
        // Enable sorting buttons after sorting is done
        enableSortingButtons();
    }

    // async function for selection sort implementation
    async function selectionSort() {
        const n = bars.length;
        for (let i = 0; i < n - 1; i++) {
            let minIndex = i;
            bars[minIndex].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
            for (let j = i + 1; j < n; j++) {
                bars[j].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
                await new Promise(resolve => setTimeout(resolve, speed));
                const height1 = parseInt(bars[minIndex].style.height);
                const height2 = parseInt(bars[j].style.height);
                if (height2 < height1) {
                    bars[minIndex].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
                    minIndex = j;
                    bars[minIndex].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
                } else {
                    bars[j].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
                }
            }
            if (minIndex !== i) {
                swapBars(bars[i], bars[minIndex]);
                bars[minIndex].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
            }
            bars[i].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
        }
        // Enable sorting buttons after sorting is done
        enableSortingButtons();
    }

    // async function for insertion sort
    async function insertionSort() {
        const n = bars.length;
        for (let i = 1; i < n; i++) {
            let j = i - 1;
            const currentHeight = parseInt(bars[i].style.height);
            bars[i].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
            while (j >= 0 && parseInt(bars[j].style.height) > currentHeight) {
                bars[j + 1].style.height = bars[j].style.height;
                bars[j + 1].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
                bars[j].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
                await new Promise(resolve => setTimeout(resolve, speed));
                bars[j + 1].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
                bars[j].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
                j--;
            }
            bars[j + 1].style.height = `${currentHeight}px`;
            bars[i].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
        }
        // Enable sorting buttons after sorting is done
        enableSortingButtons();
    }

    // async function for quick sort
    async function quickSort(low = 0, high = bars.length - 1) {
        async function partition(low, high) {
            const pivotHeight = parseInt(bars[high].style.height);
            bars[high].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
            let i = low - 1;
            for (let j = low; j < high; j++) {
                bars[j].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
                await new Promise(resolve => setTimeout(resolve, speed));
                const height = parseInt(bars[j].style.height);
                if (height < pivotHeight) {
                    i++;
                    swapBars(bars[i], bars[j]);
                    bars[i].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
                }
                bars[j].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
            }
            swapBars(bars[i + 1], bars[high]);
            bars[high].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
            return i + 1;
        }

        if (low < high) {
            const pi = await partition(low, high);
            await quickSort(low, pi - 1);
            await quickSort(pi + 1, high);
        }
        if (low === 0 && high === bars.length - 1) {
            enableSortingButtons(); // Enable sorting buttons after sorting is done
        }
    }

    // async function for merge sort
    async function mergeSort(low = 0, high = bars.length - 1) {
        async function merge(low, mid, high) {
            const leftSize = mid - low + 1;
            const rightSize = high - mid;
            const leftBars = [];
            const rightBars = [];

            for (let i = 0; i < leftSize; i++) {
                leftBars.push(bars[low + i].style.height);
            }
            for (let i = 0; i < rightSize; i++) {
                rightBars.push(bars[mid + 1 + i].style.height);
            }

            let i = 0, j = 0, k = low;
            while (i < leftSize && j < rightSize) {
                const leftHeight = parseInt(leftBars[i]);
                const rightHeight = parseInt(rightBars[j]);
                bars[k].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);

                if (leftHeight <= rightHeight) {
                    bars[k].style.height = leftBars[i];
                    i++;
                } else {
                    bars[k].style.height = rightBars[j];
                    j++;
                }
                await new Promise(resolve => setTimeout(resolve, speed));
                bars[k].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
                k++;
            }

            while (i < leftSize) {
                bars[k].style.height = leftBars[i];
                bars[k].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
                await new Promise(resolve => setTimeout(resolve, speed));
                bars[k].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
                i++;
                k++;
            }

            while (j < rightSize) {
                bars[k].style.height = rightBars[j];
                bars[k].classList.replace(DEFAULT_COLOR, COMPARE_COLOR);
                await new Promise(resolve => setTimeout(resolve, speed));
                bars[k].classList.replace(COMPARE_COLOR, DEFAULT_COLOR);
                j++;
                k++;
            }
        }

        if (low < high) {
            const mid = Math.floor((low + high) / 2);
            await mergeSort(low, mid);
            await mergeSort(mid + 1, high);
            await merge(low, mid, high);
        }
        if (low === 0 && high === bars.length - 1) {
            enableSortingButtons(); // Enable sorting buttons after sorting is done
        }
    }

    newArrayButton.addEventListener('click', () => {
        const array = generateRandomArray();
        createBars(array);
        enableSortingButtons();
    });

    bubbleSortButton.addEventListener('click', async () => {
        if (!isSorting) {
            isSorting = true;
            disableSortingButtons();
            handleButtonClick(bubbleSortButton);
            await bubbleSort();
            isSorting = false;
        }
    });

    selectionSortButton.addEventListener('click', async () => {
        if (!isSorting) {
            isSorting = true;
            disableSortingButtons();
            handleButtonClick(selectionSortButton);
            await selectionSort();
            isSorting = false;
        }
    });

    insertionSortButton.addEventListener('click', async () => {
        if (!isSorting) {
            isSorting = true;
            disableSortingButtons();
            handleButtonClick(insertionSortButton);
            await insertionSort();
            isSorting = false;
        }
    });

    quickSortButton.addEventListener('click', async () => {
        if (!isSorting) {
            isSorting = true;
            disableSortingButtons();
            handleButtonClick(quickSortButton);
            await quickSort();
            isSorting = false;
        }
    });

    mergeSortButton.addEventListener('click', async () => {
        if (!isSorting) {
            isSorting = true;
            disableSortingButtons();
            handleButtonClick(mergeSortButton);
            await mergeSort();
            isSorting = false;
        }
    });

    restartButton.addEventListener('click', () => {
        if (!isSorting) {
            const array = generateRandomArray();
            createBars(array);
            enableSortingButtons();
        }
    });

    // Generate the initial array and create bars
    const initialArray = generateRandomArray();
    createBars(initialArray);
});
