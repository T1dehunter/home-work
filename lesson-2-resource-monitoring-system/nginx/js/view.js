export const initView = ({startHighLoad, stopHighLoad}) => {
    const button = document.getElementById('button');
    const initialText = button.innerText;
    let isRunning = false;
    button.onclick = () => {
        if (isRunning) {
            button.innerText = initialText;
            isRunning = false;
            stopHighLoad();
        } else {
            button.innerText = 'STOP HIGHLOAD';
            isRunning = true;
            startHighLoad();
        }
    }
}