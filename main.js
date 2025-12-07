document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Navigation --- */
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle hamburger animation
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
                // Close mobile menu if open
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

    // Dummy Data for booked dates (YYYY-MM-DD)
    // Load booked dates from LocalStorage (Sync with Admin) or use default
    const bookedDates = JSON.parse(localStorage.getItem('bookedDates')) || [
        "2025-12-10", "2025-12-11", "2025-12-12",
        "2025-12-24", "2025-12-25", "2025-12-26",
        "2026-01-01"
    ];

    // Listen for guest count changes
    if (guestCountInput) {
        guestCountInput.addEventListener('change', updateBookingSummary);
        guestCountInput.addEventListener('input', updateBookingSummary);
    }

    // Listen for apartment changes (optional: could load different blocked dates)
    if (apartmentSelect) {
        apartmentSelect.addEventListener('change', () => {
            // Future: Load different bookedDates based on apartment
            console.log("Apartment changed to: " + apartmentSelect.value);
        });
    }



    function renderCalendar(date) {
        calendarGrid.innerHTML = '';
        const year = date.getFullYear();
        const month = date.getMonth();

        // Month Names
        const monthNames = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        currentMonthYear.textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon ...
        // Adjust for Monday start (0=Mon, 6=Sun)
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

        // Empty slots before first day
        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement('div');
            calendarGrid.appendChild(empty);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.classList.add('calendar-day');
            dayEl.textContent = i;

            // Generate standard date string YYYY-MM-DD
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            dayEl.dataset.date = dateStr;

            // Check if booked
            if (bookedDates.includes(dateStr)) {
                dayEl.classList.add('booked');
                dayEl.title = "Belegt";
            }

            // Check past dates
            const checkDate = new Date(year, month, i);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (checkDate < today) {
                dayEl.classList.add('disabled');
            }

            // Click Handler
            dayEl.addEventListener('click', () => handleDateClick(checkDate, dateStr, dayEl));

            calendarGrid.appendChild(dayEl);
        }

        updateCalendarSelection();
    }

    function handleDateClick(dateObj, dateStr, el) {
        if (el.classList.contains('disabled') || el.classList.contains('booked')) return;

        // Reset if both selected or clicking before start
        if ((selectedStartDate && selectedEndDate) || (selectedStartDate && dateObj < selectedStartDate)) {
            selectedStartDate = dateObj;
            selectedEndDate = null;
        } else if (!selectedStartDate) {
            selectedStartDate = dateObj;
        } else if (!selectedEndDate) {
            // Validate range (no booked dates in between)
            if (isRangeFree(selectedStartDate, dateObj)) {
                selectedEndDate = dateObj;
            } else {
                alert("Der gewählte Zeitraum enthält bereits belegte Tage.");
                return; // Do not select
            }
        }

        updateCalendarSelection();
        updateBookingSummary();
    }

    function isRangeFree(start, end) {
        let current = new Date(start);
        current.setDate(current.getDate() + 1); // Start checking from next day

        while (current <= end) {
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

            if (!day.dataset.date) return; // Skip empty/headers

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

            // New Calculation
            const guests = parseInt(guestCountInput.value) || 1;
            const total = diffDays * pricePerPerson * guests;

            priceCalc.innerHTML = `${diffDays} Nächte x ${guests} Pers. x ${pricePerPerson} €`;
            totalDisplay.textContent = `${total} €`;
            finalPriceAmount.textContent = `${total} €`; // Für Modal

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

    // Month Navigation
    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    // Initial Render
    renderCalendar(currentDate);


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

    finalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Save Booking locally (Simulation)
        const newBooking = {
            id: bookingRef.textContent,
            name: document.getElementById('guestName').value,
            email: document.getElementById('guestEmail').value,
            phone: document.getElementById('guestPhone').value,
            checkin: checkinDisplay.textContent,
            checkout: checkoutDisplay.textContent,
            price: finalPriceAmount.textContent,
            apartment: apartmentSelect.value,
            guests: guestCountInput.value,
            date: new Date().toISOString()
        };

        const existingBookings = JSON.parse(localStorage.getItem('adminBookings')) || [];
        existingBookings.push(newBooking);
        localStorage.setItem('adminBookings', JSON.stringify(existingBookings));

        submitBtn.textContent = 'Wird verarbeitet...';

        setTimeout(() => {
            submitBtn.style.display = 'none';
            bankDetails.style.display = 'block';
            submitBtn.textContent = 'Kostenpflichtig buchen';

            // Optional: Scroll to bottom of modal
            modal.querySelector('.modal-content').scrollTop = modal.querySelector('.modal-content').scrollHeight;
        }, 1000);

    });

});
