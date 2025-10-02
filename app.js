// Lắng nghe sự kiện submit của form login
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form[action="index.html"]');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn form submit mặc định
            
            // Lấy dữ liệu từ form
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Kiểm tra dữ liệu
            if (username && password) {
                // Xử lý login
                handleLogin(username, password);
            } else {
                alert('Vui lòng nhập đầy đủ thông tin!');
            }
        });
    }
});

// Hàm xử lý login
function handleLogin(username, password) {
    // Tạo object chứa thông tin login
    const loginData = {
        username: username,
        password: password,
        timestamp: new Date().toISOString()
    };
    
    console.log('Dữ liệu login:', loginData);
    
    // Kiểm tra thông tin đăng nhập (demo)
    if (validateLogin(username, password)) {
        // Lưu thông tin user vào localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            username: username,
            loginTime: new Date().toISOString()
        }));
        
        alert('Đăng nhập thành công!');
        // Chuyển hướng về trang chủ
        window.location.href = 'index.html';
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
}

// Hàm kiểm tra thông tin đăng nhập
function validateLogin(username, password) {
    // Demo: kiểm tra với một số tài khoản mặc định
    const validUsers = [
        { username: 'admin', password: '123456' },
        { username: 'user1', password: 'password' },
        { username: 'test@email.com', password: '123' }
    ];
    
    return validUsers.some(user => 
        user.username === username && user.password === password
    );
}

// Hàm lấy thông tin user hiện tại
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Hàm đăng xuất
function logout() {
    localStorage.removeItem('currentUser');
    alert('Đã đăng xuất!');
    window.location.href = 'signup.html';
}

// Kiểm tra trạng thái đăng nhập khi tải trang
function checkLoginStatus() {
    const currentUser = getCurrentUser();
    if (currentUser) {
        console.log('User đã đăng nhập:', currentUser.username);
        return true;
    }
    return false;
}

// Export functions để sử dụng ở file khác
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleLogin,
        validateLogin,
        getCurrentUser,
        logout,
        checkLoginStatus
    };
}