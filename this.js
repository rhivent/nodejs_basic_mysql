// Variabel nilai disimpan dalam objek global.
// Objek global Javascript secara standar adalah window
// sehingga nilai akan disimpan dalam window.nilai
var nilai = 100;

nilai;        // mengembalikan 100
window.nilai; // mengembalikan 100

var kurang = function (n) {
    // this.nilai merupakan window.nilai (!)
    this.nilai = this.nilai - n;
};

kurang(10);

nilai;        // mengembalikan 90 (!)
window.nilai; // mengembalikan 90 (!)

// Hal yang sama berlaku untuk fungsi di dalam fungsi juga
var tambah_sepuluh = function () {
    var tambah = function (n) {
            // this.nilai merupakan window.nilai (!!!)
        this.nilai = this.nilai + n;
    };

    tambah(10);
};

nilai; // mengembalikan 90

tambah_sepuluh();

nilai; // mengembalikan 100 (!!!)
