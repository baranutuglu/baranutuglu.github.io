// Grade calculator
document.getElementById('gradeForm').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('studentName').value.trim() || 'Öğrenci';
  const vize = parseFloat(document.getElementById('midterm').value) || 0;
  const final = parseFloat(document.getElementById('final').value) || 0;
  const avg = (vize * 0.4) + (final * 0.6);

  function letterGrade(n){
    if(n >= 90) return 'AA';
    if(n >= 80) return 'BA';
    if(n >= 70) return 'BB';
    if(n >= 60) return 'CB';
    if(n >= 50) return 'CC';
    return 'FF';
  }

  const grade = letterGrade(avg);
  const status = (avg >= 50) ? 'Geçti' : 'Kaldı';

  const out = `<strong>${escapeHtml(name)}</strong><br>Ort: ${avg.toFixed(2)}<br>Harf Notu: ${grade}<br>Durum: ${status}`;
  const res = document.getElementById('gradeResult');
  res.innerHTML = out; res.classList.remove('hidden');
});

// Converter
document.getElementById('convForm').addEventListener('submit', function(e){
  e.preventDefault();
  const val = parseFloat(document.getElementById('valueIn').value);
  const type = document.getElementById('convType').value;
  let result = '';

  if(isNaN(val)) return;

  if(type === 'm_to_km'){
    result = (val / 1000).toFixed(3) + ' km';
  } else if(type === 'c_to_f'){
    result = (val * 9/5 + 32).toFixed(3) + ' °F';
  } else if(type === 'kg_to_g'){
    result = (val * 1000).toFixed(3) + ' g';
  }

  const rbox = document.getElementById('convResult');
  rbox.innerHTML = `<strong>Sonuç:</strong> ${result}`;
  rbox.classList.remove('hidden');
});

// simple escape to avoid basic injection in names
function escapeHtml(str){
  return str.replace(/[&<>"']/g, function(ch){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[ch];
  });
}
