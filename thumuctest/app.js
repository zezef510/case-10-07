const fs = require('fs');

document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault(); // Ngăn chặn việc gửi form đi

    var author = document.getElementById("author").value;
    var comment = document.getElementById("comment").value;

    var data = {
        "author": author,
        "comment": comment
    };

    // Chuyển đổi dữ liệu thành chuỗi JSON
    var jsonData = JSON.stringify(data);

    // Ghi dữ liệu JSON vào file
    // Tên và đường dẫn của file JSON bạn muốn tạo
    const fileName = "comment.json";
    const filePath = "test3.html" + fileName;

    // Ghi dữ liệu JSON vào file
    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error("Lỗi khi ghi file:", err);
            return;
        }
        console.log("File JSON đã được tạo thành công.");
    });

    // Hiển thị thông tin đã lưu dưới phần comment
    var savedDataContainer = document.createElement("div");
    savedDataContainer.innerHTML = "<p><strong>Author: </strong>" + author + "</p>" +
        "<p><strong>Comment: </strong>" + comment + "</p>";

    document.getElementById("comments-container").appendChild(savedDataContainer);

    // Xóa nội dung trong các trường nhập liệu sau khi gửi comment thành công
    document.getElementById("author").value = "";
    document.getElementById("comment").value = "";
});