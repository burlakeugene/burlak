class Detection {
  isMobile() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }
}

export default Detection;
