/* eslint-disable no-undef */
const request = require('supertest');
const web = require('../src/application/web');

xdescribe('GET /api/artikel', () => {
  it('should get artikel and check response type and content', async () => {
    const response = await request(web).get('/api/artikel');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Sukses mendapatkan data Artikel');
  });
});

xdescribe('POST /api/artikel', () => {
  it('should create a new artikel', async () => {
    const newArtikel = {
      judul: 'Apa itu stunting',
      deskripsi: 'Stunting adalah kondisi terhambatnya pertumbuhan fisik dan perkembangan otak pada anak-anak, biasanya disebabkan oleh kurangnya asupan gizi yang memadai dan infeksi pada masa awal kehidupan',
      tanggal: '2024-05-14',
      sumber: 'http://sumber.com',
      gambar: 'https://link.gambar.com',
      kategori: 'Semua Kategori',
    };

    const response = await request(web)
      .post('/api/artikel')
      .send(newArtikel)
      .set('Content', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Sukses menambahkan data Artikel');
  });

  it('should fail to create a new artikel with missing required fields', async () => {
    const newArtikel = {
    };

    const response = await request(web)
      .post('/api/artikel')
      .send(newArtikel)
      .set('Content', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('"judul" is required. "deskripsi" is required. "tanggal" is required. "sumber" is required. "kategori" is required');
  });
});

xdescribe('PUT /api/artikel/:id', () => {
  it('should update an existing artikel', async () => {
    const updatedArtikel = {
      judul: 'Apa itu stunting',
      deskripsi: 'Stunting adalah kondisi terhambatnya pertumbuhan fisik dan perkembangan otak pada anak-anak, biasanya disebabkan oleh kurangnya asupan gizi yang memadai dan infeksi pada masa awal kehidupan',
      tanggal: '2024-05-14',
      sumber: 'http://sumber.com',
      gambar: 'https://link.gambar.com',
      kategori: 'Semua Kategori',
    };

    const artikelId = 35;
    const response = await request(web)
      .put(`/api/artikel/${artikelId}`)
      .send(updatedArtikel)
      .set('Content', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Sukses mengubah artikel');
  });

  it('should fail to update an artikel with invalid ID', async () => {
    const updatedMpasi = {
      // Updated data
    };

    const invalidId = 'invalidId';

    const response = await request(web)
      .put(`/api/artikel/${invalidId}`)
      .send(updatedMpasi)
      .set('Content', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('"value" must be a number');
  });
});

xdescribe('DELETE /api/artikel/:id', () => {
  it('should delete an existing artikel', async () => {
    const artikelId = 34;
    const response = await request(web)
      .delete(`/api/artikel/${artikelId}`)
      .set('Content', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Berhasil menghapus artikel');
  });

  it('should fail to delete an artikel with id already deleted', async () => {
    const artikelId = 100;
    const response = await request(web)
      .delete(`/api/artikel/${artikelId}`)
      .set('Content', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body.errors).toBe('Gagal menghapus artikel');
  });

  it('should fail to delete an artikel with invalid ID', async () => {
    const invalidId = 'invalidId';

    const response = await request(web)
      .delete(`/api/artikel/${invalidId}`)
      .set('Content', 'application/json');
    expect(response.status).toBe(400);
    expect(response.body.errors).toBe('"value" must be a number');
  });
});
