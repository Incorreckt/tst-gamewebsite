let clickCount = 0;
document.getElementById('clickButton').onclick = () => {
    clickCount++;
    document.getElementById('clickCount').innerText = clickCount;
}
