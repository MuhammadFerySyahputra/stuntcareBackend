/* eslint-disable no-undef */
const request = require('supertest');
const web = require('../src/application/web');

xdescribe('GET /api/mpasi', () => {
  it('should get mpasi and check response type and content', async () => {
    const response = await request(web).get('/api/mpasi');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Sukses mendapatkan data Makanan');
  });
});

xdescribe('POST /api/mpasi', () => {
  xit('should create a new mpasi', async () => {
    const newMpasi = {
      makanan: 'Tim Mie Ayam',
      porsi: 3,
      bahan: {
        Mie_telur_rebus_hingga_matang: '150 gram',
        Daging_ayam_cincang: '75 gram',
        Tahu: '20 gram',
        Telur_ayam: '1 butir',
        Kaldu_ayam: '200 ml',
        Kecap_asin: '1 sdt',
        Kecap_manis: '1 sdt',
        Sawi_iris_kecil: '30 gram',
        Minyak_Canola: '10 ml',
        Daun_seledri: 'secukupnya',
      },
      cara_masak: [
        '1. Campurkan mie telur yang sudah matang dengan bumbu halus, kecap asin, kecap manis, telur ayam kocok, kaldu ayam, dan daging ayam cincang. Aduk hingga tercampur rata. Tambahkan minyak canola',
        '2. Masukkan campuran mie ke dalam wadah tahan panas, lalu kukus hingga kaldu terserap mie',
        '3. Tambahkan irisan seledri dan sawi, lalu kukus kembali hingga matang',
        '4. Goreng hingga berubah warna dan matang',
      ],
      kategori: '9-12 bulan',
      gambar: 'https://img-global.cpcdn.com/recipes/a6a7786a65dfec53/680x482cq70/tim-mie-ayam-mpasi-10m-foto-resep-utama.webp',
      kalori: 150,
      protein: 6.5,
      lemak: 6.8,
      karbohidrat: 15,
    };

    const response = await request(web)
      .post('/api/mpasi')
      .send(newMpasi)
      .set('Content', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Sukses menambahkan data Makanan');
  });

  it('should fail to create a new mpasi with missing required fields', async () => {
    const newMpasi = {
    };

    const response = await request(web)
      .post('/api/mpasi')
      .send(newMpasi)
      .set('Content', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('"makanan" is required. "porsi" is required. "bahan" is required. "cara_masak" is required. "kategori" is required');
  });
});

xdescribe('PUT /api/mpasi/:id', () => {
  it('should update an existing mpasi', async () => {
    const updatedMpasi = {
      makanan: 'Tim Mie Ayam',
      porsi: 3,
      bahan: {
        Mie_telur_rebus_hingga_matang: '150 gram',
        Daging_ayam_cincang: '75 gram',
        Tahu: '20 gram',
        Telur_ayam: '1 butir',
        Kaldu_ayam: '200 ml',
        Kecap_asin: '1 sdt',
        Kecap_manis: '1 sdt',
        Sawi_iris_kecil: '30 gram',
        Minyak_Canola: '10 ml',
        Daun_seledri: 'secukupnya',
      },
      cara_masak: [
        '1. Campurkan mie telur yang sudah matang dengan bumbu halus, kecap asin, kecap manis, telur ayam kocok, kaldu ayam, dan daging ayam cincang. Aduk hingga tercampur rata. Tambahkan minyak canola',
        '2. Masukkan campuran mie ke dalam wadah tahan panas, lalu kukus hingga kaldu terserap mie',
        '3. Tambahkan irisan seledri dan sawi, lalu kukus kembali hingga matang',
        '4. Goreng hingga berubah warna dan matang',
      ],
      kategori: '9-12 bulan',
      gambar: 'https://img-global.cpcdn.com/recipes/a6a7786a65dfec53/680x482cq70/tim-mie-ayam-mpasi-10m-foto-resep-utama.webp',
      kalori: 150,
      protein: 6.5,
      lemak: 6.8,
      karbohidrat: 15,
    };

    const mpasiId = 47;
    const response = await request(web)
      .put(`/api/mpasi/${mpasiId}`)
      .send(updatedMpasi)
      .set('Content', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Sukses mengubah data Makanan');
  });

  it('should fail to update an mpasi with invalid ID', async () => {
    const updatedMpasi = {
      // Updated data
    };

    const invalidId = 'invalidId';

    const response = await request(web)
      .put(`/api/mpasi/${invalidId}`)
      .send(updatedMpasi)
      .set('Content', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('"value" must be a number');
  });
});

xdescribe('DELETE /api/mpasi/:id', () => {
  it('should delete an existing mpasi', async () => {
    const mpasiId = 47;
    const response = await request(web)
      .delete(`/api/mpasi/${mpasiId}`)
      .set('Content', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Berhasil menghapus data makanan');
  });

  it('should fail to delete an mpasi with id already deleted', async () => {
    const mpasiId = 100;
    const response = await request(web)
      .delete(`/api/mpasi/${mpasiId}`)
      .set('Content', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe('Gagal menghapus data makanan');
  });

  it('should fail to delete an mpasi with invalid ID', async () => {
    const invalidId = 'invalidId';

    const response = await request(web)
      .delete(`/api/mpasi/${invalidId}`)
      .set('Content', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('"value" must be a number');
  });
});
