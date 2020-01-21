export function fahrenheitToCelsius(value) {
    return (value*9/5)+32;
}

export function degreeToDirection(value) {
    const step = 22.5;
    if (value < step) {
        return 'N';
    }
    if (value < step * 3) {
        return 'NE';
    }
    if (value < step * 5) {
        return 'E';
    }
    if (value < step * 7) {
        return 'SE';
    }
    if (value < step * 9) {
        return 'S';
    }
    if (value < step * 11) {
        return 'SW';
    }
    if (value < step * 13) {
        return 'W';
    }
    if (value < step * 15) {
        return 'NW';
    }
    return 'N';
}

export function addPlusOrNot(value, unit) {
    if (unit === 'C') {
        if (value > 0) {
            return '+' + Math.round(value) ;
        } return Math.round(value);
    }
    if (fahrenheitToCelsius(value) > 0) {
        return '+' + Math.round(this.fahrenheitToCelsius(value));
    } return Math.round(this.fahrenheitToCelsius(value));

}