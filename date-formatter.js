module.exports = function dateFormatter(date, language) {
    var formattedDate;
    var monthName;
    if (language == "fr") {
        switch (date.month) {
            case 1:
                monthName = "janvier";
                break;
            case 2:
                monthName = "février";
                break;
            case 3:
                monthName = "mars";
                break;
            case 4:
                monthName = "avril";
                break;
            case 5:
                monthName = "mai";
                break;
            case 6:
                monthName = "juin";
                break;
            case 7:
                monthName = "juillet";
                break;
            case 8:
                monthName = "août";
                break;
            case 9:
                monthName = "septembre";
                break;
            case 10:
                monthName = "octobre";
                break;
            case 11:
                monthName = "novembre";
                break;
            case 12:
                monthName = "décembre";
                break;
            default:
                monthName = "error";
        }
        formattedDate = date.day + " " + monthName + " " + date.year;
    } else if (language == "en") {
        switch (date.month) {
            case 1:
                monthName = "January";
                break;
            case 2:
                monthName = "February";
                break;
            case 3:
                monthName = "March";
                break;
            case 4:
                monthName = "April";
                break;
            case 5:
                monthName = "May";
                break;
            case 6:
                monthName = "June";
                break;
            case 7:
                monthName = "July";
                break;
            case 8:
                monthName = "August";
                break;
            case 9:
                monthName = "September";
                break;
            case 10:
                monthName = "October";
                break;
            case 11:
                monthName = "November";
                break;
            case 12:
                monthName = "December";
                break;
            default:
                monthName = "error";
        }
        formattedDate = monthName + " " + date.day + ", " + date.year;
    }
    return formattedDate;
}
