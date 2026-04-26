// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('themeToggleBtn');
let isDarkMode = false;

themeToggleBtn.addEventListener('click', function() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.style.backgroundColor = '#1a1a1a';
        document.body.style.color = '#ffffff';
        document.body.classList.add('dark-theme');
        themeToggleBtn.textContent = 'Açık Temaya Geç';
        themeToggleBtn.classList.remove('btn-outline-secondary');
        themeToggleBtn.classList.add('btn-warning');
        
        // Update navbar
        document.querySelector('.navbar').classList.remove('navbar-dark', 'bg-dark');
        document.querySelector('.navbar').classList.add('bg-secondary');
        
        // Update footer
        document.querySelector('footer').classList.remove('bg-dark');
        document.querySelector('footer').classList.add('bg-secondary');
        
        // Update cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.backgroundColor = '#2a2a2a';
            card.style.color = '#ffffff';
            card.style.borderColor = '#444444';
        });
        
        // Update sections
        const sections = document.querySelectorAll('.bg-light');
        sections.forEach(section => {
            section.classList.remove('bg-light');
            section.style.backgroundColor = '#252525';
        });
        
    } else {
        document.body.style.backgroundColor = '#ffffff';
        document.body.style.color = '#000000';
        document.body.classList.remove('dark-theme');
        themeToggleBtn.textContent = 'Koyu Temaya Geç';
        themeToggleBtn.classList.add('btn-outline-secondary');
        themeToggleBtn.classList.remove('btn-warning');
        
        // Update navbar
        document.querySelector('.navbar').classList.add('navbar-dark', 'bg-dark');
        document.querySelector('.navbar').classList.remove('bg-secondary');
        
        // Update footer
        document.querySelector('footer').classList.add('bg-dark');
        document.querySelector('footer').classList.remove('bg-secondary');
        
        // Update cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.backgroundColor = '#ffffff';
            card.style.color = '#000000';
            card.style.borderColor = '#dee2e6';
        });
        
        // Update sections
        const lightSections = document.querySelectorAll('[style*="backgroundColor"]');
        document.getElementById('form-section').classList.add('bg-light');
    }
});

// Form Submission and Summary Generation
const applicationForm = document.getElementById('applicationForm');
const resultSection = document.getElementById('resultSection');
const summaryCard = document.getElementById('summaryCard');

applicationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const email = document.getElementById('email').value.trim();
    const department = document.getElementById('department').value;
    const grade = document.getElementById('grade').value;
    const eventPreference = document.getElementById('eventPreference').value;
    const eventDate = document.getElementById('eventDate').value;
    const message = document.getElementById('message').value.trim();
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    // Validation
    if (!firstName) {
        alert('Ad Soyadı alanı boş bırakılamaz!');
        document.getElementById('firstName').focus();
        return;
    }
    
    if (!email) {
        alert('E-posta alanı boş bırakılamaz!');
        document.getElementById('email').focus();
        return;
    }
    
    if (!email.includes('@')) {
        alert('Lütfen geçerli bir e-posta adresi girin!');
        document.getElementById('email').focus();
        return;
    }
    
    if (!department) {
        alert('Lütfen bölüm seçiniz!');
        document.getElementById('department').focus();
        return;
    }
    
    if (!grade) {
        alert('Lütfen sınıf seçiniz!');
        document.getElementById('grade').focus();
        return;
    }
    
    if (!eventPreference) {
        alert('Lütfen etkinlik seçiniz!');
        document.getElementById('eventPreference').focus();
        return;
    }
    
    if (!eventDate) {
        alert('Lütfen katılım tarihini seçiniz!');
        document.getElementById('eventDate').focus();
        return;
    }
    
    if (!agreeTerms) {
        alert('Lütfen kullanım şartlarını kabul ediniz!');
        document.getElementById('agreeTerms').focus();
        return;
    }
    
    // Format date
    const dateObj = new Date(eventDate);
    const formattedDate = dateObj.toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Create summary
    const summaryHTML = `
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Başvuru Özeti</h5>
        </div>
        <div class="card-body">
            <div class="row mb-3">
                <div class="col-md-6">
                    <h6 class="text-muted">Ad Soyadı</h6>
                    <p class="fw-bold">${escapeHtml(firstName)}</p>
                </div>
                <div class="col-md-6">
                    <h6 class="text-muted">E-posta</h6>
                    <p class="fw-bold">${escapeHtml(email)}</p>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <h6 class="text-muted">Bölüm</h6>
                    <p class="fw-bold">${escapeHtml(department)}</p>
                </div>
                <div class="col-md-6">
                    <h6 class="text-muted">Sınıf</h6>
                    <p class="fw-bold">${escapeHtml(grade)}</p>
                </div>
            </div>
            
            <div class="row mb-3">
                <div class="col-md-6">
                    <h6 class="text-muted">Etkinlik</h6>
                    <p class="fw-bold">${escapeHtml(eventPreference)}</p>
                </div>
                <div class="col-md-6">
                    <h6 class="text-muted">Katılım Tarihi</h6>
                    <p class="fw-bold">${formattedDate}</p>
                </div>
            </div>
            
            ${message ? `<div class="mb-3">
                <h6 class="text-muted">Mesaj</h6>
                <p>${escapeHtml(message)}</p>
            </div>` : ''}
            
            <div class="alert alert-success mt-4">
                <strong>✓ Başvurunuz başarıyla kaydedilmiştir!</strong>
            </div>
        </div>
    `;
    
    summaryCard.innerHTML = summaryHTML;
    resultSection.style.display = 'block';
    
    // Scroll to result
    resultSection.scrollIntoView({ behavior: 'smooth' });
    
    // Reset form
    applicationForm.reset();
});

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
