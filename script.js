// Helper function to format raw datetime-local strings
function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return '';
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

// Helper function to generate a random booking reference code
function generateBookingRef() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `GLA-FIN-${randomNum}`;
}

// Handle form submission event
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Grab values from your form inputs
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const fromCity = document.getElementById('fromCity').value;
    const toCity = document.getElementById('toCity').value;
    const rawDeparture = document.getElementById('departureTime').value;
    const rawArrival = document.getElementById('arrivalTime').value;

    // Payload matching your exact EmailJS template variable names
    const templateParams = {
        to_email: customerEmail,
        passenger_name: customerName,
        from_city: fromCity,
        to_city: toCity,
        departure_time: formatDateTime(rawDeparture),
        arrival_time: formatDateTime(rawArrival),
        booking_reference: generateBookingRef()
    };

    // Replace with your actual EmailJS Service ID and Template ID
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';

    // Trigger EmailJS to send the email
    emailjs.send(serviceID, templateID, templateParams)
        .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert(`Booking confirmed successfully!\nReference: ${templateParams.booking_reference}`);
            this.reset();
        }, (error) => {
            console.error('FAILED...', error);
            alert('Failed to send confirmation email. Check console for details.');
        });
});
