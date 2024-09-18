/* eslint-disable */
const token = getCookie("accessToken");
const userRole = getCookie("userRole");
const createArtikel = async () => {
  const tambahDataForm = document.getElementById("tambahArtikelForm");
  if (tambahDataForm) {
    tambahDataForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const token = getCookie("accessToken");
      const userRole = getCookie("userRole");

      try {
        const artikelData = {
          judul: document.getElementById("inputJudul").value,
          deskripsi: document.getElementById("inputDeskripsi").value,
          tanggal: document.getElementById("inputTanggal").value,
          sumber: document.getElementById("inputSumber").value,
          kategori: document.getElementById("inputKategori").value,
          gambar: document.getElementById("inputGambar").value,
          status: "draft", // Set status 'draft' by default
        };

        const artikelResponse = await fetch("/api/artikel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([artikelData]),
        });

        if (!artikelResponse.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }

        const { data: newArtikel } = await artikelResponse.json();
        const artikelId = newArtikel.id;
        await logAction("Create", "artikel", artikelId, token, userRole);

        await Swal.fire({
          title: "Berhasil!",
          text: "Data artikel berhasil disimpan.",
          icon: "success",
          confirmButtonText: "OK",
        });

        window.location.reload();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Terjadi kesalahan saat menyimpan data.",
          icon: "error",
          confirmButtonText: "OK",
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

const deleteArtikel = async (id) => {
  const result = await Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Anda tidak akan dapat mengembalikan data ini!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Tidak, batalkan",
  });

  if (result.isConfirmed) {
    try {
      const userRole = getCookie("userRole");
      const token = localStorage.getItem("token");
      await Promise.all([
        fetch(`/api/artikel/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        logAction("Delete", "artikel", id, token, userRole),
      ]);

      await Swal.fire({
        title: "Berhasil!",
        text: "Data artikel berhasil dihapus.",
        icon: "success",
        confirmButtonText: "OK",
      });

      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat menghapus data.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
};

const updateArtikel = async (id) => {
  try {
    const getResponse = await fetch(`/api/artikel/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!getResponse.ok) {
      const errorText = await getResponse.text();
      throw new Error(`Network getResponse was not ok: ${errorText}`);
    }
    const artikel = await getResponse.json();

    const formatTanggal = (tanggal) => {
      const date = new Date(tanggal);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedTanggal = formatTanggal(artikel.data.tanggal);

    document.getElementById("editJudul").value = artikel.data.judul;
    document.getElementById("editDeskripsi").value = artikel.data.deskripsi;
    document.getElementById("editTanggal").value = formattedTanggal;
    document.getElementById("editSumber").value = artikel.data.sumber;
    document.getElementById("editKategori").value = artikel.data.kategori;
    document.getElementById("editGambar").value = artikel.data.gambar;

    const editArtikelForm = document.getElementById("editArtikelForm");
    editArtikelForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const userRole = getCookie("userRole");
        // const token = localStorage.getItem("token");
        

        const artikelData = {
          judul: document.getElementById("editJudul").value,
          deskripsi: document.getElementById("editDeskripsi").value,
          tanggal: document.getElementById("editTanggal").value,
          sumber: document.getElementById("editSumber").value,
          kategori: document.getElementById("editKategori").value,
          gambar: document.getElementById("editGambar").value,
        };

        await Promise.all([
          fetch(`/api/artikel/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(artikelData),
          }),
          logAction("Edit", "artikel", id, token, userRole),
        ]);

        await Swal.fire({
          title: "Berhasil!",
          text: "Data artikel berhasil diupdate.",
          icon: "success",
          confirmButtonText: "OK",
        });

        window.location.reload();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Terjadi kesalahan saat mengupdate data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Terjadi kesalahan saat mengambil data.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

const publishArtikel = async (id) => {
  const result = await Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Artikel akan dipublikasikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, publikasikan!",
    cancelButtonText: "Tidak, batalkan",
  });

  if (result.isConfirmed) {
    try {
      const userRole = getCookie("userRole");
      const token = localStorage.getItem("token");
      await Promise.all([
        fetch(`/api/artikel/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "published" }),
        }),
        logAction("Publish", "artikel", id, token, userRole),
      ]);

      await Swal.fire({
        title: "Berhasil!",
        text: "Artikel berhasil dipublikasikan.",
        icon: "success",
        confirmButtonText: "OK",
      });

      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat mempublikasikan artikel.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
};
const DraftArtikel = async (id) => {
  const result = await Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Artikel akan Draft Kembali!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, Draft!",
    cancelButtonText: "Tidak, batalkan",
  });

  if (result.isConfirmed) {
    try {
      const userRole = getCookie("userRole");
      const token = localStorage.getItem("token");
      await Promise.all([
        fetch(`/api/artikel/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "draft" }),
        }),
        logAction("Draft", "artikel", id, token, userRole),
      ]);

      await Swal.fire({
        title: "Berhasil!",
        text: "Artikel berhasil disimpan sebagai draft.",
        icon: "success",
        confirmButtonText: "OK",
      });

      window.location.reload();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Terjadi kesalahan saat mempublikasikan artikel.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
};

const attachEventListeners = () => {
  const deleteButtons = document.querySelectorAll("#delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const artikelId = button.getAttribute("data-id");
      deleteArtikel(artikelId);
    });
  });

  const editButtons = document.querySelectorAll("#edit-button");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const artikelId = button.getAttribute("data-id");
      updateArtikel(artikelId);
    });
  });

  const publishButtons = document.querySelectorAll("#publish-button");
  publishButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const artikelId = button.getAttribute("data-id");
      publishArtikel(artikelId);
    });
  });
  const draftButtons = document.querySelectorAll("#draft-button");
  draftButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const artikelId = button.getAttribute("data-id");
      DraftArtikel(artikelId);
    });
  });
};

const loadPageData = async (pageUrl) => {
  const artikelListDiv = document.getElementById("artikelList");
  try {
    const response = await fetch(pageUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Respons jaringan tidak ok: ${errorText}`);
    }

    const data = await response.json();
    artikelListDiv.innerHTML = "";

    if (data.data.length > 0) {
      data.data.forEach((artikel) => {
        const artikelCard = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100 position-relative">
                    <div class="category-label position-absolute start-0 p-2 bg-warning text-dark rounded">
                        ${artikel.kategori}
                    </div>
                    <img src="${artikel.gambar}" alt="${
          artikel.judul
        }" class="card-img-top skeleton-img" style="height: 150px; background-color: #e1e1e1; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${artikel.judul}</h5>
                        <div class="mt-auto d-flex justify-content-center">
                            <button type="button" id="edit-button" class="btn button-tambah px-4 me-2" data-bs-toggle="modal" data-bs-target="#editArtikelModal" data-id="${
                              artikel.id
                            }"><i class="bi bi-pencil"></i></button>
                            <button type="button" id="delete-button" class="btn px-4 me-2 btn-danger" data-id="${
                              artikel.id
                            }"><i class="bi bi-trash"></i></button>
                            ${
                              artikel.status === "draft" &&
                              userRole === "superadmin"
                                ? `<button type="button" id="publish-button" class="btn btn-success  px-4 me-2" data-id="${artikel.id}">Publish</button>`
                                : ""
                            }
                            ${
                              artikel.status === "published" &&
                              userRole === "superadmin"
                                ? `<button type="button" id="draft-button" class="btn btn-primary  px-4 me-2" data-id="${artikel.id}">Draft</button>`
                                : ""
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        `;
        artikelListDiv.innerHTML += artikelCard;
      });
      attachEventListeners();
    } else {
      artikelListDiv.innerHTML = `
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
      paginationHtml += `<a class="pagination-button" href="/artikel?page=1&limit=12">First</a>`;
      paginationHtml += `<a class="pagination-button" href="/artikel?page=${
        currentPage - 1
      }&limit=12">Previous</a>`;
    }

    for (let i = 1; i <= totalPages; i++) {
      paginationHtml += `<a class="pagination-button ${
        currentPage === i ? "active" : ""
      }" href="/artikel?page=${i}&limit=12">${i}</a>`;
    }

    if (currentPage < totalPages) {
      paginationHtml += `<a class="pagination-button" href="/artikel?page=${
        currentPage + 1
      }&limit=12">Next</a>`;
      paginationHtml += `<a class="pagination-button" href="/artikel?page=${totalPages}&limit=12">Last</a>`;
    }
  }

  paginationDiv.innerHTML = paginationHtml;
};

const searchArtikel = async () => {
  const searchForm = document.getElementById("searchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const keyword = document.getElementById("searchKeyword").value;
      const searchUrl = `/api/artikel?q=${keyword}`;
      await loadPageData(searchUrl);
    });
  }
};

const filterArtikel = async (page = 1) => {
  try {
    const token = getCookie("accessToken");
    const artikelResponse = await fetch(`/api/artikel?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!artikelResponse.ok) {
      const errorText = await artikelResponse.text();
      throw new Error(`Respons jaringan tidak ok: ${errorText}`);
    }

    const artikelData = await artikelResponse.json();
  } catch (error) {
    console.error("Error saat mengambil artikel:", error);
  }
};
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

document.addEventListener("DOMContentLoaded", createArtikel);

document.addEventListener("DOMContentLoaded", () => {
  attachEventListeners();
  searchArtikel();
  filterArtikel();
});
