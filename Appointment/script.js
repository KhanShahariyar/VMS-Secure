const form = document.getElementById('appointment-form');
const modal = document.getElementById('message-modal');
const messageText = document.getElementById('message-text');
const closeModalBtn = document.getElementById('close-modal-btn');

// Show message
function showMessage(message) {
    messageText.textContent = message;
    modal.classList.remove('hidden');
}

// Hide message
function hideMessage() {
    modal.classList.add('hidden');
}

// Close button event
closeModalBtn.addEventListener('click', hideMessage);

// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const company = document.getElementById('company-select').value;
    const employee = document.getElementById('employee-search').value;
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;
    const purpose = document.getElementById('purpose').value;

    console.log("Appointment details:", {
        company,
        employee,
        fullName,
        email,
        appointmentDate,
        appointmentTime,
        purpose
    });

    showMessage("Appointment request submitted successfully!");
    form.reset();
});
