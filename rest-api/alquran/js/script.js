var isi;
var judul_surat;
var id_surat;
var arti_surat;
var audio_surat;
var ayat_surat;
var keterangan_surat;
var rukuk_surat;
var type_surat;
var urut_surat;
var detail_surat;

function tampilkanDaftar(id_surat_param) {
    id_surat = id_surat_param;

    $.ajax({
        type : 'get',
        url : 'https://al-quran-8d642.firebaseio.com/data.json',
        data : '',
        dataType :'json',

        success: function (result) {
            //console.log(result[0].nama);
            $('#daftar-surat').html('Daftar Surat');

            total_surat = 0;
            isi = '<tr>';
            $.each(result, function (i, data) {
                //  console.log(i);
                isi += `
                <tr>
                    <td id="listno` + i + `" class="list-group-item list-group-item-action list-group-item-light kolom-daftar">`+ data.nomor +`</td>
                    <td>`+ data.nama +`</td>
                    <td>`+ data.asma +`</td>
                    <td><a href = "#" onClick="tampilkanDetail(` + i + `)" data-toggle="modal" data-target="#exampleModal"> Details</a></td>
                </tr>`;

            });
            isi += '</tr>';
            $('.isi').html(isi);
            $('#listno' + id_surat).removeClass('kolom-daftar');

        }
    });
}


    function tampilkanDetail(id_surat_param) {
        id_surat = id_surat_param;
    
        $('.list-group-item').addClass('kolom-daftar');
        $('#listno' + id_surat).removeClass('kolom-daftar');
    
    
        $.ajax({
            type: 'GET',
            url: 'https://al-quran-8d642.firebaseio.com/data.json',
            data: '',
            dataType: 'json',
            success: function (result) {
                judul_surat = result[id_surat].nama;
                arti_surat = result[id_surat].arti;
                audio_surat = result[id_surat].audio;
                ayat_surat = result[id_surat].ayat;
                keterangan_surat = result[id_surat].keterangan;
                rukuk_surat = result[id_surat].rukuk;
                type_surat = result[id_surat].type;
                nomor_surat = result[id_surat].nomor;
                urut_surat = result[id_surat].urut;
    
                detail_surat = `
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-12">
                                <ul class = "list-group" >
                                    <li class = "list-group-item" ><h3> ` + judul_surat + `</h3></li>
                                    <li class = "list-group-item" >Arti  : ` + arti_surat + `</li> 
                                    <li class = "list-group-item" >Surat ke : ` + nomor_surat + `</li> 
                                    <li class = "list-group-item" >Jumlah Ayat : ` + ayat_surat + `</li> 
                                    <li class = "list-group-item" >Di Turunkan di : ` + type_surat + `</li> 
                                    <li class = "list-group-item" >Keterangan : ` + keterangan_surat + `</li> 
                                    <li class = "list-group-item" >Audio : <a class="murotal" target="_blank" href="` + audio_surat + `">Unduh</li> 
                                    </ul>
                            </div>
                        </div>
                    </div>`
                $('.modal-body').html(detail_surat);
            }
        });
    }
    
    //Loading Awal
    tampilkanDaftar(0);

