console.log("Starting travel booking");

console.log(module);


// Array of flight objects, each flight has an id, departure city, destination city, and base price
const flights = [
    { id: 1, from: "Singapore", to: "Tokyo", basePrice: 350 },
    { id: 2, from: "Tokyo", to: "Singapore", basePrice: 400 },
    { id: 3, from: "Singapore", to: "Bangkok", basePrice: 120 },
    { id: 4, from: "Bangkok", to: "Singapore", basePrice: 150 },
    { id: 5, from: "Singapore", to: "Seoul", basePrice: 280 },
    { id: 6, from: "Seoul", to: "Singapore", basePrice: 320 }
];

module.exports = {
    description: "This is my travel module",



    // Search for flights by destination
    searchFlight(from, to) {
        // Filter flights array to find flights that match both from and to cities
        return flights.filter(f =>
            f.from.toLowerCase() === from.toLowerCase() &&
            f.to.toLowerCase() === to.toLowerCase()
        );
    },




    // Calculate total cost based on number of tickets
    calculateCost(flightId, tickets) {
        const flight = flights.find(f => f.id === flightId);
        if (!flight) return "Flight not found";

        let cost = flight.basePrice * tickets;

        // Group discount for 5 or more tickets
        if (tickets >= 5) cost *= 0.90;

        // Round to 2 decimal place
        return Number(cost.toFixed(2));
    },




    // Apply a promo code
    applyPromo(amount, code) {
        if (isNaN(amount)) return "Invalid amount";

        const promo = code.trim().toUpperCase();
        let finalAmount = amount;

        // Example: only one promo code works
        if (promo === "TRAVEL10") {
            finalAmount = amount * 0.90; // 10% discount
        }

        // Round to 2 decimal place
        return Number(finalAmount.toFixed(2));
    },



    // Calculate baggage fee
    calculateBaggageFee(flightId, bags) {
        // Validate bags input
        if (bags < 0 || isNaN(bags)) {
            return "Invalid number of bags";
        }

        // Find flight by ID
        const flight = flights.find(f => f.id === flightId);
        if (!flight) {
            return "Flight not found";
        }

        let fee = 0;

        // 1st bag free
        if (bags >= 2) {
            // 2nd bag costs $30
            fee += 30;

            // Bags 3 and above cost $45 each
            const extraBags = bags - 2;
            if (extraBags > 0) {
                fee += extraBags * 45;
            }
        }

        // Round to 2 decimal place
        return Number(fee.toFixed(2));
    },



    // Convert price to another currency 
    convertCurrency(amount, currency) {
        if (currency === "USD") return Number((amount * 0.74).toFixed(2));
        if (currency === "JPY") return Number((amount * 110).toFixed(2));
        if (currency === "EUR") return Number((amount * 0.68).toFixed(2));
        return "Unsupported currency";
    }

};