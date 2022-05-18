(() => {
    console.log('START APP');
    const button = document.getElementById("btn");
    const images = document.getElementById("images");

    button.onclick = () => {
        const imgNode = new Image(300, 300);
        // imgNode.src = `master-yoda.png?timestamp=${new Date().getTime()}`;
        imgNode.src = `/img/master-yoda.png`;
        images.appendChild(imgNode);
    }
})();