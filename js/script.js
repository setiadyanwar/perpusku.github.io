/*=============== SHOW HIDDEN - PASSWORD ===============*/
const togglePasswordVisibility = (passwordId, toggleId) => {
  const passwordInput = document.getElementById(passwordId);
  const toggleIcon = document.getElementById(toggleId);

  toggleIcon.addEventListener("click", () => {
    // Toggle between password and text input type
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      // Change icon
      toggleIcon.classList.add("ri-eye-line");
      toggleIcon.classList.remove("ri-eye-off-line");
    } else {
      passwordInput.type = "password";
      // Change icon back
      toggleIcon.classList.remove("ri-eye-line");
      toggleIcon.classList.add("ri-eye-off-line");
    }
  });
};

togglePasswordVisibility("password-input", "toggle-password");

document
  .querySelector(".form-container")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("name-input");
    const passwordInput = document.getElementById("password-input");

    if (nameInput.value.trim() && passwordInput.value.trim()) {
      alert("Berhasil login!");
      window.location.href = "index.html";
    } else {
      alert("Harap isi semua kolom!");
    }
  });

document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
document.querySelector(".next").addEventListener("click", () => moveSlide(1));

/*=============== CRUD TRANSAKSI ===============*/
// Validasi form inputs sebelum submit
function ValidateForm() {
  var nama = document.getElementById("nama-peminjam").value;
  var judul = document.getElementById("judul-buku").value;
  var kategori = document.getElementById("kategori-buku").value;
  var transaksi = document.getElementById("jenis-transaksi").value;
  var tanggalPinjam = document.getElementById("tanggal-peminjaman").value;
  var tanggalKembali = document.getElementById("tanggal-pengembalian").value;

  if (!nama || !judul || !kategori || !transaksi || !tanggalPinjam || !tanggalKembali) {
      alert("Semua field harus diisi!");
      return false;
  }
  return true;
}

// Tampilkan data di tabel
// Fungsi untuk menampilkan data di tabel
function showData() {
  console.log("Memulai fungsi showData...");

  // Mendapatkan elemen tbody yang benar
  var tableBody = document.querySelector("#crudTable tbody");

  // Pastikan <tbody> ada di halaman
  if (!tableBody) {
      console.error("Elemen <tbody> tidak ditemukan.");
      return;
  }

  // Mendapatkan data dari localStorage
  var peoplelist = localStorage.getItem("peopleList");

  // Jika tidak ada data
  if (!peoplelist) {
      console.log("Tidak ada data di localStorage.");
      tableBody.innerHTML = "<tr><td colspan='8'>Tidak ada data</td></tr>";
      return;
  }

  // Parse data menjadi objek JavaScript
  peoplelist = JSON.parse(peoplelist);
  console.log("Data ditemukan di localStorage:", peoplelist);

  var html = "";
  peoplelist.forEach(function (element, index) {
      html += `
          <tr>
              <td>${index + 1}</td>
              <td>${element["nama-peminjam"]}</td>
              <td>${element["judul-buku"]}</td>
              <td>${element["kategori-buku"]}</td>
              <td>${element["jenis-transaksi"]}</td>
              <td>${element["tanggal-peminjaman"]}</td>
              <td>${element["tanggal-pengembalian"]}</td>
              <td>
                  <button class="delete" onclick='deleteData(${index})'>Delete</button>
              </td>
          </tr>`;
  });

  // Menampilkan data dalam <tbody>
  tableBody.innerHTML = html;
}

// Tambahkan data baru
function AddData() {
  if (ValidateForm()) {
      var nama = document.getElementById("nama-peminjam").value;
      var judul = document.getElementById("judul-buku").value;
      var kategori = document.getElementById("kategori-buku").value;
      var transaksi = document.getElementById("jenis-transaksi").value;
      var tanggalPinjam = document.getElementById("tanggal-peminjaman").value;
      var tanggalKembali = document.getElementById("tanggal-pengembalian").value;

      var peoplelist = JSON.parse(localStorage.getItem("peopleList")) || [];

      peoplelist.push({
          "nama-peminjam": nama,
          "judul-buku": judul,
          "kategori-buku": kategori,
          "jenis-transaksi": transaksi,
          "tanggal-peminjaman": tanggalPinjam,
          "tanggal-pengembalian": tanggalKembali
      });

      localStorage.setItem("peopleList", JSON.stringify(peoplelist));
      showData();

      // Reset form setelah tambah data
      document.getElementById("nama-peminjam").value = "";
      document.getElementById("judul-buku").value = "";
      document.getElementById("kategori-buku").value = "";
      document.getElementById("jenis-transaksi").value = "";
      document.getElementById("tanggal-peminjaman").value = "";
      document.getElementById("tanggal-pengembalian").value = "";

      alert("Data berhasil ditambahkan!");
  }
}

// Hapus data
function deleteData(index) {
  var peoplelist = JSON.parse(localStorage.getItem("peopleList")) || [];
  peoplelist.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peoplelist));
  showData();
}



function updateData() {
  // Ambil index data yang sedang diedit
  var index = localStorage.getItem("editIndex");

  // Ambil data terbaru dari form
  var updatedData = {
      "nama-peminjam": document.getElementById("nama-peminjam").value,
      "judul-buku": document.getElementById("judul-buku").value,
      "kategori-buku": document.getElementById("kategori-buku").value,
      "jenis-transaksi": document.getElementById("jenis-transaksi").value,
      "tanggal-peminjaman": document.getElementById("tanggal-peminjaman").value,
      "tanggal-pengembalian": document.getElementById("tanggal-pengembalian").value
  };

  // Ambil data lama dari localStorage
  var peoplelist = JSON.parse(localStorage.getItem("peopleList"));

  // Perbarui data yang dipilih dengan data baru
  peoplelist[index] = updatedData;

  // Simpan data yang sudah diperbarui ke localStorage
  localStorage.setItem("peopleList", JSON.stringify(peoplelist));

  // Hapus index edit yang tersimpan
  localStorage.removeItem("editIndex");

  // Perbarui tampilan data di halaman daftar
  showData();

  // Sembunyikan tombol Update setelah update selesai
  document.getElementById("update").style.display = "none";
}

// Panggil showData saat halaman dimuat
document.addEventListener("DOMContentLoaded", showData);

