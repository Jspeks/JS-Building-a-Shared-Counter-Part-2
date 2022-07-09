async function main(){
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');
    const resetButton = document.querySelector('#reset-button');

    const response = await fetch('http://localhost:9001/counter');

    const result = await response.json();
    
    let countValue = result.value;
    function generateOption() {
    return {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: countValue })
        }
    }

    function increment(){
        countValue++;
        fetch(`${URL}/counter`, generateOption(countValue, "PATCH"))
        countContainer.textContent = countValue;
    }

    function decrement(){
        countValue--;
        fetch(`${URL}/counter`, generateOption(countValue, "PATCH"))
        countContainer.textContent = countValue;
    }

    function reset() {
        countValue = 0;
        fetch(`${URL}/counter`, generateOption(0, "PATCH"))
        main()
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    resetButton.addEventListener('click', reset);
    countContainer.textContent = countValue;
}

main()