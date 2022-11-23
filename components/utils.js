//Deal with the card number
const FormatAndSetCardNumber = function FormatAndSetCardNumber(number) {

    // Remove all non-digit characters
    number = number.replace(/\D/g, "");

    // Find the card network
    if (number.startsWith("4")) {
        setCardNetwork("visa");
    } else if (number.startsWith("5")) {
        setCardNetwork("mastercard");
    } else if (number.startsWith("6")) {
        setCardNetwork("discover");
    } else if (number.startsWith("3")) {
        setCardNetwork("amex");
    } else {
        setCardNetwork("visa"); // Default to visa
    }

    //Format amex card number (4 digits, 6 digits, 5 digits)
    if (cardNetwork === "amex") {
        number.split(' ').join('');
        if (number.length > 15) {
            number = number.slice(0, 15)
        }
        if (number.length > 9) {
            number = number.slice(0, 10) + "   " + number.slice(10);
        }
        if (number.length > 4) {
            number = number.slice(0, 4) + "   " + number.slice(4);
        }

    }
    // Format the card number if not amex (4 digits, 4 digits, 4 digits, 4 digits)
    else {
        if (number.length > 16) {
            number = number.slice(0, 16);
        }
        if (number.length > 12) {
            number = number.slice(0, 12) + "   " + number.slice(12);
        }
        if (number.length > 8) {
            number = number.slice(0, 8) + "   " + number.slice(8);
        }
        if (number.length > 4) {
            number = number.slice(0, 4) + "   " + number.slice(4);
        }
    }

    // Set the card number
    setCardNumber(number)
}



// Deal with the card holder
const FormatAndSetCardHolder = function FormatAndSetCardHolder(name) {
    // Capitalize the first letter of each word
    name = name.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

    // Set the card holder
    setCardHolder(name);
}

// Deal with the card expiry date
const FormatAndSetDate = function FormatAndSetDate(date) {
    setDate(date.split(" ")[1] + "/" + date.split(" ")[0].slice(2, 4));
}

// Deal with the card cvv
const FormatAndSetCardCvv = function FormatAndSetCardCvv(cvv) {
    // Remove all non-digit characters
    cvv = cvv.replace(/\D/g, "");

    // cut the cvv to 3 digits
    if (cvv.length > 3) {
        cvv = cvv.slice(0, 3);
    }

    // Set the card cvv
    setCardCvv(cvv);
}

export { FormatAndSetCardNumber, FormatAndSetCardHolder, FormatAndSetDate, FormatAndSetCardCvv };