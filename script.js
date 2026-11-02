
/* NOMOR WHATSAPP TOKO
   Ganti dengan nomor WhatsApp kamu.
   Contoh: 081234567890 menjadi 6281234567890
*/
const whatsappNumber = "62XXXXXXXXXX";

/* DATA PRODUK */
const products = [
    {
        id: 1,
        name: "Mini Pouch Cream",
        category: "Mini Pouch",
        price: 25000,
        description: "Pouch kecil berwarna cream yang simpel.",
        fullDescription:
            "Mini Pouch Cream cocok untuk menyimpan uang, kartu, earphone, dan barang kecil lainnya. Desain minimalis dengan warna cream yang mudah dipadukan dengan berbagai gaya.",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Mini Pouch Brown",
        category: "Mini Pouch",
        price: 28000,
        description: "Pouch praktis untuk barang kecil.",
        fullDescription:
            "Mini Pouch Brown memiliki tampilan simpel dan warna cokelat yang hangat. Cocok digunakan untuk menyimpan aksesori, uang, kartu, dan perlengkapan sehari-hari.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Makeup Pouch Beige",
        category: "Makeup Pouch",
        price: 35000,
        description: "Tempat kosmetik untuk aktivitasmu.",
        fullDescription:
            "Makeup Pouch Beige dapat digunakan untuk menyimpan kosmetik dan perlengkapan kecantikan agar lebih terorganisasi. Pilihan tepat untuk dibawa saat beraktivitas maupun bepergian.",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Makeup Pouch Floral",
        category: "Makeup Pouch",
        price: 40000,
        description: "Pouch manis untuk perlengkapan makeup.",
        fullDescription:
            "Makeup Pouch Floral cocok untuk kamu yang ingin menyimpan perlengkapan makeup dalam satu tempat. Desainnya terinspirasi gaya feminin dan cocok untuk penggunaan sehari-hari.",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Travel Pouch Basic",
        category: "Travel Pouch",
        price: 45000,
        description: "Pouch untuk perlengkapan perjalanan.",
        fullDescription:
            "Travel Pouch Basic membantu mengatur perlengkapan pribadi ketika bepergian. Gunakan untuk menyimpan aksesori, perlengkapan mandi, atau barang kecil agar mudah ditemukan.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Travel Pouch Daily",
        category: "Travel Pouch",
        price: 50000,
        description: "Pouch praktis untuk aktivitas harian.",
        fullDescription:
            "Travel Pouch Daily merupakan pilihan untuk menyimpan barang-barang penting ketika bekerja, belajar, atau bepergian. Desain praktis untuk membantu barang tetap rapi.",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80"
    }
];

/* ELEMEN HTML */
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");
const cartCount = document.getElementById("cartCount");
const emptyMessage = document.getElementById("emptyMessage");

const productDialog = document.getElementById("productDialog");
const dialogContent = document.getElementById("dialogContent");
const closeDialog = document.getElementById("closeDialog");
const cartButton = document.getElementById("cartButton");

/* VARIABEL */
let selectedCategory = "Semua";
let cart = [];

/* FORMAT HARGA */
function formatRupiah(price) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(price);
}

/* LINK WHATSAPP */
function getWhatsAppLink(product) {
    const message =
        `Halo Pouchy! Saya tertarik membeli produk berikut:\n\n` +
        `Nama produk: ${product.name}\n` +
        `Kategori: ${product.category}\n` +
        `Harga: ${formatRupiah(product.price)}\n\n` +
        `Apakah produk ini masih tersedia?`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* MENAMPILKAN KATALOG */
function displayProducts() {
    const keyword = searchInput.value.toLowerCase().trim();

    const filteredProducts = products.filter(product => {
        const matchesCategory =
            selectedCategory === "Semua" ||
            product.category === selectedCategory;

        const matchesSearch =
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword);

        return matchesCategory && matchesSearch;
    });

    productGrid.innerHTML = "";
    emptyMessage.hidden = filteredProducts.length !== 0;

    filteredProducts.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    data-product-detail="${product.id}"
                    class="clickable-product"
                    title="Klik untuk melihat detail produk"
                >
            </div>

            <div class="product-info">
                <span class="product-category">
                    ${product.category}
                </span>

                <h3
                    data-product-detail="${product.id}"
                    class="clickable-product"
                >${product.name}</h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <p class="product-price">
                    ${formatRupiah(product.price)}
                </p>

                <div class="product-actions">
                    <button class="detail-button"
                        data-detail="${product.id}">
                        Lihat Detail
                    </button>

                    <button class="add-button"
                        data-add="${product.id}">
                        + Keranjang
                    </button>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

/* FILTER KATEGORI */
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");
        selectedCategory = button.dataset.category;

        displayProducts();
    });
});

/* PENCARIAN */
searchInput.addEventListener("input", displayProducts);

/* TAMBAH KE KERANJANG */
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount();

    alert(`${product.name} berhasil ditambahkan ke keranjang!`);
}

/* UPDATE JUMLAH KERANJANG */
function updateCartCount() {
    cartCount.textContent = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );
}

/* DETAIL PRODUK + TOMBOL WHATSAPP */
function showProductDetail(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) return;

    dialogContent.innerHTML = `
        <img
            class="dialog-image"
            src="${product.image}"
            alt="${product.name}"
        >

        <p class="product-category">${product.category}</p>

        <h2>${product.name}</h2>

        <h3 class="product-price">
            ${formatRupiah(product.price)}
        </h3>

        <h4>Deskripsi Produk</h4>
        <p class="full-description">
            ${product.fullDescription}
        </p>

        <button class="dialog-add"
            data-dialog-add="${product.id}">
            + Tambahkan ke Keranjang
        </button>

        <a
            class="whatsapp-button"
            href="${getWhatsAppLink(product)}"
            target="_blank"
            rel="noopener noreferrer"
        >
            Pesan via WhatsApp
        </a>
    `;

    productDialog.showModal();
}

/* KLIK FOTO, NAMA, DETAIL, ATAU KERANJANG */
productGrid.addEventListener("click", event => {
    const detail = event.target.closest("[data-detail]");
    const productClick = event.target.closest("[data-product-detail]");
    const add = event.target.closest("[data-add]");

    if (detail || productClick) {
        const id = Number(
            (detail || productClick).dataset.detail ||
            (detail || productClick).dataset.productDetail
        );

        showProductDetail(id);
        return;
    }

    if (add) {
        addToCart(Number(add.dataset.add));
    }
});

/* TOMBOL TAMBAH DARI DETAIL */
dialogContent.addEventListener("click", event => {
    const button = event.target.closest("[data-dialog-add]");

    if (button) {
        addToCart(Number(button.dataset.dialogAdd));
    }
});

/* TUTUP DETAIL */
closeDialog.addEventListener("click", () => {
    productDialog.close();
});

productDialog.addEventListener("click", event => {
    if (event.target === productDialog) {
        productDialog.close();
    }
});

/* LIHAT KERANJANG */
cartButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Keranjang kamu masih kosong.");
        return;
    }

    const details = cart.map(item =>
        `${item.name} x${item.quantity} = ` +
        formatRupiah(item.price * item.quantity)
    );

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "ISI KERANJANG\n\n" +
        details.join("\n") +
        "\n\nTOTAL: " + formatRupiah(total)
    );
});

/* JALANKAN WEBSITE */
displayProducts();
