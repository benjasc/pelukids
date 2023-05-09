$(document).ready(function() {
    var tableHead = document.getElementsByClassName("table-sticky")[0];
    tableHead.style.width = tableHead.parentElement.clientWidth + "px";
});


window.scrollTo(0, 0);

$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

$("#updateServiceBtn").click(function() {
    const serviceGloss = $('#serviceGloss').val();
    const obj = {
        serviceGloss: serviceGloss
    };

    $.confirm({
        title: '',
        content: '¿Estás seguro de actualizar contenido?',
        buttons: {
            update: {
                text: 'Actualizar',
                btnClass: 'btn btn-primary',
                keys: ['enter', 'shift'],
                action: function() {
                    $.ajax({
                        type: "PUT",
                        url: "/dashboard/updateServiceGloss",
                        data: JSON.stringify(obj),
                        processData: false,
                        contentType: "application/json",
                        success: function(data) {
                            $.alert('El contenido se actualizó correctamente.&nbsp;<i class="fa-solid fa-circle-check" style="color:orchid;"></i>');
                        }
                    });
                }
            },
            cancelar: function() {}
        }
    });
})

$("#plusBtn").click(function() {
    const description = $('#serviceAdd').val();
    if (description.length < 10) {
        $.alert('Debes ingresar al menos 10 caracteres.&nbsp;<i class="fa-solid fa-circle-exclamation" style="color:darkorange;"></i>');
    } else {
        const obj = {
            description: description
        };
        $.ajax({
            type: "POST",
            url: "/dashboard/addService",
            data: JSON.stringify(obj),
            processData: false,
            contentType: "application/json",
            success: function(data) {
                $('#serviceAdd').val("");
                $("#datatable").empty();
                data.forEach((element, index) => {
                getTr(element);
                });
                $.alert('Servicio agregado correctamente.&nbsp;<i class="fa-solid fa-circle-check" style="color:orchid;"></i>');

            }
        });
    }
})


function deleteRowService(serviceId) {

    $.confirm({
        title: '',
        content: '¿Estás seguro de eliminar el servicio?',
        buttons: {
            update: {
                text: 'Eliminar',
                btnClass: 'btn btn-danger',
                keys: ['enter', 'shift'],
                action: function() {
                    $.ajax({
                        type: "DELETE",
                        url: "/dashboard/deleteService/" + serviceId,
                        processData: false,
                        contentType: false,
                        success: function(data) {
                            $("#datatable").empty();
                            data.forEach((element, index) => {
                                getTr(element);
                            });
                        },
                    });
                }
            },
            cancelar: function() {}
        }
    });
}

function getTr(element) {
    $('#datatable').append('<tr> <td class="text-center" >' + element.description + '</td> <td class="text-center align-middle" ><button type="button" class="btn btn-danger" onclick="deleteRowService(' + element.id + ')"><i class="fa-solid fa-trash"></i>&nbsp;Eliminar</button></td> </tr>');
}