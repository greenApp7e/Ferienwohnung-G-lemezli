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

    /* --- Theme Toggle (Dark/Light) --- */
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        body.classList.add('dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }

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

    // State Variables (anstatt DOM-Links, da wir manche Elemente gelöscht haben)
    let calculatedTotal = 0;
    let currentBookingRef = "";

    // Alte DOM Elemente (falls sie existieren, nutzen wir sie für Anzeige, sonst ignorieren)
    const finalPriceAmount = document.getElementById('finalPriceAmount');
    const bookingRef = document.getElementById('bookingRef');

    let currentDate = new Date();
    let selectedStartDate = null;
    let selectedEndDate = null;
    const pricePerPerson = 45; // Preis pro Person in Euro

    // --- FIREBASE: Fetch Booked Dates ---
    let bookedDates = [];

    function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());
        const dates = [];

        while (date <= endDate) {
            // Use local YYYY-MM-DD construction to avoid timezone shifts
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            dates.push(`${y}-${m}-${d}`);

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
                // Filter: Only show Confirmed or Admin Block
                if ((data.status === 'confirmed' || data.name === 'Admin Block') && data.checkinDateISO && data.checkoutDateISO) {
                    const start = new Date(data.checkinDateISO);
                    const end = new Date(data.checkoutDateISO);
                    bookedDates.push(...getDatesInRange(start, end));
                }
            });
            renderCalendar(currentDate);
        } catch (error) {
            console.error("Fehler beim Laden der Buchungen:", error);
            renderCalendar(currentDate);
        }
    }

    await loadBookings();


    if (guestCountInput) {
        guestCountInput.addEventListener('change', updateBookingSummary);
        guestCountInput.addEventListener('input', updateBookingSummary);
    }

    function renderCalendar(date) {
        // Clear grid
        calendarGrid.innerHTML = '';

        const year = date.getFullYear();
        const month = date.getMonth();

        const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        currentMonthYear.textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon
        const startDay = firstDay === 0 ? 6 : firstDay - 1; // 0 = Mon, ... 6 = Sun
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

        // Headers
        weekdays.forEach(day => {
            const header = document.createElement('div');
            header.classList.add('calendar-day-header');
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // Empty Slots (Days before 1st)
        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement('div');
            calendarGrid.appendChild(empty);
        }

        // Days 1..31
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

        // Reset if:
        // 1. Both dates already selected (starting new range)
        // 2. Clicked date is BEFORE start date
        // 3. Clicked date is SAME as start date (prevent 0-night booking)
        if ((selectedStartDate && selectedEndDate) || (selectedStartDate && dateObj <= selectedStartDate)) {
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

        while (current < end) {
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

        // Helper to format Date -> YYYY-MM-DD
        const toYMD = (date) => {
            if (!date) return null;
            const y = date.getFullYear();
            const m = String(date.getMonth() + 1).padStart(2, '0');
            const d = String(date.getDate()).padStart(2, '0');
            return `${y}-${m}-${d}`;
        };

        const startStr = toYMD(selectedStartDate);
        const endStr = toYMD(selectedEndDate);

        days.forEach(day => {
            const dayDateStr = day.dataset.date;
            if (!dayDateStr) return;

            // Reset classes
            day.classList.remove('selected', 'in-range');

            // Check Start
            if (startStr && dayDateStr === startStr) {
                day.classList.add('selected');
            }
            // Check End
            if (endStr && dayDateStr === endStr) {
                day.classList.add('selected');
            }
            // Check Range
            if (startStr && endStr) {
                if (dayDateStr > startStr && dayDateStr < endStr) {
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

            // Save to variable
            calculatedTotal = total;

            const aptNr = apartmentSelect ? apartmentSelect.value : '15';
            currentBookingRef = `Whg${aptNr}-${selectedStartDate.toLocaleDateString('de-DE')}-${Date.now().toString().substr(-4)}`;

            // UI Updates (if elements exist)
            priceCalc.innerHTML = `${diffDays} Nächte x ${guests} Pers. x ${pricePerPerson} €`;
            totalDisplay.textContent = `${total} €`;

            if (finalPriceAmount) finalPriceAmount.textContent = `${total} €`;
            if (bookingRef) bookingRef.textContent = currentBookingRef;

            totalPriceContainer.style.display = 'flex';
            bookBtn.disabled = false;
        } else {
            checkoutDisplay.textContent = '-';
            priceCalc.textContent = "Wählen Sie ein Abreisedatum";
            totalPriceContainer.style.display = 'none';
            bookBtn.disabled = true;
        }
    }

    const modal = document.getElementById('bookingFormContainer');
    const closeBtn = document.querySelector('.close-modal');
    const finalForm = document.getElementById('finalBookingForm');
    const bankDetails = document.getElementById('bankDetails');
    const submitBtn = document.getElementById('submitBookingBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });
    }

    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            bankDetails.style.display = 'none';
            finalForm.reset();
            submitBtn.style.display = 'block';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    /* --- Lightbox Logic --- */
    // Create Lightbox DOM elements if not present
    if (!document.getElementById('lightbox')) {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';

        const close = document.createElement('span');
        close.className = 'lightbox-close';
        close.innerHTML = '&times;';

        const img = document.createElement('img');
        img.className = 'lightbox-content';
        img.id = 'lightbox-img';

        lightbox.appendChild(close);
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);

        // Event Listeners for Lightbox
        const galleryImages = document.querySelectorAll('.gallery-grid img');
        galleryImages.forEach(image => {
            image.style.cursor = 'pointer';
            image.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightbox.style.alignItems = 'center';
                lightbox.style.justifyContent = 'center';
                img.src = image.src;
            });
        });

        close.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.style.display = 'none';
        });
    }

    /* --- Final Booking Form Submission --- */
    finalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.textContent = 'Verarbeite...';
        submitBtn.disabled = true;

        // --- FIREBASE: Add to Firestore ---
        try {
            await addDoc(collection(db, "bookings"), {
                bookingRef: currentBookingRef || `REF-${Date.now()}`, // Fallback if empty
                name: document.getElementById('guestName').value,
                email: document.getElementById('guestEmail').value,
                phone: document.getElementById('guestPhone').value,
                checkin: checkinDisplay.textContent,
                checkout: checkoutDisplay.textContent,
                checkinDateISO: selectedStartDate.toISOString(),
                checkoutDateISO: selectedEndDate.toISOString(),
                price: `${calculatedTotal} €`,
                apartment: apartmentSelect.value,
                guests: guestCountInput.value,
                status: 'pending', // FORCE PENDING
                timestamp: new Date().toISOString()
            });

            // Success UI
            submitBtn.style.display = 'none';
            bankDetails.style.display = 'block';
            submitBtn.textContent = 'Kostenpflichtig buchen';
            submitBtn.disabled = false;

            await loadBookings();

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Es gab einen Fehler bei der Übertragung. Bitte prüfen Sie Ihre Verbindung.");
            submitBtn.textContent = 'Kostenpflichtig buchen';
            submitBtn.disabled = false;
        }

    });

});
