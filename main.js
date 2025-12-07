import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDB9AZS4_TLNwYERDqnRff0Qv-CMV0D-UQ",
    authDomain: "ferienwohnung-d31ec.firebaseapp.com",
    projectId: "ferienwohnung-d31ec",
    storageBucket: "ferienwohnung-d31ec.firebasestorage.app",
    messagingSenderId: "979312887124",
    appId: "1:979312887124:web:76ff37c6590389aa29f4c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {

    /* --- Mobile Navigation --- */
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }

    /* --- Smooth Scroll for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('open');
                }

                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* --- Booking Calendar System --- */
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    // Booking UI Elements
    const checkinDisplay = document.getElementById('checkinDate');
    const checkoutDisplay = document.getElementById('checkoutDate');
    const priceCalc = document.getElementById('priceCalc');
    const totalDisplay = document.getElementById('totalDisplay');
    const totalPriceContainer = document.getElementById('totalPrice');
    const bookBtn = document.getElementById('bookBtn');

    // New Elements
    const guestCountInput = document.getElementById('guestCount');
    const apartmentSelect = document.getElementById('apartmentSelect');

    const finalPriceAmount = document.getElementById('finalPriceAmount');
    const bookingRef = document.getElementById('bookingRef');

    let currentDate = new Date();
    let selectedStartDate = null;
    let selectedEndDate = null;
    const pricePerPerson = 45; // Preis pro Person in Euro

    // --- FIREBASE: Fetch Booked Dates ---
    let bookedDates = [];

    // Helper to get dates range
    function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());
        const dates = [];
        // wir blockieren bis zum checkout day (checkin am checkout tag möglich für neue gäste?
        // Für diesen Kalender blockieren wir den Checkout Tag NICHT, damit er als Anreise für neue Gäste wählbar ist?
        // Oder wir blockieren einfach alles. Airbnb: Checkout = 11 Uhr, Checkin = 15 Uhr.
        // Einfache Logik: Wir speichern Strings YYYY-MM-DD.
        // Wenn ich von 1. bis 5. buche, sind 1., 2., 3., 4. nachts belegt.
        // Der 5. ist Abreise, also kann da jemand neues anreisen. -> 5. nicht blockieren.

        while (date < endDate) {
            dates.push(date.toISOString().split('T')[0]);
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }

    async function loadBookings() {
        try {
            const querySnapshot = await getDocs(collection(db, "bookings"));
            bookedDates = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.checkinDateISO && data.checkoutDateISO) {
                    // Verwende ISO-Strings für saubere Berechnung
                    const start = new Date(data.checkinDateISO);
                    const end = new Date(data.checkoutDateISO);
                    bookedDates.push(...getDatesInRange(start, end));
                }
                // Fallback für alte Daten (manuell)
                else if (data.checkin && data.checkout) {
                    // Parse German Date Format DD.MM.YYYY if necessary, but assumes format is parseable
                    // Let's assume consistent format for future bookings
                }
            });
            // Initial render after loading
            renderCalendar(currentDate);
        } catch (error) {
            console.error("Fehler beim Laden der Buchungen:", error);
            // Fallback Render falls offline
            renderCalendar(currentDate);
        }
    }

    // Start Loading
    await loadBookings();


    // Listen for guest count changes
    if (guestCountInput) {
        guestCountInput.addEventListener('change', updateBookingSummary);
        guestCountInput.addEventListener('input', updateBookingSummary);
    }

    if (apartmentSelect) {
        apartmentSelect.addEventListener('change', () => {
            // Future: Load different bookedDates based on apartment
        });
    }

    function renderCalendar(date) {
        calendarGrid.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();

        // Month Names
        const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        currentMonthYear.textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay();
        const startDay = firstDay === 0 ? 6 : firstDay - 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Header Rows (Mo, Di, ...)
        const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
        weekdays.forEach(day => {
            const header = document.createElement('div');
            header.classList.add('calendar-day-header');
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // Empty slots
        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement('div');
            calendarGrid.appendChild(empty);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = i;

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            dayEl.dataset.date = dateStr;

            if (bookedDates.includes(dateStr)) {
                dayEl.classList.add('booked');
                dayEl.title = "Belegt";
            }

            const checkDate = new Date(year, month, i);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (checkDate < today) {
                dayEl.classList.add('disabled');
            }

            dayEl.addEventListener('click', () => handleDateClick(checkDate, dateStr, dayEl));

            calendarGrid.appendChild(dayEl);
        }

        updateCalendarSelection();
    }

    function handleDateClick(dateObj, dateStr, el) {
        if (el.classList.contains('disabled') || el.classList.contains('booked')) return;

        if ((selectedStartDate && selectedEndDate) || (selectedStartDate && dateObj < selectedStartDate)) {
            selectedStartDate = dateObj;
            selectedEndDate = null;
        } else if (!selectedStartDate) {
            selectedStartDate = dateObj;
        } else if (!selectedEndDate) {
            if (isRangeFree(selectedStartDate, dateObj)) {
                selectedEndDate = dateObj;
            } else {
                alert("Der gewählte Zeitraum enthält bereits belegte Tage.");
                return;
            }
        }

        updateCalendarSelection();
        updateBookingSummary();
    }

    function isRangeFree(start, end) {
        let current = new Date(start);
        current.setDate(current.getDate() + 1);

        while (current < end) { // Check bis < end, da end wieder Abreise ist
            const y = current.getFullYear();
            const m = String(current.getMonth() + 1).padStart(2, '0');
            const d = String(current.getDate()).padStart(2, '0');
            const dateStr = `${y}-${m}-${d}`;

            if (bookedDates.includes(dateStr)) return false;
            current.setDate(current.getDate() + 1);
        }
        return true;
    }

    function updateCalendarSelection() {
        const days = document.querySelectorAll('.calendar-day');
        days.forEach(day => {
            const dayDate = new Date(day.dataset.date);
            day.classList.remove('selected', 'in-range');

            if (!day.dataset.date) return;

            if (selectedStartDate && dayDate.getTime() === selectedStartDate.getTime()) {
                day.classList.add('selected');
            }
            if (selectedEndDate && dayDate.getTime() === selectedEndDate.getTime()) {
                day.classList.add('selected');
            }

            if (selectedStartDate && selectedEndDate) {
                if (dayDate > selectedStartDate && dayDate < selectedEndDate) {
                    day.classList.add('in-range');
                }
            }
        });
    }

    function updateBookingSummary() {
        if (selectedStartDate) {
            checkinDisplay.textContent = selectedStartDate.toLocaleDateString('de-DE');
        } else {
            checkinDisplay.textContent = '-';
        }

        if (selectedEndDate) {
            checkoutDisplay.textContent = selectedEndDate.toLocaleDateString('de-DE');

            const diffTime = Math.abs(selectedEndDate - selectedStartDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const guests = parseInt(guestCountInput.value) || 1;
            const total = diffDays * pricePerPerson * guests;

            priceCalc.innerHTML = `${diffDays} Nächte x ${guests} Pers. x ${pricePerPerson} €`;
            totalDisplay.textContent = `${total} €`;
            finalPriceAmount.textContent = `${total} €`;

            const aptNr = apartmentSelect ? apartmentSelect.value : '15';
            bookingRef.textContent = `Whg${aptNr}-${selectedStartDate.toLocaleDateString('de-DE')}-${Date.now().toString().substr(-4)}`;

            totalPriceContainer.style.display = 'flex';
            bookBtn.disabled = false;
        } else {
            checkoutDisplay.textContent = '-';
            priceCalc.textContent = "Wählen Sie ein Abreisedatum";
            totalPriceContainer.style.display = 'none';
            bookBtn.disabled = true;
        }
    }

    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    /* --- Modal & Form Logic --- */
    const modal = document.getElementById('bookingFormContainer');
    const closeBtn = document.querySelector('.close-modal');
    const finalForm = document.getElementById('finalBookingForm');
    const bankDetails = document.getElementById('bankDetails');
    const submitBtn = document.getElementById('submitBookingBtn');

    bookBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        bankDetails.style.display = 'none';
        finalForm.reset();
        submitBtn.style.display = 'block';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    finalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.textContent = 'Verarbeite...';
        submitBtn.disabled = true;

        // --- FIREBASE: Add to Firestore ---
        try {
            await addDoc(collection(db, "bookings"), {
                bookingRef: bookingRef.textContent,
                name: document.getElementById('guestName').value,
                email: document.getElementById('guestEmail').value,
                phone: document.getElementById('guestPhone').value,
                checkin: checkinDisplay.textContent,
                checkout: checkoutDisplay.textContent,
                checkinDateISO: selectedStartDate.toISOString(), // for sorting/blocking
                checkoutDateISO: selectedEndDate.toISOString(),  // for sorting/blocking
                price: finalPriceAmount.textContent,
                apartment: apartmentSelect.value,
                guests: guestCountInput.value,
                timestamp: new Date().toISOString()
            });

            // Success UI
            submitBtn.style.display = 'none';
            bankDetails.style.display = 'block';
            submitBtn.textContent = 'Kostenpflichtig buchen';
            submitBtn.disabled = false;

            // Reload calendar to show own booking immediately (blocked)
            await loadBookings();

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Es gab einen Fehler bei der Buchung. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.");
            submitBtn.textContent = 'Kostenpflichtig buchen';
            submitBtn.disabled = false;
        }

    });

});
