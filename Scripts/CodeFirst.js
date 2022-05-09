$("#LoadingStatus").html("Loading...");

$.get("/Home/GetStudentList", null, DataBind);

function DataBind(StudentList) {
    var SetData = $("#SetStudentList");
    for (var i = 0; i < StudentList.length; i++) {
        var Data = "<tr class='row_" + StudentList[i].StudentId + "'>" +
            "<td>" + StudentList[i].StudentId + "</td>" +
            "<td>" + StudentList[i].StudentName + "</td>" +
            "<td>" + StudentList[i].Email + "</td>" +
            "<td>" + "<a href='#' class='btn btn-warning' onclick='EditStudentRecord(" + StudentList[i].StudentId + ")' ><span class='glyphicon glyphicon-edit'></span></a>" + "</td>" +
            "<td>" + "<a href='#' class='btn btn-danger' onclick='DeleteStudentRecord(" + StudentList[i].StudentId + ")'><span class='glyphicon glyphicon-trash'></span></a>" + "</td>" +
            "</tr>";
        SetData.append(Data);
        $("#LoadingStatus").html(" ");
    }
}

function AddNewStudent() {
    $("#form")[0].reset();
    $("#StuId").val(0);
    $("#ModalTitle").html("Add New Student");
    $("#MyModal").modal();

}

//Show The Popup Modal For Edit Student Record

function EditStudentRecord(StudentId) {
    var url = "/Home/GetStudentById?StudentId=" + StudentId;
    $("#ModalTitle").html("Update Student Record");
    $("#MyModal").modal();
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            var obj = JSON.parse(data);
            $("#StuId").val(obj.StudentId);
            $("#StuName").val(obj.StudentName);
            $("#Email").val(obj.Email);

        }
    })
}

$("#SaveStudentRecord").click(function () {
    var data = $("#SubmitForm").serialize();
    $.ajax({
        type: "Post",
        url: "/Home/SaveDataInDatabase",
        data: data,
        success: function (result) {
            alert("Success!..");
            window.location.href = "/Home/index";
            $("#MyModal").modal("hide");

        }
    })
})

function DeleteStudentRecord(StudentId) {
    $("#StuId").val(StudentId);
    $("#DeleteConfirmation").modal("show");
}
function ConfirmDelete() {
    var StuId = $("#StuId").val();
    $.ajax({
        type: "POST",
        url: "/Home/DeleteStudentRecord?StudentId=" + StuId,
        success: function (result) {
            $("#DeleteConfirmation").modal("hide");
            $(".row_" + StuId).remove();
        }
    })
}