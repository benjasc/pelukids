window.scrollTo(0, 0);

$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$(".close-modal").click(function (e) {
    document.getElementById('file-input').value = "";
    $("#nameProfile").val("");
});

var bs_modal = $("#modal");
var image = document.getElementById("image");
var cropper, reader, file;

$("body").on("change", ".image", function (e) {
    $(".loader-container").fadeIn(1000);
    var files = e.target.files;
    var done = function (url) {
        image.src = url;
        bs_modal.modal("show");
        var intervalId = setInterval(function () {
            if ($(".cropper-crop-box").length) {
                $(".loader-container").fadeOut(1000);
                clearInterval(intervalId);
            }
        }, 1000);

    };

    if (files && files.length > 0) {
        file = files[0];

        if (URL) {
            done(URL.createObjectURL(file));
        } else if (FileReader) {
            reader = new FileReader();
            reader.onload = function (e) {
                done(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
});

bs_modal
    .on("shown.bs.modal", function () {
        cropper = new Cropper(image, {
            aspectRatio: 1150 / 400,
            viewMode: 3
        });
    })
    .on("hidden.bs.modal", function () {
        cropper.destroy();
        cropper = null;
    });


$("#crop").click(function () {
    $(".loader-container").fadeIn(1000);
    canvas = cropper.getCroppedCanvas({
        width: 1150,
        height: 400,
    });

    canvas.toBlob(function (blob) {
        url = URL.createObjectURL(blob);
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            var base64data = reader.result;
            /*var pos = $('#pos').val();*/
            var fd = new FormData();
            fd.append('file', blob, file.name);

            $.ajax({
                type: "POST",
                url: "/dashboard/saveFrontImage",
                data: fd,
                processData: false,
                contentType: false,
                success: function (data) {
                    bs_modal.modal("hide");
                    document.getElementById('file-input').value = "";
                    $("#datatable").empty();
                    $("#positionBtn").removeClass("disabled");
                    data.forEach((element, index) => {
                        getTr(element);
                    });
                    $(".loader-container").fadeOut(1000);
                }, error: function (jqXHR, textStatus, errorThrown) {
                    document.getElementById('file-input').value = "";
                    $(".loader-container").fadeOut(1000);
                    console.log('Error: ' + textStatus + ' - ' + errorThrown);
                }
            });
        };
    });
});

function getTr(element) {
    $('#datatable').append('<tr><td class="text-center"><img src="/slider/' + element.img + '" width="100" class="img-fluid img-thumbnail shadow-sm"></td><td class="text-center align-middle" id="inputPosition"><input id="inputPos" type="number" min="1" class="form-control" value="' + element.position + '" width="50%"></td></td><td class="text-center align-middle" value="' + element.id + '"><a class="btn btn-danger" onclick="deleteRow(' + element.id + ')"><i class="fa-solid fa-trash"></i>&nbsp;Eliminar</a></td></tr>');
}

$(document).ready(function () {
    $(".loader-container").fadeOut(1000);
    var tableHead = document.getElementsByClassName("table-sticky")[0];
    tableHead.style.width = tableHead.parentElement.clientWidth + "px";
});


function deleteRow(sliderId) {

    $.confirm({
        title: '',
        content: '¿Estás seguro que deseas borrar la foto de portada?',
        buttons: {
            update: {
                text: 'Eliminar',
                btnClass: 'btn btn-danger',
                keys: ['enter', 'shift'],
                action: function () {
                    $(".loader-container").fadeIn(1000);
                    $.ajax({
                        type: "DELETE",
                        url: "/dashboard/deleteFrontImage/" + sliderId,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            $("#datatable").empty();
                            if (data.length > 0) {
                                data.forEach((element, index) => {
                                    getTr(element);
                                });
                            } else {
                                $("#positionBtn").addClass("disabled");
                                getNoDataTr();
                            }
                            $(".loader-container").fadeOut(1000);
                        }, error: function (jqXHR, textStatus, errorThrown) {
                            $(".loader-container").fadeOut(1000);
                            console.log('Error: ' + textStatus + ' - ' + errorThrown);
                        }
                    });
                }
            },
            cancelar: function () {
            }
        }
    });
}

function getNoDataTr() {
    $('#datatable').append('<tr class="no-data text-center"> <td colspan="3">Sin registros</td> </tr>');
}


$("#positionBtn").click(function () {
    $.confirm({
        title: '',
        content: '¿Estás seguro de actualizar el orden de las fotos de portada?',
        buttons: {
            update: {
                text: 'Actualizar',
                btnClass: 'btn btn-primary',
                keys: ['enter', 'shift'],
                action: function () {
                    $(".loader-container").fadeIn(1000);
                    const body = [];
                    $('#datatable tr').each(function () {
                        let obj = {};
                        $(this).find('td').each(function () {
                            if ($(this).find("#inputPos").length > 0) {
                                let position = $(this).find("#inputPos").val();
                                obj["position"] = parseInt(position);
                            }
                            if ($(this).find("a").length > 0) {
                                let onClickValue = $(this).find("a").attr("onclick");
                                let id = eval("(" + onClickValue.split("(")[1].split(")")[0] + ")");
                                obj["id"] = parseInt(id);
                            }
                        })
                        body.push(obj);
                    })

                    $.ajax({
                        type: "PUT",
                        url: "/dashboard/updatePositionSlider",
                        data: JSON.stringify(body),
                        processData: false,
                        contentType: "application/json",
                        success: function (data) {
                            $.alert('El contenido se actualizó correctamente.&nbsp;<i class="fa-solid fa-circle-check" style="color:orchid;"></i>');
                            $("#datatable").empty();
                            data.forEach((element, index) => {
                                getTr(element);
                            });
                            $(".loader-container").fadeOut(1000);
                        },error: function (jqXHR, textStatus, errorThrown) {
                            $(".loader-container").fadeOut(1000);
                            console.log('Error: ' + textStatus + ' - ' + errorThrown);
                        }
                    });
                }
            },
            cancelar: function () {
            }
        }
    });
})