async function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();

  try {
    const res = await fetch("users.json");
    const users = await res.json();

    const valid = users.find(u => u.username === user && u.password === pass);
    if (valid) {
      document.getElementById("login-container").classList.add("hidden");
      document.getElementById("dashboard").classList.remove("hidden");
    } else {
      document.getElementById("loginError").innerText = "Username / Password Salah!";
    }
  } catch (e) {
    alert("Gagal mengambil data pengguna.");
  }
}

// Simulasi OSINT NIK
function submitNIK() {
  const nik = document.getElementById("nikInput").value.trim();
  if (!nik) return alert("Masukan NIK terlebih dahulu.");
  const result = document.getElementById("nikResults");
  result.innerHTML += `<p>📄 NIK Masuk: <strong>${nik}</strong></p>`;
}

// IP Tracker
async function trackIP() {
  const ip = document.getElementById("ipInput").value.trim();
  const result = document.getElementById("ipResult");
  if (!ip) return alert("Masukan IP terlebih dahulu.");

  try {
    const data = await fetch(`https://ipapi.co/${ip}/json/`).then(res => res.json());
    if (data.error) throw new Error("IP tidak valid.");

    result.innerHTML = `
      <p>🌐 IP: ${data.ip}</p>
      <p>📍 Kota: ${data.city}</p>
      <p>🗺️ Wilayah: ${data.region}</p>
      <p>🌎 Negara: ${data.country_name}</p>
      <p>🏢 ISP: ${data.org}</p>
      <p>📌 Maps: <a href="https://www.google.com/maps?q=${data.latitude},${data.longitude}" target="_blank">Lihat Lokasi</a></p>
    `;
  } catch (e) {
    result.innerHTML = "<p style='color: red;'>Gagal mendapatkan detail IP.</p>";
  }
}