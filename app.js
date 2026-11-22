/**
 * RESELLER BY AGT - Web E-Commerce LEGO Marketplace
 * Spesifikasi Uji Kualitas Produk IT - Black Box & Unit Testing Suite
 * Termasuk 4 Defect / Bug: BVA, EP, Decision Table, State Transition
 */

// Global State
const APP_STATE = {
  bugMode: true, // TRUE: Bug aktif untuk pengujian (FAIL). FALSE: Bug diperbaiki (PASS).
  isLoggedIn: false, // Status Akun: false = Tamu/Guest, true = Member "Levina"
  user: {
    name: "Levina (Member Verified)",
    email: "levina@agt-lego.id"
  },
  cart: [],
  appliedVoucher: null,
  activeFilter: 'all',
  searchQuery: '',
  orders: [
    {
      id: "AGT-ORD-9021",
      date: "18 Nov 2026, 14:30",
      item: "LEGO® Icons 10281 Bonsai Tree",
      qty: 1,
      total: 999000,
      status: "PENDING_PAYMENT" // MENUNGGU PEMBAYARAN
    },
    {
      id: "AGT-ORD-9018",
      date: "17 Nov 2026, 10:15",
      item: "LEGO® Ideas 21349 Tuxedo Cat",
      qty: 1,
      total: 2599000,
      status: "DIPROSES_DIKIRIM" // DIPROSES & DIKIRIM (Uji Bug State Transition disini!)
    },
    {
      id: "AGT-ORD-8942",
      date: "15 Nov 2026, 09:00",
      item: "LEGO® Speed Champions 76917 Nissan Skyline",
      qty: 1,
      total: 459000,
      status: "SELESAI" // SELESAI
    }
  ]
};

// 12 Produk Resmi LEGO dari LEGO Store Indonesia & Brickset
const LEGO_PRODUCTS = [
  {
    id: "21349",
    name: "LEGO® Ideas 21349 Tuxedo Cat",
    category: "ideas",
    categoryName: "Ideas & Icons",
    price: 2599000,
    pieces: 1710,
    stock: 8,
    rating: 4.9,
    image: "images/21349.jpg",
    desc: "Kucing tuksedo hitam-putih yang sangat realistis dengan mata kuning dan biru yang dapat diganti."
  },
  {
    id: "10281",
    name: "LEGO® Icons 10281 Bonsai Tree",
    category: "ideas",
    categoryName: "Botanical Collection",
    price: 999000,
    pieces: 878,
    stock: 15,
    rating: 4.8,
    image: "images/10281.jpg",
    desc: "Seni bonsai klasik Jepang dengan pilihan daun hijau klasik atau bunga sakura merah muda yang memukau."
  },
  {
    id: "76917",
    name: "LEGO® Speed Champions 76917 2 Fast 2 Furious Nissan Skyline GT-R (R34)",
    category: "speed",
    categoryName: "Speed Champions",
    price: 459000,
    pieces: 319,
    stock: 12,
    rating: 4.9,
    image: "images/76917.jpg",
    desc: "Replika legendaris Nissan Skyline GT-R R34 dari film 2 Fast 2 Furious lengkap dengan minifigure Brian O'Conner."
  },
  {
    id: "42141",
    name: "LEGO® Technic 42141 McLaren Formula 1™ Race Car",
    category: "technic",
    categoryName: "Technic",
    price: 3499000,
    pieces: 1432,
    stock: 5,
    rating: 4.9,
    image: "images/42141.jpg",
    desc: "Mobil balap F1 McLaren 2022 dengan mesin silinder V6 bergerak, kemudi presisi, dan diferensial realistis."
  },
  {
    id: "75192",
    name: "LEGO® Star Wars™ 75192 Ultimate Collector Series Millennium Falcon",
    category: "starwars",
    categoryName: "Star Wars",
    price: 15999000,
    pieces: 7541,
    stock: 3,
    rating: 5.0,
    image: "images/75192.jpg",
    desc: "Set Star Wars terbesar sepanjang masa dengan detail luar dalam yang tiada tandingannya."
  },
  {
    id: "10313",
    name: "LEGO® Icons 10313 Wildflower Bouquet",
    category: "ideas",
    categoryName: "Botanical Collection",
    price: 1099000,
    pieces: 939,
    stock: 10,
    rating: 4.8,
    image: "images/10313.jpg",
    desc: "Koleksi 8 spesies bunga liar termasuk bunga jagung, lavender, dan lupin untuk dekorasi rumah abadi."
  },
  {
    id: "10698",
    name: "LEGO® Classic 10698 Large Creative Brick Box",
    category: "classic",
    categoryName: "Classic",
    price: 899000,
    pieces: 790,
    stock: 20,
    rating: 4.7,
    image: "images/10698.jpg",
    desc: "Kotak kreasi klasik berisi 33 warna bata LEGO berbeda dengan jendela, pintu, dan roda."
  },
  {
    id: "76269",
    name: "LEGO® Marvel 76269 Avengers Tower",
    category: "starwars",
    categoryName: "Marvel Super Heroes",
    price: 8499000,
    pieces: 5201,
    stock: 4,
    rating: 4.9,
    image: "images/76269.jpg",
    desc: "Gedung markas Avengers setinggi 90 cm dengan 31 minifigure karakter ikonik film Marvel."
  },
  {
    id: "76419",
    name: "LEGO® Harry Potter™ 76419 Hogwarts™ Castle and Grounds",
    category: "classic",
    categoryName: "Harry Potter",
    price: 2799000,
    pieces: 2660,
    stock: 6,
    rating: 4.9,
    image: "images/76419.jpg",
    desc: "Kastil Hogwarts berskala mikroskopis lengkap dengan Danau Hitam, Menara Astronomi, dan Kamar Rahasia."
  },
  {
    id: "21058",
    name: "LEGO® Architecture 21058 Great Pyramid of Giza",
    category: "classic",
    categoryName: "Architecture",
    price: 2399000,
    pieces: 1476,
    stock: 7,
    rating: 4.8,
    image: "images/21058.jpg",
    desc: "Maha karya arsitektur kuno Mesir yang memperlihatkan konstruksi bagian dalam Piramida Agung Giza."
  },
  {
    id: "60316",
    name: "LEGO® City 60316 Police Station",
    category: "classic",
    categoryName: "City",
    price: 1199000,
    pieces: 668,
    stock: 14,
    rating: 4.6,
    image: "images/60316.jpg",
    desc: "Kantor polisi 3 lantai dengan helikopter, mobil patroli, truk sampah pencuri, dan anjing pelacak."
  },
  {
    id: "854082",
    name: "LEGO® 854082 Lady Liberty Key Chain",
    category: "classic",
    categoryName: "Accessories",
    price: 103200,
    pieces: 1,
    stock: 25,
    rating: 4.5,
    image: "images/854082.jpg",
    desc: "Gantungan kunci resmi minifigure Patung Liberty dengan cincin dan rantai logam yang kokoh."
  }
];

// Helper: Format Rupiah
function formatRupiah(amount) {
  return "Rp " + Number(amount).toLocaleString("id-ID");
}

/* =====================================================================
 * LOGIKA 4 PENGUJIAN & IMPLEMENTASI BUG (BVA, EP, DECISION TABLE, STATE)
 * ===================================================================== */

/**
 * 1. BOUNDARY VALUE ANALYSIS (BVA) - REQ-01: Validasi Jumlah Pembelian
 * Spesifikasi Acuan (REQ-02 dari Dokumen Praktikum):
 * Batas jumlah pesanan integer: 1 s.d. 10 unit per item.
 * Nilai batas pengujian:
 * - 0 (min-1)  : Ditolak (False)
 * - 1 (min)    : Diterima (True)
 * - 10 (max)   : Diterima (True)
 * - 11 (max+1) : Ditolak (False)
 */
function validatePurchaseQuantity(qty, stock = 15) {
  const n = Number(qty);

  if (APP_STATE.bugMode) {
    // ❌ DEFECT BVA (BUG-01): Operator batas atas keliru `<= 11` (seharusnya `<= 10`)
    // Akibatnya: Input 11 unit DITERIMA (True) padahal batas maksimum adalah 10 unit!
    if (n >= 1 && n <= 11 && n <= stock) {
      return { valid: true, message: "Jumlah valid (Bug Mode: 11 diterima)" };
    } else {
      return { valid: false, message: "Jumlah pesanan harus antara 1 s.d. 10 unit!" };
    }
  } else {
    // ✅ KODE BENAR (Perbaikan / Regression Testing):
    if (Number.isInteger(n) && n >= 1 && n <= 10 && n <= stock) {
      return { valid: true, message: "Jumlah valid sesuai batas (1-10 unit)" };
    } else {
      return { valid: false, message: "Jumlah pesanan tidak valid! Maksimal 10 unit per transaksi." };
    }
  }
}

/**
 * 2. EQUIVALENCE PARTITIONING (EP) - REQ-02: Penolakan Input Negatif & Subtotal
 * Spesifikasi Acuan (REQ-03 dari Dokumen Praktikum):
 * - Partisi Valid: Integer positif `1 <= qty <= 10`
 * - Partisi Tidak Valid: Bilangan negatif (`qty < 0`), non-numerik, desimal.
 * - Subtotal = harga * qty. Input negatif HARUS ditolak (ValueError / Exception),
 *   TIDAK BOLEH menghasilkan subtotal negatif.
 */
function calculateSubtotalWithEP(price, qty) {
  const n = Number(qty);

  if (APP_STATE.bugMode) {
    // ❌ DEFECT EP (BUG-02): Tidak memvalidasi partisi negatif (`qty < 0`).
    // Langsung mengalikan harga dengan kuantitas negatif, menghasilkan tagihan minus!
    return {
      success: true,
      subtotal: price * n,
      hasError: false
    };
  } else {
    // ✅ KODE BENAR: Menolak partisi tidak valid (bilangan negatif atau desimal)
    if (isNaN(n) || n <= 0 || !Number.isInteger(n)) {
      return {
        success: false,
        subtotal: 0,
        hasError: true,
        errorMessage: "ValueError: Kuantitas tidak boleh negatif atau pecahan (Partisi Tidak Valid)!"
      };
    }
    return {
      success: true,
      subtotal: price * n,
      hasError: false
    };
  }
}

/**
 * 3. DECISION TABLE TESTING - REQ-03: Aturan Diskon Kupon "RESELLER10"
 * Spesifikasi Acuan (REQ-04 dari Dokumen Praktikum):
 * Diskon 10% diberikan JIKA DAN HANYA JIKA memenuhi 3 kondisi:
 * 1. User login sebagai member (`isLoggedIn == true`)
 * 2. Subtotal belanja >= Rp 100.000 (`subtotal >= 100000`)
 * 3. Kode voucher tepat "RESELLER10"
 * 
 * Decision Table:
 * Rule 1: Login=T, Subtotal>=100k=T, Code='RESELLER10'=T -> Diskon = 10% (Valid)
 * Rule 2: Login=T, Subtotal>=100k=T, Code=SALAH=F      -> Diskon = 0
 * Rule 3: Login=T, Subtotal<100k=F,  Code='RESELLER10'=T -> Diskon = 0
 * Rule 4: Login=F, Subtotal>=100k=T, Code='RESELLER10'=T -> Diskon = 0 (Tamu tidak berhak)
 */
function evaluateVoucherDecisionTable(subtotal, isLoggedIn, voucherCode) {
  const code = (voucherCode || "").trim().toUpperCase();

  if (APP_STATE.bugMode) {
    // ❌ DEFECT DECISION TABLE (BUG-03):
    // Developer lupa mengecek status `isLoggedIn` (atau menggunakan kondisi `|| true`).
    // Akibatnya: Rule 4 (Tamu / Guest yang belum login) TETAP berhasil dapat diskon 10%!
    if (subtotal >= 100000 && code === "RESELLER10") {
      const discount = Math.round(subtotal * 0.10);
      return {
        applied: true,
        discount: discount,
        message: `Kupon RESELLER10 aktif! Potongan 10% (${formatRupiah(discount)}). (⚠️ Bug: Tamu belum login tetap dapat)`
      };
    } else if (code !== "RESELLER10") {
      return { applied: false, discount: 0, message: "Kode voucher tidak valid!" };
    } else {
      return { applied: false, discount: 0, message: "Minimal belanja Rp 100.000 untuk kupon ini!" };
    }
  } else {
    // ✅ KODE BENAR: Mengevaluasi seluruh kondisi tabel keputusan secara ketat
    if (code !== "RESELLER10") {
      return { applied: false, discount: 0, message: "Kode voucher tidak valid!" };
    }
    if (!isLoggedIn) {
      return { applied: false, discount: 0, message: "Kupon RESELLER10 khusus untuk member terdaftar! Silakan Login." };
    }
    if (subtotal < 100000) {
      return { applied: false, discount: 0, message: "Minimal subtotal Rp 100.000 untuk menggunakan kupon ini." };
    }
    const discount = Math.round(subtotal * 0.10);
    return {
      applied: true,
      discount: discount,
      message: `Kupon RESELLER10 berhasil digunakan! Potongan 10% (${formatRupiah(discount)}).`
    };
  }
}

/**
 * 4. STATE TRANSITION TESTING - REQ-04: Alur Status Transaksi Pesanan
 * Spesifikasi Acuan:
 * State Machine Transaksi:
 * - PENDING_PAYMENT -> DIPROSES_DIKIRIM (via aksi 'BAYAR')
 * - PENDING_PAYMENT -> DIBATALKAN (via aksi 'BATALKAN')
 * - DIPROSES_DIKIRIM -> SELESAI (via aksi 'TERIMA_BARANG')
 * 
 * Batasan State (Illegal Transition):
 * - Pesanan yang sudah `DIPROSES_DIKIRIM` (barang dalam pengiriman ekspedisi)
 *   TIDAK BOLEH langsung dibatalkan (`DIBATALKAN`) oleh user!
 * - Pesanan `SELESAI` atau `DIBATALKAN` tidak boleh diubah statusnya lagi.
 */
function executeStateTransition(currentStatus, action) {
  if (APP_STATE.bugMode) {
    // ❌ DEFECT STATE TRANSITION (BUG-04):
    // Sistem mengizinkan pembatalan saat barang sudah dalam status 'DIPROSES_DIKIRIM'!
    if (action === "BATALKAN") {
      // Bug: Tidak mengecek apakah statusnya sudah DIPROSES_DIKIRIM
      return {
        success: true,
        newStatus: "DIBATALKAN",
        message: "Pesanan berhasil dibatalkan! (⚠️ Bug: Barang sedang dikirim kok bisa dibatalkan?)"
      };
    }
    if (currentStatus === "PENDING_PAYMENT" && action === "BAYAR") {
      return { success: true, newStatus: "DIPROSES_DIKIRIM", message: "Pembayaran terverifikasi! Pesanan diproses & dikirim." };
    }
    if (currentStatus === "DIPROSES_DIKIRIM" && action === "TERIMA_BARANG") {
      return { success: true, newStatus: "SELESAI", message: "Pesanan telah diterima. Transaksi selesai!" };
    }
    return { success: false, newStatus: currentStatus, message: "Aksi tidak dikenal!" };
  } else {
    // ✅ KODE BENAR: Validasi State Machine ketat
    if (currentStatus === "PENDING_PAYMENT") {
      if (action === "BAYAR") {
        return { success: true, newStatus: "DIPROSES_DIKIRIM", message: "Pembayaran berhasil! Paket segera dikirim." };
      }
      if (action === "BATALKAN") {
        return { success: true, newStatus: "DIBATALKAN", message: "Pesanan dibatalkan." };
      }
    } else if (currentStatus === "DIPROSES_DIKIRIM") {
      if (action === "TERIMA_BARANG") {
        return { success: true, newStatus: "SELESAI", message: "Pesanan selesai. Terima kasih!" };
      }
      if (action === "BATALKAN") {
        // Blokir transisi ilegal!
        return {
          success: false,
          newStatus: currentStatus,
          message: "Aksi Ditolak! Pesanan yang sudah dikirim ke ekspedisi tidak dapat dibatalkan langsung."
        };
      }
    }
    return {
      success: false,
      newStatus: currentStatus,
      message: `Transisi ilegal: status ${currentStatus} tidak menerima aksi ${action}.`
    };
  }
}

/* =====================================================================
 * UI RENDERING & INTERAKSI WEB E-COMMERCE
 * ===================================================================== */

// Render Product Grid
function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  const filtered = LEGO_PRODUCTS.filter(p => {
    const matchesFilter = (APP_STATE.activeFilter === 'all') || (p.category === APP_STATE.activeFilter);
    const matchesSearch = p.name.toLowerCase().includes(APP_STATE.searchQuery.toLowerCase()) ||
                          p.id.includes(APP_STATE.searchQuery);
    return matchesFilter && matchesSearch;
  });

  const countBadge = document.getElementById("productCount");
  if (countBadge) countBadge.textContent = `Menampilkan ${filtered.length} set Lego`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px; background: white; border-radius: 14px; border: 1px dashed var(--border-light);">
        <p style="font-size: 16px; font-weight: 600; color: var(--muted-text);">Tidak ada produk LEGO yang sesuai dengan pencarian "${APP_STATE.searchQuery}"</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => {
    return `
      <div class="product-card" data-id="${product.id}">
        <div class="product-badge-group">
          <span class="badge-tag badge-official">Official LEGO</span>
          <span class="badge-tag badge-category">${product.categoryName}</span>
        </div>
        <div class="product-img-wrap" onclick="openDetailModal('${product.id}')" style="cursor: pointer;">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.brickset.com/sets/images/${product.id}-1.jpg'">
        </div>
        <div class="product-info">
          <div class="product-meta">
            <span class="product-item-no">Set #${product.id}</span>
            <span>🧩 ${product.pieces} pcs</span>
          </div>
          <h3 class="product-title" onclick="openDetailModal('${product.id}')" style="cursor: pointer;" title="${product.name}">
            ${product.name}
          </h3>
          <div class="product-stock-row">
            <span class="stock-indicator"></span>
            <span>Stok tersedia: <strong>${product.stock}</strong> unit</span>
          </div>
          <div class="product-price-row">
            <div class="price-container">
              <span class="price-label">Harga Resmi</span>
              <span class="product-price">${formatRupiah(product.price)}</span>
            </div>
            <button class="btn-add-cart" onclick="quickAddToCart('${product.id}')">
              <span>+ Keranjang</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Quick Add to Cart
function quickAddToCart(productId) {
  const product = LEGO_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = APP_STATE.cart.find(item => item.id === productId);
  if (existing) {
    const nextQty = existing.qty + 1;
    const val = validatePurchaseQuantity(nextQty, product.stock);
    if (!val.valid) {
      showToast(val.message, "error");
      return;
    }
    existing.qty = nextQty;
  } else {
    APP_STATE.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      qty: 1
    });
  }

  updateCartUI();
  showToast(`"${product.name}" berhasil ditambahkan ke keranjang!`, "success");
}

// Update Cart UI & Calculations
function updateCartUI() {
  const badge = document.getElementById("cartCountBadge");
  const totalCount = APP_STATE.cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);
  if (badge) badge.textContent = totalCount;

  const container = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountRow = document.getElementById("cartDiscountRow");
  const discountEl = document.getElementById("cartDiscount");
  const grandTotalEl = document.getElementById("cartGrandTotal");

  if (!container) return;

  if (APP_STATE.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-state">
        <p style="font-size: 36px; margin-bottom: 8px;">🛒</p>
        <p style="font-weight: 600; color: var(--dark-text); margin-bottom: 4px;">Keranjang belanja masih kosong</p>
        <p style="font-size: 13px;">Pilih koleksi LEGO favoritmu dan masukkan ke keranjang.</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = formatRupiah(0);
    if (discountRow) discountRow.style.display = "none";
    if (grandTotalEl) grandTotalEl.textContent = formatRupiah(0);
    return;
  }

  // Calculate Subtotal with EP Logic
  let subtotal = 0;
  let hasNegativeWarning = false;

  const itemsHtml = APP_STATE.cart.map(item => {
    const calc = calculateSubtotalWithEP(item.price, item.qty);
    const itemSubtotal = calc.subtotal;
    subtotal += itemSubtotal;

    if (item.qty < 0) hasNegativeWarning = true;

    return `
      <div class="cart-item-card">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" onerror="this.src='https://images.brickset.com/sets/images/${item.id}-1.jpg'">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${formatRupiah(item.price)}</div>
          
          <div class="cart-item-controls">
            <div class="qty-control-box">
              <button class="qty-btn" onclick="changeCartItemQty('${item.id}', ${item.qty - 1})">-</button>
              <input type="number" class="qty-input" value="${item.qty}" onchange="changeCartItemQty('${item.id}', this.value)" title="Uji EP: coba ketik -1 disini!">
              <button class="qty-btn" onclick="changeCartItemQty('${item.id}', ${item.qty + 1})">+</button>
            </div>
            <button class="btn-remove-item" onclick="removeCartItem('${item.id}')">Hapus</button>
          </div>

          <div style="font-size: 11px; margin-top: 4px; display: flex; justify-content: space-between;">
            <span style="color: var(--muted-text);">Subtotal:</span>
            <strong style="color: ${itemSubtotal < 0 ? '#E74C3C' : 'var(--dark-text)'};">${formatRupiah(itemSubtotal)}</strong>
          </div>
          ${item.qty < 0 ? `<div style="font-size: 10px; color: #E74C3C; font-weight: 700; margin-top: 2px;">⚠️ BUG EP: Kuantitas negatif diterima! Total tagihan berkurang.</div>` : ''}
        </div>
      </div>
    `;
  }).join("");

  container.innerHTML = itemsHtml;

  // Handle Voucher (Decision Table)
  let discountAmount = 0;
  if (APP_STATE.appliedVoucher) {
    const voucherEval = evaluateVoucherDecisionTable(subtotal, APP_STATE.isLoggedIn, APP_STATE.appliedVoucher);
    if (voucherEval.applied) {
      discountAmount = voucherEval.discount;
      if (discountRow) {
        discountRow.style.display = "table-row";
        if (discountEl) discountEl.textContent = "- " + formatRupiah(discountAmount);
      }
    } else {
      APP_STATE.appliedVoucher = null;
      if (discountRow) discountRow.style.display = "none";
      showToast(voucherEval.message, "error");
    }
  } else {
    if (discountRow) discountRow.style.display = "none";
  }

  const grandTotal = Math.max(0, subtotal - discountAmount);

  if (subtotalEl) subtotalEl.textContent = formatRupiah(subtotal);
  if (grandTotalEl) grandTotalEl.textContent = formatRupiah(grandTotal);

  if (hasNegativeWarning && APP_STATE.bugMode) {
    const msg = document.getElementById("cartNotice");
    if (msg) msg.textContent = "Defect EP Aktif: Kuantitas negatif menghasilkan total belanja berkurang!";
  }
}

// Change Quantity in Cart (with EP and BVA triggers)
function changeCartItemQty(productId, newQty) {
  const item = APP_STATE.cart.find(i => i.id === productId);
  if (!item) return;

  const parsedQty = Number(newQty);

  // Jika kode normal / fixed:
  if (!APP_STATE.bugMode) {
    if (isNaN(parsedQty) || parsedQty <= 0) {
      showToast("Jumlah harus berupa bilangan positif! (EP Validasi)", "error");
      return;
    }
    const valBva = validatePurchaseQuantity(parsedQty, item.stock);
    if (!valBva.valid) {
      showToast(valBva.message, "error");
      return;
    }
    item.qty = parsedQty;
  } else {
    // ⚠️ Bug Mode Aktif:
    // Bug EP: jika user input negatif (misal -1), sistem tetap menerima!
    // Bug BVA: jika user input 11, sistem tetap menerima!
    if (parsedQty > 11) {
      showToast("Jumlah melebihi batas (BVA Bug Mode menolak > 11)", "error");
      return;
    }
    item.qty = parsedQty;
  }

  updateCartUI();
}

// Remove Item from Cart
function removeCartItem(productId) {
  APP_STATE.cart = APP_STATE.cart.filter(i => i.id !== productId);
  updateCartUI();
  showToast("Item dihapus dari keranjang.", "info");
}

// Apply Voucher Code (Decision Table)
function applyVoucherCode() {
  const input = document.getElementById("voucherCodeInput");
  const msgEl = document.getElementById("voucherMessage");
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    showToast("Silakan masukkan kode kupon promo!", "error");
    return;
  }

  const currentSubtotal = APP_STATE.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const evalResult = evaluateVoucherDecisionTable(currentSubtotal, APP_STATE.isLoggedIn, code);

  if (evalResult.applied) {
    APP_STATE.appliedVoucher = code;
    updateCartUI();
    showToast(evalResult.message, "success");
    if (msgEl) {
      msgEl.innerHTML = `<span style="color: #059669; font-weight: 600;">${evalResult.message}</span>`;
    }
  } else {
    showToast(evalResult.message, "error");
    if (msgEl) {
      msgEl.innerHTML = `<span style="color: #DC2626; font-weight: 600;">${evalResult.message}</span>`;
    }
  }
}

// Checkout Process (REQ-05)
function performCheckout() {
  if (APP_STATE.cart.length === 0) {
    showToast("Checkout ditolak: Keranjang belanja kosong! (REQ-05)", "error");
    return;
  }

  const grandTotal = document.getElementById("cartGrandTotal")?.textContent || "0";
  const newOrderId = "AGT-ORD-" + Math.floor(1000 + Math.random() * 9000);
  const firstItem = APP_STATE.cart[0];

  APP_STATE.orders.unshift({
    id: newOrderId,
    date: "Baru saja",
    item: `${firstItem.name} ${APP_STATE.cart.length > 1 ? `(+${APP_STATE.cart.length - 1} item lainnya)` : ''}`,
    qty: APP_STATE.cart.reduce((s, i) => s + Number(i.qty), 0),
    total: grandTotal,
    status: "PENDING_PAYMENT"
  });

  APP_STATE.cart = [];
  APP_STATE.appliedVoucher = null;
  updateCartUI();
  toggleCartDrawer(false);
  renderOrders();

  showToast(`Pesanan berhasil dibuat dengan ID: ${newOrderId}! Status: MENUNGGU PEMBAYARAN`, "success");

  // Scroll to orders section
  document.getElementById("ordersSection")?.scrollIntoView({ behavior: "smooth" });
}

// Render Orders List & State Transitions
function renderOrders() {
  const container = document.getElementById("ordersContainer");
  if (!container) return;

  container.innerHTML = APP_STATE.orders.map(order => {
    let statusClass = "badge-pending";
    let statusLabel = "Menunggu Pembayaran";

    if (order.status === "DIPROSES_DIKIRIM") {
      statusClass = "badge-shipped";
      statusLabel = "Diproses & Dikirim";
    } else if (order.status === "SELESAI") {
      statusClass = "badge-completed";
      statusLabel = "Pesanan Selesai";
    } else if (order.status === "DIBATALKAN") {
      statusClass = "badge-cancelled";
      statusLabel = "Dibatalkan";
    }

    // Action buttons based on status
    let actionsHtml = "";

    if (order.status === "PENDING_PAYMENT") {
      actionsHtml = `
        <button class="btn-state-action btn-pay" onclick="triggerOrderAction('${order.id}', 'BAYAR')">💳 Bayar Sekarang</button>
        <button class="btn-state-action btn-cancel" onclick="triggerOrderAction('${order.id}', 'BATALKAN')">✖ Batalkan</button>
      `;
    } else if (order.status === "DIPROSES_DIKIRIM") {
      actionsHtml = `
        <button class="btn-state-action btn-complete" onclick="triggerOrderAction('${order.id}', 'TERIMA_BARANG')">📦 Konfirmasi Diterima</button>
        <button class="btn-state-action btn-cancel" onclick="triggerOrderAction('${order.id}', 'BATALKAN')" title="Uji Bug State Transition: Coba klik batalkan saat barang sudah dikirim!">⚠️ Batalkan (Uji Bug)</button>
      `;
    } else if (order.status === "SELESAI") {
      actionsHtml = `<span style="font-size: 12px; color: #059669; font-weight: 600;">✓ Transaksi Selesai</span>`;
    } else if (order.status === "DIBATALKAN") {
      actionsHtml = `<span style="font-size: 12px; color: #DC2626; font-weight: 600;">Pesanan Dibatalkan</span>`;
    }

    return `
      <div class="order-card" id="order-${order.id}">
        <div class="order-info-col">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <h4>${order.id}</h4>
            <span style="font-size: 11px; color: var(--muted-text);">• ${order.date}</span>
          </div>
          <p><strong>${order.item}</strong> (Jumlah: ${order.qty})</p>
          <p style="font-weight: 700; color: #D65A64; margin-top: 4px;">Total: ${typeof order.total === 'number' ? formatRupiah(order.total) : order.total}</p>
        </div>

        <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
          <span class="order-state-pill ${statusClass}">${statusLabel}</span>
          <div class="order-actions">
            ${actionsHtml}
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Trigger Order State Transition
function triggerOrderAction(orderId, action) {
  const order = APP_STATE.orders.find(o => o.id === orderId);
  if (!order) return;

  const result = executeStateTransition(order.status, action);
  if (result.success) {
    order.status = result.newStatus;
    renderOrders();
    showToast(result.message, result.newStatus === "DIBATALKAN" && order.status === "DIBATALKAN" ? "info" : "success");
  } else {
    showToast(result.message, "error");
  }
}

// Product Detail & BVA Modal
function openDetailModal(productId) {
  const product = LEGO_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("detailModal");
  const overlay = document.getElementById("modalOverlay");
  const content = document.getElementById("detailModalContent");

  content.innerHTML = `
    <div style="display: flex; gap: 24px; flex-wrap: wrap;">
      <div style="flex: 1; min-width: 240px; text-align: center; background: #FAF8F5; padding: 20px; border-radius: 14px;">
        <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 240px; object-fit: contain;" onerror="this.src='https://images.brickset.com/sets/images/${product.id}-1.jpg'">
        <div style="margin-top: 12px; font-size: 12px; color: var(--muted-text);">Set #${product.id} • ${product.pieces} Pieces</div>
      </div>
      <div style="flex: 1.4; min-width: 260px;">
        <span class="badge-tag badge-category" style="margin-bottom: 8px; display: inline-block;">${product.categoryName}</span>
        <h2 style="font-size: 18px; font-weight: 800; color: var(--dark-text); margin-bottom: 8px;">${product.name}</h2>
        <div style="font-size: 20px; font-weight: 800; color: #D65A64; margin-bottom: 12px;">${formatRupiah(product.price)}</div>
        <p style="font-size: 13px; color: var(--body-text); margin-bottom: 16px;">${product.desc}</p>
        
        <div style="background: #F8FAFC; padding: 14px; border-radius: 10px; border: 1px solid var(--border-light); margin-bottom: 16px;">
          <label style="font-size: 12px; font-weight: 700; color: var(--dark-text); display: block; margin-bottom: 6px;">
            Uji Boundary Value Analysis (BVA): Masukkan Jumlah Unit
          </label>
          <div style="display: flex; gap: 10px; align-items: center;">
            <input type="number" id="modalInputQty" value="1" min="0" max="15" style="width: 80px; padding: 8px; border: 1.5px solid var(--border-light); border-radius: 8px; font-family: 'Poppins'; font-weight: 700; text-align: center;">
            <button class="btn-primary" onclick="submitModalAddToCart('${product.id}')" style="padding: 9px 18px; font-size: 13px;">
              + Tambahkan ke Keranjang
            </button>
          </div>
          <div class="bva-helper-box">
            <strong>📋 Panduan Uji BVA (Nilai Batas 1-10 unit):</strong><br>
            • Masukkan <strong>10</strong>: Harus diterima (PASS)<br>
            • Masukkan <strong>11</strong>: Di Bug Mode akan <strong>DITERIMA</strong> (Bug BVA aktif!)<br>
            • Masukkan <strong>0</strong> atau <strong>12</strong>: Akan ditolak oleh validasi.
          </div>
        </div>
      </div>
    </div>
  `;

  modal.style.display = "block";
  overlay.classList.add("active");
}

function submitModalAddToCart(productId) {
  const product = LEGO_PRODUCTS.find(p => p.id === productId);
  const input = document.getElementById("modalInputQty");
  if (!product || !input) return;

  const qty = Number(input.value);
  const valResult = validatePurchaseQuantity(qty, product.stock);

  if (!valResult.valid) {
    showToast(valResult.message, "error");
    return;
  }

  // Tambahkan ke cart
  const existing = APP_STATE.cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    APP_STATE.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock,
      qty: qty
    });
  }

  updateCartUI();
  closeModals();
  showToast(`Berhasil menambahkan ${qty} unit "${product.name}" ke keranjang!`, "success");
}

function closeModals() {
  const modal = document.getElementById("detailModal");
  const overlay = document.getElementById("modalOverlay");
  if (modal) modal.style.display = "none";
  if (overlay) overlay.classList.remove("active");
}

// Drawer Toggles
function toggleCartDrawer(open) {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("modalOverlay");
  if (open) {
    drawer.classList.add("open");
    overlay.classList.add("active");
  } else {
    drawer.classList.remove("open");
    overlay.classList.remove("active");
  }
}

function toggleQADrawer(open) {
  const drawer = document.getElementById("qaDrawer");
  const overlay = document.getElementById("modalOverlay");
  if (open) {
    drawer.classList.add("open");
    overlay.classList.add("active");
  } else {
    drawer.classList.remove("open");
    overlay.classList.remove("active");
  }
}

// Toggle Auth Status (Guest vs Member Levina)
function toggleAuthUser() {
  APP_STATE.isLoggedIn = !APP_STATE.isLoggedIn;
  const ind = document.getElementById("userStatusIndicator");
  const text = document.getElementById("userStatusText");
  const btn = document.getElementById("btnAuthToggle");

  if (APP_STATE.isLoggedIn) {
    ind.className = "user-status-indicator indicator-logged";
    text.textContent = APP_STATE.user.name;
    btn.textContent = "(Logout)";
    showToast("Login berhasil sebagai Member: Levina", "success");
  } else {
    ind.className = "user-status-indicator indicator-guest";
    text.textContent = "Tamu (Belum Login)";
    btn.textContent = "(Login)";
    showToast("Status diubah ke: Tamu (Belum Login)", "info");
  }

  updateCartUI();
}

// Toggle Bug Mode (ON/OFF)
function setBugMode(enable) {
  APP_STATE.bugMode = enable;
  const label = document.getElementById("bugModeStatusLabel");
  const checkbox = document.getElementById("bugModeCheckbox");

  if (checkbox) checkbox.checked = enable;

  if (enable) {
    if (label) label.innerHTML = `<span style="color: #EF4444; font-weight: 700;">AKTIF (4 Defect Sengaja Berlaku)</span>`;
    showToast("Mode Defect DIAKTIFKAN: 4 Bug siap diuji (BVA, EP, Decision Table, State Transition)", "error");
  } else {
    if (label) label.innerHTML = `<span style="color: #10B981; font-weight: 700;">NON-AKTIF (Bug Diperbaiki / Regression)</span>`;
    showToast("Mode Defect DINONAKTIFKAN: Seluruh bug diperbaiki untuk Regression Testing", "success");
  }

  updateCartUI();
  renderOrders();
}

// Toast Notifications
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "error") icon = "❌";

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Tab Switching inside QA Panel
function switchQATab(tabId) {
  document.querySelectorAll(".qa-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".qa-tab-content").forEach(c => c.style.display = "none");

  const btn = document.getElementById(`tabBtn-${tabId}`);
  const content = document.getElementById(`tabContent-${tabId}`);
  if (btn) btn.classList.add("active");
  if (content) content.style.display = "block";
}

// Initialization on DOM Load
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderOrders();
  updateCartUI();

  // Search input event
  const searchInput = document.getElementById("globalSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      APP_STATE.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Filter Buttons
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      APP_STATE.activeFilter = btn.dataset.category;
      renderProducts();
    });
  });

  // Bug mode checkbox listener
  const bugCheckbox = document.getElementById("bugModeCheckbox");
  if (bugCheckbox) {
    bugCheckbox.addEventListener("change", (e) => {
      setBugMode(e.target.checked);
    });
  }

  // Click outside overlay to close drawers
  const overlay = document.getElementById("modalOverlay");
  if (overlay) {
    overlay.addEventListener("click", () => {
      toggleCartDrawer(false);
      toggleQADrawer(false);
      closeModals();
    });
  }
});
