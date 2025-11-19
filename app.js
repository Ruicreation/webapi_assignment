const readline = require('readline');
const travel = require('./LeeRuiYang_TravelBookingApp');

console.log("Welcome to the Travel Booking\n");

const rl = readline.createInterface({
    input: process.stdin, // Listens to user input from the terminal
    output: process.stdout // Prints messages to the terminal.
});


// Helper function to ask questions without deep nesting
function ask(question) {
    return new Promise(resolve => rl.question(question, answer => resolve(answer)));
}


async function startBooking() {
    try {


        // Ask for destination and departure city
        const from = await ask("Enter your departure city: ");
        const to = await ask("Enter your destination city: ");

        const flights = travel.searchFlight(from, to);

        if (flights.length === 0) {
            console.log(`\nNo flights found from ${from} to ${to}.`);
            rl.close();
            return;
        }




        console.log("\nAvailable flights:");
        flights.forEach(f =>
            console.log(`Flight ID: ${f.id} | From: ${f.from} | To: ${f.to} | Base Price: ${f.basePrice}`)
        );

        // Input given Flight ID
        const flightId = parseInt(await ask("\nEnter Flight ID to book: ")); // Converts the input to a number
        const flight = flights.find(f => f.id === flightId); // Checks if the flight exists

        if (!flight) {
            console.log("Invalid Flight ID.");
            rl.close();
            return;
        }



        // Ask for number of tickets
        const tickets = parseInt(await ask("Enter number of tickets: "));
        let cost = travel.calculateCost(flightId, tickets);




        // Ask for promo code if have
        const promo = await ask("Enter promo code (press Enter to skip): ");
        if (promo.trim() !== "") { // Removes extra spaces
            cost = travel.applyPromo(cost, promo);
        }




        // Ask for currency type
        const currency = await ask("Enter currency (SGD, USD, JPY, EUR): ");
        const finalCost =
            currency.toUpperCase() === "SGD" // If SGD, cost stays the same
                ? cost
                : travel.convertCurrency(cost, currency.toUpperCase());




        // Ask for baggage
        const bagsStr = await ask("Enter number of checked bags: ");
        const bags = parseInt(bagsStr);
        if (!isNaN(bags) && bags > 0) {
            const baggageFee = travel.calculateBaggageFee(flightId, bags);
            cost += baggageFee; // add baggage fee
        }



        console.log(
            `\nYour total cost for ${tickets} ticket(s) from ${from} to ${to} is: $${finalCost} ${currency.toUpperCase()}`,
            `\nYour baggage fee comes to $${cost}`
        );
        console.log("Thank you for booking");
    } catch (err) {
        console.log("An error occurred:", err.message);
    } finally {
        rl.close();
    }
}


startBooking(); // Calls the startBooking async function
