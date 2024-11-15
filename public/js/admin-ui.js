document.addEventListener('DOMContentLoaded', function () {
    const uploadNew = document.getElementById('uploadNew');
    const allUsers = document.getElementById('allUsers');
    const inventory = document.getElementById('Inventory');

    const upNewForm = document.getElementById('upNewForm');
    const userdata = document.getElementById('userdata');

    function hideAllSections() {
        upNewForm.style.display = 'none';
        userdata.style.display = 'none';
    }

    uploadNew.addEventListener('click', function () {
        hideAllSections();
        upNewForm.style.display = 'flex'; // Centered using flexbox in CSS
    });

    allUsers.addEventListener('click', function () {
        hideAllSections();
        userdata.style.display = 'block';
    });

    inventory.addEventListener('click', function () {
        hideAllSections();
        // Placeholder for inventory
        alert('Inventory clicked!');
    });
});
