import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { translations } from "./translations.js";

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

    /* --- Language System --- */
    const languageSelect = document.getElementById('languageSelect');

    function changeLanguage(lang) {
        const t = translations[lang];
        const fallback = translations['en'] || translations['de']; // Fallback chain

        if (!t) return;

        // Save selection
        localStorage.setItem('preferredLanguage', lang);

        // Update all data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const newText = t[key] || fallback[key] || "";
            if (newText) {
                if (newText.includes('<')) {
                    el.innerHTML = newText;
                } else {
                    el.textContent = newText;
                }
            }
        });

        // Re-render things that depend on language (Calendar, etc.)
        renderCalendar(currentDate);
        updateBookingSummary(); // Refresh price text
    }

    // Initialize Language
    const savedLang = localStorage.getItem('preferredLanguage') || 'de';
    if (languageSelect) {
        languageSelect.value = savedLang;
        languageSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
        // Apply initial language
        changeLanguage(savedLang);
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

    /* --- BOOKING SYSTEM --- */
    const calendarGrid = document.querySelector('.calendar-grid');
    const currentMonthYear = document.getElementById('currentMonthYear');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');

    // Form Inputs
    const guestCountInput = document.getElementById('guestCount');
    const apartmentSelect = document.getElementById('apartmentSelect');

    // State
    const pricePerPerson = 45;
    let currentDate = new Date();
    let selectionStart = null;
    let selectionEnd = null;
    let bookedDates = []; // YYYY-MM-DD strings

    function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());
        const dates = [];
        while (date <= endDate) {
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
                // Also showing 'pending' for immediate feedback might be good, 
                // but let's stick to confirmed/block for now unless user wants otherwise.
                // Actually, if we just made a booking, it's pending. We should probably show it.
                if ((data.status === 'confirmed' || data.status === 'pending' || data.name === 'Admin Block') && data.checkinDateISO && data.checkoutDateISO) {
                    const start = new Date(data.checkinDateISO);
                    const end = new Date(data.checkoutDateISO);
                    bookedDates.push(...getDatesInRange(start, end));
                }
            });
            renderCalendar(currentDate);
        } catch (error) {
            console.error("Fehler beim Laden der Buchungen:", error);
            const curLang = languageSelect ? languageSelect.value : 'de';
            const t = translations[curLang] || translations['de'];
            console.log(t.error_load || "Fehler beim Laden.");
            renderCalendar(currentDate);
        }
    }

    // Initial Load
    await loadBookings();

    if (guestCountInput) {
        guestCountInput.addEventListener('change', updateBookingSummary);
        guestCountInput.addEventListener('input', updateBookingSummary);
    }

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

    /* --- Calendar Render Logic --- */
    function renderCalendar(date) {
        if (!calendarGrid) return;

        // Get current language dictionary
        const curLang = languageSelect ? languageSelect.value : 'de';
        const t = translations[curLang] || translations['de'];

        // Clear grid
        calendarGrid.innerHTML = '';

        const year = date.getFullYear();
        const month = date.getMonth();

        // Use translated months
        const monthNames = t.months || ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
        currentMonthYear.textContent = `${monthNames[month]} ${year}`;

        const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon
        const startDay = firstDay === 0 ? 6 : firstDay - 1; // 0 = Mon, ... 6 = Sun
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Use translated weekdays
        const weekdays = t.weekdays || ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

        // Headers
        weekdays.forEach(day => {
            const header = document.createElement('div');
            header.classList.add('calendar-day-header');
            header.textContent = day;
            calendarGrid.appendChild(header);
        });

        // Empty Slots
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
                dayEl.title = t.legend_booked || "Belegt";
            }

            const checkDate = new Date(year, month, i);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (checkDate < today) {
                dayEl.classList.add('disabled');
            }

            dayEl.addEventListener('click', () => handleDateClick(dateStr));
            calendarGrid.appendChild(dayEl);
        }
        updateCalendarSelection();
    }

    function handleDateClick(dateStr) {
        if (bookedDates.includes(dateStr)) return;

        // Check if date is in past
        const clickedDate = new Date(dateStr);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (clickedDate < today) return;

        // Translation helper
        const curLang = languageSelect ? languageSelect.value : 'de';
        const t = translations[curLang] || translations['de'];

        if (!selectionStart || (selectionStart && selectionEnd)) {
            selectionStart = dateStr;
            selectionEnd = null;
        } else {
            // Check if range is valid (no booked dates in between)
            if (new Date(dateStr) < new Date(selectionStart)) {
                selectionStart = dateStr;
                selectionEnd = null;
            } else {
                if (isRangeAvailable(selectionStart, dateStr)) {
                    selectionEnd = dateStr;
                } else {
                    alert(t.msg_range_occupied || "Der gewählte Zeitraum enthält bereits belegte Tage.");
                    selectionStart = dateStr;
                    selectionEnd = null;
                }
            }
        }
        updateCalendarSelection();
        updateBookingSummary();
    }

    function isRangeAvailable(start, end) {
        let curr = new Date(start);
        const endDate = new Date(end);
        while (curr <= endDate) {
            const d = curr.toISOString().split('T')[0];
            if (bookedDates.includes(d)) return false;
            curr.setDate(curr.getDate() + 1);
        }
        return true;
    }

    function updateCalendarSelection() {
        document.querySelectorAll('.calendar-day').forEach(el => {
            el.classList.remove('selected', 'in-range');
            const d = el.dataset.date;
            if (d === selectionStart || d === selectionEnd) {
                el.classList.add('selected');
            }
            if (selectionStart && selectionEnd) {
                if (d > selectionStart && d < selectionEnd) {
                    el.classList.add('in-range');
                }
            }
        });
    }

    function updateBookingSummary() {
        const checkinEl = document.getElementById('summaryCheckin');
        const checkoutEl = document.getElementById('summaryCheckout');
        const totalEl = document.getElementById('summaryTotal');
        const dateNote = document.getElementById('dateSelectionNote');
        const submitBtn = document.getElementById('openBookingModal');

        const curLang = languageSelect ? languageSelect.value : 'de';
        const t = translations[curLang] || translations['de'];

        if (selectionStart && selectionEnd) {
            checkinEl.textContent = selectionStart;
            checkoutEl.textContent = selectionEnd;

            const start = new Date(selectionStart);
            const end = new Date(selectionEnd);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const guests = parseInt(guestCountInput.value) || 1;
            const total = diffDays * guests * pricePerPerson;

            totalEl.textContent = `${total} €`;
            dateNote.textContent = `${diffDays} ${t.msg_price_calc_prefix || 'Nächte x'} ${guests} ${t.msg_price_calc_middle || 'Pers. x'} ${pricePerPerson} €`;

            submitBtn.disabled = false;
        } else {
            checkinEl.textContent = "-";
            checkoutEl.textContent = "-";
            totalEl.textContent = "-";
            dateNote.textContent = t.msg_select_dates || "Wählen Sie Reisedaten für die Preisberechnung";
            submitBtn.disabled = true;
        }
    }


    /* --- MODAL & SUBMIT --- */
    const modal = document.getElementById('bookingModal');
    const openModalBtn = document.getElementById('openBookingModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const bookingForm = document.getElementById('bookingForm');

    if (openModalBtn) {
        openModalBtn.addEventListener('click', () => {
            if (!selectionStart || !selectionEnd) return;
            modal.style.display = "block";
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const curLang = languageSelect ? languageSelect.value : 'de';
            const t = translations[curLang] || translations['de'];

            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = t.btn_processing || "Verarbeite...";

            const name = document.getElementById('b_name').value;
            const email = document.getElementById('b_email').value;
            const phone = document.getElementById('b_phone').value;
            const apartment = apartmentSelect.value;
            const guests = guestCountInput.value;

            // Generate Booking Reference
            const refPrefix = t.booking_ref_prefix || "Whg";
            const bookingRef = `${refPrefix}-${Date.now().toString().slice(-6)}`;

            try {
                // Save to Firestore
                await addDoc(collection(db, "bookings"), {
                    selectionStart: selectionStart,
                    selectionEnd: selectionEnd,
                    checkinDateISO: new Date(selectionStart).toISOString(),
                    checkoutDateISO: new Date(selectionEnd).toISOString(),
                    apartment: apartment,
                    guests: parseInt(guests),
                    totalPrice: document.getElementById('summaryTotal').textContent,
                    name: name,
                    email: email,
                    phone: phone,
                    bookingRef: bookingRef,
                    status: 'pending',
                    createdAt: serverTimestamp()
                });

                // Success UI
                alert(`${t.success_title || 'Vielen Dank!'} \n${t.success_msg || 'Ihre Anfrage wurde gesendet.'}\nRef: ${bookingRef}`);
                modal.style.display = "none";
                bookingForm.reset();
                selectionStart = null;
                selectionEnd = null;
                updateCalendarSelection();
                updateBookingSummary();

            } catch (error) {
                console.error("Error adding booking: ", error);
                alert(t.error_transfer || "Es gab einen Fehler bei der Übertragung.");
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                // Re-fetch 
                loadBookings();
            }
        });
    }

    /* --- Lightbox Logic --- */
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

        // Event Listeners
        const galleryImages = document.querySelectorAll('.gallery-grid img');
        galleryImages.forEach(image => {
            image.style.cursor = 'pointer';
            image.addEventListener('click', () => {
                lightbox.style.display = 'flex';
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

});
