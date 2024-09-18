/* eslint-disable */
const token = getCookie('accessToken');
const userRole = getCookie('userRole');
const createMpasi = async () => {
  const tambahDataForm = document.getElementById('tambahMpasiForm');
  const addCaraMasakButton = document.getElementById('addCaraMasakButton');
  const caraMasakContainer = document.getElementById('caraMasakContainer');
  const addBahanButton = document.getElementById('addBahanButton');
  const bahanContainer = document.getElementById('bahanContainer');

  const addInputGroup = (container, inputGroupHTML) => {
    container.insertAdjacentHTML('beforeend', inputGroupHTML);
    const newInputGroup = container.lastElementChild;
    const removeButton = newInputGroup.querySelector('.removeButton');

    removeButton.addEventListener('click', () => {
      container.removeChild(newInputGroup);
    });
  };

  if (addCaraMasakButton) {
    addCaraMasakButton.addEventListener('click', () => {
      const newInputGroupHTML = `
        <div class="input-group mb-2 caraMasakInput">
          <input type="text" class="form-control" name="caraMasak[]" placeholder="Masukkan cara memasak" required>
          <button type="button" class="btn btn-danger removeButton">×</button>
        </div>
      `;
      addInputGroup(caraMasakContainer, newInputGroupHTML);
    });
  }

  if (addBahanButton) {
    addBahanButton.addEventListener('click', () => {
      const newInputGroupHTML = `
        <div class="input-group mb-2 bahanInput">
          <input type="text" class="form-control" name="bahanKey[]" placeholder="Masukkan nama bahan" required>
          <input type="text" class="form-control" name="bahanValue[]" placeholder="Masukkan jumlah" required>
          <button type="button" class="btn btn-danger removeButton">×</button>
        </div>
      `;
      addInputGroup(bahanContainer, newInputGroupHTML);
    });
  }

  if (tambahDataForm) {
    tambahDataForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        const bahanKeys = document.getElementsByName('bahanKey[]');
        const bahanValues = document.getElementsByName('bahanValue[]');
        const bahan = {};
        for (let i = 0; i < bahanKeys.length; i += 1) {
          bahan[bahanKeys[i].value] = bahanValues[i].value;
        }

        const caraMasakInputs = document.getElementsByName('caraMasak[]');
        const caraMasak = Array.from(caraMasakInputs).map((input) => input.value);

        const mpasiData = {
          makanan: document.getElementById('inputMakanan').value,
          porsi: document.getElementById('inputPorsi').value,
          bahan,
          cara_masak: caraMasak,
          kategori: document.getElementById('inputKategori').value,
          gambar: document.getElementById('inputGambar').value,
          kalori: parseFloat(document.getElementById('inputKalori').value),
          protein: parseFloat(document.getElementById('inputProtein').value),
          lemak: parseFloat(document.getElementById('inputLemak').value),
          karbohidrat: parseFloat(document.getElementById('inputKarbohidrat').value),
        };

        const mpasiResponse = await fetch('/api/mpasi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([mpasiData]),
        });

        if (!mpasiResponse.ok) {
          const errorText = await response.text();
          console.error('Error:', errorText);
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const responseData = await mpasiResponse.json();
        const newMpasi = responseData.data;
        const mpasiId = newMpasi.id;

        const tambahLog = {
          userRole,
          action: 'Create',
          entity: 'mpasi',
          entityId: mpasiId,
        };

        const logResponse = await fetch('/api/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(tambahLog),
        });

        if (!logResponse.ok) {
          const errorText = await logResponse.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        await Swal.fire({
          title: 'Berhasil!',
          text: 'Data MPASI berhasil disimpan.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        window.location.reload();
      } catch (error) {
        console.error('Error:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Terjadi kesalahan saat menyimpan data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    });
  }
};

const logAction = async (action, entity, entityId, token, userRole) => {
  const logData = {
    userRole: userRole,
    action: action,
    entity: entity,
    entityId: entityId,
  };
  const logResponse = await fetch("/api/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(logData),
  });

  if (!logResponse.ok) {
    const errorText = await logResponse.text();
    throw new Error(`Respons jaringan tidak ok: ${errorText}`);
  }
};

const deleteMpasi = async (id) => {
  const result = await Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Data mpasi yang dihapus tidak dapat dikembalikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  });

  if (result.isConfirmed) {
    try {
      const logDeleteMpasi = {
        userRole,
        action: 'Delete',
        entity: 'mpasi',
        entityId: id,
      };

      const [mpasiResponse, logResponse] = await Promise.all([
        fetch(`/api/mpasi/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch('/api/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(logDeleteMpasi),
        }),
      ]);

      if (!mpasiResponse.ok || !logResponse.ok) {
        throw new Error('Network response was not ok');
      }

      await Swal.fire({
        title: 'Berhasil!',
        text: 'Data mpasi berhasil dihapus.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat menghapus data.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
};

const updateMpasi = async (id) => {
  try {
    const getResponse = await fetch(`/api/mpasi/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!getResponse.ok) {
      const errorText = await getResponse.text();
      console.error('Error:', errorText);
      throw new Error(`Network getResponse was not ok: ${errorText}`);
    }

    const mpasi = await getResponse.json();

    const bahanString = JSON.stringify(mpasi.data.bahan, null, 2);
    const cleanedBahanString = bahanString.replace(/\\/g, '').slice(1, -1);

    document.getElementById('editId').value = id;
    document.getElementById('editMakanan').value = mpasi.data.makanan;
    document.getElementById('editPorsi').value = mpasi.data.porsi;
    document.getElementById('editBahan').value = cleanedBahanString;
    document.getElementById('editKalori').value = mpasi.data.kalori;
    document.getElementById('editProtein').value = mpasi.data.protein;
    document.getElementById('editLemak').value = mpasi.data.lemak;
    document.getElementById('editKarbohidrat').value = mpasi.data.karbohidrat;
    document.getElementById('editKategori').value = mpasi.data.kategori;
    document.getElementById('editGambar').value = mpasi.data.gambar;

    const editCaraMasakContainer = document.getElementById('editCaraMasakContainer');
    const addEditCaraMasakButton = document.getElementById('addEditCaraMasakButton');
    editCaraMasakContainer.innerHTML = '';
    const masak = mpasi.data.cara_masak;

    masak.forEach((caraMasak) => {
      const inputGroup = document.createElement('div');
      inputGroup.className = 'input-group mb-2 editCaraMasakInput';
      inputGroup.innerHTML = `
        <input type="text" class="form-control" name="editCaraMasak[]" placeholder="Masukkan cara memasak" value="${caraMasak}" required>
        <button type="button" class="btn btn-danger removeEditCaraMasakButton">×</button>
      `;
      editCaraMasakContainer.appendChild(inputGroup);
      const removeButton = inputGroup.querySelector('.removeEditCaraMasakButton');
      removeButton.addEventListener('click', () => {
        editCaraMasakContainer.removeChild(inputGroup);
      });
    });

    if (addEditCaraMasakButton) {
      addEditCaraMasakButton.addEventListener('click', () => {
        const newInputGroupHTML = `
          <div class="input-group mb-2 editCaraMasakInput">
            <input type="text" class="form-control" name="editCaraMasak[]" placeholder="Masukkan cara memasak" required>
            <button type="button" class="btn btn-danger removeEditCaraMasakButton">×</button>
          </div>
        `;
        editCaraMasakContainer.insertAdjacentHTML('beforeend', newInputGroupHTML);
        const newInputGroup = editCaraMasakContainer.lastElementChild;
        const removeButton = newInputGroup.querySelector('.removeEditCaraMasakButton');
        removeButton.addEventListener('click', () => {
          editCaraMasakContainer.removeChild(newInputGroup);
        });
      });
    }

    const updateDataForm = document.getElementById('updateMpasiForm');
    if (updateDataForm) {
      updateDataForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
          const bahanContent = document.getElementById('editBahan').value;

          let bahan;
          try {
            // Ensure the string is a valid JSON object by adding curly braces if not present
            if (!bahanContent.startsWith('{')) {
              bahan = JSON.parse(`{${bahanContent}}`);
            } else {
              bahan = JSON.parse(bahanContent);
            }
          } catch (parseError) {
            console.error('Error parsing bahan JSON:', parseError);
            Swal.fire({
              title: 'Error!',
              text: 'Format JSON pada bahan tidak valid.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
            return;
          }

          const caraMasakInputs = document.getElementsByName('editCaraMasak[]');
          const caraMasak = Array.from(caraMasakInputs).map((input) => input.value);

          const mpasiData = {
            makanan: document.getElementById('editMakanan').value,
            porsi: document.getElementById('editPorsi').value,
            bahan,
            cara_masak: caraMasak,
            kalori: parseFloat(document.getElementById('editKalori').value),
            protein: parseFloat(document.getElementById('editProtein').value),
            lemak: parseFloat(document.getElementById('editLemak').value),
            karbohidrat: parseFloat(document.getElementById('editKarbohidrat').value),
            kategori: document.getElementById('editKategori').value,
            gambar: document.getElementById('editGambar').value,
          };

          const editMpasi = {
            userRole,
            action: 'Edit',
            entity: 'mpasi',
            entityId: id,
          };

          const [mpasiResponse, logResponse] = await Promise.all([
            fetch(`/api/mpasi/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(mpasiData),
            }),
            fetch('/api/log', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(editMpasi),
            }),
          ]);

          if (!mpasiResponse.ok || !logResponse.ok) {
            throw new Error('Network response was not ok');
          }

          await Swal.fire({
            title: 'Berhasil!',
            text: 'Data mpasi berhasil diupdate.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          window.location.reload();
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            title: 'Error!',
            text: 'Terjadi kesalahan saat mengupdate data.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const publishMpasi = async (id) => {
  const result = await Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Mpasi akan dipublikasikan!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, publikasikan!',
    cancelButtonText: 'Tidak, batalkan',
  });

  if (result.isConfirmed) {
    try {
      const userRole = getCookie("userRole");
      const token = localStorage.getItem("token");
      await Promise.all([
        fetch(`/api/mpasi/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "published" }),
        }),
        logAction("Publish", "mpasi", id, token, userRole),
      ]);

      await Swal.fire({
        title: "Berhasil!",
        text: "mpasi berhasil dipublikasikan.",
        icon: "success",
        confirmButtonText: "OK",
      });

      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat mempublikasikan mpasi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
};
const DraftMpasi = async (id) => {
  const result = await Swal.fire({
    title: 'Apakah Anda yakin?',
    text: 'Artikel akan Draft Kembali!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, Draft!',
    cancelButtonText: 'Tidak, batalkan',
  });

  if (result.isConfirmed) {
    try {
      const userRole = getCookie("userRole");
      const token = localStorage.getItem("token");
      await Promise.all([
        fetch(`/api/mpasi/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "draft" }),
        }),
        logAction("Draft", "mpasi", id, token, userRole),
      ]);

      await Swal.fire({
        title: "Berhasil!",
        text: "mpasi berhasil disimpan sebagai draft.",
        icon: "success",
        confirmButtonText: "OK",
      });

      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat mempublikasikan mpasi.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
};

const attachEventListeners = () => {
  const editButtons = document.querySelectorAll('#edit-button');
  editButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mpasiId = button.getAttribute('data-id');
      updateMpasi(mpasiId);
    });
  });

  const deleteButtons = document.querySelectorAll('#delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mpasiId = button.getAttribute('data-id');
      deleteMpasi(mpasiId);
    });
  });

  const publishButtons = document.querySelectorAll('#publish-button');
  publishButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mpasiId = button.getAttribute('data-id');
      publishMpasi(mpasiId);
    });
  });

  const draftButtons = document.querySelectorAll('#draft-button');
  draftButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mpasiId = button.getAttribute('data-id');
      DraftMpasi(mpasiId);
    });
  });
};

const loadPageData = async (pageUrl) => {
  const mpasiListDiv = document.getElementById('mpasiList');
  try {
    const response = await fetch(pageUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Respons jaringan tidak ok: ${errorText}`);
    }

    const data = await response.json();
    mpasiListDiv.innerHTML = '';

    if (data.data.length > 0) {
      data.data.forEach((mpasi) => {
        const mpasiCard = `
            <div class="col-12 col-md-6 col-lg-3 mb-4 d-flex">
                <div class="card h-100 w-100">
                    <div class="category-label position-absolute start-0 p-2 bg-warning text-dark rounded">
                        ${mpasi.kategori}
                    </div>
                    <img src="${mpasi.gambar}" alt="${
          mpasi.makanan
        }" class="card-img-top skeleton-img">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${mpasi.makanan}</h5>
                        <div class="mt-auto d-flex justify-content-center">
                            <button type="button" id="edit-button" class="btn button-tambah px-4 me-2" data-bs-toggle="modal" data-bs-target="#editArtikelModal" data-id="${
                              mpasi.id
                            }"><i class="bi bi-pencil"></i></button>
                            <button type="button" id="delete-button" class="btn px-4 me-2 btn-danger" data-id="${
                              mpasi.id
                            }"><i class="bi bi-trash"></i></button>
                            ${
                              mpasi.status === "draft" &&
                              userRole === "superadmin"
                                ? `<button type="button" id="publish-button" class="btn btn-success  px-4 me-2" data-id="${mpasi.id}">Publish</button>`
                                : ""
                            }
                            ${
                              mpasi.status === "published" &&
                              userRole === "superadmin"
                                ? `<button type="button" id="draft-button" class="btn btn-primary  px-4 me-2" data-id="${mpasi.id}">Draft</button>`
                                : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
          `;
        mpasiListDiv.innerHTML += mpasiCard;
      });
      attachEventListeners();
    } else {
      mpasiListDiv.innerHTML = `
        <div style="text-align: center;">
          <img src="/images/empty.webp" alt="Page not found image" style="display: block;max-width: 100%;margin-inline: auto;">
        </div>
    `;
    }
    updatePagination(data.page, data.totalPages);
  } catch (error) {
    console.error('Error:', error);
  }
};

const updatePagination = (currentPage, totalPages) => {
  const paginationDiv = document.getElementById("pagination");
  let paginationHtml = "";

  if (totalPages > 1) {
    if (currentPage > 1) {
      paginationHtml += `<a class="pagination-button" href="/mpasi?page=1&limit=12">First</a>`;
      paginationHtml += `<a class="pagination-button" href="/mpasi?page=${
        currentPage - 1
      }&limit=12">Previous</a>`;
    }

    for (let i = 1; i <= totalPages; i++) {
      paginationHtml += `<a class="pagination-button ${
        currentPage === i ? "active" : ""
      }" href="/mpasi?page=${i}&limit=12">${i}</a>`;
    }

    if (currentPage < totalPages) {
      paginationHtml += `<a class="pagination-button" href="/mpasi?page=${
        currentPage + 1
      }&limit=12">Next</a>`;
      paginationHtml += `<a class="pagination-button" href="/mpasi?page=${totalPages}&limit=12">Last</a>`;
    }
  }

  paginationDiv.innerHTML = paginationHtml;
};

const search = async () => {
  const searchForm = document.getElementById('searchForm');
  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const keyword = document.getElementById('searchKeyword').value;
      const searchUrl = `/api/mpasi?q=${keyword}`;
      await loadPageData(searchUrl);
    });
  }
};

const filter = async () => {
  const filterKategori = document.getElementById('filter-kategori');
  if (filterKategori) {
    filterKategori.addEventListener('change', async (e) => {
      const keyword = e.target.value;
      let filterUrl = '/api/mpasi';
      if (keyword !== 'semua') {
        filterUrl = `${filterUrl}?kategori=${keyword}`;
        // filterUrl = `${filterUrl}?limit=30,kategori=${keyword}`;
      }
      await loadPageData(filterUrl);
    });
  }
};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}



document.addEventListener('DOMContentLoaded', () => {
  createMpasi();
  attachEventListeners();
  search();
  filter();
});
