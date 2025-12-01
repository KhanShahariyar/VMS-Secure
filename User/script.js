// Redirect to correct login page if not logged in
if (localStorage.getItem('loggedIn') !== 'true') {
    window.location.href = "../Login and registration/login.html";
}
// Dummy data for today's appointments
const todayAppointments = [
    { visitorName: 'John Doe', employeeToMeet: 'Jane Smith', time: '10:00 AM', purpose: 'Project discussion', status: 'Upcoming' },
    { visitorName: 'Mary Williams', employeeToMeet: 'Robert Johnson', time: '09:30 AM', purpose: 'HR interview', status: 'Completed' },
    { visitorName: 'David Chen', employeeToMeet: 'Emily Davis', time: '11:00 AM', purpose: 'Sales meeting', status: 'Canceled' }
];

// Dummy data for past appointments
const pastAppointments = [
    { visitorName: 'Sarah Jones', employeeToMeet: 'Michael Brown', date: '2023-10-25', status: 'Completed' },
    { visitorName: 'Chris Evans', employeeToMeet: 'Lisa Rodriguez', date: '2023-10-24', status: 'Completed' },
    { visitorName: 'Anna Taylor', employeeToMeet: 'Tom White', date: '2023-10-23', status: 'Canceled' }
];

// Render Appointments
function renderAppointments(appointments, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';

    if (appointments.length === 0) {
        const message = document.createElement('p');
        message.className = 'text-center text-gray-500 italic py-4';
        message.textContent = containerId === 'todays-appointments-container'
            ? 'There are no appointments today.'
            : 'No appointments found for the selected filter/search.';
        container.appendChild(message);
        return;
    }

    appointments.forEach(appointment => {
        let statusClass = '';
        switch (appointment.status.toLowerCase()) {
            case 'upcoming': statusClass = 'status-upcoming'; break;
            case 'completed': statusClass = 'status-completed'; break;
            case 'canceled': statusClass = 'status-canceled'; break;
        }

        const card = document.createElement('div');
        card.className = 'p-4 bg-gray-700 rounded-lg shadow-md';

        if (containerId === 'todays-appointments-container') {
            card.className += ' flex-col items-start';
            card.innerHTML = `
                <div class="flex items-center justify-between w-full mb-2">
                    <span class="font-bold">${appointment.visitorName}</span>
                    <span class="status-badge ${statusClass}">${appointment.status}</span>
                </div>
                <p class="text-sm text-gray-400">Meeting with: ${appointment.employeeToMeet}</p>
                <p class="text-sm text-gray-400">Time: ${appointment.time}</p>
                <p class="text-sm text-gray-400">Purpose: ${appointment.purpose}</p>
            `;
        } else {
            card.className += ' flex justify-between items-center';
            card.innerHTML = `
                <div>
                    <span class="font-bold">${appointment.visitorName}</span>
                    <p class="text-sm text-gray-400">Meeting with: ${appointment.employeeToMeet}</p>
                    <p class="text-sm text-gray-400">Date: ${appointment.date}</p>
                </div>
                <span class="status-badge ${statusClass}">${appointment.status}</span>
            `;
        }
        container.appendChild(card);
    });
}

// Filter Past Appointments
const searchInput = document.getElementById('search-past');
const statusFilter = document.getElementById('status-filter');

function filterPastAppointments() {
    const query = searchInput.value.toLowerCase();
    const status = statusFilter.value.toLowerCase();

    const filtered = pastAppointments.filter(a =>
        (a.visitorName.toLowerCase().includes(query) || a.employeeToMeet.toLowerCase().includes(query)) &&
        (status === "" || a.status.toLowerCase() === status)
    );

    renderAppointments(filtered, 'past-appointments-container');
}

searchInput.addEventListener('input', filterPastAppointments);
statusFilter.addEventListener('change', filterPastAppointments);

// Load Appointments & Chart
window.onload = function () {
    renderAppointments(todayAppointments, 'todays-appointments-container');
    renderAppointments(pastAppointments, 'past-appointments-container');
    createWorkloadChart();
};

// Workload Chart
function createWorkloadChart() {
    const ctx = document.getElementById('workload-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Appointments',
                data: [12, 19, 3, 5, 2, 3, 7],
                backgroundColor: 'rgba(59,130,246,0.8)',
                borderColor: 'rgba(59,130,246,1)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.1)' } },
                x: { ticks: { color: '#cbd5e1' }, grid: { display: false } }
            },
            plugins: { legend: { display: false } }
        }
    });
}
