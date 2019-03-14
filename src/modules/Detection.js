export const Detection = function(){
    this.isMobile = () => {
        return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    }
};